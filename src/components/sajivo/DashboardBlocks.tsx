"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Briefcase, CalendarDays, CheckCircle2, ClipboardList, Clock3, FolderOpen, List, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/domain";

export function DashboardHeader({ title, text, action, eyebrow }: { title: string; text: string; action?: React.ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[var(--rv-terracotta-dark)]">{eyebrow}</p>}
        <h1 className="font-display text-2xl leading-tight tracking-normal text-[var(--rv-ink)] md:text-[28px]">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-[var(--rv-ink-2)]">{text}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

type Stat = { label: string; value: string | number; detail?: string; trend?: "up" | "down" | "neutral" };

export function StatGrid({ stats }: { stats: Stat[] }) {
  const icons = [FolderOpen, ClipboardList, Briefcase, Bell];
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-[#e2e3e5] bg-white xl:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = icons[index % icons.length];
        const TrendIcon = stat.trend === "down" ? ArrowDownRight : stat.trend === "up" ? ArrowUpRight : ArrowRight;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.035 }}
            className={cn(
              "min-w-0 border-[#ececef] p-4 xl:border-t-0",
              index % 2 === 0 && "border-r",
              index > 1 && "border-t",
              index < 3 && "xl:border-r",
              index === 1 && "xl:border-l-0",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f1f1f3] text-[#5d6066]"><Icon size={14} /></span>
              {stat.detail && <span className={cn("flex items-center gap-0.5 text-[10px] font-semibold", stat.trend === "up" ? "text-emerald-700" : stat.trend === "down" ? "text-amber-700" : "text-[#8b8e93]")}><TrendIcon size={11} />{stat.detail}</span>}
            </div>
            <p className="mt-3 text-2xl font-bold tracking-normal text-[var(--rv-ink)]">{stat.value}</p>
            <p className="mt-0.5 truncate text-xs text-[#777a80]">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

export function SectionHeader({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex min-h-9 items-end justify-between gap-3">
      <div><h2 className="text-[15px] font-bold text-[#2b2d31]">{title}</h2>{text && <p className="mt-0.5 text-xs text-[#85878c]">{text}</p>}</div>
      {action}
    </div>
  );
}

export function ListToolbar({ placeholder = "Search projects...", filters = ["All status", "Newest"] }: { placeholder?: string; filters?: string[] }) {
  return (
    <div className="mb-4 flex flex-col gap-2 rounded-lg border border-[#e2e3e5] bg-white p-2 sm:flex-row sm:items-center">
      <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md bg-[#f7f7f8] px-3 text-[#8a8d92]">
        <Search size={14} /><input aria-label={placeholder} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-xs text-[#303238] outline-none placeholder:text-[#929499]" />
      </label>
      <div className="flex items-center gap-2 overflow-x-auto">
        {filters.map((filter, index) => <button key={filter} className="rv-focus flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-[#e0e1e3] bg-white px-3 text-[11px] font-semibold text-[#666970] hover:bg-[#f7f7f8]">{index === 0 && <SlidersHorizontal size={12} />}{filter}</button>)}
        <button aria-label="List view" className="rv-focus flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#202124] text-white"><List size={14} /></button>
      </div>
    </div>
  );
}

export function ProgressOverview({ vendor = false, project }: { vendor?: boolean; project?: Project }) {
  const projectProgress = project ? ({ draft: 18, published: 28, receiving_proposals: 42, matching: 34, professional_selected: 56, discussion: 62, in_progress: 72, awaiting_customer_review: 92, revision_required: 82, completed: 100, cancelled: 0, archived: 100 } as Record<Project["status"], number>)[project.status] : 0;
  const stages = vendor
    ? [{ label: "New leads", value: 8, width: "82%", color: "bg-blue-500" }, { label: "Proposals", value: 5, width: "62%", color: "bg-amber-500" }, { label: "In progress", value: 3, width: "44%", color: "bg-emerald-600" }]
    : [{ label: "Brief complete", value: project ? 100 : 0, width: project ? "100%" : "0%", color: "bg-emerald-600" }, { label: "Current stage", value: projectProgress, width: `${projectProgress}%`, color: "bg-blue-500" }, { label: "Execution", value: project?.status === "completed" ? 100 : project?.status === "in_progress" ? 72 : 0, width: project?.status === "completed" ? "100%" : project?.status === "in_progress" ? "72%" : "0%", color: "bg-amber-500" }];
  return (
    <section className="rounded-lg border border-[#e2e3e5] bg-white">
      <div className="flex items-center justify-between border-b border-[#ececef] px-4 py-3"><div><h3 className="text-sm font-semibold">{vendor ? "Pipeline health" : "Project progress"}</h3><p className="mt-0.5 text-[11px] text-[#898b90]">{vendor ? "Opportunities across your sales funnel" : project?.title ?? "Create a project to begin"}</p></div><button aria-label="More options" className="text-[#898b90]"><MoreHorizontal size={18} /></button></div>
      <div className="space-y-4 p-4">
        {stages.map((stage) => <div key={stage.label}><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium text-[#55585e]">{stage.label}</span><span className="font-semibold text-[#303238]">{vendor ? stage.value : `${stage.value}%`}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#ececef]"><div className={cn("h-full rounded-full", stage.color)} style={{ width: stage.width }} /></div></div>)}
      </div>
    </section>
  );
}

export function ActivityPanel({ vendor = false, items: liveItems }: { vendor?: boolean; items?: Array<{ title: string; detail: string; time: string }> }) {
  const items = liveItems ?? (vendor
    ? [{ icon: ClipboardList, title: "Proposal shortlisted", detail: "2BHK living room and kitchen refresh", time: "18m" }, { icon: FolderOpen, title: "New matching project", detail: "Contemporary apartment in Indiranagar", time: "2h" }, { icon: CalendarDays, title: "Site visit tomorrow", detail: "Complete villa interiors · 10:30 AM", time: "5h" }]
    : []);
  return (
    <section className="rounded-lg border border-[#e2e3e5] bg-white">
      <div className="flex items-center justify-between border-b border-[#ececef] px-4 py-3"><div><h3 className="text-sm font-semibold">Recent activity</h3><p className="mt-0.5 text-[11px] text-[#898b90]">Updates requiring your attention</p></div><button className="text-xs font-semibold text-[#666970] hover:text-[#202124]">View all</button></div>
      <div className="divide-y divide-[#eff0f1]">
        {items.length ? items.map((item) => { const Icon = "icon" in item ? item.icon : Clock3; return <div key={`${item.title}-${item.time}`} className="flex gap-3 px-4 py-3"><span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f1f3] text-[#65686e]"><Icon size={13} /></span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-[#34363a]">{item.title}</p><p className="mt-0.5 truncate text-[11px] capitalize text-[#83868b]">{item.detail}</p></div><span className="text-[10px] text-[#9a9ca1]">{item.time}</span></div>; }) : <div className="px-4 py-8 text-center text-xs text-[#898b90]">No recent activity yet.</div>}
      </div>
    </section>
  );
}
