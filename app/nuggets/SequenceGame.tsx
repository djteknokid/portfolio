"use client";

import { useState, useRef } from "react";
import { brand } from "./brand";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  question: string;
  sequence: { id: string; text: string }[];
  onComplete: () => void;
  onSkip?: () => void;
  loadingSkip?: boolean;
  suggestions?: string[];
  loadingSuggestions?: boolean;
  onSelectSuggestion?: (q: string) => void;
  loadingNugget?: string | null;
}

export default function SequenceGame({ question: _question, sequence, onComplete, onSkip, loadingSkip = false, suggestions = [], loadingSuggestions = false, onSelectSuggestion, loadingNugget }: Props) {
  const correct = Array.isArray(sequence) ? sequence : [];
  const [items, setItems] = useState(() => shuffle(correct));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());
  const touchStartIndex = useRef<number | null>(null);
  const touchCurrentIndex = useRef<number | null>(null);

  function isLocked(i: number) { return lockedIndices.has(i); }

  function onDragStart(i: number, e: React.DragEvent) {
    if (isLocked(i)) return;
    setDragIndex(i);

    const target = e.currentTarget as HTMLElement;
    const card = target.querySelector("[data-drag-card]") as HTMLElement;
    if (card) {
      const clone = card.cloneNode(true) as HTMLElement;
      clone.style.position = "fixed";
      clone.style.top = "-9999px";
      clone.style.left = "-9999px";
      clone.style.width = `${card.offsetWidth}px`;
      clone.style.background = "rgba(255,255,255,0.08)";
      clone.style.border = `1px solid rgba(255,255,255,0.28)`;
      clone.style.borderRadius = "14px";
      clone.style.padding = "12px 14px";
      clone.style.boxShadow = "0 12px 32px rgba(0,0,0,0.5)";
      clone.style.backdropFilter = "blur(8px)";
      document.body.appendChild(clone);
      e.dataTransfer.setDragImage(clone, clone.offsetWidth / 2, 24);
      setTimeout(() => document.body.removeChild(clone), 0);
    }
  }
  function onDragOver(e: React.DragEvent, i: number) { e.preventDefault(); setDropIndex(i); }
  function onDrop(i: number) {
    if (dragIndex === null || dragIndex === i) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(i, 0, moved);
    setItems(next);
    setDragIndex(null);
    setDropIndex(null);
  }
  function onDragEnd() { setDragIndex(null); setDropIndex(null); }

  function onTouchStart(e: React.TouchEvent, i: number) {
    touchStartIndex.current = i;
    touchCurrentIndex.current = i;
  }
  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const itemEl = el?.closest("[data-seq-index]") as HTMLElement | null;
    if (itemEl) {
      const idx = parseInt(itemEl.dataset.seqIndex ?? "-1");
      if (!isNaN(idx)) touchCurrentIndex.current = idx;
    }
  }
  function onTouchEnd() {
    const from = touchStartIndex.current;
    const to = touchCurrentIndex.current;
    if (from !== null && to !== null && from !== to) {
      const next = [...items];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      setItems(next);
    }
    touchStartIndex.current = null;
    touchCurrentIndex.current = null;
  }

  function handleSubmit() {
    const ok = items.every((item, i) => item.id === correct[i].id);
    setIsCorrect(ok);
    setSubmitted(true);
    if (ok) onComplete();
  }

  function handleReset() {
    const newLocked = new Set(items.map((item, i) => item.id === correct[i].id ? i : -1).filter(i => i !== -1));
    setLockedIndices(newLocked);
    const wrongItems = items.filter((item, i) => item.id !== correct[i].id);
    const shuffledWrong = shuffle(wrongItems);
    const next = items.map((item, i) =>
      item.id === correct[i].id ? item : shuffledWrong.shift()!
    );
    setItems(next);
    setSubmitted(false);
    setIsCorrect(false);
  }

  function textColor(i: number, id: string) {
    if (!submitted) return brand.text.primary;
    return id === correct[i].id ? brand.status.correct.text : brand.status.wrong.text;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item, i) => {
          const isDragging = dragIndex === i;
          const isDropTarget = dropIndex === i && dragIndex !== null && dragIndex !== i;

          return (
            <div
              key={item.id}
              data-seq-index={i}
              draggable={!submitted && !isLocked(i)}
              onDragStart={(e) => onDragStart(i, e)}
              onDragOver={(e) => onDragOver(e, i)}
              onDrop={() => onDrop(i)}
              onDragEnd={onDragEnd}
              onTouchStart={(e) => onTouchStart(e, i)}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                display: "flex",
                gap: "16px",
                cursor: submitted || isLocked(i) ? "default" : isDragging ? "grabbing" : "grab",
                userSelect: "none",
                paddingBottom: i < items.length - 1 ? "28px" : "0",
                position: "relative",
                ...(isDropTarget ? { paddingTop: "4px" } : {}),
              }}
            >
              {isDropTarget && (
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "2px",
                  borderRadius: "1px",
                  background: brand.border.accent,
                  opacity: 0.8,
                }} />
              )}

              <div
                data-drag-card
                style={{
                  display: "flex",
                  gap: "16px",
                  flex: 1,
                  padding: "0",
                  opacity: isDragging ? 0.3 : 1,
                  transition: "opacity 80ms ease",
                }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5px", width: "12px", flexShrink: 0 }}>
                  {!submitted && !isLocked(i) && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      {[0, 1].map((d) => (
                        <div key={d} style={{ width: "12px", height: "1px", borderRadius: "1px", background: brand.text.muted, opacity: 0.5 }} />
                      ))}
                    </div>
                  )}
                  {isLocked(i) && (
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: brand.status.correct.text, opacity: 0.5, marginTop: "2px" }} />
                  )}
                  {submitted && !isLocked(i) && (
                    <span style={{ fontSize: "12px", color: textColor(i, item.id), opacity: 0.8 }}>
                      {item.id === correct[i].id ? "✓" : "✗"}
                    </span>
                  )}
                </div>

                <p style={{
                  fontSize: "17px",
                  fontWeight: "400",
                  color: textColor(i, item.id),
                  lineHeight: "1.55",
                  margin: 0,
                  flex: 1,
                  letterSpacing: "-0.01em",
                  transition: "color 200ms ease",
                }}>
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      {!submitted ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={handleSubmit}
            style={{ width: "100%", padding: "14px", borderRadius: brand.radius.button, background: "transparent", border: `1px solid ${brand.border.item}`, color: brand.text.muted, fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
          >
            I&apos;m done
          </button>
          {onSkip && (
            <button
              onClick={onSkip}
              disabled={loadingSkip}
              style={{ width: "100%", padding: "12px", borderRadius: brand.radius.button, background: "transparent", border: "none", color: brand.text.muted, fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", cursor: loadingSkip ? "default" : "pointer", opacity: loadingSkip ? 0.4 : 0.6, transition: brand.motion.snap }}
            >
              {loadingSkip ? "Finding next…" : "Skip"}
            </button>
          )}
        </div>
      ) : isCorrect ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
          <span style={{ fontSize: "13px", color: brand.text.muted }}>You got it.</span>

          {/* What's Next */}
          {loadingSuggestions ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ height: "48px", borderRadius: brand.radius.item, background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.3 }} />
              ))}
            </div>
          ) : suggestions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ ...brand.type.label, color: brand.text.muted }}>What&apos;s next?</span>
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => onSelectSuggestion?.(q)}
                  disabled={loadingNugget !== null}
                  style={{
                    width: "100%", padding: "14px 16px", borderRadius: brand.radius.item,
                    background: loadingNugget === q ? brand.bg.hover : brand.bg.raised,
                    border: `1px solid ${loadingNugget === q ? brand.border.accent : brand.border.item}`,
                    color: loadingNugget === q ? brand.text.primary : brand.text.secondary,
                    fontSize: "14px", fontWeight: "500", lineHeight: "1.4",
                    textAlign: "left", cursor: loadingNugget !== null ? "default" : "pointer",
                    transition: brand.motion.snap,
                  }}
                >
                  {loadingNugget === q ? "Loading…" : q}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
          <button
            onClick={handleReset}
            style={{ width: "100%", padding: "14px", borderRadius: brand.radius.button, background: "transparent", border: `1px solid ${brand.border.item}`, color: brand.text.muted, fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
