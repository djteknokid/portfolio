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

const currentSlug = "bonus/chan-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "Since you started using AI tools, what changed most in your daily design process?",
    a: `The biggest shift is that I can now read the codebase directly.

Before, if I needed to understand what was technically possible or what had already been built, I had to ask an engineer — and engineers are busy. They'd reply hours later, sometimes not at all, sometimes not even sure themselves. Now I ask Claude. It reads the code and tells me exactly what I need to know.

That changed how fast I can make decisions. I'm not waiting on anyone.

I also started using MCP to pull in customer feedback automatically. We're B2B, so customers send feedback constantly. Instead of waiting for a PM to synthesize it into requirements, I can pull it myself and build requirements and even PRDs directly. Designers touching PRDs would have been unusual two years ago. Now it's just faster.`,
  },
  {
    q: "You mentioned you tried doing code checks yourself — what happened?",
    a: `I got excited and went deep. At one point I was doing full code reviews, running tests, fixing CSS myself.

The engineers' reaction was: "Thanks, but... why?" A mix of appreciation and light territorial pushback. They didn't ask me to stop, but the message was clear.

And honestly, design leadership had the same feedback — they wanted more ideation, less implementation. So I pulled back.

But I learned something from that phase. The reason I did it was quality. The engineers I worked with were all backend-heavy. Frontend was not their strength. It was faster for me to just fix the CSS than to explain what needed to change and wait. The control felt good.

The tradeoff is real though. Every hour I spent in the code was an hour not spent on the problem. You can go deep on execution, or you can stay upstream on the question. I think the right answer depends on the team — but I now know where my leverage is higher.`,
  },
  {
    q: "How is AI changing the design team around you?",
    a: `The team is literally being rebuilt around it.

In two years, more than half the designers I started with have left. New leadership came in and pushed out people who couldn't adapt. The new hires are different — they communicate well, they think strategically, they use Claude Code as a baseline assumption.

The most interesting observation was the researchers. They adapted the fastest. Synthesizing large amounts of unstructured data is exactly what they'd always wanted to do — AI just removed every obstacle. For them it was a new world.

The content designers had a harder time. One of them trained GPT on everything she'd ever written — her entire voice, all her patterns — and then left the company. She saw what was coming and decided to build her own leverage before the role disappeared.

Designers with only traditional UX skills — pixel pushing, component assembly — are struggling. The ones who can articulate problems clearly, who can talk to AI effectively, who have some technical range — they're fine.`,
  },
  {
    q: "What would you tell a junior designer trying to navigate this right now?",
    a: `I genuinely don't have a clean answer. The environment changed faster than advice can keep up with.

What I believe is: stop chasing a company, and start building something that's yours.

The designers who are okay are the ones who found something specific they're good at — not a tool, not a title — and went deep on it. People who want that thing will find them.

The process itself isn't going away. Forming a hypothesis, iterating, validating — that loop doesn't disappear. It just runs faster. What's disappearing is the role of the person who only executes the step, without understanding the loop.

So the question to ask isn't "what tools should I learn?" It's "what problem do I understand better than anyone else?" Start there.`,
  },
];

export default function BonusChanKim() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B7</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Chan Kim</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/ko/bonus/chan-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Product Design Lead</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Chan Kim</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Product Design Lead · Rippling &nbsp;·&nbsp; Previously Senior Design Manager · Atlassian
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
