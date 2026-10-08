"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brand } from "./brand";
import { NUGGET_SETS } from "@/lib/nuggets/sets";
import { useProfile } from "./useProfile";

function PackCard({ slug, label, name, description, thumbId, cardCount }: {
  slug: string;
  label: string;
  name: string;
  description: string;
  thumbId: string;
  cardCount: number;
}) {
  const router = useRouter();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <button
      onClick={() => router.push(`/nuggets/${slug}`)}
      style={{
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        border: `1px solid ${brand.border.card}`,
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        padding: 0,
        display: "block",
        position: "relative",
      }}
    >
      {/* Hero image */}
      <div style={{
        width: "100%",
        aspectRatio: "16 / 9",
        background: brand.bg.raised,
        position: "relative",
        overflow: "hidden",
      }}>
        {!imgFailed && (
          <img
            src={`/nuggets/thumbs/${thumbId}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        {/* Scrim */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.75) 100%)",
        }} />

        {/* Label pill */}
        <div style={{
          position: "absolute",
          top: "14px",
          left: "16px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          borderRadius: "99px",
          padding: "4px 10px",
          fontSize: "10px",
          fontWeight: "600",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
        }}>
          {label}
        </div>

        {/* Card count pill */}
        <div style={{
          position: "absolute",
          top: "14px",
          right: "16px",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          borderRadius: "99px",
          padding: "4px 10px",
          fontSize: "10px",
          fontWeight: "600",
          color: "rgba(255,255,255,0.45)",
        }}>
          {cardCount} cards
        </div>
      </div>

      {/* Pack info */}
      <div style={{
        padding: "16px 18px 18px",
        background: brand.bg.raised,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}>
        <span style={{
          fontSize: "20px",
          fontWeight: "800",
          color: brand.text.primary,
          letterSpacing: "-0.025em",
          lineHeight: 1.1,
        }}>
          {name}
        </span>
        <span style={{
          fontSize: "13px",
          fontWeight: "400",
          color: brand.text.muted,
          lineHeight: 1.5,
        }}>
          {description}
        </span>
      </div>
    </button>
  );
}

export default function NuggetsPage() {
  const { profile } = useProfile();

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
        {profile.score > 0 && (
          <span style={{ fontSize: "12px", fontWeight: "600", color: brand.status.correct.text }}>
            {profile.score} solved
          </span>
        )}
      </div>

      {/* Content */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "64px",
        paddingBottom: "48px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}>
        <div style={{ width: "100%", maxWidth: "390px", display: "flex", flexDirection: "column", gap: "24px" }}>

          <div style={{ paddingTop: "8px" }}>
            <h1 style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "800",
              color: brand.text.primary,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}>
              Choose a pack
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {NUGGET_SETS.map((set) => (
              <PackCard
                key={set.slug}
                slug={set.slug}
                label={set.label}
                name={set.name}
                description={set.description}
                thumbId={set.thumbId}
                cardCount={set.cardCount}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
