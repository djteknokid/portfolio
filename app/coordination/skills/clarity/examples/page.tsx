import Link from "next/link";

const ACCENT = "#bc7155";
const OBSIDIAN = "#000d10";

const EXAMPLES = [
  {
    brand: "Uber",
    industry: "Consumer · Mobility",
    user: "A traveler arriving in an unfamiliar city late at night",
    problem: "No way to know if a cab outside is safe, fairly priced, or will actually get them to their destination",
    success: "In a confirmed car within 4 minutes, price known upfront, route visible and shareable with someone at home",
    note: "The user is broad, but the moment is specific. That's what makes it work — not who the person is, but the exact situation they're in.",
  },
  {
    brand: "Slack",
    industry: "Enterprise · Communication",
    user: "A team working across time zones on a shared project",
    problem: "Important decisions get buried in email threads that nobody re-reads, so context is lost and work gets repeated",
    success: "Anyone on the team can find what was decided, why, and by whom — without asking another person",
    note: "The problem is not 'communication is bad.' It's a specific thing that gets lost. Success is observable behavior, not a feeling.",
  },
  {
    brand: "Figma",
    industry: "Professional Tool · Design",
    user: "A designer handing off a completed screen to an engineer",
    problem: "The design file and the conversation about it live in different places, so engineers build from memory and guesswork",
    success: "The engineer builds exactly what was designed without scheduling a single clarifying meeting",
    note: "User and problem are inseparable here — the friction only exists at the handoff moment. Remove the moment, the problem disappears.",
  },
  {
    brand: "Notion",
    industry: "Professional Tool · Knowledge",
    user: "A small team whose institutional knowledge lives inside one or two people's heads",
    problem: "When those people are unavailable, work stops — nobody else can find the answer to a recurring question",
    success: "Any team member can answer any recurring operational question without asking a colleague",
    note: "Broad user (any small team) but the problem is precise. The specificity is in what breaks, not who the person is.",
  },
  {
    brand: "Airbnb",
    industry: "Consumer · Travel",
    user: "A solo traveler staying somewhere new for a week or longer",
    problem: "Hotels feel transactional — you're a paying guest, not someone who belongs. The city stays foreign.",
    success: "They cook a meal in the apartment, know the neighborhood by day three, and feel like a temporary local — not a tourist",
    note: "Success here is emotional and behavioral, not a metric. That's valid. If you could watch someone use the product, you'd see it.",
  },
  {
    brand: "Linear",
    industry: "Enterprise · Engineering",
    user: "An engineer sitting in daily standup",
    problem: "The ticket board doesn't reflect what anyone is actually working on, so standup becomes a manual status update instead of a real conversation",
    success: "Standup takes under 10 minutes and nobody has to update anything — the board already tells the truth",
    note: "Niche user, specific moment. The success is defined by what disappears (the manual work), not what gets added.",
  },
];

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
        <Link href="/coordination/skills/clarity" style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--ink-muted)",
          textDecoration: "none",
        }}>Clarity</Link>
        <span style={{ color: "var(--ink-light)", fontSize: "13px" }}>/</span>
        <span style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "13px",
          color: "var(--ink)",
        }}>Examples</span>
      </nav>

      {/* Header */}
      <section style={{
        maxWidth: "760px",
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
          /do-clarity · Reference Cases
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
          Six well-known products, each reduced to the three things a team must
          agree on before building anything: User, Problem, and Success.
          These are the standard. Your statement should be this clear.
        </p>
      </section>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 var(--sp-6)" }}>
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.08)", margin: 0 }} />
      </div>

      {/* Column headers */}
      <div style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "var(--sp-5) var(--sp-6) 0",
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: "0 var(--sp-8)",
      }}>
        <div />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0 var(--sp-5)",
        }}>
          {["User", "Problem", "Success"].map(label => (
            <p key={label} style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: ACCENT,
              margin: 0,
            }}>{label}</p>
          ))}
        </div>
      </div>

      {/* Examples */}
      <section style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "var(--sp-4) var(--sp-6) var(--sp-14)",
      }}>
        {EXAMPLES.map((ex, i) => (
          <div key={ex.brand} style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: "0 var(--sp-8)",
            padding: "var(--sp-7) 0",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}>
            {/* Brand */}
            <div style={{ paddingTop: "2px" }}>
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 6px",
                lineHeight: 1.1,
              }}>{ex.brand}</p>
              <p style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "11px",
                color: "var(--ink-muted)",
                margin: "0 0 var(--sp-5)",
                lineHeight: 1.5,
              }}>{ex.industry}</p>
              <div style={{
                padding: "12px 14px",
                background: "rgba(0,0,0,0.025)",
                borderLeft: `2px solid rgba(188,113,85,0.3)`,
              }}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "12px",
                  color: "var(--ink-muted)",
                  margin: 0,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}>{ex.note}</p>
              </div>
            </div>

            {/* Three dimensions */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0 var(--sp-5)",
              alignItems: "start",
            }}>
              {[ex.user, ex.problem, ex.success].map((text, j) => (
                <p key={j} style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  margin: 0,
                }}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* What makes these work */}
      <section style={{
        background: OBSIDIAN,
        padding: "var(--sp-12) var(--sp-6)",
      }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: ACCENT,
            margin: "0 0 var(--sp-6)",
          }}>
            What makes these work
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "var(--sp-6)",
          }}>
            {[
              { label: "User", rule: "One person in one specific moment of struggle. Not a segment. Not a job title. A real human experiencing something." },
              { label: "Problem", rule: "The friction they feel, not the solution you're considering. If you can remove the problem without building the product, it's not specific enough." },
              { label: "Success", rule: "Something you could observe. A behavior. An outcome. If you'd need a survey to know if you succeeded, it's still too vague." },
            ].map(({ label, rule }) => (
              <div key={label}>
                <p style={{
                  fontFamily: "var(--font-inter), system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  margin: "0 0 10px",
                }}>{label}</p>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "16px",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.75)",
                  margin: 0,
                }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <div style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "var(--sp-8) var(--sp-6)",
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
