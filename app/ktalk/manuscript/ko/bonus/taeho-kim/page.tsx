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

const currentSlug = "bonus/taeho-kim";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

const QA = [
  {
    q: "AI가 프론트엔드 엔지니어로서 일하는 방식을 어떻게 바꿨나요?",
    a: `거의 완전히 바뀌었습니다. 전에는 Cursor와 Penpot을 따로 썼는데, 이제는 거의 모든 걸 터미널의 Claude Code로 합니다.

가장 큰 변화는 코드베이스와 상호작용하는 방식이었습니다. 전에는 무엇이 만들어졌는지, 기술적으로 무엇이 가능한지 파악하려면 코드를 직접 파헤치거나 누군가에게 물어봐야 했습니다. 지금은 회신이 즉각적입니다. 의사결정 속도가 완전히 달라졌고, 기다리는 일이 없어졌습니다.

또 다른 큰 변화는 디자인 시스템이었습니다. 저희 스타트업에는 전담 디자이너가 없었습니다. Penpot으로 디자인 시스템을 구축한 다음 MCP로 연결했습니다. 엔지니어들이 Claude Code로 UI를 만들 때 자동으로 우리 시스템에서 가져오도록요. 그게 없으면 엔지니어마다 자기 기준으로 "그럴듯해 보이는" 걸 만들게 되는데, 절대로 통일이 되지 않습니다.

Claude가 생성한 결과물과 실제로 출시되는 것 사이의 간격은 아직도 80~90% 정도입니다. 누군가가 결과물을 보고 판단을 내려야 합니다. 하지만 그게 아무것도 없는 것보다는 훨씬 나은 출발점입니다.`,
  },
  {
    q: "55개 회사, 8번의 파이널 라운드를 거친 진지한 구직 활동을 했는데 — 무엇을 배웠나요?",
    a: `시장이 1월에 느껴졌던 것만큼 나쁘지는 않았습니다. 문제는 제 이력서가 리쿠르터 필터를 통과하지 못하고 있었던 겁니다.

이력서는 나를 위해 쓰는 것도 아니고, 미래의 팀을 위해 쓰는 것도 아닙니다. 리쿠르터를 위해 쓰는 것이고, 요즘은 그 전에 ATS 시스템을 위해 씁니다. ATS는 그냥 키워드를 스캔합니다. 통과되면 리쿠르터가 이력서를 직무기술서와 비교합니다. 얼마나 잘 맞는지에 따라 연락이 오느냐 마느냐가 결정됩니다.

제 이력서는 너무 기술적이었습니다. 정확하긴 했지만 각 회사가 찾는 것을 반영하지 않고 있었습니다. 그걸 깨닫고 나서 네 가지 버전을 만들었습니다 — 프론트엔드 중심, 풀스택, UX 엔지니어 하이브리드, 그리고 제너럴리스트. 각 지원에 맞는 버전을 매칭했습니다.

맞춤 지원을 시작하고 나서 응답률이 크게 올랐습니다. 1월에 거의 제로였다가 3월에는 오퍼 3개를 받았습니다. 시장이 바뀐 게 아니었습니다. 제 접근 방식이 바뀐 겁니다.

한 가지 더: 질문 자체가 달마다 달라졌습니다. 1월 인터뷰에서 물어보는 것과 3월 인터뷰에서 물어보는 것이 달랐습니다. AI가 빠르게 움직이기 때문에 회사들이 엔지니어에게 원하는 것도 실시간으로 변하고 있습니다. 실제로 어떤 것을 테스트하는지 계속 파악하고 있어야 합니다.`,
  },
  {
    q: "디자이너와 긴밀히 협업한 프론트엔드 엔지니어로서 — 디자이너에게 실제로 무엇이 필요한가요?",
    a: `'왜'를 설명해줄 수 있는 사람이요.

"이걸 1픽셀 오른쪽으로 옮겨주세요"가 아닙니다. 그건 제가 알아낼 수 있습니다. 제게 필요한 건 이겁니다: 왜 옮겨야 하는지? 어떤 문제를 해결하는지? 어떤 사용자 행동을 반영하는지?

디자이너가 그 이유를 설명해줄 수 있을 때 — 그 뒤에 있는 사용자 리서치, 보호하려는 엣지 케이스, 만들려는 경험 — 모든 게 달라집니다. 그때부터 저는 단순히 스펙을 구현하는 게 아니라 의도를 이해하게 됩니다. 구현이 복잡해질 때 판단을 내릴 수 있게 됩니다.

저도 제 프론트엔드 작업을 같은 방식으로 공유합니다. 무언가를 변경할 때 왜 그랬는지 설명합니다. 이게 내가 바꾼 것이고, 왜 중요한지, 내가 뭘 지키려 했는지. 그게 협업을 실제로 작동하게 만드는 것입니다.

바이브 코딩된 디자인이 더 흔해지면서 이게 훨씬 더 중요해질 겁니다. 누군가가 AI로 UI를 만들고 왜 그런 선택을 했는지 설명하지 못한다면 — 그건 디자인이 아니라 노이즈입니다. "왜 거기에 버튼을 놨나요?"라는 질문에는 항상 답이 있어야 합니다.`,
  },
  {
    q: "5년 후에도 디자이너가 필요할까요?",
    a: `네 — 하지만 더 적은 수가, 그리고 역할이 달라질 겁니다.

AI가 UI를 생성하는 능력은 계속 좋아지고 있습니다. 하지만 디자인은 단순한 시각적 생산물이 아닙니다. 트렌드를 이해하고, 현재 어떤 것이 트렌디한지 파악하고, 실제 사람들이 실제로 사용하는 실제 제품에 노출되면서 쌓인 안목을 가지는 것입니다. 이건 자동화하기 어렵습니다. 모델이 학습했을 때 사실이었던 것이 아니라 '지금' 일어나고 있는 것을 알아야 하니까요.

번창할 디자이너는 AI가 복제할 수 없는 관점을 가진 사람들입니다. 생성된 결과물을 보고 무엇이 잘못됐는지 즉각적으로 알 수 있는 사람들 — 그리고 더 중요하게는, 왜 잘못됐는지, 무엇이어야 하는지를 아는 사람들.

모든 팀에는 디자인 관점을 가진 한 사람이 있어야 합니다. 그 본능을 개발한 한 사람. 열 명이 필요한 게 아닙니다. 하지만 한 명은 필요합니다.

위험한 시나리오는 바이브 코딩이 그 사람을 대체한다고 생각하는 팀입니다. 그렇지 않습니다. 생산 작업을 대체하는 겁니다. 사고는 여전히 어딘가에서 나와야 합니다.`,
  },
];

export default function BonusTaehoKimKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">

          {/* Header */}
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>보너스 — 실리콘밸리 엔지니어 인터뷰</p>
            <p className="chapter-part-subtitle">인터뷰 · 조율의 시대</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>B8</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>Taeho Kim · 태호 김</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/bonus/taeho-kim" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
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
              }}>Founding Principal Software Engineer</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}>Taeho (TK) Kim · 태호 김</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
              }}>
                Founding Principal Software Engineer (Frontend) · Full-stack · Design systems
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
