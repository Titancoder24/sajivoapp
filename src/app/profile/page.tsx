import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { ProfileForm } from "@/components/sajivo/SimpleWorkflowPages";

export default function ProfilePage() {
  return <main className="page-shell py-10"><DashboardHeader title="Profile" text="Edit personal, business, city, service area, services, and professional information." /><ProfileForm /></main>;
}
