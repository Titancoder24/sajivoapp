import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/domain";

const roleHome: Record<UserRole, string> = {
  customer: "/customer/dashboard",
  designer: "/designer/dashboard",
  contractor: "/contractor/dashboard",
  vendor: "/vendor/dashboard",
  admin: "/customer/dashboard",
};

export async function requireDashboardRole(expectedRole: Exclude<UserRole, "admin">) {
  const supabase = await createClient();
  if (!supabase) return;
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    const demoRole = (await cookies()).get("sajivo-demo-role")?.value;
    if (demoRole === expectedRole) return;
    redirect(`/login?next=${encodeURIComponent(roleHome[expectedRole])}`);
  }

  const { data: profile } = await supabase.from("profiles").select("primary_role, account_status").eq("id", authData.user.id).single();
  if (!profile || profile.account_status !== "active") redirect("/login?status=account_unavailable");
  const role = profile.primary_role as UserRole;
  if (role !== expectedRole && role !== "admin") redirect(roleHome[role] ?? "/dashboard");
}
