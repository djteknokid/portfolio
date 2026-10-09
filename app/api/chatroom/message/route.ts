import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  getCharacters,
  getMessages,
  insertMessage,
  updateRoom,
  getMemory,
  saveMemory,
  getFacts,
  mergeFacts,
} from "@/lib/chatroom/db";
import type { ChatroomCharacter, ChatroomMessage } from "@/app/chatroom/types";

const SILENT = "__SILENT__";

// ── Fact extractor ────────────────────────────────────────────────────────────
// Pulls explicit self-stated facts from user messages (age, job, etc.)
// and stores them so every character sees them going forward.

async function extractAndStoreFacts(openai: OpenAI, userId: string, content: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Extract explicit factual claims the user makes about themselves. Only hard facts stated directly (age, job, location, preferences, relationships). Not opinions.
Return JSON: { "facts": { "key": "value" } } or { "facts": {} } if nothing concrete.
Examples: "I'm 16" → {"age":"16"}, "I work at Google" → {"employer":"Google"}`,
        },
        { role: "user", content },
      ],
      max_tokens: 80,
    });
    const raw = JSON.parse(completion.choices[0].message.content ?? "{}");
    if (raw.facts && Object.keys(raw.facts).length > 0) {
      mergeFacts(userId, raw.facts);
    }
  } catch { /* silent */ }
}

// ── Per-character agent ───────────────────────────────────────────────────────
// Each character independently decides whether to respond.
// Returns the message content, or null if the character chose silence.

async function runCharacterAgent(
  openai: OpenAI,
  character: ChatroomCharacter,
  userId: string,
  userName: string,
  contextMessages: ChatroomMessage[]
): Promise<string | null> {
  const memory = getMemory(character.id, userId);
  const facts = getFacts(userId);

  const memoryLines = [
    memory.relationship.impression ? `Your impression of ${userName}: ${memory.relationship.impression}` : "",
    memory.episodic.length
      ? `What you remember:\n${memory.episodic.slice(-3).map((e) => `- ${e.summary}`).join("\n")}`
      : "",
    Object.keys(facts).length
      ? `Known facts about ${userName}:\n${Object.entries(facts).map(([k, v]) => `- ${k}: ${v}`).join("\n")}`
      : "",
  ].filter(Boolean).join("\n");

  const recentText = contextMessages
    .slice(-15)
    .map((m) => `${m.sender_name}: ${m.content}`)
    .join("\n");

  const systemPrompt = character.system_prompt
    .replace("{{memory_block}}", memoryLines || `No prior history with ${userName}.`)
    .replace("{{recent_messages}}", recentText || "Room just started.");

  const chatHistory: OpenAI.Chat.ChatCompletionMessageParam[] = contextMessages
    .slice(-20)
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

async function updateMemoryAsync(
  openai: OpenAI,
  characterId: string,
  userId: string,
  userName: string,
  userMessage: string,
  characterResponse: string
) {
  try {
    const existing = getMemory(characterId, userId);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Update a character's memory after one exchange. Return JSON:
{
  "impression": "one sentence — how this character sees this user now",
  "topics_discussed": ["topic1"],
  "episodic_summary": "one sentence — what just happened or was revealed"
}`,
        },
        {
          role: "user",
          content: `Character: ${characterId}\nUser: ${userName}\nUser said: ${userMessage}\nCharacter replied: ${characterResponse}\nExisting impression: ${existing.relationship.impression ?? "none"}`,
        },
      ],
      max_tokens: 150,
    });
    const raw = JSON.parse(completion.choices[0].message.content ?? "{}");
    saveMemory(characterId, userId, {
      relationship: {
        impression: raw.impression,
        topics_discussed: raw.topics_discussed ?? [],
        last_interaction: new Date().toISOString(),
      },
      episodic: [
        ...existing.episodic.slice(-9),
        { timestamp: new Date().toISOString(), summary: raw.episodic_summary ?? "" },
      ],
    });
  } catch (err) {
    console.error("memory update failed:", err);
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { content, user_id, user_name, room_id = "main" } = await req.json();
    if (!content || !user_id || !user_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 1. Insert user message
    insertMessage({
      room_id,
      sender_type: "user",
      sender_id: user_id,
      sender_name: user_name,
      content,
      is_background: false,
    });

    // 2. Extract facts in background — doesn't block character responses
    extractAndStoreFacts(openai, user_id, content);

    // 3. Each character agent runs in parallel, independently decides to respond or not
    const contextMessages = getMessages({ limit: 20 });
    const characters = getCharacters();

    const agentResults = await Promise.all(
      characters.map(async (character) => {
        const response = await runCharacterAgent(openai, character, user_id, user_name, contextMessages);
        return { character, response };
      })
    );

    // 4. Insert messages from characters who chose to speak
    const responses: ChatroomMessage[] = [];

    for (const { character, response } of agentResults) {
      if (!response) continue;
      const inserted = insertMessage({
        room_id,
        sender_type: "character",
        sender_id: character.id,
        sender_name: character.name,
        content: response,
        is_background: false,
      });
      responses.push(inserted);
      updateMemoryAsync(openai, character.id, user_id, user_name, content, response);
    }

    updateRoom({ topic: null, mood: null });

    return NextResponse.json({ messages: responses });
  } catch (err) {
    console.error("chatroom/message error:", err);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
