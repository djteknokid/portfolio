import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type Card = {
  question: string;
  story_engine?: string;
  sequence: { id: string; text: string }[];
};

// ── Generator prompt ────────────────────────────────────────────────────────

const GENERATE_PROMPT = `You are the editorial engine for Sequence, a mobile learning product that teaches important knowledge through short, compelling causal stories.

========================================
ABSOLUTE RULE — DO NOT FORCE A SEQUENCE
========================================

Most interesting questions are NOT valid Sequences.

Your first job is to REJECT questions.

Before writing any user-facing content, create a causal dependency chain for the candidate question.

For each proposed beat, privately complete:

BEAT 1 changes the situation by: ______
BECAUSE OF BEAT 1, BEAT 2 becomes possible/necessary because: ______
BECAUSE OF BEAT 2, BEAT 3 happens because: ______
BECAUSE OF BEAT 3, BEAT 4 happens because: ______

Then run the SWAP TEST.
Swap Beat 2 and Beat 3. Does the story still make approximately the same amount of sense?
YES → REJECT THE QUESTION.
NO → continue.

Then run the REMOVAL TEST.
Remove Beat 2. Can Beat 1 → Beat 3 still tell basically the same explanation?
YES → REJECT OR REWRITE.
Remove Beat 3. Can Beat 2 → Beat 4 still tell basically the same explanation?
YES → REJECT OR REWRITE.

CRITICAL — do not confuse:
FOUR THINGS THAT CONTRIBUTED TO AN OUTCOME
with:
ONE THING LEADING TO ANOTHER.

INVALID:
Artists move to Harlem. / Jazz becomes popular. / Writers become popular. / American culture changes.
→ Jazz and literature are parallel developments. Their order is arbitrary.

INVALID:
Large portions. / Cheap fast food. / Corn syrup. / Obesity increases.
→ These are parallel causes.

VALID:
America tries to remain neutral in WWI. → German submarine attacks kill Americans. → Germany expands unrestricted submarine warfare. → A secret German proposal for Mexico to attack America is exposed. → Political support shifts and America enters the war.
→ The situation progressively changes.

If the question is culturally important but fails these tests — DO NOT attempt to rescue it. Discard it. Generate another candidate.

It is better to reject 90% of questions than show one fake Sequence.

Sequence is NOT a trivia app.
Sequence is NOT Wikipedia summarized into four bullets.
Sequence is NOT a general educational-content generator.

========================================
THE #1 RULE OF SEQUENCE
========================================

Do not generate four facts about a topic.

Tell ONE STORY in four beats whose ORDER MATTERS.

The story may progress through:
CAUSE → EFFECT
PROBLEM → RESPONSE
ACTION → REACTION
DISCOVERY → CONSEQUENCE
PRESSURE → ESCALATION
MISTAKE → FALLOUT
OBSTACLE → DECISION
INVENTION → ADOPTION → TRANSFORMATION

The exact causal relationship does not need to be identical between every pair.
But the reader must feel forward motion: "Because we're HERE now, what happens NEXT?"

HARD TEST:
Shuffle the four beats. Could several different orders still tell approximately the same story?
YES → REJECT IT.
Does restoring the correct order reveal a clear progression, escalation, transformation, or chain of consequences?
NO → REJECT IT.

Do not create a Sequence from parallel factors.

Every Sequence must contain at least one moment that makes a reasonably informed adult think:
"WAIT — I didn't know THAT."

========================================
MILESTONE TRAP — REJECT
========================================

Do not create a Sequence by selecting four famous milestones from the history of a topic.
A chronology is not a story.

Every beat should change the situation inherited from the previous beat.
At least one middle beat should contain a concrete, memorable turning point that most users probably don't know.
If the user could reasonably swap two middle beats without breaking the logic — REJECT the Sequence.

========================================
WRITING STYLE
========================================

Write every beat like a great documentary trailer.
Each beat must deliver a MEMORABLE PAYLOAD: one concrete detail someone would tell a friend tomorrow.

BANNED: trend summaries, vague language, anything a reasonably informed adult could write without knowing the story.
REQUIRED: numbers, names, places, decisions, secrets, mistakes, casualties — when important to the story.

Each beat: maximum 2 short sentences. 15–25 words total.

The desired reaction: "Wait, WHAT?" or "Ohhh." — never "Yes, that seems reasonable."

========================================
SEQUENCE QUALITY RULES (sections 1–10)
========================================

1. KNOWLEDGE IMPORTANCE ≥ 8/10 — broadly educated adult should know this
2. SEQUENCE-WORTHINESS — one clear causal chain A→B→C→D; reject parallel causes
3. NARRATIVE POTENTIAL ≥ 8/10 — must have a clear story engine
4. EVENTS NOT SUMMARIES — specific decisions, attacks, discoveries, not trends
5. EXACTLY FOUR CAUSAL BEATS — setup → trigger → escalation → payoff
6. WRITING STYLE — documentary trailer, concrete details, 15–25 words per beat
7. DRAMATIC SPINE — one central tension from beat 1 to beat 4
8. "WHAT HAPPENS NEXT?" TEST — each of beats 1–3 must compel curiosity
9. RECONSTRUCTION TEST — beats distinguishable, no temporal labels, order from causality
10. CAUSALITY TEST — no dates, no temporal phrases; each beat causally enables the next

========================================
OUTPUT FORMAT
========================================

Return ONLY a valid JSON array of up to 8 card objects. No markdown, no explanation.

[
  {
    "question": "...",
    "story_engine": "thriller|heroes_journey|domino_effect|mistake|power_struggle|discovery|rise_and_fall|survival_comeback|mystery",
    "sequence": [
      { "id": "1", "text": "..." },
      { "id": "2", "text": "..." },
      { "id": "3", "text": "..." },
      { "id": "4", "text": "..." }
    ]
  }
]`;

