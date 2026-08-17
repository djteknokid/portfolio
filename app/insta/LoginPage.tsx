"use client";

import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const isAdding = searchParams.get("add") === "1";
  const error = searchParams.get("error");

  const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!;

  const scopes = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
    "instagram_business_manage_insights",
  ].join(",");

  const authUrl =
    `https://www.instagram.com/oauth/authorize` +
    `?client_id=${appId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scopes}` +
    `&response_type=code` +
    (isAdding ? `&force_authentication=1&enable_fb_login=0&prompt=select_account` : "");

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            {isAdding ? "Add another account" : "Instagram Stats"}
          </h1>
          <p className="text-zinc-500 text-sm">
            {isAdding
              ? "Connect a second Instagram account"
              : "Connect your account to see your analytics"}
          </p>
        </div>
        {error && (
          <p className="text-red-400 text-xs">
            {error === "access_denied" && "Access was denied. Please try again."}
            {error === "no_code" && "No auth code received. Please try again."}
            {error === "token_exchange_failed" && "Failed to get access token. Please try again."}
            {error === "long_token_failed" && "Failed to extend token. Please try again."}
            {!["access_denied", "no_code", "token_exchange_failed", "long_token_failed"].includes(error) && "Something went wrong. Please try again."}
          </p>
        )}
        {isAdding && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-left space-y-2 max-w-xs">
            <p className="text-zinc-300 text-xs font-medium">Before connecting</p>
            <ol className="text-zinc-500 text-xs space-y-1.5 list-decimal list-inside">
              <li>Open Instagram in a new tab</li>
              <li>Switch to the account you want to add</li>
              <li>Come back here and tap Connect</li>
            </ol>
          </div>
        )}
        <a
          href={authUrl}
          className="inline-block bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors"
        >
          {isAdding ? "Connect Instagram" : "Connect Instagram"}
        </a>
      </div>
    </main>
  );
}
