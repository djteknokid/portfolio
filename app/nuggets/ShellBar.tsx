"use client";

import { useRouter } from "next/navigation";
import { brand } from "./brand";

interface ShellBarProps {
  title: string;
  backHref?: string;       // if set, shows ‹ back button instead of title on the left
  onBack?: () => void;     // alternative to backHref — callback instead of navigation
  right?: React.ReactNode; // slot for right-side content
}

export default function ShellBar({ title, backHref, onBack, right }: ShellBarProps) {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.push(backHref!));
  const showBack = !!(backHref || onBack);

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 40,
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: "16px",
      paddingRight: "20px",
      background: "rgba(10,10,10,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${brand.border.item}`,
    }}>
      {/* Left: back button or product name */}
      {showBack ? (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={handleBack}
            style={{
              background: "none", border: "none",
              padding: "4px 8px 4px 0",
              cursor: "pointer",
              display: "flex", alignItems: "center",
              color: brand.text.muted, fontSize: "20px", lineHeight: 1,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            ‹
          </button>
          <span style={{
            fontSize: "13px", fontWeight: "700",
            color: brand.text.muted,
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            {title}
          </span>
        </div>
      ) : (
        <span style={{
          fontSize: "13px", fontWeight: "700",
          color: brand.text.muted,
          letterSpacing: "0.04em", textTransform: "uppercase",
        }}>
          {title}
        </span>
      )}

      {/* Right slot */}
      {right && <div style={{ display: "flex", alignItems: "center" }}>{right}</div>}
    </div>
  );
}
