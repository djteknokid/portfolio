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
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>어떻게 천장을 올릴 것인가?</h1>
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

            <p>좋습니다.</p>

            <hr />

            <p>만약 제가 지금까지 이야기한 내용이 맞다면.</p>

            <hr />

            <p>만약 정말로 조율의 시대가 오고 있다면.</p>

            <hr />

            <p>그리고 조율이 새로운 병목이 되고 있다면.</p>

            <hr />

            <p>자연스럽게 다음 질문이 따라옵니다.</p>

            <hr />

            <p>그렇다면 우리는 어떻게 천장을 올릴 수 있을까?</p>

            <hr />

            <p>여기서 한 가지는 분명히 하고 싶습니다.</p>

            <hr />

            <p>저는 프레임워크를 드리려는 것이 아닙니다.</p>

            <hr />

            <p>5단계 방법론을 이야기하려는 것도 아닙니다.</p>

            <hr />

            <p>그리고 더 나은 조율자가 되는 법을</p>

            <p>링크드인 캐러셀 몇 장으로 배울 수 있다고 말할 생각도 없습니다.</p>

            <hr />

            <p>제가 할 수 있는 것은</p>

            <p>제가 관찰한 것을 공유하는 것입니다.</p>

            <hr />

            <p>제가 만난 사람들 중에서</p>

            <p>꾸준히 천장을 올리는 사람들은 무엇이 달랐을까?</p>

            <hr />

            <p>몇 가지 공통점이 있었습니다.</p>

            <hr />

            <p><strong>그들은 명확성을 만든다</strong></p>

            <hr />

            <p>의견이 많을 때.</p>

            <hr />

            <p>프로토타입이 다섯 개일 때.</p>

            <hr />

            <p>방향성이 세 개일 때.</p>

            <hr />

            <p>이해관계자가 열 명일 때.</p>

            <hr />

            <p>아이디어가 스무 개일 때.</p>

            <hr />

            <p>그들은 팀이 지금 무엇을 결정해야 하는지 이해하도록 돕습니다.</p>

            <hr />

            <p>생각보다 이것은 굉장히 중요합니다.</p>

            <hr />

            <p>모든 논의가 디자인 논의는 아닙니다.</p>

            <hr />

            <p>모든 논의가 기술 논의도 아닙니다.</p>

            <hr />

            <p>모든 논의가 비즈니스 논의도 아닙니다.</p>

            <hr />

            <p>가끔 가장 중요한 기여는</p>

            <p>사람들이 같은 질문을 바라보게 만드는 것입니다.</p>

            <hr />

            <p>제가 경험한 빠른 팀들은</p>

            <p>항상 가장 똑똑한 팀이 아니었습니다.</p>

            <hr />

            <p>오히려 무엇을 해결하려고 하는지</p>

            <p>가장 명확하게 이해하고 있는 팀들이었습니다.</p>

            <hr />

            <p><strong>그들은 번역 비용을 줄인다</strong></p>

            <hr />

            <p>좋은 제품 팀을 보면</p>

            <p>한 가지 공통점이 있습니다.</p>

            <hr />

            <p>정보가 잘 사라지지 않습니다.</p>

            <hr />

            <p>디자이너는 엔지니어링을 어느 정도 이해합니다.</p>

            <hr />

            <p>엔지니어는 제품 전략을 어느 정도 이해합니다.</p>

            <hr />

            <p>PM은 좋은 디자인이 무엇인지 어느 정도 이해합니다.</p>

            <hr />

            <p>누구도 다른 사람의 일을 대신하지는 않습니다.</p>

            <hr />

            <p>하지만 모두가 협업할 만큼은 이해하고 있습니다.</p>

            <hr />

            <p>생각해 보세요.</p>

            <hr />

            <p>정보가 한 사람에서 다음 사람으로 전달되기 위해</p>

            <p>세 번, 네 번씩 번역되어야 할 때 얼마나 많은 시간이 낭비될까요?</p>

            <hr />

            <p>핸드오프(Handoff)가 생길 때마다 마찰이 생깁니다.</p>

            <hr />

            <p>번역이 발생할 때마다 정보가 손실됩니다.</p>

            <hr />

            <p>그 마찰을 줄이는 사람들은</p>

            <p>생각보다 훨씬 큰 가치를 만들어냅니다.</p>

            <hr />

            <p><strong>그들은 팀이 결정하도록 돕는다</strong></p>

            <hr />

            <p>어쩌면 가장 중요한 부분일 수도 있습니다.</p>

            <hr />

            <p>왜냐하면 이제는 누구나 선택지를 만들 수 있기 때문입니다.</p>

            <hr />

            <p>AI가 그것을 매우 쉽게 만들었습니다.</p>

            <hr />

            <p>어려운 것은 선택하는 일입니다.</p>

            <hr />

            <p>저는 모든 옵션이 합리적인 회의에 많이 들어가 봤습니다.</p>

            <hr />

            <p>모든 이해관계자가 일리가 있습니다.</p>

            <hr />

            <p>모든 방향성이 나름의 장점을 가지고 있습니다.</p>

            <hr />

            <p>문제는 지능(Intelligence)이 아닙니다.</p>

            <hr />

            <p>문제는 수렴(Convergence)입니다.</p>

            <hr />

            <p>어떤 사람들은 아이디어를 만들어냅니다.</p>

            <hr />

            <p>더 적은 수의 사람들만이</p>

            <p>팀이 하나를 선택하도록 돕습니다.</p>

            <hr />

            <p>그리고 AI가 계속해서 선택지를 늘려갈수록</p>

            <p>이 능력은 더 중요해질 것이라고 생각합니다.</p>

            <hr />

            <p><strong>그들은 정렬 시스템을 만든다</strong></p>

            <hr />

            <p>대부분의 조직은 실행 시스템은 가지고 있습니다.</p>

            <hr />

            <p>디자인 시스템.</p>

            <hr />

            <p>컴포넌트 라이브러리.</p>

            <hr />

            <p>스프린트 프로세스.</p>

            <hr />

            <p>PRD.</p>

            <hr />

            <p>로드맵.</p>

            <hr />

            <p>그런데 정렬 시스템을 가진 조직은 많지 않습니다.</p>

            <hr />

            <p>경쟁하는 아이디어를 어떻게 평가할 것인가?</p>

            <hr />

            <p>어떻게 의사결정을 할 것인가?</p>

            <hr />

            <p>어떻게 이견을 초기에 발견할 것인가?</p>

            <hr />

            <p>왜 그런 결정을 내렸는지 어떻게 기록할 것인가?</p>

            <hr />

            <p>3개월 뒤 같은 논쟁을 어떻게 반복하지 않을 것인가?</p>

            <hr />

            <p>솔직히 말하면</p>

            <p>이 이야기들은 조금 지루하게 들립니다.</p>

            <hr />

            <p>하지만 그런 시스템이 없는 팀에서 일해보면</p>

            <p>얼마나 중요한지 알게 됩니다.</p>

            <hr />

            <p>조율을 잘하는 팀은</p>

            <p>개인의 영웅 플레이에 의존하지 않습니다.</p>

            <hr />

            <p>정렬이 더 쉽게 일어나도록</p>

            <p>시스템을 만듭니다.</p>

            <hr />

            <p>그래서 저는 결국 천장을 올리는 일도</p>

            <p>팀 스포츠라고 생각합니다.</p>

            <hr />

            <p>누구나 선택지를 만들 수 있습니다.</p>

            <hr />

            <p>하지만 팀이 선택하도록 돕는 사람은 많지 않습니다.</p>

            <hr />

            <p>누구나 결과물을 만들 수 있습니다.</p>

            <hr />

            <p>하지만 정렬을 만드는 사람은 많지 않습니다.</p>

            <hr />

            <p>누구나 무언가를 만들 수 있습니다.</p>

            <hr />

            <p>하지만 사람들을 같은 방향으로 움직이게 만드는 사람은 많지 않습니다.</p>

            <hr />

            <p>그리고 저는 바로 거기에 기회가 있다고 생각합니다.</p>

            <hr />

            <p>AI가 이 능력들을 새롭게 만든 것은 아닙니다.</p>

            <hr />

            <p>원래부터 중요했습니다.</p>

            <hr />

            <p>바뀐 것은 가치입니다.</p>

            <hr />

            <p>시장이 예전보다 더 많이 보상하기 시작한 것입니다.</p>

            <hr />

            <p>왜냐하면 병목이 이동했기 때문입니다.</p>

            <hr />

            <p>그래서 저는 다음 시대에 성공하는 사람들이</p>

            <p>반드시 최고의 프롬프트를 가진 사람은 아닐 것이라고 생각합니다.</p>

            <hr />

            <p>최고의 AI 워크플로우를 가진 사람도 아닐 것입니다.</p>

            <hr />

            <p>가장 최신 도구를 가진 사람도 아닐 것입니다.</p>

            <hr />

            <p>오히려 꾸준히</p>

            <p>명확성을 만들고,</p>

            <p>의사결정을 돕고,</p>

            <p>사람들을 한 방향으로 움직이게 만드는 사람들.</p>

            <hr />

            <p>저는 그 사람들이 천장을 올리는 사람들이라고 생각합니다.</p>

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
