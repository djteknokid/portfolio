import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  const { accessToken, query } = await req.json();
  if (!accessToken) return NextResponse.json({ error: "Missing accessToken" }, { status: 400 });

  // Search recent emails — last 20, optionally filtered by query
  const searchQuery = "in:inbox newer_than:7d";
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

  if (!messages.length) return NextResponse.json({ emails: [] });

  // Fetch each message in parallel
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
      const body = extractText(msg.payload ?? {}).slice(0, 500);

      return { subject, from, date, body };
    })
  );

  const emails = emailDetails.filter(Boolean);

  // Answer the user's question using OpenAI
  const { default: OpenAI } = await import("openai");
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const emailContext = emails
    .map((e, i) => `Email ${i + 1}:\nFrom: ${e!.from}\nDate: ${e!.date}\nSubject: ${e!.subject}\nBody: ${e!.body}`)
    .join("\n\n---\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant. The user has asked a question about their emails. Answer based only on the emails provided. Be concise and direct. If the answer isn't in the emails, say so honestly.`,
      },
      {
        role: "user",
        content: `My emails from the last 7 days:\n\n${emailContext}\n\nMy question: ${query}`,
      },
    ],
  });

  const answer = completion.choices[0].message.content ?? "I couldn't find that in your recent emails.";
  return NextResponse.json({ answer });
}
