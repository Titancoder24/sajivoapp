import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const registrationSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.email(),
  password: z.string().min(8).regex(/\d/, "Password must contain a number"),
  accountType: z.enum(["client", "business"]),
  businessType: z.enum(["professional", "vendor"]).nullable(),
  businessRole: z.enum(["interior_designer", "contractor", "retailer"]).nullable(),
  role: z.enum(["customer", "designer", "contractor", "vendor"]),
}).superRefine((value, context) => {
  if (value.accountType === "client" && value.role !== "customer") context.addIssue({ code: "custom", path: ["role"], message: "Client accounts must use the customer role" });
  if (value.accountType === "business" && (!value.businessType || !value.businessRole)) context.addIssue({ code: "custom", path: ["businessType"], message: "Business account type and role are required" });
  if (value.businessType === "vendor" && (value.businessRole !== "retailer" || value.role !== "vendor")) context.addIssue({ code: "custom", path: ["businessRole"], message: "Retailer is the only phase-one vendor role" });
  if (value.businessType === "professional" && !["interior_designer", "contractor"].includes(value.businessRole ?? "")) context.addIssue({ code: "custom", path: ["businessRole"], message: "Choose an interior designer or contractor role" });
});

export async function POST(request: Request) {
  const result = registrationSchema.safeParse(await request.json());
  if (!result.success) return NextResponse.json({ error: result.error.issues[0]?.message ?? "Invalid registration details" }, { status: 400 });
  const { fullName, email, password, role, accountType, businessType, businessRole } = result.data;
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Registration is unavailable until Supabase environment variables are configured." }, { status: 503 });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, primary_role: role, account_type: accountType, business_account_type: businessType, business_role: businessRole } },
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, role, userId: data.user?.id, requiresEmailConfirmation: !data.session }, { status: 201 });
}
