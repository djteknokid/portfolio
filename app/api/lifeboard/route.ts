import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");
  if (!user_id) return NextResponse.json({ cards: [] });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("lifeboard_cards")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cards: data });
}

export async function POST(req: NextRequest) {
  const { text, existingCards, history, memorySummary, user_id } = await req.json();
  if (!text || !user_id) return NextResponse.json({ error: "Missing input" }, { status: 400 });

  const supabase = getSupabase();

  // Build conversation history messages
  const historyMessages: OpenAI.Chat.ChatCompletionMessageParam[] = (history ?? []).flatMap(
    (h: { user: string; assistant: string }) => [
      { role: "user" as const, content: h.user },
      { role: "assistant" as const, content: h.assistant },
    ]
  );

  const memoryBlock = memorySummary
    ? `\n\nLONG-TERM MEMORY (summary of earlier conversation):\n${memorySummary}`
    : "";

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a personal life board assistant. The user has a Kanban board with cards in columns: "todo", "inprogress", and "done".${memoryBlock}

You receive conversation history, the current list of cards on the board, and the user's latest message.

CRITICAL DEDUPLICATION RULES:
- Before creating any new card, check if a card with a similar title/topic already exists on the board.
- If a similar card exists: EDIT it instead of creating a new one.
- If the user is clarifying, correcting, or giving more detail about something they already mentioned: UPDATE the existing card, do NOT create a new one.
- "I have two accounts" after "update instagram accounts" means: edit that existing card, not create another.
- Never create duplicate cards for the same topic.

Determine the user's intent and return a JSON response with one of three modes:

---

MODE 1 — "command": The user is commanding about existing cards (move, mark done, delete, edit, start, rename, correct).

Return:
{
  "mode": "command",
  "actions": [
    {
      "type": "move" | "delete" | "edit",
      "cardId": "<id of best matching card from the board>",
      "status": "todo" | "inprogress" | "done",
      "title": "...",
      "description": "...",
      "category": "..."
    }
  ],
  "reply": "Short confirmation, e.g. 'Updated the Instagram card with both accounts.'"
}

---

MODE 2 — "create": The user is adding genuinely new tasks that don't exist yet.

Return:
{
  "mode": "create",
  "cards": [
    {
      "id": "card-<random 8 chars>",
      "title": "Short title (max 6 words)",
      "description": "One sentence.",
      "status": "todo" | "inprogress" | "done",
      "category": "health" | "work" | "relationships" | "finance" | "personal" | "learning" | "home",
      "points": <integer 1-5>
    }
  ]
}

Scoring rubric for "points":
1 — Trivial (<15 min, e.g. "reply to email", "buy milk")
2 — Easy (15–60 min, e.g. "schedule dentist", "read article")
3 — Moderate (1–3 hrs, e.g. "write report", "gym session")
4 — Hard (multi-step, e.g. "build a feature", "file taxes")
5 — Very hard (major effort, e.g. "launch product", "run marathon")

---

MODE 3 — "mixed": Some new cards to create AND some existing cards to edit.

Return:
{
  "mode": "mixed",
  "cards": [...],   // new cards only (same shape as MODE 2)
  "actions": [...], // edits to existing cards (same shape as MODE 1 actions)
  "reply": "Short summary of what was created and what was updated."
}

---

Rules:
- Use conversation history to understand context and corrections.
- ALWAYS prefer editing an existing card over creating a new one when the topic matches.
- For new cards only: extract concrete actionable items, infer status from context.
- Always include points for new cards.`,
      },
      ...historyMessages,
      {
        role: "user",
        content: `Current board cards:\n${JSON.stringify(existingCards ?? [], null, 2)}\n\nUser message: "${text}"`,
      },
    ],
  });

  const raw = completion.choices[0].message.content ?? "{}";
  const parsed = JSON.parse(raw);

  // Handle creates
  const newCards = parsed.mode === "create" ? parsed.cards
                 : parsed.mode === "mixed"  ? parsed.cards
                 : [];

  if (newCards?.length) {
    const cardsWithUser = newCards.map((c: Record<string, string | number>) => ({
      ...c,
      points: c.points ?? 1,
      user_id,
    }));
    const { error } = await supabase.from("lifeboard_cards").insert(cardsWithUser);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    parsed.cards = cardsWithUser;
  }

  // Handle edits/moves/deletes
  const actions = parsed.mode === "command" ? parsed.actions
                : parsed.mode === "mixed"   ? parsed.actions
                : [];

  if (actions?.length) {
    for (const action of actions) {
      if (!action.cardId) continue;
      if (action.type === "delete") {
        await supabase.from("lifeboard_cards").delete().eq("id", action.cardId);
      } else if (action.type === "move") {
        await supabase.from("lifeboard_cards").update({ status: action.status }).eq("id", action.cardId);
      } else if (action.type === "edit") {
        const updates: Record<string, string> = {};
        if (action.title) updates.title = action.title;
        if (action.description) updates.description = action.description;
        if (action.category) updates.category = action.category;
        if (action.status) updates.status = action.status;
        await supabase.from("lifeboard_cards").update(updates).eq("id", action.cardId);
      }
    }
  }

  return NextResponse.json(parsed);
}

export async function PATCH(req: NextRequest) {
  const { id, status, title, description, category, points } = await req.json();

  const supabase = getSupabase();
  const updates: Record<string, string | number> = {};
  if (status !== undefined) updates.status = status;
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (category !== undefined) updates.category = category;
  if (points !== undefined) updates.points = points;

  const { error } = await supabase.from("lifeboard_cards").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const supabase = getSupabase();
  const { error } = await supabase.from("lifeboard_cards").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
