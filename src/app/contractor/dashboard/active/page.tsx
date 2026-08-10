import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function ContractorActivePage() {
  const list = (await getProjectsForRole("contractor")).filter((project) => project.status === "in_progress");
  return <><DashboardHeader eyebrow="Operations" title="Active projects" text="Accepted execution work across planning, site activity, and handover." /><ListToolbar placeholder="Search active projects..." filters={["All stages", "Due date"]} /><div className="grid gap-3">{list.map((project) => <ProjectCard key={project.id} project={project} role="contractor" />)}</div></>;
}
