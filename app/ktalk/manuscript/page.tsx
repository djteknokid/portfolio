import Link from "next/link";

const ACCENT = "#bc7155";

const chapters = [
  { number: 1,  slug: "intro",             title: "Intro",                                      time: "90 sec" },
  { number: 2,  slug: "track-record",      title: "Track Record",                               time: "" },
  { number: 3,  slug: "the-shock",         title: "The Shock",                                  time: "4 min" },
  { number: 4,  slug: "why-happening",     title: "Why This Is Happening",                      time: "10 min" },
  { number: 5,  slug: "floor-raised",      title: "The Floor Has Been Raised",                  time: "" },
  { number: 6,  slug: "nba",               title: "The NBA Story",                              time: "" },
  { number: 7,  slug: "pattern",           title: "The Pattern",                                time: "10 min" },
  { number: 8,  slug: "signals-intro",     title: "My Real Talk Begins",                        time: "" },
  { number: 9,  slug: "signal-1",          title: "Signal 1 — Artifact Creation",               time: "" },
  { number: 10, slug: "signal-2",          title: "Signal 2 — Roles Blurring",                  time: "" },
  { number: 11, slug: "signal-3",          title: "Signal 3 — The Complaint Changed",            time: "" },
  { number: 12, slug: "signals-summary",   title: "What the Signals Share",                     time: "" },
  { number: 13, slug: "industry-feeling",  title: "The Industry Is Already Feeling It",         time: "" },
  { number: 14, slug: "coordination-era",  title: "The Coordination Era",                       time: "" },
  { number: 15, slug: "raise-ceiling",     title: "Raise the Ceiling",                          time: "8–10 min" },
  { number: 16, slug: "how-to-raise",      title: "How Do We Raise It?",                        time: "" },
  { number: 17, slug: "conclusion",        title: "Conclusion",                                 time: "7 min" },
];

const sections = [
  {
    label: "Opening",
    subtitle: "Track record · The shock · Why it's happening",
    chapters: [1, 2, 3, 4],
  },
  {
    label: "The Pattern",
    subtitle: "The floor · Photography · NBA · The mechanism",
    chapters: [5, 6, 7],
  },
  {
    label: "The Signals",
    subtitle: "Four signals from Silicon Valley",
    chapters: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    label: "The Thesis",
    subtitle: "The Coordination Era · Raising the ceiling",
    chapters: [15, 16, 17, 18],
  },
];

export default function ManuscriptCover() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ── LEFT PANEL — fixed cover ── */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "42%",
        height: "100vh",
        backgroundColor: ACCENT,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 56px",
        overflow: "hidden",
      }}>

        {/* Faint Korean texture */}
        <div aria-hidden style={{
          position: "absolute",
          inset: 0,
          opacity: 0.055,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Ctext x='8' y='48' font-size='36' fill='white' font-family='serif'%3E%EC%A1%B0%3C/text%3E%3Ctext x='72' y='96' font-size='30' fill='white' font-family='serif'%3E%EC%9C%A8%3C/text%3E%3Ctext x='12' y='120' font-size='22' fill='white' font-family='serif'%3E%E2%86%92%3C/text%3E%3Ctext x='88' y='36' font-size='20' fill='white' font-family='serif'%3E%EC%8B%9C%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }} />

        {/* Title block */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "48px",
          }}>
            by David Lee · Korea Tour 2026
          </p>

          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(44px, 4.8vw, 76px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-1.5px",
            color: "#ffffff",
            marginBottom: "24px",
          }}>
            The<br />
            Coordination<br />
            Era
          </h1>

          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(18px, 2vw, 26px)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "24px",
          }}>
            조율의 시대
          </p>

          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "260px",
          }}>
            Technology raises the floor.<br />
            Markets change the KPI.<br />
            Professionals raise the ceiling.
          </p>
        </div>

        {/* CTA */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href="/ktalk/manuscript/intro"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 20px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Start Reading <span aria-hidden>→</span>
          </Link>
          <Link
            href="/ktalk/manuscript/ko"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            한국어 버전 →
          </Link>
        </div>
      </div>

      {/* ── RIGHT PANEL — scrollable TOC ── */}
      <div style={{
        marginLeft: "42%",
        width: "58%",
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
        overflowY: "auto",
        padding: "72px 72px 96px",
      }}>
        <div style={{ maxWidth: "500px" }}>

          {sections.map((section) => {
            const sectionChapters = chapters.filter(c =>
              section.chapters.includes(c.number)
            );
            return (
              <div key={section.label} style={{ marginBottom: "56px" }}>

                {/* Section header */}
                <div style={{ marginBottom: "20px" }}>
                  <p className="toc-part-label" style={{ color: ACCENT }}>
                    {section.label}
                  </p>
                  <p className="toc-part-subtitle">{section.subtitle}</p>
                </div>

                {/* Chapter rows */}
                <div>
                  {sectionChapters.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/ktalk/manuscript/${c.slug}`}
                      className="toc-chapter-row"
                    >
                      <span className="toc-chapter-title">{c.number}. {c.title}</span>
                      <span className="toc-chapter-number">{c.time}</span>
                    </Link>
                  ))}
                </div>

              </div>
            );
          })}

          {/* Back to deck */}
          <div style={{ marginTop: "8px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.10)" }}>
            <Link href="/koreatalk" style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink-muted)",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}>
              ← Back to Slide Deck
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
