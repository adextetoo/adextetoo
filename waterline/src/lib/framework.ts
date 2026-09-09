import { DEEP_LAYERS } from "./framework.deep";
import { SURFACE_LAYERS } from "./framework.surface";
import type { Layer, Tier } from "./types";

export { DEEP_LAYERS, SURFACE_LAYERS };

/** All nineteen layers, deep first. */
export const LAYERS: Layer[] = [...DEEP_LAYERS, ...SURFACE_LAYERS];

export const LAYER_BY_ID: Record<string, Layer> = Object.fromEntries(
  LAYERS.map((l) => [l.id, l]),
);

export function layersInTier(tier: Tier): Layer[] {
  return LAYERS.filter((l) => l.tier === tier).sort((a, b) => a.order - b.order);
}

/**
 * The tier weights encode the product's central claim: the strategy below the
 * waterline is roughly four fifths of the brand. They are used for the
 * composite score and nowhere else — each tier is always also reported on its
 * own, so the split never hides a weak surface behind a strong foundation.
 */
export const TIER_WEIGHT: Record<Tier, number> = { deep: 0.8, surface: 0.2 };

export const TIER_META: Record<
  Tier,
  { label: string; sub: string; blurb: string }
> = {
  deep: {
    label: "Below the waterline",
    sub: "Strategy · 80%",
    blurb:
      "The twelve layers nobody sees and everything rests on. This is where a brand is actually decided.",
    },
  surface: {
    label: "Above the waterline",
    sub: "Identity · 20%",
    blurb:
      "The seven layers people mean when they say 'brand'. They are the output of the work below, not a substitute for it.",
  },
};
