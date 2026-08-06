import { DashboardHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getDashboardSummary, getProjectsForRole } from "@/lib/server/repository";

export default async function DesignerDashboardPage() {
  const summary = await getDashboardSummary("designer");
  const list = await getProjectsForRole("designer");
  return (
    <>
      <DashboardHeader title="Designer Dashboard" text="Discover design-led projects, manage proposals, maintain portfolio credibility, and collaborate after acceptance." />
      <StatGrid stats={[{ label: "Active projects", value: summary.activeProjects }, { label: "Discoverable briefs", value: summary.publishedProjects }, { label: "My proposals", value: summary.proposals }, { label: "Unread alerts", value: summary.unreadNotifications }]} />
      <div className="mt-6 grid gap-4">{list.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} role="designer" />)}</div>
    </>
  );
}
