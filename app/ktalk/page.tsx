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
    tag: "Chapter 1 — Intro",
    chapter: "소개",
    title: "안녕하세요. David Lee입니다.",
    body: "GoPro → Google Designer → Google AI UX Engineer → SAP Designer → SAP Principal PM",
    layout: "split-top",
  },
  {
    id: 3,
    image: `${BASE}/ch1-ai-noise.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 1",
    title: "매일 새로운 AI 툴, 워크플로우, 불안감이 쌓입니다.",
    quote: "하지만 오늘은 프롬프트 이야기가 아닙니다.",
    layout: "split-top",
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
  },

  /* ── CH 2 ── */
  {
    id: 5,
    image: `${BASE}/ch2-designer-directing-ai.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 2 — Track Record",
    title: "나의 이력",
    body: "직함보다 중요한 건 패턴입니다. 모든 역할을 관통하는 하나의 흐름이 있었습니다.",
    layout: "split-top",
  },
  {
    id: 6,
    image: `${BASE}/ch2-pm-transition.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 2",
    title: "Designer → PM",
    quote: "디자인을 떠난 게 아니라, 무엇을 만들지 결정하는 쪽으로 이동했습니다.",
    layout: "split-top",
  },

  /* ── CH 3 ── */
  {
    id: 7,
    image: `${BASE}/ch3-design-review.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 3 — The Shock",
    title: "충격",
    body: "PM이 디자인 리뷰에 완성된 프로토타입을 들고 왔습니다. 피그마도 아니고, 실제 코드로 만든 고퀄리티 결과물이었습니다.",
    layout: "split-top",
  },
  {
    id: 8,
    image: `${BASE}/ch3-pm-sketch.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 3",
    title: "\"그래서 내가 여기 왜 있지?\"",
    body: "디자이너 = AI 노출 직군 1위 (Tufts University). PM 채용은 늘고, 디자이너 채용은 줄고 있습니다.",
    layout: "split-top",
  },
  {
    id: 9,
    image: `${BASE}/ch3-speed-vs-fidelity.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 3",
    title: "속도 vs 완성도",
    quote: "PM의 의도는 변하지 않았습니다. 신호가 바뀐 겁니다.",
    layout: "split-top",
  },
  {
    id: 10,
    image: `${BASE}/ch3-designer-overwhelmed.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 3",
    title: "압도감",
    body: "AI는 실행 병목을 제거했습니다. 하지만 조율 병목은 여전히 활짝 열려 있습니다.",
    layout: "split-top",
  },

  /* ── CH 4 ── */
  {
    id: 11,
    image: `${BASE}/ch4-pm-explains.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 4 — Why This Is Happening",
    title: "왜 이런 일이 생기는가",
    body: "PM은 항상 시각 산출물을 들고 왔습니다. 달라진 건 속도와 완성도뿐입니다.",
    layout: "split-top",
  },
  {
    id: 12,
    image: `${BASE}/ch4-value-question.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 4",
    title: "가치 질문",
    quote: "이건 역할 질문이 아니었습니다. 항상 가치 질문이었습니다 — AI가 그걸 가려주던 마찰을 제거한 겁니다.",
    layout: "split-top",
  },

  /* ── CH 5 ── */
  {
    id: 13,
    image: `${BASE}/ch5-floor-raised.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 5 — The Floor Has Been Raised",
    title: "바닥이 올라갔다",
    body: "기술이 희소했던 기술을 접근 가능하게 만들면, 바닥이 올라갑니다. 이건 항상 그랬습니다.",
    layout: "split-top",
  },
  {
    id: 14,
    image: `${BASE}/ch5-film-photographer.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 5",
    title: "필름 사진작가의 이야기",
    body: "디지털 카메라가 등장했을 때 사진의 바닥이 올라갔습니다. 더 많은 사람이 좋은 사진을 찍을 수 있게 됐습니다.",
    layout: "split-top",
  },
  {
    id: 15,
    image: `${BASE}/ch5-wedding-photographer.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 5",
    title: "살아남은 사진작가",
    quote: "조금 더 선명한 사진을 찍은 사람이 아니라, 결혼식을 더 기억에 남게 만든 사람이 살아남았습니다.",
    layout: "split-top",
  },

  /* ── CH 6 ── */
  {
    id: 16,
    image: `${BASE}/ch6-nba-center.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 6 — The NBA Story",
    title: "NBA 이야기",
    body: "Nikola Jokić은 센터입니다. 하지만 그를 설명하는 데 포지션은 충분하지 않습니다.",
    layout: "split-top",
  },
  {
    id: 17,
    image: `${BASE}/ch6-three-point.png`,
    overlay: "rgba(0,13,16,0.72)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 6",
    title: "3점 슛 혁명",
    body: "NBA 센터들의 3점 슛 시도 1985–2025. 역할이 사라진 게 아닙니다. 포지션으로 정의되는 것을 멈췄습니다.",
    layout: "split-top",
  },
  {
    id: 18,
    image: `${BASE}/ch6-modern-bigs.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 6",
    title: "모던 빅맨",
    body: "시스템은 점점 더 개인의 고유한 역량을 극대화하는 방향으로 진화합니다.",
    layout: "split-top",
  },
  {
    id: 19,
    image: `${BASE}/ch6-playbook.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 6",
    title: "플레이북",
    quote: "AI 시대가 역할을 없애는 게 아닙니다. 1차원 전문가를 노출시키는 겁니다 — 분석이 일차원 선수를 노출시켰던 것처럼.",
    layout: "split-top",
  },

  /* ── CH 7 ── */
  {
    id: 20,
    image: `${BASE}/ch7-photographer-player.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 7 — The Pattern",
    title: "패턴",
    body: "웨딩 사진작가 한 명과 NBA 센터 한 명. 겉으로는 공통점이 없습니다. 하지만 같은 이야기입니다.",
    layout: "split-top",
  },
  {
    id: 21,
    image: `${BASE}/ch7-who-survived.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 7",
    title: "누가 살아남았나",
    body: "바닥이 올라가면, 시장은 예전 것에 보상을 멈춥니다. KPI가 바뀝니다. 가치의 단위가 확장됩니다.",
    layout: "split-top",
  },
  {
    id: 22,
    image: `${BASE}/ch7-three-steps.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 7",
    title: "3단계 패턴",
    body: "Step 1. 기술이 바닥을 올린다. → Step 2. 시장이 KPI를 바꾼다. → Step 3. 전문가가 천장을 높인다.",
    layout: "split-top",
  },
  {
    id: 23,
    image: `${BASE}/ch7-pattern-table.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 7 — The Pattern",
    title: "기술이 바닥을 올릴 때마다 시장은 새로운 가치를 보상합니다.",
    layout: "split-top",
  },

  /* ── CH 8 ── */
  {
    id: 24,
    image: `${BASE}/ch8-artifact-overflow.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 8–9 — Signal 1",
    title: "신호 1 — 산출물이 넘쳐난다",
    body: "AI 이전: 아이디어 100개, 결과물 10개. AI 이후: 아이디어 100개, 결과물 100개. 병목이 이동했습니다.",
    layout: "split-top",
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
  },

  /* ── CH 10 ── */
  {
    id: 27,
    image: `${BASE}/ch10-specialization.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 10 — Signal 2",
    title: "신호 2 — 역할 경계의 붕괴",
    body: "오랫동안 프로덕트 팀은 전문화를 기반으로 구성됐습니다. PM은 요구사항을 썼고, 디자이너는 디자인했고, 엔지니어는 개발했습니다.",
    layout: "split-top",
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
  },

  /* ── CH 11 ── */
  {
    id: 29,
    image: `${BASE}/ch11-complaints.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 11 — Signal 3",
    title: "신호 3 — 불만이 달라졌다",
    body: "예전 불만: \"만들 수 없어.\" (실행 부족) → 새로운 불만: \"합의할 수 없어.\" (정렬 부족)",
    layout: "split-top",
  },

  /* ── CH 12 ── */
  {
    id: 30,
    image: `${BASE}/ch12-coordination-problem.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 12 — Signals Summary",
    title: "세 가지 신호의 공통점",
    body: "산출물 과잉 · 역할 경계 붕괴 · 불만의 변화 — 세 신호 모두 같은 곳을 가리킵니다. 조율.",
    layout: "split-top",
  },

  /* ── CH 13 ── */
  {
    id: 31,
    image: `${BASE}/ch13-linkedin-reaction.png`,
    overlay: "rgba(0,13,16,0.70)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 13 — Industry Feeling It",
    title: "업계는 이미 느끼고 있다",
    body: "LinkedIn, Slack, 컨퍼런스 복도, 디자인 커뮤니티. 모두 같은 이야기를 하고 있습니다.",
    layout: "split-top",
  },

  /* ── CH 14 ── */
  {
    id: 32,
    image: `${BASE}/ch14-group-alignment.png`,
    overlay: "rgba(0,13,16,0.0)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 14 — The Coordination Era",
    title: "조율의 시대",
    body: "서로 다른 정보, 다른 인센티브, 다른 우선순위, 다른 의견을 가진 똑똑한 사람들이 같은 방향으로 움직이게 돕는 능력.",
    layout: "split-top",
  },

  /* ── CH 15 ── */
  {
    id: 33,
    image: `${BASE}/ch15-ai-progression.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 15 — Raise the Ceiling",
    title: "천장을 높여라",
    body: "AI 이야기를 준비했습니다. 바이브 코딩, 에이전트 워크플로우, MCP. 하지만 진짜 이야기는 KPI였습니다.",
    layout: "split-top",
  },
  {
    id: 34,
    image: `${BASE}/ch15-kpi-expansion.png`,
    overlay: "rgba(0,0,0,0)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 15",
    title: "가치의 단위가 확장된다",
    body: "사진 → 결혼식 · 선수 → 팀 · 노래 → 문화 · 결과물 → 의사결정",
    layout: "split-top",
  },
  {
    id: 35,
    image: `${BASE}/ch15-raise-ceiling.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 15",
    title: "바닥이 계속 올라간다면, 천장은 무엇일까요?",
    quote: "시장은 이미 답하기 시작했습니다. 조직이 더 좋은 결정을 내리도록 도울 수 있는가?",
    layout: "split-top",
  },

  /* ── CH 16 ── */
  {
    id: 36,
    image: `${BASE}/ch16-four-elements.png`,
    overlay: "rgba(0,13,16,0.68)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    tag: "Chapter 16 — The Four Elements of Coordination",
    title: "조율의 네 가지 요소",
    body: "조율은 소프트 스킬이 아닙니다. 배울 수 있는 역량의 집합입니다. 명확성 · 트레이드오프 · 우선순위 · 결정.",
    layout: "split-top",
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
    tag: "Chapter 17 — Conclusion",
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
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setCurrent(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrent(i => Math.min(total - 1, i + 1)), [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")                    { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

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

  const slide = slides[current];

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
