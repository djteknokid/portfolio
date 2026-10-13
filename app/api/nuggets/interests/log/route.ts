import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { join } from "path";

const LOG_DIR   = join(process.cwd(), "evaluation");
const LOG_FILE  = join(LOG_DIR, "v5-evaluation.md");
const R8_FILE   = join(LOG_DIR, "r8-human-review.md");

function pad(n: number) { return String(n).padStart(2, "0"); }

function timestamp() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export async function POST(req: NextRequest) {
  const {
    question,
    mechanic,
    topic,
    rating,
    nextSelected,
    notes,
    r8scores,
  } = await req.json() as {
    question:      string;
    mechanic:      string;
    topic:         string;
    rating?:       string;
    nextSelected?: string;
    notes?:        string;
    r8scores?: {
      coherence:      number | null;
      novelty:        number | null;
      wantToContinue: number | null;
      dropOffCard:    string;
    };
  };

  if (!question) return NextResponse.json({ error: "Missing question" }, { status: 400 });

  await mkdir(LOG_DIR, { recursive: true });

  // General log (always)
  const lines: string[] = [
    `## ${question}`,
    `**Type:** ${mechanic}  |  **Topic:** ${topic}  |  **Time:** ${timestamp()}`,
    "",
  ];
  if (rating)       lines.push(`**Rating:** ${rating}`);
  if (nextSelected) lines.push(`**Next selected:** ${nextSelected}`);
  if (notes?.trim()) {
    lines.push("");
    lines.push(`**Notes:** ${notes.trim()}`);
  }
  lines.push("", "---", "");

  try {
    await appendFile(LOG_FILE, lines.join("\n"));
  } catch (err) {
    console.error("[interests/log]", err);
    return NextResponse.json({ error: "Failed to write log" }, { status: 500 });
  }

  // R8 structured scores — append to r8-human-review.md
  if (r8scores) {
    const score = (v: number | null) => v != null ? String(v) : "—";
    const r8lines = [
      "",
      `### ${timestamp()} — ${topic} / ${mechanic}`,
      "",
      `**Question:** ${question}`,
      "",
      "| Coherence | Novelty | Want to continue | First drop-off |",
      "|-----------|---------|-----------------|---------------|",
      `| ${score(r8scores.coherence)} | ${score(r8scores.novelty)} | ${score(r8scores.wantToContinue)} | ${r8scores.dropOffCard || "none"} |`,
      "",
    ];
    if (notes?.trim()) r8lines.push(`**Notes:** ${notes.trim()}`, "");
    r8lines.push("---", "");

    try {
      await appendFile(R8_FILE, r8lines.join("\n"));
    } catch (err) {
      console.error("[interests/log r8]", err);
      // Non-fatal — general log already succeeded
    }
  }

  return NextResponse.json({ ok: true });
}
