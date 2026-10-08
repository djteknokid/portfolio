"use client";

import { useState, useEffect } from "react";
import SequenceGame from "./SequenceGame";
import GroupingGame from "./GroupingGame";
import MatchingGame from "./MatchingGame";
import RankedListGame from "./RankedListGame";
import ProfilePanel from "./ProfilePanel";
import { brand } from "./brand";
import { useProfile } from "./useProfile";
import { seedLibrary } from "@/lib/nuggets/seed";
import { findGoldByTopic, getRecommendations, saveDrafts, recordToCard, getSequenceByQuestion, getGoldSequences } from "@/lib/nuggets/library";
import type { SequenceRecord } from "@/lib/nuggets/library";
import { GAME_QUESTIONS } from "./games/questions";
import type { Question } from "./games/questions";

function AllThumb({ id, full }: { id: string; full?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return full ? null : <div style={{ width: "56px", height: "56px", flexShrink: 0 }} />;
  return (
    <img
      src={`/nuggets/thumbs/${id}.jpg`}
      alt=""
      onError={() => setFailed(true)}
      style={full
        ? { width: "100%", height: "200px", borderRadius: "14px", objectFit: "cover" }
        : { width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }
      }
    />
  );
}

interface SequenceCard {
  kind: "sequence";
  question: string;
  sequence: { id: string; text: string }[];
  thumbId: string;
}

type ActiveCard = SequenceCard | (Question & { kind: Exclude<Question["mechanic"], "sequence"> | "sequence"; thumbId: string });

// Flatten: all active cards have question, thumbId, mechanic
type AnyCard =
  | { mechanic: "sequence"; question: string; sequence: { id: string; text: string }[]; thumbId: string }
  | (Question & { thumbId: string });

interface LegacyCard {
  question: string;
  sequence: { id: string; text: string }[];
}

async function fetchCards(completed: LegacyCard[], seed?: string, skipped?: string[]): Promise<LegacyCard[]> {
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
    (c): c is LegacyCard =>
      typeof c?.question === "string" &&
      Array.isArray(c?.sequence) &&
      c.sequence.length > 0
  );
  if (valid.length > 0) {
    try { saveDrafts(valid); } catch {}
  }
  return valid;
}

function legacyToAny(c: LegacyCard): AnyCard {
  const rec = getSequenceByQuestion(c.question);
  return { mechanic: "sequence", question: c.question, sequence: c.sequence, thumbId: rec?.id ?? "" };
}

function gameQuestionToAny(q: Question): AnyCard {
  return { ...q, thumbId: q.id } as AnyCard;
}

