import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text, lastAssistant } = await req.json();
    if (!text) return NextResponse.json({ intent: "chat" });

    const context = lastAssistant ? `\n\nPrevious assistant message: "${lastAssistant}"` : "";

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Classify the user message into exactly one intent. Use the previous assistant message for context when the user's message is vague. Return JSON: { "intent": "<value>" }

Intents:
- "gmail" — anything about email, mail, inbox, gmail
- "calendar" — ONLY explicit requests to CHECK or SYNC the calendar (must include words like check/sync/show/see/what's on)
- "calendar_add" — explicitly adding/putting a specific event ON the calendar
- "card_action" — creating, editing, moving, deleting a task/card on the board
- "chat" — everything else: questions, follow-ups, confusion, conversation, vague messages, anything ambiguous

IMPORTANT: When in doubt → "chat". Only use calendar/gmail/card_action when the intent is unambiguous.

Examples:
"check my mail" → gmail
"any email from school" → gmail
"what time is the RSM competition" → gmail
"please check" (after gmail response) → gmail
"check my calendar" → calendar
"what's on my schedule" → calendar
"sync my calendar" → calendar
"i need to take out the trash" → card_action
"mark workout as done" → card_action
"put this on my calendar for 8:30am" → calendar_add
"add hangeul contest to my calendar" → calendar_add
"add this to google calendar" → calendar_add
"what?" → chat
"did you put that on the right date?" → chat
"you said you put that on my calendar did you" → chat
"what do you mean?" → chat
"what should I focus on today" → chat
"how are you" → chat${context}`,
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
