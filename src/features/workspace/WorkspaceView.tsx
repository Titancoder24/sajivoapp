"use client";

import {
  Activity,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileImage,
  FileText,
  FolderOpen,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Send,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const tabs = [
  { label: "Overview", icon: Activity },
  { label: "Messages", icon: MessageSquare },
  { label: "Files", icon: FolderOpen },
  { label: "Activity", icon: Clock3 },
] as const;

const milestones = [
  { title: "Design direction approved", date: "12 Aug", state: "done" },
  { title: "Material selections", date: "18 Aug", state: "current" },
  { title: "Execution begins", date: "26 Aug", state: "upcoming" },
  { title: "Final walkthrough", date: "18 Oct", state: "upcoming" },
] as const;

const projectFiles = [
  { name: "Living-room-concept.pdf", meta: "PDF · 8.4 MB", icon: FileText },
  { name: "Material-palette-v2.jpg", meta: "JPG · 3.1 MB", icon: FileImage },
  { name: "Revised-estimate.pdf", meta: "PDF · 420 KB", icon: FileText },
];

export function WorkspaceView() {
  const [tab, setTab] = useState<(typeof tabs)[number]["label"]>("Overview");
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([false, false, true]);

  function sendMessage() {
    if (!message.trim()) return;
    toast.success("Message sent");
    setMessage("");
  }

  return (
    <section className="overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white">
      <header className="border-b border-[var(--rv-border)] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-2xl">Living room & kitchen refresh</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In progress
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--rv-ink-2)]">Indiranagar, Bengaluru · Updated 12 minutes ago</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2" aria-label="Project collaborators">
              {['AS', 'RK', 'NM'].map((initials, index) => (
                <span key={initials} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-[var(--rv-bg)] text-xs font-bold" style={{ zIndex: 3 - index }}>{initials}</span>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.success("Invite link copied")}><Users size={15} /> Invite</Button>
            <Button variant="ghost" size="icon" aria-label="More project options"><MoreHorizontal size={18} /></Button>
          </div>
        </div>
      </header>

      <nav className="flex overflow-x-auto border-b border-[var(--rv-border)] px-3 sm:px-5" aria-label="Workspace sections">
        {tabs.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setTab(label)}
            aria-current={tab === label ? "page" : undefined}
            className={`rv-focus flex min-h-12 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-semibold transition-colors ${tab === label ? "border-[var(--rv-terracotta)] text-[var(--rv-ink)]" : "border-transparent text-[var(--rv-ink-2)] hover:text-[var(--rv-ink)]"}`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      <div className="bg-[var(--rv-bg)] p-3 sm:p-5">
        {tab === "Overview" && (
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-4">
              <section className="rounded-lg border border-[var(--rv-border)] bg-white p-5" aria-labelledby="timeline-title">
                <div className="flex items-center justify-between gap-3">
                  <div><p className="text-xs font-bold uppercase text-[var(--rv-ink-2)]">Project timeline</p><h3 id="timeline-title" className="mt-1 font-display text-xl">On track for 18 October</h3></div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">32% complete</span>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[var(--rv-bg)]"><div className="h-full w-[32%] rounded-full bg-[var(--rv-terracotta)]" /></div>
                <ol className="mt-6 grid gap-0 sm:grid-cols-4">
                  {milestones.map((item, index) => (
                    <li key={item.title} className="relative flex gap-3 pb-5 last:pb-0 sm:block sm:pb-0 sm:pr-3">
                      {index < milestones.length - 1 && <span className="absolute left-3 top-6 h-[calc(100%-16px)] w-px bg-[var(--rv-border)] sm:left-6 sm:top-3 sm:h-px sm:w-[calc(100%-12px)]" />}
                      <span className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${item.state === "done" ? "border-emerald-500 bg-emerald-500 text-white" : item.state === "current" ? "border-[var(--rv-terracotta)] bg-white text-[var(--rv-terracotta)]" : "border-[var(--rv-border)] bg-white text-[var(--rv-ink-2)]"}`}>
                        {item.state === "done" ? <Check size={13} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                      </span>
                      <div className="sm:mt-3"><p className="text-sm font-semibold leading-5">{item.title}</p><p className="mt-0.5 text-xs text-[var(--rv-ink-2)]">{item.date}</p></div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-lg border border-[var(--rv-border)] bg-white" aria-labelledby="tasks-title">
                <div className="flex items-center justify-between border-b border-[var(--rv-border)] px-5 py-4"><div><h3 id="tasks-title" className="font-bold">Tasks & decisions</h3><p className="mt-0.5 text-xs text-[var(--rv-ink-2)]">2 items need your attention</p></div><Button variant="ghost" size="sm">View all</Button></div>
                <div className="divide-y divide-[var(--rv-border)]">
                  {["Approve warm oak veneer sample", "Confirm pendant-light dimensions", "Share appliance model numbers"].map((title, index) => (
                    <label key={title} className="flex cursor-pointer items-center gap-3 px-5 py-4 hover:bg-[var(--rv-bg)]">
                      <input type="checkbox" checked={tasks[index]} onChange={() => setTasks((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className="h-4 w-4 accent-[var(--rv-terracotta)]" />
                      <span className={`min-w-0 flex-1 text-sm font-medium ${tasks[index] ? "text-[var(--rv-ink-2)] line-through" : ""}`}>{title}</span>
                      <span className="hidden text-xs text-[var(--rv-ink-2)] sm:block">{index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Completed"}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <aside className="grid content-start gap-4">
              <section className="rounded-lg border border-[var(--rv-border)] bg-white p-5">
                <p className="text-xs font-bold uppercase text-[var(--rv-ink-2)]">Accepted proposal</p>
                <p className="mt-2 font-display text-3xl">₹8,50,000</p>
                <p className="mt-1 text-sm text-[var(--rv-ink-2)]">8-10 week delivery</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className="rounded-md bg-[var(--rv-bg)] p-3"><span className="text-[var(--rv-ink-2)]">Paid</span><p className="mt-1 font-bold">₹2,12,500</p></div><div className="rounded-md bg-[var(--rv-bg)] p-3"><span className="text-[var(--rv-ink-2)]">Next due</span><p className="mt-1 font-bold">26 Aug</p></div></div>
                <Button className="mt-4 w-full" variant="outline" onClick={() => toast.success("Payment schedule opened")}>View payment schedule</Button>
              </section>
              <section className="rounded-lg border border-[var(--rv-border)] bg-white p-5">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(198,93,71,0.12)] font-bold text-[var(--rv-terracotta)]">NM</span><div><p className="font-semibold">Nisha Menon Studio</p><p className="text-xs text-[var(--rv-ink-2)]">Lead designer</p></div></div>
                <Button className="mt-4 w-full" variant="secondary" onClick={() => setTab("Messages")}><MessageSquare size={15} /> Message professional</Button>
              </section>
            </aside>
          </div>
        )}

        {tab === "Messages" && (
          <section className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white">
            <header className="flex items-center justify-between border-b border-[var(--rv-border)] px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[rgba(198,93,71,0.12)] text-xs font-bold text-[var(--rv-terracotta)]">NM</span><div><p className="text-sm font-bold">Nisha Menon Studio</p><p className="text-xs text-emerald-600">Active now</p></div></div><Button variant="ghost" size="icon" aria-label="Conversation options"><MoreHorizontal size={18} /></Button></header>
            <div className="grid min-h-[380px] content-end gap-4 p-4 sm:p-6" aria-live="polite">
              <p className="mx-auto rounded-full bg-[var(--rv-bg)] px-3 py-1 text-xs text-[var(--rv-ink-2)]">Today</p>
              <div className="max-w-[82%] rounded-lg rounded-bl-sm bg-[var(--rv-bg)] p-3 text-sm leading-6">I’ve uploaded two warm material palettes. The first keeps the cabinetry light while adding depth through the TV wall.<span className="mt-1 block text-[11px] text-[var(--rv-ink-2)]">10:24 AM</span></div>
              <div className="ml-auto max-w-[82%] rounded-lg rounded-br-sm bg-[var(--rv-slate)] p-3 text-sm leading-6 text-white">The first direction feels right. Could we compare it with a slightly warmer oak?<span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-white/70">10:31 AM <CheckCircle2 size={12} /></span></div>
            </div>
            <form className="flex items-center gap-2 border-t border-[var(--rv-border)] p-3" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}><Button type="button" variant="ghost" size="icon" aria-label="Attach a file"><Paperclip size={18} /></Button><Input aria-label="Message" placeholder="Write a message…" value={message} onChange={(event) => setMessage(event.target.value)} /><Button type="submit" size="icon" aria-label="Send message" disabled={!message.trim()}><Send size={17} /></Button></form>
          </section>
        )}

        {tab === "Files" && (
          <section className="rounded-lg border border-[var(--rv-border)] bg-white">
            <header className="flex flex-col gap-3 border-b border-[var(--rv-border)] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-bold">Project files</h3><p className="mt-1 text-sm text-[var(--rv-ink-2)]">Drawings, estimates, references and execution documents</p></div><Button onClick={() => toast.success("Files queued for upload")}><Upload size={16} /> Upload files</Button></header>
            <div className="divide-y divide-[var(--rv-border)]">
              {projectFiles.map(({ name, meta, icon: Icon }) => <div key={name} className="flex items-center gap-3 px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-md bg-[var(--rv-bg)] text-[var(--rv-terracotta)]"><Icon size={19} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{name}</p><p className="mt-0.5 text-xs text-[var(--rv-ink-2)]">{meta} · Uploaded today</p></div><Button variant="ghost" size="icon" aria-label={`Download ${name}`}><Download size={17} /></Button></div>)}
            </div>
            <button type="button" onClick={() => toast.success("Files queued for upload")} className="rv-focus m-5 flex w-[calc(100%-40px)] flex-col items-center rounded-lg border border-dashed border-[var(--rv-border)] bg-[var(--rv-bg)] p-8 text-center hover:border-[var(--rv-terracotta)]"><Upload className="text-[var(--rv-terracotta)]" /><span className="mt-3 font-semibold">Drop files here or browse</span><span className="mt-1 text-xs text-[var(--rv-ink-2)]">PDF, JPG, PNG or DWG up to 25 MB</span></button>
          </section>
        )}

        {tab === "Activity" && (
          <section className="mx-auto max-w-3xl rounded-lg border border-[var(--rv-border)] bg-white p-5">
            <h3 className="font-bold">Project activity</h3>
            <ol className="mt-5 space-y-0">
              {[
                { icon: FileText, title: "Nisha uploaded Revised-estimate.pdf", meta: "12 minutes ago" },
                { icon: MessageSquare, title: "You replied in project chat", meta: "Today, 10:31 AM" },
                { icon: CalendarDays, title: "Material selection milestone moved to 18 Aug", meta: "Yesterday" },
                { icon: CheckCircle2, title: "Proposal accepted and workspace opened", meta: "8 Aug, 4:20 PM" },
              ].map(({ icon: Icon, title, meta }, index, items) => <li key={title} className="relative flex gap-4 pb-6 last:pb-0">{index < items.length - 1 && <span className="absolute left-4 top-8 h-[calc(100%-16px)] w-px bg-[var(--rv-border)]" />}<span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--rv-border)] bg-white text-[var(--rv-terracotta)]"><Icon size={15} /></span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-[var(--rv-ink-2)]">{meta}</p></div></li>)}
            </ol>
          </section>
        )}
      </div>
    </section>
  );
}
