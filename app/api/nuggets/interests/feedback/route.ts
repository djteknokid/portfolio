import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { questionId, question, topic, mechanic, rating } = await req.json() as {
    questionId: string;
    question: string;
    topic: string;
    mechanic: string;
    rating: "loved" | "too_easy" | "too_hard" | "incorrect";
  };

  if (!question || !rating) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const supabase = createClient(await cookies());
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from("interests_feedback").insert({
      question_id: questionId,
      question,
      topic,
      mechanic,
      rating,
      user_id: user?.id ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[interests/feedback]", err);
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
