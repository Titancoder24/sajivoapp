import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { WorkspaceView } from "@/features/workspace/WorkspaceView";

export default function ContractorWorkspacePage() {
  return <><DashboardHeader title="Project Workspace" text="Coordinate execution work, files, messages, and project states." /><WorkspaceView /></>;
}
