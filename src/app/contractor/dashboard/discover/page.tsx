import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function ContractorDiscoverPage() {
  const list = await getProjectsForRole("contractor");
  return (
    <>
      <DashboardHeader title="Discover Projects" text="Filter execution-ready briefs and submit clear quotations." />
      <div className="grid gap-4">{list.map((project) => <ProjectCard key={project.id} project={project} role="contractor" />)}</div>
    </>
  );
}
