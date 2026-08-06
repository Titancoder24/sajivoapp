import { DashboardShell } from "@/components/layout/DashboardShell";

export default function ContractorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="contractor">{children}</DashboardShell>;
}
