import Link from "next/link";
import { House } from "lucide-react";
import { appName } from "@/lib/constants";

export function BrandMark() {
  return (
    <Link href="/" className="rv-focus inline-flex shrink-0 items-center gap-2 rounded-lg" aria-label={`${appName} home`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--rv-terracotta)] text-white shadow-[var(--rv-shadow-sm)]">
        <House size={18} strokeWidth={2.2} />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--rv-terracotta)]" />
      </span>
      <span className="font-display text-xl leading-none text-[var(--rv-ink)]">{appName}</span>
    </Link>
  );
}
