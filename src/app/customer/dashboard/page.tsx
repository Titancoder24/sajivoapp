import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { DashboardHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { getDashboardSummary, getProjectsForRole } from "@/lib/server/repository";

export default async function CustomerDashboardPage() {
  const summary = await getDashboardSummary("customer");
  const list = await getProjectsForRole("customer");
  return (
    <>
      <DashboardHeader title="Customer Dashboard" text="Track project briefs, proposal activity, accepted professionals, workspace updates, and reviews." action={<ButtonLink href="/customer/dashboard/projects/new">Create New Project</ButtonLink>} />
      <StatGrid stats={[{ label: "Active projects", value: summary.activeProjects }, { label: "Published projects", value: summary.publishedProjects }, { label: "Proposals", value: summary.proposals }, { label: "Unread alerts", value: summary.unreadNotifications }]} />
      <div className="mt-6 grid gap-4">{list.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} role="customer" />)}</div>
    </>
  );
}
