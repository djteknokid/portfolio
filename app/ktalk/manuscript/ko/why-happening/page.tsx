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

const currentSlug = "why-happening";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter4Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>4장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>4</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>왜 이런 일이 생기는가</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/why-happening" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>다시 처음 질문으로 돌아가 보겠습니다.</p>

            <p>PM이 디자인 리뷰에 들어옵니다.</p>

            <p>손에는 PRD가 아니라 프로토타입이 들려 있습니다.</p>

            <p>그리고 디자이너는 생각합니다.</p>

            <blockquote>&ldquo;그러면 나는 여기 왜 있는 거지?&rdquo;</blockquote>

            <hr />

            <p>요즘 제가 정말 많이 듣는 질문이 있습니다.</p>

            <p>조금씩 표현은 다르지만 결국 같은 질문입니다.</p>

            <blockquote>
              &ldquo;PM이 이미 프로토타입을 만들었는데 UX는 이제 뭘 해야 하나요?&rdquo;
            </blockquote>

            <p>충분히 이해되는 질문입니다.</p>

            <p>저도 같은 생각을 해본 적이 있습니다.</p>

            <hr />

            <p>그런데 저는 우리가 질문을 조금 잘못하고 있다고 생각합니다.</p>

            <hr />

            <p>왜냐하면 사실 이것은 그렇게 새로운 일이 아니기 때문입니다.</p>

            <hr />

            <p>PM은 원래부터 시각적인 산출물을 가져왔습니다.</p>

            <p>스케치.</p>

            <p>다이어그램.</p>

            <p>경쟁사 스크린샷.</p>

            <p>러프한 목업.</p>

            <p>파워포인트.</p>

            <p>심지어 냅킨에 그린 그림까지.</p>

            <hr />

            <p>PM은 항상 아이디어를 시각적으로 설명하려고 했습니다.</p>

            <p>그건 새로운 일이 아닙니다.</p>

            <hr />

            <p>그럼 무엇이 바뀐 걸까요?</p>

            <p>저는 두 가지가 바뀌었다고 생각합니다.</p>

            <hr />

            <p><strong>첫 번째는 속도입니다.</strong></p>

            <hr />

            <p>예전에는 며칠 걸리던 일이</p>

            <p>이제는 한 시간 안에 가능합니다.</p>

            <p>어쩌면 그보다 더 빠를 수도 있습니다.</p>

            <hr />

            <p>PM이 AI에게 아이디어를 설명하면</p>

            <p>거의 즉시 눈으로 볼 수 있는 결과물이 나옵니다.</p>

            <hr />

            <p><strong>두 번째는 완성도입니다.</strong></p>

            <hr />

            <p>예전의 산출물은 거칠었습니다.</p>

            <p>박스.</p>

            <p>화살표.</p>

            <p>회색 사각형.</p>

            <hr />

            <p>누구도 그것을 최종 제품이라고 착각하지 않았습니다.</p>

            <p>오히려 그 어설픔 자체가 하나의 신호였습니다.</p>

            <hr />

            <p>방 안의 모든 사람에게 이렇게 말해주고 있었죠.</p>

            <blockquote>&ldquo;이건 시작점입니다.&rdquo;</blockquote>

            <hr />

            <p>그런데 지금은 다릅니다.</p>

            <hr />

            <p>실제 컴포넌트.</p>

            <p>실제 인터랙션.</p>

            <p>실제 데이터.</p>

            <hr />

            <p>어떤 것은 당장 출시해도 될 것처럼 보입니다.</p>

            <hr />

            <p>그리고 바로 그 지점에서 혼란이 시작됩니다.</p>

            <hr />

            <p>흥미로운 건 PM의 의도는 바뀌지 않았다는 것입니다.</p>

            <p>바뀐 것은 신호입니다.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch4-pm-explains.png"
              alt="Person in an LA cap looking uncertain at a wireframe printout while a colleague leans in pointing at it"
            >
            <p>이제 PM의 입장에서 이야기해 보겠습니다.</p>

            <p>왜냐하면 저는 지금 PM 역할을 하고 있으니까요.</p>

            <hr />

            <p>제가 프로토타입을 들고 디자인 리뷰에 들어갈 때</p>

            <p>디자이너의 일을 빼앗으려는 것이 아닙니다.</p>

            <hr />

            <p>솔직히 말하면 대부분은 더 빨리 설명하기 위한 방법입니다.</p>

            <p>그 이상도 이하도 아닙니다.</p>

            <hr />

            <p>시각적인 산출물.</p>

            <p>대화의 시작점.</p>

            <p>내가 무엇을 생각하고 있는지 설명하기 위한 도구.</p>
            </SlideRow>

            <hr />

            <p>제가 디자이너에게 진짜로 원하는 것은</p>

            <p>예전과 똑같습니다.</p>

            <hr />

            <p>더 좋은 플로우가 있을까?</p>

            <p>더 좋은 인터랙션이 있을까?</p>

            <p>이 정보를 더 명확하게 보여주는 방법이 있을까?</p>

            <p>내가 놓치고 있는 것은 무엇일까?</p>

            <p>내가 틀린 부분은 어디일까?</p>

            <hr />

            <p>PM이 기대하는 것은 사실 크게 바뀌지 않았습니다.</p>

            <hr />

            <p>바뀐 것은 산출물입니다.</p>

            <p>바뀐 것은 커뮤니케이션 방식입니다.</p>

            <p>바뀐 것은 신호입니다.</p>

            <hr />

            <SlideRow
              image="/mindbook/ktalk/slides/ch4-value-question.png"
              alt="Person standing in front of a massive complex flowchart, scratching their head with a pencil"
            >
            <p>그리고 여기서 저는 한 가지를 깨달았습니다.</p>

            <hr />

            <p>이건 사실 역할(Role)의 문제가 아니었습니다.</p>

            <p>가치(Value)의 문제였습니다.</p>
            </SlideRow>

            <hr />

            <p>오랫동안 우리는 전문화된 역할을 가지고 있었습니다.</p>

            <p>PM.</p>

            <p>디자이너.</p>

            <p>엔지니어.</p>

            <hr />

            <p>그게 완벽한 구조여서가 아닙니다.</p>

            <hr />

            <p>다른 영역으로 넘어가는 비용이 너무 컸기 때문입니다.</p>

            <hr />

            <p>디자인 툴은 배우기 어려웠습니다.</p>

            <p>개발 툴도 어려웠습니다.</p>

            <p>프로토타이핑도 어려웠습니다.</p>

            <hr />

            <p>그 마찰이 팀 구조를 유지시켰던 겁니다.</p>

            <hr />

            <p>그런데 AI가 그 마찰을 상당 부분 제거해 버렸습니다.</p>

            <hr />

            <p>그리고 마찰이 사라지자</p>

            <p>훨씬 더 불편한 질문 하나가 남았습니다.</p>

            <hr />

            <blockquote>&ldquo;디자이너의 진짜 가치는 무엇인가?&rdquo;</blockquote>

            <hr />

            <p>툴이 아닙니다.</p>

            <p>산출물이 아닙니다.</p>

            <p>프로세스도 아닙니다.</p>

            <hr />

            <p>가치입니다.</p>

            <hr />

            <p>
              그리고 저는 이제 우리가 답해야 할 질문이 바로 이것이라고 생각합니다.
            </p>

            <p>디자이너만의 질문이 아니라,</p>

            <p>제품 팀 전체의 질문으로 말입니다.</p>

            <hr />

            <p>왜냐하면 지금 벌어지고 있는 일은</p>

            <p>디자인만의 문제가 아니라고 생각하기 때문입니다.</p>

            <hr />

            <p>저는 이것이 훨씬 더 큰 변화의 시작이라고 생각합니다.</p>

            <hr />

            <p>그리고 디자인 밖으로 시선을 돌리기 시작했을 때,</p>

            <p>
              저는 똑같은 패턴이 다른 곳에서도 반복되고 있다는 것을 발견했습니다.
            </p>

            <hr />

            <p>제가 무슨 뜻인지 보여드리겠습니다.</p>

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
