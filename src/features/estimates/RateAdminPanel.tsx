"use client";

import { useEffect, useState } from "react";
import { Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export function RateAdminPanel() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [version, setVersion] = useState("2026.08-mvp");
  const [source, setSource] = useState("Sajivo admin");
  useEffect(() => { fetch("/api/estimates/rates").then((response) => response.json()).then((payload) => { setRates(payload.cityRates ?? {}); setVersion(payload.rateVersion ?? "2026.08-mvp"); }).catch(() => toast.error("Unable to load rate table")); }, []);
  async function save() {
    const response = await fetch("/api/estimates/rates", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ version, source, cityRates: rates }) });
    const payload = await response.json();
    if (!response.ok) { toast.error(payload.error ?? "Unable to save rate version"); return; }
    toast.success(`Rate version ${payload.rateVersion.version} logged`);
  }
  return <section className="rounded-lg border border-[var(--rv-border)] bg-white"><header className="flex items-start gap-3 border-b border-[var(--rv-border)] p-5"><span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--rv-moss-soft)] text-[var(--rv-moss)]"><ShieldCheck size={18} /></span><div><h2 className="font-bold">Rate version controls</h2><p className="mt-1 text-sm text-[var(--rv-ink-2)]">Update city rates with an auditable version and source.</p></div></header><div className="grid gap-5 p-5"><div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="rate-version">Version</Label><Input id="rate-version" value={version} onChange={(event) => setVersion(event.target.value)} /></div><div><Label htmlFor="rate-source">Data source</Label><Input id="rate-source" value={source} onChange={(event) => setSource(event.target.value)} /></div></div><div><h3 className="text-sm font-bold">Base rate by city (₹ / sq.ft.)</h3><div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(rates).map(([city, value]) => <div key={city}><Label htmlFor={`rate-${city}`}>{city}</Label><Input id={`rate-${city}`} type="number" value={value} onChange={(event) => setRates((current) => ({ ...current, [city]: Number(event.target.value) }))} /></div>)}</div></div><Button className="w-fit" onClick={save}><Save size={16} />Save rate version</Button></div></section>;
}
