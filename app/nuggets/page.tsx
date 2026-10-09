"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { brand } from "./brand";
import { NUGGET_SETS } from "@/lib/nuggets/sets";
import { useProfile } from "./useProfile";
import ShellBar from "./ShellBar";
import UserMenu from "./UserMenu";
import { seedLibrary } from "@/lib/nuggets/seed";
import { getGoldSequences } from "@/lib/nuggets/library";
import type { SequenceRecord } from "@/lib/nuggets/library";
import { GAME_QUESTIONS } from "./games/questions";

function PackCard({ slug, number, name, description, thumbId, cardCount }: {
  slug: string;
  number: string;
  name: string;
  description: string;
  thumbId: string;
  cardCount: number;
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
        }}>
          {cardCount} cards
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

function SolvedOverlay({ answeredQuestions, allGold, onClose }: {
  answeredQuestions: string[];
  allGold: SequenceRecord[];
  onClose: () => void;
}) {
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
              <span style={{ fontSize: "26px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1 }}>{answeredQuestions.length}</span>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {answeredQuestions.map((q) => {
            const goldRec = allGold.find((g) => g.question === q);
            const gameQ = GAME_QUESTIONS.find((g) => g.question === q);
            const id = goldRec?.id ?? gameQ?.id ?? "";
            return (
              <div key={q} style={{ borderRadius: "14px", overflow: "hidden", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, position: "relative" }}>
                <div style={{ width: "100%", aspectRatio: "4 / 3", background: brand.bg.raised }}>
                  {id && <img src={`/nuggets/thumbs/${id}.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }} />}
                </div>
                <div style={{ position: "absolute", top: "8px", right: "8px", background: brand.status.correct.text, borderRadius: "99px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#000", fontWeight: "700" }}>✓</div>
                <div style={{ padding: "8px 10px 10px" }}>
                  <span style={{ fontSize: "11px", color: brand.text.muted, lineHeight: "1.35", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{q}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function NuggetsPage() {
  const router = useRouter();
  const { profile } = useProfile();
  const [showSolved, setShowSolved] = useState(false);
  const [allGold, setAllGold] = useState<SequenceRecord[]>([]);

  useEffect(() => {
    seedLibrary();
    setAllGold(getGoldSequences());
  }, []);

  const scoreButton = (
    <button
      onClick={() => setShowSolved(true)}
      style={{ background: "none", border: "none", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", borderRadius: "6px", WebkitTapHighlightColor: "transparent" }}
    >
      <span style={{ fontSize: "18px", fontWeight: "700", color: brand.text.primary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{profile.score}</span>
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

      <ShellBar title="Basic Knowledge" right={<div style={{ display: "flex", alignItems: "center", gap: "4px" }}>{leaderboardButton}{scoreButton}<UserMenu /></div>} />

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
              Choose a pack
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {NUGGET_SETS.map((set) => (
              <PackCard key={set.slug} slug={set.slug} number={set.number} name={set.name} description={set.description} thumbId={set.thumbId} cardCount={set.cardCount} />
            ))}
          </div>
        </div>
      </main>

      {showSolved && (
        <SolvedOverlay
          answeredQuestions={profile.history.map((h) => h.question)}
          allGold={allGold}
          onClose={() => setShowSolved(false)}
        />
      )}
    </div>
  );
}
