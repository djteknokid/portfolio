import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { turns, existingSummary } = await req.json();
  if (!turns?.length) return NextResponse.json({ summary: existingSummary ?? "" });

  const turnText = turns
    .map((t: { user: string; assistant: string }) => `User: ${t.user}\nAssistant: ${t.assistant}`)
    .join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are summarizing a conversation between a user and their personal life board assistant.

Your summary will be injected into future conversations as long-term memory, so the assistant can recall important context.

Focus on:
- Tasks or goals the user mentioned
- Preferences or patterns (e.g. "user prefers to group tasks by project")
- Names, accounts, or specific details mentioned (e.g. "user has two Instagram accounts: @vjretrokid and @clubrewinds")
- Corrections or clarifications the user made
- Anything the user would expect the assistant to remember

${existingSummary ? `Previous summary (extend/update this, don't repeat):\n${existingSummary}\n\n` : ""}Write a concise paragraph. No bullet points. Under 150 words.`,
      },
      {
        role: "user",
        content: `Conversation to summarize:\n\n${turnText}`,
      },
    ],
  });

  const summary = completion.choices[0].message.content ?? "";
  return NextResponse.json({ summary });
}
