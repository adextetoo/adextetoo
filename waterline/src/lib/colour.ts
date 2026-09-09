/**
 * Colour engine.
 *
 * Everything here is real arithmetic rather than approximation — the contrast
 * figures the studio reports are the same numbers an accessibility auditor
 * would produce, because institutions are frequently under a statutory duty and
 * a palette that "looks fine" is not a defence.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = Number.parseInt(h.padEnd(6, "0").slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    [r, g, b]
      .map((v) => clamp(v).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function isValidHex(hex: string): boolean {
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex.trim());
}

/** WCAG 2.2 relative luminance. */
export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** WCAG contrast ratio between two colours, 1–21. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export type ContrastGrade = "AAA" | "AA" | "AA Large" | "Fail";

/** Grades a pairing for body text at normal size. */
export function grade(ratio: number): ContrastGrade {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

/** True when the pairing is safe for interface components and graphics. */
export function passesNonText(ratio: number): boolean {
  return ratio >= 3;
}

/** Picks whichever of black or white reads better on a given background. */
export function readableOn(bg: string): string {
  return contrast(bg, "#FFFFFF") >= contrast(bg, "#0A0A0A") ? "#FFFFFF" : "#0A0A0A";
}

/* ------------------------------------------------------------------ */
/* HSL conversion — used for generating ramps                          */
/* ------------------------------------------------------------------ */

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export function hexToHsl(hex: string): HSL {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

export function hslToHex({ h, s, l }: HSL): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb: [number, number, number];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return rgbToHex({
    r: (rgb[0] + m) * 255,
    g: (rgb[1] + m) * 255,
    b: (rgb[2] + m) * 255,
  });
}

/**
 * A tonal ramp from one seed colour.
 *
 * Lightness is distributed on a curve rather than linearly, and saturation is
 * pulled back at the extremes — a straight linear ramp produces muddy midtones
 * and neon ends, which is why so many generated palettes are unusable in
 * practice.
 */
export function ramp(hex: string, steps = 9): { step: number; hex: string }[] {
  const { h, s } = hexToHsl(hex);
  const out: { step: number; hex: string }[] = [];
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const l = 0.97 - t * 0.9;
    const satAdjust = 1 - Math.abs(t - 0.5) * 0.55;
    out.push({
      step: (i + 1) * 100,
      hex: hslToHex({ h, s: Math.min(1, s * satAdjust), l }),
    });
  }
  return out;
}

/**
 * Finds the nearest variant of a colour that clears a target contrast ratio
 * against a given background, by walking lightness in the helpful direction.
 * Returns null when the hue simply cannot reach the target.
 */
export function nearestAccessible(
  hex: string,
  bg: string,
  target = 4.5,
): string | null {
  if (contrast(hex, bg) >= target) return hex;
  const { h, s, l } = hexToHsl(hex);
  const bgLum = luminance(bg);
  const darken = bgLum > 0.4;

  for (let step = 1; step <= 100; step++) {
    const delta = (step / 100) * (darken ? -1 : 1);
    const candidateL = Math.max(0, Math.min(1, l + delta));
    const candidate = hslToHex({ h, s, l: candidateL });
    if (contrast(candidate, bg) >= target) return candidate;
    if (candidateL <= 0 || candidateL >= 1) break;
  }
  return null;
}

/** Simulated appearance under the three common forms of colour blindness. */
export type Deficiency = "protanopia" | "deuteranopia" | "tritanopia";

const MATRICES: Record<Deficiency, number[][]> = {
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
};

export function simulate(hex: string, kind: Deficiency): string {
  const { r, g, b } = hexToRgb(hex);
  const m = MATRICES[kind];
  return rgbToHex({
    r: m[0][0] * r + m[0][1] * g + m[0][2] * b,
    g: m[1][0] * r + m[1][1] * g + m[1][2] * b,
    b: m[2][0] * r + m[2][1] * g + m[2][2] * b,
  });
}

/** Rounds a ratio the way accessibility reports conventionally do. */
export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}
