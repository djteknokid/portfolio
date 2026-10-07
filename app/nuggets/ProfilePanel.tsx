"use client";

import { useEffect, useRef } from "react";
import { brand } from "./brand";
import type { Profile } from "./useProfile";

interface Props {
  profile: Profile;
  open: boolean;
  onClose: () => void;
}

export default function ProfilePanel({ profile, open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(360px, 90vw)",
          background: "#0f0f0f",
          borderLeft: `1px solid ${brand.border.item}`,
          zIndex: 50,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 260ms cubic-bezier(0.32,0,0.14,1)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: `1px solid ${brand.border.item}`,
          flexShrink: 0,
        }}>
          <span style={{ ...brand.type.label, color: brand.text.muted }}>Profile</span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: brand.text.muted,
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              padding: "2px 4px",
            }}
          >
            ×
          </button>
        </div>

        {/* Score */}
        <div style={{
          padding: "32px 24px 24px",
          borderBottom: `1px solid ${brand.border.item}`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "56px", fontWeight: "700", color: brand.text.primary, lineHeight: 1, letterSpacing: "-0.04em" }}>
              {profile.score}
            </span>
            <span style={{ ...brand.type.label, color: brand.text.muted }}>
              {profile.score === 1 ? "sequence solved" : "sequences solved"}
            </span>
          </div>
        </div>

        {/* History */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <span style={{ ...brand.type.label, color: brand.text.muted }}>History</span>

          {profile.history.length === 0 ? (
            <p style={{ fontSize: "14px", color: brand.text.muted, margin: 0, lineHeight: "1.5" }}>
              Nothing yet. Solve your first sequence.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {profile.history.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 14px",
                    borderRadius: brand.radius.item,
                    background: brand.bg.raised,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "11px", color: brand.text.muted, flexShrink: 0, paddingTop: "2px" }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: "14px", color: brand.text.secondary, lineHeight: "1.45", fontWeight: "500" }}>
                    {entry.question}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
