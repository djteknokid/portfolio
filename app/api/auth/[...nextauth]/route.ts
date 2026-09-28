import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to refresh token");
  return {
    accessToken: data.access_token as string,
    expiresAt: Math.floor(Date.now() / 1000) + (data.expires_in as number),
    refreshToken: (data.refresh_token as string) ?? refreshToken,
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // First sign-in — store tokens and expiry
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // expires_at from Google is already seconds since epoch
        token.expiresAt = account.expires_at ?? Math.floor(Date.now() / 1000) + 3600;
        token.error = undefined;
        return token;
      }

      // No expiry stored — treat as expired to force refresh
      if (!token.expiresAt) {
        token.expiresAt = 0;
      }

      // Token still valid
      if (Date.now() / 1000 < (token.expiresAt as number) - 60) {
        return token;
      }

      // Token expired — refresh it
      if (!token.refreshToken) {
        token.error = "RefreshAccessTokenError";
        return token;
      }

      try {
        const refreshed = await refreshAccessToken(token.refreshToken as string);
        token.accessToken = refreshed.accessToken;
        token.refreshToken = refreshed.refreshToken;
        token.expiresAt = refreshed.expiresAt;
        token.error = undefined;
      } catch (err) {
        console.error("Token refresh failed:", err);
        token.error = "RefreshAccessTokenError";
      }
      return token;
    },
    async session({ session, token }) {
      (session as typeof session & { accessToken?: string }).accessToken = token.accessToken as string;
      (session as typeof session & { error?: string }).error = token.error as string | undefined;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
