import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between p-12">
      <nav className="flex gap-8 text-white/40 text-sm">
        <Link href="/work" className="hover:text-white transition-colors">Work</Link>
        <Link href="/talks" className="hover:text-white transition-colors">Talks</Link>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-6xl font-bold leading-tight mb-8">
          Is your team ready to do something amazing together?
        </h1>
        <p className="text-xl text-white/50 leading-relaxed">
          I&apos;m David Lee. I build systems that make designers dangerous —
          and teams capable of things they couldn&apos;t do before.
        </p>
      </div>

      <p className="text-white/20 text-sm">davidlee.design</p>
    </main>
  );
}
