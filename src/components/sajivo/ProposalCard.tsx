"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProposalStatusBadge } from "@/components/sajivo/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import type { Proposal, UserRole } from "@/types/domain";

export function ProposalCard({ proposal, viewerRole }: { proposal: Proposal; viewerRole: UserRole }) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
          <div>
            <ProposalStatusBadge status={proposal.status} />
            <h3 className="font-display mt-3 text-2xl">{proposal.professionalName}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--rv-ink-2)]">{proposal.message}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl">{proposal.proposedAmount ? formatCurrency(proposal.proposedAmount) : `${formatCurrency(proposal.proposedAmountMin)} - ${formatCurrency(proposal.proposedAmountMax)}`}</p>
            <p className="text-sm text-[var(--rv-ink-2)]">{proposal.estimatedTimeline}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {viewerRole === "customer" ? (
            <>
              <Button variant="outline" onClick={() => toast.success("Proposal shortlisted")}>Shortlist</Button>
              <Button onClick={() => toast.success("Proposal accepted and workspace opened")}>Accept Proposal</Button>
              <Button variant="ghost" onClick={() => toast.info("Proposal rejected")}>Reject</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => toast.success("Workspace opened")}>Open Workspace</Button>
              <Button variant="ghost" onClick={() => toast.info("Proposal withdrawn")}>Withdraw</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
