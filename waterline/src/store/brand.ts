"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  BrandState,
  ColourRole,
  HealthPoint,
  Institution,
  LayerAssessment,
  Maturity,
  SubBrand,
  TypeRole,
} from "@/lib/types";
import { computeScores } from "@/lib/scoring";

const today = () => new Date().toISOString().slice(0, 10);

export const EMPTY_INSTITUTION: Institution = {
  name: "",
  type: "university",
  size: "medium",
  units: 8,
  regions: [],
  architecture: "undecided",
  annualBrandSpend: 250000,
  currency: "GBP",
  mandate: "",
  primaryGoals: [],
};

export const DEFAULT_PALETTE: ColourRole[] = [
  {
    id: "primary",
    name: "Primary",
    hex: "#0B2740",
    usage: "The institutional constant. Mastheads, primary surfaces, authority.",
  },
  {
    id: "signal",
    name: "Signal",
    hex: "#1E7FA8",
    usage: "Actions and interactive elements only. Never decorative.",
  },
  {
    id: "surface",
    name: "Surface",
    hex: "#F4F1EC",
    usage: "Page and card grounds. Carries the warmth of the system.",
  },
  {
    id: "ink",
    name: "Ink",
    hex: "#14171A",
    usage: "Body text and anything that must be read at length.",
  },
  {
    id: "accent",
    name: "Accent",
    hex: "#C2624A",
    usage: "Sparing emphasis. One per view, at most.",
  },
];

export const DEFAULT_TYPE_ROLES: TypeRole[] = [
  { id: "display", name: "Display", step: 6, weight: 400, lineHeight: 1.05, tracking: -0.022, usage: "Campaign and cover only." },
  { id: "h1", name: "Heading 1", step: 5, weight: 500, lineHeight: 1.1, tracking: -0.02, usage: "One per page." },
  { id: "h2", name: "Heading 2", step: 4, weight: 500, lineHeight: 1.15, tracking: -0.016, usage: "Major sections." },
  { id: "h3", name: "Heading 3", step: 3, weight: 600, lineHeight: 1.25, tracking: -0.01, usage: "Subsections and card titles." },
  { id: "lead", name: "Lead", step: 1, weight: 400, lineHeight: 1.5, tracking: 0, usage: "Standfirst and introductions." },
  { id: "body", name: "Body", step: 0, weight: 400, lineHeight: 1.6, tracking: 0, usage: "The default. Most of what you publish." },
  { id: "meta", name: "Meta", step: -1, weight: 500, lineHeight: 1.45, tracking: 0.004, usage: "Labels, metadata, captions." },
];

export const INITIAL_STATE: BrandState = {
  institution: EMPTY_INSTITUTION,
  assessments: {},
  answers: {},
  subBrands: [],
  palette: DEFAULT_PALETTE,
  typeRoles: DEFAULT_TYPE_ROLES,
  typeBase: 17,
  typeRatio: 1.25,
  headingFamily: "var(--font-serif)",
  bodyFamily: "var(--font-sans)",
  history: [],
  onboardingComplete: false,
  diagnosticComplete: false,
};

interface Actions {
  setInstitution: (patch: Partial<Institution>) => void;
  assess: (layerId: string, patch: Partial<LayerAssessment>) => void;
  setMaturity: (layerId: string, maturity: Maturity) => void;
  answer: (layerId: string, promptId: string, value: string) => void;
  addSubBrand: (sub: Omit<SubBrand, "id">) => void;
  updateSubBrand: (id: string, patch: Partial<SubBrand>) => void;
  removeSubBrand: (id: string) => void;
  setPalette: (palette: ColourRole[]) => void;
  updateColour: (id: string, patch: Partial<ColourRole>) => void;
  setTypeSettings: (patch: Partial<Pick<BrandState, "typeBase" | "typeRatio" | "headingFamily" | "bodyFamily">>) => void;
  updateTypeRole: (id: string, patch: Partial<TypeRole>) => void;
  snapshot: (label?: string) => void;
  completeOnboarding: () => void;
  completeDiagnostic: () => void;
  loadWorkedExample: () => void;
  reset: () => void;
}

export type BrandStore = BrandState & Actions;

