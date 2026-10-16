"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { brand } from "../brand";
import ShellBar from "../ShellBar";
import { useProfile } from "../useProfile";
import UserMenu from "../UserMenu";
import LeaderboardPanel from "../LeaderboardPanel";
import SequenceGame from "../SequenceGame";
import GroupingGame from "../GroupingGame";
import MatchingGame from "../MatchingGame";
import MultipleChoiceGame from "../MultipleChoiceGame";
import type { Question } from "../games/questions";

// ── Types ──────────────────────────────────────────────────────────────────────

type KidsCard = Question & { thumbId: string; knowledgeReveal?: string; conversationTakeaway?: string };

interface NextDirection {
  type: "deeper" | "connection" | "surprise";
  label: string;
  description: string;
  topic: string;
}

interface GenerateResponse {
  card: KidsCard;
  nextDirections: NextDirection[];
}

interface PersonCard {
  name: string;
  tagline: string;
  era: string;
  imageSearchTerm: string;
  imageUrl?: string;
}

interface CourseQuestion {
  hook: string;
  title: string;
  topic: string;
  pillar?: "hook" | "who" | "breakthrough" | "mindset" | "surprise" | "impact" | "character" | "deeper" | "connection" | "legacy";
}

type RefinePill = { label: string; bridge: boolean };

// kids palette — warm, friendly
const kids = {
  accent: "#22c55e",
  accentDim: "rgba(34,197,94,0.18)",
  accentBorder: "rgba(34,197,94,0.35)",
  accentText: "#4ade80",
  cardGradient: "linear-gradient(135deg, #052e16 0%, #064e3b 50%, #065f46 100%)",
};

// ── Knowledge reveal ──────────────────────────────────────────────────────────

