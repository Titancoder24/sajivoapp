import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

const variants = {
  primary: "button-depth-primary border border-[var(--rv-terracotta)] bg-[var(--rv-terracotta)] text-white hover:border-[var(--rv-terracotta-dark)] hover:bg-[var(--rv-terracotta-dark)]",
  secondary: "button-depth-secondary border border-[var(--rv-slate)] bg-[var(--rv-slate)] text-white hover:border-[var(--rv-slate-2)] hover:bg-[var(--rv-slate-2)]",
  ghost: "button-depth-ghost border border-[var(--rv-border)] bg-white text-[var(--rv-ink)] hover:bg-[var(--rv-surface-muted)]",
  outline: "button-depth-outline border border-[var(--rv-border-strong)] bg-white text-[var(--rv-ink)] hover:border-[var(--rv-ink)] hover:bg-[var(--rv-surface-muted)]",
  danger: "button-depth-danger border border-red-600 bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
  icon: "h-10 w-10 shrink-0 p-0",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn("button-3d rv-focus inline-flex items-center justify-center gap-2 rounded-lg font-bold disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({ href, children, className, variant = "primary", size = "md" }: { href: string; children: ReactNode; className?: string; variant?: ButtonProps["variant"]; size?: ButtonProps["size"] }) {
  return (
    <Link href={href} className={cn("button-3d rv-focus inline-flex items-center justify-center gap-2 rounded-lg font-bold", variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}
