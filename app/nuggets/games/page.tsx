"use client";

import { useState, useEffect } from "react";
import { brand } from "../brand";
import GroupingGame from "../GroupingGame";
import MatchingGame from "../MatchingGame";
import RankedListGame from "../RankedListGame";
import SequenceGame from "../SequenceGame";
import { GAME_QUESTIONS } from "./questions";
import type { MechanicType, Question, GroupingQuestion, MatchingQuestion, SequenceQuestion, RankedQuestion } from "./questions";

// ── Mechanic emoji icon ───────────────────────────────────────────

const MECHANIC_EMOJI: Record<MechanicType, string> = {
  sequence: "🧩",
  matching: "🎯",
  grouping: "👥",
  ranked:   "🎯",
};

function MechanicIcon({ type }: { type: MechanicType }) {
  return (
    <span style={{ fontSize: "14px", lineHeight: 1, flexShrink: 0 }}>
      {MECHANIC_EMOJI[type]}
    </span>
  );
}

// ── What's next panel ─────────────────────────────────────────────

function WhatsNext({ remaining, onSelect }: { remaining: Question[]; onSelect: (id: string) => void }) {
  if (remaining.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
        <span style={{ fontSize: "13px", color: brand.text.muted }}>All done.</span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ ...brand.type.label, color: brand.text.muted }}>What&apos;s next?</span>
      {remaining.map((q) => (
        <button
          key={q.id}
          onClick={() => onSelect(q.id)}
          style={{
            width: "100%", padding: "14px 16px", borderRadius: brand.radius.item,
            background: brand.bg.raised,
            border: `1px solid ${brand.border.item}`,
            color: brand.text.secondary,
            fontSize: "14px", fontWeight: "500", lineHeight: "1.4",
            textAlign: "left", cursor: "pointer",
            transition: brand.motion.snap,
            display: "flex", alignItems: "center", gap: "14px",
          }}
        >
          <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "20px" }}>
            <MechanicIcon type={q.mechanic} />
          </span>
          <span style={{ flex: 1 }}>{q.question}</span>
        </button>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function GamesPage() {
  const [activeId, setActiveId] = useState<string>(GAME_QUESTIONS[0].id);
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q && GAME_QUESTIONS.some((gq) => gq.id === q)) {
      setActiveId(q);
    }
  }, []);

  const active = GAME_QUESTIONS.find((q) => q.id === activeId)!;
  const remaining = GAME_QUESTIONS.filter((q) => q.id !== activeId && !done.has(q.id));
  const isCorrect = done.has(activeId);

  function handleComplete(id: string) {
    setDone((prev) => new Set([...prev, id]));
  }

  function handleSelect(id: string) {
    setActiveId(id);
  }

  // Group questions by mechanic so each game component mounts once
  // and stays mounted for the lifetime of the page.
  const grouping = GAME_QUESTIONS.filter((q): q is GroupingQuestion => q.mechanic === "grouping");
  const matching = GAME_QUESTIONS.filter((q): q is MatchingQuestion => q.mechanic === "matching");
  const sequence = GAME_QUESTIONS.filter((q): q is SequenceQuestion => q.mechanic === "sequence");
  const ranked   = GAME_QUESTIONS.filter((q): q is RankedQuestion   => q.mechanic === "ranked");

  return (
    <main style={{
      minHeight: "100vh",
      background: brand.bg.page,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "48px",
      paddingBottom: "96px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: brand.text.primary, letterSpacing: "-0.02em" }}>
              Answer types
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: "13px", color: brand.text.muted }}>
              Three ways to test knowledge
            </p>
          </div>
          <span style={{ fontSize: "12px", color: brand.text.muted }}>
            {done.size} / {GAME_QUESTIONS.length}
          </span>
        </div>

        {/* All questions — same "what's next" style */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {GAME_QUESTIONS.map((q) => {
            const isCurrent = q.id === activeId;
            const isDone = done.has(q.id);
            return (
              <button
                key={q.id}
                onClick={() => !isCurrent && handleSelect(q.id)}
                style={{
                  width: "100%", padding: "13px 14px", borderRadius: brand.radius.item,
                  background: isCurrent ? brand.bg.hover : "transparent",
                  border: `1px solid ${isCurrent ? brand.border.accent : "transparent"}`,
                  color: isCurrent ? brand.text.primary : isDone ? brand.text.muted : brand.text.secondary,
                  fontSize: "13px", fontWeight: "500", lineHeight: "1.4",
                  textAlign: "left", cursor: isCurrent ? "default" : "pointer",
                  transition: brand.motion.snap,
                  display: "flex", alignItems: "center", gap: "14px",
                  opacity: isDone && !isCurrent ? 0.45 : 1,
                }}
              >
                <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "20px" }}>
                  <MechanicIcon type={q.mechanic} />
                </span>
                <span style={{ flex: 1 }}>{q.question}</span>
                {isDone && (
                  <span style={{ fontSize: "11px", color: brand.status.correct.text, flexShrink: 0 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ width: "100%", height: "1px", background: brand.border.item }} />

        {/* Active question title */}
        <h2 style={{
          margin: 0,
          fontSize: "clamp(1.3rem, 6vw, 1.7rem)",
          fontWeight: "700",
          color: brand.text.primary,
          letterSpacing: "-0.025em",
          lineHeight: "1.2",
        }}>
          {active.question}
        </h2>

        {/* All game instances — mounted once per question, shown/hidden via display */}
        {grouping.map((q) => (
          <div key={q.id} style={{ display: activeId === q.id ? "block" : "none" }}>
            <GroupingGame
              question={q.question}
              zones={q.zones}
              items={q.items}
              onComplete={() => handleComplete(q.id)}
            />
          </div>
        ))}
        {matching.map((q) => (
          <div key={q.id} style={{ display: activeId === q.id ? "block" : "none" }}>
            <MatchingGame
              question={q.question}
              pairs={q.pairs}
              onComplete={() => handleComplete(q.id)}
            />
          </div>
        ))}
        {sequence.map((q) => (
          <div key={q.id} style={{ display: activeId === q.id ? "block" : "none" }}>
            <SequenceGame
              question={q.question}
              sequence={q.sequence}
              onComplete={() => handleComplete(q.id)}
            />
          </div>
        ))}
        {ranked.map((q) => (
          <div key={q.id} style={{ display: activeId === q.id ? "block" : "none" }}>
            <RankedListGame
              question={q.question}
              items={q.items}
              onComplete={() => handleComplete(q.id)}
            />
          </div>
        ))}

        {/* What's next — shown after correct */}
        {isCorrect && <WhatsNext remaining={remaining} onSelect={handleSelect} />}

      </div>
    </main>
  );
}
