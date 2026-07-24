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

const currentSlug = "bonus/chan-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI 툴을 사용하기 시작한 이후, 일상적인 디자인 프로세스에서 가장 크게 바뀐 것은 무엇인가요?",
    a: `가장 큰 변화는 코드베이스를 직접 읽을 수 있게 됐다는 겁니다.

예전에는 기술적으로 무엇이 가능한지, 이미 어떻게 구현되어 있는지 알려면 엔지니어에게 물어봐야 했습니다. 엔지니어들은 바쁘니까 몇 시간 뒤에 답이 오거나, 아예 안 오거나, 자기들도 잘 모르는 경우도 있었죠. 지금은 Claude한테 물어봅니다. 코드를 읽고 필요한 걸 바로 알려줍니다.

그게 의사결정 속도를 완전히 바꿔놨습니다. 아무도 기다릴 필요가 없어졌습니다.

MCP로 고객 피드백을 자동으로 끌어오는 것도 시작했습니다. 저희는 B2B라 고객 피드백이 쏟아지는데, PM이 요구사항으로 정리해줄 때까지 기다리지 않고 직접 끌어다가 리콰이어먼트와 PRD를 만듭니다. 2년 전에는 디자이너가 PRD를 만진다는 게 이상한 일이었는데, 지금은 그냥 더 빠른 방법이 됐습니다.`,
  },
  {
    q: "코드 체킹을 직접 시도해봤다고 하셨는데 — 어떻게 됐나요?",
    a: `신나서 엄청 깊이 들어갔습니다. 코드 리뷰도 하고, 테스트도 돌리고, CSS도 직접 고치고.

엔지니어들의 반응은 이랬습니다. "고맙긴 한데... 왜?" 고마움 반, 살짝 영역 침범에 대한 경계 반이었습니다. 그만하라고는 안 했지만 메시지는 분명했습니다.

디자인 리더십도 같은 피드백을 줬습니다. 구현보다 아이디에이션을 더 원한다고. 그래서 물러났습니다.

근데 그 시기에 뭔가를 배웠습니다. 제가 그렇게 한 이유는 퀄리티 때문이었거든요. 같이 일하는 엔지니어들이 다 백엔드 중심이라 프론트엔드가 약했어요. CSS 무엇이 문제인지 설명하고 기다리는 것보다 제가 직접 고치는 게 더 빨랐습니다. 그 컨트롤이 좋았습니다.

근데 트레이드오프는 분명합니다. 코드에 쏟은 시간만큼 문제에 집중하는 시간이 줄어듭니다. 실행에 깊이 들어갈 수도 있고, 질문의 상류에 머무를 수도 있습니다. 팀에 따라 답이 다르겠지만, 지금은 어디서 레버리지가 더 높은지 알게 됐습니다.`,
  },
  {
    q: "주변 디자인 팀은 AI로 인해 어떻게 변화하고 있나요?",
    a: `팀이 말 그대로 그것에 맞춰 재편되고 있습니다.

2년 동안 함께 시작한 디자이너의 절반 이상이 바뀌었습니다. 새 리더십이 적응하지 못한 사람들을 내보내고, 들어오는 사람들은 다릅니다. 커뮤니케이션 잘하고, 전략적으로 생각하고, Claude Code는 당연히 씁니다.

가장 인상적인 관찰은 리서처들이었습니다. 가장 빠르게 적응했어요. 구조화되지 않은 대량의 데이터를 합성하는 게 그들이 항상 하고 싶었던 일이었는데 AI가 모든 장애물을 없애줬습니다. 신세계였죠.

콘텐츠 디자이너들은 어려웠습니다. 그중 한 명은 자신이 쓴 모든 것, 자신의 목소리, 자신의 패턴 전부를 GPT에 학습시키고 회사를 떠났습니다. 무슨 일이 벌어지고 있는지 보고, 사라지기 전에 스스로 레버리지를 만들기로 한 거죠.

전통적인 UX 스킬만 있는 디자이너들, 픽셀 작업, 컴포넌트 조립만 하는 사람들은 힘들어하고 있습니다. 문제를 명확하게 설명할 수 있고, AI와 효과적으로 대화할 수 있고, 기술적인 범위가 어느 정도 있는 사람들은 괜찮습니다.`,
  },
  {
    q: "지금 이걸 헤쳐나가야 하는 주니어 디자이너에게 뭐라고 해주고 싶으세요?",
    a: `솔직히 깔끔한 답이 없습니다. 환경이 조언보다 빠르게 변하고 있거든요.

그래도 믿는 게 있다면: 회사를 쫓지 말고, 자기 것을 만들라는 겁니다.

잘 버티고 있는 디자이너들은 자기가 잘하는 구체적인 무언가를 찾은 사람들입니다. 툴도 아니고 타이틀도 아닌, 진짜 자기 것. 그걸 깊이 판 사람들에게는 그걸 원하는 사람들이 찾아옵니다.

프로세스 자체는 사라지지 않습니다. 가설 세우고, 반복하고, 검증하는 루프는 없어지지 않아요. 그냥 더 빨라질 뿐입니다. 사라지는 건 그 루프를 이해하지 못하면서 단계만 수행하는 역할입니다.

그래서 스스로에게 물어야 할 질문은 '어떤 툴을 배워야 하나?'가 아닙니다. '어떤 문제를 나보다 잘 아는 사람이 없나?' 거기서 시작하세요.`,
  },
];

export default function BonusChanKimKo() {
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
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B7</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Chan Kim · 김찬</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/chan-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Product Design Lead</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Chan Kim · 김찬</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Product Design Lead · Rippling &nbsp;·&nbsp; 전 Senior Design Manager · Atlassian
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
