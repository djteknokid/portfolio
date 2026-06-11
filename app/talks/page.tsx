export default function TalksPage() {
  return (
    <main className="min-h-screen bg-black text-white p-12">
      <h1 className="text-4xl font-bold mb-12">Talks</h1>
      <div className="grid grid-cols-1 gap-8 max-w-4xl">
        {[
          { slug: "korean-designers-2026", title: "The Future of Design", sub: "Figma → Vibe Coding → Agentic Engineering", date: "May 2026 · Seoul" },
        ].map((t) => (
          <a key={t.slug} href={`/talks/${t.slug}`} className="border border-white/20 p-8 hover:border-white/60 transition-colors">
            <p className="text-white/40 text-sm mb-2">{t.date}</p>
            <h2 className="text-2xl font-semibold">{t.title}</h2>
            <p className="text-white/50 mt-2">{t.sub}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
