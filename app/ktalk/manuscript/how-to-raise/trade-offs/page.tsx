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
  { number: 17, slug: "conclusion",        title: "Conclusion" },
  { number: "B1" as unknown as number, slug: "bonus/yeawon-kim",  title: "Bonus — Yeawon Kim" },
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu",   title: "Bonus — Wenyang Mu" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",     title: "Bonus — Yuha Kim" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu",   title: "Bonus — Vivian Chu" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",     title: "Bonus — Insun Ahn" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",      title: "Bonus — Bryan Oh" },
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",    title: "Bonus — Chan Kim" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",   title: "Bonus — Taeho Kim" },
];

const currentSlug = "how-to-raise/trade-offs";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16b() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 16b</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>2</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Trade-offs</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              Element 2 of 4 — The Four Elements of Coordination
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>The Question</p>
            <p><strong>What are we willing to sacrifice?</strong></p>

            <hr />

            <p>Every meaningful product decision involves a trade-off.</p>

            <p>Speed versus quality.</p>

            <p>Scope versus focus.</p>

            <p>Customization versus simplicity.</p>

            <p>Short-term results versus long-term investment.</p>

            <hr />

            <p>A team has identified a trade-off when it can answer three things.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["Benefit", "What do we gain?"],
                ["Risk", "What could go wrong?"],
                ["Acceptance", "What are we willing to live with?"],
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
              src="/mindbook/ktalk/slides/ch16b-benefit-risk-acceptance.png"
              alt="Three-panel sequence: Benefit (window seat with a view) → Risk (passenger in front reclines) → Acceptance (relaxing anyway)"
              className="chapter-image"
            />

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Benefit</p>
            <p><strong>What do we gain?</strong></p>

            <p>What becomes better if we choose this path?</p>

            <p>Maybe we launch faster.</p>

            <p>Maybe we reach more customers.</p>

            <p>Maybe we reduce complexity.</p>

            <p>Every trade-off should have a clear upside.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Risk</p>
            <p><strong>What could go wrong?</strong></p>

            <p>What do we put at risk by making this choice?</p>

            <p>Maybe quality suffers.</p>

            <p>Maybe flexibility is reduced.</p>

            <p>Maybe we create technical debt.</p>

            <p>Every benefit comes with a corresponding risk.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Acceptance</p>
            <p><strong>What are we willing to live with?</strong></p>

            <p>This is the hardest part.</p>

            <p>Not because teams can&rsquo;t identify risks.</p>

            <p>Because teams rarely acknowledge them.</p>

            <p>Acceptance means saying out loud:</p>

            <blockquote>
              Yes, we understand the downside, and we are willing to accept it.
            </blockquote>

            <p>Without acceptance, trade-offs remain theoretical.</p>

            <p>With acceptance, they become actionable.</p>

            <hr />

            <p>Without trade-offs, everyone wants everything.</p>

            <p>More features. Higher quality. Faster delivery. Lower cost. Greater flexibility.</p>

            <p>The result is usually frustration, not progress.</p>

            <hr />

            <p>
              Great coordinators don&rsquo;t eliminate trade-offs.
            </p>

            <p>They make them visible.</p>

            <p>
              Because once the benefit is clear, the risk is understood, and the consequence
              is accepted — teams can move forward.
            </p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16b-tradeoffs-mindset.png"
              alt="Trade-offs summary: BENEFIT (User Value, Business Value, Strategic Value) · RISK (User Risk, Operational Risk, Strategic Risk) · ACCEPTANCE (Personal Acceptance, Team Acceptance, Organizational Acceptance)"
              className="chapter-image"
            />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Mindsets</p>

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Benefit</p>

            <p><strong>Value exists at multiple levels.</strong></p>

            <p>Many designers naturally focus on user value.</p>

            <p>But great coordinators understand value from multiple perspectives.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>User Value</p>

            <p>How does this help the user?</p>

            <p>Does it reduce friction? Save time? Increase confidence? Improve outcomes?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Business Value</p>

            <p>How does this help the customer or business?</p>

            <p>Does it increase adoption? Reduce cost? Improve efficiency? Generate revenue?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Strategic Value</p>

            <p>How does this strengthen the broader organization?</p>

            <p>Does it improve the platform? Create reusable capabilities? Strengthen market positioning? Support long-term strategy?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Risk</p>

            <p><strong>Every decision creates a new problem.</strong></p>

            <p>The goal is not to eliminate risk.</p>

            <p>The goal is to make risk visible before it becomes reality.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>User Risk</p>

            <p>What could go wrong for the user?</p>

            <p>Could trust decrease? Could adoption suffer? Could the experience become more confusing?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Operational Risk</p>

            <p>What could go wrong during implementation or operation?</p>

            <p>Could engineering complexity increase? Could costs rise? Could latency, reliability, privacy, or security become concerns?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Strategic Risk</p>

            <p>What could go wrong for the organization?</p>

            <p>Could this damage the brand? Create long-term technical debt? Conflict with the company strategy? Weaken the platform?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Acceptance</p>

            <p><strong>Every benefit has a consequence.</strong></p>

            <p>Someone must be willing to carry it.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Personal Acceptance</p>

            <p>Can I live with this trade-off?</p>

            <p>Even if it isn&rsquo;t my preferred solution?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Team Acceptance</p>

            <p>Can the team live with this trade-off?</p>

            <p>Do engineering, product, design, and leadership understand and accept the consequence?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Organizational Acceptance</p>

            <p>Can the organization live with this trade-off?</p>

            <p>Is the company willing to absorb the cost, risk, delay, or limitation that comes with this decision?</p>

            <hr />

            <p>Because once the benefit is understood,</p>

            <p>the risk is visible,</p>

            <p>and the consequence is accepted,</p>

            <p>the team can move forward together.</p>

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
