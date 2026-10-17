import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { DIRECTOR_PROMPT } from "./director-prompt";
import { KIDS_PEOPLE_PROMPT } from "./kids-people-prompt";
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

async function generate(userPrompt: string, systemPrompt: string = DIRECTOR_PROMPT) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
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

// Angles that shift a music topic away from the music itself — skip YouTube card
const NON_MUSIC_ANGLES = [
  "econom", "financ", "market", "business", "industry", "revenue", "money",
  "politic", "social", "society", "culture", "cultural", "impact", "influence",
  "history", "historic", "movement", "protest", "activism", "gender", "race",
  "technolog", "algorithm", "streaming", "copyright", "legal",
];

function isMusicTopic(topic: string): boolean {
  const lower = topic.toLowerCase();
  return MUSIC_KEYWORDS.some((kw) => lower.includes(kw));
}

function isMusicVideoAppropriate(topic: string): boolean {
  const lower = topic.toLowerCase();
  // Topic must be music AND not primarily about a non-musical angle
  return isMusicTopic(lower) && !NON_MUSIC_ANGLES.some((a) => lower.includes(a));
}

// Verified YouTube video IDs (checked via oEmbed 2026-10-15)
type MusicVideo = { tags: string[]; id: string; title: string; artist: string; context: string };
const VERIFIED_MUSIC_VIDEOS: MusicVideo[] = [
  // Jazz
  { tags: ["jazz", "miles davis", "so what", "kind of blue", "modal jazz", "cool jazz"],  id: "zqNTltOGh5c", artist: "Miles Davis", title: "So What",               context: "the opening track of Kind of Blue (1959), the best-selling jazz album ever recorded, which introduced modal jazz — abandoning chord progressions for open scales" },
  { tags: ["jazz", "coltrane", "my favorite things", "free jazz"],                         id: "XVw3A6VjsOE", artist: "John Coltrane", title: "My Favorite Things",   context: "Coltrane's 1961 transformation of a Rogers & Hammerstein show tune into a 14-minute modal jazz exploration, redefining how jazz could treat familiar material" },
  { tags: ["jazz", "dave brubeck", "take five", "jazz rhythm", "time signature"],          id: "vmDDOFXSgAs", artist: "Dave Brubeck", title: "Take Five",              context: "the best-selling jazz single of all time, written in 5/4 time — a meter almost never used in popular music — by the Dave Brubeck Quartet in 1959" },
  { tags: ["jazz", "louis armstrong", "wonderful world", "dixieland jazz", "trumpet"],     id: "CaCSuzR4DwM", artist: "Louis Armstrong", title: "What a Wonderful World", context: "Armstrong's 1967 recording that became a cultural touchstone, blending jazz phrasing with popular song at a time of social upheaval in America" },
  { tags: ["jazz", "coltrane", "a love supreme", "spiritual jazz", "avant garde jazz"],    id: "ni9Cp9mOOOg", artist: "John Coltrane", title: "A Love Supreme",         context: "Coltrane's 1964 four-part suite considered his spiritual masterpiece, influencing both jazz and rock musicians for decades" },
  { tags: ["jazz", "bill evans", "autumn leaves", "piano jazz", "piano trio"],             id: "IrAfjW5qiyo", artist: "Bill Evans", title: "Autumn Leaves",            context: "Bill Evans's reharmonisation of a French cabaret song, demonstrating how jazz pianists transform popular standards into vehicles for harmonic exploration" },
  // Classic rock
  { tags: ["queen", "bohemian rhapsody", "classic rock", "rock", "opera rock", "70s rock"], id: "fJ9rUzIMcZQ", artist: "Queen", title: "Bohemian Rhapsody",           context: "the 1975 Queen recording that broke every radio rule — no chorus, six minutes long, mixing ballad, opera, and hard rock — and became one of the best-selling singles ever" },
  { tags: ["nirvana", "smells like teen spirit", "grunge", "rock", "90s rock", "alternative rock"], id: "hTWKbfoikeg", artist: "Nirvana", title: "Smells Like Teen Spirit", context: "the 1991 single that brought grunge from Seattle to global mainstream, credited with ending the dominance of 1980s hair metal" },
  { tags: ["guns n roses", "sweet child o mine", "rock", "80s rock", "hard rock"],         id: "1w7OgIMMRc4", artist: "Guns N' Roses", title: "Sweet Child O' Mine",   context: "the 1988 power ballad built around a guitar riff Slash invented as a joke warm-up exercise, which became one of the most recognisable intros in rock history" },
  { tags: ["white stripes", "seven nation army", "rock", "blues rock", "indie rock"],       id: "0J2QdDbelmY", artist: "The White Stripes", title: "Seven Nation Army", context: "the 2003 opening riff so simple it became a stadium chant worldwide, played on a guitar run through an octave pedal — many listeners still think it's a bass line" },
  { tags: ["linkin park", "in the end", "nu metal", "alternative rock", "rock"],            id: "eVTXPUF4Oz4", artist: "Linkin Park", title: "In The End",              context: "the 2000 track that blended rap and rock in a way that defined nu-metal for a generation and remains one of the most-streamed rock songs of all time" },
  { tags: ["welcome to the jungle", "guns n roses", "rock", "80s rock", "hard rock"],      id: "o1tj2zJ2Wvg", artist: "Guns N' Roses", title: "Welcome to the Jungle", context: "the opening track from Appetite for Destruction (1987) that announced GNR's arrival with one of rock's most recognisable guitar intros, written about the band's first impression of LA" },
  // Pop
  { tags: ["michael jackson", "billie jean", "pop", "80s pop", "thriller", "moonwalk"],    id: "Zi_XLOBDo_Y", artist: "Michael Jackson", title: "Billie Jean",         context: "the 1982 Thriller single during which Jackson debuted the moonwalk on Motown 25, with a bassline that producer Quincy Jones initially wanted cut from the album" },
  { tags: ["michael jackson", "smooth criminal", "pop", "80s pop", "bad era"],             id: "h_D3VFfhvs4", artist: "Michael Jackson", title: "Smooth Criminal",     context: "the 1987 Bad track featuring the gravity-defying anti-gravity lean, achieved with special shoes anchored to the stage — a move that required a patented device" },
  { tags: ["ed sheeran", "shape of you", "pop", "2010s pop"],                              id: "JGwWNGJdvx8", artist: "Ed Sheeran", title: "Shape of You",             context: "the 2017 single that became the most-streamed song on Spotify for years, originally written for Rihanna before Sheeran decided to keep it" },
  { tags: ["uptown funk", "bruno mars", "mark ronson", "pop", "funk pop"],                 id: "OPf0YbXqDm0", artist: "Mark Ronson ft. Bruno Mars", title: "Uptown Funk", context: "the 2015 funk revival that spent 14 weeks at #1, blending James Brown-era funk with 80s pop production — and triggering a copyright lawsuit from the Gap Band" },
  { tags: ["taylor swift", "shake it off", "pop", "2010s pop", "country pop"],             id: "nfWlot6h_JM", artist: "Taylor Swift", title: "Shake It Off",           context: "Swift's 2014 pivot from country to pure pop, written as a direct response to critics who said she should quit the music industry" },
  { tags: ["sia", "chandelier", "pop", "2010s pop", "art pop"],                            id: "2vjPBrBU-TM", artist: "Sia", title: "Chandelier",                     context: "the 2014 anthem written from the perspective of a party girl in crisis, with a vocal range and control that established Sia as one of pop's most technically formidable singers" },
  { tags: ["john legend", "all of me", "pop", "soul", "soul pop", "love song"],           id: "450p7goxZqg", artist: "John Legend", title: "All of Me",               context: "the 2013 love song written entirely about Legend's wife Chrissy Teigen that became a wedding staple, built on a simple piano motif" },
  { tags: ["adele", "rolling in the deep", "pop", "soul pop", "2010s"],                   id: "rYEDA3JcQqw", artist: "Adele", title: "Rolling in the Deep",           context: "Adele's 2010 debut single from 21 that launched one of the biggest-selling albums of the 21st century, written in 40 minutes after a breakup" },
  { tags: ["tlc", "waterfalls", "r&b", "90s r&b", "r&b group", "soul", "90s pop", "neo soul"], id: "8WEtxJ4-sh4", artist: "TLC", title: "Waterfalls",               context: "the 1995 hit that addressed HIV/AIDS and drug dealing through an R&B lens at a time when mainstream pop rarely touched those topics directly" },
  { tags: ["beyonce", "beyoncé", "crazy in love", "r&b", "contemporary r&b", "r&b 2000s", "rnb", "destiny's child"],  id: "ViwtNLUqkMY", artist: "Beyoncé", title: "Crazy In Love",              context: "Beyoncé's 2003 solo debut single featuring Jay-Z, built on a horn sample from The Chi-Lites — the track that launched her into superstardom outside Destiny's Child" },
  { tags: ["usher", "yeah", "r&b", "contemporary r&b", "r&b 2000s", "rnb", "crunk r&b", "dance r&b"],                id: "GxBSyx85Kp8", artist: "Usher ft. Lil Jon, Ludacris", title: "Yeah!",  context: "the 2004 crunk-R&B crossover that spent 12 weeks at #1, blending Lil Jon's Atlanta party sound with Usher's smooth R&B — one of the biggest-selling singles of the 2000s" },
  { tags: ["whitney houston", "i will always love you", "r&b", "classic r&b", "soul", "gospel r&b", "vocal"],        id: "3JWTaaS7LdU", artist: "Whitney Houston", title: "I Will Always Love You", context: "Whitney Houston's 1992 cover of Dolly Parton's country song, recorded for The Bodyguard soundtrack — the extended a cappella opening note became one of the most imitated moments in pop vocal history" },
  { tags: ["rihanna", "diamonds", "r&b", "contemporary r&b", "rnb", "pop r&b", "rihanna r&b"],                       id: "lWA2pjMjpBs", artist: "Rihanna", title: "Diamonds",                   context: "Rihanna's 2012 anthem written by Sia in fourteen minutes, spending 10 weeks at #1 and becoming one of the biggest-selling singles of that year" },
  // Hip-hop / rap
  { tags: ["eminem", "rap", "hip hop", "hip-hop", "rap battle", "battle rap", "lyric", "freestyle", "bars"], id: "sNPnbI1arSE", artist: "Eminem", title: "My Name Is",  context: "the 1999 debut single that introduced Eminem to mainstream audiences with rapid-fire wordplay and character voices, showcasing the technical lyrical dexterity that would define battle rap-influenced hip-hop" },
  { tags: ["kendrick lamar", "kendrick", "rap", "hip hop", "hip-hop", "west coast rap", "conscious rap", "rap battle", "disstrack"], id: "tvTRZJ-4EyI", artist: "Kendrick Lamar", title: "HUMBLE.", context: "the 2017 Pulitzer Prize-winning rapper's biggest commercial hit, produced by Mike WiLL Made-It, which paradoxically became a mainstream anthem while calling out the culture's inauthenticity" },
  { tags: ["50 cent", "in da club", "rap", "hip hop", "hip-hop", "gangsta rap", "2000s rap"], id: "5qm8PH4xAss", artist: "50 Cent", title: "In Da Club",              context: "the 2003 G-Unit debut produced by Dr. Dre and Eminem that spent 9 weeks at #1, with a beat built around a single repeated piano loop — one of the most recognisable rap intros ever" },
  { tags: ["kanye west", "kanye", "rap", "hip hop", "hip-hop", "conscious rap", "producer rap"], id: "Co0tTeuUVhU", artist: "Kanye West", title: "Heartless",         context: "the 808s & Heartbreak track that pioneered Auto-Tune as an emotional instrument in hip-hop rather than a pitch-correction tool, influencing Drake, The Weeknd, and a decade of rap production" },
  { tags: ["kanye west", "kanye", "rap", "hip hop", "hip-hop", "power", "sample"],         id: "L53gjP-TtGE", artist: "Kanye West", title: "POWER",                   context: "the 2010 My Beautiful Dark Twisted Fantasy single built on a sample of King Crimson's 21st Century Schizoid Man, with one of the most intricate sample clearance negotiations in hip-hop history" },
  { tags: ["lil nas x", "old town road", "rap", "hip hop", "country rap", "genre", "crossover"], id: "7ysFgElQtjI", artist: "Lil Nas X ft. Billy Ray Cyrus", title: "Old Town Road", context: "the 2019 track that broke the Billboard Hot 100 record at 19 weeks at #1 after being controversially removed from the country charts, triggering a debate about genre boundaries that changed how the industry categorises music" },
  // Timeless
  { tags: ["john lennon", "imagine", "beatles", "classic", "protest song", "60s", "70s"], id: "YkgkThdzX-8", artist: "John Lennon", title: "Imagine",                context: "Lennon's 1971 anthem often called the greatest protest song ever written, despite Lennon describing it as 'anti-religious, anti-nationalistic, anti-conventional, anti-capitalistic' — while recording it in his mansion" },
  { tags: ["jeff buckley", "hallelujah", "classic", "cover", "leonard cohen", "vocal"],   id: "y8AWFf7EAc4", artist: "Jeff Buckley", title: "Hallelujah",             context: "Buckley's 1994 cover of Leonard Cohen's 1984 song, which was barely noticed on release but became one of the most covered songs in history after Buckley's death in 1997" },
];

