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

const MUSIC_KEYWORDS = [
  "music", "song", "songs", "band", "bands", "artist", "artists", "album", "albums",
  "rock", "jazz", "pop", "hip hop", "hip-hop", "rap", "classical", "blues", "soul",
  "country", "metal", "punk", "folk", "r&b", "rnb", "electronic", "edm", "techno",
  "orchestra", "piano", "guitar", "drums", "violin", "concert", "genre", "genres",
  "musician", "musicians", "singer", "singers", "composer", "composers",
];

function isMusicTopic(topic: string): boolean {
  const lower = topic.toLowerCase();
  return MUSIC_KEYWORDS.some((kw) => lower.includes(kw));
}

// Verified YouTube video IDs (checked via oEmbed 2026-10-15)
// Format: { tags: string[], id: string, title: string }
const VERIFIED_MUSIC_VIDEOS = [
  // Jazz
  { tags: ["jazz", "miles davis", "so what", "kind of blue"],       id: "zqNTltOGh5c", title: "Miles Davis - So What" },
  { tags: ["jazz", "coltrane", "my favorite things"],               id: "XVw3A6VjsOE", title: "John Coltrane - My Favorite Things" },
  { tags: ["jazz", "dave brubeck", "take five"],                    id: "vmDDOFXSgAs", title: "Dave Brubeck - Take Five" },
  { tags: ["jazz", "louis armstrong", "wonderful world"],           id: "CaCSuzR4DwM", title: "Louis Armstrong - What A Wonderful World" },
  { tags: ["jazz", "coltrane", "a love supreme"],                   id: "ni9Cp9mOOOg", title: "John Coltrane - A Love Supreme" },
  { tags: ["jazz", "bill evans", "autumn leaves"],                  id: "IrAfjW5qiyo", title: "Bill Evans - Autumn Leaves" },
  // Classic rock
  { tags: ["queen", "bohemian rhapsody", "classic rock", "rock"],   id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody" },
  { tags: ["nirvana", "smells like teen spirit", "grunge", "rock"], id: "hTWKbfoikeg", title: "Nirvana - Smells Like Teen Spirit" },
  { tags: ["guns n roses", "sweet child", "rock"],                  id: "1w7OgIMMRc4", title: "Guns N' Roses - Sweet Child O' Mine" },
  { tags: ["seven nation army", "white stripes", "rock"],           id: "0J2QdDbelmY", title: "The White Stripes - Seven Nation Army" },
  { tags: ["linkin park", "in the end", "rock", "alternative"],     id: "eVTXPUF4Oz4", title: "Linkin Park - In The End" },
  // Pop
  { tags: ["michael jackson", "billie jean", "pop"],                id: "Zi_XLOBDo_Y", title: "Michael Jackson - Billie Jean" },
  { tags: ["michael jackson", "smooth criminal", "pop"],            id: "h_D3VFfhvs4", title: "Michael Jackson - Smooth Criminal" },
  { tags: ["ed sheeran", "shape of you", "pop"],                    id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You" },
  { tags: ["uptown funk", "bruno mars", "mark ronson", "pop"],      id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars" },
  { tags: ["taylor swift", "shake it off", "pop"],                  id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off" },
  { tags: ["sia", "chandelier", "pop"],                             id: "2vjPBrBU-TM", title: "Sia - Chandelier" },
  { tags: ["all of me", "john legend", "pop", "soul"],              id: "450p7goxZqg", title: "John Legend - All of Me" },
  // Hip-hop / rap
  { tags: ["eminem", "rap", "hip hop", "hip-hop"],                  id: "uelHwf8o7_U", title: "Eminem - Love The Way You Lie" },
  { tags: ["wiz khalifa", "see you again", "hip hop", "rap"],       id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again" },
  { tags: ["lean on", "major lazer", "dj snake", "edm", "pop"],     id: "YqeW9_5kURI", title: "Major Lazer - Lean On" },
  // Classics / timeless
  { tags: ["imagine", "john lennon", "beatles", "classic"],         id: "YkgkThdzX-8", title: "John Lennon - Imagine" },
  { tags: ["jeff buckley", "hallelujah", "classic"],                id: "y8AWFf7EAc4", title: "Jeff Buckley - Hallelujah" },
  { tags: ["thinking out loud", "ed sheeran", "pop"],               id: "lp-EO5I60KA", title: "Ed Sheeran - Thinking Out Loud" },
];

function pickFallbackVideoId(topic: string): string {
  const lower = topic.toLowerCase();
  // Find best match by counting tag hits
  let best = VERIFIED_MUSIC_VIDEOS[0];
  let bestScore = 0;
  for (const v of VERIFIED_MUSIC_VIDEOS) {
    const score = v.tags.filter(t => lower.includes(t)).length;
    if (score > bestScore) { bestScore = score; best = v; }
  }
  return best.id;
}

async function resolveYouTubeVideo(parsed: Record<string, unknown>, topic: string): Promise<Record<string, unknown>> {
  const card = parsed.card as Record<string, unknown> | undefined;
  if (!card) return parsed;
  const videoId = card.youtubeVideoId as string | undefined;

  let resolvedId: string | null = null;

  // Try the AI's suggested ID first
  if (videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId)) {
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (res.ok) {
        resolvedId = videoId;
      } else {
        console.warn(`[interests] YouTube ${videoId} unavailable (${res.status}) — using fallback`);
      }
    } catch {
      console.warn(`[interests] YouTube oEmbed fetch failed — using fallback`);
    }
  }

  // Fall back to a verified ID matched to the topic
  if (!resolvedId && card.youtubeVideoId !== undefined) {
    resolvedId = pickFallbackVideoId(topic);
  }

  if (!resolvedId) return parsed;

  delete card.youtubeVideoId;
  card.mediaUrl = `https://www.youtube.com/embed/${resolvedId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1`;
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

  const isMusicSession = isMusicTopic(topic);
  // First card + every 3rd card in a music session gets YouTube multiple-choice
  const isMusicYouTubeCard = isMusicSession && (history.length === 0 || history.length % 3 === 2);

  const musicClause = isMusicYouTubeCard
    ? `\nMUSIC YOUTUBE CARD — This is a music topic. You MUST:
1. Use mechanic: "multiple-choice"
2. Include a "youtubeVideoId" field with an exact 11-character YouTube video ID of a well-known, widely available recording directly relevant to the question. Only include a video ID you are confident is correct (e.g. "fJ9rUzIMcZQ" for Bohemian Rhapsody by Queen). If you are not confident of any specific video ID for this topic, omit the field rather than guessing.
3. Frame the question so the player can listen first, then answer.`
    : isMusicSession
    ? `\nMUSIC SESSION — This is a music topic. Consider using image-matching, matching, grouping, or sequence to vary from multiple-choice.`
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
${historyClause}${completedClause}${mechanicsClause}${depthClause}${intentClause}${musicClause}${qualityReminder}

Generate one high-quality question card and three next directions.`
    : `The learner wants to explore: "${topic}"
${historyClause}${completedClause}${mechanicsClause}${depthClause}${intentClause}${musicClause}${qualityReminder}

Generate one high-quality question card and three next directions.`;

  // Attempt generation with one retry on parse or structural failure
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const parsed = await generate(userPrompt);
      await Promise.all([
        resolveImageMatching(parsed),
        resolveHeroImage(parsed),
        resolveYouTubeVideo(parsed, topic),
      ]);
      fireEvaluation(parsed, topic, intent, currentFocus, history.length, completedQuestions, baseUrl, experiment);
      return NextResponse.json(parsed);
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
