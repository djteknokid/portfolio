import Link from "next/link";
import ManuscriptSidebarKo from "../ManuscriptSidebarKo";
import SlideRow from "../../SlideRow";

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
  { number: "B1" as unknown as number, slug: "bonus/yeawon-kim",  title: "보너스 — 예원 김" },
  { number: "B2" as unknown as number, slug: "bonus/wenyang-mu",   title: "보너스 — 웬양 무" },
  { number: "B3" as unknown as number, slug: "bonus/yuha-kim",     title: "보너스 — 유하 김" },
  { number: "B4" as unknown as number, slug: "bonus/vivian-chu",   title: "보너스 — 비비안 추" },
  { number: "B5" as unknown as number, slug: "bonus/insun-ahn",     title: "보너스 — 안인선" },
  { number: "B6" as unknown as number, slug: "bonus/bryan-oh",      title: "보너스 — 오상영" },
  { number: "B7" as unknown as number, slug: "bonus/chan-kim",   title: "보너스 — 김찬" },
  { number: "B8" as unknown as number, slug: "bonus/taeho-kim",  title: "보너스 — 태호 김" },
];

const currentSlug = "signal-1";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter9Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>9장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>9</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>신호 1 — 산출물 생성</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/signal-1" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>첫 번째 신호는 아마 가장 눈에 잘 보이는 신호일 겁니다.</p>

            <p>그리고 솔직히 말하면,</p>

            <p>가장 많은 사람들을 불편하게 만드는 신호이기도 합니다.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch9-artifact-expensive.png"
              alt="Designer working under pressure at laptop while stakeholders wait impatiently"
            >
            <p>오랫동안 제품 개발(Product Development)의 세계에서</p>

            <p>결과물을 만드는 일은 비싼 일이었습니다.</p>

            <hr />

            <p>와이어프레임은 시간이 걸렸습니다.</p>

            <p>목업은 기술이 필요했습니다.</p>

            <p>프로토타입은 더 많은 기술이 필요했습니다.</p>
            </SlideRow>

            <hr />

            <p>인터랙션이 있는 현실적인 결과물을 만들고 싶다면</p>

            <p>그 방 안에 있는 몇 안 되는 전문가의 도움이 필요했습니다.</p>

            <hr />

            <p>그 희소성이</p>

            <p>제품 팀의 구조를 만들었습니다.</p>

            <hr />

            <p>PM은 요구사항을 담당하고,</p>

            <p>디자이너는 결과물을 담당하고,</p>

            <p>엔지니어는 구현을 담당했습니다.</p>

            <hr />

            <p>그 구조가 완벽해서가 아닙니다.</p>

            <hr />

            <p>그 경계를 넘는 비용이 너무 컸기 때문입니다.</p>

            <hr />

            <p>그런데 지금은 어떨까요?</p>

            <hr />

            <p>PM도 프로토타입을 만듭니다.</p>

            <p>엔지니어도 프로토타입을 만듭니다.</p>

            <p>창업자도 프로토타입을 만듭니다.</p>

            <p>리서처도 프로토타입을 만듭니다.</p>

            <hr />

            <p>가끔은 AI가 프로토타입을 만들기도 합니다.</p>

            <hr />

            <p>1년 전만 해도</p>

            <p>아이디어가 있으면 설명했습니다.</p>

            <hr />

            <p>지금은 보여줍니다.</p>

            <hr />

            <p>저는 이것이 굉장히 큰 변화라고 생각합니다.</p>

            <hr />

            <p>그리고 저는 여기서 흥미로운 현상을 하나 발견했습니다.</p>

            <hr />

            <p>결과물 자체의 중요성이 조금씩 달라지고 있다는 것입니다.</p>

            <hr />

            <p>결과물이 중요하지 않다는 이야기가 아닙니다.</p>

            <hr />

            <p>모두가 가지고 있다는 이야기입니다.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch9-everyone-has-prototype.png"
              alt="Team meeting with walls covered in wireframes and prototypes, everyone pointing at different things"
            >
            <p>요즘 회의실에 들어가 보세요.</p>

            <hr />

            <p>PM도 프로토타입이 있습니다.</p>

            <p>디자이너도 프로토타입이 있습니다.</p>

            <p>엔지니어도 프로토타입이 있습니다.</p>

            <hr />

            <p>모두가 의견을 가지고 있습니다.</p>

            <p>그리고 이제는 그 의견을 시각적으로 표현한 결과물도 가지고 있습니다.</p>
            </SlideRow>

            <hr />

            <p>예전에는 결과물 자체가 기여(Contribution)였습니다.</p>

            <hr />

            <p>지금은 점점 결과물이 출발점처럼 느껴집니다.</p>

            <hr />

            <p>회의에 가져오는 것.</p>

            <p>대화를 시작하는 것.</p>

            <hr />

            <p>더 이상 그것 자체가 가치의 전부는 아닙니다.</p>

            <hr />

            <p>아주 미묘한 변화입니다.</p>

            <hr />

            <p>하지만 굉장히 중요한 변화입니다.</p>

            <hr />

            <p>왜냐하면 모두가 결과물을 만들 수 있다면,</p>

            <hr />

            <p>모두가 아이디어를 시각화할 수 있다면,</p>

            <hr />

            <p>모두가 무언가를 테이블 위에 올릴 수 있다면,</p>

            <hr />

            <p>그때 진짜 가치 있는 것은 무엇일까요?</p>

            <hr />

            <p>저는 이것이 디자인만의 질문이라고 생각하지 않습니다.</p>

            <hr />

            <p>제품 개발 전체의 질문이라고 생각합니다.</p>

            <hr />

            <p>그리고 이것이 제가 병목이 이동하고 있다고 느낀 첫 번째 신호였습니다.</p>

            <hr />

            <p>창작은 빨라졌습니다.</p>

            <p>의사결정은 그렇지 않았습니다.</p>

            <hr />

            <p>이제 병목은 아이디어를 생성하는 것이 아닙니다.</p>

            <p>병목은 아이디어들 사이에서 선택하는 것입니다.</p>

            <hr />

            <p>그럼 두 번째 신호를 보겠습니다.</p>

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
