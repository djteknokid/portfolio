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

const currentSlug = "industry-feeling";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter14Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>13장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>13</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>업계는 이미 느끼고 있다</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/industry-feeling" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>제가 결론을 말씀드리기 전에,</p>

            <p>먼저 하나를 보여드리고 싶습니다.</p>

            <hr />

            <p>몇 주 전,</p>

            <p>저는 링크드인에 질문 하나를 올렸습니다.</p>

            <hr />

            <p>사실 꽤 단순한 질문이라고 생각했습니다.</p>

            <hr />

            <p>PM이 디자인 리뷰에 들어옵니다.</p>

            <hr />

            <p>고품질 프로토타입을 들고 왔습니다.</p>

            <hr />

            <p>코드로 만들었습니다.</p>

            <hr />

            <p>인터랙티브합니다.</p>

            <hr />

            <p>거의 제품처럼 보입니다.</p>

            <hr />

            <p>그렇다면 이제 UX의 역할은 무엇일까요?</p>

            <hr />

            <p>그게 질문의 전부였습니다.</p>

            <hr />

            <p>저는 다양한 의견이 나올 거라고 생각했습니다.</p>

            <hr />

            <p>그런데 예상하지 못한 것은</p>

            <p>반응의 강도였습니다.</p>

            <hr />

            <p>어떤 사람은 말했습니다.</p>

            <hr />

            <p>&ldquo;원래 어려운 것은 화면을 만드는 것이 아니었다.&rdquo;</p>

            <hr />

            <p>&ldquo;어떤 문제를 해결해야 하는지를 아는 것이 어려웠다.&rdquo;</p>

            <hr />

            <p>또 어떤 사람은 말했습니다.</p>

            <hr />

            <p>&ldquo;고품질 프로토타입이 등장하는 순간,</p>

            <p>리더십은 더 이상 다른 의견을 듣지 않는다.&rdquo;</p>

            <hr />

            <p>&ldquo;토론은 사실상 끝난다.&rdquo;</p>

            <hr />

            <p>어떤 사람은</p>

            <p>UX가 더 상위 단계로 올라가야 한다고 말했습니다.</p>

            <hr />

            <p>어떤 사람은</p>

            <p>PM이 디자인 영역을 침범하고 있다고 말했습니다.</p>

            <hr />

            <p>어떤 사람은</p>

            <p>AI는 디자인을 할 수 없다고 말했습니다.</p>

            <hr />

            <p>또 어떤 사람은</p>

            <p>그게 핵심이 아니라고 말했습니다.</p>

            <hr />

            <p>그리고 댓글을 계속 읽다 보니</p>

            <p>재미있는 사실을 발견했습니다.</p>

            <hr />

            <p>사람들은 프로토타입에 대해 이야기하고 있는 것처럼 보였습니다.</p>

            <hr />

            <p>하지만 사실은</p>

            <p>프로토타입에 대해 이야기하고 있지 않았습니다.</p>

            <hr />

            <p>같은 상황.</p>

            <hr />

            <p>같은 결과물.</p>

            <hr />

            <p>같은 기술.</p>

            <hr />

            <p>그런데 완전히 다른 결론들.</p>

            <hr />

            <p>그 순간 저는 깨달았습니다.</p>

            <hr />

            <p>이 논쟁은 AI에 대한 논쟁이 아니었습니다.</p>

            <hr />

            <p>디자인에 대한 논쟁도 아니었습니다.</p>

            <hr />

            <p>프로토타이핑에 대한 논쟁조차 아니었습니다.</p>

            <hr />

            <p>의사결정에 대한 논쟁이었습니다.</p>

            <hr />

            <p>누가 방향에 영향을 주는가?</p>

            <hr />

            <p>누가 가정을 검증하는가?</p>

            <hr />

            <p>누가 더 좋은 아이디어를 선택하는가?</p>

            <hr />

            <p>누가 무엇을 만들지 결정하는가?</p>

            <hr />

            <p>누가 어떤 문제를 풀어야 하는지 결정하는가?</p>

            <hr />

            <p>이것들은 실행의 문제가 아닙니다.</p>

            <hr />

            <p>조율의 문제입니다.</p>

            <hr />

            <p>오랫동안 결과물은</p>

            <p>역할을 정의하는 기준이었습니다.</p>

            <hr />

            <p>PM은 요구사항을 작성했습니다.</p>

            <hr />

            <p>디자이너는 결과물을 만들었습니다.</p>

            <hr />

            <p>엔지니어는 제품을 구현했습니다.</p>

            <hr />

            <p>결과물은 각 역할의 경계 안에 있었습니다.</p>

            <hr />

            <p>그런데 이제는 아닙니다.</p>

            <hr />

            <p>PM도 결과물을 만듭니다.</p>

            <hr />

            <p>디자이너도 만듭니다.</p>

            <hr />

            <p>엔지니어도 만듭니다.</p>

            <hr />

            <p>AI도 만듭니다.</p>

            <hr />

            <p>그리고 갑자기 모두가 같은 질문을 하기 시작합니다.</p>

            <hr />

            <p>&ldquo;그럼 내 역할은 무엇인가?&rdquo;</p>

            <hr />

            <p>처음에는 역할에 대한 논쟁처럼 보입니다.</p>

            <hr />

            <p>하지만 저는 그렇게 생각하지 않습니다.</p>

            <hr />

            <p>저는 이것이 가치에 대한 논쟁이라고 생각합니다.</p>

            <hr />

            <p>그리고 그 밑바닥에는</p>

            <p>조율의 문제가 숨어 있다고 생각합니다.</p>

            <hr />

            <p>왜냐하면 이제는 누구나 만들 수 있기 때문입니다.</p>

            <hr />

            <p>그래서 진짜 질문은 바뀌었습니다.</p>

            <hr />

            <p>어떻게 결정할 것인가?</p>

            <hr />

            <p>어떻게 서로 다른 아이디어를 평가할 것인가?</p>

            <hr />

            <p>어떻게 방향을 정할 것인가?</p>

            <hr />

            <p>어떻게 정렬할 것인가?</p>

            <hr />

            <p>어떻게 함께 앞으로 나아갈 것인가?</p>

            <hr />

            <p>저는 그래서 이 대화들이</p>

            <p>이렇게 감정적이라고 생각합니다.</p>

            <hr />

            <p>사람들은 자신의 역할을 지키고 있다고 생각합니다.</p>

            <hr />

            <p>하지만 실제로는</p>

            <p>오래된 의사결정 모델이 무너지고 있는 것에 반응하고 있는 것입니다.</p>

            <hr />

            <p>예전에는 느린 실행이</p>

            <p>정렬 부족을 가려주었습니다.</p>

            <hr />

            <p>무언가를 만드는 데 몇 주가 걸렸습니다.</p>

            <hr />

            <p>그 과정에서 사람들은</p>

            <p>이야기했습니다.</p>

            <hr />

            <p>정렬했습니다.</p>

            <hr />

            <p>토론했습니다.</p>

            <hr />

            <p>설득했습니다.</p>

            <hr />

            <p>합의했습니다.</p>

            <hr />

            <p>그런데 이제는</p>

            <p>프로토타입이 하루 만에 나옵니다.</p>

            <hr />

            <p>정렬은 그렇지 않습니다.</p>

            <hr />

            <p>그리고 갑자기</p>

            <p>팀이 의사결정을 하는 방식의 약점들이</p>

            <p>그대로 드러나기 시작합니다.</p>

            <hr />

            <p>프로토타입이 문제를 만든 것이 아닙니다.</p>

            <hr />

            <p>프로토타입이 문제를 드러낸 것입니다.</p>

            <hr />

            <p>그리고 링크드인 토론을 한 발짝 떨어져서 바라보았을 때,</p>

            <p>저는 그것이 지금까지 살펴본 모든 신호들과</p>

            <p>같은 곳을 가리키고 있다는 것을 깨달았습니다.</p>

            <hr />

            <p>결과물은 풍부해지고 있습니다.</p>

            <hr />

            <p>선택지는 넘쳐나고 있습니다.</p>

            <hr />

            <p>역할의 경계는 흐려지고 있습니다.</p>

            <hr />

            <p>사람들의 불만도 바뀌고 있습니다.</p>

            <hr />

            <p>그리고 이제는</p>

            <p>업계의 대화 자체도 바뀌고 있습니다.</p>

            <hr />

            <p>병목은 이동했습니다.</p>

            <hr />

            <p>그리고 저는 업계 전체가</p>

            <p>이미 그것을 느끼기 시작했다고 생각합니다.</p>

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
