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

const currentSlug = "bonus/insun-ahn";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "Since you started using AI tools, what changed most in your daily routine?",
    a: `I now start and end my day by using AI tools. I have two daily briefings set up — one at the beginning of the day and one at the end.

In the morning, AI reviews my open tasks, helps me identify the main focus of the day, looks at my meeting schedule, and tells me if there is anything I need to prepare for.

At the end of the day, it reviews my chats, emails, meeting notes, and other work from the day. It summarizes what I accomplished, the impact I made, which tasks I completed, and any important takeaways or action items from my meetings. It helps me start the day with focus and end it with clarity.`,
  },
  {
    q: "When a PM or engineer shows up with something already built — how do you respond as a designer?",
    a: `I don't think there are clear role boundaries anymore, especially with AI. Going forward, the lines between PM, engineering, and design will continue to become more blurred, and we will all become builders together.

A PM might initiate an idea, design a solution, and even help take it toward implementation. An engineer might come up with the initial idea, and a designer might help take the product all the way to shipping.

So when someone comes to me with something that is already built, I don't see it as someone stepping into my role. I see it as a starting point for collaboration. I focus on understanding the idea, providing feedback, improving the experience, and helping the team raise the overall quality.

I don't think we should limit ourselves based on traditional role definitions. The more important question is how we can develop the best idea together and ship a high-quality product together.`,
  },
  {
    q: "What skill sets would you tell junior designers to develop right now to stay relevant?",
    a: `I think the skill that will continue to stay relevant is the ability to deeply understand users and customers.

Designers need to understand the pain points users are experiencing, why those problems exist, and why the product is not meeting their needs. Then they need to keep practicing how to solve those problems effectively.

For junior designers, I would recommend working on real problems for real users whenever possible. Instead of only creating personal projects or hypothetical concepts, try to build something that people can actually use. Get feedback from real users, observe how they respond, and learn from the actual results.

The ability to understand a real problem, build a solution, and learn from its impact will always be valuable.`,
  },
  {
    q: "How has your relationship with PM and Engineering changed since AI entered the design process?",
    a: `The relationships themselves haven't changed dramatically, but the topics we discuss and the way we collaborate have started to shift.

I think we are in a transitional period where PMs, engineers, and designers are all learning more about one another's roles. In the past, each function mainly focused on its own area. Now, PMs are learning more about design and engineering, designers are becoming more involved in implementation, and engineers are developing a stronger understanding of design.

For example, we are helping engineers unblock and develop their own ideas. We give them feedback and design guidance so they can shape those ideas in the right way and turn them into experiences they can actually build and ship.

The goal is not for designers to be involved in every single decision. It is to help engineers and PMs develop stronger design judgment, so they can continue building high-quality experiences even when a designer is not directly involved.`,
  },
];

export default function BonusInsunAhn() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B5</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Insun Ahn</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/ko/bonus/insun-ahn" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Product Design Manager</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Insun Ahn</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Product Design Manager · Meta
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
