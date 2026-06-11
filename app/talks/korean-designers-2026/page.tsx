import Link from "next/link";

export default function KoreanTalk2026() {
  return (
    <main className="min-h-screen bg-black text-white p-12">
      <p className="text-white/40 text-sm mb-2">May 2026 · Seoul, Korea</p>
      <h1 className="text-5xl font-bold mb-4">The Future of Design</h1>
      <p className="text-xl text-white/60 mb-12">Figma → Vibe Coding → Agentic Engineering</p>
      <div className="flex gap-6">
        <Link href="/talks/korean-designers-2026/slides" className="bg-white text-black px-8 py-4 font-semibold hover:bg-white/90 transition-colors">
          View Slides →
        </Link>
      </div>
      <div className="mt-16 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4 text-white/80">About this talk</h2>
        <p className="text-white/50 leading-relaxed">
          A 90-minute talk for Korean product designers at acrossB.
          Two halves: my personal thesis on how design is evolving from Figma to vibe coding to agentic engineering —
          and perspectives from 10 Silicon Valley designers on what's coming next.
        </p>
      </div>
    </main>
  );
}
