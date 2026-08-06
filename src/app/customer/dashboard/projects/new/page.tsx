import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectWizard } from "@/features/projects/ProjectWizard";

export default function NewProjectPage() {
  return (
    <>
      <DashboardHeader title="Create Project" text="Follow the six-step Sajivo wizard: scope, services, details, budget, files, and review." />
      <ProjectWizard />
    </>
  );
}
