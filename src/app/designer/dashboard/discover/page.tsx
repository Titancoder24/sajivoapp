import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function DesignerDiscoverPage() {
  const list = await getProjectsForRole("designer");
  return (
    <>
      <DashboardHeader eyebrow="Marketplace" title="Discover projects" text="Qualified briefs matched to your design services and location." />
      <ListToolbar placeholder="Search by scope, location or service..." filters={["All services", "Bengaluru", "Best match"]} />
      <div className="grid gap-3">{list.map((project) => <ProjectCard key={project.id} project={project} role="designer" />)}</div>
    </>
  );
}
