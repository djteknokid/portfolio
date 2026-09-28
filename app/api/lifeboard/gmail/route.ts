import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function decodeBase64(str: string) {
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
}

function extractText(payload: {
  mimeType?: string;
  body?: { data?: string };
  parts?: typeof payload[];
}): string {
  if (payload.body?.data) {
    return decodeBase64(payload.body.data);
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        return decodeBase64(part.body.data);
      }
    }
    for (const part of payload.parts) {
      const text = extractText(part);
      if (text) return text;
    }
  }
  return "";
}

async function buildGmailQuery(userQuery: string): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const today = new Date().toISOString().split("T")[0];
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `Today is ${today}. Convert the user's email question into a Gmail search query string and a time window.
Return JSON: { "q": "<gmail search operators>", "days": <number of days back to search, 7–30> }
Gmail search operators: from:, to:, subject:, has:attachment, is:unread, etc.
Rules:
- Always include "in:inbox" unless user asks for sent/all mail
- Use "from:" for sender queries ("from school" → try subject or common school domains)
- Use "subject:" for topic queries
- For vague queries ("check my email", "any new emails") use q: "in:inbox" and days: 7
- For time hints ("last week", "this month") adjust days accordingly
- Keep the query focused — don't over-filter
Examples:
"any email from school" → { "q": "in:inbox (from:school OR subject:school)", "days": 14 }
"emails about the soccer game" → { "q": "in:inbox subject:soccer", "days": 14 }
"unread emails" → { "q": "in:inbox is:unread", "days": 7 }
"email from David" → { "q": "in:inbox from:David", "days": 14 }
"check my email" → { "q": "in:inbox", "days": 7 }`,
      },
      { role: "user", content: userQuery },
    ],
  });
  const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
  const q = parsed.q ?? "in:inbox";
  const days = Math.min(Math.max(parsed.days ?? 7, 1), 30);
  return `${q} newer_than:${days}d`;
}

export async function POST(req: NextRequest) {
  const { accessToken, query } = await req.json();
  if (!accessToken) return NextResponse.json({ error: "Missing accessToken" }, { status: 400 });

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Build a targeted Gmail search query from the user's natural language
  const searchQuery = await buildGmailQuery(query ?? "check my email");

  const listUrl = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
  listUrl.searchParams.set("q", searchQuery);
  listUrl.searchParams.set("maxResults", "20");

  const listRes = await fetch(listUrl.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!listRes.ok) {
    const err = await listRes.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const listData = await listRes.json();
  const messages: { id: string }[] = listData.messages ?? [];

  if (!messages.length) return NextResponse.json({ answer: "No emails found matching that." });

  // Fetch up to 15 emails in parallel
  const emailDetails = await Promise.all(
    messages.slice(0, 15).map(async (m) => {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!msgRes.ok) return null;
      const msg = await msgRes.json();
      const headers: { name: string; value: string }[] = msg.payload?.headers ?? [];
      const subject = headers.find((h) => h.name === "Subject")?.value ?? "(no subject)";
      const from = headers.find((h) => h.name === "From")?.value ?? "";
      const date = headers.find((h) => h.name === "Date")?.value ?? "";
      const body = extractText(msg.payload ?? {}).slice(0, 2000);
      return { subject, from, date, body };
    })
  );

  const emails = emailDetails.filter(Boolean);

  const emailContext = emails
    .map((e, i) => `Email ${i + 1}:\nFrom: ${e!.from}\nDate: ${e!.date}\nSubject: ${e!.subject}\nBody: ${e!.body}`)
    .join("\n\n---\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant answering questions about the user's emails. Be specific and direct — extract exact dates, times, names, and details from the emails. If the information is there, state it clearly. Only say you can't find it if it's genuinely not in any of the emails.`,
      },
      {
        role: "user",
        content: `My emails:\n\n${emailContext}\n\nMy question: ${query}`,
      },
    ],
  });

  const answer = completion.choices[0].message.content ?? "I couldn't find that in your recent emails.";
  return NextResponse.json({ answer });
}
