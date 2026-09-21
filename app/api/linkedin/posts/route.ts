import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  // Get the member's own URN
  const meRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!meRes.ok) return NextResponse.json({ error: "Failed to fetch profile" }, { status: meRes.status });
  const me = await meRes.json();
  const authorUrn = `urn:li:person:${me.sub}`;

  // Fetch recent posts
  const postsRes = await fetch(
    `https://api.linkedin.com/rest/posts?author=${encodeURIComponent(authorUrn)}&q=author&count=50&sortBy=LAST_MODIFIED`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "LinkedIn-Version": "202401",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    }
  );

  if (!postsRes.ok) {
    return NextResponse.json({ error: "Failed to fetch posts", posts: [] }, { status: postsRes.status });
  }

  const postsData = await postsRes.json();
  const rawPosts = postsData.elements || [];

  const posts = rawPosts.map((p: {
    id: string;
    commentary?: string;
    publishedAt?: number;
    createdAt?: number;
    socialDetail?: { totalSocialActivityCounts?: { numLikes?: number; numComments?: number; numShares?: number } };
    permalink?: string;
  }) => ({
    id: p.id,
    urn: p.id,
    text: p.commentary || "",
    timestamp: new Date(p.publishedAt || p.createdAt || Date.now()).toISOString(),
    likeCount: p.socialDetail?.totalSocialActivityCounts?.numLikes || 0,
    commentCount: p.socialDetail?.totalSocialActivityCounts?.numComments || 0,
    repostCount: p.socialDetail?.totalSocialActivityCounts?.numShares || 0,
    permalink: p.permalink || `https://www.linkedin.com/feed/update/${encodeURIComponent(p.id)}/`,
  }));

  return NextResponse.json({ posts });
}
