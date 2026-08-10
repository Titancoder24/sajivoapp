import { Bell, CheckCheck, CircleDollarSign, FileText, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/sajivo/DashboardBlocks";
import { Button } from "@/components/ui/button";
import { getNotifications } from "@/lib/server/repository";

const notificationMeta = {
  proposal: { icon: CircleDollarSign, color: "bg-emerald-50 text-emerald-700" },
  workspace: { icon: MessageSquare, color: "bg-blue-50 text-blue-700" },
  file: { icon: FileText, color: "bg-amber-50 text-amber-700" },
  verification: { icon: ShieldCheck, color: "bg-violet-50 text-violet-700" },
  default: { icon: Sparkles, color: "bg-[rgba(198,93,71,0.1)] text-[var(--rv-terracotta)]" },
};

function metaFor(kind: string) {
  const key = Object.keys(notificationMeta).find((item) => kind.toLowerCase().includes(item));
  return notificationMeta[(key as keyof typeof notificationMeta) ?? "default"];
}

function relativeDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(parsed);
}

export default async function NotificationsPage() {
  const list = await getNotifications();
  const unread = list.filter((item) => !item.readAt).length;
  return (
    <main className="page-shell py-6 sm:py-10">
      <DashboardHeader title="Notifications" text="A focused view of proposals, workspace updates, files, and account activity." action={<Button variant="outline"><CheckCheck size={16} /> Mark all read</Button>} />
      <section className="overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white">
        <header className="flex items-center justify-between gap-4 border-b border-[var(--rv-border)] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2"><Bell size={17} /><h2 className="text-sm font-bold">Inbox</h2>{unread > 0 && <span className="rounded-full bg-[var(--rv-terracotta)] px-2 py-0.5 text-[11px] font-bold text-white">{unread}</span>}</div>
          <div className="flex rounded-md bg-[var(--rv-bg)] p-1 text-xs font-semibold"><span className="rounded bg-white px-3 py-1.5 shadow-sm">All</span><span className="px-3 py-1.5 text-[var(--rv-ink-2)]">Unread</span></div>
        </header>
        {list.length ? <div className="divide-y divide-[var(--rv-border)]">{list.map((item) => { const meta = metaFor(item.kind); const Icon = meta.icon; return <article key={item.id} className={`group relative flex gap-3 px-4 py-4 transition hover:bg-[var(--rv-bg)] sm:gap-4 sm:px-5 ${item.readAt ? "" : "bg-[rgba(198,93,71,0.025)]"}`}>{!item.readAt && <span className="absolute left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--rv-terracotta)]" />}<span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md ${meta.color}`}><Icon size={17} /></span><div className="min-w-0 flex-1"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><p className={`text-sm leading-6 ${item.readAt ? "font-medium" : "font-bold"}`}>{item.message}</p><time className="shrink-0 text-xs text-[var(--rv-ink-2)]" dateTime={item.createdAt}>{relativeDate(item.createdAt)}</time></div><p className="mt-1 text-xs capitalize text-[var(--rv-ink-2)]">{item.kind.replaceAll("_", " ")}</p></div><button type="button" className="rv-focus absolute right-4 top-10 hidden rounded-md border border-[var(--rv-border)] bg-white px-2 py-1 text-xs font-semibold shadow-sm group-hover:block">Open</button></article>; })}</div> : <div className="px-5 py-16 text-center"><Bell className="mx-auto text-[var(--rv-ink-2)]" /><h2 className="font-display mt-3 text-xl">You’re all caught up</h2><p className="mt-1 text-sm text-[var(--rv-ink-2)]">New project activity will appear here.</p></div>}
      </section>
    </main>
  );
}
