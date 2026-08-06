import { notifications, portfolioProjects, profiles, projects, proposals, reviews, services } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import type { Profile, Project, UserRole } from "@/types/domain";

function toProfile(row: Record<string, unknown>): Profile {
  return {
    id: String(row.id),
    fullName: String(row.full_name ?? ""),
    email: String(row.email ?? ""),
    primaryRole: row.primary_role as UserRole,
    roles: (row.roles as UserRole[] | null) ?? [row.primary_role as UserRole],
    city: row.city as string | undefined,
    state: row.state as string | undefined,
    bio: row.bio as string | undefined,
    businessName: row.business_name as string | undefined,
    yearsExperience: row.years_experience as number | undefined,
    serviceAreas: (row.service_areas as string[] | null) ?? [],
    services: (row.services as string[] | null) ?? [],
    specializations: (row.specializations as string[] | null) ?? [],
    startingPrice: row.starting_price as number | undefined,
    projectSizeRange: row.project_size_range as string | undefined,
    availabilityStatus: row.availability_status as string | undefined,
    verificationStatus: row.verification_status as Profile["verificationStatus"],
    ratingAvg: row.rating_avg as number | undefined,
    reviewsCount: row.reviews_count as number | undefined,
    profilePhotoUrl: row.profile_photo_url as string | undefined,
  };
}

function toProject(row: Record<string, unknown>): Project {
  const scope = (row.scope ?? {}) as Record<string, string>;
  return {
    id: String(row.id),
    customerId: String(row.customer_id),
    title: String(row.title ?? "Untitled project"),
    description: String(row.description ?? ""),
    status: row.status as Project["status"],
    scopeType: String(scope.type ?? "custom"),
    scopeLabel: String(scope.label ?? scope.subtype ?? "Custom Project"),
    services: (row.services as string[] | null) ?? [],
    city: String(row.city ?? ""),
    state: String(row.state ?? ""),
    locality: row.locality as string | undefined,
    budgetRange: String(row.budget_range ?? "Unknown"),
    customBudget: row.custom_budget as number | undefined,
    preferredStartDate: row.preferred_start_date as string | undefined,
    expectedTimeline: row.expected_timeline as string | undefined,
    filesCount: Number(row.files_count ?? 0),
    proposalsCount: Number(row.proposals_count ?? 0),
    selectedProfessionalId: row.selected_professional_id as string | undefined,
    createdAt: String(row.created_at ?? new Date().toISOString()),
    publishedAt: row.published_at as string | undefined,
  };
}

export async function getServices() {
  const supabase = await createClient();
  if (!supabase) return services;
  const { data, error } = await supabase.from("services").select("*").eq("is_active", true).order("sort_order");
  if (error || !data?.length) return services;
  return data.map((row) => ({
    id: row.id,
    category: row.category,
    name: row.name,
    slug: row.slug,
    roleScope: row.role_scope,
    description: row.description ?? "",
  }));
}

export async function getProfessionals(role?: UserRole | "all") {
  const supabase = await createClient();
  if (!supabase) return profiles.filter((profile) => profile.primaryRole === "designer" || profile.primaryRole === "contractor");
  let query = supabase.from("profiles").select("*").in("primary_role", ["designer", "contractor"]).eq("account_status", "active");
  if (role && role !== "all") query = query.eq("primary_role", role);
  const { data, error } = await query.order("rating_avg", { ascending: false });
  if (error || !data?.length) return profiles.filter((profile) => profile.primaryRole === "designer" || profile.primaryRole === "contractor");
  return data.map(toProfile);
}

export async function getProjectsForRole(role: UserRole) {
  const supabase = await createClient();
  if (!supabase) {
    if (role === "customer") return projects;
    return projects.filter((project) => ["published", "receiving_proposals", "matching", "in_progress"].includes(project.status));
  }
  const discoverable = ["published", "receiving_proposals", "matching"];
  const query = role === "customer"
    ? supabase.from("projects").select("*, files_count:project_files(count), proposals_count:proposals(count)").order("created_at", { ascending: false })
    : supabase.from("projects").select("*, files_count:project_files(count), proposals_count:proposals(count)").in("status", discoverable).order("created_at", { ascending: false });
  const { data, error } = await query;
  if (error || !data?.length) return role === "customer" ? projects : projects.filter((project) => discoverable.includes(project.status));
  return data.map(toProject);
}

export async function getProjectById(id: string) {
  return projects.find((project) => project.id === id) ?? projects[0];
}

export async function getDashboardSummary(role: UserRole) {
  const roleProjects = await getProjectsForRole(role);
  return {
    activeProjects: roleProjects.filter((project) => ["professional_selected", "discussion", "in_progress", "awaiting_customer_review"].includes(project.status)).length,
    publishedProjects: roleProjects.filter((project) => ["published", "receiving_proposals", "matching"].includes(project.status)).length,
    proposals: proposals.length,
    unreadNotifications: notifications.filter((notification) => !notification.readAt).length,
  };
}

export async function getProposals(role: UserRole) {
  if (role === "customer") return proposals;
  return proposals.filter((proposal) => proposal.professionalRole === role);
}

export async function getNotifications() {
  return notifications;
}

export async function getPortfolioForProfessional(id: string) {
  return portfolioProjects.filter((project) => project.professionalId === id);
}

export async function getReviewsForProfessional(id: string) {
  return reviews.filter((review) => review.professionalId === id);
}
