import { ButtonLink } from "@/components/ui/button";

export default function ForProfessionalsPage() {
  return (
    <section className="page-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase text-[var(--rv-terracotta)]">For professionals</p>
          <h1 className="font-display mt-2 text-5xl">Win better-fit interior projects.</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--rv-ink-2)]">Sajivo helps designers and contractors discover structured project briefs, send professional proposals, build verified profiles, and collaborate in a shared workspace.</p>
          <div className="mt-8 flex gap-3">
            <ButtonLink href="/register?role=designer">Join as Designer</ButtonLink>
            <ButtonLink href="/register?role=contractor" variant="outline">Join as Contractor</ButtonLink>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Project discovery", "Proposal management", "Portfolio builder", "Verification badges", "Workspace files", "Activity timeline"].map((item) => (
            <div key={item} className="rounded-lg border border-[var(--rv-border)] bg-white p-5 font-bold">{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
