import { DashboardHeader, ListToolbar } from "@/components/sajivo/DashboardBlocks";
import { ProposalCard } from "@/components/sajivo/ProposalCard";
import { getProposals } from "@/lib/server/repository";

export default async function ContractorQuotationsPage() {
  const list = await getProposals("contractor");
  return (
    <>
      <DashboardHeader eyebrow="Sales pipeline" title="Quotations" text="Track submitted quotes from customer review through award." />
      <ListToolbar placeholder="Search quotations..." filters={["All status", "Recently updated"]} />
      <div className="grid gap-3">{list.map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} viewerRole="contractor" />)}</div>
    </>
  );
}
