import { LAYERS, LAYER_BY_ID, TIER_WEIGHT, layersInTier } from "./framework";
import type { BrandState, Layer, Maturity, Tier } from "./types";

/** A layer's maturity, defaulting to 0 when it has never been assessed. */
export function maturityOf(state: BrandState, layerId: string): Maturity {
  return state.assessments[layerId]?.maturity ?? 0;
}

/** Maturity 0–4 expressed on the 0–100 scale used everywhere in the UI. */
export function layerScore(state: BrandState, layerId: string): number {
  return (maturityOf(state, layerId) / 4) * 100;
}

/** Weighted mean of a tier's layers, 0–100. */
export function tierScore(state: BrandState, tier: Tier): number {
  const layers = layersInTier(tier);
  const total = layers.reduce((sum, l) => sum + l.weight, 0);
  const earned = layers.reduce(
    (sum, l) => sum + l.weight * layerScore(state, l.id),
    0,
  );
  return total === 0 ? 0 : earned / total;
}

export type Posture =
  | "top-heavy"
  | "hidden-depth"
  | "unmanaged"
  | "aligned"
  | "emerging";

export interface PostureDefinition {
  id: Posture;
  label: string;
  headline: string;
  detail: string;
  /** What to do first, given this posture. */
  move: string;
}

export const POSTURES: Record<Posture, PostureDefinition> = {
  "top-heavy": {
    id: "top-heavy",
    label: "Top-heavy",
    headline: "A polished surface over a hollow foundation.",
    detail:
      "The identity is more developed than the strategy underneath it. This is the most common and most expensive state: the visible work looks finished, so the institution believes the brand is done, while every decision it should be guiding is still being made on instinct. It reads as success right up until the first leadership change or the first crisis.",
    move:
      "Stop commissioning surface work. Take the differentiation and exposé layers to at least Documented before the next campaign is briefed.",
  },
  "hidden-depth": {
    id: "hidden-depth",
    label: "Hidden depth",
    headline: "A serious strategy nobody can see.",
    detail:
      "The thinking is real and well documented, but it has not surfaced into an identity that communicates it. The institution is under-credited for what it actually is — usually described from the outside in terms it would not choose for itself.",
    move:
      "Move to expression. The strategy is ready to brief from; the constraint now is identity and channel execution, not more analysis.",
  },
  unmanaged: {
    id: "unmanaged",
    label: "Unmanaged",
    headline: "The brand is happening to you.",
    detail:
      "Neither tier is established. The institution has a reputation — every institution does — but it is being written by other people, in their words, from whatever they encountered most recently.",
    move:
      "Begin at Research and Customers. Do not open a design conversation for at least one full cycle of evidence gathering.",
  },
  aligned: {
    id: "aligned",
    label: "Aligned",
    headline: "Strategy and identity are in step.",
    detail:
      "Both tiers are developed and roughly proportionate. The work now is not construction but governance: holding the system as people, units and leadership turn over.",
    move:
      "Shift investment from building to governing — ownership, review cadence, measurement, and sub-brand compliance.",
  },
  emerging: {
    id: "emerging",
    label: "Emerging",
    headline: "Under construction, in the right order.",
    detail:
      "The system is partly built and the foundation is keeping pace with the surface. This is what healthy progress looks like mid-programme.",
    move: "Continue in dependency order and resist pressure to jump ahead to identity work.",
  },
};

export interface Scores {
  deep: number;
  surface: number;
  composite: number;
  /** Positive means the surface is ahead of the strategy — the dangerous direction. */
  balance: number;
  posture: PostureDefinition;
  assessedCount: number;
  totalCount: number;
}

export function computeScores(state: BrandState): Scores {
  const deep = tierScore(state, "deep");
  const surface = tierScore(state, "surface");
  const composite = deep * TIER_WEIGHT.deep + surface * TIER_WEIGHT.surface;
  const balance = surface - deep;

  let posture: Posture;
  if (deep < 30 && surface < 30) posture = "unmanaged";
  else if (balance > 18) posture = "top-heavy";
  else if (balance < -18) posture = "hidden-depth";
  else if (deep >= 65 && surface >= 65) posture = "aligned";
  else posture = "emerging";

  const assessedCount = LAYERS.filter(
    (l) => state.assessments[l.id] !== undefined,
  ).length;

  return {
    deep,
    surface,
    composite,
    balance,
    posture: POSTURES[posture],
    assessedCount,
    totalCount: LAYERS.length,
  };
}

/* ------------------------------------------------------------------ */
/* Prioritisation                                                      */
/* ------------------------------------------------------------------ */

export interface Priority {
  layer: Layer;
  /** Higher is more urgent. */
  score: number;
  /** Plain-language justification shown next to the recommendation. */
  reason: string;
  /** True when this layer is being built on dependencies that are not ready. */
  unsupported: boolean;
  blockedBy: Layer[];
}

