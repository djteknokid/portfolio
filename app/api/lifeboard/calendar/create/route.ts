import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const { accessToken, title, description } = await req.json();
  if (!accessToken || !title) {
    return NextResponse.json({ error: "Missing accessToken or title" }, { status: 400 });
  }

  let startDateTime: string | null = null;
  let endDateTime: string | null = null;
  let isAllDay = true;
  let eventTitle = title;
  let eventLocation: string | null = null;
  let recurrenceRule: string | null = null;

  const textHint = `${title} ${description ?? ""}`;
  const hasTimeHint = /\d{1,2}:\d{2}|\d{1,2}(am|pm)/i.test(textHint);
  const isVague = /^(put this|add this|this|put it|add it)/i.test(title.trim());

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
  "title": "clean short event name only (e.g. 'Jiwon Swimming', not the full instruction)",
  "start": "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS",
  "end": "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS",
  "allDay": true/false,
  "location": "full address or venue name if mentioned, else null",
  "recurrence": "RRULE string if recurring, else null"
}

Recurrence examples:
- "every Tuesday" → "RRULE:FREQ=WEEKLY;BYDAY=TU"
- "every weekday" → "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
- "every Monday and Wednesday" → "RRULE:FREQ=WEEKLY;BYDAY=MO,WE"
- "every day" → "RRULE:FREQ=DAILY"
- "every month on the 1st" → "RRULE:FREQ=MONTHLY;BYMONTHDAY=1"
- not recurring → null

If no date found, use the next occurrence of the day mentioned (e.g. "Tuesday" = next Tuesday).
If time found, set allDay false, use 24h format.`,
        },
        { role: "user", content: `Instruction: ${textHint}` },
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
  };

  const event = isAllDay
    ? { ...baseEvent, start: { date: startDateTime.split("T")[0] }, end: { date: endDateTime.split("T")[0] } }
    : { ...baseEvent, start: { dateTime: startDateTime, timeZone: "America/Los_Angeles" }, end: { dateTime: endDateTime, timeZone: "America/Los_Angeles" } };

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const created = await res.json();
  return NextResponse.json({ ok: true, eventId: created.id, title: eventTitle, recurring: !!recurrenceRule });
}
