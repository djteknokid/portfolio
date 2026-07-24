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
  { number: 16, slug: "how-to-raise",      title: "The Four Elements of Coordination" },
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

const currentSlug = "signals-intro";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter8() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 8</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>8</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>My Real Talk Begins Here</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>OK.</p>

            <p>Everything up until now has been a theory.</p>

            <p>Photography.</p>

            <p>Basketball.</p>

            <p>Patterns.</p>

            <p>History.</p>

            <p>Interesting stories.</p>

            <p>But this is where my real talk begins.</p>

            <p>Because now I want to tell you what I&rsquo;ve actually been seeing.</p>

            <p>Not on Twitter.</p>

            <p>Not on LinkedIn.</p>

            <p>Not in a podcast.</p>

            <p>Inside real product teams.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch8-artifact-overflow.png"
              alt="Person overwhelmed at a laptop with wireframes and design artifacts flying everywhere"
            >
              <p>
                Over the last year, I&rsquo;ve been working on AI products inside a large
                enterprise.
              </p>

              <p>And honestly, I thought I knew what was coming.</p>

              <p>I thought AI would make teams faster.</p>

              <p>I thought we&rsquo;d produce more.</p>
            </SlideRow>

            <p>I thought we&rsquo;d prototype more.</p>

            <p>I thought we&rsquo;d ship more.</p>

            <p>And to be fair, all of that happened.</p>

            <p>We absolutely moved faster.</p>

            <hr />

            <p>But something else happened.</p>

            <p>Something I wasn&rsquo;t expecting.</p>

            <p>The more everyone could create&hellip;</p>

            <p>The harder it became to decide.</p>

            <hr />

            <p>I started seeing strange situations.</p>

            <p>A designer would come back with a complete end-to-end flow.</p>

            <p>Thoughtful.</p>

            <p>Detailed.</p>

            <p>Well executed.</p>

            <p>
              And instead of helping the team move forward, the conversation became:
            </p>

            <p>&ldquo;AI can&rsquo;t design.&rdquo;</p>

            <p>&ldquo;This prototype isn&rsquo;t good enough.&rdquo;</p>

            <p>&ldquo;This isn&rsquo;t how it should be done.&rdquo;</p>

            <p>Suddenly we weren&rsquo;t talking about the product anymore.</p>

            <p>We were arguing about the artifact.</p>

            <hr />

            <p>Then I&rsquo;d show up with several prototypes of my own.</p>

            <p>Not because I thought they were right.</p>

            <p>Because I wanted options.</p>

            <p>Because I wanted feedback.</p>

            <p>Because I wanted to explore.</p>

            <p>
              And instead of discussing which direction to pursue, sometimes we&rsquo;d get
              pulled into process debates.
            </p>

            <p>Should we make a flowchart first?</p>

            <p>Should we create personas first?</p>

            <p>Should we follow the traditional design process first?</p>

            <p>Again, we weren&rsquo;t deciding.</p>

            <p>We were discussing how to discuss.</p>

            <hr />

            <p>
              I remember an engineer showing me an interaction he had built directly in code.
            </p>

            <p>A genuinely good idea.</p>

            <p>Something we should have talked about as a team.</p>

            <p>But there wasn&rsquo;t really a place for it.</p>

            <p>So it stayed on his laptop.</p>

            <hr />

            <p>
              And after seeing enough of these moments, I started noticing a pattern.
            </p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch8-meetings-different.png"
              alt="Person juggling multiple flying design artifacts — wireframes, images, video frames — from behind a laptop"
            >
              <p>The meetings felt different.</p>

              <p>Not worse.</p>

              <p>Just different.</p>
            </SlideRow>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch8-everyone-has-prototype.png"
              alt="Three people at a meeting table — each holding a thick stack of printed prototypes, arguing past each other"
            >
              <p>There were more ideas.</p>

              <p>More prototypes.</p>

              <p>More artifacts.</p>

              <p>More options.</p>

              <p>More directions.</p>

              <p>More opinions.</p>

              <p>More everything.</p>

              <p>And somehow&hellip;</p>
            </SlideRow>

            <p>Less clarity.</p>

            <hr />

            <p>
              The strange thing about AI is that it solved a lot of execution problems.
            </p>

            <p>
              But every time it solved one problem, it seemed to expose another.
            </p>

            <hr />

            <p>More output.</p>

            <p>More collision.</p>

            <p>Less clarity.</p>

            <hr />

            <p>And that&rsquo;s when I realized:</p>

            <p>This isn&rsquo;t an execution problem.</p>

            <p>This is a coordination problem.</p>

            <hr />

            <p>Then I started noticing the same pattern everywhere.</p>

            <p>In Silicon Valley.</p>

            <p>In design communities.</p>

            <p>In conversations between PMs and designers.</p>

            <p>In hiring discussions.</p>

            <p>In conference talks.</p>

            <p>People weren&rsquo;t asking:</p>

            <p>&ldquo;How do I create?&rdquo;</p>

            <p>People were increasingly asking:</p>

            <p>&ldquo;How do we decide?&rdquo;</p>

            <hr />

            <p>
              And once I started looking for it, I couldn&rsquo;t stop seeing it.
            </p>

            <p>
              Let me show you three signals that convinced me this wasn&rsquo;t just happening
              on my team.
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
