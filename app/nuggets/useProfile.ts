"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

export interface HistoryEntry {
  question: string;
  id?: string;        // card ID — used for dedup; falls back to question for legacy entries
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
  const [profile, setProfile] = useState<Profile>({ score: 0, history: [] });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const local = load();
    setProfile(local);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      // Sync total score from localStorage on first load
      if (local.score > 0) {
        supabase.from("user_set_progress").upsert({
          user_id: user.id,
          set_id: "all",
          total_score: local.score,
          cards_solved: local.history.length,
          last_played_at: new Date().toISOString(),
        }, { onConflict: "user_id,set_id" }).then(() => {});
      }
    });
  }, []);

  const recordCorrect = useCallback((question: string, setId?: string, cardId?: string) => {
    setProfile((prev) => {
      const next: Profile = {
        score: prev.score + 1,
        history: [{ question, id: cardId, completedAt: Date.now() }, ...prev.history],
      };
      save(next);

      if (userId) {
        const supabase = createClient();
        const bucket = setId ?? "all";

        if (setId) {
          supabase.from("user_solved_cards").upsert({
            user_id: userId,
            set_id: setId,
            card_id: question,
            score: 1,
            solved_at: new Date().toISOString(),
          }, { onConflict: "user_id,set_id,card_id" }).then(() => {});
        }

        const solvedInBucket = setId
          ? next.history.filter((h) => h.question.startsWith(setId)).length
          : next.history.length;
        supabase.from("user_set_progress").upsert({
          user_id: userId,
          set_id: bucket,
          total_score: next.score,
          cards_solved: solvedInBucket,
          last_played_at: new Date().toISOString(),
        }, { onConflict: "user_id,set_id" }).then(() => {});
      }

      return next;
    });
  }, [userId]);

  return { profile, recordCorrect, userId };
}
