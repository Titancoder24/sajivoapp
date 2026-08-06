"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, BriefcaseBusiness, CheckCircle2, ClipboardList, FolderOpen, LayoutDashboard, LogOut, MessageCircle, Search, Settings, Star, User, UserRoundCheck } from "lucide-react";
import { BrandMark } from "@/components/sajivo/BrandMark";
import { ButtonLink } from "@/components/ui/button";
import { roleLabels } from "@/lib/constants";
import { cn, initials } from "@/lib/utils";
import type { UserRole } from "@/types/domain";

const iconMap = {
  overview: LayoutDashboard,
  projects: FolderOpen,
  discover: Search,
  proposals: ClipboardList,
  active: BriefcaseBusiness,
  portfolio: Star,
  verifications: CheckCircle2,
  messages: MessageCircle,
  notifications: Bell,
  profile: User,
  settings: Settings,
  saved: UserRoundCheck,
  reviews: Star,
};

function linksFor(role: UserRole) {
  const base = `/${role}/dashboard`;
  if (role === "customer") {
    return [
      ["overview", "Overview", base],
      ["projects", "My Projects", `${base}/projects`],
      ["discover", "Find Professionals", "/professionals"],
      ["proposals", "My Proposals", `${base}/projects`],
      ["messages", "Messages", `${base}/messages`],
      ["saved", "Saved Professionals", `${base}/saved`],
      ["reviews", "Reviews", `${base}/reviews`],
    ] as const;
  }
  return [
    ["overview", "Overview", base],
    ["discover", "Discover Projects", `${base}/discover`],
    ["proposals", role === "designer" ? "My Proposals" : "My Quotations", role === "designer" ? `${base}/proposals` : `${base}/quotations`],
    ["active", "Active Projects", `${base}/active`],
    ["portfolio", "Portfolio", `${base}/portfolio`],
    ["verifications", "Verifications", `${base}/verifications`],
    ["messages", "Messages", `${base}/messages`],
  ] as const;
}

export function DashboardShell({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const pathname = usePathname();
  const userName = role === "customer" ? "Aarav Sharma" : role === "designer" ? "Meera Iyer" : "Kabir Khan";
  const navLinks = linksFor(role);

  return (
    <div className="min-h-screen bg-[var(--rv-bg)]">
      <div className="dashboard-shell grid min-h-screen gap-4 py-4 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-[var(--rv-border)] bg-white p-4 lg:sticky lg:top-4 lg:h-[calc(100vh-32px)]">
          <div className="flex items-center justify-between">
            <BrandMark />
            <span className="rounded-full bg-[rgba(198,93,71,0.08)] px-2 py-1 text-xs font-bold text-[var(--rv-terracotta)]">PWA</span>
          </div>
          <div className="mt-6 rounded-lg bg-[var(--rv-bg)] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--rv-slate)] text-sm font-bold text-white">{initials(userName)}</div>
              <div>
                <p className="text-sm font-bold">{userName}</p>
                <p className="text-xs text-[var(--rv-ink-2)]">{roleLabels[role]}</p>
              </div>
            </div>
          </div>
          <nav className="mt-5 grid gap-1">
            {navLinks.map(([key, label, href]) => {
              const Icon = iconMap[key];
              const active = pathname === href;
              return (
                <Link key={href} href={href} className={cn("rv-focus flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--rv-ink-2)] hover:bg-[var(--rv-bg)] hover:text-[var(--rv-ink)]", active && "bg-[rgba(198,93,71,0.08)] text-[var(--rv-terracotta-dark)]")}>
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
            <Link href="/notifications" className="rv-focus flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--rv-ink-2)] hover:bg-[var(--rv-bg)]">
              <Bell size={17} />
              Notifications
              <span className="ml-auto rounded-full bg-[var(--rv-terracotta)] px-2 py-0.5 text-xs text-white">2</span>
            </Link>
            <Link href="/profile" className="rv-focus flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--rv-ink-2)] hover:bg-[var(--rv-bg)]"><User size={17} /> Profile</Link>
            <Link href="/settings" className="rv-focus flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--rv-ink-2)] hover:bg-[var(--rv-bg)]"><Settings size={17} /> Settings</Link>
          </nav>
          <ButtonLink href="/login" variant="outline" className="mt-5 w-full">
            <LogOut size={16} />
            Logout
          </ButtonLink>
        </aside>
        <main className="min-w-0 pb-10">{children}</main>
      </div>
    </div>
  );
}
