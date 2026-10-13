"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { brand } from "../brand";
import ShellBar from "../ShellBar";
import { useProfile } from "../useProfile";
import SequenceGame from "../SequenceGame";
import GroupingGame from "../GroupingGame";
import MatchingGame from "../MatchingGame";
import MultipleChoiceGame from "../MultipleChoiceGame";
import type { Question } from "../games/questions";

// ── Types ──────────────────────────────────────────────────────────────────────

type InterestCard = Question & { thumbId: string; knowledgeReveal?: string; conversationTakeaway?: string };

interface NextDirection {
  type: "deeper" | "connection" | "surprise";
  label: string;
  description: string;
  topic: string;
}

interface GenerateResponse {
  card: InterestCard;
  nextDirections: NextDirection[];
}

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

// ── Direction cards ─────────────────────────────────────────────────────────────

function NextDirections({ directions, onSelect, loading, originalGoal }: {
  directions: NextDirection[];
  onSelect: (topic: string) => void;
  loading: boolean;
  originalGoal?: string | null;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "28px" }}>
      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "4px" }}>
        Where to next?
      </div>
      {loading
        ? [1, 2, 3].map((i) => (
            <div key={i} style={{ height: "44px", borderRadius: brand.radius.item, background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.4 + i * 0.1 }} />
          ))
        : directions.map((d) => (
            <button
              key={d.topic}
              onClick={() => onSelect(d.description)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: brand.radius.item,
                background: brand.bg.raised,
                border: `1px solid ${brand.border.item}`,
                textAlign: "left",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                transition: brand.motion.snap,
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: "600", color: brand.text.secondary }}>
                {d.description}
              </span>
            </button>
          ))
      }
      {!loading && originalGoal && (
        <button
          onClick={() => onSelect(originalGoal)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: brand.radius.item,
            background: "transparent",
            border: `1px dashed ${brand.border.item}`,
            textAlign: "left",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            transition: brand.motion.snap,
            marginTop: "4px",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.text.muted }}>
            Explore something else
          </span>
          <span style={{ display: "block", fontSize: "13px", fontWeight: "600", color: brand.text.secondary, marginTop: "2px" }}>
            {originalGoal}
          </span>
        </button>
      )}
    </div>
  );
}

// ── Evaluation panel ────────────────────────────────────────────────────────────

type FeedbackRating = "loved" | "too_easy" | "too_hard" | "incorrect";

const FEEDBACK_OPTIONS: { rating: FeedbackRating; label: string }[] = [
  { rating: "loved",     label: "Loved it" },
  { rating: "too_easy",  label: "Too obvious" },
  { rating: "too_hard",  label: "Too difficult" },
  { rating: "incorrect", label: "Incorrect" },
];

type R8Scores = {
  coherence: number | null;
  novelty: number | null;
  wantToContinue: number | null;
  dropOffCard: string;
  freeText: string;
};

function ScorePicker({ label, description, value, onChange }: {
  label: string; description: string; value: number | null; onChange: (v: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontSize: "11px", fontWeight: "600", color: brand.text.secondary }}>{label}</span>
        <span style={{ fontSize: "11px", color: brand.text.muted }}>{description}</span>
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            style={{
              width: "34px", height: "30px",
              borderRadius: "6px",
              background: value === n ? brand.text.primary : brand.bg.page,
              border: `1px solid ${value === n ? brand.text.primary : brand.border.item}`,
              color: value === n ? brand.bg.page : brand.text.muted,
              fontSize: "12px", fontWeight: "600",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transition: brand.motion.snap,
            }}
          >{n}</button>
        ))}
      </div>
    </div>
  );
}

