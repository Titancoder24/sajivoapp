import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { EmptyWorkflow } from "@/components/sajivo/SimpleWorkflowPages";

export default function SavedPage() {
  return <><DashboardHeader title="Saved Professionals" text="Keep favorite designers and contractors for later comparison." /><EmptyWorkflow title="Saved list ready" text="Professional cards can be saved from directory and public profile pages." action="Add demo saved professional" /></>;
}
