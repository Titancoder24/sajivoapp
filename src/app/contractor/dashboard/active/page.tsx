import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function ContractorActivePage() {
  const list = (await getProjectsForRole("contractor")).filter((project) => project.status === "in_progress");
  return <><DashboardHeader title="Active Projects" text="Accepted execution work that has moved into workspace collaboration." /><div className="grid gap-4">{list.map((project) => <ProjectCard key={project.id} project={project} role="contractor" />)}</div></>;
}
