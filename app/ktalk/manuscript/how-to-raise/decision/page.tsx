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

const currentSlug = "how-to-raise/decision";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16d() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 16d</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>4</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Decision</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              Element 4 of 4 — The Four Elements of Coordination
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>The Question</p>
            <p><strong>What will we do?</strong></p>

            <hr />

            <p>The first three elements prepare a team for a decision.</p>

            <p>Clarity helps us understand the problem.</p>

            <p>Trade-offs help us understand the consequences.</p>

            <p>Priority helps us understand what matters most.</p>

            <p>But none of that matters if the team cannot make a decision.</p>

            <hr />

            <p>A meeting that ends without a decision is just a conversation.</p>

            <hr />

            <p>A team has made a decision when three things are clear.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["Stakeholders", "Who needs to know? A decision that only exists inside a meeting room is not a decision."],
                ["Accountability", "Who owns the outcome? Without accountability, decisions become suggestions."],
                ["Next Step", "What happens now? If nothing changes after the meeting, no decision was actually made."],
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
              src="/mindbook/ktalk/slides/ch16d-stakeholders-accountability-nextstep.png"
              alt="Three-panel sequence: Stakeholders (three people thinking different thoughts) → Accountability (나만 믿어, 내가 쏜다) → Next Step (group boarding a bus toward Seoul Tower)"
              className="chapter-image"
            />

            <hr />

            <p>Many organizations have systems for execution.</p>

            <p>Design systems. Roadmaps. Sprint planning. Engineering processes.</p>

            <p>Very few have systems for decisions.</p>

            <hr />

            <p>How do we make them?</p>

            <p>How do we communicate them?</p>

            <p>How do we avoid revisiting the same issue three months later?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>The Insight</p>

            <p>
              The organizations that thrive in the Coordination Era are not the ones that generate the most ideas.
            </p>

            <p>
              They are the ones that consistently turn discussions into decisions — and decisions into action.
            </p>

            <hr />

            <p>Because coordination is not complete when people understand.</p>

            <p>Coordination is complete when people move.</p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16d-decision-mindset.png"
              alt="Decision summary: STAKEHOLDERS (Decision Makers, Execution Partners, Impacted People) · ACCOUNTABILITY (Individual Accountability, Team Accountability, Organizational Accountability) · NEXT STEP (Immediate Next Step, Milestone Next Step, Outcome Next Step)"
              className="chapter-image"
            />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Mindsets</p>

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Stakeholders</p>

            <p><strong>Alignment does not happen automatically.</strong></p>

            <p>Every meaningful decision affects someone.</p>

            <p>Some people must approve it.</p>

            <p>Some people must implement it.</p>

            <p>Some people will be impacted by it.</p>

            <p>Great coordinators understand the stakeholder landscape before the decision becomes a problem.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Decision Stakeholders</p>

            <p>Who helps make the decision?</p>

            <p>The people whose input is needed before moving forward.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Execution Stakeholders</p>

            <p>Who helps implement the decision?</p>

            <p>The people responsible for turning the decision into reality.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Impacted Stakeholders</p>

            <p>Who will be affected by the decision?</p>

            <p>The people who must live with the outcome once the decision has been made.</p>

            <p>A decision made without the right stakeholders often becomes a decision that gets revisited later.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Accountability</p>

            <p><strong>Decisions without accountability are opinions.</strong></p>

            <p>Many teams believe they have made a decision.</p>

            <p>In reality, they have only reached agreement.</p>

            <p>A decision becomes real when someone accepts responsibility for the outcome.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Individual Accountability</p>

            <p>Who is directly responsible?</p>

            <p>The person driving the work forward.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Team Accountability</p>

            <p>What responsibilities belong to the group?</p>

            <p>What commitments have been made together?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Organizational Accountability</p>

            <p>Who ultimately owns the result?</p>

            <p>When things go well — or badly — who is responsible at the organizational level?</p>

            <p>The higher you move in an organization, the more accountability becomes your job.</p>

            <p>Not because you make every decision.</p>

            <p>Because you help ensure decisions have owners.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>Next Step</p>

            <p><strong>If nothing changes after the meeting, no decision was made.</strong></p>

            <p>Many meetings end with agreement.</p>

            <p>Few meetings end with momentum.</p>

            <p>Great coordinators convert decisions into action.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Immediate Next Step</p>

            <p>What happens first?</p>

            <p>The very next action that moves the decision forward.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Milestone Next Step</p>

            <p>What happens after that?</p>

            <p>The key checkpoints that indicate progress.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>Outcome Next Step</p>

            <p>How do we know the decision worked?</p>

            <p>What result are we expecting to see?</p>

            <hr />

            <p>A decision without action creates discussion.</p>

            <p>A decision with action creates progress.</p>

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
