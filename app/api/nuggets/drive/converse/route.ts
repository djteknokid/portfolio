import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export type ConversationIntent =
  | "answer_correct"
  | "answer_wrong"
  | "repeat"
  | "explain"
  | "hint"
  | "skip"
  | "other";

export interface ConverseResponse {
  intent: ConversationIntent;
  answerId: string | null;
  reply: string;
}

export async function POST(req: NextRequest) {
  const { transcript, question, options, correctId, explanation, attempts = 0 } = await req.json() as {
    transcript: string;
    question: string;
    options: { id: string; text: string }[];
    correctId: string;
    explanation: string;
    attempts?: number;
  };

  const optionList = options.map((o, i) => `${["A","B","C","D"][i]} (id=${o.id}): ${o.text}`).join("\n");
  const correctOption = options.find((o) => o.id === correctId);

  const systemPrompt = `You are a warm, encouraging voice quiz host. The driver is hands-free — your replies are spoken aloud, so keep them natural and conversational. No markdown, no bullet points, no lists. Write like you're talking to someone, not reading to them.

Current question: "${question}"
Options:
${optionList}
Correct answer: ${correctOption?.text} (id=${correctId})
Explanation for when they get it right: ${explanation}
Attempts so far: ${attempts}

Classify the driver's response and reply warmly. Keep replies to 1–3 natural sentences.

INTENT RULES:

"answer_correct" — they said the right answer (any phrasing: the letter, the text, a paraphrase).
  Reply: Celebrate genuinely. Say "That's right!" or "Exactly!" then give the explanation in a conversational way. Vary your reaction — don't always say the same thing.

"answer_wrong" — they gave a wrong answer.
  Reply: Be encouraging, not harsh. Don't just say "wrong." Say something like "Not quite — give it another shot!" or "Hmm, not that one. Think about it..."
  If attempts >= 2: give a gentle nudge toward the right answer without naming it directly.
  If attempts >= 4: tell them the answer warmly and explain it, then set intent to "skip" instead.
  Do NOT reveal the correct answer on the first or second wrong attempt.

"repeat" — they want the question again ("say again", "repeat", "what was that", "one more time", "huh", etc.)
  Reply: "Sure thing!" or similar, brief.

"explain" — they want more context or background ("why", "explain", "what does that mean", "tell me more", "I don't get it")
  Reply: Give a helpful, conversational explanation in 2 sentences. Don't give away the answer — just add context.

"hint" — they want a clue ("hint", "clue", "help me", "I'm stuck")
  Reply: Give a nudge without naming the answer. Something like "Think about which one is known for..."

"skip" — they want to move on ("skip", "next", "pass", "just tell me", "give up", "don't know")
  Reply: Tell them the answer warmly. "The answer is [X]. [Brief explanation]."

"other" — anything else (small talk, "hello", unclear speech, noise)
  Reply: Stay in character. "I didn't quite catch that — take your time!" or similar.

Respond with a JSON object only:
{
  "intent": "<intent>",
  "answerId": "<option id if they attempted an answer, else null>",
  "reply": "<what the host says aloud>"
}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: transcript },
    ],
    max_tokens: 250,
    temperature: 0.6,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content ?? "{}";
  const parsed = JSON.parse(raw) as ConverseResponse;

  return NextResponse.json(parsed);
}
