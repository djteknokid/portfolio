import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text, history, memorySummary, cards, recentMessages } = await req.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const memoryBlock = memorySummary ? `\n\nLONG-TERM MEMORY:\n${memorySummary}` : "";

    const historyMessages: OpenAI.Chat.ChatCompletionMessageParam[] = (history ?? []).flatMap(
      (h: { user: string; assistant: string }) => [
        { role: "user" as const, content: h.user },
        { role: "assistant" as const, content: h.assistant },
      ]
    );

    // Recent chat messages give the AI direct context of the last few exchanges
    const recentBlock: OpenAI.Chat.ChatCompletionMessageParam[] = (recentMessages ?? []).map(
      (m: { role: string; text: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.text,
      })
    );

    const boardSummary = cards?.length
      ? `\n\nCurrent board: ${cards.length} cards — ${cards.filter((c: { status: string }) => c.status === "todo").length} todo, ${cards.filter((c: { status: string }) => c.status === "inprogress").length} in progress, ${cards.filter((c: { status: string }) => c.status === "done").length} done.`
      : "";

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: `You are Lifeboard, a warm and intelligent personal life assistant for a busy parent with a full-time job. You help manage life — work, family, health, finances — through conversation.${memoryBlock}${boardSummary}

You have full context of the recent conversation. When the user asks a follow-up question like "did you do that?" or "what?" or "is that right?" — answer based on what you actually said in the recent messages above. Be honest and direct. Respond like a smart friend, not a bot. Be concise.

IMPORTANT: You CAN add to Google Calendar, you CAN read Gmail, you CAN create tasks — these are real capabilities. Never tell the user you can't do something you already did.`,
        },
        ...historyMessages,
        ...recentBlock,
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
