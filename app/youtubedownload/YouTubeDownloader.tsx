"use client";

import { useState } from "react";

const FORMAT_ICONS: Record<string, string> = { mp4: "🎬", mp3: "🎵" };

function formatBytes(bytes: number | null): string | null {
  if (!bytes) return null;
  if (bytes > 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
  return `${(bytes / 1024 / 1024).toFixed(0)} MB`;
}

interface Format {
  formatId: string;
  height: number;
  label: string;
  ext: string;
  filesize: number | null;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  formats: Format[];
}

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState<VideoInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [downloading, setDownloading] = useState(false);

  async function fetchInfo(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setInfo(null);
    setSelectedFormat(null);
    try {
      const res = await fetch("/api/ytdl/info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch video info");
      setInfo(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function download() {
    if (!selectedFormat || !info) return;
    setDownloading(true);
    setError("");
    try {
      const params = new URLSearchParams({ url, formatId: selectedFormat.formatId });
      const res = await fetch(`/api/ytdl/download?${params}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${info.title.slice(0, 60)}.${selectedFormat.ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1] flex items-start justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <header className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">YouTube Downloader</h1>
          <p className="text-sm text-zinc-500">Paste a URL · Pick a format · Download</p>
        </header>

        <form onSubmit={fetchInfo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-sm text-[#f1f1f1] px-4 py-3 outline-none focus:border-red-600 placeholder:text-zinc-600 transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? "Fetching…" : "Get Video"}
          </button>
        </form>

        {error && (
          <div className="bg-[#2a1010] border border-[#661111] text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
            {error}
          </div>
        )}

        {info && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            {/* Video info */}
            <div className="flex gap-4 p-5 border-b border-[#2a2a2a]">
              {info.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={info.thumbnail} alt="thumbnail" className="w-28 h-16 object-cover rounded-lg shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-[#f1f1f1] leading-snug mb-2 line-clamp-2">{info.title}</h2>
                <div className="flex text-xs text-zinc-500">
                  {info.channel && <span>{info.channel}</span>}
                  {info.duration && <span className="before:content-['·'] before:mx-1">{info.duration}</span>}
                </div>
              </div>
            </div>

            {/* Format picker */}
            <div
              className="grid border-b border-[#2a2a2a]"
              style={{ gridTemplateColumns: `repeat(${(info.formats ?? []).length}, 1fr)`, gap: "1px", background: "#2a2a2a" }}
            >
              {(info.formats ?? []).map((fmt) => (
                <button
                  key={fmt.formatId}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`flex flex-col items-center gap-1.5 py-5 px-3 transition-colors text-center
                    ${selectedFormat?.formatId === fmt.formatId
                      ? "bg-[#1a0000] text-red-400"
                      : "bg-[#1a1a1a] text-zinc-400 hover:bg-[#222] hover:text-[#f1f1f1]"
                    }`}
                >
                  <span className="text-xl">{FORMAT_ICONS[fmt.ext] ?? "📄"}</span>
                  <span className="text-[13px] font-semibold">{fmt.label}</span>
                  <span className="text-[11px] opacity-60">
                    {fmt.ext.toUpperCase()}{formatBytes(fmt.filesize) ? ` · ${formatBytes(fmt.filesize)}` : ""}
                  </span>
                </button>
              ))}
            </div>

            {/* Download button */}
            <button
              onClick={download}
              disabled={!selectedFormat || downloading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-[#444] disabled:opacity-35 disabled:cursor-not-allowed text-white text-[15px] font-semibold py-4 transition-colors"
            >
              {downloading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                  Downloading…
                </span>
              ) : selectedFormat ? (
                `Download ${selectedFormat.label} ${selectedFormat.ext.toUpperCase()}`
              ) : (
                "Select a format above"
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
