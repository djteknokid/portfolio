import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("user_id");
  if (!user_id) return NextResponse.json({ entries: [] });

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("learnlog_entries")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entries: data });
}

export async function POST(req: NextRequest) {
  const { user_id, body } = await req.json();
  if (!user_id || !body?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("learnlog_entries")
    .insert({ user_id, body: body.trim() })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entry: data });
}

export async function PUT(req: NextRequest) {
  const { id, body, user_id } = await req.json();
  if (!id || !body?.trim() || !user_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("learnlog_entries")
    .update({ body: body.trim(), updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entry: data });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const user_id = req.nextUrl.searchParams.get("user_id");
  if (!id || !user_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = createClient(await cookies());
  const { error } = await supabase
    .from("learnlog_entries")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
