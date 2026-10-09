"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import SequenceGame from "../SequenceGame";
import GroupingGame from "../GroupingGame";
import MatchingGame from "../MatchingGame";
import RankedListGame from "../RankedListGame";
import { brand } from "../brand";
import { useProfile } from "../useProfile";
import ShellBar from "../ShellBar";
import UserMenu from "../UserMenu";
import { seedLibrary } from "@/lib/nuggets/seed";
import { getGoldSequences, getRecommendations, recordToCard, getSequenceByQuestion } from "@/lib/nuggets/library";
import type { SequenceRecord } from "@/lib/nuggets/library";
import { GAME_QUESTIONS } from "../games/questions";
import type { Question } from "../games/questions";
import { getSet, NUGGET_SETS } from "@/lib/nuggets/sets";

// ── Types ─────────────────────────────────────────────────────────

type AnyCard =
  | { mechanic: "sequence"; question: string; sequence: { id: string; text: string }[]; thumbId: string; topic: string }
  | (Question & { thumbId: string });

const TOPIC_LABEL: Record<string, string> = {
  history: "History", "Cold War": "History", WWII: "History",
  "K-pop": "Music", "Korean culture": "Culture",
  jazz: "Jazz", wine: "Wine", "pop culture": "Pop Culture",
};
function topicLabel(t: string) { return TOPIC_LABEL[t] ?? t; }
function mechLabel(m: string) {
  if (m === "sequence") return "Sequence";
  if (m === "matching") return "Matching";
  if (m === "grouping") return "Grouping";
  if (m === "ranked") return "Ranked";
  return m;
}

function legacyToAny(c: { question: string; sequence: { id: string; text: string }[] }): AnyCard {
  const rec = getSequenceByQuestion(c.question);
  return { mechanic: "sequence", question: c.question, sequence: c.sequence, thumbId: rec?.id ?? "", topic: rec?.topic ?? "history" };
}

function gameQuestionToAny(q: Question): AnyCard {
  return { ...q, thumbId: q.id } as AnyCard;
}

// ── Solved history grid ────────────────────────────────────────────

