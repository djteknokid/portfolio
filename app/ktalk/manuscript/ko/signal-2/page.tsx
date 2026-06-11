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

const currentSlug = "signal-2";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter10Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>10장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>10</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>신호 2 — 역할 경계의 붕괴</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/koreatalk/manuscript/signal-2" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>이 신호는 저에게 가장 개인적으로 와닿는 신호입니다.</p>

            <p>왜냐하면 제가 직접 경험했기 때문입니다.</p>

            <hr />

            <p>제 커리어 대부분 동안</p>

            <p>제품 팀은 전문성(Specialization)을 중심으로 구성되어 있었습니다.</p>

            <hr />

            <p>PM은 요구사항을 정의했습니다.</p>

            <p>디자이너는 디자인을 했습니다.</p>

            <p>엔지니어는 개발을 했습니다.</p>

            <hr />

            <p>물론 서로 겹치는 부분은 있었습니다.</p>

            <hr />

            <p>하지만 기본적으로는 모두가 알고 있었습니다.</p>

            <p>내 역할이 어디서 시작되고,</p>

            <p>어디서 끝나는지.</p>

            <hr />

            <p>솔직히 말하면,</p>

            <p>그 경계는 누군가가 완벽한 구조라고 생각해서 만들어진 것이 아니었습니다.</p>

            <hr />

            <p>그 경계를 넘는 비용이 너무 컸기 때문입니다.</p>

            <hr />

            <p>디자인 툴을 배우는 데도 시간이 걸렸습니다.</p>

            <p>개발을 배우는 데도 시간이 걸렸습니다.</p>

            <p>프로토타입을 만드는 데도 시간이 걸렸습니다.</p>

            <hr />

            <p>모든 것이 어렵고 비쌌습니다.</p>

            <hr />

            <p>그 마찰이 자연스럽게 역할의 경계를 만들었습니다.</p>

            <hr />

            <p>그런데 지금은 어떨까요?</p>

            <hr />

            <p>그 마찰이 사라지고 있습니다.</p>

            <hr />

            <p>PM은 프로토타입을 들고 회의에 들어옵니다.</p>

            <hr />

            <p>엔지니어는 UX 피드백을 합니다.</p>

            <hr />

            <p>디자이너는 코드를 작성합니다.</p>

            <hr />

            <p>리서처는 제품 컨셉을 만듭니다.</p>

            <hr />

            <p>모두가 서로의 영역으로 들어가기 시작했습니다.</p>

            <hr />

            <p>그리고 개인적으로 저는 그것이 좋은 일이라고 생각합니다.</p>

            <hr />

            <p>제가 경험한 최고의 팀들은</p>

            <p>오히려 그런 팀들이었습니다.</p>

            <hr />

            <p>코드를 이해하는 디자이너.</p>

            <p>프로토타입을 만드는 PM.</p>

            <p>제품 감각이 있는 엔지니어.</p>

            <hr />

            <p>그런 팀들은 빠르게 움직입니다.</p>

            <hr />

            <p>그래서 저는 역할의 겹침 자체가 문제라고 생각하지 않습니다.</p>

            <hr />

            <p>오히려 기회라고 생각합니다.</p>

            <hr />

            <p>문제는 그 다음에 발생합니다.</p>

            <hr />

            <p>회의 하나를 상상해 보겠습니다.</p>

            <hr />

            <p>PM은 사용자 플로우를 보고 있습니다.</p>

            <hr />

            <p>디자이너는 인터랙션 품질을 보고 있습니다.</p>

            <hr />

            <p>엔지니어는 기술적 구현 가능성을 보고 있습니다.</p>

            <hr />

            <p>리서처는 사용자 행동을 생각하고 있습니다.</p>

            <hr />

            <p>모두가 같은 화면을 보고 있습니다.</p>

            <hr />

            <p>그런데 모두가 다른 이야기를 하고 있습니다.</p>

            <hr />

            <p>그리고 재미있는 건,</p>

            <p>누구도 틀리지 않았다는 점입니다.</p>

            <hr />

            <p>모두가 유용한 관점을 제공하고 있습니다.</p>

            <hr />

            <p>문제는 다른 곳에 있습니다.</p>

            <hr />

            <p>아무도 지금 어떤 결정을 내려야 하는지 합의하지 않았다는 것입니다.</p>

            <hr />

            <p>저는 이런 회의에 정말 많이 들어가 봤습니다.</p>

            <hr />

            <p>아마 여러분도 경험해 보셨을 겁니다.</p>

            <hr />

            <p>대화는 계속 맴돕니다.</p>

            <hr />

            <p>사람들은 서로의 말을 놓칩니다.</p>

            <hr />

            <p>회의는 끝납니다.</p>

            <hr />

            <p>그런데 이상하게도</p>

            <p>아무도 결정이 내려졌다고 느끼지 못합니다.</p>

            <hr />

            <p>그 순간 저는 한 가지를 깨달았습니다.</p>

            <hr />

            <p>역할은 흐려졌습니다.</p>

            <hr />

            <p>그런데 커뮤니케이션은 그만큼 진화하지 않았습니다.</p>

            <hr />

            <p>예전에는 모두가 자기 영역 안에 있었기 때문에</p>

            <p>구조 자체가 정렬(Alignment)을 만들어 주었습니다.</p>

            <hr />

            <p>하지만 이제는 다릅니다.</p>

            <hr />

            <p>모두가 어디에나 기여할 수 있습니다.</p>

            <hr />

            <p>그렇다면 정렬은 자연스럽게 생기지 않습니다.</p>

            <hr />

            <p>의도적으로 만들어야 합니다.</p>

            <hr />

            <p>그리고 그것은 완전히 다른 문제입니다.</p>

            <hr />

            <p>왜냐하면 이제 질문이 바뀌었기 때문입니다.</p>

            <hr />

            <p>예전 질문은</p>

            <blockquote>&ldquo;이건 누가 담당하지?&rdquo;</blockquote>

            <p>였습니다.</p>

            <hr />

            <p>지금 질문은</p>

            <blockquote>&ldquo;우리는 어떻게 결정하지?&rdquo;</blockquote>

            <p>입니다.</p>

            <hr />

            <p>저는 이것이 두 번째 신호가 중요한 이유라고 생각합니다.</p>

            <hr />

            <p>제품 팀을 구조화하던 경계가</p>

            <p>점점 사라지고 있습니다.</p>

            <hr />

            <p>그런데 우리는 아직</p>

            <p>그 자리를 무엇이 대체해야 하는지 완전히 알아내지 못했습니다.</p>

            <hr />

            <p>그리고 그것이 세 번째 신호로 이어집니다.</p>

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
