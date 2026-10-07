// Sequence Library — localStorage-backed content store
// Schema designed to be Supabase-ready when the time comes.
// All IDs are stable from the moment a sequence enters the system.

export type EditorialStatus = "draft" | "reviewed" | "gold";
export type CreatedBy = "ai" | "human" | "ai+human";
export type RelationshipType = "next" | "prerequisite" | "parallel";

export interface SequenceRecord {
  id: string;                  // stable slug, e.g. "wwii-beginning"
  question: string;
  beat_1: string;
  beat_2: string;
  beat_3: string;
  beat_4: string;
  status: EditorialStatus;
  topic?: string;
  tags?: string[];
  story_engine?: string;
  must_know_score?: number;
  story_score?: number;
  order_matters_score?: number;
  revelation_score?: number;
  created_by: CreatedBy;
  version: number;
  created_at: number;          // unix ms
  updated_at: number;
}

export interface SequenceRelationship {
  from_id: string;
  to_id: string;
  relationship: RelationshipType;
  rank: number;                // lower = higher priority in "What's next"
}

export interface EvaluationRecord {
  id: string;
  sequence_id: string;
  evaluator_version: string;
  must_know: number | null;
  story: number | null;
  order_matters: number | null;
  revelation: number | null;
  verdict: "keep" | "maybe" | "reject";
  failure_tags?: string[];
  notes?: string;
  created_at: number;
}

export interface SequenceLibrary {
  sequences: SequenceRecord[];
  relationships: SequenceRelationship[];
  evaluations: EvaluationRecord[];
}

const LIBRARY_KEY = "sequence_library_v1";

function emptyLibrary(): SequenceLibrary {
  return { sequences: [], relationships: [], evaluations: [] };
}

function loadLibrary(): SequenceLibrary {
  if (typeof window === "undefined") return emptyLibrary();
  try {
    const raw = localStorage.getItem(LIBRARY_KEY);
    return raw ? (JSON.parse(raw) as SequenceLibrary) : emptyLibrary();
  } catch {
    return emptyLibrary();
  }
}

function saveLibrary(lib: SequenceLibrary): void {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(lib));
  } catch {}
}

// ── Read ──────────────────────────────────────────────────────────

export function getAllSequences(): SequenceRecord[] {
  return loadLibrary().sequences;
}

export function getGoldSequences(): SequenceRecord[] {
  return loadLibrary().sequences.filter((s) => s.status === "gold");
}

export function getSequenceById(id: string): SequenceRecord | undefined {
  return loadLibrary().sequences.find((s) => s.id === id);
}

export function getSequenceByQuestion(question: string): SequenceRecord | undefined {
  const q = question.toLowerCase();
  return loadLibrary().sequences.find((s) => s.question.toLowerCase() === q);
}

export function getNextSequences(fromId: string): SequenceRecord[] {
  const lib = loadLibrary();
  const links = lib.relationships
    .filter((r) => r.from_id === fromId && r.relationship === "next")
    .sort((a, b) => a.rank - b.rank);
  return links
    .map((l) => lib.sequences.find((s) => s.id === l.to_id))
    .filter(Boolean) as SequenceRecord[];
}

// Find gold sequences relevant to a topic/seed — used by suggest orchestrator
export function findGoldByTopic(seed: string, exclude: string[] = []): SequenceRecord[] {
  const terms = seed.toLowerCase().split(/\s+/);
  return getGoldSequences().filter((s) => {
    if (exclude.includes(s.question)) return false;
    const haystack = `${s.question} ${s.topic ?? ""} ${(s.tags ?? []).join(" ")}`.toLowerCase();
    return terms.some((t) => haystack.includes(t));
  });
}

// ── Write ─────────────────────────────────────────────────────────

export function upsertSequence(record: SequenceRecord): void {
  const lib = loadLibrary();
  const idx = lib.sequences.findIndex((s) => s.id === record.id);
  if (idx >= 0) {
    lib.sequences[idx] = { ...record, updated_at: Date.now() };
  } else {
    lib.sequences.push(record);
  }
  saveLibrary(lib);
}

export function updateSequenceStatus(id: string, status: EditorialStatus): void {
  const lib = loadLibrary();
  const seq = lib.sequences.find((s) => s.id === id);
  if (seq) {
    seq.status = status;
    seq.updated_at = Date.now();
    saveLibrary(lib);
  }
}

export function addRelationship(rel: SequenceRelationship): void {
  const lib = loadLibrary();
  const exists = lib.relationships.find(
    (r) => r.from_id === rel.from_id && r.to_id === rel.to_id && r.relationship === rel.relationship
  );
  if (!exists) lib.relationships.push(rel);
  saveLibrary(lib);
}

export function addEvaluation(ev: EvaluationRecord): void {
  const lib = loadLibrary();
  lib.evaluations.push(ev);
  saveLibrary(lib);
}

// Save AI-generated survivors as drafts (called by suggest orchestrator)
export function saveDrafts(cards: Array<{ question: string; sequence: { id: string; text: string }[]; story_engine?: string }>): void {
  const now = Date.now();
  for (const card of cards) {
    if (getSequenceByQuestion(card.question)) continue; // already exists
    const [b1, b2, b3, b4] = card.sequence;
    upsertSequence({
      id: slugify(card.question),
      question: card.question,
      beat_1: b1?.text ?? "",
      beat_2: b2?.text ?? "",
      beat_3: b3?.text ?? "",
      beat_4: b4?.text ?? "",
      status: "draft",
      story_engine: card.story_engine,
      created_by: "ai",
      version: 1,
      created_at: now,
      updated_at: now,
    });
  }
}

// ── Utils ─────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

// Convert a SequenceRecord into the Card shape the frontend expects
export function recordToCard(seq: SequenceRecord): { question: string; sequence: { id: string; text: string }[] } {
  return {
    question: seq.question,
    sequence: [
      { id: "1", text: seq.beat_1 },
      { id: "2", text: seq.beat_2 },
      { id: "3", text: seq.beat_3 },
      { id: "4", text: seq.beat_4 },
    ],
  };
}
