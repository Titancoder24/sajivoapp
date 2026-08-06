import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { EmptyWorkflow } from "@/components/sajivo/SimpleWorkflowPages";

export default function ContractorMessagesPage() {
  return <><DashboardHeader title="Messages" text="Contractor conversations stay attached to project workspaces." /><EmptyWorkflow title="Open a workspace" text="Messages, files, status, and activity are grouped per accepted project." /></>;
}
