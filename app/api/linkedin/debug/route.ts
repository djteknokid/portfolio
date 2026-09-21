import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  // Check what scopes this token actually has via introspection
  const introRes = await fetch("https://www.linkedin.com/oauth/v2/introspectToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      token,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  const introData = introRes.ok ? await introRes.json() : { error: await introRes.text() };

  // Try multiple endpoints to see what's accessible
  const tests: Record<string, unknown> = { tokenInfo: introData };

  // Try old ugcPosts endpoint
  const ugcRes = await fetch(
    `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent("urn:li:person:me")}}&count=5`,
    { headers: { Authorization: `Bearer ${token}`, "X-Restli-Protocol-Version": "2.0.0" } }
  );
  tests.ugcPosts_status = ugcRes.status;
  tests.ugcPosts_body = ugcRes.ok ? await ugcRes.json() : await ugcRes.text();

  // Try /v2/shares
  const sharesRes = await fetch(
    `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:~&count=5`,
    { headers: { Authorization: `Bearer ${token}`, "X-Restli-Protocol-Version": "2.0.0" } }
  );
  tests.shares_status = sharesRes.status;
  tests.shares_body = sharesRes.ok ? await sharesRes.json() : await sharesRes.text();

  // Try userinfo to get sub
  const meRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const me = meRes.ok ? await meRes.json() : null;
  tests.me = me;

  if (me?.sub) {
    // Try rest/posts with actual URN
    const postsRes = await fetch(
      `https://api.linkedin.com/rest/posts?author=${encodeURIComponent(`urn:li:person:${me.sub}`)}&q=author&count=5&sortBy=LAST_MODIFIED`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "LinkedIn-Version": "202503",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );
    tests.restPosts_status = postsRes.status;
    tests.restPosts_body = postsRes.ok ? await postsRes.json() : await postsRes.text();

    // Try ugcPosts with actual URN
    const ugcRes2 = await fetch(
      `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(${encodeURIComponent(`urn:li:person:${me.sub}`)})&count=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );
    tests.ugcPostsWithUrn_status = ugcRes2.status;
    tests.ugcPostsWithUrn_body = ugcRes2.ok ? await ugcRes2.json() : await ugcRes2.text();
  }

  return NextResponse.json(tests);
}
