import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { appendFile, mkdir } from "fs/promises";
import { join } from "path";
import { EVALUATOR_PROMPT } from "../evaluator-prompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type EvaluationRequest = {
  // Card context
  questionTitle: string;
  mechanic: string;
  content: Record<string, unknown>;
  knowledgeReveal: string;
  conversationTakeaway: string;
  nextDirections: { type: string; description: string }[];
  // Session context
  topic: string;
  intent?: {
    learningIntent: string;
    learningOrientation: string;
    desiredOutcome: string;
    startingFocus: string;
    avoidDrift: string[];
  } | null;
  currentFocus?: string | null;
  sessionDepth: number;
  completedQuestions?: string[];
  experiment?: string | null;
};

async function runEvaluation(payload: EvaluationRequest): Promise<Record<string, unknown>> {
  const escapeCheck = (payload.experiment === "intent-recovery" && payload.sessionDepth >= 3 && payload.intent)
    ? `\n**Experiment: intent-recovery** — At depth ${payload.sessionDepth}, the Director was asked to include at least one next direction that reconnects with the original learning goal ("${payload.intent.learningIntent}"). Please assess: does at least one of the three nextDirections offer a meaningful route back to the original goal, or do all three continue narrowing the current branch?`
    : "";

  const userPrompt = `## Evaluation Input

**Original user learning request:** ${payload.topic}
**Interpreted learning intent:** ${payload.intent?.learningIntent ?? "Not available"}
**Learning orientation:** ${payload.intent?.learningOrientation ?? "Not available"}
**Desired outcome:** ${payload.intent?.desiredOutcome ?? "Not available"}
**Current exploration depth:** ${payload.sessionDepth} questions in
**Current focus:** ${payload.currentFocus ?? payload.intent?.startingFocus ?? "Not available"}
**Avoid drifting into (advisory):** ${payload.intent?.avoidDrift?.join(", ") ?? "None specified"}${escapeCheck}

**Generated question title:** ${payload.questionTitle}
**Game mechanic:** ${payload.mechanic}
**Full playable content:**
${JSON.stringify(payload.content, null, 2)}

**Knowledge Reveal:** ${payload.knowledgeReveal}
**Conversation Takeaway:** ${payload.conversationTakeaway}

**Three next-question directions:**
${payload.nextDirections.map((d, i) => `${i + 1}. [${d.type.toUpperCase()}] ${d.description}`).join("\n")}

**Recent completed questions (for repetition check):**
${(payload.completedQuestions ?? []).slice(-10).map((q) => `- "${q}"`).join("\n") || "None"}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: EVALUATOR_PROMPT },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 800,
    temperature: 0,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content ?? "{}";
  return JSON.parse(raw);
}

function renderCardContent(mechanic: string, content: Record<string, unknown>): string {
  const lines: string[] = [];

  if (mechanic === "matching" || mechanic === "image-matching") {
    const pairs = content.pairs as { id?: string; left?: string; right?: string; imageUrl?: string }[] | undefined;
    if (pairs?.length) {
      lines.push("**Pairs (left → right):**");
      for (const p of pairs) {
        const img = p.imageUrl ? ` _(image)_` : "";
        lines.push(`- ${p.left}${img} → ${p.right}`);
      }
    }
  } else if (mechanic === "grouping") {
    const groups = content.groups as { id?: string; label?: string; items?: string[] }[] | undefined;
    if (groups?.length) {
      lines.push("**Groups:**");
      for (const g of groups) {
        lines.push(`- **${g.label}:** ${(g.items ?? []).join(", ")}`);
      }
    }
  } else if (mechanic === "sequence") {
    const steps = content.steps as { id?: string; text?: string }[] | undefined;
    if (steps?.length) {
      lines.push("**Sequence:**");
      steps.forEach((s, i) => lines.push(`${i + 1}. ${s.text}`));
    }
  } else if (mechanic === "multiple-choice") {
    const options = content.options as { id?: string; text?: string; correct?: boolean }[] | undefined;
    if (options?.length) {
      lines.push("**Options:**");
      for (const o of options) {
        lines.push(`- ${o.correct ? "✓" : "✗"} ${o.text}`);
      }
    }
  }

  if (content.mediaUrl) lines.push(`**Media:** ${content.mediaUrl}`);
  if (content.imageUrl) lines.push(`**Image:** ${content.imageUrl}`);
  if (content.audioUrl) lines.push(`**Audio:** ${content.audioUrl}`);

  return lines.join("\n");
}

async function appendEvaluationToFile(
  payload: EvaluationRequest,
  result: Record<string, unknown>
): Promise<void> {
  const evalDir = join(process.cwd(), "evaluation");
  await mkdir(evalDir, { recursive: true });

  const filePath = join(evalDir, "v6-ai-evaluation.md");
  const timestamp = new Date().toISOString().replace("T", " ").substring(0, 16);

  const scores = result.scores as Record<string, number | null> | undefined;
  const s = (v: number | null | undefined) => v != null ? `${v}/5` : "—";
  const scoreBlock = scores
    ? `| Accessibility | Validity | Engagement | Learning | Alignment | NextQ |
| ${s(scores.beginnerAccessibility)} | ${s(scores.logicalValidity)} | ${s(scores.engagementCreativity)} | ${s(scores.learningValue)} | ${s(scores.intentAlignment)} | ${s(scores.nextQuestionQuality)} |

**Q-score:** ${result.questionQualityScore ?? "—"}/100  |  **Journey-score:** ${result.journeyQualityScore ?? "—"}/100`
    : "";

  const rawScore = result.weightedScore as number | null | undefined;
  const verdict = (result.verdict ?? (rawScore != null
    ? (rawScore >= 85 ? "excellent" : rawScore >= 75 ? "good" : rawScore >= 60 ? "needs_improvement" : "poor")
    : "insufficient_evidence")) as string;
  const strengths = (result.strengths as string[] | undefined) ?? [];
  const issues = (result.issues as string[] | undefined) ?? [];
  const evidence = result.scoreEvidence as Record<string, string> | undefined;
  const evidenceBlock = evidence
    ? `**Score evidence:**
- Accessibility: ${evidence.beginnerAccessibility ?? "—"}
- Validity: ${evidence.logicalValidity ?? "—"}
- Engagement: ${evidence.engagementCreativity ?? "—"}
- Learning: ${evidence.learningValue ?? "—"}
- Alignment: ${evidence.intentAlignment ?? "—"}
- NextQ: ${evidence.nextQuestionQuality ?? "—"}`
    : "";
  const cardContent = renderCardContent(payload.mechanic, payload.content);

  const nextDirs = payload.nextDirections ?? [];
  const evalDirs = (result.nextDirections as { type: string; score: number; reason: string }[] | undefined) ?? [];
  const nextBlock = nextDirs.map((d, i) => {
    const ev = evalDirs[i];
    return `- **[${d.type.toUpperCase()}]** "${d.description}" ${ev ? `— score ${ev.score}/5: ${ev.reason}` : ""}`;
  }).join("\n");

  const mmOpp = result.multimediaOpportunity as { recommended?: boolean; type?: string; reason?: string } | undefined;
  const mmBlock = mmOpp?.recommended
    ? `**Multimedia opportunity:** ${mmOpp.type} — ${mmOpp.reason}`
    : "";

  const entry = `
## ${payload.questionTitle}
**Type:** ${payload.mechanic}  |  **Topic:** ${payload.topic}  |  **Time:** ${timestamp}${payload.experiment ? `  |  **Experiment:** ${payload.experiment}` : ""}
**Verdict:** ${verdict}  |  **Score:** ${result.weightedScore ?? "—"}/100  |  **Critical failure:** ${result.criticalFailure ? "YES" : "no"}

${scoreBlock}

**Orientation:** ${payload.intent?.learningOrientation ?? "unknown"}  |  **Depth:** ${payload.sessionDepth}  |  **Current focus:** ${payload.currentFocus ?? payload.intent?.startingFocus ?? "—"}

${cardContent}

**Knowledge Reveal:** ${payload.knowledgeReveal}
**Conversation Takeaway:** ${payload.conversationTakeaway}

**Next directions:**
${nextBlock}

${evidenceBlock}
${mmBlock}
${strengths.length > 0 ? `**Strengths:**\n${strengths.map((s) => `- ${s}`).join("\n")}` : ""}
${issues.length > 0 ? `**Issues:**\n${issues.map((i) => `- ${i}`).join("\n")}` : ""}
${result.topImprovement ? `**Top improvement:** ${result.topImprovement}` : ""}
${result.criticalFailureReasons && (result.criticalFailureReasons as string[]).length > 0 ? `**Critical failure reasons:** ${(result.criticalFailureReasons as string[]).join("; ")}` : ""}

---`;

  await appendFile(filePath, entry, "utf-8");
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json() as EvaluationRequest;

    const result = await runEvaluation(payload);
    await appendEvaluationToFile(payload, result);

    return NextResponse.json({ ok: true, verdict: result.verdict, weightedScore: result.weightedScore });
  } catch (err) {
    console.error("[evaluate] Failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
