"use client";

import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const isAdding = searchParams.get("add") === "1";
  const error = searchParams.get("error");

  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!;

  const scopes = [
    "openid",
    "profile",
    "email",
    "w_member_social",
  ].join(" ");

  const state = Math.random().toString(36).slice(2);

  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&state=${state}`;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            {isAdding ? "Add another account" : "LinkedIn Stats"}
          </h1>
          <p className="text-zinc-500 text-sm">
            {isAdding
              ? "Connect a second LinkedIn account"
              : "Connect your account to see your analytics"}
          </p>
        </div>
        {error && (
          <p className="text-red-400 text-xs">
            {error === "access_denied" && "Access was denied. Please try again."}
            {error === "no_code" && "No auth code received. Please try again."}
            {error === "token_exchange_failed" && "Failed to get access token. Please try again."}
            {error === "profile_fetch_failed" && "Failed to load profile. Please try again."}
          </p>
        )}
        <a
          href={authUrl}
          className="inline-flex items-center gap-3 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          {isAdding ? "Connect with LinkedIn" : "Continue with LinkedIn"}
        </a>
        <p className="text-zinc-700 text-xs max-w-xs mx-auto">
          We only read your posts and profile. We never post on your behalf.
        </p>
      </div>
    </main>
  );
}
