import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { message, username, stats, noHistory } = await req.json();

  if (!message || !username) {
    return NextResponse.json({ error: "Missing message or username" }, { status: 400 });
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `You are an Instagram analytics assistant for @${username}. You have access to their real account data and help them understand their performance, spot trends, and grow their audience.

Current account stats:
${JSON.stringify(stats, null, 2)}

Be concise and specific. Reference actual numbers from their data. When they ask about performance, compare posts, or ask for advice — use the real data above to answer precisely.`,
    },
    { role: "user", content: message },
  ];

  // Load conversation history unless this is a one-off generation request
  if (!noHistory) {
    const { data: history } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("username", username)
      .order("created_at", { ascending: true })
      .limit(50);

    if (history?.length) {
      messages.splice(1, 0, ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
    }
  }

  const completion = await openai.chat.completions.create({
    model: noHistory ? "gpt-4o" : "gpt-4o-mini",
    messages,
    max_tokens: noHistory ? 4000 : 500,
  });

  const reply = completion.choices[0].message.content || "";

  // Only save to history for normal chat messages
  if (!noHistory) {
    await supabase.from("chat_messages").insert([
      { username, role: "user", content: message },
      { username, role: "assistant", content: reply },
    ]);
  }

  return NextResponse.json({ reply });
}
