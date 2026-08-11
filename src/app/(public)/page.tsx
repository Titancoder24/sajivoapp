import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, ChevronRight, ClipboardCheck, FileText, MapPin, Search, ShieldCheck, Star, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ProfessionalCard } from "@/components/sajivo/ProfessionalCard";
import { ServiceCategoryCard } from "@/components/sajivo/ServiceCategoryCard";
import { getProfessionals, getServices } from "@/lib/server/repository";

const inspiration = [
  ["Warm minimal", "Living room", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=84"],
  ["Soft modern", "Kitchen", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=84"],
  ["Quiet luxury", "Bedroom", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=84"],
];

export default async function LandingPage() {
  const [services, professionals] = await Promise.all([getServices(), getProfessionals()]);

  return (
    <>
      <section className="bg-white px-3 pb-4 pt-3 sm:px-5 sm:pb-6">
        <div className="relative mx-auto min-h-[590px] max-w-[1500px] overflow-hidden rounded-lg bg-[var(--rv-slate)] md:min-h-[650px]">
          <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90" alt="Contemporary Indian living room interior" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/5" />
          <div className="relative flex min-h-[590px] max-w-3xl flex-col justify-end p-6 pb-10 text-white sm:p-10 md:min-h-[650px] md:justify-center md:p-16">
            <div className="mb-5 flex w-fit items-center rounded-full border border-white/30 bg-black/15 px-3 py-1.5 text-xs font-bold backdrop-blur">A clearer way to build, renovate and manage your project</div>
            <h1 className="font-display max-w-2xl text-4xl leading-[1.08] sm:text-5xl md:text-6xl">Build, renovate and transform your space — with everyone on the same page.</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 md:text-lg">Tell us what you need, discover relevant professionals and suppliers, compare proposals, and manage your project from start to completion.</p>

            <form action="/professionals" className="mt-8 grid max-w-2xl overflow-hidden rounded-lg bg-white p-2 text-[var(--rv-ink)] shadow-2xl sm:grid-cols-[1fr_1fr_auto] sm:rounded-full">
              <label className="flex items-center gap-3 px-4 py-3 sm:border-r sm:border-[var(--rv-border)]">
                <Search size={18} className="text-[var(--rv-terracotta)]" />
                <span className="min-w-0"><span className="block text-[11px] font-bold uppercase text-[var(--rv-ink-2)]">What do you need?</span><input name="q" placeholder="Designer, contractor, kitchen renovation..." className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-normal" /></span>
              </label>
              <label className="flex items-center gap-3 border-t border-[var(--rv-border)] px-4 py-3 sm:border-0">
                <MapPin size={18} className="text-[var(--rv-terracotta)]" />
                <span className="min-w-0"><span className="block text-[11px] font-bold uppercase text-[var(--rv-ink-2)]">Where?</span><input name="city" placeholder="Bengaluru" className="w-full bg-transparent text-sm font-semibold outline-none placeholder:font-normal" /></span>
              </label>
              <button className="button-3d button-depth-primary rv-focus flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--rv-terracotta)] px-6 font-semibold text-white hover:bg-[var(--rv-terracotta-dark)] sm:h-auto sm:rounded-full" type="submit"><Search size={18} /> Find Professionals</button>
            </form>
            <ButtonLink href="/register" className="button-3d button-depth-outline mt-3 w-fit rounded-full border border-white/50 bg-white px-5 text-[var(--rv-ink)]">Start a Project <ArrowRight size={16} /></ButtonLink>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-white/90">
              <span className="flex items-center gap-1.5"><BadgeCheck size={16} /> Verified professionals</span>
              <span className="flex items-center gap-1.5"><ClipboardCheck size={16} /> Structured proposals</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} /> Managed workspace</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-14 md:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg bg-[var(--rv-surface-muted)] p-7 sm:p-10">
            <p className="text-sm font-bold text-[var(--rv-terracotta)]">The Sajivo ecosystem</p>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl">Everything your project needs, connected in one ecosystem.</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[['Clients', 'Project owners and service seekers'], ['Professionals', 'Designers, contractors, and specialists'], ['Businesses', 'Retailers and future suppliers']].map(([title, text]) => <div key={title} className="rounded-lg border border-[var(--rv-border)] bg-[var(--rv-surface)] p-4"><p className="font-bold">{title}</p><p className="mt-2 text-sm leading-5 text-[var(--rv-ink-2)]">{text}</p></div>)}
            </div>
          </div>
          <div className="rounded-lg bg-[var(--rv-slate)] p-7 text-white sm:p-10">
            <p className="text-sm font-bold text-[#e9a798]">Project workspace</p>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl">One workspace for the entire project.</h2>
            <p className="mt-4 leading-7 text-white/70">Briefs, proposals, documents, milestones, people, messages, issues, and payment history stay organized in one place.</p>
            <div className="mt-7 grid grid-cols-2 gap-2 text-sm font-semibold sm:grid-cols-4">{['Overview', 'Budget', 'Milestones', 'Documents', 'People', 'Messages', 'Issues', 'Payments'].map((item) => <span key={item} className="rounded-md border border-white/15 bg-white/5 px-3 py-2">{item}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--rv-border)] bg-[var(--rv-surface-muted)] py-14 md:py-20">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="text-sm font-bold text-[var(--rv-terracotta)]">More transparency. Fewer surprises.</p><h2 className="font-display mt-2 text-3xl sm:text-4xl">A clearer way to move from brief to completion.</h2></div><div className="grid gap-3 sm:grid-cols-2">{['Verified professional profiles', 'Defined project scope', 'Structured proposals', 'Milestone tracking', 'Document management', 'Reviews and ratings'].map((item) => <div key={item} className="flex items-center gap-3 rounded-lg border border-[var(--rv-border)] bg-[var(--rv-surface)] p-4 text-sm font-semibold"><BadgeCheck size={18} className="text-[var(--rv-moss)]" />{item}</div>)}</div></div>
      </section>

      <section className="page-shell py-14 text-center md:py-20"><p className="text-sm font-bold text-[var(--rv-terracotta)]">Ready when you are</p><h2 className="font-display mx-auto mt-2 max-w-2xl text-3xl sm:text-4xl">Your project starts with one brief.</h2><ButtonLink href="/register" className="button-3d button-depth-primary mt-7 rounded-full">Start a Project <ArrowRight size={17} /></ButtonLink></section>

      <section className="page-shell py-14 md:py-20">
        <div className="flex items-end justify-between gap-5">
          <div><p className="text-sm font-bold text-[var(--rv-terracotta)]">Explore by service</p><h2 className="font-display mt-2 text-3xl sm:text-4xl">What are you planning?</h2></div>
          <Link href="/services" className="hidden items-center gap-1 text-sm font-bold hover:text-[var(--rv-terracotta)] sm:flex">View all <ChevronRight size={17} /></Link>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.slice(0, 6).map((service) => <ServiceCategoryCard key={service.id} service={service} />)}</div>
      </section>

      <section className="border-y border-[var(--rv-border)] bg-white py-14 md:py-20">
        <div className="page-shell">
          <div className="flex items-end justify-between gap-5">
            <div><p className="text-sm font-bold text-[var(--rv-terracotta)]">Curated for your project</p><h2 className="font-display mt-2 text-3xl sm:text-4xl">Meet trusted professionals</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[var(--rv-ink-2)]">Browse verified local experts, see their work, and compare services before you start a conversation.</p></div>
            <ButtonLink href="/professionals" variant="outline" className="hidden rounded-full sm:inline-flex">Browse all</ButtonLink>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">{professionals.slice(0, 2).map((professional) => <ProfessionalCard key={professional.id} professional={professional} />)}</div>
        </div>
      </section>

      <section className="page-shell py-14 md:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-bold text-[var(--rv-terracotta)]">Ideas for every room</p><h2 className="font-display mt-2 text-3xl sm:text-4xl">Find your direction</h2></div><p className="max-w-md text-sm leading-6 text-[var(--rv-ink-2)]">Save the feeling you love, then share it with professionals in your project brief.</p></div>
        <div className="mt-7 grid gap-4 md:grid-cols-12">
          {inspiration.map(([title, room, image], index) => (
            <Link href={`/services`} key={title} className={`group relative min-h-[340px] overflow-hidden rounded-lg ${index === 0 ? "md:col-span-6" : "md:col-span-3"}`}>
              <img src={image} alt={`${title} ${room} inspiration`} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-5 text-white"><p className="text-xs font-semibold text-white/75">{room}</p><h3 className="mt-1 text-xl font-bold">{title}</h3></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--rv-slate)] py-14 text-white md:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div><p className="text-sm font-bold text-[#e9a798]">From first idea to final handover</p><h2 className="font-display mt-3 text-3xl sm:text-4xl">From your first idea to final handover.</h2><p className="mt-4 max-w-lg leading-7 text-white/70">Sajivo gives each project a clear path, from the first brief through discovery, hiring, collaboration, and completion.</p><ButtonLink href="/how-it-works" variant="outline" className="mt-7 border-white/30 bg-white text-[var(--rv-ink)]">See how it works <ArrowRight size={17} /></ButtonLink></div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[[FileText, "01", "Create your brief", "Tell us about your project, location, budget, requirements, and timeline."], [Search, "02", "Discover", "Find relevant professionals and suppliers for the work you need."], [Users, "03", "Compare", "Compare profiles, portfolios, proposals, pricing, and timelines."], [Check, "04", "Hire", "Agree on scope, milestones, responsibilities, and terms."], [ClipboardCheck, "05", "Manage", "Keep communication, documents, approvals, and progress organized."], [ShieldCheck, "06", "Complete", "Track completion, resolve issues, and close with reviews."]].map(([Icon, number, title, text]) => (
              <div key={title as string} className="rounded-lg border border-white/15 bg-white/5 p-5 backdrop-blur"><div className="flex items-center justify-between"><Icon size={21} className="text-[#e9a798]" /><span className="text-xs font-bold text-white/45">{number as string}</span></div><h3 className="mt-8 text-lg font-bold">{title as string}</h3><p className="mt-2 text-sm leading-6 text-white/65">{text as string}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-14 md:py-20">
        <div className="grid overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white lg:grid-cols-2">
          <div className="relative min-h-[360px]"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Interior designer reviewing a finished room" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14"><div className="flex items-center gap-1 text-[var(--rv-gold)]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={17} fill="currentColor" />)}</div><blockquote className="font-display mt-5 text-2xl leading-snug sm:text-3xl">“The brief made every conversation more useful. We compared the actual scope, not just a vague estimate.”</blockquote><p className="mt-5 text-sm font-semibold">Aarav, Bengaluru homeowner</p><p className="mt-1 text-sm text-[var(--rv-ink-2)]">2BHK living room and kitchen refresh</p></div>
        </div>
      </section>
    </>
  );
}
