import { ButtonLink } from "@/components/ui/button";
import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function CustomerProjectsPage() {
  const list = await getProjectsForRole("customer");
  return (
    <>
      <DashboardHeader title="My Projects" text="Create, edit, publish, archive, and open every project brief." action={<ButtonLink href="/customer/dashboard/projects/new">Create New Project</ButtonLink>} />
      <div className="grid gap-4">{list.map((project) => <ProjectCard key={project.id} project={project} role="customer" />)}</div>
    </>
  );
}
