import { NextRequest, NextResponse } from "next/server";
import { getMessages, getCharacters, getRoom } from "@/lib/chatroom/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const afterId = searchParams.get("after_id");
    const limit = parseInt(searchParams.get("limit") ?? "60");

    const messages = getMessages({
      limit,
      afterId: afterId ? parseInt(afterId) : undefined,
    });

    return NextResponse.json({
      messages,
      characters: getCharacters(),
      room: getRoom(),
    });
  } catch (err) {
    console.error("chatroom/history error:", err);
    return NextResponse.json({ messages: [], characters: [], room: null }, { status: 500 });
  }
}
