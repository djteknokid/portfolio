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

const currentSlug = "coordination-era";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter14() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 14</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>14</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>The Coordination Era</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>So.</p>

            <p>I&rsquo;ve spent the last thirty minutes building a case.</p>

            <p>We looked at photography.</p>

            <p>We looked at basketball.</p>

            <p>We looked at what happens when technology raises the floor.</p>

            <p>
              Then we looked at three signals coming from product teams today.
            </p>

            <p>Different observations.</p>

            <p>Same conclusion.</p>

            <hr />

            <p>Creation is becoming abundant.</p>

            <p>Coordination is becoming scarce.</p>

            <hr />

            <p>So let me just say it directly.</p>

            <p>My hypothesis is this:</p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch14-coordination-era.png"
              alt="Person standing in a field looking up at a timeline of tools — hand drafting, rulers, desktop computer, smartphone, AI brain, puzzle pieces"
            >
              <p>
                <strong>
                  The next differentiator in product development is not creation.
                </strong>
              </p>

              <p><strong>It&rsquo;s coordination.</strong></p>
            </SlideRow>

            <hr />

            <p>And before we go any further, I want to clarify something.</p>

            <p>I&rsquo;m not arguing that coordination is new.</p>

            <p>Teams have always needed coordination.</p>

            <p>Teams have always needed alignment.</p>

            <p>Teams have always needed good decision making.</p>

            <hr />

            <p>Photography always needed storytelling.</p>

            <p>Basketball always needed teamwork.</p>

            <p>Music always needed culture.</p>

            <hr />

            <p>The question is not whether these things existed.</p>

            <p>The question is:</p>

            <p><strong>What is the market rewarding now?</strong></p>

            <hr />

            <p>Because that&rsquo;s what changed.</p>

            <p>Not the existence of coordination.</p>

            <p>The value of coordination.</p>

            <hr />

            <p>When creation was expensive, execution was the bottleneck.</p>

            <p>The people who could create had leverage.</p>

            <p>The people who could build had leverage.</p>

            <p>The people who could execute had leverage.</p>

            <hr />

            <p>But what happens when everybody can create?</p>

            <p>What happens when everybody can prototype?</p>

            <p>What happens when everybody can build?</p>

            <p>What happens when everybody can put an artifact on the table?</p>

            <hr />

            <p>The bottleneck moves.</p>

            <hr />

            <p>And I think that&rsquo;s exactly what&rsquo;s happening right now.</p>

            <hr />

            <p>When I say coordination, I&rsquo;m not talking about project management.</p>

            <p>I&rsquo;m not talking about status meetings.</p>

            <p>I&rsquo;m not talking about writing better Jira tickets.</p>

            <hr />

            <p>
              I&rsquo;m talking about the ability to help a group of smart people&mdash;
            </p>

            <p>People with different information.</p>

            <p>Different incentives.</p>

            <p>Different priorities.</p>

            <p>Different opinions.</p>

            <p>&mdash;arrive at a shared understanding of what matters.</p>

            <p>And then move together.</p>

            <hr />

            <p>That has always been hard.</p>

            <p>But something changed.</p>

            <hr />

            <p>In the past, execution was slow.</p>

            <p>Building something took time.</p>

            <p>Which meant teams had time to talk.</p>

            <p>Time to debate.</p>

            <p>Time to disagree.</p>

            <p>Time to realign.</p>

            <hr />

            <p>
              The friction of the tools accidentally created space for coordination.
            </p>

            <hr />

            <p>Today, the prototype already exists.</p>

            <p>The mockup already exists.</p>

            <p>The code already exists.</p>

            <p>Stakeholders are already reacting.</p>

            <p>And the team is expected to move.</p>

            <hr />

            <p>
              The coordination that used to happen accidentally now has to happen
              intentionally.
            </p>

            <hr />

            <p>
              And that&rsquo;s why I think most AI conversations are missing something.
            </p>

            <p>
              Because the dominant narrative right now is about individuals.
            </p>

            <p>The solo founder.</p>

            <p>The one-person startup.</p>

            <p>The 10x engineer.</p>

            <p>The AI-powered designer.</p>

            <p>The person doing the work of ten people.</p>

            <hr />

            <p>And to be fair&hellip;</p>

            <p>They&rsquo;re right.</p>

            <p>That&rsquo;s real.</p>

            <p>I&rsquo;ve experienced it myself.</p>

            <hr />

            <p>
              I can do things today that would have required an entire team just a few years
              ago.
            </p>

            <hr />

            <p>But here&rsquo;s what surprised me.</p>

            <p>The more powerful AI became&hellip;</p>

            <p>The more important the team became.</p>

            <hr />

            <p>That sounds backwards.</p>

            <p>Which is exactly why I think it&rsquo;s true.</p>

            <hr />

            <p>I have more individual leverage than I&rsquo;ve ever had.</p>

            <p>And yet I found myself spending more time on alignment.</p>

            <p>More time on decision making.</p>

            <p>More time helping teams converge.</p>

            <p>Not less.</p>

            <hr />

            <p>I didn&rsquo;t move away from people.</p>

            <p>I moved toward them.</p>

            <hr />

            <p>So here&rsquo;s how I think about where we are.</p>

            <hr />

            <p><strong>Wave 1</strong></p>

            <p>Individual leverage.</p>

            <p>One person doing the work of ten.</p>

            <p>That&rsquo;s what everyone is talking about today.</p>

            <p>And they&rsquo;re right.</p>

            <p>It&rsquo;s real.</p>

            <hr />

            <p><strong>Wave 2</strong></p>

            <p>Collective leverage.</p>

            <p>
              Ten people operating with the speed and clarity of a single system.
            </p>

            <p>That&rsquo;s what I think comes next.</p>

            <hr />

            <p>Because individual leverage helps people create more.</p>

            <p>Collective leverage helps organizations decide better.</p>

            <hr />

            <p>
              And if my hypothesis is correct, the second advantage becomes more valuable
              than the first.
            </p>

            <hr />

            <p>
              The organizations that learn how to align at AI speed.
            </p>

            <p>
              The organizations that learn how to make decisions faster than everyone else.
            </p>

            <p>
              The organizations that learn how to coordinate when everyone can create.
            </p>

            <p>Those organizations will win.</p>

            <hr />

            <p>Not because they have the smartest people.</p>

            <p>Not because they have the best tools.</p>

            <p>Because they learned how to solve the new bottleneck.</p>

            <hr />

            <p>
              Which brings me to the question I think is worth spending the next decade on.
            </p>

            <p>Not:</p>

            <p>How do I get better at AI?</p>

            <p>Not:</p>

            <p>How do I protect my role?</p>

            <p>Not:</p>

            <p>How do I create more?</p>

            <hr />

            <p>But:</p>

            <p>How do I help my team make better decisions?</p>

            <p>How do I create clarity?</p>

            <p>How do I create alignment?</p>

            <p>How do I help smart people move in the same direction?</p>

            <hr />

            <p>
              Because I don&rsquo;t think coordination is the skill.
            </p>

            <p>
              I think coordination is where the new value is accumulating.
            </p>

            <p>
              And that&rsquo;s what I believe the Coordination Era is really about.
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
