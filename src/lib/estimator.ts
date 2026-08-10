export type EstimatorInputs = {
  city: string;
  propertyType: string;
  projectType: string;
  areaSqFt: number;
  rooms: number;
  requirements: string[];
  quality: "basic" | "standard" | "premium" | "luxury";
  materialGrade: "economy" | "standard" | "premium" | "brands";
  timeline: "flexible" | "one_three" | "three_six" | "urgent";
  budgetMin?: number;
  budgetMax?: number;
  budgetUnknown: boolean;
};

export type EstimateBreakdown = {
  materials: [number, number];
  labour: [number, number];
  professional: [number, number];
  execution: [number, number];
  other: [number, number];
  contingency: [number, number];
  taxes: [number, number];
};

export type EstimateResult = {
  minimum: number;
  maximum: number;
  confidence: "Low" | "Medium" | "High";
  budgetStatus: "compatible" | "slight_gap" | "major_gap" | "unknown";
  budgetMessage: string;
  breakdown: EstimateBreakdown;
  drivers: Array<{ label: string; impact: number }>;
  assumptions: string[];
  rateVersion: string;
};

export const CITY_RATES: Record<string, number> = {
  Bengaluru: 2450,
  Mumbai: 2850,
  Delhi: 2550,
  Hyderabad: 2050,
  Chennai: 2150,
  Pune: 2250,
  Kolkata: 1850,
  Other: 1750,
};

export const QUALITY_FACTORS = { basic: 0.78, standard: 1, premium: 1.28, luxury: 1.72 } as const;
export const MATERIAL_FACTORS = { economy: 0.82, standard: 1, premium: 1.25, brands: 1.42 } as const;

const REQUIREMENT_FACTORS: Record<string, number> = {
  "Interior design": 0.08,
  "Civil work": 0.12,
  Electrical: 0.07,
  Plumbing: 0.06,
  Carpentry: 0.17,
  Painting: 0.06,
  Flooring: 0.12,
  Kitchen: 0.16,
  Bathroom: 0.1,
  Furniture: 0.12,
  "False ceiling": 0.08,
  Lighting: 0.06,
  "Other requirements": 0.08,
};

const round = (value: number) => Math.round(value / 500) * 500;

export function calculateEstimate(inputs: EstimatorInputs, rateVersion = "2026.08-mvp") : EstimateResult {
  const area = Math.max(100, Math.min(100000, Number(inputs.areaSqFt) || 0));
  const base = CITY_RATES[inputs.city] ?? CITY_RATES.Other;
  const quality = QUALITY_FACTORS[inputs.quality] ?? 1;
  const material = MATERIAL_FACTORS[inputs.materialGrade] ?? 1;
  const scopeFactor = inputs.projectType === "repair" ? 0.48 : inputs.projectType === "renovation" ? 0.92 : inputs.projectType === "new_construction" ? 1.18 : 1;
  const roomFactor = 1 + Math.max(0, Math.min(10, inputs.rooms) - 2) * 0.025;
  const requirementFactor = inputs.requirements.reduce((sum, item) => sum + (REQUIREMENT_FACTORS[item] ?? 0.04), 0);
  const scope = Math.max(0.55, 0.72 + requirementFactor) * scopeFactor * roomFactor;
  const core = area * base * quality * material * scope;
  const professional: [number, number] = [round(core * 0.08), round(core * 0.12)];
  const labour: [number, number] = [round(core * 0.16), round(core * 0.22)];
  const materials: [number, number] = [round(core * 0.48), round(core * 0.58)];
  const execution: [number, number] = [round(core * 0.1), round(core * 0.15)];
  const other: [number, number] = [round(core * Math.max(0.03, requirementFactor * 0.22)), round(core * Math.max(0.06, requirementFactor * 0.34))];
  const subtotal: [number, number] = [materials[0] + labour[0] + professional[0] + execution[0] + other[0], materials[1] + labour[1] + professional[1] + execution[1] + other[1]];
  const contingency: [number, number] = [round(subtotal[0] * 0.05), round(subtotal[1] * 0.1)];
  const taxes: [number, number] = [round((subtotal[0] + contingency[0]) * 0.05), round((subtotal[1] + contingency[1]) * 0.18)];
  const minimum = subtotal[0] + contingency[0] + taxes[0];
  const maximum = subtotal[1] + contingency[1] + taxes[1];
  const budgetStatus = inputs.budgetUnknown || !inputs.budgetMin || !inputs.budgetMax ? "unknown" : inputs.budgetMax >= minimum && inputs.budgetMin <= maximum ? inputs.budgetMin <= minimum && inputs.budgetMax >= maximum ? "compatible" : "slight_gap" : inputs.budgetMax < minimum * 0.7 ? "major_gap" : "slight_gap";
  const budgetMessage = budgetStatus === "compatible" ? "Your budget is compatible with the estimated project requirement." : budgetStatus === "slight_gap" ? "Your budget is slightly below or overlaps part of the estimated range." : budgetStatus === "major_gap" ? "Your current budget is significantly below the estimated requirement. Let’s find what can change." : "Add a budget to see how it compares with the indicative range.";
  const drivers = [
    { label: `${inputs.city} location factor`, impact: round(core - area * CITY_RATES.Other * quality * material * scope) },
    { label: `${inputs.quality} quality level`, impact: round(core * Math.abs(quality - 1)) },
    { label: `${inputs.materialGrade} material grade`, impact: round(core * Math.abs(material - 1)) },
    { label: `${inputs.requirements.length} selected requirements`, impact: round(core * requirementFactor) },
  ].filter((item) => item.impact > 0);
  return {
    minimum, maximum, confidence: inputs.requirements.length >= 3 && area >= 500 ? "Medium" : "Low", budgetStatus, budgetMessage,
    breakdown: { materials, labour, professional, execution, other, contingency, taxes }, drivers,
    assumptions: ["Estimate uses location-adjusted rule-based rates.", "Site conditions, measurements, specifications, and exclusions can change final pricing.", "The estimate is indicative planning guidance, never a professional quotation."], rateVersion,
  };
}

export function formatINR(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}