function EvalPanel({ card, nextSelected, cardIndex }: { card: InterestCard; nextSelected: string | null; cardIndex: number }) {
  const [rating, setRating]   = useState<FeedbackRating | null>(null);
  const [saved, setSaved]     = useState(false);
  const [open, setOpen]       = useState(false);
  const [r8, setR8]           = useState<R8Scores>({ coherence: null, novelty: null, wantToContinue: null, dropOffCard: "", freeText: "" });

  function handleRating(r: FeedbackRating) {
    if (saved) return;
    setRating(r);
    fetch("/api/nuggets/interests/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: card.id, question: card.question, topic: card.topic, mechanic: card.mechanic, rating: r }),
    }).catch(() => {});
  }

  function saveLog(scores?: R8Scores) {
    if (saved) return;
    setSaved(true);
    fetch("/api/nuggets/interests/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: card.question,
        mechanic: card.mechanic,
        topic: card.topic,
        rating: rating ?? undefined,
        nextSelected: nextSelected ?? undefined,
        notes: scores?.freeText || undefined,
        r8scores: scores ? {
          coherence: scores.coherence,
          novelty: scores.novelty,
          wantToContinue: scores.wantToContinue,
          dropOffCard: scores.dropOffCard || "none",
        } : undefined,
      }),
    }).catch(() => {});
  }

  function handleR8Submit(e: React.FormEvent) {
    e.preventDefault();
    saveLog(r8);
    setOpen(false);
  }

  // Auto-save when the user navigates to the next card without saving
  const prevNextRef = useRef<string | null>(null);
  useEffect(() => {
    if (nextSelected && nextSelected !== prevNextRef.current && !saved) {
      prevNextRef.current = nextSelected;
      saveLog();
    }
  }, [nextSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ marginTop: "20px", borderRadius: brand.radius.item, border: `1px solid ${brand.border.item}`, overflow: "hidden" }}>
      {/* Rating row */}
      <div style={{ padding: "12px 14px", background: brand.bg.raised, display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.text.muted, marginRight: "4px", flexShrink: 0 }}>
          Rate
        </span>
        {FEEDBACK_OPTIONS.map(({ rating: r, label }) => (
          <button
            key={r}
            onClick={() => handleRating(r)}
            style={{
              padding: "4px 11px",
              borderRadius: "99px",
              background: rating === r ? brand.bg.hover : "transparent",
              border: `1px solid ${rating === r ? brand.border.accent : brand.border.item}`,
              color: rating === r ? brand.text.primary : brand.text.muted,
              fontSize: "12px",
              fontWeight: rating === r ? "600" : "500",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transition: brand.motion.snap,
            }}
          >
            {label}
          </button>
        ))}

        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            marginLeft: "auto",
            padding: "4px 10px",
            borderRadius: "99px",
            background: "transparent",
            border: `1px solid ${brand.border.item}`,
            color: brand.text.muted,
            fontSize: "11px",
            fontWeight: "500",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            flexShrink: 0,
          }}
        >
          {saved && !open ? "✓ Saved" : "Add note"}
        </button>
      </div>

      {/* R8 structured scoring form */}
      {open && (
        <form
          onSubmit={handleR8Submit}
          style={{ borderTop: `1px solid ${brand.border.item}`, padding: "14px", background: brand.bg.raised, display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <ScorePicker
            label="Coherence"
            description="— connected journey or disconnected facts?"
            value={r8.coherence}
            onChange={(v) => setR8(s => ({ ...s, coherence: v }))}
          />
          <ScorePicker
            label="Novelty"
            description="— each card taught something genuinely different?"
            value={r8.novelty}
            onChange={(v) => setR8(s => ({ ...s, novelty: v }))}
          />
          <ScorePicker
            label="Want to continue"
            description="— would you tap 'Where to next?' after card 6?"
            value={r8.wantToContinue}
            onChange={(v) => setR8(s => ({ ...s, wantToContinue: v }))}
          />
          {cardIndex >= 5 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "11px", fontWeight: "600", color: brand.text.secondary }}>
              First drop-off card <span style={{ fontWeight: "400", color: brand.text.muted }}>— which card would you have stopped at? (or "none")</span>
            </span>
            <input
              type="text"
              value={r8.dropOffCard}
              onChange={(e) => setR8(s => ({ ...s, dropOffCard: e.target.value }))}
              placeholder="e.g. 4, or none"
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                background: brand.bg.page,
                border: `1px solid ${brand.border.item}`,
                color: brand.text.primary,
                fontSize: "13px",
                outline: "none",
                width: "120px",
                boxSizing: "border-box",
              }}
            />
          </div>
          )}
          <textarea
            value={r8.freeText}
            onChange={(e) => setR8(s => ({ ...s, freeText: e.target.value }))}
            placeholder="Free text — anything else about this journey?"
            rows={2}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              background: brand.bg.page,
              border: `1px solid ${brand.border.item}`,
              color: brand.text.primary,
              fontSize: "13px",
              lineHeight: 1.5,
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
              caretColor: brand.text.primary,
            }}
          />
          <button
            type="submit"
            style={{
              alignSelf: "flex-end",
              padding: "7px 16px",
              borderRadius: brand.radius.button,
              background: brand.text.primary,
              border: "none",
              color: brand.bg.page,
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Save note
          </button>
        </form>
      )}
    </div>
  );
}

