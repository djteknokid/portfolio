"use client";

import { useState } from "react";
import { brand } from "./brand";
import { playCorrectBeep, playVictory } from "./sounds";
import WhatsNext from "./WhatsNext";
import type { Suggestion } from "./SuggestionList";

export interface MCOption {
  id: string;
  text: string;
}

interface Props {
  question: string;
  mediaUrl?: string;       // YouTube embed URL
  options: MCOption[];
  correctIds: string[];    // 1 id = single-select, >1 = multi-select
  onComplete: () => void;
  suggestions?: Suggestion[];
  loadingSuggestions?: boolean;
  onSelectSuggestion?: (q: string) => void;
  loadingNugget?: string | null;
}

export default function MultipleChoiceGame({ question: _q, mediaUrl, options, correctIds, onComplete, suggestions = [], loadingSuggestions = false, onSelectSuggestion, loadingNugget }: Props) {
  const isMulti = correctIds.length > 1;
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [allDone, setAllDone] = useState(false);

  function toggle(id: string) {
    if (allDone || revealed.has(id)) return;

    const isCorrect = correctIds.includes(id);

    if (isMulti) {
      const next = new Set(selected);
      if (next.has(id)) {
        next.delete(id);
        setSelected(next);
        return;
      }
      next.add(id);
      setSelected(next);

      if (isCorrect) {
        playCorrectBeep();
        const nextRevealed = new Set([...revealed, id]);
        setRevealed(nextRevealed);
        setSelected(new Set([...next].filter((x) => !nextRevealed.has(x))));

        if (correctIds.every((cid) => nextRevealed.has(cid))) {
          setAllDone(true);
          playVictory();
        }
      }
      // wrong selection in multi: keep chip selected so user sees their mistake, don't lock
    } else {
      // single select: reveal immediately
      const nextRevealed = new Set([...revealed, id]);
      setRevealed(nextRevealed);
      setSelected(new Set());

      if (isCorrect) {
        playCorrectBeep();
        setAllDone(true);
        playVictory();
      }
    }
  }

  function chipState(id: string): "correct" | "wrong" | "selected" | "idle" {
    if (revealed.has(id)) return correctIds.includes(id) ? "correct" : "wrong";
    if (selected.has(id)) return "selected";
    return "idle";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* YouTube embed — overflow clips title bar, keeps play controls */}
      {mediaUrl && (
        <div style={{
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "14px",
          overflow: "hidden",
          background: "#000",
          border: `1px solid ${brand.border.item}`,
          position: "relative",
        }}>
          <iframe
            src={mediaUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{
              position: "absolute",
              top: "-60px",
              left: 0,
              width: "100%",
              height: "calc(100% + 120px)",
              border: "none",
              display: "block",
            }}
          />
        </div>
      )}

      {/* Instruction label */}
      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted }}>
        {isMulti ? `Select ${correctIds.length} answers` : "Choose one"}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {options.map((opt) => {
          const state = chipState(opt.id);
          const borderColor =
            state === "correct" ? brand.status.correct.border :
            state === "wrong"   ? brand.status.wrong.border :
            state === "selected" ? brand.border.accent :
            brand.border.item;
          const bg =
            state === "correct" ? brand.status.correct.bg :
            state === "wrong"   ? brand.status.wrong.bg :
            state === "selected" ? brand.bg.hover :
            brand.bg.raised;
          const textColor =
            state === "correct" ? brand.status.correct.text :
            state === "wrong"   ? brand.status.wrong.text :
            brand.text.primary;
          const shadow =
            state === "correct" ? `0 0 12px ${brand.status.correct.border}` :
            state === "wrong"   ? `0 0 8px ${brand.status.wrong.border}` :
            "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)";

          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              disabled={allDone && state === "idle"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "10px",
                border: `1px solid ${borderColor}`,
                background: bg,
                boxShadow: shadow,
                cursor: allDone || revealed.has(opt.id) ? "default" : "pointer",
                textAlign: "left",
                width: "100%",
                transition: "border-color 200ms ease, background 200ms ease, box-shadow 200ms ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span style={{
                fontSize: "15px",
                fontWeight: "400",
                color: textColor,
                lineHeight: "1.5",
                flex: 1,
                letterSpacing: "-0.01em",
                transition: "color 200ms ease",
              }}>
                {opt.text}
              </span>
              {state === "correct" && <span style={{ fontSize: "12px", color: brand.status.correct.text, flexShrink: 0 }}>✓</span>}
              {state === "wrong"   && <span style={{ fontSize: "12px", color: brand.status.wrong.text,  flexShrink: 0 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {allDone && (
        <WhatsNext suggestions={suggestions} loadingSuggestions={loadingSuggestions} loadingNugget={loadingNugget} onSelect={onSelectSuggestion} onDone={onComplete} />
      )}
    </div>
  );
}
