"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { brand } from "../brand";
import ShellBar from "../ShellBar";

// ── Types ──────────────────────────────────────────────────────────────────

type Phase =
  | "topic"
  | "refining"
  | "pills"
  | "generating"
  | "speaking"
  | "listening"
  | "thinking"
  | "replied"
  | "answered"
  | "done";       // session complete

interface DriveCard {
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
  explanation: string;
  knowledgeReveal?: string;
}

interface NextDirection { type: string; label: string; description: string; topic: string }
interface RefinePill { label: string; bridge: boolean }

type SessionIntent = {
  topic: string; normalizedKeyword: string; learningIntent: string;
  intentSource: string; learningOrientation: string; startingFamiliarity: string;
  desiredOutcome: string; startingFocus: string;
  preferredMedia: string[]; avoidDrift: string[];
};

// ── Audio helpers ──────────────────────────────────────────────────────────

let currentAudio: HTMLAudioElement | null = null;

async function speakText(text: string, onEnd?: () => void) {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
  try {
    const res = await fetch("/api/nuggets/drive/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("TTS failed");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    currentAudio = audio;
    if (onEnd) audio.onended = () => { URL.revokeObjectURL(url); onEnd(); };
    else audio.onended = () => URL.revokeObjectURL(url);
    audio.play();
  } catch {
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.92;
    if (onEnd) utt.onend = onEnd;
    window.speechSynthesis.speak(utt);
  }
}

function buildQuestionScript(card: DriveCard, index: number): string {
  const letters = ["A", "B", "C", "D"];
  const opts = card.options.map((o, i) => `${letters[i]}: ${o.text}`).join(". ");
  return `Question ${index + 1}. ${card.question}. Your options are: ${opts}.`;
}

// ── Main component ──────────────────────────────────────────────────────────

export default function DrivePage() {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("topic");
  const [topicInput, setTopicInput] = useState("");
  const [rawTopic, setRawTopic] = useState("");
  const [pills, setPills] = useState<RefinePill[]>([]);
  const [sessionIntent, setSessionIntent] = useState<SessionIntent | null>(null);

  const [cards, setCards] = useState<DriveCard[]>([]);
  const [nextDirs, setNextDirs] = useState<NextDirection[][]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const [givenAnswerId, setGivenAnswerId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [hostReply, setHostReply] = useState("");
  const [listenPrompt, setListenPrompt] = useState("");
  const [score, setScore] = useState(0);

  // Refs so TTS callbacks always see current values
  const cardIndexRef = useRef(0);
  const cardsRef = useRef<DriveCard[]>([]);
  const historyRef = useRef<string[]>([]);
  const completedRef = useRef<string[]>([]);
  const nextDirsRef = useRef<NextDirection[][]>([]);
  const sessionIntentRef = useRef<SessionIntent | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const listeningActive = useRef(false);

  // Keep refs in sync
  useEffect(() => { cardIndexRef.current = cardIndex; }, [cardIndex]);
  useEffect(() => { cardsRef.current = cards; }, [cards]);
  useEffect(() => { historyRef.current = history; }, [history]);
  useEffect(() => { completedRef.current = completedQuestions; }, [completedQuestions]);
  useEffect(() => { nextDirsRef.current = nextDirs; }, [nextDirs]);
  useEffect(() => { sessionIntentRef.current = sessionIntent; }, [sessionIntent]);

  // ── Cleanup on unmount ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (currentAudio) { currentAudio.pause(); currentAudio = null; }
      recognitionRef.current?.abort();
    };
  }, []);

  // ── Request mic permission once on mount so browser caches the grant ───
  useEffect(() => {
    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then((stream) => { stream.getTracks().forEach((t) => t.stop()); })
      .catch(() => { /* user denied — STT will handle gracefully */ });
  }, []);

  // ── STT ────────────────────────────────────────────────────────────────
  const startListening = useCallback((onResult: (text: string) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { onResult(""); return; }
    recognitionRef.current?.abort();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rec = new SR() as any;
    recognitionRef.current = rec;
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    listeningActive.current = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      listeningActive.current = false;
      const text = Array.from(e.results[0] as { transcript: string }[])
        .map((r) => r.transcript).join(" ").toLowerCase().trim();
      onResult(text);
    };
    rec.onerror = () => { listeningActive.current = false; onResult(""); };
    rec.onend = () => { listeningActive.current = false; };
    rec.start();
    setPhase("listening");
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    listeningActive.current = false;
  }, []);

  // ── Refine ─────────────────────────────────────────────────────────────
  async function refine(topic: string) {
    setRawTopic(topic);
    setPhase("refining");
    setPills([]);
    setSessionIntent(null);
    try {
      const res = await fetch("/api/nuggets/interests/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json() as { pills: RefinePill[]; intent?: SessionIntent | null };
      const fetchedPills = Array.isArray(data.pills) ? data.pills : [];
      setSessionIntent(data.intent ?? null);
      if (fetchedPills.length > 0) {
        setPills(fetchedPills);
        setPhase("pills");
      } else {
        generateCard(topic, [], [], data.intent ?? null);
      }
    } catch {
      // fallback — skip pills and generate directly
      generateCard(topic, [], [], null);
    }
  }

  // ── Generate ───────────────────────────────────────────────────────────
  async function generateCard(
    topic: string,
    hist: string[],
    completed: string[],
    intent: SessionIntent | null,
  ) {
    setPhase("generating");
    try {
      const res = await fetch("/api/nuggets/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          history: hist,
          completedQuestions: completed,
          recentMechanics: ["multiple-choice"],
          intent,
          driveMode: true,
        }),
      });
      const data = await res.json() as { card: Record<string, unknown>; nextDirections: NextDirection[] };
      const c = data.card;
      const card: DriveCard = {
        question: c.question as string,
        options: c.options as { id: string; text: string }[],
        correctId: (c.correctIds as string[])[0],
        explanation: c.knowledgeReveal as string ?? c.conversationTakeaway as string ?? "",
        knowledgeReveal: c.knowledgeReveal as string,
      };
      setCards((prev) => [...prev, card]);
      setNextDirs((prev) => [...prev, data.nextDirections ?? []]);
      setHistory((prev) => [...prev, topic]);
      speakQuestion(card, hist.length);
    } catch {
      setPhase("topic"); // fallback
    }
  }

  // ── Speak question ────────────────────────────────────────────────────
  function speakQuestion(card: DriveCard, idx: number) {
    setGivenAnswerId(null);
    setAttempts(0);
    setHostReply("");
    setPhase("speaking");
    speakText(buildQuestionScript(card, idx), () => {
      setListenPrompt("Say A, B, C, D — or ask me to repeat, give a hint, or explain.");
      setPhase("listening");
      startListening((transcript) => handleTranscript(transcript, card, 0));
    });
  }

  // ── Handle transcript ─────────────────────────────────────────────────
  async function handleTranscript(transcript: string, card: DriveCard, currentAttempts: number) {
    if (!transcript) {
      setPhase("listening");
      startListening((t) => handleTranscript(t, card, currentAttempts));
      return;
    }
    setPhase("thinking");
    try {
      const res = await fetch("/api/nuggets/drive/converse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          question: card.question,
          options: card.options,
          correctId: card.correctId,
          explanation: card.explanation,
          attempts: currentAttempts,
        }),
      });
      const result = await res.json() as { intent: string; answerId: string | null; reply: string };
      setHostReply(result.reply);

      if (result.intent === "answer_correct") {
        setGivenAnswerId(result.answerId);
        const newScore = score + 1;
        setScore(newScore);
        setPhase("speaking");
        speakText(result.reply, () => advanceAuto(newScore));

      } else if (result.intent === "answer_wrong") {
        const nextAttempts = currentAttempts + 1;
        setAttempts(nextAttempts);
        setPhase("speaking");
        speakText(result.reply, () => {
          setListenPrompt("Try again.");
          setPhase("listening");
          startListening((t) => handleTranscript(t, card, nextAttempts));
        });

      } else if (result.intent === "repeat") {
        setPhase("speaking");
        speakText(buildQuestionScript(card, cardIndex), () => {
          setListenPrompt("Go ahead.");
          setPhase("listening");
          startListening((t) => handleTranscript(t, card, currentAttempts));
        });

      } else if (result.intent === "skip") {
        setGivenAnswerId(null);
        setPhase("speaking");
        speakText(result.reply, () => setPhase("answered"));

      } else {
        // explain, hint, other — reply and keep listening
        setPhase("speaking");
        speakText(result.reply, () => {
          setListenPrompt("Go ahead.");
          setPhase("listening");
          startListening((t) => handleTranscript(t, card, currentAttempts));
        });
      }
    } catch {
      setPhase("listening");
      startListening((t) => handleTranscript(t, card, currentAttempts));
    }
  }

  // ── Advance to next card ───────────────────────────────────────────────
  function advanceAuto(finalScore: number) {
    const idx = cardIndexRef.current;
    const card = cardsRef.current[idx];
    if (card) setCompletedQuestions((prev) => { completedRef.current = [...prev, card.question]; return completedRef.current; });
    const nextIdx = idx + 1;
    if (nextIdx >= 5) {
      setPhase("done");
      speakText(`Session complete. You got ${finalScore} out of 5. Drive safe!`);
      return;
    }
    setCardIndex(nextIdx);
    cardIndexRef.current = nextIdx;
    const nextTopic = nextDirsRef.current[idx]?.[0]?.description ?? rawTopic;
    generateCard(nextTopic, historyRef.current, completedRef.current, sessionIntentRef.current);
  }

  function advance(topic?: string) {
    const card = cards[cardIndex];
    if (card) setCompletedQuestions((prev) => [...prev, card.question]);
    const nextIdx = cardIndex + 1;
    if (nextIdx >= 5) {
      setPhase("done");
      speakText(`Session complete. You got ${score} out of 5. Drive safe!`);
      return;
    }
    setCardIndex(nextIdx);
    const nextTopic = topic ?? nextDirs[cardIndex]?.[0]?.description ?? rawTopic;
    generateCard(nextTopic, history, completedQuestions, sessionIntent);
  }

  // ── Helpers ────────────────────────────────────────────────────────────
  const card = cards[cardIndex] ?? null;
  const currentCorrect = card ? givenAnswerId === card.correctId : false;

  const phaseLabel: Record<Phase, string> = {
    topic: "Set your topic",
    refining: "Loading…",
    pills: "Pick an angle",
    generating: "Generating…",
    speaking: "Speaking…",
    listening: "Listening…",
    thinking: "Thinking…",
    replied: "Go ahead",
    answered: "Next up",
    done: "Done",
  };

  const pulseColor =
    phase === "listening" ? "#ffb400" :
    phase === "speaking"  ? "#4ade80" :
    phase === "thinking"  ? "#7dd3fc" :
    brand.text.muted;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: brand.bg.page, display: "flex", flexDirection: "column" }}>
      <ShellBar
        title="Driving Mode"
        onBack={() => {
          if (currentAudio) { currentAudio.pause(); currentAudio = null; }
          recognitionRef.current?.abort();
          router.back();
        }}
      />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 20px 48px" }}>
        <div style={{ width: "100%", maxWidth: "390px", display: "flex", flexDirection: "column", gap: "28px", alignItems: "center" }}>

          {/* ── Topic input ── */}
          {phase === "topic" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", marginBottom: "6px" }}>
                  What do you want to learn?
                </div>
                <div style={{ fontSize: "13px", color: brand.text.muted }}>
                  Tap a topic or type your own. I&apos;ll quiz you hands-free.
                </div>
              </div>

              {/* Curated topic grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { emoji: "🎵", label: "Music history", sub: "Jazz, rock, hip-hop origins" },
                  { emoji: "🌍", label: "World geography", sub: "Capitals, rivers, borders" },
                  { emoji: "🏛️", label: "Ancient history", sub: "Rome, Egypt, Greece" },
                  { emoji: "🔬", label: "Science facts", sub: "Physics, biology, space" },
                  { emoji: "🎬", label: "Film & pop culture", sub: "Directors, actors, classics" },
                  { emoji: "⚽", label: "Sports", sub: "Records, athletes, tournaments" },
                  { emoji: "💡", label: "Inventions", sub: "Who made what and when" },
                  { emoji: "🧠", label: "Psychology", sub: "How the mind works" },
                  { emoji: "🌐", label: "Current events", sub: "News, politics, world" },
                  { emoji: "📚", label: "Literature", sub: "Authors, novels, stories" },
                ].map((t) => (
                  <button
                    key={t.label}
                    onClick={() => refine(t.label)}
                    style={{
                      width: "100%", padding: "13px 16px", borderRadius: "12px",
                      background: brand.bg.raised, border: `1px solid ${brand.border.item}`,
                      display: "flex", alignItems: "center", gap: "14px",
                      cursor: "pointer", textAlign: "left",
                      WebkitTapHighlightColor: "transparent",
                      transition: "border-color 0.15s ease",
                    }}
                  >
                    <span style={{ fontSize: "20px", flexShrink: 0 }}>{t.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: brand.text.primary, letterSpacing: "-0.01em" }}>{t.label}</div>
                      <div style={{ fontSize: "11px", color: brand.text.muted, marginTop: "1px" }}>{t.sub}</div>
                    </div>
                    <span style={{ color: brand.text.muted, fontSize: "16px", flexShrink: 0 }}>›</span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1, height: "1px", background: brand.border.item }} />
                <span style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: brand.text.muted }}>or type your own</span>
                <div style={{ flex: 1, height: "1px", background: brand.border.item }} />
              </div>

              {/* Free text input */}
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && topicInput.trim()) refine(topicInput.trim()); }}
                  placeholder="e.g. Roman emperors, quantum physics…"
                  style={{
                    flex: 1, padding: "13px 14px", borderRadius: "10px",
                    background: brand.bg.raised, border: `1px solid ${brand.border.accent}`,
                    color: brand.text.primary, fontSize: "14px", outline: "none",
                  }}
                />
                <button
                  onClick={() => { if (topicInput.trim()) refine(topicInput.trim()); }}
                  disabled={!topicInput.trim()}
                  style={{
                    padding: "13px 16px", borderRadius: "10px", flexShrink: 0,
                    background: topicInput.trim() ? "rgba(255,180,0,0.14)" : brand.bg.raised,
                    border: `1px solid ${topicInput.trim() ? "rgba(255,180,0,0.35)" : brand.border.item}`,
                    color: topicInput.trim() ? "#ffb400" : brand.text.muted,
                    fontSize: "16px", fontWeight: "700", cursor: topicInput.trim() ? "pointer" : "default",
                    transition: "all 0.2s ease",
                  }}
                >
                  →
                </button>
              </div>
            </div>
          )}

          {/* ── Refine pills ── */}
          {phase === "refining" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "13px", color: brand.text.muted, textAlign: "center" }}>Loading topics…</div>
              {[1,2,3].map((i) => (
                <div key={i} style={{ height: "44px", borderRadius: "10px", background: brand.bg.raised, border: `1px solid ${brand.border.item}`, opacity: 0.3 + i * 0.1 }} />
              ))}
            </div>
          )}

          {phase === "pills" && pills.length > 0 && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted }}>
                Pick an angle
              </div>
              {pills.map((p) => (
                <button
                  key={p.label}
                  onClick={() => { setPills([]); generateCard(`${rawTopic} — ${p.label}`, [], [], sessionIntent); }}
                  style={{
                    width: "100%", padding: "13px 16px", borderRadius: "10px",
                    background: brand.bg.raised, border: `1px solid ${brand.border.item}`,
                    color: brand.text.secondary, fontSize: "14px", fontWeight: "600",
                    textAlign: "left", cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {p.label}
                </button>
              ))}
              <button
                onClick={() => { setPills([]); generateCard(rawTopic, [], [], sessionIntent); }}
                style={{
                  width: "100%", padding: "11px", borderRadius: "10px",
                  background: "transparent", border: "none",
                  color: brand.text.muted, fontSize: "12px", cursor: "pointer",
                }}
              >
                Just start
              </button>
            </div>
          )}

          {/* ── Generating spinner ── */}
          {phase === "generating" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <div style={{ fontSize: "36px" }}>🚗</div>
              <div style={{ fontSize: "13px", color: brand.text.muted }}>Writing your question…</div>
            </div>
          )}

          {/* ── Active quiz ── */}
          {card && phase !== "topic" && phase !== "refining" && phase !== "generating" && phase !== "done" && (
            <>
              {/* Progress */}
              <div style={{ display: "flex", gap: "6px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{
                    width: "28px", height: "4px", borderRadius: "2px",
                    background: i < cardIndex ? brand.status.correct.text : i === cardIndex ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s ease",
                  }} />
                ))}
              </div>

              {/* Pulse indicator */}
              <div style={{
                width: "100px", height: "100px", borderRadius: "50%",
                background: phase === "listening" ? "rgba(255,180,0,0.12)" : phase === "speaking" ? "rgba(74,222,128,0.10)" : phase === "thinking" ? "rgba(125,211,252,0.10)" : "rgba(255,255,255,0.04)",
                border: `2px solid ${pulseColor}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "36px", transition: "all 0.3s ease",
                boxShadow: phase === "listening" ? "0 0 32px rgba(255,180,0,0.15)" : phase === "speaking" ? "0 0 28px rgba(74,222,128,0.12)" : "none",
              }}>
                {phase === "listening" ? "🎤" : phase === "speaking" ? "🔊" : phase === "thinking" ? "💭" : "✓"}
              </div>

              {/* Status */}
              <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.14em", textTransform: "uppercase", color: pulseColor, transition: "color 0.3s ease" }}>
                {phaseLabel[phase]}
              </div>

              {/* Card */}
              <div style={{
                width: "100%", background: brand.bg.raised, borderRadius: "20px",
                border: `1px solid ${brand.border.item}`, padding: "20px",
                display: "flex", flexDirection: "column", gap: "14px",
              }}>
                <div style={{ fontSize: "16px", fontWeight: "700", color: brand.text.primary, lineHeight: 1.45, letterSpacing: "-0.015em" }}>
                  {card.question}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {card.options.map((opt, i) => {
                    const letters = ["A", "B", "C", "D"];
                    const isCorrect = opt.id === card.correctId;
                    const isGiven = opt.id === givenAnswerId;
                    const showResult = phase === "answered";
                    return (
                      <div key={opt.id} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px 14px", borderRadius: "10px",
                        background: showResult && isCorrect ? brand.status.correct.bg : showResult && isGiven && !isCorrect ? brand.status.wrong.bg : brand.bg.hover,
                        border: `1px solid ${showResult && isCorrect ? brand.status.correct.border : showResult && isGiven && !isCorrect ? brand.status.wrong.border : brand.border.item}`,
                        transition: "all 0.3s ease",
                      }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", color: brand.text.muted, width: "16px", flexShrink: 0 }}>{letters[i]}</span>
                        <span style={{ fontSize: "13px", color: showResult && isCorrect ? brand.status.correct.text : showResult && isGiven && !isCorrect ? brand.status.wrong.text : brand.text.secondary, flex: 1 }}>{opt.text}</span>
                        {showResult && isCorrect && <span style={{ fontSize: "12px", color: brand.status.correct.text }}>✓</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Host reply */}
                {hostReply && (
                  <div style={{ fontSize: "13px", color: brand.text.muted, fontStyle: "italic", borderTop: `1px solid ${brand.border.item}`, paddingTop: "12px" }}>
                    {hostReply}
                  </div>
                )}
              </div>

              {/* Listen prompt */}
              {phase === "listening" && listenPrompt && (
                <div style={{ fontSize: "12px", color: brand.text.muted, textAlign: "center" }}>{listenPrompt}</div>
              )}

              {/* Manual stop-listen button */}
              {phase === "listening" && (
                <button
                  onClick={stopListening}
                  style={{
                    width: "100%", padding: "13px", borderRadius: "12px",
                    background: "rgba(255,180,0,0.08)", border: "1px solid rgba(255,180,0,0.2)",
                    color: "#ffb400", fontSize: "13px", fontWeight: "600", cursor: "pointer",
                  }}
                >
                  Stop listening
                </button>
              )}

              {/* Advance button */}
              {phase === "answered" && (
                <button
                  onClick={() => advance()}
                  style={{
                    width: "100%", padding: "15px", borderRadius: "12px",
                    background: currentCorrect ? "rgba(74,222,128,0.10)" : brand.bg.hover,
                    border: `1px solid ${currentCorrect ? brand.status.correct.border : brand.border.accent}`,
                    color: currentCorrect ? brand.status.correct.text : brand.text.primary,
                    fontSize: "15px", fontWeight: "700", cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {cardIndex < 4 ? "Next question →" : "See results"}
                </button>
              )}
            </>
          )}

          {/* ── Done ── */}
          {phase === "done" && (
            <>
              <div style={{ fontSize: "36px" }}>🏁</div>
              <div style={{ width: "100%", background: brand.bg.raised, borderRadius: "20px", border: `1px solid ${brand.border.item}`, padding: "28px 22px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", fontWeight: "800", color: brand.status.correct.text, letterSpacing: "-0.04em" }}>{score}/5</div>
                <div style={{ fontSize: "13px", color: brand.text.muted, marginTop: "8px" }}>Stay safe out there.</div>
              </div>
              <button
                onClick={() => {
                  setPhase("topic"); setTopicInput(""); setRawTopic("");
                  setPills([]); setCards([]); setNextDirs([]);
                  setCardIndex(0); setHistory([]); setCompletedQuestions([]);
                  setGivenAnswerId(null); setHostReply(""); setScore(0);
                  setSessionIntent(null); setAttempts(0);
                }}
                style={{
                  width: "100%", padding: "14px", borderRadius: "12px",
                  background: brand.bg.hover, border: `1px solid ${brand.border.accent}`,
                  color: brand.text.primary, fontSize: "14px", fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                New session
              </button>
              <button
                onClick={() => router.back()}
                style={{
                  background: "none", border: "none", color: brand.text.muted,
                  fontSize: "12px", cursor: "pointer",
                }}
              >
                Back home
              </button>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
