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

export default function ManuscriptSidebarKo({ chapters, currentSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="챕터 목록 열기"
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
          aria-label="닫기"
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

        <Link href="/koreatalk/manuscript/ko" className="sidebar__back">← 목차</Link>
        <div style={{ flex: 1 }}>
          <p className="sidebar__part-label" style={{ color: "rgba(255,255,255,0.85)" }}>조율의 시대</p>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.08em",
            marginBottom: "16px",
            paddingLeft: "4px",
          }}>
            The Coordination Era · 키노트 원고
          </p>
          {chapters.map((c) => (
            <Link
              key={c.slug}
              href={`/koreatalk/manuscript/ko/${c.slug}`}
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
