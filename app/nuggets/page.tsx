"use client";

import { useState } from "react";
import NuggetCard from "./NuggetCard";
import { useProfile } from "./useProfile";
import { brand } from "./brand";

export default function NuggetsPage() {
  const { profile } = useProfile();
  const [openAnswered, setOpenAnswered] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column" }}>

      {/* Shell bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "20px",
        paddingRight: "20px",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${brand.border.item}`,
      }}>
        <span style={{
          fontSize: "13px",
          fontWeight: "700",
          color: brand.text.muted,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          Sequence
        </span>

        <button
          onClick={() => setOpenAnswered(true)}
          style={{
            background: "none",
            border: "none",
            padding: "4px 8px",
            cursor: profile.score > 0 ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            borderRadius: "6px",
          }}
        >
          <span style={{
            fontSize: "18px",
            fontWeight: "700",
            color: profile.score > 0 ? brand.text.primary : brand.text.muted,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
            transition: "color 300ms ease",
          }}>
            {profile.score}
          </span>
          <span style={{
            fontSize: "11px",
            fontWeight: "500",
            color: brand.text.muted,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}>
            solved
          </span>
        </button>
      </div>

      {/* Content — padded below shell bar */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "48px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}>
        <NuggetCard
          openAnswered={openAnswered}
          onAnsweredClose={() => setOpenAnswered(false)}
        />
      </main>
    </div>
  );
}
