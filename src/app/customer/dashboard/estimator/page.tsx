import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { RangeEstimator } from "@/features/projects/RangeEstimator";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLeft, House } from "lucide-react";

export default function EstimatorPage() {
  return <><DashboardHeader eyebrow="Project planning" title="Budget range estimator" text="Build a structured requirement, see a transparent indicative range, and take the result into your project brief." action={<div className="flex flex-wrap gap-2"><ButtonLink href="/customer/dashboard/projects/new" variant="outline" size="sm"><ArrowLeft size={15} />Back to brief</ButtonLink><ButtonLink href="/customer/dashboard" variant="ghost" size="sm"><House size={15} />Home</ButtonLink></div>} /><RangeEstimator /></>;
}
