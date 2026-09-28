import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description } = body;
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const today = new Date().toISOString().split("T")[0];
    const textHint = `${title} ${description ?? ""}`;

    // Pass 1: extract what the user explicitly stated
    const extraction = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Today is ${today}. Extract event details explicitly stated by the user. Return JSON:
{
  "title": "clean short event name only",
  "date": "YYYY-MM-DD or empty string",
  "time": "HH:MM (24h) or empty string",
  "endTime": "HH:MM (24h) or empty string",
  "location": "venue/address if explicitly mentioned, else empty string",
  "recurrence": "RRULE string if recurring, else empty string",
  "guests": "comma-separated email addresses if mentioned, else empty string"
}
- "every Tuesday" → recurrence: "RRULE:FREQ=WEEKLY;BYDAY=TU"
- "every weekday" → recurrence: "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
- If no date, use next occurrence of the day mentioned.
- 12h to 24h: "6:00pm" → "18:00", "6:30pm" → "18:30"`,
        },
        { role: "user", content: `Instruction: ${textHint}` },
      ],
    });

    const extracted = JSON.parse(extraction.choices[0].message.content ?? "{}");

    // Pass 2: enrich with smart defaults for any missing fields
    const enrichment = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are helping pre-fill a calendar event form with smart defaults. Given the event details extracted so far, suggest the best values for any empty fields. Use your knowledge to infer likely values — e.g. if the location is a well-known business, suggest its full address; if a swim class ends 30 min after start, suggest the end time.

Return JSON with the same shape, only filling in fields that were empty. Do not change fields that already have values:
{
  "title": "keep existing or improve casing/brevity",
  "date": "keep existing or best guess",
  "time": "keep existing or best guess from event type",
  "endTime": "keep existing or infer from duration (swim class ~45min, basketball ~2h, etc.)",
  "location": "keep existing or suggest full address if you know the venue",
  "recurrence": "keep existing",
  "guests": "keep existing"
}`,
        },
        {
          role: "user",
          content: `Event context: ${textHint}

Extracted so far:
${JSON.stringify(extracted, null, 2)}

Fill in any empty fields with smart defaults.`,
        },
      ],
    });

    const enriched = JSON.parse(enrichment.choices[0].message.content ?? "{}");

    // Merge: extracted values take priority, enriched fills gaps
    return NextResponse.json({
      title: extracted.title || enriched.title || title,
      date: extracted.date || enriched.date || "",
      time: extracted.time || enriched.time || "",
      endTime: extracted.endTime || enriched.endTime || "",
      location: extracted.location || enriched.location || "",
      recurrence: extracted.recurrence || enriched.recurrence || "",
      guests: extracted.guests || enriched.guests || "",
    });
  } catch {
    return NextResponse.json({ title, date: "", time: "", endTime: "", location: "", recurrence: "", guests: "" });
  }
}
