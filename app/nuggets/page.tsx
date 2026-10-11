"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { brand } from "./brand";
import { NUGGET_SETS } from "@/lib/nuggets/sets";
import { useProfile } from "./useProfile";
import ShellBar from "./ShellBar";
import UserMenu from "./UserMenu";
import { seedLibrary } from "@/lib/nuggets/seed";
import { getGoldSequences, recordToCard, getSequenceByQuestion } from "@/lib/nuggets/library";
import type { SequenceRecord } from "@/lib/nuggets/library";
import { GAME_QUESTIONS } from "./games/questions";
import type { Question } from "./games/questions";
import SequenceGame from "./SequenceGame";
import GroupingGame from "./GroupingGame";
import MatchingGame from "./MatchingGame";
import RankedListGame from "./RankedListGame";
import MultipleChoiceGame from "./MultipleChoiceGame";
import PronunciationGame from "./PronunciationGame";
import VisualRecognitionGame from "./VisualRecognitionGame";

type AnyCard =
  | { mechanic: "sequence"; question: string; sequence: { id: string; text: string }[]; thumbId: string; topic: string }
  | (Question & { thumbId: string });

function legacyToAny(c: { question: string; sequence: { id: string; text: string }[] }): AnyCard {
  const rec = getSequenceByQuestion(c.question);
  return { mechanic: "sequence", question: c.question, sequence: c.sequence, thumbId: rec?.id ?? "", topic: rec?.topic ?? "history" };
}

function gameQuestionToAny(q: Question): AnyCard {
  const thumbId = "thumbId" in q && typeof (q as { thumbId?: unknown }).thumbId === "string"
    ? (q as { thumbId: string }).thumbId
    : q.id;
  return { ...q, thumbId } as AnyCard;
}

function buildAnyCard(q: string, allGold: SequenceRecord[]): AnyCard | null {
  const goldRec = allGold.find((g) => g.question === q);
  if (goldRec) return legacyToAny(recordToCard(goldRec));
  const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
  if (gameQ) return gameQuestionToAny(gameQ);
  return null;
}

function ReviewGame({ card, onBack }: { card: AnyCard; onBack: () => void }) {
  const [imgFailed, setImgFailed] = useState(false);
  const topicLabel = card.topic ?? "";
  const mechLabel = card.mechanic === "sequence" ? "Sequence" : card.mechanic === "matching" ? "Matching" : card.mechanic === "grouping" ? "Grouping" : card.mechanic === "ranked" ? "Ranked" : card.mechanic === "multiple-choice" ? "Quiz" : card.mechanic === "pronunciation" ? "Pronunciation" : "Visual";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: brand.bg.page, display: "flex", flexDirection: "column" }}>
      <ShellBar title="Review" onBack={onBack} />
      <main style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "48px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: "390px", margin: "0 auto", padding: "8px 16px 48px", display: "flex", flexDirection: "column" }}>
          {/* Hero */}
          <div style={{ width: "100%", height: "160px", borderRadius: "18px", overflow: "hidden", background: brand.bg.raised, position: "relative", marginBottom: "20px", flexShrink: 0 }}>
            {!imgFailed && (
              <img src={`/nuggets/thumbs/${card.thumbId}.jpg`} alt="" onError={() => setImgFailed(true)}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }} />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.85) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 18px 16px" }}>
              <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "5px" }}>{topicLabel} · {mechLabel}</div>
              <div style={{ fontSize: "clamp(1.1rem, 5vw, 1.3rem)", fontWeight: "800", color: "#ffffff", lineHeight: "1.18", letterSpacing: "-0.025em", textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}>{card.question}</div>
            </div>
          </div>
          {/* Game */}
          {card.mechanic === "sequence" && <SequenceGame key={card.question} question={card.question} sequence={card.sequence} onComplete={onBack} suggestions={[]} loadingSuggestions={false} onSelectSuggestion={() => {}} loadingNugget={null} />}
          {card.mechanic === "grouping" && <GroupingGame key={card.question} question={card.question} zones={card.zones} items={card.items} onComplete={onBack} />}
          {card.mechanic === "matching" && <MatchingGame key={card.question} question={card.question} pairs={card.pairs} onComplete={onBack} />}
          {card.mechanic === "ranked" && <RankedListGame key={card.question} question={card.question} items={card.items} onComplete={onBack} />}
          {card.mechanic === "multiple-choice" && <MultipleChoiceGame key={card.question} question={card.question} mediaUrl={card.mediaUrl} options={card.options} correctIds={card.correctIds} onComplete={onBack} />}
          {card.mechanic === "pronunciation" && (() => {
            const pc = card as import("./games/questions").PronunciationQuestion & { thumbId: string };
            const displayWord = pc.question.startsWith("Pronounce: ") ? pc.question.slice("Pronounce: ".length) : pc.id.replace(/^wine-/, "").replace(/-/g, " ");
            return <PronunciationGame key={pc.question} word={displayWord} audioUrl={pc.audioUrl} phonetic={pc.phonetic} definition={pc.definition} onComplete={onBack} />;
          })()}
          {card.mechanic === "visual-recognition" && (() => {
            const vr = card as import("./games/questions").VisualRecognitionQuestion & { thumbId: string };
            return <VisualRecognitionGame key={vr.question} imageIds={vr.imageIds} options={vr.options} correctId={vr.correctId} explanation={vr.explanation} onComplete={onBack} />;
          })()}
        </div>
      </main>
    </div>
  );
}


