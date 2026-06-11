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

const currentSlug = "floor-raised";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter5() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ── SIDEBAR ── */}
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      {/* ── MAIN ── */}
      <main className="chapter-page">
        <article className="chapter-content">

          {/* Header */}
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>
              Chapter 5
            </p>
            <p className="chapter-part-subtitle">
              The Coordination Era · 조율의 시대
            </p>

            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div
                className="chapter-ghost-number"
                aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}
              >
                5
              </div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>
                The Floor Has Been Raised
              </h1>
            </div>
          </div>

          {/* Body */}
          <div className="chapter-body">

            {/* ── Slide: floor raised ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch5-floor-raised.png"
              alt="Person standing on a rising platform being pushed upward, pressing against a low ceiling"
            >
              <p>Let me introduce an idea that becomes important for the rest of this talk.</p>

              <p><strong>Technology raises the floor.</strong></p>

              <p>It always has.</p>

              <p>And I think it&rsquo;s happening again.</p>
            </SlideRow>

            <hr />

            <p>Today, almost anyone can create something that looks designed.</p>

            <p>A PM with Claude.</p>

            <p>An engineer with Cursor.</p>

            <p>A founder with v0.</p>

            <p>Someone who has never opened Figma before.</p>

            <p>
              They can create things that, not very long ago, would have required a designer.
            </p>

            <p>And I know that can feel uncomfortable.</p>

            <p>But I don&rsquo;t think it&rsquo;s a threat.</p>

            <p>I think it&rsquo;s a pattern.</p>

            <p>Because we&rsquo;ve seen this movie before.</p>

            <p>Many times.</p>

            <p>In many different industries.</p>

            <hr />

            <p>And every time it happened, the same thing happened.</p>

            <p>The people who focused on protecting the old floor struggled.</p>

            <p>The people who asked a different question thrived.</p>

            <p>Not:</p>

            <p>&ldquo;How do I protect my advantage?&rdquo;</p>

            <p>But:</p>

            <p>
              <strong>&ldquo;What does the market value now that the floor has changed?&rdquo;</strong>
            </p>

            <p>That&rsquo;s the question.</p>

            <p>Not:</p>

            <p>&ldquo;What do I do when a PM brings a prototype?&rdquo;</p>

            <p>Not:</p>

            <p>&ldquo;What AI tool should I learn next?&rdquo;</p>

            <p>The floor has been raised.</p>

            <p>Now what?</p>

            <hr />

            <p>Let me give you an example.</p>

            <p>Photography.</p>

            <hr />

            {/* ── Slide: film photographer ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch5-film-photographer.png"
              alt="Person in a darkroom holding up a strip of film negatives, prints hanging on a line behind them"
            >
              <p>Before digital cameras, being a photographer meant something very specific.</p>

              <p>You had expensive equipment.</p>

              <p>You understood film.</p>

              <p>You understood lighting.</p>

              <p>You knew how to capture moments other people couldn&rsquo;t.</p>

              <p>
                If it was a wedding, you were probably the only person in the room capable
                of reliably documenting the day.
              </p>

              <p>The KPI was simple:</p>

              <p><strong>Can you take a great photo?</strong></p>
            </SlideRow>

            <hr />

            <p>Then digital cameras arrived.</p>

            <p>Then smartphones.</p>

            <p>Then filters.</p>

            <p>Then computational photography.</p>

            <p>And suddenly everybody could take a decent photo.</p>

            <p>The floor rose.</p>

            <hr />

            <p>So what happened?</p>

            <p>Did photographers disappear?</p>

            <p>No.</p>

            <p>Photography exploded.</p>

            <p>More photos were taken than ever before.</p>

            <p>But something interesting happened.</p>

            <p>
              The thing that used to make photographers special no longer made them special.
            </p>

            <p>The market changed.</p>

            <hr />

            {/* ── Slide: wedding photographer ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch5-wedding-photographer.png"
              alt="Photographer from behind, shooting a wedding party on a scenic terrace"
            >
              <p>The photographers who thrived weren&rsquo;t asking:</p>

              <p>&ldquo;How do I take a slightly sharper photo?&rdquo;</p>

              <p>They were asking:</p>

              <p><strong>&ldquo;How do I make this wedding unforgettable?&rdquo;</strong></p>

              <p>That&rsquo;s a completely different question.</p>
            </SlideRow>

            <hr />

            <p>One question focuses on the artifact.</p>

            <p>The other focuses on the outcome.</p>

            <p>One optimizes the photo.</p>

            <p>The other optimizes the experience.</p>

            <hr />

            <p>Think about it.</p>

            <p>Nobody hires a wedding photographer because they own a camera.</p>

            <p>Everybody owns a camera.</p>

            <p>Nobody hires a wedding photographer because they know how to press a button.</p>

            <p>Everybody knows how to press a button.</p>

            <p>They hire them because they know where to stand.</p>

            <p>They know what moment is about to happen.</p>

            <p>They know how to direct people.</p>

            <p>They know how to tell a story.</p>

            <p>
              They know how to make a once-in-a-lifetime event feel memorable.
            </p>

            <hr />

            <p>The craft didn&rsquo;t disappear.</p>

            <p>The KPI changed.</p>

            <p>Before:</p>

            <p><strong>Take a great photo.</strong></p>

            <p>After:</p>

            <p><strong>Create a memorable wedding.</strong></p>

            <p>The unit of value expanded.</p>

            <p>From:</p>

            <p>Photo</p>

            <p>To:</p>

            <p>Wedding.</p>

            <hr />

            <p>And I think that&rsquo;s the important lesson.</p>

            <p>The photographers who survived didn&rsquo;t abandon photography.</p>

            <p>They expanded their impact beyond photography.</p>

            <hr />

            <p>Because that&rsquo;s what happens when technology raises the floor.</p>

            <p>
              The thing that used to make you special no longer makes you special.
            </p>

            <p>And the market starts rewarding something bigger.</p>

            <p>Something higher.</p>

            <hr />

            <p>So now we have a new question.</p>

            <p>If AI is raising the floor for designers&hellip;</p>

            <p>What is the new KPI?</p>

            <p>We&rsquo;ll come back to that.</p>

            <p>But first, let me show you another example.</p>

            <p>Because photography teaches us what happens to individuals.</p>

            <p>The next example teaches us what happens to entire teams.</p>

          </div>

          {/* Prev / Next */}
          <nav className="chapter-nav chapter-prose">
            {prev
              ? <Link href={`/ktalk/manuscript/${prev.slug}`}>← {prev.title}</Link>
              : <span />}
            {next
              ? <Link href={`/ktalk/manuscript/${next.slug}`}>{next.title} →</Link>
              : <span />}
          </nav>

        </article>
      </main>

    </div>
  );
}
