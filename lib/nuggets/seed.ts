import { upsertSequence, addRelationship, addEvaluation, getSequenceById } from "./library";
import goldSequences from "./gold-sequences.json";

const SEED_VERSION = "v23";
const SEED_KEY = `sequence_seed_${SEED_VERSION}`;

interface GoldEntry {
  id: string;
  question: string;
  beat_1: string;
  beat_2: string;
  beat_3: string;
  beat_4: string;
  topic: string;
  tags: string[];
  story_engine: string;
  scores: { must_know: number; story: number; order_matters: number; revelation: number };
  eval_notes: string;
  next: { id: string; question: string }[];
}

export function seedLibrary(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_KEY)) return;

  const now = Date.now();

  for (const entry of goldSequences as GoldEntry[]) {
    const existing = getSequenceById(entry.id);
    if (existing && existing.status === "gold") continue;

    upsertSequence({
      id: entry.id,
      question: entry.question,
      beat_1: entry.beat_1,
      beat_2: entry.beat_2,
      beat_3: entry.beat_3,
      beat_4: entry.beat_4,
      status: "gold",
      topic: entry.topic,
      tags: entry.tags,
      story_engine: entry.story_engine,
      must_know_score: entry.scores.must_know,
      story_score: entry.scores.story,
      order_matters_score: entry.scores.order_matters,
      revelation_score: entry.scores.revelation,
      created_by: "ai+human",
      version: 1,
      created_at: now,
      updated_at: now,
    });

    addEvaluation({
      id: `eval-${entry.id}-v1`,
      sequence_id: entry.id,
      evaluator_version: "human-v1",
      must_know: entry.scores.must_know,
      story: entry.scores.story,
      order_matters: entry.scores.order_matters,
      revelation: entry.scores.revelation,
      verdict: "keep",
      notes: entry.eval_notes,
      created_at: now,
    });

    for (let i = 0; i < entry.next.length; i++) {
      const nq = entry.next[i];
      if (!getSequenceById(nq.id)) {
        upsertSequence({
          id: nq.id, question: nq.question,
          beat_1: "", beat_2: "", beat_3: "", beat_4: "",
          status: "draft", topic: "history",
          created_by: "human", version: 0, created_at: now, updated_at: now,
        });
      }
      addRelationship({ from_id: entry.id, to_id: nq.id, relationship: "next", rank: i });
    }
  }

  localStorage.setItem(SEED_KEY, "1");
}
