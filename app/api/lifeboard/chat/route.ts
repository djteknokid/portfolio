import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { text, history, memorySummary, cards } = await req.json();

  const memoryBlock = memorySummary
    ? `\n\nLONG-TERM MEMORY:\n${memorySummary}`
    : "";

  const historyMessages: OpenAI.Chat.ChatCompletionMessageParam[] = (history ?? []).flatMap(
    (h: { user: string; assistant: string }) => [
      { role: "user" as const, content: h.user },
      { role: "assistant" as const, content: h.assistant },
    ]
  );

  const boardSummary = cards?.length
    ? `\n\nCurrent board: ${cards.length} cards — ${cards.filter((c: { status: string }) => c.status === "todo").length} todo, ${cards.filter((c: { status: string }) => c.status === "inprogress").length} in progress, ${cards.filter((c: { status: string }) => c.status === "done").length} done.`
    : "";

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are Lifeboard, a warm and intelligent personal life assistant. You help busy people — parents with full-time jobs — manage their life.${memoryBlock}${boardSummary}

You know about the user's board and life context. Respond conversationally — like a smart friend, not a bot. Be concise. If they ask about their board, summarize it. If they ask for advice, give it. Don't create tasks — just talk.`,
      },
      ...historyMessages,
      { role: "user", content: text },
    ],
  });

  const reply = completion.choices[0].message.content ?? "I'm here — what's on your mind?";
  return NextResponse.json({ reply });
}
