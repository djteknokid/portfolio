import { NextRequest, NextResponse } from "next/server";

const COBALT_API = "https://api.cobalt.tools";

export async function POST(req: NextRequest) {
  const { url, videoQuality, downloadMode, audioFormat } = await req.json();
  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  const res = await fetch(COBALT_API, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      videoQuality: videoQuality || "1080",
      downloadMode: downloadMode || "auto",
      audioFormat: audioFormat || "mp3",
      filenameStyle: "pretty",
    }),
  });

  const data = await res.json();

  if (!res.ok || data.status === "error") {
    return NextResponse.json({ error: data.error?.code || "Failed to process URL" }, { status: 400 });
  }

  return NextResponse.json(data);
}