/** Dependencies below this maturity are treated as not yet load-bearing. */
const SUPPORT_THRESHOLD = 2;

/**
 * Ranks what to do next.
 *
 * Three things raise a layer's priority: how much the framework weights it, how
 * far it is from Governed, and how many other layers are waiting on it. The
 * third term is what produces sequencing advice rather than a simple list of
 * everything that scored badly.
 */
export function prioritise(state: BrandState): Priority[] {
  const dependents: Record<string, number> = {};
  for (const l of LAYERS) {
    for (const dep of l.dependsOn) {
      dependents[dep] = (dependents[dep] ?? 0) + 1;
    }
  }

  return LAYERS.map((layer) => {
    const maturity = maturityOf(state, layer.id);
    const gap = 4 - maturity;
    const blocking = dependents[layer.id] ?? 0;
    const blockedBy = layer.dependsOn
      .filter((d) => maturityOf(state, d) < SUPPORT_THRESHOLD)
      .map((d) => LAYER_BY_ID[d])
      .filter(Boolean);

    // Foundations first: a deep layer that many others rest on outranks a
    // surface layer with the same gap.
    const tierMultiplier = layer.tier === "deep" ? 1.35 : 1;
    const blockingMultiplier = 1 + blocking * 0.18;
    const score = layer.weight * gap * tierMultiplier * blockingMultiplier;

    const unsupported = maturity >= SUPPORT_THRESHOLD && blockedBy.length > 0;

    let reason: string;
    if (unsupported) {
      reason = `Built on ${blockedBy
        .map((b) => b.name)
        .join(" and ")}, which ${blockedBy.length > 1 ? "are" : "is"} not settled yet. This work is at risk of rework.`;
    } else if (blockedBy.length > 0) {
      reason = `Blocked — settle ${blockedBy.map((b) => b.name).join(", ")} first.`;
    } else if (gap === 0) {
      reason = "Governed. Maintain the review cadence.";
    } else if (blocking > 0) {
      reason = `${blocking} other layer${blocking > 1 ? "s" : ""} depend${blocking > 1 ? "" : "s"} on this, and it is only at ${MATURITY_LABEL[maturity]}.`;
    } else {
      reason = `Currently ${MATURITY_LABEL[maturity]}. ${gap} step${gap > 1 ? "s" : ""} from governed.`;
    }

    return { layer, score, reason, unsupported, blockedBy };
  }).sort((a, b) => b.score - a.score);
}

const MATURITY_LABEL = ["Absent", "Ad hoc", "Documented", "Operationalised", "Governed"];

export function maturityLabel(m: Maturity): string {
  return MATURITY_LABEL[m];
}

/* ------------------------------------------------------------------ */
/* Risk detection                                                      */
/* ------------------------------------------------------------------ */

export interface Risk {
  id: string;
  severity: "critical" | "high" | "moderate";
  title: string;
  detail: string;
  action: string;
}

export function detectRisks(state: BrandState): Risk[] {
  const risks: Risk[] = [];
  const scores = computeScores(state);
  const priorities = prioritise(state);

  const unsupported = priorities.filter((p) => p.unsupported);
  if (unsupported.length > 0) {
    risks.push({
      id: "unsupported-surface",
      severity: unsupported.length > 2 ? "critical" : "high",
      title: `${unsupported.length} layer${unsupported.length > 1 ? "s are" : " is"} built on unsettled foundations`,
      detail: `${unsupported
        .slice(0, 3)
        .map((p) => p.layer.name)
        .join(", ")}${unsupported.length > 3 ? ` and ${unsupported.length - 3} more` : ""} ${unsupported.length > 1 ? "have" : "has"} been developed ahead of the strategy layers they depend on. Work produced in this state is usually redone once the strategy settles.`,
      action: "Freeze further work on these layers until their dependencies reach Documented.",
    });
  }

  if (scores.balance > 18) {
    risks.push({
      id: "top-heavy",
      severity: "critical",
      title: "The identity is running ahead of the strategy",
      detail: `Surface maturity is ${Math.round(scores.surface)} against ${Math.round(scores.deep)} below the waterline — a gap of ${Math.round(scores.balance)} points. The institution looks more decided than it is.`,
      action: "Redirect the next budget cycle from execution to the differentiation and positioning layers.",
    });
  }

  const govLayers = LAYERS.filter((l) => maturityOf(state, l.id) === 3);
  if (govLayers.length >= 5) {
    risks.push({
      id: "ungoverned",
      severity: "moderate",
      title: `${govLayers.length} layers are in use but ungoverned`,
      detail:
        "These layers are actively guiding work but have no named owner, review cadence or measure. They will drift, and the drift will be discovered late.",
      action: "Assign an owner and a review date to each. Governance is cheaper than a rebrand.",
    });
  }

  const unowned = LAYERS.filter(
    (l) => state.assessments[l.id] && !state.assessments[l.id].owner.trim(),
  );
  if (unowned.length >= 4) {
    risks.push({
      id: "unowned",
      severity: "moderate",
      title: `${unowned.length} assessed layers have no named owner`,
      detail:
        "Unowned layers are nobody's job. In an institution that means they are revisited only when something goes wrong.",
      action: "Name an accountable owner per layer, by role rather than by person.",
    });
  }

  const noEvidence = LAYERS.filter(
    (l) => state.assessments[l.id] && !state.assessments[l.id].evidence.trim(),
  );
  if (noEvidence.length >= 5) {
    risks.push({
      id: "no-evidence",
      severity: "moderate",
      title: "Most scores are asserted rather than evidenced",
      detail: `${noEvidence.length} layers were scored without citing an artefact. Unevidenced scores tend to be optimistic, and they cannot be defended in a board paper.`,
      action: "Attach a document, link or quote to each score before the next review.",
    });
  }

  const drifting = state.subBrands.filter(
    (s) => s.status === "non-compliant" || s.status === "unmanaged",
  );
  if (drifting.length > 0) {
    risks.push({
      id: "sub-brand-drift",
      severity: drifting.length > 3 ? "high" : "moderate",
      title: `${drifting.length} sub-brand${drifting.length > 1 ? "s are" : " is"} outside the system`,
      detail:
        "Unmanaged sub-brands are the mechanism by which institutional identities fragment. Each one that succeeds locally makes the next unit's case for going it alone.",
      action: "Bring these into the endorsement model or formally accept them as independent.",
    });
  }

  const order = { critical: 0, high: 1, moderate: 2 } as const;
  return risks.sort((a, b) => order[a.severity] - order[b.severity]);
}

