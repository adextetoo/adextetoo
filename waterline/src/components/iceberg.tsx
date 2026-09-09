"use client";

import { useId } from "react";

/**
 * The iceberg.
 *
 * This is the product's central figure, and it is a real chart rather than an
 * illustration: the tip fills to the identity score and the submerged mass
 * fills to the strategy score, so the picture is literally the data. An
 * institution that has polished its logo and skipped its positioning sees a
 * bright tip above a hollow outline, which is the entire argument in one image.
 */

const TIP =
  "M300 210 L356 96 L386 133 L430 56 L470 141 L506 119 L546 210 Z";

const MASS =
  "M246 210 L263 300 L232 381 L269 470 L331 560 L421 611 L521 586 L601 506 L641 401 L623 300 L601 210 Z";

const TIP_TOP = 56;
const MASS_BOTTOM = 611;
const WATERLINE = 210;

export interface IcebergProps {
  /** Strategy score, 0–100. Fills the submerged mass. */
  deep: number;
  /** Identity score, 0–100. Fills the tip. */
  surface: number;
  /** Dims everything except one tier — used when a section is talking about it. */
  highlight?: "deep" | "surface" | null;
  className?: string;
  /** Turns off the wave animation for dense views. */
  still?: boolean;
}

export function Iceberg({
  deep,
  surface,
  highlight = null,
  className = "",
  still = false,
}: IcebergProps) {
  const uid = useId().replace(/:/g, "");
  const tipClip = `tip-${uid}`;
  const massClip = `mass-${uid}`;
  const tipGrad = `tipg-${uid}`;
  const massGrad = `massg-${uid}`;
  const waterGrad = `waterg-${uid}`;
  const edgeFade = `edgef-${uid}`;
  const edgeMask = `edgem-${uid}`;

  const d = clamp(deep);
  const s = clamp(surface);

  const tipHeight = WATERLINE - TIP_TOP;
  const massHeight = MASS_BOTTOM - WATERLINE;

  const tipFillH = (tipHeight * s) / 100;
  const massFillH = (massHeight * d) / 100;

  const deepDim = highlight === "surface" ? 0.28 : 1;
  const surfaceDim = highlight === "deep" ? 0.28 : 1;

  return (
    <svg
      viewBox="160 18 580 640"
      className={`w-full ${className}`}
      role="img"
      aria-label={`Brand iceberg. Strategy below the waterline is at ${Math.round(
        d,
      )} out of 100. Identity above the waterline is at ${Math.round(s)} out of 100.`}
    >
      <defs>
        <clipPath id={tipClip}>
          <path d={TIP} />
        </clipPath>
        <clipPath id={massClip}>
          <path d={MASS} />
        </clipPath>

        <linearGradient id={tipGrad} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--viz-surface)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--viz-surface)" stopOpacity="0.55" />
        </linearGradient>

        <linearGradient id={massGrad} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--viz-deep)" stopOpacity="0.42" />
          <stop offset="100%" stopColor="var(--viz-deep)" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id={waterGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--viz-deep)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--viz-deep)" stopOpacity="0" />
        </linearGradient>

        {/* Without this the water tint terminates on the viewBox edge and reads
            as a rectangle sitting on the page rather than as open sea. */}
        <linearGradient
          id={edgeFade}
          gradientUnits="userSpaceOnUse"
          x1="160"
          y1="0"
          x2="740"
          y2="0"
        >
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="16%" stopColor="#fff" stopOpacity="1" />
          <stop offset="84%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <mask id={edgeMask}>
          <rect x="0" y="0" width="900" height="700" fill={`url(#${edgeFade})`} />
        </mask>
      </defs>

      {/* Water body */}
      <g mask={`url(#${edgeMask})`}>
        <rect
          x="0"
          y={WATERLINE}
          width="900"
          height={700 - WATERLINE}
          fill={`url(#${waterGrad})`}
        />
      </g>

      {/* ---------------- Submerged mass — the eighty per cent ---------------- */}
      <g opacity={deepDim} style={{ transition: "opacity .4s ease" }}>
        <path
          d={MASS}
          fill="var(--viz-deep)"
          fillOpacity="0.06"
          stroke="var(--viz-deep)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <g clipPath={`url(#${massClip})`}>
          <rect
            x="0"
            width="900"
            y={MASS_BOTTOM - massFillH}
            height={massFillH}
            fill={`url(#${massGrad})`}
            style={{ transition: "y .9s cubic-bezier(.22,1,.36,1), height .9s cubic-bezier(.22,1,.36,1)" }}
          />
          {/* Strata — reads as ice structure and as depth gridlines at once */}
          {[260, 320, 380, 440, 500, 560].map((y) => (
            <line
              key={y}
              x1="200"
              x2="700"
              y1={y}
              y2={y}
              stroke="var(--bg)"
              strokeOpacity="0.16"
              strokeWidth="2"
            />
          ))}
        </g>
        <path d={MASS} fill="none" stroke="var(--viz-deep)" strokeOpacity="0.85" strokeWidth="2" />
      </g>

      {/* ---------------- Tip — the twenty per cent ---------------- */}
      <g opacity={surfaceDim} style={{ transition: "opacity .4s ease" }}>
        <path
          d={TIP}
          fill="var(--viz-surface)"
          fillOpacity="0.05"
          stroke="var(--viz-surface)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <g clipPath={`url(#${tipClip})`}>
          <rect
            x="0"
            width="900"
            y={WATERLINE - tipFillH}
            height={tipFillH}
            fill={`url(#${tipGrad})`}
            style={{ transition: "y .9s cubic-bezier(.22,1,.36,1), height .9s cubic-bezier(.22,1,.36,1)" }}
          />
        </g>
        <path d={TIP} fill="none" stroke="var(--viz-surface)" strokeOpacity="0.9" strokeWidth="2" />
      </g>

      {/* ---------------- The waterline itself ---------------- */}
      <g mask={`url(#${edgeMask})`}>
        <path
          d={wave(WATERLINE)}
          fill="none"
          stroke="var(--ice)"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          {!still && (
            <animate
              attributeName="d"
              dur="9s"
              repeatCount="indefinite"
              values={`${wave(WATERLINE)};${wave(WATERLINE, true)};${wave(WATERLINE)}`}
            />
          )}
        </path>
        <line
          x1="0"
          x2="900"
          y1={WATERLINE}
          y2={WATERLINE}
          stroke="var(--ice)"
          strokeOpacity="0.16"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </g>
    </svg>
  );
}

