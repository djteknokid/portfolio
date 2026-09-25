"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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
        }} />
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} style={{
          width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px", outline: "none", fontSize: "14px", color: "rgba(255,255,255,0.7)",
          padding: "12px", marginBottom: "20px", fontFamily: "inherit", lineHeight: 1.6, resize: "none",
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
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const prevDoneCount = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside() { setOpenMenuId(null); }
    if (openMenuId) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

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
  }, [userId]);

  useEffect(() => {
    if (points > prevDoneCount.current) {
      setScoreFlash(true);
      setTimeout(() => setScoreFlash(false), 600);
    }
    prevDoneCount.current = points;
  }, [points]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  async function handleSubmit() {
    if (!input.trim() || loading || !userId) return;
    const userText = input;
    setInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);
    setLoading(true);
    try {
      const res = await fetch("/api/lifeboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText, existingCards: cards, history, memorySummary, user_id: userId }),
      });
      const data = await res.json();

      const refreshed = await fetch(`/api/lifeboard?user_id=${userId}`).then(r => r.json());
      if (refreshed.cards) setCards(refreshed.cards);

      const assistantReply = data.reply ?? (data.mode === "create"
        ? `Added ${data.cards?.length ?? 0} card${(data.cards?.length ?? 0) !== 1 ? "s" : ""}.`
        : "Done.");

      setChatMessages(prev => [...prev, { role: "assistant", text: assistantReply }]);

      const newHistory = [...history.slice(-199), { user: userText, assistant: assistantReply }];
      setHistory(newHistory);

      // When history hits 20 turns, summarize oldest 15 and keep 5 recent
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
    localStorage.removeItem("lifeboard_user_id");
    router.push("/lifeboard");
  }

  if (!userId) return null;

  return (
    <div style={{
      height: "100vh", background: "#0a0a0a", color: "#ffffff",
      fontFamily: "'Inter', system-ui, sans-serif",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      {editingCard && (
        <EditModal card={editingCard} onSave={saveCard} onClose={() => setEditingCard(null)} onDelete={deleteCard} />
      )}

      {/* Header */}
      <div style={{
        height: "56px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <h1 style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.3px" }}>Lifeboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "5px 12px",
            background: scoreFlash ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${scoreFlash ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "20px", transition: "all 0.3s",
          }}>
            <span style={{ fontSize: "12px" }}>⚡</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: scoreFlash ? "#22c55e" : "#ffffff", transition: "color 0.3s" }}>{points}</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>pts</span>
          </div>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>{userId}</span>
          <button onClick={logout} style={{
            background: "none", border: "none", fontSize: "12px",
            color: "rgba(255,255,255,0.25)", cursor: "pointer", fontFamily: "inherit",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
          >sign out</button>
        </div>
      </div>

      {/* Body — chat left, board right */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* LEFT — Chat panel */}
        <div style={{
          width: "320px", flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column",
        }}>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {chatMessages.length === 0 && (
              <div style={{ padding: "24px 0", textAlign: "center" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>
                  What&apos;s on your mind?<br />
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.15)" }}>Dump tasks, give commands,<br />or say &quot;I&apos;m done with X&quot;</span>
                </p>
              </div>
            )}
            {chatMessages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.role === "user" ? "#ffffff" : "rgba(255,255,255,0.07)",
                  color: msg.role === "user" ? "#000000" : "rgba(255,255,255,0.85)",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  fontWeight: msg.role === "user" ? 500 : 400,
                }}>
                  {msg.role === "assistant" && (
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "4px", fontWeight: 600, letterSpacing: "0.08em" }}>LIFEBOARD</span>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: "14px 14px 14px 4px",
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

          {/* Input */}
          <div style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              display: "flex", alignItems: "flex-end", gap: "8px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px", padding: "10px 12px",
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
                  fontSize: "13px", lineHeight: 1.5, color: "#ffffff", resize: "none",
                  fontFamily: "inherit", maxHeight: "100px", overflowY: "auto",
                }}
                onInput={e => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 100) + "px";
                }}
              />
              <button onClick={handleSubmit} disabled={!input.trim() || loading} style={{
                flexShrink: 0, width: "30px", height: "30px", borderRadius: "8px",
                background: !input.trim() || loading ? "rgba(255,255,255,0.06)" : "#ffffff",
                border: "none", cursor: !input.trim() || loading ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
              }}>
                <span style={{ color: "#000", fontWeight: 700, fontSize: "13px", lineHeight: 1 }}>↑</span>
              </button>
            </div>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.15)", marginTop: "6px", textAlign: "center" }}>Enter to send · Shift+Enter for new line</p>
          </div>
        </div>

        {/* RIGHT — Kanban board */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", alignItems: "start" }}>
            {COLUMNS.map(col => {
              const colCards = cards.filter(c => c.status === col.key);
              return (
                <div key={col.key}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => onDrop(col.key)}
                  style={{
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px", padding: "16px", minHeight: "200px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: col.key === "todo" ? "rgba(255,255,255,0.2)" : col.key === "inprogress" ? "#f59e0b" : "#22c55e",
                      }} />
                      <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{col.label}</span>
                    </div>
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", borderRadius: "4px", padding: "2px 6px" }}>{colCards.length}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {colCards.map(card => (
                      <div key={card.id} draggable
                        onDragStart={() => onDragStart(card.id)}
                        onClick={() => { if (openMenuId !== card.id) setEditingCard(card); }}
                        style={{
                          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "10px", padding: "14px", cursor: "pointer",
                          transition: "border-color 0.15s, background 0.15s",
                          position: "relative",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.18)";
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: CATEGORY_COLOR[card.category] ?? "#888", flexShrink: 0 }} />
                            <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: CATEGORY_COLOR[card.category] ?? "#888" }}>{card.category}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.2)" }}>⚡{card.points ?? 1}</span>

                            {/* Options button */}
                            <button
                              onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === card.id ? null : card.id); }}
                              style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "rgba(255,255,255,0.3)", fontSize: "14px", padding: "0 2px",
                                lineHeight: 1, fontFamily: "inherit",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                            >⋯</button>

                            {/* Dropdown menu */}
                            {openMenuId === card.id && (
                              <div
                                onClick={e => e.stopPropagation()}
                                style={{
                                  position: "absolute", top: "36px", right: "12px",
                                  background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.12)",
                                  borderRadius: "8px", overflow: "hidden", zIndex: 10,
                                  minWidth: "140px",
                                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                                }}
                              >
                                <button
                                  onClick={() => { duplicateCard(card); setOpenMenuId(null); }}
                                  style={{
                                    display: "block", width: "100%", padding: "10px 14px",
                                    background: "none", border: "none", textAlign: "left",
                                    fontSize: "12px", color: "rgba(255,255,255,0.7)",
                                    cursor: "pointer", fontFamily: "inherit",
                                  }}
                                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                                >Duplicate</button>
                                <button
                                  onClick={() => { deleteCard(card.id); setOpenMenuId(null); }}
                                  style={{
                                    display: "block", width: "100%", padding: "10px 14px",
                                    background: "none", border: "none", textAlign: "left",
                                    fontSize: "12px", color: "rgba(239,68,68,0.8)",
                                    cursor: "pointer", fontFamily: "inherit",
                                    borderTop: "1px solid rgba(255,255,255,0.06)",
                                  }}
                                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
                                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                                >Delete</button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff", marginBottom: "4px", lineHeight: 1.35 }}>{card.title}</p>
                        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{card.description}</p>
                      </div>
                    ))}
                    {colCards.length === 0 && (
                      <div style={{
                        padding: "32px 16px", textAlign: "center",
                        color: "rgba(255,255,255,0.1)", fontSize: "12px",
                        borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.05)",
                      }}>Drop here</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
