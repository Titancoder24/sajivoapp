import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { EmptyWorkflow } from "@/components/sajivo/SimpleWorkflowPages";

export default function DesignerMessagesPage() {
  return <><DashboardHeader title="Messages" text="Designer conversations stay attached to project workspaces." /><EmptyWorkflow title="Open a workspace" text="Messages, files, status, and activity are grouped per accepted project." /></>;
}
