import { redirect } from "next/navigation";

interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface LongLivedTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const params = await searchParams;

  if (params.error) {
    redirect("/insta?error=access_denied");
  }

  const code = params.code;
  if (!code) {
    redirect("/insta?error=no_code");
  }

  // Exchange code for short-lived token
  const tokenRes = await fetch(
    "https://api.instagram.com/oauth/access_token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
        code,
      }),
    }
  );

  if (!tokenRes.ok) {
    redirect("/insta?error=token_exchange_failed");
  }

  const tokenData: TokenResponse = await tokenRes.json();
  const shortLivedToken = tokenData.access_token;

  // Exchange for long-lived token (60 days)
  const longRes = await fetch(
    `https://graph.instagram.com/access_token` +
      `?grant_type=ig_exchange_token` +
      `&client_secret=${process.env.INSTAGRAM_APP_SECRET}` +
      `&access_token=${shortLivedToken}`
  );

  if (!longRes.ok) {
    redirect("/insta?error=long_token_failed");
  }

  const longData: LongLivedTokenResponse = await longRes.json();

  // Pass token via URL param to dashboard (client will store in localStorage)
  redirect(`/insta/dashboard?token=${longData.access_token}`);
}
