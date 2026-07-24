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

const currentSlug = "bonus/bryan-oh";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI 툴을 사용하기 시작한 이후, 일상적인 루틴에서 가장 크게 바뀐 것은 무엇인가요?",
    a: `산출물의 중심이 디자인 파일에서 동작하는 프로토타입으로 옮겨갔습니다.

예전에는 리서치 → 와이어프레임 → 하이파이 → 핸드오프 순서였다면, 지금은 아이디어가 나오면 바로 코드로 만들어 검증합니다. 저는 이걸 Prototype-first 방식이라고 부르는데, 단순히 '빨리 만든다'가 아니라 프로토타입 자체가 살아있는 명세(living spec)가 된다는 게 핵심입니다.

실제 경험을 예로 들면, 제조 현장 데이터를 다루는 엔터프라이즈 AI 분석 플랫폼에서 새로운 AI 기능을 설계할 때 Figma 화면 대신 Claude Code로 React 프로토타입을 먼저 만들었습니다. 그러자 두 가지가 달라졌습니다.

첫째, 정적 화면에서는 절대 보이지 않던 것들이 설계 단계에서 바로 드러났습니다. 데이터가 늦게 도착할 때의 로딩 상태, AI 응답이 이상할 때의 엣지 케이스, 스트리밍 중 인터랙션 같은 것들이요. AI 제품은 결과물이 비결정적이라 이 부분이 사실상 디자인의 본체인데, Figma에서는 이걸 그릴 방법이 없습니다.

둘째, 엔지니어에게 스펙 문서 대신 동작하는 코드를 넘기니 '이 인터랙션이 무슨 의도였나요?' 같은 왕복이 거의 사라졌습니다. 디자인 문서 만드는 시간은 줄고 실험하고 검증하는 시간이 늘었습니다.`,
  },
  {
    q: "PM이나 엔지니어가 이미 만들어진 무언가를 들고 왔을 때, 디자이너로서 어떻게 반응하시나요?",
    a: `예전보다 훨씬 환영하는 편입니다. '왜 먼저 만들었나요?'가 아니라 '무엇을 배웠나요?'를 먼저 묻습니다.

달라진 건 그 다음입니다. 예전에는 만들어진 것에 코멘트를 다는 방식으로 피드백했다면, 지금은 그 코드 위에서 직접 수정한 버전을 만들어 보여줍니다. '여기 마진이 이상해요'라고 말하는 대신, 고친 브랜치를 띄워놓고 '이 버전이랑 비교해보죠'라고 합니다. 피드백이 말이 아니라 비교 가능한 두 개의 동작하는 화면이 되면, 논쟁이 아니라 의사결정이 됩니다.

디자이너의 역할이 화면을 그리는 것이라면 PM이 만들어온 결과물은 위협이지만, 문제를 정의하고 가설을 검증하고 경험을 다듬는 것이라면 이미 만들어진 무언가는 가장 좋은 출발점입니다.`,
  },
  {
    q: "지금 이 시점에 주니어 디자이너들에게 어떤 역량을 키우라고 조언하시겠어요?",
    a: `세 가지입니다.

1. Problem Framing — AI가 솔루션을 무한히 생성하는 시대에는 '무엇을 풀 것인가'가 유일한 병목입니다. 프롬프트 한 줄로 화면 열 개가 나오는데, 그중 어떤 것이 맞는 방향인지 판단하려면 결국 문제 정의가 선명해야 합니다. 저도 프로토타입을 만들기 전에 '이걸로 무엇을 검증할 것인가'를 한 문장으로 먼저 씁니다. 그게 없으면 빨리 만들기만 하고 아무것도 배우지 못합니다.

2. Prototyping, 단 코드를 디자인 툴처럼 — 전문 개발자가 될 필요는 없습니다. 다만 Figma를 다루듯 코드를 다룰 수 있어야 합니다. AI 코딩 툴 덕분에 진입장벽은 거의 사라졌고, 남은 건 '내 아이디어를 동작하는 경험으로 만드는 습관'입니다. 저는 주말 사이드 프로젝트로 컴포넌트나 인터랙션 실험을 직접 만들어 배포하는데, 이 반복이 본업의 설계 감각을 가장 크게 키워줬습니다.

3. Systems Thinking — 저는 자동차 HMI에서 커리어를 시작했는데, 그때 배운 건 화면 하나가 아니라 화면 뒤의 시스템(센서, 데이터, 상태, 제약)을 이해해야 좋은 경험이 나온다는 것이었습니다. AI 제품은 이 성격이 훨씬 강합니다. UI는 표면이고 실제 경험의 품질은 데이터 흐름과 모델의 동작, 실패 케이스 설계에서 결정됩니다.`,
  },
  {
    q: "AI가 디자인 프로세스에 들어온 이후, PM 및 엔지니어링과의 관계는 어떻게 변했나요?",
    a: `직군 간 경계가 흐려졌고 협업의 매개체가 바뀌었습니다.

예전에는 문서가 직군 사이를 오갔습니다. PM의 요구사항 문서 → 디자이너의 스펙 → 엔지니어의 구현. 단계마다 번역 손실이 생겼습니다. 지금은 PM, 디자이너, 엔지니어가 같은 프로토타입을 화면에 띄워놓고 의사결정합니다. 문서를 전달하는 게 아니라 같은 것을 보면서 같이 고칩니다.

특히 AI 제품은 만들기 전에 정답을 아는 경우가 거의 없습니다. 그래서 가장 정교한 스펙을 쓰는 팀이 아니라, 가장 빨리 만들고 배우는 팀이 이깁니다.

한 문장으로 줄이면 이렇습니다. AI 시대의 디자이너는 화면을 만드는 사람이 아니라, 프로토타입으로 가장 빠르게 학습하는 사람입니다.`,
  },
];

export default function BonusBryanOhKo() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B6</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Bryan Oh · 오상영</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/bryan-oh" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>AI Product Designer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Bryan Oh · 오상영</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                AI Product Designer · Vibe Coder · Expert in data analytics for manufacturing · Google
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
