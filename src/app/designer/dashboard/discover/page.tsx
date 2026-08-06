import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function DesignerDiscoverPage() {
  const list = await getProjectsForRole("designer");
  return (
    <>
      <DashboardHeader title="Discover Projects" text="Filter open customer briefs and submit scoped design proposals." />
      <div className="grid gap-4">{list.map((project) => <ProjectCard key={project.id} project={project} role="designer" />)}</div>
    </>
  );
}
