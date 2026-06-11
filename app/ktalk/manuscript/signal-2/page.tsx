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

const currentSlug = "signal-2";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter10() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 10</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true" style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>10</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>
                Signal 2 —<br />Role Boundaries Are Blurring
              </h1>
            </div>
          </div>

          <div className="chapter-body">

            <SlideRow
              image="/mindbook/koreatalk/slides/ch10-specialization.png"
              alt="Three people sitting in separate dashed circles on the floor, each in their own lane, smiling"
            >
              <p>This signal is probably the most personal for me.</p>

              <p>Because I lived it.</p>

              <hr />

              <p>
                For most of my career, product teams were organized around specialization.
              </p>
            </SlideRow>

            <p>PMs wrote requirements.</p>

            <p>Designers designed.</p>

            <p>Engineers built.</p>

            <p>Of course there was overlap.</p>

            <p>
              But generally speaking, everybody knew where their lane started and where it
              ended.
            </p>

            <hr />

            <p>
              And honestly, those boundaries weren&rsquo;t created because somebody thought
              they were ideal.
            </p>

            <p>They existed because crossing them was expensive.</p>

            <p>Design tools took years to learn.</p>

            <p>Engineering tools took years to learn.</p>

            <p>Prototyping took time.</p>

            <p>Everything took effort.</p>

            <p>The friction naturally created boundaries.</p>

            <hr />

            <p>That friction is disappearing.</p>

            <hr />

            <p>Today, PMs are showing up with prototypes.</p>

            <p>Engineers are giving UX feedback.</p>

            <p>Designers are pushing code.</p>

            <p>Researchers are generating concepts.</p>

            <p>Everyone is moving into everyone else&rsquo;s territory.</p>

            <hr />

            <p>And personally, I think that&rsquo;s a good thing.</p>

            <p>
              Some of the best teams I&rsquo;ve worked on looked exactly like that.
            </p>

            <p>A designer who understands code.</p>

            <p>A PM who can prototype.</p>

            <p>An engineer who has product sense.</p>

            <p>Those teams move fast.</p>

            <hr />

            <p>The overlap isn&rsquo;t the problem.</p>

            <p>The overlap is actually the opportunity.</p>

            <hr />

            <p>The problem is what happens next.</p>

            <SlideRow
              image="/mindbook/koreatalk/slides/ch10-talking-different.png"
              alt="Three people each moving different puzzle pieces in different directions, no one coordinating"
            >
              <p>Imagine a meeting.</p>

              <p>The PM is looking at flow.</p>

              <p>The designer is looking at interaction quality.</p>

              <p>The engineer is looking at technical feasibility.</p>

              <p>The researcher is thinking about user behavior.</p>

              <p>Everyone is looking at the same screen.</p>

              <p>Everyone is talking about something different.</p>
            </SlideRow>

            <hr />

            <p>And here&rsquo;s the funny part.</p>

            <p>Nobody is wrong.</p>

            <p>Everybody is contributing something useful.</p>

            <p>
              The problem is that nobody agreed on what decision they were actually trying
              to make.
            </p>

            <hr />

            <p>I&rsquo;ve sat in meetings like this.</p>

            <p>You probably have too.</p>

            <p>The conversation goes in circles.</p>

            <p>People talk past each other.</p>

            <p>The meeting ends.</p>

            <p>And somehow nobody feels like a decision was made.</p>

            <hr />

            <p>That&rsquo;s when I started realizing something.</p>

            <p>The roles blurred.</p>

            <p>But the communication didn&rsquo;t evolve with them.</p>

            <hr />

            <p>
              When everybody stays in their lane, the structure itself creates alignment.
            </p>

            <p>
              When everybody can contribute everywhere, alignment has to be created
              intentionally.
            </p>

            <hr />

            <p>And that&rsquo;s a very different challenge.</p>

            <p>Because now the question isn&rsquo;t:</p>

            <p>&ldquo;Who owns this?&rdquo;</p>

            <p>The question is:</p>

            <p>&ldquo;How do we decide?&rdquo;</p>

            <hr />

            <p>That&rsquo;s why I think Signal 2 matters.</p>

            <p>
              The boundaries that used to structure product teams are dissolving.
            </p>

            <p>And we haven&rsquo;t fully figured out what replaces them.</p>

            <p>Which brings us to the third signal.</p>

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
