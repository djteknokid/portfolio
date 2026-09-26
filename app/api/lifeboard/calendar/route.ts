import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { accessToken, user_id } = await req.json();
  if (!accessToken || !user_id) {
    return NextResponse.json({ error: "Missing accessToken or user_id" }, { status: 400 });
  }

  const now = new Date();
  const weekOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
  url.searchParams.set("timeMin", now.toISOString());
  url.searchParams.set("timeMax", weekOut.toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "50");

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

  // All events with a title — let user decide
  const taskEvents = events.filter(e => e.summary);

  // Fetch existing card titles to avoid duplicates
  const supabase = getSupabase();
  const { data: existing } = await supabase
    .from("lifeboard_cards")
    .select("title")
    .eq("user_id", user_id);

  const existingTitles = new Set((existing ?? []).map((c: { title: string }) => c.title.toLowerCase()));

  // Return candidates — don't insert yet, let user confirm via chat
  const candidates = taskEvents
    .filter(e => !existingTitles.has((e.summary ?? "").toLowerCase()))
    .map(e => {
      const start = e.start?.dateTime ?? e.start?.date ?? "";
      const date = start ? new Date(start) : null;
      const label = date
        ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
          (e.start?.dateTime ? " " + date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "")
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
