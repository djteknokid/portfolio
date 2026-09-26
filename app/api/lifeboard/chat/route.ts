import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text, history, memorySummary, cards } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const memoryBlock = memorySummary ? `\n\nLONG-TERM MEMORY:\n${memorySummary}` : "";

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
          content: `You are Lifeboard, a warm and intelligent personal life assistant for a busy parent with a full-time job. You help manage life — work, family, health, finances — through conversation.${memoryBlock}${boardSummary}

Respond like a smart friend, not a bot. Be concise and direct. If they ask about their board, summarize it. If they ask for advice, give it. You do NOT create tasks — just have a conversation.`,
        },
        ...historyMessages,
        { role: "user", content: text },
      ],
    });

    const reply = completion.choices[0].message.content ?? "I'm here — what's on your mind?";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("chat error:", err);
    return NextResponse.json({ reply: "I'm here — what's on your mind?" });
  }
}
