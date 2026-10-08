"use client";

import { useState } from "react";
import { brand } from "../brand";
import GroupingGame from "../GroupingGame";
import MatchingGame from "../MatchingGame";
import SequenceGame from "../SequenceGame";

const AXIS_ALLIES_DATA = {
  question: "Which countries fought on which side in World War II?",
  zones: [
    { id: "allies", label: "Allied Powers", color: "#60a5fa" },
    { id: "axis",   label: "Axis Powers",   color: "#f87171" },
  ],
  items: [
    { id: "usa",     label: "United States", emoji: "🇺🇸", correctGroup: "allies" },
    { id: "uk",      label: "United Kingdom", emoji: "🇬🇧", correctGroup: "allies" },
    { id: "ussr",    label: "Soviet Union",  emoji: "🇷🇺", correctGroup: "allies" },
    { id: "france",  label: "France",        emoji: "🇫🇷", correctGroup: "allies" },
    { id: "china",   label: "China",         emoji: "🇨🇳", correctGroup: "allies" },
    { id: "germany", label: "Germany",       emoji: "🇩🇪", correctGroup: "axis"   },
    { id: "japan",   label: "Japan",         emoji: "🇯🇵", correctGroup: "axis"   },
    { id: "italy",   label: "Italy",         emoji: "🇮🇹", correctGroup: "axis"   },
  ],
};

const NATO_DATA = {
  question: "Which countries were founding members of NATO in 1949?",
  zones: [
    { id: "nato",     label: "Founding NATO Members", color: "#60a5fa" },
    { id: "non-nato", label: "Not in NATO",            color: "#a78bfa" },
  ],
  items: [
    { id: "usa",         label: "United States",  emoji: "🇺🇸", correctGroup: "nato"     },
    { id: "uk",          label: "United Kingdom", emoji: "🇬🇧", correctGroup: "nato"     },
    { id: "france",      label: "France",         emoji: "🇫🇷", correctGroup: "nato"     },
    { id: "canada",      label: "Canada",         emoji: "🇨🇦", correctGroup: "nato"     },
    { id: "norway",      label: "Norway",         emoji: "🇳🇴", correctGroup: "nato"     },
    { id: "denmark",     label: "Denmark",        emoji: "🇩🇰", correctGroup: "nato"     },
    { id: "portugal",    label: "Portugal",       emoji: "🇵🇹", correctGroup: "nato"     },
    { id: "italy",       label: "Italy",          emoji: "🇮🇹", correctGroup: "nato"     },
    { id: "germany",     label: "Germany",        emoji: "🇩🇪", correctGroup: "non-nato" },
    { id: "ussr",        label: "Soviet Union",   emoji: "🇷🇺", correctGroup: "non-nato" },
    { id: "sweden",      label: "Sweden",         emoji: "🇸🇪", correctGroup: "non-nato" },
    { id: "switzerland", label: "Switzerland",    emoji: "🇨🇭", correctGroup: "non-nato" },
  ],
};

const CAPITALS_DATA = {
  question: "What were the capital cities of the major World War II powers?",
  pairs: [
    { id: "germany-pair", left: "Germany",        right: "Berlin"    },
    { id: "japan-pair",   left: "Japan",           right: "Tokyo"     },
    { id: "uk-pair",      left: "United Kingdom",  right: "London"    },
    { id: "france-pair",  left: "France",          right: "Paris"     },
    { id: "italy-pair",   left: "Italy",           right: "Rome"      },
    { id: "usa-pair",     left: "United States",   right: "Washington D.C." },
  ],
};

const SEQUENCE_DATA = {
  question: "How did World War II begin?",
  sequence: [
    { id: "1", text: "Hitler takes Austria and Czechoslovakia. Britain and France warn Poland will be different." },
    { id: "2", text: "Germany invades Poland, attacking with tanks and aircraft." },
    { id: "3", text: "Hitler expects Britain and France to back down. They don't — both declare war." },
    { id: "4", text: "The Soviet Union invades Poland from the east. Europe is at war." },
  ],
};

type GameType = "axis-allies" | "nato" | "matching" | "sequence";

export default function GamesDemo() {
  const [active, setActive] = useState<GameType>("axis-allies");
  const [done, setDone] = useState<Record<GameType, boolean>>({
    "axis-allies": false, nato: false, matching: false, sequence: false,
  });

  const tabs: { id: GameType; label: string }[] = [
    { id: "axis-allies", label: "Axis / Allies" },
    { id: "nato",        label: "NATO 1949"     },
    { id: "matching",    label: "Capitals"      },
    { id: "sequence",    label: "Sequence"      },
  ];

  const question =
    active === "axis-allies" ? AXIS_ALLIES_DATA.question :
    active === "nato"        ? NATO_DATA.question :
    active === "matching"    ? CAPITALS_DATA.question :
    SEQUENCE_DATA.question;

  return (
    <main style={{
      minHeight: "100vh",
      background: brand.bg.page,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "48px",
      paddingBottom: "96px",
      paddingLeft: "24px",
      paddingRight: "24px",
    }}>
      <div style={{ width: "100%", maxWidth: "360px", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Header */}
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: brand.text.primary, letterSpacing: "-0.02em" }}>
            Answer types
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: brand.text.muted }}>
            Three ways to test knowledge
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: `1px solid ${active === t.id ? brand.border.accent : brand.border.item}`,
                background: active === t.id ? brand.bg.hover : "transparent",
                color: active === t.id ? brand.text.primary : brand.text.muted,
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                cursor: "pointer",
                transition: brand.motion.snap,
                position: "relative",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
              {done[t.id] && (
                <span style={{
                  position: "absolute", top: "-4px", right: "-4px",
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: brand.status.correct.text,
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Question */}
        <h2 style={{
          margin: 0,
          fontSize: "clamp(1.3rem, 6vw, 1.7rem)",
          fontWeight: "700",
          color: brand.text.primary,
          letterSpacing: "-0.025em",
          lineHeight: "1.2",
        }}>
          {question}
        </h2>

        {/* Game */}
        {active === "axis-allies" && (
          <GroupingGame
            key="axis-allies"
            {...AXIS_ALLIES_DATA}
            onComplete={() => setDone((d) => ({ ...d, "axis-allies": true }))}
          />
        )}
        {active === "nato" && (
          <GroupingGame
            key="nato"
            {...NATO_DATA}
            onComplete={() => setDone((d) => ({ ...d, nato: true }))}
          />
        )}
        {active === "matching" && (
          <MatchingGame
            key="matching"
            {...CAPITALS_DATA}
            onComplete={() => setDone((d) => ({ ...d, matching: true }))}
          />
        )}
        {active === "sequence" && (
          <SequenceGame
            key="sequence"
            {...SEQUENCE_DATA}
            onComplete={() => setDone((d) => ({ ...d, sequence: true }))}
          />
        )}
      </div>
    </main>
  );
}
