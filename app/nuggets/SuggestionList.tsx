"use client";

import { useState } from "react";
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

function ThumbImage({ id }: { id: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={`/nuggets/thumbs/${id}.jpg`}
      alt=""
      onError={() => setFailed(true)}
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "10px",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

export default function SuggestionList({ suggestions, loadingNugget, onSelect }: Props) {
  if (suggestions.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ ...brand.type.label, fontSize: brand.type.label.size, color: brand.text.muted }}>
        What&apos;s next?
      </span>
      {suggestions.map((s) => {
        const isLoading = loadingNugget === s.question;
        return (
          <button
            key={s.id}
            onClick={() => onSelect?.(s.question)}
            disabled={loadingNugget !== null}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: brand.radius.item,
              background: isLoading ? brand.bg.hover : brand.bg.raised,
              border: `1px solid ${isLoading ? brand.border.accent : brand.border.item}`,
              color: isLoading ? brand.text.primary : brand.text.secondary,
              fontSize: "13px", fontWeight: "500", lineHeight: "1.4",
              textAlign: "left",
              cursor: loadingNugget !== null ? "default" : "pointer",
              transition: brand.motion.snap,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <ThumbImage id={s.id} />
            <span style={{ flex: 1 }}>
              {isLoading ? "Loading…" : s.question}
            </span>
          </button>
        );
      })}
    </div>
  );
}
