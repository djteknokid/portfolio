"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// ─── Phase config ────────────────────────────────────────────────────────────
const PHASES = {
  "Phase 0": { label: "Opening", color: "#F5A623", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.25)" },
  "Phase 1": { label: "Becoming Ready", color: "#3B82F6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)" },
  "Phase 1.5": { label: "Alignment Meeting", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
  "Phase 2": { label: "Creating Belief", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)" },
  "Closing": { label: "Closing", color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)" },
};

type PhaseKey = keyof typeof PHASES;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function PhasePill({ phase }: { phase: PhaseKey }) {
  const p = PHASES[phase];
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-4"
      style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}
    >
      {phase} — {p.label}
    </span>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-5xl font-bold leading-tight tracking-tight text-white mb-2">
      {children}
    </h1>
  );
}

function SlideSub({ children }: { children: React.ReactNode }) {
  return <p className="text-xl text-white/88 mb-10">{children}</p>;
}

function DiscussionAccordion({
  label,
  title,
  items,
  footer,
}: {
  label: string;
  title: string;
  items: { q: string; a?: string }[];
  footer?: React.ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col justify-center h-full gap-7 max-w-4xl">
      <div>
        <p className="text-white/88 text-xs font-semibold uppercase tracking-widest mb-2">{label}</p>
        <SlideTitle>{title}</SlideTitle>
      </div>
      <div className="flex flex-col gap-3">
        {items.map(({ q, a }, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: isOpen ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                border: isOpen ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
                transition: "background 0.2s, border-color 0.2s",
              }}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className="flex items-center gap-5 px-6 py-5">
                <span className="text-white/80 font-bold text-2xl tabular-nums shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-white/80 text-xl font-medium leading-snug flex-1">{q}</p>
                <span className="text-white/85 text-lg shrink-0" style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </div>
              {isOpen && a && (
                <div className="px-6 pb-5 flex flex-col gap-3" style={{ paddingLeft: "calc(1.5rem + 3.5rem)" }}>
                  {a.split("\n\n").map((para, pi) => (
                    <p key={pi} className="text-white/88 text-lg leading-relaxed">{para}</p>
                  ))}
                </div>
              )}
              {isOpen && !a && (
                <div className="px-6 pb-5" style={{ paddingLeft: "calc(1.5rem + 3.5rem)" }}>
                  <p className="text-white/88 text-base italic">— answer pending</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {footer}
    </div>
  );
}

function StatBlock({ number, label, color = "#F5A623" }: { number: string; label: string; color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-7xl font-black leading-none" style={{ color }}>{number}</span>
      <span className="text-sm text-white/88 mt-1 uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="border-l-4 border-white/20 pl-6 py-2 my-6">
      <p className="text-2xl italic text-white/80 leading-relaxed">{children}</p>
      {author && <p className="text-sm text-white/80 mt-3">— {author}</p>}
    </div>
  );
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: accent ? `rgba(${accent},0.07)` : "rgba(255,255,255,0.04)",
        border: `1px solid ${accent ? `rgba(${accent},0.2)` : "rgba(255,255,255,0.08)"}`,
      }}
    >
      {children}
    </div>
  );
}

