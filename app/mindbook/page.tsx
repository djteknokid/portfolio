import Link from "next/link";
import { parts } from "@/lib/mindbook/chapters";

export default function Home() {
  let chapterIndex = 0;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* LEFT PANEL — Hero */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "42%",
          height: "100vh",
          backgroundColor: "var(--accent)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 56px",
          overflow: "hidden",
        }}
      >
        {/* Faint symbol texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.055,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ctext x='10' y='40' font-size='28' fill='white' font-family='serif'%3E%E2%88%80%3C/text%3E%3Ctext x='65' y='80' font-size='22' fill='white' font-family='serif'%3E%E2%88%83%3C/text%3E%3Ctext x='20' y='105' font-size='18' fill='white' font-family='serif'%3E%E2%8A%83%3C/text%3E%3Ctext x='82' y='30' font-size='20' fill='white' font-family='serif'%3E%E2%88%A7%3C/text%3E%3Ctext x='50' y='115' font-size='24' fill='white' font-family='serif'%3E%E2%86%92%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Title block */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "48px",
          }}>
            by David Lee
          </p>

          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(44px, 4.8vw, 80px)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-1.5px",
            color: "#ffffff",
            marginBottom: "32px",
          }}>
            Symbolic<br />
            Systems<br />
            for PM<br />
            &amp; UX
          </h1>

          <p style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "260px",
          }}>
            How minds and machines represent meaning — a field guide for product thinkers.
          </p>
        </div>

        {/* CTA */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            href="/chapters/introduction"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 20px",
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.3)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Continue Reading <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* RIGHT PANEL — Table of Contents */}
      <div
        style={{
          marginLeft: "42%",
          width: "58%",
          minHeight: "100vh",
          backgroundColor: "var(--cream)",
          overflowY: "auto",
          padding: "72px 72px 96px",
        }}
      >
        <div style={{ maxWidth: "500px" }}>
          {parts.map((part) => (
            <div key={part.id} style={{ marginBottom: "56px" }}>

              {/* Part header */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  className="toc-part-label"
                  style={{ color: part.accentColor }}
                >
                  Part {part.number} — {part.title}
                </p>
                <p className="toc-part-subtitle">{part.subtitle}</p>
              </div>

              {/* Chapter rows */}
              <div>
                {part.chapters.map((chapter) => {
                  const num = chapterIndex++;
                  return (
                    <Link
                      key={chapter.slug}
                      href={`/chapters/${chapter.slug}`}
                      className="toc-chapter-row"
                    >
                      <span className="toc-chapter-title">{chapter.title}</span>
                      <span className="toc-chapter-number">{num}</span>
                    </Link>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
