"use client";

import { BadgeCheck, BriefcaseBusiness, CheckCircle2, FileCheck2, FolderPlus, Image, MoreHorizontal, Plus, ShieldCheck, Sparkles, Upload, UserRoundSearch } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export function EmptyWorkflow({ title, text, action }: { title: string; text: string; action?: string }) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#e2e3e5] bg-white">
      <div className="grid min-h-[360px] place-items-center px-5 py-12 text-center">
        <div className="max-w-md">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[#e0e1e3] bg-[#f7f7f8] text-[#686b70]"><UserRoundSearch size={21} /></span>
          <h2 className="mt-4 text-lg font-bold text-[#2c2e32]">{title}</h2>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#777a80]">{text}</p>
          {action ? <Button size="sm" className="mt-5" onClick={() => toast.success(`${action} clicked`)}><Plus size={14} />{action}</Button> : null}
          <div className="mt-7 flex items-center justify-center gap-4 border-t border-[#eff0f1] pt-4 text-[10px] font-medium text-[#989a9f]"><span className="flex items-center gap-1"><ShieldCheck size={12} />Private</span><span className="flex items-center gap-1"><Sparkles size={12} />Synced automatically</span></div>
        </div>
      </div>
    </section>
  );
}

export function ProfileForm() {
  return (
    <section className="overflow-hidden rounded-lg border border-[#e2e3e5] bg-white">
      <div className="flex items-center justify-between border-b border-[#ececef] px-5 py-3.5"><div><h2 className="text-sm font-bold">Profile details</h2><p className="mt-0.5 text-[11px] text-[#85888d]">Information visible across your Sajivo workspace.</p></div><BadgeCheck size={18} className="text-emerald-600" /></div>
      <div className="grid gap-5 p-5 md:grid-cols-2">
        <div><Label>Full name</Label><Input defaultValue="Aarav Sharma" /></div>
        <div><Label>City</Label><Input defaultValue="Bengaluru" /></div>
        <div className="md:col-span-2"><Label>Bio</Label><Textarea defaultValue="Tell customers or professionals what you need and how you work." /></div>
        <div><Label>Services</Label><Input defaultValue="Full Home Interior Design, False Ceiling" /></div>
        <div><Label>Service areas</Label><Input defaultValue="Indiranagar, Whitefield, HSR Layout" /></div>
      </div>
      <div className="flex justify-end border-t border-[#ececef] bg-[#fcfcfc] px-5 py-3"><Button size="sm" onClick={() => toast.success("Profile saved")}>Save changes</Button></div>
    </section>
  );
}

export function PortfolioManager() {
  const projects = [
    { title: "Warm Minimal Apartment", meta: "Residential · Bengaluru · 2025", color: "bg-[#d8c7b7]", featured: true },
    { title: "Commercial Ceiling Rollout", meta: "Commercial · Whitefield · 2026", color: "bg-[#b9c5c8]", featured: false },
  ];
  return (
    <section className="overflow-hidden rounded-lg border border-[#e2e3e5] bg-white">
      <div className="flex items-center justify-between border-b border-[#ececef] px-4 py-3"><div><h2 className="text-sm font-bold">Published work</h2><p className="mt-0.5 text-[11px] text-[#85888d]">2 projects · 1 featured</p></div><Button size="sm" onClick={() => toast.success("Portfolio project created")}><Plus size={14} />Add project</Button></div>
      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => <article key={project.title} className="overflow-hidden rounded-lg border border-[#e3e4e6] bg-white"><div className={`relative grid aspect-[16/9] place-items-center ${project.color}`}><Image size={25} className="text-white/80" />{project.featured && <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-1 text-[9px] font-bold uppercase tracking-wide">Featured</span>}<button aria-label="Portfolio options" className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded bg-white/90"><MoreHorizontal size={15} /></button></div><div className="p-3"><h3 className="truncate text-sm font-bold">{project.title}</h3><p className="mt-1 text-[11px] text-[#7e8186]">{project.meta}</p><div className="mt-3 flex gap-2"><Button size="sm" variant="outline" className="h-8">Edit</Button><Button size="sm" variant="ghost" className="h-8" onClick={() => toast.success("Featured status updated")}>Feature</Button></div></div></article>)}
        <button onClick={() => toast.success("Portfolio project created")} className="grid min-h-[210px] place-items-center rounded-lg border border-dashed border-[#ced0d4] bg-[#fafafa] text-center hover:bg-[#f5f5f6]"><span><FolderPlus size={22} className="mx-auto text-[#7b7e83]" /><span className="mt-2 block text-xs font-semibold">Add portfolio project</span><span className="mt-1 block text-[10px] text-[#929499]">Images, scope and outcomes</span></span></button>
      </div>
    </section>
  );
}

export function VerificationManager() {
  const rows = [
    { title: "Identity verification", detail: "Government-issued photo identification", status: "Verified", icon: BadgeCheck, done: true },
    { title: "Business verification", detail: "Registration, GST or business proof", status: "In review", icon: BriefcaseBusiness, done: false },
    { title: "Experience verification", detail: "Past contracts, references or completion proof", status: "Required", icon: FileCheck2, done: false },
  ];
  return (
    <section className="overflow-hidden rounded-lg border border-[#e2e3e5] bg-white">
      <div className="border-b border-[#ececef] px-5 py-4"><div className="flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-700" /><h2 className="text-sm font-bold">Trust & verification</h2></div><div className="mt-3 h-1.5 max-w-xl overflow-hidden rounded-full bg-[#ececef]"><div className="h-full w-2/3 rounded-full bg-emerald-600" /></div><p className="mt-1.5 text-[10px] text-[#85888d]">Profile verification is 67% complete</p></div>
      <div className="divide-y divide-[#ececef]">
        {rows.map(({ title, detail, status, icon: Icon, done }) => <div key={title} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${done ? "bg-emerald-50 text-emerald-700" : "bg-[#f1f1f3] text-[#686b70]"}`}><Icon size={17} /></span><div className="min-w-0 flex-1"><h3 className="text-xs font-bold">{title}</h3><p className="mt-0.5 text-[11px] text-[#85888d]">{detail}</p></div><span className={`w-fit rounded-full px-2 py-1 text-[10px] font-bold ${done ? "bg-emerald-50 text-emerald-700" : status === "In review" ? "bg-amber-50 text-amber-700" : "bg-[#f2f2f3] text-[#777a80]"}`}>{status}</span>{!done && <Button size="sm" variant="outline" className="h-8" onClick={() => toast.success(`${title} document uploaded`)}><Upload size={13} />Upload</Button>}</div>)}
      </div>
      <div className="flex items-center gap-2 border-t border-[#ececef] bg-[#fcfcfc] px-5 py-3 text-[10px] text-[#85888d]"><CheckCircle2 size={13} />Documents are encrypted and visible only to the Sajivo verification team.</div>
    </section>
  );
}
