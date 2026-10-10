"use client";

import { brand } from "./brand";
import SuggestionList, { type Suggestion } from "./SuggestionList";

interface Props {
  suggestions: Suggestion[];
  loadingSuggestions?: boolean;
  loadingNugget?: string | null;
  onSelect?: (question: string) => void;
  onDone?: () => void;
}

export default function WhatsNext({ suggestions, loadingSuggestions = false, loadingNugget, onSelect, onDone }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
      {loadingSuggestions ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: "68px", borderRadius: brand.radius.item, background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.3 }} />
          ))}
        </div>
      ) : suggestions.length > 0 ? (
        <SuggestionList suggestions={suggestions} loadingNugget={loadingNugget} onSelect={onSelect} />
      ) : (
        <button
          onClick={onDone}
          style={{
            width: "100%",
            padding: "14px 20px",
            borderRadius: brand.radius.button,
            background: "transparent",
            border: `1px solid ${brand.border.item}`,
            color: brand.text.muted,
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Done
        </button>
      )}
    </div>
  );
}
