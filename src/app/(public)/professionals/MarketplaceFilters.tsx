"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronDown, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export function MarketplaceFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [city, setCity] = useState(params.get("city") ?? "");
  const role = params.get("role") ?? "all";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = new URLSearchParams(params.toString());
    query.trim() ? next.set("q", query.trim()) : next.delete("q");
    city.trim() ? next.set("city", city.trim()) : next.delete("city");
    router.push(`/professionals?${next.toString()}`);
  }

  function setRole(nextRole: string) {
    const next = new URLSearchParams(params.toString());
    nextRole === "all" ? next.delete("role") : next.set("role", nextRole);
    router.push(`/professionals?${next.toString()}`);
  }

  function toggleVerified() {
    const next = new URLSearchParams(params.toString());
    next.get("verified") === "true" ? next.delete("verified") : next.set("verified", "true");
    router.push(`/professionals?${next.toString()}`);
  }

  return (
    <div className="sticky top-[72px] z-30 border-y border-[var(--rv-border)] bg-white/95 backdrop-blur-xl">
      <div className="page-shell py-3">
        <form onSubmit={submit} className="grid overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white shadow-sm sm:grid-cols-[1.2fr_0.8fr_auto] sm:rounded-full">
          <label className="flex items-center gap-3 px-4 py-3 sm:border-r sm:border-[var(--rv-border)]"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by service or name" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
          <label className="flex items-center gap-3 border-t border-[var(--rv-border)] px-4 py-3 sm:border-0"><MapPin size={17} /><input value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
          <button type="submit" className="button-3d button-depth-primary m-1.5 rounded-md bg-[var(--rv-terracotta)] px-6 py-2.5 text-sm font-bold text-white hover:bg-[var(--rv-terracotta-dark)] sm:rounded-full">Search</button>
        </form>
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none]">
          {["all", "designer", "contractor"].map((item) => <button key={item} onClick={() => setRole(item)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${role === item ? "border-[var(--rv-ink)] bg-[var(--rv-ink)] text-white" : "border-[var(--rv-border)] bg-white hover:border-[var(--rv-ink)]"}`}>{item === "all" ? "All professionals" : `${item}s`}</button>)}
          <button onClick={toggleVerified} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${params.get("verified") === "true" ? "border-[var(--rv-moss)] bg-[var(--rv-moss)] text-white" : "border-[var(--rv-border)] bg-white hover:border-[var(--rv-ink)]"}`}><Check size={15} /> Verified</button>
          <button onClick={() => setFiltersOpen(true)} className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--rv-border)] bg-white px-4 py-2 text-sm font-semibold hover:border-[var(--rv-ink)]"><SlidersHorizontal size={15} /> Filters</button>
          <button className="ml-auto hidden shrink-0 items-center gap-1 px-2 text-sm font-semibold sm:flex">Recommended <ChevronDown size={15} /></button>
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[70] grid place-items-end bg-black/40 p-0 sm:place-items-center sm:p-6" onMouseDown={() => setFiltersOpen(false)}>
          <div className="w-full rounded-t-lg bg-white shadow-2xl sm:max-w-lg sm:rounded-lg" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[var(--rv-border)] p-5"><h2 className="font-display text-xl">Filters</h2><button onClick={() => setFiltersOpen(false)} aria-label="Close filters" className="grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--rv-bg)]"><X size={19} /></button></div>
            <div className="space-y-6 p-5">
              <div><p className="text-sm font-bold">Professional type</p><div className="mt-3 grid grid-cols-3 gap-2">{["all", "designer", "contractor"].map((item) => <button key={item} onClick={() => setRole(item)} className={`rounded-md border p-3 text-sm font-semibold capitalize ${role === item ? "border-[var(--rv-ink)] bg-[var(--rv-bg)]" : "border-[var(--rv-border)]"}`}>{item}</button>)}</div></div>
              <div><p className="text-sm font-bold">Trust and quality</p><button onClick={toggleVerified} className="mt-3 flex w-full items-center justify-between rounded-md border border-[var(--rv-border)] p-4 text-left text-sm"><span><span className="block font-semibold">Verified professionals</span><span className="mt-1 block text-xs text-[var(--rv-ink-2)]">Credentials reviewed by Sajivo</span></span><span className={`grid h-6 w-6 place-items-center rounded border ${params.get("verified") === "true" ? "border-[var(--rv-moss)] bg-[var(--rv-moss)] text-white" : "border-[var(--rv-border)]"}`}>{params.get("verified") === "true" ? <Check size={15} /> : null}</span></button></div>
              <div><p className="text-sm font-bold">Project budget</p><div className="mt-3 grid grid-cols-2 gap-3"><label className="rounded-md border border-[var(--rv-border)] px-3 py-2 text-xs text-[var(--rv-ink-2)]">Minimum<input placeholder="₹ 50,000" className="mt-1 w-full bg-transparent text-sm text-[var(--rv-ink)] outline-none" /></label><label className="rounded-md border border-[var(--rv-border)] px-3 py-2 text-xs text-[var(--rv-ink-2)]">Maximum<input placeholder="₹ 15,00,000" className="mt-1 w-full bg-transparent text-sm text-[var(--rv-ink)] outline-none" /></label></div></div>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--rv-border)] p-5"><button onClick={() => router.push("/professionals")} className="text-sm font-bold underline">Clear all</button><button onClick={() => setFiltersOpen(false)} className="rounded-md bg-[var(--rv-ink)] px-5 py-3 text-sm font-bold text-white">Show {resultCount} professionals</button></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
