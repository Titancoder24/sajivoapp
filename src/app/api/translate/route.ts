import { NextResponse } from "next/server";

const MAX_TEXTS = 80;
const MAX_LENGTH = 240;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { texts?: unknown } | null;
  const texts = Array.isArray(body?.texts)
    ? body.texts.filter((text): text is string => typeof text === "string").slice(0, MAX_TEXTS).map((text) => text.slice(0, MAX_LENGTH))
    : [];
  if (!texts.length) return NextResponse.json({ translations: [] });

  const translations = await Promise.all(texts.map(async (text) => {
    try {
      const url = new URL("https://translate.googleapis.com/translate_a/single");
      url.searchParams.set("client", "gtx");
      url.searchParams.set("sl", "en");
      url.searchParams.set("tl", "hi");
      url.searchParams.set("dt", "t");
      url.searchParams.set("q", text);
      const response = await fetch(url, { next: { revalidate: 86_400 } });
      if (!response.ok) return text;
      const payload = await response.json() as Array<Array<[string]>>;
      return payload[0]?.map((part) => part[0]).join("") || text;
    } catch {
      return text;
    }
  }));
  return NextResponse.json({ translations }, { headers: { "cache-control": "public, max-age=86400" } });
}
