import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { VerificationManager } from "@/components/sajivo/SimpleWorkflowPages";

export default function ContractorVerificationsPage() {
  return <><DashboardHeader title="Verifications" text="Submit identity, business, and experience documents for review." /><VerificationManager /></>;
}
