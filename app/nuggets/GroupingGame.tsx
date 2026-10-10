"use client";

import { useState, useRef } from "react";
import { brand } from "./brand";
import { playCorrectBeep, playVictory } from "./sounds";
import WhatsNext from "./WhatsNext";
import type { Suggestion } from "./SuggestionList";

export interface GroupingItem {
  id: string;
  label: string;
  emoji?: string;
  correctGroup: string;
}

export interface GroupZone {
  id: string;
  label: string;
  color: string;
}

interface Props {
  question: string;
  items: GroupingItem[];
  zones: GroupZone[];
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

export default function GroupingGame({ items, zones, onComplete, onSkip, loadingSkip = false, suggestions = [], loadingSuggestions = false, onSelectSuggestion, loadingNugget }: Props) {
  const [placement, setPlacement] = useState<Record<string, string | null>>(
    () => Object.fromEntries(items.map((i) => [i.id, null]))
  );
  const [evalResults, setEvalResults] = useState<EvalResult[] | null>(null);
  const [allDone, setAllDone] = useState(false);
  const [shuffled] = useState(() => shuffle(items));

  const dragging = useRef(false);
  const dragId = useRef<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const zoneRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function createGhost(sourceEl: HTMLElement, clientX: number, clientY: number) {
    const rect = sourceEl.getBoundingClientRect();
    const ghost = document.createElement("div");
    ghost.innerHTML = sourceEl.innerHTML;
    ghost.style.cssText = `
      position: fixed;
      left: ${rect.left}px; top: ${rect.top}px;
      width: ${rect.width}px;
      background: ${brand.bg.hover};
      border: 1px solid ${brand.border.accent};
      border-radius: 10px;
      padding: 8px 12px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07);
      pointer-events: none;
      z-index: 9999;
      opacity: 0.97;
      transform: scale(1.06) rotate(-0.5deg);
      display: flex; align-items: center; gap: 8px;
      font-family: var(--font-geist-sans);
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

  function getZoneAtPoint(clientX: number, clientY: number): string | null {
    for (const [zoneId, el] of Object.entries(zoneRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) return zoneId;
    }
    return null;
  }

  function onPointerDown(id: string, e: React.PointerEvent) {
    if (allDone) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    dragId.current = id;
    const sourceEl = itemRefs.current[id];
    if (sourceEl) createGhost(sourceEl, e.clientX, e.clientY);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    e.preventDefault();
    moveGhost(e.clientX, e.clientY);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    destroyGhost();
    const id = dragId.current;
    dragId.current = null;
    if (!id) return;

    const zone = getZoneAtPoint(e.clientX, e.clientY);
    setPlacement((prev) => ({ ...prev, [id]: zone }));
    setEvalResults(null); // clear feedback on any move
  }

  function handleSubmit() {
    const results: EvalResult[] = items.map((item) => ({
      id: item.id,
      isCorrect: placement[item.id] === item.correctGroup,
    }));
    setEvalResults(results);

    const isComplete = results.every((r) => r.isCorrect);
    if (isComplete) {
      setAllDone(true);
      playCorrectBeep();
      playVictory();
    }
  }

  const mustPlace = items.filter((i) => i.correctGroup !== "none");
  const pool = shuffled.filter((i) => placement[i.id] === null);
  const isSingleZone = zones.length === 1;
  const correctCount = evalResults ? evalResults.filter((r) => r.isCorrect).length : 0;

  function chipStyle(item: GroupingItem) {
    const result = evalResults?.find((r) => r.id === item.id);
    if (result?.isCorrect) return {
      color: brand.status.correct.text,
      border: brand.status.correct.border,
      bg: brand.status.correct.bg,
      shadow: `0 0 10px ${brand.status.correct.border}`,
    };
    if (result?.isCorrect === false) return {
      color: brand.status.wrong.text,
      border: brand.status.wrong.border,
      bg: brand.status.wrong.bg,
      shadow: `0 0 8px ${brand.status.wrong.border}`,
    };
    return {
      color: brand.text.primary,
      border: brand.border.item,
      bg: brand.bg.raised,
      shadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
    };
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Drop zones */}
      {zones.map((zone) => {
        const zoneItems = shuffled.filter((i) => placement[i.id] === zone.id);
        return (
          <div key={zone.id}>
            <div style={{ ...brand.type.label, fontSize: brand.type.label.size, color: zone.color, marginBottom: "8px" }}>
              {zone.label}
            </div>
            <div
              ref={(el) => { zoneRefs.current[zone.id] = el; }}
              style={{
                minHeight: "64px",
                borderRadius: brand.radius.item,
                border: `1px dashed ${zone.color}44`,
                background: `${zone.color}0a`,
                padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "flex-start",
                alignContent: "flex-start",
                transition: brand.motion.snap,
              }}
            >
              {zoneItems.map((item) => {
                const c = chipStyle(item);
                const result = evalResults?.find((r) => r.id === item.id);
                return (
                  <ItemChip
                    key={item.id}
                    item={item}
                    color={c.color}
                    border={c.border}
                    bg={c.bg}
                    shadow={c.shadow}
                    isCorrect={result?.isCorrect}
                    allDone={allDone}
                    itemRefs={itemRefs}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                  />
                );
              })}
              {zoneItems.length === 0 && (
                <span style={{ fontSize: "11px", color: zone.color, opacity: 0.3, padding: "4px 2px" }}>
                  Drop here
                </span>
              )}
            </div>
          </div>
        );
      })}

      {/* Unplaced pool */}
      {pool.length > 0 && (
        <div>
          <div style={{ ...brand.type.label, fontSize: brand.type.label.size, color: brand.text.muted, marginBottom: "8px" }}>
            {isSingleZone ? "Drag to sort" : "Sort these"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {pool.map((item) => (
              <ItemChip
                key={item.id}
                item={item}
                color={brand.text.primary}
                border={brand.border.item}
                bg={brand.bg.raised}
                shadow="0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
                isCorrect={undefined}
                allDone={allDone}
                itemRefs={itemRefs}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              />
            ))}
          </div>
        </div>
      )}

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
                <span style={{ fontWeight: "600", color: brand.text.secondary }}>{correctCount} of {mustPlace.length}</span> in the right group.
              </span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={pool.length > 0}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: brand.radius.button,
              background: brand.bg.hover,
              border: `1px solid ${brand.border.accent}`,
              color: pool.length > 0 ? brand.text.muted : brand.text.primary,
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "-0.01em",
              cursor: pool.length > 0 ? "default" : "pointer",
              opacity: pool.length > 0 ? 0.4 : 1,
              WebkitTapHighlightColor: "transparent",
              boxShadow: `0 0 0 1px ${brand.border.accent}`,
              transition: brand.motion.snap,
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
        <WhatsNext suggestions={suggestions} loadingSuggestions={loadingSuggestions} loadingNugget={loadingNugget} onSelect={onSelectSuggestion} onDone={onComplete} />
      )}
    </div>
  );
}

function ItemChip({
  item, color, border, bg, shadow, isCorrect, allDone, itemRefs, onPointerDown, onPointerMove, onPointerUp,
}: {
  item: GroupingItem;
  color: string;
  border: string;
  bg: string;
  shadow: string;
  isCorrect: boolean | undefined;
  allDone: boolean;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onPointerDown: (id: string, e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
}) {
  return (
    <div
      ref={(el) => { itemRefs.current[item.id] = el; }}
      onPointerDown={(e) => onPointerDown(item.id, e)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "8px 12px",
        borderRadius: "10px",
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: shadow,
        cursor: allDone ? "default" : "grab",
        userSelect: "none",
        touchAction: "none",
        transition: "border-color 300ms ease, background 300ms ease, box-shadow 300ms ease",
      }}
    >
      {item.emoji && <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.emoji}</span>}
      <span style={{ fontSize: "13px", fontWeight: "500", color, lineHeight: 1.3, transition: "color 300ms ease" }}>
        {item.label}
      </span>
      {isCorrect === true  && <span style={{ fontSize: "11px", color, opacity: 0.7, flexShrink: 0 }}>✓</span>}
      {isCorrect === false && <span style={{ fontSize: "11px", color, opacity: 0.7, flexShrink: 0 }}>✗</span>}
    </div>
  );
}
