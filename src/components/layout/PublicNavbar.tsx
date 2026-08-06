"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { BrandMark } from "@/components/sajivo/BrandMark";

const links = [
  ["Services", "/services"],
  ["Professionals", "/professionals"],
  ["How It Works", "/how-it-works"],
  ["For Professionals", "/for-professionals"],
] as const;

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--rv-border)] bg-[rgba(248,248,246,0.92)] backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rv-focus rounded-md text-sm font-semibold text-[var(--rv-ink-2)] hover:text-[var(--rv-ink)]">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/login" variant="ghost">Login</ButtonLink>
          <ButtonLink href="/register">Create Account</ButtonLink>
        </div>
        <button className="rv-focus rounded-md p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-[var(--rv-border)] bg-[var(--rv-bg)] md:hidden">
          <div className="page-shell flex flex-col gap-2 py-4">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md px-3 py-3 text-sm font-semibold" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <ButtonLink href="/login" variant="outline">Login</ButtonLink>
            <ButtonLink href="/register">Create Account</ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
