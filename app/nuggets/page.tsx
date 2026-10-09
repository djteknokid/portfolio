"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brand } from "./brand";
import { NUGGET_SETS } from "@/lib/nuggets/sets";
import { useProfile } from "./useProfile";
import ShellBar from "./ShellBar";
import UserMenu from "./UserMenu";

function PackCard({ slug, number, name, description, thumbId, cardCount }: {
  slug: string;
  number: string;
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
        background: brand.bg.raised,
        cursor: "pointer",
        textAlign: "left",
        padding: 0,
        display: "block",
      }}
    >
      {/* Hero image */}
      <div style={{
        width: "100%",
        aspectRatio: "16 / 9",
        background: brand.bg.page,
        position: "relative",
        overflow: "hidden",
      }}>
        {!imgFailed && (
          <img
            src={`/nuggets/thumbs/${thumbId}.jpg`}
            alt=""
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.08)", transformOrigin: "center center" }}
          />
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)",
        }} />

        {/* Card count pill */}
        <div style={{
          position: "absolute",
          top: "14px", right: "14px",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          borderRadius: "99px",
          padding: "4px 10px",
          fontSize: "10px", fontWeight: "600",
          color: "rgba(255,255,255,0.45)",
        }}>
          {cardCount} cards
        </div>
      </div>

      {/* Pack info */}
      <div style={{
        padding: "16px 18px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}>
        {/* SET / 001 */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "9px", fontWeight: "700",
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: brand.text.muted,
          }}>
            Set
          </span>
          <span style={{
            fontSize: "9px", fontWeight: "700",
            letterSpacing: "0.1em",
            color: brand.text.muted,
            fontVariantNumeric: "tabular-nums",
          }}>
            {number}
          </span>
        </div>

        {/* Name */}
        <span style={{
          fontSize: "20px",
          fontWeight: "800",
          color: brand.text.primary,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
        }}>
          {name}
        </span>

        {/* Description */}
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

  const scoreRight = profile.score > 0 ? (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span style={{ fontSize: "18px", fontWeight: "700", color: brand.text.primary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
        {profile.score}
      </span>
      <span style={{ fontSize: "11px", fontWeight: "500", color: brand.text.muted, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        solved
      </span>
    </div>
  ) : undefined;

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>

      <ShellBar title="Basic Knowledge" right={<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>{scoreRight}<UserMenu /></div>} />

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
                number={set.number}
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
