import Link from "next/link";
import { Home } from "lucide-react";
import { appName } from "@/lib/constants";

export function BrandMark() {
  return (
    <Link href="/" className="rv-focus flex items-center gap-2 rounded-md">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--rv-slate)] text-white">
        <Home size={18} />
      </span>
      <span className="font-display text-xl text-[var(--rv-ink)]">{appName}</span>
    </Link>
  );
}