function ChoiceSlide() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number; size: number; round: boolean }[]>([]);

  const handleSelect = (i: number) => {
    setSelected(i);
    if (i === 2) {
      const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#F5A623", "#10B981", "#fff"];
      setConfetti(
        Array.from({ length: 80 }, (_, id) => ({
          id,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.6,
          size: 6 + Math.random() * 8,
          round: Math.random() > 0.5,
        }))
      );
      setTimeout(() => setConfetti([]), 3000);
    }
  };

  const choices = [
    { num: "01", title: "Figma Mockup", sub: "The safe deliverable. Thorough. Expected." },
    { num: "02", title: "Lovable Prototype", sub: "Interactive. Shareable. But you don't own it." },
    { num: "03", title: "One Badass Functional Prototype with Claude Code", sub: "A running app. Real interactions. Real data. Real belief." },
  ];

  return (
    <div className="flex flex-col justify-center h-full relative overflow-hidden">
      {confetti.map(p => (
        <div
          key={p.id}
          className="pointer-events-none absolute top-0"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
            animation: `confettiFall 2.5s ease-in forwards`,
            animationDelay: `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <SlideTitle>So I had a choice.</SlideTitle>
      <div className="flex flex-col gap-5 mt-10 max-w-2xl">
        {choices.map(({ num, title, sub }, i) => {
          const isSelected = selected === i;
          const isWinner = i === 2 && isSelected;
          const isHovered = hovered === i && !isSelected;

          const bg = isWinner
            ? "rgba(139,92,246,0.18)"
            : isSelected
            ? "rgba(255,255,255,0.08)"
            : isHovered
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.03)";

          const border = isWinner
            ? "1px solid rgba(139,92,246,0.7)"
            : isSelected
            ? "1px solid rgba(255,255,255,0.25)"
            : isHovered
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid rgba(255,255,255,0.07)";

          return (
            <div
              key={num}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-6 rounded-2xl px-8 py-6 cursor-pointer transition-all duration-200"
              style={{
                background: bg,
                border,
                transform: isSelected ? "scale(1.01)" : "scale(1)",
                boxShadow: isWinner ? "0 0 32px rgba(139,92,246,0.25)" : "none",
              }}
            >
              <span className="font-mono text-2xl font-bold w-8 shrink-0" style={{ color: isWinner ? "#A78BFA" : "rgba(255,255,255,0.2)" }}>{num}</span>
              <div>
                <p className="font-semibold text-xl leading-snug" style={{ color: isSelected ? "#fff" : "rgba(255,255,255,0.45)" }}>{title}</p>
                <p className="text-base mt-1" style={{ color: isWinner ? "rgba(196,181,253,0.8)" : "rgba(255,255,255,0.2)" }}>{sub}</p>
              </div>
              {isWinner && <span className="ml-auto text-2xl">🎉</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MicDrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center py-8">
      <p className="text-4xl font-black text-white leading-snug">{children}</p>
    </div>
  );
}

function TwoCol({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-4">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

// ─── Slides ───────────────────────────────────────────────────────────────────
const slides: { phase: PhaseKey; id: string; content: React.ReactNode }[] = [

  // ── 0.0 Title Slide ───────────────────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.0",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6">
        <h1 className="font-bold leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff" }}>
          Vibe Coding
        </h1>
        <div className="flex items-center gap-4">
          <div className="h-px w-24 bg-white/20" />
          <span className="text-white/80 text-2xl font-light tracking-widest uppercase" style={{ fontSize: "1.1rem", letterSpacing: "0.25em" }}>to</span>
          <div className="h-px w-24 bg-white/20" />
        </div>
        <h1 className="font-bold leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#fff" }}>
          Agentic Engineering
        </h1>
        <p className="text-white/80 text-xl font-light tracking-widest uppercase mt-2" style={{ letterSpacing: "0.2em" }}>Part 2</p>
        <div className="mt-12 flex flex-col items-center gap-1">
          <p className="text-white/85 text-lg font-medium">David Lee</p>
          <p className="text-white/75 text-sm">Agentic Engineering Designer · Cross Application Experiences</p>
        </div>
        <div className="mt-8 flex gap-8">
        </div>
      </div>
    ),
  },

  // ── 0.1 My Intro ──────────────────────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.1",
    content: (
      <div className="flex flex-col justify-center h-full">
        <SlideTitle>Hi, I'm David Lee, and I hate design patterns.</SlideTitle>
        <div className="flex gap-4 mt-8">
          {[
            { company: "Google AI Labs", role: "AI Research" },
            { company: "Google NBU", role: "Next Billion Users" },
            { company: "Ceeya", role: "My startup · AI Personal Branding Engine for Creators" },
            { company: "GoPro", role: "Video & Music auto-sync using AI" },
          ].map(({ company, role }) => (
            <div key={company} className="flex-1 rounded-xl px-5 py-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-white font-semibold text-base">{company}</p>
              <p className="text-white/80 text-sm mt-1">{role}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── Introduce FioriWeb ────────────────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.5",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/88 text-xs font-semibold uppercase tracking-widest mb-4">So…</p>
          <SlideTitle>Introducing FioriWeb. ⚡</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">
            Same mission as SAPPoro. Same belief. Way better tooling — and a lot of hard lessons learned.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl px-8 py-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-white/75 text-xs font-semibold uppercase tracking-widest mb-3">The mission</p>
            <p className="text-white/85 text-xl leading-relaxed">
              Any SAP designer can vibe code and produce a Fiori-compliant app — without knowing the design patterns, the tokens, or the component library.
            </p>
          </div>
          <div
            className="rounded-2xl px-8 py-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-white/75 text-xs font-semibold uppercase tracking-widest mb-3">One honest thing</p>
            <p className="text-white/85 text-xl leading-relaxed">
              I wouldn't dare call this production-level. But I am confident — this will make a lot of SAP designers' lives significantly easier.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ── Examples Teaser ───────────────────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.6",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-6">
        <p className="text-white/88 text-xs font-semibold uppercase tracking-widest">Before I begin how…</p>
        <SlideTitle>Let me show you some examples.</SlideTitle>
      </div>
    ),
  },

  // ── Example: SAP Employee Homepage 2028 ──────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.6b",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/88 text-xs font-semibold uppercase tracking-widest mb-4">Example</p>
          <SlideTitle>SAP Employee Homepage 2028</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">The prompt that built it:</p>
        </div>
        <div
          className="rounded-2xl px-8 py-6"
          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <p className="text-emerald-400 font-mono text-lg leading-relaxed">
            /fiori Please build SAP Employee's personal home page for year 2028 as a vision.
          </p>
        </div>
        <a
          href="https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start flex items-center gap-3 rounded-xl px-6 py-4 transition-opacity hover:opacity-70"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <span className="text-white/88 text-lg">↗</span>
          <span className="text-white/85 text-base font-medium">Open example</span>
        </a>
      </div>
    ),
  },

  // ── Example: Ariba 2028 Vision ────────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.7",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/88 text-xs font-semibold uppercase tracking-widest mb-4">Example</p>
          <SlideTitle>Ariba Homepage 2028 Vision</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">The prompt that built it:</p>
        </div>
        <div
          className="rounded-2xl px-8 py-6"
          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <p className="text-emerald-400 font-mono text-lg leading-relaxed">
            /fiori Build Ariba Homepage 2028 Vision — be innovative
          </p>
        </div>
        <a
          href="https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505"
          target="_blank"
          rel="noopener noreferrer"
          className="self-start flex items-center gap-3 rounded-xl px-6 py-4 transition-opacity hover:opacity-70"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          <span className="text-white/88 text-lg">↗</span>
          <span className="text-white/85 text-base font-medium">Open example</span>
        </a>
      </div>
    ),
  },

  // ── Example: Antonio Puig ─────────────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.8",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/88 text-xs font-semibold uppercase tracking-widest mb-4">Example</p>
          <SlideTitle>Antonio Puig — Figma → Fiori</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">The prompt that built it:</p>
        </div>
        <div
          className="rounded-2xl px-8 py-6"
          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <p className="text-emerald-400 font-mono text-lg leading-relaxed break-all">
            /fiori https://www.figma.com/design/BZFIx0gkIhQHMrZJmXviU5/...
          </p>
          <p className="text-white/75 text-sm mt-3">Turn Figma into a Fiori-compliant app.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505-2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-6 py-4 transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <span className="text-white/88 text-lg">↗</span>
            <span className="text-white/85 text-base font-medium">Open example</span>
          </a>
          <a
            href="https://www.figma.com/design/BZFIx0gkIhQHMrZJmXviU5/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-6 py-4 transition-opacity hover:opacity-70"
            style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.28)" }}
          >
            <span className="text-purple-400 text-lg">✦</span>
            <span className="text-purple-300 text-base font-medium">Figma source</span>
          </a>
        </div>
      </div>
    ),
  },

  // ── Example: PG&E User Stories ───────────────────────────────────────────
  {
    phase: "Phase 0",
    id: "0.9",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-5xl">
        <div>
          <p className="text-white/88 text-xs font-semibold uppercase tracking-widest mb-4">Example</p>
          <SlideTitle>PG&E — User Story Priority App</SlideTitle>
          <p className="text-white/80 text-lg mt-2">The prompt that built it:</p>
        </div>
        <div
          className="rounded-2xl px-6 py-4"
          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)" }}
        >
          <p className="text-emerald-400 font-mono text-base">/fiori [Image]</p>
        </div>
        <a
          href="https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505-2"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl overflow-hidden block transition-opacity hover:opacity-80"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <img src="/slide-pge-user-stories.png" alt="PG&E User Stories App" className="w-full object-cover object-top" />
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: "rgba(255,255,255,0.04)" }}>
            <span className="text-white/80 text-sm">↗</span>
            <span className="text-white/88 text-sm font-medium">Open example</span>
          </div>
        </a>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "C15b",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-2">The Foundation</p>
          <SlideTitle>There are four ways to start /fiori.</SlideTitle>
        </div>

        {/* Four entry points */}
        <div>
          <p className="text-white/88 text-xs uppercase tracking-widest mb-3">Four ways to enter</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                icon: "💬",
                label: "Prompt",
                desc: "Describe what you want. /fiori generates once — fast, clean, KB-baked. /fiori-loop runs the full pipeline and iterates until score hits 97.",
                color: "rgba(139,92,246,0.08)",
                border: "rgba(139,92,246,0.2)",
                text: "text-purple-300",
              },
              {
                icon: "📸",
                label: "Screenshot",
                desc: "Paste a rendered screenshot. /evaluate-spacing reads it visually and maps violations back to code.",
                color: "rgba(245,158,11,0.08)",
                border: "rgba(245,158,11,0.2)",
                text: "text-amber-300",
              },
              {
                icon: "🎨",
                label: "Figma",
                desc: "Drop a Figma URL. /figma-to-fioriweb reads the design and translates it to FioriWeb or UI5 components.",
                color: "rgba(239,68,68,0.08)",
                border: "rgba(239,68,68,0.2)",
                text: "text-red-300",
              },
              {
                icon: "📦",
                label: "Repo",
                desc: "Point at an existing file. /fiori-design-review and /fiori-expert-review audit what's already there.",
                color: "rgba(16,185,129,0.08)",
                border: "rgba(16,185,129,0.2)",
                text: "text-emerald-300",
              },
            ].map(({ icon, label, desc, color, border, text }) => (
              <div key={label} className="rounded-xl p-5 flex flex-col gap-3" style={{ background: color, border: `1px solid ${border}` }}>
                <span className="text-3xl">{icon}</span>
                <p className={`${text} font-bold text-lg`}>{label}</p>
                <p className="text-white/88 text-sm leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },


  // ── /fiori vs /fiori-loop audience ────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15b2",
    content: (
      <div className="flex flex-col justify-center h-full gap-7 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-2">Two different audiences</p>
          <SlideTitle>There are two major skills in FioriWeb.</SlideTitle>
          <p className="text-white/80 text-base mt-2">Feedback and rule updates are the design team's job — not the user's burden.</p>        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* /fiori — end user */}
          <div className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.22)" }}>
            <div>
              <p className="text-blue-300 font-mono font-bold text-2xl mb-1">/fiori</p>
              <p className="text-white/85 text-lg font-medium">End user — just build</p>
            </div>
            <p className="text-white/88 text-base leading-relaxed">
              "Build me a procurement approval screen." One command, one output. The system reads the KB and SAP guidelines internally — the user never sees that layer. Generate, use, done.
            </p>
            <div className="flex flex-col gap-2 mt-auto">
              {[
                "Reads KB + SAP guidelines silently before writing",
                "Generates once — no loop, no scoring, no overhead",
                "Silent spacing fix runs automatically after generation",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 text-sm mt-0.5 shrink-0">→</span>
                  <p className="text-white/88 text-sm">{t}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg px-4 py-3 flex items-start gap-2 mt-1" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <span className="text-blue-300 text-xs mt-0.5 shrink-0">📋</span>
              <p className="text-white/75 text-sm leading-snug">
                Files a silent <span className="text-blue-300 font-mono">usage</span> issue after every run — date, user, prompt. You never see it.
              </p>
            </div>
          </div>

          {/* Design team */}
          <div className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.22)" }}>
            <div>
              <p className="text-purple-300 font-mono font-bold text-2xl mb-1">/fiori-loop</p>
              <p className="text-white/85 text-lg font-medium">Design team — evaluate and improve</p>
            </div>
            <p className="text-white/88 text-base leading-relaxed">
              The design team runs this deliberately to find gaps, score quality, and update the rules. Every run makes /fiori smarter for every user — without any user ever needing to know it happened.
            </p>
            <div className="flex flex-col gap-2 mt-auto">
              {[
                "Full 3-review pipeline — design, expert, spacing",
                "KB writeback after each round — rules update automatically",
                "/capture-feedback + /point-it for targeted manual findings",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-purple-400 text-sm mt-0.5 shrink-0">→</span>
                  <p className="text-white/88 text-sm">{t}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg px-4 py-3 flex items-start gap-2 mt-1" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <span className="text-purple-300 text-xs mt-0.5 shrink-0">📋</span>
              <p className="text-white/75 text-sm leading-snug">
                Files a <span className="text-purple-300 font-mono">kb-feedback</span> issue every round — scores, violations, fixes. Processed by <span className="text-purple-300 font-mono">/kb-ingest</span>.
              </p>
            </div>
          </div>
        </div>

        {/* The flywheel */}
        <div className="rounded-xl px-6 py-4 flex items-center gap-4" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)" }}>
          <span className="text-xl">↺</span>
          <p className="text-white/88 text-base">
            The design team's work compounds into the KB. Every future <span className="text-blue-300 font-mono text-sm">/fiori</span> run — by any user — benefits automatically.
          </p>
        </div>
      </div>
    ),
  },


  // ── When /fiori runs ──────────────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15b1",
    content: (
      <div className="flex flex-col justify-center h-full gap-5 max-w-4xl w-full">
        <div>
          <p className="text-blue-400 font-mono text-sm font-semibold mb-2">/fiori</p>
          <SlideTitle>When you run /fiori, here&apos;s what happens.</SlideTitle>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { step: "Step 0",   label: "Read the knowledge base",   desc: "Reads the KB — past violations, rules, fixes from every run before this one. Silently, before anything else.", tag: "blue" },
            { step: "Step 1",   label: "Parse what you asked for",   desc: "Extracts screen type, data entities, actions, layout mode, persona — intent, not just words.", tag: "blue" },
            { step: "Step 2", label: "Load rule modules → Apply Fiori rules", desc: "Reads 8 rule files (layout, components, tables, forms, tokens, icons, feedback, quality) before a single line of code. Floorplan selection, component resolution, token mapping, spacing — all enforced from the modules, not guessed.", tag: "indigo" },
            { step: "Step 3", label: "Show reasoning (then just builds)", desc: "Prints floorplan + components chosen. No pause, no confirmation — it just goes. The summary is there if you want to read it.", tag: "indigo" },
            { step: "Step 4", label: "Generate + silent spacing fix", desc: "Full TSX component out. Spacing audit runs automatically after — no extra command needed.", tag: "emerald" },
          ].map(({ step, label, desc, tag }) => {
            const accent = tag === "blue" ? "rgba(59,130,246,0.18)" : tag === "indigo" ? "rgba(99,102,241,0.18)" : "rgba(16,185,129,0.18)";
            const bg = tag === "blue" ? "rgba(59,130,246,0.05)" : tag === "indigo" ? "rgba(99,102,241,0.05)" : "rgba(16,185,129,0.05)";
            const stepColor = tag === "blue" ? "text-blue-400" : tag === "indigo" ? "text-indigo-400" : "text-emerald-400";
            return (
              <div key={step} className="flex items-start gap-5 rounded-xl px-6 py-4" style={{ background: bg, border: `1px solid ${accent}` }}>
                <span className={`${stepColor} text-sm font-mono font-bold w-14 shrink-0 mt-0.5`}>{step}</span>
                <div className="flex flex-col gap-1">
                  <p className="text-white/85 text-lg font-semibold leading-snug">{label}</p>
                  <p className="text-white/88 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },

  // ── Fiori Loop Dissection ──────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15b-intent",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl w-full">
        <div>
          <p className="text-blue-400 font-mono text-sm font-semibold mb-2">Step 1 — Parse intent</p>
          <SlideTitle>Before a single component is chosen.</SlideTitle>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { key: "Role",           value: "Who is using this screen?" },
            { key: "Object",         value: "What business object is the focus?" },
            { key: "Floorplan",      value: "Which of the 4 layout types?" },
            { key: "Primary action", value: "The ONE thing the user must do" },
            { key: "Data shown",     value: "Which fields, KPIs, statuses" },
            { key: "Interactions",   value: "Search, sort, filter, approve, submit" },
            { key: "Feedback",       value: "Loading, success, error, empty" },
          ].map(({ key, value }) => (
            <div key={key} className="flex items-baseline gap-6">
              <span className="text-white/85 font-mono text-sm w-36 shrink-0 text-right">{key}</span>
              <span className="text-white/85 text-sm shrink-0">→</span>
              <span className="text-white text-xl">{value}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    phase: "Closing",
    id: "C15b-modules",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-5xl w-full">
        <div>
          <p className="text-blue-400 font-mono text-sm font-semibold mb-2">8 rule modules</p>
          <SlideTitle>What the rules actually cover.</SlideTitle>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { n: "1", label: "Layout", desc: "Header / Content / Footer structure. One role, one task. Information hierarchy top-down." },
            { n: "2", label: "Floorplans", desc: "List Report / Object Page / Overview Page / Worklist. Pick one. Do not invent custom layouts." },
            { n: "3", label: "Forms", desc: "Label pairing, required fields, inline validation, valueState must be reactive — not hardcoded." },
            { n: "4", label: "Feedback states", desc: "All four required: Loading (BusyIndicator), Success (Toast), Error (MessageStrip), Empty (IllustratedMessage). Every async trigger, not just page load." },
            { n: "5", label: "Tokens", desc: "Never hardcode hex. Full typography token set (--sapFontSize, --sapFontBoldWeight). Shadow tokens. No lineHeight or letterSpacing — no SAP token equivalent, omit entirely." },
            { n: "6", label: "Components / Anti-patterns", desc: "~25 \"never do this, do this instead\" entries. All real violations caught in actual generations and written back in." },
            { n: "7", label: "Icons", desc: "Individual imports only. Exact filenames. No inline SVG." },
            { n: "8", label: "Tables", desc: "rowKey, features prop, sticky, overflowMode=\"Popin\", noDataText, toolbar above not inside." },
          ].map(({ n, label, desc }) => (
            <div
              key={n}
              className="rounded-xl px-5 py-4 flex gap-4"
              style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <span className="text-blue-400/70 font-mono font-bold text-sm shrink-0 mt-0.5 w-4">{n}</span>
              <div>
                <p className="text-white font-semibold text-base leading-snug mb-1">{label}</p>
                <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    phase: "Closing",
    id: "C15c",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-6xl w-full">
        <div>
          <p className="text-purple-400 font-mono text-base font-semibold mb-2">/fiori-loop</p>
          <SlideTitle>But all the heavy lifting and magic is /fiori-loop.</SlideTitle>
        </div>

        {/* Loop cycle */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "⚙️", label: "/fiori", desc: "Generate full Fiori TSX — SAP guidelines + past violations baked in" },
            { icon: "🏗️", label: "/fiori-design-review", desc: "Library compliance — no ad-hoc divs, no hex colors, correct imports" },
            { icon: "🔍", label: "/fiori-expert-review", desc: "15-point audit — auto-fix violations, write to KB" },
            { icon: "📐", label: "/evaluate-spacing", desc: "Visual spacing audit — Shadow DOM, density, token gaps" },
            { icon: "📊", label: "Combined score", desc: "floor((design + expert + spacing) ÷ 3) — threshold: 97" },
          ].map(({ icon, label, desc }, i) => (
            <div key={i} className="relative">
              {i < 4 && i !== 2 && (
                <div className="absolute top-10 -right-3 text-white/40 text-xl z-10">→</div>
              )}
              <div
                className="rounded-2xl p-7 h-full"
                style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)" }}
              >
                <p className="text-3xl mb-4">{icon}</p>
                <p className="text-purple-300 font-mono font-bold text-xl mb-2">{label}</p>
                <p className="text-white/80 text-lg leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Loop decision */}
        <div className="flex items-center gap-4">
          <div
            className="flex-1 rounded-xl px-6 py-5 flex items-center gap-4"
            style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <span className="text-3xl">↺</span>
            <div>
              <p className="text-amber-300 font-semibold text-lg">Score &lt; 97 → loop again</p>
              <p className="text-white/85 text-base mt-0.5">Regenerates from scratch — up to 3 rounds max, then hands off</p>
            </div>
          </div>
          <div
            className="flex-1 rounded-xl px-6 py-5 flex items-center gap-4"
            style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <span className="text-3xl">✓</span>
            <div>
              <p className="text-emerald-300 font-semibold text-lg">Score ≥ 97 → done</p>
              <p className="text-white/85 text-base mt-0.5">Outputs final TSX + KB writeback for next run</p>
            </div>
          </div>
        </div>

        {/* GitHub issue feature */}
        <div
          className="rounded-xl px-6 py-5 flex items-start gap-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-3xl mt-0.5">🐙</span>
          <div>
            <p className="text-white/85 font-semibold text-lg mb-1">GitHub issue filed after <span className="text-purple-300">every round</span> — not just the end</p>
            <p className="text-white/88 text-base font-mono leading-relaxed">
              gh issue create --repo github.tools.sap/I765211/FioriWeb --title &quot;[fiori-loop] Round N score: XX/100&quot;
            </p>
            <p className="text-white/80 text-base mt-1">Scores, violations fixed, KB entries added — full audit trail per component, per run.</p>
          </div>
        </div>
      </div>
    ),
  },


  // ── /fiori-expert-review Dissection ──────────────────────────────────────
  {
    phase: "Closing",
    id: "C15e",
    content: (
      <div className="flex flex-col justify-center h-full gap-5 max-w-6xl w-full">
        <div>
          <p className="text-purple-400 font-mono text-sm font-semibold mb-2">/fiori-expert-review</p>
          <SlideTitle>The 15-point quality gate.</SlideTitle>
        </div>

        {/* 15 checks grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: "01", label: "Library imports", note: "Right stack, no mixing" },
            { n: "02", label: "No ad-hoc components", note: "No div as button or badge" },
            { n: "03", label: "No hardcoded colors", note: "var(--sapXxx) only" },
            { n: "04", label: "SAP token usage", note: "Spacing, typography, borders" },
            { n: "05", label: "Floorplan compliance", note: "ShellBar, DynamicPage, layout" },
            { n: "06", label: "Primary action rule", note: "Exactly 1 Emphasized button" },
            { n: "07", label: "Form quality", note: "Labels, valueState, validation" },
            { n: "08", label: "Table/List quality", note: "Toolbar, empty state, popin" },
            { n: "09", label: "Feedback completeness", note: "Loading + Toast + error" },
            { n: "10", label: "Accessibility", note: "Labels, tooltips, ThemeProvider" },
            { n: "11", label: "Density", note: "Compact for data-heavy screens" },
            { n: "12", label: "Icon imports", note: "Exact filenames, no inline SVG" },
            { n: "13", label: "DynamicPage layout", note: "height:100vh not minHeight" },
            { n: "14", label: "Code quality", note: "No unused state, no TODOs" },
            { n: "15", label: "UXC-015 Terminology", note: "Cancel not Dismiss, Create not New" },
          ].map(({ n, label, note }) => (
            <div
              key={n}
              className="flex items-start gap-4 rounded-xl px-5 py-4"
              style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)" }}
            >
              <p className="text-purple-400 font-mono font-bold text-lg shrink-0 mt-0.5">{n}</p>
              <div>
                <p className="text-white/85 text-lg font-semibold leading-snug">{label}</p>
                <p className="text-white/80 text-base leading-snug mt-1">{note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="flex items-center gap-4">
          <div
            className="flex-1 rounded-xl px-6 py-5 flex items-center gap-4"
            style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)" }}
          >
            <span className="text-2xl">🔧</span>
            <div>
              <p className="text-amber-300 font-semibold text-lg">Auto-fix mode (loop only)</p>
              <p className="text-white/88 text-base mt-1">All ❌ FAIL checks are fixed directly in the file — wrong imports, hex colors, minHeight, bad icon filenames. ⚠️ WARNs flagged for human review.</p>
            </div>
          </div>
          <div
            className="flex-1 rounded-xl px-6 py-5 flex items-center gap-4"
            style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}
          >
            <span className="text-2xl">📚</span>
            <div>
              <p className="text-emerald-300 font-semibold text-lg">KB writeback after every run</p>
              <p className="text-white/88 text-base mt-1">New violations appended to knowledge-base.md — synced to repo so the next /fiori call learns from this run.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── Spacing Review Dissection ─────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15e2",
    content: (
      <div className="flex flex-col justify-center h-full gap-7 max-w-4xl">
        <div>
          <p className="text-purple-400 font-mono text-sm font-semibold mb-2">/evaluate-spacing</p>
          <SlideTitle>Spacing looks right in the file. Doesn&apos;t mean it looks right on screen.</SlideTitle>
        </div>

        <div className="rounded-2xl px-7 py-6" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <p className="text-white/85 text-lg leading-relaxed">
            SAP UI components control their own internal padding, gaps, and density. You can&apos;t see it in the code — it only appears when the component actually renders in the browser. So the code can look perfectly correct and still feel visually wrong.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "👁️", label: "We look at the screenshot first", desc: "The rendered screen is the only source of truth. That&apos;s what the user sees — not the code." },
            { icon: "🔍", label: "Then we find the line to fix", desc: "Once we spot a visual problem, we go into the code to locate and correct it. Visual diagnosis first, code second." },
            { icon: "📐", label: "Spacing compounds", desc: "Margin, padding, gap, and line height all stack together. Each one might be fine alone — together they can make the screen feel cramped or floaty." },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="rounded-xl p-5 flex flex-col gap-2" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <span className="text-2xl">{icon}</span>
              <p className="text-purple-300 font-semibold text-base">{label}</p>
              <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl px-6 py-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-lg">→</span>
          <p className="text-white/85 text-base">
            The quality checklist catches rule violations in code. <span className="text-white/80 font-semibold">/evaluate-spacing</span> catches what only the rendered screen reveals. You need both.
          </p>
        </div>
      </div>
    ),
  },

  // ── Feedback Loop ─────────────────────────────────────────────────────────
  // ── /fiori-design-review Dissection ──────────────────────────────────────
  {
    phase: "Closing",
    id: "C15e3",
    content: (
      <div className="flex flex-col justify-center h-full gap-5 max-w-4xl">
        <div>
          <p className="text-purple-400 font-mono text-sm font-semibold mb-2">/fiori-design-review</p>
          <SlideTitle>The structural compliance gate.</SlideTitle>
          <p className="text-white/80 text-base mt-2">Runs before scoring. Clears fixable violations so the quality audit scores mastery — not sloppiness.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            {[
              { icon: "📦", label: "Library imports", desc: "Every component from the correct source — FioriWeb paths or @ui5/webcomponents-react. Mixing stacks is an immediate fail." },
              { icon: "🚫", label: "No ad-hoc UI", desc: "<div onClick> as a button, <span style> as a Tag — if a library component exists, use it." },
              { icon: "🎨", label: "No hardcoded colors", desc: "Any #hex, rgb(), rgba() in style props is a fail. Only var(--sapXxx) tokens allowed." },
              { icon: "🏷️", label: "No legacy tokens", desc: "var(--sap-) kebab-case is the old format. Correct is var(--sapXxx) camelCase." },
              { icon: "💬", label: "Feedback coverage", desc: "User-triggered actions (onClick) without any Toast or MessageStrip for feedback — warns." },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="rounded-xl p-3 flex gap-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <span className="text-base shrink-0">{icon}</span>
                <div>
                  <p className="text-red-300 font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-white/80 text-sm leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {[
              { icon: "🔌", label: "Provider present", desc: "ThemeProvider (UI5) or FioriProvider (FioriWeb) must wrap the root — no exceptions." },
              { icon: "⭐", label: "Emphasized button rule", desc: "Exactly one design='Emphasized' button per screen. Zero or two both fail." },
              { icon: "📋", label: "Empty state handling", desc: "Table or List rendered without empty-state guard or IllustratedMessage — warns." },
              { icon: "🔤", label: "Token spacing/typography", desc: "Hardcoded fontSize, fontFamily, fontWeight values instead of var(--sapFontSize) etc." },
              { icon: "🔧", label: "UI5-specific gotchas", desc: "ValueState enum vs string literals, Badge→Tag, TableColumn→TableHeaderCell, wrong slots, bad icon names." },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="rounded-xl p-3 flex gap-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                <span className="text-base shrink-0">{icon}</span>
                <div>
                  <p className="text-red-300 font-semibold text-sm mb-0.5">{label}</p>
                  <p className="text-white/80 text-sm leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl px-5 py-3 flex items-center gap-3" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)" }}>
          <span className="text-base">⚡</span>
          <p className="text-white/80 text-sm">All ❌ FAIL violations are fixed immediately and autonomously — no confirmation needed. The file is clean before expert review runs.</p>
        </div>
      </div>
    ),
  },

  // ── Evaluation & Feedback Loop ──────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15e4",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">Where I spent most of my time</p>
          <SlideTitle>Evaluation and Feedback Loop.</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">
            Generation is only as good as evaluation and feedback.<br/>
            Without it — it looks like this.
          </p>
        </div>

        <a
          href="http://localhost:5173/?page=ui5%2Fconcur-home"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl px-8 py-5 flex items-center gap-5 transition-opacity hover:opacity-80"
          style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="text-red-300 font-semibold text-lg mb-1">Before: no evaluation loop</p>
            <p className="text-white/80 text-sm font-mono">localhost:5173/?page=ui5/concur-home</p>
          </div>
          <span className="text-white/88 text-sm ml-auto">Open →</span>
        </a>

        <div
          className="rounded-2xl px-8 py-6"
          style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <p className="text-emerald-400 text-base font-semibold mb-2">The insight</p>
          <p className="text-white/85 text-lg leading-relaxed">
            The model can generate something that compiles and renders — but without a feedback loop that scores it, flags violations, and writes what it learned back into the knowledge base, every run starts from zero. The loop is what makes it get better.
          </p>
        </div>
      </div>
    ),
  },


  {
    phase: "Closing",
    id: "C15f",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-4xl">
        <div>
          <p className="text-purple-400 font-mono text-sm font-semibold mb-2">Knowledge Base</p>
          <SlideTitle>Two ways the system learns.</SlideTitle>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Human path */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}
          >
            <p className="text-blue-300 font-semibold text-base">Human feedback</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-base shrink-0">🖱️</span>
                <div>
                  <p className="text-white/85 text-sm font-semibold mb-0.5">/point-it</p>
                  <p className="text-white/80 text-sm leading-snug">Hover over any rendered element — tag, classes, React component name, computed spacing printed to terminal. You point at the problem.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-base shrink-0">📝</span>
                <div>
                  <p className="text-white/85 text-sm font-semibold mb-0.5">/capture-feedback</p>
                  <p className="text-white/80 text-sm leading-snug">Takes the verbal critique or point-it output, classifies the finding, writes a DO/DON'T entry to KB, and updates the SKILL.md inline.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-base shrink-0">🔄</span>
                <div>
                  <p className="text-white/85 text-sm font-semibold mb-0.5">Syncs to repo</p>
                  <p className="text-white/80 text-sm leading-snug">Immediately copied to FioriWeb repo. Available to every future /fiori run across the team.</p>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg px-3 py-2 mt-auto"
              style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.15)" }}
            >
              <p className="text-blue-200 text-sm font-mono">/point-it → /capture-feedback → KB → repo</p>
              <p className="text-white/80 text-sm mt-0.5">Most direct path. Human judgment in, system rule out.</p>
            </div>
          </div>

          {/* Automated path */}
          <div
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <p className="text-purple-300 font-semibold text-base">Automated loop</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-base shrink-0">⚙️</span>
                <div>
                  <p className="text-white/85 text-sm font-semibold mb-0.5">/fiori-loop runs</p>
                  <p className="text-white/80 text-sm leading-snug">Generates, reviews, scores. After every round — whether it passes or loops — a GitHub issue is filed with scores, violations, and fixes applied.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-base shrink-0">🐙</span>
                <div>
                  <p className="text-white/85 text-sm font-semibold mb-0.5">GitHub issue per round</p>
                  <p className="text-white/80 text-sm leading-snug">Structured audit trail. Remote runs that can't write KB directly still produce a durable record.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-base shrink-0">📥</span>
                <div>
                  <p className="text-white/85 text-sm font-semibold mb-0.5">/kb-ingest</p>
                  <p className="text-white/80 text-sm leading-snug">Reviews open issues, deduplicates against existing KB, merges useful entries, closes processed issues. Run manually or on a schedule.</p>
                </div>
              </div>
            </div>
            <div
              className="rounded-lg px-3 py-2 mt-auto"
              style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <p className="text-purple-200 text-sm font-mono">/fiori-loop → GitHub issue → /kb-ingest → repo</p>
              <p className="text-white/80 text-sm mt-0.5">No human in the loop. Violations become rules automatically.</p>
            </div>
          </div>
        </div>

        {/* Convergence */}
        <div
          className="rounded-xl px-6 py-4 flex items-center gap-4"
          style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <span className="text-2xl">✦</span>
          <div>
            <p className="text-emerald-300 font-semibold text-base">Same destination — the shared KB in the FioriWeb repo</p>
            <p className="text-white/80 text-sm mt-0.5">Every /fiori generation reads it at Step 0. The more runs, the fewer violations. The system gets better without anyone manually updating rules.</p>
          </div>
        </div>
      </div>
    ),
  },

  // ── Human Feedback ──────────────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15f2",
    content: (
      <div className="flex flex-col justify-center h-full gap-7 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">Human Feedback</p>
          <SlideTitle>Two skills for when you see something wrong.</SlideTitle>
        </div>

        <div className="flex flex-col gap-4">
          {/* /point-it */}
          <div className="rounded-2xl p-7" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.22)" }}>
            <div className="flex items-start gap-5">
              <span className="text-3xl mt-1">🖱️</span>
              <div className="flex flex-col gap-2">
                <p className="text-blue-300 font-mono font-bold text-2xl">/point-it</p>
                <p className="text-white/85 text-lg font-medium">Point at any element on screen.</p>
                <p className="text-white/80 text-base leading-relaxed">
                  Injects a Figma-style hover overlay into the browser. Click any element — it prints the tag, React component name, selector, and computed styles (padding, margin, gap) directly to the terminal. Tells you exactly what you&apos;re looking at before you give feedback.
                </p>
              </div>
            </div>
          </div>

          {/* /capture-feedback */}
          <div className="rounded-2xl p-7" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.22)" }}>
            <div className="flex items-start gap-5">
              <span className="text-3xl mt-1">📝</span>
              <div className="flex flex-col gap-2">
                <p className="text-indigo-300 font-mono font-bold text-2xl">/capture-feedback</p>
                <p className="text-white/85 text-lg font-medium">Say what&apos;s wrong. It routes and writes the fix.</p>
                <p className="text-white/80 text-base leading-relaxed">
                  Takes verbal critique, a /point-it output block, a screenshot, or a Figma URL. Classifies the finding — spacing, component, token, pattern — and writes the update directly to the right knowledge base file. No confirmation. You just describe what you see.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl px-6 py-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-xl">↺</span>
          <p className="text-white/80 text-base">
            Point at it → describe what&apos;s wrong → the KB updates. Next time <span className="text-blue-300 font-mono text-sm">/fiori</span> runs, that mistake doesn&apos;t happen again.
          </p>
        </div>

        {/* 4 input modes */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { mode: "Prompt → Fiori",      icon: "💬", desc: "Plain text description. One command, full screen.", color: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.22)", tag: "text-blue-300" },
            { mode: "Screenshot → Fiori",  icon: "🖼️", desc: "Paste an image. It reads the layout and rebuilds it in UI5.", color: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.22)", tag: "text-indigo-300" },
            { mode: "Figma → Fiori",       icon: "🎨", desc: "Drop a Figma URL. Design becomes running code.", color: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.22)", tag: "text-purple-300" },
            { mode: "Code → Fiori",        icon: "⚙️", desc: "Existing component. Migrate it to Fiori-compliant TSX.", color: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.22)", tag: "text-emerald-300" },
          ].map(({ mode, icon, desc, color, border, tag }) => (
            <div key={mode} className="rounded-xl p-4 flex flex-col gap-2" style={{ background: color, border: `1px solid ${border}` }}>
              <span className="text-2xl">{icon}</span>
              <p className={`font-semibold text-sm ${tag}`}>{mode}</p>
              <p className="text-white/80 text-xs leading-snug">{desc}</p>
            </div>
          ))}
        </div>

        {/* Jennifer Wang credit */}
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-base">✦</span>
          <p className="text-white/75 text-sm">
            Thanks to <span className="text-white/75 font-semibold">Jennifer Wang</span> — our in-house Fiori expert who has been doing the human evaluation.
          </p>
        </div>
      </div>
    ),
  },
  // ── Automated Loop ───────────────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C15f3",
    content: (
      <div className="flex flex-col justify-center h-full gap-7 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">Automated Loop</p>
          <SlideTitle>Every run files a GitHub issue.</SlideTitle>
          <p className="text-white/80 text-lg mt-3 leading-relaxed">
            When <span className="text-purple-300 font-mono">\/fiori-loop</span> finishes, it automatically opens a <span className="text-white/80">kb-report</span> issue on GitHub with every score, violation, and fix from that run. Then <span className="text-indigo-300 font-mono">\/kb-ingest</span> pulls them all in.
          </p>
        </div>

        {/* Flow */}
        <div className="flex items-center gap-3">
          {[
            { label: "\/fiori-loop", desc: "Generate → review → score → fix. Up to 3 rounds.", color: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", text: "text-purple-300" },
            { label: "GitHub Issue", desc: "kb-report filed automatically. Scores, violations, new rules — one issue per run.", color: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.12)", text: "text-white/75" },
            { label: "\/kb-ingest", desc: "Reads all open kb-report issues, deduplicates, merges into the KB, closes the issues.", color: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.25)", text: "text-indigo-300" },
            { label: "KB updated", desc: "Next \/fiori run benefits. Every user, automatically.", color: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", text: "text-emerald-300" },
          ].map(({ label, desc, color, border, text }, i, arr) => (
            <div key={label} className="flex items-stretch gap-3 flex-1">
              <div className="rounded-xl p-5 flex flex-col gap-2 flex-1" style={{ background: color, border: `1px solid ${border}` }}>
                <p className={`font-mono font-bold text-base ${text}`}>{label}</p>
                <p className="text-white/80 text-sm leading-snug">{desc}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="flex items-center text-white/80 text-xl shrink-0">→</div>
              )}
            </div>
          ))}
        </div>

        {/* What a kb-report issue contains */}
        <div className="rounded-2xl px-7 py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/85 text-xs font-semibold uppercase tracking-widest mb-4">What a kb-report issue contains</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "📊", label: "Scores per round", desc: "Expert, spacing, combined — tracked across all 3 rounds" },
              { icon: "🔍", label: "Violations found", desc: "Every rule broken, the fix applied, and whether it recurred" },
              { icon: "📝", label: "New KB entries", desc: "Rules distilled from this run, ready for /kb-ingest to merge" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <p className="text-white/80 text-sm font-semibold mb-1">{label}</p>
                  <p className="text-white/75 text-xs leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    phase: "Closing",
    id: "C15f4",
    content: (
      <div className="flex flex-col justify-center h-full gap-10 max-w-3xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">Putting it all together</p>
          <SlideTitle>So I created /evaluation-fiori.</SlideTitle>
        </div>

        <div className="rounded-2xl px-8 py-7 flex flex-col gap-4" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)" }}>
          <p className="text-purple-300 font-mono font-bold text-2xl">/evaluation-fiori Build 20 apps</p>
          <p className="text-white/75 text-xl leading-relaxed">
            I run it, go to bed. By morning — 20 apps built, reviewed, scored, and all the findings compounded into the knowledge base.
          </p>
        </div>

        <div className="rounded-xl px-6 py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/80 text-base leading-relaxed">
            It also looks at all past builds and existing apps to see <span className="text-white/85 font-semibold">which components haven&apos;t been used yet</span> — then crafts prompts specifically designed to call those up for evaluation. Nothing slips through untested.
          </p>
        </div>
      </div>
    ),
  },
  {
    phase: "Closing",
    id: "C15f5",
    content: (
      <div className="flex flex-col justify-center h-full gap-9 max-w-3xl">
        <div>
          <SlideTitle>Then we made it super easy to access.</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">
            You can Fioritize anything, anywhere — as long as you have a Claude Code terminal open.
          </p>
        </div>

        <div className="rounded-2xl px-8 py-7 flex flex-col gap-3" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.25)" }}>
          <p className="text-white/75 text-xs font-semibold uppercase tracking-widest">All you have to do</p>
          <p className="text-emerald-300 font-mono text-xl font-semibold">go github.tools.sap/I765211/FioriWeb</p>
          <p className="text-white/80 text-base">That&apos;s it. Skills install in seconds. No fork, no branch, no setup.</p>
        </div>

        <div className="rounded-xl px-6 py-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/85 text-xs font-semibold uppercase tracking-widest mb-3">Why this mattered</p>
          <p className="text-white/85 text-base leading-relaxed">
            If it requires a fork, a download, or a branch — that&apos;s too much friction for a designer. And they probably already have their own repo to build on. The bar had to be: <span className="text-white/80 font-semibold">one command, works anywhere, nothing to maintain.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    phase: "Closing",
    id: "C15f6",
    content: (
      <div className="flex h-full gap-10 items-center">
        {/* Left — copy */}
        <div className="flex flex-col gap-7 w-[420px] shrink-0">
          <div>
            <SlideTitle>And guess what.</SlideTitle>
            <p className="text-white/80 text-xl mt-3 leading-relaxed">
              When other designers use it — their evaluation and feedback flows back to my repo. Automatically.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl px-5 py-4 flex items-start gap-4" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.22)" }}>
              <span className="text-xl shrink-0">📈</span>
              <div>
                <p className="text-emerald-300 font-semibold text-base mb-1">Exponential feedback</p>
                <p className="text-white/80 text-sm leading-snug">Every run anyone does contributes KB entries back. The more people use it, the smarter it gets — for everyone.</p>
              </div>
            </div>
            <div className="rounded-xl px-5 py-4 flex items-start gap-4" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.22)" }}>
              <span className="text-xl shrink-0">📊</span>
              <div>
                <p className="text-blue-300 font-semibold text-base mb-1">Usage metrics</p>
                <p className="text-white/80 text-sm leading-snug">Every issue is filed with the user&apos;s GitHub identity. I can track who&apos;s using it, what they&apos;re building, and how quality improves over time.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — screenshot */}
        <div className="flex-1 h-full flex items-center justify-center overflow-hidden">
          <img
            src="/slide-kb-issue-email.png"
            alt="KB issue email from Pooja Harsha — FioriWeb knowledge base report"
            className="rounded-2xl object-contain max-h-full w-full"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>
      </div>
    ),
  },
  {
    phase: "Closing",
    id: "C16c",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <SlideTitle>But the final results look very bland.</SlideTitle>
          <p className="text-white/80 text-xl mt-3 leading-relaxed">
            The logic is right. The structure is right. The prototype works.<br/>
            But it doesn&apos;t have a soul.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-white/85 text-xl leading-relaxed">
              The FDE output is functional. But it doesn&apos;t have the visual moments that make a client say <span className="text-white/85 font-semibold italic">"wow, this is what SAP could look like."</span>
            </p>
          </div>
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)" }}>
            <p className="text-red-300 text-xl leading-relaxed">
              Generic layouts. Safe colors. No tension. No iconicity. It compiles — but it doesn&apos;t <em>land</em>.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ── DaVinci: Intro ────────────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "DV00",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-10 max-w-3xl mx-auto">
        <p className="text-white/45 text-sm font-semibold uppercase tracking-widest">Now that Fiori is automated…</p>
        <h1 className="font-bold leading-tight tracking-tight text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          Can we automate taste?
        </h1>
        <div className="h-px w-24 bg-white/15" />
        <p className="text-white/55 text-xl leading-relaxed">
          /fiori-loop compiles, reviews, scores, and learns from every technical violation.<br/>
          Can we build the same loop — but for <span className="text-white/80 font-semibold">design judgment</span>?
        </p>
        <div className="flex items-center gap-6 mt-2">
          <div className="rounded-xl px-6 py-4" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.22)" }}>
            <p className="text-purple-300 font-mono font-bold text-base">/fiori-loop</p>
            <p className="text-white/40 text-sm mt-1">technical quality</p>
          </div>
          <span className="text-white/25 text-2xl">+</span>
          <div className="rounded-xl px-6 py-4" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
            <p className="text-purple-200 font-mono font-bold text-base">/fiori-loop --taste</p>
            <p className="text-white/40 text-sm mt-1">taste quality</p>
          </div>
          <span className="text-white/25 text-2xl">=</span>
          <div className="rounded-xl px-6 py-4" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)" }}>
            <p className="text-emerald-300 font-mono font-bold text-base">DaVinci</p>
            <p className="text-white/40 text-sm mt-1">both, compounding</p>
          </div>
        </div>
      </div>
    ),
  },

  // ── DaVinci: What Is It ───────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "DV01",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">So I built something else</p>
          <SlideTitle>Meet DaVinci.</SlideTitle>
          <SlideSub>The answer to &ldquo;why does it look bland?&rdquo;</SlideSub>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.28)" }}>
            <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-2">What it is</p>
            <p className="text-white/85 text-xl leading-relaxed">
              A compounding design judgment system. Not a tool. Not a critique bot. A <span className="text-white/90 font-semibold">taste canon</span> — encoded into Claude Code as skills that run silently before and after every build.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl px-6 py-5" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <p className="text-blue-300 font-semibold text-base mb-2">The Brain</p>
              <p className="text-white/85 text-sm leading-relaxed">Skills Engine — evaluation logic, conductor sequence, kill steps, CDO voice. Where taste gets encoded and tested.</p>
            </div>
            <div className="rounded-xl px-6 py-5" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <p className="text-emerald-300 font-semibold text-base mb-2">The Body</p>
              <p className="text-white/85 text-sm leading-relaxed">Hub web app — accumulates every piece of work, judgment applied, and context. Becomes institutional memory at SAP scale.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── DaVinci: The 7 Principles ─────────────────────────────────────────────
  {
    phase: "Closing",
    id: "DV02",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-5xl w-full">
        <div>
          <SlideTitle>The 7 DaVinci Taste Principles.</SlideTitle>
          <p className="text-white/85 text-lg mt-2">Not trends. Durable principles — observable in real products, transferable across contexts.</p>
        </div>
        <div className="flex flex-col divide-y" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { n: "1", label: "Single Obvious Action",      note: "One dominant purpose per screen. The user never hesitates.",                        ref: "Shazam · Google Search" },
            { n: "2", label: "Interaction as Behavior",    note: "The gesture IS the decision — not a UI wrapper around it.",                         ref: "Tinder swipe · iPhone pinch-to-zoom" },
            { n: "3", label: "Immediate Value Visibility", note: "Value visible before the user commits to using the product.",                        ref: "Apple AirPods pairing · Spotify Now Playing" },
            { n: "4", label: "Radical Reduction",          note: "Every removed element increases the weight of what remains.",                        ref: "Apple product pages · Dieter Rams · Molly Studio" },
            { n: "5", label: "Emotional Feedback",         note: "The user feels something specific at the moment of action.",                         ref: "iOS micro-interactions · Loom recording pulse" },
            { n: "6", label: "Signature Moment",           note: "One moment produces a named emotion that makes the rest of the flow feel earned.",   ref: "Netflix \"Tudum\" · Shazam animation · Linear command palette" },
            { n: "7", label: "Invisible Complexity",       note: "The system absorbs complexity so the user never has to carry it.",                   ref: "Stripe · Linear issue tracking · Ramp" },
          ].map(({ n, label, note, ref }) => (
            <div key={n} className="grid items-center py-4" style={{ gridTemplateColumns: "2rem 1fr 2fr", gap: "1.5rem", borderColor: "rgba(255,255,255,0.07)" }}>
              <span className="text-purple-400/60 font-mono font-bold text-base">{n}</span>
              <p className="text-white font-semibold text-lg leading-snug">{label}</p>
              <div className="flex items-center justify-between gap-6">
                <p className="text-white/85 text-base leading-snug">{note}</p>
                <p className="text-purple-400/70 text-sm font-mono whitespace-nowrap shrink-0">{ref}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "DV04",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-5xl w-full">
        <div>
          <p className="text-purple-400 font-mono text-sm font-semibold mb-2">/design-evaluation-loop</p>
          <SlideTitle>6 dimensions. 3 are pass/fail. 1 must hit 5.</SlideTitle>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-white/85 text-xs font-semibold uppercase tracking-widest mb-1">Non-negotiables — all must be ≥ 4</p>
            {[
              { label: "Clarity",      desc: "Intent readable in 3 seconds without reading a word" },
              { label: "Trust",        desc: "User knows: what happened, why, what's next" },
              { label: "Focus",        desc: "Primary action unmistakable — one purpose per screen" },
            ].map(({ label, desc }) => (
              <div key={label} className="rounded-xl px-5 py-4" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <p className="font-bold text-base mb-1 text-blue-300">{label}</p>
                <p className="text-white/85 text-sm leading-snug">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white/85 text-xs font-semibold uppercase tracking-widest mb-1">Differentiators — at least one must = 5 for ICONIC</p>
            {[
              { label: "Memorability", desc: "Produces a specific named emotion — would someone describe this to a friend?" },
              { label: "Reduction",    desc: "Something was deliberately removed — its absence makes the rest stronger" },
              { label: "Proactivity",  desc: "System decides what the user shouldn't have to — complexity absorbed" },
            ].map(({ label, desc }) => (
              <div key={label} className="rounded-xl px-5 py-4" style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.25)" }}>
                <p className="font-bold text-base mb-1 text-purple-300">{label}</p>
                <p className="text-white/85 text-sm leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          {[
            { verdict: "FAIL",            desc: "Any non-negotiable < 4",                                           color: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.25)",   tag: "text-red-300" },
            { verdict: "PASS·GENERIC",    desc: "Non-negotiables pass but no differentiator hits 5",               color: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)",  tag: "text-amber-300" },
            { verdict: "ICONIC POTENTIAL",desc: "Non-negotiables pass + at least one differentiator = 5",          color: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.25)",  tag: "text-emerald-300" },
          ].map(({ verdict, desc, color, border, tag }) => (
            <div key={verdict} className="flex-1 rounded-xl px-5 py-4" style={{ background: color, border: `1px solid ${border}` }}>
              <p className={`font-mono font-bold text-sm mb-1 ${tag}`}>{verdict}</p>
              <p className="text-white/85 text-xs leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  // ── DaVinci: /taste-loop ─────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "DV-LOOP",
    content: (
      <div className="flex flex-col justify-center h-full gap-6 max-w-6xl w-full">
        <div>
          <SlideTitle>DaVinci runs the same loop as FioriWeb.</SlideTitle>
          <p className="text-white/55 text-lg mt-2">Same architecture. Different judgment layer.</p>
        </div>

        <div className="grid grid-cols-2 gap-5">

          {/* Fiori loop */}
          <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.22)" }}>
            <p className="text-purple-300 font-mono font-bold text-xl mb-1">/fiori-loop</p>
            {[
              { step: "1", label: "/fiori",                desc: "Generate Fiori TSX — KB + SAP rules baked in" },
              { step: "2", label: "/fiori-design-review",  desc: "Library compliance — imports, tokens, components" },
              { step: "3", label: "/fiori-expert-review",  desc: "15-point audit — auto-fix violations, write to KB" },
              { step: "4", label: "/evaluate-spacing",     desc: "Visual spacing audit on the rendered screenshot" },
              { step: "5", label: "Score ≥ 97 → done",    desc: "Score < 97 → regenerate, up to 3 rounds" },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex items-start gap-4 rounded-lg px-4 py-3" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
                <span className="text-purple-400/60 font-mono font-bold text-sm shrink-0 w-4 mt-0.5">{step}</span>
                <div>
                  <p className="text-white/80 font-semibold text-sm">{label}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
            <div className="rounded-lg px-4 py-3 mt-1" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
              <p className="text-purple-200 text-xs font-mono">violations → KB → next /fiori run learns</p>
            </div>
          </div>

          {/* DaVinci loop */}
          <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.25)" }}>
            <p className="text-purple-200 font-mono font-bold text-xl mb-1">/fiori-loop --taste</p>
            {[
              { step: "1", label: "/fiori --taste",              desc: "Generate with taste.md + generated-rules.md injected" },
              { step: "2", label: "/design-evaluation-loop",     desc: "Score all 6 dimensions — Clarity, Trust, Focus, Memorability, Reduction, Proactivity" },
              { step: "3", label: "/fiori-expert-review",        desc: "Same 15-point technical audit runs on top of the taste build" },
              { step: "4", label: "/evaluate-spacing",           desc: "Same visual spacing audit — taste doesn't exempt you from spacing" },
              { step: "5", label: "ICONIC POTENTIAL → done",     desc: "PASS·GENERIC → loop again with failing dimension as constraint" },
            ].map(({ step, label, desc }) => (
              <div key={step} className="flex items-start gap-4 rounded-lg px-4 py-3" style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.15)" }}>
                <span className="text-purple-400/60 font-mono font-bold text-sm shrink-0 w-4 mt-0.5">{step}</span>
                <div>
                  <p className="text-white/80 font-semibold text-sm">{label}</p>
                  <p className="text-white/40 text-xs mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
            <div className="rounded-lg px-4 py-3 mt-1" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <p className="text-purple-100 text-xs font-mono">low scores → generated-rules.md → next --taste run learns</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl px-6 py-4 flex items-center gap-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-lg shrink-0">→</span>
          <p className="text-white/45 text-sm">
            /fiori-loop catches <span className="text-white/65 font-semibold">technical violations</span>. /fiori-loop --taste catches <span className="text-white/65 font-semibold">taste violations</span> on top — wrong principle expressed, no signature moment, no named emotion. The wiring is the same. The judgment layer is different.
          </p>
        </div>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "DV09",
    content: (
      <div className="flex flex-col justify-center h-full gap-7 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">Live example</p>
          <SlideTitle>Same prompt. Three completely different designs.</SlideTitle>
          <p className="text-white/85 text-base mt-1">Prompt: &ldquo;SAP Ariba purchase order approval&rdquo;</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            {[
              { slug: "sap-ariba-purchase-order-approval-taste",       label: "taste only",    tag: "text-amber-300",  color: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.22)",  href: "https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505" },
              { slug: "sap-ariba-purchase-order-approval",             label: "/fiori",         tag: "text-blue-300",   color: "rgba(59,130,246,0.07)",  border: "rgba(59,130,246,0.22)",  href: "https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505" },
              { slug: "sap-ariba-purchase-order-approval-fiori-taste", label: "/fiori --taste", tag: "text-purple-300", color: "rgba(168,85,247,0.07)",  border: "rgba(168,85,247,0.22)",  href: "https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505" },
            ].map(({ label, tag, color, border, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex-1 rounded-xl px-5 py-4 flex items-center gap-3 transition-opacity hover:opacity-70"
                style={{ background: color, border: `1px solid ${border}` }}
              >
                <span className={`font-mono font-bold text-sm ${tag}`}>{label}</span>
                <span className="text-white/85 ml-auto text-sm">↗</span>
              </a>
            ))}
          </div>
          <a href="https://davinci.cfapps.eu12.hana.ondemand.com/fiori-demo/0505-2" target="_blank" rel="noopener noreferrer"
            className="rounded-xl px-6 py-4 flex items-center gap-3 transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span className="text-white/85 text-sm">View all 5 comparisons →</span>
            <span className="text-white/55 ml-auto text-sm font-mono">davinci.cfapps.eu12.hana.ondemand.com</span>
          </a>
        </div>
        <div className="rounded-xl px-6 py-4" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)" }}>
          <p className="text-white/85 text-sm leading-relaxed">
            Registry has 5 comparisons: employee org chart · Ariba software purchase · SAP Build Work Zone · Concur 2028 · Ariba PO approval. Each one reveals where taste alone diverges from structure alone — and where <span className="text-purple-300">/fiori --taste</span> finds something neither could reach alone.
          </p>
        </div>
      </div>
    ),
  },

  // ── DaVinci: What the comparison teaches ─────────────────────────────────
  {
    phase: "Closing",
    id: "DV10",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">What we learned</p>
          <SlideTitle>Taste + structure is not additive. It&apos;s multiplicative.</SlideTitle>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.22)" }}>
            <p className="text-amber-300 font-semibold text-base mb-2">Taste only</p>
            <p className="text-white/80 text-lg leading-relaxed">Visually distinctive. Sometimes emotionally resonant. But no guardrails — can drift into unusable. No system trust. No familiarity for SAP users.</p>
          </div>
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.22)" }}>
            <p className="text-blue-300 font-semibold text-base mb-2">/fiori only</p>
            <p className="text-white/80 text-lg leading-relaxed">Correct. Complete. Conventional. A competent implementation a Fiori developer would be proud of — and a stakeholder would immediately forget.</p>
          </div>
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(168,85,247,0.09)", border: "1px solid rgba(168,85,247,0.3)" }}>
            <p className="text-purple-300 font-semibold text-base mb-2">/fiori --taste</p>
            <p className="text-white/85 text-lg leading-relaxed font-medium">The structure gives it trust. The taste gives it a moment. Together — something a stakeholder stops scrolling for, that still runs in SAP&apos;s production system.</p>
          </div>
        </div>
      </div>
    ),
  },

  // ── DaVinci: Can taste be automated? ─────────────────────────────────────
  {
    phase: "Closing",
    id: "DV11",
    content: (
      <div className="flex flex-col justify-center h-full gap-8 max-w-4xl">
        <div>
          <p className="text-white/85 text-sm font-semibold uppercase tracking-widest mb-3">The original question</p>
          <SlideTitle>Can taste be automated to 90% consistent ICONIC verdicts?</SlideTitle>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-white/85 text-xs uppercase tracking-widest mb-3">What we&apos;ve proven</p>
            <div className="flex flex-col gap-3">
              {[
                "7 named principles can be encoded and injected at build time",
                "Three-way parallel isolation surfaces real differences, not noise",
                "Fiori + taste produces outputs neither path reaches alone",
                "The scoring → rules → build loop is architecturally correct (gap identified, fix known)",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold text-base shrink-0">✓</span>
                  <p className="text-white/85 text-lg">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl px-8 py-6" style={{ background: "rgba(168,85,247,0.09)", border: "1px solid rgba(168,85,247,0.3)" }}>
            <p className="text-purple-300 font-semibold text-lg leading-relaxed">
              Not yet at 90%. But the system knows its own gap — and that gap has a fix. Automating taste isn&apos;t about removing judgment. It&apos;s about making the 80% consistent so judgment can focus on the 20% that actually matters.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ── Q&A: Korean Company Questions ─────────────────────────────────────────
  {
    phase: "Closing",
    id: "QA01",
    content: (
      <div className="flex flex-col justify-center h-full gap-10 max-w-4xl">
        <p className="text-white/55 text-sm font-semibold uppercase tracking-widest">Q1 / 4</p>
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            Design System 학습 → Production High-fi까지, 무엇이 막혀 있는가?
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            자체 어크로스비 Design System을 AI가 충분히 학습해서 Production 수준의 High-fi를 자동으로 생성할 수 있으려면 — 지금 어디서 막히고, 무엇이 풀려야 하는가.
          </p>
          <p className="text-white/35 text-sm italic">(§1.5 실험과 연결되어있습니다.)</p>
        </div>
        <div className="flex flex-col gap-4" style={{ borderLeft: "2px solid rgba(255,255,255,0.12)", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">문제 1 — 컴포넌트 정확도</p>
            <p className="text-white/85 text-base leading-relaxed">
              AI는 처음부터 어크로스비 DS를 알지 못합니다. 해결책은 틀릴 때마다 KB에 기록하고, 다음 생성에 반영하는 루프입니다. FioriWeb의 KB는 빈 파일로 시작해서 지금은 수백 개의 실제 위반 패턴이 쌓여 있습니다. <span className="text-white/65">생성할수록 정확도가 올라가는 구조입니다. 이 문제는 시간이 해결합니다.</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">문제 2 — 구성과 위계</p>
            <p className="text-white/85 text-base leading-relaxed">
              컴포넌트가 맞아도 화면이 평평하게 나오는 건 다른 문제입니다. AI가 &ldquo;이 화면이 누구를 위한, 무엇을 위한 화면인가&rdquo;를 모르면 가장 평균적인 답을 냅니다. FioriWeb에서는 코드를 쓰기 전에 Role과 Primary Action을 반드시 정의하게 강제했고, 이 한 가지가 품질을 가장 크게 바꿨습니다.
            </p>
          </div>
          <div className="rounded-xl p-4 mt-1" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.20)" }}>
            <p className="text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-1">어크로스비 팀에 드리는 제안</p>
            <p className="text-white/80 text-sm leading-relaxed">
              지금 당장 Design.md에 컴포넌트 규칙을 추가하는 것보다, 생성 전에 &ldquo;이 화면은 누구를 위한 화면인가, 가장 중요한 행동 하나는 무엇인가&rdquo;를 강제하는 한 줄을 먼저 넣으세요. 그리고 틀린 결과가 나올 때마다 버리지 말고 KB에 기록하세요. 그 두 가지가 출발점입니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "QA02",
    content: (
      <div className="flex flex-col justify-center h-full gap-10 max-w-4xl">
        <p className="text-white/55 text-sm font-semibold uppercase tracking-widest">Q2 / 4</p>
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            PM이 프로토타입을 들고 오기 시작했을 때, 디자이너가 더 얹어야 할 가치는?
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            AI 덕분에 PM이 하룻밤 만에 프로토타입을 만들 수 있게 됐다. 디자이너의 역할이 어떻게 달라져야 하는가 — 그리고 무엇을 더 얹어야 하는가.
          </p>
          <p className="text-white/35 text-sm italic">(David 님 LinkedIn 글에서 다루신 주제라 더 궁금합니다!)</p>
        </div>
        <div className="flex flex-col gap-4" style={{ borderLeft: "2px solid rgba(255,255,255,0.12)", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">달라진 건 속도가 아니라 기대치입니다</p>
            <p className="text-white/85 text-base leading-relaxed">
              PM이 항상 뭔가를 가져왔습니다. 그건 새롭지 않습니다. 달라진 건 하룻밤 만에 완성도 있어 보이는 결과물이 온다는 겁니다. 문제는 완성도 있어 보인다는 것과 검증됐다는 것이 다르다는 겁니다. <span className="text-white/65">더 완성도 있어 보일수록 질문하기 더 어려워집니다.</span>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">PM이 아낀 일주일이 디자이너의 일주일이 됩니다</p>
            <p className="text-white/85 text-base leading-relaxed">
              PM이 프로토타입을 가져올 때 첫 번째 질문은 하나입니다 — 검증됐나요? Yes면 그 위에서 작업합니다. No면 돌려보냅니다. 시간이 없다면 UX가 검증을 맡습니다.
            </p>
          </div>
          <div className="rounded-xl p-4 mt-1" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.20)" }}>
            <p className="text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-1">어크로스비 팀에 드리는 제안</p>
            <p className="text-white/80 text-sm leading-relaxed">
              농구로 설명하겠습니다. 요키치는 센터인데 포인트가드처럼 뜁니다. 드레이먼드는 파워포워드인데 팀을 운영합니다. 아무도 포지션을 얘기하지 않습니다 — 뭘 할 수 있는지를 얘기합니다.
            </p>
            <p className="text-white/80 text-sm leading-relaxed mt-2">
              저도 지금 SAP에서 PM으로 전향 제의를 받고 있습니다. 제 답은 이겁니다 — "당신은 PM이니 이걸, 나는 디자이너니 저걸"이 아니라, 팀 안에서 역량을 어떻게 배분하면 가장 좋은 제품이 나오는지 먼저 설계하고 시작하는 것. 리서치, 마이크로 인터랙션, 시스템 디자인, 컨버세이션 디자인 — 아직 할 일은 무수히 많습니다. 역할이 아니라 역량을 먼저 보세요.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "QA03",
    content: (
      <div className="flex flex-col justify-center h-full gap-10 max-w-4xl">
        <p className="text-white/55 text-sm font-semibold uppercase tracking-widest">Q3 / 4</p>
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            AI 활용을 개인 생산성에서 팀 협업 표준으로 — 무엇을 강제하고 무엇을 자유에 맡기는가?
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            팀 전체가 AI를 쓰기 시작할 때, 어떤 것은 표준화하고 어떤 것은 개인 판단에 맡겨야 하는가. 그 경계를 어떻게 설계하는가.
          </p>
        </div>
        <div className="flex flex-col gap-4" style={{ borderLeft: "2px solid rgba(255,255,255,0.12)", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">표준화할 것</p>
            <p className="text-white/85 text-base leading-relaxed">
              AI 결과물의 품질 기준, 검토·승인 프로세스, 고객 데이터 취급 원칙. 원칙(taste.md), 평가 기준, 피드백 루프(KB 자동 업데이트). KB와 SKILL.md는 팀 공유 — 한 사람이 발견한 실수가 전체의 규칙이 됩니다. 플로어플랜 선택 기준, Primary Action rule, 토큰 규칙은 강제합니다.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">자유에 맡길 것</p>
            <p className="text-white/85 text-base leading-relaxed">
              프롬프트 방식, 도구 선택, 개인 워크플로우. 각 디자이너가 원칙을 어떻게 표현하는가 — 서명 순간, 제거할 요소, 감정의 이름. 몇 라운드 돌릴지, 언제 HITL로 넘길지는 개인 판단입니다.
            </p>
          </div>
          <div className="rounded-xl p-4 mt-1" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.20)" }}>
            <p className="text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-1">원칙</p>
            <p className="text-white/80 text-sm leading-relaxed">
              품질의 출력은 통제하되, 창의적 과정은 열어둔다. 시스템이 판단의 기준을 잡고, 사람이 판단 자체를 한다. 규칙은 공유하되, 생성 방식은 강요하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "QA04",
    content: (
      <div className="flex flex-col justify-center h-full gap-10 max-w-4xl">
        <p className="text-white/55 text-sm font-semibold uppercase tracking-widest">Q4 / 5</p>
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            &apos;좋은 디자인&apos;을 AI에게 어떻게 정의하고 가르치는가?
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            규칙 정의 / 예시 학습 / Scoring — 어떤 접근이 효과적이었는지, 어떤 순서로 시도하면 좋은지.
          </p>
        </div>
        <div className="flex flex-col gap-4" style={{ borderLeft: "2px solid rgba(255,255,255,0.12)", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">1. 규칙 — pass/fail 기준부터</p>
            <p className="text-white/85 text-base leading-relaxed">
              가이드라인이 아닙니다. "화면당 지배적 계층은 하나." "색상은 강조에만, 구조에는 절대 쓰지 않습니다." visual-execution.md에 하드 게이트로 명문화합니다. 규칙은 빠르고 일관성이 높으며, 명백한 실패를 가장 먼저 잡아냅니다. 하지만 규칙만으로는 맞지만 기억에 남지 않는 결과물이 나옵니다.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">2. 예시 — 기준을 비교 가능한 것으로</p>
            <p className="text-white/85 text-base leading-relaxed">
              Shazam, Linear, Stripe, Loom — 실제 제품의 관찰 가능한 순간들을 taste.md에 anchor로 박아둡니다. AI가 Memorability를 평가할 때 "기억에 남는가?"를 묻지 않습니다. "Linear 커맨드 팔레트처럼 이름 붙일 수 있는 감정을 만드는가?"를 묻습니다. 예시가 기준을 주관적인 것에서 비교 가능한 것으로 끌어올립니다.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">3. Scoring — 루프를 닫는다</p>
            <p className="text-white/85 text-base leading-relaxed">
              매 빌드 후 6개 차원을 평가합니다. 점수가 낮으면 이유를 추출합니다 — "Memorability: 3"이 아니라 "사용자가 누군가에게 설명할 만한 순간이 없습니다 — 확인이 제스처가 아니라 토스트 메시지입니다." 그것이 규칙이 됩니다. 점수가 결과물이 아닙니다. 점수가 만들어내는 규칙이 결과물입니다.
            </p>
          </div>
          <div className="rounded-xl p-4 mt-1" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.20)" }}>
            <p className="text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-1">순서가 중요합니다</p>
            <p className="text-white/80 text-sm leading-relaxed">
              규칙 → 예시 → Scoring. 규칙이 없으면 예시가 떠돌고, 예시가 없으면 scoring의 calibration이 없으며, scoring이 없으면 규칙도 예시도 축적되지 않습니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    phase: "Closing",
    id: "QA05",
    content: (
      <div className="flex flex-col justify-center h-full gap-10 max-w-4xl">
        <p className="text-white/55 text-sm font-semibold uppercase tracking-widest">Q5 / 5</p>
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            Production High-fi 자동 생성 — Claude Design / Claude Code / Cursor 중 무엇이 맞는가?
          </h2>
        </div>
        <div className="flex flex-col gap-4" style={{ borderLeft: "2px solid rgba(255,255,255,0.12)", paddingLeft: "1.25rem" }}>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">먼저 — Claude Design은 별도로</p>
            <p className="text-white/85 text-base leading-relaxed">
              진입 장벽이 낮고 쓰기 쉽습니다. 하지만 유연성과 확장성이 낮습니다. 빠른 탐색에는 유효하지만, Production까지 가기엔 한계가 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white/55 text-xs uppercase tracking-widest font-semibold">Cursor vs. Claude Code — 실제로 하는 일은 같습니다</p>
            <p className="text-white/85 text-base leading-relaxed">
              차이는 사고방식입니다. Cursor는 IDE 안에 있습니다. 코드가 화면에 보이기 때문에 자연스럽게 지금 파일을 먼저 생각하게 됩니다. Claude Code는 경계가 없습니다. 다른 레포를 호출하고, 다른 빌드를 참조하고, 다른 코드베이스에서 실행할 수 있습니다.
            </p>
          </div>
          <div className="rounded-xl p-4 mt-1" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.20)" }}>
            <p className="text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-1">제가 Claude Code를 선택한 이유</p>
            <p className="text-white/80 text-sm leading-relaxed">
              ChatGPT → Cursor → Claude Code 순으로 왔습니다. Global skills, local skills, 레포 간 자유로운 이동 — 이 구조가 디자인 시스템 규모의 작업에 맞습니다. Cursor가 빠르게 따라오고 있지만, IDE의 시각적 컨텍스트가 오히려 사고를 파일 단위로 가두는 느낌이 있습니다. Claude Code는 생각이 먼저, 코드가 나중입니다.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  // ── Thank You ──────────────────────────────────────────────────────────────
  {
    phase: "Closing",
    id: "C17",
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-10">
        <p className="text-7xl font-black text-white">Thank you.</p>
        <p className="text-white/75 text-xl leading-relaxed max-w-2xl">
          오늘 대화가 정말 많은 생각을 하게 해주었습니다.<br/>
          여러분 팀이 이미 이 분야에서 많이 앞서 있어서, 저도 평소보다 훨씬 더 꼼꼼하게 준비했습니다.<br/>
          그만큼 대단한 팀이라고 생각합니다. 진심으로 응원합니다!
        </p>
        <div className="mt-2 flex items-center gap-4">
          <a
            href="mailto:david.lee09@sap.com"
            className="text-2xl font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#60a5fa" }}
          >
            david.lee09@sap.com
          </a>
        </div>
      </div>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AITalkSlide() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((c) => Math.min(Math.max(c + dir, 0), total - 1));
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const slide = slides[current];
  const phase = PHASES[slide.phase];

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#080810", fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <Link
          href="/talks"
          className="text-white/88 hover:text-white/75 text-sm transition-colors"
        >
          ← Back
        </Link>
        <span className="text-white/85 text-sm font-mono">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Slide content */}
      <div className="absolute inset-0 flex items-center justify-center px-16 pt-16 pb-20">
        <div className="w-full max-w-6xl h-full max-h-[80vh] overflow-hidden">
          {slide.content}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <button
          onClick={() => go(-1)}
          disabled={current === 0}
          className="text-white/88 hover:text-white/75 disabled:opacity-10 text-sm transition-colors"
        >
          ← Prev
        </button>

        {/* Progress bar */}
        <div className="flex-1 mx-12 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${((current + 1) / total) * 100}%`,
              background: "rgba(255,255,255,0.4)",
            }}
          />
        </div>

        <button
          onClick={() => go(1)}
          disabled={current === total - 1}
          className="text-white/88 hover:text-white/75 disabled:opacity-10 text-sm transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
