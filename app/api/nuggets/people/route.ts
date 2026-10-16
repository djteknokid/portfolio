import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { resolveWikimediaImages } from "../interests/resolve-images";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type PersonCard = {
  name: string;
  tagline: string;
  era: string;
  imageSearchTerm: string;
  imageUrl?: string;
};

export async function POST(req: NextRequest) {
  const { category, kidAge = 8 } = await req.json() as { category: string; kidAge?: number };

  if (!category) return NextResponse.json({ error: "Missing category" }, { status: 400 });

  const prompt = `Generate exactly 6 real famous people that fit this category for a ${kidAge}-year-old child: "${category}"

Rules:
- Real, historically significant people (no fictional characters)
- Visually recognizable — their Wikipedia article MUST have a well-known portrait or photo
- Inspiring and age-appropriate — no villains, no controversial modern figures
- Varied: different time periods, genders, cultures where possible
- For each person, provide:
  - name: their full common name
  - tagline: one short phrase (max 6 words) describing what made them great, written for a child
  - era: a short time context like "1800s", "Ancient Egypt", "1960s–present"
  - imageSearchTerm: the EXACT Wikipedia article title for their main portrait (e.g. "Marie Curie", "Leonardo da Vinci", "Frida Kahlo")

Return valid JSON only:
{
  "people": [
    { "name": "Marie Curie", "tagline": "First woman to win a Nobel Prize", "era": "1800s–1900s", "imageSearchTerm": "Marie Curie" },
    ...
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw) as { people: PersonCard[] };
    const people: PersonCard[] = Array.isArray(parsed.people) ? parsed.people.slice(0, 6) : [];

    // Resolve images in parallel
    const searchTerms = people.map((p) => p.imageSearchTerm).filter(Boolean);
    const images = searchTerms.length > 0 ? await resolveWikimediaImages(searchTerms, 400) : {};

    const withImages = people.map((p) => ({
      ...p,
      imageUrl: images[p.imageSearchTerm] ?? undefined,
    }));

    return NextResponse.json({ people: withImages });
  } catch (err) {
    console.error("[people]", err);
    return NextResponse.json({ error: "Failed to generate people" }, { status: 500 });
  }
}
