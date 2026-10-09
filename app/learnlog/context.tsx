"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Entry {
  id: string;
  user_id: string;
  body: string;
  created_at: string;
  updated_at: string;
}

interface LearnlogContextValue {
  userId: string;
  entries: Entry[];
  streak: number;
  loading: boolean;
  addEntry: (body: string) => string;
  updateEntry: (id: string, body: string) => void;
  deleteEntry: (id: string) => void;
  refresh: () => void;
}

const LearnlogContext = createContext<LearnlogContextValue | null>(null);

export function useLearnlog() {
  const ctx = useContext(LearnlogContext);
  if (!ctx) throw new Error("useLearnlog must be used inside LearnlogProvider");
  return ctx;
}

const STORAGE_KEY = "learnlog_entries";
const USER_KEY = "learnlog_user_id";

function load(): Entry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(entries: Entry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function computeStreak(entries: Entry[]): number {
  if (entries.length === 0) return 0;

  const days = new Set(
    entries.filter((e) => e?.created_at).map((e) => e.created_at.slice(0, 10))
  );

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function LearnlogProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let id = localStorage.getItem(USER_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(USER_KEY, id);
    }
    setUserId(id);
    setEntries(load());
    setLoading(false);
  }, []);

  function addEntry(body: string): string {
    const now = new Date().toISOString();
    const entry: Entry = {
      id: crypto.randomUUID(),
      user_id: userId,
      body,
      created_at: now,
      updated_at: now,
    };
    setEntries((prev) => {
      const next = [entry, ...prev];
      save(next);
      return next;
    });
    return entry.id;
  }

  function updateEntry(id: string, body: string) {
    setEntries((prev) => {
      const next = prev.map((e) =>
        e.id === id ? { ...e, body, updated_at: new Date().toISOString() } : e
      );
      save(next);
      return next;
    });
  }

  function deleteEntry(id: string) {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      save(next);
      return next;
    });
  }

  function refresh() {
    setEntries(load());
  }

  const streak = computeStreak(entries);

  return (
    <LearnlogContext.Provider
      value={{ userId, entries, streak, loading, addEntry, updateEntry, deleteEntry, refresh }}
    >
      {children}
    </LearnlogContext.Provider>
  );
}
