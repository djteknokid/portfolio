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

const currentSlug = "intro";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter1Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>1장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>1</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>소개</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/koreatalk/manuscript/intro" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>안녕하세요. David Lee입니다.</p>

            <p>현재 SAP에서 Principal Product Manager로 일하고 있습니다.</p>

            <p>
              그 전에는 SAP에서 Product Designer로 일하다가 최근 Product Manager로
              전환했습니다.
            </p>

            <p>그 전에는 Google AI Labs에서 UX Engineer로 일했고,</p>

            <p>그 전에는 Google에서 Product Designer로 일했습니다.</p>

            <p>방금 제 커리어 10년 정도를 10초 만에 설명했네요.</p>

            <p>아마 그 정도면 충분할 것 같습니다.</p>

            <p>왜냐하면 직함은 사실 그렇게 중요한 부분이 아니거든요.</p>

            <p>
              제가 흥미롭게 생각하는 건, 지금까지 했던 모든 역할을 관통하는 하나의
              패턴이 있다는 겁니다.
            </p>

            <p>
              저도 오랫동안 그 패턴을 따라왔는데, 최근에서야 그걸 설명할 수 있게
              됐습니다.
            </p>

            <hr />

            <p>오늘 저는 프로덕트 디자인의 미래에 대해 이야기하려고 합니다.</p>

            <p>사실...</p>

            <p>정확히 말하면 그건 아닙니다.</p>

            <p>프로덕트 개발의 미래에 대해 이야기하려고 합니다.</p>

            <p>그런데 그것도 완전히 맞는 표현은 아닙니다.</p>

            <p>제가 정말 이야기하고 싶은 건,</p>

            <p>
              기술이 갑자기 모든 사람의 창작 능력을 끌어올렸을 때 어떤 일이
              벌어지는가에 대한 이야기입니다.
            </p>

            <p>그리고 저는 지금 정확히 그런 일이 일어나고 있다고 생각합니다.</p>

            <p>다만 많은 사람들이 그 현상을 조금 다르게 보고 있다고 생각합니다.</p>

            <hr />

            <p>매일 새로운 AI 툴이 나옵니다.</p>

            <p>새로운 워크플로우가 나옵니다.</p>

            <p>새로운 프레임워크가 나옵니다.</p>

            <p>새로운 프롬프트가 나옵니다.</p>

            <p>그리고 새로운 불안감도 하나씩 추가됩니다.</p>

            <p>특히 디자이너라면 더 그렇죠.</p>

            <p>솔직히 저도 그랬습니다.</p>

            <hr />

            <p>하지만 오늘 이 이야기는 프롬프트에 대한 이야기가 아닙니다.</p>

            <p>에이전트에 대한 이야기도 아닙니다.</p>

            <p>MCP에 대한 이야기도 아닙니다.</p>

            <p>어떤 모델이 더 좋은지 비교하는 이야기는 더더욱 아닙니다.</p>

            <p>그런 건 이미 잘 설명해 주시는 분들이 많습니다.</p>

            <hr />

            <p>제가 이야기하고 싶은 건 우리가 놓치고 있는 무언가입니다.</p>

            <p>
              지난 1년 동안 저는 대기업 안에서 AI 제품을 만들면서 이상한 현상을 계속
              목격했습니다.
            </p>

            <p>디자이너가 코딩을 하기 시작했습니다.</p>

            <p>PM이 프로토타입을 만들기 시작했습니다.</p>

            <p>엔지니어가 UX 피드백을 주기 시작했습니다.</p>

            <p>AI는 그 모든 일을 조금씩 하기 시작했습니다.</p>

            <hr />

            <p>역할의 경계가 흐려지기 시작한 겁니다.</p>

            <p>처음에는 디자인의 문제라고 생각했습니다.</p>

            <p>그 다음에는 AI의 문제라고 생각했습니다.</p>

            <p>그런데 지금은 더 큰 무언가라고 생각합니다.</p>

            <hr />

            <p>오늘 이야기는 바로 그것에 대한 이야기입니다.</p>

            <p>저는 그것을</p>

            <p><strong>조율의 시대 (The Coordination Era)</strong></p>

            <p>라고 부릅니다.</p>

            <hr />

            <p>앞으로 45분 동안 저는 여러분을 설득해 보려고 합니다.</p>

            <p>앞으로 우리에게 가장 큰 기회는</p>

            <p>더 빨리 만드는 법을 배우는 것이 아닐 수도 있다는 것을.</p>

            <p>오히려</p>

            <p>더 잘 정렬하고,</p>

            <p>더 잘 조율하는 법을 배우는 것일 수도 있다는 것을 말입니다.</p>

            <hr />

            <p>하지만 그 이야기를 하기 전에,</p>

            <p>
              왜 제가 그런 결론에 도달했는지 먼저 보여드려야 할 것 같습니다.
            </p>

            <p>그 이야기부터 시작해 보겠습니다.</p>

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
