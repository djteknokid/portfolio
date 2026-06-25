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

const currentSlug = "bonus/yuha-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI 툴을 사용하기 시작한 이후, 일상적인 루틴에서 가장 크게 바뀐 것은 무엇인가요?",
    a: `가장 큰 변화는 이제 코드로 프로토타입을 만든다는 점입니다. 실제 플로우를 구현하고 같은 날 테스트합니다. 때로는 Claude Code를 밤새 실행해두고, 아침에 일어나면 이미 직접 써볼 수 있는 무언가가 만들어져 있기도 합니다.

그래서 저의 하루는 픽셀을 다듬는 것에서 경험 아래에 있는 로직과 행동을 설계하는 것으로 이동했습니다. 특히 에이전트 제품 작업에서는 채팅 화면에 무엇이 표시될지보다, 에이전트가 어떻게 추론해야 하는지 — 무엇을 추천하고, 무엇을 보류하고, 사용자와 어떻게 협업해야 하는지 — 에 훨씬 더 많은 시간을 씁니다.`,
  },
  {
    q: "PM이나 엔지니어가 이미 만들어진 무언가를 들고 왔을 때, 디자이너로서 어떻게 반응하시나요?",
    a: `위협으로 받아들이지 않습니다. 출발점으로 받아들입니다.

누군가 이미 동작하는 것을 들고 올 때, 솔직히 그것은 선물입니다. 이제 추상적인 논쟁 대신 실제 결과물에 반응할 수 있게 되니까요. 저의 첫 번째 행동은 의도를 이해하는 것입니다. 그들이 실제로 해결하려 했던 문제는 무엇인가?

그런 다음 실제 사용자 플로우에 맞춰 압박 테스트를 합니다. 엣지 케이스, 누군가가 혼란스럽거나 막힐 수 있는 순간, 시스템 레벨에서 경험이 일관성을 유지하는지 살펴봅니다.

제가 가져오는 것은 "내가 유일하게 이것을 보기 좋게 만들 수 있다"가 아닙니다. 그것이 반대편 사람에게 실제로 작동하는지 판단하는 능력입니다.`,
  },
  {
    q: "지금 이 시점에 주니어 디자이너들에게 어떤 역량을 키우라고 조언하시겠어요?",
    a: `AI와 산출물 속도 경쟁을 멈추세요. 이길 수 없고, 어차피 그게 요점이 아니었습니다.

대신 판단 레이어를 쌓으세요. 시스템 사고, 단순한 화면이 아닌 행동과 로직을 설계하는 능력, 그리고 취향 — 왜 한 솔루션이 다른 것보다 나은지 아는 것입니다.

AI 툴로 프로토타이핑하고 최소한 일부 코드를 읽는 것에 익숙해지세요. 디자인과 빌드 사이의 벽은 사실상 사라졌습니다. 그리고 커뮤니케이션과 접근성을 과소평가하지 마세요. '왜'를 명확하게 표현하고 보통 소외되는 사람들을 위해 설계할 수 있다면, 툴이 어디로 가든 관련성을 유지할 것입니다.`,
  },
  {
    q: "AI가 디자인 프로세스에 들어온 이후, PM 및 엔지니어링과의 관계는 어떻게 변했나요?",
    a: `역할 자체가 변했습니다. 이제 디자이너도 코드를 쓰고, PM은 직접 아이디어를 프로토타입으로 만들고, 엔지니어는 명확하게 구성된 PRD를 만들어냅니다. 처음에는 그것이 불편했고, 우리 모두에게 약간 혼란스러웠습니다.

하지만 꽤 빠르게, 그것이 실제로 우리 각자가 가장 잘하는 것에 더 집중할 수 있게 해준다는 것을 깨달았습니다.

PM은 문서를 작성하는 사람이 아니라 팀을 이끌고 공유된 비전을 유지하는 사람입니다. 디자이너는 단순히 목업을 만드는 것이 아니라, 사용자를 가장 잘 이해하는 사람으로서 더 정교하고 엄격하게 테스트된 경험을 구축합니다. 엔지니어는 순수한 구현을 넘어 더 혁신적인 기술 방향을 탐색하고 제안합니다.

산출물에 대한 방어심을 내려놓자, AI는 우리 역할의 경계를 흐린 것이 아니라 AI가 대체할 수 없는 부분에 대한 본능을 깨웠습니다.`,
  },
];

export default function BonusYuhaKimKo() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B3</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Yuha Kim · 김유하</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/yuha-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Product Designer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Yuha Kim · 김유하</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Product Designer · AI Systems, Agentic Experience, Enterprise Workflows · Salesforce
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
