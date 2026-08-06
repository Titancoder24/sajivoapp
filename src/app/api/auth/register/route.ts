import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { fullName, email, password, role } = await request.json();
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, primary_role: role } },
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        email,
        primary_role: role,
        roles: [role],
      });
    }
  }
  return NextResponse.json({ ok: true, role }, { status: 201 });
}
