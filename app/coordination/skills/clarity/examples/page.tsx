import Link from "next/link";

const ACCENT = "#bc7155";
const OBSIDIAN = "#000d10";

const MISTAKES = [
  {
    pattern: "Too broad",
    weak: "Customers",
    better: "Parents purchasing their child's first bicycle.",
    why: "Which customers? New or existing? Consumer or enterprise? A job title or market segment is not a person.",
  },
  {
    pattern: "Solution disguised as problem",
    weak: "Users need AI.",
    better: "Users spend 40 minutes manually comparing insurance policies side by side.",
    why: "\"Need AI\" describes a solution, not a struggle. What are they experiencing before they get to any solution?",
  },
  {
    pattern: "Business goal disguised as user goal",
    weak: "Increase subscriptions.",
    better: "Prospective customers abandon registration because pricing is unclear until the last step.",
    why: "Revenue is a business outcome. The user problem is what causes them not to subscribe. Find that.",
  },
  {
    pattern: "Feature disguised as success",
    weak: "Launch chatbot.",
    better: "Reduce average support wait time from 12 minutes to under 2 minutes.",
    why: "Launching a feature is not success. Success is the change in behavior or outcome that the feature creates.",
  },
];

const SPECIFICITY = {
  user: [
    { text: "Customers", score: 2 },
    { text: "Enterprise customers", score: 4 },
    { text: "IT administrators", score: 6 },
    { text: "IT administrators managing identity access across multiple business units", score: 9 },
  ],
  problem: [
    { text: "Logging in is hard", score: 2 },
    { text: "Password resets take too long", score: 5 },
    { text: "IT admins spend 15 minutes resetting passwords because employees forget credentials monthly", score: 9 },
  ],
  success: [
    { text: "Better user experience", score: 2 },
    { text: "Users complete setup faster", score: 4 },
    { text: "First-time setup completed in under five minutes", score: 8 },
    { text: "Password reset requests reduced by 40% within 90 days of launch", score: 10 },
  ],
};

const STANDARDS = [
  {
    industry: "Healthcare",
    user: "Emergency room nurses during patient intake",
    problem: "Medication history is difficult to retrieve quickly, creating risk during time-sensitive decisions",
    success: "Medication history available within 30 seconds for 95% of patients",
  },
  {
    industry: "Restaurant",
    user: "Servers managing large-party tables during dinner rush",
    problem: "Meals for the same table arrive at different times, creating an awkward experience and complaints",
    success: "95% of large-party tables receive all meals within two minutes of each other",
  },
  {
    industry: "Sports",
    user: "Youth basketball coaches running plays after timeouts",
    problem: "Players lose offensive spacing assignments within the first few seconds back on court",
    success: "Correct spacing executed on the first offensive possession after every timeout",
  },
  {
    industry: "Utility / Enterprise",
    user: "Distribution planners reviewing grid interconnection requests",
    problem: "Engineers manually review every application including routine cases, creating a backlog that delays approvals by weeks",
    success: "Routine applications automatically identified and processed while maintaining the same approval accuracy",
  },
  {
    industry: "Photography",
    user: "Wedding photographers the week after a shoot",
    problem: "Thousands of raw photos require manual review before any editing can begin",
    success: "First-pass cull completed in under one hour, with selects organized by scene",
  },
  {
    industry: "Software / Collaboration",
    user: "A designer handing off a completed screen to an engineer",
    problem: "The design file and the conversation about it live in different places, so engineers build from memory and guesswork",
    success: "The engineer builds exactly what was designed without scheduling a single clarifying meeting",
  },
];

function ScoreBar({ score }: { score: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            width: "14px",
            height: "4px",
            background: i < score ? ACCENT : "rgba(0,0,0,0.1)",
          }} />
        ))}
      </div>
      <span style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        color: score >= 8 ? ACCENT : "var(--ink-muted)",
      }}>{score}/10</span>
    </div>
  );
}

