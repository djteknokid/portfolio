"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Profile {
  id: string;
  username: string;
  name: string;
  biography: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  profile_picture_url: string;
  website: string;
}

interface MediaItem {
  id: string;
  caption?: string;
  media_type: string;
  thumbnail_url?: string;
  media_url?: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
  permalink: string;
  // insights
  impressions?: number;
  reach?: number;
  plays?: number;
  shares?: number;
  saved?: number;
}

interface StoredAccount {
  username: string;
  token: string;
  profile_picture_url: string;
  name: string;
}

type SortKey = "timestamp" | "like_count" | "comments_count" | "impressions" | "reach" | "plays" | "shares" | "saved";
type SortDir = "asc" | "desc";

const ACCOUNTS_KEY = "ig_accounts";
const ACTIVE_KEY = "ig_active_username";

function getAccounts(): StoredAccount[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAccount(account: StoredAccount) {
  const accounts = getAccounts();
  const idx = accounts.findIndex((a) => a.username === account.username);
  if (idx >= 0) accounts[idx] = account;
  else accounts.push(account);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function removeAccount(username: string) {
  const accounts = getAccounts().filter((a) => a.username !== username);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg
      className={`inline w-3 h-3 ml-1 transition-opacity ${active ? "opacity-100" : "opacity-30"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={active && dir === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
      />
    </svg>
  );
}

function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeUsername, setActiveUsername] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<StoredAccount[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      window.history.replaceState({}, "", "/insta/dashboard");
      fetch(
        `https://graph.instagram.com/v21.0/me` +
          `?fields=id,username,name,profile_picture_url` +
          `&access_token=${urlToken}`
      )
        .then((r) => r.json())
        .then((data) => {
          const account: StoredAccount = {
            username: data.username,
            name: data.name,
            profile_picture_url: data.profile_picture_url,
            token: urlToken,
          };
          saveAccount(account);
          localStorage.setItem(ACTIVE_KEY, data.username);
          setAccounts(getAccounts());
          setActiveUsername(data.username);
          setToken(urlToken);
        })
        .catch(() => router.push("/insta?error=profile_fetch_failed"));
      return;
    }

    const storedAccounts = getAccounts();
    if (storedAccounts.length === 0) {
      router.push("/insta");
      return;
    }

    const active = localStorage.getItem(ACTIVE_KEY) || storedAccounts[0].username;
    const account = storedAccounts.find((a) => a.username === active) || storedAccounts[0];
    setAccounts(storedAccounts);
    setActiveUsername(account.username);
    setToken(account.token);
  }, [searchParams, router]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const profileRes = await fetch(
          `https://graph.instagram.com/v21.0/me` +
            `?fields=id,username,name,biography,followers_count,follows_count,media_count,profile_picture_url,website` +
            `&access_token=${token}`
        );
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        setProfile(await profileRes.json());

        const mediaRes = await fetch(
          `https://graph.instagram.com/v21.0/me/media` +
            `?fields=id,caption,media_type,thumbnail_url,media_url,timestamp,like_count,comments_count,permalink` +
            `&limit=50` +
            `&access_token=${token}`
        );
        if (!mediaRes.ok) throw new Error("Failed to fetch media");
        const mediaData = await mediaRes.json();
        const posts: MediaItem[] = mediaData.data || [];

        // Fetch insights for each post in parallel (batches of 10 to avoid rate limits)
        const enriched = await Promise.all(
          posts.map(async (post) => {
            // IMAGE posts use different metrics than VIDEO/REEL
            const isVideo = post.media_type === "VIDEO" || post.media_type === "REELS";
            const metrics = isVideo
              ? "impressions,reach,plays,shares,saved,likes,comments"
              : "impressions,reach,shares,saved,likes,comments";
            try {
              const insightRes = await fetch(
                `https://graph.instagram.com/v21.0/${post.id}/insights` +
                  `?metric=${metrics}` +
                  `&access_token=${token}`
              );
              if (!insightRes.ok) return post;
              const insightData = await insightRes.json();
              const map: Record<string, number> = {};
              for (const item of insightData.data || []) {
                map[item.name] = item.values?.[0]?.value ?? item.value ?? 0;
              }
              return {
                ...post,
                impressions: map.impressions,
                reach: map.reach,
                plays: map.plays,
                shares: map.shares,
                saved: map.saved,
              };
            } catch {
              return post;
            }
          })
        );
        setMedia(enriched);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function switchAccount(username: string) {
    const account = accounts.find((a) => a.username === username);
    if (!account) return;
    localStorage.setItem(ACTIVE_KEY, username);
    setActiveUsername(username);
    setToken(account.token);
    setMenuOpen(false);
  }

  function addAccount() {
    setMenuOpen(false);
    router.push("/insta?add=1");
  }

  function disconnectAccount(username: string) {
    removeAccount(username);
    const remaining = getAccounts();
    setAccounts(remaining);
    if (remaining.length === 0) {
      localStorage.removeItem(ACTIVE_KEY);
      router.push("/insta");
    } else {
      const next = remaining[0];
      localStorage.setItem(ACTIVE_KEY, next.username);
      setActiveUsername(next.username);
      setToken(next.token);
    }
    setMenuOpen(false);
  }

  const sortedMedia = [...media].sort((a, b) => {
    const aVal = sortKey === "timestamp"
      ? new Date(a.timestamp).getTime()
      : (a[sortKey] ?? -1);
    const bVal = sortKey === "timestamp"
      ? new Date(b.timestamp).getTime()
      : (b[sortKey] ?? -1);
    return sortDir === "desc" ? bVal - aVal : aVal - bVal;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Loading your stats...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={() => disconnectAccount(activeUsername!)}
            className="text-zinc-500 text-xs underline"
          >
            Reconnect Instagram
          </button>
        </div>
      </main>
    );
  }

  const avgEngagement =
    media.length > 0
      ? Math.round(
          media.reduce((sum, p) => sum + p.like_count + p.comments_count, 0) /
            media.length
        )
      : 0;

  const engagementRate =
    profile && profile.followers_count > 0
      ? ((avgEngagement / profile.followers_count) * 100).toFixed(2)
      : "0.00";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-4 group"
            >
              {profile?.profile_picture_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profile_picture_url}
                  alt={profile.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              )}
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">@{profile?.username}</h1>
                  <svg
                    className={`w-4 h-4 text-zinc-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-sm">{profile?.name}</p>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl z-10">
                {accounts
                  .filter((a) => a.username !== activeUsername)
                  .map((a) => (
                    <button
                      key={a.username}
                      onClick={() => switchAccount(a.username)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.profile_picture_url} alt={a.username} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm text-white">@{a.username}</p>
                        <p className="text-xs text-zinc-500">{a.name}</p>
                      </div>
                    </button>
                  ))}

                {accounts.filter((a) => a.username !== activeUsername).length > 0 && (
                  <div className="border-t border-zinc-800" />
                )}

                <button
                  onClick={addAccount}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-300">Add account</p>
                </button>

                <div className="border-t border-zinc-800" />

                <button
                  onClick={() => disconnectAccount(activeUsername!)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left"
                >
                  <p className="text-sm text-red-400">Disconnect @{activeUsername}</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Followers", value: profile?.followers_count.toLocaleString() },
            { label: "Following", value: profile?.follows_count.toLocaleString() },
            { label: "Posts", value: profile?.media_count.toLocaleString() },
            { label: "Avg Engagement", value: `${engagementRate}%` },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 rounded-2xl p-5 space-y-1">
              <p className="text-zinc-500 text-xs">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Post performance table */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-400">Post performance</h2>
          <div className="bg-zinc-900 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-500 font-normal px-4 py-3 w-10"></th>
                  <th className="text-left text-zinc-500 font-normal px-4 py-3">Caption</th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("impressions")}>
                    Impressions <SortIcon active={sortKey === "impressions"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("reach")}>
                    Reach <SortIcon active={sortKey === "reach"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("plays")}>
                    Views <SortIcon active={sortKey === "plays"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("like_count")}>
                    Likes <SortIcon active={sortKey === "like_count"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("comments_count")}>
                    Comments <SortIcon active={sortKey === "comments_count"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("shares")}>
                    Shares <SortIcon active={sortKey === "shares"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("saved")}>
                    Saved <SortIcon active={sortKey === "saved"} dir={sortDir} />
                  </th>
                  <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("timestamp")}>
                    Date <SortIcon active={sortKey === "timestamp"} dir={sortDir} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedMedia.map((post, i) => (
                  <tr
                    key={post.id}
                    className={`hover:bg-zinc-800/50 transition-colors ${i < sortedMedia.length - 1 ? "border-b border-zinc-800" : ""}`}
                  >
                    <td className="px-4 py-2.5">
                      <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                        {(post.thumbnail_url || post.media_url) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.thumbnail_url || post.media_url}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
                            {post.media_type === "VIDEO" ? "▶" : "□"}
                          </div>
                        )}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-300 max-w-xs">
                      <a
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors line-clamp-2 leading-snug"
                      >
                        {post.caption || <span className="text-zinc-600">No caption</span>}
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.impressions != null ? post.impressions.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.reach != null ? post.reach.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.plays != null ? post.plays.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-300">{post.like_count.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-300">{post.comments_count.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.shares != null ? post.shares.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.saved != null ? post.saved.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.impressions != null ? post.impressions.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.reach != null ? post.reach.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.plays != null ? post.plays.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.shares != null ? post.shares.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-400">
                      {post.saved != null ? post.saved.toLocaleString() : <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-500 whitespace-nowrap">
                      {new Date(post.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Loading...</p>
      </main>
    }>
      <Dashboard />
    </Suspense>
  );
}
