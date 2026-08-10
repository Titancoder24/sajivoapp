"use client";

import { CalendarDays, Check, Clock3, IndianRupee, MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProposalStatusBadge } from "@/components/sajivo/StatusBadge";
import { formatCurrency, initials } from "@/lib/utils";
import type { Proposal, UserRole } from "@/types/domain";

export function ProposalCard({ proposal, viewerRole }: { proposal: Proposal; viewerRole: UserRole }) {
  const amount = proposal.proposedAmount
    ? formatCurrency(proposal.proposedAmount)
    : `${formatCurrency(proposal.proposedAmountMin)} - ${formatCurrency(proposal.proposedAmountMax)}`;
  return (
    <article className="overflow-hidden rounded-lg border border-[#e2e3e5] bg-white transition-shadow hover:shadow-[0_4px_18px_rgba(20,24,32,0.05)]">
      <div className="flex items-start gap-3 border-b border-[#eff0f1] px-4 py-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ebe5e1] text-xs font-bold text-[#5d4338]">{initials(proposal.professionalName)}</span>
        <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-sm font-bold text-[#292b2f]">{proposal.professionalName}</h3><ProposalStatusBadge status={proposal.status} /></div><p className="mt-0.5 text-[11px] capitalize text-[#85888d]">{proposal.professionalRole} · Submitted recently</p></div>
        <button aria-label="Proposal options" className="text-[#8d9094]"><MoreHorizontal size={18} /></button>
      </div>

      <div className="grid md:grid-cols-[minmax(0,1fr)_260px]">
        <div className="px-4 py-4">
          <p className="text-xs leading-5 text-[#65686e]">{proposal.message}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {proposal.deliverables.slice(0, 4).map((item) => <span key={item} className="inline-flex items-center gap-1 rounded-md bg-[#f4f4f5] px-2 py-1 text-[10px] font-medium text-[#62656a]"><Check size={10} className="text-emerald-700" />{item}</span>)}
          </div>
        </div>
        <div className="border-t border-[#eff0f1] bg-[#fcfcfc] px-4 py-4 md:border-l md:border-t-0">
          <div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-wide text-[#96989d]">Proposal value</p><p className="mt-1 text-lg font-bold text-[#292b2f]">{amount}</p></div><IndianRupee size={16} className="mt-0.5 text-[#8a8d92]" /></div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#74777c]"><Clock3 size={12} /> Estimated {proposal.estimatedTimeline}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {viewerRole === "customer" ? <><Button size="sm" onClick={() => toast.success("Proposal accepted and workspace opened")}><Check size={14} />Accept</Button><Button size="sm" variant="outline" onClick={() => toast.success("Proposal shortlisted")}><CalendarDays size={14} />Shortlist</Button><Button aria-label="Reject proposal" size="icon" variant="ghost" className="h-9 w-9" onClick={() => toast.info("Proposal rejected")}><X size={15} /></Button></> : <><Button size="sm" variant="secondary" onClick={() => toast.success("Workspace opened")}>Open workspace</Button><Button size="sm" variant="ghost" onClick={() => toast.info("Proposal withdrawn")}>Withdraw</Button></>}
          </div>
        </div>
      </div>
    </article>
  );
}
