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

const currentSlug = "floor-raised";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter5Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>5장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>5</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>바닥이 올라갔다</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/floor-raised" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <SlideRow image="/mindbook/ktalk/slides/ch5-floor-raised.png" alt="Person standing on a rising platform being pushed upward, pressing against a low ceiling">
              <p>
                이제부터 이 발표 전체를 관통하는 중요한 개념 하나를 소개하고 싶습니다.
              </p>

              <p>기술은 바닥(Floor)을 올립니다.</p>

              <p>항상 그래왔습니다.</p>

              <p>그리고 저는 지금도 같은 일이 벌어지고 있다고 생각합니다.</p>
            </SlideRow>

            <hr />

            <p>오늘날 거의 누구나</p>

            <p>디자인된 것처럼 보이는 무언가를 만들 수 있습니다.</p>

            <p>Claude를 사용하는 PM.</p>

            <p>Cursor를 사용하는 엔지니어.</p>

            <p>v0를 사용하는 창업자.</p>

            <p>심지어 Figma를 한 번도 열어본 적 없는 사람도 가능합니다.</p>

            <hr />

            <p>불과 몇 년 전만 해도</p>

            <p>디자이너가 있어야 만들 수 있었던 것들을</p>

            <p>이제는 많은 사람들이 만들 수 있습니다.</p>

            <hr />

            <p>솔직히 불편할 수 있습니다.</p>

            <p>저도 압니다.</p>

            <hr />

            <p>하지만 저는 이것을 위협이라고 생각하지 않습니다.</p>

            <p>패턴이라고 생각합니다.</p>

            <hr />

            <p>왜냐하면 우리는 이 영화를 이미 여러 번 봤기 때문입니다.</p>

            <p>다양한 산업에서.</p>

            <p>수없이 많이.</p>

            <hr />

            <p>그리고 매번 같은 일이 벌어졌습니다.</p>

            <hr />

            <p>예전의 바닥을 지키는 데 집중한 사람들은 어려워졌고,</p>

            <p>다른 질문을 던진 사람들은 성장했습니다.</p>

            <hr />

            <p>그 질문은 이것입니다.</p>

            <hr />

            <p>&ldquo;내 강점을 어떻게 지킬까?&rdquo;</p>

            <p>가 아니라</p>

            <hr />

            <p>
              &ldquo;바닥이 올라간 지금,
              시장은 무엇에 가치를 두고 있을까?&rdquo;
            </p>

            <hr />

            <p>저는 그게 진짜 질문이라고 생각합니다.</p>

            <hr />

            <p>&ldquo;PM이 프로토타입을 가져오면 어떻게 해야 하지?&rdquo;</p>

            <p>도 아니고,</p>

            <p>&ldquo;어떤 AI 툴을 먼저 배워야 하지?&rdquo;</p>

            <p>도 아닙니다.</p>

            <hr />

            <p>바닥은 이미 올라갔습니다.</p>

            <p>그 다음은 무엇일까요?</p>

            <hr />

            <p>예를 하나 들어보겠습니다.</p>

            <p>사진입니다.</p>

            <hr />

            <SlideRow image="/mindbook/ktalk/slides/ch5-film-photographer.png" alt="Person in a darkroom holding up a strip of film negatives, prints hanging on a line behind them">
              <p>디지털 카메라가 등장하기 전,</p>

              <p>사진작가는 굉장히 특별한 직업이었습니다.</p>

              <hr />

              <p>비싼 장비가 있었고,</p>

              <p>필름을 이해했고,</p>

              <p>조명을 이해했고,</p>

              <p>다른 사람들이 놓치는 순간을 포착할 수 있었습니다.</p>

              <hr />

              <p>특히 결혼식이라면 더 그랬습니다.</p>

              <p>아마 그 공간에서</p>

              <p>그 하루를 제대로 기록할 수 있는 유일한 사람이었을 겁니다.</p>

              <hr />

              <p>당시 KPI는 아주 단순했습니다.</p>

              <hr />

              <p>좋은 사진을 찍을 수 있는가?</p>

              <hr />

              <p>그것이 직업이었고,</p>

              <p>그것이 가치였습니다.</p>
            </SlideRow>

            <hr />

            <p>그러다 디지털 카메라가 등장했습니다.</p>

            <p>스마트폰이 등장했습니다.</p>

            <p>필터가 등장했습니다.</p>

            <p>컴퓨테이셔널 포토그래피가 등장했습니다.</p>

            <hr />

            <p>그리고 갑자기</p>

            <p>모두가 꽤 괜찮은 사진을 찍기 시작했습니다.</p>

            <hr />

            <p>바닥이 올라간 것입니다.</p>

            <hr />

            <p>그럼 무슨 일이 벌어졌을까요?</p>

            <p>사진작가가 사라졌을까요?</p>

            <hr />

            <p>아니었습니다.</p>

            <hr />

            <p>오히려 사진은 폭발적으로 늘어났습니다.</p>

            <p>인류 역사상 가장 많은 사진이 찍히기 시작했습니다.</p>

            <hr />

            <p>그런데 흥미로운 일이 벌어졌습니다.</p>

            <hr />

            <p>예전에는 특별했던 것이</p>

            <p>더 이상 특별하지 않게 된 것입니다.</p>

            <hr />

            <p>시장이 바뀌었습니다.</p>

            <hr />

            <SlideRow image="/mindbook/ktalk/slides/ch5-wedding-photographer.png" alt="Photographer from behind, shooting a wedding party on a scenic terrace">
              <p>성공한 사진작가들은</p>

              <p>이런 질문을 하지 않았습니다.</p>

              <hr />

              <p>&ldquo;어떻게 하면 사진을 조금 더 선명하게 찍을 수 있을까?&rdquo;</p>

              <hr />

              <p>대신 이런 질문을 했습니다.</p>

              <hr />

              <p>
                &ldquo;어떻게 하면 이 결혼식을 잊지 못할 경험으로 만들 수 있을까?&rdquo;
              </p>

              <hr />

              <p>완전히 다른 질문입니다.</p>
            </SlideRow>

            <hr />

            <p>하나는 결과물(Artifact)에 집중합니다.</p>

            <p>다른 하나는 결과(Outcome)에 집중합니다.</p>

            <hr />

            <p>하나는 사진을 최적화합니다.</p>

            <p>다른 하나는 경험을 최적화합니다.</p>

            <hr />

            <p>생각해보세요.</p>

            <hr />

            <p>우리는 결혼식 사진작가를</p>

            <p>카메라를 가지고 있다는 이유로 고용하지 않습니다.</p>

            <hr />

            <p>지금은 모두가 카메라를 가지고 있습니다.</p>

            <hr />

            <p>셔터를 누를 줄 안다고 고용하는 것도 아닙니다.</p>

            <p>그것도 모두가 할 수 있습니다.</p>

            <hr />

            <p>우리가 사진작가를 고용하는 이유는</p>

            <p>그 사람이 어디에 서 있어야 하는지 알기 때문입니다.</p>

            <hr />

            <p>어떤 순간이 곧 벌어질지 알기 때문입니다.</p>

            <hr />

            <p>사람들을 어떻게 이끌어야 하는지 알기 때문입니다.</p>

            <hr />

            <p>어떻게 이야기를 만들어야 하는지 알기 때문입니다.</p>

            <hr />

            <p>그리고 평생 한 번뿐인 순간을</p>

            <p>특별한 기억으로 만드는 방법을 알기 때문입니다.</p>

            <hr />

            <p>기술은 사라지지 않았습니다.</p>

            <p>사진도 사라지지 않았습니다.</p>

            <hr />

            <p>바뀐 것은 KPI였습니다.</p>

            <hr />

            <p>예전에는</p>

            <p>좋은 사진을 찍는 것.</p>

            <hr />

            <p>지금은</p>

            <p>기억에 남는 결혼식을 만드는 것.</p>

            <hr />

            <p>가치의 단위가 확장된 것입니다.</p>

            <hr />

            <p>사진(Photo)</p>

            <p>에서</p>

            <p>결혼식(Wedding)</p>

            <p>으로.</p>

            <hr />

            <p>그리고 저는 이것이 가장 중요한 교훈이라고 생각합니다.</p>

            <hr />

            <p>살아남은 사진작가들은</p>

            <p>사진을 포기하지 않았습니다.</p>

            <hr />

            <p>대신 사진을 넘어 더 큰 가치를 만들었습니다.</p>

            <hr />

            <p>기술이 바닥을 올릴 때마다</p>

            <p>항상 같은 일이 벌어집니다.</p>

            <hr />

            <p>예전의 차별점은 더 이상 차별점이 아니게 됩니다.</p>

            <hr />

            <p>그리고 시장은 더 큰 것,</p>

            <p>더 높은 것을 보상하기 시작합니다.</p>

            <hr />

            <p>그래서 이제 새로운 질문이 생깁니다.</p>

            <hr />

            <p>만약 AI가 디자이너의 바닥을 올리고 있다면,</p>

            <p>새로운 KPI는 무엇일까요?</p>

            <hr />

            <p>그 이야기는 잠시 후에 다시 돌아오겠습니다.</p>

            <hr />

            <p>하지만 먼저 한 가지 예를 더 보여드리고 싶습니다.</p>

            <hr />

            <p>사진 이야기는</p>

            <p>개인에게 무슨 일이 일어나는지 보여줍니다.</p>

            <hr />

            <p>다음 이야기는</p>

            <p>팀 전체에 무슨 일이 일어나는지 보여줍니다.</p>

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
