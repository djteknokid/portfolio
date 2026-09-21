"use client";

import { useState } from "react";

const tags = ["All", "Blog", "Past Projects", "Side Projects", "Creatives"];

type Entry = {
  title: string;
  date: string;
  tag: string;
  description: string;
  href: string;
  body: string;
};

const entries: Entry[] = [
  {
    title: "I Went From UX to PM. Now I See Where the Conflict Begins.",
    date: "Sep 2026",
    tag: "Blog",
    description: "It comes down to 3 things — and #1 is that no one is clear about what UX owns vs. what Product owns.",
    href: "/blog/ux-to-pm-conflict",
    body: "",
  },
  {
    title: "From UX to PM: what I had to unlearn",
    date: "Aug 2026",
    tag: "Blog",
    description: "Shipping is not a design problem. It took me two years to really believe that.",
    href: "#",
    body: `When I was a UX designer, I thought the job was to make the right thing. As a PM, I learned the job is to make the right thing ship.

Those sound similar. They aren't.

Design is about quality of the solution. PM is about quality of the decision — when to build, what to cut, what to delay, and how to get a team aligned around something none of them fully agree on.

The hardest thing to unlearn: that polish is progress. Sometimes a rougher thing that ships beats a perfect thing that doesn't. That took me longer than I'd like to admit.

What I kept from UX: the instinct to ask "what is the user actually trying to do here?" That question is just as useful in a roadmap review as in a design crit.`,
  },
  {
    title: "FDE AI Agent Platform",
    date: "2025–2026",
    tag: "Past Projects",
    description: "Built AI agents for enterprise workflows at SAP that generate measurable revenue.",
    href: "#",
    body: `The FDE (Field Design Engagement) AI Agent Platform is a system I helped conceive and ship at SAP — a set of AI agents deployed directly into enterprise client workflows.

These aren't internal tools or prototypes. They run in production for real clients, handling tasks that previously required manual intervention across complex enterprise systems.

The core challenge: enterprise clients have unique data models, compliance requirements, and user behaviors. Generic AI doesn't cut it. We built a framework that lets us configure and deploy context-aware agents quickly, without rebuilding from scratch each time.

Outcome: measurable time savings for end users, and a new commercial model for SAP that ties AI value directly to client outcomes.`,
  },
  {
    title: "This site",
    date: "Sep 2026",
    tag: "Side Projects",
    description: "A personal space built with Next.js. Slowly becoming something.",
    href: "#",
    body: `Built with Next.js 16, Tailwind v4, and Geist font. Designed to feel like a notepad — light, personal, without the polish of a product portfolio.

The idea: one feed, everything in one place, filtered by tag. No separate sections that feel like different websites stitched together.

Started as a blank page. Still figuring out what it wants to be.`,
  },
  {
    title: "The Future of Design — Figma → Vibe Coding → Agentic Engineering",
    date: "May 2026 · Seoul",
    tag: "Publications",
    description: "Talk given at the Korean Designers Conference 2026.",
    href: "/talks/korean-designers-2026",
    body: `A talk I gave at the Korean Designers Conference in Seoul, May 2026.

The premise: the design tool stack is collapsing. Figma is no longer just a canvas — it's a prompt interface. Vibe coding is turning design intent directly into running code. And agentic engineering is the next step: systems that don't just generate UI, but understand context and make decisions.

For designers, this is either terrifying or exciting depending on where you're standing. My argument: the ones who understand both the design and the engineering surface will have more leverage than ever — not less.

The session ran 45 minutes with Q&A. Full slide deck and recording available on the talks page.`,
  },
];

const tagColors: Record<string, string> = {
  Blog: "bg-[#1a2235] text-white",
  "Past Projects": "bg-[#1a2235]/15 text-[#1a2235]",
  "Side Projects": "bg-[#1a2235]/8 text-[#1a2235]/70",
  Publications: "bg-[#1a2235]/12 text-[#1a2235]/70",
};

