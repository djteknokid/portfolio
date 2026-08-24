import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { randomBytes } from "crypto";
import { tmpdir } from "os";
import { join } from "path";
import { existsSync, statSync, createReadStream, unlink } from "fs";

const YT_DLP = process.env.YT_DLP_PATH || "/opt/homebrew/bin/yt-dlp";
const FFMPEG_DIR = process.env.FFMPEG_DIR || "/opt/homebrew/bin";
const COOKIES = ["--cookies-from-browser", "chrome"];
const BEST_AUDIO = 'bestaudio[acodec~="^mp4a"]/bestaudio[ext=m4a]/bestaudio';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const url = searchParams.get("url");
  const formatId = searchParams.get("formatId");

  if (!url || !formatId) {
    return NextResponse.json({ error: "url and formatId required" }, { status: 400 });
  }

  const ext = formatId === "mp3" ? "mp3" : "mp4";
  const tmpBase = join(tmpdir(), `ytdl-${randomBytes(8).toString("hex")}`);
  const tmpFile = `${tmpBase}.${ext}`;

  const args =
    formatId === "mp3"
      ? ["--no-playlist", ...COOKIES, "-x", "--audio-format", "mp3", "--ffmpeg-location", FFMPEG_DIR, "-o", tmpFile, url]
      : ["--no-playlist", ...COOKIES, "-f", `${formatId}+${BEST_AUDIO}`, "--merge-output-format", "mp4", "--ffmpeg-location", FFMPEG_DIR, "-o", tmpFile, url];

  await new Promise<void>((resolve, reject) => {
    const proc = spawn(YT_DLP, args);
    proc.stderr.on("data", (d) => process.stdout.write(d));
    proc.on("close", (code) => {
      if (code !== 0 || !existsSync(tmpFile)) reject(new Error("Download failed"));
      else resolve();
    });
  }).catch((e) => {
    unlink(tmpFile, () => {});
    throw e;
  });

  const stat = statSync(tmpFile);
  const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const stream = createReadStream(tmpFile);
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
    stream.on("close", () => unlink(tmpFile, () => {}));
  });

  return new NextResponse(fileBuffer.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": ext === "mp3" ? "audio/mpeg" : "video/mp4",
      "Content-Disposition": `attachment; filename="download.${ext}"`,
      "Content-Length": String(stat.size),
    },
  });
}
