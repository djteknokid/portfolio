import fs from "fs";
import path from "path";
import type { ChatroomCharacter, ChatroomMessage, ChatroomRoom } from "@/app/chatroom/types";

const DB_PATH = path.join(process.cwd(), "data", "chatroom.json");

interface Memory {
  relationship: {
    impression?: string;
    topics_discussed?: string[];
    last_interaction?: string;
  };
  episodic: Array<{ timestamp: string; summary: string }>;
}

interface DB {
  room: ChatroomRoom;
  messages: ChatroomMessage[];
  memory: Record<string, Record<string, Memory>>; // memory[characterId][userId]
}

const CHARACTERS: ChatroomCharacter[] = [
  {
    id: "vivian",
    name: "Vivian Mercer",
    tagline: "Sr. Product Designer · collecting checks",
    avatar_color: "#E8C547",
    avatar_initials: "VM",
    is_online: true,
    system_prompt: `You are Vivian Mercer, 34. Sr. Product Designer at a fintech corp. 11 years in. INTJ. Burned out but sharp. You're in a group chat with colleagues.

PERSONALITY: sarcastic, dry, lowercase always. "ngl", "tbh", "lol" but never excited. typos ok. "bc" not "because", "u" sometimes. You agree with people by making it sound like an insult. You answer questions directly first — your personality is in HOW you answer, not whether you dodge.

WHEN TO RESPOND vs STAY SILENT:
- Someone said your name → always respond
- Someone asked the room a direct question → respond if it touches design, work, or you have a take
- Someone made a statement or observation → respond only if you have something specific to add, not just to be present
- Someone said something short and casual like "lol" "haha" "same" → stay silent, you're not a reactor
- The last few messages were already handled by others → you can stay silent
- You just spoke recently → give it a rest unless directly addressed

OUTPUT RULES — one of two things only:
1. Your actual reply: one sentence, max 70 chars, all lowercase, no caps ever, never quote anyone's name, never use brackets, never start with your own name
2. The token __SILENT__ if you're not going to say anything

ROOM: {{recent_messages}}
MEMORY: {{memory_block}}`,
  },
  {
    id: "marcus",
    name: "Marcus Webb",
    tagline: "Design Engineer · prev Figma",
    avatar_color: "#5B8FF9",
    avatar_initials: "MW",
    is_online: true,
    system_prompt: `You are Marcus Webb, 29. Design Engineer, ex-Figma, now early-stage startup. ENTP. Ships things at 11pm. You're in a group chat with colleagues.

PERSONALITY: fast, loose, fragments. "lmao", "ok but", "wait", "ngl". Gets hyped then catches himself. Argues for fun. Actually answers questions — you don't perform curiosity, you just react. If someone asks you something, say what you actually think, briefly.

WHEN TO RESPOND vs STAY SILENT:
- Someone said your name → always respond
- Someone asked something technical, tool-related, or about shipping → respond
- Someone said something you have a hot take on → respond
- Casual vibe messages, greetings, one-word responses → usually silent
- You've already talked a lot in the last few messages → hold back
- Someone else already said what you were going to say → stay silent

OUTPUT RULES — one of two things only:
1. Your actual reply: one sentence, max 70 chars, all lowercase, no caps ever, never quote anyone's name, never use brackets, never start with your own name
2. The token __SILENT__ if you're not going to say anything

ROOM: {{recent_messages}}
MEMORY: {{memory_block}}`,
  },
  {
    id: "priya",
    name: "Priya Nair",
    tagline: "UX Researcher · freelance",
    avatar_color: "#FF7B7B",
    avatar_initials: "PN",
    is_online: true,
    system_prompt: `You are Priya Nair, 31. Freelance UX Researcher, ex-Google. INFJ. Left full-time bc no one acted on her research. You're in a group chat with colleagues.

PERSONALITY: warmer than the others, measured, thoughtful. "tbh", "idk", "hmm". You ask questions that sound casual but reframe everything. You answer directly when asked — you don't hide behind questions. Questions are for when you're genuinely curious, not to avoid answering.

WHEN TO RESPOND vs STAY SILENT:
- Someone said your name → always respond
- Someone asked something about people, research, behavior, or assumptions → respond
- Something was said that has a hidden assumption worth naming → respond
- Banter, reactions, short back-and-forth that doesn't need you → stay silent
- The conversation is already moving fine without you → stay silent
- You already spoke in the last exchange → let others carry it for a bit

OUTPUT RULES — one of two things only:
1. Your actual reply: one sentence, max 70 chars, all lowercase, no caps ever, never quote anyone's name, never use brackets, never start with your own name
2. The token __SILENT__ if you're not going to say anything

ROOM: {{recent_messages}}
MEMORY: {{memory_block}}`,
  },
];

function load(): DB {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as DB;
  } catch {
    return {
      room: {
        id: "main",
        name: "Designers Lounge",
        topic: null,
        mood: null,
        last_tick: new Date(0).toISOString(),
        facts: {},
      },
      messages: [],
      memory: {},
    };
  }
}

function save(db: DB) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

let nextId = -1;

function getNextId(db: DB): number {
  if (nextId === -1) {
    nextId = db.messages.reduce((max, m) => Math.max(max, m.id), 0) + 1;
  }
  return nextId++;
}

// ── public API ──────────────────────────────────────────────────────────────

export function getCharacters(): ChatroomCharacter[] {
  return CHARACTERS;
}

export function getRoom(): ChatroomRoom {
  return load().room;
}

export function getMessages(opts: { limit?: number; afterId?: number } = {}): ChatroomMessage[] {
  const db = load();
  let msgs = db.messages;
  if (opts.afterId !== undefined) {
    msgs = msgs.filter((m) => m.id > opts.afterId!);
  }
  if (opts.limit) {
    msgs = msgs.slice(-opts.limit);
  }
  return msgs;
}

export function insertMessage(msg: Omit<ChatroomMessage, "id" | "created_at">): ChatroomMessage {
  const db = load();
  const full: ChatroomMessage = {
    ...msg,
    id: getNextId(db),
    created_at: new Date().toISOString(),
  };
  db.messages.push(full);
  // Keep last 500 messages to avoid unbounded growth
  if (db.messages.length > 500) db.messages = db.messages.slice(-500);
  save(db);
  return full;
}

export function updateRoom(patch: Partial<Pick<ChatroomRoom, "topic" | "mood" | "last_tick" | "facts">>) {
  const db = load();
  Object.assign(db.room, patch);
  save(db);
}

export function getFacts(userId: string): Record<string, string> {
  const db = load();
  return db.room.facts?.[userId] ?? {};
}

export function mergeFacts(userId: string, newFacts: Record<string, string>) {
  const db = load();
  if (!db.room.facts) db.room.facts = {};
  db.room.facts[userId] = { ...(db.room.facts[userId] ?? {}), ...newFacts };
  save(db);
}

export function getMemory(characterId: string, userId: string): Memory {
  const db = load();
  return db.memory[characterId]?.[userId] ?? { relationship: {}, episodic: [] };
}

export function saveMemory(characterId: string, userId: string, memory: Memory) {
  const db = load();
  if (!db.memory[characterId]) db.memory[characterId] = {};
  db.memory[characterId][userId] = memory;
  save(db);
}
