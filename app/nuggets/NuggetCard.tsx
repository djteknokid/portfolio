"use client";

import { useState, useRef, useEffect } from "react";
import SequenceGame from "./SequenceGame";
import ProfilePanel from "./ProfilePanel";
import { brand } from "./brand";
import { useProfile } from "./useProfile";
import { seedLibrary } from "@/lib/nuggets/seed";
import { findGoldByTopic, getNextSequences, saveDrafts, recordToCard, getSequenceByQuestion } from "@/lib/nuggets/library";

interface Card {
  question: string;
  sequence: { id: string; text: string }[];
}

async function fetchCards(completed: Card[], seed?: string, skipped?: string[]): Promise<Card[]> {
  // Check gold library first (client-side, instant)
  if (seed) {
    const goldMatches = findGoldByTopic(seed, [
      ...completed.map((c) => c.question),
      ...(skipped ?? []),
    ]);
    if (goldMatches.length >= 1) {
      return goldMatches.slice(0, 4).map(recordToCard);
    }
  }

  const res = await fetch("/api/nuggets/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed, seed, skipped }),
  });
  const { cards } = await res.json();
  if (!Array.isArray(cards)) return [];
  const valid = cards.filter(
    (c): c is Card =>
      typeof c?.question === "string" &&
      Array.isArray(c?.sequence) &&
      c.sequence.length > 0
  );
  // Save generated cards as drafts for human review
  if (valid.length > 0) {
    try { saveDrafts(valid); } catch {}
  }
  return valid;
}

