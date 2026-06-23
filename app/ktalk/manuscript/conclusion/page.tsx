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
  { number: 16, slug: "how-to-raise",      title: "The Four Elements of Coordination" },
  { number: "16a" as unknown as number, slug: "how-to-raise/clarity",    title: "16a. Clarity" },
  { number: "16b" as unknown as number, slug: "how-to-raise/trade-offs", title: "16b. Trade-offs" },
  { number: "16c" as unknown as number, slug: "how-to-raise/priority",   title: "16c. Priority" },
  { number: "16d" as unknown as number, slug: "how-to-raise/decision",   title: "16d. Decision" },
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

            <p>I started this talk with a confession.</p>

            <p>I spent ten years chasing titles.</p>

            <p>Designer. Engineer. PM.</p>

            <p>And only recently did I understand the pattern connecting all of them.</p>

            <hr />

            <p>The pattern was never the craft.</p>

            <p>It was always the coordination.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>What We Covered</p>

            <hr />

            <p>AI has lowered the cost of creation.</p>

            <p>The floor has been raised.</p>

            <p>We have seen this before.</p>

            <hr />

            <p>Digital cameras raised the floor for photography.</p>

            <p>The market stopped rewarding the technical image.</p>

            <p>It started rewarding the emotion in the moment.</p>

            <hr />

            <p>Analytics raised the floor for basketball.</p>

            <p>The market stopped rewarding individual brilliance.</p>

            <p>It started rewarding team efficiency.</p>

            <hr />

            <p>Streaming raised the floor for music.</p>

            <p>The market stopped rewarding the song.</p>

            <p>It started rewarding the culture around it.</p>

            <hr />

            <p>AI is raising the floor for product development.</p>

            <p>The market is already shifting.</p>

            <p>It is stopping rewarding the artifact.</p>

            <p>It is starting to reward the decision behind it.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>The Signals Were Already There</p>

            <hr />

            <p>Artifacts are getting easier to create — and harder to differentiate.</p>

            <p>Roles are blurring — designers code, engineers prototype, PMs ship.</p>

            <p>The complaint changed — teams are not stuck because they lack ideas.</p>

            <p>They are stuck because they cannot decide which idea to pursue.</p>

            <hr />

            <p>That is the signal.</p>

            <p>Creation is abundant.</p>

            <p>Coordination is scarce.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>The Four Elements</p>

            <hr />

            <p>
              Coordination is not a soft skill. It is not a personality type.
              It is a set of capabilities that can be learned.
            </p>

            <hr />

            <p>It has four elements.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["Clarity",    "What problem are we solving?"],
                ["Trade-offs", "What are we willing to sacrifice?"],
                ["Priority",   "What matters most right now?"],
                ["Decision",   "What will we do?"],
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

            <hr />

            <p>
              When all four are present, teams move.
            </p>

            <p>
              When one is missing, teams stall — and repeat the same conversation
              three months later.
            </p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>What This Means for You</p>

            <hr />

            <p>AI will not replace the people who can coordinate.</p>

            <p>It will make them more valuable.</p>

            <hr />

            <p>Because when everyone can generate options,</p>

            <p>the person who helps the group choose becomes essential.</p>

            <hr />

            <p>When everyone can create artifacts,</p>

            <p>the person who helps the team align on the right problem becomes rare.</p>

            <hr />

            <p>When everyone can move fast,</p>

            <p>the person who helps teams move together becomes irreplaceable.</p>

            <hr />

            <p>The question is not whether the floor will keep rising.</p>

            <p>It will.</p>

            <hr />

            <p>The question is what you are building above it.</p>

            <hr />

            <p>From photo to wedding.</p>

            <p>From player to team.</p>

            <p>From song to culture.</p>

            <p>From design to decision.</p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch17-conclusion.png"
              alt="A group of people standing together facing mountains, with one person at the center holding a flag — the coordinator leading the team forward"
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

            <p>AI will raise the floor.</p>

            <p>Your job is to raise the ceiling.</p>

            <p>And the way to raise the ceiling is to be the one who coordinates.</p>

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
