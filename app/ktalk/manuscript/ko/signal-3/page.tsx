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

const currentSlug = "signal-3";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter11Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>11장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>11</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>신호 3 — 불만의 변화</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/signal-3" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <SlideRow image="/mindbook/ktalk/slides/ch11-complaints.png" alt="Three people at a conference table arguing in front of a massive complex flowchart on the wall behind them">
              <p>이 세 가지 신호 중에서</p>

              <p>저를 가장 설득한 신호가 있다면</p>

              <p>아마 이것일 겁니다.</p>

              <hr />

              <p>왜냐하면 너무 단순하기 때문입니다.</p>

              <hr />

              <p>저는 특별한 분석을 한 것이 아닙니다.</p>

              <hr />

              <p>그냥 들었습니다.</p>

              <hr />

              <p>제품 팀 주변에 충분히 오래 있다 보면</p>

              <p>비슷한 이야기를 계속 듣게 됩니다.</p>
            </SlideRow>

            <p>내 회사만의 이야기가 아닙니다.</p>

            <hr />

            <p>슬랙 커뮤니티.</p>

            <p>컨퍼런스 복도.</p>

            <p>링크드인.</p>

            <p>디자인 커뮤니티.</p>

            <p>PM 커뮤니티.</p>

            <hr />

            <p>어디를 가도 비슷한 불만이 들립니다.</p>

            <hr />

            <p>그런데 어느 순간부터</p>

            <p>흥미로운 변화가 생겼습니다.</p>

            <hr />

            <p>불만이 바뀌기 시작했습니다.</p>

            <hr />

            <p>제 커리어 대부분 동안</p>

            <p>사람들의 불만은 항상 비슷했습니다.</p>

            <hr />

            <p>디자이너가 부족하다.</p>

            <hr />

            <p>엔지니어가 부족하다.</p>

            <hr />

            <p>리소스가 부족하다.</p>

            <hr />

            <p>시간이 부족하다.</p>

            <hr />

            <p>무엇을 만들어야 하는지는 알고 있다.</p>

            <hr />

            <p>그런데 만들 사람이 부족하다.</p>

            <hr />

            <p>이것이 병목이었습니다.</p>

            <hr />

            <p>실행(Execution).</p>

            <hr />

            <p>수년 동안.</p>

            <p>어쩌면 수십 년 동안.</p>

            <hr />

            <p>그런데 요즘 사람들의 이야기를 들어보세요.</p>

            <hr />

            <p>선택지가 너무 많다.</p>

            <hr />

            <p>사람마다 의견이 다르다.</p>

            <hr />

            <p>같은 결정을 계속 반복해서 논의한다.</p>

            <hr />

            <p>매주 방향이 바뀐다.</p>

            <hr />

            <p>엄청 많이 만들고 있는데 앞으로 나아가는 느낌이 없다.</p>

            <hr />

            <p>회의가 끝났는데도 무엇을 결정했는지 모르겠다.</p>

            <hr />

            <p>차이가 들리시나요?</p>

            <hr />

            <p>예전 불만은 이랬습니다.</p>

            <hr />

            <p>&ldquo;우리는 이것을 만들 수가 없다.&rdquo;</p>

            <hr />

            <p>지금 불만은 이렇습니다.</p>

            <hr />

            <p>&ldquo;우리는 이것에 합의할 수가 없다.&rdquo;</p>

            <hr />

            <p>예전 불만은 부족함(Scarcity)이었습니다.</p>

            <hr />

            <p>지금 불만은 넘쳐남(Abundance)입니다.</p>

            <hr />

            <p>그리고 저는 이것이 우연이라고 생각하지 않습니다.</p>

            <hr />

            <p>왜냐하면 불만은 보통 증상이기 때문입니다.</p>

            <hr />

            <p>불만은 마찰이 어디에 있는지 알려줍니다.</p>

            <p>불만은 병목이 어디에 있는지 알려줍니다.</p>

            <p>불만은 시스템이 어디에서 느려지고 있는지 알려줍니다.</p>

            <hr />

            <p>그래서 불만이 바뀌면,</p>

            <p>병목도 함께 바뀌는 경우가 많습니다.</p>

            <hr />

            <p>바로 그 점이 제 관심을 끌었습니다.</p>

            <hr />

            <p>왜냐하면 시장은 오랫동안 실행력을 원했기 때문입니다.</p>

            <hr />

            <p>더 많은 빌더.</p>

            <p>더 많은 디자이너.</p>

            <p>더 많은 엔지니어.</p>

            <p>더 많은 생산 능력.</p>

            <hr />

            <p>그런데 점점 시장이 다른 것을 원하고 있다는 느낌을 받았습니다.</p>

            <hr />

            <p>명확성.</p>

            <p>정렬(Alignment).</p>

            <p>공유된 이해(Shared Understanding).</p>

            <p>의사결정(Decision Making).</p>

            <hr />

            <p>더 많이 만드는 사람이 아니라,</p>

            <hr />

            <p>무엇이 중요한지 팀이 결정하도록 돕는 사람.</p>

            <hr />

            <p>그런 사람들이 필요해지고 있었습니다.</p>

            <hr />

            <p>그리고 이 관찰을</p>

            <p>앞선 두 가지 신호와 연결해 보았습니다.</p>

            <hr />

            <p>결과물은 풍부해지고 있다.</p>

            <hr />

            <p>역할의 경계는 흐려지고 있다.</p>

            <hr />

            <p>그리고 불만은 바뀌고 있다.</p>

            <hr />

            <p>세 개의 신호가</p>

            <p>모두 같은 방향을 가리키고 있었습니다.</p>

            <hr />

            <p>그리고 그때 처음으로 이런 생각이 들었습니다.</p>

            <hr />

            <p>어쩌면 우리는</p>

            <p>전혀 다른 시대에 들어서고 있는 것 아닐까?</p>

            <hr />

            <p>제가 왜 그렇게 생각하는지</p>

            <p>이제 보여드리겠습니다.</p>

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
