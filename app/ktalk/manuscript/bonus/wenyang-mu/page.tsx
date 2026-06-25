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
];

const currentSlug = "bonus/wenyang-mu";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "Since you started using AI tools, what changed most in your daily routine?",
    a: `My daily workflow now starts with AI as my primary partner. Instead of doing anything myself, I first will feed raw data into AI to generate distinct, evidence-backed action items. This shifts my energy from baseline data processing to high-level decision-making and problem-solving.`,
  },
  {
    q: "When a PM or engineer shows up with something already built — how do you respond as a designer?",
    a: `I welcome it. Having a tangible prototype, even a rough one is valuable for clarifying requirements and alignment. However, I often notice a gap in execution, particularly when AI-generated designs introduce unnecessary complexity.`,
  },
  {
    q: "What skill sets would you tell junior designers to develop right now to stay relevant?",
    a: `I advise juniors to focus on cross-functional convergence:

Technical: Learn GitHub and 'vibe coding' tools (like Claude Code) so you can understand engineering workflows and confidently contribute to frontend code.

Product Thinking: Train and practice like a Product Manager to understand business needs, not just user empathy.`,
  },
  {
    q: "How has your relationship with PM and Engineering changed since AI entered the design process?",
    a: `Day-to-day collaboration hasn't shifted drastically just yet, but the horizon is changing. We are moving toward a future where role boundaries will blur.`,
  },
];

export default function BonusWenyangMu() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B2</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Wenyang Mu</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/ko/bonus/wenyang-mu" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Lead Product Designer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Wenyang Mu</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Lead Product Designer · 0→1 SaaS · AI for Procurement &amp; Fintech · SAP Ariba
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
