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
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>How Do We Raise the Ceiling?</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>OK.</p>

            <p>So if the Coordination Era is real&hellip;</p>

            <p>And if coordination is becoming the bottleneck&hellip;</p>

            <p>Then the practical question becomes:</p>

            <p>How do we raise the ceiling?</p>

            <hr />

            <p>I want to be careful here.</p>

            <p>I&rsquo;m not going to give you a framework.</p>

            <p>I&rsquo;m not going to give you five steps.</p>

            <p>
              And I&rsquo;m definitely not going to tell you that becoming a better
              coordinator is something you can learn from a LinkedIn carousel.
            </p>

            <hr />

            <p>What I can do is tell you what I&rsquo;ve noticed.</p>

            <p>
              What do the people who consistently raise the ceiling actually do?
            </p>

            <hr />

            <p><strong>They Create Clarity</strong></p>

            <p>When everyone has an opinion.</p>

            <p>When there are five prototypes.</p>

            <p>Three directions.</p>

            <p>Ten stakeholders.</p>

            <p>Twenty different ideas.</p>

            <p>
              They help the team understand what decision is actually being made.
            </p>

            <hr />

            <p>Not every discussion is a design discussion.</p>

            <p>Not every discussion is a technical discussion.</p>

            <p>Not every discussion is a business discussion.</p>

            <p>
              Sometimes the biggest contribution is simply helping everyone agree on the
              question.
            </p>

            <hr />

            <p>
              The teams that move fast are not the teams with the smartest people.
            </p>

            <p>
              They&rsquo;re often the teams with the clearest understanding of what
              they&rsquo;re trying to solve.
            </p>

            <hr />

            <p><strong>They Reduce Translation Friction</strong></p>

            <p>One thing I&rsquo;ve noticed on great product teams:</p>

            <p>Information doesn&rsquo;t get lost very often.</p>

            <hr />

            <p>
              The designer understands enough engineering to have a meaningful conversation.
            </p>

            <p>
              The engineer understands enough product strategy to see the bigger picture.
            </p>

            <p>
              The PM understands enough design to know what good looks like.
            </p>

            <hr />

            <p>Nobody is doing everybody else&rsquo;s job.</p>

            <p>But everybody understands enough to collaborate.</p>

            <hr />

            <p>
              Think about how much time gets wasted when information has to be translated
              three or four times before it reaches the next person.
            </p>

            <p>Every handoff creates friction.</p>

            <p>Every translation creates loss.</p>

            <p>
              The people who reduce that friction become incredibly valuable.
            </p>

            <hr />

            <p><strong>They Help Teams Decide</strong></p>

            <p>This might be the most important one.</p>

            <p>Because anyone can generate options now.</p>

            <p>AI made that easy.</p>

            <hr />

            <p>The hard part is choosing.</p>

            <hr />

            <p>I&rsquo;ve sat in meetings where every option was reasonable.</p>

            <p>Every stakeholder had a valid point.</p>

            <p>Every direction had merit.</p>

            <hr />

            <p>The problem wasn&rsquo;t intelligence.</p>

            <p>The problem was convergence.</p>

            <hr />

            <p>Some people help teams generate ideas.</p>

            <p>A smaller group helps teams choose.</p>

            <hr />

            <p>
              And as AI continues to increase the number of options available to us, I think
              this skill becomes even more valuable.
            </p>

            <hr />

            <p><strong>They Build Alignment Systems</strong></p>

            <p>Most organizations have systems for execution.</p>

            <p>Design systems.</p>

            <p>Component libraries.</p>

            <p>Sprint rituals.</p>

            <p>PRDs.</p>

            <p>Roadmaps.</p>

            <hr />

            <p>Very few organizations have systems for alignment.</p>

            <hr />

            <p>How do we evaluate competing ideas?</p>

            <p>How do we make decisions?</p>

            <p>How do we surface disagreement early?</p>

            <p>How do we document why a decision was made?</p>

            <p>How do we avoid debating the same issue three months later?</p>

            <hr />

            <p>These sound boring.</p>

            <p>Until you&rsquo;ve worked on a team that doesn&rsquo;t have them.</p>

            <hr />

            <p>
              The teams that coordinate well are rarely relying on individual heroics.
            </p>

            <p>They build systems that make alignment easier.</p>

            <hr />

            <p>And that&rsquo;s why I think raising the ceiling is ultimately a team sport.</p>

            <hr />

            <p>Anyone can generate options.</p>

            <p>Fewer people can help a team choose.</p>

            <p>Anyone can create artifacts.</p>

            <p>Fewer people can create alignment.</p>

            <p>Anyone can build something.</p>

            <p>Fewer people can help a group of people move together.</p>

            <hr />

            <p>That&rsquo;s the opportunity.</p>

            <p>Not because AI made these skills new.</p>

            <p>It didn&rsquo;t.</p>

            <p>These skills have always mattered.</p>

            <hr />

            <p>What&rsquo;s changed is their value.</p>

            <p>The market is rewarding them more than before.</p>

            <p>Because the bottleneck moved.</p>

            <hr />

            <p>
              And that&rsquo;s why I believe the people who thrive in the next era
              won&rsquo;t necessarily be the people with the best prompts.
            </p>

            <p>Or the best AI workflow.</p>

            <p>Or the newest tool.</p>

            <hr />

            <p>
              They&rsquo;ll be the people who consistently help teams create clarity, make
              decisions, and move forward together.
            </p>

            <p>Those are the people who raise the ceiling.</p>

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
