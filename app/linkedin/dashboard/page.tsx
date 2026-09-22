"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Profile {
  id: string;
  name: string;
  headline: string;
  profilePicture: string;
  connectionsCount: number;
}

interface Post {
  id: string;
  urn: string;
  text: string;
  timestamp: string;
  likeCount: number;
  commentCount: number;
  repostCount: number;
  permalink: string;
}

interface Comment {
  id: string;
  text: string;
  authorName: string;
  timestamp: string;
  postId: string;
  postText?: string;
}

interface StoredAccount {
  name: string;
  token: string;
  profilePicture: string;
  headline: string;
  id: string;
}

type SortKey = "timestamp" | "likeCount" | "commentCount" | "repostCount";
type SortDir = "asc" | "desc";
type Tab = "stats" | "comments" | "ideas" | "simulate";

const ACCOUNTS_KEY = "li_accounts";
const ACTIVE_KEY = "li_active_id";

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
  const idx = accounts.findIndex((a) => a.id === account.id);
  if (idx >= 0) accounts[idx] = account;
  else accounts.push(account);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function removeAccount(id: string) {
  const accounts = getAccounts().filter((a) => a.id !== id);
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

// ─── SortIcon ─────────────────────────────────────────────────────────────────

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

// ─── CommentsTab ──────────────────────────────────────────────────────────────

function CommentsTab({ token, posts, profile }: { token: string; posts: Post[]; profile: Profile }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sending, setSending] = useState<string | null>(null);
  const [sent, setSent] = useState<Set<string>>(new Set());
  const [suggesting, setSuggesting] = useState<string | null>(null);

  useEffect(() => {
    if (!posts.length) { setLoading(false); return; }

    const postsWithComments = posts.filter((p) => p.commentCount > 0).slice(0, 5);
    if (!postsWithComments.length) {
      setError("No posts with comments found.");
      setLoading(false);
      return;
    }

    Promise.all(
      postsWithComments.map(async (post) => {
        const res = await fetch(`/api/linkedin/comments?postUrn=${encodeURIComponent(post.urn)}&token=${token}`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.comments || []).map((c: Comment) => ({
          ...c,
          postId: post.id,
          postText: post.text,
        }));
      })
    ).then((results) => {
      const flat: Comment[] = results.flat();
      flat.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setComments(flat);
      if (!flat.length) setError("No comments returned. Try reconnecting your account.");
    }).catch(() => setError("Failed to load comments."))
      .finally(() => setLoading(false));
  }, [token, posts]);

  async function sendReply(commentId: string, postUrn: string) {
    const text = replyText[commentId]?.trim();
    if (!text) return;
    setSending(commentId);
    try {
      const res = await fetch("/api/linkedin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, postUrn, text, token }),
      });
      if (res.ok) {
        setSent((prev) => new Set(prev).add(commentId));
        setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      }
    } finally {
      setSending(null);
    }
  }

  async function suggestReply(comment: Comment) {
    setSuggesting(comment.id);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Reply to this LinkedIn comment as ${profile.name}.

Headline: "${profile.headline || ""}"
Post: "${comment.postText?.slice(0, 100) || ""}"
Comment: "${comment.text}"

Write a reply. Max 20 words. Sound like a real professional, not AI. Match the tone of the post. No filler phrases. Just the reply text, nothing else.`,
          username: profile.name,
          stats: {},
          noHistory: true,
        }),
      });
      const data = await res.json();
      const suggestion = data.reply?.trim().replace(/^["']|["']$/g, "") || "";
      if (suggestion) setReplyText((prev) => ({ ...prev, [comment.id]: suggestion }));
    } finally {
      setSuggesting(null);
    }
  }

  if (loading) return <div className="flex items-center justify-center py-24"><p className="text-zinc-500 text-sm">Loading comments...</p></div>;

  if (!comments.length) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 max-w-sm mx-auto text-center">
      <p className="text-zinc-400 text-sm">{error || "No comments yet"}</p>
    </div>
  );

  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-zinc-900 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <p className="text-zinc-400 text-xs truncate max-w-sm">{comment.postText || "Post"}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-zinc-300 text-xs">{comment.authorName?.[0]?.toUpperCase() || "?"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-white text-sm font-medium">{comment.authorName}</span>
                <span className="text-zinc-500 text-xs">{timeAgo(comment.timestamp)}</span>
              </div>
              <p className="text-white text-sm mt-0.5 leading-snug">{comment.text}</p>
              {sent.has(comment.id) && <p className="text-emerald-500 text-xs mt-2">Reply sent</p>}
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Reply..."
                  value={replyText[comment.id] || ""}
                  onChange={(e) => setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === "Enter") sendReply(comment.id, comment.postId); }}
                  className="flex-1 bg-zinc-800 text-white text-sm rounded-full px-4 py-1.5 outline-none placeholder-zinc-600 focus:ring-1 focus:ring-zinc-600"
                />
                <button
                  onClick={() => suggestReply(comment)}
                  disabled={suggesting === comment.id}
                  className="text-xs font-medium text-zinc-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white disabled:opacity-40 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  {suggesting === comment.id ? (
                    <><span className="w-2.5 h-2.5 border border-zinc-500 border-t-white rounded-full animate-spin" />AI</>
                  ) : "✦ AI"}
                </button>
                <button
                  onClick={() => sendReply(comment.id, comment.postId)}
                  disabled={!replyText[comment.id]?.trim() || sending === comment.id}
                  className="text-xs font-medium text-white bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 px-3 py-1.5 rounded-full transition-colors"
                >
                  {sending === comment.id ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
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

function IdeasTab({ name, posts }: { name: string; posts: Post[] }) {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const topPosts = [...posts]
    .sort((a, b) => (b.likeCount + b.commentCount + b.repostCount) - (a.likeCount + a.commentCount + a.repostCount))
    .slice(0, 20);

  async function generate() {
    setLoading(true);
    setError(null);
    setIdeas([]);

    const postSummary = topPosts.map((p, i) => ({
      rank: i + 1,
      text: p.text?.slice(0, 150) || "(no text)",
      date: p.timestamp?.slice(0, 10),
      likes: p.likeCount,
      comments: p.commentCount,
      reposts: p.repostCount,
    }));

    const prompt = `You are a LinkedIn content strategist. Analyze this person's top posts and generate 5 content ideas for what to post next.

TOP POSTS (by engagement):
${postSummary.map(p => `- [likes:${p.likes} comments:${p.comments} reposts:${p.reposts}] ${p.text}`).join("\n")}

STEP 1 — Read the posts carefully. What topics, professional themes, perspectives, and language does this person use? What makes their top posts resonate?

STEP 2 — Identify 5 specific things this person has NOT yet posted about, but that fit perfectly within the same professional world. Same tone, same audience, genuinely new territory.

CRITICAL RULES:
- Every title must reference something REAL — a real trend, concept, framework, or professional topic
- Match the exact language and tone of the posts
- The hook must sound like it was written by this person, not AI
- This is LinkedIn: professional, insightful, human — not hype

Return a JSON array of exactly 5 objects:
- number: 1-5
- title: Specific topic that hasn't been covered yet
- description: Why this will resonate with their LinkedIn audience
- execution: 4 concrete steps to write this post in the same style as their existing content
- format: One of: Text Post, Carousel, Poll, Video, Article
- hook: Opening line matching the tone and language of their actual posts

Return ONLY the JSON array, no other text.`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, username: name, stats: { topPosts: postSummary }, noHistory: true }),
      });
      const data = await res.json();
      const raw = data.reply || "";
      const match = raw.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Invalid response format");
      setIdeas(JSON.parse(match[0]));
      setGenerated(true);
    } catch {
      setError("Failed to generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const formatColor: Record<string, string> = {
    "Text Post": "text-blue-400 bg-blue-400/10",
    Carousel: "text-purple-400 bg-purple-400/10",
    Poll: "text-amber-400 bg-amber-400/10",
    Video: "text-green-400 bg-green-400/10",
    Article: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-white text-lg font-semibold">Content Ideas</h2>
          <p className="text-zinc-500 text-sm">
            {generated ? "5 new directions for your feed" : "5 ideas in completely new territory for your account"}
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 bg-white text-black text-sm font-medium px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />Analyzing...</>
          ) : generated ? "Regenerate" : "Generate 5 Ideas"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {loading && (
        <div className="grid gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-7 h-7 bg-zinc-800 rounded-full" />
                <div className="h-4 bg-zinc-800 rounded w-48" />
                <div className="h-5 bg-zinc-800 rounded-full w-20 ml-auto" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-3 bg-zinc-800 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && ideas.length > 0 && (
        <div className="grid gap-3">
          {ideas.map((idea) => (
            <div key={idea.number} className="bg-zinc-900 rounded-2xl overflow-hidden border border-transparent hover:border-zinc-700 transition-colors">
              <button onClick={() => setExpanded(expanded === idea.number ? null : idea.number)} className="w-full text-left px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-sm font-mono w-6 shrink-0">{String(idea.number).padStart(2, "0")}</span>
                  <span className="text-white text-sm font-medium flex-1">{idea.title}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${formatColor[idea.format] || "text-zinc-400 bg-zinc-800"}`}>{idea.format}</span>
                  <svg className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform ${expanded === idea.number ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="text-zinc-500 text-xs mt-1.5 ml-9 text-left line-clamp-1">{idea.description}</p>
              </button>
              {expanded === idea.number && (
                <div className="px-5 pb-5 ml-9 space-y-4 border-t border-zinc-800 pt-4">
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Opening Hook</p>
                    <p className="text-white text-sm bg-zinc-800 rounded-xl px-4 py-3 italic">"{idea.hook}"</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Why This Works</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">{idea.description}</p>
                  </div>
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

      {!loading && !generated && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="text-zinc-600 text-sm">Hit Generate to get 5 ideas in completely new territory<br />based on your top-performing posts.</p>
        </div>
      )}
    </div>
  );
}

