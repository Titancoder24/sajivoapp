"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const tabs = ["Overview", "Messages", "Files", "Activity"];

export function WorkspaceView() {
  const [tab, setTab] = useState("Overview");
  return (
    <Card>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-full px-3 py-1 text-sm font-bold ${tab === item ? "bg-[var(--rv-slate)] text-white" : "bg-[var(--rv-bg)] text-[var(--rv-ink-2)]"}`}>{item}</button>)}
        </div>
        <div className="mt-6">
          {tab === "Overview" ? <p className="text-sm leading-6 text-[var(--rv-ink-2)]">Workspace overview shows accepted proposal, participants, project status, next milestone, and review actions.</p> : null}
          {tab === "Messages" ? <div className="grid gap-3"><p className="rounded-md bg-[var(--rv-bg)] p-3 text-sm">Aarav: Please share updated material options.</p><p className="rounded-md bg-[rgba(198,93,71,0.08)] p-3 text-sm">Professional: I will upload two palettes today.</p><div className="flex gap-2"><Input placeholder="Write a message" /><Button onClick={() => toast.success("Message sent")}>Send</Button></div></div> : null}
          {tab === "Files" ? <div className="rounded-lg border border-dashed border-[var(--rv-border)] p-8 text-center"><p className="font-bold">Project drawings, estimates, references, and execution files</p><Button className="mt-4" variant="outline" onClick={() => toast.success("File uploaded")}>Upload File</Button></div> : null}
          {tab === "Activity" ? <div className="grid gap-2 text-sm text-[var(--rv-ink-2)]"><p>Proposal accepted</p><p>Workspace opened</p><p>Status changed to in progress</p><p>File uploaded</p></div> : null}
        </div>
      </CardContent>
    </Card>
  );
}
