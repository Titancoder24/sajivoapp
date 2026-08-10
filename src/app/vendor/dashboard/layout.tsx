import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireDashboardRole } from "@/lib/server/auth";
import { getCurrentProfile, getNotifications } from "@/lib/server/repository";

export default async function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("vendor");
  const [profile, notifications] = await Promise.all([getCurrentProfile(), getNotifications()]);
  return <DashboardShell role="vendor" userName={profile?.fullName} businessName={profile?.businessName ?? profile?.fullName} unreadNotifications={notifications.filter((item) => !item.readAt).length}>{children}</DashboardShell>;
}
