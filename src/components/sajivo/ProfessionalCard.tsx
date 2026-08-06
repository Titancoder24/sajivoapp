import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { roleLabels } from "@/lib/constants";
import { formatCurrency, initials } from "@/lib/utils";
import type { Profile } from "@/types/domain";

export function ProfessionalCard({ professional }: { professional: Profile }) {
  const displayName = professional.businessName ?? professional.fullName;
  return (
    <Card className="micro-rise h-full">
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--rv-slate)] text-sm font-bold text-white">{initials(displayName)}</div>
          <div className="min-w-0 flex-1">
            <Link href={`/pros/${professional.id}`} className="font-display text-xl hover:text-[var(--rv-terracotta)]">{displayName}</Link>
            <p className="mt-1 text-sm font-semibold text-[var(--rv-ink-2)]">{roleLabels[professional.primaryRole]}</p>
          </div>
          {professional.verificationStatus === "verified" ? <Badge className="bg-[rgba(85,107,88,0.1)] text-[var(--rv-moss)]">Verified</Badge> : null}
        </div>
        <p className="mt-4 min-h-12 text-sm leading-6 text-[var(--rv-ink-2)]">{professional.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(professional.services ?? []).slice(0, 3).map((service) => <Badge key={service}>{service}</Badge>)}
        </div>
        <div className="mt-5 grid gap-2 text-sm text-[var(--rv-ink-2)]">
          <span className="flex items-center gap-2"><MapPin size={15} /> {professional.city}, {professional.state}</span>
          <span className="flex items-center gap-2"><Star size={15} /> {professional.ratingAvg ?? 0} rating · {professional.reviewsCount ?? 0} reviews</span>
          <span>Starting at {formatCurrency(professional.startingPrice)}</span>
        </div>
        <ButtonLink href={`/pros/${professional.id}`} variant="outline" className="mt-5 w-full">View Profile</ButtonLink>
      </CardContent>
    </Card>
  );
}
