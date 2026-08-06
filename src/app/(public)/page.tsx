import { ArrowRight, CheckCircle2, ClipboardList, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCategoryCard } from "@/components/sajivo/ServiceCategoryCard";
import { getServices } from "@/lib/server/repository";

export default async function LandingPage() {
  const topServices = (await getServices()).slice(0, 6);
  return (
    <>
      <section className="rv-grid-bg border-b border-[var(--rv-border)]">
        <div className="page-shell grid min-h-[calc(100vh-64px)] items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--rv-border)] bg-white px-3 py-1 text-sm font-bold text-[var(--rv-terracotta-dark)]">
              <Sparkles size={16} />
              Interior projects, professionally managed
            </div>
            <h1 className="font-display text-5xl leading-tight text-[var(--rv-ink)] md:text-7xl">Sajivo</h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-[var(--rv-ink-2)]">
              Create a structured interior brief, compare designers and contractors, accept proposals, and manage execution from one clean workspace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/register?role=customer" size="lg">Start Your Project <ArrowRight size={18} /></ButtonLink>
              <ButtonLink href="/professionals" variant="outline" size="lg">Find Professionals</ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[["12k+", "project briefs"], ["4.8/5", "average rating"], ["18", "service types"]].map(([value, label]) => (
                <div key={label} className="border-l-2 border-[var(--rv-terracotta)] pl-4">
                  <p className="font-display text-3xl">{value}</p>
                  <p className="text-sm text-[var(--rv-ink-2)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg border border-[var(--rv-border)] bg-[var(--rv-slate)] shadow-xl">
              <img src="https://images.pexels.com/photos/30386991/pexels-photo-30386991.jpeg" alt="Warm interior workspace" className="h-full w-full object-cover opacity-90" />
            </div>
            <Card className="absolute bottom-5 left-5 right-5 shadow-lg">
              <CardContent className="grid gap-3">
                <div className="flex items-center gap-3"><CheckCircle2 className="text-[var(--rv-terracotta)]" /> Proposal shortlisted</div>
                <div className="flex items-center gap-3"><MessageSquare className="text-[var(--rv-slate)]" /> Workspace message received</div>
                <div className="flex items-center gap-3"><ShieldCheck className="text-[var(--rv-moss)]" /> Professional verified</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="page-shell py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[var(--rv-terracotta)]">Explore services</p>
            <h2 className="font-display mt-2 text-4xl">Everything from concept to execution.</h2>
          </div>
          <ButtonLink href="/services" variant="outline">View all services</ButtonLink>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topServices.map((service) => <ServiceCategoryCard key={service.id} service={service} />)}
        </div>
      </section>
      <section className="border-y border-[var(--rv-border)] bg-white">
        <div className="page-shell grid gap-4 py-16 md:grid-cols-3">
          {[
            [ClipboardList, "Create a structured brief", "Scope, services, budget, details, files, and review steps keep the project clear."],
            [ShieldCheck, "Compare verified professionals", "Review services, cities, portfolios, ratings, proposals, and verification status."],
            [MessageSquare, "Manage project collaboration", "Use workspace tabs for messages, files, activity, status changes, and reviews."],
          ].map(([Icon, title, text]) => (
            <div key={title as string} className="rounded-lg border border-[var(--rv-border)] p-5">
              <Icon className="text-[var(--rv-terracotta)]" />
              <h3 className="mt-4 font-display text-xl">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--rv-ink-2)]">{text as string}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