export default function NuggetDeck() {
  const [topic, setTopic] = useState("");
  const [card, setCard] = useState<AnyCard | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [nextCards, setNextCards] = useState<LegacyCard[]>([]);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingSkip, setLoadingSkip] = useState(false);
  const [loadingNugget, setLoadingNugget] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [allGold, setAllGold] = useState<SequenceRecord[]>([]);
  const { profile, recordCorrect } = useProfile();

  useEffect(() => {
    seedLibrary();
    setAllGold(getGoldSequences());
  }, []);

  function fetchNext(completedCards: LegacyCard[]) {
    const lastCard = completedCards[completedCards.length - 1];
    if (!lastCard) return;
    const record = getSequenceByQuestion(lastCard.question);
    const fromId = record?.id ?? "";
    const excludeQuestions = completedCards.map((c) => c.question);
    const recs = getRecommendations(fromId, excludeQuestions);
    setNextCards(recs.map(recordToCard));
    setLoadingNext(false);
  }

  async function handleStartWith(value: string) {
    setTopic(value);
    setLoadingStart(true);
    try {
      const cards = await fetchCards([], value);
      if (cards[0]) {
        setCard(legacyToAny(cards[0]));
        setNextCards([]);
        fetchNext([cards[0]]);
      }
    } finally {
      setLoadingStart(false);
    }
  }

  async function handleSkip() {
    if (!card || card.mechanic !== "sequence") return;
    const newSkipped = [...skipped, card.question];
    setSkipped(newSkipped);
    setLoadingSkip(true);
    setNextCards([]);
    const legacyCompleted = completedQuestions
      .map((q) => allGold.find((g) => g.question === q))
      .filter(Boolean)
      .map((r) => recordToCard(r!));
    try {
      const cards = await fetchCards(legacyCompleted, topic || undefined, newSkipped);
      if (cards[0]) {
        setCard(legacyToAny(cards[0]));
        fetchNext([...legacyCompleted, cards[0]]);
      }
    } finally {
      setLoadingSkip(false);
    }
  }

  function handleComplete() {
    if (!card) return;
    recordCorrect(card.question);
    setCompletedQuestions((prev) => [...prev, card!.question]);
    if (card.mechanic === "sequence" && nextCards.length === 0) {
      const legacyCompleted = [...completedQuestions, card.question]
        .map((q) => allGold.find((g) => g.question === q))
        .filter(Boolean)
        .map((r) => recordToCard(r!));
      fetchNext(legacyCompleted);
    }
  }

  async function handleSelectSuggestion(question: string) {
    const selected = nextCards.find((c) => c.question === question);
    if (selected) {
      setCard(legacyToAny(selected));
      setNextCards([]);
      setCompletedQuestions((prev) => [...prev, card!.question]);
      fetchNext([...completedQuestions.map((q) => ({ question: q, sequence: [] })), selected]);
      return;
    }
    setLoadingNugget(question);
    try {
      const legacyCompleted = completedQuestions
        .map((q) => allGold.find((g) => g.question === q))
        .filter(Boolean)
        .map((r) => recordToCard(r!));
      const cards = await fetchCards([...legacyCompleted, card as LegacyCard], question);
      if (cards[0]) {
        setCard(legacyToAny(cards[0]));
        setNextCards([]);
        setCompletedQuestions((prev) => [...prev, card!.question]);
        fetchNext([...legacyCompleted, card as LegacyCard, cards[0]]);
      }
    } finally {
      setLoadingNugget(null);
    }
  }

  function handleSelectFromAll(seq: SequenceRecord) {
    setShowAll(false);
    if (card) setCompletedQuestions((prev) => [...prev, card.question]);
    const c = legacyToAny(recordToCard(seq));
    setCard(c);
    setNextCards([]);
  }

  function handleSelectGameQuestion(q: Question) {
    setShowAll(false);
    if (card) setCompletedQuestions((prev) => [...prev, card.question]);
    setCard(gameQuestionToAny(q));
    setNextCards([]);
  }

  const totalCount = allGold.length + GAME_QUESTIONS.length;

  const scoreChip = (
    <button
      onClick={() => totalCount > 0 ? setShowAll(true) : setProfileOpen(true)}
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
      {profile.score > 0 && (
        <>
          <span style={{ fontSize: "13px", fontWeight: "700", color: brand.text.primary }}>
            {profile.score}
          </span>
          <span style={{ ...brand.type.label, color: brand.text.muted }}>
            solved ·
          </span>
        </>
      )}
      <span style={{ ...brand.type.label, color: brand.text.muted }}>
        all
      </span>
    </button>
  );

  const allQuestionsOverlay = showAll ? (
    <div
      onClick={() => setShowAll(false)}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(8,8,8,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "420px",
          maxHeight: "80vh",
          background: brand.bg.card,
          border: `1px solid ${brand.border.card}`,
          borderRadius: "24px 24px 0 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "16px 24px 0", flexShrink: 0 }}>
          <div style={{ width: "32px", height: "3px", borderRadius: "2px", background: brand.border.accent, margin: "0 auto 20px" }} />
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ ...brand.type.label, color: brand.text.muted }}>All questions</span>
            <span style={{ fontSize: "11px", color: brand.text.muted }}>{totalCount}</span>
          </div>
        </div>

        <div style={{ overflowY: "auto", padding: "0 24px 32px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {allGold.map((seq) => {
            const isCurrent = card?.question === seq.question;
            const isDone = completedQuestions.includes(seq.question);
            return (
              <button
                key={seq.id}
                onClick={() => !isCurrent && handleSelectFromAll(seq)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: brand.radius.item,
                  background: isCurrent ? brand.bg.hover : brand.bg.raised,
                  border: `1px solid ${isCurrent ? brand.border.accent : brand.border.item}`,
                  color: isCurrent ? brand.text.primary : isDone ? brand.text.muted : brand.text.secondary,
                  fontSize: "13px", fontWeight: "500", lineHeight: "1.4",
                  textAlign: "left",
                  cursor: isCurrent ? "default" : "pointer",
                  transition: brand.motion.snap,
                  display: "flex", alignItems: "center", gap: "12px",
                  opacity: isDone && !isCurrent ? 0.5 : 1,
                }}
              >
                <AllThumb id={seq.id} />
                <span style={{ flex: 1 }}>{seq.question}</span>
                {isDone && <span style={{ fontSize: "11px", color: brand.status.correct.text, flexShrink: 0 }}>✓</span>}
                {isCurrent && <span style={{ fontSize: "10px", ...brand.type.label, color: brand.text.muted, flexShrink: 0 }}>now</span>}
              </button>
            );
          })}

          {GAME_QUESTIONS.map((q) => {
            const isCurrent = card?.question === q.question;
            const isDone = completedQuestions.includes(q.question);
            return (
              <button
                key={q.id}
                onClick={() => !isCurrent && handleSelectGameQuestion(q)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: brand.radius.item,
                  background: isCurrent ? brand.bg.hover : brand.bg.raised,
                  border: `1px solid ${isCurrent ? brand.border.accent : brand.border.item}`,
                  color: isCurrent ? brand.text.primary : isDone ? brand.text.muted : brand.text.secondary,
                  fontSize: "13px", fontWeight: "500", lineHeight: "1.4",
                  textAlign: "left",
                  cursor: isCurrent ? "default" : "pointer",
                  transition: brand.motion.snap,
                  display: "flex", alignItems: "center", gap: "12px",
                  opacity: isDone && !isCurrent ? 0.5 : 1,
                }}
              >
                <AllThumb id={q.id} />
                <span style={{ flex: 1 }}>{q.question}</span>
                {isDone && <span style={{ fontSize: "11px", color: brand.status.correct.text, flexShrink: 0 }}>✓</span>}
                {isCurrent && <span style={{ fontSize: "10px", ...brand.type.label, color: brand.text.muted, flexShrink: 0 }}>now</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
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

  if (!card) {
    return (
      <>
        {scoreChip}
        {allQuestionsOverlay}
        <ProfilePanel profile={profile} open={profileOpen} onClose={() => setProfileOpen(false)} />
        <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "36px" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <h1 style={{ margin: 0, color: brand.text.primary, fontWeight: "700", fontSize: "28px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Sequence
            </h1>
            <p style={{ margin: 0, fontSize: "14px", color: brand.text.muted, lineHeight: "1.5" }}>
              Pick anything. We&apos;ll turn it into a sequence.
            </p>
          </div>

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
                    fontSize: "13px", fontWeight: "500",
                    cursor: loadingStart ? "default" : "pointer",
                    transition: brand.motion.snap,
                  }}
                >
                  {loadingStart && topic === t ? "Generating…" : t}
                </button>
              ))}
            </div>
          </div>

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
                  fontSize: "14px", fontWeight: "500",
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
                  fontSize: "13px", fontWeight: "700",
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

  const suggestions = nextCards.map((c) => ({
    id: getSequenceByQuestion(c.question)?.id ?? c.question,
    question: c.question,
  }));

  return (
    <>
      {scoreChip}
      {allQuestionsOverlay}
      <ProfilePanel profile={profile} open={profileOpen} onClose={() => setProfileOpen(false)} />
      <div style={{ width: "100%", maxWidth: "340px", display: "flex", flexDirection: "column", gap: "32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <AllThumb id={card.thumbId} full />
          <h1 style={{
            margin: 0,
            color: brand.text.primary,
            fontWeight: "700",
            fontSize: "clamp(1.5rem, 6vw, 1.9rem)",
            letterSpacing: "-0.03em",
            lineHeight: "1.15",
          }}>
            {card.question}
          </h1>
        </div>

        {card.mechanic === "sequence" && (
          <SequenceGame
            key={card.question}
            question={card.question}
            sequence={card.sequence}
            onComplete={handleComplete}
            onSkip={handleSkip}
            loadingSkip={loadingSkip}
            suggestions={suggestions}
            loadingSuggestions={loadingNext}
            onSelectSuggestion={handleSelectSuggestion}
            loadingNugget={loadingNugget}
          />
        )}

        {card.mechanic === "grouping" && (
          <GroupingGame
            key={card.question}
            question={card.question}
            zones={card.zones}
            items={card.items}
            onComplete={handleComplete}
          />
        )}

        {card.mechanic === "matching" && (
          <MatchingGame
            key={card.question}
            question={card.question}
            pairs={card.pairs}
            onComplete={handleComplete}
          />
        )}

        {card.mechanic === "ranked" && (
          <RankedListGame
            key={card.question}
            question={card.question}
            items={card.items}
            onComplete={handleComplete}
          />
        )}
      </div>
    </>
  );
}
