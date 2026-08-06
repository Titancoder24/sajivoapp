import { NextResponse } from "next/server";
import { getNotifications } from "@/lib/server/repository";

export async function GET() {
  return NextResponse.json({ notifications: await getNotifications() });
}
