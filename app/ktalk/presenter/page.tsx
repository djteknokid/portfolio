"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const T = {
  obsidian: "#000d10",
  white:    "#ffffff",
  stone:    "#8e8e95",
  sienna:   "#bc7155",
};

// Import slides data — we read it from the parent module via BroadcastChannel sync
// This page only needs the script text and titles; we fetch them from a shared global.

export default function PresenterPage() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<{ id: number; tag?: string; title: string; script?: string }[]>([]);
  const bcRef = useRef<BroadcastChannel | null>(null);

  // Load slides data dynamically from the same source
  useEffect(() => {
    // We receive slides list via a SLIDES message, or infer from the deck
    // For now bootstrap from PING/PONG exchange
    bcRef.current = new BroadcastChannel("ktalk-presenter");

    bcRef.current.onmessage = (e) => {
      const data = e.data;
      if (data?.type === "SLIDE") {
        setIndex(data.index);
      }
      if (data?.type === "PONG") {
        setIndex(data.index);
      }
      if (data?.type === "SLIDES") {
        setSlides(data.slides);
        setIndex(data.index ?? 0);
      }
    };

    // Ask main window for current state + slides
    bcRef.current.postMessage({ type: "PING" });

    return () => bcRef.current?.close();
  }, []);

  const slide = slides[index];
  const total = slides.length;

  function go(i: number) {
    const next = Math.max(0, Math.min(total - 1, i));
    setIndex(next);
    bcRef.current?.postMessage({ type: "SLIDE", index: next });
  }

  const paras = slide?.script ? slide.script.split("\n\n") : [];

  return (
    <div style={{
      background: T.obsidian,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "system-ui, -apple-system, Arial, sans-serif",
      color: T.white,
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px 28px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        flexShrink: 0,
      }}>
        {slide?.tag && (
          <span style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: T.sienna,
          }}>
            {slide.tag}
          </span>
        )}
        <span style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.4)",
          marginLeft: "auto",
        }}>
          {total > 0 ? `${index + 1} / ${total}` : "—"}
        </span>
      </div>

      {/* Title */}
      {slide?.title && (
        <div style={{ padding: "24px 28px 0" }}>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "26px",
            fontWeight: 700,
            lineHeight: 1.2,
            color: T.white,
            margin: 0,
          }}>
            {slide.title}
          </h1>
        </div>
      )}

      <hr style={{ margin: "20px 28px 0", border: "none", borderTop: "1px solid rgba(255,255,255,0.08)" }} />

      {/* Script */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 28px 32px",
      }}>
        {slide && !slide.script && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic", fontSize: "15px" }}>
            No script for this slide.
          </p>
        )}
        {!slide && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic", fontSize: "15px" }}>
            Waiting for main window…
          </p>
        )}
        {paras.map((para, i) => (
          <p key={i} style={{
            fontFamily: "Georgia, serif",
            fontSize: "17px",
            lineHeight: 1.9,
            color: "rgba(255,255,255,0.88)",
            margin: "0 0 1.2em",
          }}>
            {para}
          </p>
        ))}
      </div>

      {/* Nav */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 28px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        flexShrink: 0,
      }}>
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: index === 0 ? "rgba(255,255,255,0.2)" : T.white,
            padding: "8px 18px",
            cursor: index === 0 ? "default" : "pointer",
            fontSize: "13px",
            borderRadius: "4px",
          }}
        >
          ← Prev
        </button>
        <button
          onClick={() => go(index + 1)}
          disabled={index >= total - 1}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: index >= total - 1 ? "rgba(255,255,255,0.2)" : T.white,
            padding: "8px 18px",
            cursor: index >= total - 1 ? "default" : "pointer",
            fontSize: "13px",
            borderRadius: "4px",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
