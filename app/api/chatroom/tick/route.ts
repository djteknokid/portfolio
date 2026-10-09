import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  getCharacters,
  getMessages,
  insertMessage,
  updateRoom,
  getRoom,
} from "@/lib/chatroom/db";
import type { ChatroomCharacter, ChatroomMessage } from "@/app/chatroom/types";

const SILENT = "__SILENT__";

// Background tick — characters continue talking when no user is present.
// Each character independently decides if they want to say something.
// We do one "round" (all 3 simultaneously), then potentially a second round
// so there's some back-and-forth, but only if at least one spoke in round 1.

async function runTickAgent(
  openai: OpenAI,
  character: ChatroomCharacter,
  contextMessages: ChatroomMessage[]
): Promise<string | null> {
  const recentText = contextMessages
    .slice(-12)
    .map((m) => `${m.sender_name}: ${m.content}`)
    .join("\n");

  const systemPrompt = character.system_prompt
    .replace("{{memory_block}}", "No user in the room right now — just you and your colleagues.")
    .replace("{{recent_messages}}", recentText || "Room is quiet. Start something if you feel like it.");

  const chatHistory: OpenAI.Chat.ChatCompletionMessageParam[] = contextMessages
    .slice(-12)
    .map((m) => ({
      role: m.sender_id === character.id ? "assistant" : "user",
      content: m.sender_id === character.id ? m.content : `${m.sender_name}: ${m.content}`,
    }));

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "system", content: systemPrompt }, ...chatHistory],
    max_tokens: 60,
  });

  const output = (completion.choices[0].message.content ?? "").trim();
  if (!output || output.includes(SILENT) || output.startsWith("__")) return null;
  return output;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const room_id = body.room_id ?? "main";

    // Debounce — skip if ticked < 45s ago
    const room = getRoom();
    const msSinceTick = Date.now() - new Date(room.last_tick).getTime();
    if (msSinceTick < 45_000) {
      return NextResponse.json({ messages_generated: 0, reason: "debounced" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const characters = getCharacters();
    let generated = 0;

    // Round 1 — all 3 characters decide simultaneously
    const round1Context = getMessages({ limit: 12 });
    const round1Results = await Promise.all(
      characters.map(async (character) => {
        const response = await runTickAgent(openai, character, round1Context);
        return { character, response };
      })
    );

    for (const { character, response } of round1Results) {
      if (!response) continue;
      insertMessage({
        room_id,
        sender_type: "character",
        sender_id: character.id,
        sender_name: character.name,
        content: response,
        is_background: true,
      });
      generated++;
    }

    // Round 2 — only if round 1 had at least one message, gives a reply feel
    if (generated > 0) {
      const round2Context = getMessages({ limit: 12 });
      const round2Results = await Promise.all(
        characters.map(async (character) => {
          const response = await runTickAgent(openai, character, round2Context);
          return { character, response };
        })
      );

      for (const { character, response } of round2Results) {
        if (!response) continue;
        insertMessage({
          room_id,
          sender_type: "character",
          sender_id: character.id,
          sender_name: character.name,
          content: response,
          is_background: true,
        });
        generated++;
      }
    }

    updateRoom({ last_tick: new Date().toISOString() });

    return NextResponse.json({ messages_generated: generated });
  } catch (err) {
    console.error("chatroom/tick error:", err);
    return NextResponse.json({ error: "Tick failed" }, { status: 500 });
  }
}
