import { ActivityPanel, DashboardHeader, ProgressOverview, SectionHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getDashboardSummary, getProjectsForRole } from "@/lib/server/repository";

export default async function DesignerDashboardPage() {
  const summary = await getDashboardSummary("designer");
  const list = await getProjectsForRole("designer");
  return (
    <>
      <DashboardHeader eyebrow="Studio Meera" title="Design business overview" text="Monitor your opportunity pipeline, active work, and client activity." action={<ButtonLink href="/designer/dashboard/discover" size="sm" variant="secondary"><Search size={14} />Discover work</ButtonLink>} />
      <StatGrid stats={[{ label: "Active projects", value: summary.activeProjects, detail: "On track", trend: "up" }, { label: "Matching briefs", value: summary.publishedProjects, detail: "3 new", trend: "up" }, { label: "Open proposals", value: summary.proposals, detail: "40% win rate", trend: "up" }, { label: "Needs attention", value: summary.unreadNotifications, detail: "Today", trend: "neutral" }]} />
      <div className="mt-5 grid gap-4 xl:grid-cols-2"><ProgressOverview vendor /><ActivityPanel vendor /></div>
      <div className="mt-7"><SectionHeader title="Recommended opportunities" text="Matched to your services and location" action={<ButtonLink href="/designer/dashboard/discover" size="sm" variant="ghost">View marketplace <ArrowRight size={13} /></ButtonLink>} /><div className="grid gap-3">{list.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} role="designer" />)}</div></div>
    </>
  );
}
