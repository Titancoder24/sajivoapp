import { ActivityPanel, DashboardHeader, ProgressOverview, SectionHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getDashboardSummary, getProjectsForRole } from "@/lib/server/repository";

export default async function ContractorDashboardPage() {
  const summary = await getDashboardSummary("contractor");
  const list = await getProjectsForRole("contractor");
  return (
    <>
      <DashboardHeader eyebrow="Khan BuildWorks" title="Operations overview" text="Stay ahead of new leads, quotations, site work, and client updates." action={<ButtonLink href="/contractor/dashboard/discover" size="sm" variant="secondary"><Search size={14} />Find projects</ButtonLink>} />
      <StatGrid stats={[{ label: "Active sites", value: summary.activeProjects, detail: "On schedule", trend: "up" }, { label: "Matching briefs", value: summary.publishedProjects, detail: "3 new", trend: "up" }, { label: "Open quotations", value: summary.proposals, detail: "2 pending", trend: "neutral" }, { label: "Needs attention", value: summary.unreadNotifications, detail: "Today", trend: "neutral" }]} />
      <div className="mt-5 grid gap-4 xl:grid-cols-2"><ProgressOverview vendor /><ActivityPanel vendor /></div>
      <div className="mt-7"><SectionHeader title="Execution opportunities" text="Matched to your capability and service area" action={<ButtonLink href="/contractor/dashboard/discover" size="sm" variant="ghost">View marketplace <ArrowRight size={13} /></ButtonLink>} /><div className="grid gap-3">{list.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} role="contractor" />)}</div></div>
    </>
  );
}
