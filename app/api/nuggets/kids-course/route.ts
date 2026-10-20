import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { resolveWikimediaImages } from "../interests/resolve-images";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type CourseQuestion = {
  hook: string;   // the wow fact / answer — never shown before player answers
  title: string;  // the question shown to the player
  topic: string;  // passed to card generator — includes hook context
  pillar?: "hook" | "who" | "breakthrough" | "mindset" | "surprise" | "impact" | "character" | "deeper" | "connection" | "legacy";
};

export async function POST(req: NextRequest) {
  const { personName, kidAge = 8, answeredQuestions = [], portraitOnly = false } = await req.json() as { personName: string; kidAge?: number; answeredQuestions?: string[]; portraitOnly?: boolean };

  if (!personName) return NextResponse.json({ error: "Missing personName" }, { status: 400 });

  // Fast path: just return the portrait, no outline generation
  if (portraitOnly) {
    try {
      const portraits = await resolveWikimediaImages([personName], 800);
      return NextResponse.json({ portraitUrl: portraits[personName] ?? null });
    } catch {
      return NextResponse.json({ portraitUrl: null });
    }
  }

  const answeredClause = answeredQuestions.length > 0
    ? `\nIMPORTANT — This child has already answered these questions about ${personName}. Do NOT repeat or closely overlap any of these topics:\n${answeredQuestions.slice(0, 30).map((q, i) => `${i + 1}. ${q}`).join("\n")}\n\nDesign the 10 new questions to cover ground they have NOT explored yet.\n`
    : "";

  const prompt = `You are a curriculum designer creating a 10-question course about "${personName}" for a ${kidAge}-year-old child.${answeredClause}

Your job is to design a journey — a sequence of 10 questions that builds from "who is this person?" to "now I understand why they matter."

For each question you must provide THREE things:
- hook: the jaw-dropping fact or surprising truth (this is the WOW — it is the answer, never shown to the player until after they answer)
- question: what to ASK the player — written WITHOUT revealing the hook. The question must create curiosity about the hook without giving it away.
- topic: a specific phrase (5–10 words) passed to the card generator — must include both the question angle AND the hook so the card generator knows what the answer is

CRITICAL: The question must NEVER contain the answer. The hook is revealed AFTER the player answers.
BAD: "Serena Williams won 23 Grand Slam titles. What does this mean?" — the answer is in the question.
GOOD: "How many Grand Slam titles has any woman ever won in tennis history?" — creates curiosity, answer is the hook.
BAD: "Marie Curie discovered Radium which glows. What color does it glow?" — gives away the discovery.
GOOD: "What did Marie Curie discover that she kept glowing on her bedside table?" — answer is still hidden.

---

COURSE STRUCTURE — follow this exact arc:

Q1  HOOK          — The single most jaw-dropping fact. Opens with maximum awe.
Q2  WHO           — Their most famous achievement. Establishes who they are.
Q3  BREAKTHROUGH  — Something they did that had never been done before.
Q4  MINDSET       — How they thought differently. A specific habit or method.
Q5  SURPRISE      — A fact that contradicts what the child probably expects.
Q6  IMPACT        — What concretely changed in the world because of them.
Q7  CHARACTER     — What kind of person they were, shown through a specific moment.
Q8  DEEPER        — A detail only someone paying attention would know.
Q9  CONNECTION    — How their work connects to the child's everyday life today.
Q10 LEGACY        — The most powerful closing wow. What would be missing without them?

---

RULES:
- NO TWO questions about the same subject
- Every question must be answerable by a ${kidAge}-year-old — no jargon
- NEVER mention war, violence, death, slavery, discrimination, or anything dark
- Reframe dark history as inspiring achievement

Return valid JSON only:
{
  "questions": [
    {
      "hook": "the wow fact / answer (never shown before the player answers)",
      "title": "the question shown to the player (must NOT reveal the hook)",
      "topic": "PersonName — specific subject including the hook fact (5-10 words)",
      "pillar": "hook | who | breakthrough | mindset | surprise | impact | character | deeper | connection | legacy"
    },
    ...10 total, in order Q1 through Q10
  ]
}

Example for Serena Williams:
Q1: { "hook": "Serena won the Australian Open while 2 months pregnant", "title": "What is the most incredible thing Serena Williams ever did on a tennis court?", "topic": "Serena Williams — won Australian Open while pregnant 2017", "pillar": "hook" }
Q2: { "hook": "23 Grand Slam singles titles — more than any other player in the Open Era", "title": "How many Grand Slam titles has any woman ever won in the history of tennis?", "topic": "Serena Williams — 23 Grand Slam titles Open Era record", "pillar": "who" }
Q5: { "hook": "Serena won her first professional tournament at age 14", "title": "How old was Serena Williams when she beat her first professional opponent?", "topic": "Serena Williams — first tournament win at age 14", "pillar": "surprise" }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1600,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw) as { questions: CourseQuestion[] };
    const questions: CourseQuestion[] = Array.isArray(parsed.questions) ? parsed.questions.slice(0, 10) : [];

    // Resolve portrait image in parallel with nothing else to wait on
    let portraitUrl: string | null = null;
    try {
      const portraits = await resolveWikimediaImages([personName], 800);
      portraitUrl = portraits[personName] ?? null;
    } catch {
      // non-fatal
    }

    return NextResponse.json({ questions, portraitUrl });
  } catch (err) {
    console.error("[kids-course]", err);
    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 });
  }
}