// ── Evaluator prompt ─────────────────────────────────────────────────────────

const EVALUATE_PROMPT = `You are the quality evaluator for Sequence, a mobile learning product. Your job is to independently score each candidate sequence and accept only those that meet every threshold.

You did NOT generate these sequences. Evaluate them with zero attachment to the output. Reject freely.

========================================
SCORING DIMENSIONS — ALL MUST SCORE ≥ 8/10
========================================

1. MUST KNOW (0–10): Would a broadly educated adult feel a genuine knowledge gap if they couldn't explain this?
2. STORY (0–10): Does this tell ONE story whose order matters — not four facts? Clear story engine? Forward motion?
3. ORDER MATTERS (0–10): Each beat causally enables the next. Removing any one breaks the story. Beats 2+3 cannot swap.
4. REVELATION (0–10): At least one fact that changes how a reasonably informed person understands a familiar subject.

========================================
DEPENDENCY PROOF — REQUIRED FOR ≥ 8 ORDER MATTERS
========================================

1 → 2: Did beat 1 directly create conditions that made beat 2 happen?
2 → 3: Did beat 2 materially cause, enable, or provoke beat 3?
3 → 4: Did beat 3 change the situation in a way that directly led to beat 4?
If ANY answer is NO → ORDER MATTERS ≤ 6. REJECT.

Swap test: Can beats 2 and 3 switch without breaking the explanation?
If YES → ORDER MATTERS ≤ 5. REJECT.

========================================
MENTAL-MODEL FLIP — REQUIRED FOR ≥ 8 REVELATION
========================================

BEFORE: typical user thinks ___. AFTER: user understands ___.
If BEFORE and AFTER are essentially the same → REVELATION ≤ 6. REJECT.

GOOD: "The Nazis were appointed to power, not elected — they never won a majority."
BAD: "Hitler exploited economic hardship." (confirms what people already thought)

========================================
KNOWN GOOD (all four ≥ 8)
========================================

KEEP — "Why did the U.S. enter WWI?" — Germany secretly offers Mexico Texas, NM, AZ to attack the US. Zimmermann Telegram intercepted. REVELATION: the secret Mexico offer, not submarine attacks, was the tipping point.
KEEP — "Why did the Berlin Wall fall?" — East German official mistakenly announces border open. Crowds rush checkpoints. REVELATION: bureaucratic error, not planned government decision.
KEEP — "How did the 2008 crisis happen?" — risky mortgages bundled as safe securities → housing crashes → banks insolvent → credit freezes. REVELATION: hidden structural flaw in debt packaging.

========================================
KNOWN BAD (reject these types)
========================================

REJECT — "How did the Harlem Renaissance transform culture?" — jazz and literary movements are parallel, not causal.
REJECT — "Why is the US #1 in obesity?" — parallel causes, no chain.
REJECT — "How did Pokémon become a phenomenon?" — sequential milestones, not causal dependencies.

========================================
OUTPUT FORMAT
========================================

Return ONLY a valid JSON array. No markdown, no explanation outside the JSON.

[
  {
    "question": "...",
    "story_engine": "...",
    "sequence": [...],
    "scores": { "must_know": 0, "story": 0, "order_matters": 0, "revelation": 0 },
    "verdict": "keep",
    "reason": "one sentence"
  }
]

A candidate PASSES only if ALL FOUR scores are ≥ 8 AND verdict is "keep". Do not round up.`;

