import { NextResponse } from "next/server";
import { getProposals } from "@/lib/server/repository";

export async function GET() {
  return NextResponse.json({ proposals: await getProposals("customer") });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ proposal: { id: crypto.randomUUID(), status: "submitted", ...body } }, { status: 201 });
}