// ─── SimulateTab ──────────────────────────────────────────────────────────────

interface PersonaReview { name: string; role: string; score: number; verdict: string; critique: string; }
interface SimulationResult { reach: string; likes: string; comments: string; reposts: string; verdict: string; reasoning: string; tips: string[]; personas: PersonaReview[]; }

function SimulateTab({ name, posts, profile }: { name: string; posts: Post[]; profile: Profile }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function callAI(message: string): Promise<string> {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, username: name, stats: {}, noHistory: true }),
    });
    const data = await res.json();
    return data.reply || "";
  }

  async function simulate() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
    const avgLikes = avg(posts.map(p => p.likeCount));
    const avgComments = avg(posts.map(p => p.commentCount));
    const avgReposts = avg(posts.map(p => p.repostCount));

    const top5 = [...posts].sort((a, b) => (b.likeCount + b.commentCount) - (a.likeCount + a.commentCount)).slice(0, 5)
      .map(p => ({ text: p.text?.slice(0, 80), likes: p.likeCount, comments: p.commentCount, reposts: p.repostCount }));

    const bottom5 = [...posts].sort((a, b) => (a.likeCount + a.commentCount) - (b.likeCount + b.commentCount)).slice(0, 5)
      .map(p => ({ text: p.text?.slice(0, 80), likes: p.likeCount, comments: p.commentCount }));

    const context = `
PROFILE: ${name} | ${profile.connectionsCount.toLocaleString()} connections
HEADLINE: "${profile.headline || ""}"

AVERAGES: likes ${avgLikes}, comments ${avgComments}, reposts ${avgReposts}

TOP 5 POSTS (highest engagement):
${top5.map(p => `- likes:${p.likes} comments:${p.comments} reposts:${p.reposts} — "${p.text}"`).join("\n")}

BOTTOM 5 POSTS (lowest engagement):
${bottom5.map(p => `- likes:${p.likes} comments:${p.comments} — "${p.text}"`).join("\n")}

PROPOSED POST: "${input}"`;

    try {
      setLoadingStep("Consulting experts...");
      const [skepticRaw, strategistRaw, audienceRaw] = await Promise.all([
        callAI(`You are The Skeptic — a blunt LinkedIn analyst whose job is to find reasons a post will underperform.

${context}

Look at the bottom 5 posts. Find patterns in what flopped. Then assess the proposed post ruthlessly.

Return a JSON object:
- score: integer 1-10
- verdict: one short sentence
- critique: 2-3 sentences of specific reasons this might underperform

Return ONLY the JSON, no other text.`),

        callAI(`You are The Strategist — a LinkedIn growth expert who evaluates content strategy.

${context}

Assess the proposed post. Is it share-worthy? Does it provoke thought or discussion? Is it differentiated?

Return a JSON object:
- score: integer 1-10
- verdict: one short sentence
- critique: 2-3 sentences on strategic strengths and weaknesses

Return ONLY the JSON, no other text.`),

        callAI(`You are The Audience Proxy — you reason as a real LinkedIn connection of this person.

${context}

Would you stop scrolling for this? Would you share it or comment? Be honest.

Return a JSON object:
- score: integer 1-10
- verdict: one short sentence as the audience
- critique: 2-3 sentences of honest perspective

Return ONLY the JSON, no other text.`),
      ]);

      const parsePersona = (raw: string, name: string, role: string): PersonaReview => {
        try {
          const match = raw.match(/\{[\s\S]*\}/);
          const parsed = JSON.parse(match![0]);
          return { name, role, score: parsed.score, verdict: parsed.verdict, critique: parsed.critique };
        } catch {
          return { name, role, score: 5, verdict: "Could not parse response", critique: raw.slice(0, 200) };
        }
      };

      const personas: PersonaReview[] = [
        parsePersona(skepticRaw, "The Skeptic", "Finds reasons it will flop"),
        parsePersona(strategistRaw, "The Strategist", "Evaluates content strategy"),
        parsePersona(audienceRaw, "The Audience", "Speaks as your connections"),
      ];

      setLoadingStep("Synthesizing final verdict...");
      const synthesisRaw = await callAI(`You are synthesizing a final performance prediction after three expert reviews.

${context}

EXPERT REVIEWS:
- The Skeptic (score ${personas[0].score}/10): "${personas[0].verdict}" — ${personas[0].critique}
- The Strategist (score ${personas[1].score}/10): "${personas[1].verdict}" — ${personas[1].critique}
- The Audience (score ${personas[2].score}/10): "${personas[2].verdict}" — ${personas[2].critique}

Produce the final prediction. Anchor to realistic numbers — not optimistic.

Return a JSON object:
- reach: predicted impressions range (e.g. "1,200–2,500")
- likes: predicted likes range
- comments: predicted comments range
- reposts: predicted reposts range
- verdict: one of exactly: "Below average", "Average", "Above average", "Viral potential"
- reasoning: 2-3 sentences synthesizing all three views
- tips: array of exactly 3 short, specific action items

Return ONLY the JSON object, no other text.`);

      const synthMatch = synthesisRaw.match(/\{[\s\S]*\}/);
      if (!synthMatch) throw new Error("Invalid synthesis response");
      setResult({ ...JSON.parse(synthMatch[0]), personas });
    } catch {
      setError("Simulation failed. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  }

  const verdictColor: Record<string, string> = {
    "Below average": "text-red-400",
    "Average": "text-zinc-400",
    "Above average": "text-emerald-400",
    "Viral potential": "text-purple-400",
  };
  const scoreColor = (s: number) => s >= 7 ? "text-emerald-400" : s >= 4 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-6 py-6">
      <div className="space-y-1">
        <h2 className="text-white text-lg font-semibold">Simulate a Post</h2>
        <p className="text-zinc-500 text-sm">3 expert perspectives stress-test your idea before you post it.</p>
      </div>
      <div className="space-y-3">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) simulate(); }}
          placeholder="e.g. A post about why most product roadmaps are actually backwards..."
          rows={4}
          className="w-full bg-zinc-900 text-white text-sm rounded-2xl px-4 py-3 outline-none placeholder-zinc-600 focus:ring-1 focus:ring-zinc-700 resize-none leading-relaxed"
        />
        <button
          onClick={simulate}
          disabled={!input.trim() || loading}
          className="flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <><span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />{loadingStep || "Simulating..."}</> : "Simulate"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {loading && (
        <div className="space-y-3 animate-pulse">
          <div className="grid grid-cols-3 gap-3">
            {["The Skeptic", "The Strategist", "The Audience"].map(n => (
              <div key={n} className="bg-zinc-900 rounded-2xl p-4 space-y-2">
                <div className="h-3 bg-zinc-800 rounded w-24" />
                <div className="h-8 bg-zinc-800 rounded w-12" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
              </div>
            ))}
          </div>
          <div className="bg-zinc-900 rounded-2xl p-5 space-y-3">
            <div className="h-5 bg-zinc-800 rounded w-32" />
            <div className="grid grid-cols-4 gap-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-zinc-800 rounded-xl" />)}</div>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {result.personas.map(p => (
              <div key={p.name} className="bg-zinc-900 rounded-2xl p-4 space-y-3">
                <div>
                  <p className="text-white text-sm font-medium">{p.name}</p>
                  <p className="text-zinc-600 text-xs">{p.role}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-bold ${scoreColor(p.score)}`}>{p.score}</span>
                  <span className="text-zinc-600 text-sm">/10</span>
                </div>
                <p className="text-zinc-400 text-xs font-medium">{p.verdict}</p>
                <p className="text-zinc-500 text-xs leading-relaxed">{p.critique}</p>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Final verdict</p>
              <p className={`text-xl font-semibold ${verdictColor[result.verdict] || "text-white"}`}>{result.verdict}</p>
            </div>
            <div className={`text-3xl font-bold opacity-20 ${verdictColor[result.verdict] || ""}`}>
              {result.verdict === "Viral potential" ? "↑↑" : result.verdict === "Above average" ? "↑" : result.verdict === "Below average" ? "↓" : "→"}
            </div>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-5 space-y-3">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Predicted Metrics</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Impressions", value: result.reach },
                { label: "Likes", value: result.likes },
                { label: "Comments", value: result.comments },
                { label: "Reposts", value: result.reposts },
              ].map(m => (
                <div key={m.label} className="bg-zinc-800 rounded-xl p-3 space-y-1">
                  <p className="text-zinc-500 text-xs">{m.label}</p>
                  <p className="text-white text-sm font-medium">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-5 space-y-2">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Synthesis</p>
            <p className="text-zinc-300 text-sm leading-relaxed">{result.reasoning}</p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-5 space-y-3">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">To Maximize Performance</p>
            <div className="space-y-2">
              {result.tips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-zinc-600 text-xs font-mono mt-0.5 shrink-0">{i + 1}.</span>
                  <p className="text-zinc-300 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && !result && (
        <div className="flex flex-col items-center justify-center py-24 gap-2 text-center">
          <p className="text-zinc-600 text-sm">Describe your post idea above and hit Simulate.<br />3 expert perspectives will stress-test it.</p>
        </div>
      )}
    </div>
  );
}

// ─── ChatBot ──────────────────────────────────────────────────────────────────

interface ChatMessage { role: "user" | "assistant"; content: string; }

function ChatBot({ name, stats, open, setOpen }: { name: string; stats: object; open: boolean; setOpen: (v: boolean) => void }) {
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
        body: JSON.stringify({ message: text, username: name, stats }),
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
    <div className="flex flex-col h-full border-l border-zinc-800 bg-black">
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between shrink-0">
        <div>
          <p className="text-white text-sm font-medium">Stats Assistant</p>
          <p className="text-zinc-500 text-xs">{name}</p>
        </div>
        <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors">
          <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-2 pt-4">
            <p className="text-zinc-500 text-xs text-center">Ask anything about your stats</p>
            {["Which post got the most engagement?", "What topics perform best for me?", "How is my posting consistency?"].map((q) => (
              <button key={q} onClick={() => setInput(q)} className="w-full text-left text-xs text-zinc-400 bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl transition-colors">
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-snug ${m.role === "user" ? "bg-white text-black" : "bg-zinc-900 text-zinc-100"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 px-3 py-2 rounded-2xl">
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
      <div className="px-3 py-3 border-t border-zinc-800 flex gap-2 shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about your stats..."
          className="flex-1 bg-zinc-900 text-white text-sm px-3 py-2 rounded-xl outline-none placeholder-zinc-600 focus:ring-1 focus:ring-zinc-700"
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
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<StoredAccount[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [chatOpen, setChatOpen] = useState(false);
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
      window.history.replaceState({}, "", "/linkedin/dashboard");
      fetch(`/api/linkedin/profile?token=${urlToken}`)
        .then(r => r.json())
        .then((data) => {
          const account: StoredAccount = {
            id: data.id,
            name: data.name,
            headline: data.headline,
            profilePicture: data.profilePicture,
            token: urlToken,
          };
          saveAccount(account);
          localStorage.setItem(ACTIVE_KEY, data.id);
          setAccounts(getAccounts());
          setActiveId(data.id);
          setToken(urlToken);
        })
        .catch(() => router.push("/linkedin?error=profile_fetch_failed"));
      return;
    }
    const storedAccounts = getAccounts();
    if (!storedAccounts.length) { router.push("/linkedin"); return; }
    const active = localStorage.getItem(ACTIVE_KEY) || storedAccounts[0].id;
    const account = storedAccounts.find(a => a.id === active) || storedAccounts[0];
    setAccounts(storedAccounts);
    setActiveId(account.id);
    setToken(account.token);
  }, [searchParams, router]);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    setPostsError(null);

    async function fetchData() {
      try {
        const [profileRes, postsRes] = await Promise.all([
          fetch(`/api/linkedin/profile?token=${token}`),
          fetch(`/api/linkedin/posts?token=${token}`),
        ]);
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        setProfile(await profileRes.json());
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setPosts(postsData.posts || []);
        } else if (postsRes.status === 403) {
          setPostsError("posts_permission");
        } else {
          setPostsError("posts_failed");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  function switchAccount(id: string) {
    const account = accounts.find(a => a.id === id);
    if (!account) return;
    localStorage.setItem(ACTIVE_KEY, id);
    setActiveId(id);
    setToken(account.token);
    setMenuOpen(false);
  }

  function addAccount() { setMenuOpen(false); router.push("/linkedin?add=1"); }

  function disconnectAccount(id: string) {
    removeAccount(id);
    const remaining = getAccounts();
    setAccounts(remaining);
    if (!remaining.length) { localStorage.removeItem(ACTIVE_KEY); router.push("/linkedin"); }
    else {
      const next = remaining[0];
      localStorage.setItem(ACTIVE_KEY, next.id);
      setActiveId(next.id);
      setToken(next.token);
    }
    setMenuOpen(false);
  }

  const sortedPosts = [...posts].sort((a, b) => {
    const aVal = sortKey === "timestamp" ? new Date(a.timestamp).getTime() : (a[sortKey] as number ?? -1);
    const bVal = sortKey === "timestamp" ? new Date(b.timestamp).getTime() : (b[sortKey] as number ?? -1);
    return sortDir === "desc" ? bVal - aVal : aVal - bVal;
  });

  const totalComments = posts.reduce((sum, p) => sum + p.commentCount, 0);

  if (loading) return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading your stats...</p>
    </main>
  );

  if (error) return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-red-400 text-sm">{error}</p>
        <button onClick={() => disconnectAccount(activeId!)} className="text-zinc-500 text-xs underline">Reconnect LinkedIn</button>
      </div>
    </main>
  );

  const avgEngagement = posts.length > 0
    ? Math.round(posts.reduce((sum, p) => sum + p.likeCount + p.commentCount, 0) / posts.length) : 0;
  const engagementRate = profile && profile.connectionsCount > 0
    ? ((avgEngagement / profile.connectionsCount) * 100).toFixed(2) : "0.00";

  return (
    <main className="min-h-screen bg-black text-white flex">
      <div className="flex-1 min-w-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(o => !o)} className="flex items-center gap-4 group">
                {profile?.profilePicture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.profilePicture} alt={profile.name} className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-400 text-xl font-medium">{profile?.name?.[0]}</span>
                  </div>
                )}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">{profile?.name}</h1>
                    <svg className={`w-4 h-4 text-zinc-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm">{profile?.headline}</p>
                </div>
              </button>

              {menuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl z-10">
                  {accounts.filter(a => a.id !== activeId).map(a => (
                    <button key={a.id} onClick={() => switchAccount(a.id)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left">
                      {a.profilePicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.profilePicture} alt={a.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <span className="text-zinc-400 text-sm">{a.name?.[0]}</span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-white">{a.name}</p>
                        <p className="text-xs text-zinc-500">{a.headline}</p>
                      </div>
                    </button>
                  ))}
                  {accounts.filter(a => a.id !== activeId).length > 0 && <div className="border-t border-zinc-800" />}
                  <button onClick={addAccount} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                      <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-sm text-zinc-300">Add account</p>
                  </button>
                  <div className="border-t border-zinc-800" />
                  <button onClick={() => disconnectAccount(activeId!)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-colors text-left">
                    <p className="text-sm text-red-400">Disconnect {profile?.name}</p>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-zinc-800">
            {(["stats", "comments", "ideas", "simulate"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px capitalize flex items-center gap-2 ${activeTab === tab ? "text-white border-white" : "text-zinc-500 border-transparent hover:text-zinc-300"}`}
              >
                {tab === "comments" ? "Comments" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "comments" && totalComments > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === "comments" ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"}`}>
                    {totalComments.toLocaleString()}
                  </span>
                )}
              </button>
            ))}
            <div className="flex-1" />
            <button
              onClick={() => setChatOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors mb-1 ${chatOpen ? "bg-white text-black" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Ask AI
            </button>
          </div>

          {/* Stats tab */}
          {activeTab === "stats" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Connections", value: profile?.connectionsCount.toLocaleString() },
                  { label: "Posts", value: posts.length.toLocaleString() },
                  { label: "Avg Engagement", value: `${engagementRate}%` },
                  { label: "Total Comments", value: totalComments.toLocaleString() },
                ].map(stat => (
                  <div key={stat.label} className="bg-zinc-900 rounded-2xl p-5 space-y-1">
                    <p className="text-zinc-500 text-xs">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium text-zinc-400">Post performance</h2>
                {postsError === "posts_permission" ? (
                  <div className="bg-zinc-900 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="space-y-1 max-w-sm">
                      <p className="text-white text-sm font-medium">Posts require additional API access</p>
                      <p className="text-zinc-500 text-xs leading-relaxed">
                        LinkedIn restricts reading your own posts to apps approved for the Marketing Developer Platform.
                        Your profile, connections, and AI features are fully available.
                      </p>
                    </div>
                    <a
                      href="https://www.linkedin.com/developers/apps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 underline underline-offset-2 hover:text-white transition-colors"
                    >
                      Apply for Marketing Developer Platform access →
                    </a>
                  </div>
                ) : (
                <div className="bg-zinc-900 rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left text-zinc-500 font-normal px-4 py-3">Post</th>
                        <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("likeCount")}>Likes <SortIcon active={sortKey === "likeCount"} dir={sortDir} /></th>
                        <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("commentCount")}>Comments <SortIcon active={sortKey === "commentCount"} dir={sortDir} /></th>
                        <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("repostCount")}>Reposts <SortIcon active={sortKey === "repostCount"} dir={sortDir} /></th>
                        <th className="text-right text-zinc-500 font-normal px-4 py-3 cursor-pointer hover:text-zinc-300 whitespace-nowrap" onClick={() => handleSort("timestamp")}>Date <SortIcon active={sortKey === "timestamp"} dir={sortDir} /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedPosts.map((post, i) => (
                        <tr key={post.id} className={`hover:bg-zinc-800/50 transition-colors ${i < sortedPosts.length - 1 ? "border-b border-zinc-800" : ""}`}>
                          <td className="px-4 py-3 text-zinc-300 max-w-xs">
                            <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors line-clamp-2 leading-snug">
                              {post.text || <span className="text-zinc-600">No text</span>}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-right text-zinc-300">{post.likeCount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-zinc-300">{post.commentCount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-zinc-400">{post.repostCount > 0 ? post.repostCount.toLocaleString() : <span className="text-zinc-700">—</span>}</td>
                          <td className="px-4 py-3 text-right text-zinc-500 whitespace-nowrap">
                            {new Date(post.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                        </tr>
                      ))}
                      {!sortedPosts.length && (
                        <tr>
                          <td colSpan={5} className="px-4 py-12 text-center text-zinc-600 text-sm">No posts found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "comments" && token && profile && (
            <CommentsTab token={token} posts={posts} profile={profile} />
          )}

          {activeTab === "ideas" && profile && (
            <IdeasTab name={profile.name} posts={posts} />
          )}

          {activeTab === "simulate" && profile && (
            <SimulateTab name={profile.name} posts={posts} profile={profile} />
          )}

        </div>
      </div>

      {chatOpen && profile && (
        <div className="w-80 shrink-0 sticky top-0 h-screen flex flex-col">
          <ChatBot
            open={chatOpen}
            setOpen={setChatOpen}
            name={profile.name}
            stats={{
              profile: { name: profile.name, connections: profile.connectionsCount, headline: profile.headline },
              recentPosts: posts.slice(0, 30).map(p => ({
                text: p.text?.slice(0, 100),
                date: p.timestamp,
                likes: p.likeCount,
                comments: p.commentCount,
                reposts: p.repostCount,
              })),
            }}
          />
        </div>
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
