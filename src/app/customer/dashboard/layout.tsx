import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireDashboardRole } from "@/lib/server/auth";
import { getCurrentProfile, getNotifications } from "@/lib/server/repository";

export default async function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireDashboardRole("customer");
  const [profile, notifications] = await Promise.all([getCurrentProfile(), getNotifications()]);
  return <DashboardShell role="customer" userName={profile?.fullName} businessName="Homeowner workspace" unreadNotifications={notifications.filter((item) => !item.readAt).length}>{children}</DashboardShell>;
}
