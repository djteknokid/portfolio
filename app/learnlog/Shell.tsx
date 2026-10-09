"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLearnlog } from "./context";

const PenIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const LibraryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c0 0-6 5.686-6 10a6 6 0 0012 0c0-4.314-6-10-6-10zm0 16a4 4 0 01-4-4c0-2.314 2.5-5.8 4-7.8 1.5 2 4 5.486 4 7.8a4 4 0 01-4 4z" />
  </svg>
);

export default function Shell() {
  const pathname = usePathname();
  const { streak } = useLearnlog();

  const tabs = [
    { href: "/learnlog", label: "Create", Icon: PenIcon },
    { href: "/learnlog/library", label: "Library", Icon: LibraryIcon },
    { href: "/learnlog/settings", label: "Settings", Icon: SettingsIcon },
  ];

  return (
    <>
      {/* Top bar */}
      <header className="learnlog-topbar">
        <div className="learnlog-topbar-avatar">DL</div>
        <div className="learnlog-streak">
          <FlameIcon />
          <span>{streak}</span>
        </div>
      </header>

      {/* Bottom nav */}
      <nav className="learnlog-bottomnav">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className={`learnlog-tab ${active ? "active" : ""}`}>
              <Icon />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
