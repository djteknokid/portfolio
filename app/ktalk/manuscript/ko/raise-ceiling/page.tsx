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
];

const currentSlug = "raise-ceiling";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter15Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>15장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>15</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>천장을 올려라</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/raise-ceiling" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <SlideRow
              image="/mindbook/ktalk/slides/ch15-ai-progression.png"
              alt="Progression: vibe coding → prototyping → agent workflows → agentic engineering"
            >
              <p>이 발표를 준비하기 시작했을 때,</p>

              <p>저는 이 챕터가 AI 이야기가 될 줄 알았습니다.</p>

              <hr />

              <p>20분 정도를 할애해서</p>

              <p>도구들을 소개할 생각이었습니다.</p>

              <hr />

              <p>바이브 코딩.</p>

              <p>프로토타이핑.</p>

              <p>에이전트 워크플로우.</p>

              <p>MCP.</p>

              <p>에이전틱 엔지니어링.</p>

              <hr />

              <p>요즘 우리가 모두 실험하고 있는 것들 말입니다.</p>
            </SlideRow>

            <hr />

            <p>물론 중요합니다.</p>

            <hr />

            <p>배워야 합니다.</p>

            <p>저도 배우고 있습니다.</p>

            <hr />

            <p>도구는 계속 좋아질 것입니다.</p>

            <p>모델도 계속 좋아질 것입니다.</p>

            <hr />

            <p>그리고 시장은 우리 모두에게 적응을 요구할 것입니다.</p>

            <hr />

            <p>그런데 이 발표를 준비하면 할수록</p>

            <p>한 가지를 깨달았습니다.</p>

            <hr />

            <p>진짜 이야기는 도구가 아니었습니다.</p>

            <hr />

            <p>진짜 이야기는 KPI였습니다.</p>

            <hr />

            <p>지금 대부분의 AI 대화는</p>

            <p>같은 일을 더 빠르게 하는 방법에 집중되어 있습니다.</p>

            <hr />

            <p>더 많은 디자인을 만드는 법.</p>

            <hr />

            <p>더 좋은 프롬프트를 쓰는 법.</p>

            <hr />

            <p>반복 업무를 자동화하는 법.</p>

            <hr />

            <p>물론 좋은 질문입니다.</p>

            <hr />

            <p>하지만 저는 우리가 조금 다른 질문을 해야 한다고 생각합니다.</p>

            <hr />

            <p>왜냐하면 그 질문들은</p>

            <p>하나의 전제를 깔고 있기 때문입니다.</p>

            <hr />

            <p>&ldquo;일 자체는 그대로일 것이다.&rdquo;</p>

            <hr />

            <p>&ldquo;KPI는 변하지 않을 것이다.&rdquo;</p>

            <hr />

            <p>&ldquo;목표는 동일하다.&rdquo;</p>

            <p>단지 더 빠르게 할 뿐이다.</p>

            <hr />

            <p>그런데 만약 시장이</p>

            <p>가치 자체를 바꾸고 있다면 어떨까요?</p>

            <hr />

            <p>사진 이야기로 다시 돌아가 보겠습니다.</p>

            <hr />

            <p>스마트폰 이전.</p>

            <p>필터 이전.</p>

            <p>컴퓨테이셔널 포토그래피 이전.</p>

            <hr />

            <p>당시 KPI는 단순했습니다.</p>

            <hr />

            <p>좋은 사진을 찍을 수 있는가?</p>

            <hr />

            <p>그것이 직업이었습니다.</p>

            <p>그것이 가치였습니다.</p>

            <hr />

            <p>그러다 바닥이 올라갔습니다.</p>

            <hr />

            <p>모두가 카메라를 가지게 되었습니다.</p>

            <hr />

            <p>모두가 필터를 가지게 되었습니다.</p>

            <hr />

            <p>모두가 편집 도구를 가지게 되었습니다.</p>

            <hr />

            <p>모두가 접근할 수 있게 되었습니다.</p>

            <hr />

            <p>그리고 흥미로운 일이 벌어졌습니다.</p>

            <hr />

            <p>성공한 사진작가들은</p>

            <p>조금 더 좋은 사진을 찍는 사람들이 아니었습니다.</p>

            <hr />

            <p>그들은 더 큰 질문을 하기 시작했습니다.</p>

            <hr />

            <p>&ldquo;어떻게 하면 사진을 더 잘 찍을까?&rdquo;</p>

            <p>가 아니라,</p>

            <hr />

            <p>&ldquo;어떻게 하면 이 결혼식을 잊지 못할 경험으로 만들 수 있을까?&rdquo;</p>

            <hr />

            <p>KPI가 바뀐 것입니다.</p>

            <hr />

            <p>가치의 단위가 확장되었습니다.</p>

            <hr />

            <p>사진(Photo)</p>

            <p>에서</p>

            <p>결혼식(Wedding)</p>

            <p>으로.</p>

            <hr />

            <p>이번에는 농구를 보겠습니다.</p>

            <hr />

            <p>오랫동안 빅맨들의 역할은 명확했습니다.</p>

            <hr />

            <p>리바운드.</p>

            <p>블락.</p>

            <p>골밑 득점.</p>

            <hr />

            <p>그런데 데이터 분석이 등장했습니다.</p>

            <hr />

            <p>바닥이 올라갔습니다.</p>

            <hr />

            <p>모두가 데이터를 이해하게 되었습니다.</p>

            <hr />

            <p>모두가 스페이싱을 이해하게 되었습니다.</p>

            <hr />

            <p>모두가 슈팅의 가치를 이해하게 되었습니다.</p>

            <hr />

            <p>그리고 질문이 바뀌었습니다.</p>

            <hr />

            <p>&ldquo;훌륭한 센터인가?&rdquo;</p>

            <p>가 아니라,</p>

            <hr />

            <p>&ldquo;새로운 농구에서 팀이 승리하도록 도울 수 있는가?&rdquo;</p>

            <hr />

            <p>KPI가 바뀌었습니다.</p>

            <hr />

            <p>가치의 단위가 확장되었습니다.</p>

            <hr />

            <p>선수(Player)</p>

            <p>에서</p>

            <p>팀(Team)</p>

            <p>으로.</p>

            <hr />

            <p>이번에는 음악입니다.</p>

            <hr />

            <p>뉴진스.</p>

            <p>BTS.</p>

            <hr />

            <p>그들이 성공한 이유가</p>

            <p>마이크를 가지고 있었기 때문이라고 생각하는 사람은 없습니다.</p>

            <hr />

            <p>수백만 명이 마이크를 가지고 있습니다.</p>

            <hr />

            <p>수백만 명이 노래를 녹음할 수 있습니다.</p>

            <hr />

            <p>물론 노래는 중요합니다.</p>

            <hr />

            <p>하지만 노래만이 전부는 아닙니다.</p>

            <hr />

            <p>그들을 특별하게 만든 것은 무엇이었을까요?</p>

            <hr />

            <p>정체성.</p>

            <hr />

            <p>커뮤니티.</p>

            <hr />

            <p>감정.</p>

            <hr />

            <p>스토리.</p>

            <hr />

            <p>문화.</p>

            <hr />

            <p>움직임.</p>

            <hr />

            <p>가치의 단위가 확장되었습니다.</p>

            <hr />

            <p>노래(Song)</p>

            <p>에서</p>

            <p>문화(Culture)</p>

            <p>로.</p>

            <hr />

            <p>이제 우리 이야기로 돌아가 보겠습니다.</p>

            <hr />

            <p>디자인.</p>

            <hr />

            <p>전통적으로 우리의 KPI는</p>

            <p>대략 이런 모습이었습니다.</p>

            <hr />

            <p>좋은 와이어프레임을 만들 수 있는가?</p>

            <hr />

            <p>좋은 목업을 만들 수 있는가?</p>

            <hr />

            <p>좋은 프로토타입을 만들 수 있는가?</p>

            <hr />

            <p>좋은 경험을 설계할 수 있는가?</p>

            <hr />

            <p>이것들은 여전히 중요합니다.</p>

            <hr />

            <p>사진작가에게 사진이 중요하듯.</p>

            <hr />

            <p>농구 선수에게 기본기가 중요하듯.</p>

            <hr />

            <p>뮤지션에게 좋은 음악이 중요하듯.</p>

            <hr />

            <p>기존 KPI는 완전히 사라지지 않습니다.</p>

            <hr />

            <p>바닥이 될 뿐입니다.</p>

            <hr />

            <p>그리고 저는 AI가 지금 정확히 그 일을 하고 있다고 생각합니다.</p>

            <hr />

            <p>AI는 바닥을 올리고 있습니다.</p>

            <hr />

            <p>그 어느 때보다 많은 사람들이 결과물을 만들 수 있습니다.</p>

            <hr />

            <p>그 어느 때보다 많은 사람들이 프로토타입을 만들 수 있습니다.</p>

            <hr />

            <p>그 어느 때보다 많은 사람들이 아이디어를 시각화할 수 있습니다.</p>

            <hr />

            <p>그 어느 때보다 많은 사람들이 기여할 수 있습니다.</p>

            <hr />

            <p>그리고 저는 많은 사람들이 이 부분을 놓치고 있다고 생각합니다.</p>

            <hr />

            <p>대화의 핵심은</p>

            <p>&ldquo;어떻게 더 좋은 디자이너가 될까?&rdquo;</p>

            <p>가 아닙니다.</p>

            <hr />

            <p>진짜 질문은 이것입니다.</p>

            <hr />

            <p>&ldquo;시장은 지금 무엇을 보상하고 있는가?&rdquo;</p>

            <hr />

            <p>역사는 반복해서 보여줍니다.</p>

            <hr />

            <p>바닥이 올라갈 때마다</p>

            <p>시장은 움직입니다.</p>

            <hr />

            <p>예전 가치를 예전 가격으로 보상하지 않습니다.</p>

            <hr />

            <p>대신 새로운 가치를 보상하기 시작합니다.</p>

            <hr />

            <p>그리고 성공하는 사람들은</p>

            <p>그 변화를 가장 먼저 알아차리는 사람들입니다.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch15-raise-ceiling.png"
              alt="Person standing on a cliff edge looking toward a mountain peak rising above the clouds"
            >
              <p>그렇다면 이제 질문은 이것입니다.</p>

              <hr />

              <p>바닥이 계속 올라간다면,</p>

              <hr />

              <p>천장은 무엇일까요?</p>
            </SlideRow>

            <hr />

            <p>저는 시장이 이미 답하기 시작했다고 생각합니다.</p>

            <hr />

            <p>좋은 결과물을 만들 수 있는가?</p>

            <p>가 아니라,</p>

            <hr />

            <p>조직이 더 좋은 결정을 내리도록 도울 수 있는가?</p>

            <hr />

            <p>명확성을 만들 수 있는가?</p>

            <hr />

            <p>정렬을 만들 수 있는가?</p>

            <hr />

            <p>공유된 이해를 만들 수 있는가?</p>

            <hr />

            <p>팀이 함께 앞으로 나아가도록 만들 수 있는가?</p>

            <hr />

            <p>왜냐하면 창작이 풍부해질수록</p>

            <p>바로 그것이 희소해지기 때문입니다.</p>

            <hr />

            <p>그리고 이 패턴을 보고 난 뒤,</p>

            <p>저는 더 이상 그것을 보지 않을 수 없었습니다.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch15-kpi-expansion.png"
              alt="Four panels: Photo → Wedding, Player → Team, Song → Culture, Design → Alignment"
            >
              <p>사진 → 결혼식</p>

              <p>선수 → 팀</p>

              <p>노래 → 문화</p>

              <p>결과물 → <strong>의사결정</strong></p>
            </SlideRow>

            <hr />

            <p>모든 전문 분야는</p>

            <p>자신의 기술(Craft)을 넘어 확장되었습니다.</p>

            <hr />

            <p>영향력이 결과물보다 커진 것입니다.</p>

            <hr />

            <p>저는 그것이 천장을 올린다는 의미라고 생각합니다.</p>

            <hr />

            <p>기술은 바닥을 올립니다.</p>

            <hr />

            <p>시장은 KPI를 바꿉니다.</p>

            <hr />

            <p>전문가는 천장을 올립니다.</p>

            <hr />

            <p>바닥은 실행입니다.</p>

            <hr />

            <p>천장은 영향력입니다.</p>

            <hr />

            <p>바닥은 창작입니다.</p>

            <hr />

            <p>천장은 결과입니다.</p>

            <hr />

            <p>바닥은 개인의 기여입니다.</p>

            <hr />

            <p>천장은 시스템 전체의 성공입니다.</p>

            <hr />

            <p>어쩌면 미래는</p>

            <p>가장 좋은 결과물을 만드는 사람의 것이 아닐지도 모릅니다.</p>

            <hr />

            <p>어쩌면 미래는</p>

            <p>자신의 영향력을 전문 영역 밖으로 확장하는 사람들의 것일지도 모릅니다.</p>

            <hr />

            <p>사진에서 결혼식으로.</p>

            <hr />

            <p>선수에서 팀으로.</p>

            <hr />

            <p>노래에서 문화로.</p>

            <hr />

            <p>결과물에서 의사결정으로.</p>

            <hr />

            <p>저는 그것이 천장을 올리는 것이라고 생각합니다.</p>

            <hr />

            <p>그리고 그것이 바로</p>

            <p>조율의 시대가 의미하는 바라고 믿습니다.</p>

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
