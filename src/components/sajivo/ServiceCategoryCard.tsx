import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/types/domain";

export function ServiceCategoryCard({ service }: { service: Service }) {
  return (
    <Card className="micro-rise h-full">
      <CardContent>
        <div className="mb-5 flex items-center justify-between">
          <span className="rounded-full bg-[var(--rv-bg)] px-3 py-1 text-xs font-bold text-[var(--rv-terracotta-dark)]">{service.category}</span>
          <ArrowRight size={18} className="text-[var(--rv-ink-2)]" />
        </div>
        <h3 className="font-display text-xl">{service.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--rv-ink-2)]">{service.description}</p>
      </CardContent>
    </Card>
  );
}
