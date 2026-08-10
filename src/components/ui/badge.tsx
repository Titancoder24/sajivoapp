import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex min-h-6 items-center rounded-full border border-[var(--rv-border)] bg-[var(--rv-surface-muted)] px-2.5 py-0.5 text-xs font-bold text-[var(--rv-ink-2)]", className)} {...props} />;
}
