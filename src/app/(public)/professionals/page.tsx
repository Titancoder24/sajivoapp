import { ProfessionalCard } from "@/components/sajivo/ProfessionalCard";
import { ButtonLink } from "@/components/ui/button";
import { getProfessionals } from "@/lib/server/repository";

export default async function ProfessionalsPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const role = params.role === "designer" || params.role === "contractor" ? params.role : "all";
  const professionals = await getProfessionals(role);
  return (
    <section className="page-shell py-14">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--rv-terracotta)]">Professionals</p>
          <h1 className="font-display mt-2 text-5xl">Find designers and contractors.</h1>
          <p className="mt-4 max-w-2xl text-[var(--rv-ink-2)]">Filter by role, city, service fit, rating, and verification status before opening a public profile.</p>
        </div>
        <div className="flex gap-2">
          <ButtonLink href="/professionals" variant={role === "all" ? "secondary" : "outline"}>All</ButtonLink>
          <ButtonLink href="/professionals?role=designer" variant={role === "designer" ? "secondary" : "outline"}>Designers</ButtonLink>
          <ButtonLink href="/professionals?role=contractor" variant={role === "contractor" ? "secondary" : "outline"}>Contractors</ButtonLink>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {professionals.map((professional) => <ProfessionalCard key={professional.id} professional={professional} />)}
      </div>
    </section>
  );
}
