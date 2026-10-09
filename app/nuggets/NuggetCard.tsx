"use client";

import { useState, useEffect, useRef } from "react";
import SequenceGame from "./SequenceGame";
import GroupingGame from "./GroupingGame";
import MatchingGame from "./MatchingGame";
import RankedListGame from "./RankedListGame";
import { brand } from "./brand";
import { useProfile } from "./useProfile";
import { seedLibrary } from "@/lib/nuggets/seed";
import { getRecommendations, saveDrafts, recordToCard, getSequenceByQuestion, getGoldSequences } from "@/lib/nuggets/library";
import type { SequenceRecord } from "@/lib/nuggets/library";
import { GAME_QUESTIONS } from "./games/questions";
import type { Question } from "./games/questions";

// ── Types ─────────────────────────────────────────────────────────

type AnyCard =
  | { mechanic: "sequence"; question: string; sequence: { id: string; text: string }[]; thumbId: string; topic: string }
  | (Question & { thumbId: string });

interface LegacyCard {
  question: string;
  sequence: { id: string; text: string }[];
}

async function fetchCards(seed: string, exclude: string[]): Promise<LegacyCard[]> {
  const res = await fetch("/api/nuggets/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: [], seed, skipped: exclude }),
  });
  const { cards } = await res.json();
  if (!Array.isArray(cards)) return [];
  const valid = cards.filter(
    (c): c is LegacyCard =>
      typeof c?.question === "string" &&
      Array.isArray(c?.sequence) &&
      c.sequence.length > 0
  );
  if (valid.length > 0) { try { saveDrafts(valid); } catch {} }
  return valid;
}

function legacyToAny(c: LegacyCard): AnyCard {
  const rec = getSequenceByQuestion(c.question);
  return { mechanic: "sequence", question: c.question, sequence: c.sequence, thumbId: rec?.id ?? "", topic: rec?.topic ?? "history" };
}

function gameQuestionToAny(q: Question): AnyCard {
  return { ...q, thumbId: q.id } as AnyCard;
}

// ── Labels ────────────────────────────────────────────────────────

const TOPIC_LABEL: Record<string, string> = {
  history: "History",
  "Cold War": "History",
  WWII: "History",
  "K-pop": "Music",
  "Korean culture": "Culture",
  jazz: "Jazz",
  wine: "Wine",
  "pop culture": "Pop Culture",
};
function topicLabel(t: string) { return TOPIC_LABEL[t] ?? t; }
function mechLabel(m: string) {
  if (m === "sequence") return "Sequence";
  if (m === "matching") return "Matching";
  if (m === "grouping") return "Grouping";
  if (m === "ranked") return "Ranked";
  return m;
}

// ── Feed card ─────────────────────────────────────────────────────

