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

const currentSlug = "how-to-raise";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>16장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>16</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>조율의 네 가지 요소</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/how-to-raise" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>AI는 선택지를 만드는 비용을 낮췄습니다.</p>

            <p>이제 누구나 몇 분 안에 아이디어, 프로토타입, 발표 자료, 코드, 콘텐츠를 만들 수 있습니다.</p>

            <p>창작은 풍부해지고 있습니다.</p>

            <p>선택은 희소해지고 있습니다.</p>

            <p>문제는 더 이상 가능성을 만드는 것이 아닙니다.</p>

            <p>문제는 어떤 가능성을 추구할지 결정하는 것입니다.</p>

            <p>그것이 조율입니다.</p>

            <hr />

            <p>
              지난 1년 동안, 저는 거의 모든 제품 논의가
              네 가지 요소로 귀결된다는 것을 알게 되었습니다.
            </p>

            <hr />

            <p><strong>명확성(Clarity)</strong> — 우리가 해결하려는 문제는 무엇인가?</p>
            <p><strong>트레이드오프(Trade-offs)</strong> — 우리는 무엇을 희생할 의향이 있는가?</p>
            <p><strong>우선순위(Priority)</strong> — 지금 가장 중요한 것은 무엇인가?</p>
            <p><strong>결정(Decision)</strong> — 우리는 무엇을 할 것인가, 그리고 누가 책임지는가?</p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-four-elements.png"
              alt="Four quadrants: Clarity (lighthouse), Trade-offs (balance scale), Priority (signpost), Decision (placing a block)"
            >
              <p>팀이 앞으로 나아가는 데 어려움을 겪을 때, 이 네 가지 중 하나가 빠져 있는 경우가 많습니다.</p>

              <p>팀이 빠르게 움직일 때, 네 가지를 모두 갖추고 있는 경향이 있습니다.</p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>1. 명확성(Clarity)</p>
            <p><strong>우리가 해결하려는 문제는 무엇인가?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-clarity.png"
              alt="Three people in Seoul each thinking about a different goal — food, palace, K-pop concert"
            >
              <p>
                프로토타입이 다섯 개, 이해관계자가 열 명, 의견이 스무 개일 때,
                가장 중요한 기여는 모두가 같은 질문에 동의하도록 돕는 것입니다.
              </p>

              <p>모든 이견이 해결책에 관한 이견은 아닙니다.</p>

              <p>때로는 서로 완전히 다른 문제를 풀고 있는 것입니다.</p>

              <p>어떤 사람은 채택률을 최적화하고 있고,</p>

              <p>어떤 사람은 매출을 최적화하고 있으며,</p>

              <p>어떤 사람은 기술적 실현 가능성을 최적화하고 있습니다.</p>

              <p>명확성 없이는 팀이 서로 다른 문제에 대한 해결책을 논쟁합니다.</p>

              <p>
                훌륭한 조율자는 무엇을 만들지 결정하기 전에
                모두가 같은 문제를 풀고 있는지 확인합니다.
              </p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>2. 트레이드오프(Trade-offs)</p>
            <p><strong>우리는 무엇을 희생할 의향이 있는가?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-trade-offs.png"
              alt="Three people on a balance scale — Korea trip on one side, KBBQ in LA on the other"
            >
              <p>의미 있는 모든 결정은 무언가를 포기해야 합니다.</p>

              <p>속도 대 품질.</p>

              <p>범위 대 집중.</p>

              <p>단기 결과 대 장기 투자.</p>

              <p>
                가장 빠르게 움직이는 팀이 반드시 가장 똑똑한 팀은 아닙니다.
              </p>

              <p>
                그들은 무엇을 희생할 의향이 있는지에 대해 솔직한 팀입니다.
              </p>

              <p>트레이드오프 없이는 모두가 모든 것을 원합니다.</p>

              <p>트레이드오프를 명명하는 것이 종종 대화를 풀어주는 열쇠입니다.</p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>3. 우선순위(Priority)</p>
            <p><strong>지금 가장 중요한 것은 무엇인가?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-priority.png"
              alt="Seoul map with countless options scattered around — one circled cluster of sites highlighted as the priority"
            >
              <p>누구나 선택지를 만들 수 있습니다.</p>

              <p>AI가 그것을 쉽게 만들었습니다.</p>

              <p>어려운 것은 선택하는 일입니다.</p>

              <p>저는 모든 방향이 타당했던 회의에 많이 들어가 봤습니다.</p>

              <p>모든 이해관계자의 말이 일리가 있었습니다.</p>

              <p>모든 제안이 합리적으로 들렸습니다.</p>

              <p>그래도 팀은 결정 없이 자리를 떴습니다.</p>

              <p>문제는 지능이 아니었습니다.</p>

              <p>
                문제는 그 순간 무엇이 가장 중요한지 아무도 파악하지 못했다는 것입니다.
              </p>

              <p>우선순위 없이는 모든 것이 중요해집니다.</p>

              <p>그리고 모든 것이 중요하면, 아무것도 움직이지 않습니다.</p>
            </SlideRow>

            <hr />

            <p className="chapter-part-label" style={{ color: "#bc7155", marginTop: "var(--sp-8)" }}>4. 결정(Decision)</p>
            <p><strong>우리는 무엇을 할 것인가, 그리고 누가 책임지는가?</strong></p>

            <SlideRow
              image="/mindbook/ktalk/slides/ch16-decision.png"
              alt="One person points up and says 내가 한턱 쏜다 — I've got this — as the group aligns on the plan"
            >
              <p>결정 없이 끝나는 회의는 그냥 대화입니다.</p>

              <p>누군가는 결정을 내려야 합니다.</p>

              <p>누군가는 결과에 책임을 져야 합니다.</p>

              <p>대부분의 조직에는 실행 시스템이 있습니다.</p>

              <p>디자인 시스템. 로드맵. 스프린트 계획. 엔지니어링 프로세스.</p>

              <p>하지만 의사결정 시스템을 가진 조직은 매우 드뭅니다.</p>

              <p>경쟁하는 아이디어를 어떻게 평가하는가?</p>

              <p>이견을 어떻게 초기에 발견하는가?</p>

              <p>3개월 뒤 같은 논쟁을 어떻게 반복하지 않는가?</p>

              <p>결정 없이는 조직이 진전 대신 대화를 반복합니다.</p>
            </SlideRow>

            <hr />

            <p>대부분의 조직이 가진 것은 의사결정 문제가 아닙니다.</p>

            <p>의사결정 준비 문제입니다.</p>

            <p>결정이 실패하는 이유는 대부분 사람들이 충분히 똑똑하지 않아서가 아닙니다.</p>

            <p>
              팀이 명확성, 트레이드오프, 우선순위에 대해 끝내 정렬하지 못했기 때문입니다.
            </p>

            <hr />

            <p>조율의 목표는 동의가 아닙니다.</p>

            <p>조율의 목표는 헌신입니다.</p>

            <hr />

            <p>디자이너였을 때 저는 더 좋은 결과물을 만드는 데서 가치가 온다고 생각했습니다.</p>

            <p>더 좋은 와이어프레임. 더 좋은 프로토타입. 더 좋은 발표 자료.</p>

            <p>
              오늘날 저는 제가 하는 일 중 레버리지가 가장 높은 것이
              팀이 이 네 가지 질문에 답하도록 돕는 것이라고 생각합니다.
            </p>

            <p>왜냐하면 답이 명확해지면 결과물은 대부분 쉬운 부분이 되기 때문입니다.</p>

            <hr />

            <p>누구나 결과물을 만들 수 있습니다.</p>

            <p>정렬을 만들 수 있는 사람은 더 적습니다.</p>

            <p>누구나 선택지를 만들 수 있습니다.</p>

            <p>팀이 선택하도록 도울 수 있는 사람은 더 적습니다.</p>

            <hr />

            <p>
              다음 시대에 성공하는 사람들은 반드시 최고의 프롬프트나 최신 도구를 가진 사람이 아닐 것입니다.
            </p>

            <p>
              꾸준히 명확성을 만들고, 트레이드오프를 헤쳐나가고,
              우선순위를 정하고, 결정을 이끌어내는 사람들일 것입니다.
            </p>

            <p>그들이 천장을 올리는 사람들입니다.</p>

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
