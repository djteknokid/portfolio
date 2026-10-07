"use client";

import { useState, useEffect } from "react";
import { brand } from "./brand";

interface Props {
  story: { year: string; text: string }[];
  onReady: () => void;
}

const BEAT_INTERVAL = 1200;

export default function NuggetStory({ story, onReady }: Props) {
  const [revealed, setRevealed] = useState(0);
  const done = revealed >= story.length;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), BEAT_INTERVAL);
    return () => clearTimeout(t);
  }, [revealed, done]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <span style={{ ...brand.type.label, color: brand.text.muted }}>The story</span>

      {/* All beats, reveal one by one */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {story.map((entry, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              opacity: i < revealed ? 1 : 0,
              transform: i < revealed ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 300ms ease, transform 300ms ease",
            }}
          >
            {/* Left — year + connector line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "44px", flexShrink: 0 }}>
              <span style={{
                fontSize: "10px",
                fontWeight: "600",
                color: i < revealed ? brand.text.muted : "transparent",
                whiteSpace: "nowrap",
                paddingTop: "3px",
                transition: "color 200ms ease",
                letterSpacing: "0.04em",
              }}>
                {entry.year}
              </span>
              {i < story.length - 1 && (
                <div style={{
                  width: "1px",
                  flex: 1,
                  minHeight: "16px",
                  marginTop: "6px",
                  background: i < revealed - 1 ? brand.border.accent : brand.border.item,
                  transition: "background 400ms ease",
                }} />
              )}
            </div>

            {/* Right — text */}
            <p style={{
              fontSize: "14px",
              fontWeight: "500",
              color: brand.text.primary,
              lineHeight: "1.5",
              margin: 0,
              paddingBottom: i < story.length - 1 ? "16px" : "0",
            }}>
              {entry.text}
            </p>
          </div>
        ))}
      </div>

      {/* CTA fades in when done */}
      <div style={{
        opacity: done ? 1 : 0,
        transform: done ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 400ms ease, transform 400ms ease",
        pointerEvents: done ? "auto" : "none",
      }}>
        <button
          onClick={onReady}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: brand.radius.button,
            background: brand.text.primary,
            color: brand.bg.page,
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.04em",
            border: "none",
            cursor: "pointer",
          }}
        >
          Test me →
        </button>
      </div>
    </div>
  );
}
