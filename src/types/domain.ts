export type UserRole = "customer" | "designer" | "contractor" | "admin";

export type ProjectStatus =
  | "draft"
  | "published"
  | "receiving_proposals"
  | "matching"
  | "professional_selected"
  | "discussion"
  | "in_progress"
  | "awaiting_customer_review"
  | "revision_required"
  | "completed"
  | "cancelled"
  | "archived";

export type ProposalStatus =
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "withdrawn";

export type Profile = {
  id: string;
  fullName: string;
  email: string;
  primaryRole: UserRole;
  roles: UserRole[];
  city?: string;
  state?: string;
  bio?: string;
  businessName?: string;
  yearsExperience?: number;
  serviceAreas?: string[];
  services?: string[];
  specializations?: string[];
  startingPrice?: number;
  projectSizeRange?: string;
  availabilityStatus?: string;
  verificationStatus?: "unverified" | "verification_pending" | "verified" | "rejected";
  ratingAvg?: number;
  reviewsCount?: number;
  profilePhotoUrl?: string;
};

export type Service = {
  id: string;
  category: "Design" | "Ceiling" | "Wall" | "Flooring" | "Execution";
  name: string;
  slug: string;
  roleScope: UserRole[];
  description: string;
};

export type Project = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  status: ProjectStatus;
  scopeType: string;
  scopeLabel: string;
  services: string[];
  city: string;
  state: string;
  locality?: string;
  budgetRange: string;
  customBudget?: number;
  preferredStartDate?: string;
  expectedTimeline?: string;
  filesCount: number;
  proposalsCount: number;
  selectedProfessionalId?: string;
  createdAt: string;
  publishedAt?: string;
};

export type Proposal = {
  id: string;
  projectId: string;
  customerId: string;
  professionalId: string;
  professionalRole: UserRole;
  professionalName: string;
  status: ProposalStatus;
  proposedAmount?: number;
  proposedAmountMin?: number;
  proposedAmountMax?: number;
  estimatedTimeline: string;
  message: string;
  deliverables: string[];
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  projectId?: string;
  kind: string;
  message: string;
  readAt?: string | null;
  createdAt: string;
};

export type PortfolioProject = {
  id: string;
  professionalId: string;
  title: string;
  category: string;
  description: string;
  location: string;
  completionYear: number;
  servicesProvided: string[];
  isFeatured: boolean;
};

export type Review = {
  id: string;
  projectId: string;
  customerId: string;
  professionalId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
};
