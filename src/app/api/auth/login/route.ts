import { NextResponse } from "next/server";
import { profiles } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      // Keep the documented demo account usable in preview deployments where
      // the seed user has not been created in the connected Supabase project.
      if (String(email).toLowerCase() === "customer@sajivo.com" && password === "Demo@123") {
        const response = NextResponse.json({ ok: true, role: "customer", demo: true });
        response.cookies.set("sajivo-demo-role", "customer", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
        return response;
      }
      return NextResponse.json({ error: error?.message ?? "Invalid email or password" }, { status: 401 });
    }
    const { data: profile } = await supabase.from("profiles").select("primary_role").eq("id", data.user.id).maybeSingle();
    // The profile trigger may be deployed just after Auth. Metadata keeps a newly
    // registered user moving while the profile row is created by the database.
    const metadataRole = data.user.user_metadata?.primary_role;
    const role = profile?.primary_role ?? (metadataRole === "designer" || metadataRole === "contractor" || metadataRole === "vendor" || metadataRole === "admin" ? metadataRole : "customer");
    return NextResponse.json({ ok: true, role });
  }
  const profile = profiles.find((item) => item.email.toLowerCase() === String(email).toLowerCase()) ?? profiles[0];
  return NextResponse.json({ ok: true, role: profile.primaryRole, demo: true });
}
