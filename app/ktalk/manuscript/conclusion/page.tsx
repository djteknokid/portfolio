import Link from "next/link";
import ManuscriptSidebar from "../ManuscriptSidebar";

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

const currentSlug = "conclusion";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter17() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 17</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>17</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Conclusion</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>I want to end where we started.</p>

            <p>A PM walks into a design review.</p>

            <p>Not with a PRD.</p>

            <p>Not with a wireframe.</p>

            <p>With a prototype.</p>

            <p>Built.</p>

            <p>Interactive.</p>

            <p>Ready to discuss.</p>

            <p>And the designer sitting across the table thinks:</p>

            <blockquote><strong>&ldquo;So what am I here for?&rdquo;</strong></blockquote>

            <hr />

            <p>I&rsquo;ve been thinking about that question for a long time.</p>

            <p>
              And I think what makes it unsettling isn&rsquo;t that somebody took the
              designer&rsquo;s job.
            </p>

            <p>It&rsquo;s that the answer used to be obvious.</p>

            <hr />

            <p>The PM brought requirements.</p>

            <p>The designer created the artifact.</p>

            <p>The engineer built the product.</p>

            <p>Everybody knew their role.</p>

            <p>Everybody knew their lane.</p>

            <p>Everybody knew where value came from.</p>

            <hr />

            <p>Now the lanes are blurry.</p>

            <p>The artifacts are abundant.</p>

            <p>The prototypes are everywhere.</p>

            <p>And the answer isn&rsquo;t obvious anymore.</p>

            <hr />

            <p>That&rsquo;s not a crisis.</p>

            <p>It&rsquo;s a signal.</p>

            <hr />

            <p>
              Because throughout this talk, we&rsquo;ve seen the same pattern over and over
              again.
            </p>

            <p>Technology raises the floor.</p>

            <p>The market changes the KPI.</p>

            <p>Professionals raise the ceiling.</p>

            <hr />

            <p>We saw it in photography.</p>

            <p>We saw it in basketball.</p>

            <p>We saw it in music.</p>

            <p>And now we&rsquo;re seeing it in product development.</p>

            <hr />

            <p>The floor is rising again.</p>

            <p>And whenever the floor rises, people have a choice.</p>

            <p>
              Some people spend their energy defending the old definition of value.
            </p>

            <p>Others move toward the new bottleneck.</p>

            <hr />

            <p>I&rsquo;ve spent most of my career doing the second.</p>

            <p>Not because I had a grand plan.</p>

            <p>Because I kept following the friction.</p>

            <hr />

            <p>
              When execution was the bottleneck, I moved toward prototyping.
            </p>

            <p>
              When AI fluency became the bottleneck, I moved toward AI.
            </p>

            <p>
              And over the last year, watching teams with more capability than ever before,
              I noticed something else.
            </p>

            <p>The bottleneck moved again.</p>

            <hr />

            <p>The problem wasn&rsquo;t building.</p>

            <p>The problem was deciding.</p>

            <p>The problem wasn&rsquo;t execution.</p>

            <p>The problem was alignment.</p>

            <p>The problem wasn&rsquo;t creating.</p>

            <p>The problem was coordinating.</p>

            <hr />

            <p>So I followed the bottleneck again.</p>

            <p>That&rsquo;s what led me here.</p>

            <p>That&rsquo;s what led to this talk.</p>

            <p>
              And that&rsquo;s why I believe we&rsquo;re entering the Coordination Era.
            </p>

            <hr />

            <p>Not because AI makes teams less important.</p>

            <p>Because AI makes teams more important.</p>

            <hr />

            <p>Not because creation stopped mattering.</p>

            <p>Because creation became abundant.</p>

            <hr />

            <p>
              And when creation becomes abundant, something else becomes valuable.
            </p>

            <p>Clarity.</p>

            <p>Alignment.</p>

            <p>Shared understanding.</p>

            <p>
              The ability to help a group of people move in the same direction.
            </p>

            <hr />

            <p>
              So if there is one thing I hope you leave with today, it&rsquo;s not fear.
            </p>

            <p>The floor rising is not something to fear.</p>

            <p>It&rsquo;s happened before.</p>

            <p>It will happen again.</p>

            <hr />

            <p>And it&rsquo;s not a new tool.</p>

            <p>Or a new workflow.</p>

            <p>Or a new prompt.</p>

            <hr />

            <p>It&rsquo;s a question.</p>

            <p>A simple question.</p>

            <p>
              One that I think is worth spending the next decade thinking about.
            </p>

            <hr />

            <blockquote>
              <strong>How do I help my team make better decisions?</strong>
            </blockquote>

            <hr />

            <p>From photo to wedding.</p>

            <p>From player to team.</p>

            <p>From song to culture.</p>

            <p>From design to decision.</p>

            <hr />

            <p>AI will continue to raise the floor.</p>

            <p>Our job is to raise the ceiling.</p>

            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 700,
              marginTop: "var(--sp-8)",
            }}>감사합니다.</p>

            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.10)", margin: "var(--sp-10) 0 var(--sp-8)" }} />

            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
            }}>
              End of Manuscript · The Coordination Era / 조율의 시대
            </p>

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
