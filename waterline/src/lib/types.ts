/**
 * Waterline — core domain model.
 *
 * The model is built on one idea: a brand is an iceberg. Roughly a fifth of it
 * is visible (the identity people can see), and the rest is the strategy that
 * decides whether the visible fifth means anything. Everything in this file is
 * organised around that split.
 */

/** Which side of the waterline a layer sits on. */
export type Tier = "deep" | "surface";

/**
 * Maturity is scored on a five-rung institutional ladder rather than a vague
 * 1–10. Each rung is an observable state, so two different assessors looking at
 * the same institution should land on the same rung.
 */
export type Maturity = 0 | 1 | 2 | 3 | 4;

export const MATURITY_LADDER: {
  level: Maturity;
  label: string;
  short: string;
  description: string;
}[] = [
  {
    level: 0,
    label: "Absent",
    short: "Nothing exists",
    description:
      "No artefact, no shared understanding. If you asked ten people you would get ten answers, or ten blank looks.",
  },
  {
    level: 1,
    label: "Ad hoc",
    short: "Exists in someone's head",
    description:
      "It exists informally — in a founder's instinct, a deck from three years ago, a shared belief nobody wrote down. It cannot be handed over.",
  },
  {
    level: 2,
    label: "Documented",
    short: "Written down",
    description:
      "A deliberate, written artefact exists and is findable. It has not yet changed how the institution behaves day to day.",
  },
  {
    level: 3,
    label: "Operationalised",
    short: "Used in the work",
    description:
      "Teams actively use it to make decisions — briefs cite it, work is judged against it, new starters are taught it.",
  },
  {
    level: 4,
    label: "Governed",
    short: "Owned, measured, maintained",
    description:
      "It has a named owner, a review cadence, and a measure. Drift is detected and corrected rather than discovered years later.",
  },
];

/** A single question inside a layer's guided workspace. */
export interface Prompt {
  id: string;
  question: string;
  /** Why this question earns its place — shown as coaching, not filler. */
  help: string;
  /** A worked example, written for an institution rather than a startup. */
  example?: string;
  kind: "short" | "long" | "list";
}

/** One of the nineteen layers of the brand system. */
export interface Layer {
  id: string;
  name: string;
  tier: Tier;
  order: number;
  /** One-line definition. */
  summary: string;
  /** The case for why this layer is load-bearing. */
  rationale: string;
  /** Relative weight inside its tier when scoring. */
  weight: number;
  /** What a finished version of this layer actually is. */
  deliverable: string;
  /** Layers that should be settled before this one is credible. */
  dependsOn: string[];
  /** What changes about this layer when the client is an institution. */
  institutionalNote: string;
  /** The failure you see when this layer is skipped. */
  failureMode: string;
  prompts: Prompt[];
}

export type InstitutionType =
  | "university"
  | "health"
  | "government"
  | "financial"
  | "nonprofit"
  | "cultural"
  | "other";

/**
 * How the institution's brands relate to one another. This materially changes
 * the advice, so it is captured up front rather than assumed.
 */
export type ArchitectureModel =
  | "monolithic"
  | "endorsed"
  | "house-of-brands"
  | "hybrid"
  | "undecided";

export interface Institution {
  name: string;
  type: InstitutionType;
  /** Headcount band — drives governance recommendations. */
  size: "small" | "medium" | "large" | "very-large";
  /** Number of faculties, departments, agencies, branches, member bodies. */
  units: number;
  regions: string[];
  architecture: ArchitectureModel;
  /** Annual spend on brand, marketing and communications, in whole currency units. */
  annualBrandSpend: number;
  currency: string;
  /** Free-text: what triggered this work. */
  mandate: string;
  primaryGoals: string[];
}

/** An assessment of one layer at one point in time. */
export interface LayerAssessment {
  layerId: string;
  maturity: Maturity;
  /** Evidence the assessor cited. Scores without evidence are opinions. */
  evidence: string;
  owner: string;
  /** ISO date. */
  reviewedOn: string;
}

/** Free-text answers captured in a layer's guided workspace. */
export type LayerAnswers = Record<string, string>;

export interface SubBrand {
  id: string;
  name: string;
  unit: string;
  /** How closely it should sit to the parent. */
  relationship: "master" | "endorsed" | "independent";
  /** 0–100 measured adherence to the system. */
  compliance: number;
  status: "approved" | "in-review" | "non-compliant" | "unmanaged";
}

export interface ColourRole {
  id: string;
  name: string;
  hex: string;
  /** What this colour is *for* — the part most palettes omit. */
  usage: string;
  locked?: boolean;
}

export interface TypeRole {
  id: string;
  name: string;
  /** Step on the modular scale, relative to base. */
  step: number;
  weight: number;
  lineHeight: number;
  tracking: number;
  usage: string;
}

/** A point in the brand-health time series. */
export interface HealthPoint {
  /** ISO date. */
  date: string;
  deep: number;
  surface: number;
  composite: number;
  label?: string;
}

export interface BrandState {
  institution: Institution;
  assessments: Record<string, LayerAssessment>;
  answers: Record<string, LayerAnswers>;
  subBrands: SubBrand[];
  palette: ColourRole[];
  typeRoles: TypeRole[];
  typeBase: number;
  typeRatio: number;
  headingFamily: string;
  bodyFamily: string;
  history: HealthPoint[];
  onboardingComplete: boolean;
  diagnosticComplete: boolean;
}
