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

const currentSlug = "the-shock";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter3Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>3장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>3</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>충격</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/the-shock" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>한 장면을 상상해 보겠습니다.</p>

            <p>PM이 디자인 리뷰에 들어옵니다.</p>

            <p>손에 PRD를 들고 온 것도 아닙니다.</p>

            <p>와이어프레임을 들고 온 것도 아닙니다.</p>

            <p>프로토타입을 들고 왔습니다.</p>

            <p>고해상도.</p>

            <p>실제 컴포넌트.</p>

            <p>인터랙션까지 구현되어 있습니다.</p>

            <p>심지어 코드로 만들어졌습니다.</p>

            <p>하룻밤 만에.</p>

            <hr />

            <p>그리고 그걸 본 디자이너는 한 가지 생각을 합니다.</p>

            <blockquote><strong>&ldquo;그러면... 나는 여기 왜 있는 거지?&rdquo;</strong></blockquote>

            <hr />

            <p>저는 이 순간을 잠시 붙잡고 싶습니다.</p>

            <p>빨리 넘어가지도 않고,</p>

            <p>긍정적으로 해석하지도 않고,</p>

            <p>괜찮다고 위로하지도 않고,</p>

            <p>그냥 잠시 이 감정을 그대로 바라보고 싶습니다.</p>

            <hr />

            <p>도대체 무엇이 바뀐 걸까요?</p>

            <hr />

            <p>매주 새로운 AI 툴이 나옵니다.</p>

            <p>새로운 모델이 나옵니다.</p>

            <p>새로운 기능이 나옵니다.</p>

            <p>
              그리고 예전에는 디자이너가 해야 했던 일이
              이제는 그렇지 않아도 되는 경우가 점점 많아지고 있습니다.
            </p>

            <hr />

            <p>실제로 데이터도 있습니다.</p>

            <p>
              Tufts University에서 직업별 AI 노출도를 분석한 연구가 있었습니다.
            </p>

            <p>디자이너는 1위를 했습니다.</p>

            <p>점수는 100점.</p>

            <p>
              조사된 직군 중 AI의 영향을 가장 크게 받을 것으로 예측된 직업이었습니다.
            </p>

            <hr />

            <p>채용 시장도 비슷한 신호를 보내고 있습니다.</p>

            <p>
              지난 2년 동안 PM 채용과 디자이너 채용 추이를 보면
              두 그래프가 조금씩 갈라지고 있습니다.
            </p>

            <p>PM 채용은 늘어나고 있고,</p>

            <p>디자이너 채용은 줄어들고 있습니다.</p>

            <hr />

            <p>극적인 수준은 아닙니다.</p>

            <p>재앙 수준도 아닙니다.</p>

            <p>하지만 꾸준합니다.</p>

            <p>한 방향으로.</p>

            <hr />

            <p>
              그래서 아까 그 디자인 리뷰에 앉아 있던 디자이너는
              괜한 걱정을 하는 것이 아닙니다.
            </p>

            <p>과민반응을 하는 것도 아닙니다.</p>

            <hr />

            <p>방 안의 분위기를 정확하게 읽고 있는 겁니다.</p>

            <p>무언가가 바뀌고 있습니다.</p>

            <hr />

            <p>&ldquo;그러면 나는 여기 왜 있는 거지?&rdquo;</p>

            <hr />

            <p>이건 진짜 질문입니다.</p>

            <p>그리고 저는 이 질문이 진짜 답을 받을 자격이 있다고 생각합니다.</p>

            <hr />

            <p>하지만 아직 답을 드리지는 않겠습니다.</p>

            <p>
              왜냐하면 제가 드리고 싶은 답은
              조금 더 먼 곳에서 시작해야 하기 때문입니다.
            </p>

            <hr />

            <p>먼저 여러분께 하나의 패턴을 보여드리고 싶습니다.</p>

            <p>AI보다 훨씬 오래된 패턴.</p>

            <p>이미 여러 번 반복되었던 패턴.</p>

            <hr />

            <p>그리고 그 패턴이 나타날 때마다</p>

            <p>사람들은 똑같은 질문을 했습니다.</p>

            <hr />

            <p>&ldquo;그러면 나는 이제 어떻게 되는 거지?&rdquo;</p>

            <hr />

            <p>그리고 흥미롭게도,</p>

            <p>답은 항상 사람들이 예상했던 것과 달랐습니다.</p>

            <hr />

            <p>그 답을 함께 찾아보겠습니다.</p>

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
