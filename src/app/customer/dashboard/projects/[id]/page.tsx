import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProposalCard } from "@/components/sajivo/ProposalCard";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { ButtonLink } from "@/components/ui/button";
import { getProjectById, getProposals } from "@/lib/server/repository";

export default async function CustomerProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  const projectProposals = (await getProposals("customer")).filter((proposal) => proposal.projectId === project.id);
  return (
    <>
      <DashboardHeader title="Project Detail" text="Review the brief, files, project state, and proposal actions." action={<ButtonLink href={`/customer/dashboard/workspace/${project.id}`} variant="outline">Open Workspace</ButtonLink>} />
      <ProjectCard project={project} role="customer" />
      <h2 className="font-display mt-6 text-3xl">Proposals</h2>
      <div className="mt-4 grid gap-4">{projectProposals.map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} viewerRole="customer" />)}</div>
    </>
  );
}
