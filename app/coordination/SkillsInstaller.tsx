"use client";
import { useState } from "react";

const ACCENT = "#bc7155";
const OBSIDIAN = "#000d10";

const BOOTSTRAP_CLARITY = `Please install my /do-clarity skill:
1. Fetch the full contents of: https://davidlee.design/coordination/skills/clarity/skill.md
2. Use the Write tool (not Bash) to save it to: ~/.claude/skills/do-clarity/SKILL.md
   (The Write tool will create the directory automatically if it does not exist.)
3. Confirm the file was saved successfully and tell me to restart Claude Code to activate /do-clarity.`;

const SKILLS = [
  {
    command: "/do-clarity",
    label: "Clarity",
    description: "Stress-test your User, Problem, and Success statement before a meeting.",
    available: true,
    prompt: BOOTSTRAP_CLARITY,
  },
  {
    command: "/do-tradeoffs",
    label: "Trade-offs",
    description: "Make Benefit, Risk, and Acceptance visible before committing to a direction.",
    available: false,
    prompt: "",
  },
  {
    command: "/do-prioritization",
    label: "Priority",
    description: "Rank initiatives by Urgency, Impact, and Effort — and defend the order.",
    available: false,
    prompt: "",
  },
  {
    command: "/do-decision",
    label: "Decision",
    description: "Align Stakeholders, assign Responsibility, and lock in Next Steps.",
    available: false,
    prompt: "",
  },
];

export default function SkillsInstaller() {
  const [copied, setCopied] = useState<string | null>(null);

  function copyInstall(command: string, prompt: string) {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(command);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <section style={{
      background: OBSIDIAN,
      padding: "var(--sp-10) var(--sp-6)",
    }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>

        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>
          Coordination Skills for Claude Code
        </p>

        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(26px, 3.5vw, 40px)",
          fontWeight: 700,
          color: "#ffffff",
          margin: "0 0 var(--sp-3)",
          lineHeight: 1.1,
        }}>
          Install once. Use anywhere.
        </h2>

        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "14px",
          color: "rgba(255,255,255,0.5)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          Copy the install prompt, paste it into Claude Code, and the skill is saved globally.
          Type <code style={{ fontFamily: "monospace", color: ACCENT }}>/do-clarity</code> in
          any session to run it.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-4)",
        }}>
          {SKILLS.map((skill) => (
            <div key={skill.command} style={{
              padding: "var(--sp-5)",
              background: skill.available ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
              border: skill.available
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--sp-3)",
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, monospace",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: skill.available ? ACCENT : "rgba(255,255,255,0.2)",
                  margin: "0 0 6px",
                  letterSpacing: "0.02em",
                }}>
                  {skill.command}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "13px",
                  color: skill.available ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {skill.description}
                </p>
              </div>

              {skill.available ? (
                <button
                  onClick={() => copyInstall(skill.command, skill.prompt)}
                  style={{
                    alignSelf: "flex-start",
                    padding: "8px 16px",
                    background: copied === skill.command ? "rgba(188,113,85,0.3)" : ACCENT,
                    border: "none",
                    color: "#ffffff",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  {copied === skill.command ? "Copied ✓" : "Copy install prompt"}
                </button>
              ) : (
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.18)",
                  margin: 0,
                }}>
                  Coming soon
                </p>
              )}
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "12px",
          color: "rgba(255,255,255,0.25)",
          margin: "var(--sp-5) 0 0",
          lineHeight: 1.6,
        }}>
          Requires Claude Code. After pasting the install prompt, restart Claude Code to activate the skill.
        </p>

      </div>
    </section>
  );
}