/* ------------------------------------------------------------------ */
/* Rework exposure                                                     */
/* ------------------------------------------------------------------ */

/**
 * Indicative share of unsupported surface investment that is typically redone
 * once the strategy beneath it settles. This is a planning assumption used to
 * size the risk, not a measured figure — it is surfaced in the UI as such, and
 * exposed here so it can be argued with.
 */
export const REWORK_COEFFICIENT = 0.35;

export interface Exposure {
  /** Share of surface weight resting on unsettled foundations, 0–1. */
  unsupportedShare: number;
  /** Indicative annual spend at risk, in the institution's currency. */
  amount: number;
  layers: Layer[];
}

export function reworkExposure(state: BrandState): Exposure {
  const surface = layersInTier("surface");
  const totalWeight = surface.reduce((s, l) => s + l.weight, 0);

  const atRisk = surface.filter((l) => {
    const m = maturityOf(state, l.id);
    if (m < SUPPORT_THRESHOLD) return false;
    return l.dependsOn.some((d) => maturityOf(state, d) < SUPPORT_THRESHOLD);
  });

  const riskWeight = atRisk.reduce((s, l) => s + l.weight, 0);
  const unsupportedShare = totalWeight === 0 ? 0 : riskWeight / totalWeight;

  return {
    unsupportedShare,
    amount: state.institution.annualBrandSpend * unsupportedShare * REWORK_COEFFICIENT,
    layers: atRisk,
  };
}

/* ------------------------------------------------------------------ */
/* Roadmap                                                             */
/* ------------------------------------------------------------------ */

export interface Phase {
  name: string;
  horizon: string;
  intent: string;
  layers: Layer[];
}

/**
 * Groups the prioritised layers into three phases. Phase one is deliberately
 * capped — an institution that tries to move nineteen layers at once moves
 * none of them.
 */
export function roadmap(state: BrandState): Phase[] {
  const ranked = prioritise(state).filter((p) => maturityOf(state, p.layer.id) < 4);

  const ready = ranked.filter((p) => p.blockedBy.length === 0);
  const blocked = ranked.filter((p) => p.blockedBy.length > 0);

  const phase1 = ready.slice(0, 4).map((p) => p.layer);
  const phase1Ids = new Set(phase1.map((l) => l.id));
  const phase2 = [...ready.slice(4), ...blocked]
    .filter((p) => !phase1Ids.has(p.layer.id))
    .slice(0, 6)
    .map((p) => p.layer);
  const takenIds = new Set([...phase1Ids, ...phase2.map((l) => l.id)]);
  const phase3 = ranked.filter((p) => !takenIds.has(p.layer.id)).map((p) => p.layer);

  return [
    {
      name: "Phase one — Foundations",
      horizon: "Next 90 days",
      intent:
        "Unblock everything else. These layers are ready to move now and the most work is waiting on them.",
      layers: phase1,
    },
    {
      name: "Phase two — Definition",
      horizon: "3–9 months",
      intent:
        "With the foundations settled, define the system and begin expressing it.",
      layers: phase2,
    },
    {
      name: "Phase three — Governance",
      horizon: "9–24 months",
      intent:
        "Move the remaining layers from in-use to governed: owners, cadence, measurement.",
      layers: phase3,
    },
  ].filter((p) => p.layers.length > 0);
}
