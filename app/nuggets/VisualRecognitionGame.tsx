"use client";

import { useState } from "react";
import { brand } from "./brand";
import { haptic, playCorrectBeep, playVictory } from "./sounds";

export interface VROption {
  id: string;
  label: string;
}

interface Props {
  imageIds: string[];          // thumbIds, will load from /nuggets/thumbs/{id}.jpg
  options: VROption[];
  correctId: string;
  explanation?: string;        // shown after answering — teach visual clues
  onComplete: () => void;
}

export default function VisualRecognitionGame({ imageIds, options, correctId, explanation, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const revealed = selected !== null;

  function choose(id: string) {
    if (revealed) return;
    setSelected(id);
    if (id === correctId) {
      haptic(30);
      playCorrectBeep();
      playVictory();
      setTimeout(() => onComplete(), 1500);
    } else {
      haptic([40, 60, 40]);
    }
  }

  const columns = imageIds.length >= 3 ? 3 : imageIds.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Image grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "6px",
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${brand.border.item}`,
      }}>
        {imageIds.map((id, i) => (
          <ArtImage key={id} id={id} index={i} total={imageIds.length} />
        ))}
      </div>

      {/* Instruction */}
      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted }}>
        Who made these?
      </div>

      {/* Answer options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === correctId;
          const state: "correct" | "wrong" | "selected" | "idle" =
            revealed && isCorrect ? "correct" :
            revealed && isSelected && !isCorrect ? "wrong" :
            !revealed && isSelected ? "selected" :
            "idle";

          const borderColor =
            state === "correct" ? brand.status.correct.border :
            state === "wrong"   ? brand.status.wrong.border :
            state === "selected" ? brand.border.accent :
            brand.border.item;
          const bg =
            state === "correct" ? brand.status.correct.bg :
            state === "wrong"   ? brand.status.wrong.bg :
            brand.bg.raised;
          const textColor =
            state === "correct" ? brand.status.correct.text :
            state === "wrong"   ? brand.status.wrong.text :
            brand.text.primary;

          return (
            <button
              key={opt.id}
              onClick={() => choose(opt.id)}
              disabled={revealed && state === "idle"}
              style={{
                padding: "14px 12px",
                borderRadius: "10px",
                border: `1px solid ${borderColor}`,
                background: bg,
                cursor: revealed ? "default" : "pointer",
                textAlign: "center",
                transition: "border-color 180ms ease, background 180ms ease",
                WebkitTapHighlightColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: "600", color: textColor, lineHeight: 1.3 }}>
                {opt.label}
              </span>
              {state === "correct" && <span style={{ fontSize: "11px", color: brand.status.correct.text, flexShrink: 0 }}>✓</span>}
              {state === "wrong"   && <span style={{ fontSize: "11px", color: brand.status.wrong.text,  flexShrink: 0 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {/* Visual explanation — shown after answering */}
      {revealed && explanation && (
        <div style={{
          padding: "16px 18px",
          borderRadius: "12px",
          border: `1px solid ${brand.border.item}`,
          background: brand.bg.raised,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}>
          <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.16em", textTransform: "uppercase", color: brand.text.muted }}>
            Look for
          </div>
          <span style={{ fontSize: "14px", color: brand.text.secondary ?? brand.text.muted, lineHeight: "1.6" }}>
            {explanation}
          </span>
        </div>
      )}
    </div>
  );
}

function ArtImage({ id, index, total }: { id: string; index: number; total: number }) {
  const [failed, setFailed] = useState(false);

  // For 2 images use 16/9, for 3 use square-ish
  const aspectRatio = total === 2 ? "4 / 3" : "1 / 1";

  return (
    <div style={{
      width: "100%",
      aspectRatio,
      background: brand.bg.raised,
      overflow: "hidden",
      position: "relative",
    }}>
      {!failed && (
        <img
          src={`/nuggets/thumbs/${id}.jpg`}
          alt=""
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      {failed && (
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: brand.bg.raised,
        }}>
          <span style={{ fontSize: "20px", opacity: 0.3 }}>🖼️</span>
        </div>
      )}
      {/* Subtle index badge for multi-image */}
      {total > 1 && (
        <div style={{
          position: "absolute", bottom: "5px", left: "5px",
          background: "rgba(0,0,0,0.55)",
          borderRadius: "4px",
          padding: "2px 5px",
          fontSize: "9px",
          fontWeight: "600",
          color: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(4px)",
        }}>
          {index + 1}
        </div>
      )}
    </div>
  );
}
