import { NextRequest, NextResponse } from "next/server";
import { getProfessionals } from "@/lib/server/repository";
import type { UserRole } from "@/types/domain";

export async function GET(request: NextRequest) {
  const role = request.nextUrl.searchParams.get("role") as UserRole | "all" | null;
  return NextResponse.json({ professionals: await getProfessionals(role ?? "all") });
}
