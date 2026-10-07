// Sequence — Brand Design System
// Dark, typographic, print-adjacent. MOMA SF energy.
// Every value here is the single source of truth.

export const brand = {
  // Background layers
  bg: {
    page: "#080808",       // near-black canvas
    card: "#111111",       // card surface
    cardGradient: "linear-gradient(160deg, #111111 0%, #1c1c1c 60%, #141414 100%)",
    raised: "rgba(255,255,255,0.05)",   // items sitting above card
    hover: "rgba(255,255,255,0.08)",
  },

  // Borders
  border: {
    card: "rgba(255,255,255,0.07)",
    item: "rgba(255,255,255,0.08)",
    itemHover: "rgba(255,255,255,0.15)",
    accent: "rgba(255,255,255,0.20)",
  },

  // Text hierarchy
  text: {
    primary: "#ffffff",
    secondary: "rgba(255,255,255,0.5)",   // labels, sublabels
    muted: "rgba(255,255,255,0.25)",       // metadata, ghost
    ghost: "rgba(255,255,255,0.06)",       // decorative bg numbers
  },

  // Status — used sparingly, never for hierarchy
  status: {
    correct: { bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.20)", text: "#6ee7b7" },
    wrong:   { bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.20)", text: "#fca5a5" },
  },

  // Typography
  type: {
    sans: "var(--font-geist-sans)",
    cardTitle: { size: "clamp(1.25rem, 5vw, 1.6rem)", weight: "700", letterSpacing: "-0.02em", lineHeight: "1.2" },
    label: { size: "10px", weight: "600", letterSpacing: "0.18em", textTransform: "uppercase" as const },
    body: { size: "13px", weight: "400", lineHeight: "1.65" },
    item: { size: "13px", weight: "500", lineHeight: "1.4" },
  },

  // Radius
  radius: {
    card: "24px",
    item: "14px",
    button: "14px",
  },

  // Shadow
  shadow: {
    card: "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
  },

  // Motion
  motion: {
    snap: "all 120ms ease",
    lift: "all 180ms ease",
  },
} as const;
