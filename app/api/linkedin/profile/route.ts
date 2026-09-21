import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

  // Fetch basic profile via OpenID Connect userinfo
  const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!profileRes.ok) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: profileRes.status });
  }

  const profile = await profileRes.json();

  // Fetch connections count
  let connectionsCount = 0;
  try {
    const connRes = await fetch(
      "https://api.linkedin.com/v2/networkSizes/urn:li:person:" + profile.sub + "?edgeType=CompanyFollowedByMember",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (connRes.ok) {
      const connData = await connRes.json();
      connectionsCount = connData.firstDegreeSize || 0;
    }
  } catch {
    // connections count not critical
  }

  return NextResponse.json({
    id: profile.sub,
    name: profile.name || `${profile.given_name || ""} ${profile.family_name || ""}`.trim(),
    headline: profile.headline || "",
    profilePicture: profile.picture || "",
    connectionsCount,
  });
}
