"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const T = {
  obsidian: "#000d10",
  white:    "#ffffff",
  stone:    "#8e8e95",
  sienna:   "#bc7155",
  cream:    "#F7F2EA",
};

type SlideData = {
  id: number;
  image: string | null;
  overlay: string;
  textColor: string;
  muteColor: string;
  tag?: string;
  chapter?: string;
  title: string;
  subtitle?: string;
  body?: string;
  quote?: string;
  isHero?: boolean;
  isStatement?: boolean;
  layout?: "split-top";
  mindsets?: { label: string; rule: string }[];
  script?: string;
};

const BASE = "/mindbook/ktalk/slides";

const slides: SlideData[] = [
  /* ── HERO ── */
  {
    id: 1,
    image: `${BASE}/ch14-coordination-era.png`,
    overlay: "rgba(0,13,16,0.72)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Korea Tour · 2026",
    title: "The Coordination Era",
    subtitle: "조율의 시대",
    isHero: true,
  },

  /* ── CH 1 ── */
  {
    id: 2,
    image: `${BASE}/ch1-career-path.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Intro",
    chapter: "소개",
    title: "안녕하세요. David Lee입니다.",
    body: "GoPro → Google Designer → Google AI UX Engineer → SAP Designer → SAP Principal PM",
    layout: "split-top",
    script: `안녕하세요. David Lee입니다.\n\n현재 SAP에서 Principal Product Manager로 일하고 있습니다.\n\n그 전에는 SAP에서 Product Designer로 일하다가 최근 Product Manager로 전환했습니다.\n\n그 전에는 Google AI Labs에서 UX Engineer로 일했고,\n\n그 전에는 Google에서 Product Designer로 일했습니다.`,
  },
  {
    id: 3,
    image: `${BASE}/ch1-ai-noise.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "매일 새로운 AI 툴, 워크플로우, 불안감이 쌓입니다.",
    quote: "하지만 오늘은 프롬프트 이야기가 아닙니다.",
    layout: "split-top",
    script: `매일 새로운 AI 툴이 나옵니다.\n\n새로운 워크플로우가 나옵니다.\n\n새로운 프레임워크가 나옵니다.\n\n새로운 프롬프트가 나옵니다.\n\n그리고 새로운 불안감도 하나씩 추가됩니다.\n\n특히 디자이너라면 더 그렇죠.\n\n솔직히 저도 그랬습니다.\n\n하지만 오늘 이 이야기는 프롬프트에 대한 이야기가 아닙니다.\n\n에이전트에 대한 이야기도 아닙니다.\n\nMCP에 대한 이야기도 아닙니다.\n\n어떤 모델이 더 좋은지 비교하는 이야기는 더더욱 아닙니다.\n\n그런 건 이미 잘 설명해 주시는 분들이 많습니다.`,
  },
  {
    id: 4,
    image: `${BASE}/ch1-coordination-era.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Big Idea",
    title: "조율의 시대",
    body: "디자이너가 코딩하고, PM이 프로토타입을 만들고, 엔지니어가 UX 피드백을 줍니다. 역할의 경계가 흐려지고 있습니다.",
    layout: "split-top",
    script: `제가 이야기하고 싶은 건 우리가 놓치고 있는 무언가입니다.\n\n지난 1년 동안 저는 대기업 안에서 AI 제품을 만들면서 이상한 현상을 계속 목격했습니다.\n\n디자이너가 코딩을 하기 시작했습니다.\n\nPM이 프로토타입을 만들기 시작했습니다.\n\n엔지니어가 UX 피드백을 주기 시작했습니다.\n\nAI는 그 모든 일을 조금씩 하기 시작했습니다.\n\n역할의 경계가 흐려지기 시작한 겁니다.\n\n처음에는 디자인의 문제라고 생각했습니다.\n\n그 다음에는 AI의 문제라고 생각했습니다.\n\n그런데 지금은 더 큰 무언가라고 생각합니다.\n\n오늘 이야기는 바로 그것에 대한 이야기입니다.\n\n저는 그것을 조율의 시대 (The Coordination Era)라고 부릅니다.\n\n앞으로 45분 동안 저는 여러분을 설득해 보려고 합니다.\n\n앞으로 우리에게 가장 큰 기회는 더 빨리 만드는 법을 배우는 것이 아닐 수도 있다는 것을.\n\n오히려 더 잘 정렬하고, 더 잘 조율하는 법을 배우는 것일 수도 있다는 것을 말입니다.\n\n하지만 그 이야기를 하기 전에, 왜 제가 그런 결론에 도달했는지 먼저 보여드려야 할 것 같습니다.`,
  },

  /* ── CH 3 ── */
  {
    id: 7,
    image: `${BASE}/ch3-design-review.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Shock",
    title: "충격",
    body: "PM이 디자인 리뷰에 완성된 프로토타입을 들고 왔습니다. 피그마도 아니고, 실제 코드로 만든 고퀄리티 결과물이었습니다.",
    layout: "split-top",
    script: `하나의 장면을 상상해 보겠습니다.\n\nPM이 디자인 리뷰에 들어옵니다.\n\nPRD를 들고 온 게 아닙니다.\n\n와이어프레임을 들고 온 게 아닙니다.\n\n프로토타입을 들고 왔습니다.\n\n하이 피델리티. 실제 컴포넌트. 인터랙티브. 코드로 만든 것. 하룻밤 만에.\n\n그 방 안에 있는 디자이너는 그것을 보고 한 가지 생각을 합니다.\n\n그래서… 내가 여기 왜 있지?\n\n저는 이 순간에 잠깐 머물고 싶습니다.\n\n그냥 넘어가지 않고.\n\n다시 프레이밍하지도 않고.\n\n안심시키지도 않고.\n\n그냥 그 순간에 머물러 보겠습니다.`,
  },
  {
    id: 8,
    image: `${BASE}/ch3-pm-sketch.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "\"그래서 내가 여기 왜 있지?\"",
    body: "디자이너 = AI 노출 직군 1위 (Tufts University). PM 채용은 늘고, 디자이너 채용은 줄고 있습니다.",
    layout: "split-top",
    script: `사실 이건 새로운 일이 아닙니다.\n\nPM은 항상 시각적 산출물을 들고 왔습니다.\n\n스케치. 다이어그램. 경쟁사 스크린샷. 대략적인 목업. 파워포인트 슬라이드. 냅킨 그림.\n\nPM은 항상 아이디어를 시각적으로 전달하려 했습니다.\n\n그게 바뀐 게 아닙니다.`,
  },
  {
    id: 9,
    image: `${BASE}/ch3-speed-vs-fidelity.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "속도 vs 완성도",
    quote: "PM의 의도는 변하지 않았습니다. 신호가 바뀐 겁니다.",
    layout: "split-top",
    script: `바뀐 것은 두 가지입니다.\n\n속도. 예전에는 며칠이 걸리던 것이 이제는 한 시간이면 됩니다. 때로는 그보다 짧기도 합니다.\n\nPM은 AI에게 아이디어를 설명하고 거의 즉시 무언가 구체적인 것을 돌려받을 수 있습니다.\n\n그리고 두 번째는: 완성도.\n\n예전의 산출물은 거칠었습니다. 박스. 화살표. 회색 사각형.\n\n아무도 그걸 최종 결과물로 착각하지 않았습니다.\n\n거칠다는 것 자체가 신호였습니다. 방 안의 모든 사람에게 말하고 있었습니다: "이건 시작점입니다."`,
  },
  {
    id: 10,
    image: `${BASE}/ch3-designer-overwhelmed.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "압도감",
    body: "AI는 실행 병목을 제거했습니다. 하지만 조율 병목은 여전히 활짝 열려 있습니다.",
    layout: "split-top",
    script: `그 회의실 안에 있던 디자이너는 과민반응한 게 아닙니다.\n\n상황을 정확하게 읽고 있었던 겁니다.\n\n무언가가 바뀌었습니다.\n\n내가 여기 왜 있지?\n\n그건 진짜 질문입니다.\n\n그리고 진짜 대답을 받을 자격이 있는 질문입니다.`,
  },

  /* ── CH 4 ── */
  {
    id: 11,
    image: `${BASE}/ch4-pm-explains.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Why This Is Happening",
    title: "왜 이런 일이 생기는가",
    body: "PM은 항상 시각 산출물을 들고 왔습니다. 달라진 건 속도와 완성도뿐입니다.",
    layout: "split-top",
    script: `이제 테이블 반대편 — PM 쪽 이야기를 해보겠습니다.\n\n저는 지금 그 자리에 앉아 있으니까요.\n\n제가 프로토타입을 들고 올 때, 디자이너의 역할을 빼앗으려는 게 아닙니다.\n\n솔직히 말하면, 프로토타입은 제가 더 빠르게 소통하려는 시도입니다.\n\n그게 전부입니다.\n\n시각적 산출물. 대화의 시작점. 제가 생각하는 것을 설명하는 방법.`,
  },
  {
    id: 12,
    image: `${BASE}/ch4-value-question.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "가치 질문",
    quote: "이건 역할 질문이 아니었습니다. 항상 가치 질문이었습니다 — AI가 그걸 가려주던 마찰을 제거한 겁니다.",
    layout: "split-top",
    script: `그리고 그때 저는 무언가를 깨달았습니다.\n\n이건 애초에 역할 질문이 아니었다는 것을.\n\n항상 가치 질문이었습니다.`,
  },

  /* ── CH 5 ── */
  {
    id: 13,
    image: `${BASE}/ch5-floor-raised.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Floor Has Been Raised",
    title: "바닥이 올라갔다",
    body: "기술이 희소했던 기술을 접근 가능하게 만들면, 바닥이 올라갑니다. 이건 항상 그랬습니다.",
    layout: "split-top",
    script: `이제부터 이 발표 전체를 관통하는 중요한 개념 하나를 소개하고 싶습니다.\n\n기술은 바닥(Floor)을 올립니다.\n\n항상 그래왔습니다.\n\n그리고 저는 지금도 같은 일이 벌어지고 있다고 생각합니다.`,
  },
  {
    id: 14,
    image: `${BASE}/ch5-film-photographer.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "필름 사진작가의 이야기",
    body: "디지털 카메라가 등장했을 때 사진의 바닥이 올라갔습니다. 더 많은 사람이 좋은 사진을 찍을 수 있게 됐습니다.",
    layout: "split-top",
    script: `디지털 카메라가 등장하기 전, 사진작가는 굉장히 특별한 직업이었습니다.\n\n비싼 장비가 있었고, 필름을 이해했고, 조명을 이해했고, 다른 사람들이 놓치는 순간을 포착할 수 있었습니다.\n\n특히 결혼식이라면 더 그랬습니다.\n\n아마 그 공간에서 그 하루를 제대로 기록할 수 있는 유일한 사람이었을 겁니다.\n\n당시 KPI는 아주 단순했습니다.\n\n좋은 사진을 찍을 수 있는가?\n\n그것이 직업이었고, 그것이 가치였습니다.`,
  },
  {
    id: 15,
    image: `${BASE}/ch5-wedding-photographer.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "살아남은 사진작가",
    quote: "조금 더 선명한 사진을 찍은 사람이 아니라, 결혼식을 더 기억에 남게 만든 사람이 살아남았습니다.",
    layout: "split-top",
    script: `성공한 사진작가들은 이런 질문을 하지 않았습니다.\n\n"어떻게 하면 사진을 조금 더 선명하게 찍을 수 있을까?"\n\n대신 이런 질문을 했습니다.\n\n"어떻게 하면 이 결혼식을 잊지 못할 경험으로 만들 수 있을까?"\n\n완전히 다른 질문입니다.`,
  },

  /* ── CH 6 ── */
  {
    id: 16,
    image: `${BASE}/ch6-nba-center.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The NBA Story",
    title: "NBA 이야기",
    body: "Nikola Jokić은 센터입니다. 하지만 그를 설명하는 데 포지션은 충분하지 않습니다.",
    layout: "split-top",
    script: `90년대 농구를 보셨던 분들은 기억하실 겁니다.\n\n그때 농구는 굉장히 단순했습니다.\n\n센터는 골밑에 있었습니다.\n\n파워포워드도 골밑에 있었습니다.\n\n역할도 명확했습니다.\n\n리바운드. 블락. 골밑 득점.\n\n자기 역할을 하면 됐습니다. 자기 자리에서. 자기 방식으로.`,
  },
  {
    id: 17,
    image: `${BASE}/ch6-three-point.png`,
    overlay: "rgba(0,13,16,0.72)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "3점 슛 혁명",
    body: "NBA 센터들의 3점 슛 시도 1985–2025. 역할이 사라진 게 아닙니다. 포지션으로 정의되는 것을 멈췄습니다.",
    layout: "split-top",
    script: `그런데 어느 순간 무언가가 바뀌었습니다.\n\n새로운 규칙이 생긴 것도 아니었습니다.\n\n새로운 기술이 등장한 것도 아니었습니다.\n\n새로운 이해가 등장했습니다.\n\n데이터 분석. Analytics.\n\n팀들이 농구를 보는 방식이 달라지기 시작했습니다.\n\n그리고 한 가지 사실을 발견했습니다.\n\n3점슛이 생각보다 훨씬 가치 있다는 것이었습니다.`,
  },
  {
    id: 18,
    image: `${BASE}/ch6-modern-bigs.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "모던 빅맨",
    body: "시스템은 점점 더 개인의 고유한 역량을 극대화하는 방향으로 진화합니다.",
    layout: "split-top",
    script: `그리고 오늘날 NBA를 보면 정확히 그런 방향으로 흘러왔습니다.\n\n니콜라 요키치. 빅터 웸반야마. 칼 앤서니 타운스.\n\n최고의 선수들은 더 이상 포지션으로 정의되지 않습니다.\n\n능력으로 정의됩니다.\n\n"이 선수가 팀의 승리에 무엇을 기여할 수 있는가?"`,
  },
  {
    id: 19,
    image: `${BASE}/ch6-playbook.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "플레이북",
    quote: "AI 시대가 역할을 없애는 게 아닙니다. 1차원 전문가를 노출시키는 겁니다 — 분석이 일차원 선수를 노출시켰던 것처럼.",
    layout: "split-top",
    script: `골든스테이트 워리어스를 생각해 보세요.\n\n사람들은 커리를 이야기합니다. 클레이를 이야기합니다. 듀란트를 이야기합니다.\n\n하지만 그 팀을 특별하게 만든 것은 개인의 재능이 아니었습니다.\n\nNBA에는 원래 재능 있는 선수들이 많았습니다.\n\n워리어스를 특별하게 만든 것은 조율이었습니다.\n\n그들은 같은 코트를 읽는 언어를 가지고 있었습니다.\n\n누가 어디에 있을지 알고 있었습니다.\n\n누가 무엇을 하려고 하는지 알고 있었습니다.\n\n그래서 더 빠르게 움직일 수 있었습니다. 서로를 더 잘 이해했기 때문입니다.`,
  },

  /* ── CH 7 ── */
  {
    id: 20,
    image: `${BASE}/ch7-photographer-player.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Pattern",
    title: "패턴",
    body: "웨딩 사진작가 한 명과 NBA 센터 한 명. 겉으로는 공통점이 없습니다. 하지만 같은 이야기입니다.",
    layout: "split-top",
    script: `좋습니다.\n\n이제 두 이야기를 나란히 놓고 봅시다.\n\n한 명의 웨딩 사진작가. 그리고 한 명의 NBA 센터.\n\n겉으로 보기에는 전혀 관련이 없어 보입니다.\n\n한 사람은 사진을 찍고, 한 사람은 농구를 합니다.\n\n하지만 저는 사실 같은 이야기라고 생각합니다.`,
  },
  {
    id: 21,
    image: `${BASE}/ch7-who-survived.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "누가 살아남았나",
    body: "바닥이 올라가면, 시장은 예전 것에 보상을 멈춥니다. KPI가 바뀝니다. 가치의 단위가 확장됩니다.",
    layout: "split-top",
    script: `그리고 바닥이 올라가자 시장은 더 이상 예전과 같은 것을 보상하지 않기 시작했습니다.\n\n물론 하루아침에 일어난 일은 아닙니다. 하지만 결국 그렇게 되었습니다.\n\n살아남은 사진작가는 사진을 조금 더 선명하게 찍는 사람이 아니었습니다.\n\n결혼식을 더 특별하게 만드는 사람이었습니다.\n\n살아남은 센터는 골밑 플레이를 조금 더 잘하는 사람이 아니었습니다.\n\n새로운 농구에서 팀이 승리하도록 돕는 사람이었습니다.`,
  },
  {
    id: 22,
    image: `${BASE}/ch7-three-steps.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "3단계 패턴",
    body: "Step 1. 기술이 바닥을 올린다. → Step 2. 시장이 KPI를 바꾼다. → Step 3. 전문가가 천장을 높인다.",
    layout: "split-top",
    script: `저는 모든 기술 혁신이 거의 비슷한 순서로 움직인다고 생각합니다.\n\n1단계. 기술이 바닥을 올린다.\n원래는 희소했던 능력이 더 많은 사람들에게 열립니다. 더 많은 사람들이 할 수 있게 되고, 참여하게 되고, 만들 수 있게 됩니다.\n\n2단계. 시장이 KPI를 바꾼다.\n원래 당신을 특별하게 만들던 것이 평범해집니다. 시장은 더 큰 가치를 보상하기 시작합니다. 가치의 단위가 확장됩니다.\n\n3단계. 전문가가 천장을 올린다.\n성공하는 사람들은 예전 KPI를 지키려는 사람들이 아닙니다. 가치가 어디로 이동하는지 발견하고, 그 방향으로 자신의 영향력을 확장하는 사람들입니다.`,
  },
  {
    id: 23,
    image: `${BASE}/ch7-pattern-table.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Pattern",
    title: "기술이 바닥을 올릴 때마다 시장은 새로운 가치를 보상합니다.",
    layout: "split-top",
    script: `기술은 바닥을 올립니다.\n\n시장은 KPI를 바꿉니다.\n\n전문가는 천장을 올립니다.\n\n이 패턴을 보고 나니까 갑자기 다른 산업에서도 같은 현상이 보이기 시작했습니다.`,
  },

  /* ── CH 8 ── */
  {
    id: 24,
    image: `${BASE}/ch8-artifact-overflow.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Signal 1 — Artifact Creation",
    title: "신호 1 — 산출물이 넘쳐난다",
    body: "AI 이전: 아이디어 100개, 결과물 10개. AI 이후: 아이디어 100개, 결과물 100개. 병목이 이동했습니다.",
    layout: "split-top",
    script: `지난 1년 동안 저는 대기업 안에서 AI 제품을 만들고 있었습니다.\n\n그리고 솔직히 말하면, 저는 앞으로 무슨 일이 일어날지 어느 정도 알고 있다고 생각했습니다.\n\nAI가 팀을 더 빠르게 만들 것이라고 생각했습니다.\n\n더 많은 것을 만들고, 더 많은 프로토타입을 만들고, 더 많은 실험을 하고, 더 많은 것을 출시하게 될 것이라고 생각했습니다.\n\n그리고 실제로 그 모든 일이 일어났습니다. 우리는 정말 빠르게 움직였습니다.\n\n하지만 그것 말고도 다른 일이 일어났습니다. 제가 예상하지 못했던 일이.`,
  },
  {
    id: 25,
    image: `${BASE}/ch8-meetings-different.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Signal 1",
    title: "회의가 달라졌다",
    quote: "문제는 더 이상 만들 수 없다는 게 아닙니다. 어떤 것이 중요한지 결정하지 못한다는 겁니다.",
    layout: "split-top",
    script: `회의가 달라졌습니다.\n\n더 나빠진 것은 아닙니다.\n\n그냥 달라졌습니다.`,
  },
  {
    id: 26,
    image: `${BASE}/ch8-everyone-has-prototype.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Signal 1",
    title: "모두가 프로토타입을 들고 온다",
    body: "모두가 뭔가를 들고 왔을 때, 아무도 정렬되지 않을 수 있습니다. 풍요로움이 새로운 마찰입니다.",
    layout: "split-top",
    script: `아이디어가 더 많아졌습니다.\n\n프로토타입이 더 많아졌습니다.\n\n산출물이 더 많아졌습니다.\n\n옵션이 더 많아졌습니다.\n\n방향성이 더 많아졌습니다.\n\n의견도 더 많아졌습니다.\n\n모든 것이 더 많아졌습니다.\n\n그런데 이상하게도 명확성은 함께 늘어나지 않았습니다.\n\nAI가 많은 실행 문제를 해결했습니다. 하지만 하나의 문제를 해결할 때마다 다른 문제가 드러났습니다.\n\n더 많은 산출물. 더 많은 충돌. 더 적은 명확성.\n\n그리고 그때 저는 깨달았습니다: 이건 실행 문제가 아니라 조율 문제라는 것을.`,
  },

  /* ── CH 10 ── */
  {
    id: 27,
    image: `${BASE}/ch10-specialization.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Signal 2 — Roles Blurring",
    title: "신호 2 — 역할 경계의 붕괴",
    body: "오랫동안 프로덕트 팀은 전문화를 기반으로 구성됐습니다. PM은 요구사항을 썼고, 디자이너는 디자인했고, 엔지니어는 개발했습니다.",
    layout: "split-top",
    script: `이 신호는 저에게 가장 개인적으로 와닿는 신호입니다.\n\n왜냐하면 제가 직접 경험했기 때문입니다.\n\n제 커리어 대부분 동안 제품 팀은 전문성(Specialization)을 중심으로 구성되어 있었습니다.`,
  },
  {
    id: 28,
    image: `${BASE}/ch10-talking-different.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Signal 2",
    title: "같은 화면, 다른 이야기",
    quote: "역할이 흐려졌습니다. 하지만 커뮤니케이션은 그것을 따라가지 못했습니다.",
    layout: "split-top",
    script: `회의 하나를 상상해 보겠습니다.\n\nPM은 사용자 플로우를 보고 있습니다.\n\n디자이너는 인터랙션 품질을 보고 있습니다.\n\n엔지니어는 기술적 구현 가능성을 보고 있습니다.\n\n리서처는 사용자 행동을 생각하고 있습니다.\n\n모두가 같은 화면을 보고 있습니다.\n\n그런데 모두가 다른 이야기를 하고 있습니다.`,
  },

  /* ── CH 11 ── */
  {
    id: 29,
    image: `${BASE}/ch11-complaints.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Signal 3 — The Complaint Changed",
    title: "신호 3 — 불만이 달라졌다",
    body: "예전 불만: \"만들 수 없어.\" (실행 부족) → 새로운 불만: \"합의할 수 없어.\" (정렬 부족)",
    layout: "split-top",
    script: `이 세 가지 신호 중에서 저를 가장 설득한 신호가 있다면 아마 이것일 겁니다.\n\n왜냐하면 너무 단순하기 때문입니다.\n\n저는 특별한 분석을 한 것이 아닙니다.\n\n그냥 들었습니다.\n\n제품 팀 주변에 충분히 오래 있다 보면 비슷한 이야기를 계속 듣게 됩니다.`,
  },

  /* ── CH 12 ── */
  {
    id: 30,
    image: `${BASE}/ch12-coordination-problem.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "What the Signals Share",
    title: "세 가지 신호의 공통점",
    body: "산출물 과잉 · 역할 경계 붕괴 · 불만의 변화 — 세 신호 모두 같은 곳을 가리킵니다. 조율.",
    layout: "split-top",
    script: `우리는 더 이상 창작 문제가 없습니다.\n\n우리는 조율 문제가 있습니다.\n\n한 번 생각해 보세요.\n\n여러분이 경험했던 가장 답답한 팀은 어떤 팀이었습니까?\n\n만들 수 없어서 멈춰 있던 팀이었습니까?\n\n아니면 결정하지 못해서 멈춰 있던 팀이었습니까?\n\n데이터를 다르게 해석하는 사람들. 서로 경쟁하는 프로토타입들. 무엇을 선택해야 하는지 모르는 팀. 권한은 있는데 기준이 없는 조직.\n\n회의가 끝날 때마다 "이건 오프라인으로 이야기해보죠." 라고 말하지만, 그 오프라인 대화조차 아무것도 해결하지 못하는 상황.`,
  },

  /* ── CH 13 ── */
  {
    id: 31,
    image: `${BASE}/ch13-linkedin-reaction.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Industry Is Already Feeling It",
    title: "업계는 이미 느끼고 있다",
    body: "LinkedIn, Slack, 컨퍼런스 복도, 디자인 커뮤니티. 모두 같은 이야기를 하고 있습니다.",
    layout: "split-top",
    script: `제가 결론을 말씀드리기 전에, 먼저 하나를 보여드리고 싶습니다.\n\n몇 주 전, 저는 링크드인에 질문 하나를 올렸습니다.\n\n사실 꽤 단순한 질문이라고 생각했습니다.`,
  },

  /* ── CH 14 ── */
  {
    id: 32,
    image: `${BASE}/ch14-group-alignment.png`,
    overlay: "rgba(0,13,16,0.0)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Coordination Era",
    title: "조율의 시대",
    body: "서로 다른 정보, 다른 인센티브, 다른 우선순위, 다른 의견을 가진 똑똑한 사람들이 같은 방향으로 움직이게 돕는 능력.",
    layout: "split-top",
    script: `제가 말하는 조율은 서로 다른 사람들을 하나의 방향으로 움직이게 하는 능력입니다.\n\n서로 다른 정보를 가진 사람들.\n\n서로 다른 목표를 가진 사람들.\n\n서로 다른 우선순위를 가진 사람들.\n\n서로 다른 의견을 가진 사람들.\n\n그 사람들이 무엇이 중요한지 함께 이해하게 만들고, 그 이해를 바탕으로 같은 방향으로 움직이게 만드는 능력입니다.`,
  },

  /* ── CH 15 ── */
  {
    id: 33,
    image: `${BASE}/ch15-ai-progression.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Raise the Ceiling",
    title: "천장을 높여라",
    body: "AI 이야기를 준비했습니다. 바이브 코딩, 에이전트 워크플로우, MCP. 하지만 진짜 이야기는 KPI였습니다.",
    layout: "split-top",
    script: `이 발표를 준비하기 시작했을 때, 저는 이 챕터가 AI 이야기가 될 줄 알았습니다.\n\n20분 정도를 할애해서 도구들을 소개할 생각이었습니다.\n\n바이브 코딩. 프로토타이핑. 에이전트 워크플로우. MCP. 에이전틱 엔지니어링.\n\n요즘 우리가 모두 실험하고 있는 것들 말입니다.`,
  },
  {
    id: 34,
    image: `${BASE}/ch15-kpi-expansion.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "가치의 단위가 확장된다",
    body: "사진 → 결혼식 · 선수 → 팀 · 노래 → 문화 · 결과물 → 의사결정",
    layout: "split-top",
    script: `사진 → 결혼식\n\n선수 → 팀\n\n노래 → 문화\n\n결과물 → 의사결정`,
  },
  {
    id: 35,
    image: `${BASE}/ch15-raise-ceiling.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "바닥이 계속 올라간다면, 천장은 무엇일까요?",
    quote: "시장은 이미 답하기 시작했습니다. 조직이 더 좋은 결정을 내리도록 도울 수 있는가?",
    layout: "split-top",
    script: `그렇다면 이제 질문은 이것입니다.\n\n바닥이 계속 올라간다면, 천장은 무엇일까요?`,
  },

  /* ── CH 16 ── */
  {
    id: 36,
    image: `${BASE}/ch16-four-elements.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Four Elements of Coordination",
    title: "조율의 네 가지 요소",
    body: "조율은 소프트 스킬이 아닙니다. 배울 수 있는 역량의 집합입니다. 명확성 · 트레이드오프 · 우선순위 · 결정.",
    layout: "split-top",
    script: `팀이 앞으로 나아가는 데 어려움을 겪을 때, 이 네 가지 중 하나가 빠져 있는 경우가 많습니다.\n\n팀이 빠르게 움직일 때, 네 가지를 모두 갖추고 있는 경향이 있습니다.`,
  },
  {
    id: 37,
    image: `${BASE}/ch16-clarity.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "16a — Clarity · 명확성",
    title: "Clarity: 우리가 해결하려는 문제는 무엇인가?",
    body: "명확성은 동의가 아닙니다. 팀이 같은 사용자, 같은 문제, 같은 성공 기준으로 시작할 때 존재합니다.",
    layout: "split-top",
    script: `프로토타입이 다섯 개, 이해관계자가 열 명, 의견이 스무 개일 때, 가장 중요한 기여는 모두가 같은 질문에 동의하도록 돕는 것입니다.\n\n모든 이견이 해결책에 관한 이견은 아닙니다.\n\n때로는 서로 완전히 다른 문제를 풀고 있는 것입니다.\n\n어떤 사람은 채택률을 최적화하고 있고, 어떤 사람은 매출을 최적화하고 있으며, 어떤 사람은 기술적 실현 가능성을 최적화하고 있습니다.\n\n명확성 없이는 팀이 서로 다른 문제에 대한 해결책을 논쟁합니다.\n\n훌륭한 조율자는 무엇을 만들지 결정하기 전에 모두가 같은 문제를 풀고 있는지 확인합니다.`,
  },
  {
    id: 38,
    image: `${BASE}/ch16a-user-problem-success.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16a — Clarity",
    title: "Clarity: 사용자 · 문제 · 성공",
    layout: "split-top",
  },
  {
    id: 381,
    image: `${BASE}/ch16a-clarity-mindset.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16a — Clarity · Mindsets",
    title: "Clarity: 명확성의 세 가지 마인드셋",
    layout: "split-top",
  },
  {
    id: 39,
    image: `${BASE}/ch16-trade-offs.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "16b — Trade-offs · 트레이드오프",
    title: "Trade-offs: 우리는 무엇을 희생할 의향이 있는가?",
    body: "트레이드오프는 선택을 만드는 것이 아닙니다. 이미 존재하는 선택을 가시화하는 것입니다.",
    layout: "split-top",
    script: `의미 있는 모든 결정은 무언가를 포기해야 합니다.\n\n속도 대 품질. 범위 대 집중. 단기 결과 대 장기 투자.\n\n가장 빠르게 움직이는 팀이 반드시 가장 똑똑한 팀은 아닙니다.\n\n그들은 무엇을 희생할 의향이 있는지에 대해 솔직한 팀입니다.\n\n트레이드오프 없이는 모두가 모든 것을 원합니다.\n\n트레이드오프를 명명하는 것이 종종 대화를 풀어주는 열쇠입니다.`,
  },
  {
    id: 40,
    image: `${BASE}/ch16b-benefit-risk-acceptance.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16b — Trade-offs",
    title: "Trade-offs: 이점 · 위험 · 수용",
    layout: "split-top",
  },
  {
    id: 401,
    image: `${BASE}/ch16b-tradeoffs-mindset.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16b — Trade-offs · Mindsets",
    title: "Trade-offs: 트레이드오프의 세 가지 마인드셋",
    layout: "split-top",
  },
  {
    id: 41,
    image: `${BASE}/ch16-priority.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "16c — Priority · 우선순위",
    title: "Priority: 지금 가장 중요한 것은 무엇인가?",
    body: "AI는 선택지를 만드는 것을 쉽게 만들었습니다. 어려운 것은 어떤 것에 집중할지 결정하는 것입니다.",
    layout: "split-top",
    script: `누구나 선택지를 만들 수 있습니다. AI가 그것을 쉽게 만들었습니다.\n\n어려운 것은 선택하는 일입니다.\n\n저는 모든 방향이 타당했던 회의에 많이 들어가 봤습니다. 모든 이해관계자의 말이 일리가 있었습니다. 모든 제안이 합리적으로 들렸습니다.\n\n그래도 팀은 결정 없이 자리를 떴습니다.\n\n문제는 지능이 아니었습니다.\n\n문제는 그 순간 무엇이 가장 중요한지 아무도 파악하지 못했다는 것입니다.\n\n우선순위 없이는 모든 것이 중요해집니다.\n\n그리고 모든 것이 중요하면, 아무것도 움직이지 않습니다.`,
  },
  {
    id: 42,
    image: `${BASE}/ch16c-urgency-impact-cost.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16c — Priority",
    title: "Priority: 긴급성 · 임팩트 · 노력",
    layout: "split-top",
  },
  {
    id: 421,
    image: `${BASE}/ch16c-priority-mindset.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16c — Priority · Mindsets",
    title: "Priority: 우선순위의 세 가지 마인드셋",
    layout: "split-top",
  },
  {
    id: 43,
    image: `${BASE}/ch16-decision.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "16d — Decision · 결정",
    title: "Decision: 우리는 무엇을 할 것인가?",
    body: "결정 없이 끝나는 회의는 그냥 대화입니다. 이해관계자 · 책임 · 다음 단계.",
    layout: "split-top",
    script: `결정 없이 끝나는 회의는 그냥 대화입니다.\n\n누군가는 결정을 내려야 합니다.\n\n누군가는 결과에 책임을 져야 합니다.\n\n대부분의 조직에는 실행 시스템이 있습니다. 디자인 시스템. 로드맵. 스프린트 계획. 엔지니어링 프로세스.\n\n하지만 의사결정 시스템을 가진 조직은 매우 드뭅니다.\n\n경쟁하는 아이디어를 어떻게 평가하는가? 이견을 어떻게 초기에 발견하는가? 3개월 뒤 같은 논쟁을 어떻게 반복하지 않는가?\n\n결정 없이는 조직이 진전 대신 대화를 반복합니다.`,
  },
  {
    id: 44,
    image: `${BASE}/ch16d-stakeholders-accountability-nextstep.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16d — Decision",
    title: "Decision: 이해관계자 · 책임 · 다음 단계",
    layout: "split-top",
  },
  {
    id: 441,
    image: `${BASE}/ch16d-decision-mindset.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.obsidian,
    muteColor: "rgba(0,13,16,0.55)",
    tag: "16d — Decision · Mindsets",
    title: "Decision: 결정의 세 가지 마인드셋",
    layout: "split-top",
  },

  /* ── CH 17 · CONCLUSION ── */
  {
    id: 45,
    image: `${BASE}/ch17-conclusion.png`,
    overlay: "rgba(0,13,16,0.62)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Conclusion",
    title: "마치며",
    body: "저는 이 발표를 고백으로 시작했습니다. 10년을 직책을 쫓으며 살았습니다. 그리고 최근에서야 패턴을 이해하게 되었습니다.",
    layout: "split-top",
  },
  {
    id: 46,
    image: `${BASE}/ch17-conclusion.png`,
    overlay: "rgba(0,13,16,0.80)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Pattern",
    title: "그 패턴은 결코 기술이 아니었습니다.",
    quote: "항상 조율이었습니다.",
    layout: "split-top",
  },
  {
    id: 47,
    image: `${BASE}/ch14-coordination-era.png`,
    overlay: "rgba(0,13,16,0.80)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "The Opportunity",
    title: "AI는 바닥을 올릴 것입니다.",
    body: "여러분의 일은 천장을 올리는 것입니다. 그리고 천장을 올리는 방법은 조율하는 사람이 되는 것입니다.",
    quote: "감사합니다.",
    layout: "split-top",
  },
];

export default function KoreaTalk() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [scriptOpen, setScriptOpen] = useState(false);
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setCurrent(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrent(i => Math.min(total - 1, i + 1)), [total]);

  const slide = slides[current];
  const hasScript = !!slide.script;

  useEffect(() => {
    if (!slide.script) setScriptOpen(false);
  }, [current, slide.script]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && scriptOpen) { e.preventDefault(); setScriptOpen(false); return; }
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")                    { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, scriptOpen]);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        background: T.obsidian,
        display: "flex",
        alignItems: "stretch",
        fontFamily: "system-ui, -apple-system, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Left click zone */}
      <div
        onClick={prev}
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: "12%",
          zIndex: 10,
          cursor: current === 0 ? "default" : "w-resize",
        }}
      />

      {/* Right click zone */}
      <div
        onClick={next}
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: "12%",
          zIndex: 10,
          cursor: current === total - 1 ? "default" : "e-resize",
        }}
      />

      {/* Slide */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {slide.mindsets
          ? <MindsetSlide slide={slide} total={total} index={current} />
          : slide.layout === "split-top"
          ? <SplitTopSlide slide={slide} total={total} index={current} />
          : slide.isHero
          ? <HeroSlide slide={slide} total={total} index={current} />
          : slide.isStatement
          ? <StatementSlide slide={slide} total={total} index={current} />
          : <ContentSlide slide={slide} total={total} index={current} />
        }
      </div>

      {/* Script button — only shown when slide has a script */}
      {hasScript && (
        <button
          onClick={() => setScriptOpen(o => !o)}
          title="Toggle script (S)"
          style={{
            position: "absolute",
            top: "20px",
            right: "64px",
            zIndex: 20,
            background: scriptOpen ? T.sienna : "rgba(255,255,255,0.07)",
            border: `1px solid ${scriptOpen ? T.sienna : "rgba(255,255,255,0.12)"}`,
            color: scriptOpen ? T.white : T.stone,
            width: "36px",
            height: "36px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            borderRadius: "4px",
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
        >
          ☰
        </button>
      )}

      {/* Fullscreen button */}
      <button
        onClick={toggleFullscreen}
        title="Toggle fullscreen (F)"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 20,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: T.stone,
          width: "36px",
          height: "36px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          borderRadius: "4px",
          transition: "opacity 0.2s",
        }}
      >
        ⤢
      </button>

      {/* Script panel */}
      <ScriptPanel open={scriptOpen} slide={slide} onClose={() => setScriptOpen(false)} />

      {/* Keyboard hint */}
      <div style={{
        position: "absolute",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: T.stone,
        opacity: showHint ? 0.6 : 0,
        transition: "opacity 0.6s ease",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        ← → arrow keys · F fullscreen
      </div>
    </div>
  );
}

/* ── SCRIPT PANEL ── */
function ScriptPanel({ open, slide, onClose }: { open: boolean; slide: SlideData; onClose: () => void }) {
  return (
    <div style={{
      position: "fixed",
      top: 0, right: 0,
      width: "min(480px, 40vw)",
      height: "100vh",
      background: "rgba(0,13,16,0.97)",
      backdropFilter: "blur(10px)",
      borderLeft: "1px solid rgba(255,255,255,0.08)",
      zIndex: 30,
      overflowY: "auto",
      padding: "56px 36px 48px",
      transform: open ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
      boxSizing: "border-box",
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "18px", right: "18px",
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.4)",
          fontSize: "20px",
          cursor: "pointer",
          lineHeight: 1,
          padding: "4px 8px",
        }}
      >
        ×
      </button>

      {/* Tag */}
      {slide.tag && (
        <p style={{
          fontFamily: "system-ui, sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: T.sienna,
          margin: "0 0 12px",
        }}>
          {slide.tag}
        </p>
      )}

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

      {/* Script paragraphs */}
      <div style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "17px",
        lineHeight: 1.85,
        color: "rgba(255,255,255,0.88)",
      }}>
        {(slide.script ?? "").split("\n\n").map((para, i) => (
          <p key={i} style={{ margin: "0 0 1.4em" }}>{para}</p>
        ))}
      </div>
    </div>
  );
}

/* ── Shared background helper ── */
function SlideBg({ slide }: { slide: SlideData }) {
  return (
    <>
      {slide.image && (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }} />
      )}
      <div style={{
        position: "absolute",
        inset: 0,
        background: slide.overlay,
        zIndex: 1,
      }} />
    </>
  );
}

/* ── SPLIT-TOP SLIDE — image top, text panel bottom ── */
function SplitTopSlide({ slide, total, index }: { slide: SlideData; total: number; index: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      {/* Image zone — fills available space above text, image fits inside without cropping */}
      {slide.image && (
        <div style={{
          flex: 1,
          minHeight: 0,
          background: "#0a1015",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* Text panel — fixed height at bottom */}
      <div style={{
        flexShrink: 0,
        background: T.obsidian,
        padding: "2.5vh 8vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.8vh",
        minHeight: "26vh",
        maxHeight: "34vh",
      }}>
        {slide.tag && (
          <div style={{
            fontSize: "clamp(9px, 0.85vw, 11px)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: T.sienna,
          }}>
            {slide.tag}
          </div>
        )}
        {slide.title && (
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 52px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: T.white,
            margin: 0,
          }}>
            {slide.title}
          </h2>
        )}
        {slide.body && (
          <p style={{
            fontSize: "clamp(12px, 1.3vw, 18px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            maxWidth: "62vw",
          }}>
            {slide.body}
          </p>
        )}
        {slide.quote && (
          <p style={{
            fontSize: "clamp(12px, 1.2vw, 17px)",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: T.white,
            margin: 0,
            maxWidth: "60vw",
            borderLeft: `3px solid ${T.sienna}`,
            paddingLeft: "1.2vw",
          }}>
            &ldquo;{slide.quote}&rdquo;
          </p>
        )}
      </div>

      <SlideNumber index={index} mute="rgba(255,255,255,0.25)" />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ── MINDSET SLIDE ── */
function MindsetSlide({ slide, total, index }: { slide: SlideData; total: number; index: number }) {
  const ACCENT = "#bc7155";
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: T.obsidian,
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      padding: "6vh 10vw",
    }}>
      {slide.tag && (
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "clamp(9px, 1.1vw, 13px)",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 2vh",
        }}>{slide.tag}</p>
      )}
      <h2 style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "clamp(18px, 2.4vw, 32px)",
        fontWeight: 700,
        color: T.white,
        margin: "0 0 4vh",
        lineHeight: 1.25,
      }}>{slide.title}</h2>

      {slide.mindsets && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(80px, 14%) 1fr",
          maxWidth: "680px",
        }}>
          {slide.mindsets.map(({ label, rule }) => (
            <>
              <div key={`l-${label}`} style={{
                padding: "14px 16px 14px 0",
                borderTop: "1px solid rgba(255,255,255,0.10)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "clamp(9px, 1vw, 12px)",
                fontWeight: 700,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: ACCENT,
              }}>{label}</div>
              <div key={`r-${label}`} style={{
                padding: "14px 0",
                borderTop: "1px solid rgba(255,255,255,0.10)",
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "clamp(13px, 1.5vw, 18px)",
                color: T.white,
                lineHeight: 1.5,
              }}>{rule}</div>
            </>
          ))}
        </div>
      )}

      <SlideNumber index={index} mute="rgba(255,255,255,0.25)" />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ── HERO SLIDE ── */
function HeroSlide({ slide, total, index }: { slide: SlideData; total: number; index: number }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <SlideBg slide={slide} />

      <div style={{ position: "relative", zIndex: 2, padding: "7vh 8vw", height: "100%" }}>
        <Tag color={T.sienna}>{slide.tag}</Tag>
        <h1 style={{
          fontSize: "clamp(64px, 10vw, 160px)",
          fontWeight: 700,
          lineHeight: 0.88,
          letterSpacing: "-0.03em",
          color: slide.textColor,
          marginTop: "3vh",
          marginBottom: "4vh",
        }}>
          The<br />Coordination<br />Era
        </h1>
        <p style={{
          fontSize: "clamp(14px, 1.8vw, 22px)",
          fontWeight: 400,
          lineHeight: 1.6,
          color: slide.muteColor,
          marginBottom: "4vh",
        }}>
          {slide.subtitle}
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/ktalk/manuscript" style={{
            display: "inline-block",
            border: `1px solid rgba(255,255,255,0.22)`,
            color: slide.muteColor,
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(9px, 0.9vw, 12px)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "8px 20px",
            borderRadius: "1000px",
            textDecoration: "none",
          }}>
            Read Manuscript →
          </Link>
          <Link href="/ktalk/manuscript/ko/intro" style={{
            display: "inline-block",
            border: `1px solid rgba(255,255,255,0.15)`,
            color: "rgba(255,255,255,0.40)",
            fontFamily: "system-ui, sans-serif",
            fontSize: "clamp(9px, 0.9vw, 12px)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "8px 20px",
            borderRadius: "1000px",
            textDecoration: "none",
          }}>
            한국어 원고 →
          </Link>
        </div>

        <div style={{
          position: "absolute",
          bottom: "7vh",
          left: 0,
          fontSize: "clamp(10px, 1vw, 13px)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: slide.muteColor,
        }}>
          David Lee
        </div>
      </div>

      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ── STATEMENT SLIDE ── */
function StatementSlide({ slide, total, index }: { slide: SlideData; total: number; index: number }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <SlideBg slide={slide} />
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "8vh 8vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <Tag color={T.sienna}>{slide.tag}</Tag>
        <h2 style={{
          fontSize: "clamp(40px, 6vw, 100px)",
          fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: "-0.028em",
          color: slide.textColor,
          marginTop: "3vh",
          maxWidth: "70vw",
        }}>
          {slide.title}
        </h2>
        {slide.body && (
          <p style={{
            fontSize: "clamp(14px, 1.8vw, 26px)",
            lineHeight: 1.65,
            color: slide.muteColor,
            marginTop: "3vh",
            maxWidth: "52vw",
          }}>
            {slide.body}
          </p>
        )}
        {slide.quote && (
          <p style={{
            fontSize: "clamp(13px, 1.5vw, 22px)",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: slide.textColor,
            marginTop: "2vh",
            maxWidth: "52vw",
            borderLeft: `3px solid ${T.sienna}`,
            paddingLeft: "1.5vw",
          }}>
            &ldquo;{slide.quote}&rdquo;
          </p>
        )}
      </div>
      <SlideNumber index={index} mute={slide.muteColor} />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ── CONTENT SLIDE ── */
function ContentSlide({ slide, total, index }: { slide: SlideData; total: number; index: number }) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <SlideBg slide={slide} />
      <div style={{
        position: "relative",
        zIndex: 2,
        padding: "8vh 8vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {slide.tag && (
          <div style={{
            fontSize: "clamp(9px, 0.9vw, 11px)",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: T.sienna,
            marginBottom: "1.5vh",
          }}>
            {slide.tag}
          </div>
        )}
        {slide.chapter && (
          <div style={{
            fontSize: "clamp(11px, 1.1vw, 14px)",
            color: slide.muteColor,
            marginBottom: "0.5vh",
          }}>
            {slide.chapter}
          </div>
        )}
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 68px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-0.022em",
          color: slide.textColor,
          marginBottom: "2.5vh",
          maxWidth: "62vw",
        }}>
          {slide.title}
        </h2>
        {slide.body && (
          <p style={{
            fontSize: "clamp(13px, 1.5vw, 21px)",
            lineHeight: 1.7,
            color: slide.muteColor,
            maxWidth: "48vw",
          }}>
            {slide.body}
          </p>
        )}
        {slide.quote && (
          <p style={{
            fontSize: "clamp(13px, 1.4vw, 20px)",
            fontStyle: "italic",
            lineHeight: 1.65,
            color: slide.textColor,
            marginTop: slide.body ? "2vh" : 0,
            maxWidth: "50vw",
            borderLeft: `3px solid ${T.sienna}`,
            paddingLeft: "1.5vw",
          }}>
            &ldquo;{slide.quote}&rdquo;
          </p>
        )}
      </div>
      <SlideNumber index={index} mute={slide.muteColor} />
      <ProgressBar index={index} total={total} />
    </div>
  );
}

/* ── Primitives ── */

function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "5px 14px",
      background: color,
      borderRadius: "1000px",
      fontSize: "clamp(9px, 0.85vw, 11px)",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: T.white,
      marginBottom: "1.5vh",
    }}>
      {children}
    </div>
  );
}

function SlideNumber({ index, mute }: { index: number; mute?: string }) {
  return (
    <div style={{
      position: "absolute",
      bottom: "5vh",
      left: "8vw",
      zIndex: 2,
      fontSize: "clamp(9px, 0.85vw, 11px)",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: mute ?? "rgba(255,255,255,0.35)",
    }}>
      {String(index + 1).padStart(2, "0")}
    </div>
  );
}

function ProgressBar({ index, total }: { index: number; total: number }) {
  return (
    <div style={{
      position: "absolute",
      bottom: 0, left: 0,
      width: "100%",
      height: "3px",
      background: "rgba(255,255,255,0.08)",
      zIndex: 2,
    }}>
      <div style={{
        height: "100%",
        width: `${((index + 1) / total) * 100}%`,
        background: T.sienna,
        transition: "width 0.35s ease",
      }} />
    </div>
  );
}
