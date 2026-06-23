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

const currentSlug = "how-to-raise/clarity";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter16aKo() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>16a장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>1</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>명확성</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-3)",
              fontStyle: "italic",
            }}>
              조율의 네 가지 요소 중 1번째
            </p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/how-to-raise/clarity" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p className="chapter-part-label" style={{ color: ACCENT }}>핵심 질문</p>
            <p><strong>우리가 해결하려는 문제는 무엇인가?</strong></p>

            <hr />

            <p>팀이 명확성을 갖추었다는 것은 세 가지에 답할 수 있다는 것입니다.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["사용자", "우리는 누구를 위해 해결하는가?"],
                ["문제", "그들이 겪고 있는 구체적인 문제는 무엇인가?"],
                ["성공", "우리가 해결했다는 것을 어떻게 알 수 있는가?"],
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
              src="/mindbook/ktalk/slides/ch16a-user-problem-success.png"
              alt="Three-panel sequence: User (traveller at airport) → Problem (struggling with heavy luggage) → Success (walking confidently with rolling bag)"
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

            <p>
              저는 의도적으로 <strong>해결책</strong>을 제외했습니다.
            </p>

            <p>해결책을 포함하면 팀이 너무 빨리 그쪽으로 달려가기 때문입니다.</p>

            <p>사용자 → 문제 → 성공. 이 순서가 맞습니다.</p>

            <p>이 세 가지가 명확해지면 팀은 많은 해결책을 만들어낼 수 있습니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>예시</p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["사용자", "신규 영업 담당자"],
                ["문제", "잠재 고객 리서치에 3시간이 걸린다"],
                ["성공", "리서치를 10분 이내에 완료"],
              ].map(([label, value]) => (
                <>
                  <div key={`el-${label}`} style={{
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
                  <div key={`ev-${label}`} style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "15px",
                    color: "var(--ink)",
                    lineHeight: 1.5,
                  }}>
                    {value}
                  </div>
                </>
              ))}
            </div>

            <hr />

            <p>이제 팀은 많은 해결책을 만들어낼 수 있습니다.</p>

            <p>
              해결책 공간은 열려 있습니다. 하지만 문제 공간은 닫혀 있습니다.
            </p>

            <p>
              그것이 끝없이 논쟁하는 팀과 앞으로 나아가는 팀의 차이입니다.
            </p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch16a-clarity-mindset.png"
              alt="Clarity summary: USER (Bring the user into the room, User Segmentation, User Needs & Goals) · PROBLEM (Don't stop at the symptom, Root Cause Analysis, Problem Framing) · SUCCESS (Start with the finish line, Success Metrics, Experimentation & Iteration)"
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

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>사용자</p>

            <p><strong>항상 사용자를 방 안으로 데려오세요.</strong></p>

            <p>논의가 추상적이 될 때, 실제 사람으로 돌아오세요.</p>

            <p>이렇게 묻지 마세요:</p>

            <blockquote>&ldquo;어떤 기능을 만들어야 하나?&rdquo;</blockquote>

            <p>이렇게 물으세요:</p>

            <blockquote>&ldquo;지금 누가 어려움을 겪고 있는가?&rdquo;</blockquote>

            <p>명확성을 만드는 사람들은 사용자가 없을 때 사용자의 목소리가 됩니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>문제</p>

            <p><strong>증상에서 멈추지 마세요.</strong></p>

            <p>계속 파고드세요.</p>

            <p>요청은 문제가 아닙니다.</p>

            <p>불만은 문제가 아닙니다.</p>

            <p>해결책은 절대 문제가 아닙니다.</p>

            <p>훌륭한 조율자들은 끊임없이 호기심을 갖습니다.</p>

            <p>그들은 계속 묻습니다:</p>

            <blockquote>&ldquo;왜 이런 일이 일어나고 있는가?&rdquo;</blockquote>

            <p>팀이 근본 원인에 도달할 때까지.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>성공</p>

            <p><strong>결승선에서 시작하세요.</strong></p>

            <p>해결책을 논의하기 전에, 성공이 어떤 모습인지 알아야 합니다.</p>

            <p>성공은 지표일 수 있습니다.</p>

            <p>성공은 행동 변화일 수 있습니다.</p>

            <p>성공은 비즈니스 결과일 수 있습니다.</p>

            <p>하지만 반드시 눈에 보여야 합니다.</p>

            <p>
              팀이 성공을 인식하지 못하면, 올바른 방향으로 가고 있는지 알 수 없기 때문입니다.
            </p>

            <p>그리고 가장 중요한 것:</p>

            <p>성공은 끝이 아닙니다.</p>

            <p>성공은 피드백입니다.</p>

            <p>모든 디자인은 가설입니다.</p>

            <p>목표는 맞는 것이 아닙니다.</p>

            <p>목표는 배우고, 반복하고, 진실에 가까워지는 것입니다.</p>

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
