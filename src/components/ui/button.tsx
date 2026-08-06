import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

const variants = {
  primary: "bg-[var(--rv-terracotta)] text-white hover:bg-[var(--rv-terracotta-dark)] shadow-sm",
  secondary: "bg-[var(--rv-slate)] text-white hover:bg-[var(--rv-slate-2)] shadow-sm",
  ghost: "bg-transparent text-[var(--rv-ink)] hover:bg-black/5",
  outline: "border border-[var(--rv-border)] bg-white text-[var(--rv-ink)] hover:border-[var(--rv-terracotta)]",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn("rv-focus inline-flex items-center justify-center gap-2 rounded-md font-semibold micro-rise disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({ href, children, className, variant = "primary", size = "md" }: { href: string; children: ReactNode; className?: string; variant?: ButtonProps["variant"]; size?: ButtonProps["size"] }) {
  return (
    <Link href={href} className={cn("rv-focus inline-flex items-center justify-center gap-2 rounded-md font-semibold micro-rise", variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
