"use client";

import { useState } from "react";

const QUALITY_OPTIONS = [
  { id: "1080", label: "1080p", sub: "MP4" },
  { id: "720",  label: "720p",  sub: "MP4" },
  { id: "480",  label: "480p",  sub: "MP4" },
  { id: "360",  label: "360p",  sub: "MP4" },
  { id: "audio", label: "Audio", sub: "MP3" },
];

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("1080");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");

    try {
      const isAudio = selectedQuality === "audio";
      const res = await fetch("/api/ytdl/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          videoQuality: isAudio ? "1080" : selectedQuality,
          downloadMode: isAudio ? "audio" : "auto",
          audioFormat: "mp3",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      // Cobalt returns a direct download URL — just open it
      if (data.url) {
        const a = document.createElement("a");
        a.href = data.url;
        a.download = data.filename || "download";
        a.click();
      } else {
        throw new Error("No download URL returned");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <header className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">YouTube Downloader</h1>
          <p className="text-sm text-zinc-500">Paste a URL · Pick a quality · Download</p>
        </header>

        <form onSubmit={handleDownload}>
          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-sm text-[#f1f1f1] px-4 py-3 outline-none focus:border-red-600 placeholder:text-zinc-600 transition-colors mb-3"
          />

          {/* Quality selector */}
          <div className="grid grid-cols-5 gap-1 mb-3">
            {QUALITY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedQuality(opt.id)}
                className={`flex flex-col items-center gap-1 py-4 rounded-xl text-center transition-colors
                  ${selectedQuality === opt.id
                    ? "bg-[#1a0000] border border-red-800 text-red-400"
                    : "bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-400 hover:bg-[#222] hover:text-[#f1f1f1]"
                  }`}
              >
                <span className="text-[13px] font-semibold">{opt.label}</span>
                <span className="text-[11px] opacity-60">{opt.sub}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-4 rounded-xl transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                Processing…
              </span>
            ) : (
              `Download ${QUALITY_OPTIONS.find(o => o.id === selectedQuality)?.label} ${QUALITY_OPTIONS.find(o => o.id === selectedQuality)?.sub}`
            )}
          </button>
        </form>

        {error && (
          <div className="bg-[#2a1010] border border-[#661111] text-red-400 rounded-xl px-4 py-3 text-sm mt-4">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
