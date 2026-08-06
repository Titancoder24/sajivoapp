import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { EmptyWorkflow } from "@/components/sajivo/SimpleWorkflowPages";

export default function ReviewsPage() {
  return <><DashboardHeader title="Reviews" text="Leave and manage project reviews after a project is completed." /><EmptyWorkflow title="Review workflow" text="Completed workspaces open a review dialog with rating and written feedback." action="Write Demo Review" /></>;
}
