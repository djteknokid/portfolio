"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brand } from "./brand";
import { NUGGET_SETS } from "@/lib/nuggets/sets";
import { useProfile } from "./useProfile";

function SetRow({ slug, label, thumbId, solvedCount }: {
  slug: string;
  label: string;
  thumbId: string;
  solvedCount: number;
}) {
  const router = useRouter();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button
      onClick={() => router.push(`/nuggets/${slug}`)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px",
        borderRadius: "16px",
        background: brand.bg.raised,
        border: `1px solid ${brand.border.item}`,
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
        transition: brand.motion.snap,
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: "72px",
        height: "54px",
        borderRadius: "10px",
        overflow: "hidden",
        flexShrink: 0,
        background: brand.bg.page,
      }}>
        {!imgFailed && (
          <img
            src={`/nuggets/thumbs/${thumbId}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
      </div>

      {/* Label */}
      <span style={{
        flex: 1,
        fontSize: "17px",
        fontWeight: "600",
        color: brand.text.primary,
        letterSpacing: "-0.01em",
      }}>
        {label}
      </span>

      {/* Solved count + arrow */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {solvedCount > 0 && (
          <span style={{ fontSize: "12px", color: brand.status.correct.text, fontWeight: "600" }}>
            {solvedCount} ✓
          </span>
        )}
        <span style={{ fontSize: "16px", color: brand.text.muted, opacity: 0.4 }}>›</span>
      </div>
    </button>
  );
}

export default function NuggetsPage() {
  const { profile } = useProfile();

  // Count solved per set based on profile history
  // We don't have per-card topic in history, so just show total for now
  const totalSolved = profile.score;

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
        paddingLeft: "20px",
        paddingRight: "20px",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${brand.border.item}`,
      }}>
        <span style={{
          fontSize: "13px", fontWeight: "700",
          color: brand.text.muted,
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          Sequence
        </span>
        {totalSolved > 0 && (
          <span style={{
            fontSize: "12px", fontWeight: "600",
            color: brand.status.correct.text,
          }}>
            {totalSolved} solved
          </span>
        )}
      </div>

      {/* Content */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "72px",
        paddingBottom: "48px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}>
        <div style={{ width: "100%", maxWidth: "390px", display: "flex", flexDirection: "column", gap: "24px" }}>

          <div>
            <h1 style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "800",
              color: brand.text.primary,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}>
              What do you<br />want to learn?
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {NUGGET_SETS.map((set) => (
              <SetRow
                key={set.slug}
                slug={set.slug}
                label={set.label}
                thumbId={set.thumbId}
                solvedCount={0}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
