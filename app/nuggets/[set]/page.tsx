"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import NuggetDeck from "../NuggetCard";
import { useProfile } from "../useProfile";
import { brand } from "../brand";
import { getSet } from "@/lib/nuggets/sets";

export default function SetPage({ params }: { params: Promise<{ set: string }> }) {
  const { set: slug } = use(params);
  const router = useRouter();
  const { profile } = useProfile();
  const [openAnswered, setOpenAnswered] = useState(false);

  const nuggetSet = getSet(slug);
  if (!nuggetSet) {
    return (
      <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: brand.text.muted, fontSize: "14px" }}>Set not found.</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>

      {/* Shell bar */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 40,
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "16px",
        paddingRight: "20px",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${brand.border.item}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => router.push("/nuggets")}
            style={{
              background: "none", border: "none", padding: "4px 8px 4px 0",
              cursor: "pointer", display: "flex", alignItems: "center",
              color: brand.text.muted, fontSize: "20px", lineHeight: 1,
            }}
          >
            ‹
          </button>
          <span style={{
            fontSize: "13px", fontWeight: "700",
            color: brand.text.muted,
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            {nuggetSet.label}
          </span>
        </div>

        <button
          onClick={() => setOpenAnswered(true)}
          style={{
            background: "none", border: "none",
            padding: "4px 8px",
            cursor: profile.score > 0 ? "pointer" : "default",
            display: "flex", alignItems: "center", gap: "6px",
            borderRadius: "6px",
          }}
        >
          <span style={{
            fontSize: "18px", fontWeight: "700",
            color: profile.score > 0 ? brand.text.primary : brand.text.muted,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.02em",
            transition: "color 300ms ease",
          }}>
            {profile.score}
          </span>
          <span style={{
            fontSize: "11px", fontWeight: "500",
            color: brand.text.muted,
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            solved
          </span>
        </button>
      </div>

      {/* Feed */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "48px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}>
        <NuggetDeck
          topics={nuggetSet.topics}
          openAnswered={openAnswered}
          onAnsweredClose={() => setOpenAnswered(false)}
        />
      </main>
    </div>
  );
}
