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

type InterestCard = Question & { thumbId: string };

interface GenerateResponse {
  card: InterestCard;
  suggestions: string[];
}

// ── Suggestion chips ────────────────────────────────────────────────────────────

function SuggestionChips({ suggestions, onSelect, loading }: {
  suggestions: string[];
  onSelect: (s: string) => void;
  loading: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "4px" }}>
        What's next?
      </div>
      {loading
        ? [1, 2, 3].map((i) => (
            <div key={i} style={{ height: "44px", borderRadius: brand.radius.item, background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.5 + i * 0.1, animation: "pulse 1.5s ease-in-out infinite" }} />
          ))
        : suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: brand.radius.item,
                background: brand.bg.raised,
                border: `1px solid ${brand.border.item}`,
                color: brand.text.secondary,
                fontSize: "13px",
                fontWeight: "500",
                lineHeight: 1.4,
                textAlign: "left",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                transition: brand.motion.snap,
              }}
            >
              {s}
            </button>
          ))
      }
    </div>
  );
}

// ── Loading skeleton ─────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ height: "160px", borderRadius: "18px", background: brand.bg.raised, opacity: 0.6 }} />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ height: "52px", borderRadius: brand.radius.item, background: brand.bg.raised, opacity: 0.3 + i * 0.1 }} />
      ))}
    </div>
  );
}

// ── Game renderer ─────────────────────────────────────────────────────────────────

function GameRenderer({ card, onComplete, suggestions, loadingSuggestions, onSelectSuggestion }: {
  card: InterestCard;
  onComplete: () => void;
  suggestions: string[];
  loadingSuggestions: boolean;
  onSelectSuggestion: (s: string) => void;
}) {
  const suggestionItems = suggestions.map((s, i) => ({ id: `sug-${i}`, question: s }));

  if (card.mechanic === "sequence") {
    return <SequenceGame key={card.question} question={card.question} sequence={card.sequence} onComplete={onComplete} suggestions={suggestionItems} loadingSuggestions={loadingSuggestions} onSelectSuggestion={onSelectSuggestion} loadingNugget={null} />;
  }
  if (card.mechanic === "grouping") {
    return <GroupingGame key={card.question} question={card.question} zones={card.zones} items={card.items} onComplete={onComplete} suggestions={suggestionItems} loadingSuggestions={loadingSuggestions} onSelectSuggestion={onSelectSuggestion} loadingNugget={null} />;
  }
  if (card.mechanic === "matching") {
    return <MatchingGame key={card.question} question={card.question} pairs={card.pairs} onComplete={onComplete} suggestions={suggestionItems} loadingSuggestions={loadingSuggestions} onSelectSuggestion={onSelectSuggestion} loadingNugget={null} />;
  }
  if (card.mechanic === "multiple-choice") {
    return <MultipleChoiceGame key={card.question} question={card.question} mediaUrl={card.mediaUrl} options={card.options} correctIds={card.correctIds} onComplete={onComplete} suggestions={suggestionItems} loadingSuggestions={loadingSuggestions} onSelectSuggestion={onSelectSuggestion} loadingNugget={null} />;
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
          My Interest · {mechLabel[card.mechanic] ?? card.mechanic}
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
  const { recordCorrect } = useProfile();

  const [phase, setPhase] = useState<Phase>("input");
  const [inputValue, setInputValue] = useState("");
  const [card, setCard] = useState<InterestCard | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [cardCompleted, setCardCompleted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === "input") inputRef.current?.focus();
  }, [phase]);

  async function generate(topic: string) {
    setPhase("loading");
    setCardCompleted(false);

    try {
      const res = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, history }),
      });
      const data: GenerateResponse = await res.json();
      if (!data.card) throw new Error("No card");

      setCard(data.card);
      setSuggestions(data.suggestions ?? []);
      setHistory((prev) => [...prev, topic]);
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

  function handleSuggestionSelect(s: string) {
    setSuggestions([]);
    setLoadingSuggestions(true);
    generate(s).finally(() => setLoadingSuggestions(false));
  }

  function handleCardComplete() {
    setCardCompleted(true);
    if (card) recordCorrect(card.question);
  }

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>
      <ShellBar title="My Interest" onBack={() => router.push("/nuggets")} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "64px", paddingBottom: "48px" }}>
        <div style={{ width: "100%", maxWidth: "390px", padding: "16px 20px", display: "flex", flexDirection: "column" }}>

          {/* Input phase */}
          {phase === "input" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                  What do you want to learn?
                </h1>
                <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: 1.6 }}>
                  Type anything — a topic, a question, or just a word.
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
                  Generate
                </button>
              </form>

              {/* Quick start chips */}
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "10px" }}>
                  Try something
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Roman Empire", "Black holes", "The stock market", "DNA", "Ancient Egypt", "Cryptocurrency"].map((s) => (
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

          {/* Loading phase */}
          {phase === "loading" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "13px", color: brand.text.muted, marginBottom: "8px" }}>Generating your card…</div>
              <CardSkeleton />
            </div>
          )}

          {/* Card phase */}
          {phase === "card" && card && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <CardHero card={card} />
              <GameRenderer
                card={card}
                onComplete={handleCardComplete}
                suggestions={cardCompleted ? suggestions : []}
                loadingSuggestions={loadingSuggestions}
                onSelectSuggestion={handleSuggestionSelect}
              />
              {cardCompleted && (
                <SuggestionChips
                  suggestions={suggestions}
                  onSelect={handleSuggestionSelect}
                  loading={loadingSuggestions}
                />
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
