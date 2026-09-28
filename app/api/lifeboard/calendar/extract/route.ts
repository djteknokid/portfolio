import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description } = body;
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const today = new Date().toISOString().split("T")[0];
    const textHint = `${title} ${description ?? ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Today is ${today}. Extract event details from the user's instruction. Return JSON:
{
  "title": "clean short event name only",
  "date": "YYYY-MM-DD or empty string",
  "time": "HH:MM (24h) or empty string",
  "endTime": "HH:MM (24h) or empty string",
  "location": "venue/address or empty string",
  "recurrence": "RRULE string or empty string"
}
Examples:
- "every Tuesday" → recurrence: "RRULE:FREQ=WEEKLY;BYDAY=TU"
- "every weekday" → recurrence: "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"
- If no date, use next occurrence of the day mentioned.
- 12h to 24h: "6:00pm" → "18:00", "6:30pm" → "18:30"`,
        },
        { role: "user", content: `Instruction: ${textHint}` },
      ],
    });

    const parsed = JSON.parse(completion.choices[0].message.content ?? "{}");
    return NextResponse.json({
      title: parsed.title ?? title,
      date: parsed.date ?? "",
      time: parsed.time ?? "",
      endTime: parsed.endTime ?? "",
      location: parsed.location ?? "",
      recurrence: parsed.recurrence ?? "",
    });
  } catch {
    return NextResponse.json({ title, date: "", time: "", endTime: "", location: "", recurrence: "" });
  }
}