function KnowledgeReveal({ reveal, takeaway }: { reveal?: string; takeaway?: string }) {
  const [open, setOpen] = useState(false);
  if (!reveal && !takeaway) return null;
  return (
    <div style={{ marginTop: "20px", borderRadius: brand.radius.item, border: `1px solid ${brand.border.item}`, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", padding: "14px 16px", background: brand.bg.raised,
          border: "none", display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", WebkitTapHighlightColor: "transparent",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: "600", color: brand.text.muted, letterSpacing: "0.02em" }}>🤔 Did you know?</span>
        <span style={{ fontSize: "14px", color: brand.text.muted, transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms ease", display: "block" }}>⌄</span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 16px", background: brand.bg.raised, display: "flex", flexDirection: "column", gap: "10px" }}>
          {reveal && (
            <p style={{ margin: 0, fontSize: "13px", color: brand.text.secondary, lineHeight: 1.65 }}>
              {reveal}
            </p>
          )}
          {takeaway && (
            <p style={{ margin: 0, fontSize: "12px", fontWeight: "600", color: brand.text.muted, lineHeight: 1.5, borderTop: `1px solid ${brand.border.item}`, paddingTop: "10px" }}>
              💬 {takeaway}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Card normalizer ────────────────────────────────────────────────────────────

function normalizeCard(raw: unknown): KidsCard | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;
  if (typeof c.question !== "string" || typeof c.mechanic !== "string") return null;

  const base = {
    id: (c.id as string) ?? "kids-generated",
    question: c.question as string,
    mechanic: c.mechanic as KidsCard["mechanic"],
    topic: "interests" as const,
    thumbId: "kids-default",
    knowledgeReveal: (c.knowledgeReveal as string) ?? undefined,
    conversationTakeaway: (c.conversationTakeaway as string) ?? undefined,
  };

  if (c.mechanic === "grouping") {
    const zones = Array.isArray(c.zones) ? c.zones : [];
    const items = Array.isArray(c.items) ? c.items : [];
    if (zones.length !== 2 || items.length < 4) return null;
    const zoneIds = new Set(zones.map((z: { id: string }) => z.id));
    if (items.some((i: { correctGroup: string }) => !zoneIds.has(i.correctGroup))) return null;
    return { ...base, mechanic: "grouping", zones, items } as KidsCard;
  }
  if (c.mechanic === "matching") {
    const pairs = Array.isArray(c.pairs) ? c.pairs : [];
    if (pairs.length < 2) return null;
    const rights = pairs.map((p: { right: string }) => p.right?.trim().toLowerCase());
    if (new Set(rights).size !== rights.length) return null;
    const lefts = pairs.map((p: { left: string; searchTerm?: string }) =>
      (p.left ?? p.searchTerm ?? "").trim().toLowerCase()
    );
    if (new Set(lefts).size !== lefts.length) return null;
    return { ...base, mechanic: "matching", pairs } as KidsCard;
  }
  if (c.mechanic === "sequence") {
    const sequence = Array.isArray(c.sequence) ? c.sequence : [];
    if (sequence.length < 3) return null;
    const ids = sequence.map((s: { id: string }) => s.id);
    if (new Set(ids).size !== ids.length) return null;
    return { ...base, mechanic: "sequence", sequence } as KidsCard;
  }
  if (c.mechanic === "multiple-choice") {
    const options = Array.isArray(c.options) ? c.options : [];
    const correctIds = Array.isArray(c.correctIds) ? c.correctIds : [];
    if (options.length < 2) return null;
    const optionIds = new Set(options.map((o: { id: string }) => o.id));
    if (correctIds.length === 0 || correctIds.some((id: string) => !optionIds.has(id))) return null;
    const texts = options.map((o: { text: string }) => o.text?.trim().toLowerCase());
    if (new Set(texts).size !== texts.length) return null;
    return { ...base, mechanic: "multiple-choice", options, correctIds, ...(c.mediaUrl ? { mediaUrl: c.mediaUrl as string } : {}) } as KidsCard;
  }
  return null;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function CardSkeleton({ topic }: { topic: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .kids-shimmer {
          background: linear-gradient(90deg, ${brand.bg.raised} 0%, ${brand.bg.hover} 40%, ${brand.bg.raised} 80%);
          background-size: 800px 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>
      <div style={{ fontSize: "13px", color: kids.accentText, marginBottom: "4px" }}>
        🌟 Finding a great question about <strong>{topic}</strong>…
      </div>
      <div className="kids-shimmer" style={{ height: "160px", borderRadius: "18px" }} />
      {[88, 68, 68, 88].map((h, i) => (
        <div key={i} className="kids-shimmer" style={{ height: `${h}px`, borderRadius: brand.radius.item, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

// ── Game renderer ─────────────────────────────────────────────────────────────

function GameRenderer({ card, onComplete }: { card: KidsCard; onComplete: (attempts: number) => void }) {
  const done = (attempts: number) => onComplete(attempts);
  if (card.mechanic === "sequence")
    return <SequenceGame key={card.question} question={card.question} sequence={card.sequence} onComplete={done} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={(_q: string) => {}} loadingNugget={null} autoComplete />;
  if (card.mechanic === "grouping")
    return <GroupingGame key={card.question} question={card.question} zones={card.zones} items={card.items} onComplete={done} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={(_q: string) => {}} loadingNugget={null} autoComplete />;
  if (card.mechanic === "matching")
    return <MatchingGame key={card.question} question={card.question} pairs={card.pairs} onComplete={done} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={(_q: string) => {}} loadingNugget={null} autoComplete />;
  if (card.mechanic === "multiple-choice")
    return <MultipleChoiceGame key={card.question} question={card.question} mediaUrl={card.mediaUrl} options={card.options} correctIds={card.correctIds} onComplete={done} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={(_q: string) => {}} loadingNugget={null} autoComplete />;
  return null;
}

// ── Card hero ─────────────────────────────────────────────────────────────────

function CardHero({ card }: { card: KidsCard }) {
  const isImageMatch = card.mechanic === "matching" && card.pairs?.some((p: { imageUrl?: string }) => p.imageUrl);
  const mechLabel: Record<string, string> = {
    "multiple-choice": "Quiz", matching: "Matching", sequence: "Sequence", grouping: "Grouping",
  };
  const label = isImageMatch ? "Image Match" : (mechLabel[card.mechanic] ?? card.mechanic);
  const heroImageUrl = (card as KidsCard & { heroImageUrl?: string }).heroImageUrl;
  return (
    <div style={{ width: "100%", height: "160px", borderRadius: "18px", overflow: "hidden", background: brand.bg.raised, position: "relative", marginBottom: "20px", flexShrink: 0 }}>
      {heroImageUrl
        ? <img src={heroImageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        : <div style={{ position: "absolute", inset: 0, background: kids.cardGradient }} />
      }
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 18px 16px" }}>
        <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "5px" }}>
          Kids · {label}
        </div>
        <div style={{ fontSize: "clamp(1.1rem, 5vw, 1.3rem)", fontWeight: "800", color: "#ffffff", lineHeight: "1.18", letterSpacing: "-0.025em", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
          {card.question}
        </div>
      </div>
    </div>
  );
}

// ── People categories ─────────────────────────────────────────────────────────

const PEOPLE_CATEGORIES = [
  { emoji: "👑", label: "Rulers & Leaders", topic: "kings, queens, and leaders — their coolest moments, superpowers, and what made them legendary" },
  { emoji: "🎨", label: "Artists & Creators", topic: "famous artists and musicians — their most amazing creations and fun surprising facts" },
  { emoji: "🔬", label: "Scientists & Inventors", topic: "scientists and inventors — their coolest discoveries, wild experiments, and things they invented that we still use today" },
  { emoji: "🏅", label: "Sports Legends", topic: "sports legends — their most incredible records, moves, and what made them the greatest" },
  { emoji: "🌍", label: "Explorers & Heroes", topic: "explorers and heroes — their bravest adventures and most surprising discoveries" },
  { emoji: "✊", label: "Changemakers", topic: "people who changed the world — their bravest moments and the amazing differences they made" },
];

// ── Kids topic list ────────────────────────────────────────────────────────────

const KIDS_TOPICS = [
  "Dinosaurs", "Space & planets", "Baby animals", "How rainbows work",
  "Sharks", "Volcanoes", "Robots", "Butterflies", "The ocean", "Superheroes",
  "How planes fly", "Dogs & cats",
];

// ── Main page ─────────────────────────────────────────────────────────────────

type Phase = "age" | "theme" | "people" | "people-list" | "input" | "refining" | "loading" | "card";

const AGE_OPTIONS = [
  { age: 5, emoji: "🐣", label: "5" },
  { age: 6, emoji: "🐥", label: "6" },
  { age: 7, emoji: "🦊", label: "7" },
  { age: 8, emoji: "🦁", label: "8" },
  { age: 9, emoji: "🚀", label: "9" },
  { age: 10, emoji: "⭐", label: "10+" },
];

export default function KidsPage() {
  console.log("🧒 KidsPage mounted — v2 with course logging");
  const router = useRouter();
  const { profile, synced, recordCorrect } = useProfile();

  const [phase, setPhase] = useState<Phase>("age");
  const [kidAge, setKidAge] = useState<number | null>(null);
  const [loadingTopic, setLoadingTopic] = useState("");
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [rawTopic, setRawTopic] = useState("");
  const [refinePills, setRefinePills] = useState<RefinePill[]>([]);
  const [refineLoading, setRefineLoading] = useState(false);
  const [refineOtherOpen, setRefineOtherOpen] = useState(false);
  const [refineOtherValue, setRefineOtherValue] = useState("");
  const [card, setCard] = useState<KidsCard | null>(null);
  const [nextDirections, setNextDirections] = useState<NextDirection[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [recentMechanics, setRecentMechanics] = useState<string[]>([]);
  const [cardCompleted, setCardCompleted] = useState(false);
  const [peopleList, setPeopleList] = useState<PersonCard[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ label: string; topic: string } | null>(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [anchorTopic, setAnchorTopic] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<PersonCard | null>(null);
  const [courseQuestions, setCourseQuestions] = useState<CourseQuestion[]>([]);
  const [courseIndex, setCourseIndex] = useState(0);
  // Pre-generated cards: index → card (populated ahead of current position)
  const [generatedCards, setGeneratedCards] = useState<Record<number, KidsCard>>({});
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const generateAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (phase === "input") inputRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (phase === "card") {
      setTimeout(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [phase, card]);

  const completedQuestions = profile.history.map((h) => h.question);

  async function generate(topic: string, anchor?: string, courseQuestion?: CourseQuestion) {
    generateAbort.current?.abort();
    const ctrl = new AbortController();
    generateAbort.current = ctrl;

    const resolvedAnchor = anchor ?? anchorTopic ?? null;

    setPhase("loading");
    setLoadingTopic(topic);
    setGenerateError(null);
    setCardCompleted(false);
    setNextDirections([]);

    try {
      const res = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          courseTitle: courseQuestion?.title ?? undefined,
          courseHook: courseQuestion?.hook ?? undefined,
          history, completedQuestions, recentMechanics,
          intent: null, currentFocus: resolvedAnchor, experiment: null,
          kidsMode: true,
          kidsPeople: !!courseQuestion,
          kidAge,
        }),
        signal: ctrl.signal,
      });
      const data: GenerateResponse = await res.json();
      const normalized = normalizeCard(data.card);
      if (!normalized) throw new Error("Invalid card");
      if (ctrl.signal.aborted) return;

      setCard(normalized);
      setNextDirections(data.nextDirections ?? []);
      setHistory((prev) => [...prev, topic]);
      setRecentMechanics((prev) => [...prev, data.card.mechanic]);
      setPhase("card");
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setGenerateError("Oops! Something went wrong. Tap to try again! 🙈");
    }
  }

  // Pre-generate a specific course card index in the background
  async function preGenerateCourseCard(index: number, questions: CourseQuestion[], anchor: string, currentHistory: string[], currentMechanics: string[]) {
    if (index >= questions.length) return;
    setGeneratingIndex(index);
    try {
      const res = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: questions[index].topic,
          courseTitle: questions[index].title,
          courseHook: questions[index].hook ?? questions[index].topic,
          history: currentHistory,
          completedQuestions,
          recentMechanics: currentMechanics,
          intent: null,
          currentFocus: anchor,
          experiment: null,
          kidsMode: true,
          kidsPeople: true,
          kidAge,
        }),
      });
      const data: GenerateResponse = await res.json();
      const normalized = normalizeCard(data.card);
      if (normalized) {
        setGeneratedCards((prev) => ({ ...prev, [index]: normalized }));
      }
    } catch {
      // silent — will fall back to generating on demand
    } finally {
      setGeneratingIndex((prev) => (prev === index ? null : prev));
    }
  }

  // Start a person course: fetch titles + begin generating first card in parallel
  async function startPersonCourse(person: PersonCard) {
    setSelectedPerson(person);
    setAnchorTopic(person.name);
    setCourseQuestions([]);
    setCourseIndex(0);
    setGeneratedCards({});
    setHistory([]);
    setRecentMechanics([]);
    setCardCompleted(false);
    setPhase("loading");
    setLoadingTopic(person.name);
    setGenerateError(null);

    try {
      // Step 1: fetch the course outline first so we use the designed topic for card 1
      // Pass previously answered questions about this person so the outline avoids repetition
      const personAnswered = completedQuestions.filter(q =>
        q.toLowerCase().includes(person.name.toLowerCase().split(" ")[0])
      );
      if (personAnswered.length > 0) console.log(`📖 Found ${personAnswered.length} prior answers about ${person.name} — outline will skip these topics`);
      const courseRes = await fetch("/api/nuggets/kids-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personName: person.name, kidAge: kidAge ?? 8, answeredQuestions: personAnswered }),
      });
      const courseData = await courseRes.json() as { questions: CourseQuestion[] };
      const questions: CourseQuestion[] = Array.isArray(courseData.questions) ? courseData.questions : [];

      console.group(`📚 Course outline: ${person.name}`);
      questions.forEach((q, i) => console.log(`Q${i + 1} [${q.pillar ?? "?"}] ${q.title}\n   → topic: "${q.topic}"`));
      console.groupEnd();

      // Step 2: generate card 1 using the designed topic from the outline
      const q0 = questions[0];
      const firstTopic = q0?.topic ?? `${person.name} — most jaw-dropping fact`;
      // Q1 title must always name the person
      const firstTitle = q0?.title
        ? (q0.title.toLowerCase().includes(person.name.toLowerCase()) ? q0.title : `${person.name}: ${q0.title}`)
        : `What is the most amazing thing about ${person.name}?`;
      console.log(`🃏 Generating card 1 with topic: "${firstTopic}" | question: "${firstTitle}"`);
      const firstCardRes = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: firstTopic,
          courseTitle: firstTitle,
          courseHook: q0?.hook ?? firstTopic,
          history: [],
          completedQuestions,
          recentMechanics: [],
          intent: null,
          currentFocus: person.name,
          experiment: null,
          kidsMode: true,
          kidsPeople: true,
          kidAge,
        }),
      });
      const firstCardData = await firstCardRes.json() as GenerateResponse;
      console.log(`🃏 Card 1 returned: "${firstCardData.card?.question}" [${firstCardData.card?.mechanic}]`);

      const normalized = normalizeCard(firstCardData.card);
      if (!normalized) throw new Error("Invalid card");

      setCourseQuestions(questions);
      setCourseIndex(0);
      setGeneratedCards({ 0: normalized });
      setCard(normalized);
      setHistory([firstTopic]);
      setRecentMechanics([firstCardData.card?.mechanic ?? "multiple-choice"]);
      setPhase("card");

      // Pre-generate card 1 in background
      if (questions.length > 1) {
        preGenerateCourseCard(1, questions, person.name, [firstTopic], [firstCardData.card?.mechanic ?? "multiple-choice"]);
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setGenerateError("Oops! Something went wrong. Tap to try again! 🙈");
    }
  }

  async function refine(topic: string) {
    setRawTopic(topic);
    setRefineLoading(true);
    setRefineOtherOpen(false);
    setRefineOtherValue("");
    setRefinePills([]);
    setPhase("refining");

    try {
      const res = await fetch("/api/nuggets/interests/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, history: completedQuestions.slice(-20), kidsMode: true, kidAge }),
      });
      const data = await res.json() as { pills: RefinePill[] };
      setRefinePills(Array.isArray(data.pills) ? data.pills : []);
    } catch {
      generate(topic);
      return;
    } finally {
      setRefineLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    setInputValue("");
    refine(val);
  }

  function handleCardComplete(attempts: number) {
    setCardCompleted(true);
    const points = attempts <= 1 ? 3 : attempts === 2 ? 2 : attempts === 3 ? 1 : 0;
    if (card) recordCorrect(card.question, undefined, undefined, points);
  }

  function handleNextCard() {
    if (courseQuestions.length > 0) {
      // Course mode — advance to next course question
      const nextIndex = courseIndex + 1;
      if (nextIndex >= courseQuestions.length) {
        // Course complete — back to people list or theme
        setSelectedPerson(null);
        setCourseQuestions([]);
        setCourseIndex(0);
        setGeneratedCards({});
        setAnchorTopic(null);
        setPhase("people-list");
        return;
      }
      setCourseIndex(nextIndex);
      const nextCard = generatedCards[nextIndex];
      const nextHistory = [...history, courseQuestions[courseIndex]?.topic ?? ""];
      const nextMechanics = [...recentMechanics, card?.mechanic ?? "multiple-choice"];
      if (nextCard) {
        // Already generated — show immediately
        setCard(nextCard);
        setCardCompleted(false);
        setHistory(nextHistory);
        setRecentMechanics(nextMechanics);
        setPhase("card");
        // Pre-generate the one after
        preGenerateCourseCard(nextIndex + 1, courseQuestions, anchorTopic ?? "", nextHistory, nextMechanics);
      } else {
        // Not yet generated — generate now and show loading
        const q = courseQuestions[nextIndex];
        console.log(`🃏 Generating card ${nextIndex + 1} with topic: "${q.topic}" [${q.pillar}]`);
        setHistory(nextHistory);
        setRecentMechanics(nextMechanics);
        generate(q.topic, anchorTopic ?? undefined, q);
        // Also kick off the one after in background
        preGenerateCourseCard(nextIndex + 1, courseQuestions, anchorTopic ?? "", nextHistory, nextMechanics);
      }
    } else if (anchorTopic) {
      generate(anchorTopic);
    } else if (nextDirections[0]) {
      generate(nextDirections[0].description);
    }
  }

  async function fetchPeople(category: { label: string; topic: string }) {
    setSelectedCategory(category);
    setPeopleList([]);
    setPeopleLoading(true);
    setPhase("people-list");
    try {
      const res = await fetch("/api/nuggets/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: category.label, kidAge: kidAge ?? 8 }),
      });
      const data = await res.json() as { people: PersonCard[] };
      setPeopleList(Array.isArray(data.people) ? data.people : []);
    } catch {
      setPeopleList([]);
    } finally {
      setPeopleLoading(false);
    }
  }

  return (
    <>
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>
      <ShellBar
        title="Kids"
        onBack={() => router.push("/nuggets")}
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {kidAge && (
              <button
                onClick={() => { setPhase("age"); setKidAge(null); }}
                style={{ background: kids.accentDim, border: "none", padding: "4px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", borderRadius: "99px", WebkitTapHighlightColor: "transparent" }}
              >
                <span style={{ fontSize: "14px" }}>{AGE_OPTIONS.find(a => a.age === kidAge)?.emoji ?? "⭐"}</span>
                <span style={{ fontSize: "12px", fontWeight: "700", color: kids.accentText }}>Age {kidAge === 10 ? "10+" : kidAge}</span>
              </button>
            )}
            <button
              onClick={() => setLeaderboardOpen(true)}
              style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", borderRadius: "6px", WebkitTapHighlightColor: "transparent" }}
            >
              <span style={{ fontSize: "16px", lineHeight: 1 }}>🏆</span>
            </button>
            <button
              style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", borderRadius: "6px", WebkitTapHighlightColor: "transparent" }}
            >
              <span style={{ fontSize: "20px", fontWeight: "800", color: brand.text.primary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>{synced ? profile.score : "—"}</span>
              <span style={{ fontSize: "11px", fontWeight: "600", color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>pts</span>
            </button>
            <UserMenu />
          </div>
        }
      />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "64px", paddingBottom: "64px" }}>
        <div style={{ width: "100%", maxWidth: "390px", padding: "16px 20px", display: "flex", flexDirection: "column" }}>

          {/* ── Age selection phase ── */}
          {phase === "age" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  How old are you? 🌟
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  We'll pick questions that are just right for you.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {AGE_OPTIONS.map(({ age, emoji, label }) => (
                  <button
                    key={age}
                    onClick={() => { setKidAge(age); setPhase("theme"); }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "20px 12px",
                      borderRadius: "18px",
                      background: brand.bg.raised,
                      border: `1px solid ${kids.accentBorder}`,
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                      transition: brand.motion.snap,
                    }}
                  >
                    <span style={{ fontSize: "32px", lineHeight: 1 }}>{emoji}</span>
                    <span style={{ fontSize: "22px", fontWeight: "800", color: kids.accentText, letterSpacing: "-0.02em", lineHeight: 1 }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Theme selection phase ── */}
          {phase === "theme" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "26px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  What do you want to explore? 🌍
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Pick a theme to start learning!
                </p>
              </div>

              {/* People — featured card */}
              <button
                onClick={() => setPhase("people")}
                style={{
                  width: "100%",
                  padding: "0",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #1a0533 0%, #2d1060 50%, #3b0764 100%)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  overflow: "hidden",
                  position: "relative",
                  textAlign: "left",
                }}
              >
                <div style={{ padding: "22px 20px 20px" }}>
                  <div style={{ fontSize: "38px", marginBottom: "10px", lineHeight: 1 }}>🌟</div>
                  <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(167,139,250,0.7)", marginBottom: "4px" }}>
                    Greats &amp; Legends
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: "6px" }}>
                    Amazing People
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                    Heroes, artists, scientists &amp; legends who changed the world.
                  </div>
                </div>
                <div style={{ position: "absolute", top: "16px", right: "20px", fontSize: "11px", fontWeight: "600", color: "rgba(167,139,250,0.8)", letterSpacing: "0.04em" }}>
                  ✦ Featured
                </div>
              </button>

              {/* Other topics */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "10px" }}>
                  More topics
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {KIDS_TOPICS.map((s) => (
                    <button
                      key={s}
                      onClick={() => refine(s)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "99px",
                        background: brand.bg.raised,
                        border: `1px solid ${kids.accentBorder}`,
                        color: kids.accentText,
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                        transition: brand.motion.snap,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => setPhase("input")}
                    style={{
                      padding: "8px 14px",
                      borderRadius: "99px",
                      background: "transparent",
                      border: `1px dashed ${brand.border.item}`,
                      color: brand.text.muted,
                      fontSize: "13px",
                      fontWeight: "500",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                      transition: brand.motion.snap,
                    }}
                  >
                    Something else…
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── People category phase ── */}
          {phase === "people" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  Which kind of amazing person? 🌟
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Pick a group and meet the legends!
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {PEOPLE_CATEGORIES.map(({ emoji, label, topic }) => (
                  <button
                    key={label}
                    onClick={() => fetchPeople({ label, topic })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 18px",
                      borderRadius: "16px",
                      background: brand.bg.raised,
                      border: "1px solid rgba(167,139,250,0.2)",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                      transition: brand.motion.snap,
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: brand.text.primary }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPhase("theme")}
                style={{ background: "none", border: "none", color: brand.text.muted, fontSize: "13px", cursor: "pointer", padding: 0, textAlign: "left" }}
              >
                ← Back
              </button>
            </div>
          )}

          {/* ── Input phase ── */}
          {phase === "input" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  What are you curious about? 🌟
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Type anything you want to learn!
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. dinosaurs, space, sharks…"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: brand.radius.item,
                    background: brand.bg.raised,
                    border: `1px solid ${kids.accentBorder}`,
                    color: brand.text.primary,
                    fontSize: "15px",
                    fontWeight: "400",
                    outline: "none",
                    boxSizing: "border-box",
                    caretColor: kids.accentText,
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  style={{
                    padding: "14px",
                    borderRadius: brand.radius.button,
                    background: inputValue.trim() ? kids.accent : brand.bg.raised,
                    border: `1px solid ${kids.accentBorder}`,
                    color: inputValue.trim() ? "#fff" : brand.text.muted,
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: inputValue.trim() ? "pointer" : "default",
                    transition: brand.motion.snap,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Let's go! 🚀
                </button>
              </form>

              <button
                onClick={() => setPhase("theme")}
                style={{ background: "none", border: "none", color: brand.text.muted, fontSize: "13px", cursor: "pointer", padding: 0, textAlign: "left" }}
              >
                ← Back
              </button>
            </div>
          )}

          {/* ── Refining phase ── */}
          {phase === "refining" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  What about {rawTopic}? 🤔
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Pick what sounds most fun!
                </p>
              </div>

              {refineLoading ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{ height: "36px", width: `${60 + (i % 5) * 18}px`, borderRadius: "99px", background: brand.bg.raised, opacity: 0.5 }} />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {refinePills.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => {
                          const t = `${rawTopic} — ${p.label}`;
                          setAnchorTopic(t);
                          generate(t, t);
                        }}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "99px",
                          background: brand.bg.raised,
                          border: `1px solid ${kids.accentBorder}`,
                          color: kids.accentText,
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          WebkitTapHighlightColor: "transparent",
                          transition: brand.motion.snap,
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                    {!refineOtherOpen && (
                      <button
                        onClick={() => setRefineOtherOpen(true)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "99px",
                          background: "transparent",
                          border: `1px dashed ${kids.accentBorder}`,
                          color: brand.text.muted,
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          WebkitTapHighlightColor: "transparent",
                          transition: brand.motion.snap,
                        }}
                      >
                        Something else…
                      </button>
                    )}
                  </div>

                  {refineOtherOpen && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const val = refineOtherValue.trim();
                        if (val) { setRefineOtherValue(""); generate(val); }
                      }}
                      style={{ display: "flex", gap: "8px" }}
                    >
                      <input
                        autoFocus
                        value={refineOtherValue}
                        onChange={(e) => setRefineOtherValue(e.target.value)}
                        placeholder={`Something about ${rawTopic}…`}
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          borderRadius: brand.radius.item,
                          background: brand.bg.raised,
                          border: `1px solid ${kids.accentBorder}`,
                          color: brand.text.primary,
                          fontSize: "14px",
                          outline: "none",
                          caretColor: kids.accentText,
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!refineOtherValue.trim()}
                        style={{
                          padding: "10px 16px",
                          borderRadius: brand.radius.button,
                          background: refineOtherValue.trim() ? kids.accent : brand.bg.raised,
                          border: `1px solid ${kids.accentBorder}`,
                          color: refineOtherValue.trim() ? "#fff" : brand.text.muted,
                          fontSize: "13px",
                          fontWeight: "700",
                          cursor: refineOtherValue.trim() ? "pointer" : "default",
                          transition: brand.motion.snap,
                          whiteSpace: "nowrap",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        Go →
                      </button>
                    </form>
                  )}
                </div>
              )}

              <button
                onClick={() => setPhase("theme")}
                style={{ background: "none", border: "none", color: brand.text.muted, fontSize: "13px", cursor: "pointer", padding: 0, textAlign: "left" }}
              >
                ← Back
              </button>
            </div>
          )}

          {/* ── People list phase ── */}
          {phase === "people-list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <h1 style={{ margin: "0 0 6px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  {selectedCategory?.label} 🌟
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Pick someone to learn about!
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {peopleLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} style={{
                        height: "96px", borderRadius: "16px",
                        background: brand.bg.raised,
                        opacity: 0.4 + i * 0.05,
                        animation: "shimmer 1.6s ease-in-out infinite",
                        backgroundImage: `linear-gradient(90deg, ${brand.bg.raised} 0%, ${brand.bg.hover} 40%, ${brand.bg.raised} 80%)`,
                        backgroundSize: "800px 100%",
                      }} />
                    ))
                  : peopleList.map((person) => (
                      <button
                        key={person.name}
                        onClick={() => startPersonCourse(person)}
                        style={{
                          width: "100%",
                          borderRadius: "16px",
                          overflow: "hidden",
                          border: "1px solid rgba(167,139,250,0.2)",
                          background: brand.bg.raised,
                          cursor: "pointer",
                          textAlign: "left",
                          padding: 0,
                          display: "flex",
                          WebkitTapHighlightColor: "transparent",
                          transition: brand.motion.snap,
                          minHeight: "90px",
                        }}
                      >
                        {/* Image */}
                        <div style={{
                          width: "80px",
                          flexShrink: 0,
                          position: "relative",
                          overflow: "hidden",
                          background: "#1a0533",
                        }}>
                          {person.imageUrl
                            ? <img src={person.imageUrl} alt={person.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                            : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a0533 0%, #2d1060 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>🌟</div>
                          }
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(15,15,15,0.4) 100%)" }} />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
                          <div style={{ fontSize: "15px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                            {person.name}
                          </div>
                          <div style={{ fontSize: "12px", fontWeight: "500", color: "rgba(167,139,250,0.8)", lineHeight: 1.4 }}>
                            {person.tagline}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "500", color: brand.text.muted, marginTop: "2px" }}>
                            {person.era}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div style={{ display: "flex", alignItems: "center", paddingRight: "14px", color: brand.text.muted, fontSize: "16px", flexShrink: 0 }}>
                          ›
                        </div>
                      </button>
                    ))
                }
              </div>

              <button
                onClick={() => setPhase("people")}
                style={{ background: "none", border: "none", color: brand.text.muted, fontSize: "13px", cursor: "pointer", padding: 0, textAlign: "left" }}
              >
                ← Back
              </button>
            </div>
          )}

          {/* ── Loading phase ── */}
          {phase === "loading" && !generateError && <CardSkeleton topic={loadingTopic} />}
          {phase === "loading" && generateError && (
            <button
              onClick={() => generate(loadingTopic)}
              style={{
                marginTop: "40px", padding: "18px 20px", borderRadius: brand.radius.item,
                background: brand.bg.raised, border: `1px solid ${brand.border.item}`,
                color: brand.text.secondary, fontSize: "14px", lineHeight: 1.5,
                textAlign: "center", cursor: "pointer", width: "100%",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {generateError}
            </button>
          )}

          {/* ── Card phase ── */}
          {phase === "card" && card && (
            <div ref={cardRef} style={{ display: "flex", flexDirection: "column" }}>
              <CardHero card={card} />
              <GameRenderer card={card} onComplete={handleCardComplete} />

              {cardCompleted && (
                <>
                  <KnowledgeReveal reveal={card.knowledgeReveal} takeaway={card.conversationTakeaway} />

                  {/* Next question button */}
                  <button
                    onClick={handleNextCard}
                    style={{
                      marginTop: "24px",
                      width: "100%",
                      padding: "16px",
                      borderRadius: brand.radius.button,
                      background: kids.accent,
                      border: "none",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: "700",
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                      transition: brand.motion.snap,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Next question →
                  </button>

                  <button
                    onClick={() => { setAnchorTopic(null); setHistory([]); setRecentMechanics([]); setPhase("theme"); }}
                    style={{
                      marginTop: "10px",
                      background: "none",
                      border: "none",
                      color: brand.text.muted,
                      fontSize: "13px",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    ← Change topic
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
    <LeaderboardPanel open={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />
    </>
  );
}