function PackCard({ slug, number, name, description, thumbId, cardCount, solvedCount }: {
  slug: string;
  number: string;
  name: string;
  description: string;
  thumbId: string;
  cardCount: number;
  solvedCount: number;
}) {
  const router = useRouter();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button
      onClick={() => router.push(`/nuggets/${slug}`)}
      style={{
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        border: `1px solid ${brand.border.card}`,
        background: brand.bg.raised,
        cursor: "pointer",
        textAlign: "left",
        padding: 0,
        display: "block",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Hero image */}
      <div style={{
        width: "100%",
        aspectRatio: "16 / 9",
        background: brand.bg.page,
        position: "relative",
        overflow: "hidden",
      }}>
        {!imgFailed && (
          <img
            src={`/nuggets/thumbs/${thumbId}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }}
          />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)",
        }} />

        {/* Card count pill */}
        <div style={{
          position: "absolute",
          top: "14px", right: "14px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          borderRadius: "99px",
          padding: "4px 10px",
          fontSize: "10px", fontWeight: "600",
          color: "rgba(255,255,255,0.45)",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          {solvedCount > 0 ? `${solvedCount} / ${cardCount}` : `${cardCount} cards`}
          {cardCount - solvedCount <= 2 && cardCount - solvedCount > 0 && (
            <span style={{ color: brand.status.correct.text }}>
              {cardCount - solvedCount === 1 ? "1 left!" : "2 left!"}
            </span>
          )}
        </div>
      </div>

      {/* Pack info */}
      <div style={{
        padding: "16px 18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.text.muted }}>Set</span>
          <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.1em", color: brand.text.muted, fontVariantNumeric: "tabular-nums" }}>{number}</span>
        </div>
        <span style={{ fontSize: "20px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.025em", lineHeight: 1.15 }}>{name}</span>
        <span style={{ fontSize: "13px", fontWeight: "400", color: brand.text.muted, lineHeight: 1.5 }}>{description}</span>
      </div>
    </button>
  );
}

function SolvedOverlay({ answeredQuestions, allGold, onClose, synced }: {
  answeredQuestions: string[];
  allGold: SequenceRecord[];
  onClose: () => void;
  synced: boolean;
}) {
  const [reviewCard, setReviewCard] = useState<AnyCard | null>(null);
  const totalCards = NUGGET_SETS.reduce((sum, s) => sum + s.cardCount, 0);
  // Count solved per pack
  const packCounts = NUGGET_SETS.map((s) => {
    const count = answeredQuestions.filter((q) => {
      const goldRec = allGold.find((g) => g.question === q);
      if (goldRec) return s.topics.includes(goldRec.topic ?? "");
      const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
      if (gameQ) return s.topics.includes(gameQ.topic ?? "");
      return false;
    }).length;
    return { name: s.name, count, cardCount: s.cardCount };
  }).filter((p) => p.count > 0);

  if (reviewCard) {
    return <ReviewGame card={reviewCard} onBack={() => setReviewCard(null)} />;
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: brand.bg.page, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      <ShellBar
        title="Solved"
        right={
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: brand.text.muted, fontSize: "20px", lineHeight: 1, padding: "4px", WebkitTapHighlightColor: "transparent" }}>×</button>
        }
      />
      <div style={{ padding: "64px 16px 48px" }}>
        {/* Summary */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 auto", minWidth: "120px", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, borderRadius: "14px", padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
              <span style={{ fontSize: "26px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1 }}>{synced ? answeredQuestions.length : "—"}</span>
              <span style={{ fontSize: "13px", fontWeight: "500", color: brand.text.muted }}>/ {totalCards}</span>
            </div>
            <div style={{ fontSize: "10px", fontWeight: "600", color: brand.text.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px" }}>Total solved</div>
          </div>
          {packCounts.map((p) => (
            <div key={p.name} style={{ flex: "1 1 auto", minWidth: "120px", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, borderRadius: "14px", padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span style={{ fontSize: "26px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1 }}>{p.count}</span>
                <span style={{ fontSize: "13px", fontWeight: "500", color: brand.text.muted }}>/ {p.cardCount}</span>
              </div>
              <div style={{ fontSize: "10px", fontWeight: "600", color: brand.text.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "6px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{p.name}</div>
            </div>
          ))}
        </div>
        {answeredQuestions.length === 0 && (
          <span style={{ fontSize: "13px", color: brand.text.muted, padding: "8px 4px", display: "block" }}>Nothing solved yet.</span>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {answeredQuestions.map((q) => {
            const goldRec = allGold.find((g) => g.question === q);
            const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
            const id = goldRec?.id ?? gameQ?.id ?? "";
            const topic = goldRec?.topic ?? (gameQ as { topic?: string } | undefined)?.topic ?? "";
            const packName = NUGGET_SETS.find((s) => s.topics.includes(topic))?.name ?? "";
            return (
              <button
                key={q}
                onClick={() => {
                  const card = buildAnyCard(q, allGold);
                  if (card) setReviewCard(card);
                }}
                style={{ display: "flex", alignItems: "center", gap: "14px", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, borderRadius: "16px", padding: "12px 14px", minHeight: "80px", width: "100%", textAlign: "left", cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
              >
                <div style={{ width: "56px", height: "56px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, background: brand.bg.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {id && <div style={{ width: "100%", height: "100%", backgroundImage: `url(/nuggets/thumbs/${id}.jpg)`, backgroundSize: "200%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {packName && <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.text.muted, marginBottom: "4px" }}>{packName}</div>}
                  <span style={{ fontSize: "13px", fontWeight: "500", color: brand.text.secondary, lineHeight: "1.4" }}>{q}</span>
                </div>
                <div style={{ width: "20px", height: "20px", borderRadius: "99px", background: brand.status.correct.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#000", fontWeight: "700", flexShrink: 0 }}>✓</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function NuggetsPage() {
  const router = useRouter();
  const { profile, synced } = useProfile();
  const [showSolved, setShowSolved] = useState(false);
  const [allGold, setAllGold] = useState<SequenceRecord[]>([]);

  useEffect(() => {
    seedLibrary();
    setAllGold(getGoldSequences());
  }, []);

  const answeredQuestions = profile.history.map((h) => h.question);

  function solvedCountForSet(set: typeof NUGGET_SETS[0]) {
    return answeredQuestions.filter((q) => {
      const goldRec = allGold.find((g) => g.question === q);
      if (goldRec) return set.topics.includes(goldRec.topic ?? "");
      const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
      if (gameQ) return set.topics.includes(gameQ.topic ?? "");
      return false;
    }).length;
  }

  function totalCardsForSet(set: typeof NUGGET_SETS[0]) {
    const goldCount = allGold.filter((g) => set.topics.includes(g.topic ?? "")).length;
    const gameCount = GAME_QUESTIONS.filter((g) => set.topics.includes(g.topic ?? "")).length;
    return goldCount + gameCount;
  }

  const incompleteSets = NUGGET_SETS.filter((set) => solvedCountForSet(set) < totalCardsForSet(set));

  const scoreButton = (
    <button
      onClick={() => setShowSolved(true)}
      style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", borderRadius: "6px", WebkitTapHighlightColor: "transparent" }}
    >
      <span style={{ fontSize: "18px", fontWeight: "700", color: brand.text.primary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{synced ? profile.score : "—"}</span>
      <span style={{ fontSize: "11px", fontWeight: "500", color: brand.text.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>solved</span>
    </button>
  );

  const leaderboardButton = (
    <button
      onClick={() => router.push("/nuggets/leaderboard")}
      style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", borderRadius: "6px", WebkitTapHighlightColor: "transparent" }}
    >
      <span style={{ fontSize: "16px", lineHeight: 1 }}>🏆</span>
      <span style={{ fontSize: "11px", fontWeight: "500", color: brand.text.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>Board</span>
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>

      <ShellBar title="Table Topics" right={<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>{leaderboardButton}{scoreButton}<UserMenu /></div>} />

      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "64px",
        paddingBottom: "48px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}>
        <div style={{ width: "100%", maxWidth: "390px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ paddingTop: "8px" }}>
            <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Things you should already know
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {incompleteSets.map((set) => (
              <PackCard key={set.slug} slug={set.slug} number={set.number} name={set.name} description={set.description} thumbId={set.thumbId} cardCount={totalCardsForSet(set)} solvedCount={solvedCountForSet(set)} />
            ))}
          </div>
        </div>
      </main>

      {showSolved && (
        <SolvedOverlay
          answeredQuestions={profile.history.map((h) => h.question)}
          allGold={allGold}
          onClose={() => setShowSolved(false)}
          synced={synced}
        />
      )}
    </div>
  );
}
