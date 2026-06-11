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

const currentSlug = "coordination-era";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter14Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>14장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>14</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>조율의 시대</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/koreatalk/manuscript/coordination-era" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>좋습니다.</p>

            <p>저는 지난 30분 동안 하나의 이야기를 해왔습니다.</p>

            <hr />

            <p>사진 이야기를 했습니다.</p>

            <p>농구 이야기를 했습니다.</p>

            <p>기술이 바닥을 올릴 때 어떤 일이 벌어지는지 이야기했습니다.</p>

            <hr />

            <p>그리고 오늘날 제품 팀에서 나타나고 있는 세 가지 신호를 살펴봤습니다.</p>

            <hr />

            <p>관찰은 달랐습니다.</p>

            <p>사례도 달랐습니다.</p>

            <hr />

            <p>하지만 결론은 같았습니다.</p>

            <hr />

            <p>창작은 풍부해지고 있습니다.</p>

            <p>조율은 희소해지고 있습니다.</p>

            <hr />

            <p>그래서 이제 제 생각을 직접 말씀드리겠습니다.</p>

            <hr />

            <p>제 가설은 이것입니다.</p>

            <hr />

            <p>
              제품 개발(Product Development)의 다음 경쟁력은
              창작(Creation)이 아닙니다.
            </p>

            <hr />

            <p>조율(Coordination)입니다.</p>

            <hr />

            <p>그런데 여기서 한 가지 분명히 하고 싶습니다.</p>

            <hr />

            <p>저는 조율이 새로운 것이라고 말하는 것이 아닙니다.</p>

            <hr />

            <p>팀은 원래부터 조율이 필요했습니다.</p>

            <p>원래부터 정렬(Alignment)이 필요했습니다.</p>

            <p>원래부터 좋은 의사결정이 필요했습니다.</p>

            <hr />

            <p>사진에도 원래 스토리텔링이 있었습니다.</p>

            <p>농구에도 원래 팀워크가 있었습니다.</p>

            <p>음악에도 원래 문화와 커뮤니티가 있었습니다.</p>

            <hr />

            <p>그러니까 질문은</p>

            <p>이것들이 존재했느냐가 아닙니다.</p>

            <hr />

            <p>질문은 이것입니다.</p>

            <hr />

            <p>시장은 지금 무엇을 보상하고 있는가?</p>

            <hr />

            <p>왜냐하면 바뀐 것은</p>

            <p>조율의 존재가 아니라,</p>

            <p>조율의 가치이기 때문입니다.</p>

            <hr />

            <p>창작이 비쌌던 시대에는</p>

            <p>실행이 병목이었습니다.</p>

            <hr />

            <p>만들 수 있는 사람이 힘을 가졌습니다.</p>

            <p>구현할 수 있는 사람이 힘을 가졌습니다.</p>

            <p>실행할 수 있는 사람이 힘을 가졌습니다.</p>

            <hr />

            <p>그런데 이제는 어떨까요?</p>

            <hr />

            <p>모두가 만들 수 있습니다.</p>

            <p>모두가 프로토타입을 만들 수 있습니다.</p>

            <p>모두가 아이디어를 시각화할 수 있습니다.</p>

            <p>모두가 결과물을 테이블 위에 올릴 수 있습니다.</p>

            <hr />

            <p>그 순간 병목은 이동합니다.</p>

            <hr />

            <p>그리고 저는 지금 정확히 그 일이 벌어지고 있다고 생각합니다.</p>

            <hr />

            <p>제가 말하는 조율은</p>

            <p>프로젝트 관리가 아닙니다.</p>

            <p>상태 보고(Status Meeting)도 아닙니다.</p>

            <p>Jira 티켓을 더 잘 쓰는 것도 아닙니다.</p>

            <hr />

            <p>제가 말하는 조율은</p>

            <p>서로 다른 사람들을 하나의 방향으로 움직이게 하는 능력입니다.</p>

            <hr />

            <p>서로 다른 정보를 가진 사람들.</p>

            <p>서로 다른 목표를 가진 사람들.</p>

            <p>서로 다른 우선순위를 가진 사람들.</p>

            <p>서로 다른 의견을 가진 사람들.</p>

            <hr />

            <p>그 사람들이</p>

            <p>무엇이 중요한지 함께 이해하게 만들고,</p>

            <hr />

            <p>그 이해를 바탕으로</p>

            <p>같은 방향으로 움직이게 만드는 능력입니다.</p>

            <hr />

            <p>원래부터 어려운 일이었습니다.</p>

            <hr />

            <p>그런데 한 가지가 바뀌었습니다.</p>

            <hr />

            <p>예전에는 실행이 느렸습니다.</p>

            <p>무언가를 만드는 데 시간이 걸렸습니다.</p>

            <hr />

            <p>그래서 이야기할 시간이 있었습니다.</p>

            <p>토론할 시간이 있었습니다.</p>

            <p>반대할 시간이 있었습니다.</p>

            <p>다시 정렬할 시간이 있었습니다.</p>

            <hr />

            <p>도구의 마찰이</p>

            <p>의도치 않게 조율의 시간을 만들어 주었습니다.</p>

            <hr />

            <p>하지만 지금은 다릅니다.</p>

            <hr />

            <p>프로토타입은 이미 존재합니다.</p>

            <p>목업도 이미 존재합니다.</p>

            <p>코드도 이미 존재합니다.</p>

            <p>이해관계자들은 이미 반응하고 있습니다.</p>

            <p>팀은 바로 움직여야 합니다.</p>

            <hr />

            <p>예전에는 자연스럽게 일어나던 조율이</p>

            <p>이제는 의도적으로 만들어져야 합니다.</p>

            <hr />

            <p>그래서 저는 현재 AI 담론이 중요한 무언가를 놓치고 있다고 생각합니다.</p>

            <hr />

            <p>지금 대부분의 이야기는 개인에 관한 이야기입니다.</p>

            <hr />

            <p>1인 창업자.</p>

            <p>1인 스타트업.</p>

            <p>10배 생산성을 가진 엔지니어.</p>

            <p>AI를 활용하는 디자이너.</p>

            <p>10명의 일을 하는 한 사람.</p>

            <hr />

            <p>그리고 솔직히 말하면</p>

            <p>그 이야기들은 맞습니다.</p>

            <p>실제로 일어나고 있는 일입니다.</p>

            <p>저도 직접 경험했습니다.</p>

            <hr />

            <p>몇 년 전이라면 팀 전체가 필요했을 일을</p>

            <p>지금은 혼자 할 수 있습니다.</p>

            <hr />

            <p>그런데 저를 놀라게 한 것은 다른 것이었습니다.</p>

            <hr />

            <p>AI가 강력해질수록</p>

            <p>팀은 더 중요해졌습니다.</p>

            <hr />

            <p>이 말은 조금 이상하게 들립니다.</p>

            <hr />

            <p>그래서 더 중요하다고 생각합니다.</p>

            <hr />

            <p>저는 제 인생에서 가장 큰 개인 레버리지(Leverage)를 가지고 있습니다.</p>

            <hr />

            <p>그런데도 저는</p>

            <p>정렬에 더 많은 시간을 쓰고 있습니다.</p>

            <p>의사결정에 더 많은 시간을 쓰고 있습니다.</p>

            <p>사람들이 하나의 방향으로 수렴하도록 돕는 데 더 많은 시간을 쓰고 있습니다.</p>

            <hr />

            <p>줄어든 것이 아니라,</p>

            <p>늘어났습니다.</p>

            <hr />

            <p>저는 사람들에게서 멀어진 것이 아니라</p>

            <p>사람들에게 더 가까워졌습니다.</p>

            <hr />

            <p>그래서 저는 지금을 두 개의 파도로 생각합니다.</p>

            <hr />

            <p><strong>Wave 1</strong></p>

            <p>개인의 레버리지.</p>

            <p>한 사람이 열 사람의 일을 하는 시대.</p>

            <p>지금 모두가 이야기하는 시대입니다.</p>

            <p>그리고 맞습니다. 실제로 존재합니다.</p>

            <hr />

            <p><strong>Wave 2</strong></p>

            <p>집단의 레버리지.</p>

            <p>열 사람이 하나의 시스템처럼 움직이는 시대.</p>

            <p>저는 그것이 다음 단계라고 생각합니다.</p>

            <hr />

            <p>왜냐하면 개인의 레버리지는</p>

            <p>더 많이 만들게 해주지만,</p>

            <hr />

            <p>집단의 레버리지는</p>

            <p>더 좋은 결정을 내리게 해주기 때문입니다.</p>

            <hr />

            <p>그리고 제 가설이 맞다면,</p>

            <p>앞으로는 두 번째 능력이 더 가치 있어질 것입니다.</p>

            <hr />

            <p>AI 속도로 정렬할 수 있는 조직.</p>

            <p>누구보다 빠르게 의사결정할 수 있는 조직.</p>

            <p>모두가 만들 수 있는 환경에서도 조율할 수 있는 조직.</p>

            <hr />

            <p>그런 조직이 승리할 것입니다.</p>

            <hr />

            <p>가장 똑똑한 사람들이 있어서가 아닙니다.</p>

            <p>가장 좋은 도구를 써서도 아닙니다.</p>

            <p>새로운 병목을 해결했기 때문입니다.</p>

            <hr />

            <p>그래서 저는 앞으로 10년 동안</p>

            <p>가장 중요한 질문이 이것이라고 생각합니다.</p>

            <hr />

            <p>어떻게 AI를 더 잘 사용할까?</p>

            <p>가 아닙니다.</p>

            <hr />

            <p>어떻게 내 역할을 지킬까?</p>

            <p>도 아닙니다.</p>

            <hr />

            <p>어떻게 더 많이 만들까?</p>

            <p>도 아닙니다.</p>

            <hr />

            <p>질문은 이것입니다.</p>

            <hr />

            <p>어떻게 하면 우리 팀이 더 좋은 결정을 내리도록 도울 수 있을까?</p>

            <p>어떻게 하면 명확성을 만들 수 있을까?</p>

            <p>어떻게 하면 정렬을 만들 수 있을까?</p>

            <p>어떻게 하면 똑똑한 사람들이 같은 방향으로 움직이게 할 수 있을까?</p>

            <hr />

            <p>저는 조율이 새로운 스킬이라고 생각하지 않습니다.</p>

            <hr />

            <p>조율은 새로운 가치가 모이고 있는 곳이라고 생각합니다.</p>

            <hr />

            <p>그리고 그것이 제가 말하는</p>

            <p>조율의 시대입니다.</p>

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
