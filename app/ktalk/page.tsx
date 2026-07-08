"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
    script: `제가 이야기하고 싶은 건 우리가 놓치고 있는 무언가입니다.\n\n지난 2년 동안 저는 구글과 SAP 안에서 AI 제품을 만들면서 신선한 현상을 계속 목격했습니다. 뭐 여러분도 비슷한 경험들을 한다고 생각합니다.\n\n디자이너가 코딩을 하기 시작했습니다.\n\nPM이 프로토타입을 만들기 시작했습니다.\n\n엔지니어가 UX 피드백을 주기 시작했습니다.\n\nAI는 그 모든 일을 조금씩 하기 시작했습니다.\n\n역할의 경계가 흐려지기 시작한 겁니다.\n\n처음에는 이게 맞는건가? 모든 사람들이 디자이너라고 생각하나?\n\n그럼 나도 이제는 프론트 엔지니어링을 하고 코드를 푸시해야하나?\n\n이제 디자이너는 그냥 주어진 프로토타입에다가 디자인 패턴을 얹는 사람이 되는건가?\n\n뭐 개나 소나 다 프로토타입을 만들어 왔네? 뭐야.. 다들 자신만의 솔루션이 있네?\n\n이런 오만가지 생각을 하며 프로젝트를 진행하였습니다.\n\n그런데 지금은 더 큰 무언가라고 생각합니다.\n\n오늘 이야기는 바로 그것에 대한 이야기입니다.\n\n저는 그것을 조율의 시대 (The Coordination Era)라고 부릅니다.\n\n앞으로 45분 동안 저는 우리에게 가장 큰 기회는 더 빨리 만드는 법을 배우는 것이 아닐 수도 있다는 것과\n\n오히려 더 잘 정렬하고, 더 잘 조율하는 법을 배우는 것일 수도 있다는 것을 이야기하려 합니다.`,
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
    script: `하나의 장면을 상상해 보겠습니다.\n\nPM이 디자인 리뷰에 들어옵니다.\n\nPRD를 들고 온 게 아닙니다.\n\n와이어프레임을 들고 온 게 아닙니다.\n\n프로토타입을 들고 왔습니다.\n\n하이 피델리티. 실제 컴포넌트. 인터랙티브. 코드로 만든 것. 하룻밤 만에.\n\n그 방 안에 있는 디자이너는 그것을 보고 한 가지 생각을 합니다.\n\n그래서… 내가 여기 왜 있지?`,
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
    script: `그리고 디자이너들은 걱정을 하기 시작했습니다.\n\n아.. 그럼 내가 왜 여기 있는거야. 내 역할은 뭐지?\n\n그 프로토타입은 형편없던데, 정말 저걸로 갈 생각인가?\n\n두려움 반, 그리고 화도 나기 시작합니다.\n\n그리고 이런 뉴스들도 이제 보이기 시작합니다.\n\nAI에게 가장 노출되어 있는 직군은 웹디자이너이다.\n\n그리고 1:2:10 으로 느껴졌던 프로덕트 매니저, 디자이너, 엔지니어 비율이 바뀌기 시작했고,\n\n드디어 프로덕트 매니저 채용이 더 늘기 시작했습니다.\n\n사실 이건 새로운 일이 아닙니다.\n\nPM은 항상 시각적 산출물을 들고 왔습니다.\n\n스케치. 다이어그램. 경쟁사 스크린샷. 대략적인 목업. 파워포인트 슬라이드. 냅킨 그림.\n\nPM은 항상 아이디어를 시각적으로 전달하려 했습니다.\n\n그러면 바뀐것은 무엇일까요? 그 전에는 그렇게 과민 반응을 보이지 않았는데.. 이제는 뭐가 바뀐걸까요?`,
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
    script: `바뀐 것은 두 가지입니다.\n\n속도. 예전에는 며칠이 걸리던 것이 이제는 한 시간이면 됩니다. 때로는 그보다 짧기도 합니다.\n\nPM은 AI에게 아이디어를 설명하고 거의 즉시 무언가 구체적인 것을 돌려받을 수 있습니다.\n\n그리고 두 번째는: 완성도.\n\n예전의 산출물은 거칠었습니다. 박스. 화살표. 회색 사각형.\n\n아무도 그걸 최종 결과물로 착각하지 않았습니다.\n\n거칠다는 것 자체가 신호였습니다. 방 안의 모든 사람에게 말하고 있었습니다: "이건 시작점입니다."\n\n이제 테이블 반대편 — PM 쪽 이야기를 해보겠습니다.\n\n저는 지금 그 자리에 앉아 있으니까요.\n\n제가 프로토타입을 들고 올 때, 디자이너의 역할을 빼앗으려는 게 아닙니다.\n\n솔직히 말하면, 프로토타입은 제가 더 빠르게 소통하려는 시도입니다.\n\n그게 전부입니다.\n\n시각적 산출물. 대화의 시작점. 제가 생각하는 것을 설명하는 방법.\n\n하지만 이건 디자이너도 마찬가지일 거예요.\n\n우리가 바이브 코딩을 한다고 해서 엔지니어의 일을 빼앗으려 한다거나, 우리 코드로 라이브로 가려는 것은 절대 아닐 겁니다.\n\n그리고 우리가 PM의 유즈케이스나 스토리에 질문을 하거나, 다시 쓰거나, 아님 처음부터 같이 만들려고 하는 것 역시 우리가 그들의 일을 대신한다거나 우리가 더 잘한다고 생각하기 때문은 아닙니다.`,
  },

  /* ── CH 4 ── */
  {
    id: 12,
    image: `${BASE}/ch4-value-question.png`,
    overlay: "rgba(0,13,16,0.65)",
    textColor: T.white,
    muteColor: "rgba(255,255,255,0.55)",
    title: "가치 질문",
    quote: "이건 역할 질문이 아니었습니다. 항상 가치 질문이었습니다 — AI가 그걸 가려주던 마찰을 제거한 겁니다.",
    layout: "split-top",
    script: `그리고 이런 일들이 벌어지는 이유는\n\n전에는 할 수 없었던 일들, 즉 우리들만의 해자가 AI 때문에 붕괴됐기 때문입니다.\n\n새로 나온 기술이 판을 바꿔버린 인류 역사에서 계속 일어나는 일입니다.\n\n전에는 PM이 저희처럼 깔끔하게 디자인을 하기가 힘들었습니다.\n\n시간도 너무 오래 걸리고, 좋은 디자인이라는 감각이나 디자인의 룰들을 이해를 못했죠.\n\n그래서 저희가 꼭 필요했었습니다.\n\n엔지니어들도 마찬가지였죠.\n\n코딩을 배우고 깃헙을 배우고, 데이터가 돌아가는 프로토타입이 나올 정도의 코딩을 배우는 것은 정말 너무 힘들어서 손도 대지 못하는 부분이었습니다.\n\n그리고 PM이 하는 일도 마찬가지예요.\n\nPRD나 유즈케이스, 테크니컬 닥 등.. 사실 쓰라고 하면 쓸 수는 있겠지만, 재미도 없고 시간도 오래 걸려서 하지를 않았습니다.\n\n그리고 이런 마찰들이 우리들만의 해자가 되었고, 이런 마찰들에 지금 우리가 알고 있는 팀 구조가 존재하고 유지되었던 것이죠.\n\n그런데 AI가 그 마찰을 상당 부분 제거해 버렸습니다.\n\n이제는 이 셋의 어느 정도의 일들을 각각 할 수 있게 되어버렸습니다.\n\n그리고 그것도 빠른 시간에.\n\n그리고 더 중요한 건.. 꽤 괜찮은 퀄리티로 말입니다.\n\n그래서 정말 불편해졌고,\n\n훨씬 더 불편한 질문 하나가 남았습니다.\n\n"디자이너의 진짜 가치는 무엇인가?"\n\n그리고 저는 이제 우리가 답해야 할 질문이 바로 이것이라고 생각합니다.\n\n디자이너만의 질문이 아니라,\n\n제품 팀 전체의 질문으로 말입니다.\n\n왜냐하면 지금 벌어지고 있는 일은\n\n디자인만의 문제가 아니라고 생각하기 때문입니다.\n\n저는 이것이 훨씬 더 큰 변화의 시작이라고 생각합니다.\n\n그리고 디자인 밖으로 시선을 돌리기 시작했을 때,\n\n저는 똑같은 패턴이 다른 곳에서도 반복되고 있다는 것을 발견했습니다.`,
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
    script: `이제부터 이 발표 전체를 관통하는 중요한 개념 하나를 소개하고 싶습니다.\n\n기술은 바닥(Floor)을 올립니다.\n\n영어로는 "The Floor Has Been Raised" 라고 하는데, 한국어로는 — 누구나 할 수 있는 최소 수준이 높아졌다 — 라고 이해하시면 될 것 같습니다.\n\n항상 그래왔습니다.\n\n그리고 저는 지금도 같은 일이 벌어지고 있다고 생각합니다.\n\n저희가 두려워하는 이유는, 아까도 말했듯이 그들이 디자인을 만들었기 때문은 아니었습니다.\n\n디자이너가 아닌 사람들이 만든 디자인, 즉 바닥 — 최소 수준이 올라왔기 때문입니다.\n\n그리고.. 저희도 속으로는 이렇게 생각합니다. — 헐.. 내가 피그마로 만든 거보다 훨씬 잘 만들었는데.\n\n저 역시 PM과 함께 슬라이드 덱을 함께 만들고 있었습니다.\n\n그는 챗 GPT로 이미지를 생성해서 덱을 만들었고, 저는 피그마로 디자인을 해서 덱을 만들었습니다.\n\n저희 팀원들은 각자 챗 GPT로 만든 이미지가 더 이해하기 쉽다고 판단하고 그가 만든 디자인으로 진행하기로 했습니다.\n\n처음에는 저 역시 충격을 먹고 받아들이기가 겁이 났지만, 어차피 이건 나와 그의 싸움 또는 나와 AI의 싸움이 아닌, 더 좋은 길로 가야 하는 것이 목적이었음을 받아들였습니다.\n\n그리고 이것은 패턴입니다.\n\n패턴이라고 생각합니다.\n\n왜냐하면 우리는 이 영화를 이미 여러 번 봤기 때문입니다.\n\n다양한 산업에서.\n\n수없이 많이.\n\n그리고 매번 같은 일이 벌어졌습니다.\n\n예전의 바닥을 지키는 데 집중한 사람들은 어려워졌고,\n\n다른 질문을 던진 사람들은 성장했습니다.\n\n그 질문은 이것입니다.\n\n"내 강점을 어떻게 지킬까?"\n\n가 아니라\n\n"바닥이 올라간 지금, 시장은 무엇에 가치를 두고 있을까?"\n\n저는 그게 진짜 질문이라고 생각합니다.\n\n"PM이 프로토타입을 가져오면 어떻게 해야 하지?"\n\n도 아니고,\n\n"어떤 AI 툴을 먼저 배워야 하지?"\n\n도 아닙니다.\n\n바닥은 이미 올라갔습니다.\n\n그 다음은 무엇일까요? 그 다음은.. 천장을 높여야 하는 것입니다.\n\n예를 하나 들어보겠습니다.\n\n사진입니다.`,
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
    script: `디지털 카메라가 등장하기 전,\n\n사진작가는 굉장히 특별한 직업이었습니다.\n\n비싼 장비가 있었고,\n\n필름을 이해했고,\n\n조명을 이해했고,\n\n다른 사람들이 놓치는 순간을 포착할 수 있었습니다.\n\n특히 결혼식이라면 더 그랬습니다.\n\n아마 그 공간에서\n\n그 하루를 제대로 기록할 수 있는 유일한 사람이었을 겁니다.\n\n당시 KPI는 아주 단순했습니다.\n\n좋은 사진을 찍을 수 있는가?\n\n그것이 직업이었고,\n\n그것이 가치였습니다.\n\n그리고 디지털 카메라가 등장하였고, 이제는 스마트폰으로 굉장히 높은 해상도의 사진과 비디오를 찍을 수 있게 되었습니다.\n\n이제는 단지 사진을 잘 찍는 것으로 사진작가의 수명을 이어갈 수가 없게 되었습니다.\n\n이 새로운 테크놀로지 때문에 많은 사진작가, 사진관 등이 사라지게 되었습니다.\n\n하지만.. 모든 사진작가들이 사라진 건 아닙니다.\n\n이런 파도에서도 살아남는 것을 뛰어넘어 훨씬 더 좋은 퀄리티와 더 많은 돈을 벌기 시작하는 작가들이 보이기 시작했습니다.\n\n그들은 어떻게 살아남고, 이제는 그들의 밸류가 더 이상 어떤 테크놀로지도 위협할 수 없는 존재로 성장한 걸까요?`,
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
    script: `성공한 사진작가들은\n\n이런 질문을 하지 않았습니다.\n\n"어떻게 하면 사진을 조금 더 선명하게 찍을 수 있을까?"\n\n대신 이런 질문을 했습니다.\n\n"어떻게 하면 이 결혼식을 잊지 못할 경험으로 만들 수 있을까?"\n\n완전히 다른 질문입니다.\n\n하나는 결과물(Artifact)에 집중합니다.\n\n다른 하나는 결과(Outcome)에 집중합니다.\n\n하나는 사진을 최적화합니다.\n\n다른 하나는 경험을 최적화합니다.\n\n생각해보세요.\n\n우리는 결혼식 사진작가를\n\n카메라를 가지고 있다는 이유로 고용하지 않습니다.\n\n지금은 모두가 카메라를 가지고 있습니다.\n\n셔터를 누를 줄 안다고 고용하는 것도 아닙니다.\n\n그것도 모두가 할 수 있습니다.\n\n우리가 사진작가를 고용하는 이유는\n\n그 사람이 어디에 서 있어야 하는지 알기 때문입니다.\n\n어떤 순간이 곧 벌어질지 알기 때문입니다.\n\n사람들을 어떻게 이끌어야 하는지 알기 때문입니다.\n\n어떻게 이야기를 만들어야 하는지 알기 때문입니다.\n\n그리고 평생 한 번뿐인 순간을\n\n특별한 기억으로 만드는 방법을 알기 때문입니다.\n\n기술은 사라지지 않았습니다.\n\n사진도 사라지지 않았습니다.\n\n바뀐 것은 KPI였습니다.\n\n예전에는\n\n좋은 사진을 찍는 것.\n\n지금은\n\n기억에 남는 결혼식을 만드는 것.\n\n가치의 단위가 확장된 것입니다.\n\n사진(Photo)\n\n에서\n\n결혼식(Wedding)\n\n으로.\n\n그리고 저는 이것이 가장 중요한 교훈이라고 생각합니다.\n\n살아남은 사진작가들은\n\n사진을 포기하지 않았습니다.\n\n대신 사진을 넘어 더 큰 가치를 만들었습니다.\n\n기술이 바닥을 올릴 때마다\n\n항상 같은 일이 벌어집니다.\n\n예전의 차별점은 더 이상 차별점이 아니게 됩니다.\n\n그리고 시장은 더 큰 것,\n\n더 높은 것을 보상하기 시작합니다.\n\n그래서 이제 새로운 질문이 생깁니다.\n\n만약 AI가 디자이너의 바닥을 올리고 있다면,\n\n새로운 KPI는 무엇일까요?\n\n그 이야기는 잠시 후에 다시 돌아오겠습니다.\n\n하지만 먼저 한 가지 예를 더 보여드리고 싶습니다.\n\n사진 이야기는\n\n개인에게 무슨 일이 일어나는지 보여줍니다.\n\n다음 이야기는\n\n팀 전체에 무슨 일이 일어나는지 보여줍니다.`,
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
    script: `잠깐 질문 하나 드릴게요.\n\n여기 농구 좋아하시는 분 계신가요?\n\n저는 농구를 했고,\n\n코치도 했습니다.\n\n그래서 잠깐 농구 이야기를 하겠습니다.\n\n걱정하지 마세요.\n\n결국 디자인 이야기로 돌아옵니다.\n\n90년대 농구를 보셨던 분들은 기억하실 겁니다.\n\n그때 농구는 굉장히 단순했습니다.\n\n센터는 골밑에 있었습니다.\n\n파워포워드도 골밑에 있었습니다.\n\n역할도 명확했습니다.\n\n리바운드.\n\n블락.\n\n골밑 득점.\n\n자기 역할을 하면 됐습니다.\n\n자기 자리에서.\n\n자기 방식으로.`,
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
    script: `그런데 어느 순간 무언가가 바뀌었습니다.\n\n새로운 규칙이 생긴 것도 아니었습니다.\n\n새로운 기술이 등장한 것도 아니었습니다.\n\n새로운 이해가 등장했습니다.\n\n데이터 분석.\n\nAnalytics.\n\n팀들이 농구를 보는 방식이 달라지기 시작했습니다.\n\n그리고 한 가지 사실을 발견했습니다.\n\n3점슛이 생각보다 훨씬 가치 있다는 것이었습니다.\n\n처음에는 천천히 변했습니다.\n\n하지만 결국 모든 팀이 같은 질문을 받게 되었습니다.\n\n"우리 선수들은 슛을 던질 수 있는가?"\n\n심지어 빅맨들도.\n\n센터도.\n\n파워포워드도.\n\n이제 여러분이 센터라고 생각해 보겠습니다.\n\n20년 동안 한 가지를 잘하기 위해 노력했습니다.\n\n리바운드.\n\n수비.\n\n골밑 득점.\n\n그런데 갑자기 게임이 다른 것을 요구하기 시작합니다.\n\n어떤 선수들은 거부했습니다.\n\n"나는 원래 하던 걸 잘하면 돼."\n\n그들은 계속 자신이 잘하던 것만 했습니다.\n\n그리고 조금씩 가치가 떨어졌습니다.\n\n실력이 나빠져서가 아닙니다.\n\n게임이 바뀌었기 때문입니다.\n\n반대로 적응한 선수들도 있었습니다.\n\n브룩 로페즈.\n\n알 호포드.\n\n이미 성공한 선수들입니다.\n\n이미 인정받은 선수들입니다.\n\n그들은 새로운 농구를 불평하지 않았습니다.\n\n대신 자신의 게임을 확장했습니다.\n\n슛을 배웠습니다.\n\n그리고 이전보다 더 가치 있는 선수가 되었습니다.\n\n여기서 중요한 점이 하나 있습니다.\n\n새로운 기술이\n\n기존 기술을 대체한 것이 아닙니다.\n\n브룩 로페즈는 여전히 리바운드를 합니다.\n\n알 호포드는 여전히 수비를 합니다.\n\n예전 KPI는 사라지지 않았습니다.\n\n새로운 KPI가 추가된 것입니다.\n\n질문이 바뀌었습니다.\n\n예전 질문은\n\n"너는 네 역할을 잘하는가?"\n\n였습니다.\n\n새로운 질문은\n\n"너는 네 역할을 잘하면서도, 팀이 새로운 방식으로 승리하도록 도울 수 있는가?"\n\n입니다.\n\n완전히 다른 질문입니다.`,
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
    script: `그리고 오늘날 NBA를 보면\n\n정확히 그런 방향으로 흘러왔습니다.\n\n니콜라 요키치.\n\n빅터 웸반야마.\n\n칼 앤서니 타운스.\n\n최고의 선수들은 더 이상 포지션으로 정의되지 않습니다.\n\n능력으로 정의됩니다.\n\n"이 선수가 팀의 승리에 무엇을 기여할 수 있는가?"\n\n그리고 여기서 제가 정말 중요하게 생각하는 부분이 있습니다.\n\n우승한 팀들은\n\n단순히 슛을 잘 던지는 팀이 아니었습니다.\n\n새로운 환경에서 함께 플레이하는 법을 배운 팀들이었습니다.\n\n스페이싱.\n\n움직임.\n\n타이밍.\n\n의사결정.\n\n공유된 이해.`,
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
    script: `좋습니다.\n\n이제 두 이야기를 나란히 놓고 봅시다.\n\n한 명의 웨딩 사진작가.\n\n그리고 한 명의 NBA 센터.\n\n겉으로 보기에는 전혀 관련이 없어 보입니다.\n\n한 사람은 사진을 찍고,\n\n한 사람은 농구를 합니다.\n\n하지만 저는 사실 같은 이야기라고 생각합니다.\n\n두 경우 모두 새로운 기술이 등장했습니다.\n\n사진에서는 디지털 카메라.\n\n농구에서는 데이터 분석.\n\nAI도 아닙니다.\n\nAGI도 아닙니다.\n\n엄청난 미래 기술도 아닙니다.\n\n그저 원래는 희소했던 능력을 더 많은 사람들이 사용할 수 있게 만든 새로운 도구였습니다.\n\n그리고 그 순간,\n\n흥미로운 일이 벌어졌습니다.\n\n바닥이 올라갔습니다.\n\n사진에서는 더 많은 사람들이 좋은 사진을 찍을 수 있게 되었습니다.\n\n농구에서는 더 많은 선수들이 승리하는 농구가 무엇인지 이해하게 되었습니다.\n\n바닥이 올라간 것입니다.`,
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
    script: `그리고 바닥이 올라가자\n\n시장은 더 이상 예전과 같은 것을 보상하지 않기 시작했습니다.\n\n물론 하루아침에 일어난 일은 아닙니다.\n\n하지만 결국 그렇게 되었습니다.\n\n살아남은 사진작가는\n\n사진을 조금 더 선명하게 찍는 사람이 아니었습니다.\n\n결혼식을 더 특별하게 만드는 사람이었습니다.\n\n살아남은 센터는\n\n골밑 플레이를 조금 더 잘하는 사람이 아니었습니다.\n\n새로운 농구에서 팀이 승리하도록 돕는 사람이었습니다.\n\n여기서 무슨 일이 벌어지고 있는 걸까요?\n\nKPI가 바뀌었습니다.\n\n그리고 새로운 KPI는 더 커졌습니다.\n\n사진(Photo)\n\n→ 결혼식(Wedding)\n\n선수(Player)\n\n→ 팀(Team)\n\n가치의 단위가 확장된 것입니다.\n\n그리고 그 순간 저는 깨달았습니다.\n\n이건 두 개의 이야기가 아닙니다.\n\n하나의 이야기입니다.\n\n계속 반복되는 하나의 패턴입니다.`,
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
    script: `저는 모든 기술 혁신이 거의 비슷한 순서로 움직인다고 생각합니다.\n\n1단계. 기술이 바닥을 올린다.\n\n원래는 희소했던 능력이\n\n더 많은 사람들에게 열립니다.\n\n더 많은 사람들이 할 수 있게 되고,\n\n더 많은 사람들이 참여하게 되고,\n\n더 많은 사람들이 만들 수 있게 됩니다.\n\n2단계. 시장이 KPI를 바꾼다.\n\n원래 당신을 특별하게 만들던 것이\n\n평범해집니다.\n\n그리고 시장은 더 큰 가치를 보상하기 시작합니다.\n\n가치의 단위가 확장됩니다.\n\n3단계. 전문가가 천장을 올린다.\n\n성공하는 사람들은\n\n예전 KPI를 지키려는 사람들이 아닙니다.\n\n가치가 어디로 이동하는지 발견하고,\n\n그 방향으로 자신의 영향력을 확장하는 사람들입니다.`,
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
    script: `기술은 바닥을 올립니다.\n\n시장은 KPI를 바꿉니다.\n\n전문가는 천장을 올립니다.\n\n이 패턴을 보고 나니까\n\n갑자기 다른 산업에서도 같은 현상이 보이기 시작했습니다.\n\n오른쪽 열을 보세요.\n\n커뮤니케이션.\n\n브랜딩.\n\n스토리텔링.\n\n전략.\n\n오디언스.\n\n유통.\n\n이것들은 결과물 자체에 대한 이야기가 아닙니다.\n\n영향력에 대한 이야기입니다.\n\n성과에 대한 이야기입니다.\n\n내가 만드는 것을 넘어\n\n얼마나 큰 영향을 만들 수 있는가에 대한 이야기입니다.\n\n이제 마지막 한 줄을 추가해 보겠습니다.\n\n그리고 저는 지금 우리가 모두 이 질문에 답하려고 하고 있다고 생각합니다.\n\n왜냐하면 AI는 조금 다르기 때문입니다.\n\n사진은 사진의 바닥을 올렸습니다.\n\n농구 데이터 분석은 농구를 바꿨습니다.\n\n하지만 AI는 훨씬 더 넓은 영역의 바닥을 올리고 있습니다.\n\n디자인.\n\n코드.\n\n리서치.\n\n글쓰기.\n\n프로토타이핑.\n\n어쩌면 창작(Creation) 자체의 바닥을 올리고 있는지도 모릅니다.\n\n그렇다면,\n\n이 패턴이 계속 반복된다면,\n\n그리고 저는 그렇게 믿고 있습니다.\n\n우리는 같은 일이 다시 일어날 것이라고 예상해야 합니다.\n\n1단계는 이미 끝났습니다.\n\n기술이 바닥을 올렸습니다.\n\n우리는 지금 그 한가운데에 있습니다.\n\n이제 진짜 질문은 2단계입니다.\n\n시장은 이제 무엇을 보상하기 시작하고 있을까?\n\n왜냐하면 그 답이 있는 곳에\n\n다음 기회가 있기 때문입니다.\n\n그 답이 있는 곳에\n\n다음 병목이 있기 때문입니다.\n\n그 답이 있는 곳에\n\n다음 세대의 전문가들이 가치를 만드는 곳이 있기 때문입니다.\n\n저는 그 답을 알고 있다고 생각합니다.\n\n하지만 그 이야기를 하기 전에,\n\n왜 제가 그렇게 생각하게 되었는지 보여주는 세 가지 신호를 먼저 보여드리겠습니다.`,
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
    script: `이제 세 가지 신호를 한 곳에 모아 봅시다.\n\n결과물 생성은 더 이상 희소하지 않습니다.\n\n선택지는 폭발적으로 늘어났습니다.\n\n역할의 경계는 흐려지고 있습니다.\n\n불만은 생산 능력(Capacity)에서 명확성(Clarity)으로 이동했습니다.\n\n서로 다른 관찰입니다.\n\n서로 다른 현상입니다.\n\n서로 다른 각도입니다.\n\n하지만 저는 모두 같은 모양을 하고 있다고 생각합니다.\n\n왜냐하면 세 가지 신호 모두\n\n같은 이야기를 하고 있기 때문입니다.\n\n창작(Creation)은 풍부해지고 있습니다.\n\n그리고 창작 이후의 것들이 희소해지고 있습니다.\n\n아이디어는 풍부합니다.\n\n디자인도 풍부합니다.\n\n프로토타입도 풍부합니다.\n\n코드도 풍부합니다.\n\n리서치도 풍부합니다.\n\n선택지도 풍부합니다.\n\n하지만.\n\n정렬(Alignment)은 부족합니다.\n\n명확성(Clarity)은 부족합니다.\n\n공유된 이해(Shared Understanding)는 부족합니다.\n\n함께 의사결정을 내리는 능력은 부족합니다.\n\n그리고 저는 그것이 점점 제품 팀에서 가장 희소한 자원이 되어가고 있다고\n\n생각합니다.\n\n우리는 더 이상 창작 문제가 없습니다.\n\n우리는 조율 문제가 있습니다.\n\n한 번 생각해 보세요.\n\n여러분이 경험했던 가장 답답한 팀은 어떤 팀이었습니까?\n\n만들 수 없어서 멈춰 있던 팀이었습니까?\n\n아니면 결정하지 못해서 멈춰 있던 팀이었습니까?\n\n데이터를 다르게 해석하는 사람들.\n\n서로 경쟁하는 프로토타입들.\n\n무엇을 선택해야 하는지 모르는 팀.\n\n권한은 있는데 기준이 없는 조직.\n\n회의가 끝날 때마다\n\n"이건 오프라인으로 이야기해보죠."\n\n라고 말하지만,\n\n그 오프라인 대화조차 아무것도 해결하지 못하는 상황.\n\n아마 많은 분들이 이런 경험이 있으실 겁니다.\n\n무언가를 만들 수는 있습니다.\n\n그런데 함께 움직일 수는 없습니다.\n\n그리고 그 상태는 정말 에너지를 많이 소모합니다.\n\n저는 앞으로 몇 년 동안\n\n이것이 제품 개발(Product Development)의 가장 대표적인 경험이 될 것이라고\n\n생각합니다.\n\n왜냐하면 AI는 생산(Production)의 비용을 계속 낮추고 있기 때문입니다.\n\n매달 더 빨라집니다.\n\n매달 더 쉬워집니다.\n\n매달 더 저렴해집니다.\n\n하지만 조율은 다릅니다.\n\n사람에 대한 문제입니다.\n\n판단(Judgment)에 대한 문제입니다.\n\n신뢰(Trust)에 대한 문제입니다.\n\n공유된 이해에 대한 문제입니다.\n\n이것들은 자동으로 빨라지지 않습니다.\n\n이것들은 자동으로 해결되지 않습니다.\n\n의도적인 투자와 노력이 필요합니다.\n\n그래서 저는 앞으로 하나의 간극이 점점 커질 것이라고 생각합니다.\n\n팀이 만들어낼 수 있는 양.\n\n그리고\n\n팀이 결정할 수 있는 양.\n\n그 사이의 간극입니다.\n\n누군가가 그 간극을 메우지 않는다면,\n\n그 차이는 계속 벌어질 것입니다.\n\n그리고 저는 바로 거기에 기회가 있다고 생각합니다.\n\n아주 큰 기회입니다.\n\n왜냐하면 대부분의 사람들은 여전히\n\n"어떻게 더 만들까?"\n\n를 고민하고 있기 때문입니다.\n\n하지만 앞으로 더 중요한 질문은\n\n"어떻게 더 잘 결정할까?"\n\n가 될 수도 있기 때문입니다.\n\n그리고 그 질문이\n\n제가 오늘 이야기하고 있는 조율의 시대의 출발점입니다.`,
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
    script: `제가 결론을 말씀드리기 전에,\n\n먼저 하나를 보여드리고 싶습니다.\n\n몇 주 전,\n\n저는 링크드인에 질문 하나를 올렸습니다.\n\n사실 꽤 단순한 질문이라고 생각했습니다.\n\nPM이 디자인 리뷰에 들어옵니다.\n\n고품질 프로토타입을 들고 왔습니다.\n\n코드로 만들었습니다.\n\n인터랙티브합니다.\n\n거의 제품처럼 보입니다.\n\n그렇다면 이제 UX의 역할은 무엇일까요?\n\n그게 질문의 전부였습니다.\n\n저는 다양한 의견이 나올 거라고 생각했습니다.\n\n그런데 예상하지 못한 것은\n\n반응의 강도였습니다.\n\n어떤 사람은 말했습니다.\n\n"원래 어려운 것은 화면을 만드는 것이 아니었다."\n\n"어떤 문제를 해결해야 하는지를 아는 것이 어려웠다."\n\n또 어떤 사람은 말했습니다.\n\n"고품질 프로토타입이 등장하는 순간,\n\n리더십은 더 이상 다른 의견을 듣지 않는다."\n\n"토론은 사실상 끝난다."\n\n어떤 사람은\n\nUX가 더 상위 단계로 올라가야 한다고 말했습니다.\n\n어떤 사람은\n\nPM이 디자인 영역을 침범하고 있다고 말했습니다.\n\n어떤 사람은\n\nAI는 디자인을 할 수 없다고 말했습니다.\n\n또 어떤 사람은\n\n그게 핵심이 아니라고 말했습니다.\n\n그리고 댓글을 계속 읽다 보니\n\n재미있는 사실을 발견했습니다.\n\n사람들은 프로토타입에 대해 이야기하고 있는 것처럼 보였습니다.\n\n하지만 사실은\n\n프로토타입에 대해 이야기하고 있지 않았습니다.\n\n같은 상황.\n\n같은 결과물.\n\n같은 기술.\n\n그런데 완전히 다른 결론들.\n\n그 순간 저는 깨달았습니다.\n\n이 논쟁은 AI에 대한 논쟁이 아니었습니다.\n\n디자인에 대한 논쟁도 아니었습니다.\n\n프로토타이핑에 대한 논쟁조차 아니었습니다.\n\n의사결정에 대한 논쟁이었습니다.\n\n누가 방향에 영향을 주는가?\n\n누가 가정을 검증하는가?\n\n누가 더 좋은 아이디어를 선택하는가?\n\n누가 무엇을 만들지 결정하는가?\n\n누가 어떤 문제를 풀어야 하는지 결정하는가?\n\n이것들은 실행의 문제가 아닙니다.\n\n조율의 문제입니다.\n\n오랫동안 결과물은\n\n역할을 정의하는 기준이었습니다.\n\nPM은 요구사항을 작성했습니다.\n\n디자이너는 결과물을 만들었습니다.\n\n엔지니어는 제품을 구현했습니다.\n\n결과물은 각 역할의 경계 안에 있었습니다.\n\n그런데 이제는 아닙니다.\n\nPM도 결과물을 만듭니다.\n\n디자이너도 만듭니다.\n\n엔지니어도 만듭니다.\n\nAI도 만듭니다.\n\n그리고 갑자기 모두가 같은 질문을 하기 시작합니다.\n\n"그럼 내 역할은 무엇인가?"\n\n처음에는 역할에 대한 논쟁처럼 보입니다.\n\n하지만 저는 그렇게 생각하지 않습니다.\n\n저는 이것이 가치에 대한 논쟁이라고 생각합니다.\n\n그리고 그 밑바닥에는\n\n조율의 문제가 숨어 있다고 생각합니다.\n\n왜냐하면 이제는 누구나 만들 수 있기 때문입니다.\n\n그래서 진짜 질문은 바뀌었습니다.\n\n어떻게 결정할 것인가?\n\n어떻게 서로 다른 아이디어를 평가할 것인가?\n\n어떻게 방향을 정할 것인가?\n\n어떻게 정렬할 것인가?\n\n어떻게 함께 앞으로 나아갈 것인가?\n\n저는 그래서 이 대화들이\n\n이렇게 감정적이라고 생각합니다.\n\n사람들은 자신의 역할을 지키고 있다고 생각합니다.\n\n하지만 실제로는\n\n오래된 의사결정 모델이 무너지고 있는 것에 반응하고 있는 것입니다.\n\n예전에는 느린 실행이\n\n정렬 부족을 가려주었습니다.\n\n무언가를 만드는 데 몇 주가 걸렸습니다.\n\n그 과정에서 사람들은\n\n이야기했습니다.\n\n정렬했습니다.\n\n토론했습니다.\n\n설득했습니다.\n\n합의했습니다.\n\n그런데 이제는\n\n프로토타입이 하루 만에 나옵니다.\n\n정렬은 그렇지 않습니다.\n\n그리고 갑자기\n\n팀이 의사결정을 하는 방식의 약점들이\n\n그대로 드러나기 시작합니다.\n\n프로토타입이 문제를 만든 것이 아닙니다.\n\n프로토타입이 문제를 드러낸 것입니다.\n\n그리고 링크드인 토론을 한 발짝 떨어져서 바라보았을 때,\n\n저는 그것이 지금까지 살펴본 모든 신호들과\n\n같은 곳을 가리키고 있다는 것을 깨달았습니다.\n\n결과물은 풍부해지고 있습니다.\n\n선택지는 넘쳐나고 있습니다.\n\n역할의 경계는 흐려지고 있습니다.\n\n사람들의 불만도 바뀌고 있습니다.\n\n그리고 이제는\n\n업계의 대화 자체도 바뀌고 있습니다.\n\n병목은 이동했습니다.\n\n그리고 저는 업계 전체가\n\n이미 그것을 느끼기 시작했다고 생각합니다.`,
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
    script: `제가 말하는 조율은\n\n서로 다른 사람들을 하나의 방향으로 움직이게 하는 능력입니다.\n\n서로 다른 정보를 가진 사람들.\n\n서로 다른 목표를 가진 사람들.\n\n서로 다른 우선순위를 가진 사람들.\n\n서로 다른 의견을 가진 사람들.\n\n그 사람들이\n\n무엇이 중요한지 함께 이해하게 만들고,\n\n그 이해를 바탕으로\n\n같은 방향으로 움직이게 만드는 능력입니다.\n\n원래부터 어려운 일이었습니다.\n\n그런데 한 가지가 바뀌었습니다.\n\n예전에는 실행이 느렸습니다.\n\n무언가를 만드는 데 시간이 걸렸습니다.\n\n그래서 이야기할 시간이 있었습니다.\n\n토론할 시간이 있었습니다.\n\n반대할 시간이 있었습니다.\n\n다시 정렬할 시간이 있었습니다.\n\n도구의 마찰이\n\n의도치 않게 조율의 시간을 만들어 주었습니다.\n\n하지만 지금은 다릅니다.\n\n프로토타입은 이미 존재합니다.\n\n목업도 이미 존재합니다.\n\n코드도 이미 존재합니다.\n\n이해관계자들은 이미 반응하고 있습니다.\n\n팀은 바로 움직여야 합니다.\n\n예전에는 자연스럽게 일어나던 조율이\n\n이제는 의도적으로 만들어져야 합니다.\n\n그래서 저는 현재 AI 담론이 중요한 무언가를 놓치고 있다고 생각합니다.\n\n지금 대부분의 이야기는 개인에 관한 이야기입니다.\n\n1인 창업자.\n\n1인 스타트업.\n\n10배 생산성을 가진 엔지니어.\n\nAI를 활용하는 디자이너.\n\n10명의 일을 하는 한 사람.\n\n그리고 솔직히 말하면\n\n그 이야기들은 맞습니다.\n\n실제로 일어나고 있는 일입니다.\n\n저도 직접 경험했습니다.\n\n몇 년 전이라면 팀 전체가 필요했을 일을\n\n지금은 혼자 할 수 있습니다.\n\n그런데 저를 놀라게 한 것은 다른 것이었습니다.\n\nAI가 강력해질수록\n\n팀은 더 중요해졌습니다.\n\n이 말은 조금 이상하게 들립니다.\n\n그래서 더 중요하다고 생각합니다.\n\n저는 제 인생에서 가장 큰 개인 레버리지(Leverage)를 가지고 있습니다.\n\n그런데도 저는\n\n정렬에 더 많은 시간을 쓰고 있습니다.\n\n의사결정에 더 많은 시간을 쓰고 있습니다.\n\n사람들이 하나의 방향으로 수렴하도록 돕는 데 더 많은 시간을 쓰고 있습니다.\n\n줄어든 것이 아니라,\n\n늘어났습니다.\n\n저는 사람들에게서 멀어진 것이 아니라\n\n사람들에게 더 가까워졌습니다.\n\n그래서 저는 지금을 두 개의 파도로 생각합니다.`,
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
    script: `이 발표를 준비하기 시작했을 때,\n\n저는 이 챕터가 AI 이야기가 될 줄 알았습니다.\n\n20분 정도를 할애해서\n\n도구들을 소개할 생각이었습니다.\n\n바이브 코딩.\n\n프로토타이핑.\n\n에이전트 워크플로우.\n\nMCP.\n\n에이전틱 엔지니어링.\n\n요즘 우리가 모두 실험하고 있는 것들 말입니다.\n\n물론 중요합니다.\n\n배워야 합니다.\n\n저도 배우고 있습니다.\n\n도구는 계속 좋아질 것입니다.\n\n모델도 계속 좋아질 것입니다.\n\n그리고 시장은 우리 모두에게 적응을 요구할 것입니다.\n\n그런데 이 발표를 준비하면 할수록\n\n한 가지를 깨달았습니다.\n\n진짜 이야기는 도구가 아니었습니다.\n\n진짜 이야기는 KPI였습니다.\n\n지금 대부분의 AI 대화는\n\n같은 일을 더 빠르게 하는 방법에 집중되어 있습니다.\n\n더 많은 디자인을 만드는 법.\n\n더 좋은 프롬프트를 쓰는 법.\n\n반복 업무를 자동화하는 법.\n\n물론 좋은 질문입니다.\n\n하지만 저는 우리가 조금 다른 질문을 해야 한다고 생각합니다.\n\n왜냐하면 그 질문들은\n\n하나의 전제를 깔고 있기 때문입니다.\n\n"일 자체는 그대로일 것이다."\n\n"KPI는 변하지 않을 것이다."\n\n"목표는 동일하다."\n\n단지 더 빠르게 할 뿐이다.\n\n그런데 만약 시장이\n\n가치 자체를 바꾸고 있다면 어떨까요?`,
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
    script: `사진 → 결혼식\n\n선수 → 팀\n\n노래 → 문화\n\n결과물 → 의사결정\n\n모든 전문 분야는\n\n자신의 기술(Craft)을 넘어 확장되었습니다.\n\n영향력이 결과물보다 커진 것입니다.\n\n저는 그것이 천장을 올린다는 의미라고 생각합니다.\n\n기술은 바닥을 올립니다.\n\n시장은 KPI를 바꿉니다.\n\n전문가는 천장을 올립니다.\n\n바닥은 실행입니다.\n\n천장은 영향력입니다.\n\n바닥은 창작입니다.\n\n천장은 결과입니다.\n\n바닥은 개인의 기여입니다.\n\n천장은 시스템 전체의 성공입니다.\n\n어쩌면 미래는\n\n가장 좋은 결과물을 만드는 사람의 것이 아닐지도 모릅니다.\n\n어쩌면 미래는\n\n자신의 영향력을 전문 영역 밖으로 확장하는 사람들의 것일지도 모릅니다.\n\n사진에서 결혼식으로.\n\n선수에서 팀으로.\n\n노래에서 문화로.\n\n결과물에서 의사결정으로.\n\n저는 그것이 천장을 올리는 것이라고 생각합니다.\n\n그리고 그것이 바로\n\n조율의 시대가 의미하는 바라고 믿습니다.`,
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
    script: `그렇다면 이제 질문은 이것입니다.\n\n바닥이 계속 올라간다면,\n\n천장은 무엇일까요?\n\n저는 시장이 이미 답하기 시작했다고 생각합니다.\n\n좋은 결과물을 만들 수 있는가?\n\n가 아니라,\n\n조직이 더 좋은 결정을 내리도록 도울 수 있는가?\n\n명확성을 만들 수 있는가?\n\n정렬을 만들 수 있는가?\n\n공유된 이해를 만들 수 있는가?\n\n팀이 함께 앞으로 나아가도록 만들 수 있는가?\n\n왜냐하면 창작이 풍부해질수록\n\n바로 그것이 희소해지기 때문입니다.\n\n그리고 이 패턴을 보고 난 뒤,\n\n저는 더 이상 그것을 보지 않을 수 없었습니다.`,
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
    script: `AI는 선택지를 만드는 비용을 낮췄습니다.\n\n이제 누구나 몇 분 안에 아이디어, 프로토타입, 발표 자료, 코드, 콘텐츠를 만들 수 있습니다.\n\n창작은 풍부해지고 있습니다.\n\n선택은 희소해지고 있습니다.\n\n문제는 더 이상 가능성을 만드는 것이 아닙니다.\n\n문제는 어떤 가능성을 추구할지 결정하는 것입니다.\n\n그것이 조율입니다.\n\n지난 1년 동안, 저는 거의 모든 제품 논의가 네 가지 요소로 귀결된다는 것을 알게 되었습니다.\n\n명확성(Clarity) — 우리가 해결하려는 문제는 무엇인가?\n\n트레이드오프(Trade-offs) — 우리는 무엇을 희생할 의향이 있는가?\n\n우선순위(Priority) — 지금 가장 중요한 것은 무엇인가?\n\n결정(Decision) — 우리는 무엇을 할 것인가, 그리고 누가 책임지는가?\n\n팀이 앞으로 나아가는 데 어려움을 겪을 때, 이 네 가지 중 하나가 빠져 있는 경우가 많습니다.\n\n팀이 빠르게 움직일 때, 네 가지를 모두 갖추고 있는 경향이 있습니다.`,
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
    script: `프로토타입이 다섯 개, 이해관계자가 열 명, 의견이 스무 개일 때,\n\n가장 중요한 기여는 모두가 같은 질문에 동의하도록 돕는 것입니다.\n\n모든 이견이 해결책에 관한 이견은 아닙니다.\n\n때로는 서로 완전히 다른 문제를 풀고 있는 것입니다.\n\n어떤 사람은 채택률을 최적화하고 있고,\n\n어떤 사람은 매출을 최적화하고 있으며,\n\n어떤 사람은 기술적 실현 가능성을 최적화하고 있습니다.\n\n명확성 없이는 팀이 서로 다른 문제에 대한 해결책을 논쟁합니다.\n\n훌륭한 조율자는 무엇을 만들지 결정하기 전에\n\n모두가 같은 문제를 풀고 있는지 확인합니다.`,
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
    script: `의미 있는 모든 결정은 무언가를 포기해야 합니다.\n\n속도 대 품질.\n\n범위 대 집중.\n\n단기 결과 대 장기 투자.\n\n가장 빠르게 움직이는 팀이 반드시 가장 똑똑한 팀은 아닙니다.\n\n그들은 무엇을 희생할 의향이 있는지에 대해 솔직한 팀입니다.\n\n트레이드오프 없이는 모두가 모든 것을 원합니다.\n\n트레이드오프를 명명하는 것이 종종 대화를 풀어주는 열쇠입니다.`,
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
    script: `누구나 선택지를 만들 수 있습니다.\n\nAI가 그것을 쉽게 만들었습니다.\n\n어려운 것은 선택하는 일입니다.\n\n저는 모든 방향이 타당했던 회의에 많이 들어가 봤습니다.\n\n모든 이해관계자의 말이 일리가 있었습니다.\n\n모든 제안이 합리적으로 들렸습니다.\n\n그래도 팀은 결정 없이 자리를 떴습니다.\n\n문제는 지능이 아니었습니다.\n\n문제는 그 순간 무엇이 가장 중요한지 아무도 파악하지 못했다는 것입니다.\n\n우선순위 없이는 모든 것이 중요해집니다.\n\n그리고 모든 것이 중요하면, 아무것도 움직이지 않습니다.`,
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
    script: `결정 없이 끝나는 회의는 그냥 대화입니다.\n\n누군가는 결정을 내려야 합니다.\n\n누군가는 결과에 책임을 져야 합니다.\n\n대부분의 조직에는 실행 시스템이 있습니다.\n\n디자인 시스템. 로드맵. 스프린트 계획. 엔지니어링 프로세스.\n\n하지만 의사결정 시스템을 가진 조직은 매우 드뭅니다.\n\n경쟁하는 아이디어를 어떻게 평가하는가?\n\n이견을 어떻게 초기에 발견하는가?\n\n3개월 뒤 같은 논쟁을 어떻게 반복하지 않는가?\n\n결정 없이는 조직이 진전 대신 대화를 반복합니다.`,
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
  const [presenterOpen, setPresenterOpen] = useState(false);
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const presenterRef = useRef<Window | null>(null);
  const bcRef = useRef<BroadcastChannel | null>(null);

  const prev = useCallback(() => setCurrent(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCurrent(i => Math.min(total - 1, i + 1)), [total]);

  const slide = slides[current];
  // Slides metadata for presenter window
  const slidesForPresenter = useMemo(() =>
    slides.map(s => ({ id: s.id, tag: s.tag, title: s.title, script: s.script })),
  []);

  const currentRef = useRef(current);
  useEffect(() => { currentRef.current = current; }, [current]);

  // BroadcastChannel: set up once, respond to PING with PONG+SLIDES, accept SLIDE from presenter
  useEffect(() => {
    bcRef.current = new BroadcastChannel("ktalk-presenter");
    bcRef.current.onmessage = (e) => {
      const data = e.data;
      if (data?.type === "PING") {
        bcRef.current?.postMessage({ type: "SLIDES", slides: slidesForPresenter, index: currentRef.current });
      }
      if (data?.type === "SLIDE") {
        setCurrent(data.index);
      }
    };
    return () => bcRef.current?.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesForPresenter]);

  // Broadcast current slide index whenever it changes
  useEffect(() => {
    bcRef.current?.postMessage({ type: "SLIDE", index: current });
  }, [current]);

  function openPresenter() {
    if (presenterRef.current && !presenterRef.current.closed) {
      presenterRef.current.focus();
      return;
    }
    const win = window.open(
      "/ktalk/presenter",
      "ktalk-presenter",
      "width=920,height=660,menubar=no,toolbar=no,status=no,resizable=yes"
    );
    presenterRef.current = win;
    setPresenterOpen(true);
    win?.addEventListener("beforeunload", () => setPresenterOpen(false));
  }

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

      {/* Script / Presenter button — always visible */}
      <button
        onClick={openPresenter}
        title="Open presenter window"
        style={{
          position: "absolute",
          top: "20px",
          right: "64px",
          zIndex: 20,
          background: presenterOpen ? T.sienna : "rgba(255,255,255,0.07)",
          border: `1px solid ${presenterOpen ? T.sienna : "rgba(255,255,255,0.12)"}`,
          color: presenterOpen ? T.white : T.stone,
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
