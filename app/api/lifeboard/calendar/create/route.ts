import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { accessToken, title, description, start: preStart, end: preEnd, location: preLocation, recurrence: preRecurrence, allDay: preAllDay, guests, eventId } = await req.json();
  if (!accessToken || !title) {
    return NextResponse.json({ error: "Missing accessToken or title" }, { status: 400 });
  }

  let startDateTime: string | null = preStart ?? null;
  let endDateTime: string | null = preEnd ?? null;
  let isAllDay: boolean = preAllDay ?? true;
  let eventTitle = title;
  let eventLocation: string | null = preLocation ?? null;
  let recurrenceRule: string | null = preRecurrence || null;

  // Only call OpenAI to extract if fields weren't pre-supplied
  if (!preStart) {
    const textHint = `${title} ${description ?? ""}`;
    const hasTimeHint = /\d{1,2}:\d{2}|\d{1,2}(am|pm)/i.test(textHint);

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const today = new Date().toISOString().split("T")[0];
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `Today is ${today}. Extract event details from the user's instruction. Return JSON:
{
  "title": "clean short event name only",
  "start": "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS",
  "end": "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS",
  "allDay": true/false,
  "location": "full address or venue name if mentioned, else null",
  "recurrence": "RRULE string if recurring, else null"
}
Recurrence: "every Tuesday" → "RRULE:FREQ=WEEKLY;BYDAY=TU", not recurring → null
If no date found, use next occurrence of day mentioned or tomorrow.
If time found, set allDay false, use 24h format.`,
          },
          { role: "user", content: `Instruction: ${title} ${description ?? ""}` },
        ],
      });
      const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
      if (parsed.title) eventTitle = parsed.title;
      if (parsed.location) eventLocation = parsed.location;
      if (parsed.recurrence) recurrenceRule = parsed.recurrence;
      startDateTime = parsed.start ?? null;
      endDateTime = parsed.end ?? null;
      isAllDay = parsed.allDay ?? !hasTimeHint;
    } catch {
      // fallback to tomorrow
    }
  }

  if (!startDateTime) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    startDateTime = tomorrow.toISOString().split("T")[0];
    endDateTime = startDateTime;
    isAllDay = true;
  }
  if (!endDateTime) endDateTime = startDateTime;

  const baseEvent: Record<string, unknown> = {
    summary: eventTitle,
    description: description ?? "",
    ...(eventLocation ? { location: eventLocation } : {}),
    ...(recurrenceRule ? { recurrence: [recurrenceRule] } : {}),
    ...(guests ? { attendees: guests.split(",").map((e: string) => ({ email: e.trim() })).filter((a: { email: string }) => a.email) } : {}),
  };

  const event = isAllDay
    ? { ...baseEvent, start: { date: startDateTime.split("T")[0] }, end: { date: endDateTime.split("T")[0] } }
    : { ...baseEvent, start: { dateTime: startDateTime, timeZone: "America/Los_Angeles" }, end: { dateTime: endDateTime, timeZone: "America/Los_Angeles" } };

  const method = eventId ? "PUT" : "POST";
  const endpoint = eventId
    ? `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`
    : "https://www.googleapis.com/calendar/v3/calendars/primary/events";

  const res = await fetch(endpoint, {
    method,
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const created = await res.json();
  return NextResponse.json({ ok: true, eventId: created.id, title: eventTitle, recurring: !!recurrenceRule });
}
