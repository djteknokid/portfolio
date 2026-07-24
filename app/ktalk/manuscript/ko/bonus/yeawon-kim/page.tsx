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
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu",  title: "보너스 — 웬양 무" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",    title: "보너스 — 유하 김" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu",  title: "보너스 — 비비안 추" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",   title: "보너스 — 안인선" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",    title: "보너스 — 오상영" },
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",   title: "보너스 — 김찬" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",  title: "보너스 — 태호 김" },
];

const currentSlug = "bonus/yeawon-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI 툴을 사용하기 시작한 이후, 일상적인 루틴에서 가장 크게 바뀐 것은 무엇인가요?",
    a: `AI 이전에는 생각을 결과물로 만드는 데 많은 시간을 썼습니다. 지금은 오히려 다른 사람들이 만들어 온 결과물을 검토하고 판단하는 데 더 많은 시간을 씁니다.

PM, 엔지니어, 이해관계자 모두 AI를 활용해 꽤 괜찮은 프로토타입이나 시안을 만들 수 있게 되었습니다. 디자인 결과물의 양은 폭발적으로 늘어났지만, 명확성이 함께 늘어난 것은 아닙니다.

어떤 의미에서는 만드는 사람에서 필터링하는 사람으로 역할이 바뀌었다고 느낍니다. 이제 병목은 아이디어를 구현하는 것이 아니라 어떤 아이디어가 실제로 가치 있는지 판단하는 것입니다.

AI를 사용하면서 오히려 더 강하게 느끼게 된 것은 판단력은 경험에서 나온다는 점입니다. 어떤 아이디어가 좋은지 평가하는 능력은 결국 비슷한 문제를 직접 고민하고 풀어본 경험과 깊이 연결되어 있습니다. 문제를 직접 이해하지 못하면 AI가 제시한 답이 좋은 답인지 판단하기 어려운 것처럼, 좋은 해결책 역시 스스로 만들어보는 과정을 거쳐본 사람만이 제대로 알아볼 수 있다고 생각합니다.`,
  },
  {
    q: "PM이나 엔지니어가 이미 만들어진 무언가를 들고 왔을 때, 디자이너로서 어떻게 반응하시나요?",
    a: `5년 전이었다면 디자이너로서 조금 방어적인 감정을 느꼈을 수도 있습니다. 하지만 지금은 오히려 반갑게 생각합니다.

막연한 아이디어보다 조잡하더라도 실제 프로토타입 하나가 있는 편이 훨씬 생산적인 대화를 만들어 주기 때문입니다. 팀이 훨씬 빠르게 같은 그림을 보고 이야기할 수 있으니까요.

다만 중요한 것은 "만들 수 있는 것"과 "사용자가 정말 필요로 하는 것"을 혼동하지 않는 것입니다. 지금의 제 역할은 디자인의 소유권을 지키는 것보다 그 차이를 팀이 이해하도록 돕는 데 더 가깝습니다.

동시에 디자인 과정 자체는 훨씬 더 협업적으로 변하고 있습니다. PM, 엔지니어, 디자이너 모두가 프로토타입을 만들고 아이디어를 탐색할 수 있습니다. 이제 아이디어를 내는 것은 더 이상 디자이너만의 역할은 아니라고 생각합니다.

하지만 디자인 결정에 대한 책임은 여전히 디자이너가 가져가야 한다고 생각합니다. 엔지니어가 기술적 결정에 책임을 지듯이, 디자이너는 사용자 경험의 품질, 사용성, 그리고 일관성에 대한 책임을 져야 합니다. 가장 좋은 협업은 모두가 아이디어를 제안하되, 최종 의사결정의 책임 주체는 처음부터 명확할 때 이루어진다고 생각합니다.`,
  },
  {
    q: "지금 이 시점에 주니어 디자이너들에게 어떤 역량을 키우라고 조언하시겠어요?",
    a: `저는 주니어 디자이너들에게 AI 전문가가 되라고 말하지는 않을 것 같습니다. 결국 모두가 비슷한 도구를 사용하게 될 것이기 때문입니다.

대신 문제를 정의하는 능력, 커뮤니케이션 능력, 그리고 의사결정에 영향을 미치는 능력을 키우라고 말하고 싶습니다. 대부분의 커리어가 정체되는 이유는 화면을 못 그려서가 아니라, 똑똑한 사람들을 한 방향으로 정렬시키지 못해서입니다.

그리고 사람들이 더 명확하게 생각할 수 있도록 돕는 것 역시 디자이너의 중요한 영향력이라는 점을 잊지 않았으면 좋겠습니다. 사람들의 생각을 정리하고, 토론을 열고, 올바른 질문을 던지는 것은 최종 디자인 결과물을 만드는 것만큼이나 가치 있는 일입니다. 결국 디자인은 해결책을 만드는 것 이전에 제대로 된 질문을 던지는 것에서 시작한다고 생각합니다.

저 역시 무언가를 만드는 과정 자체가 좋아서 디자이너가 되었습니다. 그리고 그 과정 속에서 판단력과 감각, 제품을 이해하는 힘을 길렀습니다. AI가 만드는 방식을 바꾸고 있더라도, 직접 만들어보는 경험은 여전히 그런 직관과 판단력을 기르는 가장 좋은 방법 중 하나라고 생각합니다.

무엇보다 AI가 자신의 직업을 대체할지 모른다는 불안 때문에, 스스로 좋아하는 것을 탐구하고 만드는 즐거움까지 잃어버리지 않았으면 좋겠습니다. 많은 경우 번아웃은 기술 변화 자체보다도 호기심을 잃고 두려움에만 집중할 때 찾아옵니다.

앞으로 성장하는 디자이너는 사용자 니즈, 비즈니스 목표, 기술적 제약을 연결할 수 있는 사람일 것입니다. 단순히 보기 좋은 화면을 만드는 사람을 넘어 말입니다.`,
  },
  {
    q: "AI가 디자인 프로세스에 들어온 이후, PM 및 엔지니어링과의 관계는 어떻게 변했나요?",
    a: `가장 큰 변화는 디자인이 더 이상 아이디어의 유일한 주인이 아니라는 점입니다.

PM은 주말 동안 프로토타입을 만들 수 있고, 엔지니어는 디자인 리뷰 전에 여러 개의 UI 방향을 만들어 올 수 있습니다. 저는 이것이 꼭 나쁜 변화라고 생각하지는 않습니다.

오히려 디자인의 가치가 결과물을 만드는 것에서 의사결정을 돕는 것으로 이동하고 있다고 느낍니다. 이제 중요한 질문은 "어떻게 디자인할까?"보다 "이걸 정말 만들어야 할까?"에 가깝습니다.

아이러니하게도 AI는 협업의 중요성을 줄인 것이 아니라 오히려 더 크게 만들었습니다.`,
  },
];

export default function BonusYeawonKimKo() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>김예원</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/yeawon-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Design Lead</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Yeawon Kim · 김예원</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Design Lead @ TikTok · ex-Uber · Design Systems Principal · AI Platform
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
