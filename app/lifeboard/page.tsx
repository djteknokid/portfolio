"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function generateId() {
  const words = ["swift", "calm", "bold", "wise", "keen", "true", "bright", "clear"];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${word}-${num}`;
}

export default function LifeboardLogin() {
  const [userId, setUserId] = useState("");
  const [newId, setNewId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("lifeboard_user_id");
    if (stored) router.replace("/lifeboard/board");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNewId(generateId());
  }, []);

  function enter(id: string) {
    const clean = id.trim();
    if (!clean) return;
    localStorage.setItem("lifeboard_user_id", clean);
    router.push("/lifeboard/board");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#ffffff",
      fontFamily: "'Inter', system-ui, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ width: "360px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "8px" }}>Lifeboard</h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "48px" }}>Your personal AI task board.</p>

        {/* Returning user */}
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>Returning</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              value={userId}
              onChange={e => setUserId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && enter(userId)}
              placeholder="Enter your user ID"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                padding: "11px 14px",
                fontSize: "14px",
                color: "#ffffff",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={() => enter(userId)}
              disabled={!userId.trim()}
              style={{
                padding: "11px 20px",
                background: userId.trim() ? "#ffffff" : "rgba(255,255,255,0.08)",
                color: userId.trim() ? "#000000" : "rgba(255,255,255,0.3)",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: userId.trim() ? "pointer" : "default",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >Enter</button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* New user */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>New</p>
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "14px 16px",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.02em", color: "#ffffff" }}>{newId}</span>
            <button
              onClick={() => setNewId(generateId())}
              style={{ background: "none", border: "none", fontSize: "12px", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: "inherit" }}
            >↻ new</button>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "12px" }}>
            Save this ID — you'll need it to return to your board.
          </p>
          <button
            onClick={() => enter(newId)}
            style={{
              width: "100%",
              padding: "12px 0",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          >
            Start with this ID →
          </button>
        </div>
      </div>
    </div>
  );
}
