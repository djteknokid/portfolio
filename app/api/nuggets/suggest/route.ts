import { NextRequest, NextResponse } from "next/server";

type Card = {
  question: string;
  story_engine?: string;
  sequence: { id: string; text: string }[];
};

async function generate(body: {
  completed: Card[];
  seed?: string;
  skipped?: string[];
}): Promise<Card[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/nuggets/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const { candidates } = await res.json();
  return Array.isArray(candidates) ? candidates : [];
}

async function evaluate(candidates: Card[]): Promise<Card[]> {
  if (candidates.length === 0) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/nuggets/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidates }),
  });
  const { survivors } = await res.json();
  return Array.isArray(survivors) ? survivors : [];
}

export async function POST(req: NextRequest) {
  const { completed, seed, skipped } = await req.json() as {
    completed: Card[];
    seed?: string;
    skipped?: string[];
  };

  // 1. Generate candidates
  const candidates = await generate({ completed, seed, skipped });

  // 2. Evaluate
  let survivors = await evaluate(candidates);

  // 3. Retry once if fewer than 4 survived
  if (survivors.length < 4) {
    const usedQuestions = candidates.map((c) => c.question);
    const moreSkipped = [...(skipped ?? []), ...usedQuestions];
    const moreCandidates = await generate({ completed, seed, skipped: moreSkipped });
    const moreSurvivors = await evaluate(moreCandidates);
    survivors = [...survivors, ...moreSurvivors];
  }

  // 4. Return top 4 (client saves drafts to localStorage)
  const cards = survivors.slice(0, 4);

  // Fallback: if evaluator rejected everything, return best raw candidates
  if (cards.length === 0) {
    return NextResponse.json({
      cards: candidates.slice(0, 4),
      source: "generated_unscored",
    });
  }

  return NextResponse.json({ cards, source: "generated" });
}
