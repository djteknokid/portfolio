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

const currentSlug = "nba";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter6() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">

          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 6</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div
                className="chapter-ghost-number"
                aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}
              >
                6
              </div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>
                The NBA Story
              </h1>
            </div>
          </div>

          <div className="chapter-body">

            <p>Quick question.</p>

            <p>Anyone here watch basketball?</p>

            <p>I played.</p>

            <p>I coached.</p>

            <p>So give me a few minutes on this one.</p>

            <p>I promise it connects directly to design.</p>

            <hr />

            {/* ── Slide: NBA center ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch6-nba-center.png"
              alt="A dominant center (#34) dunking over defenders near the basket"
            >
              <p>If you grew up watching basketball in the 90s, the game was simple.</p>

              <p>Centers stayed near the basket.</p>

              <p>Power forwards stayed near the basket.</p>

              <p>Their job was clear.</p>

              <p>Rebound.</p>

              <p>Block shots.</p>

              <p>Score inside.</p>

              <p>Stay in your lane.</p>
            </SlideRow>

            <hr />

            {/* ── Slide: three-point revolution ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch6-three-point.png"
              alt="Slim guard (#30) launching a three-pointer while a large center stands watching near the basket"
            >
              <p>Then something happened.</p>

              <p>Not a new rule.</p>

              <p>Not a new technology.</p>

              <p>A new understanding.</p>

              <p>Analytics arrived.</p>

              <p>Teams started looking at the game differently.</p>

              <p>And they discovered something.</p>

              <p>Three-point shooting was dramatically more valuable than most people realized.</p>
            </SlideRow>

            <hr />

            <p>The game didn&rsquo;t change overnight.</p>

            <p>But eventually every team had to answer the same question:</p>

            <p>Can your players shoot?</p>

            <p>Even the big guys.</p>

            <p>Even the centers.</p>

            <p>Even the power forwards.</p>

            <hr />

            <p>Now imagine you&rsquo;re a center.</p>

            <p>You&rsquo;ve spent twenty years becoming great at one thing.</p>

            <p>You rebound.</p>

            <p>You defend.</p>

            <p>You score in the paint.</p>

            <p>And suddenly the game starts asking for something else.</p>

            <hr />

            <p>Some players resisted.</p>

            <p>They kept doing exactly what made them successful.</p>

            <p>And slowly they became less valuable.</p>

            <p>Not because they got worse.</p>

            <p>Because the game changed.</p>

            <hr />

            <p>Other players adapted.</p>

            <p>Brook Lopez.</p>

            <p>Al Horford.</p>

            <p>Veterans who were already successful.</p>

            <p>Already established.</p>

            <p>Already respected.</p>

            <p>They didn&rsquo;t complain about the new game.</p>

            <p>They expanded their game.</p>

            <p>They learned to shoot.</p>

            <p>And they became more valuable than before.</p>

            <hr />

            <p>Notice something.</p>

            <p>The skill wasn&rsquo;t replacing the old skill.</p>

            <p>Brook Lopez still rebounds.</p>

            <p>Al Horford still defends.</p>

            <p>The old KPI didn&rsquo;t disappear.</p>

            <p>A new KPI was added.</p>

            <hr />

            <p>The question was no longer:</p>

            <p>Can you do your job?</p>

            <p>The question became:</p>

            <p>Can you do your job and help the team play the new game?</p>

            <p>That&rsquo;s different.</p>

            <hr />

            {/* ── Slide: modern bigs ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch6-modern-bigs.png"
              alt="Three modern NBA big men shooting jump shots from the perimeter — Jokic, Wembanyama, Towns"
            >
              <p>And if you watch basketball today, that&rsquo;s exactly what happened.</p>

              <p>Nikola Jokic.</p>

              <p>Victor Wembanyama.</p>

              <p>Karl-Anthony Towns.</p>

              <p>The best players aren&rsquo;t defined by position anymore.</p>

              <p>They&rsquo;re defined by capability.</p>

              <p>What can you contribute that helps the team win?</p>
            </SlideRow>

            <hr />

            <p>And here&rsquo;s the part I want you to pay attention to.</p>

            <p>
              The teams that won weren&rsquo;t simply the teams with the best shooters.
            </p>

            <p>
              They were the teams that learned how to play together in the new environment.
            </p>

            <p>The teams that learned spacing.</p>

            <p>Movement.</p>

            <p>Timing.</p>

            <p>Decision making.</p>

            <p>Shared understanding.</p>

            <hr />

            {/* ── Slide: playbook ── */}
            <SlideRow
              image="/mindbook/ktalk/slides/ch6-playbook.png"
              alt="Coach's clipboard showing a basketball play with five players and movement arrows"
            >
              <p>Think about the Warriors dynasty.</p>

              <p>People talk about Curry.</p>

              <p>People talk about Klay.</p>

              <p>People talk about Durant.</p>

              <p>But what made that team special wasn&rsquo;t individual talent.</p>

              <p>The NBA has always had talented players.</p>

              <p>What made them special was coordination.</p>

              <p>They developed a shared language for reading the floor.</p>

              <p>Everyone knew where everyone else would be.</p>

              <p>Everyone knew what everyone else was trying to do.</p>

              <p>They played faster because they understood each other better.</p>
            </SlideRow>

            <hr />

            <p>The floor rose for every player.</p>

            <p>The teams that won solved coordination.</p>

            <p>And I think that&rsquo;s important.</p>

            <p>
              Because photography taught us what happens when the floor rises for individuals.
            </p>

            <p>
              Basketball teaches us what happens when the floor rises for teams.
            </p>

            <p>Now let&rsquo;s put those two stories together.</p>

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
