import { NextRequest, NextResponse } from "next/server";
import { generateCandidates, evaluateCandidates } from "@/lib/nuggets/ai";

export async function POST(req: NextRequest) {
  const { completed, seed, skipped } = await req.json() as {
    completed: { question: string; sequence: { id: string; text: string }[] }[];
    seed?: string;
    skipped?: string[];
  };

  // 1. Generate candidates
  const candidates = await generateCandidates({ completed, seed, skipped });

  // 2. Evaluate
  let survivors = await evaluateCandidates(candidates);

  // 3. Retry once if fewer than 4 survived
  if (survivors.length < 4) {
    const usedQuestions = candidates.map((c) => c.question);
    const moreSkipped = [...(skipped ?? []), ...usedQuestions];
    const moreCandidates = await generateCandidates({ completed, seed, skipped: moreSkipped });
    const moreSurvivors = await evaluateCandidates(moreCandidates);
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
