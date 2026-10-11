import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { DIRECTOR_PROMPT } from "./director-prompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { topic, history = [], completedQuestions = [], recentMechanics = [] } = await req.json() as {
    topic: string;
    history?: string[];
    completedQuestions?: string[];
    recentMechanics?: string[];
  };

  const historyClause = history.length > 0
    ? `\nTopics already explored this session (do not repeat): ${history.join(", ")}`
    : "";

  const completedClause = completedQuestions.length > 0
    ? `\nQuestions the learner has already answered (do not repeat):\n${completedQuestions.slice(-20).map((q) => `- "${q}"`).join("\n")}`
    : "";

  const mechanicsClause = recentMechanics.length > 0
    ? `\nRecent mechanics used: ${recentMechanics.slice(-3).join(", ")} — vary the mechanic.`
    : "";

  const userPrompt = `The learner wants to explore: "${topic}"
${historyClause}${completedClause}${mechanicsClause}

Generate one high-quality question card and three next directions.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: DIRECTOR_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 2500,
    temperature: 0.85,
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
