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
];

const currentSlug = "pattern";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter7() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">

          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 7</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div
                className="chapter-ghost-number"
                aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}
              >
                7
              </div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>
                The Pattern
              </h1>
            </div>
          </div>

          <div className="chapter-body">

            {/* ── Slide: photographer + player ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch7-photographer-player.png"
              alt="A wedding photographer and an NBA center standing back to back, surrounded by binary code"
            >
              <p>OK.</p>

              <p>Let&rsquo;s put those two stories side by side.</p>

              <p>A wedding photographer.</p>

              <p>An NBA center.</p>

              <p>On the surface, they have absolutely nothing in common.</p>

              <p>One is taking photos.</p>

              <p>The other is playing basketball.</p>

              <p>But I think they&rsquo;re actually the same story.</p>
            </SlideRow>

            <hr />

            <p>In both cases, a new technology arrived.</p>

            <p>Digital cameras.</p>

            <p>Analytics.</p>

            <p>Not AI.</p>

            <p>Not AGI.</p>

            <p>Nothing futuristic.</p>

            <p>
              Just a new tool that made a previously scarce skill more accessible.
            </p>

            <hr />

            <p>And when that happened, something interesting happened.</p>

            <p>The floor rose.</p>

            <hr />

            <p>In photography, more people could take good photos.</p>

            <p>
              In basketball, more players understood what winning basketball looked like.
            </p>

            <p>The floor rose.</p>

            <hr />

            {/* ── Slide: who survived ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch7-who-survived.png"
              alt="Photographer and NBA center standing together on a first-place podium, surrounded by others looking up"
            >
              <p>And when the floor rose, the market stopped rewarding the old thing.</p>

              <p>Not immediately.</p>

              <p>But eventually.</p>

              <p>
                The photographer who survived wasn&rsquo;t the one who took slightly sharper
                photos.
              </p>

              <p>
                The photographer who survived was the one who made the wedding more memorable.
              </p>

              <p>
                The center who survived wasn&rsquo;t the one who got slightly better at
                posting up.
              </p>

              <p>
                The center who survived was the one who helped the team win in the new system.
              </p>
            </SlideRow>

            <hr />

            <p>Notice what&rsquo;s happening.</p>

            <p>The KPI changed.</p>

            <p>And the new KPI got bigger.</p>

            <p>Photography:</p>

            <p>Photo &rarr; Wedding</p>

            <p>Basketball:</p>

            <p>Player &rarr; Team</p>

            <p>The unit of value expanded.</p>

            <hr />

            <p>And that&rsquo;s when I realized these aren&rsquo;t two stories.</p>

            <p>They&rsquo;re one story.</p>

            <p>A story that keeps repeating itself.</p>

            <hr />

            <p><strong>The Pattern</strong></p>

            {/* ── Slide: three steps ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch7-three-steps.png"
              alt="Three-panel illustration: Step 1 technology raises the floor, Step 2 market changes the KPI, Step 3 professionals raise the ceiling"
            >
              <p>Every major technology shift follows the same sequence.</p>

              <p><strong>Step 1. Technology raises the floor.</strong></p>

              <p>A skill that used to be rare becomes accessible.</p>

              <p>More people can do it.</p>

              <p>More people can participate.</p>

              <p>More people can create.</p>
            </SlideRow>

            <hr />

            <p><strong>Step 2. The market changes the KPI.</strong></p>

            <p>The thing that used to make you valuable becomes common.</p>

            <p>The market starts rewarding something larger.</p>

            <p>The unit of value expands.</p>

            <hr />

            <p><strong>Step 3. Professionals raise the ceiling.</strong></p>

            <p>
              The people who thrive aren&rsquo;t the people who defend the old KPI.
            </p>

            <p>
              They&rsquo;re the people who recognize where value is moving and expand their
              impact accordingly.
            </p>

            <hr />

            {/* ── Slide: pattern table ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch7-pattern-table.png"
              alt="Table showing Technology Shift → Floor Raised → New KPI across Desktop Publishing, Photography, Website Builders, YouTube, Digital Music, and AI"
            >
              <p>Technology raises the floor.</p>

              <p>The market changes the KPI.</p>

              <p>Professionals raise the ceiling.</p>

              <p>Once I saw that pattern, I started noticing it everywhere.</p>

              <p>Different industries.</p>

              <p>Different tools.</p>

              <p>Same pattern.</p>
            </SlideRow>

            <hr />

            <p>And here&rsquo;s what I want you to notice.</p>

            <p>Look at the right column.</p>

            <p>Communication.</p>

            <p>Branding.</p>

            <p>Storytelling.</p>

            <p>Strategy.</p>

            <p>Audience.</p>

            <p>Distribution.</p>

            <hr />

            <p>None of these are really about the artifact.</p>

            <p>They&rsquo;re about impact.</p>

            <p>They&rsquo;re about outcomes.</p>

            <p>
              They&rsquo;re about expanding influence beyond the thing you create.
            </p>

            <hr />

            <p>Now let&rsquo;s add one more row.</p>

            <div style={{
              maxWidth: "680px",
              margin: "var(--sp-6) auto",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              {[
                ["Technology Shift", "Floor Raised", "New KPI"],
                ["AI", "Creating artifacts", "?"],
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.2fr 1.4fr",
                  background: i === 0
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(188,113,85,0.07)",
                  borderBottom: i === 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
                }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "12px 16px",
                      fontFamily: i === 0
                        ? "var(--font-inter), system-ui, sans-serif"
                        : "var(--font-playfair), Georgia, serif",
                      fontSize: i === 0 ? "11px" : "16px",
                      fontWeight: i === 0 ? 700 : j === 0 ? 700 : 400,
                      fontStyle: i > 0 && j === 1 ? "italic" : "normal",
                      letterSpacing: i === 0 ? "0.1em" : "normal",
                      textTransform: i === 0 ? "uppercase" : "none",
                      color: i === 0 ? "var(--ink-muted)" : j === 1 ? "var(--ink-muted)" : "var(--ink)",
                    }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <hr />

            <p>And that&rsquo;s the question we&rsquo;re all trying to answer.</p>

            <hr />

            <p>Because AI is different.</p>

            <p>Photography raised the floor on photography.</p>

            <p>Basketball analytics changed basketball.</p>

            <p>AI is raising the floor on something much broader.</p>

            <p>Design.</p>

            <p>Code.</p>

            <p>Research.</p>

            <p>Writing.</p>

            <p>Prototyping.</p>

            <p>Creation itself.</p>

            <hr />

            <p>So if the pattern continues&hellip;</p>

            <p>And I believe it does&hellip;</p>

            <p>Then we should expect the same thing to happen again.</p>

            <hr />

            <p>Step 1 already happened.</p>

            <p>Technology raised the floor.</p>

            <p>We&rsquo;re living through it.</p>

            <hr />

            <p>The real question is Step 2.</p>

            <p>What KPI is the market starting to reward now?</p>

            <hr />

            <p>Because wherever that answer is&hellip;</p>

            <p>That&rsquo;s where the next opportunity is.</p>

            <p>That&rsquo;s where the next bottleneck is.</p>

            <p>
              That&rsquo;s where the next generation of professionals will create value.
            </p>

            <hr />

            <p>I think I know the answer.</p>

            <p>
              But before I tell you what it is, I want to show you three signals that
              convinced me it was already happening.
            </p>

          </div>

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
