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

// ── Direction cards ─────────────────────────────────────────────────────────────

const DIRECTION_STYLES: Record<string, { accent: string; icon: string }> = {
  deeper:     { accent: "#60a5fa", icon: "↓" },
  connection: { accent: "#a78bfa", icon: "→" },
  surprise:   { accent: "#f59e0b", icon: "✦" },
};

function NextDirections({ directions, onSelect, loading }: {
  directions: NextDirection[];
  onSelect: (topic: string) => void;
  loading: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "28px" }}>
      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "4px" }}>
        Where to next?
      </div>
      {loading
        ? [1, 2, 3].map((i) => (
            <div key={i} style={{ height: "68px", borderRadius: brand.radius.item, background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.4 + i * 0.1 }} />
          ))
        : directions.map((d) => {
            const style = DIRECTION_STYLES[d.type] ?? DIRECTION_STYLES.deeper;
            return (
              <button
                key={d.topic}
                onClick={() => onSelect(d.topic)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: brand.radius.item,
                  background: brand.bg.raised,
                  border: `1px solid ${brand.border.item}`,
                  textAlign: "left",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: brand.motion.snap,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                  background: `${style.accent}18`,
                  border: `1px solid ${style.accent}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", color: style.accent, marginTop: "1px",
                }}>
                  {style.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: style.accent, marginBottom: "3px" }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: brand.text.secondary, lineHeight: 1.4 }}>
                    {d.description}
                  </div>
                </div>
              </button>
            );
          })
      }
    </div>
  );
}

// ── Knowledge reveal ────────────────────────────────────────────────────────────

function KnowledgeReveal({ reveal, takeaway }: { reveal?: string; takeaway?: string }) {
  if (!reveal && !takeaway) return null;
  return (
    <div style={{
      marginTop: "20px",
      padding: "16px 18px",
      borderRadius: brand.radius.item,
      background: brand.bg.raised,
      border: `1px solid ${brand.border.item}`,
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
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
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────────────

function CardSkeleton({ topic }: { topic: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ fontSize: "12px", color: brand.text.muted, marginBottom: "4px" }}>
        Learning about <span style={{ color: brand.text.secondary, fontWeight: "600" }}>{topic}</span>…
      </div>
      <div style={{ height: "160px", borderRadius: "18px", background: brand.bg.raised, opacity: 0.6 }} />
      {[90, 72, 72, 90].map((h, i) => (
        <div key={i} style={{ height: `${h}px`, borderRadius: brand.radius.item, background: brand.bg.raised, opacity: 0.25 + i * 0.08 }} />
      ))}
    </div>
  );
}

// ── Game renderer ─────────────────────────────────────────────────────────────────

function GameRenderer({ card, onComplete }: { card: InterestCard; onComplete: () => void }) {
  if (card.mechanic === "sequence") {
    return <SequenceGame key={card.question} question={card.question} sequence={card.sequence} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} />;
  }
  if (card.mechanic === "grouping") {
    return <GroupingGame key={card.question} question={card.question} zones={card.zones} items={card.items} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} />;
  }
  if (card.mechanic === "matching") {
    return <MatchingGame key={card.question} question={card.question} pairs={card.pairs} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} />;
  }
  if (card.mechanic === "multiple-choice") {
    return <MultipleChoiceGame key={card.question} question={card.question} mediaUrl={card.mediaUrl} options={card.options} correctIds={card.correctIds} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} />;
  }
  return null;
}

// ── Hero ─────────────────────────────────────────────────────────────────────────

function CardHero({ card }: { card: InterestCard }) {
  const mechLabel: Record<string, string> = {
    "multiple-choice": "Quiz", matching: "Matching", sequence: "Sequence", grouping: "Grouping",
  };
  return (
    <div style={{ width: "100%", height: "160px", borderRadius: "18px", overflow: "hidden", background: brand.bg.raised, position: "relative", marginBottom: "20px", flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.7) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 18px 16px" }}>
        <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "5px" }}>
          Follow Your Curiosity · {mechLabel[card.mechanic] ?? card.mechanic}
        </div>
        <div style={{ fontSize: "clamp(1.1rem, 5vw, 1.3rem)", fontWeight: "800", color: "#ffffff", lineHeight: "1.18", letterSpacing: "-0.025em", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
          {card.question}
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────────

type Phase = "input" | "loading" | "card";

export default function InterestsPage() {
  const router = useRouter();
  const { profile, recordCorrect } = useProfile();

  const [phase, setPhase] = useState<Phase>("input");
  const [loadingTopic, setLoadingTopic] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [card, setCard] = useState<InterestCard | null>(null);
  const [nextDirections, setNextDirections] = useState<NextDirection[]>([]);
  const [loadingNext, setLoadingNext] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [recentMechanics, setRecentMechanics] = useState<string[]>([]);
  const [cardCompleted, setCardCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "input") inputRef.current?.focus();
  }, [phase]);

  // Scroll to top of card when a new one loads
  useEffect(() => {
    if (phase === "card") {
      setTimeout(() => cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [phase, card]);

  const completedQuestions = profile.history.map((h) => h.question);

  async function generate(topic: string) {
    setPhase("loading");
    setLoadingTopic(topic);
    setCardCompleted(false);
    setNextDirections([]);

    try {
      const res = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, history, completedQuestions, recentMechanics }),
      });
      const data: GenerateResponse = await res.json();
      if (!data.card) throw new Error("No card");

      setCard(data.card);
      setNextDirections(data.nextDirections ?? []);
      setHistory((prev) => [...prev, topic]);
      setRecentMechanics((prev) => [...prev, data.card.mechanic]);
      setPhase("card");
    } catch {
      setPhase("input");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    setInputValue("");
    generate(val);
  }

  function handleDirectionSelect(topic: string) {
    setLoadingNext(true);
    generate(topic).finally(() => setLoadingNext(false));
  }

  function handleCardComplete() {
    setCardCompleted(true);
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
                  Open a door
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Roman Empire", "Black holes", "Jazz history", "Ancient Egypt", "How vaccines work", "Cryptocurrency"].map((s) => (
                    <button
                      key={s}
                      onClick={() => generate(s)}
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

          {/* ── Loading phase ── */}
          {phase === "loading" && <CardSkeleton topic={loadingTopic} />}

          {/* ── Card phase ── */}
          {phase === "card" && card && (
            <div ref={cardRef} style={{ display: "flex", flexDirection: "column" }}>
              <CardHero card={card} />
              <GameRenderer card={card} onComplete={handleCardComplete} />

              {cardCompleted && (
                <>
                  <KnowledgeReveal reveal={card.knowledgeReveal} takeaway={card.conversationTakeaway} />
                  <NextDirections
                    directions={nextDirections}
                    onSelect={handleDirectionSelect}
                    loading={loadingNext}
                  />
                </>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
