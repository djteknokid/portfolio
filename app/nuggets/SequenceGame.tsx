"use client";

import { useState, useRef, useEffect } from "react";
import { brand } from "./brand";
import WhatsNext from "./WhatsNext";
import type { Suggestion } from "./SuggestionList";
import { playCorrectBeep, playVictory } from "./sounds";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface EvalResult { id: string; isCorrect: boolean }

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
  const [evalResults, setEvalResults] = useState<EvalResult[] | null>(null);
  const [allDone, setAllDone] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [justDropped, setJustDropped] = useState<string | null>(null);
  const [itemHeight, setItemHeight] = useState(0);

  const dragging = useRef(false);
  const dragIdx = useRef<number | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = itemRefs.current[0];
    if (el) setItemHeight(el.getBoundingClientRect().height + 10);
  }, [items.length]);

  function createGhost(sourceEl: HTMLElement, clientX: number, clientY: number) {
    const rect = sourceEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.innerHTML = sourceEl.innerHTML;
    ghost.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      background: ${brand.bg.hover};
      border: 1px solid ${brand.border.accent};
      border-radius: 10px;
      padding: 14px 16px;
      box-shadow: 0 20px 48px rgba(0,0,0,0.6), 0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07);
      pointer-events: none;
      z-index: 9999;
      opacity: 0.97;
      transform: scale(1.03) rotate(-0.4deg);
      transition: box-shadow 120ms ease;
    `;
    document.body.appendChild(ghost);
    pointerOffset.current = { x: clientX - rect.left, y: clientY - rect.top };
    ghostRef.current = ghost;
  }

  function moveGhost(clientX: number, clientY: number) {
    if (!ghostRef.current) return;
    ghostRef.current.style.left = `${clientX - pointerOffset.current.x}px`;
    ghostRef.current.style.top  = `${clientY - pointerOffset.current.y}px`;
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
    if (allDone) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragIdx.current = i;
    setDragIndex(i);
    setDropIndex(i);
    const sourceEl = itemRefs.current[i];
    if (sourceEl) createGhost(sourceEl, e.clientX, e.clientY);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    moveGhost(e.clientX, e.clientY);
    const over = getIndexAtPoint(e.clientX, e.clientY);
    if (over !== null) setDropIndex(over);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    destroyGhost();

    const from = dragIdx.current;
    const to = dropIndex;

    if (from !== null && to !== null && from !== to) {
      const droppedId = items[from].id;
      const newItems = [...items];
      const [moved] = newItems.splice(from, 1);
      newItems.splice(to, 0, moved);
      setItems(newItems);
      setEvalResults(null); // clear feedback whenever arrangement changes
      setJustDropped(droppedId);
      setTimeout(() => setJustDropped(null), 500);
    }

    dragIdx.current = null;
    setDragIndex(null);
    setDropIndex(null);
  }

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
    const results: EvalResult[] = items.map((item, i) => ({
      id: item.id,
      isCorrect: item.id === correct[i].id,
    }));
    setEvalResults(results);

    const isComplete = results.every((r) => r.isCorrect);
    if (isComplete) {
      setAllDone(true);
      setShowReveal(true);
      playCorrectBeep();
      playVictory();
    }
  }

  function handleDone() {
    onComplete();
  }

  function getTranslateY(i: number): number {
    if (dragIndex === null || dropIndex === null) return 0;
    if (i === dragIndex) return 0;
    const from = dragIndex;
    const to   = dropIndex;
    if (from < to) {
      if (i > from && i <= to) return -itemHeight;
    } else if (from > to) {
      if (i >= to && i < from) return itemHeight;
    }
    return 0;
  }

  const correctCount = evalResults ? evalResults.filter((r) => r.isCorrect).length : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", position: "relative", paddingLeft: "40px" }}>

        {/* Subway map */}
        {itemHeight > 0 && (
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "28px",
            height: `${correct.length * itemHeight - 10}px`,
            pointerEvents: "none",
            userSelect: "none",
          }}>
            {/* Track line */}
            <div style={{
              position: "absolute",
              left: "13px",
              top: `${itemHeight * 0.5}px`,
              width: "2px",
              bottom: `${itemHeight * 0.5}px`,
              background: brand.border.accent,
            }} />

            {/* Stop circles */}
            {correct.map((_, i) => {
              const result = evalResults?.[i];
              const lit = result?.isCorrect === true;
              const wrong = result?.isCorrect === false;
              return (
                <div
                  key={`stop-${i}`}
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: `${i * itemHeight + (itemHeight - 10) / 2 - 9}px`,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: lit ? brand.status.correct.bg : wrong ? brand.status.wrong.bg : brand.bg.raised,
                    border: `1.5px solid ${lit ? brand.status.correct.text : wrong ? brand.status.wrong.text : brand.border.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "9px",
                    fontWeight: "600",
                    color: lit ? brand.status.correct.text : wrong ? brand.status.wrong.text : brand.text.muted,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0",
                    transition: "background 300ms ease, border-color 300ms ease, color 300ms ease",
                    boxShadow: lit ? `0 0 8px ${brand.status.correct.border}` : wrong ? `0 0 6px ${brand.status.wrong.border}` : "none",
                  }}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
        )}

        {items.map((item, i) => {
          const isDragging    = dragIndex === i;
          const isJustDropped = justDropped === item.id;
          const translateY    = getTranslateY(i);
          const isDropSlot    = dropIndex === i && dragIndex !== null && dragIndex !== i;
          const result        = evalResults?.[i];
          const isCorrectPos  = result?.isCorrect === true;
          const isWrongPos    = result?.isCorrect === false;

          const borderColor = isCorrectPos ? brand.status.correct.border
            : isWrongPos ? brand.status.wrong.border
            : brand.border.item;
          const bg = isCorrectPos ? brand.status.correct.bg
            : isWrongPos ? brand.status.wrong.bg
            : brand.bg.raised;
          const textColor = isCorrectPos ? brand.status.correct.text
            : isWrongPos ? brand.status.wrong.text
            : brand.text.primary;
          const boxShadow = isCorrectPos ? `0 0 12px ${brand.status.correct.border}`
            : isWrongPos ? `0 0 8px ${brand.status.wrong.border}`
            : ["0 2px 6px rgba(0,0,0,0.45)", "0 1px 2px rgba(0,0,0,0.3)", "inset 0 1px 0 rgba(255,255,255,0.045)"].join(", ");

          return (
            <div
              key={item.id}
              style={{
                paddingBottom: i < items.length - 1 ? "10px" : "0",
                position: "relative",
                transform: isDragging ? "scale(0.97)" : `translateY(${translateY}px)`,
                transition: isDragging
                  ? "opacity 120ms ease, transform 120ms ease"
                  : isJustDropped
                  ? "transform 420ms cubic-bezier(0.34,1.56,0.64,1)"
                  : justDropped !== null
                  ? "none"
                  : "transform 180ms cubic-bezier(0.25,0.46,0.45,0.94)",
                opacity: isDragging ? 0 : 1,
                zIndex: isDragging ? 0 : 1,
              }}
            >
              {isDropSlot && (
                <div style={{
                  position: "absolute",
                  top: "-5px",
                  left: 0,
                  right: 0,
                  height: "2px",
                  borderRadius: "1px",
                  background: brand.text.muted,
                  opacity: 0.5,
                  transformOrigin: "left",
                  animation: "growIn 150ms cubic-bezier(0.34,1.56,0.64,1) forwards",
                }} />
              )}

              <div
                ref={el => { itemRefs.current[i] = el; }}
                onPointerDown={(e) => onPointerDown(i, e)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: `1px solid ${borderColor}`,
                  background: bg,
                  boxShadow,
                  cursor: allDone ? "default" : isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                  touchAction: "none",
                  transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease",
                }}
              >
                <p style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: textColor,
                  lineHeight: "1.5",
                  margin: 0,
                  flex: 1,
                  letterSpacing: "-0.01em",
                  transition: "color 300ms ease",
                }}>
                  {item.text}
                </p>

                {isCorrectPos && <span style={{ fontSize: "12px", color: brand.status.correct.text, opacity: 0.8, flexShrink: 0 }}>✓</span>}
                {isWrongPos   && <span style={{ fontSize: "12px", color: brand.status.wrong.text,   opacity: 0.8, flexShrink: 0 }}>✗</span>}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes growIn {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 0.5; }
        }
      `}</style>

      {/* Bottom action area */}
      {!allDone ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Feedback summary — shown after incorrect submission */}
          {evalResults && !allDone && (
            <div style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: `1px solid ${brand.border.item}`,
              background: brand.bg.raised,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{ fontSize: "13px", color: brand.text.muted }}>
                <span style={{ fontWeight: "600", color: brand.text.secondary }}>{correctCount} of {correct.length}</span> cards in the right position.
              </span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: brand.radius.button,
              background: brand.bg.hover,
              border: `1px solid ${brand.border.accent}`,
              color: brand.text.primary,
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "-0.01em",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              boxShadow: `0 0 0 1px ${brand.border.accent}`,
            }}
          >
            Submit
          </button>

          {onSkip && (
            <button
              onClick={onSkip}
              disabled={loadingSkip}
              style={{ width: "100%", padding: "12px", borderRadius: brand.radius.button, background: "transparent", border: "none", color: brand.text.muted, fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", cursor: loadingSkip ? "default" : "pointer", opacity: loadingSkip ? 0.4 : 0.5, transition: brand.motion.snap }}
            >
              {loadingSkip ? "Finding next…" : "Skip"}
            </button>
          )}
        </div>
      ) : (
        <WhatsNext suggestions={suggestions} loadingSuggestions={loadingSuggestions} loadingNugget={loadingNugget} onSelect={onSelectSuggestion} onDone={handleDone} />
      )}
    </div>
  );
}
