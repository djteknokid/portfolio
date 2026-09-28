"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

type CardStatus = "todo" | "inprogress" | "done";
type CardCategory = "health" | "work" | "relationships" | "finance" | "personal" | "learning" | "home";

type Card = {
  id: string;
  title: string;
  description: string;
  status: CardStatus;
  category: CardCategory;
  points: number;
};

type HitlCalendarPayload = {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  recurrence: string;
  guests: string;
  label: string;
  eventId?: string; // Google Calendar event ID — present when updating an existing event
  boardCard?: { description: string; status: string; category: string; points: number; user_id: string };
};

type CalendarViewEvent = {
  id: string;
  title: string;
  dateStr: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
};

type HitlTargetPickerPayload = {
  id: string;
  userText: string;
  intent: "add" | "remove" | "edit";
};

type ChatMessage =
  | { role: "user" | "assistant"; text: string; type?: undefined }
  | { role: "assistant"; type: "hitl_target_picker"; payload: HitlTargetPickerPayload; resolved?: "board" | "calendar" | "dismissed" }
  | { role: "assistant"; type: "hitl_calendar_list"; events: CalendarViewEvent[] }
  | { role: "assistant"; type: "hitl_calendar"; payload: HitlCalendarPayload; resolved?: "added" | "skipped" }
  | { role: "assistant"; type: "hitl_calendar_delete"; event: { id: string; title: string; date: string }; resolved?: "deleted" | "kept" }
  | { role: "assistant"; type: "hitl_header"; text: string };

const CATEGORY_COLOR: Record<string, string> = {
  health:        "#22c55e",
  work:          "#3b82f6",
  relationships: "#f59e0b",
  finance:       "#8b5cf6",
  personal:      "#ec4899",
  learning:      "#06b6d4",
  home:          "#f97316",
};

const CATEGORIES: CardCategory[] = ["health", "work", "relationships", "finance", "personal", "learning", "home"];

const COLUMNS: { key: CardStatus; label: string }[] = [
  { key: "todo",       label: "To Do"       },
  { key: "inprogress", label: "In Progress" },
  { key: "done",       label: "Done"        },
];

