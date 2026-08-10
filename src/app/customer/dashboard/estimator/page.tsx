import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { RangeEstimator } from "@/features/projects/RangeEstimator";

export default function EstimatorPage() {
  return <><DashboardHeader eyebrow="Project planning" title="Budget range estimator" text="Build a structured requirement, see a transparent indicative range, and take the result into your project brief." /><RangeEstimator /></>;
}