export default function NuggetDeck() {
  const [topic, setTopic] = useState("");
  const [card, setCard] = useState<Card | null>(null);
  const [completed, setCompleted] = useState<Card[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [nextCards, setNextCards] = useState<Card[]>([]);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSkip, setLoadingSkip] = useState(false);
  const [loadingNugget, setLoadingNugget] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const fetchGen = useRef(0);
  const { profile, recordCorrect } = useProfile();

  useEffect(() => { seedLibrary(); }, []);

  async function fetchNext(completedCards: Card[]) {
    const lastCard = completedCards[completedCards.length - 1];
    if (!lastCard) return;

    // Check gold relationships first (client-side, instant)
    const goldRecord = getSequenceByQuestion(lastCard.question);
    const goldNext = goldRecord
      ? getNextSequences(goldRecord.id).filter(
          (s) => s.status === "gold" && !completedCards.some((c) => c.question === s.question)
        )
      : [];
    if (goldNext.length >= 1) {
      setNextCards(goldNext.slice(0, 4).map(recordToCard));
      return;
    }

    const gen = ++fetchGen.current;
    setLoadingNext(true);
    try {
      const fresh = await fetchCards(completedCards);
      if (gen === fetchGen.current) setNextCards(fresh.length ? fresh : []);
    } catch {
      if (gen === fetchGen.current) setNextCards([]);
    } finally {
      if (gen === fetchGen.current) setLoadingNext(false);
    }
  }

  async function handleStartWith(value: string) {
    setTopic(value);
    setLoadingStart(true);
    try {
      const cards = await fetchCards([], value);
      if (cards[0]) {
        setCard(cards[0]);
        setNextCards([]);
        fetchNext([cards[0]]);
      }
    } finally {
      setLoadingStart(false);
    }
  }

  async function handleSkip() {
    if (!card) return;
    const newSkipped = [...skipped, card.question];
    setSkipped(newSkipped);
    setLoadingSkip(true);
    setNextCards([]);
    try {
      const cards = await fetchCards(completed, topic || undefined, newSkipped);
      if (cards[0]) {
        setCard(cards[0]);
        fetchNext([...completed, cards[0]]);
      }
    } finally {
      setLoadingSkip(false);
    }
  }

  async function handleComplete() {
    if (!card) return;
    recordCorrect(card.question);
    const next = [...completed, card];
    setCompleted(next);
    if (nextCards.length === 0) fetchNext(next);
  }

  async function handleSelectSuggestion(question: string) {
    const selected = nextCards.find((c) => c.question === question);
    if (selected) {
      // Gold card — already have full data
      const next = [...completed, card!];
      setCard(selected);
      setNextCards([]);
      setCompleted(next);
      fetchNext([...next, selected]);
      return;
    }
    // Need to fetch — question is a stub
    setLoadingNugget(question);
    try {
      const cards = await fetchCards([...completed, card!], question);
      if (cards[0]) {
        const next = [...completed, card!];
        setCard(cards[0]);
        setNextCards([]);
        setCompleted(next);
        fetchNext([...next, cards[0]]);
      }
    } finally {
      setLoadingNugget(null);
    }
  }

  // Score chip shown on both screens
  const scoreChip = profile.score > 0 ? (
    <button
      onClick={() => setProfileOpen(true)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: brand.bg.raised,
        border: `1px solid ${brand.border.item}`,
        borderRadius: "99px",
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
        zIndex: 30,
        transition: brand.motion.snap,
      }}
    >
      <span style={{ fontSize: "13px", fontWeight: "700", color: brand.text.primary }}>
        {profile.score}
      </span>
      <span style={{ ...brand.type.label, color: brand.text.muted }}>
        solved
      </span>
    </button>
  ) : null;

  const TOPICS = ["WWII", "History", "Science", "Tech", "Economics", "Politics", "Culture", "Space", "Medicine"];
  const QUESTIONS = [
    "Why did the US enter WWI?",
    "Why did the Soviet Union collapse?",
    "How did Apple nearly go bankrupt?",
    "How did the 2008 financial crisis happen?",
    "Why did Hitler come to power?",
    "How did humans land on the Moon?",
  ];

  // Start screen
  if (!card) {
    return (
      <>
        {scoreChip}
        <ProfilePanel profile={profile} open={profileOpen} onClose={() => setProfileOpen(false)} />
        <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* Header */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h1 style={{ margin: 0, color: brand.text.primary, fontWeight: "700", fontSize: "28px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Sequence
            </h1>
            <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: "1.5" }}>
              Pick anything. We&apos;ll turn it into a sequence.
            </p>
          </div>

          {/* Topics */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ ...brand.type.label, color: brand.text.muted }}>Topics</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => !loadingStart && handleStartWith(t)}
                  disabled={loadingStart}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "99px",
                    background: loadingStart && topic === t ? brand.bg.hover : brand.bg.raised,
                    border: `1px solid ${loadingStart && topic === t ? brand.border.accent : brand.border.item}`,
                    color: loadingStart && topic === t ? brand.text.primary : brand.text.secondary,
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: loadingStart ? "default" : "pointer",
                    transition: brand.motion.snap,
                  }}
                >
                  {loadingStart && topic === t ? "Generating…" : t}
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ ...brand.type.label, color: brand.text.muted }}>Or try one of these</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => !loadingStart && handleStartWith(q)}
                  disabled={loadingStart}
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: brand.radius.item,
                    background: loadingStart && topic === q ? brand.bg.hover : "transparent",
                    border: `1px solid ${loadingStart && topic === q ? brand.border.accent : brand.border.item}`,
                    color: loadingStart && topic === q ? brand.text.primary : brand.text.secondary,
                    fontSize: "13px", fontWeight: "500",
                    textAlign: "left", cursor: loadingStart ? "default" : "pointer",
                    transition: brand.motion.snap,
                  }}
                >
                  {loadingStart && topic === q ? "Generating…" : q}
                </button>
              ))}
            </div>
          </div>

          {/* Custom input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ ...brand.type.label, color: brand.text.muted }}>Something else</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && topic.trim() && handleStartWith(topic.trim())}
                placeholder="e.g. Why did Rome fall?"
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: brand.radius.item,
                  background: brand.bg.raised,
                  border: `1px solid ${topic.trim() ? brand.border.accent : brand.border.item}`,
                  color: brand.text.primary,
                  fontSize: "14px",
                  fontWeight: "500",
                  outline: "none",
                  transition: brand.motion.snap,
                }}
              />
              <button
                onClick={() => topic.trim() && handleStartWith(topic.trim())}
                disabled={!topic.trim() || loadingStart}
                style={{
                  padding: "12px 16px",
                  borderRadius: brand.radius.button,
                  background: topic.trim() && !loadingStart ? brand.text.primary : brand.bg.raised,
                  border: `1px solid ${brand.border.item}`,
                  color: topic.trim() && !loadingStart ? brand.bg.page : brand.text.muted,
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: topic.trim() && !loadingStart ? "pointer" : "default",
                  transition: brand.motion.snap,
                  flexShrink: 0,
                }}
              >
                →
              </button>
            </div>
          </div>

        </div>
      </>
    );
  }

  return (
    <>
      {scoreChip}
      <ProfilePanel profile={profile} open={profileOpen} onClose={() => setProfileOpen(false)} />
      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h1 style={{
            margin: 0,
            color: brand.text.primary,
            fontWeight: "700",
            fontSize: "clamp(1.5rem, 6vw, 1.9rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.15",
            flex: 1,
            paddingRight: "16px",
          }}>
            {card.question}
          </h1>
        </div>

        <SequenceGame
          key={card.question}
          question={card.question}
          sequence={card.sequence}
          onComplete={handleComplete}
          onSkip={handleSkip}
          loadingSkip={loadingSkip}
          suggestions={nextCards.map((c) => c.question)}
          loadingSuggestions={loadingNext}
          onSelectSuggestion={handleSelectSuggestion}
          loadingNugget={loadingNugget}
        />
      </div>
    </>
  );
}
