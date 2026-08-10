"use client";

import { AlertTriangle, Check, ChevronRight, Clock3, FileCheck2, IndianRupee, Info, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

const deliverableOptions = ["Concept & mood board", "Space planning", "Detailed drawings", "Material schedule", "Site supervision"];

export function ProposalForm({ label = "Submit Proposal", estimatedRange = [950000, 1250000] }: { label?: string; estimatedRange?: [number, number] }) {
  const [amount, setAmount] = useState("850000");
  const [timeline, setTimeline] = useState("8-10 weeks");
  const [message, setMessage] = useState("I reviewed the brief and can support this scope with a clear milestone plan, transparent deliverables, and weekly updates.");
  const [justification, setJustification] = useState("");
  const [deliverables, setDeliverables] = useState(deliverableOptions.slice(0, 4));
  const numericAmount = Number(amount.replace(/[^0-9]/g, "")) || 0;
  const platformFee = useMemo(() => Math.round(numericAmount * 0.025), [numericAmount]);
  const total = numericAmount + platformFee;
  const quoteStatus = numericAmount > estimatedRange[1] ? "above" : numericAmount > 0 && numericAmount < estimatedRange[0] * 0.7 ? "below" : "within";

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (numericAmount <= 0) {
      toast.error("Enter a valid proposal amount");
      return;
    }
    if (!timeline.trim() || !message.trim() || deliverables.length === 0) {
      toast.error("Complete the timeline, message, and at least one deliverable");
      return;
    }
    if (quoteStatus !== "within" && justification.trim().length < 20) {
      toast.error("Explain why this quotation is outside Sajivo’s estimated range");
      return;
    }
    toast.success(`${label} sent`);
  }

  return (
    <form className="overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white" onSubmit={submit}>
      <header className="border-b border-[var(--rv-border)] px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase text-[var(--rv-terracotta)]">Professional proposal</p><h2 className="font-display mt-1 text-2xl">{label}</h2><p className="mt-1 text-sm text-[var(--rv-ink-2)]">Living room & kitchen refresh · Bengaluru</p></div>
          <span className="hidden rounded-full bg-[var(--rv-bg)] px-3 py-1 text-xs font-semibold text-[var(--rv-ink-2)] sm:inline">Draft</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid gap-6 p-5 sm:p-6">
          <section aria-labelledby="commercial-title">
            <div className="mb-4 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-[rgba(198,93,71,0.1)] text-[var(--rv-terracotta)]"><IndianRupee size={15} /></span><h3 id="commercial-title" className="font-bold">Commercial details</h3></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="proposal-amount">Proposal amount</Label><div className="relative"><span className="absolute left-3 top-2.5 text-sm font-semibold text-[var(--rv-ink-2)]">₹</span><Input id="proposal-amount" inputMode="numeric" className="pl-7 text-base font-semibold" value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby="amount-help" /></div><p id="amount-help" className="mt-1.5 text-xs text-[var(--rv-ink-2)]">Before applicable taxes</p></div>
              <div><Label htmlFor="proposal-timeline">Estimated timeline</Label><div className="relative"><Clock3 className="absolute left-3 top-3.5 text-[var(--rv-ink-2)]" size={16} /><Input id="proposal-timeline" className="pl-9" value={timeline} onChange={(event) => setTimeline(event.target.value)} /></div><p className="mt-1.5 text-xs text-[var(--rv-ink-2)]">Include design and execution</p></div>
            </div>
            <div className={`mt-4 rounded-md border p-3 text-sm ${quoteStatus === "within" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}><div className="flex gap-2">{quoteStatus === "within" ? <ShieldCheck size={17} /> : <AlertTriangle size={17} />}<span>{quoteStatus === "within" ? `Within Sajivo’s estimated range of ₹${estimatedRange[0].toLocaleString("en-IN")} – ₹${estimatedRange[1].toLocaleString("en-IN")}.` : `This quote is ${quoteStatus} Sajivo’s estimated range of ₹${estimatedRange[0].toLocaleString("en-IN")} – ₹${estimatedRange[1].toLocaleString("en-IN")}.`}</span></div></div>
            {quoteStatus !== "within" && <div className="mt-4"><Label htmlFor="quote-justification">Why is this quote outside the estimated range?</Label><Textarea id="quote-justification" value={justification} onChange={(event) => setJustification(event.target.value)} placeholder="Explain specification changes, site conditions, exclusions, or other factors..." className="min-h-24" /></div>}
          </section>

          <section aria-labelledby="deliverables-title">
            <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-[rgba(198,93,71,0.1)] text-[var(--rv-terracotta)]"><FileCheck2 size={15} /></span><h3 id="deliverables-title" className="font-bold">Included deliverables</h3></div><span className="text-xs text-[var(--rv-ink-2)]">{deliverables.length} selected</span></div>
            <div className="grid gap-2 sm:grid-cols-2">
              {deliverableOptions.map((option) => { const active = deliverables.includes(option); return <button type="button" key={option} aria-pressed={active} onClick={() => setDeliverables((current) => active ? current.filter((item) => item !== option) : [...current, option])} className={`rv-focus flex items-center gap-3 rounded-md border px-3 py-3 text-left text-sm font-semibold ${active ? "border-[var(--rv-terracotta)] bg-[rgba(198,93,71,0.05)]" : "border-[var(--rv-border)] hover:bg-[var(--rv-bg)]"}`}><span className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${active ? "border-[var(--rv-terracotta)] bg-[var(--rv-terracotta)] text-white" : "border-[var(--rv-border)] bg-white"}`}>{active && <Check size={13} />}</span>{option}</button>; })}
            </div>
          </section>

          <div><Label htmlFor="proposal-message">Message to customer</Label><Textarea id="proposal-message" value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-32" /><div className="mt-1.5 flex justify-between text-xs text-[var(--rv-ink-2)]"><span>Explain your approach and what makes the proposal a fit.</span><span>{message.length}/800</span></div></div>
        </div>

        <aside className="border-t border-[var(--rv-border)] bg-[var(--rv-bg)] p-5 lg:border-l lg:border-t-0">
          <h3 className="font-bold">Proposal summary</h3>
          <dl className="mt-4 grid gap-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-[var(--rv-ink-2)]">Your proposal</dt><dd className="font-semibold">₹{numericAmount.toLocaleString("en-IN")}</dd></div><div className="flex justify-between gap-4"><dt className="flex items-center gap-1 text-[var(--rv-ink-2)]">Platform fee <Info size={13} /></dt><dd className="font-semibold">₹{platformFee.toLocaleString("en-IN")}</dd></div><div className="border-t border-[var(--rv-border)] pt-3"><div className="flex items-baseline justify-between gap-4"><dt className="font-bold">Customer total</dt><dd className="font-display text-xl">₹{total.toLocaleString("en-IN")}</dd></div><p className="mt-1 text-xs text-[var(--rv-ink-2)]">Taxes calculated separately</p></div></dl>
          <div className="mt-5 rounded-md border border-[var(--rv-border)] bg-white p-3"><div className="flex gap-2"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={17} /><div><p className="text-sm font-semibold">Protected workspace</p><p className="mt-1 text-xs leading-5 text-[var(--rv-ink-2)]">Payment milestones and project files stay organised after acceptance.</p></div></div></div>
          <Button className="mt-5 w-full" type="submit"><Send size={16} /> {label}</Button>
          <button type="button" onClick={() => toast.success("Proposal preview opened")} className="rv-focus mt-2 flex w-full items-center justify-center gap-1 py-2 text-sm font-semibold text-[var(--rv-ink-2)] hover:text-[var(--rv-ink)]">Preview as customer <ChevronRight size={15} /></button>
        </aside>
      </div>
    </form>
  );
}
