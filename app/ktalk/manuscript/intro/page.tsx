import Link from "next/link";
import ManuscriptSidebar from "../ManuscriptSidebar";
import SlideRow from "../SlideRow";

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
  { number: 16, slug: "how-to-raise",      title: "How Do We Raise It?" },
  { number: 17, slug: "conclusion",        title: "Conclusion" },
];

const currentSlug = "intro";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter1() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 1</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>1</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Intro</h1>
            </div>
          </div>

          <div className="chapter-body">

            {/* ── Slide: career path ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch1-career-path.png"
              alt="Career path: GoPro → Google Product Designer → Google AI UX Engineer → SAP Product Designer → SAP Principal PM"
              caption="GoPro · Google · Google AI · SAP Designer · SAP PM"
            >
              <p>Hi everyone. My name is David Lee.</p>

              <p>I&rsquo;m currently a Principal Product Manager at SAP.</p>

              <p>
                Before that, I was a Product Designer at SAP and recently made the transition
                into product management.
              </p>

              <p>Before that, I was a UX Engineer at Google AI Labs.</p>

              <p>And before that, I was a Product Designer at Google.</p>

              <p>
                I just summarized about ten years of my career in ten seconds, which is
                probably all it deserves.
              </p>

              <p>Because the titles aren&rsquo;t the interesting part.</p>

              <p>
                The interesting part is that there is a pattern connecting all of those roles.
              </p>

              <p>It&rsquo;s a pattern I&rsquo;ve been following for years without fully realizing it.</p>

              <p>And honestly, I only figured out how to describe it recently.</p>
            </SlideRow>

            <hr />

            <p>Today, I want to talk about the future of product design.</p>

            <p>Actually, that&rsquo;s not quite right.</p>

            <p>I want to talk about the future of product development.</p>

            <p>Actually, that&rsquo;s not quite right either.</p>

            <p>
              I want to talk about what happens when technology suddenly makes creation
              easier for everyone.
            </p>

            <p>Because I think that&rsquo;s exactly what&rsquo;s happening right now.</p>

            <p>And I think many of us are looking at it the wrong way.</p>

            <hr />

            {/* ── Slide: AI noise ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch1-ai-noise.png"
              alt="Flood of AI tools on the left, person at laptop thinking about coordination on the right"
            >
              <p>Every day there&rsquo;s a new AI tool.</p>

              <p>A new workflow.</p>

              <p>A new framework.</p>

              <p>A new prompt.</p>

              <p>A new reason to panic.</p>

              <p>And if you&rsquo;re a designer, it can feel overwhelming.</p>

              <p>Trust me. I&rsquo;ve been there too.</p>

              <p>But this is not a talk about prompts.</p>

              <p>It&rsquo;s not a talk about agents.</p>

              <p>It&rsquo;s not a talk about MCP.</p>

              <p>And it&rsquo;s definitely not a talk about which model is better than another model.</p>

              <p>There are plenty of people who can teach that.</p>
            </SlideRow>

            <hr />

            {/* ── Slide: coordination era ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch1-coordination-era.png"
              alt="Designer coding, PM prototyping, engineer giving feedback, AI contributing — all converging toward a shared goal"
            >
              <p>What I want to talk about is something I think we&rsquo;re missing.</p>

              <p>
                Over the last year, while building AI products inside a large enterprise,
                I kept noticing something strange.
              </p>

              <p>Designers started coding.</p>

              <p>PMs started prototyping.</p>

              <p>Engineers started giving UX feedback.</p>

              <p>AI started doing a little bit of everything.</p>

              <p>The boundaries started getting blurry.</p>

              <p>At first, I thought this was a design problem.</p>

              <p>Then I thought it was an AI problem.</p>

              <p>Now I think it&rsquo;s something much bigger.</p>

              <p>That&rsquo;s what this talk is about.</p>

              <p>I call it <strong>The Coordination Era</strong>.</p>

              <p>
                And for the next 45 minutes, I&rsquo;m going to try to convince you that
                the biggest opportunity in front of us may not be learning how to create faster.
              </p>

              <p>It may be learning how to align better.</p>

              <p>
                But before I make that argument, I need to earn the right to make it.
              </p>

              <p>So let me show you how I got here.</p>
            </SlideRow>

          </div>

          <nav className="chapter-nav chapter-prose">
            {prev ? <Link href={`/koreatalk/manuscript/${prev.slug}`}>← {prev.title}</Link> : <span />}
            {next ? <Link href={`/koreatalk/manuscript/${next.slug}`}>{next.title} →</Link> : <span />}
          </nav>
        </article>
      </main>
    </div>
  );
}
