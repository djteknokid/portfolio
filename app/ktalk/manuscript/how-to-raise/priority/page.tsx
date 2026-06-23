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

const currentSlug = "how-to-raise/priority";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16c() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 16c</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>3</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Priority</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              Element 3 of 4 — The Four Elements of Coordination
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>The Question</p>
            <p><strong>What matters most right now?</strong></p>

            <hr />

            <p>AI made it easy to generate options.</p>

            <p>The hard part is deciding which one deserves attention.</p>

            <hr />

            <p>I&rsquo;ve sat in meetings where every idea sounded reasonable.</p>

            <p>Every stakeholder had a valid point.</p>

            <p>Every proposal had potential.</p>

            <p>And yet the team couldn&rsquo;t move forward.</p>

            <p>The problem wasn&rsquo;t a lack of ideas.</p>

            <p>The problem was a lack of priorities.</p>

            <hr />

            <p>A team has established priorities when it can answer three things.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["Urgency", "How soon does this need attention?"],
                ["Impact",  "How much does this matter?"],
                ["Effort",  "What will it take?"],
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
              src="/mindbook/ktalk/slides/ch16c-urgency-impact-cost.png"
              alt="Priority table: Task / Urgency / Impact / Cost — Roof leak (High/High/High starred), Paint wall (Low/Low/Medium), Fix door (Medium/Low/Low)"
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

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Urgency</p>
            <p><strong>How soon does this need attention?</strong></p>

            <p>Some opportunities can wait.</p>

            <p>Some problems cannot.</p>

            <p>A customer escalation.</p>

            <p>A regulatory deadline.</p>

            <p>A competitor launch.</p>

            <p>Urgency helps teams understand when action is required.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Impact</p>
            <p><strong>How much does this matter?</strong></p>

            <p>What happens if we solve this?</p>

            <p>How many users benefit?</p>

            <p>How much business value is created?</p>

            <p>How much pain is removed?</p>

            <p>Impact helps teams understand why something matters.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Effort</p>
            <p><strong>What will it take?</strong></p>

            <p>Every priority consumes resources.</p>

            <p>Time. Money. Engineering effort. Organizational attention.</p>

            <p>Cost helps teams understand what must be invested to achieve the outcome.</p>

            <hr />

            <p>Without priorities, everything becomes important.</p>

            <p>And when everything is important, nothing moves.</p>

            <hr />

            <p>
              Great coordinators help teams separate what is urgent from what is merely
              interesting.
            </p>

            <p>
              They help teams distinguish high-impact opportunities from low-impact
              distractions.
            </p>

            <p>And they make the cost visible before resources are committed.</p>

            <p>
              Because once urgency, impact, and effort are understood — teams can focus their
              attention on what matters most.
            </p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16c-priority-mindset.png"
              alt="Priority summary: URGENCY (Immediate, Near-Term, Strategic) · IMPACT (User Impact, Business Impact, Strategic Impact) · EFFORT (Design Effort, Delivery Effort, Organizational Effort)"
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

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Urgency</p>

            <p><strong>Not everything important is urgent.</strong></p>

            <p>And not everything urgent is important.</p>

            <p>Great coordinators can separate today&rsquo;s fire from tomorrow&rsquo;s opportunity.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Immediate Urgency</p>

            <p>What is on fire right now?</p>

            <p>Production issue. Customer escalation. Deadline this week.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Near-Term Urgency</p>

            <p>What becomes expensive if ignored?</p>

            <p>Growing user pain. Technical debt. Adoption issues.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Strategic Urgency</p>

            <p>What will matter in the future?</p>

            <p>Market shifts. AI disruption. Competitive threats. Platform investments.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Impact</p>

            <p><strong>Work on what changes outcomes.</strong></p>

            <p>Not what creates activity.</p>

            <p>Not what creates visibility.</p>

            <p>Not what creates excitement.</p>

            <p>Outcomes.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>User Impact</p>

            <p>How many users benefit? How much do they benefit?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Business Impact</p>

            <p>How much does this affect revenue, cost, efficiency, adoption, retention?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Strategic Impact</p>

            <p>How much does this strengthen the platform, organization, or market position?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Effort</p>

            <p><strong>Ambition must respect reality.</strong></p>

            <p>Many ideas fail not because they are bad.</p>

            <p>But because they require more effort than the organization can absorb.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Design Effort</p>

            <p>Research, design, validation, iteration.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Delivery Effort</p>

            <p>Engineering, implementation, testing, support.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Organizational Effort</p>

            <p>Alignment, change management, training, rollout.</p>

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
