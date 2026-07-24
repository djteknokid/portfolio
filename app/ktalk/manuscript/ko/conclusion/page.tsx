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

const currentSlug = "conclusion";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter17Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>17장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>17</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>마치며</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/ktalk/manuscript/conclusion" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>저는 이 발표를 고백으로 시작했습니다.</p>

            <p>10년을 직책을 쫓으며 살았습니다.</p>

            <p>디자이너. 엔지니어. PM.</p>

            <p>그리고 최근에서야 그것들을 연결하는 패턴을 이해하게 되었습니다.</p>

            <hr />

            <p>그 패턴은 결코 기술(Craft)이 아니었습니다.</p>

            <p>항상 조율(Coordination)이었습니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>우리가 다룬 것들</p>

            <hr />

            <p>AI는 창작의 비용을 낮췄습니다.</p>

            <p>바닥이 올라갔습니다.</p>

            <p>우리는 이것을 전에도 본 적이 있습니다.</p>

            <hr />

            <p>디지털 카메라는 사진의 바닥을 올렸습니다.</p>

            <p>시장은 기술적인 이미지에 보상을 주는 것을 멈췄습니다.</p>

            <p>그 순간의 감정에 보상을 주기 시작했습니다.</p>

            <hr />

            <p>데이터 분석은 농구의 바닥을 올렸습니다.</p>

            <p>시장은 개인의 탁월함에 보상을 주는 것을 멈췄습니다.</p>

            <p>팀 효율성에 보상을 주기 시작했습니다.</p>

            <hr />

            <p>스트리밍은 음악의 바닥을 올렸습니다.</p>

            <p>시장은 노래 자체에 보상을 주는 것을 멈췄습니다.</p>

            <p>노래를 둘러싼 문화에 보상을 주기 시작했습니다.</p>

            <hr />

            <p>AI는 제품 개발의 바닥을 올리고 있습니다.</p>

            <p>시장은 이미 변하고 있습니다.</p>

            <p>결과물에 보상을 주는 것을 멈추고 있습니다.</p>

            <p>그 뒤에 있는 결정에 보상을 주기 시작하고 있습니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>신호들은 이미 거기에 있었습니다</p>

            <hr />

            <p>결과물은 만들기 쉬워지고 있습니다 — 그리고 차별화하기 어려워지고 있습니다.</p>

            <p>역할의 경계가 흐려지고 있습니다 — 디자이너는 코딩하고, 엔지니어는 프로토타이핑하고, PM은 출시합니다.</p>

            <p>불만의 내용이 바뀌었습니다 — 팀이 아이디어가 부족해서 막히는 것이 아닙니다.</p>

            <p>어떤 아이디어를 추구할지 결정하지 못해서 막히고 있습니다.</p>

            <hr />

            <p>그것이 신호입니다.</p>

            <p>창작은 풍부합니다.</p>

            <p>조율은 희소합니다.</p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>네 가지 요소</p>

            <hr />

            <p>
              조율은 소프트 스킬이 아닙니다. 성격 유형도 아닙니다.
              배울 수 있는 역량의 집합입니다.
            </p>

            <hr />

            <p>네 가지 요소가 있습니다.</p>

            <hr />

            <div style={{
              display: "grid",
              gridTemplateColumns: "120px 1fr",
              gap: "0",
              margin: "var(--sp-6) 0",
              maxWidth: "560px",
            }}>
              {[
                ["명확성",     "우리가 해결하려는 문제는 무엇인가?"],
                ["트레이드오프", "우리는 무엇을 희생할 의향이 있는가?"],
                ["우선순위",    "지금 가장 중요한 것은 무엇인가?"],
                ["결정",       "우리는 무엇을 할 것인가?"],
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

            <hr />

            <p>
              네 가지가 모두 갖춰지면 팀은 움직입니다.
            </p>

            <p>
              하나가 빠지면 팀은 멈춥니다 — 그리고 3개월 후 같은 대화를 반복합니다.
            </p>

            <hr />

            <p className="chapter-part-label" style={{ color: ACCENT, marginTop: "var(--sp-8)" }}>여러분에게 의미하는 것</p>

            <hr />

            <p>AI는 조율할 수 있는 사람들을 대체하지 않을 것입니다.</p>

            <p>그들을 더 가치 있게 만들 것입니다.</p>

            <hr />

            <p>왜냐하면 모두가 선택지를 만들어낼 수 있을 때,</p>

            <p>그룹이 선택하도록 돕는 사람이 필수 불가결해지기 때문입니다.</p>

            <hr />

            <p>모두가 결과물을 만들 수 있을 때,</p>

            <p>팀이 올바른 문제에 정렬하도록 돕는 사람이 희소해지기 때문입니다.</p>

            <hr />

            <p>모두가 빠르게 움직일 수 있을 때,</p>

            <p>팀이 함께 움직이도록 돕는 사람이 대체 불가능해지기 때문입니다.</p>

            <hr />

            <p>바닥이 계속 올라갈 것인지의 문제가 아닙니다.</p>

            <p>올라갈 것입니다.</p>

            <hr />

            <p>문제는 그 위에 여러분이 무엇을 쌓고 있느냐입니다.</p>

            <hr />

            <p>사진에서 결혼식으로.</p>

            <p>선수에서 팀으로.</p>

            <p>노래에서 문화로.</p>

            <p>결과물에서 의사결정으로.</p>

            <hr />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mindbook/ktalk/slides/ch17-conclusion.png"
              alt="A group of people standing together facing mountains, with one person at the center holding a flag — the coordinator leading the team forward"
              className="chapter-image"
            />

            <hr />

            <p>AI는 바닥을 올릴 것입니다.</p>

            <p>여러분의 일은 천장을 올리는 것입니다.</p>

            <p>그리고 천장을 올리는 방법은 조율하는 사람이 되는 것입니다.</p>

            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 700,
              marginTop: "var(--sp-8)",
            }}>감사합니다.</p>

            <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.10)", margin: "var(--sp-10) 0 var(--sp-8)" }} />

            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-light)",
            }}>
              원고 끝 · 조율의 시대 / The Coordination Era
            </p>

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
