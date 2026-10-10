import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get("audio") as File | null;
  const targetWord = formData.get("word") as string | null;

  if (!audio || !targetWord) {
    return NextResponse.json({ error: "Missing audio or word" }, { status: 400 });
  }

  // Whisper transcription
  let transcript = "";
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: audio,
      model: "whisper-1",
      language: "en",
    });
    transcript = transcription.text.trim();
  } catch (err) {
    console.error("Whisper error:", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }

  // GPT similarity check
  const prompt = `You are a pronunciation coach evaluating whether a student correctly said a wine term.

Target word: "${targetWord}"
Student said: "${transcript}"

Evaluate if the student pronounced "${targetWord}" correctly or close enough to pass.
Rules:
- Minor accent differences are fine
- The word just needs to be recognizable
- If the student said the word clearly, pass them
- Respond with PASS or FAIL, then a short one-line feedback message (max 12 words)

Format exactly:
PASS: [short encouraging feedback]
or
FAIL: [short specific correction tip]`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 60,
    });

    const response = completion.choices[0].message.content?.trim() ?? "";
    const passed = response.toUpperCase().startsWith("PASS");
    const colonIdx = response.indexOf(":");
    const feedback = colonIdx >= 0 ? response.slice(colonIdx + 1).trim() : response;

    return NextResponse.json({ passed, feedback, transcript });
  } catch (err) {
    console.error("GPT error:", err);
    return NextResponse.json({ error: "Grading failed" }, { status: 500 });
  }
}
