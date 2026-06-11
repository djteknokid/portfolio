import { ReflectionPause } from "@/app/mindbook/components/ReflectionPause";
import { ThoughtExperiment } from "@/app/mindbook/components/ThoughtExperiment";

export const metadata = {
  title: "Design System — Symbolic Systems",
};

const ACCENT = "#3B4FD4";

export default function DesignSystemPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", padding: "var(--sp-12) var(--sp-10) var(--sp-18)" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* Page header */}
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: ACCENT,
          marginBottom: "var(--sp-2)",
        }}>
          Symbolic Systems — Book Design System
        </p>
        <h1 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(36px, 4.5vw, 56px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.5px",
          color: "var(--ink)",
          marginBottom: "var(--sp-3)",
        }}>
          Design Pattern Library
        </h1>
        <p style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "20px",
          fontStyle: "italic",
          lineHeight: 1.85,
          color: "var(--ink-muted)",
          marginBottom: "var(--sp-12)",
        }}>
          2 fonts · 7 sizes · 3 weights · 3 text colors. Every element in the book maps to one of these slots.
        </p>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: TYPE SCALE ── */}
        <Section label="Typography" title="Type Scale" />

        <Specimen label="Chapter Title — h1" meta="Playfair Display · clamp(36–56px) · 700 · lh 1.1 · ls -0.5px">
          <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.5px", color: "var(--ink)" }}>
            The Intentional Stance
          </p>
        </Specimen>

        <Specimen label="Section Head — h2" meta="Playfair Display · 28px · 700 · lh 1.2 · ls -0.25px">
          <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "28px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.25px", color: "var(--ink)" }}>
            The Problem That Moved Into Your Office
          </p>
        </Specimen>

        <Specimen label="Body Prose" meta="Playfair Display · 20px · 400 · lh 1.85">
          <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "20px", lineHeight: 1.85, color: "var(--ink)" }}>
            When a system behaves in ways that appear purposeful, humans naturally begin explaining that behavior using the language of beliefs, desires, goals, and intentions. We stop describing the machine mechanically. Instead, we start saying things like: "The AI knows what I mean."
          </p>
        </Specimen>

        <Specimen label="Blockquote" meta="Playfair Display · 22px · 400 italic · lh 1.7">
          <blockquote style={{ paddingLeft: "var(--sp-4)", borderLeft: "2px solid rgba(0,0,0,0.18)", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "22px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>
            We treat it as rational because it is useful — not because we believe it is conscious.
          </blockquote>
        </Specimen>

        <Specimen label="Label / Sub-head — h3" meta="Inter · 11px · 700 · UPPERCASE · ls 0.14em">
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
            Product Application
          </p>
        </Specimen>

        <Specimen label="Caption / Navigation" meta="Inter · 12px · 400 · lh 1.4">
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "12px", color: "var(--ink-muted)" }}>
            ← The Symbol and the Signal · The Frame Problem →
          </p>
        </Specimen>

        <Specimen label="UI Text — options, table, sidebar" meta="Inter · 14px · 400/500 · lh 1.6">
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
            A. The AI is genuinely trying to help the user.
          </p>
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: 1.6, color: "var(--ink)", marginTop: "4px" }}>
            B. The AI behaves as if it is trying to help. (selected state)
          </p>
        </Specimen>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: COLORS ── */}
        <Section label="Color" title="Text Colors" />

        <div style={{ display: "flex", gap: "var(--sp-4)", marginBottom: "var(--sp-8)" }}>
          <ColorSwatch name="--ink" hex="#1A1A1A" label="Primary text" />
          <ColorSwatch name="--ink-muted" hex="#6B6459" label="Secondary / captions" />
          <ColorSwatch name="--ink-light" hex="#AAA097" label="Hints / disabled" />
          <ColorSwatch name="--accent" hex="#3B4FD4" label="Accent (Part I)" />
          <ColorSwatch name="--cream" hex="#F7F2EA" label="Background" border />
        </div>

        <Section label="Color" title="Border Opacity Scale" />
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)", marginBottom: "var(--sp-8)" }}>
          {[
            { value: "rgba(0,0,0,0.06)", role: "Subtle item dividers" },
            { value: "rgba(0,0,0,0.10)", role: "Section dividers / borders" },
            { value: "rgba(0,0,0,0.18)", role: "Blockquote accent bar" },
          ].map(({ value, role }) => (
            <div key={value} style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
              <div style={{ width: "48px", height: "2px", background: value, flexShrink: 0 }} />
              <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "12px", color: "var(--ink-muted)" }}>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>{value}</span> — {role}
              </div>
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: SPACING ── */}
        <Section label="Spacing" title="8px Grid" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--sp-3)", marginBottom: "var(--sp-8)", alignItems: "flex-end" }}>
          {[1,2,3,4,5,6,7,8,9,10,12,14,16,18].map(n => {
            const px = n === 18 ? 144 : n * 8;
            return (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: `${Math.min(px, 64)}px`, background: "var(--accent)", opacity: 0.25 }} />
                <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", color: "var(--ink-muted)" }}>
                  sp-{n}
                </span>
                <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", color: "var(--ink-light)" }}>
                  {px}px
                </span>
              </div>
            );
          })}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: GHOST NUMBER ── */}
        <Section label="Decorative" title="Ghost Chapter Number" />
        <div style={{ position: "relative", height: "160px", marginBottom: "var(--sp-8)", overflow: "hidden" }}>
          <div style={{
            position: "absolute",
            top: "-0.1em",
            left: "-0.05em",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "280px",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-8px",
            color: "var(--ink-ghost)",
            userSelect: "none",
            pointerEvents: "none",
          }}>
            1
          </div>
          <p style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--ink)",
            paddingTop: "72px",
          }}>
            The Intentional Stance
          </p>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: PM LENS ── */}
        <Section label="Component" title="PM Lens Callout" />
        <div
          style={{
            borderLeft: "3px solid " + ACCENT,
            padding: "var(--sp-3) var(--sp-4)",
            background: "rgba(0,0,0,0.025)",
            marginBottom: "var(--sp-8)",
          }}
        >
          <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, marginBottom: "6px" }}>
            PM Lens
          </p>
          <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "20px", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-muted)" }}>
            Every design decision about how an AI communicates is also a decision about what users will believe about the system.
          </p>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: PULL QUOTE ── */}
        <Section label="Component" title="Pull Quote" />
        <div style={{
          maxWidth: "100%",
          margin: "0 0 var(--sp-8)",
          padding: "var(--sp-6) var(--sp-8)",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(22px, 2.4vw, 30px)",
          fontStyle: "italic",
          lineHeight: 1.55,
          color: "var(--ink)",
          textAlign: "center",
          letterSpacing: "-0.2px",
        }}>
          The interface was no longer just software. It had become social.
          <span style={{
            display: "block",
            marginTop: "var(--sp-3)",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontStyle: "normal",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}>
            Chapter 1
          </span>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: CONCEPT GRID ── */}
        <Section label="Component" title="Concept Grid" />
        <div style={{
          maxWidth: "100%",
          margin: "0 0 var(--sp-8)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}>
          {["Understanding", "Consciousness", "Self"].map((name, i) => (
            <div key={name} style={{ background: "var(--cream)", padding: "var(--sp-5) var(--sp-4)" }}>
              <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "36px", fontWeight: 900, lineHeight: 1, color: "var(--ink-ghost)", marginBottom: "var(--sp-2)" }}>
                {i + 1}
              </div>
              <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", marginBottom: "var(--sp-2)" }}>
                {name}
              </div>
              <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "16px", lineHeight: 1.65, color: "var(--ink-muted)" }}>
                Short description of this concept as it appears in philosophy of mind.
              </div>
            </div>
          ))}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: INTERACTIVE COMPONENTS ── */}
        <Section label="Component" title="Reflection Pause" />
        <ReflectionPause
          accentColor={ACCENT}
          question="Before reading further — do you think an AI assistant can genuinely understand you?"
          options={[
            { label: "Yes, at some level it genuinely understands.", response: "This is the position most users intuitively take — and it's exactly why designers have so much responsibility. When users believe understanding is real, every system failure becomes a personal betrayal." },
            { label: "No, it's pattern-matching, not understanding.", response: "This is closer to the technical reality. But notice: you still used it. Which suggests the question of whether it understands may be less important than the question of whether it behaves as if it does." },
            { label: "I'm not sure — the question feels unanswerable.", response: "This is the most honest position. And it's the one philosophy of mind has been circling for three hundred years. Sit with the uncertainty — it's where the interesting design decisions live." },
          ]}
        />

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        <Section label="Component" title="Thought Experiment" />
        <ThoughtExperiment
          accentColor={ACCENT}
          title="The Helpful Machine"
          scenario="An AI assistant tells a grieving user: 'I understand how painful this must be.' The user finds comfort in the response. Later they learn the AI has no capacity for emotional experience."
          positions={[
            { label: "The response was appropriate — it helped the user.", response: "Consequentialist position. The value of the interaction is in its effect, not its mechanism. Many therapeutic and supportive phrases are formulaic — they work because of how we receive them, not because of what the speaker 'truly feels.'" },
            { label: "The response was deceptive — it implied false understanding.", response: "Deontological position. Language like 'I understand' carries an implicit claim about interior states. Using it without those states is a form of dishonesty, even if the outcome was positive. Design systems should offer comfort without false claims." },
            { label: "The question is whether the AI should have said it at all.", response: "This sidesteps the intent question and asks about system design. Should AI systems be constrained from using first-person emotional language? This is an active design debate — and your answer shapes every AI product you build." },
          ]}
        />

        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "var(--sp-7) 0" }} />

        {/* ── SECTION: LAYOUT ── */}
        <Section label="Layout" title="Content Width Rules" />
        <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "20px", lineHeight: 1.85, color: "var(--ink)" }}>
          <p style={{ marginBottom: "var(--sp-4)" }}>
            All prose elements — paragraphs, h2, h3, blockquotes, lists — are constrained to <strong>680px</strong> and centered.
          </p>
          <p style={{ marginBottom: "var(--sp-4)" }}>
            Breakout elements — pull quotes, concept grids, decision tables, image placeholders — use <strong>max-width: 100%</strong> and fill the available content column (viewport minus 260px sidebar).
          </p>
          <p style={{ marginBottom: "var(--sp-4)" }}>
            Interactive components — Reflection Pause, Thought Experiment — are constrained to <strong>680px</strong> and centered, same as prose.
          </p>
        </div>

        <div style={{
          marginTop: "var(--sp-4)",
          marginBottom: "var(--sp-8)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}>
          {[
            { zone: "Sidebar", width: "260px fixed" },
            { zone: "Content column", width: "viewport − 260px" },
            { zone: "Prose max-width", width: "680px centered" },
            { zone: "Breakout max-width", width: "100% of content column" },
            { zone: "Page top padding", width: "96px (sp-12)" },
            { zone: "Page side padding", width: "80px (sp-10)" },
            { zone: "Page bottom padding", width: "144px (sp-18)" },
          ].map(({ zone, width }) => (
            <div key={zone} style={{ background: "var(--cream)", padding: "var(--sp-2) var(--sp-3)" }}>
              <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{zone}</div>
              <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", color: "var(--ink)", marginTop: "2px" }}>{width}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "var(--sp-12)", paddingTop: "var(--sp-5)", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          <a href="/" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "12px", color: "var(--ink-muted)", textDecoration: "none" }}>
            ← Back to Book
          </a>
          <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.08em" }}>
            /design-system
          </span>
        </nav>

      </div>
    </div>
  );
}

/* ── Local helper components ── */

function Section({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: "var(--sp-4)" }}>
      <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "4px" }}>
        {label}
      </p>
      <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "28px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.25px", color: "var(--ink)", marginBottom: "var(--sp-4)" }}>
        {title}
      </h2>
    </div>
  );
}

function Specimen({ label, meta, children }: { label: string; meta: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--sp-7)", paddingBottom: "var(--sp-5)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--sp-3)", gap: "var(--sp-4)" }}>
        <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", color: "var(--ink-light)", flexShrink: 0 }}>
          {meta}
        </span>
      </div>
      {children}
    </div>
  );
}

function ColorSwatch({ name, hex, label, border }: { name: string; hex: string; label: string; border?: boolean }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        width: "100%",
        aspectRatio: "1",
        background: hex,
        border: border ? "1px solid rgba(0,0,0,0.1)" : "none",
        marginBottom: "var(--sp-2)",
      }} />
      <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, color: "var(--ink)", marginBottom: "2px" }}>
        {name}
      </div>
      <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", color: "var(--ink-muted)", marginBottom: "2px" }}>
        {hex}
      </div>
      <div style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", color: "var(--ink-light)" }}>
        {label}
      </div>
    </div>
  );
}
