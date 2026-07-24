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

            <SlideRow
              image="/mindbook/ktalk/slides/ch15-ai-progression.png"
              alt="Progression: vibe coding → prototyping → agent workflows → agentic engineering"
            >
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
            </SlideRow>

            <hr />

            <p>Those things matter. You should learn them.</p>

            <p>But the more I worked on this talk, the more I realized something.</p>

            <p>The real story isn&rsquo;t the tools.</p>

            <p>The real story is the KPI.</p>

            <hr />

            <p>Most conversations about AI are focused on doing the same work faster.</p>

            <p>But they assume the job stayed the same.</p>

            <p>They assume the KPI is fixed.</p>

            <hr />

            <p>What if the market is changing what it values entirely?</p>

            <hr />

            <p>
              Every time the floor rose — photography, basketball, music — the market
              stopped rewarding the old craft at the old price.
            </p>

            <p>
              And started rewarding the capability the floor couldn&rsquo;t provide.
            </p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch15-kpi-expansion.png"
              alt="Four panels: Photo → Wedding, Player → Team, Song → Culture, Design → Alignment"
            >
              <p>Photo &rarr; Wedding</p>

              <p>Player &rarr; Team</p>

              <p>Song &rarr; Culture</p>

              <p>Design &rarr; <strong>Alignment</strong></p>
            </SlideRow>

            <hr />

            <p>The old KPI never disappears. It becomes the floor.</p>

            <p>Raising the ceiling means expanding your impact beyond the artifact.</p>

            <hr />

            <p>And this is the part I think many of us are missing.</p>

            <p>
              The conversation isn&rsquo;t: &ldquo;How do I become a better designer?&rdquo;
            </p>

            <p>
              The conversation is: &ldquo;What is the market rewarding now?&rdquo;
            </p>

            <hr />

            <p>Because history shows that whenever the floor rises, the market moves.</p>

            <p>It stops rewarding the old craft at the old price.</p>

            <p>
              And it starts rewarding the new capability that the floor can&rsquo;t provide.
            </p>

            <hr />

            <p>And the people who thrive are usually the ones who notice that shift early.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch15-raise-ceiling.png"
              alt="Person standing on a cliff edge looking toward a mountain peak rising above the clouds"
            >
              <p>So what happens next?</p>

              <p>If the floor keeps rising&hellip;</p>

              <p>What is the ceiling?</p>
            </SlideRow>

            <hr />

            <p>I think the market is already starting to answer that question.</p>

            <hr />

            <p>Not: can you create a great design?</p>

            <p>But: can you help the organization make a better decision?</p>

            <p>Can you create clarity?</p>

            <p>Can you create alignment?</p>

            <p>Can you help teams move forward together?</p>

            <hr />

            <p>That&rsquo;s what becomes valuable when creation becomes abundant.</p>

            <p>That&rsquo;s what raising the ceiling looks like.</p>

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
