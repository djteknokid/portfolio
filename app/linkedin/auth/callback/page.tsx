import { redirect } from "next/navigation";

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string; state?: string }>;
}) {
  const params = await searchParams;

  if (params.error) {
    redirect("/linkedin?error=access_denied");
  }

  const code = params.code;
  if (!code) {
    redirect("/linkedin?error=no_code");
  }

  // Exchange code for access token
  const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI!,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  if (!tokenRes.ok) {
    redirect("/linkedin?error=token_exchange_failed");
  }

  const tokenData = await tokenRes.json();
  const accessToken: string = tokenData.access_token;

  redirect(`/linkedin/dashboard?token=${accessToken}`);
}
