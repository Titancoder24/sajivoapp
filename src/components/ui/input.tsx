import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("rv-focus h-11 w-full rounded-md border border-[var(--rv-border)] bg-white px-3 text-sm text-[var(--rv-ink)] placeholder:text-[var(--rv-ink-2)]", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("rv-focus min-h-28 w-full rounded-md border border-[var(--rv-border)] bg-white px-3 py-3 text-sm text-[var(--rv-ink)] placeholder:text-[var(--rv-ink-2)]", className)} {...props} />;
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-2 block text-sm font-semibold text-[var(--rv-ink)]", className)} {...props} />;
}
