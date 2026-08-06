import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { WorkspaceView } from "@/features/workspace/WorkspaceView";

export default function CustomerWorkspacePage() {
  return <><DashboardHeader title="Project Workspace" text="Messages, files, activity, status updates, and final review live here." /><WorkspaceView /></>;
}
