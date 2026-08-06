import { NextRequest, NextResponse } from "next/server";
import { getProjectsForRole } from "@/lib/server/repository";
import type { UserRole } from "@/types/domain";

export async function GET(request: NextRequest) {
  const role = (request.nextUrl.searchParams.get("role") ?? "customer") as UserRole;
  return NextResponse.json({ projects: await getProjectsForRole(role) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ project: { id: crypto.randomUUID(), ...body, status: "draft" } }, { status: 201 });
}
