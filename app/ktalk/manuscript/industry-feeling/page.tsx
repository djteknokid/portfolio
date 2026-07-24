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
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",    title: "Bonus — Chan Kim" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",   title: "Bonus — Taeho Kim" },
];

const currentSlug = "industry-feeling";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter14() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebar chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>Chapter 13</p>
            <p className="chapter-part-subtitle">The Coordination Era · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>13</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>The Industry Is Already Feeling It</h1>
            </div>
          </div>

          <div className="chapter-body">

            <SlideRow
              image="/mindbook/ktalk/slides/ch13-linkedin-reaction.png"
              alt="Person standing between two groups — one cheering enthusiastically, the other pointing and arguing"
            >
              <p>Before I tell you my conclusion, I want to show you something.</p>

              <hr />

              <p>A few weeks ago, I posted a question on LinkedIn.</p>

              <p>Honestly, I thought it was a pretty simple question.</p>
            </SlideRow>

            <hr />

            <p>A PM walks into a design review with a high-fidelity prototype.</p>

            <p>Built in code.</p>

            <p>Interactive.</p>

            <p>Looks almost ready to ship.</p>

            <p>What is the role of UX now?</p>

            <hr />

            <p>That's it.</p>

            <p>That was the question.</p>

            <hr />

            <p>I expected a discussion.</p>

            <p>What I didn't expect was the reaction.</p>

            <hr />

            <p>Some people said:</p>

            <p>&ldquo;The hard part was never creating screens.&rdquo;</p>

            <p>&ldquo;The hard part was figuring out what problem to solve.&rdquo;</p>

            <hr />

            <p>Others said:</p>

            <p>&ldquo;The moment a high-fidelity prototype exists, leadership stops listening.&rdquo;</p>

            <p>&ldquo;The discussion is already over.&rdquo;</p>

            <hr />

            <p>Some argued that UX should move further upstream.</p>

            <hr />

            <p>Others argued that PMs were crossing into design territory.</p>

            <hr />

            <p>Some said:</p>

            <p>&ldquo;AI can&rsquo;t design.&rdquo;</p>

            <hr />

            <p>Others said:</p>

            <p>&ldquo;That&rsquo;s not the point.&rdquo;</p>

            <hr />

            <p>And as I kept reading the comments, I noticed something interesting.</p>

            <p>Nobody was arguing about the prototype.</p>

            <p>They were arguing about what the prototype means.</p>

            <hr />

            <p>Same situation.</p>

            <p>Same artifact.</p>

            <p>Same technology.</p>

            <p>Completely different conclusions.</p>

            <hr />

            <p>And I realized something.</p>

            <p>The disagreement wasn&rsquo;t about AI.</p>

            <p>The disagreement wasn&rsquo;t about design.</p>

            <p>The disagreement wasn&rsquo;t even about prototyping.</p>

            <hr />

            <p>The disagreement was about decision making.</p>

            <hr />

            <p>Who gets to influence the direction?</p>

            <p>Who challenges assumptions?</p>

            <p>Who decides which prototype wins?</p>

            <p>Who decides what gets built?</p>

            <p>Who decides which problem matters?</p>

            <hr />

            <p>Those aren&rsquo;t execution questions.</p>

            <p>Those are coordination questions.</p>

            <hr />

            <p>For years, the artifact helped define the roles.</p>

            <p>PM writes requirements.</p>

            <p>Designer creates artifacts.</p>

            <p>Engineer builds the product.</p>

            <p>The artifact sat neatly inside those boundaries.</p>

            <hr />

            <p>Now the artifact moves freely.</p>

            <p>PMs can create it.</p>

            <p>Designers can create it.</p>

            <p>Engineers can create it.</p>

            <p>AI can create it.</p>

            <hr />

            <p>And suddenly everyone starts asking:</p>

            <p>Then what exactly is my role?</p>

            <hr />

            <p>At first glance, it looks like a role debate.</p>

            <p>But I don&rsquo;t think it is.</p>

            <p>I think it&rsquo;s a value debate.</p>

            <p>And underneath that value debate is a coordination problem.</p>

            <hr />

            <p>Because once everyone can create,</p>

            <p>the real question becomes:</p>

            <p>How do we decide?</p>

            <hr />

            <p>How do we evaluate competing ideas?</p>

            <p>How do we align around a direction?</p>

            <p>How do we know which prototype is actually better?</p>

            <p>How do we move forward together?</p>

            <hr />

            <p>I think that&rsquo;s why these conversations feel emotional.</p>

            <p>People think they&rsquo;re defending a role.</p>

            <p>But what they&rsquo;re really reacting to is the disappearance of an old decision-making model.</p>

            <hr />

            <p>For years, slow execution hid poor alignment.</p>

            <p>It took weeks to build something.</p>

            <p>By the time the prototype existed, the team had already spent hours talking.</p>

            <p>Hours aligning.</p>

            <p>Hours debating.</p>

            <p>Hours negotiating.</p>

            <hr />

            <p>Now the prototype appears in an afternoon.</p>

            <p>The alignment doesn&rsquo;t.</p>

            <hr />

            <p>And suddenly all the weaknesses in how teams make decisions become visible.</p>

            <hr />

            <p>The prototype didn&rsquo;t create the problem.</p>

            <p>The prototype exposed the problem.</p>

            <hr />

            <p>And when I stepped back and looked at that LinkedIn discussion, I realized it was pointing to exactly the same place as every other signal we&rsquo;ve discussed.</p>

            <hr />

            <p>Artifact creation is becoming abundant.</p>

            <p>Options are becoming abundant.</p>

            <p>Roles are becoming blurry.</p>

            <p>The complaints are changing.</p>

            <p>And now even the conversations we&rsquo;re having online are changing.</p>

            <hr />

            <p>The bottleneck moved.</p>

            <p>And I think the industry is already starting to feel it.</p>

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
