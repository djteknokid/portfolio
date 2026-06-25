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
];

const currentSlug = "how-to-raise";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 16</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>16</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>The Four Elements of Coordination</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>AI reduced the cost of creating options.</p>

            <p>
              Today, anyone can generate ideas, prototypes, presentations, code, and content
              in minutes.
            </p>

            <p>Creation is becoming abundant.</p>

            <p>Choice is becoming scarce.</p>

            <p>The challenge is no longer creating possibilities.</p>

            <p>The challenge is deciding which possibility to pursue.</p>

            <p>That is coordination.</p>

            <hr />

            <p>
              And over the last year, I&rsquo;ve come to believe that almost every product
              discussion comes down to four elements.
            </p>

            <hr />

            <p><strong>Clarity</strong> — What problem are we solving?</p>
            <p><strong>Trade-offs</strong> — What are we willing to sacrifice?</p>
            <p><strong>Priority</strong> — What matters most right now?</p>
            <p><strong>Decision</strong> — What will we do, and who owns it?</p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-four-elements.png"
              alt="Four quadrants: Clarity (lighthouse), Trade-offs (balance scale), Priority (signpost), Decision (placing a block)"
            >
              <p>When teams struggle to move forward, one of these four elements is usually missing.</p>

              <p>When teams move quickly, they tend to have all four.</p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>1. Clarity</p>
            <p><strong>What problem are we solving?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-clarity.png"
              alt="Three people in Seoul each thinking about a different goal — food, palace, K-pop concert"
            >
              <p>
                When there are five prototypes, ten stakeholders, and twenty opinions, the
                biggest contribution is often helping everyone agree on the question.
              </p>

              <p>Not every disagreement is a solution disagreement.</p>

              <p>Sometimes people are solving entirely different problems.</p>

              <p>One person is optimizing for adoption.</p>

              <p>Another is optimizing for revenue.</p>

              <p>Another is optimizing for technical feasibility.</p>

              <p>Without clarity, teams debate solutions to different problems.</p>

              <p>
                Before deciding what to build, great coordinators make sure everyone is
                solving the same problem.
              </p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>2. Trade-offs</p>
            <p><strong>What are we willing to sacrifice?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-trade-offs.png"
              alt="Three people on a balance scale — Korea trip on one side, KBBQ in LA on the other"
            >
              <p>Every meaningful decision requires giving something up.</p>

              <p>Speed versus quality.</p>

              <p>Scope versus focus.</p>

              <p>Short-term results versus long-term investment.</p>

              <p>
                The teams that move fastest are not necessarily the smartest teams.
              </p>

              <p>
                They are the teams that are honest about what they are willing to sacrifice.
              </p>

              <p>Without trade-offs, everyone wants everything.</p>

              <p>Naming the trade-off is often what unlocks the conversation.</p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>3. Priority</p>
            <p><strong>What matters most right now?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-priority.png"
              alt="Seoul map with countless options scattered around — one circled cluster of sites highlighted as the priority"
            >
              <p>Anyone can generate options.</p>

              <p>AI made that easy.</p>

              <p>The hard part is choosing.</p>

              <p>I&rsquo;ve sat in meetings where every direction had merit.</p>

              <p>Every stakeholder had a valid point.</p>

              <p>Every proposal sounded reasonable.</p>

              <p>And the team still left without a decision.</p>

              <p>The problem wasn&rsquo;t intelligence.</p>

              <p>
                The problem was that nobody had identified what mattered most in that moment.
              </p>

              <p>Without priorities, everything becomes important.</p>

              <p>And when everything is important, nothing moves.</p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>4. Decision</p>
            <p><strong>What will we do, and who owns it?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-decision.png"
              alt="One person points up and says 내가 한턱 쏜다 — I've got this — as the group aligns on the plan"
            >
              <p>A meeting that ends without a decision is just a conversation.</p>

              <p>Someone has to make the call.</p>

              <p>Someone has to own the outcome.</p>

              <p>Most organizations have systems for execution.</p>

              <p>Design systems. Roadmaps. Sprint planning. Engineering processes.</p>

              <p>Very few have systems for decisions.</p>

              <p>How do we evaluate competing ideas?</p>

              <p>How do we surface disagreement early?</p>

              <p>How do we avoid having the same debate three months later?</p>

              <p>Without decisions, organizations repeat conversations instead of making progress.</p>
            </SlideRow>

            <hr />

            <p>Most organizations don&rsquo;t have a decision-making problem.</p>

            <p>They have a decision-preparation problem.</p>

            <p>Decisions rarely fail because people are not smart enough.</p>

            <p>
              They fail because the team never aligned on clarity, trade-offs, or priorities.
            </p>

            <hr />

            <p>The goal of coordination is not agreement.</p>

            <p>The goal of coordination is commitment.</p>

            <hr />

            <p>When I was a designer, I thought my value came from creating better artifacts.</p>

            <p>Better wireframes. Better prototypes. Better presentations.</p>

            <p>
              Today, I think the highest-leverage thing I do is help teams answer these four
              questions.
            </p>

            <p>Because once the answers become clear, the artifact is often the easy part.</p>

            <hr />

            <p>Anyone can create artifacts.</p>

            <p>Fewer people can create alignment.</p>

            <p>Anyone can generate options.</p>

            <p>Fewer people can help a team choose.</p>

            <hr />

            <p>
              The people who thrive in the next era won&rsquo;t necessarily have the best
              prompts or the newest tools.
            </p>

            <p>
              They&rsquo;ll be the people who consistently help teams create clarity,
              navigate trade-offs, establish priorities, and drive decisions.
            </p>

            <p>Those are the people who raise the ceiling.</p>

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
