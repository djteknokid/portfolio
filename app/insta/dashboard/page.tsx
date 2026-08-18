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
type Tab = "stats" | "comments" | "audience" | "ideas";

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

    // Debug: log all media types and comment counts
    console.log("[comments] media types:", media.map(p => `${p.media_type}(${p.comments_count})`));

    // Check token permissions first
    fetch(`https://graph.instagram.com/v21.0/me?fields=id,username&access_token=${token}`)
      .then(r => r.json())
      .then(d => console.log("[comments] token check:", JSON.stringify(d)));

    // Include all post types
    const postsWithComments = media
      .filter((p) => p.comments_count > 0)
      .slice(0, 5);

    console.log("[comments] posts with comments:", postsWithComments.map(p => `${p.id} type=${p.media_type} count=${p.comments_count}`));

    if (postsWithComments.length === 0) {
      setError("No posts with comments found.");
      setLoading(false);
      return;
    }

    async function fetchComments(postId: string): Promise<Comment[]> {
      const url =
        `https://graph.instagram.com/v21.0/${postId}/comments` +
        `?fields=id,text,username,timestamp,replies{id,text,username,timestamp}` +
        `&limit=50` +
        `&access_token=${token}`;
      const json = await fetch(url).then(r => r.json());
      console.log(`[comments] post ${postId} page 1:`, JSON.stringify(json).slice(0, 300));
      if (json.error || !json.data) return [];
      // Stop immediately if first page is empty — no infinite pagination
      if (json.data.length === 0) return [];
      return json.data;
    }

    Promise.all(
      postsWithComments.map(async (post) => {
        const comments = await fetchComments(post.id);
        return comments.map((c: Comment) => ({
          ...c,
          like_count: 0,
          postId: post.id,
          postCaption: post.caption,
          postThumb: post.thumbnail_url || post.media_url,
          postPermalink: post.permalink,
        }));
      })
    ).then((results) => {
      const flat: Comment[] = results.flat();
      flat.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setComments(flat);
      if (flat.length === 0 && postsWithComments.length > 0) {
        setError(`No comments returned by Instagram API. This can happen if comments are disabled on your posts, or if the token needs to be refreshed. Try disconnecting and reconnecting your account.`);
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
            Check Instagram Settings → Privacy → Comments to make sure comments are enabled.
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

// ─── AudienceTab ──────────────────────────────────────────────────────────────

interface DemographicResult {
  dimension_values: string[];
  value: number;
}

interface AudienceData {
  gender: { label: string; value: number; pct: number }[];
  age: { label: string; value: number; pct: number }[];
  country: { label: string; value: number; pct: number }[];
  city: { label: string; value: number; pct: number }[];
  follows: { date: string; follows: number; unfollows: number }[];
  onlineHours: { hour: number; value: number }[];
}

function BarRow({ label, pct, value }: { label: string; pct: number; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-zinc-400 text-xs w-24 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-zinc-400 text-xs w-10 text-right shrink-0">{pct.toFixed(1)}%</span>
      <span className="text-zinc-600 text-xs w-14 text-right shrink-0">{value.toLocaleString()}</span>
    </div>
  );
}

function AudienceTab({ token, igUserId }: { token: string; igUserId: string }) {
  const [data, setData] = useState<AudienceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !igUserId) return;

    async function fetchDemographic(metric: string, breakdown: string) {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/${igUserId}/insights` +
          `?metric=${metric}&period=lifetime&timeframe=last_30_days` +
          `&breakdown=${breakdown}&metric_type=total_value` +
          `&access_token=${token}`
      );
      const json = await res.json();
      if (json.error) throw new Error(json.error.message);
      const results: DemographicResult[] = json.data?.[0]?.total_value?.breakdowns?.[0]?.results || [];
      const total = results.reduce((s, r) => s + r.value, 0);
      return results
        .map((r) => ({ label: r.dimension_values[0], value: r.value, pct: total > 0 ? (r.value / total) * 100 : 0 }))
        .sort((a, b) => b.value - a.value);
    }

    async function fetchFollowActivity() {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/${igUserId}/insights` +
          `?metric=follows_and_unfollows&period=day&since=${Math.floor(Date.now() / 1000) - 30 * 86400}` +
          `&until=${Math.floor(Date.now() / 1000)}&breakdown=follow_type&metric_type=total_value` +
          `&access_token=${token}`
      );
      const json = await res.json();
      if (json.error) return [];
      return (json.data || []).map((d: { end_time: string; total_value: { breakdowns: { results: { dimension_values: string[]; value: number }[] }[] } }) => {
        const results = d.total_value?.breakdowns?.[0]?.results || [];
        const follows = results.find((r: { dimension_values: string[] }) => r.dimension_values[0] === "FOLLOW")?.value || 0;
        const unfollows = results.find((r: { dimension_values: string[] }) => r.dimension_values[0] === "UNFOLLOW")?.value || 0;
        return { date: d.end_time?.slice(0, 10), follows, unfollows };
      });
    }

    async function fetchOnlineFollowers() {
      const res = await fetch(
        `https://graph.instagram.com/v21.0/${igUserId}/insights` +
          `?metric=online_followers&period=lifetime&access_token=${token}`
      );
      const json = await res.json();
      if (json.error) return [];
      const hourData = json.data?.[0]?.values?.[0]?.value || {};
      return Object.entries(hourData).map(([hour, value]) => ({ hour: parseInt(hour), value: value as number }));
    }

    Promise.all([
      fetchDemographic("follower_demographics", "gender").catch(() => []),
      fetchDemographic("follower_demographics", "age").catch(() => []),
      fetchDemographic("follower_demographics", "country").catch(() => []),
      fetchDemographic("follower_demographics", "city").catch(() => []),
      fetchFollowActivity().catch(() => []),
      fetchOnlineFollowers().catch(() => []),
    ]).then(([gender, age, country, city, follows, onlineHours]) => {
      setData({ gender, age, country, city, follows, onlineHours });
    }).catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, igUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-zinc-500 text-sm">Loading audience data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <p className="text-zinc-500 text-sm">Could not load audience data</p>
        <p className="text-zinc-700 text-xs max-w-xs text-center">{error}</p>
      </div>
    );
  }

  const noData = !data.gender.length && !data.age.length && !data.country.length;

  if (noData) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <p className="text-zinc-500 text-sm">No audience data available yet</p>
        <p className="text-zinc-700 text-xs max-w-xs text-center">Instagram requires at least 100 followers and may take up to 48 hours to populate demographic data.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Gender */}
      {data.gender.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 space-y-4">
          <p className="text-white text-sm font-medium">Gender</p>
          <div className="space-y-3">
            {data.gender.map((g) => (
              <BarRow key={g.label} label={g.label === "M" ? "Male" : g.label === "F" ? "Female" : "Unknown"} pct={g.pct} value={g.value} />
            ))}
          </div>
        </div>
      )}

      {/* Age */}
      {data.age.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 space-y-4">
          <p className="text-white text-sm font-medium">Age</p>
          <div className="space-y-3">
            {data.age.map((a) => (
              <BarRow key={a.label} label={a.label} pct={a.pct} value={a.value} />
            ))}
          </div>
        </div>
      )}

      {/* Top Countries */}
      {data.country.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 space-y-4">
          <p className="text-white text-sm font-medium">Top Countries</p>
          <div className="space-y-3">
            {data.country.slice(0, 10).map((c) => (
              <BarRow key={c.label} label={c.label} pct={c.pct} value={c.value} />
            ))}
          </div>
        </div>
      )}

      {/* Top Cities */}
      {data.city.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 space-y-4">
          <p className="text-white text-sm font-medium">Top Cities</p>
          <div className="space-y-3">
            {data.city.slice(0, 10).map((c) => (
              <BarRow key={c.label} label={c.label} pct={c.pct} value={c.value} />
            ))}
          </div>
        </div>
      )}

      {/* Follow / Unfollow activity */}
      {data.follows.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 space-y-4 md:col-span-2">
          <p className="text-white text-sm font-medium">Follows & Unfollows — Last 30 Days</p>
          <div className="overflow-x-auto">
            <div className="flex items-end gap-1 h-20 min-w-max">
              {data.follows.slice(-30).map((d) => {
                const max = Math.max(...data.follows.map((f) => Math.max(f.follows, f.unfollows)), 1);
                return (
                  <div key={d.date} className="flex gap-0.5 items-end" title={`${d.date}: +${d.follows} -${d.unfollows}`}>
                    <div className="w-2 bg-white rounded-sm" style={{ height: `${(d.follows / max) * 100}%` }} />
                    <div className="w-2 bg-zinc-600 rounded-sm" style={{ height: `${(d.unfollows / max) * 100}%` }} />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-white" /><span className="text-zinc-500 text-xs">Follows</span></div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-zinc-600" /><span className="text-zinc-500 text-xs">Unfollows</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Online followers by hour */}
      {data.onlineHours.length > 0 && (
        <div className="bg-zinc-900 rounded-2xl p-5 space-y-4 md:col-span-2">
          <p className="text-white text-sm font-medium">When Your Followers Are Online</p>
          <div className="flex items-end gap-1 h-16">
            {Array.from({ length: 24 }, (_, h) => {
              const point = data.onlineHours.find((o) => o.hour === h);
              const max = Math.max(...data.onlineHours.map((o) => o.value), 1);
              const pct = point ? (point.value / max) * 100 : 0;
              return (
                <div key={h} className="flex-1 flex flex-col items-center gap-1" title={`${h}:00 — ${point?.value.toLocaleString() || 0} online`}>
                  <div className="w-full rounded-sm bg-white transition-all" style={{ height: `${pct}%`, minHeight: pct > 0 ? "2px" : "0" }} />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-zinc-600 text-xs">
            <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── IdeasTab ─────────────────────────────────────────────────────────────────

interface ContentIdea {
  number: number;
  title: string;
  description: string;
  execution: string;
  format: string;
  hook: string;
}

function IdeasTab({ username, media, token, igUserId }: { username: string; media: MediaItem[]; token: string; igUserId: string }) {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const topPosts = [...media]
    .filter((p) => (p.reach ?? 0) > 0 || (p.views ?? 0) > 0 || (p.like_count ?? 0) > 0)
    .sort((a, b) => (b.reach ?? b.views ?? 0) - (a.reach ?? a.views ?? 0))
    .slice(0, 20);

  async function fetchAudience() {
    const base = `https://graph.instagram.com/v21.0/${igUserId}/insights`;
    const params = `&period=lifetime&timeframe=last_30_days&metric_type=total_value&access_token=${token}`;
    const [genderRes, ageRes, countryRes] = await Promise.all([
      fetch(`${base}?metric=follower_demographics&breakdown=gender${params}`).then(r => r.json()),
      fetch(`${base}?metric=follower_demographics&breakdown=age${params}`).then(r => r.json()),
      fetch(`${base}?metric=follower_demographics&breakdown=country${params}`).then(r => r.json()),
    ]);

    const extract = (res: { data?: { name: string; total_value?: { breakdowns?: { dimension_values: string[]; value: number }[] } }[] }) => {
      const breakdowns = res?.data?.[0]?.total_value?.breakdowns ?? [];
      return breakdowns.map((b: { dimension_values: string[]; value: number }) => ({
        label: b.dimension_values[0],
        value: b.value,
      })).sort((a: { value: number }, b: { value: number }) => b.value - a.value).slice(0, 5);
    };

    return {
      gender: extract(genderRes),
      age: extract(ageRes),
      topCountries: extract(countryRes),
    };
  }

  async function generate() {
    setLoading(true);
    setError(null);
    setIdeas([]);

    const postSummary = topPosts.map((p, i) => ({
      rank: i + 1,
      caption: p.caption?.slice(0, 150) || "(no caption)",
      type: p.media_type,
      date: p.timestamp?.slice(0, 10),
      likes: p.like_count,
      comments: p.comments_count,
      reach: p.reach,
      views: p.views,
      shares: p.shares,
      saved: p.saved,
    }));

    let audienceContext = "";
    try {
      const audience = await fetchAudience();
      audienceContext = `
AUDIENCE DEMOGRAPHICS (last 30 days):
- Gender breakdown: ${audience.gender.map((g: { label: string; value: number }) => `${g.label}: ${g.value}`).join(", ")}
- Age breakdown: ${audience.age.map((a: { label: string; value: number }) => `${a.label}: ${a.value}`).join(", ")}
- Top countries: ${audience.topCountries.map((c: { label: string; value: number }) => `${c.label}: ${c.value}`).join(", ")}`;
    } catch {
      audienceContext = "";
    }

    const prompt = `You are a specialist Instagram content strategist for @${username}, a VJ and electronic music artist account.

YOUR JOB: Generate 5 content ideas that explore COMPLETELY DIFFERENT territory from what this account has already posted. Not behind-the-scenes versions of existing content. Not the same themes with a different angle. Genuinely new directions.

WHAT THEY ALREADY POST (do NOT suggest variations of these):
${postSummary.map(p => `- ${p.caption}`).filter(c => c !== "- (no caption)").slice(0, 10).join("\n")}
${audienceContext}

RULES:
- Each idea must be a topic or format this account has NOT explored yet
- Name specific references — real artists, real shows, real events, real places — based on what fits a VJ/electronic music audience in their top countries
- No "behind the scenes", no "day in the life", no variations of their existing content
- Think: what does their audience care about OUTSIDE of what this account currently covers?
- Make each of the 5 ideas feel like it opens a completely new content category for this account

Return a JSON array of exactly 5 objects:
- number: 1-5
- title: Specific idea title with real names (e.g. "Why Aphex Twin's Windowlicker Video Changed VJing Forever" not "Classic Music Video Analysis")
- description: Why this new direction will resonate with their specific audience — cite their demographic data
- execution: 4 concrete steps to make this exact post
- format: One of: Reel, Carousel, Photo, Story
- hook: The exact first line or visual that grabs attention in 2 seconds

Return ONLY the JSON array, no other text.`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          username,
          stats: { topPosts: postSummary },
          noHistory: true,
        }),
      });
      const data = await res.json();
      const raw = data.reply || "";
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Invalid response format");
      const parsed: ContentIdea[] = JSON.parse(match[0]);
      setIdeas(parsed);
      setGenerated(true);
    } catch {
      setError("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formatColor: Record<string, string> = {
    Reel: "text-purple-400 bg-purple-400/10",
    Carousel: "text-blue-400 bg-blue-400/10",
    Photo: "text-green-400 bg-green-400/10",
    Story: "text-amber-400 bg-amber-400/10",
  };

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-white text-lg font-semibold">Content Ideas</h2>
          <p className="text-zinc-500 text-sm">
            {generated
              ? `5 new directions for your account`
              : `5 ideas in completely new territory for your account`}
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Analyzing...
            </>
          ) : generated ? (
            "Regenerate"
          ) : (
            "Generate 5 Ideas"
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-zinc-800 rounded-full" />
                <div className="h-4 bg-zinc-800 rounded w-48" />
                <div className="h-5 bg-zinc-800 rounded-full w-16 ml-auto" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ideas list */}
      {!loading && ideas.length > 0 && (
        <div className="grid gap-3">
          {ideas.map((idea) => (
            <div
              key={idea.number}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-transparent hover:border-zinc-700 transition-colors"
            >
              {/* Summary row */}
              <button
                onClick={() => setExpanded(expanded === idea.number ? null : idea.number)}
                className="w-full text-left px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-sm font-mono w-6 shrink-0">{String(idea.number).padStart(2, "0")}</span>
                  <span className="text-white text-sm font-medium flex-1">{idea.title}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${formatColor[idea.format] || "text-zinc-400 bg-zinc-800"}`}>
                    {idea.format}
                  </span>
                  <svg
                    className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform ${expanded === idea.number ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-xs mt-1.5 ml-9 text-left line-clamp-1">{idea.description}</p>
              </button>

              {/* Expanded detail */}
              {expanded === idea.number && (
                <div className="px-5 pb-5 ml-9 space-y-4 border-t border-zinc-800 pt-4">
                  {/* Hook */}
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Opening Hook</p>
                    <p className="text-white text-sm bg-zinc-800 rounded-xl px-4 py-3 italic">"{idea.hook}"</p>
                  </div>
                  {/* Description */}
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Why This Works</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">{idea.description}</p>
                  </div>
                  {/* Execution */}
                  <div className="space-y-2">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">How To Execute</p>
                    <div className="space-y-2">
                      {idea.execution.split(/\n|\d+\.\s+/).filter(s => s.trim()).map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <span className="text-zinc-600 text-xs font-mono mt-0.5 shrink-0">{i + 1}.</span>
                          <p className="text-zinc-300 text-sm leading-relaxed">{step.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !generated && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="text-zinc-600 text-sm">Hit Generate to get 5 ideas in completely new territory<br />based on your audience demographics.</p>
        </div>
      )}
    </div>
  );
}

// ─── ChatBot ──────────────────────────────────────────────────────────────────

interface ChatMessage { role: "user" | "assistant"; content: string; }

function ChatBot({ username, stats }: { username: string; stats: object }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, username, stats }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Sorry, something went wrong." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Network error. Please try again." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-100 transition-colors z-50"
      >
        {open ? (
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-22 right-6 w-80 bg-zinc-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-zinc-800" style={{ height: "460px" }}>
          {/* Header */}
          <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Stats Assistant</p>
              <p className="text-zinc-500 text-xs">@{username}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-2 pt-4">
                <p className="text-zinc-500 text-xs text-center">Ask anything about your stats</p>
                {["Which post got the most reach?", "What's my best performing reel?", "How is my engagement rate?"].map((q) => (
                  <button key={q} onClick={() => { setInput(q); }} className="w-full text-left text-xs text-zinc-400 bg-zinc-800 hover:bg-zinc-700 px-3 py-2 rounded-xl transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                  m.role === "user" ? "bg-white text-black" : "bg-zinc-800 text-zinc-100"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 px-3 py-2 rounded-2xl">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-zinc-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about your stats..."
              className="flex-1 bg-zinc-800 text-white text-sm px-3 py-2 rounded-xl outline-none placeholder-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <button
              onClick={send}
              disabled={!input.trim() || sending}
              className="w-8 h-8 bg-white rounded-xl flex items-center justify-center disabled:opacity-30 hover:bg-zinc-100 transition-colors flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
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
          <button
            onClick={() => setActiveTab("audience")}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "audience" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
          >
            Audience
          </button>
          <button
            onClick={() => setActiveTab("ideas")}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === "ideas" ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
          >
            Ideas
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

        {activeTab === "audience" && token && profile && (
          <AudienceTab token={token} igUserId={profile.id} />
        )}

        {activeTab === "ideas" && profile && (
          <IdeasTab username={activeUsername!} media={media} token={token!} igUserId={profile.id} />
        )}

      </div>

      {/* Chatbot — always visible when logged in */}
      {activeUsername && profile && (
        <ChatBot
          username={activeUsername}
          stats={{
            profile: {
              username: profile.username,
              followers: profile.followers_count,
              following: profile.follows_count,
              posts: profile.media_count,
            },
            recentPosts: media.slice(0, 30).map((p) => ({
              id: p.id,
              type: p.media_type,
              caption: p.caption?.slice(0, 100),
              date: p.timestamp,
              likes: p.like_count,
              comments: p.comments_count,
              reach: p.reach,
              views: p.views,
              shares: p.shares,
              saved: p.saved,
              follows: p.follows,
            })),
          }}
        />
      )}
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
