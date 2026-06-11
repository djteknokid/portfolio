import Link from "next/link";
import { notFound } from "next/navigation";
import {
  parts,
  allChapters,
  getChapterBySlug,
  getPartByChapterSlug,
} from "@/lib/mindbook/chapters";
import { IntroductionChapter } from "@/app/mindbook/components/chapters/IntroductionChapter";
import { WhatIsAMindChapter } from "@/app/mindbook/components/chapters/WhatIsAMindChapter";

const chapterComponents: Record<string, React.ComponentType> = {
  introduction: IntroductionChapter,
  "what-is-a-mind": WhatIsAMindChapter,
};

export async function generateStaticParams() {
  return allChapters.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  const part = getPartByChapterSlug(slug);

  if (!chapter || !part) notFound();

  const ChapterBody = chapterComponents[slug] ?? null;

  const currentIndex = allChapters.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const next = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* ── SIDEBAR ── */}
      <nav
        className="sidebar"
        style={{ backgroundColor: part.accentColor }}
      >
        <Link href="/" className="sidebar__back">
          ← All Chapters
        </Link>

        <div style={{ flex: 1 }}>
          {parts.map((p) => (
            <div key={p.id} style={{ marginBottom: "32px" }}>
              <p
                className="sidebar__part-label"
                style={{
                  color: p.id === part.id
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.22)",
                }}
              >
                {p.title}
              </p>

              {p.id === part.id && p.chapters.map((c) => (
                <Link
                  key={c.slug}
                  href={`/chapters/${c.slug}`}
                  className="sidebar__chapter-link"
                  style={{
                    color: c.slug === slug
                      ? "#ffffff"
                      : "rgba(255,255,255,0.42)",
                    fontWeight: c.slug === slug ? 600 : 400,
                  }}
                >
                  {c.number}. {c.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>

      {/* ── MAIN ── */}
      <main className="chapter-page">
        <article className="chapter-content">

          {/* Header */}
          <div className="chapter-prose" style={{ paddingBottom: "var(--sp-10)" }}>

            {/* Part label + subtitle */}
            <p
              className="chapter-part-label"
              style={{ color: part.accentColor }}
            >
              Part {part.number} — {part.title}
            </p>
            <p className="chapter-part-subtitle">{part.subtitle}</p>

            {/* Ghost number + title stacked as one unit */}
            <div style={{ position: "relative", marginTop: "var(--sp-8)" }}>
              <div
                className="chapter-ghost-number"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-0.15em",
                  left: "-0.05em",
                  zIndex: 0,
                }}
              >
                {chapter.number}
              </div>
              <h1
                className="chapter-title"
                style={{ position: "relative", zIndex: 1, marginBottom: 0 }}
              >
                {chapter.title}
              </h1>
            </div>

            {/* PM Lens — sits directly below title */}
            {chapter.pmNote && (
              <div
                className="pm-lens"
                style={{ color: part.accentColor, marginTop: "var(--sp-6)" }}
              >
                <p className="pm-lens-label">PM Lens</p>
                <p className="pm-lens-body">{chapter.pmNote}</p>
              </div>
            )}
          </div>

          {/* Body — prose constrains itself, breakout elements escape */}
          {ChapterBody ? (
            <ChapterBody />
          ) : (
            <p className="chapter-prose" style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "20px",
              fontStyle: "italic",
              color: "var(--ink-muted)",
              lineHeight: 1.85,
            }}>
              This chapter is being written. Come back soon.
            </p>
          )}

          {/* Prev / Next */}
          <nav className="chapter-nav chapter-prose">
            {prev
              ? <Link href={`/chapters/${prev.slug}`}>← {prev.title}</Link>
              : <span />}
            {next
              ? <Link href={`/chapters/${next.slug}`}>{next.title} →</Link>
              : <span />}
          </nav>

        </article>
      </main>

    </div>
  );
}
