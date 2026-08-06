import { ButtonLink } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    ["Create your brief", "Select scope, services, budget, location, timeline, and upload references."],
    ["Review proposals", "Designers and contractors send scoped pricing, timelines, messages, and deliverables."],
    ["Accept and collaborate", "Shortlist, accept, open the workspace, exchange files, track activity, and complete the project."],
  ];
  return (
    <section className="page-shell py-14">
      <p className="text-sm font-bold uppercase text-[var(--rv-terracotta)]">How it works</p>
      <h1 className="font-display mt-2 text-5xl">A clean workflow from idea to handover.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map(([title, text], index) => (
          <div key={title} className="rounded-lg border border-[var(--rv-border)] bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--rv-slate)] font-bold text-white">{index + 1}</div>
            <h2 className="font-display mt-5 text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--rv-ink-2)]">{text}</p>
          </div>
        ))}
      </div>
      <ButtonLink href="/register?role=customer" size="lg" className="mt-8">Start Your Project</ButtonLink>
    </section>
  );
}
