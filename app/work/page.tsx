export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black text-white p-12">
      <h1 className="text-4xl font-bold mb-12">Work</h1>
      <div className="grid grid-cols-1 gap-8 max-w-4xl">
        {[
          { slug: "mixboard", title: "Google Mixboard", role: "Founding UX Engineer · Google Labs" },
          { slug: "fioriweb", title: "FioriWeb", role: "Creator · SAP" },
          { slug: "fde", title: "FDE Platform · PG&E", role: "Design Lead · SAP" },
        ].map((w) => (
          <a key={w.slug} href={`/work/${w.slug}`} className="border border-white/20 p-8 hover:border-white/60 transition-colors">
            <h2 className="text-2xl font-semibold">{w.title}</h2>
            <p className="text-white/50 mt-2">{w.role}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
