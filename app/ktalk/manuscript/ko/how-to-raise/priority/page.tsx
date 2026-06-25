import Link from "next/link";
import ManuscriptSidebarKo from "../../ManuscriptSidebarKo";

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

const currentSlug = "how-to-raise/priority";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16cKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>16c장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>3</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>우선순위</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              조율의 네 가지 요소 중 3번째
            </p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/how-to-raise/priority" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>핵심 질문</p>
            <p><strong>지금 가장 중요한 것은 무엇인가?</strong></p>

            <hr />

            <p>AI는 선택지를 만드는 것을 쉽게 만들었습니다.</p>

            <p>어려운 것은 어떤 것에 집중할지 결정하는 것입니다.</p>

            <hr />

            <p>저는 모든 아이디어가 합리적으로 들렸던 회의에 많이 들어가 봤습니다.</p>

            <p>모든 이해관계자의 말이 일리가 있었습니다.</p>

            <p>모든 제안이 가능성이 있었습니다.</p>

            <p>그래도 팀은 앞으로 나아가지 못했습니다.</p>

            <p>문제는 아이디어 부족이 아니었습니다.</p>

            <p>문제는 우선순위 부족이었습니다.</p>

            <hr />

            <p>팀이 우선순위를 정했다는 것은 세 가지에 답할 수 있다는 것입니다.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["긴급성", "얼마나 빨리 주의가 필요한가?"],
                ["임팩트", "이것이 얼마나 중요한가?"],
                ["노력", "무엇이 필요한가?"],
              ].map(([label, desc]) => (
                <>
                  <div key={`l-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}>
                    {label}
                  </div>
                  <div key={`d-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "15px",
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}>
                    {desc}
                  </div>
                </>
              ))}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16c-urgency-impact-cost.png"
              alt="Priority table: Task / Urgency / Impact / Cost — Roof leak (High/High/High starred), Paint wall (Low/Low/Medium), Fix door (Medium/Low/Low)"
              className="chapter-image"
            />

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>긴급성</p>
            <p><strong>얼마나 빨리 주의가 필요한가?</strong></p>

            <p>기다릴 수 있는 기회들이 있습니다.</p>

            <p>기다릴 수 없는 문제들이 있습니다.</p>

            <p>고객 에스컬레이션.</p>

            <p>규제 마감일.</p>

            <p>경쟁사 출시.</p>

            <p>긴급성은 팀이 언제 행동해야 하는지 이해하도록 돕습니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>임팩트</p>
            <p><strong>이것이 얼마나 중요한가?</strong></p>

            <p>이것을 해결하면 어떻게 되는가?</p>

            <p>얼마나 많은 사용자가 혜택을 받는가?</p>

            <p>얼마나 많은 비즈니스 가치가 만들어지는가?</p>

            <p>얼마나 많은 고통이 제거되는가?</p>

            <p>임팩트는 팀이 왜 무언가가 중요한지 이해하도록 돕습니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>노력</p>
            <p><strong>무엇이 필요한가?</strong></p>

            <p>모든 우선순위는 리소스를 소비합니다.</p>

            <p>시간. 돈. 엔지니어링 노력. 조직의 관심.</p>

            <p>노력은 팀이 결과를 달성하기 위해 무엇을 투자해야 하는지 이해하도록 돕습니다.</p>

            <hr />

            <p>우선순위 없이는 모든 것이 중요해집니다.</p>

            <p>그리고 모든 것이 중요하면, 아무것도 움직이지 않습니다.</p>

            <hr />

            <p>
              훌륭한 조율자들은 팀이 긴급한 것과 단순히 흥미로운 것을 구분하도록 돕습니다.
            </p>

            <p>
              임팩트가 높은 기회와 임팩트가 낮은 방해 요소를 구분하도록 돕습니다.
            </p>

            <p>리소스가 투입되기 전에 비용을 눈에 보이게 만듭니다.</p>

            <p>
              긴급성, 임팩트, 노력이 이해되면 — 팀은 가장 중요한 것에 집중할 수 있습니다.
            </p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16c-priority-mindset.png"
              alt="Priority summary: URGENCY (Immediate, Near-Term, Strategic) · IMPACT (User Impact, Business Impact, Strategic Impact) · EFFORT (Design Effort, Delivery Effort, Organizational Effort)"
              className="chapter-image"
            />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>마인드셋</p>

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>긴급성</p>

            <p><strong>중요한 모든 것이 긴급한 것은 아닙니다.</strong></p>

            <p>그리고 긴급한 모든 것이 중요한 것도 아닙니다.</p>

            <p>훌륭한 조율자들은 오늘의 불과 내일의 기회를 구분할 수 있습니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>즉각적 긴급성</p>

            <p>지금 불이 난 것은 무엇인가?</p>

            <p>프로덕션 이슈. 고객 에스컬레이션. 이번 주 마감.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>단기 긴급성</p>

            <p>무시하면 비용이 커지는 것은 무엇인가?</p>

            <p>늘어나는 사용자 고통. 기술 부채. 채택 문제.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>전략적 긴급성</p>

            <p>미래에 중요해질 것은 무엇인가?</p>

            <p>시장 변화. AI 혼란. 경쟁 위협. 플랫폼 투자.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>임팩트</p>

            <p><strong>결과를 바꾸는 일을 하세요.</strong></p>

            <p>활동을 만드는 일이 아닙니다.</p>

            <p>가시성을 만드는 일이 아닙니다.</p>

            <p>흥분을 만드는 일이 아닙니다.</p>

            <p>결과입니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>사용자 임팩트</p>

            <p>얼마나 많은 사용자가 혜택을 받는가? 얼마나 큰 혜택을 받는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>비즈니스 임팩트</p>

            <p>이것이 수익, 비용, 효율성, 채택, 리텐션에 얼마나 영향을 미치는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>전략적 임팩트</p>

            <p>이것이 플랫폼, 조직, 또는 시장 포지션을 얼마나 강화하는가?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>노력</p>

            <p><strong>야망은 현실을 존중해야 합니다.</strong></p>

            <p>많은 아이디어들이 나쁘기 때문에 실패하는 것이 아닙니다.</p>

            <p>조직이 감당할 수 있는 것보다 더 많은 노력이 필요하기 때문입니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>디자인 노력</p>

            <p>리서치, 디자인, 검증, 반복.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>개발 노력</p>

            <p>엔지니어링, 구현, 테스트, 지원.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>조직 노력</p>

            <p>정렬, 변화 관리, 교육, 출시.</p>

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
