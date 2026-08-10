import { NextResponse } from "next/server";
import { profiles } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return NextResponse.json({ error: error?.message ?? "Invalid email or password" }, { status: 401 });
    const { data: profile, error: profileError } = await supabase.from("profiles").select("primary_role").eq("id", data.user.id).single();
    if (profileError) return NextResponse.json({ error: "Your account profile could not be loaded." }, { status: 500 });
    return NextResponse.json({ ok: true, role: profile?.primary_role ?? "customer" });
  }
  const profile = profiles.find((item) => item.email.toLowerCase() === String(email).toLowerCase()) ?? profiles[0];
  return NextResponse.json({ ok: true, role: profile.primaryRole, demo: true });
}
