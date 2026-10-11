"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

export interface HistoryEntry {
  question: string;
  id?: string;
  completedAt: number;
}

export interface Profile {
  score: number;
  history: HistoryEntry[];
}

const KEY = "sequence_profile";

function load(): Profile {
  if (typeof window === "undefined") return { score: 0, history: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { score: 0, history: [] };
    return JSON.parse(raw) as Profile;
  } catch {
    return { score: 0, history: [] };
  }
}

function save(p: Profile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(() => load());
  const [synced, setSynced] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const local = load();

    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setSynced(true);
        return;
      }
      setUserId(user.id);

      // Push all local history to Supabase
      if (local.history.length > 0) {
        const rows = local.history.map((h) => ({
          user_id: user.id,
          question: h.question,
          completed_at: new Date(h.completedAt).toISOString(),
        }));
        await supabase.from("user_history")
          .upsert(rows, { onConflict: "user_id,question" });
      }

      // Pull full history from Supabase
      const { data: remote } = await supabase
        .from("user_history")
        .select("question, completed_at")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false });

      if (!remote || remote.length === 0) {
        setSynced(true);
        return;
      }

      // Merge: remote is source of truth, keep local entries not yet in remote
      const remoteQuestions = new Set(remote.map((r) => r.question));
      const localOnly = local.history.filter((h) => !remoteQuestions.has(h.question));

      const merged: HistoryEntry[] = [
        ...remote.map((r) => ({
          question: r.question,
          completedAt: new Date(r.completed_at).getTime(),
        })),
        ...localOnly,
      ].sort((a, b) => b.completedAt - a.completedAt);

      const merged_profile: Profile = { score: merged.length, history: merged };
      save(merged_profile);
      setProfile(merged_profile);
      setSynced(true);

      // Sync total score
      supabase.from("user_set_progress").upsert({
        user_id: user.id,
        set_id: "all",
        total_score: merged.length,
        cards_solved: merged.length,
        last_played_at: new Date().toISOString(),
      }, { onConflict: "user_id,set_id" }).then(() => {});
    });
  }, []);

  const recordCorrect = useCallback((question: string, setId?: string, cardId?: string) => {
    setProfile((prev) => {
      // Deduplicate
      if (prev.history.some((h) => h.question === question)) return prev;

      const next: Profile = {
        score: prev.score + 1,
        history: [{ question, id: cardId, completedAt: Date.now() }, ...prev.history],
      };
      save(next);

      if (userId) {
        const supabase = createClient();

        // Write to user_history (source of truth)
        supabase.from("user_history").upsert({
          user_id: userId,
          question,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id,question" }).then(() => {});

        if (setId) {
          supabase.from("user_solved_cards").upsert({
            user_id: userId,
            set_id: setId,
            card_id: question,
            score: 1,
            solved_at: new Date().toISOString(),
          }, { onConflict: "user_id,set_id,card_id" }).then(() => {});
        }

        supabase.from("user_set_progress").upsert({
          user_id: userId,
          set_id: setId ?? "all",
          total_score: next.score,
          cards_solved: next.history.length,
          last_played_at: new Date().toISOString(),
        }, { onConflict: "user_id,set_id" }).then(() => {});
      }

      return next;
    });
  }, [userId]);

  return { profile, recordCorrect, userId, synced };
}