function clamp(n: number) {
  return Math.max(0, Math.min(100, Number.isFinite(n) ? n : 0));
}

/** A gentle sine-ish waterline. The `shift` variant is the animation's midpoint. */
function wave(y: number, shift = false): string {
  const a = shift ? 9 : 6;
  const o = shift ? 40 : 0;
  const pts: string[] = [`M0 ${y}`];
  for (let x = 0; x <= 900; x += 60) {
    const cy = y + Math.sin((x + o) / 70) * a;
    pts.push(`L${x} ${cy.toFixed(1)}`);
  }
  return pts.join(" ");
}

/* ------------------------------------------------------------------ */
/* Labelled arrangement                                                */
/* ------------------------------------------------------------------ */

/**
 * The iceberg with its nineteen layers listed around it. Labels are HTML rather
 * than SVG text so they stay readable at phone widths, where they reflow beneath
 * the figure instead of shrinking into illegibility.
 */
export function IcebergDiagram({
  deep,
  surface,
  surfaceLayers,
  deepLayers,
  onHoverTier,
  highlight,
}: {
  deep: number;
  surface: number;
  surfaceLayers: { id: string; name: string }[];
  deepLayers: { id: string; name: string }[];
  onHoverTier?: (t: "deep" | "surface" | null) => void;
  highlight?: "deep" | "surface" | null;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,1.15fr)] lg:items-center">
      <div className="relative order-2 lg:order-1">
        <Iceberg deep={deep} surface={surface} highlight={highlight ?? null} />
      </div>

      <div className="order-1 space-y-6 lg:order-2">
        <TierList
          tone="surface"
          eyebrow="Above the waterline · 20%"
          title="Identity"
          score={surface}
          layers={surfaceLayers}
          onEnter={() => onHoverTier?.("surface")}
          onLeave={() => onHoverTier?.(null)}
        />
        <div className="hairline" />
        <TierList
          tone="deep"
          eyebrow="Below the waterline · 80%"
          title="Strategy"
          score={deep}
          layers={deepLayers}
          onEnter={() => onHoverTier?.("deep")}
          onLeave={() => onHoverTier?.(null)}
        />
      </div>
    </div>
  );
}

function TierList({
  tone,
  eyebrow,
  title,
  score,
  layers,
  onEnter,
  onLeave,
}: {
  tone: "deep" | "surface";
  eyebrow: string;
  title: string;
  score: number;
  layers: { id: string; name: string }[];
  onEnter: () => void;
  onLeave: () => void;
}) {
  const colour = tone === "deep" ? "var(--viz-deep)" : "var(--viz-surface)";
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} onFocus={onEnter} onBlur={onLeave}>
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow" style={{ color: colour }}>
            {eyebrow}
          </p>
          <h3 className="serif mt-0.5 text-xl">{title}</h3>
        </div>
        <p className="tnum text-2xl font-semibold" style={{ color: colour }}>
          {Math.round(score)}
          <span className="ml-0.5 text-xs font-normal text-faint">/100</span>
        </p>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
        {layers.map((l) => (
          <li
            key={l.id}
            className="rounded-md border px-2 py-1 text-[12.5px] text-muted"
            style={{ borderColor: `color-mix(in srgb, ${colour} 32%, transparent)` }}
          >
            {l.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
