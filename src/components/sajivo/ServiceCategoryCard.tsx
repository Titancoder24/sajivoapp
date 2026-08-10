import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/domain";

const categoryImages: Record<Service["category"], string> = {
  Design: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=82",
  Ceiling: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82",
  Wall: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82",
  Flooring: "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=900&q=82",
  Execution: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82",
};

export function ServiceCategoryCard({ service }: { service: Service }) {
  return (
    <Link href={`/professionals?q=${encodeURIComponent(service.name)}`} className="group relative block aspect-[4/3] overflow-hidden rounded-lg bg-[var(--rv-slate)]">
      <img src={categoryImages[service.category]} alt={service.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-white/75">{service.category}</p>
          <h3 className="mt-1 text-xl font-bold leading-tight">{service.name}</h3>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[var(--rv-ink)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight size={18} /></span>
      </div>
    </Link>
  );
}
