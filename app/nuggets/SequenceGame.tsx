"use client";

import { useState, useRef, useEffect } from "react";
import { brand } from "./brand";
import SuggestionList, { type Suggestion } from "./SuggestionList";

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
  suggestions?: Suggestion[];
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

  // Pointer drag state
  const dragging = useRef(false);
  const dragIdx = useRef<number | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  function isLocked(i: number) { return lockedIndices.has(i); }

  // Create/destroy ghost element
  function createGhost(sourceEl: HTMLElement, clientX: number, clientY: number) {
    const rect = sourceEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.innerHTML = sourceEl.innerHTML;
    ghost.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      background: rgba(30,30,30,0.95);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 14px;
      padding: 12px 14px 12px 40px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.6);
      pointer-events: none;
      z-index: 9999;
      opacity: 0.96;
      transform: scale(1.02);
      transition: transform 80ms ease;
    `;
    document.body.appendChild(ghost);
    pointerOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
    ghostRef.current = ghost;
  }

  function moveGhost(clientX: number, clientY: number) {
    if (!ghostRef.current) return;
    ghostRef.current.style.left = `${clientX - pointerOffset.current.x}px`;
    ghostRef.current.style.top = `${clientY - pointerOffset.current.y}px`;
  }

  function destroyGhost() {
    ghostRef.current?.remove();
    ghostRef.current = null;
  }

  function getIndexAtPoint(clientX: number, clientY: number): number | null {
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientY >= rect.top && clientY <= rect.bottom) return i;
    }
    return null;
  }

  function onPointerDown(i: number, e: React.PointerEvent) {
    if (submitted || isLocked(i)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragIdx.current = i;
    setDragIndex(i);
    const sourceEl = itemRefs.current[i];
    if (sourceEl) createGhost(sourceEl, e.clientX, e.clientY);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    moveGhost(e.clientX, e.clientY);
    const over = getIndexAtPoint(e.clientX, e.clientY);
    if (over !== null && over !== dragIdx.current) {
      setDropIndex(over);
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    destroyGhost();

    const from = dragIdx.current;
    const to = getIndexAtPoint(e.clientX, e.clientY);

    if (from !== null && to !== null && from !== to) {
      setItems(prev => {
        const next = [...prev];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    }

    dragIdx.current = null;
    setDragIndex(null);
    setDropIndex(null);
  }

  // Clean up ghost if pointer is released outside the component
  useEffect(() => {
    function cleanup() {
      if (dragging.current) {
        dragging.current = false;
        destroyGhost();
        dragIdx.current = null;
        setDragIndex(null);
        setDropIndex(null);
      }
    }
    window.addEventListener("pointercancel", cleanup);
    return () => window.removeEventListener("pointercancel", cleanup);
  }, []);

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
              ref={el => { itemRefs.current[i] = el; }}
              onPointerDown={(e) => onPointerDown(i, e)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                display: "flex",
                gap: "16px",
                cursor: submitted || isLocked(i) ? "default" : isDragging ? "grabbing" : "grab",
                userSelect: "none",
                touchAction: "none",
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

              {/* Drag handle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px", width: "12px", flexShrink: 0 }}>
                {!submitted && !isLocked(i) && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px" }}>
                    {[0,1,2,3,4,5].map((d) => (
                      <div key={d} style={{ width: "3px", height: "3px", borderRadius: "50%", background: brand.text.secondary, opacity: 0.6 }} />
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
                opacity: isDragging ? 0.3 : 1,
              }}>
                {item.text}
              </p>
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

          {loadingSuggestions ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ height: "48px", borderRadius: brand.radius.item, background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.3 }} />
              ))}
            </div>
          ) : (
            <SuggestionList suggestions={suggestions} loadingNugget={loadingNugget} onSelect={onSelectSuggestion} />
          )}
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
