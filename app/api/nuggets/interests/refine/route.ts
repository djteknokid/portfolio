import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { INTENT_INTERPRETER_PROMPT } from "../intent-prompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type SessionIntent = {
  topic: string;
  normalizedKeyword: string;
  learningIntent: string;
  intentSource: string;
  learningOrientation: string;
  startingFamiliarity: string;
  desiredOutcome: string;
  startingFocus: string;
  preferredMedia: string[];
  avoidDrift: string[];
};

async function generatePills(topic: string, history: string[], kidsMode = false, kidAge: number | null = null): Promise<{ label: string; bridge: boolean }[]> {
  const historyClause = history.length > 0
    ? `The learner has previously answered questions on: ${history.slice(-20).join(", ")}.

Generate exactly 3 of the 12 questions that create a surprising bridge between that history and the new topic — something the learner would not have thought to ask themselves. Label these with "bridge": true.`
    : "";

  const kidsModeClause = kidsMode
    ? `\nIMPORTANT — This is a children's section (age ${kidAge ?? "6–10"}). Every pill label must be:
- Fun, concrete, and immediately interesting to a child of that age
- Simple words only — nothing abstract or academic
- Safe: no violence, scary things, or adult topics
- Examples of good kids pills: "Baby animals", "How rainbows work", "Dinosaur facts", "Why is the sky blue", "Fastest animals"
- Examples of bad kids pills: "Societal impact", "Historical context", "Economic factors"\n`
    : "";

  const prompt = `The learner typed: "${topic}"

Generate exactly 12 short pill labels for specific, concrete sub-topics they can explore about "${topic}". Each label must be 1–3 words maximum — like a chip button, not a sentence.

${historyClause}
${kidsModeClause}
Rules:
- 1–3 words only — no questions, no full sentences
- Every label must be specific to "${topic}" — if it could appear on a pill for a completely different topic (e.g. "Key figures", "History", "Cultural impact", "Famous people"), it is too generic. Reject it.
- Think: what are the actual specific things someone curious about "${topic}" would want to explore? Name those things directly.
- Vary the angles: how it works, specific techniques, types/varieties, common mistakes, unexpected uses, sensory experience, where to start, controversies, science behind it
- ${history.length > 0 ? "Exactly 3 must bridge the learner's history to this new topic (bridge: true). The other 9 are pure topic angles (bridge: false)." : "All 12 are topic angles (bridge: false)."}

Return valid JSON only:
{
  "pills": [
    { "label": "Natural wine", "bridge": false },
    ...
  ]
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 600,
    temperature: 0.85,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content ?? "{}";
  const parsed = JSON.parse(raw) as { pills: { label: string; bridge: boolean }[] };

  if (!Array.isArray(parsed.pills) || parsed.pills.length === 0) {
    throw new Error("Invalid pills response");
  }

  return parsed.pills.slice(0, 12).map((p) => ({
    ...p,
    label: p.label.replace(/^bridge:\s*/i, "").trim(),
  }));
}

async function interpretIntent(topic: string): Promise<SessionIntent | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: INTENT_INTERPRETER_PROMPT },
        { role: "user", content: topic },
      ],
      max_tokens: 400,
      temperature: 0,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content ?? "{}";
    return JSON.parse(raw) as SessionIntent;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const { topic, history = [], kidsMode = false, kidAge = null } = await req.json() as {
    topic: string;
    history?: string[];
    kidsMode?: boolean;
    kidAge?: number | null;
  };

  if (!topic) return NextResponse.json({ error: "Missing topic" }, { status: 400 });

  try {
    const [pills, intent] = await Promise.all([
      generatePills(topic, history, kidsMode, kidAge),
      kidsMode ? Promise.resolve(null) : interpretIntent(topic),
    ]);

    return NextResponse.json({ pills, intent });
  } catch (err) {
    console.error("[interests/refine]", err);
    return NextResponse.json({ error: "Failed to generate refinements" }, { status: 500 });
  }
}
