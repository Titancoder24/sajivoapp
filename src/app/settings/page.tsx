import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { EmptyWorkflow } from "@/components/sajivo/SimpleWorkflowPages";

export default function SettingsPage() {
  return <main className="page-shell py-10"><DashboardHeader title="Settings" text="Control account security, notification preferences, and app install preferences." /><EmptyWorkflow title="Production settings shell" text="Settings are ready for Supabase Auth password updates, notification toggles, and account controls." action="Save Settings" /></main>;
}
