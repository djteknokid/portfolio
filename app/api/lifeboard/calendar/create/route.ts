import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { accessToken, title, description } = await req.json();
  if (!accessToken || !title) {
    return NextResponse.json({ error: "Missing accessToken or title" }, { status: 400 });
  }

  // Default: tomorrow, all-day event
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split("T")[0];

  const event = {
    summary: title,
    description: description ?? "",
    start: { date: dateStr },
    end: { date: dateStr },
  };

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
  return NextResponse.json({ ok: true, eventId: created.id });
}
