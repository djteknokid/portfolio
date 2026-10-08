"use client";

import { useState, useRef, useEffect } from "react";
import { brand } from "./brand";
import SuggestionList, { type Suggestion } from "./SuggestionList";

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

export default function MatchingGame({
  pairs, onComplete, onSkip, loadingSkip = false,
  suggestions = [], onSelectSuggestion, loadingNugget,
}: Props) {
  const [shuffledRight] = useState(() => shuffle(pairs.map((p) => ({ id: p.id, text: p.right }))));
  // connections: leftId → rightId
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Active drag from a left item
  const dragging = useRef(false);
  const dragLeftId = useRef<string | null>(null);
  const lineStart = useRef<{ x: number; y: number } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const leftRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  function getRightCenterY(id: string): number {
    const el = rightRefs.current[id];
    if (!el) return 0;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return rect.top + rect.height / 2 - (containerRect?.top ?? 0);
  }

  function getLeftCenterY(id: string): number {
    const el = leftRefs.current[id];
    if (!el) return 0;
    const containerRect = containerRef.current?.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return rect.top + rect.height / 2 - (containerRect?.top ?? 0);
  }

  function getRightAtPoint(clientX: number, clientY: number): string | null {
    for (const [id, el] of Object.entries(rightRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        return id;
      }
    }
    return null;
  }

  function onPointerDownLeft(leftId: string, e: React.PointerEvent) {
    if (submitted) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragLeftId.current = leftId;
    const el = leftRefs.current[leftId];
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (el && containerRect) {
      const rect = el.getBoundingClientRect();
      lineStart.current = {
        x: rect.right - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top,
      };
    }
    setDragPos({ x: e.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0), y: e.clientY - (containerRef.current?.getBoundingClientRect().top ?? 0) });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    const containerRect = containerRef.current?.getBoundingClientRect();
    setDragPos({
      x: e.clientX - (containerRect?.left ?? 0),
      y: e.clientY - (containerRect?.top ?? 0),
    });
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
    if (rightId) {
      setConnections((prev) => {
        const next = { ...prev };
        // Remove any existing connection to this right item
        for (const [k, v] of Object.entries(next)) {
          if (v === rightId) delete next[k];
        }
        next[leftId] = rightId;
        return next;
      });
    } else {
      // Drop on nothing — remove connection
      setConnections((prev) => {
        const next = { ...prev };
        delete next[leftId];
        return next;
      });
    }
  }

  function handleSubmit() {
    const allConnected = pairs.every((p) => connections[p.id]);
    if (!allConnected) return;
    const ok = pairs.every((p) => connections[p.id] === p.id);
    setIsCorrect(ok);
    setSubmitted(true);
    if (ok) onComplete();
  }

  function handleReset() {
    setConnections((prev) => {
      const next: Record<string, string> = {};
      pairs.forEach((p) => { if (prev[p.id] === p.id) next[p.id] = p.id; });
      return next;
    });
    setSubmitted(false);
    setIsCorrect(false);
  }

  const allConnected = pairs.every((p) => connections[p.id]);
  const connectedCount = Object.keys(connections).length;

  function lineColor(leftId: string) {
    if (!submitted) return "rgba(255,255,255,0.15)";
    return connections[leftId] === leftId
      ? brand.status.correct.border
      : brand.status.wrong.border;
  }

  function chipColor(id: string, side: "left" | "right") {
    if (!submitted) return { text: brand.text.primary, border: brand.border.item, bg: brand.bg.raised };
    const leftId = side === "left" ? id : Object.entries(connections).find(([, v]) => v === id)?.[0];
    if (!leftId) return { text: brand.text.secondary, border: brand.border.item, bg: brand.bg.raised };
    const correct = connections[leftId] === leftId;
    return correct
      ? { text: brand.status.correct.text, border: brand.status.correct.border, bg: brand.status.correct.bg }
      : { text: brand.status.wrong.text, border: brand.status.wrong.border, bg: brand.status.wrong.bg };
  }

  // SVG line dimensions
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerSize({ width: el.offsetWidth, height: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div ref={containerRef} style={{ position: "relative", display: "flex", gap: "0", alignItems: "stretch" }}>

        {/* SVG overlay for lines */}
        <svg
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "visible" }}
          width={containerSize.width}
          height={containerSize.height}
        >
          {/* Committed lines */}
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
              <path
                key={p.id}
                d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={lineColor(p.id)}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Live drag line */}
          {dragging.current && lineStart.current && dragPos && (
            <path
              d={`M ${lineStart.current.x} ${lineStart.current.y} C ${(lineStart.current.x + dragPos.x) / 2} ${lineStart.current.y}, ${(lineStart.current.x + dragPos.x) / 2} ${dragPos.y}, ${dragPos.x} ${dragPos.y}`}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", zIndex: 2 }}>
          {pairs.map((p) => {
            const c = chipColor(p.id, "left");
            return (
              <div
                key={p.id}
                ref={(el) => { leftRefs.current[p.id] = el; }}
                onPointerDown={(e) => onPointerDownLeft(p.id, e)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{
                  padding: "10px 12px",
                  borderRadius: brand.radius.item,
                  background: c.bg,
                  border: `1px solid ${connections[p.id] ? brand.border.accent : c.border}`,
                  cursor: submitted ? "default" : "crosshair",
                  userSelect: "none",
                  touchAction: "none",
                  transition: brand.motion.snap,
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "500", color: c.text, lineHeight: 1.4 }}>
                  {p.left}
                </span>
              </div>
            );
          })}
        </div>

        {/* Gap between columns */}
        <div style={{ width: "48px", flexShrink: 0 }} />

        {/* Right column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", zIndex: 2 }}>
          {shuffledRight.map((r) => {
            const c = chipColor(r.id, "right");
            const isConnected = Object.values(connections).includes(r.id);
            return (
              <div
                key={r.id}
                ref={(el) => { rightRefs.current[r.id] = el; }}
                style={{
                  padding: "10px 12px",
                  borderRadius: brand.radius.item,
                  background: c.bg,
                  border: `1px solid ${isConnected ? brand.border.accent : c.border}`,
                  userSelect: "none",
                  transition: brand.motion.snap,
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: "500", color: c.text, lineHeight: 1.4 }}>
                  {r.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      {!submitted ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={handleSubmit}
            disabled={!allConnected}
            style={{
              width: "100%", padding: "14px",
              borderRadius: brand.radius.button,
              background: "transparent",
              border: `1px solid ${allConnected ? brand.border.accent : brand.border.item}`,
              color: allConnected ? brand.text.primary : brand.text.muted,
              fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em",
              textTransform: "uppercase", cursor: allConnected ? "pointer" : "default",
              transition: brand.motion.snap,
            }}
          >
            {allConnected ? "I'm done" : `${pairs.length - connectedCount} left to match`}
          </button>
          {onSkip && (
            <button
              onClick={onSkip}
              disabled={loadingSkip}
              style={{
                width: "100%", padding: "12px",
                borderRadius: brand.radius.button,
                background: "transparent", border: "none",
                color: brand.text.muted, fontSize: "11px", fontWeight: "500",
                letterSpacing: "0.06em",
                cursor: loadingSkip ? "default" : "pointer",
                opacity: loadingSkip ? 0.4 : 0.6,
                transition: brand.motion.snap,
              }}
            >
              {loadingSkip ? "Finding next…" : "Skip"}
            </button>
          )}
        </div>
      ) : isCorrect ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
          <span style={{ fontSize: "13px", color: brand.text.muted }}>You got it.</span>
          <SuggestionList suggestions={suggestions} loadingNugget={loadingNugget} onSelect={onSelectSuggestion} />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
          <button
            onClick={handleReset}
            style={{
              width: "100%", padding: "14px",
              borderRadius: brand.radius.button,
              background: "transparent",
              border: `1px solid ${brand.border.item}`,
              color: brand.text.muted,
              fontSize: "12px", fontWeight: "600",
              letterSpacing: "0.12em", textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
