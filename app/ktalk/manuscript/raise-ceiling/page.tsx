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

const currentSlug = "raise-ceiling";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter15() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 15</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>15</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Raise the Ceiling</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>
              When I first started preparing this talk, I thought this section would be
              about AI.
            </p>

            <p>I thought I would spend twenty minutes showing you tools.</p>

            <p>Vibe coding.</p>

            <p>Prototyping.</p>

            <p>Agent workflows.</p>

            <p>MCP.</p>

            <p>Agentic engineering.</p>

            <p>All the things we&rsquo;re all experimenting with right now.</p>

            <hr />

            <p>And don&rsquo;t get me wrong.</p>

            <p>Those things matter.</p>

            <p>You should learn them.</p>

            <p>I&rsquo;m learning them too.</p>

            <p>The tools will keep improving.</p>

            <p>The models will keep improving.</p>

            <p>The market will force all of us to adapt.</p>

            <hr />

            <p>
              But the more I worked on this talk, the more I realized something.
            </p>

            <p>The real story isn&rsquo;t the tools.</p>

            <p>The real story is the KPI.</p>

            <hr />

            <p>
              Most conversations about AI are focused on how to do the same work faster.
            </p>

            <p>How to generate more designs.</p>

            <p>How to write better prompts.</p>

            <p>How to automate repetitive tasks.</p>

            <hr />

            <p>Those are useful questions.</p>

            <p>But I think they&rsquo;re answering the wrong problem.</p>

            <hr />

            <p>Because they assume the job stayed the same.</p>

            <p>They assume the KPI is fixed.</p>

            <p>They assume the goal is still:</p>

            <p>Do the same thing, but faster.</p>

            <hr />

            <p>But what if the market is changing what it values entirely?</p>

            <hr />

            <p>Let&rsquo;s go back to photography.</p>

            <p>Before smartphones.</p>

            <p>Before filters.</p>

            <p>Before computational photography.</p>

            <p>The KPI was simple.</p>

            <p>Can you take a technically great photo?</p>

            <p>That was the job.</p>

            <p>That was the value.</p>

            <hr />

            <p>Then the floor rose.</p>

            <p>Everyone got a camera.</p>

            <p>Everyone got filters.</p>

            <p>Everyone got editing tools.</p>

            <p>Everyone got access.</p>

            <hr />

            <p>And something interesting happened.</p>

            <p>
              The photographers who survived weren&rsquo;t the ones taking slightly better
              photos.
            </p>

            <p>
              The photographers who thrived were the ones asking a bigger question.
            </p>

            <p>Not:</p>

            <p>&ldquo;How do I take a better photo?&rdquo;</p>

            <p>But:</p>

            <p>
              <strong>&ldquo;How do I make this wedding unforgettable?&rdquo;</strong>
            </p>

            <hr />

            <p>The KPI changed.</p>

            <p>The unit of value expanded.</p>

            <p>From:</p>

            <p>Photo</p>

            <p>To:</p>

            <p>Wedding.</p>

            <hr />

            <p>Now let&rsquo;s look at basketball.</p>

            <p>For decades, big men had a clear job.</p>

            <p>Rebound.</p>

            <p>Block shots.</p>

            <p>Score in the post.</p>

            <p>Stay near the basket.</p>

            <hr />

            <p>Then analytics arrived.</p>

            <p>The floor rose.</p>

            <p>Everybody understood the math.</p>

            <p>Everybody understood spacing.</p>

            <p>Everybody understood the value of shooting.</p>

            <hr />

            <p>And the question changed.</p>

            <p>Not:</p>

            <p>&ldquo;Can you be a great center?&rdquo;</p>

            <p>But:</p>

            <p>
              <strong>&ldquo;Can you help the team win in the new game?&rdquo;</strong>
            </p>

            <hr />

            <p>The KPI changed.</p>

            <p>The unit of value expanded.</p>

            <p>From:</p>

            <p>Player</p>

            <p>To:</p>

            <p>Team.</p>

            <hr />

            <p>Now let&rsquo;s look at music.</p>

            <p>Take NewJeans.</p>

            <p>Take BTS.</p>

            <p>
              Nobody believes they succeeded because they had access to a microphone.
            </p>

            <p>Millions of people have microphones.</p>

            <p>Millions of people can record songs.</p>

            <hr />

            <p>The song matters.</p>

            <p>Of course it matters.</p>

            <p>But the song isn&rsquo;t the entire value.</p>

            <hr />

            <p>What made them special?</p>

            <p>Identity.</p>

            <p>Community.</p>

            <p>Emotion.</p>

            <p>Story.</p>

            <p>Culture.</p>

            <p>Movement.</p>

            <hr />

            <p>The KPI expanded.</p>

            <p>From:</p>

            <p>Song</p>

            <p>To:</p>

            <p>Culture.</p>

            <hr />

            <p>And now let&rsquo;s talk about us.</p>

            <p>Design.</p>

            <hr />

            <p>Historically, our KPI looked something like this:</p>

            <p>Can you create a wireframe?</p>

            <p>Can you create a mockup?</p>

            <p>Can you create a prototype?</p>

            <p>Can you create a great experience?</p>

            <hr />

            <p>Those things still matter.</p>

            <p>Just like photographers still need to take good photos.</p>

            <p>Just like basketball players still need fundamentals.</p>

            <p>Just like musicians still need good songs.</p>

            <hr />

            <p>The old KPI never completely disappears.</p>

            <p>It becomes the floor.</p>

            <hr />

            <p>And that&rsquo;s exactly what AI is doing.</p>

            <p>It&rsquo;s raising the floor.</p>

            <p>More people can create artifacts than ever before.</p>

            <p>More people can build prototypes.</p>

            <p>More people can visualize ideas.</p>

            <p>More people can contribute.</p>

            <hr />

            <p>
              And this is the part I think many of us are missing.
            </p>

            <p>
              The conversation isn&rsquo;t: &ldquo;How do I become a better designer?&rdquo;
            </p>

            <p>
              The conversation is: &ldquo;What is the market rewarding now?&rdquo;
            </p>

            <hr />

            <p>
              Because history shows that whenever the floor rises, the market moves.
            </p>

            <p>
              It stops rewarding the old craft at the old price.
            </p>

            <p>
              And it starts rewarding the new capability that the floor can&rsquo;t provide.
            </p>

            <hr />

            <p>
              And the people who thrive are usually the ones who notice that shift early.
            </p>

            <hr />

            <p>So what happens next?</p>

            <p>If the floor keeps rising&hellip;</p>

            <p>What is the ceiling?</p>

            <hr />

            <p>I think the market is already starting to answer that question.</p>

            <hr />

            <p>Not:</p>

            <p>Can you create a great artifact?</p>

            <p>But:</p>

            <p>Can you help the organization make better decisions?</p>

            <p>Can you create clarity?</p>

            <p>Can you create alignment?</p>

            <p>Can you create shared understanding?</p>

            <p>Can you help teams move forward together?</p>

            <hr />

            <p>
              Because that&rsquo;s what becomes valuable when creation becomes abundant.
            </p>

            <hr />

            <p>And once I saw that pattern, I couldn&rsquo;t unsee it.</p>

            <p>Photography:</p>

            <p>Photo &rarr; Wedding</p>

            <p>Basketball:</p>

            <p>Player &rarr; Team</p>

            <p>Music:</p>

            <p>Song &rarr; Culture</p>

            <p>Design:</p>

            <p>Artifact &rarr; Decision</p>

            <hr />

            <p>
              Every one of those professions expanded beyond the craft itself.
            </p>

            <p>The impact became larger than the artifact.</p>

            <hr />

            <p>That&rsquo;s what raising the ceiling means.</p>

            <hr />

            <p>Technology raises the floor.</p>

            <p>The market changes the KPI.</p>

            <p>Professionals raise the ceiling.</p>

            <hr />

            <p>The floor is execution.</p>

            <p>The ceiling is impact.</p>

            <hr />

            <p>The floor is creation.</p>

            <p>The ceiling is outcomes.</p>

            <hr />

            <p>The floor is individual contribution.</p>

            <p>The ceiling is helping an entire system succeed.</p>

            <hr />

            <p>
              The future may not belong to the people who create the best artifacts.
            </p>

            <p>
              The future may belong to the people who expand their impact beyond their
              craft.
            </p>

            <p>From photo to wedding.</p>

            <p>From player to team.</p>

            <p>From song to culture.</p>

            <p>From design to decision.</p>

            <p>That&rsquo;s what I think raising the ceiling looks like.</p>

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
