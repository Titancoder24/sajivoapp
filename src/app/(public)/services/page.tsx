import { ServiceCategoryCard } from "@/components/sajivo/ServiceCategoryCard";
import { getServices } from "@/lib/server/repository";

export default async function ServicesPage() {
  const list = await getServices();
  return (
    <section className="page-shell py-14">
      <p className="text-sm font-bold uppercase text-[var(--rv-terracotta)]">Services</p>
      <h1 className="font-display mt-2 text-5xl">Choose the work your project needs.</h1>
      <p className="mt-4 max-w-2xl text-[var(--rv-ink-2)]">Sajivo groups design, ceiling, wall, flooring, and execution services so customers can write precise briefs and professionals can find relevant work.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((service) => <ServiceCategoryCard key={service.id} service={service} />)}
      </div>
    </section>
  );
}
