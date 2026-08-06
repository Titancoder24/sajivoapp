import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectWizard } from "@/features/projects/ProjectWizard";

export default function EditProjectPage() {
  return (
    <>
      <DashboardHeader title="Edit Draft" text="Update the project brief, save draft progress, or publish when ready." />
      <ProjectWizard />
    </>
  );
}
