import Link from "next/link";
import ManuscriptSidebarKo from "../../ManuscriptSidebarKo";

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
  { number: "B1" as unknown as number, slug: "bonus/yeawon-kim", title: "보너스 — 예원 김" },
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu", title: "보너스 — Wenyang Mu" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",   title: "보너스 — 김유하" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu", title: "보너스 — Vivian Chu" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",  title: "보너스 — 안인선" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",   title: "보너스 — 오상영" },
];

const currentSlug = "bonus/wenyang-mu";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI 툴을 사용하기 시작한 이후, 일상적인 루틴에서 가장 크게 바뀐 것은 무엇인가요?",
    a: `저의 일상적인 워크플로우는 이제 AI를 주요 파트너로 삼아 시작합니다. 직접 무언가를 하기 전에, 먼저 원시 데이터를 AI에 입력해 명확하고 근거 있는 액션 아이템을 생성합니다. 이를 통해 기초 데이터 처리에서 벗어나 고차원적인 의사결정과 문제 해결에 에너지를 집중할 수 있게 되었습니다.`,
  },
  {
    q: "PM이나 엔지니어가 이미 만들어진 무언가를 들고 왔을 때, 디자이너로서 어떻게 반응하시나요?",
    a: `환영합니다. 조잡하더라도 실제 프로토타입이 있으면 요구사항을 명확히 하고 정렬을 이끌어내는 데 매우 유용합니다. 다만 AI가 생성한 디자인에서 불필요한 복잡성이 도입될 때 실행 측면의 격차를 자주 발견하게 됩니다.`,
  },
  {
    q: "지금 이 시점에 주니어 디자이너들에게 어떤 역량을 키우라고 조언하시겠어요?",
    a: `저는 주니어들에게 직군 간 융합 역량에 집중하라고 조언합니다.

기술적 역량: GitHub와 Claude Code 같은 바이브 코딩 툴을 배워 엔지니어링 워크플로우를 이해하고 프론트엔드 코드에 자신 있게 기여할 수 있도록 하세요.

프로덕트 씽킹: PM처럼 사고하고 훈련하여 사용자 공감을 넘어 비즈니스 니즈를 이해하세요.`,
  },
  {
    q: "AI가 디자인 프로세스에 들어온 이후, PM 및 엔지니어링과의 관계는 어떻게 변했나요?",
    a: `일상적인 협업은 아직 크게 바뀌지 않았지만, 지평선이 변하고 있습니다. 우리는 역할 경계가 흐려질 미래를 향해 나아가고 있습니다.`,
  },
];

export default function BonusWenyangMuKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">

          {/* Header */}
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>보너스 — 실리콘밸리 디자이너 인터뷰</p>
            <p className="chapter-part-subtitle">인터뷰 · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B2</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Wenyang Mu · 무웬양</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/wenyang-mu" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            {/* Bio card */}
            <div style={{
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "var(--sp-10)",
              padding: "var(--sp-5) var(--sp-6)",
              background: "rgba(188,113,85,0.06)",
              borderLeft: `3px solid ${ACCENT}`,
            }}>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                margin: "0 0 8px",
              }}>Lead Product Designer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Wenyang Mu · 무웬양</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Lead Product Designer · 0→1 SaaS · AI for Procurement &amp; Fintech · SAP Ariba
              </p>
            </div>

            {/* Q&A */}
            {QA.map(({ q, a }, i) => (
              <div key={i} style={{ maxWidth: "680px", marginLeft: "auto", marginRight: "auto", marginBottom: "var(--sp-10)" }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: "0 0 var(--sp-3)",
                }}>Q{i + 1}</p>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: 1.35,
                  color: "var(--ink)",
                  margin: "0 0 var(--sp-5)",
                }}>{q}</p>
                {a.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
                {i < QA.length - 1 && <hr />}
              </div>
            ))}

          </div>

          <nav className="chapter-nav chapter-prose">
            {prev ? <Link href={`/ktalk/manuscript/ko/${prev.slug}`}>← {prev.title}</Link> : <span />}
            {next ? <Link href={`/ktalk/manuscript/ko/${next.slug}`}>{next.title} →</Link> : <span />}
          </nav>
        </article>
      </main>
    </div>
  );
}
