"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { brand } from "./brand";

export default function UserMenu() {
  const router = useRouter();
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setSignedIn(true);
      setAvatarUrl(user.user_metadata?.avatar_url ?? null);
      setName(user.user_metadata?.full_name ?? user.email ?? null);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  }

  // Not signed in — show sign in button
  if (!signedIn) {
    return (
      <button
        onClick={() => router.push("/auth/signin")}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${brand.border.accent}`,
          borderRadius: "8px",
          padding: "5px 12px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "600",
          color: brand.text.secondary,
          letterSpacing: "0.02em",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        Sign in
      </button>
    );
  }

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          borderRadius: "99px",
          width: "30px",
          height: "30px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name ?? ""}
            referrerPolicy="no-referrer"
            style={{ width: "30px", height: "30px", borderRadius: "99px", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{
            width: "30px", height: "30px", borderRadius: "99px",
            background: brand.bg.raised,
            border: `1px solid ${brand.border.item}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", color: brand.text.muted,
          }}>
            {name ? name[0].toUpperCase() : "?"}
          </div>
        )}
      </button>

      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          background: brand.bg.raised,
          border: `1px solid ${brand.border.item}`,
          borderRadius: "14px",
          padding: "6px",
          minWidth: "160px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          zIndex: 100,
        }}>
          {name && (
            <div style={{
              padding: "8px 12px 10px",
              borderBottom: `1px solid ${brand.border.item}`,
              marginBottom: "4px",
            }}>
              <div style={{ fontSize: "12px", fontWeight: "600", color: brand.text.primary, lineHeight: 1.3 }}>
                {name}
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            style={{
              width: "100%",
              background: "none",
              border: "none",
              padding: "9px 12px",
              borderRadius: "8px",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              color: brand.text.secondary,
              display: "block",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
