import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNotifications } from "@/lib/server/repository";

export default async function NotificationsPage() {
  const list = await getNotifications();
  return (
    <main className="page-shell py-10">
      <DashboardHeader title="Notifications" text="Read proposal, workspace, status, file, verification, and review updates." />
      <Card>
        <CardContent>
          <Button variant="outline">Mark All Read</Button>
          <div className="mt-5 grid gap-3">
            {list.map((item) => <div key={item.id} className="rounded-md bg-[var(--rv-bg)] p-4"><p className="font-bold">{item.kind.replaceAll("_", " ")}</p><p className="mt-1 text-sm text-[var(--rv-ink-2)]">{item.message}</p></div>)}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
