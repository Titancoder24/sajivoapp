import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, MapPin, MessageSquare, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectStatusBadge } from "@/components/sajivo/StatusBadge";
import { cn, daysAgo } from "@/lib/utils";
import type { Project, UserRole } from "@/types/domain";

const progressByStatus: Record<Project["status"], number> = {
  draft: 18,
  published: 28,
  receiving_proposals: 42,
  matching: 34,
  professional_selected: 56,
  discussion: 62,
  in_progress: 72,
  awaiting_customer_review: 92,
  revision_required: 82,
  completed: 100,
  cancelled: 0,
  archived: 100,
};

export function ProjectCard({ project, role }: { project: Project; role: UserRole }) {
  const base = role === "customer" ? "/customer/dashboard/projects" : `/${role}/dashboard/discover`;
  const href = `${base}/${project.id}`;
  const progress = progressByStatus[project.status];
  const isVendor = role !== "customer";

  return (
    <article className="group overflow-hidden rounded-lg border border-[#e2e3e5] bg-white transition-all hover:border-[#cfd0d3] hover:shadow-[0_4px_18px_rgba(20,24,32,0.06)]">
      <div className="flex items-start gap-3 border-b border-[#eff0f1] px-4 py-3.5 md:items-center">
        <span className={cn("mt-0.5 h-8 w-1 shrink-0 rounded-full md:mt-0", project.status === "in_progress" ? "bg-emerald-500" : project.status === "draft" ? "bg-[#b5b7ba]" : "bg-[var(--rv-terracotta)]")} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <span className="text-[10px] font-medium uppercase tracking-wide text-[#9a9ca1]">{project.scopeLabel}</span>
          </div>
          <Link href={href} className="mt-1.5 block truncate text-[15px] font-bold text-[#25272b] hover:text-[var(--rv-terracotta-dark)]">{project.title}</Link>
        </div>
        <button aria-label="Project options" className="rv-focus flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#8a8c91] hover:bg-[#f2f2f3]"><MoreHorizontal size={18} /></button>
      </div>

      <div className="grid gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_230px]">
        <div className="min-w-0">
          <p className="line-clamp-2 text-xs leading-5 text-[#6f7278]">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.services.slice(0, 3).map((service) => <Badge key={service} className="rounded-md bg-[#fafafa] px-2 py-1 text-[10px] font-medium">{service}</Badge>)}
            {project.services.length > 3 && <Badge className="rounded-md bg-[#fafafa] px-2 py-1 text-[10px] font-medium">+{project.services.length - 3}</Badge>}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#777a80]">
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {project.locality}, {project.city}</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {project.expectedTimeline ?? daysAgo(project.createdAt)}</span>
            <span className="flex items-center gap-1.5"><FileText size={13} /> {project.filesCount} {project.filesCount === 1 ? "file" : "files"}</span>
            <span className="flex items-center gap-1.5"><MessageSquare size={13} /> {project.proposalsCount} {isVendor ? "bids" : "proposals"}</span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-[#eff0f1] pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
          <div>
            <div className="flex items-center justify-between text-[11px]"><span className="text-[#85888d]">Progress</span><span className="font-semibold text-[#44474c]">{progress}%</span></div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#ececef]"><div className={cn("h-full rounded-full", progress === 100 ? "bg-emerald-600" : "bg-[#5965c5]")} style={{ width: `${progress}%` }} /></div>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-wide text-[#9a9ca1]">Budget</p>
            <p className="mt-0.5 truncate text-xs font-semibold text-[#3d4045]">{project.budgetRange}</p>
          </div>
          <Link href={href} className="rv-focus mt-4 inline-flex h-8 items-center justify-center gap-2 rounded-md border border-[#d9dade] bg-white px-3 text-xs font-semibold text-[#3f4247] hover:bg-[#f7f7f8]">
            {isVendor ? "Review brief" : project.status === "draft" ? "Continue brief" : "Open project"}<ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
