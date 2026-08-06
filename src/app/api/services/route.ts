import { NextResponse } from "next/server";
import { getServices } from "@/lib/server/repository";

export async function GET() {
  return NextResponse.json({ services: await getServices() });
}
