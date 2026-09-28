import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { accessToken, query, timezone } = await req.json();
  if (!accessToken || !query) {
    return NextResponse.json({ error: "Missing accessToken or query" }, { status: 400 });
  }

  const tz = timezone || "America/Los_Angeles";

  // Search upcoming events (next 60 days) for a match
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
  if (!listRes.ok) {
    return NextResponse.json({ error: "Failed to fetch calendar" }, { status: 500 });
  }

  const calData = await listRes.json();
  const events: { id: string; summary?: string; start?: { dateTime?: string; date?: string } }[] = calData.items ?? [];

  if (events.length === 0) {
    return NextResponse.json({ deleted: false, message: "No upcoming events found." });
  }

  // Use AI to find the best matching event
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const eventList = events.map((e, i) => `${i + 1}. "${e.summary ?? "Untitled"}" on ${e.start?.dateTime ?? e.start?.date ?? "unknown"}`).join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `The user wants to delete a calendar event. Find the best match from the list.
Return JSON: { "index": <1-based index of best match, or 0 if no match>, "confidence": "high" | "low" }`,
      },
      { role: "user", content: `User wants to delete: "${query}"\n\nEvents:\n${eventList}` },
    ],
  });

  const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
  const idx = (parsed.index ?? 0) - 1;

  if (idx < 0 || idx >= events.length) {
    return NextResponse.json({ deleted: false, message: "Couldn't find a matching event on your calendar." });
  }

  const match = events[idx];

  // Always show a confirm card before deleting
  return NextResponse.json({
    deleted: false,
    confirm: true,
    event: { id: match.id, title: match.summary ?? "Untitled", date: match.start?.dateTime ?? match.start?.date ?? "" },
  });
}
