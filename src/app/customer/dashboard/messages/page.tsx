import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { EmptyWorkflow } from "@/components/sajivo/SimpleWorkflowPages";

export default function CustomerMessagesPage() {
  return <><DashboardHeader title="Messages" text="Customer messages are organized inside accepted project workspaces." /><EmptyWorkflow title="Workspace-first messaging" text="Open an accepted project workspace to continue project-specific conversations." /></>;
}
