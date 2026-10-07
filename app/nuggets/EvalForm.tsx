"use client";

import { brand } from "./brand";

export type Verdict = "KEEP" | "MAYBE" | "REJECT";

export interface SequenceRating {
  mustKnow: number | null;
  story: number | null;
  orderMatters: number | null;
  revelation: number | null;
  verdict: Verdict | null;
}

export interface WhatsNextRating {
  mustKnow: number | null;
  infoItch: number | null;
  nextTap: number | null;
  verdict: Verdict | null;
}

function ScoreRow({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
      <span style={{ fontSize: "13px", color: brand.text.secondary, fontWeight: "500", flex: 1 }}>{label}</span>
      <div style={{ display: "flex", gap: "3px" }}>
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            style={{
              width: "22px", height: "22px", borderRadius: "4px", border: "none",
              background: value !== null && n <= value ? brand.text.primary : brand.bg.raised,
              color: value !== null && n <= value ? brand.bg.page : brand.text.muted,
              fontSize: "10px", fontWeight: "600", cursor: "pointer",
              transition: brand.motion.snap, flexShrink: 0, padding: 0,
            }}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function VerdictPicker({ value, onChange }: { value: Verdict | null; onChange: (v: Verdict) => void }) {
  const options: Verdict[] = ["KEEP", "MAYBE", "REJECT"];
  const colors: Record<Verdict, string> = { KEEP: "#6ee7b7", MAYBE: "#fcd34d", REJECT: "#fca5a5" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
      <span style={{ fontSize: "13px", color: brand.text.secondary, fontWeight: "500", flex: 1 }}>Verdict</span>
      <div style={{ display: "flex", gap: "6px" }}>
        {options.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              padding: "5px 10px", borderRadius: "6px",
              border: `1px solid ${value === v ? colors[v] : brand.border.item}`,
              background: value === v ? `${colors[v]}18` : "transparent",
              color: value === v ? colors[v] : brand.text.muted,
              fontSize: "10px", fontWeight: "700", letterSpacing: "0.08em",
              cursor: "pointer", transition: brand.motion.snap,
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SequenceEval({
  rating,
  onChange,
}: {
  rating: SequenceRating;
  onChange: (r: SequenceRating) => void;
}) {
  const set = (patch: Partial<SequenceRating>) => onChange({ ...rating, ...patch });
  return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: brand.radius.item, border: `1px solid ${brand.border.item}`, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${brand.border.item}` }}>
        <span style={{ ...brand.type.label, color: brand.text.muted }}>Rate this sequence</span>
      </div>
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <ScoreRow label="Must Know"     value={rating.mustKnow}    onChange={(v) => set({ mustKnow: v })} />
        <ScoreRow label="Story"         value={rating.story}       onChange={(v) => set({ story: v })} />
        <ScoreRow label="Order Matters" value={rating.orderMatters} onChange={(v) => set({ orderMatters: v })} />
        <ScoreRow label="Revelation"    value={rating.revelation}  onChange={(v) => set({ revelation: v })} />
        <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
        <VerdictPicker value={rating.verdict} onChange={(v) => set({ verdict: v })} />
      </div>
    </div>
  );
}

export function WhatsNextEval({
  rating,
  onChange,
}: {
  rating: WhatsNextRating;
  onChange: (r: WhatsNextRating) => void;
}) {
  const set = (patch: Partial<WhatsNextRating>) => onChange({ ...rating, ...patch });
  return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: brand.radius.item, border: `1px solid ${brand.border.item}`, overflow: "hidden" }}>
      <div style={{ padding: "10px 14px", borderBottom: `1px solid ${brand.border.item}` }}>
        <span style={{ ...brand.type.label, color: brand.text.muted }}>Rate these suggestions</span>
      </div>
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <ScoreRow label="Must Know"        value={rating.mustKnow} onChange={(v) => set({ mustKnow: v })} />
        <ScoreRow label="Information Itch" value={rating.infoItch} onChange={(v) => set({ infoItch: v })} />
        <ScoreRow label="Next-Tap Desire"  value={rating.nextTap}  onChange={(v) => set({ nextTap: v })} />
        <div style={{ width: "100%", height: "1px", background: brand.border.item }} />
        <VerdictPicker value={rating.verdict} onChange={(v) => set({ verdict: v })} />
      </div>
    </div>
  );
}

export function buildCopyText({
  question,
  sequence,
  suggestions,
  seqRating,
  nextRating,
}: {
  question: string;
  sequence: { id: string; text: string }[];
  suggestions: string[];
  seqRating: SequenceRating;
  nextRating: WhatsNextRating;
}): string {
  const beats = sequence.map((s, i) => `  ${i + 1}. ${s.text}`).join("\n");
  const qs = suggestions.length > 0
    ? suggestions.map((q, i) => `  ${i + 1}. ${q}`).join("\n")
    : "  (not yet loaded)";

  return [
    "=== SEQUENCE EVAL ===",
    "",
    `QUESTION: ${question}`,
    "",
    "SEQUENCE:",
    beats,
    "",
    "RATING:",
    `  Must Know:     ${seqRating.mustKnow ?? "—"}/10`,
    `  Story:         ${seqRating.story ?? "—"}/10`,
    `  Order Matters: ${seqRating.orderMatters ?? "—"}/10`,
    `  Revelation:    ${seqRating.revelation ?? "—"}/10`,
    `  Verdict:       ${seqRating.verdict ?? "—"}`,
    "",
    "=== WHAT'S NEXT EVAL ===",
    "",
    "SUGGESTED NEXT QUESTIONS:",
    qs,
    "",
    "RATING:",
    `  Must Know:        ${nextRating.mustKnow ?? "—"}/10`,
    `  Information Itch: ${nextRating.infoItch ?? "—"}/10`,
    `  Next-Tap Desire:  ${nextRating.nextTap ?? "—"}/10`,
    `  Verdict:          ${nextRating.verdict ?? "—"}`,
  ].join("\n");
}
