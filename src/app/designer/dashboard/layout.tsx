import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DesignerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="designer">{children}</DashboardShell>;
}
