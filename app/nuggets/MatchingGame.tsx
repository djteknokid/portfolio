"use client";

import { useState, useRef, useEffect } from "react";
import { brand } from "./brand";
import { playCorrectBeep, playVictory } from "./sounds";
import WhatsNext from "./WhatsNext";
import type { Suggestion } from "./SuggestionList";

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

interface Props {
  question: string;
  pairs: MatchPair[];
  onComplete: () => void;
  onSkip?: () => void;
  loadingSkip?: boolean;
  suggestions?: Suggestion[];
  loadingSuggestions?: boolean;
  onSelectSuggestion?: (q: string) => void;
  loadingNugget?: string | null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface EvalResult { id: string; isCorrect: boolean }

export default function MatchingGame({ pairs, onComplete, onSkip, loadingSkip = false, suggestions = [], loadingSuggestions = false, onSelectSuggestion, loadingNugget }: Props) {
  const [shuffledRight] = useState(() => shuffle(pairs.map((p) => ({ id: p.id, text: p.right }))));
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [evalResults, setEvalResults] = useState<EvalResult[] | null>(null);
  const [allDone, setAllDone] = useState(false);

  const dragging = useRef(false);
  const dragLeftId = useRef<string | null>(null);
  const lineStart = useRef<{ x: number; y: number } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const leftRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerSize({ width: el.offsetWidth, height: el.offsetHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function getRightAtPoint(clientX: number, clientY: number): string | null {
    for (const [id, el] of Object.entries(rightRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) return id;
    }
    return null;
  }

  function onPointerDownLeft(leftId: string, e: React.PointerEvent) {
    if (allDone) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragLeftId.current = leftId;
    const el = leftRefs.current[leftId];
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (el && containerRect) {
      const rect = el.getBoundingClientRect();
      lineStart.current = { x: rect.right - containerRect.left, y: rect.top + rect.height / 2 - containerRect.top };
    }
    setDragPos({ x: e.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0), y: e.clientY - (containerRef.current?.getBoundingClientRect().top ?? 0) });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    const containerRect = containerRef.current?.getBoundingClientRect();
    setDragPos({ x: e.clientX - (containerRect?.left ?? 0), y: e.clientY - (containerRect?.top ?? 0) });
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    const leftId = dragLeftId.current;
    dragLeftId.current = null;
    lineStart.current = null;
    setDragPos(null);
    if (!leftId) return;

    const rightId = getRightAtPoint(e.clientX, e.clientY);
    if (!rightId) {
      setConnections((prev) => { const next = { ...prev }; delete next[leftId]; return next; });
      setEvalResults(null);
      return;
    }

    setConnections((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(next)) { if (v === rightId) delete next[k]; }
      next[leftId] = rightId;
      return next;
    });
    setEvalResults(null); // clear feedback on any move
  }

  function handleSubmit() {
    const results: EvalResult[] = pairs.map((p) => ({
      id: p.id,
      isCorrect: connections[p.id] === p.id,
    }));
    setEvalResults(results);

    const isComplete = results.every((r) => r.isCorrect);
    if (isComplete) {
      setAllDone(true);
      playCorrectBeep();
      playVictory();
    }
  }

  const allConnected = pairs.every((p) => connections[p.id] !== undefined);
  const correctCount = evalResults ? evalResults.filter((r) => r.isCorrect).length : 0;

  function lineColor(leftId: string) {
    const result = evalResults?.find((r) => r.id === leftId);
    if (result?.isCorrect) return brand.status.correct.border;
    if (result?.isCorrect === false) return brand.status.wrong.border;
    return "rgba(255,255,255,0.15)";
  }

  function chipStyle(id: string, side: "left" | "right") {
    const leftId = side === "left" ? id : Object.entries(connections).find(([, v]) => v === id)?.[0];
    const result = leftId ? evalResults?.find((r) => r.id === leftId) : undefined;
    if (result?.isCorrect) return {
      text: brand.status.correct.text,
      border: brand.status.correct.border,
      bg: brand.status.correct.bg,
      shadow: `0 0 10px ${brand.status.correct.border}`,
    };
    if (result?.isCorrect === false) return {
      text: brand.status.wrong.text,
      border: brand.status.wrong.border,
      bg: brand.status.wrong.bg,
      shadow: `0 0 8px ${brand.status.wrong.border}`,
    };
    const connected = side === "left" ? connections[id] !== undefined : Object.values(connections).includes(id);
    return {
      text: brand.text.primary,
      border: connected ? brand.border.accent : brand.border.item,
      bg: brand.bg.raised,
      shadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
    };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div ref={containerRef} style={{ position: "relative", display: "flex", gap: "0", alignItems: "stretch" }}>

        {/* SVG lines */}
        <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "visible" }} width={containerSize.width} height={containerSize.height}>
          {pairs.map((p) => {
            const rightId = connections[p.id];
            if (!rightId) return null;
            const leftEl = leftRefs.current[p.id];
            const rightEl = rightRefs.current[rightId];
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!leftEl || !rightEl || !containerRect) return null;
            const leftRect = leftEl.getBoundingClientRect();
            const rightRect = rightEl.getBoundingClientRect();
            const x1 = leftRect.right - containerRect.left;
            const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
            const x2 = rightRect.left - containerRect.left;
            const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;
            const cx = (x1 + x2) / 2;
            return (
              <path key={p.id} d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                fill="none" stroke={lineColor(p.id)} strokeWidth="1.5" strokeLinecap="round" />
            );
          })}
          {dragging.current && lineStart.current && dragPos && (
            <path d={`M ${lineStart.current.x} ${lineStart.current.y} C ${(lineStart.current.x + dragPos.x) / 2} ${lineStart.current.y}, ${(lineStart.current.x + dragPos.x) / 2} ${dragPos.y}, ${dragPos.x} ${dragPos.y}`}
              fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
          )}
        </svg>

        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", zIndex: 2 }}>
          {pairs.map((p) => {
            const c = chipStyle(p.id, "left");
            const result = evalResults?.find((r) => r.id === p.id);
            return (
              <div key={p.id} ref={(el) => { leftRefs.current[p.id] = el; }}
                onPointerDown={(e) => onPointerDownLeft(p.id, e)}
                onPointerMove={onPointerMove} onPointerUp={onPointerUp}
                style={{
                  padding: "10px 12px", borderRadius: brand.radius.item,
                  background: c.bg, border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                  cursor: allDone ? "default" : "crosshair",
                  userSelect: "none", touchAction: "none",
                  transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease",
                  position: "relative",
                }}>
                <span style={{ fontSize: "13px", fontWeight: "500", color: c.text, lineHeight: 1.4, transition: "color 300ms ease" }}>{p.left}</span>
                <div style={{
                  position: "absolute", right: "-5px", top: "50%", transform: "translateY(-50%)",
                  width: "9px", height: "9px", borderRadius: "50%",
                  background: result?.isCorrect ? brand.status.correct.text : result?.isCorrect === false ? brand.status.wrong.text : brand.bg.page,
                  border: `2px solid ${result?.isCorrect ? brand.status.correct.border : result?.isCorrect === false ? brand.status.wrong.border : brand.border.accent}`,
                  zIndex: 3, pointerEvents: "none",
                  transition: "border-color 300ms ease, background 300ms ease",
                }} />
              </div>
            );
          })}
        </div>

        <div style={{ width: "48px", flexShrink: 0 }} />

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", zIndex: 2 }}>
          {shuffledRight.map((r) => {
            const c = chipStyle(r.id, "right");
            return (
              <div key={r.id} ref={(el) => { rightRefs.current[r.id] = el; }}
                style={{
                  padding: "10px 12px", borderRadius: brand.radius.item,
                  background: c.bg, border: `1px solid ${c.border}`,
                  boxShadow: c.shadow,
                  userSelect: "none",
                  transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease",
                  position: "relative",
                }}>
                <div style={{
                  position: "absolute", left: "-5px", top: "50%", transform: "translateY(-50%)",
                  width: "9px", height: "9px", borderRadius: "50%",
                  background: brand.bg.page,
                  border: `2px solid ${brand.border.accent}`,
                  zIndex: 3, pointerEvents: "none",
                }} />
                <span style={{ fontSize: "13px", fontWeight: "500", color: c.text, lineHeight: 1.4, transition: "color 300ms ease" }}>{r.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {!allDone ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {evalResults && (
            <div style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: `1px solid ${brand.border.item}`,
              background: brand.bg.raised,
            }}>
              <span style={{ fontSize: "13px", color: brand.text.muted }}>
                <span style={{ fontWeight: "600", color: brand.text.secondary }}>{correctCount} of {pairs.length}</span> matched correctly.
              </span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allConnected}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: brand.radius.button,
              background: brand.bg.hover,
              border: `1px solid ${brand.border.accent}`,
              color: !allConnected ? brand.text.muted : brand.text.primary,
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "-0.01em",
              cursor: !allConnected ? "default" : "pointer",
              opacity: !allConnected ? 0.4 : 1,
              WebkitTapHighlightColor: "transparent",
              boxShadow: `0 0 0 1px ${brand.border.accent}`,
              transition: brand.motion.snap,
            }}
          >
            Submit
          </button>

          {onSkip && (
            <button onClick={onSkip} disabled={loadingSkip}
              style={{ width: "100%", padding: "12px", borderRadius: brand.radius.button, background: "transparent", border: "none", color: brand.text.muted, fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", cursor: loadingSkip ? "default" : "pointer", opacity: loadingSkip ? 0.4 : 0.5, transition: brand.motion.snap }}>
              {loadingSkip ? "Finding next…" : "Skip"}
            </button>
          )}
        </div>
      ) : (
        <WhatsNext suggestions={suggestions} loadingSuggestions={loadingSuggestions} loadingNugget={loadingNugget} onSelect={onSelectSuggestion} onDone={onComplete} />
      )}
    </div>
  );
}
