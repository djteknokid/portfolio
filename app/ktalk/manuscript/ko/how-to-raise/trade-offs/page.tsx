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
];

const currentSlug = "how-to-raise/trade-offs";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16bKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>16b장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>2</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>트레이드오프</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              조율의 네 가지 요소 중 2번째
            </p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/how-to-raise/trade-offs" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>핵심 질문</p>
            <p><strong>우리는 무엇을 희생할 의향이 있는가?</strong></p>

            <hr />

            <p>의미 있는 제품 결정은 모두 트레이드오프를 수반합니다.</p>

            <p>속도 대 품질.</p>

            <p>범위 대 집중.</p>

            <p>커스터마이제이션 대 단순성.</p>

            <p>단기 결과 대 장기 투자.</p>

            <hr />

            <p>팀이 트레이드오프를 파악했다는 것은 세 가지에 답할 수 있다는 것입니다.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["이점", "우리는 무엇을 얻는가?"],
                ["리스크", "무엇이 잘못될 수 있는가?"],
                ["수용", "우리는 무엇을 감수할 의향이 있는가?"],
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
              src="/mindbook/ktalk/slides/ch16b-benefit-risk-acceptance.png"
              alt="Three-panel sequence: Benefit (window seat with a view) → Risk (passenger in front reclines) → Acceptance (relaxing anyway)"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "4px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                background: "#ffffff",
                margin: "var(--sp-6) 0",
              }}
            />

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>이점</p>
            <p><strong>우리는 무엇을 얻는가?</strong></p>

            <p>이 방향을 선택하면 무엇이 더 나아지는가?</p>

            <p>더 빨리 출시할 수 있을지도 모릅니다.</p>

            <p>더 많은 고객에게 닿을 수 있을지도 모릅니다.</p>

            <p>복잡성을 줄일 수 있을지도 모릅니다.</p>

            <p>모든 트레이드오프는 명확한 장점을 가져야 합니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>리스크</p>
            <p><strong>무엇이 잘못될 수 있는가?</strong></p>

            <p>이 선택으로 인해 무엇을 위험에 빠뜨리는가?</p>

            <p>품질이 떨어질 수 있습니다.</p>

            <p>유연성이 줄어들 수 있습니다.</p>

            <p>기술 부채가 생길 수 있습니다.</p>

            <p>모든 이점에는 그에 상응하는 리스크가 따릅니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>수용</p>
            <p><strong>우리는 무엇을 감수할 의향이 있는가?</strong></p>

            <p>이것이 가장 어려운 부분입니다.</p>

            <p>팀이 리스크를 파악하지 못해서가 아닙니다.</p>

            <p>팀이 리스크를 좀처럼 인정하지 않기 때문입니다.</p>

            <p>수용은 소리 내어 말하는 것을 의미합니다:</p>

            <blockquote>
              네, 우리는 단점을 이해하고 있으며 그것을 받아들일 의향이 있습니다.
            </blockquote>

            <p>수용 없이 트레이드오프는 이론적인 것으로 남습니다.</p>

            <p>수용이 있어야 실행 가능해집니다.</p>

            <hr />

            <p>트레이드오프 없이는 모두가 모든 것을 원합니다.</p>

            <p>더 많은 기능. 더 높은 품질. 더 빠른 배포. 더 낮은 비용. 더 큰 유연성.</p>

            <p>그 결과는 대개 좌절이지 진전이 아닙니다.</p>

            <hr />

            <p>
              훌륭한 조율자들은 트레이드오프를 없애지 않습니다.
            </p>

            <p>그들은 트레이드오프를 눈에 보이게 만듭니다.</p>

            <p>
              이점이 명확해지고, 리스크가 이해되고, 결과가 수용되면 — 팀은 앞으로 나아갈 수 있습니다.
            </p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16b-tradeoffs-mindset.png"
              alt="Trade-offs summary: BENEFIT (User Value, Business Value, Strategic Value) · RISK (User Risk, Operational Risk, Strategic Risk) · ACCEPTANCE (Personal Acceptance, Team Acceptance, Organizational Acceptance)"
              style={{
                width: "100%",
                display: "block",
                borderRadius: "4px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                background: "#ffffff",
                margin: "var(--sp-6) 0",
              }}
            />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>마인드셋</p>

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>이점</p>

            <p><strong>가치는 여러 차원에 존재합니다.</strong></p>

            <p>많은 디자이너들은 자연스럽게 사용자 가치에 집중합니다.</p>

            <p>하지만 훌륭한 조율자는 여러 관점에서 가치를 이해합니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>사용자 가치</p>

            <p>이것이 사용자에게 어떤 도움을 주는가?</p>

            <p>마찰을 줄이는가? 시간을 절약하는가? 자신감을 높이는가? 결과를 개선하는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>비즈니스 가치</p>

            <p>이것이 고객 또는 비즈니스에 어떤 도움을 주는가?</p>

            <p>채택률을 높이는가? 비용을 줄이는가? 효율성을 개선하는가? 수익을 창출하는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>전략적 가치</p>

            <p>이것이 더 넓은 조직을 어떻게 강화하는가?</p>

            <p>플랫폼을 개선하는가? 재사용 가능한 역량을 만드는가? 시장 포지셔닝을 강화하는가? 장기 전략을 지원하는가?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>리스크</p>

            <p><strong>모든 결정은 새로운 문제를 만들어냅니다.</strong></p>

            <p>목표는 리스크를 없애는 것이 아닙니다.</p>

            <p>목표는 리스크가 현실이 되기 전에 눈에 보이게 만드는 것입니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>사용자 리스크</p>

            <p>사용자에게 무엇이 잘못될 수 있는가?</p>

            <p>신뢰가 감소할 수 있는가? 채택이 저해될 수 있는가? 경험이 더 혼란스러워질 수 있는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>운영 리스크</p>

            <p>구현 또는 운영 중 무엇이 잘못될 수 있는가?</p>

            <p>엔지니어링 복잡성이 증가할 수 있는가? 비용이 상승할 수 있는가? 지연, 안정성, 개인정보, 보안이 문제가 될 수 있는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>전략적 리스크</p>

            <p>조직에 무엇이 잘못될 수 있는가?</p>

            <p>브랜드를 손상시킬 수 있는가? 장기적인 기술 부채를 만들 수 있는가? 회사 전략과 충돌할 수 있는가? 플랫폼을 약화시킬 수 있는가?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>수용</p>

            <p><strong>모든 이점에는 결과가 따릅니다.</strong></p>

            <p>누군가는 그것을 감당해야 합니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>개인 수용</p>

            <p>나는 이 트레이드오프를 받아들일 수 있는가?</p>

            <p>내가 선호하는 해결책이 아니더라도?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>팀 수용</p>

            <p>팀은 이 트레이드오프를 받아들일 수 있는가?</p>

            <p>엔지니어링, 제품, 디자인, 리더십이 결과를 이해하고 수용하는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>조직 수용</p>

            <p>조직은 이 트레이드오프를 받아들일 수 있는가?</p>

            <p>회사는 이 결정에 수반되는 비용, 리스크, 지연, 또는 제한을 감당할 의향이 있는가?</p>

            <hr />

            <p>이점이 이해되고,</p>

            <p>리스크가 눈에 보이고,</p>

            <p>결과가 수용되면,</p>

            <p>팀은 함께 앞으로 나아갈 수 있습니다.</p>

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
