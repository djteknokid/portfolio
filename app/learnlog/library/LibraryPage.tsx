"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Shell from "../Shell";
import { useLearnlog } from "../context";

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (sameDay(d, today)) return "Today";
  if (sameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function groupByDay(entries: { id: string; body: string; created_at: string }[]) {
  const groups: { label: string; key: string; entries: typeof entries }[] = [];
  const seen = new Map<string, number>();

  for (const entry of entries.filter((e) => e?.created_at)) {
    const key = entry.created_at.slice(0, 10);
    if (seen.has(key)) {
      groups[seen.get(key)!].entries.push(entry);
    } else {
      seen.set(key, groups.length);
      groups.push({ label: formatDate(entry.created_at), key, entries: [entry] });
    }
  }

  return groups;
}

export default function LibraryPage() {
  const { entries, loading } = useLearnlog();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newId = searchParams.get("new");

  const groups = groupByDay(entries);
  const todayKey = new Date().toISOString().slice(0, 10);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([todayKey]));
  const newRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (newId && newRef.current) {
      newRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [newId, entries]);

  function toggle(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  return (
    <div className="learnlog-screen">
      <Shell />
      <main className="learnlog-library-main">
        {loading && <p className="learnlog-empty">Loading…</p>}
        {!loading && entries.length === 0 && (
          <p className="learnlog-empty">Nothing yet. Start writing.</p>
        )}
        {groups.map((group) => {
          const open = expanded.has(group.key);
          return (
            <div key={group.key} className="learnlog-day-group">
              <button
                className="learnlog-day-header"
                onClick={() => toggle(group.key)}
              >
                <span className="learnlog-day-label">{group.label}</span>
                <span className={`learnlog-day-chevron ${open ? "open" : ""}`}>›</span>
              </button>
              {open && (
                <div className="learnlog-day-entries">
                  {group.entries.map((entry) => (
                    <button
                      key={entry.id}
                      ref={entry.id === newId ? newRef : null}
                      className="learnlog-entry-row"
                      onClick={() => router.push(`/learnlog/entry/${entry.id}`)}
                    >
                      <span className="learnlog-entry-preview">{entry.body}</span>
                      {entry.id === newId && (
                        <span className="learnlog-new-tag">NEW</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
