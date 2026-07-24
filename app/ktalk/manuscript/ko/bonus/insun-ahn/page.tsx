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
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",   title: "보너스 — 김찬" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",  title: "보너스 — 태호 김" },
];

const currentSlug = "bonus/insun-ahn";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI 툴을 사용하기 시작한 이후, 일상적인 루틴에서 가장 크게 바뀐 것은 무엇인가요?",
    a: `이제 하루를 AI 툴로 시작하고 마칩니다. 하루 두 번 브리핑 루틴을 만들었습니다 — 하나는 아침에, 하나는 저녁에 합니다.

아침에는 AI가 열린 작업들을 검토하고, 오늘의 주요 집중 사항을 파악하며, 회의 일정을 확인하고, 준비가 필요한 것이 있으면 알려줍니다.

하루가 끝날 때는 그날의 채팅, 이메일, 회의 노트, 기타 업무를 검토합니다. 무엇을 달성했는지, 어떤 영향을 미쳤는지, 어떤 작업을 완료했는지, 회의에서 중요한 인사이트나 액션 아이템은 무엇인지 요약해줍니다. 집중해서 하루를 시작하고 명확하게 마칠 수 있도록 도와줍니다.`,
  },
  {
    q: "PM이나 엔지니어가 이미 만들어진 무언가를 들고 왔을 때, 디자이너로서 어떻게 반응하시나요?",
    a: `특히 AI 시대에는 명확한 역할 경계가 더 이상 없다고 생각합니다. 앞으로 PM, 엔지니어링, 디자인 간의 경계는 계속 흐려지고, 우리 모두 함께 빌더가 될 것입니다.

PM이 아이디어를 시작하고, 솔루션을 디자인하고, 구현까지 도울 수도 있습니다. 엔지니어가 초기 아이디어를 내고, 디자이너가 제품을 출시까지 이끌 수도 있습니다.

누군가 이미 만들어진 것을 들고 오면, 저는 그것을 제 역할에 침범하는 것으로 보지 않습니다. 협업의 출발점으로 봅니다. 아이디어를 이해하고, 피드백을 제공하고, 경험을 개선하고, 팀이 전체적인 품질을 높이도록 돕는 데 집중합니다.

전통적인 역할 정의에 스스로를 제한해서는 안 된다고 생각합니다. 더 중요한 질문은 어떻게 함께 최고의 아이디어를 발전시키고 고품질 제품을 출시할 수 있는가입니다.`,
  },
  {
    q: "지금 이 시점에 주니어 디자이너들에게 어떤 역량을 키우라고 조언하시겠어요?",
    a: `계속해서 관련성을 유지할 역량은 사용자와 고객을 깊이 이해하는 능력이라고 생각합니다.

디자이너는 사용자가 경험하는 페인 포인트, 그 문제가 왜 존재하는지, 제품이 왜 니즈를 충족시키지 못하는지를 이해해야 합니다. 그리고 그 문제들을 효과적으로 해결하는 연습을 계속해야 합니다.

주니어 디자이너들에게는 가능하다면 실제 사용자의 실제 문제를 다루라고 권하고 싶습니다. 개인 프로젝트나 가상의 콘셉트만 만드는 것이 아니라, 사람들이 실제로 사용할 수 있는 것을 만들어 보세요. 실제 사용자에게 피드백을 받고, 그들의 반응을 관찰하고, 실제 결과에서 배우세요.

실제 문제를 이해하고, 솔루션을 만들고, 그 영향에서 배우는 능력은 항상 가치 있을 것입니다.`,
  },
  {
    q: "AI가 디자인 프로세스에 들어온 이후, PM 및 엔지니어링과의 관계는 어떻게 변했나요?",
    a: `관계 자체가 크게 바뀐 것은 아니지만, 우리가 논의하는 주제와 협업 방식은 변하기 시작했습니다.

지금은 PM, 엔지니어, 디자이너 모두 서로의 역할에 대해 더 많이 배우는 전환기라고 생각합니다. 과거에는 각 기능이 주로 자신의 영역에 집중했습니다. 지금은 PM이 디자인과 엔지니어링을 더 배우고, 디자이너가 구현에 더 많이 관여하고, 엔지니어가 디자인에 대한 이해를 강화하고 있습니다.

예를 들어, 우리는 엔지니어들이 아이디어를 발전시키도록 돕고 있습니다. 피드백과 디자인 가이드를 제공해서 올바른 방향으로 아이디어를 구체화하고 실제로 구현하고 출시할 수 있는 경험으로 만들 수 있도록 합니다.

목표는 디자이너가 모든 결정에 관여하는 것이 아닙니다. 엔지니어와 PM이 더 강한 디자인 판단력을 갖도록 돕는 것입니다. 그래야 디자이너가 직접 관여하지 않을 때도 계속 고품질 경험을 만들어갈 수 있습니다.`,
  },
];

export default function BonusInsunAhnKo() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B5</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Insun Ahn · 안인선</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/insun-ahn" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Product Design Manager</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Insun Ahn · 안인선</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Product Design Manager · Meta
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
