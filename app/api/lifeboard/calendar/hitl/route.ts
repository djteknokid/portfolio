import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text, candidates } = await req.json();
    // candidates: { index: number, title: string }[]

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const list = candidates.map((c: { index: number; title: string }) => `${c.index}. ${c.title}`).join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `The user was shown a numbered list of calendar events and asked whether to add them to their board.

Event list:
${list}

Interpret their response and return JSON:
{
  "action": "add_all" | "skip_all" | "add_some" | "skip_some" | "not_relevant",
  "indices": [1, 2, ...]  // 1-based, only for add_some or skip_some
}

Rules:
- "add all" / "yes" / "sure" / "all of them" → add_all
- "no" / "none" / "skip all" / "don't add" → skip_all
- "remove 2" / "skip 2" / "don't add 2" / "not 2" → skip_some, indices: [2]
- "only add 1 and 3" / "just 1" → add_some, indices: [1, 3]
- "remove 2 and 4" → skip_some, indices: [2, 4]
- anything unrelated to the list (a new question, a different task) → not_relevant`,
        },
        { role: "user", content: text },
      ],
    });

    const raw = completion.choices[0].message.content ?? '{"action":"not_relevant"}';
    const parsed = JSON.parse(raw);
    return NextResponse.json({ action: parsed.action ?? "not_relevant", indices: parsed.indices ?? [] });
  } catch {
    return NextResponse.json({ action: "not_relevant", indices: [] });
  }
}
