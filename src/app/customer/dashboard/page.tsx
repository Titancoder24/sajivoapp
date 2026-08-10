import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/sajivo/ProjectCard";
import { ActivityPanel, DashboardHeader, ProgressOverview, SectionHeader, StatGrid } from "@/components/sajivo/DashboardBlocks";
import { ArrowRight, Plus } from "lucide-react";
import { getCurrentProfile, getDashboardSummary, getNotifications, getProjectsForRole } from "@/lib/server/repository";

export default async function CustomerDashboardPage() {
  const [summary, list, profile, activity] = await Promise.all([getDashboardSummary("customer"), getProjectsForRole("customer"), getCurrentProfile(), getNotifications()]);
  const firstName = profile?.fullName.split(" ")[0] || "there";
  return (
    <>
      <DashboardHeader eyebrow="Homeowner workspace" title={`Good afternoon, ${firstName}`} text="Here is what is moving across your interior projects today." action={<ButtonLink href="/customer/dashboard/projects/new" size="sm"><Plus size={15} />New project</ButtonLink>} />
      <StatGrid stats={[{ label: "Active projects", value: summary.activeProjects, detail: "Live", trend: "neutral" }, { label: "Published briefs", value: summary.publishedProjects, detail: "Marketplace", trend: "neutral" }, { label: "Proposals received", value: summary.proposals, detail: "All projects", trend: "neutral" }, { label: "Needs attention", value: summary.unreadNotifications, detail: "Unread", trend: "neutral" }]} />
      <div className="mt-5 grid gap-4 xl:grid-cols-2"><ProgressOverview project={list[0]} /><ActivityPanel items={activity.slice(0, 3).map((item) => ({ title: item.message, detail: item.kind.replaceAll("_", " "), time: new Date(item.createdAt).toLocaleDateString("en-IN") }))} /></div>
      <div className="mt-7"><SectionHeader title="Your projects" text="Recently updated work" action={<ButtonLink href="/customer/dashboard/projects" size="sm" variant="ghost">View all <ArrowRight size={13} /></ButtonLink>} /><div className="grid gap-3">{list.slice(0, 3).map((project) => <ProjectCard key={project.id} project={project} role="customer" />)}</div></div>
    </>
  );
}
