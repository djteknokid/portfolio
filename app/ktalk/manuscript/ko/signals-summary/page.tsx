import Link from "next/link";
import ManuscriptSidebarKo from "../ManuscriptSidebarKo";

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
  { number: 17, slug: "conclusion",        title: "마치며" },
];

const currentSlug = "signals-summary";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter13Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>12장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>12</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>세 가지 신호의 공통점</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/koreatalk/manuscript/signals-summary" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>이제 세 가지 신호를 한 곳에 모아 봅시다.</p>

            <hr />

            <p>결과물 생성은 더 이상 희소하지 않습니다.</p>

            <hr />

            <p>선택지는 폭발적으로 늘어났습니다.</p>

            <hr />

            <p>역할의 경계는 흐려지고 있습니다.</p>

            <hr />

            <p>불만은 생산 능력(Capacity)에서 명확성(Clarity)으로 이동했습니다.</p>

            <hr />

            <p>서로 다른 관찰입니다.</p>

            <p>서로 다른 현상입니다.</p>

            <p>서로 다른 각도입니다.</p>

            <hr />

            <p>하지만 저는 모두 같은 모양을 하고 있다고 생각합니다.</p>

            <hr />

            <p>왜냐하면 세 가지 신호 모두</p>

            <p>같은 이야기를 하고 있기 때문입니다.</p>

            <hr />

            <p>창작(Creation)은 풍부해지고 있습니다.</p>

            <hr />

            <p>그리고 창작 이후의 것들이 희소해지고 있습니다.</p>

            <hr />

            <p>아이디어는 풍부합니다.</p>

            <p>디자인도 풍부합니다.</p>

            <p>프로토타입도 풍부합니다.</p>

            <p>코드도 풍부합니다.</p>

            <p>리서치도 풍부합니다.</p>

            <p>선택지도 풍부합니다.</p>

            <hr />

            <p>하지만.</p>

            <hr />

            <p>정렬(Alignment)은 부족합니다.</p>

            <p>명확성(Clarity)은 부족합니다.</p>

            <p>공유된 이해(Shared Understanding)는 부족합니다.</p>

            <p>함께 의사결정을 내리는 능력은 부족합니다.</p>

            <hr />

            <p>
              그리고 저는 그것이 점점 제품 팀에서 가장 희소한 자원이 되어가고 있다고
              생각합니다.
            </p>

            <hr />

            <p>우리는 더 이상 창작 문제가 없습니다.</p>

            <hr />

            <p>우리는 조율 문제가 있습니다.</p>

            <hr />

            <p>한 번 생각해 보세요.</p>

            <hr />

            <p>여러분이 경험했던 가장 답답한 팀은 어떤 팀이었습니까?</p>

            <hr />

            <p>만들 수 없어서 멈춰 있던 팀이었습니까?</p>

            <hr />

            <p>아니면 결정하지 못해서 멈춰 있던 팀이었습니까?</p>

            <hr />

            <p>데이터를 다르게 해석하는 사람들.</p>

            <p>서로 경쟁하는 프로토타입들.</p>

            <p>무엇을 선택해야 하는지 모르는 팀.</p>

            <p>권한은 있는데 기준이 없는 조직.</p>

            <hr />

            <p>회의가 끝날 때마다</p>

            <p>&ldquo;이건 오프라인으로 이야기해보죠.&rdquo;</p>

            <p>라고 말하지만,</p>

            <hr />

            <p>그 오프라인 대화조차 아무것도 해결하지 못하는 상황.</p>

            <hr />

            <p>아마 많은 분들이 이런 경험이 있으실 겁니다.</p>

            <hr />

            <p>무언가를 만들 수는 있습니다.</p>

            <hr />

            <p>그런데 함께 움직일 수는 없습니다.</p>

            <hr />

            <p>그리고 그 상태는 정말 에너지를 많이 소모합니다.</p>

            <hr />

            <p>
              저는 앞으로 몇 년 동안
              이것이 제품 개발(Product Development)의 가장 대표적인 경험이 될 것이라고
              생각합니다.
            </p>

            <hr />

            <p>왜냐하면 AI는 생산(Production)의 비용을 계속 낮추고 있기 때문입니다.</p>

            <hr />

            <p>매달 더 빨라집니다.</p>

            <p>매달 더 쉬워집니다.</p>

            <p>매달 더 저렴해집니다.</p>

            <hr />

            <p>하지만 조율은 다릅니다.</p>

            <hr />

            <p>사람에 대한 문제입니다.</p>

            <p>판단(Judgment)에 대한 문제입니다.</p>

            <p>신뢰(Trust)에 대한 문제입니다.</p>

            <p>공유된 이해에 대한 문제입니다.</p>

            <hr />

            <p>이것들은 자동으로 빨라지지 않습니다.</p>

            <p>이것들은 자동으로 해결되지 않습니다.</p>

            <hr />

            <p>의도적인 투자와 노력이 필요합니다.</p>

            <hr />

            <p>
              그래서 저는 앞으로 하나의 간극이 점점 커질 것이라고 생각합니다.
            </p>

            <hr />

            <p>팀이 만들어낼 수 있는 양.</p>

            <hr />

            <p>그리고</p>

            <p>팀이 결정할 수 있는 양.</p>

            <hr />

            <p>그 사이의 간극입니다.</p>

            <hr />

            <p>누군가가 그 간극을 메우지 않는다면,</p>

            <p>그 차이는 계속 벌어질 것입니다.</p>

            <hr />

            <p>그리고 저는 바로 거기에 기회가 있다고 생각합니다.</p>

            <hr />

            <p>아주 큰 기회입니다.</p>

            <hr />

            <p>왜냐하면 대부분의 사람들은 여전히</p>

            <p>&ldquo;어떻게 더 만들까?&rdquo;</p>

            <p>를 고민하고 있기 때문입니다.</p>

            <hr />

            <p>하지만 앞으로 더 중요한 질문은</p>

            <p>&ldquo;어떻게 더 잘 결정할까?&rdquo;</p>

            <p>가 될 수도 있기 때문입니다.</p>

            <hr />

            <p>그리고 그 질문이</p>

            <p>제가 오늘 이야기하고 있는 조율의 시대의 출발점입니다.</p>

          </div>

          <nav className="chapter-nav chapter-prose">
            {prev ? <Link href={`/koreatalk/manuscript/ko/${prev.slug}`}>← {prev.title}</Link> : <span />}
            {next ? <Link href={`/koreatalk/manuscript/ko/${next.slug}`}>{next.title} →</Link> : <span />}
          </nav>
        </article>
      </main>
    </div>
  );
}
