"use client";

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#bc7155";

interface Chapter {
  number: number;
  slug: string;
  title: string;
}

interface Props {
  chapters: Chapter[];
  currentSlug: string;
}

export default function ManuscriptSidebar({ chapters, currentSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only when sidebar is collapsed */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chapter list"
        style={{
          display: open ? "none" : "flex",
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 200,
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          backgroundColor: ACCENT,
          border: "none",
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
          padding: "10px",
        }}
      >
        <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#fff" }} />
        <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#fff" }} />
        <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#fff" }} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        />
      )}

      {/* Sidebar panel */}
      <nav
        className="sidebar"
        style={{
          backgroundColor: ACCENT,
          zIndex: 160,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.22s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chapter list"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: "20px",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px 6px",
          }}
        >
          ✕
        </button>

        <Link href="/ktalk/manuscript" className="sidebar__back">← Manuscript</Link>
        <div style={{ flex: 1 }}>
          <p className="sidebar__part-label" style={{ color: "rgba(255,255,255,0.85)" }}>The Coordination Era</p>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em",
            marginBottom: "16px",
            paddingLeft: "4px",
          }}>
            조율의 시대 · Keynote Manuscript
          </p>
          {chapters.map((c) => (
            <Link
              key={c.slug}
              href={`/ktalk/manuscript/${c.slug}`}
              className="sidebar__chapter-link"
              onClick={() => setOpen(false)}
              style={{
                color: c.slug === currentSlug ? "#ffffff" : "rgba(255,255,255,0.42)",
                fontWeight: c.slug === currentSlug ? 600 : 400,
              }}
            >
              {c.number}. {c.title}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
