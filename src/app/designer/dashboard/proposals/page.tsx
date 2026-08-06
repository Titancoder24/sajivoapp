import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProposalCard } from "@/components/sajivo/ProposalCard";
import { getProposals } from "@/lib/server/repository";

export default async function DesignerProposalsPage() {
  const list = await getProposals("designer");
  return (
    <>
      <DashboardHeader title="My Proposals" text="Track submitted, shortlisted, accepted, rejected, and withdrawn proposals." />
      <div className="grid gap-4">{list.map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} viewerRole="designer" />)}</div>
    </>
  );
}
