"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { brand } from "./brand";

interface Leader {
  user_id: string;
  total_score: number;
  name: string;
  avatar: string;
}

const MEDAL: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LeaderboardPanel({ open, onClose }: Props) {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (!open || fetched) return;
    setLoading(true);

    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("user_set_progress")
        .select("user_id, total_score")
        .order("total_score", { ascending: false })
        .limit(20);

      if (!data) { setLoading(false); return; }

      const byUser: Record<string, number> = {};
      for (const row of data) {
        byUser[row.user_id] = (byUser[row.user_id] ?? 0) + row.total_score;
      }

      const ranked = await Promise.all(
        Object.entries(byUser)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(async ([user_id, total_score]) => {
            let identity: { name?: string; avatar?: string } | null = null;
            try {
              const res = await supabase
                .from("user_identities_public")
                .select("name, avatar")
                .eq("user_id", user_id)
                .single();
              identity = res.data;
            } catch {}
            const name: string = identity?.name ?? user_id.slice(0, 8);
            const avatar: string = identity?.avatar ?? name[0]?.toUpperCase() ?? "?";
            return { user_id, total_score, name, avatar };
          })
      );

      setLeaders(ranked);
      setLoading(false);
      setFetched(true);
    }

    load();
  }, [open, fetched]);

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
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "18px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.02em" }}>Top Points</span>
            <span style={{ fontSize: "11px", fontWeight: "600", color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>pts</span>
          </div>
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

        {/* Content */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>

          {loading && (
            <div style={{ fontSize: "13px", color: brand.text.muted, padding: "8px 0" }}>Loading…</div>
          )}

          {!loading && leaders.length === 0 && (
            <div style={{ fontSize: "13px", color: brand.text.muted, padding: "8px 0" }}>
              No scores yet — be the first!
            </div>
          )}

          {leaders.map((player, i) => {
            const rank = i + 1;
            const medal = MEDAL[rank];
            return (
              <div key={player.user_id} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: brand.radius.item,
                background: medal ? `${medal}08` : brand.bg.raised,
                border: `1px solid ${medal ? `${medal}22` : brand.border.item}`,
              }}>
                {/* Rank */}
                <span style={{
                  width: "18px",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: medal ?? brand.text.muted,
                  fontVariantNumeric: "tabular-nums",
                  flexShrink: 0,
                }}>
                  {rank <= 3 ? ["🥇","🥈","🥉"][rank - 1] : rank}
                </span>

                {/* Avatar */}
                <div style={{
                  width: "30px", height: "30px",
                  borderRadius: "50%",
                  background: brand.bg.hover,
                  border: `1px solid ${brand.border.card}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: "700",
                  color: brand.text.secondary,
                  flexShrink: 0,
                }}>
                  {player.avatar.length === 1 ? player.avatar : "?"}
                </div>

                {/* Name */}
                <span style={{ flex: 1, fontSize: "14px", fontWeight: "500", color: brand.text.primary, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {player.name}
                </span>

                {/* Score — the hero */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "3px", flexShrink: 0 }}>
                  <span style={{ fontSize: "20px", fontWeight: "800", color: medal ?? brand.text.primary, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {player.total_score}
                  </span>
                  <span style={{ fontSize: "10px", fontWeight: "600", color: "#818cf8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    pts
                  </span>
                </div>
              </div>
            );
          })}

          {!loading && (
            <p style={{ marginTop: "16px", fontSize: "12px", color: brand.text.muted, textAlign: "center", lineHeight: 1.6 }}>
              Sign in to appear on the leaderboard.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
