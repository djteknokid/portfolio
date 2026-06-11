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

const currentSlug = "nba";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter6Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>6장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>6</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>NBA 이야기</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/nba" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>잠깐 질문 하나 드릴게요.</p>

            <p>여기 농구 좋아하시는 분 계신가요?</p>

            <p>저는 농구를 했고,</p>

            <p>코치도 했습니다.</p>

            <p>그래서 잠깐 농구 이야기를 하겠습니다.</p>

            <p>걱정하지 마세요.</p>

            <p>결국 디자인 이야기로 돌아옵니다.</p>

            <hr />

            <p>90년대 농구를 보셨던 분들은 기억하실 겁니다.</p>

            <p>그때 농구는 굉장히 단순했습니다.</p>

            <p>센터는 골밑에 있었습니다.</p>

            <p>파워포워드도 골밑에 있었습니다.</p>

            <hr />

            <p>역할도 명확했습니다.</p>

            <p>리바운드.</p>

            <p>블락.</p>

            <p>골밑 득점.</p>

            <hr />

            <p>자기 역할을 하면 됐습니다.</p>

            <p>자기 자리에서.</p>

            <p>자기 방식으로.</p>

            <hr />

            <p>그런데 어느 순간 무언가가 바뀌었습니다.</p>

            <hr />

            <p>새로운 규칙이 생긴 것도 아니었습니다.</p>

            <p>새로운 기술이 등장한 것도 아니었습니다.</p>

            <hr />

            <p>새로운 이해가 등장했습니다.</p>

            <hr />

            <p>데이터 분석.</p>

            <p>Analytics.</p>

            <hr />

            <p>팀들이 농구를 보는 방식이 달라지기 시작했습니다.</p>

            <p>그리고 한 가지 사실을 발견했습니다.</p>

            <hr />

            <p>3점슛이 생각보다 훨씬 가치 있다는 것이었습니다.</p>

            <hr />

            <p>처음에는 천천히 변했습니다.</p>

            <p>하지만 결국 모든 팀이 같은 질문을 받게 되었습니다.</p>

            <hr />

            <p>&ldquo;우리 선수들은 슛을 던질 수 있는가?&rdquo;</p>

            <hr />

            <p>심지어 빅맨들도.</p>

            <p>센터도.</p>

            <p>파워포워드도.</p>

            <hr />

            <p>이제 여러분이 센터라고 생각해 보겠습니다.</p>

            <hr />

            <p>20년 동안 한 가지를 잘하기 위해 노력했습니다.</p>

            <p>리바운드.</p>

            <p>수비.</p>

            <p>골밑 득점.</p>

            <hr />

            <p>그런데 갑자기 게임이 다른 것을 요구하기 시작합니다.</p>

            <hr />

            <p>어떤 선수들은 거부했습니다.</p>

            <hr />

            <p>&ldquo;나는 원래 하던 걸 잘하면 돼.&rdquo;</p>

            <hr />

            <p>그들은 계속 자신이 잘하던 것만 했습니다.</p>

            <hr />

            <p>그리고 조금씩 가치가 떨어졌습니다.</p>

            <hr />

            <p>실력이 나빠져서가 아닙니다.</p>

            <p>게임이 바뀌었기 때문입니다.</p>

            <hr />

            <p>반대로 적응한 선수들도 있었습니다.</p>

            <p>브룩 로페즈.</p>

            <p>알 호포드.</p>

            <hr />

            <p>이미 성공한 선수들입니다.</p>

            <p>이미 인정받은 선수들입니다.</p>

            <hr />

            <p>그들은 새로운 농구를 불평하지 않았습니다.</p>

            <p>대신 자신의 게임을 확장했습니다.</p>

            <hr />

            <p>슛을 배웠습니다.</p>

            <hr />

            <p>그리고 이전보다 더 가치 있는 선수가 되었습니다.</p>

            <hr />

            <p>여기서 중요한 점이 하나 있습니다.</p>

            <hr />

            <p>새로운 기술이</p>

            <p>기존 기술을 대체한 것이 아닙니다.</p>

            <hr />

            <p>브룩 로페즈는 여전히 리바운드를 합니다.</p>

            <p>알 호포드는 여전히 수비를 합니다.</p>

            <hr />

            <p>예전 KPI는 사라지지 않았습니다.</p>

            <hr />

            <p>새로운 KPI가 추가된 것입니다.</p>

            <hr />

            <p>질문이 바뀌었습니다.</p>

            <hr />

            <p>예전 질문은</p>

            <p>&ldquo;너는 네 역할을 잘하는가?&rdquo;</p>

            <p>였습니다.</p>

            <hr />

            <p>새로운 질문은</p>

            <p>
              &ldquo;너는 네 역할을 잘하면서도,
              팀이 새로운 방식으로 승리하도록 도울 수 있는가?&rdquo;
            </p>

            <p>입니다.</p>

            <hr />

            <p>완전히 다른 질문입니다.</p>

            <hr />

            <p>그리고 오늘날 NBA를 보면</p>

            <p>정확히 그런 방향으로 흘러왔습니다.</p>

            <hr />

            <p>니콜라 요키치.</p>

            <p>빅터 웸반야마.</p>

            <p>칼 앤서니 타운스.</p>

            <hr />

            <p>최고의 선수들은 더 이상 포지션으로 정의되지 않습니다.</p>

            <hr />

            <p>능력으로 정의됩니다.</p>

            <hr />

            <p>&ldquo;이 선수가 팀의 승리에 무엇을 기여할 수 있는가?&rdquo;</p>

            <hr />

            <p>그리고 여기서 제가 정말 중요하게 생각하는 부분이 있습니다.</p>

            <hr />

            <p>우승한 팀들은</p>

            <p>단순히 슛을 잘 던지는 팀이 아니었습니다.</p>

            <hr />

            <p>새로운 환경에서 함께 플레이하는 법을 배운 팀들이었습니다.</p>

            <hr />

            <p>스페이싱.</p>

            <p>움직임.</p>

            <p>타이밍.</p>

            <p>의사결정.</p>

            <p>공유된 이해.</p>

            <hr />

            <p>골든스테이트 워리어스를 생각해 보세요.</p>

            <hr />

            <p>사람들은 커리를 이야기합니다.</p>

            <p>클레이를 이야기합니다.</p>

            <p>듀란트를 이야기합니다.</p>

            <hr />

            <p>하지만 그 팀을 특별하게 만든 것은</p>

            <p>개인의 재능이 아니었습니다.</p>

            <hr />

            <p>NBA에는 원래 재능 있는 선수들이 많았습니다.</p>

            <hr />

            <p>워리어스를 특별하게 만든 것은</p>

            <p>조율이었습니다.</p>

            <hr />

            <p>그들은 같은 코트를 읽는 언어를 가지고 있었습니다.</p>

            <hr />

            <p>누가 어디에 있을지 알고 있었습니다.</p>

            <p>누가 무엇을 하려고 하는지 알고 있었습니다.</p>

            <hr />

            <p>그래서 더 빠르게 움직일 수 있었습니다.</p>

            <p>서로를 더 잘 이해했기 때문입니다.</p>

            <hr />

            <p>모든 선수의 바닥은 올라갔습니다.</p>

            <hr />

            <p>그리고 승리한 팀들은</p>

            <p>조율 문제를 해결했습니다.</p>

            <hr />

            <p>저는 이 부분이 굉장히 중요하다고 생각합니다.</p>

            <hr />

            <p>사진 이야기는</p>

            <p>바닥이 올라갔을 때 개인에게 어떤 일이 벌어지는지 보여줍니다.</p>

            <hr />

            <p>농구 이야기는</p>

            <p>바닥이 올라갔을 때 팀에게 어떤 일이 벌어지는지 보여줍니다.</p>

            <hr />

            <p>이제 이 두 이야기를 하나로 연결해 보겠습니다.</p>

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
