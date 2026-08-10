import { Suspense } from "react";
import { MapPinned, SearchX } from "lucide-react";
import { ProfessionalCard } from "@/components/sajivo/ProfessionalCard";
import { getProfessionals } from "@/lib/server/repository";
import { MarketplaceFilters } from "./MarketplaceFilters";

type SearchParams = { role?: string; q?: string; city?: string; verified?: string };

export default async function ProfessionalsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const role = params.role === "designer" || params.role === "contractor" ? params.role : "all";
  const query = params.q?.trim().toLowerCase() ?? "";
  const city = params.city?.trim().toLowerCase() ?? "";
  const verifiedOnly = params.verified === "true";
  const all = await getProfessionals();
  const professionals = all.filter((professional) => {
    const text = [professional.fullName, professional.businessName, professional.bio, ...(professional.services ?? [])].filter(Boolean).join(" ").toLowerCase();
    const location = [professional.city, professional.state, ...(professional.serviceAreas ?? [])].filter(Boolean).join(" ").toLowerCase();
    return (role === "all" || professional.primaryRole === role) && (!query || text.includes(query)) && (!city || location.includes(city)) && (!verifiedOnly || professional.verificationStatus === "verified");
  });

  return (
    <>
      <section className="bg-white py-10 sm:py-14">
        <div className="page-shell"><p className="text-sm font-bold text-[var(--rv-terracotta)]">Sajivo professionals</p><h1 className="font-display mt-2 max-w-3xl text-4xl leading-tight sm:text-5xl">Find the right expert for your space.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-[var(--rv-ink-2)]">Compare trusted designers and contractors by service, location, portfolio, rating, and project fit.</p></div>
      </section>
      <Suspense><MarketplaceFilters resultCount={professionals.length} /></Suspense>
      <section className="page-shell py-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">{professionals.length} professionals</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--rv-ink-2)]"><MapPinned size={15} /> Serving your selected area</p></div><p className="text-xs text-[var(--rv-ink-2)]">Profiles ranked by relevance and quality</p></div>
        {professionals.length ? <div className="grid gap-5 md:grid-cols-2">{professionals.map((professional) => <ProfessionalCard key={professional.id} professional={professional} />)}</div> : <div className="grid min-h-[340px] place-items-center rounded-lg border border-dashed border-[var(--rv-border)] bg-white p-8 text-center"><div><SearchX className="mx-auto text-[var(--rv-ink-2)]" size={32} /><h2 className="font-display mt-4 text-2xl">No exact matches yet</h2><p className="mt-2 text-sm text-[var(--rv-ink-2)]">Try a broader service, location, or professional type.</p></div></div>}
      </section>
    </>
  );
}
