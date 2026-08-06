import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { WorkspaceView } from "@/features/workspace/WorkspaceView";

export default function DesignerWorkspacePage() {
  return <><DashboardHeader title="Project Workspace" text="Collaborate with the customer after proposal acceptance." /><WorkspaceView /></>;
}
