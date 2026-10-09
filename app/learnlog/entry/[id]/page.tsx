"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearnlog } from "../../context";

export default function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { entries, updateEntry, deleteEntry } = useLearnlog();

  const [id, setId] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [original, setOriginal] = useState("");
  const [date, setDate] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    params.then(({ id: entryId }) => {
      setId(entryId);
      const entry = entries.find((e) => e.id === entryId);
      if (entry) {
        setBody(entry.body);
        setOriginal(entry.body);
        setDate(
          new Date(entry.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        );
      }
    });
  }, [params, entries]);

  const dirty = body !== original;

  function handleSave() {
    if (!id || !dirty) return;
    updateEntry(id, body.trim());
    setOriginal(body);
  }

  function handleDelete() {
    if (!id) return;
    if (!confirming) {
      setConfirming(true);
      return;
    }
    deleteEntry(id);
    router.back();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
  }

  return (
    <div className="learnlog-screen learnlog-entry-screen">
      <header className="learnlog-entry-topbar">
        <button className="learnlog-back-btn" onClick={() => router.back()}>
          ← Back
        </button>
        <span className="learnlog-entry-date">{date}</span>
      </header>

      <main className="learnlog-entry-main">
        <textarea
          className="learnlog-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </main>

      <footer className="learnlog-entry-footer">
        {confirming ? (
          <>
            <span className="learnlog-confirm-text">Delete this entry?</span>
            <button className="learnlog-delete-confirm-btn" onClick={handleDelete}>Yes, delete</button>
            <button className="learnlog-cancel-btn" onClick={() => setConfirming(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button
              className="learnlog-save-btn"
              onClick={handleSave}
              disabled={!dirty}
            >
              Save
            </button>
            <button className="learnlog-delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
      </footer>
    </div>
  );
}
