"use client";

import { brand } from "./brand";

export interface RankedItem {
  id: string;
  title: string;
  description: string;
  emoji?: string;
  imageUrl?: string;
  thumbId?: string;  // sequence id → /nuggets/thumbs/{thumbId}.jpg
}

interface Props {
  question: string;
  items: RankedItem[];
  onComplete: () => void;
  onSkip?: () => void;
  loadingSkip?: boolean;
  suggestions?: string[];
  onSelectSuggestion?: (q: string) => void;
  loadingNugget?: string | null;
}

const PLACEHOLDER_ICONS = ["🎵", "🎤", "🎸", "🥁", "🎹", "🎺", "🎻", "🪗"];

function thumbSrc(item: RankedItem): string | null {
  if (item.imageUrl) return item.imageUrl;
  if (item.thumbId) return `/nuggets/thumbs/${item.thumbId}.jpg`;
  return null;
}

export default function RankedListGame({
  items, onComplete, onSkip, loadingSkip = false,
  suggestions = [], onSelectSuggestion, loadingNugget,
}: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

      {/* List */}
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "14px",
            paddingTop: i === 0 ? "0" : "20px",
            paddingBottom: "20px",
            borderBottom: i < items.length - 1
              ? `1px solid ${brand.border.item}`
              : "none",
            alignItems: "flex-start",
          }}
        >
          {/* Thumbnail */}
          <div style={{
            width: "80px",
            height: "80px",
            flexShrink: 0,
            borderRadius: "10px",
            overflow: "hidden",
            background: brand.bg.raised,
            border: `1px solid ${brand.border.item}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            lineHeight: 1,
          }}>
            {thumbSrc(item)
              ? <img src={thumbSrc(item)!} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <span>{item.emoji ?? PLACEHOLDER_ICONS[i % PLACEHOLDER_ICONS.length]}</span>
            }
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0, paddingTop: "2px" }}>
            <div style={{
              fontSize: "14px",
              fontWeight: "700",
              color: brand.text.primary,
              letterSpacing: "-0.01em",
              marginBottom: "6px",
              lineHeight: 1.3,
            }}>
              {item.title}
            </div>
            <div style={{
              fontSize: "13px",
              color: brand.text.secondary,
              lineHeight: "1.55",
            }}>
              {item.description}
            </div>
          </div>
        </div>
      ))}

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
        <button
          onClick={onComplete}
          style={{
            width: "100%", padding: "14px",
            borderRadius: brand.radius.button,
            background: "transparent",
            border: `1px solid ${brand.border.accent}`,
            color: brand.text.primary,
            fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em",
            textTransform: "uppercase", cursor: "pointer",
            transition: brand.motion.snap,
          }}
        >
          Got it
        </button>
        {onSkip && (
          <button
            onClick={onSkip}
            disabled={loadingSkip}
            style={{
              width: "100%", padding: "12px",
              borderRadius: brand.radius.button,
              background: "transparent", border: "none",
              color: brand.text.muted, fontSize: "11px", fontWeight: "500",
              letterSpacing: "0.06em",
              cursor: loadingSkip ? "default" : "pointer",
              opacity: loadingSkip ? 0.4 : 0.6,
              transition: brand.motion.snap,
            }}
          >
            {loadingSkip ? "Finding next…" : "Skip"}
          </button>
        )}
      </div>

      {/* Suggestions after complete */}
      {suggestions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
          <span style={{ ...brand.type.label, color: brand.text.muted }}>What&apos;s next?</span>
          {suggestions.map((q) => (
            <button
              key={q}
              onClick={() => onSelectSuggestion?.(q)}
              disabled={loadingNugget !== null}
              style={{
                width: "100%", padding: "14px 16px",
                borderRadius: brand.radius.item,
                background: loadingNugget === q ? brand.bg.hover : brand.bg.raised,
                border: `1px solid ${loadingNugget === q ? brand.border.accent : brand.border.item}`,
                color: loadingNugget === q ? brand.text.primary : brand.text.secondary,
                fontSize: "14px", fontWeight: "500", lineHeight: "1.4",
                textAlign: "left", cursor: loadingNugget !== null ? "default" : "pointer",
                transition: brand.motion.snap,
              }}
            >
              {loadingNugget === q ? "Loading…" : q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