function pickVideoForTopic(topic: string, usedIds: string[] = []): MusicVideo {
  const lower = topic.toLowerCase();
  const pool = VERIFIED_MUSIC_VIDEOS.filter((v) => !usedIds.includes(v.id));
  const candidates = pool.length > 0 ? pool : VERIFIED_MUSIC_VIDEOS; // fall back to full list if all used

  let best = candidates[0];
  let bestScore = -1;
  for (const v of candidates) {
    const score = v.tags.reduce((acc, t) => {
      if (!lower.includes(t)) return acc;
      return acc + (t.includes(" ") ? 2 : 1);
    }, 0);
    if (score > bestScore) { bestScore = score; best = v; }
  }
  // No match — pick randomly from the filtered pool
  if (bestScore <= 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  return best;
}

async function resolveYouTubeVideo(parsed: Record<string, unknown>, useYouTube: boolean, video: MusicVideo): Promise<Record<string, unknown>> {
  const card = parsed.card as Record<string, unknown> | undefined;
  if (!card || !useYouTube) return parsed;
  delete card.youtubeVideoId;
  card.mediaUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1`;
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
    driveMode = false,
    kidsMode = false,
    kidsPeople = false,
    courseHook = null,
    courseTitle = null,
    coursePillar = null,
    kidAge = null,
  } = await req.json() as {
    topic: string;
    history?: string[];
    completedQuestions?: string[];
    recentMechanics?: string[];
    intent?: SessionIntent | null;
    currentFocus?: string | null;
    experiment?: "intent-recovery" | null;
    driveMode?: boolean;
    kidsMode?: boolean;
    kidsPeople?: boolean;
    courseHook?: string | null;
    courseTitle?: string | null;
    coursePillar?: string | null;
    kidAge?: number | null;
  };

  const historyClause = history.length > 0
    ? `\nTopics already explored this session (do not repeat): ${history.join(", ")}`
    : "";

  const completedClause = completedQuestions.length > 0
    ? `\nQuestions the learner has already answered. Do not repeat any of these — and do not generate a question that covers the same core subject or mechanic structure as any of them, even with different examples:\n${completedQuestions.slice(-20).map((q) => `- "${q}"`).join("\n")}`
    : "";

  const mechanicsClause = kidsMode
    ? `\nKIDS MODE — mechanic variety is required. Recent mechanics used: ${recentMechanics.length > 0 ? recentMechanics.slice(-3).join(", ") : "none"}. You MUST pick a different mechanic from the most recent one.

Priority order (highest to lowest preference):
1. image-matching — use whenever the topic has 4 recognisable visual subjects that can be matched to a DIFFERENT category (e.g. animals → their habitat, paintings → their artist, inventors → their invention). The "right" side must NOT repeat or paraphrase the "searchTerm".
2. grouping — sort 6–8 items into 2 fun, clearly named categories (e.g. "lives in water" vs "lives on land").
3. matching — pair 4 items across two different categories (e.g. animal → sound it makes, planet → its defining feature). Never match a subject to a description of itself.
4. sequence — only when there is a clear chronological or step-by-step order a child would find satisfying (life cycle, how something is made, famous person's milestones).
5. multiple-choice — use freely, but set heroSearchTerm so a relevant image appears. Do NOT use multiple-choice if the previous card was also multiple-choice.

SINGLE-PERSON RULE (HARD BAN): If the topic is one named person (e.g. "Leonardo da Vinci", "Walt Disney"), you MUST NOT use "matching" or "image-matching" AT ALL — not for their works, not for their milestones, not for their photos. These mechanics always produce trivially obvious pairs when left and right are both about the same person (e.g. "Leonardo da Vinci - The Flying Machine" → "Silly Flying Machine" is just a rename, not a match). For a single-person topic, ONLY use: multiple-choice (a surprising fact or record), sequence (milestones in their life), or grouping (their real achievements vs. things they didn't do).

NEVER use: pronunciation, ranked-list.`
    : recentMechanics.length > 0
    ? `\nRecent mechanics used: ${recentMechanics.slice(-3).join(", ")}. You MUST pick a different mechanic — do NOT use multiple-choice if it appears in this list unless all other mechanics are clearly unsuitable.`
    : "\nThis is the first card. Prefer image-matching, matching, grouping, or sequence over multiple-choice.";

  const ageLabel = kidAge === 5 ? "5-year-old (Kindergarten)" : kidAge === 6 ? "6-year-old (1st grade)" : kidAge === 7 ? "7-year-old (2nd grade)" : kidAge === 8 ? "8-year-old (3rd grade)" : kidAge === 9 ? "9-year-old (4th grade)" : kidAge === 10 ? "10+ year-old (5th grade)" : "9–10-year-old (4th grade)";

  const depthClause = kidsMode
    ? `\nAUDIENCE: ${ageLabel}. This is the MOST IMPORTANT instruction — override everything else if there is a conflict.

DIFFICULTY TARGET — matched to age ${kidAge ?? 9}:
- Vocabulary: words this child knows from everyday life and school. No Latin roots, no scientific jargon, no abstract concepts.
- ${(kidAge ?? 9) <= 6 ? "VERY simple: 1-2 word options, short sentences, concrete and visual. Think sesame-street level." : (kidAge ?? 9) <= 8 ? "Simple and concrete: common words, everyday comparisons, visual examples." : "Clear and interesting: can handle one surprising fact, but no chains of logic."}
- GOOD question: "Which dinosaur was the biggest meat-eater?" — simple, concrete, surprising
- BAD question: "Which theropod dominated the Cretaceous epoch?" — jargon, too complex

CONTENT RULES — no exceptions:
- Focus on: world records, cool abilities, amazing creations, surprising facts, funny moments, how things work
- For people topics: focus on what they MADE, DISCOVERED, or ACHIEVED — not the political/historical context around them
- NEVER mention: war, violence, death, slavery, discrimination, politics, alcohol, drugs, anything scary or sad
- Even if the person's story involves dark history, find the inspiring/fun angle instead (e.g. for Lincoln: "He was the tallest US president and loved wrestling" not "He freed enslaved people")
- Wrong answer choices must be obviously wrong to a ${kidAge ?? 9}-year-old — not tricky adult-level distractors
- Correct answer reveal: one sentence, "Wow!" energy, starts with the surprising fact

FORMAT:
- Question: under 12 words
- Answer options: 1–4 words each, no sentences
- Tone: enthusiastic and warm, like a fun teacher — never dry or academic`
    : history.length === 0
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
  // Only when the topic is actually about the music itself (not economics, history, politics, etc.)
  // Never in kids mode — the video library isn't curated for children
  const isMusicYouTubeCard = !driveMode && !kidsMode && isMusicVideoAppropriate(topic) && (history.length === 0 || history.length % 3 === 2);
  // Detect which videos were already shown by checking if their artist/title appears in session history
  const usedVideoIds = VERIFIED_MUSIC_VIDEOS
    .filter((v) => history.some((h) => h.toLowerCase().includes(v.artist.toLowerCase()) || h.toLowerCase().includes(v.title.toLowerCase())))
    .map((v) => v.id);
  const musicVideo = isMusicYouTubeCard ? pickVideoForTopic(topic, usedVideoIds) : null;

  const driveModeClause = driveMode
    ? `\nDRIVING MODE — You MUST use mechanic: "multiple-choice" only. No image-matching, sequence, grouping, or matching. The question will be read aloud — keep it under 20 words. Each option must be under 6 words. No markdown, no formatting symbols.`
    : "";

  const musicClause = musicVideo
    ? `\nMUSIC YOUTUBE CARD — You MUST:
1. Use mechanic: "multiple-choice"
2. Write the question specifically about this song: "${musicVideo.artist} — ${musicVideo.title}"
   Context about this song: ${musicVideo.context}
3. Frame the question so the player listens first, then answers. The question should teach something interesting and non-obvious about this specific song.
4. Do NOT include a youtubeVideoId field — the video is already handled.`
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
${historyClause}${completedClause}${mechanicsClause}${depthClause}${intentClause}${musicClause}${driveModeClause}${qualityReminder}

Generate one high-quality question card and three next directions.`
    : `The learner wants to explore: "${topic}"
${historyClause}${completedClause}${mechanicsClause}${depthClause}${intentClause}${musicClause}${driveModeClause}${qualityReminder}

Generate one high-quality question card and three next directions.`;

  // Kids Amazing People path uses a dedicated prompt tuned for inspiring historic people
  const lastMechanic = recentMechanics[recentMechanics.length - 1] ?? "";

  // Map pillar → required mechanic. Enforces variety across the 10-question course.
  const pillarMechanic: Record<string, string> = {
    hook: "multiple-choice",
    who: "image-matching",
    breakthrough: "sequence",
    mindset: "multiple-choice",
    surprise: "grouping",
    impact: "image-matching",
    character: "grouping",
    deeper: "multiple-choice",
    connection: "multiple-choice",
    legacy: "sequence",
  };
  const requiredMechanic = coursePillar ? (pillarMechanic[coursePillar] ?? null) : null;

  // Extra guidance for image-matching pillars so the model picks correct searchTerms
  const imagePillarHint = requiredMechanic === "image-matching"
    ? `\nFor this image-matching card: show 4 real things directly connected to ${currentFocus ?? topic} — their famous works, places they changed, inventions they made, or records they set. Each searchTerm must be a different Wikipedia article title (NOT the person's own article). The right label must describe what connects that image to ${currentFocus ?? topic} (NOT the image title repeated).`
    : "";

  const visualRule = requiredMechanic
    ? `\nMECHANIC — REQUIRED: "${requiredMechanic}"\nThis is a ${coursePillar} pillar question. You MUST use "${requiredMechanic}". No other mechanic is acceptable.${imagePillarHint}`
    : lastMechanic
    ? `\nMECHANIC: Last mechanic was "${lastMechanic}". Pick a DIFFERENT mechanic — multiple-choice, sequence, grouping, or image-matching. Do NOT use "${lastMechanic}".`
    : `\nMECHANIC: Pick the mechanic that best fits the question — multiple-choice, sequence, grouping, or image-matching.`;

  const kidsPeoplePrompt = kidsPeople
    ? `Person: "${currentFocus ?? topic}"
Child age: ${kidAge ?? 8}
Questions already answered (do not repeat):
${completedQuestions.length > 0 ? completedQuestions.slice(-10).map((q) => `- "${q}"`).join("\n") : "none"}

QUESTION TO ASK (show this to the player — do NOT reveal the answer in it): "${courseTitle ?? topic}"
ANSWER / WOW FACT (the hook — never put this in the question, only in the reveal after they answer): "${courseHook ?? topic}"

Build the card around this question and answer. The question must not contain or imply the answer.
${visualRule}`
    : null;

  const activeSystemPrompt = kidsPeoplePrompt ? KIDS_PEOPLE_PROMPT : DIRECTOR_PROMPT;
  const activeUserPrompt = kidsPeoplePrompt ?? userPrompt;

  // Attempt generation with one retry on parse or structural failure
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const parsed = await generate(activeUserPrompt, activeSystemPrompt);
      if (!driveMode) {
        await Promise.all([
          resolveImageMatching(parsed),
          resolveHeroImage(parsed),
          resolveYouTubeVideo(parsed, isMusicYouTubeCard, musicVideo ?? VERIFIED_MUSIC_VIDEOS[0]),
        ]);
      }
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
