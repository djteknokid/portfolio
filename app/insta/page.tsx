export default function InstaLogin() {
  const appId = process.env.INSTAGRAM_APP_ID!;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;

  const scopes = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
  ].join(",");

  const authUrl =
    `https://www.instagram.com/oauth/authorize` +
    `?client_id=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scopes}` +
    `&response_type=code`;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            Instagram Stats
          </h1>
          <p className="text-zinc-500 text-sm">
            Connect your account to see your analytics
          </p>
        </div>
        <a
          href={authUrl}
          className="inline-block bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors"
        >
          Connect Instagram
        </a>
      </div>
    </main>
  );
}
