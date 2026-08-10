import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function ContractorDiscoverPage() {
  const list = await getProjectsForRole("contractor");
  return (
    <>
      <DashboardHeader eyebrow="Marketplace" title="Discover projects" text="Execution-ready briefs matched to your capability and service area." />
      <ListToolbar placeholder="Search by work type, location or budget..." filters={["All trades", "Bengaluru", "Best match"]} />
      <div className="grid gap-3">{list.map((project) => <ProjectCard key={project.id} project={project} role="contractor" />)}</div>
    </>
  );
}
