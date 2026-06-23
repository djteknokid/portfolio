import Link from "next/link";

const ACCENT = "#bc7155";

const chapters = [
  { number: 1,  slug: "intro",             title: "소개" },
  { number: 2,  slug: "track-record",      title: "나의 이력" },
  { number: 3,  slug: "the-shock",         title: "충격" },
  { number: 4,  slug: "why-happening",     title: "왜 이런 일이 생기는가" },
  { number: 5,  slug: "floor-raised",      title: "바닥이 올라갔다" },
  { number: 6,  slug: "nba",               title: "NBA 이야기" },
  { number: 7,  slug: "pattern",           title: "패턴" },
  { number: 8,  slug: "signals-intro",     title: "본론을 시작하며" },
  { number: 9,  slug: "signal-1",          title: "신호 1 — 산출물 생성" },
  { number: 10, slug: "signal-2",          title: "신호 2 — 역할 경계의 붕괴" },
  { number: 11, slug: "signal-3",          title: "신호 3 — 불만의 변화" },
  { number: 12, slug: "signals-summary",   title: "세 가지 신호의 공통점" },
  { number: 13, slug: "industry-feeling",  title: "업계는 이미 느끼고 있다" },
  { number: 14, slug: "coordination-era",  title: "조율의 시대" },
  { number: 15, slug: "raise-ceiling",     title: "천장을 높여라" },
  { number: 16, slug: "how-to-raise",      title: "어떻게 높일 것인가" },
  { number: "16a" as unknown as number, slug: "how-to-raise/clarity",    title: "16a. 명확성" },
  { number: "16b" as unknown as number, slug: "how-to-raise/trade-offs", title: "16b. 트레이드오프" },
  { number: "16c" as unknown as number, slug: "how-to-raise/priority",   title: "16c. 우선순위" },
  { number: "16d" as unknown as number, slug: "how-to-raise/decision",   title: "16d. 결정" },
  { number: 17, slug: "conclusion",        title: "마치며" },
];

const sections = [
  {
    label: "시작",
    subtitle: "이력 · 충격 · 왜 지금인가",
    chapters: [1, 2, 3, 4],
  },
  {
    label: "패턴",
    subtitle: "바닥 · 사진 · NBA · 메커니즘",
    chapters: [5, 6, 7],
  },
  {
    label: "신호들",
    subtitle: "실리콘밸리에서 온 네 가지 신호",
    chapters: [8, 9, 10, 11, 12, 13, 14],
  },
  {
    label: "논지",
    subtitle: "조율의 시대 · 천장 높이기",
    chapters: [15, 16, 17, 18],
  },
];

export default function ManuscriptCoverKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ── LEFT PANEL ── */}
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
            조율의<br />시대
          </h1>

          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(18px, 2vw, 26px)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.55)",
            marginBottom: "24px",
          }}>
            The Coordination Era
          </p>

          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "260px",
          }}>
            기술은 바닥을 높인다.<br />
            시장은 KPI를 바꾼다.<br />
            전문가는 천장을 높인다.
          </p>
        </div>

        {/* CTA + language toggle */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href="/ktalk/manuscript/ko/intro"
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
            읽기 시작 <span aria-hidden>→</span>
          </Link>
          <Link
            href="/ktalk/manuscript"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            English version →
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
                <div style={{ marginBottom: "20px" }}>
                  <p className="toc-part-label" style={{ color: ACCENT }}>
                    {section.label}
                  </p>
                  <p className="toc-part-subtitle">{section.subtitle}</p>
                </div>
                <div>
                  {sectionChapters.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/ktalk/manuscript/ko/${c.slug}`}
                      className="toc-chapter-row"
                    >
                      <span className="toc-chapter-title">{c.number}. {c.title}</span>
                      <span className="toc-chapter-number" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: "8px", paddingTop: "32px", borderTop: "1px solid rgba(0,0,0,0.10)" }}>
            <Link href="/koreatalk" style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink-muted)",
              textDecoration: "none",
              letterSpacing: "0.04em",
            }}>
              ← 슬라이드 덱으로
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
