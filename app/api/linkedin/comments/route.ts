import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const postUrn = req.nextUrl.searchParams.get("postUrn");
  if (!token || !postUrn) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const res = await fetch(
    `https://api.linkedin.com/rest/socialActions/${encodeURIComponent(postUrn)}/comments?count=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "LinkedIn-Version": "202503",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  );

  if (!res.ok) return NextResponse.json({ comments: [] });

  const data = await res.json();
  const comments = (data.elements || []).map((c: {
    id: string;
    message?: { text?: string };
    actor?: string;
    created?: { time?: number };
  }) => ({
    id: c.id,
    text: c.message?.text || "",
    authorName: c.actor || "LinkedIn Member",
    timestamp: new Date(c.created?.time || Date.now()).toISOString(),
  }));

  return NextResponse.json({ comments });
}
