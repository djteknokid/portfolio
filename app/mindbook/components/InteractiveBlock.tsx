"use client";

import { useState } from "react";

type Option = {
  label: string;
  response: string;
};

type Props = {
  label: string;
  title?: string;
  scenario?: string;
  question: string;
  options: Option[];
  accentColor?: string;
  responseLabel?: string;
};

export function InteractiveBlock({
  label,
  title,
  scenario,
  question,
  options,
  accentColor = "#3B4FD4",
  responseLabel,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{
      margin: "var(--sp-10) 0",
      maxWidth: "680px",
      marginLeft: "auto",
      marginRight: "auto",
      borderTop: `2px solid ${accentColor}`,
      paddingTop: "var(--sp-4)",
    }}>

      {/* Label — Inter 11px 700 uppercase (system label style) */}
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: accentColor,
        marginBottom: "var(--sp-4)",
      }}>
        {label}
      </p>

      {/* Optional title — Playfair 28px 700 (section head scale) */}
      {title && (
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: 1.2,
          color: "var(--ink)",
          marginBottom: "var(--sp-3)",
          letterSpacing: "-0.25px",
        }}>
          {title}
        </p>
      )}

      {/* Optional scenario — Playfair 20px italic (body scale) */}
      {scenario && (
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "20px",
          fontStyle: "italic",
          lineHeight: 1.75,
          color: "var(--ink-muted)",
          marginBottom: "var(--sp-4)",
        }}>
          {scenario}
        </p>
      )}

      {/* Question — Inter 14px 500 (UI text scale) */}
      <p style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: 1.5,
        color: "var(--ink)",
        marginBottom: "var(--sp-4)",
      }}>
        {question}
      </p>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "14px",
                width: "100%",
                textAlign: "left",
                padding: "11px 0",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: isSelected ? accentColor : "var(--ink-light)",
                flexShrink: 0,
                minWidth: "16px",
                transition: "color 0.15s",
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "14px",
                lineHeight: 1.6,
                color: isSelected ? "var(--ink)" : "var(--ink-muted)",
                fontWeight: isSelected ? 500 : 400,
                transition: "color 0.15s",
              }}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Response reveal */}
      {selected !== null ? (
        <div style={{
          marginTop: "var(--sp-4)",
          paddingTop: "var(--sp-4)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}>
          {responseLabel && (
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: accentColor,
              marginBottom: "var(--sp-2)",
            }}>
              {responseLabel}
            </p>
          )}
          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "20px",
            fontStyle: "italic",
            lineHeight: 1.8,
            color: "var(--ink-muted)",
          }}>
            {options[selected].response}
          </p>
        </div>
      ) : (
        <p style={{
          marginTop: "var(--sp-3)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          color: "var(--ink-light)",
          letterSpacing: "0.04em",
        }}>
          Choose a position to continue.
        </p>
      )}

    </div>
  );
}