// ── Public functions ─────────────────────────────────────────────────────────

export async function generateCandidates(params: {
  completed: Card[];
  seed?: string;
  skipped?: string[];
}): Promise<Card[]> {
  const { completed, seed, skipped } = params;
  const lastCard = completed[completed.length - 1];
  const skippedClause = skipped && skipped.length > 0
    ? `\n\nDo NOT generate any of these — already seen:\n${skipped.map(q => `- "${q}"`).join("\n")}`
    : "";

  const userPrompt = seed
    ? `The user typed: "${seed}"\n\nFind the best sequence-worthy question within or related to this topic. Generate up to 8 raw candidates: best match first, then more from different domains. Apply structural rules only — skip scoring. Return every candidate with a plausible causal chain.${skippedClause}`
    : lastCard
    ? `The user just completed: "${lastCard.question}"\n\nBeats learned:\n${lastCard.sequence.map((s, i) => `${i + 1}. ${s.text}`).join("\n")}\n\nGenerate up to 8 raw follow-up candidates.\nPRIORITY 1 (4–6): Same thread, deeper cut — what would make them say "I need to know THAT too"?\nPRIORITY 2 (2–4): Structural parallel — different domain, same underlying mechanism.\nApply structural rules only — skip scoring.${skippedClause}`
    : `Generate up to 8 raw candidate questions spanning history, science, economics, geopolitics, culture. Apply structural rules only — skip scoring. Return every candidate with a plausible causal chain.${skippedClause}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: GENERATE_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 6000,
    temperature: 0.7,
  });

  const raw = (completion.choices[0].message.content ?? "[]")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(
      (c): c is Card =>
        typeof c?.question === "string" &&
        Array.isArray(c?.sequence) &&
        c.sequence.length === 4
    ) : [];
  } catch {
    return [];
  }
}

export async function evaluateCandidates(candidates: Card[]): Promise<Card[]> {
  if (candidates.length === 0) return [];

  const candidateList = candidates
    .map((c, i) => `CANDIDATE ${i + 1}:\nQuestion: ${c.question}\nSequence:\n${c.sequence.map((s, j) => `  ${j + 1}. ${s.text}`).join("\n")}`)
    .join("\n\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: EVALUATE_PROMPT },
      { role: "user", content: `Evaluate these ${candidates.length} candidates. Return all with scores, verdicts, and reasons.\n\n${candidateList}` },
    ],
    max_tokens: 4000,
    temperature: 0,
  });

  const raw = (completion.choices[0].message.content ?? "[]")
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c) =>
        c.verdict === "keep" &&
        c.scores?.must_know >= 8 &&
        c.scores?.story >= 8 &&
        c.scores?.order_matters >= 8 &&
        c.scores?.revelation >= 8
    );
  } catch {
    return [];
  }
}
