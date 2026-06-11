export interface Slide {
  id: number;
  type: "cover" | "statement" | "timeline" | "split" | "quote" | "list" | "closing" | "table";
  title?: string;
  subtitle?: string;
  body?: string;
  items?: string[];
  rows?: { principle: string; references: string }[];
  quote?: string;
  author?: string;
  label?: string;
  question?: string; // parent question shown at top for context
}

export const slides: Slide[] = [
  {
    id: 1,
    type: "cover",
    title: "The Future of Design",
    subtitle: "Figma → Vibe Coding → Agentic Engineering",
    label: "David Lee · May 2026",
  },
  {
    id: 2,
    type: "list",
    title: "I studied your team before I came here.",
    items: [
      "1. Quick Fix Bot — AI agent that builds and improves design system components automatically",
      "2. PM brings prototypes — PD starts from scratch, doesn't get trapped in the PM's frame",
      "3. Production High-fi auto-generation — both component accuracy AND layout hierarchy are failing",
      "4. 'Good design' definition — your team hasn't defined it yet. You asked me how.",
    ],
  },
  {
    id: 3,
    type: "statement",
    question: "Q1. AI 에이전트가 디자인 시스템 컴포넌트를 자동으로 수정할 때 — 잘못된 변경 사항을 어떻게 감지하나요?",
    title: "Quick Fix Bot — AI agent that builds and improves design system components.",
    body: "Bot is called → agent reads Figma file + policy docs → does the work (new component or improvement) → designer + FE dev review → merge to main. Designer and dev are now reviewers, not builders.",
  },
  {
    id: 4,
    type: "statement",
    question: "Q1. AI 에이전트가 디자인 시스템 컴포넌트를 자동으로 수정할 때 — 잘못된 변경 사항을 어떻게 감지하나요?",
    title: "The bot doesn't know it's wrong. That's your job.",
    body: "AI doesn't catch its own mistakes — it confidently generates the most statistically likely output. The wrong prop, the wrong button, the wrong layout. All delivered with the same confidence as a correct answer. You need a review layer that the bot cannot skip.",
  },
  {
    id: 5,
    type: "statement",
    question: "Q1. AI 에이전트가 디자인 시스템 컴포넌트를 자동으로 수정할 때 — 잘못된 변경 사항을 어떻게 감지하나요?",
    title: "Build the catch into the loop — not onto the end of it.",
    body: "The mistake is treating review as a final gate. Bot runs → output lands → human checks. That's not a loop, that's a waterfall with extra steps. The real structure: every failure gets logged. Next round reads the log first. The bot that made the mistake teaches the next version how not to make it.",
  },
  {
    id: 6,
    type: "list",
    question: "Q1. AI 에이전트가 디자인 시스템 컴포넌트를 자동으로 수정할 때 — 잘못된 변경 사항을 어떻게 감지하나요?",
    title: "Three layers. Each one catches what the previous one missed.",
    items: [
      "Layer 1: Rules — DS spec encoded as constraints. Wrong prop = blocked before output.",
      "Layer 2: Auto-review — scores output across checkpoints. Below threshold → regenerate.",
      "Layer 3: Human — designer + FE review on preview. Catches what scoring can't see.",
    ],
  },
  {
    id: 7,
    type: "statement",
    question: "Q1. AI 에이전트가 디자인 시스템 컴포넌트를 자동으로 수정할 때 — 잘못된 변경 사항을 어떻게 감지하나요?",
    title: "Every mistake the bot makes is worth more than a correct output.",
    body: "A correct output teaches nothing. A wrong output — logged, analyzed, fed back — makes the next generation better. The bot's errors are training data. Treat them that way. The team that captures every failure compounds quality over time. The team that just reruns the bot stays flat.",
  },
  {
    id: 8,
    type: "statement",
    question: "Q2. PM이 프로토타입을 들고 왔을 때, 디자이너가 제일 먼저 하는 게 뭔가요?",
    title: "The artifact didn't change. The expectations did.",
    body: "PM always brought something. That's not new. What changed: it's built overnight and looks production-ready. But polished ≠ validated. The more finished it looks, the harder it is to question what's underneath.",
  },
  {
    id: 9,
    type: "statement",
    question: "Q2. PM이 프로토타입을 들고 왔을 때, 디자이너가 제일 먼저 하는 게 뭔가요?",
    title: "PM now has a week they didn't have before. Use it for validation.",
    body: "Building used to take a week. Now it takes one night. The smart PM uses that freed week to talk to users before the designer touches anything. Designer refines what's proven — not what's assumed.",
  },
  {
    id: 10,
    type: "statement",
    question: "Q2. PM이 프로토타입을 들고 왔을 때, 디자이너가 제일 먼저 하는 게 뭔가요?",
    title: "Basketball stopped talking about positions. Design should too.",
    body: "Jokic is a center who plays like a PG. Draymond is a PF who runs the team. Nobody talks about their position — they talk about what they can do. When PM can do UX work and UX can do PM work, the role stops mattering. Capability does.",
  },
  {
    id: 11,
    type: "statement",
    question: "Q2. PM이 프로토타입을 들고 왔을 때, 디자이너가 제일 먼저 하는 게 뭔가요?",
    title: "Roles still matter. But define them after you see the talent — not before.",
    body: "Map tasks to capabilities. Not titles. It changes per project, per feature, per team. Find the best talent first. The role will find itself.",
  },
  {
    id: 12,
    type: "statement",
    question: "Q2. PM이 프로토타입을 들고 왔을 때, 디자이너가 제일 먼저 하는 게 뭔가요?",
    title: "I was just offered a PM role. The bar goes up — not down.",
    body: "20 years of design. I built a prototype that went to two CEOs and a board. The VP asked: why is David in design? When the PM was the best designer in the room, the designer on the team can't coast. I know what micro-level innovation looks like. I'll ask for it.",
  },
  {
    id: 13,
    type: "list",
    question: "Q2. PM이 프로토타입을 들고 왔을 때, 디자이너가 제일 먼저 하는 게 뭔가요?",
    title: "The only question when PM brings a prototype.",
    items: [
      "Has it been validated?",
      "Yes → work from it. Raise it to ship quality.",
      "No → return it. PM validates first.",
      "No + no time → UX owns validation. Be explicit. Don't pretend it's been done.",
    ],
  },
  {
    id: 14,
    type: "statement",
    question: "Q3. Production High-fi 자동 생성이 안 되는 게 — 컴포넌트 문제인가요, 구성/위계 문제인가요?",
    title: "Both. But they are completely different problems with different fixes.",
  },
  {
    id: 15,
    type: "split",
    question: "Q3. Production High-fi 자동 생성이 안 되는 게 — 컴포넌트 문제인가요, 구성/위계 문제인가요?",
    title: "Component accuracy = missing knowledge. Solvable.",
    body: "AI repeats the same mistakes because it doesn't know the rules yet. In FioriWeb: Avatar with wrong prop, TableSelection in wrong place, wrong button design. We built an auto-review loop — every mistake gets logged to a knowledge base. Next generation reads the KB first. Same mistake never happens twice. This converges over time.",
  },
  {
    id: 16,
    type: "split",
    question: "Q3. Production High-fi 자동 생성이 안 되는 게 — 컴포넌트 문제인가요, 구성/위계 문제인가요?",
    title: "Layout/hierarchy = missing judgment. Harder.",
    body: "Components are correct but the screen feels wrong. Two primary buttons competing. Subsections claiming equal weight. Information spread flat instead of top-down. KB alone can't fix this — because the AI doesn't know what the screen is FOR.",
  },
  {
    id: 17,
    type: "list",
    question: "Q3. Production High-fi 자동 생성이 안 되는 게 — 컴포넌트 문제인가요, 구성/위계 문제인가요?",
    title: "FioriWeb fix: force these four questions before any code.",
    items: [
      "Role — who is using this screen?",
      "Object — what business object are they working with?",
      "Floorplan — is this a list, a detail, or a task queue?",
      "Primary action — what is the ONE thing the user must do?",
    ],
  },
  {
    id: 18,
    type: "statement",
    question: "Q3. Production High-fi 자동 생성이 안 되는 게 — 컴포넌트 문제인가요, 구성/위계 문제인가요?",
    title: "One hard rule fixed 80% of hierarchy problems.",
    body: "\"One emphasized button per screen. If two appear — the generation is wrong.\" This single constraint forces the AI to decide what matters before it places anything. Write the judgment into the harness. Not into a documentation page.",
  },
  {
    id: 19,
    type: "statement",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "We tried all three. Rules, scoring, examples. In that order. For a reason.",
  },
  {
    id: 20,
    type: "statement",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "Step 1: Rules. Stops the wrong things. Not enough on its own.",
    body: "FioriWeb had SAP Fiori specs — button hierarchy, form layout, color tokens. We encoded this into SKILL.md. Component accuracy improved fast. But screens that followed every rule were still flat, generic, without hierarchy. Rules prevent bad. They don't create good.",
  },
  {
    id: 21,
    type: "statement",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "Step 2: Scoring. This closes the loop.",
    body: "fiori-expert-review scores 0–100 across 15 checkpoints. Below 95 → auto-regenerate. But the real value wasn't the score. It was the reason for each deduction — logged to knowledge-base.md, fed into the next round. Every failure makes the next generation smarter. The loop runs itself.",
  },
  {
    id: 22,
    type: "statement",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "Step 3: Taste. Hardest. Raises the ceiling.",
    body: "Rules and scoring get you to 'not wrong.' Taste gets you to memorable. We defined taste.md — principles extracted from Apple, Stripe, Linear, Ramp. Not inspiration. Transferable rules. Single Obvious Action. Radical Reduction. Immediate Value Visibility. Then connected this to scoring as a separate layer: non-negotiables vs. differentiators.",
  },
  {
    id: 23,
    type: "list",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "Don't start with taste. You can't teach what you can't measure.",
    items: [
      "Step 1: Rules — define what's wrong. Encode into harness.",
      "Step 2: Scoring loop — violations auto-logged to KB. Quality converges.",
      "Step 3: Taste — only after 1 and 2 are running.",
      "The right question for taste: 'What should the user FEEL after using this screen?' Define the emotion first. Derive the principles backwards.",
    ],
  },
  {
    id: 24,
    type: "statement",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "Rules have a ceiling. You can follow every rule and still make a forgettable screen.",
    body: "Rules define negative space — 'don't do this.' But inside the allowed space, AI picks the most average option. Equal weight on everything. No clear entry point. Actions with no reason to click. No violations. Nothing memorable. This is the ceiling of rules.",
  },
  {
    id: 25,
    type: "statement",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "DaVinci의 관점에서 — '좋은 디자인'을 어떻게 정의할까요?",
    body: "Named principles before rules. We wrote 7 taste principles — not guidelines, not component specs. Each one names a behavior: \"Interaction as Behavior,\" \"Signature Moment,\" \"Invisible Complexity.\" Each has a reference product that expresses it (Shazam, Linear, Stripe). The AI doesn't follow rules — it reasons from examples. Giving it named principles with real references gave it a way to explain its decisions, not just execute them. We store this in taste.md as a global file — so whenever a designer vibe codes using Claude Code, the taste principles are already in context, influencing every decision the AI makes.",
  },
  {
    id: 26,
    type: "table",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "The 7 DaVinci Taste Principles",
    rows: [
      { principle: "Single Obvious Action", references: "Shazam · Google Search" },
      { principle: "Interaction as Behavior", references: "Tinder swipe · iPhone pinch-to-zoom" },
      { principle: "Immediate Value Visibility", references: "Apple AirPods pairing · Spotify Now Playing" },
      { principle: "Radical Reduction", references: "Apple product pages · Dieter Rams · Molly Studio" },
      { principle: "Emotional Feedback", references: "iOS micro-interactions · Loom recording pulse" },
      { principle: "Signature Moment", references: "Netflix \"Tudum\" · Shazam animation · Linear command palette" },
      { principle: "Invisible Complexity", references: "Stripe · Linear issue tracking · Ramp" },
    ],
  },
  {
    id: 27,
    type: "list",
    question: "Q4. '좋은 디자인'을 AI가 학습할 수 있게 어떻게 정의하고 계세요?",
    title: "Three documents. Three jobs. All required.",
    items: [
      "SKILL.md STEP 1 — defines purpose before code. Role, Object, Floorplan, Primary action. This is the designer.",
      "taste.md — 7 principles anchored to real products. Signature Moment, Radical Reduction, Immediate Value. This raises the ceiling.",
      "Rules — check that output passes minimum standards. This is the inspector.",
      "Design.md alone = inspector only. The designer and the taste layer are missing.",
    ],
  },
  {
    id: 28,
    type: "list",
    title: "What I also noticed. Questions you didn't ask.",
    items: [
      "5. Bot fails → human takes over. Who designed that handoff moment?",
      "6. PM prototype anchors you even when you think it doesn't.",
      "7. DS covers 80%. Who teaches the AI the other 20%?",
      "8. No shared definition of good design. AI can't optimize for what isn't written.",
      "9. Claude Design vs Claude Code vs Cursor — do you know which one, and when?",
      "10. 1 week → 2 days alignment. What did you lose in that compression?",
      "11. 석봉이 knows your brand today. Who updates it when the brand evolves?",
      "12. Squads change every project. Where does institutional memory live?",
    ],
  },
  {
    id: 29,
    type: "statement",
    title: "Bot fails → human takes over. Who designed that handoff moment?",
  },
  {
    id: 30,
    type: "statement",
    title: "PM prototype anchors you even when you think it doesn't.",
  },
  {
    id: 31,
    type: "statement",
    title: "DS covers 80%. Who teaches the AI the other 20%?",
  },
  {
    id: 32,
    type: "statement",
    title: "No shared definition of good design. AI can't optimize for what isn't written.",
  },
  {
    id: 33,
    type: "statement",
    title: "Claude Design vs Claude Code vs Cursor — do you know which one, and when?",
  },
  {
    id: 34,
    type: "statement",
    title: "1 week → 2 days alignment. What did you lose in that compression?",
  },
  {
    id: 35,
    type: "statement",
    title: "석봉이 knows your brand today. Who updates it when the brand evolves?",
  },
  {
    id: 36,
    type: "statement",
    title: "Squads change every project. Where does institutional memory live?",
  },
];
