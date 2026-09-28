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
- "calendar_view" — user wants to SEE or READ their calendar events (what do I have, what's on, show me, any events today/this week)
- "calendar_sync" — user explicitly wants to SYNC calendar events TO their board ("sync my calendar", "add calendar events to my board")
- "calendar_add" — explicitly adding something to the CALENDAR ("put on my calendar", "add to google calendar", "schedule it")
- "calendar_delete" — removing something from the CALENDAR specifically ("remove from calendar", "delete from google calendar")
- "card_action" — explicitly adding/removing/editing a task or card on the BOARD ("add to board", "add a task", "mark as done")
- "ambiguous_add" — user wants to add something but hasn't said board vs calendar ("add dentist appointment", "put swim class on", "add this")
- "ambiguous_remove" — user wants to remove something but hasn't said board vs calendar ("remove dentist", "delete swim class", "cancel workout")
- "chat" — everything else: questions, follow-ups, conversation, vague messages

IMPORTANT: Use "ambiguous_add" / "ambiguous_remove" when the target is unclear. When in doubt → "chat".

Examples:
"check my mail" → gmail
"check my calendar" → calendar_view
"what events do I have this week" → calendar_view
"what's on my schedule" → calendar_view
"what do I have today" → calendar_view
"do I have anything tomorrow" → calendar_view
"sync my calendar to my board" → calendar_sync
"add calendar events to my board" → calendar_sync
"i need to take out the trash" → card_action
"add a task to workout" → card_action
"mark workout as done" → card_action
"put this on my calendar for 8:30am" → calendar_add
"add hangeul contest to my calendar" → calendar_add
"add this to google calendar" → calendar_add
"remove the swimming event from the calendar" → calendar_delete
"delete from google calendar" → calendar_delete
"add dentist appointment Tuesday" → ambiguous_add
"add swim class 6pm" → ambiguous_add
"schedule basketball practice" → ambiguous_add
"delete my dentist appointment" → ambiguous_remove
"remove swim class" → ambiguous_remove
"cancel basketball" → ambiguous_remove
"what?" → chat
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
