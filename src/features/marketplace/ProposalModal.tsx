"use client";

import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export function ProposalForm({ label = "Submit Proposal" }: { label?: string }) {
  return (
    <form
      className="grid gap-4 rounded-lg border border-[var(--rv-border)] bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault();
        toast.success(`${label} sent`);
      }}
    >
      <h2 className="font-display text-2xl">{label}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div><Label>Amount</Label><Input defaultValue="850000" /></div>
        <div><Label>Timeline</Label><Input defaultValue="8-10 weeks" /></div>
      </div>
      <div><Label>Message</Label><Textarea defaultValue="I reviewed the brief and can support this scope with a clear milestone plan, transparent deliverables, and weekly updates." /></div>
      <Button><Send size={16} /> {label}</Button>
    </form>
  );
}
