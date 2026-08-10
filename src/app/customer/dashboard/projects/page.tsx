import { ButtonLink } from "@/components/ui/button";
import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { Plus } from "lucide-react";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { getProjectsForRole } from "@/lib/server/repository";

export default async function CustomerProjectsPage() {
  const list = await getProjectsForRole("customer");
  return (
    <>
      <DashboardHeader eyebrow="Portfolio" title="Projects" text="Create briefs, compare proposals, and track delivery from one view." action={<ButtonLink href="/customer/dashboard/projects/new" size="sm"><Plus size={14} />New project</ButtonLink>} />
      <ListToolbar placeholder="Search your projects..." filters={["All status", "Recently updated"]} />
      <div className="grid gap-3">{list.map((project) => <ProjectCard key={project.id} project={project} role="customer" />)}</div>
    </>
  );
}