function SolvedPage({
  answeredQuestions,
  allGold,
  onClose,
}: {
  answeredQuestions: string[];
  allGold: SequenceRecord[];
  onClose: () => void;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: brand.bg.page, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <ShellBar
        title="Solved"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: brand.text.muted }}>{answeredQuestions.length}</span>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: brand.text.muted, fontSize: "20px", lineHeight: 1, padding: "4px", WebkitTapHighlightColor: "transparent" }}>×</button>
          </div>
        }
      />
      <div style={{ padding: "64px 16px 48px" }}>
        {answeredQuestions.length === 0 && (
          <span style={{ fontSize: "13px", color: brand.text.muted, padding: "8px 4px", display: "block" }}>Nothing solved yet.</span>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {answeredQuestions.map((q) => {
            const goldRec = allGold.find((g) => g.question === q);
            const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
            const id = goldRec?.id ?? gameQ?.id ?? "";
            return (
              <div key={q} style={{ borderRadius: "12px", overflow: "hidden", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, position: "relative" }}>
                <div style={{ width: "100%", aspectRatio: "1 / 1", background: brand.bg.raised }}>
                  {id && <img src={`/nuggets/thumbs/${id}.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }} />}
                </div>
                <div style={{ position: "absolute", top: "6px", right: "6px", background: brand.status.correct.text, borderRadius: "99px", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#000", fontWeight: "700" }}>✓</div>
                <div style={{ padding: "6px 8px 8px" }}>
                  <span style={{ fontSize: "10px", color: brand.text.muted, lineHeight: "1.3", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{q}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Done screen ────────────────────────────────────────────────────

function DoneScreen({ setSlug, solvedCount }: { setSlug: string; solvedCount: number }) {
  const router = useRouter();
  const others = NUGGET_SETS.filter((s) => s.slug !== setSlug);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", gap: "32px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.025em", marginBottom: "8px" }}>Pack complete!</div>
        <div style={{ fontSize: "13px", color: brand.text.muted }}>{solvedCount} question{solvedCount !== 1 ? "s" : ""} solved</div>
      </div>
      {others.length > 0 && (
        <div style={{ width: "100%", maxWidth: "390px" }}>
          <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "12px" }}>Try another pack</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {others.map((s) => (
              <button key={s.slug} onClick={() => router.push(`/nuggets/${s.slug}`)}
                style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 14px", borderRadius: "16px", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, cursor: "pointer", textAlign: "left", WebkitTapHighlightColor: "transparent" }}>
                <div style={{ width: "52px", height: "40px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, background: brand.bg.page }}>
                  <img src={`/nuggets/thumbs/${s.thumbId}.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: brand.text.primary, letterSpacing: "-0.01em" }}>{s.name}</div>
                  <div style={{ fontSize: "11px", color: brand.text.muted, marginTop: "2px" }}>{s.cardCount} cards</div>
                </div>
                <span style={{ fontSize: "16px", color: brand.text.muted, opacity: 0.5 }}>›</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Game renderer ──────────────────────────────────────────────────

function GameRenderer({ card, onComplete }: { card: AnyCard; onComplete: () => void }) {
  if (card.mechanic === "sequence") {
    return <SequenceGame key={card.question} question={card.question} sequence={card.sequence} onComplete={onComplete} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} />;
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

// ── Hero card header ───────────────────────────────────────────────

function CardHero({ card }: { card: AnyCard }) {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div style={{ width: "100%", aspectRatio: "4 / 3", borderRadius: "18px", overflow: "hidden", background: brand.bg.raised, position: "relative", marginBottom: "20px", flexShrink: 0 }}>
      {!imgFailed && (
        <img src={`/nuggets/thumbs/${card.thumbId}.jpg`} alt="" onError={() => setImgFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }} />
      )}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.82) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px 24px" }}>
        <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "7px" }}>
          {topicLabel(card.topic ?? "")} · {mechLabel(card.mechanic)}
        </div>
        <div style={{ fontSize: "clamp(1.25rem, 5.5vw, 1.5rem)", fontWeight: "800", color: "#ffffff", lineHeight: "1.18", letterSpacing: "-0.025em", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>
          {card.question}
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────

export default function SetPage({ params }: { params: Promise<{ set: string }> }) {
  const { set: slug } = use(params);
  const router = useRouter();
  const { profile, recordCorrect } = useProfile();
  const nuggetSet = getSet(slug);

  const [queue, setQueue] = useState<AnyCard[]>([]);
  const [answered, setAnswered] = useState<string[]>([]);
  const [allGold, setAllGold] = useState<SequenceRecord[]>([]);
  const [done, setDone] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [cardKey, setCardKey] = useState(0); // forces re-mount on advance

  // Swipe detection
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!nuggetSet) return;
    seedLibrary();
    const gold = getGoldSequences();
    setAllGold(gold);

    const historicAnswered = profile.history.map((h) => h.question);
    setAnswered(historicAnswered);

    const goldCards: AnyCard[] = gold
      .map((seq) => legacyToAny(recordToCard(seq)))
      .filter((c) => !historicAnswered.includes(c.question))
      .filter((c) => nuggetSet.topics.includes(c.topic ?? ""));

    const gameCards: AnyCard[] = GAME_QUESTIONS
      .map(gameQuestionToAny)
      .filter((c) => nuggetSet.topics.includes(c.topic ?? "") && !historicAnswered.includes(c.question));

    const initial = [...goldCards, ...gameCards];
    setQueue(initial);
    if (initial.length === 0) setDone(true);
  }, []);

  if (!nuggetSet) {
    return (
      <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: brand.text.muted, fontSize: "14px" }}>Set not found.</span>
      </div>
    );
  }

  const currentCard = queue[0] ?? null;
  const totalSolved = profile.score;

  function advanceQueue(completedQuestion?: string) {
    setQueue((prev) => {
      let next = prev.slice(1);
      // Reorder by recommendations if we completed a sequence card
      if (completedQuestion) {
        const rec = getSequenceByQuestion(completedQuestion);
        if (rec) {
          const newAnswered = [...answered, completedQuestion];
          const recs = getRecommendations(rec.id, newAnswered);
          const recCards = recs
            .map(recordToCard)
            .map(legacyToAny)
            .filter((c) => !newAnswered.includes(c.question) && !next.some((n) => n.question === c.question));
          next = [...next, ...recCards];
        }
      }
      if (next.length === 0) setDone(true);
      return next;
    });
    setCardKey((k) => k + 1);
  }

  function handleComplete() {
    if (!currentCard) return;
    recordCorrect(currentCard.question);
    setAnswered((prev) => [...prev, currentCard.question]);
    setTimeout(() => advanceQueue(currentCard.question), 900);
  }

  function handleSkip() {
    if (!currentCard) return;
    // Move current card to end of queue
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setCardKey((k) => k + 1);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (delta > 60) handleSkip();
  }

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>

      {/* Shell bar */}
      <ShellBar
        title={nuggetSet.name}
        backHref="/nuggets"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => setShowSolved(true)} style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", borderRadius: "6px", WebkitTapHighlightColor: "transparent" }}>
              <span style={{ fontSize: "18px", fontWeight: "700", color: brand.text.primary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{totalSolved}</span>
              <span style={{ fontSize: "11px", fontWeight: "500", color: brand.text.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>solved</span>
            </button>
            <UserMenu />
          </div>
        }
      />

      {/* Content */}
      <main
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "48px", overflowY: "auto" }}
      >
        {done ? (
          <DoneScreen setSlug={slug} solvedCount={answered.length} />
        ) : currentCard ? (
          <div key={cardKey} style={{ width: "100%", maxWidth: "390px", margin: "0 auto", padding: "16px 24px 48px", display: "flex", flexDirection: "column" }}>
            <CardHero card={currentCard} />
            <GameRenderer card={currentCard} onComplete={handleComplete} />
            {/* Skip */}
            <button onClick={handleSkip} style={{ marginTop: "16px", background: "none", border: "none", color: brand.text.muted, fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", padding: "8px", alignSelf: "center", WebkitTapHighlightColor: "transparent", opacity: 0.5 }}>
              Skip →
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: brand.text.muted, fontSize: "13px" }}>Loading…</span>
          </div>
        )}
      </main>

      {/* Solved history */}
      {showSolved && (
        <SolvedPage answeredQuestions={profile.history.map((h) => h.question)} allGold={allGold} onClose={() => setShowSolved(false)} />
      )}
    </div>
  );
}