// ── Knowledge reveal ────────────────────────────────────────────────────────────

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
        <span style={{ fontSize: "12px", fontWeight: "600", color: brand.text.muted, letterSpacing: "0.02em" }}>Learn more about this</span>
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

// ── Card validator/normalizer ─────────────────────────────────────────────────

function normalizeCard(raw: unknown): InterestCard | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;
  if (typeof c.question !== "string" || typeof c.mechanic !== "string") return null;

  const base = {
    id: (c.id as string) ?? "interest-generated",
    question: c.question as string,
    mechanic: c.mechanic as InterestCard["mechanic"],
    topic: "interests" as const,
    thumbId: "interests-default",
    knowledgeReveal: (c.knowledgeReveal as string) ?? undefined,
    conversationTakeaway: (c.conversationTakeaway as string) ?? undefined,
  };

  if (c.mechanic === "grouping") {
    const zones = Array.isArray(c.zones) ? c.zones : [];
    const items = Array.isArray(c.items) ? c.items : [];
    if (zones.length < 2 || items.length < 4) return null;
    // Every item must reference an existing zone
    const zoneIds = new Set(zones.map((z: { id: string }) => z.id));
    if (items.some((i: { correctGroup: string }) => !zoneIds.has(i.correctGroup))) return null;
    return { ...base, mechanic: "grouping", zones, items } as InterestCard;
  }
  if (c.mechanic === "matching") {
    const pairs = Array.isArray(c.pairs) ? c.pairs : [];
    if (pairs.length < 2) return null;
    // Right-side targets must be unique (no duplicate answers)
    const rights = pairs.map((p: { right: string }) => p.right?.trim().toLowerCase());
    if (new Set(rights).size !== rights.length) return null;
    // Left-side labels must also be unique
    const lefts = pairs.map((p: { left: string; searchTerm?: string }) =>
      (p.left ?? p.searchTerm ?? "").trim().toLowerCase()
    );
    if (new Set(lefts).size !== lefts.length) return null;
    return { ...base, mechanic: "matching", pairs } as InterestCard;
  }
  if (c.mechanic === "sequence") {
    const sequence = Array.isArray(c.sequence) ? c.sequence : [];
    if (sequence.length < 3) return null;
    // IDs must be unique
    const ids = sequence.map((s: { id: string }) => s.id);
    if (new Set(ids).size !== ids.length) return null;
    return { ...base, mechanic: "sequence", sequence } as InterestCard;
  }
  if (c.mechanic === "multiple-choice") {
    const options = Array.isArray(c.options) ? c.options : [];
    const correctIds = Array.isArray(c.correctIds) ? c.correctIds : [];
    if (options.length < 2) return null;
    // Every correctId must reference an existing option
    const optionIds = new Set(options.map((o: { id: string }) => o.id));
    if (correctIds.length === 0 || correctIds.some((id: string) => !optionIds.has(id))) return null;
    // Option texts must be unique
    const texts = options.map((o: { text: string }) => o.text?.trim().toLowerCase());
    if (new Set(texts).size !== texts.length) return null;
    return { ...base, mechanic: "multiple-choice", options, correctIds } as InterestCard;
  }
  return null;
}

