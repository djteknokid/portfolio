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

const currentSlug = "pattern";
const currentIndex = chapters.findIndex(c => c.slug === currentSlug);
const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

export default function Chapter7Ko() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ManuscriptSidebarKo chapters={chapters} currentSlug={currentSlug} />

      <main className="chapter-page">
        <article className="chapter-content">
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>
            <p className="chapter-part-label" style={{ color: ACCENT }}>7장</p>
            <p className="chapter-part-subtitle">조율의 시대 · The Coordination Era</p>
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div className="chapter-ghost-number" aria-hidden="true"
                style={{ position: "absolute", top: "-0.15em", left: "-0.05em", zIndex: 0 }}>7</div>
              <h1 className="chapter-title" style={{ position: "relative", zIndex: 1 }}>패턴</h1>
            </div>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              color: "var(--ink-muted)",
              marginTop: "var(--sp-4)",
              letterSpacing: "0.04em",
            }}>
              <Link href="/koreatalk/manuscript/pattern" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
                Read in English →
              </Link>
            </p>
          </div>

          <div className="chapter-body">

            <p>좋습니다.</p>

            <p>이제 두 이야기를 나란히 놓고 봅시다.</p>

            <p>한 명의 웨딩 사진작가.</p>

            <p>그리고 한 명의 NBA 센터.</p>

            <hr />

            <p>겉으로 보기에는 전혀 관련이 없어 보입니다.</p>

            <p>한 사람은 사진을 찍고,</p>

            <p>한 사람은 농구를 합니다.</p>

            <hr />

            <p>하지만 저는 사실 같은 이야기라고 생각합니다.</p>

            <hr />

            <p>두 경우 모두 새로운 기술이 등장했습니다.</p>

            <hr />

            <p>사진에서는 디지털 카메라.</p>

            <p>농구에서는 데이터 분석.</p>

            <hr />

            <p>AI도 아닙니다.</p>

            <p>AGI도 아닙니다.</p>

            <p>엄청난 미래 기술도 아닙니다.</p>

            <hr />

            <p>
              그저 원래는 희소했던 능력을
              더 많은 사람들이 사용할 수 있게 만든 새로운 도구였습니다.
            </p>

            <hr />

            <p>그리고 그 순간,</p>

            <p>흥미로운 일이 벌어졌습니다.</p>

            <hr />

            <p>바닥이 올라갔습니다.</p>

            <hr />

            <p>사진에서는 더 많은 사람들이 좋은 사진을 찍을 수 있게 되었습니다.</p>

            <p>
              농구에서는 더 많은 선수들이 승리하는 농구가 무엇인지 이해하게 되었습니다.
            </p>

            <hr />

            <p>바닥이 올라간 것입니다.</p>

            <hr />

            <p>그리고 바닥이 올라가자</p>

            <p>시장은 더 이상 예전과 같은 것을 보상하지 않기 시작했습니다.</p>

            <hr />

            <p>물론 하루아침에 일어난 일은 아닙니다.</p>

            <p>하지만 결국 그렇게 되었습니다.</p>

            <hr />

            <p>살아남은 사진작가는</p>

            <p>사진을 조금 더 선명하게 찍는 사람이 아니었습니다.</p>

            <hr />

            <p>결혼식을 더 특별하게 만드는 사람이었습니다.</p>

            <hr />

            <p>살아남은 센터는</p>

            <p>골밑 플레이를 조금 더 잘하는 사람이 아니었습니다.</p>

            <hr />

            <p>새로운 농구에서 팀이 승리하도록 돕는 사람이었습니다.</p>

            <hr />

            <p>여기서 무슨 일이 벌어지고 있는 걸까요?</p>

            <hr />

            <p>KPI가 바뀌었습니다.</p>

            <hr />

            <p>그리고 새로운 KPI는 더 커졌습니다.</p>

            <hr />

            <p>사진(Photo)</p>

            <p>→ 결혼식(Wedding)</p>

            <hr />

            <p>선수(Player)</p>

            <p>→ 팀(Team)</p>

            <hr />

            <p>가치의 단위가 확장된 것입니다.</p>

            <hr />

            <p>그리고 그 순간 저는 깨달았습니다.</p>

            <hr />

            <p>이건 두 개의 이야기가 아닙니다.</p>

            <hr />

            <p>하나의 이야기입니다.</p>

            <p>계속 반복되는 하나의 패턴입니다.</p>

            <hr />

            <p><strong>패턴</strong></p>

            <p>
              저는 모든 기술 혁신이 거의 비슷한 순서로 움직인다고 생각합니다.
            </p>

            <hr />

            <p><strong>1단계. 기술이 바닥을 올린다.</strong></p>

            <p>원래는 희소했던 능력이</p>

            <p>더 많은 사람들에게 열립니다.</p>

            <p>더 많은 사람들이 할 수 있게 되고,</p>

            <p>더 많은 사람들이 참여하게 되고,</p>

            <p>더 많은 사람들이 만들 수 있게 됩니다.</p>

            <hr />

            <p><strong>2단계. 시장이 KPI를 바꾼다.</strong></p>

            <p>원래 당신을 특별하게 만들던 것이</p>

            <p>평범해집니다.</p>

            <p>그리고 시장은 더 큰 가치를 보상하기 시작합니다.</p>

            <p>가치의 단위가 확장됩니다.</p>

            <hr />

            <p><strong>3단계. 전문가가 천장을 올린다.</strong></p>

            <p>성공하는 사람들은</p>

            <p>예전 KPI를 지키려는 사람들이 아닙니다.</p>

            <p>
              가치가 어디로 이동하는지 발견하고,
              그 방향으로 자신의 영향력을 확장하는 사람들입니다.
            </p>

            <hr />

            <p>기술은 바닥을 올립니다.</p>

            <p>시장은 KPI를 바꿉니다.</p>

            <p>전문가는 천장을 올립니다.</p>

            <hr />

            <p>
              이 패턴을 보고 나니까
              갑자기 다른 산업에서도 같은 현상이 보이기 시작했습니다.
            </p>

            <div style={{
              maxWidth: "680px",
              margin: "var(--sp-6) auto",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              {[
                ["기술 변화", "올라간 바닥", "새로운 KPI"],
                ["Desktop Publishing", "레이아웃 제작", "커뮤니케이션 & 브랜딩"],
                ["Digital Photography", "사진 촬영", "스토리텔링 & 경험"],
                ["Website Builders", "웹사이트 제작", "제품 전략"],
                ["YouTube + 스마트폰", "영상 제작", "오디언스 & 유통"],
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.2fr 1.4fr",
                  background: i === 0 ? "rgba(0,0,0,0.04)" : "transparent",
                  borderBottom: i < 4 ? "1px solid rgba(0,0,0,0.06)" : "none",
                }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "12px 16px",
                      fontFamily: i === 0
                        ? "var(--font-inter), system-ui, sans-serif"
                        : "var(--font-playfair), Georgia, serif",
                      fontSize: i === 0 ? "11px" : "16px",
                      fontWeight: i === 0 ? 700 : j === 0 ? 700 : 400,
                      fontStyle: i > 0 && j === 1 ? "italic" : "normal",
                      letterSpacing: i === 0 ? "0.1em" : "normal",
                      textTransform: i === 0 ? "uppercase" : "none",
                      color: i === 0 ? "var(--ink-muted)" : j === 1 ? "var(--ink-muted)" : "var(--ink)",
                    }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p>산업은 다릅니다.</p>

            <p>도구도 다릅니다.</p>

            <hr />

            <p>하지만 패턴은 같습니다.</p>

            <hr />

            <p>여기서 제가 여러분께 꼭 봐주셨으면 하는 부분이 있습니다.</p>

            <hr />

            <p>오른쪽 열을 보세요.</p>

            <hr />

            <p>커뮤니케이션.</p>

            <p>브랜딩.</p>

            <p>스토리텔링.</p>

            <p>전략.</p>

            <p>오디언스.</p>

            <p>유통.</p>

            <hr />

            <p>이것들은 결과물 자체에 대한 이야기가 아닙니다.</p>

            <hr />

            <p>영향력에 대한 이야기입니다.</p>

            <p>성과에 대한 이야기입니다.</p>

            <p>
              내가 만드는 것을 넘어
              얼마나 큰 영향을 만들 수 있는가에 대한 이야기입니다.
            </p>

            <hr />

            <p>이제 마지막 한 줄을 추가해 보겠습니다.</p>

            <div style={{
              maxWidth: "680px",
              margin: "var(--sp-6) auto",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: "8px",
              overflow: "hidden",
            }}>
              {[
                ["기술 변화", "올라간 바닥", "새로운 KPI"],
                ["AI", "결과물 생성", "?"],
              ].map((row, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.2fr 1.4fr",
                  background: i === 0
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(188,113,85,0.07)",
                  borderBottom: i === 0 ? "1px solid rgba(0,0,0,0.06)" : "none",
                }}>
                  {row.map((cell, j) => (
                    <div key={j} style={{
                      padding: "12px 16px",
                      fontFamily: i === 0
                        ? "var(--font-inter), system-ui, sans-serif"
                        : "var(--font-playfair), Georgia, serif",
                      fontSize: i === 0 ? "11px" : "16px",
                      fontWeight: i === 0 ? 700 : j === 0 ? 700 : 400,
                      fontStyle: i > 0 && j === 1 ? "italic" : "normal",
                      letterSpacing: i === 0 ? "0.1em" : "normal",
                      textTransform: i === 0 ? "uppercase" : "none",
                      color: i === 0 ? "var(--ink-muted)" : j === 1 ? "var(--ink-muted)" : "var(--ink)",
                    }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <hr />

            <p>그리고 저는 지금 우리가 모두 이 질문에 답하려고 하고 있다고 생각합니다.</p>

            <hr />

            <p>왜냐하면 AI는 조금 다르기 때문입니다.</p>

            <hr />

            <p>사진은 사진의 바닥을 올렸습니다.</p>

            <p>농구 데이터 분석은 농구를 바꿨습니다.</p>

            <hr />

            <p>하지만 AI는 훨씬 더 넓은 영역의 바닥을 올리고 있습니다.</p>

            <hr />

            <p>디자인.</p>

            <p>코드.</p>

            <p>리서치.</p>

            <p>글쓰기.</p>

            <p>프로토타이핑.</p>

            <hr />

            <p>어쩌면 창작(Creation) 자체의 바닥을 올리고 있는지도 모릅니다.</p>

            <hr />

            <p>그렇다면,</p>

            <p>이 패턴이 계속 반복된다면,</p>

            <p>그리고 저는 그렇게 믿고 있습니다.</p>

            <hr />

            <p>우리는 같은 일이 다시 일어날 것이라고 예상해야 합니다.</p>

            <hr />

            <p>1단계는 이미 끝났습니다.</p>

            <hr />

            <p>기술이 바닥을 올렸습니다.</p>

            <p>우리는 지금 그 한가운데에 있습니다.</p>

            <hr />

            <p>이제 진짜 질문은 2단계입니다.</p>

            <hr />

            <p>시장은 이제 무엇을 보상하기 시작하고 있을까?</p>

            <hr />

            <p>왜냐하면 그 답이 있는 곳에</p>

            <p>다음 기회가 있기 때문입니다.</p>

            <hr />

            <p>그 답이 있는 곳에</p>

            <p>다음 병목이 있기 때문입니다.</p>

            <hr />

            <p>그 답이 있는 곳에</p>

            <p>다음 세대의 전문가들이 가치를 만드는 곳이 있기 때문입니다.</p>

            <hr />

            <p>저는 그 답을 알고 있다고 생각합니다.</p>

            <hr />

            <p>
              하지만 그 이야기를 하기 전에,
              왜 제가 그렇게 생각하게 되었는지 보여주는 세 가지 신호를 먼저 보여드리겠습니다.
            </p>

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