function FeedCard({
  card,
  isActive,
  onTap,
  onComplete,
  suggestions,
  loadingSuggestions,
  onSelectSuggestion,
  loadingNugget,
  cardRef,
}: {
  card: AnyCard;
  isActive: boolean;
  onTap: () => void;
  onComplete: () => void;
  suggestions: { id: string; question: string }[];
  loadingSuggestions: boolean;
  onSelectSuggestion: (q: string) => void;
  loadingNugget: string | null;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div ref={cardRef} style={{ width: "100%", paddingBottom: "24px" }}>

      {/* Hero image — always shown, tappable when not active */}
      <div
        onClick={() => !isActive && onTap()}
        style={{
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: "18px",
          overflow: "hidden",
          background: brand.bg.raised,
          position: "relative",
          cursor: isActive ? "default" : "pointer",
          marginBottom: isActive ? "20px" : "0",
        }}
      >
        {!imgFailed && (
          <img
            src={`/nuggets/thumbs/${card.thumbId}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }}
          />
        )}

        {/* Scrim */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.82) 100%)",
        }} />

        {/* Title + meta */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px 24px" }}>
          <div style={{
            fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "7px",
          }}>
            {topicLabel(card.topic ?? "")} · {mechLabel(card.mechanic)}
          </div>
          <div style={{
            fontSize: "clamp(1.25rem, 5.5vw, 1.5rem)", fontWeight: "800",
            color: "#ffffff", lineHeight: "1.18", letterSpacing: "-0.025em",
            textShadow: "0 1px 8px rgba(0,0,0,0.3)",
          }}>
            {card.question}
          </div>
        </div>

        {/* Tap hint when not active */}
        {!isActive && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: "rgba(0,0,0,0.45)",
            borderRadius: "99px", padding: "4px 10px",
            fontSize: "11px", fontWeight: "500",
            color: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
          }}>
            Tap to play
          </div>
        )}
      </div>

      {/* Game — only when active */}
      {isActive && (
        <SequenceGameOrOther
          card={card}
          onComplete={onComplete}
          suggestions={suggestions}
          loadingSuggestions={loadingSuggestions}
          onSelectSuggestion={onSelectSuggestion}
          loadingNugget={loadingNugget}
        />
      )}
    </div>
  );
}

function SequenceGameOrOther({ card, onComplete, suggestions, loadingSuggestions, onSelectSuggestion, loadingNugget }: {
  card: AnyCard;
  onComplete: () => void;
  suggestions: { id: string; question: string }[];
  loadingSuggestions: boolean;
  onSelectSuggestion: (q: string) => void;
  loadingNugget: string | null;
}) {
  if (card.mechanic === "sequence") {
    return (
      <SequenceGame
        key={card.question}
        question={card.question}
        sequence={card.sequence}
        onComplete={onComplete}
        suggestions={suggestions}
        loadingSuggestions={loadingSuggestions}
        onSelectSuggestion={onSelectSuggestion}
        loadingNugget={loadingNugget}
      />
    );
  }
  if (card.mechanic === "grouping") {
    return <GroupingGame key={card.question} question={card.question} zones={card.zones} items={card.items} onComplete={onComplete} />;
  }
  if (card.mechanic === "matching") {
    return <MatchingGame key={card.question} question={card.question} pairs={card.pairs} onComplete={onComplete} />;
  }
  if (card.mechanic === "ranked") {
    return <RankedListGame key={card.question} question={card.question} items={card.items} onComplete={onComplete} />;
  }
  return null;
}

// ── Venture strip — stacked horizontal rows ────────────────────────

function VentureCard({ picks, onSelect }: {
  picks: AnyCard[];
  onSelect: (card: AnyCard) => void;
}) {
  if (picks.length === 0) return null;
  return (
    <div style={{ paddingBottom: "24px" }}>
      <div style={{
        fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em",
        textTransform: "uppercase", color: brand.text.muted,
        marginBottom: "10px",
      }}>
        Try something different
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {picks.reduce<AnyCard[]>((acc, card) => {
          const label = topicLabel(card.topic ?? "");
          if (!acc.some((c) => topicLabel(c.topic ?? "") === label)) acc.push(card);
          return acc;
        }, []).map((card) => (
          <VentureRow key={card.question} card={card} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function VentureRow({ card, onSelect }: { card: AnyCard; onSelect: (card: AnyCard) => void }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <button
      onClick={() => onSelect(card)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "10px 12px 10px 10px",
        borderRadius: "14px",
        background: "transparent",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
        transition: brand.motion.snap,
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: "52px",
        height: "40px",
        borderRadius: "8px",
        overflow: "hidden",
        flexShrink: 0,
        background: brand.bg.raised,
        border: `1px solid ${brand.border.item}`,
      }}>
        {!imgFailed && (
          <img
            src={`/nuggets/thumbs/${card.thumbId}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>

      {/* Category */}
      <span style={{
        fontSize: "14px",
        fontWeight: "500",
        color: brand.text.secondary,
        lineHeight: "1.35",
        flex: 1,
      }}>
        {topicLabel(card.topic ?? "")}
      </span>

      {/* Arrow */}
      <span style={{ fontSize: "14px", color: brand.text.muted, flexShrink: 0, opacity: 0.5 }}>›</span>
    </button>
  );
}



export default function NuggetDeck({ openAnswered, onAnsweredClose, topics }: { openAnswered?: boolean; onAnsweredClose?: () => void; topics?: string[] }) {
  const [feed, setFeed] = useState<AnyCard[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [loadingNugget, setLoadingNugget] = useState<string | null>(null);
  const [allGold, setAllGold] = useState<SequenceRecord[]>([]);
  const [showAnswered, setShowAnswered] = useState(false);
  const { profile, recordCorrect } = useProfile();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (openAnswered) setShowAnswered(true);
  }, [openAnswered]);

  useEffect(() => {
    seedLibrary();
    const gold = getGoldSequences();
    setAllGold(gold);

    const answered = profile.history.map((h) => h.question);

    // Gold sequence cards filtered by topics
    const goldCards: AnyCard[] = gold
      .map((seq) => legacyToAny(recordToCard(seq)))
      .filter((c) => !answered.includes(c.question))
      .filter((c) => !topics || topics.includes(c.topic ?? ""));

    // Game question cards filtered by topics (always included in feed when topics are set)
    const gameCards: AnyCard[] = topics
      ? GAME_QUESTIONS
          .map(gameQuestionToAny)
          .filter((c) => topics.includes(c.topic ?? "") && !answered.includes(c.question))
      : [];

    const initialFeed = [...goldCards, ...gameCards];
    setFeed(initialFeed);
  }, []);

  useEffect(() => {
    if (profile.history.length > 0) {
      setAnsweredQuestions(profile.history.map((h) => h.question));
    }
  }, [profile.history.length]);

  function scrollToCard(question: string) {
    setTimeout(() => {
      const el = cardRefs.current[question];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleTap(card: AnyCard) {
    setActiveQuestion(card.question);
    scrollToCard(card.question);
  }

  function handleComplete(card: AnyCard) {
    recordCorrect(card.question);
    const newAnswered = [...answeredQuestions, card.question];
    setAnsweredQuestions(newAnswered);

    // Remove solved card from feed after victory sound finishes (~700ms in game)
    setTimeout(() => {
      setFeed((prev) => prev.filter((c) => c.question !== card.question));
      setActiveQuestion((prev) => prev === card.question ? null : prev);
    }, 900);

    // Get recommendations and append new unseen cards to the feed (only within same topic set)
    if (card.mechanic === "sequence" && !topics) {
      const rec = getSequenceByQuestion(card.question);
      const fromId = rec?.id ?? "";
      const recs = getRecommendations(fromId, newAnswered);
      const newCards: AnyCard[] = recs
        .map(recordToCard)
        .map(legacyToAny)
        .filter((c) => !feed.some((f) => f.question === c.question) && !newAnswered.includes(c.question));
      if (newCards.length > 0) {
        setFeed((prev) => [...prev, ...newCards]);
        const nextCard = newCards[0];
        setActiveQuestion(nextCard.question);
        scrollToCard(nextCard.question);
      }
    }
  }

  async function handleSelectSuggestion(question: string) {
    // Check if already in feed
    const existing = feed.find((c) => c.question === question);
    if (existing) {
      setActiveQuestion(question);
      scrollToCard(question);
      return;
    }
    setLoadingNugget(question);
    try {
      const cards = await fetchCards(question, answeredQuestions);
      if (cards[0]) {
        const newCard = legacyToAny(cards[0]);
        setFeed((prev) => [...prev, newCard]);
        setActiveQuestion(newCard.question);
        scrollToCard(newCard.question);
      }
    } finally {
      setLoadingNugget(null);
    }
  }

  // Venture picks: game questions not already in the feed, filtered by topics if set
  const venturePicks: AnyCard[] = GAME_QUESTIONS
    .map(gameQuestionToAny)
    .filter((q) => !feed.some((f) => f.question === q.question) && !answeredQuestions.includes(q.question))
    .filter((q) => !topics || topics.includes(q.topic ?? ""));

  return (
    <div style={{ width: "100%", maxWidth: "390px", display: "flex", flexDirection: "column" }}>

      {/* Feed — venture cards injected every 3 items */}
      {feed.filter((c) => !answeredQuestions.includes(c.question)).map((card, i) => {
        const isActive = activeQuestion === card.question;
        const suggestions = isActive && card.mechanic === "sequence"
          ? getRecommendations(getSequenceByQuestion(card.question)?.id ?? "", answeredQuestions)
              .map(recordToCard)
              .map((c) => ({ id: getSequenceByQuestion(c.question)?.id ?? c.question, question: c.question }))
          : [];

        const showVenture = (i + 1) % 3 === 0 && venturePicks.length > 0;

        return (
          <div key={card.question}>
            <FeedCard
              card={card}
              isActive={isActive}
              onTap={() => handleTap(card)}
              onComplete={() => handleComplete(card)}
              suggestions={suggestions}
              loadingSuggestions={false}
              onSelectSuggestion={handleSelectSuggestion}
              loadingNugget={loadingNugget}
              cardRef={(el) => { cardRefs.current[card.question] = el; }}
            />
            {showVenture && (
              <VentureCard
                picks={venturePicks.slice(0, 4)}
                onSelect={(picked) => {
                  setFeed((prev) => {
                    if (prev.some((f) => f.question === picked.question)) {
                      // Already in feed — just activate it
                      setActiveQuestion(picked.question);
                      scrollToCard(picked.question);
                      return prev;
                    }
                    const next = [...prev];
                    next.splice(i + 1, 0, picked);
                    return next;
                  });
                  setActiveQuestion(picked.question);
                  scrollToCard(picked.question);
                }}
              />
            )}
          </div>
        );
      })}

      <div style={{ height: "80px" }} />

      {/* Answered overlay */}
      {showAnswered && (
        <div
          onClick={() => { setShowAnswered(false); onAnsweredClose?.(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 50,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "420px", maxHeight: "75vh",
              background: brand.bg.card,
              border: `1px solid ${brand.border.card}`,
              borderRadius: "24px 24px 0 0",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px 24px 0", flexShrink: 0 }}>
              <div style={{ width: "32px", height: "3px", borderRadius: "2px", background: brand.border.accent, margin: "0 auto 20px" }} />
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ ...brand.type.label, color: brand.text.muted }}>Solved</span>
                <span style={{ fontSize: "11px", color: brand.text.muted }}>{answeredQuestions.length}</span>
              </div>
            </div>
            <div style={{ overflowY: "auto", padding: "0 24px 32px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {answeredQuestions.length === 0 && (
                <span style={{ fontSize: "13px", color: brand.text.muted }}>Nothing solved yet.</span>
              )}
              {answeredQuestions.map((q) => {
                const goldRec = allGold.find((g) => g.question === q);
                const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
                const id = goldRec?.id ?? gameQ?.id ?? "";
                return (
                  <div key={q} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", borderBottom: `1px solid ${brand.border.item}` }}>
                    {id && (
                      <img src={`/nuggets/thumbs/${id}.jpg`} alt="" style={{ width: 44, height: 34, borderRadius: "8px", objectFit: "cover", flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: "13px", color: brand.text.secondary, flex: 1, lineHeight: "1.4" }}>{q}</span>
                    <span style={{ fontSize: "11px", color: brand.status.correct.text, flexShrink: 0 }}>✓</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
