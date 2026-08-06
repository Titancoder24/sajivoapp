"use client";

import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { budgetOptions, scopeOptions } from "@/lib/constants";
import { services } from "@/lib/demo-data";

const steps = ["Scope", "Services", "Details", "Budget", "Files", "Review"];

export function ProjectWizard() {
  const [step, setStep] = useState(0);
  const [selectedScope, setSelectedScope] = useState("single_room");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Modular Kitchen Design"]);
  const [title, setTitle] = useState("Living room and kitchen refresh");
  const [budget, setBudget] = useState("Rs 5,00,000 - Rs 10,00,000");

  function next() {
    if (step === 1 && selectedServices.length === 0) {
      toast.error("Select at least one service");
      return;
    }
    if (step === steps.length - 1) {
      toast.success("Project published. Professionals can now send proposals.");
      return;
    }
    setStep((value) => value + 1);
    toast.success("Draft saved");
  }

  return (
    <Card>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <button key={label} onClick={() => setStep(index)} className={`rounded-full px-3 py-1 text-xs font-bold ${step === index ? "bg-[var(--rv-terracotta)] text-white" : "bg-[var(--rv-bg)] text-[var(--rv-ink-2)]"}`}>
              {index + 1}. {label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="mt-8">
            {step === 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {scopeOptions.map((scope) => (
                  <button key={scope.id} onClick={() => setSelectedScope(scope.id)} className={`rounded-lg border p-5 text-left ${selectedScope === scope.id ? "border-[var(--rv-terracotta)] bg-[rgba(198,93,71,0.08)]" : "border-[var(--rv-border)] bg-white"}`}>
                    <h3 className="font-display text-xl">{scope.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--rv-ink-2)]">{scope.description}</p>
                  </button>
                ))}
              </div>
            ) : null}
            {step === 1 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {services.map((service) => {
                  const active = selectedServices.includes(service.name);
                  return (
                    <button key={service.id} onClick={() => setSelectedServices((items) => active ? items.filter((item) => item !== service.name) : [...items, service.name])} className={`rounded-lg border p-4 text-left ${active ? "border-[var(--rv-terracotta)] bg-[rgba(198,93,71,0.08)]" : "border-[var(--rv-border)] bg-white"}`}>
                      <span className="text-xs font-bold text-[var(--rv-terracotta)]">{service.category}</span>
                      <h3 className="mt-1 font-bold">{service.name}</h3>
                    </button>
                  );
                })}
              </div>
            ) : null}
            {step === 2 ? (
              <div className="grid gap-4">
                <div><Label>Project title</Label><Input value={title} onChange={(event) => setTitle(event.target.value)} /></div>
                <div><Label>Description</Label><Textarea defaultValue="Need a practical, warm, low-maintenance design with modular kitchen changes, TV wall, lighting, and storage." /></div>
                <div className="grid gap-4 md:grid-cols-3"><div><Label>City</Label><Input defaultValue="Bengaluru" /></div><div><Label>Locality</Label><Input defaultValue="Indiranagar" /></div><div><Label>Timeline</Label><Input defaultValue="8-10 weeks" /></div></div>
              </div>
            ) : null}
            {step === 3 ? (
              <div className="grid gap-3 md:grid-cols-3">
                {budgetOptions.map((option) => (
                  <button key={option} onClick={() => setBudget(option)} className={`rounded-lg border p-4 text-left text-sm font-bold ${budget === option ? "border-[var(--rv-terracotta)] bg-[rgba(198,93,71,0.08)]" : "border-[var(--rv-border)] bg-white"}`}>{option}</button>
                ))}
              </div>
            ) : null}
            {step === 4 ? (
              <div className="rounded-lg border border-dashed border-[var(--rv-border)] bg-[var(--rv-bg)] p-10 text-center">
                <UploadCloud className="mx-auto text-[var(--rv-terracotta)]" />
                <h3 className="font-display mt-3 text-2xl">Upload references, drawings, or photos</h3>
                <p className="mt-2 text-sm text-[var(--rv-ink-2)]">Production build uses Supabase Storage buckets with participant-only access.</p>
                <Button className="mt-5" variant="outline" onClick={() => toast.success("Files queued for upload")}>Choose Files</Button>
              </div>
            ) : null}
            {step === 5 ? (
              <div className="grid gap-4">
                <h3 className="font-display text-3xl">{title}</h3>
                <p><strong>Scope:</strong> {scopeOptions.find((item) => item.id === selectedScope)?.title}</p>
                <p><strong>Services:</strong> {selectedServices.join(", ")}</p>
                <p><strong>Budget:</strong> {budget}</p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[var(--rv-border)] pt-5">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</Button>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => toast.success("Draft saved")}>Save Draft</Button>
            <Button onClick={next}>{step === steps.length - 1 ? "Publish Project" : "Next"}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
