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
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu",   title: "Bonus — Wenyang Mu" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",     title: "Bonus — Yuha Kim" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu",   title: "Bonus — Vivian Chu" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",    title: "Bonus — Insun Ahn" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",     title: "Bonus — Bryan Oh" },
];

const currentSlug = "bonus/yeawon-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "Since you started using AI tools, what changed most in your daily routine?",
    a: `Before AI, a lot of my time was spent turning thoughts into artifacts. Now I spend more time evaluating artifacts that other people generated.

PMs, engineers, and stakeholders can all create decent prototypes, mockups, and concepts with AI. The amount of design output has exploded, but the amount of clarity has not.

In some ways, my job has become less about creating and more about filtering. The bottleneck is no longer generating ideas—it's figuring out which ideas are actually worth pursuing.

What AI has reinforced for me is that judgment comes from experience. The ability to evaluate an idea is deeply connected to having wrestled with similar problems yourself. Just as it's difficult to assess whether AI has solved a problem well without understanding the problem firsthand, it's difficult to recognize a great solution without having gone through the process of creating one.`,
  },
  {
    q: "When a PM or engineer shows up with something already built — how do you respond as a designer?",
    a: `Five years ago, I might have felt defensive. Today, I actually appreciate it.

A rough prototype is often more useful than a vague idea because it gives the team something concrete to react to. Conversations become more productive much faster.

The challenge is making sure we're not confusing "something we can build" with "something users actually need." My role is less about protecting design ownership and more about helping the team make that distinction.

At the same time, the design process has become more collaborative. PMs, engineers, and designers can all create prototypes and explore ideas. I don't think generating ideas is the designer's exclusive responsibility anymore.

However, I do believe designers should remain accountable for design decisions. Just as engineers are accountable for technical decisions, designers should be accountable for the quality, usability, and coherence of the user experience. The most successful collaborations happen when everyone contributes ideas, but decision-making ownership is clear from the beginning.`,
  },
  {
    q: "What skill sets would you tell junior designers to develop right now to stay relevant?",
    a: `I wouldn't tell junior designers to become AI experts. Eventually, everyone will have access to the same tools.

Instead, I would encourage them to get better at problem framing, communication, and influencing decisions. Most careers don't stall because someone can't design a screen. They stall because someone can't align a room full of smart people around a direction.

One thing I hope junior designers don't forget is that influence often comes from helping people think more clearly. Organizing ideas, framing discussions, and asking the right questions can be just as valuable as creating the final design. Design often begins with a well-framed question before it becomes a solution.

Personally, I became a designer because I enjoyed the process of making things. Through that process, I developed judgment, taste, and an understanding of how products work. Even as AI changes how we create, I still believe that hands-on making is one of the best ways to build those instincts.

The designers who thrive will be the ones who can connect user needs, business goals, and technical constraints—not just create polished visuals.`,
  },
  {
    q: "How has your relationship with PM and Engineering changed since AI entered the design process?",
    a: `The biggest change is that design is no longer the default owner of ideas.

A PM can create a prototype over the weekend. An engineer can generate multiple UI directions before a design review. That's not necessarily a bad thing.

What I've noticed is that the value of design is shifting from creating artifacts to helping teams make decisions. The question is less "Can we design this?" and more "Should we build this?"

Ironically, AI has made alignment more important, not less.`,
  },
];

export default function BonusYeawonKim() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Yeawon Kim</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/ko/bonus/yeawon-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Design Lead</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Yeawon Kim</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Design Lead @ TikTok · ex-Uber · Design Systems Principal · AI Platform
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
