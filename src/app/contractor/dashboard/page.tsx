import { DashboardHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getDashboardSummary, getProjectsForRole } from "@/lib/server/repository";

export default async function ContractorDashboardPage() {
  const summary = await getDashboardSummary("contractor");
  const list = await getProjectsForRole("contractor");
  return (
    <>
      <DashboardHeader title="Contractor Dashboard" text="Find execution-ready briefs, submit quotations, coordinate workspace files, and maintain verified trust." />
      <StatGrid stats={[{ label: "Active projects", value: summary.activeProjects }, { label: "Open briefs", value: summary.publishedProjects }, { label: "Quotations", value: summary.proposals }, { label: "Unread alerts", value: summary.unreadNotifications }]} />
      <div className="mt-6 grid gap-4">{list.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} role="contractor" />)}</div>
    </>
  );
}
