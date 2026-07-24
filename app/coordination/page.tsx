import Link from "next/link";
import SkillsInstaller from "./SkillsInstaller";

const ACCENT = "#bc7155";
const OBSIDIAN = "#000d10";

const ELEMENTS = [
  {
    number: "01",
    title: "Clarity",
    question: "What problem are we solving?",
    slug: "/ktalk/manuscript/how-to-raise/clarity",
    dimensions: ["User — Who are we solving for?", "Problem — What are they experiencing?", "Success — How do we know we solved it?"],
    summary: "A team can generate many solutions once the problem space is closed. Without clarity, everyone is solving a different problem.",
  },
  {
    number: "02",
    title: "Trade-offs",
    question: "What are we willing to sacrifice?",
    slug: "/ktalk/manuscript/how-to-raise/trade-offs",
    dimensions: ["Benefit — What do we gain?", "Risk — What could go wrong?", "Acceptance — What are we willing to live with?"],
    summary: "Great coordinators don't eliminate trade-offs. They make them visible. Because once a trade-off is accepted, a team can move forward.",
  },
  {
    number: "03",
    title: "Priority",
    question: "What matters most right now?",
    slug: "/ktalk/manuscript/how-to-raise/priority",
    dimensions: ["Urgency — How soon does this need attention?", "Impact — How much does this matter?", "Effort — What will it take?"],
    summary: "AI made it easy to generate options. The hard part is deciding which one deserves attention. Without priorities, everything is important — and nothing moves.",
  },
  {
    number: "04",
    title: "Decision",
    question: "What will we do?",
    slug: "/ktalk/manuscript/how-to-raise/decision",
    dimensions: ["Stakeholders — Who needs to be aligned?", "Responsibility — Who owns this?", "Next Steps — What happens after the decision?"],
    summary: "Clarity, trade-offs, and priority prepare a team for a decision. But without a decision, all the preparation is just conversation.",
  },
];