function CardSkeleton({ topic }: { topic: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes skeletonFade {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.9; }
        }
        .sk-shimmer {
          background: linear-gradient(
            90deg,
            ${brand.bg.raised} 0%,
            ${brand.bg.hover} 40%,
            ${brand.bg.raised} 80%
          );
          background-size: 800px 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
      `}</style>

      <div style={{ fontSize: "12px", color: brand.text.muted, marginBottom: "4px", animation: "skeletonFade 1.8s ease-in-out infinite" }}>
        Building your question on <span style={{ color: brand.text.secondary, fontWeight: "600" }}>{topic}</span>…
      </div>

      {/* Hero block */}
      <div className="sk-shimmer" style={{ height: "160px", borderRadius: "18px" }} />

      {/* Option blocks */}
      {[88, 68, 68, 88].map((h, i) => (
        <div
          key={i}
          className="sk-shimmer"
          style={{
            height: `${h}px`,
            borderRadius: brand.radius.item,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Game renderer ─────────────────────────────────────────────────────────────────

function GameRenderer({ card, onComplete }: { card: InterestCard; onComplete: () => void }) {
  if (card.mechanic === "sequence") {
    return <SequenceGame key={card.question} question={card.question} sequence={card.sequence} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} autoComplete />;
  }
  if (card.mechanic === "grouping") {
    return <GroupingGame key={card.question} question={card.question} zones={card.zones} items={card.items} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} autoComplete />;
  }
  if (card.mechanic === "matching") {
    return <MatchingGame key={card.question} question={card.question} pairs={card.pairs} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} autoComplete />;
  }
  if (card.mechanic === "multiple-choice") {
    return <MultipleChoiceGame key={card.question} question={card.question} mediaUrl={card.mediaUrl} options={card.options} correctIds={card.correctIds} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} autoComplete />;
  }
  return null;
}

// ── Hero ─────────────────────────────────────────────────────────────────────────

function CardHero({ card }: { card: InterestCard }) {
  const isImageMatch = card.mechanic === "matching" && card.pairs?.some((p: { imageUrl?: string }) => p.imageUrl);
  const mechLabel: Record<string, string> = {
    "multiple-choice": "Quiz", matching: "Matching", sequence: "Sequence", grouping: "Grouping",
  };
  const label = isImageMatch ? "Image Match" : (mechLabel[card.mechanic] ?? card.mechanic);
  return (
    <div style={{ width: "100%", height: "160px", borderRadius: "18px", overflow: "hidden", background: brand.bg.raised, position: "relative", marginBottom: "20px", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.7) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 18px 16px" }}>
        <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "5px" }}>
          Follow Your Curiosity · {label}
        </div>
        <div style={{ fontSize: "clamp(1.1rem, 5vw, 1.3rem)", fontWeight: "800", color: "#ffffff", lineHeight: "1.18", letterSpacing: "-0.025em", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
          {card.question}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────────

type Phase = "input" | "refining" | "loading" | "card";
type RefinePill = { label: string; bridge: boolean };

export default function InterestsPage() {
  const router = useRouter();
  const { profile, recordCorrect } = useProfile();

  const [phase, setPhaseRaw] = useState<Phase>("input");
  function setPhase(next: Phase) {
    console.log(`[phase] ${phase} → ${next}`, new Error().stack?.split("\n")[2]?.trim());
    setPhaseRaw(next);
  }
  const [loadingTopic, setLoadingTopic] = useState("");
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [rawTopic, setRawTopic] = useState("");
  const [refinePills, setRefinePills] = useState<RefinePill[]>([]);
  const [refineLoading, setRefineLoading] = useState(false);
  const [refineOtherOpen, setRefineOtherOpen] = useState(false);
  const [refineOtherValue, setRefineOtherValue] = useState("");
  const [sessionIntent, setSessionIntent] = useState<SessionIntent | null>(null);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [card, setCard] = useState<InterestCard | null>(null);
  const [nextDirections, setNextDirections] = useState<NextDirection[]>([]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [recentMechanics, setRecentMechanics] = useState<string[]>([]);
  const [cardCompleted, setCardCompleted] = useState(false);
  const [nextSelected, setNextSelected] = useState<string | null>(null);
  const [forYouTopics, setForYouTopics] = useState<string[]>([]);
  const [forYouLoading, setForYouLoading] = useState(true);
  const [cardsAnswered, setCardsAnswered] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastTopicFetchAt = useRef(-1);
  const generateAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (phase === "input") inputRef.current?.focus();
  }, [phase]);

  // Scroll to top of card when a new one loads
  useEffect(() => {
    if (phase === "card") {
      setTimeout(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [phase, card]);

  // Fetch personalized topics on mount + every 5 cards answered
  useEffect(() => {
    const historyQuestions = profile.history.map((h) => h.question);
    if (historyQuestions.length === 0) {
      setForYouLoading(false);
      return;
    }
    const fetchedAt = lastTopicFetchAt.current;
    if (fetchedAt !== -1 && cardsAnswered - fetchedAt < 5) return;
    lastTopicFetchAt.current = cardsAnswered;

    setForYouLoading(true);
    fetch("/api/nuggets/interests/topics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history: historyQuestions }),
    })
      .then((r) => r.json())
      .then((data: { topics: string[] }) => {
        if (Array.isArray(data.topics) && data.topics.length > 0) {
          setForYouTopics(data.topics);
        }
      })
      .catch(() => {})
      .finally(() => setForYouLoading(false));
  }, [cardsAnswered]); // eslint-disable-line react-hooks/exhaustive-deps

  const completedQuestions = profile.history.map((h) => h.question);

  async function generate(topic: string) {
    // Abort any in-flight generate call before starting a new one
    generateAbort.current?.abort();
    const ctrl = new AbortController();
    generateAbort.current = ctrl;

    setPhase("loading");
    setLoadingTopic(topic);
    setGenerateError(null);
    setCardCompleted(false);
    setNextSelected(null);
    setNextDirections([]);

    try {
      const res = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, history, completedQuestions, recentMechanics, intent: sessionIntent, currentFocus, experiment: null }),
        signal: ctrl.signal,
      });
      const data: GenerateResponse = await res.json();
      const normalized = normalizeCard(data.card);
      if (!normalized) throw new Error("Invalid card");

      // Ignore if a newer call has already taken over
      if (ctrl.signal.aborted) return;

      setCard(normalized);
      setNextDirections(data.nextDirections ?? []);
      setHistory((prev) => [...prev, topic]);
      setRecentMechanics((prev) => [...prev, data.card.mechanic]);
      setPhase("card");
    } catch (err) {
      if ((err as Error)?.name === "AbortError") return;
      setGenerateError("Couldn't load the next card. Tap to try again.");
    }
  }

  async function refine(topic: string) {
    setRawTopic(topic);
    setRefineLoading(true);
    setRefineOtherOpen(false);
    setRefineOtherValue("");
    setRefinePills([]);
    setSessionIntent(null);
    setCurrentFocus(null);
    setPhase("refining");

    try {
      const res = await fetch("/api/nuggets/interests/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, history: completedQuestions.slice(-20) }),
      });
      const data = await res.json() as { pills: RefinePill[]; intent?: SessionIntent | null };
      setRefinePills(Array.isArray(data.pills) ? data.pills : []);
      setSessionIntent(data.intent ?? null);
    } catch {
      // fall through to generate directly if refine fails
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

  function handleDirectionSelect(topic: string) {
    setNextSelected(topic);
    setCurrentFocus(topic);
    setLoadingNext(true);
    generate(topic).finally(() => setLoadingNext(false));
  }

  function handleCardComplete() {
    setCardCompleted(true);
    setCardsAnswered((n) => n + 1);
    if (card) recordCorrect(card.question);
  }

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>
      <ShellBar title="Follow Your Curiosity" onBack={() => router.push("/nuggets")} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "64px", paddingBottom: "64px" }}>
        <div style={{ width: "100%", maxWidth: "390px", padding: "16px 20px", display: "flex", flexDirection: "column" }}>

          {/* ── Input phase ── */}
          {phase === "input" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  Follow your curiosity.
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Type a topic, a name, a question — anything. Your Learning Director takes it from there.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. Roman Empire, how vaccines work, jazz…"
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: brand.radius.item,
                    background: brand.bg.raised,
                    border: `1px solid ${brand.border.accent}`,
                    color: brand.text.primary,
                    fontSize: "15px",
                    fontWeight: "400",
                    outline: "none",
                    boxSizing: "border-box",
                    caretColor: brand.text.primary,
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  style={{
                    padding: "14px",
                    borderRadius: brand.radius.button,
                    background: inputValue.trim() ? brand.text.primary : brand.bg.raised,
                    border: `1px solid ${brand.border.accent}`,
                    color: inputValue.trim() ? brand.bg.page : brand.text.muted,
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: inputValue.trim() ? "pointer" : "default",
                    transition: brand.motion.snap,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Start learning
                </button>
              </form>

              <div>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "10px" }}>
                  {forYouTopics.length > 0 ? "For you" : forYouLoading ? "For you" : "Open a door"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {forYouLoading
                    ? [80, 110, 90, 120, 70, 100].map((w, i) => (
                        <div key={i} style={{
                          width: `${w}px`, height: "34px", borderRadius: "99px",
                          background: brand.bg.raised, border: `1px solid ${brand.border.item}`,
                          opacity: 0.5,
                        }} />
                      ))
                    : (forYouTopics.length > 0
                        ? forYouTopics
                        : ["Roman Empire", "Black holes", "Jazz history", "Ancient Egypt", "How vaccines work", "Cryptocurrency"]
                      ).map((s) => (
                    <button
                      key={s}
                      onClick={() => refine(s)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "99px",
                        background: brand.bg.raised,
                        border: `1px solid ${brand.border.item}`,
                        color: brand.text.secondary,
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
                </div>
              </div>
            </div>
          )}

          {/* ── Refining phase ── */}
          {phase === "refining" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  What about {rawTopic}?
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Pick an angle — or type your own below.
                </p>
              </div>

              {refineLoading ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        height: "36px",
                        width: `${60 + (i % 5) * 18}px`,
                        borderRadius: "99px",
                        background: brand.bg.raised,
                        opacity: 0.5,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {refinePills.map((p) => (
                      <button
                        key={p.label}
                        onClick={() => generate(`${rawTopic} — ${p.label}`)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "99px",
                          background: brand.bg.raised,
                          border: `1px solid ${brand.border.item}`,
                          color: brand.text.secondary,
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

                    {/* Other pill */}
                    {!refineOtherOpen && (
                      <button
                        onClick={() => setRefineOtherOpen(true)}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "99px",
                          background: "transparent",
                          border: `1px dashed ${brand.border.accent}`,
                          color: brand.text.muted,
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          WebkitTapHighlightColor: "transparent",
                          transition: brand.motion.snap,
                        }}
                      >
                        Other…
                      </button>
                    )}
                  </div>

                  {/* Other free-text input */}
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
                        placeholder={`Something specific about ${rawTopic}…`}
                        style={{
                          flex: 1,
                          padding: "10px 14px",
                          borderRadius: brand.radius.item,
                          background: brand.bg.raised,
                          border: `1px solid ${brand.border.accent}`,
                          color: brand.text.primary,
                          fontSize: "14px",
                          outline: "none",
                          caretColor: brand.text.primary,
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!refineOtherValue.trim()}
                        style={{
                          padding: "10px 16px",
                          borderRadius: brand.radius.button,
                          background: refineOtherValue.trim() ? brand.text.primary : brand.bg.raised,
                          border: `1px solid ${brand.border.accent}`,
                          color: refineOtherValue.trim() ? brand.bg.page : brand.text.muted,
                          fontSize: "13px",
                          fontWeight: "700",
                          cursor: refineOtherValue.trim() ? "pointer" : "default",
                          transition: brand.motion.snap,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Go →
                      </button>
                    </form>
                  )}
                </div>
              )}

              <button
                onClick={() => setPhase("input")}
                style={{
                  background: "none",
                  border: "none",
                  color: brand.text.muted,
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                }}
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
                  <EvalPanel card={card} nextSelected={nextSelected} cardIndex={history.length} />
                  <NextDirections
                    directions={nextDirections}
                    onSelect={handleDirectionSelect}
                    loading={loadingNext}
                    originalGoal={sessionIntent?.startingFocus ?? null}
                  />
                  {forYouTopics.length > 0 && (
                    <div style={{ marginTop: "24px" }}>
                      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "10px" }}>
                        For you
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {forYouTopics.map((t) => (
                          <button
                            key={t}
                            onClick={() => handleDirectionSelect(t)}
                            style={{
                              padding: "8px 14px",
                              borderRadius: "99px",
                              background: brand.bg.raised,
                              border: `1px solid ${brand.border.item}`,
                              color: brand.text.secondary,
                              fontSize: "13px",
                              fontWeight: "500",
                              cursor: "pointer",
                              WebkitTapHighlightColor: "transparent",
                              transition: brand.motion.snap,
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
