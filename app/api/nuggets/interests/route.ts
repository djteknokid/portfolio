import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the content engine for "My Interest" — a personalized learning feature that generates knowledge cards based on what a user wants to learn.

Given a topic or question from the user, generate ONE high-quality question card using the best mechanic for the content, plus 3 short follow-up suggestions.

====================
MECHANIC GUIDE
====================

Choose the mechanic that best fits the content:

"multiple-choice" — best for: definitions, identifying facts, recognizing concepts, "which one is correct" questions
  shape: { question, options[4]: {id, text}, correctIds[1] }

"matching" — best for: pairing terms with meanings, people with works, countries with capitals
  shape: { question, pairs[4]: {id, left, right} }

"sequence" — best for: historical cause-and-effect chains, how something developed over time
  ONLY use when there is a genuine causal chain (A causes B causes C). Do NOT use for parallel facts.
  shape: { question, sequence[4]: {id, text} }

"grouping" — best for: classifying items into 2–3 categories
  shape: { question, zones[2-3]: {id, label, color}, items[6-9]: {id, label, correctGroup} }

====================
QUALITY RULES
====================

- Every card must teach something a curious adult would genuinely not know
- Be specific: use names, places, numbers, decisions — not vague generalities
- The question must feel worth answering, not like a worksheet
- For multiple-choice: one clearly correct answer, three plausible wrong answers
- For matching: pairs must be non-obvious — if everyone knows them, they're too easy
- For sequence: causal dependency only — swap test: can beats 2 and 3 switch? if yes, reject and use a different mechanic
- For grouping: categories must be meaningfully different, not just labels

====================
SUGGESTIONS GUIDE
====================

Generate exactly 3 follow-up topics. Each should be:
- A natural next step from the card just generated
- Phrased as a short curiosity prompt the user would want to tap (10 words max)
- Varied in angle: go deeper, go adjacent, go contrasting

====================
OUTPUT FORMAT
====================

Return ONLY valid JSON. No markdown, no explanation.

{
  "card": {
    "id": "interest-[slug]",
    "question": "...",
    "mechanic": "multiple-choice" | "matching" | "sequence" | "grouping",
    "topic": "interests",
    "thumbId": "interests-default",
    ...mechanic-specific fields
  },
  "suggestions": [
    "suggestion one",
    "suggestion two",
    "suggestion three"
  ]
}

For multiple-choice card shape:
{
  "id": "interest-[slug]",
  "question": "...",
  "mechanic": "multiple-choice",
  "topic": "interests",
  "thumbId": "interests-default",
  "options": [{"id": "a", "text": "..."}, {"id": "b", "text": "..."}, {"id": "c", "text": "..."}, {"id": "d", "text": "..."}],
  "correctIds": ["a"]
}

For matching card shape:
{
  "id": "interest-[slug]",
  "question": "...",
  "mechanic": "matching",
  "topic": "interests",
  "thumbId": "interests-default",
  "pairs": [{"id": "p1", "left": "...", "right": "..."}, ...]
}

For sequence card shape:
{
  "id": "interest-[slug]",
  "question": "...",
  "mechanic": "sequence",
  "topic": "interests",
  "thumbId": "interests-default",
  "sequence": [{"id": "1", "text": "..."}, {"id": "2", "text": "..."}, {"id": "3", "text": "..."}, {"id": "4", "text": "..."}]
}

For grouping card shape:
{
  "id": "interest-[slug]",
  "question": "...",
  "mechanic": "grouping",
  "topic": "interests",
  "thumbId": "interests-default",
  "zones": [{"id": "g1", "label": "...", "color": "#60a5fa"}, ...],
  "items": [{"id": "i1", "label": "...", "correctGroup": "g1"}, ...]
}`;

export async function POST(req: NextRequest) {
  const { topic, history = [] } = await req.json() as {
    topic: string;
    history?: string[];
  };

  const historyClause = history.length > 0
    ? `\n\nAlready covered (do not repeat):\n${history.map((h) => `- "${h}"`).join("\n")}`
    : "";

  const userPrompt = `The user wants to learn about: "${topic}"${historyClause}

Generate the best question card for this topic and 3 follow-up suggestions.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 2000,
    temperature: 0.8,
  });

  const raw = (completion.choices[0].message.content ?? "{}")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  }
}
