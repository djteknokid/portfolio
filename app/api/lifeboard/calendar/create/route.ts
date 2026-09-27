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

  const textHint = `${title} ${description ?? ""}`;
  const hasTimeHint = /\d{1,2}:\d{2}|\d{1,2}(am|pm)/i.test(textHint);

  // Detect vague titles that need context-based extraction
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
          content: `Today is ${today}. Extract event info from the context. Return JSON:
{ "title": "short event name (if original title is vague like 'put this', extract from context)", "start": "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS", "end": "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS", "allDay": true/false }
If no date found, use tomorrow. If time found, use it and set allDay false, duration 1 hour. Use 24h format.`,
        },
        { role: "user", content: `Original title: ${title}\nContext: ${textHint}` },
      ],
    });
    const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
    if (isVague && parsed.title) eventTitle = parsed.title;
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

  const event = isAllDay
    ? { summary: eventTitle, description: description ?? "", start: { date: startDateTime.split("T")[0] }, end: { date: endDateTime.split("T")[0] } }
    : { summary: eventTitle, description: description ?? "", start: { dateTime: startDateTime, timeZone: "America/Los_Angeles" }, end: { dateTime: endDateTime, timeZone: "America/Los_Angeles" } };

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
  return NextResponse.json({ ok: true, eventId: created.id, title: eventTitle });
}