function EditModal({ card, onSave, onClose, onDelete }: {
  card: Card;
  onSave: (updated: Card) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [status, setStatus] = useState<CardStatus>(card.status);
  const [category, setCategory] = useState<CardCategory>(card.category);
  const [points, setPoints] = useState(card.points ?? 1);
  const POINT_LABELS = ["", "Trivial", "Easy", "Moderate", "Hard", "Very Hard"];

  function handleSave() {
    onSave({ ...card, title, description, status, category, points });
    onClose();
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, backdropFilter: "blur(4px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#141414", border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "16px", padding: "32px", width: "480px", maxWidth: "90vw",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: CATEGORY_COLOR[category] }} />
          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: CATEGORY_COLOR[category] }}>{category}</span>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{
          width: "100%", background: "transparent", border: "none",
          borderBottom: "1px solid rgba(255,255,255,0.1)", outline: "none",
          fontSize: "20px", fontWeight: 700, color: "#ffffff",
          padding: "0 0 12px", marginBottom: "16px", fontFamily: "inherit",
          boxSizing: "border-box",
        }} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{
          width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px", outline: "none", fontSize: "14px", color: "rgba(255,255,255,0.7)",
          padding: "12px", marginBottom: "20px", fontFamily: "inherit", lineHeight: 1.6, resize: "none",
          boxSizing: "border-box",
        }} />
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>Status</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {COLUMNS.map(col => (
              <button key={col.key} onClick={() => setStatus(col.key)} style={{
                flex: 1, padding: "7px 0",
                background: status === col.key ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${status === col.key ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "6px", fontSize: "12px", fontWeight: status === col.key ? 600 : 400,
                color: status === col.key ? "#ffffff" : "rgba(255,255,255,0.4)",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.1s",
              }}>{col.label}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>Category</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                padding: "5px 12px",
                background: category === cat ? `${CATEGORY_COLOR[cat]}22` : "rgba(255,255,255,0.04)",
                border: `1px solid ${category === cat ? CATEGORY_COLOR[cat] : "rgba(255,255,255,0.08)"}`,
                borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                color: category === cat ? CATEGORY_COLOR[cat] : "rgba(255,255,255,0.35)",
                cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase",
                letterSpacing: "0.06em", transition: "all 0.1s",
              }}>{cat}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>Difficulty</p>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>
              {points} <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>— {POINT_LABELS[points]}</span>
            </span>
          </div>
          <input type="range" min={1} max={5} step={1} value={points}
            onChange={e => setPoints(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#ffffff", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            {[1,2,3,4,5].map(n => (
              <span key={n} style={{ fontSize: "10px", color: n === points ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)" }}>{n}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => { onDelete(card.id); onClose(); }} style={{
            padding: "10px 16px", background: "transparent",
            border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px",
            fontSize: "13px", color: "rgba(239,68,68,0.7)", cursor: "pointer", fontFamily: "inherit",
          }}>Delete</button>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
            fontSize: "13px", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            flex: 2, padding: "10px 0", background: "#ffffff", border: "none",
            borderRadius: "8px", fontSize: "13px", fontWeight: 600,
            color: "#000000", cursor: "pointer", fontFamily: "inherit",
          }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function BoardSheet({ cards, onEditCard, onDrop, onDragStart, onClose }: {
  cards: Card[];
  onEditCard: (card: Card) => void;
  onDrop: (status: CardStatus) => void;
  onDragStart: (id: string) => void;
  onClose: () => void;
}) {
  const [activeCol, setActiveCol] = useState<CardStatus>("todo");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    function handleClick() { setOpenMenuId(null); }
    if (openMenuId) document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openMenuId]);

  const colCards = cards.filter(c => c.status === activeCol);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", flexDirection: "column",
      background: "#0a0a0a",
    }}>
      {/* Sheet header */}
      <div style={{
        height: "52px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ fontSize: "14px", fontWeight: 700 }}>Board</span>
        <button onClick={onClose} style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px", padding: "6px 14px",
          fontSize: "12px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontFamily: "inherit",
        }}>Done</button>
      </div>

      {/* Column tabs */}
      <div style={{
        display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 16px", gap: "0", flexShrink: 0,
      }}>
        {COLUMNS.map(col => {
          const count = cards.filter(c => c.status === col.key).length;
          const active = activeCol === col.key;
          return (
            <button key={col.key} onClick={() => setActiveCol(col.key)} style={{
              flex: 1, padding: "12px 0", background: "none", border: "none",
              borderBottom: `2px solid ${active ? "#ffffff" : "transparent"}`,
              fontSize: "12px", fontWeight: active ? 700 : 400,
              color: active ? "#ffffff" : "rgba(255,255,255,0.35)",
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              transition: "color 0.15s",
            }}>
              <span>{col.label}</span>
              {count > 0 && (
                <span style={{
                  fontSize: "10px", fontWeight: 700,
                  background: active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                  borderRadius: "10px", padding: "1px 6px",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.3)",
                }}>{count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div
        onDragOver={e => e.preventDefault()}
        onDrop={() => onDrop(activeCol)}
        style={{ flex: 1, overflowY: "auto", padding: "16px" }}
      >
        {colCards.length === 0 ? (
          <div style={{
            padding: "48px 16px", textAlign: "center",
            color: "rgba(255,255,255,0.15)", fontSize: "13px",
          }}>Nothing here yet</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {colCards.map(card => (
              <div key={card.id} draggable
                onDragStart={() => onDragStart(card.id)}
                onClick={() => { if (openMenuId !== card.id) onEditCard(card); }}
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "14px", cursor: "pointer", position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: CATEGORY_COLOR[card.category] ?? "#888", flexShrink: 0 }} />
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: CATEGORY_COLOR[card.category] ?? "#888" }}>{card.category}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.2)" }}>⚡{card.points ?? 1}</span>
                    <button
                      onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === card.id ? null : card.id); }}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(255,255,255,0.3)", fontSize: "16px", padding: "0 2px",
                        lineHeight: 1, fontFamily: "inherit",
                      }}
                    >⋯</button>
                    {openMenuId === card.id && (
                      <div onClick={e => e.stopPropagation()} style={{
                        position: "absolute", top: "36px", right: "12px",
                        background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px", overflow: "hidden", zIndex: 10,
                        minWidth: "140px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                      }}>
                        <button
                          onClick={() => { onEditCard(card); setOpenMenuId(null); }}
                          style={{
                            display: "block", width: "100%", padding: "12px 14px",
                            background: "none", border: "none", textAlign: "left",
                            fontSize: "13px", color: "rgba(255,255,255,0.7)",
                            cursor: "pointer", fontFamily: "inherit",
                          }}
                        >Edit</button>
                        <button
                          onClick={() => { setOpenMenuId(null); }}
                          style={{
                            display: "block", width: "100%", padding: "12px 14px",
                            background: "none", border: "none", textAlign: "left",
                            fontSize: "13px", color: "rgba(239,68,68,0.8)",
                            cursor: "pointer", fontFamily: "inherit",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >Delete</button>
                      </div>
                    )}
                  </div>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", marginBottom: "4px", lineHeight: 1.35 }}>{card.title}</p>
                {card.description && (
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{card.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarEventList({ events, onEdit, onRemove }: {
  events: CalendarViewEvent[];
  onEdit: (event: CalendarViewEvent) => void;
  onRemove: (event: CalendarViewEvent) => void;
}) {
  if (events.length === 0) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "18px 18px 18px 4px", padding: "14px 16px", maxWidth: "82%",
      }}>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.08em" }}>CALENDAR</span>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>No events found for that period.</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "18px 18px 18px 4px", padding: "14px 16px", maxWidth: "82%",
    }}>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "10px", fontWeight: 600, letterSpacing: "0.08em" }}>CALENDAR</span>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {events.map((e, i) => (
          <div key={e.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 0",
            borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
            gap: "10px",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.title}</p>
              {e.dateStr && <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{e.dateStr}</p>}
            </div>
            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
              <button onClick={() => onEdit(e)} style={{
                padding: "3px 9px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                fontSize: "11px", color: "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "inherit",
              }}>Edit</button>
              <button onClick={() => onRemove(e)} style={{
                padding: "3px 9px", background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px",
                fontSize: "11px", color: "rgba(239,68,68,0.6)", cursor: "pointer", fontFamily: "inherit",
              }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HitlTargetPicker({ payload, resolved, onPick }: {
  payload: HitlTargetPickerPayload;
  resolved?: "board" | "calendar" | "dismissed";
  onPick: (id: string, target: "board" | "calendar") => void;
}) {
  const actionLabel = payload.intent === "add" ? "Add" : payload.intent === "remove" ? "Remove" : "Edit";

  if (resolved) {
    return (
      <div style={{
        background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "18px 18px 18px 4px", padding: "12px 16px", maxWidth: "82%", opacity: 0.5,
      }}>
        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "6px", fontWeight: 600, letterSpacing: "0.08em" }}>WHERE</span>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
          {resolved === "board" ? "→ Board" : resolved === "calendar" ? "→ Calendar" : "Dismissed"}
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "18px 18px 18px 4px", padding: "14px 16px", maxWidth: "82%",
    }}>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px", fontWeight: 600, letterSpacing: "0.08em" }}>WHERE</span>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginBottom: "12px", lineHeight: 1.4 }}>
        {actionLabel} on your <strong>Board</strong> or <strong>Calendar</strong>?
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => onPick(payload.id, "board")} style={{
          flex: 1, padding: "8px 12px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "10px", fontSize: "13px", fontWeight: 600,
          color: "rgba(255,255,255,0.8)", cursor: "pointer", fontFamily: "inherit",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
        }}>
          <span style={{ fontSize: "16px" }}>☰</span>
          Board
        </button>
        <button onClick={() => onPick(payload.id, "calendar")} style={{
          flex: 1, padding: "8px 12px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "10px", fontSize: "13px", fontWeight: 600,
          color: "rgba(255,255,255,0.8)", cursor: "pointer", fontFamily: "inherit",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
        }}>
          <span style={{ fontSize: "16px" }}>◻</span>
          Calendar
        </button>
      </div>
    </div>
  );
}

type RecurrenceState = {
  freq: "none" | "daily" | "weekly" | "monthly" | "yearly";
  interval: number;
  days: string[]; // SU,MO,TU,WE,TH,FR,SA
  endsType: "never" | "on" | "after";
  endsDate: string;
  endsCount: number;
};

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const DAY_KEYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

function rruleFromState(r: RecurrenceState): string {
  if (r.freq === "none") return "";
  const freqMap = { daily: "DAILY", weekly: "WEEKLY", monthly: "MONTHLY", yearly: "YEARLY" };
  let rule = `RRULE:FREQ=${freqMap[r.freq]}`;
  if (r.interval > 1) rule += `;INTERVAL=${r.interval}`;
  if (r.freq === "weekly" && r.days.length > 0) rule += `;BYDAY=${r.days.join(",")}`;
  if (r.endsType === "on" && r.endsDate) rule += `;UNTIL=${r.endsDate.replace(/-/g, "")}T000000Z`;
  if (r.endsType === "after" && r.endsCount > 0) rule += `;COUNT=${r.endsCount}`;
  return rule;
}

function stateFromRrule(rrule: string): RecurrenceState {
  const defaults: RecurrenceState = { freq: "none", interval: 1, days: [], endsType: "never", endsDate: "", endsCount: 13 };
  if (!rrule) return defaults;
  const freqMatch = rrule.match(/FREQ=(\w+)/);
  const intervalMatch = rrule.match(/INTERVAL=(\d+)/);
  const bydayMatch = rrule.match(/BYDAY=([\w,]+)/);
  const untilMatch = rrule.match(/UNTIL=(\d{8})/);
  const countMatch = rrule.match(/COUNT=(\d+)/);
  const freqMap: Record<string, RecurrenceState["freq"]> = { DAILY: "daily", WEEKLY: "weekly", MONTHLY: "monthly", YEARLY: "yearly" };
  return {
    freq: freqMatch ? (freqMap[freqMatch[1]] ?? "none") : "none",
    interval: intervalMatch ? parseInt(intervalMatch[1]) : 1,
    days: bydayMatch ? bydayMatch[1].split(",") : [],
    endsType: untilMatch ? "on" : countMatch ? "after" : "never",
    endsDate: untilMatch ? `${untilMatch[1].slice(0, 4)}-${untilMatch[1].slice(4, 6)}-${untilMatch[1].slice(6, 8)}` : "",
    endsCount: countMatch ? parseInt(countMatch[1]) : 13,
  };
}

function RecurrencePicker({ value, onChange }: { value: string; onChange: (rrule: string) => void }) {
  const [state, setState] = useState<RecurrenceState>(() => stateFromRrule(value));

  function update(patch: Partial<RecurrenceState>) {
    const next = { ...state, ...patch };
    setState(next);
    onChange(rruleFromState(next));
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px", padding: "5px 8px", fontSize: "12px", color: "#ffffff",
    outline: "none", fontFamily: "inherit", width: "52px", textAlign: "center",
  };
  const selectStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px", padding: "5px 8px", fontSize: "12px", color: "#ffffff",
    outline: "none", fontFamily: "inherit", cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Frequency row */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>Repeat</span>
        <select value={state.freq} onChange={e => update({ freq: e.target.value as RecurrenceState["freq"] })} style={{ ...selectStyle, flex: 1 }}>
          <option value="none">Does not repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {state.freq !== "none" && (
        <>
          {/* Interval */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>Every</span>
            <input type="number" min={1} max={99} value={state.interval} onChange={e => update({ interval: Math.max(1, parseInt(e.target.value) || 1) })} style={inputStyle} />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
              {{ daily: "day(s)", weekly: "week(s)", monthly: "month(s)", yearly: "year(s)", none: "" }[state.freq]}
            </span>
          </div>

          {/* Day picker (weekly only) */}
          {state.freq === "weekly" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Repeat on</span>
              <div style={{ display: "flex", gap: "5px" }}>
                {DAY_KEYS.map((key, i) => {
                  const active = state.days.includes(key);
                  return (
                    <button key={key} onClick={() => {
                      const next = active ? state.days.filter(d => d !== key) : [...state.days, key];
                      update({ days: next });
                    }} style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      background: active ? "#ffffff" : "rgba(255,255,255,0.08)",
                      border: `1px solid ${active ? "#ffffff" : "rgba(255,255,255,0.15)"}`,
                      fontSize: "11px", fontWeight: 700,
                      color: active ? "#000000" : "rgba(255,255,255,0.45)",
                      cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
                    }}>{DAY_LABELS[i]}</button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ends */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Ends</span>
            {(["never", "on", "after"] as const).map(opt => (
              <label key={opt} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <div onClick={() => update({ endsType: opt })} style={{
                  width: "14px", height: "14px", borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${state.endsType === opt ? "#ffffff" : "rgba(255,255,255,0.25)"}`,
                  background: state.endsType === opt ? "#ffffff" : "transparent",
                  cursor: "pointer",
                }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", minWidth: "44px" }}>
                  {{ never: "Never", on: "On", after: "After" }[opt]}
                </span>
                {opt === "on" && state.endsType === "on" && (
                  <input type="date" value={state.endsDate} onChange={e => update({ endsDate: e.target.value })} style={{ ...inputStyle, width: "auto", flex: 1 }} />
                )}
                {opt === "after" && state.endsType === "after" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <input type="number" min={1} max={999} value={state.endsCount} onChange={e => update({ endsCount: Math.max(1, parseInt(e.target.value) || 1) })} style={inputStyle} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>occurrences</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function HitlCalendarCard({ payload, resolved, onAdd, onSkip, onDelete, mode }: {
  payload: HitlCalendarPayload;
  resolved?: "added" | "skipped";
  onAdd: (p: HitlCalendarPayload) => void;
  onSkip: (id: string) => void;
  onDelete?: (eventId: string, title: string) => void;
  mode: "calendar_add" | "sync";
}) {
  const [title, setTitle] = useState(payload.title);
  const [date, setDate] = useState(payload.date);
  const [time, setTime] = useState(payload.time);
  const [endTime, setEndTime] = useState(payload.endTime);
  const [location, setLocation] = useState(payload.location);
  const [recurrence, setRecurrence] = useState(payload.recurrence);
  const [guests, setGuests] = useState(payload.guests ?? "");

  const isDone = !!resolved;
  const addLabel = "Submit";

  return (
    <div style={{
      background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "18px 18px 18px 4px", padding: "14px 16px",
      maxWidth: "82%", opacity: isDone ? 0.5 : 1, transition: "opacity 0.2s",
    }}>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "8px", fontWeight: 600, letterSpacing: "0.08em" }}>
        {mode === "sync" ? "CALENDAR EVENT" : payload.eventId ? "EDIT CALENDAR EVENT" : "NEW CALENDAR EVENT"}
      </span>

      {isDone ? (
        <>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>{title}</p>
          <p style={{ fontSize: "11px", color: resolved === "added" ? "rgba(34,197,94,0.7)" : "rgba(255,255,255,0.25)", marginTop: "4px", fontWeight: 600 }}>
            {resolved === "added" ? (mode === "sync" ? "✓ Added to board" : "✓ Added to calendar") : "Cancelled"}
          </p>
        </>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Title", value: title, set: setTitle, type: "text" },
              { label: "Date", value: date, set: setDate, type: "date" },
              { label: "Start time", value: time, set: setTime, type: "time" },
              { label: "End time", value: endTime, set: setEndTime, type: "time" },
              { label: "Location", value: location, set: setLocation, type: "text" },
              { label: "Guests (comma-separated emails)", value: guests, set: setGuests, type: "text" },
            ].map(({ label, value, set, type }) => (
              <div key={label}>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginBottom: "3px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</p>
                <input type={type} value={value} onChange={e => set(e.target.value)} style={{
                  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "6px", padding: "6px 10px", fontSize: "13px", color: "#ffffff",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                }} />
              </div>
            ))}
            <div>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", marginBottom: "8px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Recurrence</p>
              <RecurrencePicker value={recurrence} onChange={setRecurrence} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
            <button onClick={() => onSkip(payload.id)} style={{
              padding: "6px 14px", background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
              fontSize: "12px", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontFamily: "inherit",
            }}>Cancel</button>
            {payload.eventId && onDelete && (
              <button onClick={() => onDelete(payload.eventId!, title)} style={{
                padding: "6px 14px", background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px",
                fontSize: "12px", fontWeight: 600, color: "rgba(239,68,68,0.7)", cursor: "pointer", fontFamily: "inherit",
              }}>Delete</button>
            )}
            <button onClick={() => onAdd({ ...payload, title, date, time, endTime, location, recurrence, guests })} style={{
              flex: 1, padding: "6px 12px", background: "#ffffff",
              border: "none", borderRadius: "8px",
              fontSize: "12px", fontWeight: 700, color: "#000000", cursor: "pointer", fontFamily: "inherit",
            }}>{addLabel}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function BoardPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [scoreFlash, setScoreFlash] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<{ user: string; assistant: string }[]>([]);
  const [memorySummary, setMemorySummary] = useState<string>("");
  const [showBoard, setShowBoard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [calendarSyncing, setCalendarSyncing] = useState(false);
  const [calendarStatus, setCalendarStatus] = useState<string | null>(null);
  const prevDoneCount = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const sessionError = (session as typeof session & { error?: string })?.error;

  // Auto-prompt reconnect when token refresh fails
  useEffect(() => {
    if (sessionError === "RefreshAccessTokenError") {
      setChatMessages(prev => {
        const alreadyShown = prev.some(m => m.type === undefined && m.role === "assistant" && m.text?.includes("reconnect Google"));
        if (alreadyShown) return prev;
        return [...prev, { role: "assistant" as const, text: "Your Google connection expired. Tap the profile icon → Settings → reconnect Google to restore calendar and Gmail access." }];
      });
    }
  }, [sessionError]);

  const points = cards.filter(c => c.status === "done").reduce((sum, c) => sum + (c.points ?? 1), 0);

  useEffect(() => {
    const stored = localStorage.getItem("lifeboard_user_id");
    if (!stored) { router.replace("/lifeboard"); return; }
    setUserId(stored);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/lifeboard?user_id=${userId}`)
      .then(r => r.json())
      .then(d => { if (d.cards) setCards(d.cards); });

    const saved = localStorage.getItem(`lifeboard_chat_${userId}`);
    if (saved) {
      try { setChatMessages(JSON.parse(saved)); } catch {}
    }
    const savedHistory = localStorage.getItem(`lifeboard_history_${userId}`);
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch {}
    }
    const savedSummary = localStorage.getItem(`lifeboard_summary_${userId}`);
    if (savedSummary) setMemorySummary(savedSummary);
  }, [userId]);

  useEffect(() => {
    if (!userId || chatMessages.length === 0) return;
    localStorage.setItem(`lifeboard_chat_${userId}`, JSON.stringify(chatMessages));
  }, [chatMessages, userId]);

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`lifeboard_history_${userId}`, JSON.stringify(history));
  }, [history, userId]);

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`lifeboard_summary_${userId}`, memorySummary);
  }, [memorySummary, userId]);

  useEffect(() => {
    if (points > prevDoneCount.current) {
      setScoreFlash(true);
      setTimeout(() => setScoreFlash(false), 600);
    }
    prevDoneCount.current = points;
  }, [points]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  async function handleHitlAdd(payload: HitlCalendarPayload) {
    const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;
    if (payload.boardCard) {
      // Sync mode: add to board
      await fetch("/api/lifeboard/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ id: payload.id, title: payload.title, ...payload.boardCard }]),
      });
      const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
      if (refreshed.cards) setCards(refreshed.cards);
      setChatMessages(prev => [
        ...prev.map(m => m.type === "hitl_calendar" && m.payload.id === payload.id ? { ...m, resolved: "added" as const } : m),
        { role: "assistant" as const, text: `Added **${payload.title}** to your board.` },
      ]);
    } else {
      // calendar_add mode: write to Google Calendar
      if (!accessToken) return;
      const start = payload.time ? `${payload.date}T${payload.time}:00` : payload.date;
      const end = payload.endTime ? `${payload.date}T${payload.endTime}:00` : start;
      await fetch("/api/lifeboard/calendar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          title: payload.title,
          description: "",
          start,
          end,
          location: payload.location,
          recurrence: payload.recurrence,
          allDay: !payload.time,
          guests: payload.guests,
          eventId: payload.eventId,
        }),
      });
      const dateLabel = payload.date ? ` for ${new Date(payload.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}` : "";
      const timeLabel = payload.time ? ` at ${payload.time}` : "";
      const verb = payload.eventId ? "Updated" : "Done —";
      const action = payload.eventId ? "updated" : "added to your calendar";
      setChatMessages(prev => [
        ...prev.map(m => m.type === "hitl_calendar" && m.payload.id === payload.id ? { ...m, resolved: "added" as const } : m),
        { role: "assistant" as const, text: `${verb} **${payload.title}** ${action}${dateLabel}${timeLabel}.` },
      ]);
    }
  }

  function handleHitlSkip(id: string) {
    setChatMessages(prev => prev.map(m =>
      m.type === "hitl_calendar" && m.payload.id === id
        ? { ...m, resolved: "skipped" as const }
        : m
    ));
  }

  async function handleHitlDelete(event: { id: string; title: string }) {
    const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;
    if (!accessToken) return;
    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setChatMessages(prev => [
      ...prev.map(m => m.type === "hitl_calendar_delete" && m.event.id === event.id ? { ...m, resolved: "deleted" as const } : m),
      { role: "assistant" as const, text: `Removed **${event.title}** from your calendar.` },
    ]);
  }

  async function handleHitlCardDelete(eventId: string, title: string) {
    const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;
    if (!accessToken) return;
    await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setChatMessages(prev => [
      ...prev.map(m => m.type === "hitl_calendar" && m.payload.eventId === eventId ? { ...m, resolved: "skipped" as const } : m),
      { role: "assistant" as const, text: `Removed **${title}** from your calendar.` },
    ]);
  }

  function handleHitlKeep(id: string) {
    const msg = chatMessages.find(m => m.type === "hitl_calendar_delete" && m.event.id === id);
    const title = msg && msg.type === "hitl_calendar_delete" ? msg.event.title : "";
    setChatMessages(prev => [
      ...prev.map(m => m.type === "hitl_calendar_delete" && m.event.id === id ? { ...m, resolved: "kept" as const } : m),
      { role: "assistant" as const, text: `Kept **${title}** on your calendar.` },
    ]);
  }

  async function handleTargetPick(pickerId: string, target: "board" | "calendar") {
    // Find the picker to get the original userText and intent
    const picker = chatMessages.find(m => m.type === "hitl_target_picker" && m.payload.id === pickerId);
    if (!picker || picker.type !== "hitl_target_picker") return;
    const { userText, intent } = picker.payload;

    // Mark picker as resolved
    setChatMessages(prev => prev.map(m =>
      m.type === "hitl_target_picker" && m.payload.id === pickerId
        ? { ...m, resolved: target as "board" | "calendar" }
        : m
    ));

    setLoading(true);
    const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;

    try {
      if (target === "calendar") {
        if (intent === "add") {
          const lastAssistant = (chatMessages.filter(m => m.role === "assistant" && !m.type).slice(-1)[0] as { text: string } | undefined)?.text ?? "";
          const calContext = lastAssistant ? `${lastAssistant}\n\nUser instruction: ${userText}` : userText;
          const res = await fetch("/api/lifeboard/calendar/extract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: userText, description: calContext }),
          });
          const data = await res.json();
          const hitlPayload: HitlCalendarPayload = {
            id: `hitl-${Math.random().toString(36).slice(2, 10)}`,
            title: data.title ?? userText,
            date: data.date ?? "",
            time: data.time ?? "",
            endTime: data.endTime ?? "",
            location: data.location ?? "",
            recurrence: data.recurrence ?? "",
            guests: data.guests ?? "",
            label: "",
          };
          setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar" as const, payload: hitlPayload }]);
        } else if (intent === "remove") {
          const res = await fetch("/api/lifeboard/calendar/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken, query: userText, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
          });
          const data = await res.json();
          if (data.confirm) {
            setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar_delete" as const, event: data.event }]);
          } else {
            setChatMessages(prev => [...prev, { role: "assistant", text: data.message ?? "Couldn't find that event on your calendar." }]);
          }
        }
      } else {
        // Board target — run card action
        const res = await fetch("/api/lifeboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userText, existingCards: cards, history, memorySummary, user_id: userId }),
        });
        const data = await res.json();
        const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
        if (refreshed.cards) setCards(refreshed.cards);
        const reply = data.reply ?? (data.mode === "create" && data.cards?.length
          ? (() => {
              const lines = data.cards.map((c: { title: string; description?: string; points?: number }) =>
                `• ${c.title} (${c.points ?? 1} pt${(c.points ?? 1) !== 1 ? "s" : ""})${c.description ? ` — ${c.description}` : ""}`
              );
              return `Added ${data.cards.length} card${data.cards.length !== 1 ? "s" : ""}:\n\n${lines.join("\n")}`;
            })()
          : "Done.");
        setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCalendarEdit(event: CalendarViewEvent) {
    const hitlPayload: HitlCalendarPayload = {
      id: `hitl-${Math.random().toString(36).slice(2, 10)}`,
      eventId: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      endTime: event.endTime,
      location: event.location,
      recurrence: "",
      guests: "",
      label: event.dateStr,
    };
    setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar" as const, payload: hitlPayload }]);
  }

  function handleCalendarRemove(event: CalendarViewEvent) {
    setChatMessages(prev => [...prev, {
      role: "assistant" as const,
      type: "hitl_calendar_delete" as const,
      event: { id: event.id, title: event.title, date: event.dateStr },
    }]);
  }

  async function handleSubmit() {
    if (!input.trim() || loading || !userId) return;
    const userText = input;
    setInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    // Check if user is confirming/skipping calendar candidates
    const calCandidatesRaw = sessionStorage.getItem("cal_candidates");
    if (calCandidatesRaw) {
      const candidates: { id: string; title: string; label: string; description: string; status: string; category: string; points: number; user_id: string }[] = JSON.parse(calCandidatesRaw);
      // Use AI to interpret the user's response in context of the candidate list
      const hitlRes = await fetch("/api/lifeboard/calendar/hitl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, candidates: candidates.map((c, i) => ({ index: i + 1, title: c.title })) }),
      });
      const hitl = await hitlRes.json();
      if (hitl.action !== "not_relevant") {
        sessionStorage.removeItem("cal_candidates");
        if (hitl.action === "skip_all") {
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: "No problem — skipped all of them." }]);
          return;
        }
        let toAdd = candidates;
        if (hitl.action === "skip_some" && hitl.indices?.length) {
          const skipSet = new Set(hitl.indices.map((n: number) => n - 1));
          toAdd = candidates.filter((_, i) => !skipSet.has(i));
        } else if (hitl.action === "add_some" && hitl.indices?.length) {
          const addSet = new Set(hitl.indices.map((n: number) => n - 1));
          toAdd = candidates.filter((_, i) => addSet.has(i));
        }
        if (toAdd.length) {
          await fetch("/api/lifeboard/duplicate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toAdd.map(c => ({ ...c, label: undefined }))),
          });
          const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
          if (refreshed.cards) setCards(refreshed.cards);
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: `Added ${toAdd.length} event${toAdd.length !== 1 ? "s" : ""} to your board.` }]);
        } else {
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: "Skipped — nothing added." }]);
        }
        return;
      }
    }

    // Handle calendar add confirmation (yes/no after "Want me to add X to your calendar?")
    const calPendingRaw = sessionStorage.getItem("cal_pending_add");
    if (calPendingRaw) {
      const lower = userText.toLowerCase().trim();
      const isYes = /\b(yes|yeah|yep|sure|ok|okay|add it|add them|go ahead|do it|add that|please add|add this)\b/.test(lower);
      const isNo = /^(no|nope|no thanks|skip|don't|not now|skip it)$/.test(lower);
      if (isYes || isNo) {
        sessionStorage.removeItem("cal_pending_add");
        if (isNo) {
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: "No problem, skipped the calendar." }]);
          return;
        }
        const pending: { title: string; description?: string }[] = JSON.parse(calPendingRaw);
        const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;
        if (accessToken) {
          await Promise.all(pending.map(c =>
            fetch("/api/lifeboard/calendar/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken, title: c.title, description: c.description }),
            })
          ));
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: `Added ${pending.length === 1 ? `**${pending[0].title}**` : `${pending.length} events`} to your Google Calendar.` }]);
        } else {
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: "Couldn't add to calendar — try reconnecting Google in Settings." }]);
        }
        return;
      }
    }

    // — ORCHESTRATOR —
    try {
      // Pass last assistant message as context so "please check" follows up correctly
      const lastAssistant = (chatMessages.filter(m => m.role === "assistant" && !m.type).slice(-1)[0] as { text: string } | undefined)?.text ?? "";
      const orchRes = await fetch("/api/lifeboard/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, lastAssistant }),
      });
      const { intent } = await orchRes.json();
      const accessToken = (session as typeof session & { accessToken?: string })?.accessToken;

      // CALENDAR UPDATE — modify an existing event, show pre-filled HITL card
      if (intent === "calendar_update") {
        if (!session) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google Calendar first — tap the profile icon → Settings." }]);
          return;
        }
        const res = await fetch("/api/lifeboard/calendar/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, query: userText, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
        });
        const data = await res.json();
        if (!data.found) {
          setChatMessages(prev => [...prev, { role: "assistant", text: data.message ?? "Couldn't find that event on your calendar." }]);
        } else {
          const hitlPayload: HitlCalendarPayload = {
            id: `hitl-${Math.random().toString(36).slice(2, 10)}`,
            eventId: data.eventId,
            ...data.payload,
            label: "",
          };
          setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar" as const, payload: hitlPayload }]);
        }
        return;
      }

      // CALENDAR DELETE — find and remove event from Google Calendar
      if (intent === "calendar_delete") {
        if (!session) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google Calendar first — tap the profile icon → Settings." }]);
          return;
        }
        const res = await fetch("/api/lifeboard/calendar/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, query: userText, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
        });
        const data = await res.json();
        if (data.confirm) {
          setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar_delete" as const, event: data.event }]);
        } else {
          setChatMessages(prev => [...prev, { role: "assistant", text: data.message ?? "Couldn't find that event on your calendar." }]);
        }
        return;
      }

      // CALENDAR ADD — extract event details then show HITL card, don't write yet
      if (intent === "calendar_add") {
        if (!session) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google Calendar first — tap the profile icon → Settings." }]);
          return;
        }
        const calContext = lastAssistant ? `${lastAssistant}\n\nUser instruction: ${userText}` : userText;
        const res = await fetch("/api/lifeboard/calendar/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: userText, description: calContext }),
        });
        const data = await res.json();
        const hitlPayload: HitlCalendarPayload = {
          id: `hitl-${Math.random().toString(36).slice(2, 10)}`,
          title: data.title ?? userText,
          date: data.date ?? "",
          time: data.time ?? "",
          endTime: data.endTime ?? "",
          location: data.location ?? "",
          recurrence: data.recurrence ?? "",
          guests: data.guests ?? "",
          label: "",
        };
        setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar" as const, payload: hitlPayload }]);
        return;
      }

      // AMBIGUOUS ADD — show board vs calendar picker
      if (intent === "ambiguous_add") {
        setChatMessages(prev => [...prev, {
          role: "assistant" as const, type: "hitl_target_picker" as const,
          payload: { id: `picker-${Math.random().toString(36).slice(2, 10)}`, userText, intent: "add" as const },
        }]);
        return;
      }

      // AMBIGUOUS REMOVE — show board vs calendar picker
      if (intent === "ambiguous_remove") {
        setChatMessages(prev => [...prev, {
          role: "assistant" as const, type: "hitl_target_picker" as const,
          payload: { id: `picker-${Math.random().toString(36).slice(2, 10)}`, userText, intent: "remove" as const },
        }]);
        return;
      }

      // CALENDAR VIEW — plain text list of events
      if (intent === "calendar_view") {
        if (!session) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google Calendar first — tap the profile icon → Settings." }]);
          return;
        }
        const res = await fetch("/api/lifeboard/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, user_id: userId, query: userText, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, viewOnly: true }),
        });
        const data = await res.json();
        if (data.error) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Couldn't reach your calendar. Try reconnecting in Settings." }]);
        } else {
          setChatMessages(prev => [...prev, { role: "assistant" as const, type: "hitl_calendar_list" as const, events: data.events ?? [] }]);
        }
        return;
      }

      // CALENDAR SYNC — show one HITL card per event
      if (intent === "calendar_sync") {
        if (!session) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google Calendar first — tap the profile icon → Settings." }]);
          return;
        }
        const res = await fetch("/api/lifeboard/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, user_id: userId, query: userText, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
        });
        const data = await res.json();
        if (data.error) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Couldn't reach your calendar. Try reconnecting in Settings." }]);
        } else {
          const candidates: { id: string; title: string; label: string; description: string; status: string; category: string; points: number; user_id: string }[] = data.candidates ?? [];
          if (candidates.length === 0) {
            setChatMessages(prev => [...prev, { role: "assistant", text: "Your calendar is up to date — no new events to add." }]);
          } else {
            const header: ChatMessage = { role: "assistant", type: "hitl_header", text: `Found ${candidates.length} event${candidates.length !== 1 ? "s" : ""} on your calendar:` };
            const cards: ChatMessage[] = candidates.map(c => {
              const [datePart, timePart] = (c.label ?? "").split(" ").reduce<[string, string]>((acc, part, i, arr) => {
                if (i <= 2) acc[0] += (acc[0] ? " " : "") + part;
                else acc[1] += (acc[1] ? " " : "") + part;
                return acc;
              }, ["", ""]);
              return {
                role: "assistant" as const,
                type: "hitl_calendar" as const,
                payload: {
                  id: c.id,
                  title: c.title,
                  date: datePart,
                  time: timePart,
                  endTime: "",
                  location: "",
                  recurrence: "",
                  guests: "",
                  label: c.label,
                  boardCard: { description: c.description, status: c.status, category: c.category, points: c.points, user_id: c.user_id },
                },
              };
            });
            setChatMessages(prev => [...prev, header, ...cards]);
          }
        }
        return;
      }

      // GMAIL
      if (intent === "gmail") {
        if (!session) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google account first — tap the profile icon → Settings." }]);
          return;
        }
        const res = await fetch("/api/lifeboard/gmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, query: userText }),
        });
        const data = await res.json();
        if (data.error) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Couldn't reach your Gmail. Make sure Gmail access is granted in Settings." }]);
        } else {
          setChatMessages(prev => [...prev, { role: "assistant", text: data.answer }]);
          const newHistory = [...history.slice(-199), { user: userText, assistant: data.answer }];
          setHistory(newHistory);
        }
        return;
      }

      // CHAT
      if (intent === "chat") {
        const res = await fetch("/api/lifeboard/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: userText, history, memorySummary, cards, recentMessages: chatMessages.filter(m => !m.type).slice(-6) }),
        });
        const data = await res.json();
        const reply = data.reply ?? "I'm here — what's on your mind?";
        setChatMessages(prev => [...prev, { role: "assistant", text: reply }]);
        const newHistory = [...history.slice(-199), { user: userText, assistant: reply }];
        setHistory(newHistory);
        return;
      }

      // CARD ACTION (default)
      const res = await fetch("/api/lifeboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, existingCards: cards, history, memorySummary, user_id: userId }),
      });
      const data = await res.json();

      const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
      if (refreshed.cards) setCards(refreshed.cards);

      const assistantReply = data.reply ?? (data.mode === "create" && data.cards?.length
        ? (() => {
            const lines = data.cards.map((c: { title: string; description?: string; points?: number }) =>
              `• ${c.title} (${c.points ?? 1} pt${(c.points ?? 1) !== 1 ? "s" : ""})${c.description ? ` — ${c.description}` : ""}`
            );
            return `Added ${data.cards.length} card${data.cards.length !== 1 ? "s" : ""}:\n\n${lines.join("\n")}\n\nAnything else you'd like to update?`;
          })()
        : "Done.");

      setChatMessages(prev => [...prev, { role: "assistant", text: assistantReply }]);

      // Check for calendar-worthy new cards
      const newCards: { title: string; description?: string; calendar_worthy?: boolean }[] =
        data.mode === "create" || data.mode === "mixed" ? (data.cards ?? []) : [];
      const calWorthy = newCards.filter(c => c.calendar_worthy);
      if (calWorthy.length && session) {
        const names = calWorthy.map(c => `**${c.title}**`).join(", ");
        const prompt = calWorthy.length === 1
          ? `Want me to add ${names} to your Google Calendar?`
          : `Want me to add these to your Google Calendar? ${names}`;
        setChatMessages(prev => [...prev, { role: "assistant", text: prompt }]);
        sessionStorage.setItem("cal_pending_add", JSON.stringify(calWorthy));
      }

      const newHistory = [...history.slice(-199), { user: userText, assistant: assistantReply }];
      setHistory(newHistory);

      if (newHistory.length >= 20) {
        const toSummarize = newHistory.slice(0, 15);
        const keep = newHistory.slice(15);
        fetch("/api/lifeboard/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ turns: toSummarize, existingSummary: memorySummary }),
        })
          .then(r => r.json())
          .then(d => {
            if (d.summary) setMemorySummary(d.summary);
            setHistory(keep);
          });
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function moveCard(id: string, status: CardStatus) {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    fetch("/api/lifeboard", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  function deleteCard(id: string) {
    setCards(prev => prev.filter(c => c.id !== id));
    fetch("/api/lifeboard", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  function saveCard(updated: Card) {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    fetch("/api/lifeboard", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  }

  function duplicateCard(card: Card) {
    const newCard = {
      ...card,
      id: `card-${Math.random().toString(36).slice(2, 10)}`,
      title: `Copy of ${card.title}`,
    };
    setCards(prev => [...prev, newCard]);
    fetch("/api/lifeboard/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newCard, user_id: userId }),
    });
  }

  function onDragStart(id: string) { setDragging(id); }
  function onDrop(status: CardStatus) {
    if (dragging) moveCard(dragging, status);
    setDragging(null);
  }

  function logout() {
    if (userId) {
      localStorage.removeItem(`lifeboard_chat_${userId}`);
      localStorage.removeItem(`lifeboard_history_${userId}`);
      localStorage.removeItem(`lifeboard_summary_${userId}`);
    }
    localStorage.removeItem("lifeboard_user_id");
    signOut({ redirect: false });
    router.push("/lifeboard");
  }

  async function syncCalendar() {
    if (!session || !userId) {
      signIn("google");
      return;
    }
    setCalendarSyncing(true);
    setCalendarStatus(null);
    try {
      const res = await fetch("/api/lifeboard/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: (session as typeof session & { accessToken?: string }).accessToken,
          user_id: userId,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setCalendarStatus("Error syncing. Try reconnecting.");
      } else {
        const candidates: { id: string; title: string; label: string }[] = data.candidates ?? [];
        setCalendarStatus(`Found ${candidates.length} new event${candidates.length !== 1 ? "s" : ""}.`);
        setShowSettings(false);
        if (candidates.length === 0) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Your calendar is up to date — no new tasks to add." }]);
        } else {
          const list = candidates.map((c, i) => `${i + 1}. **${c.title}**${c.label ? ` — ${c.label}` : ""}`).join("\n");
          const msg = `I found ${candidates.length} event${candidates.length !== 1 ? "s" : ""} on your calendar that look like tasks:\n\n${list}\n\nShould I add all of them, or tell me which ones to skip.`;
          setChatMessages(prev => [...prev, { role: "assistant", text: msg }]);
          // Store candidates in session for confirmation
          sessionStorage.setItem("cal_candidates", JSON.stringify(candidates));
        }
      }
    } finally {
      setCalendarSyncing(false);
    }
  }

  if (!userId) return null;

  const todoCount = cards.filter(c => c.status === "todo").length;
  const inProgressCount = cards.filter(c => c.status === "inprogress").length;

  return (
    <div style={{
      height: "100dvh", background: "#0a0a0a", color: "#ffffff",
      fontFamily: "'Inter', system-ui, sans-serif",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {editingCard && (
        <EditModal card={editingCard} onSave={saveCard} onClose={() => setEditingCard(null)} onDelete={deleteCard} />
      )}

      {showBoard && (
        <BoardSheet
          cards={cards}
          onEditCard={setEditingCard}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onClose={() => setShowBoard(false)}
        />
      )}

      {/* Header */}
      <div style={{
        height: "52px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <h1 style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.3px" }}>Lifeboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Points badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "4px 10px",
            background: scoreFlash ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${scoreFlash ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "20px", transition: "all 0.3s",
          }}>
            <span style={{ fontSize: "11px" }}>⚡</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: scoreFlash ? "#22c55e" : "#ffffff", transition: "color 0.3s" }}>{points}</span>
          </div>

          {/* Board button */}
          <button onClick={() => setShowBoard(true)} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", padding: "5px 12px",
            fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.7)",
            cursor: "pointer", fontFamily: "inherit",
          }}>
            <span>Board</span>
            {cards.length > 0 && (
              <span style={{
                fontSize: "10px", fontWeight: 700,
                background: "rgba(255,255,255,0.1)", borderRadius: "8px",
                padding: "1px 5px", color: "rgba(255,255,255,0.5)",
              }}>{cards.length}</span>
            )}
          </button>

          {/* User — opens settings */}
          <button onClick={() => setShowSettings(true)} style={{
            background: "none", border: "none", fontSize: "11px",
            color: "rgba(255,255,255,0.2)", cursor: "pointer", fontFamily: "monospace",
          }}>{userId}</button>
        </div>
      </div>

      {/* Settings drawer */}
      {showSettings && (
        <>
          <div onClick={() => setShowSettings(false)} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            zIndex: 60, backdropFilter: "blur(2px)",
          }} />
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "#141414", borderTop: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px 20px 0 0",
            zIndex: 61, padding: "8px 0",
            paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
            animation: "slideUp 0.22s ease-out",
          }}>
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 16px" }}>
              <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.12)" }} />
            </div>

            {/* User ID */}
            <div style={{ padding: "0 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "4px" }}>Your ID</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", fontFamily: "monospace" }}>{userId}</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", marginTop: "2px" }}>Use this to log in on any device</p>
            </div>

            {/* Connect Google Calendar */}
            <button onClick={syncCalendar} disabled={calendarSyncing} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "16px 20px",
              background: "none", border: "none", cursor: calendarSyncing ? "default" : "pointer", fontFamily: "inherit",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: session ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${session ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px",
                }}>📅</div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
                    {session ? "Sync Google Calendar" : "Connect Google Calendar"}
                  </p>
                  <p style={{ fontSize: "11px", color: session ? "rgba(34,197,94,0.7)" : "rgba(255,255,255,0.3)", marginTop: "1px" }}>
                    {calendarStatus ?? (session ? `Connected as ${session.user?.email}` : "Import tasks from your calendar")}
                  </p>
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>
                {calendarSyncing ? "⟳" : "›"}
              </span>
            </button>

            {/* Connect Gmail */}
            <button onClick={() => session ? null : signIn("google")} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "16px 20px",
              background: "none", border: "none", cursor: session ? "default" : "pointer", fontFamily: "inherit",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: session ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${session ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.08)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px",
                }}>✉️</div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#ffffff" }}>
                    {session ? "Gmail Connected" : "Connect Gmail"}
                  </p>
                  <p style={{ fontSize: "11px", color: session ? "rgba(34,197,94,0.7)" : "rgba(255,255,255,0.3)", marginTop: "1px" }}>
                    {session ? `Ask questions about your inbox` : "Answer questions from your emails"}
                  </p>
                </div>
              </div>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>
                {session ? "✓" : "›"}
              </span>
            </button>

            {/* Sign out */}
            <button onClick={() => { setShowSettings(false); logout(); }} style={{
              display: "flex", alignItems: "center", gap: "12px",
              width: "100%", padding: "16px 20px",
              background: "none", border: "none", cursor: "pointer", fontFamily: "inherit",
            }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px",
              }}>↩</div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "rgba(239,68,68,0.8)" }}>Sign out</p>
            </button>
          </div>
        </>
      )}

      {/* Card summary strip — only when cards exist */}
      {cards.length > 0 && (
        <div style={{
          flexShrink: 0, padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          display: "flex", gap: "8px", overflowX: "auto",
        }}>
          {todoCount > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 10px", borderRadius: "20px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{todoCount} to do</span>
            </div>
          )}
          {inProgressCount > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 10px", borderRadius: "20px",
              background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)",
              flexShrink: 0,
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#f59e0b" }} />
              <span style={{ fontSize: "11px", color: "rgba(245,158,11,0.8)" }}>{inProgressCount} in progress</span>
            </div>
          )}
          {points > 0 && (
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 10px", borderRadius: "20px",
              background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)",
              flexShrink: 0,
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "11px", color: "rgba(34,197,94,0.8)"}}>{points} pts done</span>
            </div>
          )}
        </div>
      )}

      {/* Chat messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {chatMessages.length === 0 && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center" }}>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#ffffff", marginBottom: "8px", letterSpacing: "-0.5px" }}>What&apos;s on your mind?</p>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
              Dump tasks, give commands,<br />or say &quot;I&apos;m done with X&quot;
            </p>
          </div>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
          }}>
            {msg.type === "hitl_target_picker" ? (
              <HitlTargetPicker
                payload={msg.payload}
                resolved={msg.resolved}
                onPick={handleTargetPick}
              />
            ) : msg.type === "hitl_calendar_list" ? (
              <CalendarEventList
                events={msg.events}
                onEdit={handleCalendarEdit}
                onRemove={handleCalendarRemove}
              />
            ) : msg.type === "hitl_calendar" ? (
              <HitlCalendarCard
                payload={msg.payload}
                resolved={msg.resolved}
                onAdd={handleHitlAdd}
                onSkip={handleHitlSkip}
                onDelete={handleHitlCardDelete}
                mode={msg.payload.boardCard ? "sync" : "calendar_add"}
              />
            ) : msg.type === "hitl_calendar_delete" ? (
              <div style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: "18px 18px 18px 4px", padding: "14px 16px", maxWidth: "82%",
                opacity: msg.resolved ? 0.5 : 1, transition: "opacity 0.2s",
              }}>
                <span style={{ fontSize: "10px", color: "rgba(239,68,68,0.5)", display: "block", marginBottom: "8px", fontWeight: 600, letterSpacing: "0.08em" }}>REMOVE FROM CALENDAR</span>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>{msg.event.title}</p>
                {msg.event.date && <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>{msg.event.date}</p>}
                {!msg.resolved ? (
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => handleHitlKeep(msg.event.id)} style={{
                      flex: 1, padding: "6px 12px", background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
                      fontSize: "12px", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "inherit",
                    }}>Keep</button>
                    <button onClick={() => handleHitlDelete(msg.event)} style={{
                      flex: 2, padding: "6px 12px", background: "rgba(239,68,68,0.15)",
                      border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px",
                      fontSize: "12px", fontWeight: 700, color: "rgba(239,68,68,0.9)", cursor: "pointer", fontFamily: "inherit",
                    }}>Delete</button>
                  </div>
                ) : (
                  <p style={{ fontSize: "11px", fontWeight: 600, color: msg.resolved === "deleted" ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.25)" }}>
                    {msg.resolved === "deleted" ? "✓ Removed from calendar" : "Kept"}
                  </p>
                )}
              </div>
            ) : msg.type === "hitl_header" ? (
              <div style={{
                padding: "8px 14px", borderRadius: "18px 18px 18px 4px",
                background: "rgba(255,255,255,0.07)",
                fontSize: "13px", color: "rgba(255,255,255,0.5)",
              }}>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "4px", fontWeight: 600, letterSpacing: "0.08em" }}>LIFEBOARD</span>
                {msg.text}
              </div>
            ) : (
            <div style={{
              maxWidth: "82%",
              padding: "10px 14px",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: msg.role === "user" ? "#ffffff" : "rgba(255,255,255,0.07)",
              color: msg.role === "user" ? "#000000" : "rgba(255,255,255,0.85)",
              fontSize: "14px",
              lineHeight: 1.5,
              fontWeight: msg.role === "user" ? 500 : 400,
            }}>
              {msg.role === "assistant" && (
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "4px", fontWeight: 600, letterSpacing: "0.08em" }}>LIFEBOARD</span>
              )}
              {msg.text.split("\n").map((line, i) => {
                if (!line.trim()) return <span key={i} style={{ display: "block", height: "6px" }} />;
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <span key={i} style={{ display: "block" }}>
                    {parts.map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j}>{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </span>
                );
              })}
            </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "10px 14px", borderRadius: "18px 18px 18px 4px",
              background: "rgba(255,255,255,0.07)",
            }}>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        flexShrink: 0,
        padding: "12px 16px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#0a0a0a",
      }}>
        <div style={{
          display: "flex", alignItems: "flex-end", gap: "8px",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px", padding: "10px 12px",
        }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type anything…"
            rows={1}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: "15px", lineHeight: 1.5, color: "#ffffff", resize: "none",
              fontFamily: "inherit", maxHeight: "120px", overflowY: "auto",
            }}
            onInput={e => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 120) + "px";
            }}
          />
          <button onClick={handleSubmit} disabled={!input.trim() || loading} style={{
            flexShrink: 0, width: "34px", height: "34px", borderRadius: "10px",
            background: !input.trim() || loading ? "rgba(255,255,255,0.06)" : "#ffffff",
            border: "none", cursor: !input.trim() || loading ? "default" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
          }}>
            <span style={{ color: "#000", fontWeight: 700, fontSize: "14px", lineHeight: 1 }}>↑</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
