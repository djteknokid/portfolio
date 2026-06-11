"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const T = {
  obsidian: "#000d10",
  white:    "#ffffff",
  stone:    "#8e8e95",
  sienna:   "#bc7155",
  cream:    "#F7F2EA",
  ghost:    "rgba(0,0,0,0.045)",
};

const slides = [
  { id: 1, type: "hero" },
  { id: 2, type: "outline" },
  { id: 3, type: "cleanoutline" },
  { id: 4, type: "statement" },
  { id: 5, type: "chapter" },
  { id: 6, type: "content" },
];

export default function KoreaTalk() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setCurrent(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrent(i => Math.min(total - 1, i + 1)), [total]);

  /* Keyboard navigation */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")                    { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* Hide hint after 3 s */
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: T.obsidian,
        display: "flex",
        alignItems: "stretch",
        fontFamily: "system-ui, -apple-system, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Left click zone (prev) ── */}
      <div
        onClick={prev}
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "12%",
          zIndex: 10,
          cursor: current === 0 ? "default" : "w-resize",
        }}
      />

      {/* ── Right click zone (next) ── */}
      <div
        onClick={next}
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: "12%",
          zIndex: 10,
          cursor: current === total - 1 ? "default" : "e-resize",
        }}
      />

      {/* ── Slide ── */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {slides[current].type === "hero"         && <HeroSlide        total={total} index={current} />}
        {slides[current].type === "outline"      && <OutlineSlide     total={total} index={current} />}
        {slides[current].type === "cleanoutline" && <CleanOutlineSlide total={total} index={current} />}
        {slides[current].type === "statement"    && <StatementSlide   total={total} index={current} />}
        {slides[current].type === "chapter"      && <ChapterSlide     total={total} index={current} />}
        {slides[current].type === "content"      && <ContentSlide     total={total} index={current} />}
      </div>

      {/* ── Fullscreen button ── */}
      <button
        onClick={toggleFullscreen}
        title="Toggle fullscreen (F)"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 20,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: T.stone,
          width: "36px",
          height: "36px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          borderRadius: "4px",
          transition: "opacity 0.2s",
        }}
      >
        ⤢
      </button>

      {/* ── Keyboard hint ── */}
      <div style={{
        position: "absolute",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: T.stone,
        opacity: showHint ? 0.6 : 0,
        transition: "opacity 0.6s ease",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        ← → arrow keys · F fullscreen
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SLIDE 1 — Hero
───────────────────────────────────────── */
function HeroSlide({ total, index }: SlideProps) {
  return (
    <div style={{ ...fill, background: T.obsidian }}>
      <div aria-hidden style={{
        position: "absolute",
        right: "-2%",
        bottom: "-8%",
        fontSize: "clamp(280px, 38vw, 640px)",
        fontWeight: 900,
        lineHeight: 1,
        color: "rgba(255,255,255,0.025)",
        userSelect: "none",
        pointerEvents: "none",
        letterSpacing: "-12px",
      }}>
        →
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "7vh 8vw" }}>
        <Tag color={T.sienna}>Korea Tour · 2026</Tag>
        <h1 style={{
          fontSize: "clamp(64px, 10vw, 160px)",
          fontWeight: 700,
          lineHeight: 0.88,
          letterSpacing: "-0.03em",
          color: T.white,
          marginTop: "3vh",
          marginBottom: "4vh",
        }}>
          The<br />Coordination<br />Era
        </h1>
        <p style={{
          fontSize: "clamp(14px, 1.8vw, 22px)",
          fontWeight: 400,
          lineHeight: 1.6,
          color: T.stone,
          maxWidth: "44vw",
          marginBottom: "4vh",
        }}>
          조율의 시대
        </p>

        <Link href="/ktalk/manuscript" style={{
          display: "inline-block",
          border: `1px solid rgba(255,255,255,0.18)`,
          color: T.stone,
          fontFamily: "system-ui, sans-serif",
          fontSize: "clamp(9px, 0.9vw, 12px)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "8px 20px",
          borderRadius: "1000px",
          textDecoration: "none",
          transition: "border-color 0.2s, color 0.2s",
        }}>
          Read Manuscript →
        </Link>
      </div>

      <div style={{
        position: "absolute",
        bottom: "7vh",
        left: "8vw",
        fontSize: "clamp(10px, 1vw, 13px)",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: T.stone,
      }}>
        David Lee
      </div>

      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SLIDE 3 — Clean Outline
   Dark bg. Two columns. Scannable.
───────────────────────────────────────── */
function CleanOutlineSlide({ total, index }: SlideProps) {
  const acts = [
    {
      time: "90 sec",
      label: "Intro",
      title: "Track Record",
      items: [
        "2024: One-man skit — Designer in 2027",
        "2025: Live demo — hadn't opened Figma in a year",
        "Now: PM — followed the bottleneck",
        "Google NBU → Google AI Labs → SAP",
      ],
    },
    {
      time: "4 min",
      label: "Opening",
      title: "The Shock",
      items: [
        "PM walks in with a finished prototype",
        "\"So what am I here for?\"",
        "Designers = #1 AI-exposed occupation",
        "PM hiring ↑  Designer hiring ↓",
      ],
    },
    {
      time: "10 min",
      label: "Act 1",
      title: "Why This Is Happening",
      items: [
        "Nothing new — PM always brought visuals",
        "What changed: Speed + Fidelity",
        "PM intention didn't change. The signal did.",
        "→ Open conversation with room",
      ],
    },
    {
      time: "15 min",
      label: "Act 2",
      title: "The Role Is Crumbling. Your Value Isn't.",
      items: [
        "Jokic — positionless sports analogy",
        "NBA + EPL: capability sets expanded",
        "Not replaced by AI. Exposed by it.",
        "AI removed the execution bottleneck.",
        "Coordination bottleneck still wide open.",
        "Wave 1: Individual → Wave 2: Collective",
      ],
    },
    {
      time: "7 min",
      label: "Close",
      title: "The Coordination Era",
      items: [
        "SAP: teams could execute, couldn't align",
        "More output. More collision. Less clarity.",
        "The bottleneck moved. Did you?",
        "1. Increase Communication Bandwidth",
        "2. Become Cross-Functionally Fluent",
        "3. Build Alignment Systems",
      ],
    },
  ];

  return (
    <div style={{ ...fill, background: T.obsidian, overflowY: "auto" }}>
      <div style={{ padding: "5vh 6vw 8vh" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4vh" }}>
          <div>
            <Tag color={T.sienna}>Talk Outline</Tag>
            <h1 style={{
              fontSize: "clamp(22px, 3vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: T.white,
              lineHeight: 1,
              marginTop: "1vh",
            }}>
              The Coordination Era
              <span style={{ color: T.sienna, marginLeft: "0.4em" }}>조율의 시대</span>
            </h1>
          </div>
          <div style={{
            fontSize: "clamp(10px, 1vw, 13px)",
            color: T.stone,
            textAlign: "right",
            lineHeight: 1.6,
          }}>
            45 min talk<br />30 min Q&A
          </div>
        </div>

        {/* Big idea bar */}
        <div style={{
          background: "rgba(188,113,85,0.12)",
          borderLeft: `3px solid ${T.sienna}`,
          padding: "2vh 2vw",
          marginBottom: "4vh",
        }}>
          <p style={{
            fontSize: "clamp(11px, 1.2vw, 15px)",
            color: T.sienna,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}>
            The Big Idea
          </p>
          <p style={{
            fontSize: "clamp(12px, 1.4vw, 18px)",
            color: T.white,
            lineHeight: 1.5,
          }}>
            AI removed the execution bottleneck. The coordination bottleneck is still wide open.
          </p>
        </div>

        {/* Acts grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1.5vw",
        }}>
          {acts.map((act, i) => (
            <div key={i} style={{
              borderTop: `2px solid ${i === 4 ? T.sienna : "rgba(255,255,255,0.1)"}`,
              paddingTop: "2vh",
            }}>
              <div style={{
                fontSize: "clamp(8px, 0.8vw, 10px)",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: T.sienna,
                marginBottom: "4px",
              }}>
                {act.label} · {act.time}
              </div>
              <div style={{
                fontSize: "clamp(11px, 1.1vw, 14px)",
                fontWeight: 700,
                color: T.white,
                lineHeight: 1.2,
                marginBottom: "1.5vh",
              }}>
                {act.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {act.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "3px", height: "3px",
                      borderRadius: "50%",
                      background: T.sienna,
                      flexShrink: 0,
                      marginTop: "0.5em",
                      opacity: 0.7,
                    }} />
                    <p style={{
                      fontSize: "clamp(9px, 0.9vw, 12px)",
                      color: T.stone,
                      lineHeight: 1.55,
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SLIDE 4 — Outline (scrollable document)
───────────────────────────────────────── */
function OutlineSlide({ total, index }: SlideProps) {
  const sections = [
    {
      tag: "Opening · 4 min",
      title: "The Shock",
      beats: [
        "Scene: A PM walks into a design review. Didn't ask for a wireframe. Didn't ask for a spec. Built it — high-fidelity, in code, ready to ship.",
        "The designer thinks: \"...so what am I here for?\"",
        "Chart 1 — Tufts University: Designers = #1 most AI-exposed occupation (score: 100)",
        "Chart 2 — Lenny's / Trueup: PM hiring up, designer hiring down — diverging since 2023",
        "\"이거… 우리 위험한 거 아닌가?\" — Are we actually in danger here?",
        "Don't answer yet. Sit in it.",
      ],
    },
    {
      tag: "Act 1 · 7 min",
      title: "Why This Is Happening",
      beats: [
        "The question everywhere: \"What does UX do when PM brings a high-fidelity prototype built in code?\"",
        "This is nothing new — PMs have always brought visual artifacts alongside the PRD. Sketches, wireframes, references. That has always happened.",
        "What's different now is two things only: Speed (instant, not days) and Fidelity (looks finished, not rough).",
        "The role boundary didn't disappear. It stopped being protected by tool friction.",
        "Turn: this was never a role question. It was always a value question — AI just removed the friction that hid it.",
      ],
    },
    {
      tag: "Act 1.5 · 3 min",
      title: "The Past",
      beats: [
        "PM used to bring low-fi mockup with the PRD — boxes, arrows, Balsamiq. Everyone knew the implicit contract.",
        "PM draws boxes → \"this is what I mean, not what I want it to look like.\" Designer takes it → \"I'll make this real.\"",
        "Low fidelity signaled humility. The artifact was never meant to be the design. Expectations were low on purpose.",
        "Has the expectation changed — or just our perception of it?",
        "PM expectation hasn't changed — the Claude Code output is still \"just a starting point\" in their mind.",
        "Designer perception has changed — the artifact looks finished, so the craft gap that said \"I need you\" looks closed.",
        "\"The PM's intention didn't change. The signal did.\"",
        "→ Open conversation: Tools changing. Process changing. Roles blurring. This is Silicon Valley right now. What should we do?",
      ],
    },
    {
      tag: "Act 2 · 10 min",
      title: "The Role Is Crumbling. Your Value Isn't.",
      beats: [
        "Beat 1 — Jokic / positionless sports: the best teams aren't role-rigid, they're strength-aware. Jokic isn't a center. He's just Jokic.",
        "Chart 1: NBA centers shooting 3-pointers 1985–2025. The role didn't disappear — it stopped being defined by position.",
        "Chart 2: EPL midfielders goal contribution 1995–2025. Midfielders used to set up goals. Now they score them. Same curve, different sport.",
        "Specialization → Hybridization: Old model — centers protect rim only, strikers score only, midfielders distribute only.",
        "Modern model — everyone attacks, defends, handles space, makes decisions, needs technical versatility.",
        "\"Systems increasingly maximize unique individual capabilities.\"",
        "Critical nuance: the modern NBA did NOT eliminate point guards, wings, or centers. It expanded the expected capability set of each.",
        "Who survived longest? Players who adapted before the environment fully changed. Brook Lopez added 3-point shooting. Al Horford adapted to the spacing era.",
        "It wasn't new generation replacing old. It was adaptable players surviving landscape shifts.",
        "\"The AI era is not eliminating roles. It is exposing one-dimensional specialists — the same way analytics exposed one-dimensional athletes.\"",
        "The PM who only writes PRDs. The designer who only makes Figma screens. The engineer who only implements specs. Not replaced by AI. Exposed by it.",
        "Table: Basketball — digital analytics → positionless play. Soccer — spatial analytics → fluid positional football. UX/PM — AI → hybrid PM/UX/Eng roles.",
        "In sports it was data. In product it's AI. Same shift, same result.",
        "Evidence — already happening now: 1. UX is building more internal tools — dashboards, systems, workflows, not just product screens.",
        "2. UX contribution measured by influence, not just features shipped — internal tools, shared process, scalable systems. AI handles execution; leverage shifts to enabling.",
        "3. When work is shared, Git repos are the artifact — not PDFs, not Figma files. If your contribution lives only in Figma, it's increasingly invisible.",
        "\"The designer's value is moving from execution to influence — from making the thing to shaping how the team makes things.\"",
        "Beat 3 — The Big Idea: AI removed the execution bottleneck faster than organizations removed the coordination bottleneck.",
        "You can prototype in days. But orgs still move at meeting speed, approval speed, stakeholder alignment speed, trust speed.",
        "Pre-AI constraint: execution capacity. Post-AI constraint: alignment capacity. The limiting factor is no longer production — it's synchronization.",
        "This explains everything: why startups feel faster, why enterprise feels slower, why roles blur, why communication becomes strategic.",
        "\"The future of product teams isn't better roles. It's teams that recompose around the problem faster than the problem changes.\"",
        "Stop asking \"what should UX do?\" Start asking \"what do I do better than anyone else on my team?\"",
        "Beat 2 — The Confession: super complex dataset. Executive-ready output in two days. But I couldn't defend every conclusion.",
        "AI lets you move faster than you can fully absorb. The gap shows when someone probes deeper.",
        "Own three things: the recommendation · the reasoning · the risk. Present everything else transparently.",
        "\"AI can accelerate analysis. But ownership still belongs to humans.\"",
        "The three durable skills: Strategic Thinking · User & Industry Understanding · Taste",
      ],
    },
    {
      tag: "Act 3 · 11 min",
      title: "My Three Reinventions",
      beats: [
        "Move 1 — The Prototyper: named the identity before the skills. Brand → Google (first job).",
        "Move 2 — The AI Product Developer: public bet before I was ready. 2027 theatre. \"Figma is dead.\" → Google Labs.",
        "Move 3 — Designer → PM: not fleeing design. Moving toward ownership of what to build.",
        "Deciding what to build is one of the most important skills in product — and UX is usually excluded from it.",
        "Pattern: each reinvention was a bet on what wouldn't change, made before the market demanded it.",
      ],
    },
    {
      tag: "Close · 5 min",
      title: "The Next Chapter Is Yours to Write",
      beats: [
        "Return to the opening. The PM with the prototype. The designer thinking \"what am I here for?\"",
        "Reframe: that moment was the execution bottleneck disappearing in real time — leaving the coordination bottleneck exposed.",
        "Counter-narrative: everyone says AI = solo unicorns, one-person startups, 10x engineers, AI replaces teams.",
        "The opposite observation: the more powerful AI gets, the more important the team becomes.",
        "Evidence — you can build everything solo. Yet you moved into PM. Toward alignment, decisions, customers, orchestration. That's not an accident.",
        "Wave 1 — Individual Leverage: how can one person do the work of ten? (where we are now)",
        "Wave 2 — Collective Leverage: how can ten people operate like one highly aligned intelligence? (where it's going)",
        "Key takeaway: Post-AI, the constraint is alignment capacity, not execution capacity.",
        "1. Increase Communication Bandwidth — share thinking, not just deliverables.",
        "2. Become Cross-Functionally Fluent — reduce translation friction at every handoff.",
        "3. Build Alignment Systems — tools and workflows that help teams decide and adapt faster.",
        "\"The execution bottleneck is gone. The coordination bottleneck is wide open. What chapter are you writing next?\"",
      ],
    },
  ];

  return (
    <div style={{
      ...fill,
      background: T.white,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }}>
      <div style={{ padding: "6vh 8vw 12vh" }}>

        {/* Header */}
        <Tag color={T.sienna}>Talk Outline · v2.0</Tag>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 56px)",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.025em",
          color: T.obsidian,
          marginTop: "2vh",
          marginBottom: "1vh",
        }}>
          The Next Chapter
        </h1>
        <p style={{
          fontSize: "clamp(12px, 1.3vw, 17px)",
          color: T.stone,
          marginBottom: "4vh",
          lineHeight: 1.5,
        }}>
          The role is crumbling. Your value isn't.
          <span style={{ margin: "0 10px", opacity: 0.3 }}>·</span>
          Big idea: AI removed execution bottleneck. Coordination bottleneck still wide open.
          <span style={{ margin: "0 10px", opacity: 0.3 }}>·</span>
          45 min talk · 30 min Q&A
          <span style={{ margin: "0 10px", opacity: 0.3 }}>·</span>
          ~30 slides
        </p>

        <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", marginBottom: "4vh" }} />

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4vh" }}>
          {sections.map((s, si) => (
            <div key={si}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1.5vh" }}>
                <span style={{
                  fontSize: "clamp(9px, 0.85vw, 11px)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: T.sienna,
                  whiteSpace: "nowrap",
                }}>
                  {s.tag}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.07)" }} />
              </div>
              <h2 style={{
                fontSize: "clamp(16px, 2vw, 26px)",
                fontWeight: 700,
                letterSpacing: "-0.015em",
                color: T.obsidian,
                marginBottom: "1.2vh",
                lineHeight: 1.1,
              }}>
                {s.title}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {s.beats.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "4px", height: "4px",
                      borderRadius: "50%",
                      background: T.sienna,
                      flexShrink: 0,
                      marginTop: "0.6em",
                      opacity: 0.65,
                    }} />
                    <p style={{
                      fontSize: "clamp(11px, 1.2vw, 15px)",
                      lineHeight: 1.65,
                      color: b.startsWith('"') ? T.obsidian : T.stone,
                      fontStyle: b.startsWith('"') ? "italic" : "normal",
                    }}>
                      {b}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Timing */}
        <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", margin: "5vh 0 3vh" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", maxWidth: "380px", rowGap: 0 }}>
          {[
            ["Opening — The Shock", "4 min"],
            ["Act 1 — Why This Is Happening", "7 min"],
            ["Act 1.5 — The Past", "3 min"],
            ["Act 2 — Role Crumbling / Value Isn't", "10 min"],
            ["Act 3 — Three Reinventions", "11 min"],
            ["Close", "5 min"],
            ["Buffer", "5 min"],
          ].map(([label, time], i) => (
            <>
              <div key={`l${i}`} style={{
                padding: "7px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                fontSize: "clamp(11px, 1vw, 13px)",
                color: i === 5 ? T.stone : T.obsidian,
              }}>
                {label}
              </div>
              <div key={`t${i}`} style={{
                padding: "7px 0",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                fontSize: "clamp(11px, 1vw, 13px)",
                color: T.sienna,
                fontWeight: 700,
                textAlign: "right",
              }}>
                {time}
              </div>
            </>
          ))}
        </div>

      </div>
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SLIDE 3 — Statement
───────────────────────────────────────── */
function StatementSlide({ total, index }: SlideProps) {
  return (
    <div style={{ ...fill, background: T.white }}>
      <div style={{ padding: "8vh 8vw", display: "flex", flexDirection: "column", height: "100%" }}>
        <Tag color={T.sienna}>The Shift</Tag>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <h2 style={{
            fontSize: "clamp(36px, 5.5vw, 88px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: T.obsidian,
            maxWidth: "80vw",
          }}>
            The tools changed.<br />
            The <span style={{ color: T.sienna }}>craft</span> is still yours.
          </h2>
        </div>
      </div>
      <SlideNumber index={index} />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SLIDE 4 — Chapter Divider
───────────────────────────────────────── */
function ChapterSlide({ total, index }: SlideProps) {
  return (
    <div style={{ ...fill, background: T.cream }}>
      <div aria-hidden style={{
        position: "absolute",
        bottom: "-6%",
        left: "-1%",
        fontSize: "clamp(200px, 32vw, 500px)",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "-12px",
        color: T.ghost,
        userSelect: "none",
        pointerEvents: "none",
      }}>
        1
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "8vh 8vw" }}>
        <Tag color={T.sienna}>Part One</Tag>
        <h2 style={{
          fontSize: "clamp(44px, 7vw, 110px)",
          fontWeight: 700,
          lineHeight: 0.93,
          letterSpacing: "-0.025em",
          color: T.obsidian,
          marginTop: "3vh",
          maxWidth: "60vw",
        }}>
          Who you were<br />as a designer
        </h2>
        <p style={{
          marginTop: "4vh",
          fontSize: "clamp(13px, 1.6vw, 22px)",
          lineHeight: 1.7,
          color: T.stone,
          maxWidth: "38vw",
        }}>
          Craft, instinct, and the mental models<br />you built before AI entered the room.
        </p>
      </div>

      <SlideNumber index={index} />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ─────────────────────────────────────────
   SLIDE 5 — Content
───────────────────────────────────────── */
function ContentSlide({ total, index }: SlideProps) {
  return (
    <div style={{ ...fill, background: T.white }}>
      <div style={{
        padding: "8vh 8vw",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "6vw",
        height: "100%",
        alignItems: "center",
      }}>
        <div>
          <Tag color={T.sienna}>The Question</Tag>
          <h3 style={{
            fontSize: "clamp(28px, 3.8vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: T.obsidian,
            marginTop: "3vh",
            marginBottom: "3vh",
          }}>
            What does a designer<br />actually own now?
          </h3>
          <p style={{
            fontSize: "clamp(13px, 1.5vw, 22px)",
            lineHeight: 1.75,
            color: T.stone,
            maxWidth: "38vw",
          }}>
            Not the output. Not the prompt.<br />
            The judgment of what good looks like —<br />
            and the courage to say when it doesn't.
          </p>
        </div>

        <div style={{ textAlign: "right", paddingRight: "2vw" }}>
          <div style={{
            fontSize: "clamp(56px, 9vw, 140px)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.035em",
            color: T.sienna,
          }}>
            ×10
          </div>
          <div style={{
            marginTop: "12px",
            fontSize: "clamp(10px, 1vw, 14px)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: T.stone,
            textTransform: "uppercase",
            lineHeight: 1.6,
          }}>
            faster output,<br />same designer judgment
          </div>
        </div>
      </div>

      <SlideNumber index={index} />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ── Primitives ── */

type SlideProps = { total: number; index: number };

const fill: React.CSSProperties = {
  position: "absolute",
  inset: 0,
};

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 16px",
      background: color,
      borderRadius: "1000px",
      fontSize: "clamp(9px, 0.9vw, 12px)",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: T.white,
      marginBottom: "1vh",
    }}>
      {children}
    </div>
  );
}

function SlideNumber({ index }: { index: number }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "5vh",
      left: "8vw",
      fontSize: "clamp(9px, 0.85vw, 11px)",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: T.stone,
    }}>
      0{index + 1}
    </div>
  );
}

function ProgressBar({ index, total }: { index: number; total: number }) {
  return (
    <div style={{
      position: "absolute",
      bottom: 0, left: 0,
      width: "100%",
      height: "3px",
      background: "rgba(0,0,0,0.08)",
    }}>
      <div style={{
        height: "100%",
        width: `${((index + 1) / total) * 100}%`,
        background: T.sienna,
        transition: "width 0.35s ease",
      }} />
    </div>
  );
}
