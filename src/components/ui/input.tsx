import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("rv-focus h-10 w-full rounded-lg border border-[var(--rv-border-strong)] bg-white px-3.5 text-sm text-[var(--rv-ink)] shadow-[var(--rv-shadow-sm)] placeholder:text-[var(--rv-ink-3)] hover:border-[var(--rv-ink-3)] focus:border-[var(--rv-terracotta)]", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("rv-focus min-h-28 w-full resize-y rounded-lg border border-[var(--rv-border-strong)] bg-white px-3.5 py-3 text-sm text-[var(--rv-ink)] shadow-[var(--rv-shadow-sm)] placeholder:text-[var(--rv-ink-3)] hover:border-[var(--rv-ink-3)] focus:border-[var(--rv-terracotta)]", className)} {...props} />;
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-2 block text-sm font-semibold text-[var(--rv-ink)]", className)} {...props} />;
}
