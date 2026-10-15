import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { DIRECTOR_PROMPT } from "./director-prompt";
import { resolveWikimediaImages } from "./resolve-images";

function fireEvaluation(
  resolved: Record<string, unknown>,
  topic: string,
  intent: SessionIntent | null,
  currentFocus: string | null,
  sessionDepth: number,
  completedQuestions: string[],
  baseUrl: string,
  experiment: string | null,
) {
  const card = resolved.card as Record<string, unknown> | undefined;
  if (!card) return;

  const nextDirections = (resolved.nextDirections as { type: string; description: string }[] | undefined) ?? [];

  const payload = {
    questionTitle: (card.title as string) ?? topic,
    mechanic: (card.mechanic as string) ?? "unknown",
    content: card,
    knowledgeReveal: (card.knowledgeReveal as string) ?? "",
    conversationTakeaway: (card.conversationTakeaway as string) ?? "",
    nextDirections,
    topic,
    intent,
    currentFocus,
    sessionDepth,
    completedQuestions,
    experiment,
  };

  fetch(`${baseUrl}/api/nuggets/interests/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("[interests] evaluation fire failed:", err));
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ImageMatchPair = { id: string; searchTerm: string; right: string };
type ResolvedPair  = { id: string; left: string; right: string; imageUrl?: string };

async function generate(userPrompt: string) {
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

  return JSON.parse(raw);
}

async function resolveImageMatching(parsed: Record<string, unknown>) {
  if ((parsed.card as Record<string, unknown>)?.mechanic !== "image-matching") return parsed;

  const card = parsed.card as Record<string, unknown>;
  const pairs: ImageMatchPair[] = Array.isArray(card.pairs) ? card.pairs : [];
  const terms = pairs.map((p) => p.searchTerm).filter(Boolean);
  const images = await resolveWikimediaImages(terms, 400);

  const resolved: ResolvedPair[] = pairs.map((p) => ({
    id: p.id,
    left: p.searchTerm,
    right: p.right,
    imageUrl: images[p.searchTerm] ?? undefined,
  }));

  const withImages = resolved.filter((p) => p.imageUrl);
  card.mechanic = "matching";
  card.pairs = withImages.length >= 3 ? withImages : pairs.map((p) => ({ id: p.id, left: p.searchTerm, right: p.right }));
  return parsed;
}

async function resolveHeroImage(parsed: Record<string, unknown>): Promise<Record<string, unknown>> {
  const card = parsed.card as Record<string, unknown> | undefined;
  if (!card) return parsed;
  const searchTerm = card.heroSearchTerm as string | undefined;
  if (!searchTerm) return parsed;
  try {
    const images = await resolveWikimediaImages([searchTerm], 800);
    const url = images[searchTerm];
    if (url) card.heroImageUrl = url;
  } catch {
    // non-fatal — hero falls back to gradient
  }
  return parsed;
}

type SessionIntent = {
  learningIntent: string;
  learningOrientation: string;
  desiredOutcome: string;
  startingFocus: string;
  avoidDrift: string[];
};

export async function POST(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const {
    topic,
    history = [],
    completedQuestions = [],
    recentMechanics = [],
    intent = null,
    currentFocus = null,
    experiment = null,
  } = await req.json() as {
    topic: string;
    history?: string[];
    completedQuestions?: string[];
    recentMechanics?: string[];
    intent?: SessionIntent | null;
    currentFocus?: string | null;
    experiment?: "intent-recovery" | null;
  };

  const historyClause = history.length > 0
    ? `\nTopics already explored this session (do not repeat): ${history.join(", ")}`
    : "";

  const completedClause = completedQuestions.length > 0
    ? `\nQuestions the learner has already answered. Do not repeat any of these — and do not generate a question that covers the same core subject or mechanic structure as any of them, even with different examples:\n${completedQuestions.slice(-20).map((q) => `- "${q}"`).join("\n")}`
    : "";

  const mechanicsClause = recentMechanics.length > 0
    ? `\nRecent mechanics used: ${recentMechanics.slice(-3).join(", ")}. You MUST pick a different mechanic — do NOT use multiple-choice if it appears in this list unless all other mechanics are clearly unsuitable.`
    : "\nThis is the first card. Prefer image-matching, matching, grouping, or sequence over multiple-choice.";

  const depthClause = history.length === 0
    ? "\nSession depth: FIRST question — beginner level. No specialist names or jargon. The player should be able to attempt this without any prior knowledge of the topic."
    : history.length <= 2
    ? `\nSession depth: early (${history.length} questions in) — introduce one new concept but keep familiar anchors.`
    : `\nSession depth: ${history.length} questions in — learner is building familiarity, specialist content is appropriate.`;

  const isSpecificQuestion = topic.trim().endsWith("?");

  // Experiment: intent-recovery — inject a breadth signal at depth >= 3
  // Does NOT override the current card topic. Only requires one of three nextDirections
  // to offer a route back to the original learning goal.
  const orientationExamples: Record<string, string> = {
    practical: "a concrete scenario, skill, or decision the learner can use immediately",
    appreciation: "a different band, era, piece, or sensory experience — not a more detailed classification of the current subject",
    conceptual: "a broader principle or a contrasting case that reframes the current concept",
    historical: "a different period, actor, or cause that connects back to the main story",
    exploratory: "an adjacent angle that serves the original curiosity goal",
    mixed: "a direction that reconnects with the learner's original reason for exploring this topic",
  };
  const escapeExample = intent
    ? (orientationExamples[intent.learningOrientation] ?? orientationExamples.mixed)
    : "";

  const breadthClause = (experiment === "intent-recovery" && history.length >= 3 && intent)
    ? `\nNavigation escape hatch (experiment): The learner has made ${history.length} selections. At least ONE of the three nextDirections must offer a meaningful route back to the original goal ("${intent.learningIntent}"). This means ${escapeExample}. The other two directions may continue the current thread. Do not change the current card's topic or question.`
    : "";

  const intentClause = intent
    ? `\nLearning context:
- Original intent (set once, do not overwrite): ${intent.learningIntent}
- Orientation: ${intent.learningOrientation}
- Desired outcome: ${intent.desiredOutcome}
- Current focus (player's recent exploration): ${currentFocus ?? intent.startingFocus}
- Latest choice (strongest signal): ${topic}
- Avoid drifting into (advisory, not a hard rule): ${intent.avoidDrift.join(", ")}

Priority: latest choice > current focus > original intent. Follow the player — but a single choice does not permanently change the intent.${breadthClause}`
    : "";

  const qualityReminder = `\nBefore outputting, check:
- matching: no left/right pair is a synonym or paraphrase of each other — connection must require knowledge.
- grouping: question title describes what is being sorted, not just the topic name.
- image-matching: every searchTerm is an exact Wikipedia article title.
- sequence: each step directly causes the next — if steps could be reordered without breaking logic, choose a different mechanic.
- title + mechanic + reveal all point at the same learning objective.
- all three nextDirections descriptions are genuinely different learning angles, not variations of the same question.`;

  const userPrompt = isSpecificQuestion
    ? `The learner selected this specific question to explore: "${topic}"

IMPORTANT: The card's "question" field MUST be exactly: "${topic}"
Do not rewrite, rephrase, or replace it. Build the interactive card around this exact question.
${historyClause}${completedClause}${mechanicsClause}${depthClause}${intentClause}${qualityReminder}

Generate one high-quality question card and three next directions.`
    : `The learner wants to explore: "${topic}"
${historyClause}${completedClause}${mechanicsClause}${depthClause}${intentClause}${qualityReminder}

Generate one high-quality question card and three next directions.`;

  // Attempt generation with one retry on parse or structural failure
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const parsed = await generate(userPrompt);
      const [resolved] = await Promise.all([
        resolveImageMatching(parsed),
        resolveHeroImage(parsed),
      ]);
      fireEvaluation(resolved, topic, intent, currentFocus, history.length, completedQuestions, baseUrl, experiment);
      return NextResponse.json(resolved);
    } catch (err) {
      if (attempt === 1) {
        console.error("[interests] Both generation attempts failed:", err);
        return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
      }
      // Brief pause before retry
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
}
