"use client";

import { useState, useRef } from "react";
import { brand } from "./brand";
import SuggestionList, { type Suggestion } from "./SuggestionList";

export interface GroupingItem {
  id: string;
  label: string;
  emoji?: string;   // flag emoji or icon
  correctGroup: string;
}

export interface GroupZone {
  id: string;
  label: string;
  color: string;    // accent color for the zone
}

interface Props {
  question: string;
  items: GroupingItem[];
  zones: GroupZone[];
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

export default function GroupingGame({
  items, zones, onComplete, onSkip, loadingSkip = false,
  suggestions = [], onSelectSuggestion, loadingNugget,
}: Props) {
  // placement: itemId → zoneId (null = unplaced pool)
  const [placement, setPlacement] = useState<Record<string, string | null>>(
    () => Object.fromEntries(items.map((i) => [i.id, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffled] = useState(() => shuffle(items));

  // Pointer drag state
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
      background: rgba(30,30,30,0.97);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 12px;
      padding: 10px 14px;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.97;
      transform: scale(1.04);
      display: flex; align-items: center; gap: 10px;
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
      if (clientX >= rect.left && clientX <= rect.right &&
          clientY >= rect.top && clientY <= rect.bottom) {
        return zoneId;
      }
    }
    return null;
  }

  function onPointerDown(id: string, e: React.PointerEvent) {
    if (submitted) return;
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
  }

  function handleSubmit() {
    const allPlaced = items.every((i) => i.correctGroup === "none" || placement[i.id] !== null);
    if (!allPlaced) return;
    const ok = items.every((i) =>
      i.correctGroup === "none"
        ? placement[i.id] === null
        : placement[i.id] === i.correctGroup
    );
    setIsCorrect(ok);
    setSubmitted(true);
    if (ok) onComplete();
  }

  function handleReset() {
    // lock correct, reshuffle wrong back to pool
    setPlacement((prev) => {
      const next = { ...prev };
      items.forEach((i) => {
        const correct = i.correctGroup === "none" ? null : i.correctGroup;
        if (prev[i.id] !== correct) next[i.id] = null;
      });
      return next;
    });
    setSubmitted(false);
    setIsCorrect(false);
  }

  const mustPlace = items.filter((i) => i.correctGroup !== "none");
  const allPlaced = mustPlace.every((i) => placement[i.id] !== null);
  const placedCount = mustPlace.filter((i) => placement[i.id] !== null).length;
  const pool = shuffled.filter((i) => placement[i.id] === null);
  const isSingleZone = zones.length === 1;

  function itemColor(item: GroupingItem) {
    if (!submitted) return brand.text.primary;
    const correct = item.correctGroup === "none" ? null : item.correctGroup;
    return placement[item.id] === correct
      ? brand.status.correct.text
      : brand.status.wrong.text;
  }

  function itemBorder(item: GroupingItem) {
    if (!submitted) return brand.border.item;
    const correct = item.correctGroup === "none" ? null : item.correctGroup;
    return placement[item.id] === correct
      ? brand.status.correct.border
      : brand.status.wrong.border;
  }

  function itemBg(item: GroupingItem) {
    if (!submitted) return brand.bg.raised;
    const correct = item.correctGroup === "none" ? null : item.correctGroup;
    return placement[item.id] === correct
      ? brand.status.correct.bg
      : brand.status.wrong.bg;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* Drop zones */}
      {zones.map((zone) => {
        const zoneItems = shuffled.filter((i) => placement[i.id] === zone.id);
        return (
          <div key={zone.id}>
            <div
              style={{
                ...brand.type.label,
                fontSize: brand.type.label.size,
                color: zone.color,
                marginBottom: "8px",
              }}
            >
              {zone.label}
            </div>
            <div
              ref={(el) => { zoneRefs.current[zone.id] = el; }}
              style={{
                minHeight: "72px",
                borderRadius: brand.radius.item,
                border: `1px dashed ${zone.color}33`,
                background: `${zone.color}08`,
                padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "flex-start",
                alignContent: "flex-start",
                transition: brand.motion.snap,
              }}
            >
              {zoneItems.map((item) => (
                <ItemChip
                  key={item.id}
                  item={item}
                  submitted={submitted}
                  color={itemColor(item)}
                  border={itemBorder(item)}
                  bg={itemBg(item)}
                  itemRefs={itemRefs}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                />
              ))}
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
            {isSingleZone ? "Drag communist countries up" : "Sort these"}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {pool.map((item) => (
              <ItemChip
                key={item.id}
                item={item}
                submitted={submitted}
                color={brand.text.primary}
                border={brand.border.item}
                bg={brand.bg.raised}
                itemRefs={itemRefs}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!submitted ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={handleSubmit}
            disabled={!allPlaced}
            style={{
              width: "100%", padding: "14px",
              borderRadius: brand.radius.button,
              background: "transparent",
              border: `1px solid ${allPlaced ? brand.border.accent : brand.border.item}`,
              color: allPlaced ? brand.text.primary : brand.text.muted,
              fontSize: "12px", fontWeight: "600", letterSpacing: "0.12em",
              textTransform: "uppercase", cursor: allPlaced ? "pointer" : "default",
              transition: brand.motion.snap,
            }}
          >
            {allPlaced ? "I'm done" : `${mustPlace.length - placedCount} left to place`}
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

function ItemChip({
  item, submitted, color, border, bg, itemRefs, onPointerDown, onPointerMove, onPointerUp,
}: {
  item: GroupingItem;
  submitted: boolean;
  color: string;
  border: string;
  bg: string;
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
        cursor: submitted ? "default" : "grab",
        userSelect: "none",
        touchAction: "none",
        transition: brand.motion.snap,
      }}
    >
      {item.emoji && (
        <span style={{ fontSize: "18px", lineHeight: 1 }}>{item.emoji}</span>
      )}
      <span style={{ fontSize: "13px", fontWeight: "500", color, lineHeight: 1.3 }}>
        {item.label}
      </span>
    </div>
  );
}
