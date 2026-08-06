import Link from "next/link";
import { Calendar, FileText, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/components/sajivo/StatusBadge";
import { daysAgo } from "@/lib/utils";
import type { Project, UserRole } from "@/types/domain";

export function ProjectCard({ project, role }: { project: Project; role: UserRole }) {
  const base = role === "customer" ? "/customer/dashboard/projects" : `/${role}/dashboard/discover`;
  return (
    <Card className="micro-rise">
      <CardContent>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
          <div>
            <ProjectStatusBadge status={project.status} />
            <Link href={`${base}/${project.id}`} className="font-display mt-3 block text-2xl hover:text-[var(--rv-terracotta)]">{project.title}</Link>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--rv-ink-2)]">{project.description}</p>
          </div>
          <ButtonLink href={`${base}/${project.id}`} variant="outline">View Project</ButtonLink>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.services.slice(0, 4).map((service) => <Badge key={service}>{service}</Badge>)}
        </div>
        <div className="mt-5 grid gap-2 text-sm text-[var(--rv-ink-2)] md:grid-cols-4">
          <span className="flex items-center gap-2"><MapPin size={15} /> {project.locality}, {project.city}</span>
          <span>{project.budgetRange}</span>
          <span className="flex items-center gap-2"><FileText size={15} /> {project.filesCount} files · {project.proposalsCount} proposals</span>
          <span className="flex items-center gap-2"><Calendar size={15} /> {daysAgo(project.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
