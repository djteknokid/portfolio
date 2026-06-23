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
];

const currentSlug = "signals-intro";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter8Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>8장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>8</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>본론을 시작하며</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/signals-intro" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>좋습니다.</p>

            <p>지금까지 이야기한 내용은 어떻게 보면 전부 이론이었습니다.</p>

            <hr />

            <p>사진 이야기.</p>

            <p>농구 이야기.</p>

            <p>패턴.</p>

            <p>역사.</p>

            <hr />

            <p>흥미로운 이야기들이었지만,</p>

            <p>아직은 조금 멀리 있는 이야기였습니다.</p>

            <hr />

            <p>그런데 이제부터는 조금 다릅니다.</p>

            <hr />

            <p>이제 제가 실제로 목격한 이야기를 해보려고 합니다.</p>

            <hr />

            <p>트위터에서 본 것도 아닙니다.</p>

            <p>링크드인에서 본 것도 아닙니다.</p>

            <p>팟캐스트에서 들은 것도 아닙니다.</p>

            <hr />

            <p>실제 제품 팀에서,</p>

            <p>실제 프로젝트를 하면서,</p>

            <p>제가 직접 경험한 이야기입니다.</p>

            <hr />

            <SlideRow image="/mindbook/ktalk/slides/ch8-artifact-overflow.png" alt="Person overwhelmed at a laptop with wireframes and design artifacts flying everywhere">
              <p>지난 1년 동안 저는 대기업 안에서 AI 제품을 만들고 있었습니다.</p>

              <hr />

              <p>그리고 솔직히 말하면,</p>

              <p>저는 앞으로 무슨 일이 일어날지 어느 정도 알고 있다고 생각했습니다.</p>

              <hr />

              <p>AI가 팀을 더 빠르게 만들 것이라고 생각했습니다.</p>

              <hr />

              <p>더 많은 것을 만들고,</p>

              <p>더 많은 프로토타입을 만들고,</p>

              <p>더 많은 실험을 하고,</p>

              <p>더 많은 것을 출시하게 될 것이라고 생각했습니다.</p>
            </SlideRow>

            <p>그리고 실제로 그렇게 되었습니다.</p>

            <hr />

            <p>정말 빨라졌습니다.</p>

            <hr />

            <p>그런데 예상하지 못했던 일이 하나 있었습니다.</p>

            <hr />

            <p>사람들이 더 많이 만들수록,</p>

            <p>결정은 더 어려워졌습니다.</p>

            <hr />

            <p>이상한 상황들이 계속 생기기 시작했습니다.</p>

            <hr />

            <p>어떤 디자이너는</p>

            <p>정말 훌륭한 End-to-End 플로우를 만들어 왔습니다.</p>

            <hr />

            <p>깊이 고민했고,</p>

            <p>디테일도 좋았고,</p>

            <p>완성도도 높았습니다.</p>

            <hr />

            <p>그런데 이상하게도</p>

            <p>그 결과물이 팀을 앞으로 나아가게 만들지 못했습니다.</p>

            <hr />

            <p>대신 이런 이야기가 나오기 시작했습니다.</p>

            <hr />

            <p>&ldquo;AI는 디자인을 못해요.&rdquo;</p>

            <p>&ldquo;이 프로토타입은 충분히 좋지 않아요.&rdquo;</p>

            <p>&ldquo;이건 올바른 방식이 아니에요.&rdquo;</p>

            <hr />

            <p>어느 순간부터</p>

            <p>제품 이야기를 하지 않고 있었습니다.</p>

            <hr />

            <p>결과물에 대해 싸우고 있었습니다.</p>

            <hr />

            <p>반대로 저도 프로토타입을 여러 개 만들어서 회의에 가져가곤 했습니다.</p>

            <hr />

            <p>제가 정답이라고 생각해서가 아닙니다.</p>

            <hr />

            <p>옵션을 만들고 싶었기 때문입니다.</p>

            <p>피드백을 받고 싶었기 때문입니다.</p>

            <p>탐색하고 싶었기 때문입니다.</p>

            <hr />

            <p>그런데 가끔은</p>

            <p>어떤 방향이 좋은지 이야기하기보다</p>

            <p>프로세스에 대한 토론이 시작되었습니다.</p>

            <hr />

            <p>플로우차트를 먼저 만들어야 하지 않을까?</p>

            <p>퍼소나를 먼저 정의해야 하지 않을까?</p>

            <p>전통적인 디자인 프로세스를 먼저 따라야 하지 않을까?</p>

            <hr />

            <p>그리고 다시,</p>

            <p>우리는 결정을 하고 있지 않았습니다.</p>

            <hr />

            <p>결정하는 방법에 대해 토론하고 있었습니다.</p>

            <hr />

            <p>또 한 번은</p>

            <p>한 엔지니어가 저를 따로 불렀습니다.</p>

            <hr />

            <p>직접 코드로 만들어 본 인터랙션을 보여주었습니다.</p>

            <hr />

            <p>정말 좋은 아이디어였습니다.</p>

            <hr />

            <p>원래라면 팀 전체가 함께 이야기했어야 할 아이디어였습니다.</p>

            <hr />

            <p>그런데 이상하게도</p>

            <p>그 아이디어가 들어갈 자리가 없었습니다.</p>

            <hr />

            <p>결국 그 아이디어는</p>

            <p>그 엔지니어의 노트북 안에만 남아 있었습니다.</p>

            <hr />

            <p>이런 장면들을 반복해서 보다 보니</p>

            <p>하나의 패턴이 보이기 시작했습니다.</p>

            <hr />

            <SlideRow image="/mindbook/ktalk/slides/ch8-meetings-different.png" alt="Person juggling multiple flying design artifacts — wireframes, images, video frames — from behind a laptop">
              <p>회의가 달라졌습니다.</p>

              <hr />

              <p>더 나빠진 것은 아닙니다.</p>

              <hr />

              <p>그냥 달라졌습니다.</p>
            </SlideRow>

            <hr />

            <SlideRow image="/mindbook/ktalk/slides/ch8-everyone-has-prototype.png" alt="Three people at a meeting table — each holding a thick stack of printed prototypes, arguing past each other">
              <p>아이디어가 더 많아졌습니다.</p>

              <p>프로토타입이 더 많아졌습니다.</p>

              <p>산출물이 더 많아졌습니다.</p>

              <p>옵션이 더 많아졌습니다.</p>

              <p>방향성이 더 많아졌습니다.</p>

              <p>의견도 더 많아졌습니다.</p>

              <hr />

              <p>모든 것이 더 많아졌습니다.</p>

              <hr />

              <p>그런데 이상하게도&hellip;</p>
            </SlideRow>

            <hr />

            <p>명확성은 줄어들었습니다.</p>

            <hr />

            <p>AI가 신기한 이유는</p>

            <p>많은 실행 문제를 해결해 주기 때문입니다.</p>

            <hr />

            <p>그런데 문제 하나를 해결할 때마다</p>

            <p>다른 문제 하나를 드러내는 것 같았습니다.</p>

            <hr />

            <p>더 많은 결과물.</p>

            <p>더 많은 충돌.</p>

            <p>더 적은 명확성.</p>

            <hr />

            <p>그리고 그 순간 깨달았습니다.</p>

            <hr />

            <p>이건 실행의 문제가 아니구나.</p>

            <hr />

            <p>이건 조율의 문제구나.</p>

            <hr />

            <p>그 후부터 저는 같은 패턴을 여기저기서 보기 시작했습니다.</p>

            <hr />

            <p>실리콘밸리에서.</p>

            <p>디자인 커뮤니티에서.</p>

            <p>PM과 디자이너의 대화에서.</p>

            <p>채용 시장에서.</p>

            <p>컨퍼런스 발표에서.</p>

            <hr />

            <p>사람들은 점점 이렇게 묻지 않았습니다.</p>

            <hr />

            <p>&ldquo;어떻게 더 만들 수 있을까?&rdquo;</p>

            <hr />

            <p>대신 이런 질문을 하기 시작했습니다.</p>

            <hr />

            <p>&ldquo;우리는 어떻게 결정해야 하지?&rdquo;</p>

            <hr />

            <p>그리고 한 번 보기 시작하니까,</p>

            <p>어디를 가도 보였습니다.</p>

            <hr />

            <p>
              그래서 저는 이 현상이 우리 팀만의 문제가 아니라고 확신하게 되었습니다.
            </p>

            <hr />

            <p>그 확신을 만들어준 세 가지 신호를 보여드리겠습니다.</p>

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
