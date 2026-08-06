import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProposalCard } from "@/components/sajivo/ProposalCard";
import { getProposals } from "@/lib/server/repository";

export default async function ContractorQuotationsPage() {
  const list = await getProposals("contractor");
  return (
    <>
      <DashboardHeader title="My Quotations" text="Track submitted, shortlisted, accepted, rejected, and withdrawn quotations." />
      <div className="grid gap-4">{list.map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} viewerRole="contractor" />)}</div>
    </>
  );
}
