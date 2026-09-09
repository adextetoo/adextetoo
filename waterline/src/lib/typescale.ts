/**
 * Modular type scale.
 *
 * A scale is a set of decisions made once so that a hundred authors do not each
 * make them badly. Line height tightens as size increases, and tracking opens
 * up at small sizes and closes at display sizes — the two adjustments that
 * separate a usable scale from a list of font sizes.
 */

export const RATIOS: { name: string; value: number; note: string }[] = [
  { name: "Minor second", value: 1.067, note: "Very tight. Dense reference material." },
  { name: "Major second", value: 1.125, note: "Restrained. Long-form institutional text." },
  { name: "Minor third", value: 1.2, note: "Workhorse. Safe for interfaces and documents." },
  { name: "Major third", value: 1.25, note: "Clear hierarchy without drama." },
  { name: "Perfect fourth", value: 1.333, note: "Editorial. Strong headline presence." },
  { name: "Augmented fourth", value: 1.414, note: "Dramatic. Needs disciplined spacing." },
  { name: "Perfect fifth", value: 1.5, note: "Poster scale. Few steps before it runs away." },
  { name: "Golden ratio", value: 1.618, note: "Display only. Unusable for body copy." },
];

export interface ScaleStep {
  step: number;
  px: number;
  rem: number;
  lineHeight: number;
  tracking: number;
}

/** Line height is a function of size: big type needs proportionally less. */
export function lineHeightFor(px: number): number {
  if (px >= 48) return 1.05;
  if (px >= 32) return 1.15;
  if (px >= 24) return 1.25;
  if (px >= 18) return 1.45;
  return 1.6;
}

/** Optical tracking compensation, in em. */
export function trackingFor(px: number): number {
  if (px >= 48) return -0.022;
  if (px >= 32) return -0.016;
  if (px >= 24) return -0.01;
  if (px >= 16) return 0;
  return 0.01;
}

export function buildScale(base: number, ratio: number, steps: number[]): ScaleStep[] {
  return steps.map((step) => {
    const px = base * ratio ** step;
    const rounded = Math.round(px * 100) / 100;
    return {
      step,
      px: rounded,
      rem: Math.round((rounded / 16) * 1000) / 1000,
      lineHeight: lineHeightFor(rounded),
      tracking: trackingFor(rounded),
    };
  });
}

export const DEFAULT_STEPS = [-2, -1, 0, 1, 2, 3, 4, 5, 6];

export const ROLE_FOR_STEP: Record<number, string> = {
  [-2]: "Caption, legal, table data",
  [-1]: "Secondary text, metadata",
  [0]: "Body copy",
  [1]: "Lead paragraph, large body",
  [2]: "Heading 4 / card titles",
  [3]: "Heading 3 / section titles",
  [4]: "Heading 2 / page titles",
  [5]: "Heading 1",
  [6]: "Display / campaign",
};

/**
 * Institutional font stacks. Every one of these renders without a licensed
 * download, which matters because most documents an institution produces are
 * made outside the design team.
 */
export const FAMILY_PRESETS: { name: string; stack: string; character: string }[] = [
  {
    name: "Institutional serif",
    stack: "var(--font-serif)",
    character: "Authority, permanence, long-form reading.",
  },
  {
    name: "Contemporary grotesque",
    stack: "var(--font-sans)",
    character: "Neutral, precise, interface-first.",
  },
  {
    name: "System stack",
    stack:
      "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    character: "Zero licensing risk. Renders everywhere, on every device.",
  },
  {
    name: "Monospace",
    stack: "var(--font-mono)",
    character: "Data, tokens, reference numbers, code.",
  },
];