export default function CoordinationPage() {
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
        gap: "var(--sp-6)",
      }}>
        <Link href="/" style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--ink)",
          textDecoration: "none",
          letterSpacing: "0.03em",
        }}>
          davidlee.design
        </Link>
        <span style={{ color: "var(--ink-light)", fontSize: "13px" }}>/</span>
        <span style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--ink-muted)",
        }}>
          The Coordination Era
        </span>
        <div style={{ marginLeft: "auto" }}>
          <Link href="/ktalk/manuscript" style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "12px",
            color: "var(--ink-muted)",
            textDecoration: "none",
            letterSpacing: "0.04em",
          }}>
            Read the manuscript →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "var(--sp-14) var(--sp-6) var(--sp-12)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-4)",
        }}>
          A Framework by David Lee
        </p>

        <h1 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(52px, 8vw, 96px)",
          fontWeight: 900,
          lineHeight: 0.95,
          color: "var(--ink)",
          margin: "0 0 var(--sp-6)",
          letterSpacing: "-0.02em",
        }}>
          The<br />
          Coordination<br />
          Era
        </h1>

        <div style={{
          width: "48px",
          height: "3px",
          background: ACCENT,
          marginBottom: "var(--sp-6)",
        }} />

        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(20px, 2.8vw, 28px)",
          lineHeight: 1.45,
          color: "var(--ink)",
          maxWidth: "620px",
          margin: "0 0 var(--sp-5)",
        }}>
          AI raised the floor. Every designer, engineer, and PM can now produce
          what used to require a specialist. That changed what it means to be valuable.
        </p>

        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(18px, 2.4vw, 24px)",
          lineHeight: 1.5,
          color: "var(--ink-muted)",
          maxWidth: "580px",
          margin: 0,
        }}>
          The survivors are not the ones who improved their existing craft.
          They are the ones who raised the ceiling — who took on the bigger problem
          of helping their teams move better.
        </p>
      </section>

      {/* Skills Installer */}
      <SkillsInstaller />

      {/* Divider */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* The Shift */}
      <section style={{
        maxWidth: "820px",
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
          margin: "0 0 var(--sp-5)",
        }}>
          The Shift
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-4)",
          maxWidth: "640px",
        }}>
          {[
            { label: "Old ceiling", text: "Can you produce great artifacts?" },
            { label: "New ceiling", text: "Can you help a team make great decisions?" },
            { label: "Old floor", text: "Specialists did specialized things" },
            { label: "New floor", text: "Everyone can produce what used to require a specialist" },
          ].map(({ label, text }) => (
            <div key={label} style={{
              padding: "var(--sp-4) var(--sp-4)",
              background: "rgba(0,0,0,0.025)",
            }}>
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
                fontSize: "17px",
                lineHeight: 1.4,
                color: "var(--ink)",
                margin: 0,
              }}>{text}</p>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(17px, 2vw, 20px)",
          lineHeight: 1.6,
          color: "var(--ink)",
          maxWidth: "600px",
          margin: "var(--sp-8) 0 0",
        }}>
          The new KPI for designers is not making better screens.
          It is the ability to coordinate — to help smart people, with conflicting
          opinions and competing priorities, arrive at a shared direction and move.
        </p>
      </section>

      {/* Dark interlude */}
      <section style={{
        background: OBSIDIAN,
        padding: "var(--sp-12) var(--sp-6)",
      }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 var(--sp-5)",
          }}>
            What Coordination Is
          </p>
          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(24px, 3.5vw, 44px)",
            lineHeight: 1.2,
            color: "#ffffff",
            maxWidth: "680px",
            margin: "0 0 var(--sp-6)",
            fontWeight: 700,
          }}>
            Coordination is the ability to move a team from ambiguity to action.
          </p>
          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(16px, 1.9vw, 21px)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "600px",
            margin: 0,
          }}>
            Not by having all the answers. But by asking the right questions at
            the right time — and creating the conditions for a team to decide together.
          </p>
        </div>
      </section>

      {/* Four Elements */}
      <section style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "var(--sp-14) var(--sp-6)",
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
          The Four Elements
        </p>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(32px, 4.5vw, 54px)",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 var(--sp-10)",
          lineHeight: 1.1,
        }}>
          How to raise the ceiling
        </h2>

        {ELEMENTS.map((el, i) => (
          <div key={el.number} style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "0 var(--sp-6)",
            paddingTop: "var(--sp-8)",
            paddingBottom: "var(--sp-8)",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}>
            {/* Number */}
            <div style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 900,
              color: "rgba(0,0,0,0.06)",
              lineHeight: 1,
              paddingTop: "4px",
            }}>
              {el.number}
            </div>

            {/* Content */}
            <div>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: ACCENT,
                margin: "0 0 8px",
              }}>
                Element {i + 1} of 4
              </p>
              <h3 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 6px",
                lineHeight: 1.1,
              }}>
                {el.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "17px",
                color: "var(--ink-muted)",
                margin: "0 0 var(--sp-4)",
                fontStyle: "italic",
              }}>
                {el.question}
              </p>

              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(16px, 1.8vw, 19px)",
                lineHeight: 1.6,
                color: "var(--ink)",
                maxWidth: "520px",
                margin: "0 0 var(--sp-5)",
              }}>
                {el.summary}
              </p>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0",
                margin: "0 0 var(--sp-5)",
                maxWidth: "480px",
              }}>
                {el.dimensions.map((dim, j) => (
                  <div key={j} style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "10px 0",
                    borderTop: j === 0 ? "1px solid rgba(0,0,0,0.07)" : undefined,
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: ACCENT,
                      flexShrink: 0,
                      minWidth: "6px",
                      marginTop: "2px",
                    }}>—</span>
                    <span style={{
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                      fontSize: "14px",
                      color: "var(--ink)",
                      lineHeight: 1.5,
                    }}>{dim}</span>
                  </div>
                ))}
              </div>

              <Link href={el.slug} style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: ACCENT,
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}>
                Read Chapter 16{["a", "b", "c", "d"][i]} →
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* The diagram section */}
      <section style={{
        background: "rgba(0,0,0,0.025)",
        padding: "var(--sp-12) var(--sp-6)",
      }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 var(--sp-5)",
          }}>
            The Matrix
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontWeight: 700,
            color: "var(--ink)",
            margin: "0 0 var(--sp-5)",
            lineHeight: 1.2,
          }}>
            Two axes. One shift.
          </h2>
          <p style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.6,
            color: "var(--ink-muted)",
            maxWidth: "540px",
            margin: "0 0 var(--sp-8)",
          }}>
            AI expanded who can produce. The survivors are the ones who moved
            upward — into the problems nobody else was solving.
          </p>

          {/* Matrix grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr",
            gridTemplateRows: "auto auto auto",
            maxWidth: "600px",
            gap: "0",
          }}>
            {/* Top-left empty */}
            <div />
            {/* Column labels */}
            <div style={{
              padding: "12px 16px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              textAlign: "center",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}>
              Low coordination
            </div>
            <div style={{
              padding: "12px 16px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: ACCENT,
              textAlign: "center",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}>
              High coordination
            </div>

            {/* Row 1 — High output */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 12px 0 0",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: ACCENT,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              borderRight: "1px solid rgba(0,0,0,0.1)",
            }}>
              High output
            </div>
            <div style={{
              padding: "var(--sp-5)",
              background: "rgba(0,0,0,0.03)",
              border: "1px solid rgba(0,0,0,0.07)",
              borderLeft: "none",
            }}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--ink-muted)",
                margin: "0 0 6px",
              }}>Fast but lost</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "12px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}>Produces a lot. Ships quickly. But builds the wrong things.</p>
            </div>
            <div style={{
              padding: "var(--sp-5)",
              background: OBSIDIAN,
              border: "1px solid rgba(0,0,0,0.07)",
            }}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 6px",
              }}>Ceiling raised</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                margin: 0,
                lineHeight: 1.5,
              }}>High output AND the team moves in the right direction.</p>
            </div>

            {/* Row 2 — Low output */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "0 12px 0 0",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              borderRight: "1px solid rgba(0,0,0,0.1)",
            }}>
              Low output
            </div>
            <div style={{
              padding: "var(--sp-5)",
              background: "rgba(0,0,0,0.02)",
              border: "1px solid rgba(0,0,0,0.07)",
              borderLeft: "none",
              borderTop: "none",
            }}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--ink-muted)",
                margin: "0 0 6px",
              }}>Stuck</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "12px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}>Neither producing nor aligning. The team has a cost with no return.</p>
            </div>
            <div style={{
              padding: "var(--sp-5)",
              background: "rgba(188,113,85,0.06)",
              border: "1px solid rgba(188,113,85,0.2)",
              borderTop: "none",
            }}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 6px",
              }}>The coordinator</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "12px",
                color: "var(--ink-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}>Facilitates great decisions even before shipping starts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About David */}
      <section style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "var(--sp-14) var(--sp-6)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          margin: "0 0 var(--sp-5)",
        }}>
          About the author
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--sp-8)",
          alignItems: "start",
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              color: "var(--ink)",
              margin: "0 0 var(--sp-5)",
              lineHeight: 1.1,
            }}>
              David Lee
            </h2>
            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "var(--ink)",
              margin: "0 0 var(--sp-4)",
            }}>
              I&rsquo;ve spent the last three years answering one question:
              what is next for the designer when everyone can prototype and design with AI?
            </p>
            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "var(--ink)",
              margin: "0 0 var(--sp-4)",
            }}>
              The answer was not doing more design. It was something bigger.
              It was about coordination — helping your team make better decisions.
            </p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "14px",
              color: "var(--ink-muted)",
              lineHeight: 1.6,
              margin: 0,
            }}>
              Designer · Speaker · Previously SAP, IBM<br />
              Presented this framework at Design Seoul, Korea
            </p>
          </div>

          <div>
            <div style={{
              padding: "var(--sp-5) var(--sp-5)",
              background: "rgba(0,0,0,0.025)",
              borderLeft: `3px solid ${ACCENT}`,
            }}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "19px",
                lineHeight: 1.5,
                color: "var(--ink)",
                margin: "0 0 var(--sp-4)",
                fontStyle: "italic",
              }}>
                &ldquo;Technology disrupts the industry, and the survivors are the ones
                who raise the ceiling — not the floor.&rdquo;
              </p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "12px",
                color: "var(--ink-muted)",
                margin: 0,
                letterSpacing: "0.04em",
              }}>
                — From the Korea Talk, 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section style={{
        background: OBSIDIAN,
        padding: "var(--sp-14) var(--sp-6)",
      }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 var(--sp-4)",
          }}>
            Go deeper
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 var(--sp-8)",
            lineHeight: 1.1,
            maxWidth: "600px",
          }}>
            Read the full manuscript or watch the deck.
          </h2>

          <div style={{
            display: "flex",
            gap: "var(--sp-4)",
            flexWrap: "wrap",
          }}>
            <Link href="/ktalk/manuscript" style={{
              display: "inline-block",
              padding: "14px 28px",
              background: ACCENT,
              color: "#ffffff",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}>
              Read the manuscript
            </Link>
            <Link href="/ktalk" style={{
              display: "inline-block",
              padding: "14px 28px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.8)",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textDecoration: "none",
            }}>
              View the deck
            </Link>
          </div>

          <div style={{
            marginTop: "var(--sp-12)",
            paddingTop: "var(--sp-8)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
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
              Coming soon
            </p>
            <p style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(18px, 2.5vw, 26px)",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 var(--sp-3)",
              lineHeight: 1.2,
            }}>
              The Coordination Era Skills
            </p>
            <p style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "14px",
              color: "rgba(255,255,255,0.5)",
              margin: "0 0 var(--sp-5)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}>
              Four downloadable Claude skills — one for each element. Run them in your
              own Claude Code session to apply the Coordination Era framework to your
              team&rsquo;s real decisions.
            </p>
            <div style={{
              display: "flex",
              gap: "var(--sp-3)",
              flexWrap: "wrap",
            }}>
              {["/do-clarity", "/do-tradeoffs", "/do-prioritization", "/do-decision"].map(cmd => (
                <span key={cmd} style={{
                  padding: "6px 14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontFamily: "var(--font-inter), system-ui, monospace",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.02em",
                }}>
                  {cmd}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(0,0,0,0.07)",
        padding: "var(--sp-6)",
        maxWidth: "820px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "var(--sp-3)",
      }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "12px",
          color: "var(--ink-muted)",
          margin: 0,
        }}>
          © David Lee · davidlee.design
        </p>
        <div style={{ display: "flex", gap: "var(--sp-5)" }}>
          <Link href="/ktalk/manuscript" style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "12px",
            color: "var(--ink-muted)",
            textDecoration: "none",
          }}>Manuscript</Link>
          <Link href="/ktalk" style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "12px",
            color: "var(--ink-muted)",
            textDecoration: "none",
          }}>Talk</Link>
          <Link href="/talks" style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "12px",
            color: "var(--ink-muted)",
            textDecoration: "none",
          }}>All talks</Link>
        </div>
      </footer>

    </div>
  );
}
