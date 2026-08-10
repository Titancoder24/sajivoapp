import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { ProposalCard } from "@/components/sajivo/ProposalCard";
import { getProposals } from "@/lib/server/repository";

export default async function DesignerProposalsPage() {
  const list = await getProposals("designer");
  return (
    <>
      <DashboardHeader eyebrow="Sales pipeline" title="Proposals" text="Track every submitted proposal from review through acceptance." />
      <ListToolbar placeholder="Search proposals..." filters={["All status", "Recently updated"]} />
      <div className="grid gap-3">{list.map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} viewerRole="designer" />)}</div>
    </>
  );
}
