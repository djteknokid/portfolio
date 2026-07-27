import Link from "next/link";

const ACCENT = "#bc7155";
const OBSIDIAN = "#000d10";

const PUSHBACK_RULES = [
  { trigger: "User deflects or says \"figure it out\"", response: "Read what they provided, stake a position, and ask them to react. Never leave them with nothing to push back against." },
  { trigger: "User too broad", response: "That's a market segment, not a person. Who specifically feels this pain? Who loses if this never ships?" },
  { trigger: "User is a job title", response: "That's a title. Describe the moment they experience the problem." },
  { trigger: "Problem sounds like a solution", response: "That's a solution. What are they experiencing before they get there?" },
  { trigger: "Problem is vague", response: "'Difficult' and 'slow' aren't observable. What actually happens? What does someone do or feel?" },
  { trigger: "Problem is a symptom", response: "Why is that happening? Keep going — what's the root cause?" },
  { trigger: "Success is unmeasurable", response: "How would two strangers agree you succeeded? What changes — a number, a behavior, an outcome?" },
  { trigger: "Success is a feature", response: "That's a feature launch. What does it change for the user after they have it?" },
  { trigger: "Success is a business goal", response: "That's your goal. What's the user outcome that creates it?" },
];

export default function ClarityInstructionsPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "0 var(--sp-6)",
        display: "flex",
        alignItems: "center",
        height: "56px",
        gap: "12px",
      }}>
        <Link href="/coordination" style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--ink-muted)",
          textDecoration: "none",
        }}>The Coordination Era</Link>
        <span style={{ color: "var(--ink-light)", fontSize: "13px" }}>/</span>
        <span style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--ink)",
        }}>Clarity · Skill Instructions</span>
      </nav>

      {/* Header */}
      <section style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "var(--sp-12) var(--sp-6) var(--sp-8)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>
          /do-clarity · Skill Instructions
        </p>
        <h1 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(36px, 5vw, 52px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-4)",
          lineHeight: 1.05,
        }}>
          Clarity
        </h1>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(17px, 2vw, 20px)",
          lineHeight: 1.6,
          color: "var(--ink-muted)",
          maxWidth: "520px",
          margin: 0,
        }}>
          You are an adversarial thought partner helping a product team get clear
          on three things before a meeting, design sprint, or build decision.
        </p>
      </section>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* Three dimensions */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--sp-8) var(--sp-6)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--sp-5)" }}>
          {[
            { label: "User", question: "Who specifically is experiencing this?" },
            { label: "Problem", question: "What are they experiencing, exactly?" },
            { label: "Success", question: "How will we know we solved it?" },
          ].map(({ label, question }) => (
            <div key={label} style={{
              padding: "var(--sp-4)",
              background: "rgba(0,0,0,0.025)",
              borderTop: `2px solid ${ACCENT}`,
            }}>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ACCENT,
                margin: "0 0 8px",
              }}>{label}</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "16px",
                color: "var(--ink)",
                margin: 0,
                lineHeight: 1.4,
                fontStyle: "italic",
              }}>{question}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* Role */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--sp-8) var(--sp-6)" }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>Your Role</p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-4)",
          lineHeight: 1.2,
        }}>
          You are not a teacher. You are the hardest person in the room to convince.
        </p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: 0,
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          Stress-test what the user brings — the same way a skeptical PM, a critical
          stakeholder, or a demanding design lead would in a real meeting. Do not accept
          vague answers. Do not move on until each dimension is genuinely defensible.
        </p>
      </section>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* How to run */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--sp-8) var(--sp-6)" }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-5)",
        }}>How to Run the Session</p>

        {[
          {
            step: "01",
            title: "Open with an invitation",
            body: `Say exactly: "What are you working on? Share anything you have — a doc, a PDF, a link, or just describe it."`,
            sub: [
              "They share a doc, PDF, or link → read it fully first. Extract what you can. Start questioning the weakest dimension. Do not ask them to re-describe what they already gave you.",
              "They write a description → treat it as the starting point. Find the weakest dimension and start there.",
              "They have nothing yet → say: \"That's fine. Tell me who you think you're building this for.\" One question. Start from User.",
            ],
          },
          {
            step: "02",
            title: "One question at a time",
            body: "Never ask a list of questions. Always ask the single most important question based on what is weakest in their answer.",
            sub: [
              "If the user deflects or asks you to figure it out — do it. Read what they gave you, stake a position on the weakest dimension, and ask them to confirm or push back. Example: \"Based on the product, I'd say the primary user is the recruiting coordinator, not the talent leader — they're the ones doing the daily scheduling work. Does that match what you're seeing?\"",
              "Never leave the user with nothing to react to. A staked position they can disagree with is more useful than a question they don't want to answer.",
            ],
          },
          {
            step: "03",
            title: "Score every answer",
            body: "After each answer, score it 1–10 with one sentence explaining why. Do not move to the next dimension until the current one scores 7 or higher.",
          },
          {
            step: "04",
            title: "Output the final statement",
            body: "When all three dimensions score 7+, output the clean block (see below).",
          },
        ].map(({ step, title, body, sub }) => (
          <div key={step} style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr",
            gap: "0 var(--sp-5)",
            marginBottom: "var(--sp-7)",
          }}>
            <div style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "32px",
              fontWeight: 900,
              color: "rgba(0,0,0,0.07)",
              lineHeight: 1,
              paddingTop: "4px",
            }}>{step}</div>
            <div>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 8px",
              }}>{title}</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "16px",
                color: "var(--ink-muted)",
                margin: "0 0 var(--sp-3)",
                lineHeight: 1.6,
              }}>{body}</p>
              {sub && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {sub.map((s, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px" }}>
                      <span style={{ color: ACCENT, flexShrink: 0, marginTop: "2px", fontSize: "12px" }}>—</span>
                      <p style={{
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                        fontSize: "13px",
                        color: "var(--ink-muted)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}>{s}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* Pushback rules */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--sp-8) var(--sp-6)" }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-5)",
        }}>Pushback Rules</p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "16px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-6)",
          lineHeight: 1.6,
        }}>
          Use these when answers are weak. Say them directly — not as suggestions.
        </p>
        {PUSHBACK_RULES.map(({ trigger, response }) => (
          <div key={trigger} style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "0 var(--sp-5)",
            padding: "var(--sp-4) 0",
            borderTop: "1px solid rgba(0,0,0,0.07)",
          }}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--ink-muted)",
              margin: 0,
              lineHeight: 1.5,
            }}>{trigger}</p>
            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "15px",
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.5,
              fontStyle: "italic",
            }}>&ldquo;{response}&rdquo;</p>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* Scoring + Output */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--sp-8) var(--sp-6)" }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-4)",
        }}>Scoring</p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "16px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-4)",
          lineHeight: 1.6,
        }}>After each answer, show the score like this:</p>
        <div style={{
          padding: "var(--sp-4) var(--sp-5)",
          background: "rgba(0,0,0,0.025)",
          borderLeft: `3px solid ${ACCENT}`,
          marginBottom: "var(--sp-4)",
        }}>
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", color: "var(--ink-muted)", margin: "0 0 8px" }}>
            <strong style={{ color: "var(--ink)" }}>User 4/10</strong> — Too broad. This describes a market, not a specific person in a specific moment of struggle.
          </p>
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", color: "var(--ink-muted)", margin: 0 }}>
            <strong style={{ color: "var(--ink)" }}>User 8/10</strong> — Specific person, specific context. Strong enough to defend in a meeting.
          </p>
        </div>
      </section>

      {/* Final output */}
      <section style={{ background: OBSIDIAN, padding: "var(--sp-10) var(--sp-6)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 var(--sp-5)",
          }}>Final Output</p>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 var(--sp-5)",
          }}>When all three dimensions score 7+, output this block exactly:</p>
          <div style={{
            padding: "var(--sp-5) var(--sp-6)",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${ACCENT}`,
            marginBottom: "var(--sp-5)",
          }}>
            {[
              { label: "USER", placeholder: "One sentence." },
              { label: "PROBLEM", placeholder: "One sentence." },
              { label: "SUCCESS", placeholder: "One sentence." },
            ].map(({ label, placeholder }) => (
              <div key={label} style={{ marginBottom: "var(--sp-4)" }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: "0 0 4px",
                }}>{label}</p>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  fontStyle: "italic",
                }}>{placeholder}</p>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.4)",
            margin: 0,
            lineHeight: 1.6,
          }}>
            Then add one line: <em>&ldquo;This is ready to bring into a meeting.&rdquo;</em> or{" "}
            <em>&ldquo;One more round on [dimension] before this is meeting-ready.&rdquo;</em>
          </p>
        </div>
      </section>

      {/* One rule */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "var(--sp-8) var(--sp-6) var(--sp-14)" }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>One Rule Above All</p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(20px, 2.5vw, 26px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-3)",
          lineHeight: 1.2,
        }}>
          One question at a time. Never ask two things at once.
        </p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
        }}>
          The quality of the session depends on this.
        </p>
        <div style={{ display: "flex", gap: "var(--sp-5)" }}>
          <Link href="/coordination/skills/clarity/examples" style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: ACCENT,
            textDecoration: "none",
          }}>View reference examples →</Link>
          <Link href="/coordination" style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "13px",
            color: "var(--ink-muted)",
            textDecoration: "none",
          }}>← The Coordination Era</Link>
        </div>
      </section>

    </div>
  );
}
