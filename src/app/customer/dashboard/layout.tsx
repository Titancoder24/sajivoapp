import { DashboardShell } from "@/components/layout/DashboardShell";

export default function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="customer">{children}</DashboardShell>;
}
