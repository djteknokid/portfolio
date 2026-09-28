import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { accessToken, query, timezone } = await req.json();
  if (!accessToken || !query) {
    return NextResponse.json({ error: "Missing accessToken or query" }, { status: 400 });
  }

  const tz = timezone || "America/Los_Angeles";

  // Search upcoming events for a match
  const now = new Date();
  const sixtyDays = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
  url.searchParams.set("timeMin", now.toISOString());
  url.searchParams.set("timeMax", sixtyDays.toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("timeZone", tz);

  const listRes = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!listRes.ok) return NextResponse.json({ error: "Failed to fetch calendar" }, { status: 500 });

  const calData = await listRes.json();
  const events: {
    id: string;
    summary?: string;
    description?: string;
    location?: string;
    start?: { dateTime?: string; date?: string };
    end?: { dateTime?: string; date?: string };
    attendees?: { email: string }[];
    recurrence?: string[];
  }[] = calData.items ?? [];

  if (events.length === 0) return NextResponse.json({ found: false, message: "No upcoming events found." });

  // Use AI to find the matching event AND extract the requested change
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const today = new Date().toISOString().split("T")[0];
  const eventList = events.map((e, i) =>
    `${i + 1}. "${e.summary ?? "Untitled"}" on ${e.start?.dateTime ?? e.start?.date ?? "unknown"}`
  ).join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `Today is ${today}. The user wants to update a calendar event. Find the best matching event and extract what they want to change.
Return JSON:
{
  "index": <1-based index of best match, or 0 if not found>,
  "changes": {
    "title": "new title or null",
    "date": "YYYY-MM-DD or null",
    "time": "HH:MM (24h) or null",
    "endTime": "HH:MM (24h) or null",
    "location": "new location or null",
    "addGuests": ["email1", "email2"],
    "removeGuests": ["email1"]
  }
}
Only include fields the user explicitly wants to change. "addGuests" for adding attendees, "removeGuests" for removing them.`,
      },
      { role: "user", content: `User request: "${query}"\n\nEvents:\n${eventList}` },
    ],
  });

  const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
  const idx = (parsed.index ?? 0) - 1;
  if (idx < 0 || idx >= events.length) {
    return NextResponse.json({ found: false, message: "Couldn't find a matching event." });
  }

  const match = events[idx];
  const changes = parsed.changes ?? {};

  // Build pre-filled HITL payload with changes applied
  const startRaw = match.start?.dateTime ?? match.start?.date ?? "";
  const endRaw = match.end?.dateTime ?? match.end?.date ?? "";
  const startDate = startRaw ? new Date(startRaw) : null;
  const endDate = endRaw ? new Date(endRaw) : null;

  const existingGuests = (match.attendees ?? []).map(a => a.email).filter(Boolean);
  const addGuests: string[] = changes.addGuests ?? [];
  const removeGuests: string[] = changes.removeGuests ?? [];
  const mergedGuests = [...new Set([...existingGuests, ...addGuests])].filter(g => !removeGuests.includes(g));

  const timePart = (d: Date | null) => d && match.start?.dateTime
    ? d.toLocaleTimeString("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false })
    : "";

  return NextResponse.json({
    found: true,
    eventId: match.id,
    payload: {
      title: changes.title ?? match.summary ?? "",
      date: changes.date ?? (startDate ? startRaw.split("T")[0] : ""),
      time: changes.time ?? timePart(startDate),
      endTime: changes.endTime ?? timePart(endDate),
      location: changes.location ?? match.location ?? "",
      recurrence: match.recurrence?.[0] ?? "",
      guests: mergedGuests.join(", "),
    },
  });
}
