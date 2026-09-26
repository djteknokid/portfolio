import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ intent: "chat" });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Classify the user message into exactly one intent. Return JSON: { "intent": "<value>" }

Intents:
- "gmail" — anything about email, mail, inbox, gmail
- "calendar" — checking or syncing their calendar (NOT adding to calendar)
- "card_action" — creating, editing, moving, deleting a task/card
- "chat" — everything else: questions, conversation, advice

Examples:
"check my mail" → gmail
"any email from school" → gmail
"what time is the RSM competition" → gmail
"check my calendar" → calendar
"what's on my schedule" → calendar
"i need to take out the trash" → card_action
"mark workout as done" → card_action
"put this on my calendar" → card_action
"add hangeul contest to my calendar" → card_action
"what should I focus on today" → chat
"how are you" → chat`,
        },
        { role: "user", content: text },
      ],
    });

    const raw = completion.choices[0].message.content ?? '{"intent":"chat"}';
    const parsed = JSON.parse(raw);
    return NextResponse.json({ intent: parsed.intent ?? "chat" });
  } catch (err) {
    console.error("orchestrate error:", err);
    return NextResponse.json({ intent: "chat" });
  }
}
