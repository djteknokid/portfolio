import Link from "next/link";
import ManuscriptSidebar from "../../ManuscriptSidebar";

const ACCENT = "#bc7155";

const chapters = [
  { number: 1,  slug: "intro",             title: "Intro" },
  { number: 2,  slug: "track-record",      title: "Track Record" },
  { number: 3,  slug: "the-shock",         title: "The Shock" },
  { number: 4,  slug: "why-happening",     title: "Why This Is Happening" },
  { number: 5,  slug: "floor-raised",      title: "The Floor Has Been Raised" },
  { number: 6,  slug: "nba",               title: "The NBA Story" },
  { number: 7,  slug: "pattern",           title: "The Pattern" },
  { number: 8,  slug: "signals-intro",     title: "My Real Talk Begins" },
  { number: 9,  slug: "signal-1",          title: "Signal 1 — Artifact Creation" },
  { number: 10, slug: "signal-2",          title: "Signal 2 — Roles Blurring" },
  { number: 11, slug: "signal-3",          title: "Signal 3 — The Complaint Changed" },
  { number: 12, slug: "signals-summary",   title: "What the Signals Share" },
  { number: 13, slug: "industry-feeling",  title: "The Industry Is Already Feeling It" },
  { number: 14, slug: "coordination-era",  title: "The Coordination Era" },
  { number: 15, slug: "raise-ceiling",     title: "Raise the Ceiling" },
  { number: 16, slug: "how-to-raise",      title: "The Four Elements of Coordination" },
  { number: "16a" as unknown as number, slug: "how-to-raise/clarity",    title: "16a. Clarity" },
  { number: "16b" as unknown as number, slug: "how-to-raise/trade-offs", title: "16b. Trade-offs" },
  { number: "16c" as unknown as number, slug: "how-to-raise/priority",   title: "16c. Priority" },
  { number: "16d" as unknown as number, slug: "how-to-raise/decision",   title: "16d. Decision" },
  { number: 17, slug: "conclusion",        title: "Conclusion" },
  { number: "B1" as unknown as number, slug: "bonus/yeawon-kim",  title: "Bonus — Yeawon Kim" },
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu",  title: "Bonus — Wenyang Mu" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",    title: "Bonus — Yuha Kim" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu",  title: "Bonus — Vivian Chu" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",   title: "Bonus — Insun Ahn" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",    title: "Bonus — Bryan Oh" },
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",    title: "Bonus — Chan Kim" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",   title: "Bonus — Taeho Kim" },
];

const currentSlug = "bonus/bryan-oh";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "Since you started using AI tools, what changed most in your daily routine?",
    a: `The center of gravity has shifted from design files to working prototypes.

Before, the workflow was research → wireframe → high-fidelity → handoff. Now, when an idea emerges, I build it in code and validate it the same day. I call this a prototype-first approach — the key isn't just "building faster," but that the prototype itself becomes a living spec.

For example, when designing a new AI feature for an enterprise analytics platform, I built a React prototype with Claude Code instead of Figma screens. Two things immediately changed.

First, things that would never surface in static screens appeared right at the design stage — loading states when data arrives late, edge cases when AI responses are unexpected, interactions during streaming. AI products have non-deterministic outputs, so this is essentially the core of the design. There's no way to draw this in Figma.

Second, when I handed engineers working code instead of a spec document, the back-and-forth of "what did you intend with this interaction?" nearly disappeared. Less time documenting, more time experimenting and validating.`,
  },
  {
    q: "When a PM or engineer shows up with something already built — how do you respond as a designer?",
    a: `I welcome it much more than before. Instead of "why did you build it first?" I ask "what did you learn?"

What changed is what happens next. Before, I'd give feedback by commenting on what was built. Now I build a modified version directly on top of their code and show it. Instead of saying "the margin here looks off," I pull up the fixed branch and say "let's compare this version." When feedback becomes two comparable working screens rather than words, it becomes a decision, not a debate.

If a designer's role is to draw screens, then a PM's prototype is a threat. But if it's to define the problem, validate hypotheses, and refine the experience, then something already built is the best starting point.`,
  },
  {
    q: "What skill sets would you tell junior designers to develop right now to stay relevant?",
    a: `Three things.

1. Problem Framing — In an era where AI generates solutions endlessly, "what to solve" is the only bottleneck. When a single prompt produces ten screens, you need a clear problem definition to judge which direction is right. Before building a prototype, I write "what am I validating with this?" in one sentence. Without that, you build fast but learn nothing.

2. Prototyping, but treating code like a design tool — You don't need to become a professional developer. But you need to be able to work with code the way you work with Figma. AI coding tools have nearly eliminated the barrier to entry. What remains is the habit of turning your ideas into working experiences. I build and deploy component or interaction experiments on side projects on weekends — that iteration has grown my design instincts more than anything else.

3. Systems Thinking — I started my career in automotive HMI design, where I learned that good experiences come from understanding the system behind the screen — sensors, data, states, constraints — not just the screen itself. AI products have this character even more strongly. The UI is the surface; the actual quality of the experience is determined by data flow, model behavior, and failure case design.`,
  },
  {
    q: "How has your relationship with PM and Engineering changed since AI entered the design process?",
    a: `Role boundaries have blurred and the medium of collaboration has changed.

Before, documents traveled between functions. PM's requirements doc → designer's spec → engineer's implementation. Each handoff lost something in translation. Now, PMs, designers, and engineers make decisions together with the same prototype on screen. We're not handing off documents — we're looking at the same thing and fixing it together.

Especially with AI products, you almost never know the answer before you build it. So it's not the team that writes the most sophisticated specs that wins — it's the team that builds and learns fastest.

In one sentence: in the AI era, a designer is not someone who creates screens. They are someone who learns fastest by prototyping.`,
  },
];

export default function BonusBryanOh() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">

          {/* Header */}
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Bonus — Silicon Valley Designers</p>
            <p className="chapter-part-subtitle">Interviews · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B6</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Bryan Oh</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/ko/bonus/bryan-oh" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                한국어로 읽기 →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            {/* Bio card */}
            <div style={{
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "var(--sp-10)",
              padding: "var(--sp-5) var(--sp-6)",
              background: "rgba(188,113,85,0.06)",
              borderLeft: `3px solid ${ACCENT}`,
            }}>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                margin: "0 0 8px",
              }}>AI Product Designer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Bryan Oh</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                AI Product Designer · Vibe Coder · Expert in data analytics for manufacturing · Google
              </p>
            </div>

            {/* Q&A */}
            {QA.map(({ q, a }, i) => (
              <div key={i} style={{ maxWidth: "680px", marginLeft: "auto", marginRight: "auto", marginBottom: "var(--sp-10)" }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: "0 0 var(--sp-3)",
                }}>Q{i + 1}</p>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: "var(--ink)",
                  margin: "0 0 var(--sp-5)",
                }}>{q}</p>
                {a.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
                {i < QA.length - 1 && <hr />}
              </div>
            ))}

          </div>

          <nav className="chapter-nav chapter-prose">
            {prev ? <Link href={`/ktalk/manuscript/${prev.slug}`}>← {prev.title}</Link> : <span />}
            {next ? <Link href={`/ktalk/manuscript/${next.slug}`}>{next.title} →</Link> : <span />}
          </nav>
        </article>
      </main>
    </div>
  );
}
