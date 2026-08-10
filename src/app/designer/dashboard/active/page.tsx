import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function DesignerActivePage() {
  const list = (await getProjectsForRole("designer")).filter((project) => project.status === "in_progress");
  return <><DashboardHeader eyebrow="Delivery" title="Active projects" text="Accepted work moving through design and client collaboration." /><ListToolbar placeholder="Search active projects..." filters={["All stages", "Due date"]} /><div className="grid gap-3">{list.map((project) => <ProjectCard key={project.id} project={project} role="designer" />)}</div></>;
}
