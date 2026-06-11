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

const currentSlug = "conclusion";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter17Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>17장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>17</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>마치며</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/conclusion" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>처음 이야기로 돌아가 보겠습니다.</p>

            <hr />

            <p>한 PM이 디자인 리뷰에 들어옵니다.</p>

            <hr />

            <p>PRD를 들고 온 것이 아닙니다.</p>

            <hr />

            <p>와이어프레임을 들고 온 것도 아닙니다.</p>

            <hr />

            <p>프로토타입을 들고 왔습니다.</p>

            <hr />

            <p>실제로 동작합니다.</p>

            <hr />

            <p>인터랙션도 있습니다.</p>

            <hr />

            <p>바로 토론할 수 있을 정도로 완성되어 있습니다.</p>

            <hr />

            <p>그리고 맞은편에 앉아 있던 디자이너는 생각합니다.</p>

            <hr />

            <p>&ldquo;그래서… 나는 여기 왜 있는 거지?&rdquo;</p>

            <hr />

            <p>저는 그 질문에 대해 오랫동안 생각했습니다.</p>

            <hr />

            <p>그리고 지금은 이렇게 생각합니다.</p>

            <hr />

            <p>그 질문이 불편한 이유는</p>

            <p>누군가가 디자이너의 일을 빼앗아서가 아닙니다.</p>

            <hr />

            <p>예전에는 답이 너무 명확했기 때문입니다.</p>

            <hr />

            <p>PM은 요구사항을 가져왔습니다.</p>

            <hr />

            <p>디자이너는 결과물을 만들었습니다.</p>

            <hr />

            <p>엔지니어는 제품을 만들었습니다.</p>

            <hr />

            <p>모두가 자신의 역할을 알았습니다.</p>

            <hr />

            <p>모두가 자신의 영역을 알았습니다.</p>

            <hr />

            <p>모두가 가치가 어디에서 만들어지는지 알고 있었습니다.</p>

            <hr />

            <p>그런데 지금은 다릅니다.</p>

            <hr />

            <p>경계는 흐려졌습니다.</p>

            <hr />

            <p>결과물은 넘쳐납니다.</p>

            <hr />

            <p>프로토타입은 어디에나 있습니다.</p>

            <hr />

            <p>그리고 답은 더 이상 명확하지 않습니다.</p>

            <hr />

            <p>하지만 저는 그것이 위기라고 생각하지 않습니다.</p>

            <hr />

            <p>저는 그것이 신호라고 생각합니다.</p>

            <hr />

            <p>왜냐하면 오늘 우리가 본 모든 이야기들은</p>

            <p>결국 같은 패턴을 보여주고 있기 때문입니다.</p>

            <hr />

            <p>기술은 바닥을 올립니다.</p>

            <hr />

            <p>시장은 KPI를 바꿉니다.</p>

            <hr />

            <p>전문가는 천장을 올립니다.</p>

            <hr />

            <p>우리는 그것을 사진에서 봤습니다.</p>

            <hr />

            <p>농구에서 봤습니다.</p>

            <hr />

            <p>음악에서 봤습니다.</p>

            <hr />

            <p>그리고 지금은 제품 개발에서도 보고 있습니다.</p>

            <hr />

            <p>바닥이 다시 올라가고 있습니다.</p>

            <hr />

            <p>그리고 바닥이 올라갈 때마다</p>

            <p>사람들은 선택을 합니다.</p>

            <hr />

            <p>어떤 사람들은</p>

            <p>예전 가치의 정의를 지키기 위해 싸웁니다.</p>

            <hr />

            <p>어떤 사람들은</p>

            <p>새로운 병목으로 이동합니다.</p>

            <hr />

            <p>저는 커리어 내내</p>

            <p>후자를 선택해 왔습니다.</p>

            <hr />

            <p>거창한 계획이 있었던 것은 아닙니다.</p>

            <hr />

            <p>그저 마찰이 있는 곳을 따라갔습니다.</p>

            <hr />

            <p>병목이 있는 곳을 따라갔습니다.</p>

            <hr />

            <p>그리고 지난 1년 동안,</p>

            <p>그 어느 때보다 뛰어난 도구와 능력을 가진 팀들을 보면서</p>

            <p>한 가지를 발견했습니다.</p>

            <hr />

            <p>병목이 다시 이동했다는 것입니다.</p>

            <hr />

            <p>문제는 만드는 것이 아니었습니다.</p>

            <hr />

            <p>문제는 결정하는 것이었습니다.</p>

            <hr />

            <p>문제는 실행이 아니었습니다.</p>

            <hr />

            <p>문제는 정렬이었습니다.</p>

            <hr />

            <p>문제는 창작이 아니었습니다.</p>

            <hr />

            <p>문제는 조율이었습니다.</p>

            <hr />

            <p>그래서 저는 우리가</p>

            <p>조율의 시대에 들어가고 있다고 믿습니다.</p>

            <hr />

            <p>AI가 팀을 덜 중요하게 만들기 때문이 아닙니다.</p>

            <hr />

            <p>오히려 더 중요하게 만들기 때문입니다.</p>

            <hr />

            <p>창작이 중요하지 않게 되었기 때문이 아닙니다.</p>

            <hr />

            <p>창작이 풍부해졌기 때문입니다.</p>

            <hr />

            <p>그리고 창작이 풍부해질수록</p>

            <p>다른 것이 희소해집니다.</p>

            <hr />

            <p>명확성.</p>

            <hr />

            <p>정렬.</p>

            <hr />

            <p>공유된 이해.</p>

            <hr />

            <p>그리고 사람들을 같은 방향으로 움직이게 하는 능력.</p>

            <hr />

            <p>그래서 오늘 여러분이 한 가지만 기억하고 가셨으면 좋겠습니다.</p>

            <hr />

            <p>두려움이 아닙니다.</p>

            <hr />

            <p>바닥이 올라가는 것을 두려워하지 마십시오.</p>

            <hr />

            <p>역사는 그것이 처음이 아니라는 것을 보여줍니다.</p>

            <hr />

            <p>그리고 마지막도 아닐 것입니다.</p>

            <hr />

            <p>결국 중요한 것은</p>

            <p>어떤 도구를 쓰느냐가 아닙니다.</p>

            <hr />

            <p>어떤 프롬프트를 쓰느냐도 아닙니다.</p>

            <hr />

            <p>어떤 워크플로우를 쓰느냐도 아닙니다.</p>

            <hr />

            <p>제가 앞으로 10년 동안 붙잡고 있으려고 하는 질문은 이것입니다.</p>

            <hr />

            <p><strong>어떻게 하면 우리 팀이 더 좋은 결정을 내리도록 도울 수 있을까?</strong></p>

            <hr />

            <p>사진에서 결혼식으로.</p>

            <hr />

            <p>선수에서 팀으로.</p>

            <hr />

            <p>노래에서 문화로.</p>

            <hr />

            <p>결과물에서 의사결정으로.</p>

            <hr />

            <p>AI는 계속해서 바닥을 올릴 것입니다.</p>

            <hr />

            <p>그리고 우리의 일은</p>

            <p>천장을 올리는 것입니다.</p>

            <hr />

            <p>감사합니다.</p>

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
