import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

async function getDateRange(query: string, timezone: string): Promise<{ timeMin: string; timeMax: string }> {
  const now = new Date();
  const today = now.toLocaleDateString("en-CA", { timeZone: timezone }); // YYYY-MM-DD in user's tz

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Today is ${today} (${timezone}). The user wants to check their calendar. Extract the date range they're asking about.
Return JSON: { "timeMin": "YYYY-MM-DD", "timeMax": "YYYY-MM-DD" }
Rules:
- "this week" = Monday–Sunday of the current week (include today even if mid-week)
- "next week" = Monday–Sunday of next week
- "today" = just today
- "tomorrow" = just tomorrow
- "this weekend" = Saturday–Sunday of current week
- No date hint = next 7 days from today`,
        },
        { role: "user", content: query || "what do i have" },
      ],
    });
    const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
    if (parsed.timeMin && parsed.timeMax) {
      // Convert YYYY-MM-DD to start/end of day in user's timezone as ISO strings
      const startOfDay = new Date(`${parsed.timeMin}T00:00:00`);
      const endOfDay = new Date(`${parsed.timeMax}T23:59:59`);
      return {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
      };
    }
  } catch {
    // fall through to default
  }

  // Default: next 7 days
  const weekOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return { timeMin: now.toISOString(), timeMax: weekOut.toISOString() };
}

export async function POST(req: NextRequest) {
  const { accessToken, user_id, query, timezone } = await req.json();
  if (!accessToken || !user_id) {
    return NextResponse.json({ error: "Missing accessToken or user_id" }, { status: 400 });
  }

  const tz = timezone || "America/Los_Angeles";
  const { timeMin, timeMax } = await getDateRange(query ?? "", tz);

  const url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("timeMax", timeMax);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("timeZone", tz);

  const calRes = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!calRes.ok) {
    const err = await calRes.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const calData = await calRes.json();
  const events: {
    summary?: string;
    description?: string;
    attendees?: unknown[];
    start?: { dateTime?: string; date?: string };
    end?: { dateTime?: string; date?: string };
  }[] = calData.items ?? [];

  const taskEvents = events.filter(e => e.summary);

  const supabase = getSupabase();
  const { data: existing } = await supabase
    .from("lifeboard_cards")
    .select("title")
    .eq("user_id", user_id);

  const existingTitles = new Set((existing ?? []).map((c: { title: string }) => c.title.toLowerCase()));

  const candidates = taskEvents
    .filter(e => !existingTitles.has((e.summary ?? "").toLowerCase()))
    .map(e => {
      const start = e.start?.dateTime ?? e.start?.date ?? "";
      const date = start ? new Date(start) : null;
      const label = date
        ? date.toLocaleDateString("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric" }) +
          (e.start?.dateTime ? " " + date.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }) : "")
        : "";
      return {
        id: `cal-${Math.random().toString(36).slice(2, 10)}`,
        title: e.summary ?? "Untitled",
        description: e.description
          ? e.description.replace(/<[^>]*>/g, "").slice(0, 150)
          : "Synced from Google Calendar",
        status: "todo",
        category: "personal",
        points: 2,
        label,
        user_id,
      };
    });

  return NextResponse.json({ candidates });
}
