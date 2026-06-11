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

const currentSlug = "signal-1";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter9() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 9</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>9</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>
                Signal 1 —<br />Artifact Creation Is No Longer Scarce
              </h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>The first signal is probably the most obvious one.</p>

            <p>And honestly, it&rsquo;s the one making everybody uncomfortable.</p>

            <hr />

            <p>
              For most of the history of product development, creating artifacts was
              expensive.
            </p>

            <p>Wireframes took time.</p>

            <p>Mockups took skill.</p>

            <p>Prototypes took even more skill.</p>

            <p>
              If you wanted something interactive and realistic, there were only a handful
              of people in the room who could make it happen.
            </p>

            <p>That scarcity shaped how product teams worked.</p>

            <p>PMs owned requirements.</p>

            <p>Designers owned artifacts.</p>

            <p>Engineers owned implementation.</p>

            <p>Not because those were perfect boundaries.</p>

            <p>Because crossing those boundaries was expensive.</p>

            <hr />

            <p>But look around now.</p>

            <p>PMs are building prototypes.</p>

            <p>Engineers are building prototypes.</p>

            <p>Founders are building prototypes.</p>

            <p>Researchers are building prototypes.</p>

            <p>Sometimes AI is building prototypes.</p>

            <hr />

            <p>A year ago, if somebody had an idea, they described it.</p>

            <p>Today, they show it.</p>

            <p>That&rsquo;s a big difference.</p>

            <hr />

            <p>And I&rsquo;ve noticed something.</p>

            <p>The artifact itself is becoming less important.</p>

            <p>Not because artifacts don&rsquo;t matter.</p>

            <p>Because everybody has one.</p>

            <hr />

            <p>Walk into a meeting today and you&rsquo;ll see it.</p>

            <p>A PM has a prototype.</p>

            <p>The designer has a prototype.</p>

            <p>The engineer has a prototype.</p>

            <p>Everyone has an opinion.</p>

            <p>And now everyone has a visual representation of that opinion.</p>

            <hr />

            <p>The artifact used to be the contribution.</p>

            <p>
              Increasingly, it feels like the artifact is the starting point.
            </p>

            <p>It&rsquo;s the thing you bring into the conversation.</p>

            <p>Not the thing you&rsquo;re valued for.</p>

            <hr />

            <p>And that&rsquo;s a subtle shift.</p>

            <p>But it&rsquo;s an important one.</p>

            <p>Because if everybody can create an artifact&hellip;</p>

            <p>If everybody can visualize an idea&hellip;</p>

            <p>If everybody can put something on the table&hellip;</p>

            <p>Then what exactly becomes valuable?</p>

            <hr />

            <p>I don&rsquo;t think that&rsquo;s a design question.</p>

            <p>I think that&rsquo;s a product development question.</p>

            <p>
              And it&rsquo;s the first signal that made me think the bottleneck was moving.
            </p>

            <p>
              Because once artifact creation becomes abundant&hellip;
            </p>

            <p>Creation got faster.</p>

            <p>Decision making didn&rsquo;t.</p>

            <hr />

            <p>The bottleneck is no longer generating ideas.</p>

            <p>The bottleneck is choosing between them.</p>

            <p>Let&rsquo;s look at the next signal.</p>

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
