"use client";

import { useState, useEffect, useCallback } from "react";

export interface HistoryEntry {
  question: string;
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

  useEffect(() => {
    setProfile(load());
  }, []);

  const recordCorrect = useCallback((question: string) => {
    setProfile((prev) => {
      const next: Profile = {
        score: prev.score + 1,
        history: [{ question, completedAt: Date.now() }, ...prev.history],
      };
      save(next);
      return next;
    });
  }, []);

  return { profile, recordCorrect };
}
