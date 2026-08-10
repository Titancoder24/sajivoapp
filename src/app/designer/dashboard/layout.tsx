import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireDashboardRole } from "@/lib/server/auth";
import { getCurrentProfile, getNotifications } from "@/lib/server/repository";

export default async function DesignerDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("designer");
  const [profile, notifications] = await Promise.all([getCurrentProfile(), getNotifications()]);
  return <DashboardShell role="designer" userName={profile?.fullName} businessName={profile?.businessName ?? profile?.fullName} unreadNotifications={notifications.filter((item) => !item.readAt).length}>{children}</DashboardShell>;
}
