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

const currentSlug = "signals-summary";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter13() {
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
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>What All Three Signals Share</h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>Let me put the three signals next to each other.</p>

            <p>
              Artifact creation is no longer scarce. Role boundaries are blurring.
              The complaint has shifted from capacity to clarity.
            </p>

            <p>Three different observations. Three different angles. Same underlying shape.</p>

            <p>
              What they all have in common is this: creation is becoming abundant. And the
              things that are becoming scarce are on the other side of creation entirely.
            </p>

            <p>
              Ideas are abundant. Designs are abundant. Prototypes are abundant. Code is
              abundant. Research is abundant. Options are abundant.
            </p>

            <p>But.</p>

            <p>Alignment is scarce.</p>
            <p>Clarity is scarce.</p>
            <p>Shared understanding is scarce.</p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch12-coordination-problem.png"
              alt="Three people at a round table, each holding a different shape — triangle, square, circle — with mismatched pieces scattered between them"
            >
              <p>The ability to make a decision and move — together, confidently, in the same
                direction — that is becoming the rarest thing on a product team.</p>

              <blockquote>
                We don&rsquo;t have a creation problem anymore.<br />
                We have a coordination problem.
              </blockquote>

              <p>
                Think about the teams you&rsquo;ve been part of that felt stuck. Not stuck
                because they couldn&rsquo;t build. Stuck because they couldn&rsquo;t decide.
                Stuck because everyone had a different read on what the data meant. Stuck because
                there were three competing prototypes and no one had the authority or the framework
                to choose between them. Stuck because every meeting ended with &ldquo;let&rsquo;s
                take this offline&rdquo; — and offline never resolved it either.
              </p>
            </SlideRow>

            <p>
              That feeling — that specific, maddening, energy-draining feeling of a team that
              can produce but cannot align — is going to become the defining experience of
              working in product over the next few years.
            </p>

            <p>
              Because AI is making the production side cheaper and faster every month. And
              the coordination side — the human side, the judgment side, the trust and shared
              understanding side — that doesn&rsquo;t get cheaper. It doesn&rsquo;t get faster
              automatically. It requires deliberate investment.
            </p>

            <p>
              The gap between what teams can produce and what teams can decide is going to
              widen. Unless someone in the room decides to close it.
            </p>

            <p>That&rsquo;s the opportunity. And it&rsquo;s a big one.</p>

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
