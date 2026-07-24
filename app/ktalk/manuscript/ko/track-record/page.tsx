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

const currentSlug = "track-record";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter2Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>2장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>2</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>나의 이력</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/track-record" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <SlideRow image="/mindbook/ktalk/slides/ch2-designer-directing-ai.png" alt="A person standing at a whiteboard covered in wireframes, directing a robot assistant that holds a pen">
              <p>제가 여기까지 오게 된 이야기를 조금 드릴게요.</p>

              <p>
                2년 전, 저는 <strong>&ldquo;Designer in 2027&rdquo;</strong> 이라는 1인극
                형태의 발표를 했습니다.
              </p>

              <p>전제는 굉장히 단순했습니다.</p>

              <p>AI가 대부분의 실행을 담당하게 되고,</p>

              <p>
                디자이너는 AI가 잘하지 못하는 일에 더 많은 시간을 쓰게 될 것이라는
                이야기였습니다.
              </p>

              <p>사용자를 만나고,</p>

              <p>영감을 얻고,</p>

              <p>점들을 연결하고,</p>

              <p>의사결정을 하고,</p>

              <p>
                AI를 직접 조작하는 사람이 아니라 AI를 디렉팅하는 사람이 된다는
                이야기였습니다.
              </p>

              <p>당시에는 조금 과격하게 들렸습니다.</p>

              <p>농담이라고 생각한 분들도 있었고,</p>

              <p>솔직히 농담이었으면 좋겠다고 생각한 분들도 있었습니다.</p>
            </SlideRow>

            <hr />

            <p>그리고 작년에 또 다른 발표를 했습니다.</p>

            <p>이번에는 라이브 데모였습니다.</p>

            <p>그리고 그 자리에서 몇몇 분들을 꽤 불편하게 만드는 이야기를 했습니다.</p>

            <p>저는 이렇게 말했습니다.</p>

            <p>
              &ldquo;저는 거의 1년 동안 Figma를 열지 않았습니다.&rdquo;
            </p>

            <p>그리고 이어서 이런 말을 했습니다.</p>

            <blockquote>
              &ldquo;어쩌면 Figma는 죽었을지도 모릅니다.&rdquo;
            </blockquote>

            <p>물론 저는 실제로 그렇게 생각하지 않습니다.</p>

            <p>
              오히려 Figma는 누구보다 빠르게 AI에 적응하고 있다고 생각합니다.
            </p>

            <p>그 발표의 핵심은 Figma가 아니었습니다.</p>

            <p>핵심은 가치가 이동하고 있다는 것이었습니다.</p>

            <p>더 많은 디자이너가 코드를 다루게 될 것이고,</p>

            <p>더 많은 프로토타입이 코드로 만들어질 것이고,</p>

            <p>디자인과 엔지니어링의 경계가 점점 흐려질 것이라는 이야기였습니다.</p>

            <hr />

            <p>솔직히 말하면,</p>

            <p>지금은 그 이야기가 그렇게 이상하게 들리지 않습니다.</p>

            <hr />

            <SlideRow image="/mindbook/ktalk/slides/ch2-pm-transition.png" alt="Person at a desk holding up a cap labeled PM, looking at it thoughtfully">
              <p>그리고 최근에 저는 또 한 번 움직였습니다.</p>

              <p>디자인에서 프로덕트 매니지먼트로 역할을 바꿨습니다.</p>

              <p>디자인이 죽었다고 생각해서도 아니고,</p>

              <p>디자인할 것이 없어져서도 아닙니다.</p>

              <p>계속 같은 질문을 했기 때문입니다.</p>

              <hr />

              <p>지금 병목은 어디에 있는가?</p>

              <p>지금 마찰은 어디에서 발생하는가?</p>

              <p>지금 팀을 가장 느리게 만드는 것은 무엇인가?</p>

              <hr />

              <p>이 질문을 따라가다 보니,</p>

              <p>매번 다른 곳에 도착하게 되었습니다.</p>

              <hr />

              <p>2024년에는 이렇게 생각했습니다.</p>

              <p>
                디자이너는 AI를 사용하는 사람이 아니라 AI를 디렉팅하는 사람이 될 것이다.
              </p>

              <hr />

              <p>2025년에는 이렇게 생각했습니다.</p>

              <p>디자이너는 점점 더 코드를 통해 만들게 될 것이다.</p>

              <hr />

              <p>그리고 2026년,</p>

              <p>제가 보고 있는 다음 병목은 이것입니다.</p>

              <p><strong>조율.</strong></p>

              <p>실행이 아닙니다.</p>

              <p>프로토타이핑도 아닙니다.</p>

              <p>아이디어 생성도 아닙니다.</p>

              <p>조율입니다.</p>

              <hr />

              <p>이 이야기를 하는 이유는</p>

              <p>제가 대단한 예측을 했다고 자랑하기 위해서가 아닙니다.</p>

              <p>솔직히 틀린 것도 정말 많았습니다.</p>

              <hr />

              <p>제가 이야기하고 싶은 것은 예측이 아니라 패턴입니다.</p>

              <p>매번 기회는 병목이 있는 곳에 나타났습니다.</p>

              <p>그리고 저는 지금 그 병목이 또 한 번 이동했다고 생각합니다.</p>

              <hr />

              <p>그럼 이제,</p>

              <p>그 병목이 어디로 이동했는지 이야기해 보겠습니다.</p>
            </SlideRow>

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
