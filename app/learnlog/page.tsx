"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Shell from "./Shell";
import { useLearnlog } from "./context";

export default function LearnlogCreate() {
  const [body, setBody] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastHiding, setToastHiding] = useState(false);
  const { addEntry } = useLearnlog();
  const router = useRouter();

  function handleSave() {
    const text = body.trim();
    if (!text) return;
    const id = addEntry(text);
    setBody("");
    setToastVisible(true);
    setToastHiding(false);
    setTimeout(() => setToastHiding(true), 800);
    setTimeout(() => {
      setToastVisible(false);
      router.push(`/learnlog/library?new=${id}`);
    }, 1200);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSave();
  }

  return (
    <div className="learnlog-screen">
      <Shell />
      <main className="learnlog-create-main">
        <textarea
          className="learnlog-textarea"
          placeholder="What did you learn today?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="learnlog-create-footer">
          <button
            className="learnlog-save-btn"
            onClick={handleSave}
            disabled={!body.trim()}
          >
            Save
          </button>
          <span className="learnlog-hint">⌘↵</span>
        </div>
      </main>
      {toastVisible && (
        <div className={`learnlog-toast ${toastHiding ? "hide" : ""}`}>
          Saved
        </div>
      )}
    </div>
  );
}