function DoodlePattern() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <pattern id="doodle" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M8 20 Q14 15 20 20 Q26 25 32 20" stroke="#1a2235" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.12"/>
          <circle cx="52" cy="18" r="4" stroke="#1a2235" strokeWidth="1.2" fill="none" opacity="0.12"/>
          <line x1="62" y1="18" x2="72" y2="18" stroke="#1a2235" strokeWidth="1.2" strokeLinecap="round" opacity="0.12"/>
          <circle cx="20" cy="52" r="4" stroke="#1a2235" strokeWidth="1.2" fill="none" opacity="0.10"/>
          <path d="M17 54 Q20 57 23 54" stroke="#1a2235" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.10"/>
          <path d="M44 58 Q50 53 56 58 Q62 63 68 58" stroke="#1a2235" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.09"/>
          <circle cx="38" cy="38" r="1.5" fill="#1a2235" opacity="0.09"/>
          <line x1="10" y1="38" x2="10" y2="46" stroke="#1a2235" strokeWidth="1.1" strokeLinecap="round" opacity="0.10"/>
          <path d="M10 42 L15 38 M10 42 L15 46" stroke="#1a2235" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.10"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#doodle)"/>
    </svg>
  );
}

export default function Home() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Entry | null>(null);
  const filtered = active === "All" ? entries : entries.filter((e) => e.tag === active);

  return (
    <main className="min-h-screen bg-[#f0f1f3] text-[#1a2235] flex">

      {/* LEFT — business card, always visible */}
      <div className="hidden lg:flex lg:w-[30%] flex-col overflow-hidden relative">

        {/* Video flush to top */}
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
          style={{ display: "block" }}
        />

        {/* Card content */}
        <div className="flex-1 px-12 py-10 flex flex-col justify-between">
          <div>
            {/* Name + logos */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-[#1a2235] mb-2">
                David Lee
              </h1>
              {/* Company logos */}
              <div className="flex items-center gap-4 mb-4">
                {/* SAP */}
                <svg aria-label="SAP" viewBox="0 0 190 90" width="40" height="19" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ADEF"/>
                      <stop offset="100%" stopColor="#0070C0"/>
                    </linearGradient>
                  </defs>
                  <rect width="190" height="90" fill="url(#sapGrad)"/>
                  <polygon points="130,0 190,0 190,90" fill="white" opacity="0.9"/>
                  <text x="12" y="72" fontSize="72" fontWeight="bold" fontFamily="Arial, sans-serif" fill="white">SAP</text>
                </svg>
                {/* Google */}
                <svg aria-label="Google" viewBox="0 0 272 92" width="52" height="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                  <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
                </svg>
                {/* GoPro */}
                <svg aria-label="GoPro" viewBox="0 0 120 35" width="52" height="15" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="28" fontSize="32" fontWeight="900" fontFamily="'Arial Rounded MT Bold', Arial, sans-serif" fill="#000" letterSpacing="-1">GoPro</text>
                </svg>
                {/* Walmart */}
                <svg aria-label="Walmart" viewBox="0 0 230 60" width="60" height="16" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="48" fontSize="46" fontWeight="bold" fontFamily="'Myriad Pro', Arial, sans-serif" fill="#0071CE">Walmart</text>
                  <g transform="translate(196, 28)" fill="#FFC220">
                    <ellipse cx="0" cy="-14" rx="3.5" ry="6" transform="rotate(0)"/>
                    <ellipse cx="0" cy="-14" rx="3.5" ry="6" transform="rotate(60)"/>
                    <ellipse cx="0" cy="-14" rx="3.5" ry="6" transform="rotate(120)"/>
                    <ellipse cx="0" cy="-14" rx="3.5" ry="6" transform="rotate(180)"/>
                    <ellipse cx="0" cy="-14" rx="3.5" ry="6" transform="rotate(240)"/>
                    <ellipse cx="0" cy="-14" rx="3.5" ry="6" transform="rotate(300)"/>
                  </g>
                </svg>
              </div>
              <p className="text-[10px] text-[#1a2235]/40 font-medium tracking-widest uppercase leading-relaxed">
                AI FDE Product Manager &nbsp;·&nbsp; UX Engineer & Designer at Google
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm text-[#1a2235]/60 leading-relaxed">
              I came from UX and moved into PM as the line between design and product
              decisions got blurry — I wanted to be in the room earlier, shaping what
              gets built. Now I build and ship AI agents for SAP&apos;s enterprise clients —
              real deployments, real workflows, real people using them every day.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-4">
              <a href="https://www.linkedin.com/in/leedavid/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#1a2235]/35 hover:text-[#1a2235] transition-colors">LinkedIn</a>
              <a href="https://instagram.com/club.rewinds" target="_blank" rel="noopener noreferrer" className="text-xs text-[#1a2235]/35 hover:text-[#1a2235] transition-colors">Instagram</a>
              <a href="mailto:djteknokid@gmail.com" className="text-xs text-[#1a2235]/35 hover:text-[#1a2235] transition-colors">Email</a>
            </div>
          </div>

          {/* Nav menu */}
          <nav className="mb-8">
            <div className="divide-y divide-[#1a2235]/8">
              {[
                { label: "Blog", emoji: "✍️" },
                { label: "Past Projects", emoji: "🏗️" },
                { label: "Side Projects", emoji: "🔧" },
                { label: "Creatives", emoji: "🎨" },
              ].map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => setActive(active === label ? "All" : label)}
                  className={`w-full text-left py-3 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                    active === label
                      ? "text-[#1a2235]"
                      : "text-[#1a2235]/40 hover:text-[#1a2235]/70"
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{label}</span>
                  {active === label && <span className="ml-auto text-xs">→</span>}
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div>
            <p className="text-[10px] text-[#1a2235]/20 tracking-widest uppercase">Seoul · 2026</p>
          </div>
        </div>
      </div>

      {/* RIGHT — menu or notepad */}
      <div className="w-full lg:w-[70%] relative bg-[#f0f1f3] overflow-hidden">

        {/* Menu view */}
        {!selected && (
          <div className="h-full overflow-y-auto px-8 py-12 lg:px-10">
            {/* Doodle pattern behind */}
            <div className="absolute inset-0 pointer-events-none">
              <DoodlePattern />
            </div>

            <div className="relative z-10">
              {/* Entries */}
              <div className="divide-y divide-[#1a2235]/8">
                {filtered.map((e) => (
                  <button
                    key={e.title}
                    onClick={() => {
                      if (e.href && e.href !== "#") {
                        window.location.href = e.href;
                      } else {
                        setSelected(e);
                      }
                    }}
                    className="group w-full text-left block py-6 hover:bg-[#1a2235]/[0.03] -mx-3 px-3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[e.tag]}`}>
                            {e.tag}
                          </span>
                          <span className="text-xs text-[#1a2235]/25">{e.date}</span>
                        </div>
                        <h2 className="text-lg font-bold text-[#1a2235] mb-1 group-hover:opacity-60 transition-opacity">
                          {e.title}
                        </h2>
                        <p className="text-xs text-[#1a2235]/45 leading-relaxed">{e.description}</p>
                      </div>
                      <span className="text-[#1a2235]/30 opacity-0 group-hover:opacity-100 transition-opacity text-sm shrink-0 mt-1">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notepad view */}
        {selected && (
          <div
            className="h-full overflow-y-auto bg-white"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #e8eaf0 27px, #e8eaf0 28px)",
              backgroundPositionY: "48px",
            }}
          >
            {/* Red margin line */}
            <div className="absolute top-0 bottom-0 left-14 w-px bg-red-300/50 pointer-events-none" />

            <div className="relative px-20 pt-10 pb-16">
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 text-[#1a2235]/25 hover:text-[#1a2235]/60 transition-colors text-xs tracking-widest cursor-pointer"
              >
                ✕ close
              </button>

              {/* Meta */}
              <div className="flex items-center gap-2 mb-5">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[selected.tag]}`}>
                  {selected.tag}
                </span>
                <span className="text-xs text-[#1a2235]/30">{selected.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-[#1a2235] mb-8 leading-snug">
                {selected.title}
              </h2>

              {/* Body */}
              <div className="space-y-5">
                {selected.body.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-[#1a2235]/70 leading-7">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
