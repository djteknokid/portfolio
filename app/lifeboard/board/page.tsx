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

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

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

  const points = cards.filter(c => c.status === "done").reduce((sum, c) => sum + (c.points ?? 1), 0);

  useEffect(() => {
    const stored = localStorage.getItem("lifeboard_user_id");
    if (!stored) { router.replace("/lifeboard"); return; }
    setUserId(stored);
  }, [router]);

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
      const lower = userText.toLowerCase();
      const isAddAll = /add all|yes|all of them|sure|sounds good|ok|yep|go ahead/.test(lower);
      const skipAll = /skip all|none|no thanks|don't add|forget it/.test(lower);

      if (isAddAll || skipAll) {
        sessionStorage.removeItem("cal_candidates");
        if (skipAll) {
          setLoading(false);
          setChatMessages(prev => [...prev, { role: "assistant", text: "No problem — skipped all of them." }]);
          return;
        }
        // Add all
        await fetch("/api/lifeboard/duplicate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(candidates.map(c => ({ ...c, label: undefined }))),
        });
        const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
        if (refreshed.cards) setCards(refreshed.cards);
        setLoading(false);
        setChatMessages(prev => [...prev, { role: "assistant", text: `Added ${candidates.length} calendar event${candidates.length !== 1 ? "s" : ""} to your board.` }]);
        return;
      }

      // Parse "skip X, Y" or "add X" — fall through to AI for natural language
      const skipMatches = lower.match(/skip\s+(.+)/);
      if (skipMatches) {
        const skipText = skipMatches[1];
        const toAdd = candidates.filter(c => !skipText.includes(c.title.toLowerCase().slice(0, 6)));
        sessionStorage.removeItem("cal_candidates");
        if (toAdd.length) {
          await fetch("/api/lifeboard/duplicate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toAdd.map(c => ({ ...c, label: undefined }))),
          });
          const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
          if (refreshed.cards) setCards(refreshed.cards);
        }
        setLoading(false);
        setChatMessages(prev => [...prev, { role: "assistant", text: toAdd.length ? `Added ${toAdd.length} event${toAdd.length !== 1 ? "s" : ""} to your board.` : "Skipped all — nothing added." }]);
        return;
      }
    }

    // Detect "check my calendar" intent
    const calendarIntent = /check.*calendar|sync.*calendar|what.*calendar|calendar.*events|my calendar/.test(userText.toLowerCase());
    if (calendarIntent) {
      if (!session) {
        setLoading(false);
        setChatMessages(prev => [...prev, { role: "assistant", text: "Connect your Google Calendar first — tap the profile icon → Settings → Connect Google Calendar." }]);
        return;
      }
      try {
        const res = await fetch("/api/lifeboard/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accessToken: (session as typeof session & { accessToken?: string }).accessToken,
            user_id: userId,
          }),
        });
        const data = await res.json();
        if (data.error) {
          setChatMessages(prev => [...prev, { role: "assistant", text: "Couldn't reach your calendar. Try reconnecting in Settings." }]);
        } else {
          const candidates = data.candidates ?? [];
          if (candidates.length === 0) {
            setChatMessages(prev => [...prev, { role: "assistant", text: "Your calendar is up to date — no new tasks to add." }]);
          } else {
            const list = candidates.map((c: { title: string; label: string }, i: number) => `${i + 1}. **${c.title}**${c.label ? ` — ${c.label}` : ""}`).join("\n");
            const msg = `I found ${candidates.length} event${candidates.length !== 1 ? "s" : ""} that look like tasks:\n\n${list}\n\nAdd all of them, or tell me which ones to skip.`;
            setChatMessages(prev => [...prev, { role: "assistant", text: msg }]);
            sessionStorage.setItem("cal_candidates", JSON.stringify(candidates));
          }
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
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
              {msg.text.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line || " "}</span>
              ))}
            </div>
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
