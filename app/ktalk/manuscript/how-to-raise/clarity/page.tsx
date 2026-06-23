import Link from "next/link";
import ManuscriptSidebar from "../../ManuscriptSidebar";

const ACCENT = "#bc7155";

const chapters = [
  { number: 1,  slug: "intro",                         title: "Intro" },
  { number: 2,  slug: "track-record",                  title: "Track Record" },
  { number: 3,  slug: "the-shock",                     title: "The Shock" },
  { number: 4,  slug: "why-happening",                 title: "Why This Is Happening" },
  { number: 5,  slug: "floor-raised",                  title: "The Floor Has Been Raised" },
  { number: 6,  slug: "nba",                           title: "The NBA Story" },
  { number: 7,  slug: "pattern",                       title: "The Pattern" },
  { number: 8,  slug: "signals-intro",                 title: "My Real Talk Begins" },
  { number: 9,  slug: "signal-1",                      title: "Signal 1 — Artifact Creation" },
  { number: 10, slug: "signal-2",                      title: "Signal 2 — Roles Blurring" },
  { number: 11, slug: "signal-3",                      title: "Signal 3 — The Complaint Changed" },
  { number: 12, slug: "signals-summary",               title: "What the Signals Share" },
  { number: 13, slug: "industry-feeling",              title: "The Industry Is Already Feeling It" },
  { number: 14, slug: "coordination-era",              title: "The Coordination Era" },
  { number: 15, slug: "raise-ceiling",                 title: "Raise the Ceiling" },
  { number: 16, slug: "how-to-raise",                  title: "The Four Elements of Coordination" },
  { number: "16a" as unknown as number, slug: "how-to-raise/clarity",    title: "16a. Clarity" },
  { number: "16b" as unknown as number, slug: "how-to-raise/trade-offs", title: "16b. Trade-offs" },
  { number: "16c" as unknown as number, slug: "how-to-raise/priority",   title: "16c. Priority" },
  { number: "16d" as unknown as number, slug: "how-to-raise/decision",   title: "16d. Decision" },
  { number: 17, slug: "conclusion",                    title: "Conclusion" },
];

const currentSlug = "how-to-raise/clarity";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16a() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 16a</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>1</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Clarity</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              Element 1 of 4 — The Four Elements of Coordination
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>The Question</p>
            <p><strong>What problem are we solving?</strong></p>

            <hr />

            <p>A team has clarity when they can answer three things.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["User", "Who are we solving for?"],
                ["Problem", "What specific problem are they experiencing?"],
                ["Success", "How do we know we solved it?"],
              ].map(([label, desc]) => (
                <>
                  <div key={`l-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}>
                    {label}
                  </div>
                  <div key={`d-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "15px",
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}>
                    {desc}
                  </div>
                </>
              ))}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16a-user-problem-success.png"
              alt="Three-panel sequence: User (traveller at airport) → Problem (struggling with heavy luggage) → Success (walking confidently with rolling bag)"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "4px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                background: "#ffffff",
                margin: "var(--sp-6) 0",
              }}
            />

            <hr />

            <p>
              Notice I intentionally removed <strong>Solution</strong>.
            </p>

            <p>Because if you include Solution, teams jump there too quickly.</p>

            <p>You want: User → Problem → Success.</p>

            <p>Once you have those three, teams can generate many solutions.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Example</p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["User", "New sales rep"],
                ["Problem", "Takes 3 hours to research a prospect"],
                ["Success", "Research completed in under 10 minutes"],
              ].map(([label, value]) => (
                <>
                  <div key={`el-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}>
                    {label}
                  </div>
                  <div key={`ev-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "15px",
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}>
                    {value}
                  </div>
                </>
              ))}
            </div>

            <hr />

            <p>Now teams can generate many solutions.</p>

            <p>
              The solution space is open. But the problem space is closed.
            </p>

            <p>
              That&rsquo;s the difference between a team that debates endlessly and a team
              that moves.
            </p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16a-clarity-mindset.png"
              alt="Clarity summary: USER (Bring the user into the room, User Segmentation, User Needs & Goals) · PROBLEM (Don't stop at the symptom, Root Cause Analysis, Problem Framing) · SUCCESS (Start with the finish line, Success Metrics, Experimentation & Iteration)"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "4px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                background: "#ffffff",
                margin: "var(--sp-6) 0",
              }}
            />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Mindsets</p>

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>User</p>

            <p><strong>Always bring the user into the room.</strong></p>

            <p>When a discussion becomes abstract, bring it back to a real person.</p>

            <p>Not:</p>

            <blockquote>&ldquo;What feature should we build?&rdquo;</blockquote>

            <p>But:</p>

            <blockquote>&ldquo;Who is struggling right now?&rdquo;</blockquote>

            <p>The people who create clarity become the voice of the user when the user is not present.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Problem</p>

            <p><strong>Do not stop at the symptom.</strong></p>

            <p>Keep digging.</p>

            <p>A request is not a problem.</p>

            <p>A complaint is not a problem.</p>

            <p>A solution is definitely not a problem.</p>

            <p>The best coordinators are relentlessly curious.</p>

            <p>They keep asking:</p>

            <blockquote>&ldquo;Why is this happening?&rdquo;</blockquote>

            <p>Until the team reaches the root cause.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Success</p>

            <p><strong>Start with the finish line.</strong></p>

            <p>Before discussing solutions, know what success looks like.</p>

            <p>Success can be a metric.</p>

            <p>Success can be a behavior change.</p>

            <p>Success can be a business outcome.</p>

            <p>But it must be visible.</p>

            <p>
              Because if a team cannot recognize success, they cannot know whether they are
              moving in the right direction.
            </p>

            <p>And most importantly:</p>

            <p>Success is not the end.</p>

            <p>Success is feedback.</p>

            <p>Every design is a hypothesis.</p>

            <p>The goal is not to be right.</p>

            <p>The goal is to learn, iterate, and get closer to the truth.</p>

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
