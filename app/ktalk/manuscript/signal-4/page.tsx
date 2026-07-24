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
  { number: "B1" as unknown as number, slug: "bonus/yeawon-kim",  title: "Bonus — Yeawon Kim" },
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu",   title: "Bonus — Wenyang Mu" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",     title: "Bonus — Yuha Kim" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu",   title: "Bonus — Vivian Chu" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",     title: "Bonus — Insun Ahn" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",      title: "Bonus — Bryan Oh" },
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",    title: "Bonus — Chan Kim" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",   title: "Bonus — Taeho Kim" },
];

const currentSlug = "signal-4";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter12() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 12</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>12</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>
                Signal 4 —<br />The Complaint Changed
              </h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>This is probably the signal that convinced me the most.</p>

            <p>Because it&rsquo;s incredibly simple.</p>

            <p>All I had to do was listen.</p>

            <hr />

            <p>
              If you spend enough time around product teams, you start hearing the same
              complaints over and over.
            </p>

            <p>Not just inside your company.</p>

            <p>Everywhere.</p>

            <p>Slack groups.</p>

            <p>Conference hallways.</p>

            <p>LinkedIn posts.</p>

            <p>Design communities.</p>

            <p>Product communities.</p>

            <p>The complaints start sounding familiar.</p>

            <hr />

            <p>And something interesting happened.</p>

            <p>The complaint changed.</p>

            <hr />

            <p>For most of my career, the complaint was about capacity.</p>

            <p>We need more designers.</p>

            <p>We need more engineers.</p>

            <p>We need more resources.</p>

            <p>We need more time.</p>

            <p>We know what we want to build.</p>

            <p>We just don&rsquo;t have enough people to build it.</p>

            <hr />

            <p>That was the bottleneck.</p>

            <p>Execution.</p>

            <p>For years.</p>

            <p>Maybe decades.</p>

            <hr />

            <p>But listen to what people complain about today.</p>

            <hr />

            <p>We have too many options.</p>

            <p>Everybody has a different opinion.</p>

            <p>We keep revisiting the same decision.</p>

            <p>We change direction every week.</p>

            <p>We&rsquo;re generating a lot but not moving forward.</p>

            <p>The meeting ended and I still don&rsquo;t know what we decided.</p>

            <hr />

            <p>Do you hear the difference?</p>

            <hr />

            <p>The old complaint was:</p>

            <p>&ldquo;We can&rsquo;t build it.&rdquo;</p>

            <p>The new complaint is:</p>

            <p>&ldquo;We can&rsquo;t agree on it.&rdquo;</p>

            <hr />

            <p>The old complaint was scarcity.</p>

            <p>The new complaint is abundance.</p>

            <hr />

            <p>And I don&rsquo;t think that&rsquo;s a coincidence.</p>

            <p>Because complaints are usually symptoms.</p>

            <p>They tell you where the friction is.</p>

            <p>They tell you where the bottleneck is.</p>

            <p>They tell you what&rsquo;s slowing the system down.</p>

            <hr />

            <p>When the complaint changes, the constraint often changes with it.</p>

            <hr />

            <p>That&rsquo;s what got my attention.</p>

            <p>Because the market used to need execution.</p>

            <p>More builders.</p>

            <p>More designers.</p>

            <p>More engineers.</p>

            <p>More capacity.</p>

            <hr />

            <p>Increasingly, the market seems to need something else.</p>

            <p>Clarity.</p>

            <p>Alignment.</p>

            <p>Shared understanding.</p>

            <p>Decision making.</p>

            <hr />

            <p>Not people who can create more things.</p>

            <p>People who can help teams decide which things matter.</p>

            <hr />

            <p>
              And when I put that observation together with everything else&hellip;
            </p>

            <p>Artifacts becoming abundant.</p>

            <p>Options becoming abundant.</p>

            <p>Role boundaries becoming blurry.</p>

            <p>The complaint changing.</p>

            <hr />

            <p>All four signals pointed to the same place.</p>

            <p>And that&rsquo;s when I started thinking:</p>

            <p>Maybe we&rsquo;re entering a different era.</p>

            <p>Let me show you what I mean.</p>

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
