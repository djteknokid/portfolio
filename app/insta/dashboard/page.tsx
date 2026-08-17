"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FollowerDataPoint {
  date: string;
  fullDate: string;
  value: number;
  delta: number;
}

type FollowerRange = "7D" | "30D" | "90D";

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
  reach?: number;
  views?: number;
  shares?: number;
  saved?: number;
  follows?: number;
}

interface CommentReply {
  id: string;
  text: string;
  username: string;
  timestamp: string;
}

interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  like_count: number;
  replies?: { data: CommentReply[] };
  postId: string;
  postCaption?: string;
  postThumb?: string;
  postPermalink: string;
}

interface StoredAccount {
  username: string;
  token: string;
  profile_picture_url: string;
  name: string;
}

type SortKey = "timestamp" | "like_count" | "comments_count" | "reach" | "views" | "shares" | "saved" | "follows";
type SortDir = "asc" | "desc";
type Tab = "stats" | "comments";

const ACCOUNTS_KEY = "ig_accounts";
const ACTIVE_KEY = "ig_active_username";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <svg
      className={`inline w-3 h-3 ml-1 transition-opacity ${active ? "opacity-100" : "opacity-30"}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round"
        d={active && dir === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
    </svg>
  );
}

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
}

function FollowerGraph({ token }: { token: string }) {
  const [range, setRange] = useState<FollowerRange>("30D");
  const [data, setData] = useState<FollowerDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setLoading(true);
    setHovered(null);
    const days = range === "7D" ? 7 : range === "30D" ? 30 : 90;
    const until = Math.floor(Date.now() / 1000);
    const since = until - days * 86400;

    fetch(
      `https://graph.instagram.com/v21.0/me/insights` +
        `?metric=follower_count&period=day&since=${since}&until=${until}&access_token=${token}`
    )
      .then((r) => r.json())
      .then((json) => {
        const raw: { value: number; end_time: string }[] = json.data?.[0]?.values || [];
        setData(raw.map((v, i) => ({
          date: new Date(v.end_time).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          fullDate: new Date(v.end_time).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          value: v.value,
          delta: i === 0 ? 0 : v.value - raw[i - 1].value,
        })));
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [token, range]);

  const W = 800; const H = 160;
  const padL = 48; const padR = 16; const padT = 16; const padB = 28;

  const values = data.map((d) => d.value);
  const minV = values.length ? Math.min(...values) : 0;
  const maxV = values.length ? Math.max(...values) : 1;
  const spread = maxV - minV || 1;
  const yMin = minV - spread * 0.15;
  const yMax = maxV + spread * 0.15;
  const yRange = yMax - yMin;

  const xOf = (i: number) => padL + (i / Math.max(data.length - 1, 1)) * (W - padL - padR);
  const yOf = (v: number) => padT + (1 - (v - yMin) / yRange) * (H - padT - padB);

  const pts = data.map((d, i) => ({ x: xOf(i), y: yOf(d.value) }));
  const linePath = smoothPath(pts);
  const areaPath = pts.length ? `${linePath} L${pts[pts.length - 1].x},${H - padB} L${pts[0].x},${H - padB} Z` : "";
  const yTicks = [0, 1, 2, 3].map((i) => ({ y: yOf(yMin + (i / 3) * yRange), label: Math.round(yMin + (i / 3) * yRange).toLocaleString() }));
  const labelEvery = Math.ceil(data.length / 6);
  const xLabels = data.map((d, i) => ({ i, d })).filter(({ i }) => i % labelEvery === 0 || i === data.length - 1);
  const netChange = values.length >= 2 ? values[values.length - 1] - values[0] : 0;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!svgRef.current || !pts.length) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * W;
    let closest = 0; let minDist = Infinity;
    pts.forEach((p, i) => { const d = Math.abs(p.x - mouseX); if (d < minDist) { minDist = d; closest = i; } });
    setHovered(closest);
  }

  const hoveredPt = hovered !== null ? pts[hovered] : null;
  const hoveredData = hovered !== null ? data[hovered] : null;

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-xs">Follower growth</p>
          {!loading && data.length > 0 && (
            <p className={`text-sm font-medium mt-0.5 ${netChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {netChange >= 0 ? "+" : ""}{netChange.toLocaleString()} {range === "7D" ? "this week" : range === "30D" ? "this month" : "last 90 days"}
            </p>
          )}
        </div>
        <div className="flex gap-1">
          {(["7D", "30D", "90D"] as FollowerRange[]).map((r) => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${range === r ? "bg-white text-black font-medium" : "text-zinc-500 hover:text-zinc-300"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-[196px] flex items-center justify-center"><p className="text-zinc-600 text-xs">Loading...</p></div>
      ) : data.length === 0 ? (
        <div className="h-[196px] flex items-center justify-center"><p className="text-zinc-600 text-xs">No data available</p></div>
      ) : (
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 196 }}
          onMouseMove={handleMouseMove} onMouseLeave={() => setHovered(null)}>
          <defs>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="graphClip">
              <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
            </clipPath>
          </defs>
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={padL} y1={t.y} x2={W - padR} y2={t.y} stroke="#27272a" strokeWidth="1" />
              <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize="10" fill="#52525b" fontFamily="system-ui, sans-serif">{t.label}</text>
            </g>
          ))}
          {pts.map((p, i) => (
            <line key={i} x1={p.x} y1={padT} x2={p.x} y2={H - padB} stroke="#27272a" strokeWidth="1" />
          ))}
          <path d={areaPath} fill="url(#fg)" clipPath="url(#graphClip)" />
          <path d={linePath} fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#graphClip)" />
          {xLabels.map(({ i, d }) => (
            <text key={i} x={xOf(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#52525b" fontFamily="system-ui, sans-serif">{d.date}</text>
          ))}
          {hoveredPt && hoveredData && (() => {
            const tw = 110; const th = 44;
            const tx = Math.min(Math.max(hoveredPt.x - tw / 2, padL), W - padR - tw);
            const ty = Math.max(hoveredPt.y - th - 12, padT);
            const deltaStr = hoveredData.delta === 0 ? "—" : `${hoveredData.delta > 0 ? "+" : ""}${hoveredData.delta.toLocaleString()}`;
            return (
              <g>
                <line x1={hoveredPt.x} y1={padT} x2={hoveredPt.x} y2={H - padB} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
                <circle cx={hoveredPt.x} cy={hoveredPt.y} r="4" fill="#18181b" stroke="#ffffff" strokeWidth="2" />
                <rect x={tx} y={ty} width={tw} height={th} rx="6" fill="#27272a" />
                <text x={tx + tw / 2} y={ty + 14} textAnchor="middle" fontSize="10" fill="#71717a" fontFamily="system-ui, sans-serif">{hoveredData.fullDate}</text>
                <text x={tx + tw / 2} y={ty + 32} textAnchor="middle" fontSize="13" fontWeight="600" fill="#ffffff" fontFamily="system-ui, sans-serif">
                  {hoveredData.value.toLocaleString()}
                  <tspan fontSize="10" fontWeight="400" fill={hoveredData.delta > 0 ? "#34d399" : hoveredData.delta < 0 ? "#f87171" : "#71717a"}> {deltaStr}</tspan>
                </text>
              </g>
            );
          })()}
        </svg>
      )}
    </div>
  );
}

function CommentsTab({ token, media }: { token: string; media: MediaItem[] }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!media.length) return;
    setLoading(true);
    setError(null);

    const postsWithComments = media.filter((p) => p.comments_count > 0).slice(0, 20);

    Promise.all(
      postsWithComments.map((post) =>
        fetch(
          `https://graph.instagram.com/v21.0/${post.id}/comments` +
            `?fields=id,text,username,timestamp,replies{id,text,username,timestamp}` +
            `&limit=50` +
            `&access_token=${token}`
        )
          .then((r) => r.json())
          .then((json) => {
            if (json.error) return [];
            return (json.data || []).map((c: Comment) => ({
              ...c,
              like_count: 0,
              postId: post.id,
              postCaption: post.caption,
              postThumb: post.thumbnail_url || post.media_url,
              postPermalink: post.permalink,
            }));
          })
          .catch(() => [])
      )
    ).then((results) => {
      const flat: Comment[] = results.flat();
      flat.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setComments(flat);
      if (flat.length === 0 && postsWithComments.length > 0) {
        setError(`Comments require the app to be in Live mode on Meta's developer platform. Currently in Development mode — submit for App Review to enable this feature.`);
      }
    }).finally(() => setLoading(false));
  }, [token, media]);

  async function sendReply(commentId: string) {
    const text = replyText[commentId]?.trim();
    if (!text) return;
    setSending(commentId);
    try {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/${commentId}/replies`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ message: text, access_token: token }),
        }
      );
      if (res.ok) {
        setSent((prev) => new Set(prev).add(commentId));
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
        setReplyingTo(null);
      }
    } finally {
      setSending(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-zinc-500 text-sm">Loading comments...</p>
      </div>
    );
  }

  if (!comments.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 max-w-sm mx-auto text-center">
        <p className="text-zinc-400 text-sm">{error || "No comments yet"}</p>
        {error && (
          <p className="text-zinc-600 text-xs">
            Go to developers.facebook.com → your app → App Review to request production access.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-zinc-900 rounded-2xl p-4 space-y-3">
          {/* Post context */}
          <a href={comment.postPermalink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 group w-fit">
            {comment.postThumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={comment.postThumb} alt="" className="w-7 h-7 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex-shrink-0" />
            )}
            <p className="text-zinc-600 text-xs truncate max-w-sm group-hover:text-zinc-400 transition-colors">
              {comment.postCaption || "No caption"}
            </p>
          </a>

          {/* Comment */}
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-zinc-500 text-xs">{comment.username?.[0]?.toUpperCase() ?? "?"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-white text-sm font-medium">@{comment.username}</span>
                <span className="text-zinc-600 text-xs">{timeAgo(comment.timestamp)}</span>
              </div>
              <p className="text-zinc-300 text-sm mt-0.5 leading-snug">{comment.text}</p>

              {/* Existing replies */}
              {comment.replies?.data && comment.replies.data.length > 0 && (
                <div className="mt-2 space-y-1.5 pl-3 border-l border-zinc-800">
                  {comment.replies.data.map((reply) => (
                    <div key={reply.id}>
                      <span className="text-zinc-400 text-xs font-medium">@{reply.username}</span>
                      <span className="text-zinc-600 text-xs ml-2">{timeAgo(reply.timestamp)}</span>
                      <p className="text-zinc-400 text-xs mt-0.5">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply sent confirmation */}
              {sent.has(comment.id) && (
                <p className="text-emerald-500 text-xs mt-2">Reply sent</p>
              )}

              {/* Reply input */}
              {replyingTo === comment.id ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText[comment.id] || ""}
                    onChange={(e) => setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") sendReply(comment.id); if (e.key === "Escape") setReplyingTo(null); }}
                    className="flex-1 bg-zinc-800 text-white text-sm rounded-full px-4 py-1.5 outline-none placeholder-zinc-600 focus:ring-1 focus:ring-zinc-600"
                  />
                  <button
                    onClick={() => sendReply(comment.id)}
                    disabled={!replyText[comment.id]?.trim() || sending === comment.id}
                    className="text-xs font-medium text-white bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {sending === comment.id ? "..." : "Reply"}
                  </button>
                  <button onClick={() => setReplyingTo(null)} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Cancel</button>
                </div>
              ) : (
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="mt-1.5 text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

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
  const [activeTab, setActiveTab] = useState<Tab>("stats");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      window.history.replaceState({}, "", "/insta/dashboard");
      fetch(`https://graph.instagram.com/v21.0/me?fields=id,username,name,profile_picture_url&access_token=${urlToken}`)
        .then((r) => r.json())
        .then((data) => {
          const account: StoredAccount = { username: data.username, name: data.name, profile_picture_url: data.profile_picture_url, token: urlToken };
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
    if (storedAccounts.length === 0) { router.push("/insta"); return; }
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
          `https://graph.instagram.com/v21.0/me?fields=id,username,name,biography,followers_count,follows_count,media_count,profile_picture_url,website&access_token=${token}`
        );
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        setProfile(await profileRes.json());

        const mediaRes = await fetch(
          `https://graph.instagram.com/v21.0/me/media?fields=id,caption,media_type,thumbnail_url,media_url,timestamp,like_count,comments_count,permalink&limit=50&access_token=${token}`
        );
        if (!mediaRes.ok) throw new Error("Failed to fetch media");
        const mediaData = await mediaRes.json();
        const posts: MediaItem[] = (mediaData.data || []).map((p: MediaItem) => ({
          ...p,
          thumbnail_url: p.thumbnail_url || p.media_url,
        }));

        const enriched = await Promise.all(
          posts.map(async (post) => {
            const isReel = post.media_type === "REELS";
            const isVideo = post.media_type === "VIDEO";
            const supportsFollows = post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM";
            const metrics = isReel
              ? "reach,views,shares,saved,ig_reels_avg_watch_time"
              : isVideo
              ? "reach,views,shares,saved"
              : "reach,shares,saved,follows";
            try {
              const insightRes = await fetch(
                `https://graph.instagram.com/v21.0/${post.id}/insights?metric=${metrics}&access_token=${token}`
              );
              const insightData = await insightRes.json();
              if (!insightRes.ok) { console.error(`[insights error] ${post.id}:`, JSON.stringify(insightData)); return post; }
              const map: Record<string, number> = {};
              for (const item of (insightData.data || [])) {
                map[item.name] = typeof item.value === "number" ? item.value : (item.values?.[0]?.value ?? 0);
              }
              return {
                ...post,
                reach: map.reach ?? undefined,
                views: map.views ?? undefined,
                shares: map.shares ?? undefined,
                saved: map.saved ?? undefined,
                follows: supportsFollows ? (map.follows ?? undefined) : undefined,
              };
            } catch { return post; }
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
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  function switchAccount(username: string) {
    const account = accounts.find((a) => a.username === username);
    if (!account) return;
    localStorage.setItem(ACTIVE_KEY, username);
    setActiveUsername(username);
    setToken(account.token);
    setMenuOpen(false);
  }

  function addAccount() { setMenuOpen(false); router.push("/insta?add=1"); }

  function disconnectAccount(username: string) {
    removeAccount(username);
    const remaining = getAccounts();
    setAccounts(remaining);
    if (remaining.length === 0) { localStorage.removeItem(ACTIVE_KEY); router.push("/insta"); }
    else {
      const next = remaining[0];
      localStorage.setItem(ACTIVE_KEY, next.username);
      setActiveUsername(next.username);
      setToken(next.token);
    }
    setMenuOpen(false);
  }

  const sortedMedia = [...media].sort((a, b) => {
    const aVal = sortKey === "timestamp" ? new Date(a.timestamp).getTime() : (a[sortKey as keyof MediaItem] as number ?? -1);
    const bVal = sortKey === "timestamp" ? new Date(b.timestamp).getTime() : (b[sortKey as keyof MediaItem] as number ?? -1);
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
          <button onClick={() => disconnectAccount(activeUsername!)} className="text-zinc-500 text-xs underline">
            Reconnect Instagram
          </button>
        </div>
      </main>
    );
  }

  const avgEngagement = media.length > 0
    ? Math.round(media.reduce((sum, p) => sum + p.like_count + p.comments_count, 0) / media.length) : 0;
  const engagementRate = profile && profile.followers_count > 0
    ? ((avgEngagement / profile.followers_count) * 100).toFixed(2) : "0.00";
  const totalComments = media.reduce((sum, p) => sum + p.comments_count, 0);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="relative" ref={menuRef}>
            <button onClick={() => setMenuOpen((o) => !o)} className="flex items-center gap-4 group">
              {profile?.profile_picture_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profile_picture_url} alt={profile.username} className="w-14 h-14 rounded-full object-cover" />
              )}
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">@{profile?.username}</h1>
                  <svg className={`w-4 h-4 text-zinc-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-sm">{profile?.name}</p>
              </div>
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl z-10">
                {accounts.filter((a) => a.username !== activeUsername).map((a) => (
                  <button key={a.username} onClick={() => switchAccount(a.username)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.profile_picture_url} alt={a.username} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-sm text-white">@{a.username}</p>
                      <p className="text-xs text-zinc-500">{a.name}</p>
                    </div>
                  </button>
                ))}
                {accounts.filter((a) => a.username !== activeUsername).length > 0 && <div className="border-t border-zinc-800" />}
                <button onClick={addAccount} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-300">Add account</p>
                </button>
                <div className="border-t border-zinc-800" />
                <button onClick={() => disconnectAccount(activeUsername!)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left">
                  <p className="text-sm text-red-400">Disconnect @{activeUsername}</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-zinc-800 -mb-4">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "stats" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px flex items-center gap-2 ${activeTab === "comments" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
          >
            Comments
            {totalComments > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "comments" ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"}`}>
                {totalComments.toLocaleString()}
              </span>
            )}
          </button>
        </div>

        {activeTab === "stats" && (
          <div className="space-y-8">
            {/* KPI cards */}
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

            {/* Follower graph */}
            {token && <FollowerGraph token={token} />}

            {/* Post performance table */}
            <div className="space-y-4">
              <h2 className="text-sm font-medium text-zinc-400">Post performance</h2>
              <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-zinc-500 font-normal px-4 py-3 w-10"></th>
                      <th className="text-left text-zinc-500 font-normal px-4 py-3">Caption</th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("reach")}>Reach <SortIcon active={sortKey === "reach"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("views")}>Views <SortIcon active={sortKey === "views"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("like_count")}>Likes <SortIcon active={sortKey === "like_count"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("comments_count")}>Comments <SortIcon active={sortKey === "comments_count"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("shares")}>Shares <SortIcon active={sortKey === "shares"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("saved")}>Saved <SortIcon active={sortKey === "saved"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("follows")}>Followers <SortIcon active={sortKey === "follows"} dir={sortDir} /></th>
                      <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("timestamp")}>Date <SortIcon active={sortKey === "timestamp"} dir={sortDir} /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMedia.map((post, i) => (
                      <tr key={post.id} className={`hover:bg-zinc-800/50 transition-colors ${i < sortedMedia.length - 1 ? "border-b border-zinc-800" : ""}`}>
                        <td className="px-4 py-2.5">
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                            {(post.thumbnail_url || post.media_url) ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={post.thumbnail_url || post.media_url} alt="" className="w-9 h-9 rounded-lg object-cover" />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
                                {post.media_type === "VIDEO" ? "▶" : "□"}
                              </div>
                            )}
                          </a>
                        </td>
                        <td className="px-4 py-2.5 text-zinc-300 max-w-xs">
                          <a href={post.permalink} target="_blank" rel="noopener noreferrer"
                            className="hover:text-white transition-colors line-clamp-2 leading-snug">
                            {post.caption || <span className="text-zinc-600">No caption</span>}
                          </a>
                        </td>
                        <td className="px-4 py-2.5 text-right text-zinc-400">{post.reach != null ? post.reach.toLocaleString() : <span className="text-zinc-700">—</span>}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-400">{post.views != null ? post.views.toLocaleString() : <span className="text-zinc-700">—</span>}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-300">{post.like_count.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-300">{post.comments_count.toLocaleString()}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-400">{post.shares != null ? post.shares.toLocaleString() : <span className="text-zinc-700">—</span>}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-400">{post.saved != null ? post.saved.toLocaleString() : <span className="text-zinc-700">—</span>}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-400">{post.follows != null ? post.follows.toLocaleString() : <span className="text-zinc-700">—</span>}</td>
                        <td className="px-4 py-2.5 text-right text-zinc-500 whitespace-nowrap">
                          {new Date(post.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "comments" && token && (
          <CommentsTab token={token} media={media} />
        )}

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
