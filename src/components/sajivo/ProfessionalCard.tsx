import Link from "next/link";
import { BadgeCheck, Heart, MapPin, Star } from "lucide-react";
import { roleLabels } from "@/lib/constants";
import { formatCurrency, initials } from "@/lib/utils";
import type { Profile } from "@/types/domain";

const coverByRole = {
  designer: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  contractor: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  vendor: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
  customer: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  admin: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
} as const;

export function ProfessionalCard({ professional }: { professional: Profile }) {
  const displayName = professional.businessName ?? professional.fullName;
  return (
    <article className="group h-full overflow-hidden rounded-lg border border-[var(--rv-border)] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5">
      <Link href={`/pros/${professional.id}`} className="relative block aspect-[16/10] overflow-hidden bg-[var(--rv-slate)]">
        <img src={coverByRole[professional.primaryRole]} alt={`${displayName} interior project`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold shadow-sm">{roleLabels[professional.primaryRole]}</span>
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm" aria-label="Save professional"><Heart size={18} /></span>
      </Link>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--rv-slate)] text-xs font-bold text-white ring-4 ring-white">{initials(displayName)}</div>
          <div className="min-w-0 flex-1">
            <Link href={`/pros/${professional.id}`} className="flex items-center gap-1.5 truncate text-lg font-bold hover:text-[var(--rv-terracotta)]">{displayName} {professional.verificationStatus === "verified" ? <BadgeCheck size={17} className="shrink-0 fill-[var(--rv-moss)] text-white" /> : null}</Link>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-[var(--rv-ink-2)]"><MapPin size={14} /> {professional.city}, {professional.state}</p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold"><Star size={15} className="fill-[var(--rv-gold)] text-[var(--rv-gold)]" /> {professional.ratingAvg ?? 0}</span>
        </div>
        <p className="mt-4 line-clamp-2 min-h-11 text-sm leading-5 text-[var(--rv-ink-2)]">{professional.bio}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {(professional.services ?? []).slice(0, 3).map((service) => <span key={service} className="rounded-full bg-[var(--rv-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--rv-ink-2)]">{service}</span>)}
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-[var(--rv-border)] pt-4">
          <div><p className="text-xs text-[var(--rv-ink-2)]">Projects from</p><p className="font-bold">{formatCurrency(professional.startingPrice)}</p></div>
          <p className="text-xs text-[var(--rv-ink-2)]">{professional.reviewsCount ?? 0} reviews</p>
        </div>
      </div>
    </article>
  );
}
