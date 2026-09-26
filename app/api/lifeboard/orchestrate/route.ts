import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
  const { text } = await req.json();
  if (!text) return NextResponse.json({ intent: "chat" });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are an intent classifier. Classify the user's message into exactly one of these intents:

- "card_action" — the user wants to create, edit, move, delete, or update a task/card on their board
  Examples: "i need to take out trash", "mark workout as done", "delete the LinkedIn card", "i gotta call mom later"

- "calendar" — the user wants to check, sync, or query their Google Calendar
  Examples: "check my calendar", "what's on my calendar today", "sync calendar", "what do i have this week"

- "gmail" — the user wants to search or ask a question about their email inbox
  Examples: "check my gmail", "check my email", "what time is the RSM math competition", "any email from school", "look in my inbox"

- "chat" — the user is asking a general question, having a conversation, or the message doesn't fit above
  Examples: "what should I focus on today?", "how are you", "what do you think about my board"

Rules:
- If the message mentions email, gmail, inbox → always "gmail"
- If the message mentions calendar, schedule, events → always "calendar"
- If the message is clearly adding/updating/removing a task → always "card_action"
- Everything else → "chat"

Return: { "intent": "<one of the four intents>" }`,
      },
      {
        role: "user",
        content: text,
      },
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
