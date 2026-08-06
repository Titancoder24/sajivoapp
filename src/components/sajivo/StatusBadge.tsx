import { Badge } from "@/components/ui/badge";
import { projectStatusLabels, proposalStatusLabels } from "@/lib/constants";
import type { ProjectStatus, ProposalStatus } from "@/types/domain";

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge className="border-[rgba(198,93,71,0.25)] bg-[rgba(198,93,71,0.08)] text-[var(--rv-terracotta-dark)]">{projectStatusLabels[status]}</Badge>;
}

export function ProposalStatusBadge({ status }: { status: ProposalStatus }) {
  return <Badge className="border-[rgba(28,42,58,0.18)] bg-[rgba(28,42,58,0.06)] text-[var(--rv-slate)]">{proposalStatusLabels[status]}</Badge>;
}
