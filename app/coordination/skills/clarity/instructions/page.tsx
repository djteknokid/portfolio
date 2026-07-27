import Link from "next/link";

const ACCENT = "#bc7155";
const OBSIDIAN = "#000d10";

const PUSHBACK_RULES = [
  { trigger: "User deflects or says \"figure it out\"", response: "Do it. Read what they provided, produce your full analysis, then ask only for what you genuinely cannot infer." },
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
          You are a senior analyst, not an interviewer. Consume everything available,
          produce your best analysis, and only ask questions when your confidence is genuinely low.
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
          Act like a senior PM given a PRD. Not an interviewer asking discovery questions.
        </p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: 0,
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          A senior PM reads the brief, forms a view, and says: &ldquo;Here&rsquo;s who I think the user is —
          here&rsquo;s my evidence — here&rsquo;s what I&rsquo;m least confident about.&rdquo;
          They never ask &ldquo;who&rsquo;s the user?&rdquo; when they can read it themselves.
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
            title: "Consume everything",
            body: "Read the full material — website, doc, PDF, README, PRD, screenshots. Extract all evidence before forming any view.",
            sub: [
              "They share a doc, PDF, or link → read it fully. Do not ask them to re-describe what they already gave you.",
              "They write a description → treat it as the starting material.",
              "They have nothing yet → say: \"That's fine. Tell me what you're working on.\" Then proceed from there.",
            ],
          },
          {
            step: "02",
            title: "Extract all three dimensions",
            body: "For each dimension, produce: a one-sentence summary, the evidence that supports it, and a confidence score (1–10).",
            sub: [
              "User: identify the primary operator (who uses it daily), distinguish from the sponsor (who pays) and the outcome recipient (who judges success). Name the one the problem is built around.",
              "Problem: look for the causal chain — what the user can do, what they cannot do, and what that causes. Not just the symptom.",
              "Success: look for a time target, a quality bar, a removed dependency, or an observable behavior change. 'Better' is not success.",
            ],
          },
          {
            step: "03",
            title: "Score confidence — then decide whether to ask",
            body: "If all three dimensions score 7 or higher: produce the full clarity artifact immediately. Do not ask questions you can answer yourself.",
            sub: [
              "If one dimension scores below 7: ask ONE targeted question about that dimension only. Not an open question — a forced choice between two specific interpretations.",
              "If two or more score below 7: ask about the weakest one first. Never ask about multiple dimensions at once.",
              "A 'yes' from the user does not raise a score. Only evidence or a forced distinction does.",
            ],
          },
          {
            step: "04",
            title: "Separate facts from inferences",
            body: "In the output, explicitly name what was extracted from the material versus what was inferred. Stakeholders cannot challenge an assumption they cannot see.",
            sub: [
              "Extracted: directly stated in the material.",
              "Inferred: your interpretation of signals in the material.",
              "Assumed: working positions not yet validated by evidence or by the user.",
            ],
          },
          {
            step: "05",
            title: "Produce the clarity artifact",
            body: "When all three dimensions score 7+, output the full artifact (see below). This is an alignment document — not a summary of the conversation.",
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

      {/* Scoring */}
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
        }}>Score your own confidence in each dimension — not the quality of the user&rsquo;s answer.</p>
        <div style={{
          padding: "var(--sp-4) var(--sp-5)",
          background: "rgba(0,0,0,0.025)",
          borderLeft: `3px solid ${ACCENT}`,
          marginBottom: "var(--sp-4)",
        }}>
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", color: "var(--ink-muted)", margin: "0 0 8px" }}>
            <strong style={{ color: "var(--ink)" }}>User 4/10</strong> — The material names several user types but gives no signal about which one the product is built around. Asking.
          </p>
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", color: "var(--ink-muted)", margin: 0 }}>
            <strong style={{ color: "var(--ink)" }}>User 9/10</strong> — The homepage, onboarding copy, and pricing all point to the same person. Proceeding.
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
          }}>Final Output — Clarity Artifact</p>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 var(--sp-5)",
          }}>When all three dimensions reach confidence 7+, produce this artifact. It is an alignment document, not a session summary.</p>
          <div style={{
            padding: "var(--sp-5) var(--sp-6)",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${ACCENT}`,
            marginBottom: "var(--sp-5)",
          }}>
            {[
              {
                label: "USER",
                lines: [
                  "Primary user: one sentence — who they are and what context they operate in.",
                  "Confidence score. Evidence or inference label.",
                ],
              },
              {
                label: "PROBLEM",
                lines: [
                  "One sentence: what they can do, what they cannot do, and what that causes.",
                  "One sentence: why the gap exists — the specific constraint.",
                  "Confidence score. Evidence or inference label.",
                ],
              },
              {
                label: "SUCCESS",
                lines: [
                  "One sentence: the outcome, with a time or quality target where extractable.",
                  "One sentence: what dependency is removed or what behavior changes.",
                  "Confidence score. Evidence or inference label.",
                ],
              },
            ].map(({ label, lines }) => (
              <div key={label} style={{ marginBottom: "var(--sp-5)" }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: "0 0 6px",
                }}>{label}</p>
                {lines.map((line, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.4)",
                    margin: "0 0 4px",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                  }}>{line}</p>
                ))}
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
            End with: <em>&ldquo;This is ready to bring into a meeting.&rdquo;</em> or{" "}
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
          Never ask a question you can answer yourself.
        </p>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
        }}>
          Questions are for genuine uncertainty. Analysis is for everything else.
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
