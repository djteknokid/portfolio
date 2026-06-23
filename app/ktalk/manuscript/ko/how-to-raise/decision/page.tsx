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

const currentSlug = "how-to-raise/decision";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16dKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>16d장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>4</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>결정</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              조율의 네 가지 요소 중 4번째
            </p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/how-to-raise/decision" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>핵심 질문</p>
            <p><strong>우리는 무엇을 할 것인가?</strong></p>

            <hr />

            <p>앞의 세 가지 요소는 팀이 결정을 내릴 준비를 하도록 돕습니다.</p>

            <p>명확성은 문제를 이해하게 돕습니다.</p>

            <p>트레이드오프는 결과를 이해하게 돕습니다.</p>

            <p>우선순위는 무엇이 가장 중요한지 이해하게 돕습니다.</p>

            <p>하지만 팀이 결정을 내리지 못한다면 이 모든 것은 의미가 없습니다.</p>

            <hr />

            <p>결정 없이 끝나는 회의는 그냥 대화입니다.</p>

            <hr />

            <p>세 가지가 명확할 때 팀은 결정을 내린 것입니다.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["이해관계자", "누가 알아야 하는가? 회의실 안에만 존재하는 결정은 결정이 아닙니다."],
                ["책임", "누가 결과를 소유하는가? 책임 없이 결정은 제안이 됩니다."],
                ["다음 단계", "이제 무슨 일이 일어나는가? 회의 후 아무것도 바뀌지 않으면 결정은 실제로 이루어지지 않은 것입니다."],
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
              src="/mindbook/ktalk/slides/ch16d-stakeholders-accountability-nextstep.png"
              alt="Three-panel sequence: Stakeholders (three people thinking different thoughts) → Accountability (나만 믿어, 내가 쏜다) → Next Step (group boarding a bus toward Seoul Tower)"
              className="chapter-image"
            />

            <hr />

            <p>대부분의 조직에는 실행 시스템이 있습니다.</p>

            <p>디자인 시스템. 로드맵. 스프린트 계획. 엔지니어링 프로세스.</p>

            <p>하지만 의사결정 시스템을 가진 조직은 매우 드뭅니다.</p>

            <hr />

            <p>어떻게 결정을 내리는가?</p>

            <p>어떻게 결정을 전달하는가?</p>

            <p>어떻게 3개월 뒤 같은 문제를 다시 논의하지 않는가?</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>핵심 통찰</p>

            <p>
              조율의 시대에서 번창하는 조직은 가장 많은 아이디어를 만드는 조직이 아닙니다.
            </p>

            <p>
              꾸준히 논의를 결정으로, 결정을 행동으로 전환하는 조직입니다.
            </p>

            <hr />

            <p>왜냐하면 조율은 사람들이 이해할 때 완성되는 것이 아니기 때문입니다.</p>

            <p>조율은 사람들이 움직일 때 완성됩니다.</p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16d-decision-mindset.png"
              alt="Decision summary: STAKEHOLDERS (Decision Makers, Execution Partners, Impacted People) · ACCOUNTABILITY (Individual Accountability, Team Accountability, Organizational Accountability) · NEXT STEP (Immediate Next Step, Milestone Next Step, Outcome Next Step)"
              className="chapter-image"
            />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>마인드셋</p>

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>이해관계자</p>

            <p><strong>정렬은 자동으로 일어나지 않습니다.</strong></p>

            <p>의미 있는 모든 결정은 누군가에게 영향을 미칩니다.</p>

            <p>어떤 사람들은 승인해야 합니다.</p>

            <p>어떤 사람들은 구현해야 합니다.</p>

            <p>어떤 사람들은 그 영향을 받게 됩니다.</p>

            <p>훌륭한 조율자들은 결정이 문제가 되기 전에 이해관계자 구도를 이해합니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>결정 이해관계자</p>

            <p>결정을 내리는 데 누구의 의견이 필요한가?</p>

            <p>앞으로 나아가기 전에 입력이 필요한 사람들.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>실행 이해관계자</p>

            <p>결정을 구현하는 데 누가 도움을 주는가?</p>

            <p>결정을 현실로 만드는 책임을 가진 사람들.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>영향 이해관계자</p>

            <p>결정으로 인해 누가 영향을 받는가?</p>

            <p>결정이 내려진 후 그 결과와 함께 살아가야 하는 사람들.</p>

            <p>적절한 이해관계자 없이 내려진 결정은 종종 나중에 다시 논의되는 결정이 됩니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>책임</p>

            <p><strong>책임 없는 결정은 의견입니다.</strong></p>

            <p>많은 팀들이 결정을 내렸다고 생각합니다.</p>

            <p>사실은 합의에만 도달한 것입니다.</p>

            <p>누군가가 결과에 대한 책임을 수용할 때 결정은 현실이 됩니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>개인 책임</p>

            <p>직접적으로 책임지는 사람은 누구인가?</p>

            <p>작업을 앞으로 이끌어가는 사람.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>팀 책임</p>

            <p>어떤 책임이 그룹에 속하는가?</p>

            <p>함께 어떤 약속을 했는가?</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>조직 책임</p>

            <p>누가 궁극적으로 결과를 소유하는가?</p>

            <p>일이 잘 되거나 잘못될 때 — 조직 차원에서 누가 책임지는가?</p>

            <p>조직에서 높이 올라갈수록 책임이 더 많이 당신의 일이 됩니다.</p>

            <p>모든 결정을 내리기 때문이 아닙니다.</p>

            <p>결정에 소유자가 있도록 돕기 때문입니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>다음 단계</p>

            <p><strong>회의 후 아무것도 바뀌지 않으면 결정은 이루어지지 않은 것입니다.</strong></p>

            <p>많은 회의들이 합의로 끝납니다.</p>

            <p>추진력으로 끝나는 회의는 드뭅니다.</p>

            <p>훌륭한 조율자들은 결정을 행동으로 전환합니다.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>즉각적 다음 단계</p>

            <p>가장 먼저 무슨 일이 일어나는가?</p>

            <p>결정을 앞으로 이끄는 바로 다음 행동.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>마일스톤 다음 단계</p>

            <p>그 다음에는 무슨 일이 일어나는가?</p>

            <p>진전을 나타내는 핵심 체크포인트.</p>

            <p style={{ fontWeight: 600, marginTop: "var(--sp-4)" }}>결과 다음 단계</p>

            <p>결정이 효과가 있었는지 어떻게 알 수 있는가?</p>

            <p>우리가 기대하는 결과는 무엇인가?</p>

            <hr />

            <p>행동 없는 결정은 논의를 만들어냅니다.</p>

            <p>행동이 있는 결정은 진전을 만들어냅니다.</p>

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
