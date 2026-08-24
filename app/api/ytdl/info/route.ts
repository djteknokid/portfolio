import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

const YT_DLP = process.env.YT_DLP_PATH || "/opt/homebrew/bin/yt-dlp";
const COOKIES = ["--cookies-from-browser", "chrome"];

function formatDuration(seconds: number): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  return new Promise<NextResponse>((resolve) => {
    const args = ["--dump-json", "--no-playlist", ...COOKIES, url];
    const proc = spawn(YT_DLP, args);
    let out = "";
    let err = "";
    proc.stdout.on("data", (d) => (out += d));
    proc.stderr.on("data", (d) => (err += d));
    proc.on("close", (code) => {
      if (code !== 0) {
        resolve(NextResponse.json({ error: err || "Failed to fetch info" }, { status: 400 }));
        return;
      }
      try {
        const info = JSON.parse(out);

        const videoFormats = (info.formats || []).filter(
          (f: { vcodec?: string; acodec?: string; ext?: string; height?: number }) =>
            f.vcodec &&
            f.vcodec !== "none" &&
            f.acodec === "none" &&
            f.ext === "mp4" &&
            f.vcodec.startsWith("avc") &&
            f.height
        );

        const byHeight: Record<number, { format_id: string; height: number; tbr?: number; filesize?: number; filesize_approx?: number }> = {};
        for (const f of videoFormats) {
          const h = f.height;
          if (!byHeight[h] || (f.tbr || 0) > (byHeight[h].tbr || 0)) {
            byHeight[h] = f;
          }
        }

        const formats = [
          ...Object.values(byHeight)
            .sort((a, b) => b.height - a.height)
            .map((f) => ({
              formatId: f.format_id,
              height: f.height,
              label: `${f.height}p`,
              ext: "mp4",
              filesize: f.filesize || f.filesize_approx || null,
            })),
          { formatId: "mp3", height: 0, label: "MP3", ext: "mp3", filesize: null },
        ];

        resolve(
          NextResponse.json({
            title: info.title,
            thumbnail: info.thumbnail,
            duration: info.duration_string || formatDuration(info.duration),
            channel: info.uploader,
            formats,
          })
        );
      } catch {
        resolve(NextResponse.json({ error: "Failed to parse video info" }, { status: 500 }));
      }
    });
  });
}
