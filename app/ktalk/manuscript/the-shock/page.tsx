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

const currentSlug = "the-shock";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter3() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 3</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>3</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>The Shock</h1>
            </div>
          </div>

          <div className="chapter-body">

            {/* ── Slide: design review shock ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch3-design-review.png"
              alt="Person holding a laptop prototype in a meeting room — half the room cheering, the other half looking uneasy"
            >
              <p>Let me paint a picture.</p>

              <p>A PM walks into a design review.</p>

              <p>They&rsquo;re not holding a PRD.</p>

              <p>They&rsquo;re not holding a wireframe.</p>

              <p>They&rsquo;re holding a prototype.</p>

              <p>High fidelity.</p>

              <p>Real components.</p>

              <p>Interactive.</p>

              <p>Built in code.</p>

              <p>Overnight.</p>

              <p>And the designer in that room looks at it, and thinks one thing.</p>

              <blockquote>So&hellip; what am I here for?</blockquote>

              <p>I want to sit in that moment for a second.</p>

              <p>Not skip past it. Not reframe it. Not reassure you.</p>

              <p>Just sit in it.</p>
            </SlideRow>

            <hr />

            {/* ── Slide: PM sketch ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch3-pm-sketch.png"
              alt="Person standing, showing a rough wireframe sketch to a colleague seated at a desk"
            >
              <p>Because here&rsquo;s the thing.</p>

              <p>This is actually not new.</p>

              <p>PMs have always brought visual artifacts.</p>

              <p>A sketch.</p>

              <p>A diagram.</p>

              <p>A competitor screenshot.</p>

              <p>A rough mockup.</p>

              <p>A PowerPoint slide.</p>

              <p>A napkin drawing.</p>

              <p>PMs have always tried to communicate ideas visually.</p>

              <p>That&rsquo;s not what changed.</p>
            </SlideRow>

            {/* ── Slide: speed vs fidelity ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch3-speed-vs-fidelity.png"
              alt="Left: people riding a rocket fast. Right: two people carefully laying stone bricks by hand."
            >
              <p>What changed is two things.</p>

              <p>Speed.</p>

              <p>What used to take days now takes an hour.</p>

              <p>Sometimes less.</p>

              <p>A PM can describe an idea to an AI and get back something tangible almost immediately.</p>

              <p>And the second thing is:</p>

              <p>Fidelity.</p>

              <p>The old artifacts looked rough.</p>

              <p>Boxes.</p>

              <p>Arrows.</p>

              <p>Gray rectangles.</p>

              <p>Nobody confused them for the final product.</p>

              <p>The roughness itself was a signal.</p>

              <p>It told everyone in the room:</p>

              <blockquote>&ldquo;This is a starting point.&rdquo;</blockquote>
            </SlideRow>

            <hr />

            <p>A new model.</p>

            <p>A new feature.</p>

            <p>A new thing that used to require a designer.</p>

            <p>That now doesn&rsquo;t.</p>

            <p>
              Tufts University did a study ranking every occupation by AI exposure.
            </p>

            <p>Designers came in number one.</p>

            <p>Score of 100.</p>

            <p>The most AI-exposed occupation they measured.</p>

            <hr />

            <p>And the hiring data is starting to show it.</p>

            <p>
              If you look at PM hiring versus designer hiring over the last two years —
              the lines are diverging.
            </p>

            <p>PM hiring is up.</p>

            <p>Designer hiring is down.</p>

            <p>Not dramatically. Not catastrophically.</p>

            <p>But consistently.</p>

            <p>In one direction.</p>

            <hr />

            {/* ── Slide: designer overwhelmed ── */}
            <SlideRow
              image="/mindbook/koreatalk/slides/ch3-designer-overwhelmed.png"
              alt="Person at a desk with hands on head, surrounded by scattered sketches, overwhelmed"
            >
              <p>So the designer in that meeting room — they&rsquo;re not being paranoid.</p>

              <p>They&rsquo;re reading the room correctly.</p>

              <p>Something has changed.</p>

              <p><strong>What am I here for?</strong></p>

              <p>It&rsquo;s a real question.</p>

              <p>And I think it deserves a real answer.</p>
            </SlideRow>

            <hr />

            <p>I&rsquo;m not going to give you the answer yet.</p>

            <p>
              Because the answer I want to give you — I need you to see something first.
            </p>

            <p>I need you to see a pattern.</p>

            <p>A pattern that&rsquo;s much older than AI.</p>

            <p>A pattern that&rsquo;s happened before.</p>

            <p>More than once.</p>

            <p>And every time it happened — people asked the same question.</p>

            <p>And every time — the answer was not what they expected.</p>

            <hr />

            <p>Let&rsquo;s figure it out together.</p>

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
