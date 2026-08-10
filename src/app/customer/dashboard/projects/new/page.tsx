import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProjectWizard } from "@/features/projects/ProjectWizard";
import { ButtonLink } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export default function NewProjectPage() {
  return (
    <>
      <DashboardHeader title="Create Project" text="Follow the six-step Sajivo wizard: scope, services, details, budget, files, and review." action={<ButtonLink href="/customer/dashboard/estimator" variant="outline" size="sm"><Calculator size={15} />Start with budget estimator</ButtonLink>} />
      <ProjectWizard />
    </>
  );
}
