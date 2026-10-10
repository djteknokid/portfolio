"use client";

import { brand } from "./brand";

export interface Suggestion {
  id: string;
  question: string;
}

interface Props {
  suggestions: Suggestion[];
  loadingNugget?: string | null;
  onSelect?: (question: string) => void;
}

export default function SuggestionList({ suggestions, loadingNugget, onSelect }: Props) {
  if (suggestions.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: brand.text.muted }}>
        What&apos;s next?
      </span>
      {suggestions.map((s) => {
        const isLoading = loadingNugget === s.question;
        return (
          <button
            key={s.id}
            onClick={() => onSelect?.(s.question)}
            disabled={loadingNugget !== null && loadingNugget !== undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: brand.bg.raised,
              border: `1px solid ${isLoading ? brand.border.accent : brand.border.item}`,
              borderRadius: "16px",
              padding: "12px 14px",
              minHeight: "80px",
              width: "100%",
              textAlign: "left",
              cursor: loadingNugget != null ? "default" : "pointer",
              WebkitTapHighlightColor: "transparent",
              transition: brand.motion.snap,
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "10px",
              overflow: "hidden",
              flexShrink: 0,
              background: brand.bg.page,
            }}>
              {s.id && (
                <div style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(/nuggets/thumbs/${s.id}.jpg)`,
                  backgroundSize: "200%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }} />
              )}
            </div>
            <span style={{
              flex: 1,
              fontSize: "13px",
              fontWeight: "500",
              color: isLoading ? brand.text.muted : brand.text.secondary,
              lineHeight: "1.4",
            }}>
              {isLoading ? "Loading…" : s.question}
            </span>
          </button>
        );
      })}
    </div>
  );
}
