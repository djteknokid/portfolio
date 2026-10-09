"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatroomCharacter, ChatroomMessage } from "./types";

function generateUserId() {
  return "user_" + Math.random().toString(36).slice(2, 10);
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function Avatar({ color, initials }: { color: string; initials: string }) {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: 10,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "monospace",
        letterSpacing: "0.02em",
      }}
    >
      {initials}
    </div>
  );
}

const USER_AVATAR_COLOR = "#888";

export default function ChatroomPage() {
  const [messages, setMessages] = useState<ChatroomMessage[]>([]);
  const [characters, setCharacters] = useState<ChatroomCharacter[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [nameInput, setNameInput] = useState("");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joinedAt, setJoinedAt] = useState<string | null>(null);
  const [typing, setTyping] = useState<string[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastMessageIdRef = useRef<number>(-1);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // While sendMessage is running, pause the poll to avoid race conditions
  const sendingRef = useRef(false);

  const charMap = Object.fromEntries(characters.map((c) => [c.id, c]));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const startPolling = useCallback(() => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    pollIntervalRef.current = setInterval(async () => {
      // Don't poll while we're mid-send — we do a full re-fetch ourselves
      if (sendingRef.current) return;
      const lastId = lastMessageIdRef.current;
      try {
        const res = await fetch(`/api/chatroom/history?room_id=main&after_id=${lastId}`);
        const { messages: newMsgs } = await res.json();
        if (newMsgs?.length) {
          setMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const fresh = (newMsgs as ChatroomMessage[]).filter((m) => !existingIds.has(m.id));
            if (!fresh.length) return prev;
            const maxId = Math.max(...newMsgs.map((m: ChatroomMessage) => m.id));
            if (maxId > lastMessageIdRef.current) lastMessageIdRef.current = maxId;
            return [...prev, ...fresh];
          });
        }
      } catch { /* silent */ }
    }, 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, []);

  const enterRoom = useCallback(
    async (name: string) => {
      setLoading(true);

      let uid = localStorage.getItem("chatroom_user_id");
      if (!uid) {
        uid = generateUserId();
        localStorage.setItem("chatroom_user_id", uid);
      }
      setUserId(uid);

      const res = await fetch("/api/chatroom/history?room_id=main&limit=60");
      const { messages: msgs, characters: chars } = await res.json();
      setCharacters(chars ?? []);

      const lastMsg = msgs?.[msgs.length - 1];
      const msSinceLast = lastMsg ? Date.now() - new Date(lastMsg.created_at).getTime() : Infinity;

      let allMessages = msgs ?? [];

      if (msSinceLast > 2 * 60 * 1000) {
        await fetch("/api/chatroom/tick", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ room_id: "main" }),
        });
        const fresh = await fetch("/api/chatroom/history?room_id=main&limit=60");
        const { messages: freshMsgs } = await fresh.json();
        allMessages = freshMsgs ?? [];
      }

      const joined = new Date().toISOString();
      setJoinedAt(joined);
      setMessages(allMessages);
      if (allMessages.length) {
        lastMessageIdRef.current = Math.max(...allMessages.map((m: ChatroomMessage) => m.id));
      }

      setLoading(false);
      startPolling();

      // Periodic tick to keep the room alive
      tickIntervalRef.current = setInterval(() => {
        fetch("/api/chatroom/tick", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ room_id: "main" }),
        }).catch(() => {});
      }, 90_000);
    },
    [startPolling]
  );

  useEffect(() => {
    const stored = localStorage.getItem("chatroom_user_name");
    if (stored) {
      setUserName(stored);
      enterRoom(stored);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameInput.trim();
    if (!name) return;
    localStorage.setItem("chatroom_user_name", name);
    setUserName(name);
    enterRoom(name);
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending || !userId || !userName) return;

    setSending(true);
    sendingRef.current = true;
    setInput("");

    // Show user's message immediately (optimistic, temp id)
    const tempId = Date.now() * -1; // negative so it never clashes with real IDs
    const tempUserMsg: ChatroomMessage = {
      id: tempId,
      room_id: "main",
      sender_type: "user",
      sender_id: userId,
      sender_name: userName,
      content: trimmed,
      is_background: false,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      // Start the API call immediately — don't wait for typing to show first
      const fetchPromise = fetch("/api/chatroom/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: trimmed,
          user_id: userId,
          user_name: userName,
          room_id: "main",
        }),
      });

      // Stagger typing indicators to feel like real people reacting at different times
      // We don't know who's responding yet, so show a random 1-2 characters
      const possibleTypers = characters
        .map((c) => c.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.random() < 0.6 ? 1 : 2);

      // First character starts typing after ~1s
      const typingTimer1 = setTimeout(() => {
        setTyping([possibleTypers[0]]);
      }, 1000 + Math.random() * 500);

      // Second character (if any) joins ~1.5s later
      const typingTimer2 =
        possibleTypers.length > 1
          ? setTimeout(() => {
              setTyping((prev) => [...new Set([...prev, possibleTypers[1]])]);
            }, 2500 + Math.random() * 800)
          : null;

      // Wait for the actual response
      const res = await fetchPromise;
      const { messages: newMsgs } = await res.json();

      // Clear the preview typists
      clearTimeout(typingTimer1);
      if (typingTimer2) clearTimeout(typingTimer2);

      const actualResponders = (newMsgs ?? []).map((m: ChatroomMessage) => m.sender_id);

      if (actualResponders.length > 0) {
        // Show actual responders typing — minimum 1.2s so it doesn't flash
        const elapsed = Date.now() - new Date(tempUserMsg.created_at).getTime();
        const minTypingDuration = 1200;
        const alreadyWaited = elapsed;
        const remainingTyping = Math.max(0, minTypingDuration - alreadyWaited);

        setTyping(actualResponders);
        await new Promise((r) => setTimeout(r, remainingTyping + 600 + Math.random() * 800));
      }

      setTyping([]);

      // Full re-fetch replaces everything (removes temp message, adds real messages)
      const histRes = await fetch(`/api/chatroom/history?room_id=main&limit=60`);
      const { messages: allMsgs } = await histRes.json();
      setMessages(allMsgs ?? []);
      if (allMsgs?.length) {
        lastMessageIdRef.current = Math.max(...allMsgs.map((m: ChatroomMessage) => m.id));
      }
    } catch (err) {
      console.error("send failed:", err);
      setTyping([]);
      // Remove temp message on failure
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setSending(false);
      sendingRef.current = false;
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!userName) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d1008",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        <div style={{ width: 360, padding: "40px 0" }}>
          <div style={{ color: "#5B8FF9", fontSize: 11, letterSpacing: "0.12em", marginBottom: 8 }}>
            DESIGNERS LOUNGE
          </div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            Enter the room
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 32 }}>
            Vivian, Marcus and Priya are inside.
          </div>
          <form onSubmit={handleNameSubmit}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 6, letterSpacing: "0.08em" }}>
              WHAT SHOULD THEY CALL YOU?
            </div>
            <input
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your name"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                color: "#fff",
                fontSize: 15,
                padding: "10px 14px",
                outline: "none",
                fontFamily: "monospace",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              style={{
                marginTop: 12,
                width: "100%",
                background: "#5B8FF9",
                border: "none",
                borderRadius: 6,
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                padding: "10px 0",
                cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              Join
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d1008",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          color: "rgba(255,255,255,0.4)",
          fontSize: 13,
        }}
      >
        connecting to #designers-lounge...
      </div>
    );
  }

  const joinedAtTime = joinedAt ? new Date(joinedAt) : null;

  // Split messages into before/after user joined for the divider
  const preJoinMessages = joinedAtTime
    ? messages.filter((m) => m.id > 0 && new Date(m.created_at) < joinedAtTime)
    : messages;
  const postJoinMessages = joinedAtTime
    ? messages.filter((m) => m.id < 0 || new Date(m.created_at) >= joinedAtTime)
    : [];

  const renderMessage = (msg: ChatroomMessage, isBackground = false) => {
    const isUser = msg.sender_type === "user";
    const isSystem = msg.sender_type === "system";
    const char = charMap[msg.sender_id];
    const avatarColor = isUser ? USER_AVATAR_COLOR : (char?.avatar_color ?? "#888");
    const avatarInitials = isUser
      ? userName.slice(0, 2).toUpperCase()
      : (char?.avatar_initials ?? "??");

    if (isSystem) {
      return (
        <div
          key={msg.id}
          style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 20px" }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>{msg.content}</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
      );
    }

    return (
      <div
        key={msg.id}
        style={{
          display: "flex",
          gap: 10,
          padding: "5px 20px",
          opacity: isBackground ? 0.5 : 1,
          transition: "opacity 0.2s",
        }}
      >
        <div style={{ paddingTop: 2 }}>
          <Avatar color={avatarColor} initials={avatarInitials} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 2 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: isUser ? "rgba(255,255,255,0.7)" : avatarColor,
              }}
            >
              {msg.sender_name}
            </span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
              {formatTime(msg.created_at)}
            </span>
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {msg.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "#0d1008",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#5B8FF9", fontSize: 13, fontWeight: 700 }}>#designers-lounge</span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
          {characters.length + 1} online
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{userName}</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 180,
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 0",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              padding: "0 16px",
              marginBottom: 10,
            }}
          >
            ONLINE
          </div>
          {characters.map((c) => (
            <div key={c.id} style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.avatar_color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: c.avatar_color, fontWeight: 600 }}>
                  {c.name.split(" ")[0]}
                </span>
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", paddingLeft: 14, lineHeight: 1.3 }}>
                {c.tagline}
              </div>
            </div>
          ))}

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", margin: "12px 0" }} />
          <div style={{ padding: "8px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{userName}</span>
          </div>
        </div>

        {/* Message stream */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Messages before user joined — faded */}
          {preJoinMessages.map((msg) => renderMessage(msg, true))}

          {/* "you joined" divider — only shown if there are messages on both sides */}
          {joinedAt && preJoinMessages.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
              }}
            >
              <div style={{ flex: 1, height: 1, background: "rgba(74,222,128,0.15)" }} />
              <span style={{ color: "rgba(74,222,128,0.4)", fontSize: 10 }}>
                you joined {formatTime(joinedAt)}
              </span>
              <div style={{ flex: 1, height: 1, background: "rgba(74,222,128,0.15)" }} />
            </div>
          )}

          {/* Messages after joining — full opacity */}
          {postJoinMessages.map((msg) => renderMessage(msg, false))}

          {/* Typing indicators */}
          {typing.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "4px 20px" }}>
              {typing.map((charId) => {
                const char = charMap[charId];
                if (!char) return null;
                return (
                  <div key={charId} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar color={char.avatar_color} initials={char.avatar_initials} />
                    <span style={{ fontSize: 12, color: char.avatar_color, fontWeight: 600 }}>
                      {char.name.split(" ")[0]}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
                      typing...
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "12px 20px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message #designers-lounge"
            rows={1}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "#fff",
              fontSize: 13,
              padding: "10px 14px",
              outline: "none",
              fontFamily: "monospace",
              resize: "none",
              lineHeight: 1.5,
              maxHeight: 120,
              overflowY: "auto",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={sending || !input.trim()}
            style={{
              background: sending || !input.trim() ? "rgba(91,143,249,0.3)" : "#5B8FF9",
              border: "none",
              borderRadius: 6,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "10px 16px",
              cursor: sending || !input.trim() ? "default" : "pointer",
              fontFamily: "monospace",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
          >
            Send
          </button>
        </div>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, marginTop: 6 }}>
          Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
