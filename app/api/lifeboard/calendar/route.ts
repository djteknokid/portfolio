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
- "this week" = today through the coming Sunday (never include past days)
- "next week" = Monday–Sunday of next week
- "today" = just today (${today})
- "tomorrow" = just tomorrow
- "this weekend" = the coming Saturday and Sunday
- No date hint = today through 7 days from today
IMPORTANT: Never return a timeMin earlier than today (${today}). Past events are not useful.`,
        },
        { role: "user", content: query || "what do i have" },
      ],
    });
    const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
    if (parsed.timeMin && parsed.timeMax) {
      // Build timezone-aware boundaries by finding the UTC offset for that date
      const toTzISO = (dateStr: string, endOfDay: boolean) => {
        const [y, m, d] = dateStr.split("-").map(Number);
        const time = endOfDay ? "23:59:59" : "00:00:00";
        const [th, tmin, ts] = time.split(":").map(Number);
        // Find the UTC offset for this timezone on this date (handles DST)
        const probe = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
        const localStr = new Intl.DateTimeFormat("en-CA", {
          timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
        }).format(probe);
        const [ly, lm, ld] = localStr.split("-").map(Number);
        const offsetMs = Date.UTC(y, m - 1, d, 12) - Date.UTC(ly, lm - 1, ld, 12);
        return new Date(Date.UTC(y, m - 1, d, th, tmin, ts) + offsetMs).toISOString();
      };
      return {
        timeMin: toTzISO(parsed.timeMin, false),
        timeMax: toTzISO(parsed.timeMax, true),
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
  const { accessToken, user_id, query, timezone, viewOnly } = await req.json();
  if (!accessToken) {
    return NextResponse.json({ error: "Missing accessToken" }, { status: 400 });
  }
  if (!viewOnly && !user_id) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
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

  // VIEW ONLY — return plain text summary
  if (viewOnly) {
    if (taskEvents.length === 0) {
      return NextResponse.json({ events: [] });
    }
    const events = taskEvents.map(e => {
      const start = e.start?.dateTime ?? e.start?.date ?? "";
      const end = e.end?.dateTime ?? e.end?.date ?? "";
      const date = start ? new Date(start) : null;
      const dateStr = date
        ? date.toLocaleDateString("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric" }) +
          (e.start?.dateTime ? ", " + date.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }) : "")
        : "";
      // Extract HH:MM from dateTime for HITL pre-fill
      const timePart = e.start?.dateTime
        ? new Date(e.start.dateTime).toLocaleTimeString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false })
        : "";
      const endTimePart = e.end?.dateTime
        ? new Date(e.end.dateTime).toLocaleTimeString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false })
        : "";
      const datePart = start ? start.split("T")[0] : "";
      return {
        id: (e as { id?: string }).id ?? `cal-${Math.random().toString(36).slice(2, 10)}`,
        title: e.summary ?? "Untitled",
        dateStr,
        date: datePart,
        time: timePart,
        endTime: endTimePart,
        location: (e as { location?: string }).location ?? "",
        start,
        end,
      };
    });
    return NextResponse.json({ events });
  }

  // SYNC MODE — return candidates for HITL board cards
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
