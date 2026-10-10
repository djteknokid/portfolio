"use client";

import { useState, useRef, useEffect } from "react";
import { brand } from "./brand";
import { haptic, playCorrectBeep, playVictory } from "./sounds";

interface Props {
  word: string;
  audioUrl: string;
  phonetic?: string;
  definition?: string;
  onComplete: () => void;
}

type Phase = "idle" | "recording" | "grading" | "pass" | "fail";

const RECORD_DURATION_MS = 2000;

export default function PronunciationGame({ word, audioUrl, phonetic, definition, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [feedback, setFeedback] = useState("");
  const [countdown, setCountdown] = useState(0);
  const isPlayingRef = useRef(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function playExample() {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    const a = new Audio(audioUrl);
    a.play().catch(() => {});
    a.onended = () => { isPlayingRef.current = false; };
  }

  async function startRecording() {
    setPhase("recording");
    setFeedback("");
    setCountdown(RECORD_DURATION_MS / 1000);
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        submitRecording();
      };
      mr.start();
      haptic(30);

      // Countdown tick
      let remaining = RECORD_DURATION_MS / 1000;
      intervalRef.current = setInterval(() => {
        remaining -= 0.1;
        setCountdown(Math.max(0, remaining));
      }, 100);

      // Auto-stop after 2s
      timerRef.current = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        mr.stop();
      }, RECORD_DURATION_MS);
    } catch {
      setPhase("idle");
    }
  }

  async function submitRecording() {
    setPhase("grading");
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    const fd = new FormData();
    fd.append("audio", blob, "recording.webm");
    fd.append("word", word);

    try {
      const res = await fetch("/api/nuggets/pronounce", { method: "POST", body: fd });
      const data = await res.json();
      if (data.passed) {
        setPhase("pass");
        setFeedback(data.feedback ?? "Perfect!");
        haptic(30);
        playCorrectBeep();
        playVictory();
        setTimeout(() => onComplete(), 1400);
      } else {
        setPhase("fail");
        setFeedback(data.feedback ?? "Try again.");
        haptic([40, 60, 40]);
      }
    } catch {
      setPhase("fail");
      setFeedback("Could not grade — check your connection.");
    }
  }

  function retry() {
    setPhase("idle");
    setFeedback("");
    setCountdown(0);
  }

  const isRecording = phase === "recording";
  const isGrading = phase === "grading";
  const progress = isRecording ? ((RECORD_DURATION_MS / 1000 - countdown) / (RECORD_DURATION_MS / 1000)) * 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Instruction */}
      <div style={{ fontSize: "10px", fontWeight: "600", letterSpacing: "0.14em", textTransform: "uppercase", color: brand.text.muted }}>
        Pronunciation
      </div>

      {/* Word + phonetic */}
      <div style={{
        background: brand.bg.raised,
        border: `1px solid ${brand.border.item}`,
        borderRadius: "14px",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}>
        <span style={{ fontSize: "36px", fontWeight: "800", color: brand.text.primary, letterSpacing: "-0.03em", lineHeight: 1 }}>
          {word}
        </span>
        {phonetic && (
          <span style={{ fontSize: "14px", color: brand.text.muted, fontStyle: "italic", letterSpacing: "0.01em" }}>
            {phonetic}
          </span>
        )}
      </div>

      {/* Definition */}
      {definition && (
        <div style={{
          background: brand.bg.raised,
          border: `1px solid ${brand.border.item}`,
          borderRadius: "14px",
          padding: "16px 18px",
        }}>
          <span style={{ fontSize: "14px", color: brand.text.secondary ?? brand.text.muted, lineHeight: "1.6" }}>
            {definition}
          </span>
        </div>
      )}

      {/* Listen button */}
      <button
        onClick={playExample}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "13px 20px",
          borderRadius: "10px",
          border: `1px solid ${brand.border.item}`,
          background: brand.bg.raised,
          cursor: "pointer",
          WebkitTapHighlightColor: "transparent",
          boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
        }}
      >
        <span style={{ fontSize: "18px", lineHeight: 1 }}>🔊</span>
        <span style={{ fontSize: "14px", fontWeight: "600", color: brand.text.primary }}>Listen</span>
      </button>

      {/* Say it button */}
      {(phase === "idle" || phase === "fail") && (
        <button
          onClick={startRecording}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "16px 20px",
            borderRadius: "10px",
            border: `1px solid ${brand.border.accent}`,
            background: "transparent",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            boxShadow: `0 0 0 1px ${brand.border.accent}`,
          }}
        >
          <span style={{
            width: "12px", height: "12px", borderRadius: "50%",
            background: "#ef4444",
            boxShadow: "0 0 8px rgba(239,68,68,0.7)",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: "14px", fontWeight: "600", color: brand.text.primary }}>Say it</span>
        </button>
      )}

      {/* Recording in progress — progress bar, no stop button */}
      {isRecording && (
        <div style={{
          borderRadius: "10px",
          border: "1px solid #ef4444",
          background: "rgba(239,68,68,0.08)",
          overflow: "hidden",
          position: "relative",
        }}>
          {/* Progress fill */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(239,68,68,0.15)",
            width: `${progress}%`,
            transition: "width 100ms linear",
          }} />
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "16px 20px",
          }}>
            <span style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: "#ef4444",
              animation: "pulse 0.8s ease-in-out infinite",
              flexShrink: 0,
            }} />
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#ef4444" }}>
              Listening… {countdown.toFixed(1)}s
            </span>
          </div>
          <style>{`@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }`}</style>
        </div>
      )}

      {/* Grading */}
      {isGrading && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          padding: "16px 20px",
          borderRadius: "10px",
          border: `1px solid ${brand.border.item}`,
          background: brand.bg.raised,
          color: brand.text.muted,
          fontSize: "13px",
        }}>
          Grading…
        </div>
      )}

      {/* Pass */}
      {phase === "pass" && (
        <div style={{
          padding: "16px 18px",
          borderRadius: "10px",
          border: `1px solid ${brand.status.correct.border}`,
          background: brand.status.correct.bg,
        }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: brand.status.correct.text }}>✓ {feedback}</span>
        </div>
      )}

      {/* Fail */}
      {phase === "fail" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{
            padding: "14px 16px",
            borderRadius: "10px",
            border: `1px solid ${brand.status.wrong.border}`,
            background: brand.status.wrong.bg,
          }}>
            <span style={{ fontSize: "13px", color: brand.status.wrong.text }}>{feedback}</span>
          </div>
          <button
            onClick={retry}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 20px",
              borderRadius: "10px",
              border: `1px solid ${brand.border.item}`,
              background: brand.bg.raised,
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              fontSize: "14px",
              fontWeight: "600",
              color: brand.text.primary,
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
