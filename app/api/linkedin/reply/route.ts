import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { commentId, postUrn, text, token } = await req.json();
  if (!commentId || !postUrn || !text || !token) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // Get author URN from token
  const meRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return NextResponse.json({ error: "Failed to get identity" }, { status: 401 });
  const me = await meRes.json();
  const authorUrn = `urn:li:person:${me.sub}`;

  const res = await fetch(
    `https://api.linkedin.com/rest/socialActions/${encodeURIComponent(postUrn)}/comments/${encodeURIComponent(commentId)}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": "202501",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify({
        actor: authorUrn,
        message: { text },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  return NextResponse.json({ ok: true });
}
