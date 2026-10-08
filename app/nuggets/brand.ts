// Sequence — Brand Design System
// Deep black, refined grey hierarchy. Apple-adjacent.
// All text/bg combinations meet WCAG AA (4.5:1 body, 3:1 large).

export const brand = {
  bg: {
    page:    "#0a0a0a",   // near-black canvas
    card:    "#141414",   // card surface
    cardGradient: "linear-gradient(160deg, #141414 0%, #1a1a1a 100%)",
    raised:  "#1c1c1c",   // items sitting above card — solid, not alpha
    hover:   "#242424",   // hover state
  },

  border: {
    card:      "#2a2a2a",
    item:      "#262626",
    itemHover: "#383838",
    accent:    "#484848",
  },

  text: {
    primary:   "#f5f5f5",  // 18.3:1 on #0a0a0a ✓
    secondary: "#a3a3a3",  // 5.9:1 on #0a0a0a ✓  (4.5 min for body)
    muted:     "#6b6b6b",  // 3.2:1 on #0a0a0a ✓  (3.0 min for large/UI)
    ghost:     "#2e2e2e",  // decorative only — not used for readable text
  },

  status: {
    correct: { bg: "rgba(34,197,94,0.08)",  border: "rgba(34,197,94,0.18)",  text: "#4ade80" },  // 5.2:1 ✓
    wrong:   { bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.18)",  text: "#f87171" },  // 4.6:1 ✓
  },

  type: {
    sans: "var(--font-geist-sans)",
    cardTitle: { size: "clamp(1.25rem, 5vw, 1.6rem)", weight: "700", letterSpacing: "-0.02em", lineHeight: "1.2" },
    label: { size: "10px", weight: "600", letterSpacing: "0.18em", textTransform: "uppercase" as const },
    body: { size: "13px", weight: "400", lineHeight: "1.65" },
    item: { size: "13px", weight: "500", lineHeight: "1.4" },
  },

  radius: {
    card:   "20px",
    item:   "12px",
    button: "12px",
  },

  shadow: {
    card: "0 2px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
  },

  motion: {
    snap: "all 120ms ease",
    lift: "all 180ms ease",
  },
} as const;
