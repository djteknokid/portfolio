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
];

const currentSlug = "why-happening";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter4() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 4</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>4</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Why This Is Happening</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>So let&rsquo;s go back to that question.</p>

            <p>A PM walks into a design review with a polished prototype.</p>

            <p>And the designer thinks:</p>

            <blockquote><strong>&ldquo;What am I here for?&rdquo;</strong></blockquote>

            <p>The question I hear everywhere right now is some version of this:</p>

            <p><strong>What does UX do when the PM already built the prototype?</strong></p>

            <p>It&rsquo;s a fair question.</p>

            <p>But I think we&rsquo;re asking the wrong version of it.</p>

            <hr />

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

            <hr />

            <p>What changed is two things.</p>

            <p><strong>Speed.</strong></p>

            <p>What used to take days now takes an hour.</p>

            <p>Sometimes less.</p>

            <p>
              A PM can describe an idea to an AI and get back something tangible almost
              immediately.
            </p>

            <hr />

            <p>And the second thing is:</p>

            <p><strong>Fidelity.</strong></p>

            <p>The old artifacts looked rough.</p>

            <p>Boxes.</p>

            <p>Arrows.</p>

            <p>Gray rectangles.</p>

            <p>Nobody confused them for the final product.</p>

            <p>The roughness itself was a signal.</p>

            <p>It told everyone in the room:</p>

            <p>&ldquo;This is a starting point.&rdquo;</p>

            <hr />

            <p>Now the artifacts look finished.</p>

            <p>Real components.</p>

            <p>Real interactions.</p>

            <p>Real data.</p>

            <p>Sometimes they look good enough to ship.</p>

            <p>And that&rsquo;s where the confusion starts.</p>

            <p>Because the PM&rsquo;s intention didn&rsquo;t change.</p>

            <p>The signal changed.</p>

            <hr />

            {/* ── Slide: PM explains prototype ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch4-pm-explains.png"
              alt="Person in an LA cap looking uncertain at a wireframe printout while a colleague leans in pointing at it"
            >
              <p>Now let me tell you something from the PM side of the table.</p>

              <p>Because I&rsquo;m sitting on that side now.</p>

              <p>
                When I show up with a prototype, I&rsquo;m not trying to take the
                designer&rsquo;s job.
              </p>

              <p>Honestly, the prototype is usually my attempt to communicate faster.</p>

              <p>That&rsquo;s it.</p>

              <p>It&rsquo;s a visual artifact.</p>

              <p>A conversation starter.</p>

              <p>A way to explain what I&rsquo;m thinking.</p>
            </SlideRow>

            <hr />

            <p>
              What I actually want from the designer is exactly what I&rsquo;ve always
              wanted from the designer.
            </p>

            <p>Is there a better flow?</p>

            <p>Is there a better interaction?</p>

            <p>Is there a better way to communicate this information?</p>

            <p>What am I missing?</p>

            <p>What am I not seeing?</p>

            <p>Where am I wrong?</p>

            <hr />

            <p>So the expectation didn&rsquo;t really change.</p>

            <p>The artifact changed.</p>

            <p>The communication changed.</p>

            <p>The signal changed.</p>

            <hr />

            {/* ── Slide: value question ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch4-value-question.png"
              alt="Person standing in front of a massive complex flowchart, scratching their head with a pencil"
            >
              <p>And that&rsquo;s when I realized something.</p>

              <p>This was never really a role question.</p>

              <p>It was always a value question.</p>
            </SlideRow>

            <hr />

            <p>For years, specialized tools created specialized lanes.</p>

            <p>Not because they were the perfect lanes.</p>

            <p>Because crossing those lanes was expensive.</p>

            <p>Design tools were hard.</p>

            <p>Engineering tools were hard.</p>

            <p>Prototyping tools were hard.</p>

            <p>The friction enforced the structure.</p>

            <hr />

            <p>AI removed a lot of that friction.</p>

            <p>
              And once the friction disappeared, we were left with a much more uncomfortable
              question:
            </p>

            <p><strong>What is a designer actually for?</strong></p>

            <p>Not the tool.</p>

            <p>Not the artifact.</p>

            <p>Not the process.</p>

            <p>The value.</p>

            <hr />

            <p>And I think that&rsquo;s the question we need to answer.</p>

            <p>Not just as designers.</p>

            <p>But as product teams.</p>

            <p>
              Because I don&rsquo;t think what&rsquo;s happening is unique to design.
            </p>

            <p>I think we&rsquo;re seeing the beginning of a much larger shift.</p>

            <p>
              And once I started looking outside of design, I began noticing the same
              pattern everywhere.
            </p>

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
