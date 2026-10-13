import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { history = [] } = await req.json() as { history?: string[] };

  if (history.length === 0) {
    return NextResponse.json({ topics: [] });
  }

  const recent = history.slice(0, 30);

  const prompt = `A learner has answered these knowledge questions:

${recent.map((q) => `- "${q}"`).join("\n")}

Based on what this person has shown curiosity about, suggest exactly 6 specific topics they would likely enjoy exploring next. These should be somewhat specific (not just "history" — more like "The Silk Road" or "How jazz evolved from blues").

Rules:
- Each topic is 2–5 words
- Varied — different domains, different time periods, different scales
- Genuinely connected to patterns in what they've explored
- Not a repeat of anything they've already answered

Return only a JSON array of 6 strings. No explanation, no markdown.

Example: ["The Silk Road", "How vaccines work", "Jazz and blues origins", "Ancient Egyptian trade", "Cold War proxy wars", "How money was invented"]`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200,
    temperature: 0.8,
  });

  const raw = (completion.choices[0].message.content ?? "[]")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const topics = JSON.parse(raw) as string[];
    return NextResponse.json({ topics: Array.isArray(topics) ? topics.slice(0, 6) : [] });
  } catch {
    return NextResponse.json({ topics: [] });
  }
}
