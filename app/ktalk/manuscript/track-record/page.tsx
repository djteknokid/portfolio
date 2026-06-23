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

const currentSlug = "track-record";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter2() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 2</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>2</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Track Record</h1>
            </div>
          </div>

          <div className="chapter-body">

            {/* ── Slide: designer directing AI ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch2-designer-directing-ai.png"
              alt="A person standing at a whiteboard covered in wireframes, directing a robot assistant that holds a pen"
            >
              <p>Let me give you a little context on how I got here.</p>

              <p>
                Two years ago, I gave a one-man skit called{" "}
                <em>Designer in 2027.</em>
              </p>

              <p>The premise was simple.</p>

              <p>AI would do most of the execution work.</p>

              <p>Designers would spend more time doing things AI couldn&rsquo;t do well.</p>

              <p>Talking to users.</p>

              <p>Finding inspiration.</p>

              <p>Connecting dots.</p>

              <p>Making decisions.</p>

              <p>Directing AI rather than operating it.</p>

              <p>At the time, it felt a little extreme.</p>

              <p>Some people thought I was joking.</p>

              <p>Some people hoped I was joking.</p>
            </SlideRow>

            <hr />

            <p>Then last year, I gave another talk.</p>

            <p>This time I did a live demo.</p>

            <p>And I said something that made a few people visibly uncomfortable.</p>

            <p>I told them I hadn&rsquo;t opened Figma in almost a year.</p>

            <p>And then I said:</p>

            <blockquote>&ldquo;Maybe Figma is dead.&rdquo;</blockquote>

            <p>I don&rsquo;t actually believe that.</p>

            <p>If anything, Figma has adapted incredibly well.</p>

            <p>The point wasn&rsquo;t Figma.</p>

            <p>The point was that the value was moving.</p>

            <p>More designers would start pushing code.</p>

            <p>More prototypes would be built directly in code.</p>

            <p>The boundary between design and engineering would get blurry.</p>

            <p>
              That prediction doesn&rsquo;t sound nearly as strange today as it did back then.
            </p>

            <hr />

            {/* ── Slide: PM transition ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch2-pm-transition.png"
              alt="Person at a desk holding up a cap labeled PM, looking at it thoughtfully"
            >
              <p>And now, I&rsquo;ve made another move.</p>

              <p>I recently transitioned from design into product management.</p>

              <p>Not because design is dead.</p>

              <p>Not because I ran out of things to design.</p>

              <p>But because I kept asking the same question:</p>

              <blockquote>
                Where is the bottleneck?<br />
                Where is the friction?<br />
                Where is the thing slowing teams down right now?
              </blockquote>

              <p>And every time I followed that question, it led me somewhere different.</p>

              <p>In 2024, I believed designers would direct AI, not just use it.</p>

              <p>In 2025, I believed designers would increasingly build with code.</p>

              <p>In 2026, I believe the next bottleneck is coordination.</p>

              <p>Not execution.</p>

              <p>Not prototyping.</p>

              <p>Not generating ideas.</p>

              <p>Coordination.</p>

              <p>I&rsquo;m not telling you this to impress you.</p>

              <p>Honestly, I&rsquo;ve been wrong about plenty of things.</p>

              <p>I&rsquo;m telling you this because there is a pattern.</p>

              <p>Every time, the opportunity appeared where the bottleneck appeared.</p>

              <p>And I think the bottleneck has moved again.</p>

              <p>So let&rsquo;s talk about where it went.</p>
            </SlideRow>

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
