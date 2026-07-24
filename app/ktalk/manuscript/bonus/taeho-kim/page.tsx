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

const currentSlug = "bonus/taeho-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "How has AI changed the way you work as a frontend engineer?",
    a: `Almost completely. I used to use Cursor and Penpot separately. Now I do almost everything through Claude Code in the terminal.

The biggest shift was in how I interact with the codebase. Before, when I needed to understand what was built or what was technically feasible, I had to dig through the code myself or ask someone. Now the turnaround is instant. That changes how fast you can make decisions — you stop waiting.

The other big change was design systems. At my startup, we had no dedicated designer. I used Penpot to build out our design system, then connected it via MCP so that when engineers used Claude Code to build UI, it would automatically pull from our system. Without that, every engineer just builds whatever looks "good enough" to them — and it never matches.

The gap between what Claude generates and what actually ships is still about 80–90%. Someone still has to look at the output and make the call. But that's a much better starting point than zero.`,
  },
  {
    q: "You went through a serious job search — 55 companies, 8 final rounds. What did you learn?",
    a: `The market wasn't as bad as it felt in January. The problem was my resume wasn't passing the recruiter filter.

I learned that a resume isn't written for you, or for your future team. It's written for the recruiter — and increasingly, for the ATS system before that. The ATS just scans for keywords. Once it passes, the recruiter compares your resume to the job description. How well it aligns determines whether you get a call.

My resume was too technical. It was accurate, but it wasn't speaking to what each specific company was looking for. Once I understood that, I made four versions — frontend-focused, full-stack, UX-engineer hybrid, and a generalist version. I matched each application to the right version.

After I started tailoring, my response rate jumped significantly. I went from near zero in January to 3 offers by March. The market didn't change. My approach did.

One more thing: the questions themselves changed month by month. January interviews asked different things than March ones. AI is moving fast enough that what companies want from engineers is evolving in real time. You have to stay current on what they're actually testing for.`,
  },
  {
    q: "As a frontend engineer who has worked closely with designers — what do you actually need from a designer?",
    a: `Someone who can explain *why*.

Not "move this one pixel to the right." That I can figure out. What I need is: why does this need to move? What problem does it solve? What user behavior does it address?

When a designer can explain the reasoning — the user research behind it, the edge case they're protecting against, the experience they're trying to create — that changes everything. Now I'm not just implementing a spec. I understand the intent. I can make judgment calls when the implementation gets complicated.

I share my own frontend work the same way. When I change something, I explain why. This is what I changed, this is why it matters, this is what I was trying to protect. That's what makes collaboration actually work.

With vibe-coded designs becoming more common, this is going to matter even more. If someone builds a UI with AI and they can't explain why they made the choices they made — that's not a design, it's noise. The question "why did you put that button there?" should always have an answer.`,
  },
  {
    q: "Will designers still be necessary in 5 years?",
    a: `Yes — but fewer of them, and the role will be different.

AI is getting better at generating UI. But design isn't just visual production. It's understanding trends, reading what feels current, having taste that's been developed through real exposure to real products used by real people. That's hard to automate because it requires knowing what's happening *now*, not what was true when a model was trained.

The designers who will thrive are the ones who bring perspective that AI can't replicate. The ones who can look at a generated output and immediately know what's wrong — and more importantly, why it's wrong and what it should be instead.

There still needs to be one person on every team who is the design point of view. One person who has developed that instinct. You don't need ten. But you need one.

The dangerous scenario is teams that think vibe coding replaces that person. It doesn't. It replaces the production work. The thinking still has to come from somewhere.`,
  },
];

export default function BonusTaehoKim() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">

          {/* Header */}
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Bonus — Silicon Valley Engineers</p>
            <p className="chapter-part-subtitle">Interviews · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B8</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Taeho Kim</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/ko/bonus/taeho-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Founding Principal Software Engineer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Taeho (TK) Kim</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Founding Principal Software Engineer (Frontend) · Full-stack · Design systems
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