export const useBrand = create<BrandStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setInstitution: (patch) =>
        set((s) => ({ institution: { ...s.institution, ...patch } })),

      assess: (layerId, patch) =>
        set((s) => {
          const existing: LayerAssessment = s.assessments[layerId] ?? {
            layerId,
            maturity: 0,
            evidence: "",
            owner: "",
            reviewedOn: today(),
          };
          return {
            assessments: {
              ...s.assessments,
              [layerId]: { ...existing, ...patch, layerId },
            },
          };
        }),

      setMaturity: (layerId, maturity) => get().assess(layerId, { maturity }),

      answer: (layerId, promptId, value) =>
        set((s) => ({
          answers: {
            ...s.answers,
            [layerId]: { ...s.answers[layerId], [promptId]: value },
          },
        })),

      addSubBrand: (sub) =>
        set((s) => ({
          subBrands: [
            ...s.subBrands,
            { ...sub, id: `sb_${Math.random().toString(36).slice(2, 9)}` },
          ],
        })),

      updateSubBrand: (id, patch) =>
        set((s) => ({
          subBrands: s.subBrands.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        })),

      removeSubBrand: (id) =>
        set((s) => ({ subBrands: s.subBrands.filter((b) => b.id !== id) })),

      setPalette: (palette) => set({ palette }),

      updateColour: (id, patch) =>
        set((s) => ({
          palette: s.palette.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),

      setTypeSettings: (patch) => set(patch),

      updateTypeRole: (id, patch) =>
        set((s) => ({
          typeRoles: s.typeRoles.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),

      /** Records where the brand stands today, so drift becomes visible later. */
      snapshot: (label) =>
        set((s) => {
          const scores = computeScores(s);
          const point: HealthPoint = {
            date: today(),
            deep: Math.round(scores.deep),
            surface: Math.round(scores.surface),
            composite: Math.round(scores.composite),
            label,
          };
          const history = s.history.filter((h) => h.date !== point.date);
          return { history: [...history, point].sort((a, b) => a.date.localeCompare(b.date)) };
        }),

      completeOnboarding: () => set({ onboardingComplete: true }),
      completeDiagnostic: () => set({ diagnosticComplete: true }),

      loadWorkedExample: () => set({ ...WORKED_EXAMPLE }),

      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "waterline.brand.v1",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

/* ------------------------------------------------------------------ */
/* Worked example                                                      */
/* ------------------------------------------------------------------ */

const assessment = (
  layerId: string,
  maturity: Maturity,
  owner: string,
  evidence: string,
): LayerAssessment => ({
  layerId,
  maturity,
  owner,
  evidence,
  reviewedOn: "2026-07-14",
});

/**
 * A fictional institution used to demonstrate the product with realistic data.
 * Northgate does not exist. It is deliberately shaped as a classic top-heavy
 * case — a recent visual refresh sitting on an unresolved strategy — because
 * that is the state most institutions arrive in.
 */
export const WORKED_EXAMPLE: BrandState = {
  institution: {
    name: "Northgate University",
    type: "university",
    size: "large",
    units: 34,
    regions: ["North West", "International — South Asia", "International — West Africa"],
    architecture: "endorsed",
    annualBrandSpend: 1850000,
    currency: "GBP",
    mandate:
      "New Vice-Chancellor arriving in January. The 2024 visual refresh is widely disliked internally and applications from our two priority international markets fell 11% year on year. The board has asked for a brand review before any further spend is approved.",
    primaryGoals: [
      "Recover international postgraduate applications",
      "Stop faculty logo proliferation",
      "Give the incoming VC a defensible position rather than a blank page",
    ],
  },
  assessments: {
    research: assessment("research", 2, "Director of Insight", "2025 applicant survey (n=2,140); perception audit commissioned but not yet read by the exec."),
    customers: assessment("customers", 1, "", "Personas exist in the 2024 agency deck. Demographic only — no decision or fear mapping."),
    competition: assessment("competition", 1, "", "League-table benchmarking only. No mapping of the actual alternatives applicants weigh."),
    offering: assessment("offering", 2, "Academic Registrar", "Course catalogue is complete and accurate, but structured by faculty rather than by outcome."),
    differentiation: assessment("differentiation", 1, "", "'Research-led teaching and our people.' Both claimed verbatim by the two nearest competitors."),
    expose: assessment("expose", 0, "", "No positioning document exists. The strategy lives in the outgoing Director of Marketing's head."),
    mission: assessment("mission", 2, "University Secretary", "Charter mission, unchanged since 1963. Accurate but not used in decision-making."),
    vision: assessment("vision", 2, "Strategy Office", "Corporate Plan 2030 contains a vision statement. Not connected to brand work."),
    values: assessment("values", 1, "", "Five values on the intranet. No trade-offs stated, no evidence of the institution paying a cost for any of them."),
    story: assessment("story", 1, "", "History page starts in 1861 and never mentions a student."),
    "tone-voice": assessment("tone-voice", 1, "", "Marketing has a voice guide. Admissions correspondence and student services do not follow it."),
    "look-feel": assessment("look-feel", 1, "", "No written art direction. The 2024 refresh was signed off on taste, which is why it is now being relitigated."),
    logo: assessment("logo", 3, "Head of Brand", "2024 mark with clearspace rules. No sub-brand lockup system, which is the actual problem."),
    colour: assessment("colour", 3, "Head of Brand", "Six-colour palette. Primary fails contrast on white; four faculties have quietly darkened it themselves."),
    typography: assessment("typography", 2, "Head of Brand", "Licensed face covers the central team only. 34 faculties default to Calibri."),
    website: assessment("website", 2, "Digital Director", "Homepage redesigned 2024. 41,000 legacy pages behind it, 380 editors, no publishing standard."),
    social: assessment("social", 1, "", "247 accounts identified in the audit. 61 active, 89 with no named owner."),
    marketing: assessment("marketing", 2, "Marketing Director", "Campaign framework exists for the admissions cycle. Each campaign restarts the visual language."),
    packaging: assessment("packaging", 2, "Estates", "Signage standard written. Three identity generations currently live across the estate."),
  },
  answers: {
    differentiation: {
      claim:
        "Draft: the only university in the region where every undergraduate degree includes a funded placement year with a regional employer.",
      "test-true":
        "True for 71% of programmes as of 2026 entry, not all. Needs either qualification or a commitment to close the gap by 2028.",
    },
    customers: {
      priority:
        "1. International postgraduate applicants (South Asia, West Africa)\n2. Regional employers\n3. Research funders\n4. Alumni donors",
    },
  },
  subBrands: [
    { id: "sb_1", name: "Northgate Business School", unit: "Faculty of Business", relationship: "endorsed", compliance: 84, status: "approved" },
    { id: "sb_2", name: "Northgate Medical School", unit: "Faculty of Medicine", relationship: "endorsed", compliance: 71, status: "in-review" },
    { id: "sb_3", name: "The Vaughan Institute", unit: "Research", relationship: "independent", compliance: 22, status: "non-compliant" },
    { id: "sb_4", name: "Northgate Sport", unit: "Student Services", relationship: "master", compliance: 91, status: "approved" },
    { id: "sb_5", name: "Creative Quarter", unit: "Faculty of Arts", relationship: "independent", compliance: 14, status: "unmanaged" },
    { id: "sb_6", name: "Northgate Online", unit: "Digital Education", relationship: "endorsed", compliance: 63, status: "in-review" },
    { id: "sb_7", name: "Careers & Placements", unit: "Student Services", relationship: "master", compliance: 88, status: "approved" },
  ],
  palette: [
    { id: "primary", name: "Northgate Navy", hex: "#122B45", usage: "The institutional constant. Mastheads and primary surfaces.", locked: true },
    { id: "signal", name: "Signal Teal", hex: "#12798F", usage: "Actions and links only. This is the colour failing contrast on white at present." },
    { id: "surface", name: "Stone", hex: "#F2EFE9", usage: "Page and card grounds across print and digital." },
    { id: "ink", name: "Ink", hex: "#171A1C", usage: "Body text and long-form reading." },
    { id: "accent", name: "Kiln", hex: "#B4553C", usage: "Sparing emphasis in campaign work. One per view." },
  ],
  typeRoles: DEFAULT_TYPE_ROLES,
  typeBase: 17,
  typeRatio: 1.25,
  headingFamily: "var(--font-serif)",
  bodyFamily: "var(--font-sans)",
  history: [
    { date: "2025-02-10", deep: 18, surface: 34, composite: 21, label: "Baseline, post-refresh" },
    { date: "2025-06-18", deep: 21, surface: 48, composite: 26, label: "Website launch" },
    { date: "2025-11-04", deep: 24, surface: 52, composite: 30, label: "Social audit complete" },
    { date: "2026-03-12", deep: 29, surface: 55, composite: 34, label: "Applicant survey in" },
    { date: "2026-07-14", deep: 33, surface: 57, composite: 38, label: "Board-commissioned review" },
  ],
  onboardingComplete: true,
  diagnosticComplete: true,
};
