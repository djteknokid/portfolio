"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ShellBar from "../ShellBar";
import { brand } from "../brand";

interface Leader {
  user_id: string;
  total_score: number;
  name: string;
  avatar: string;
}

const MEDAL: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const supabase = createClient();

      // Sum total_score per user across all sets
      const { data } = await supabase
        .from("user_set_progress")
        .select("user_id, total_score")
        .order("total_score", { ascending: false })
        .limit(20);

      if (!data) { setLoading(false); return; }

      // Aggregate per user (multiple rows per user, one per set)
      const byUser: Record<string, number> = {};
      for (const row of data) {
        byUser[row.user_id] = (byUser[row.user_id] ?? 0) + row.total_score;
      }

      // Get user metadata for display names
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
    }

    fetch();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page }}>
      <ShellBar title="Leaderboard" backHref="/nuggets" />

      <main style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "72px",
        paddingBottom: "48px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}>
        <div style={{ width: "100%", maxWidth: "390px", display: "flex", flexDirection: "column", gap: "8px" }}>

          <h1 style={{ margin: "0 0 24px", fontSize: "26px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Top players
          </h1>

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
            return (
              <div key={player.user_id} style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 16px",
                borderRadius: brand.radius.item,
                background: brand.bg.raised,
                border: `1px solid ${brand.border.item}`,
              }}>
                <span style={{
                  width: "24px",
                  textAlign: "center",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: MEDAL[rank] ?? brand.text.muted,
                  fontVariantNumeric: "tabular-nums",
                  flexShrink: 0,
                }}>
                  {rank}
                </span>

                <div style={{
                  width: "36px", height: "36px",
                  borderRadius: "50%",
                  background: brand.bg.hover,
                  border: `1px solid ${brand.border.card}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", fontWeight: "700",
                  color: brand.text.secondary,
                  flexShrink: 0,
                }}>
                  {player.avatar.length === 1 ? player.avatar : "?"}
                </div>

                <span style={{ flex: 1, fontSize: "15px", fontWeight: "600", color: brand.text.primary }}>
                  {player.name}
                </span>

                <span style={{ fontSize: "15px", fontWeight: "700", color: brand.text.primary, fontVariantNumeric: "tabular-nums" }}>
                  {player.total_score}
                </span>
                <span style={{ fontSize: "10px", fontWeight: "500", color: brand.text.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  pts
                </span>
              </div>
            );
          })}

          {!loading && (
            <p style={{ marginTop: "24px", fontSize: "12px", color: brand.text.muted, textAlign: "center", lineHeight: 1.6 }}>
              Sign in to appear on the leaderboard.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