export default function ClarityExamplesPage() {
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
        }}>Clarity · Examples</span>
      </nav>

      {/* Header */}
      <section style={{
        maxWidth: "800px",
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
          /do-clarity · Reference Guide
        </p>
        <h1 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(36px, 5vw, 56px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-5)",
          lineHeight: 1.05,
        }}>
          What clarity looks like
        </h1>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(17px, 2vw, 21px)",
          lineHeight: 1.6,
          color: "var(--ink-muted)",
          maxWidth: "560px",
          margin: 0,
        }}>
          People don&rsquo;t struggle because they don&rsquo;t know what a good statement looks like.
          They struggle because they don&rsquo;t recognize a bad one.
        </p>
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* ── SECTION 1: Hero transformation ── */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "var(--sp-12) var(--sp-6)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>Section 1 — The Process</p>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-3)",
          lineHeight: 1.1,
        }}>From vague to clear</h2>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          This is what the transformation looks like end to end. Every team starts here.
          The goal is to end up there.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-5)", alignItems: "start" }}>

          {/* Before */}
          <div style={{ padding: "var(--sp-6)", background: "rgba(0,0,0,0.025)", border: "1px solid rgba(0,0,0,0.07)" }}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.3)",
              margin: "0 0 var(--sp-5)",
            }}>❌ Before</p>
            {[
              { label: "User", text: "Customers" },
              { label: "Problem", text: "Support is slow." },
              { label: "Success", text: "Better customer service." },
            ].map(({ label, text }) => (
              <div key={label} style={{ marginBottom: "var(--sp-4)" }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.3)",
                  margin: "0 0 4px",
                }}>{label}</p>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "17px",
                  color: "var(--ink-muted)",
                  margin: 0,
                  lineHeight: 1.4,
                }}>{text}</p>
              </div>
            ))}
          </div>

          {/* After */}
          <div style={{ padding: "var(--sp-6)", background: OBSIDIAN, border: `1px solid ${ACCENT}` }}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
              margin: "0 0 var(--sp-5)",
            }}>✓ After</p>
            {[
              { label: "User", text: "Small business owners contacting support after business hours" },
              { label: "Problem", text: "They wait until the next morning for answers to routine billing questions" },
              { label: "Success", text: "Resolve 80% of after-hours billing questions without human intervention" },
            ].map(({ label, text }) => (
              <div key={label} style={{ marginBottom: "var(--sp-4)" }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: "0 0 4px",
                }}>{label}</p>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "17px",
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.4,
                }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why it's weak */}
        <div style={{
          marginTop: "var(--sp-6)",
          padding: "var(--sp-5) var(--sp-6)",
          background: "rgba(188,113,85,0.05)",
          borderLeft: `3px solid ${ACCENT}`,
        }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 var(--sp-3)",
          }}>Why the before version fails</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--sp-5)" }}>
            {[
              { label: "User: \"Customers\"", why: "Which customers? New or existing? Consumer or enterprise? This describes a market, not a person." },
              { label: "Problem: \"Support is slow\"", why: "\"Slow\" isn't observable. How slow? For whom? What are they actually experiencing while they wait?" },
              { label: "Success: \"Better service\"", why: "Nobody knows when you've succeeded. What changes? What can you measure? What behavior looks different?" },
            ].map(({ label, why }) => (
              <div key={label}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  margin: "0 0 6px",
                }}>{label}</p>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "13px",
                  color: "var(--ink-muted)",
                  margin: 0,
                  lineHeight: 1.6,
                }}>{why}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* ── SECTION 2: Common Mistakes ── */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "var(--sp-12) var(--sp-6)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>Section 2 — Common Mistakes</p>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-3)",
          lineHeight: 1.1,
        }}>Patterns worth recognizing</h2>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          These are the four ways teams fool themselves into thinking they have clarity when they don&rsquo;t.
        </p>

        {MISTAKES.map((m, i) => (
          <div key={m.pattern} style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "0 var(--sp-8)",
            padding: "var(--sp-7) 0",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}>
            <div style={{ paddingTop: "2px" }}>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                margin: "0 0 8px",
              }}>Pattern {i + 1}</p>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: 0,
                lineHeight: 1.2,
              }}>{m.pattern}</p>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-4)", marginBottom: "var(--sp-4)" }}>
                <div style={{ padding: "var(--sp-4)", background: "rgba(0,0,0,0.025)" }}>
                  <p style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.3)",
                    margin: "0 0 8px",
                  }}>❌ Weak</p>
                  <p style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "17px",
                    color: "var(--ink-muted)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}>{m.weak}</p>
                </div>
                <div style={{ padding: "var(--sp-4)", background: "rgba(188,113,85,0.05)", borderLeft: `2px solid ${ACCENT}` }}>
                  <p style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    margin: "0 0 8px",
                  }}>✓ Better</p>
                  <p style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "17px",
                    color: "var(--ink)",
                    margin: 0,
                    lineHeight: 1.4,
                  }}>{m.better}</p>
                </div>
              </div>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.6,
                fontStyle: "italic",
              }}>{m.why}</p>
            </div>
          </div>
        ))}
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* ── SECTION 3: Specificity Scale ── */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "var(--sp-12) var(--sp-6)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>Section 3 — Specificity</p>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-3)",
          lineHeight: 1.1,
        }}>How specific is specific enough?</h2>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          Clarity is not binary. It is a progression. Most teams stop too early.
        </p>

        {(["user", "problem", "success"] as const).map((dim) => (
          <div key={dim} style={{
            marginBottom: "var(--sp-8)",
          }}>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
              margin: "0 0 var(--sp-3)",
            }}>{dim}</p>
            {SPECIFICITY[dim].map((item) => (
              <div key={item.text} style={{
                display: "grid",
                gridTemplateColumns: "1fr 180px",
                gap: "var(--sp-4)",
                alignItems: "center",
                padding: "14px 0",
                borderTop: "1px solid rgba(0,0,0,0.06)",
              }}>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "16px",
                  color: item.score >= 8 ? "var(--ink)" : "var(--ink-muted)",
                  margin: 0,
                  lineHeight: 1.4,
                }}>{item.text}</p>
                <ScoreBar score={item.score} />
              </div>
            ))}
          </div>
        ))}
      </section>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* ── SECTION 4: Reference Standards ── */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "var(--sp-12) var(--sp-6) var(--sp-16)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-3)",
        }}>Section 4 — Reference Standards</p>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(26px, 3.5vw, 38px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-3)",
          lineHeight: 1.1,
        }}>The level to aim for</h2>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px",
          color: "var(--ink-muted)",
          margin: "0 0 var(--sp-8)",
          lineHeight: 1.6,
          maxWidth: "520px",
        }}>
          Across industries. Each one shows a user, problem, and success statement
          that is clear enough to walk into a meeting and align a room.
        </p>

        {STANDARDS.map((s) => (
          <div key={s.industry} style={{
            padding: "var(--sp-7) 0",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: "0 var(--sp-8)",
          }}>
            <div style={{ paddingTop: "2px" }}>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                margin: 0,
              }}>{s.industry}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 var(--sp-5)" }}>
              {[
                { label: "User", text: s.user },
                { label: "Problem", text: s.problem },
                { label: "Success", text: s.success },
              ].map(({ label, text }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    margin: "0 0 8px",
                  }}>{label}</p>
                  <p style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "15px",
                    color: "var(--ink)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Dark footer CTA */}
      <section style={{ background: OBSIDIAN, padding: "var(--sp-12) var(--sp-6)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--sp-5)" }}>
          <div>
            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 8px",
              lineHeight: 1.2,
            }}>Ready to stress-test your own statement?</p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
            }}>Paste the /do-clarity skill into Claude and bring your project.</p>
          </div>
          <Link href="/coordination" style={{
            display: "inline-block",
            padding: "14px 28px",
            background: ACCENT,
            color: "#ffffff",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Get the skill →
          </Link>
        </div>
      </section>

      {/* Footer nav */}
      <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "var(--sp-6) var(--sp-6)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link href="/coordination" style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--ink-muted)",
          textDecoration: "none",
        }}>← The Coordination Era</Link>
        <Link href="/ktalk/manuscript/how-to-raise/clarity" style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: ACCENT,
          textDecoration: "none",
          fontWeight: 600,
        }}>Read Chapter 16a →</Link>
      </div>

    </div>
  );
}
