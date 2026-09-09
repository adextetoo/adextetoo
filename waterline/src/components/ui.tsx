"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-signal text-signal-ink hover:bg-signal-hover border border-transparent font-medium",
  secondary:
    "bg-panel-2 text-ink border border-line-strong hover:border-signal hover:text-signal",
  ghost: "text-muted hover:text-ink border border-transparent hover:bg-panel-2",
  danger:
    "bg-transparent text-danger border border-danger/40 hover:bg-danger/10",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-lg gap-2",
  lg: "h-12 px-6 text-[15px] rounded-xl gap-2",
};

const BASE =
  "inline-flex items-center justify-center whitespace-nowrap transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none select-none";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Surfaces                                                            */
/* ------------------------------------------------------------------ */

export function Card({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <As className={`panel p-5 ${className}`}>{children}</As>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="display text-[clamp(1.6rem,3vw,2.3rem)]">{title}</h2>
        {lede ? <p className="mt-2 text-[15px] leading-relaxed text-muted">{lede}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Badges                                                              */
/* ------------------------------------------------------------------ */

export type Tone = "neutral" | "signal" | "good" | "warn" | "danger" | "deep" | "surface";

const TONES: Record<Tone, string> = {
  neutral: "border-line-strong text-muted",
  signal: "border-signal/45 text-signal bg-signal/10",
  good: "border-good/45 text-good bg-good/10",
  warn: "border-warn/45 text-warn bg-warn/10",
  danger: "border-danger/45 text-danger bg-danger/10",
  deep: "border-viz-deep/50 text-viz-deep bg-viz-deep/10",
  surface: "border-viz-surface/50 text-viz-surface bg-viz-surface/10",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
  icon,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${TONES[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Meter — a single ratio against a limit                              */
/* ------------------------------------------------------------------ */

export function Meter({
  value,
  max = 100,
  colour = "var(--viz-deep)",
  height = 6,
  label,
  className = "",
}: {
  value: number;
  max?: number;
  colour?: string;
  height?: number;
  label?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-panel-3 ${className}`}
      style={{ height }}
      role="meter"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%`, background: colour }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat tile — a single value, never a one-bar bar chart               */
/* ------------------------------------------------------------------ */

export function Stat({
  label,
  value,
  unit,
  note,
  tone,
  className = "",
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  note?: ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <div className={`panel p-4 ${className}`}>
      <p className="eyebrow">{label}</p>
      <p className="mt-2 flex items-baseline gap-1">
        <span
          className="tnum text-[30px] font-semibold leading-none"
          style={tone ? { color: tone } : undefined}
        >
          {value}
        </span>
        {unit ? <span className="text-xs text-faint">{unit}</span> : null}
      </p>
      {note ? <p className="mt-2 text-[12.5px] leading-snug text-faint">{note}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form fields                                                         */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  hint,
  children,
  required,
  className = "",
}: {
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-ink">
        {label}
        {required ? <span className="text-danger">*</span> : null}
      </span>
      {hint ? <span className="mb-2 block text-[12.5px] leading-snug text-faint">{hint}</span> : null}
      {children}
    </label>
  );
}

const INPUT =
  "w-full rounded-lg border border-line bg-elev px-3 py-2.5 text-sm text-ink placeholder:text-faint transition focus:border-signal focus:outline-none";

export function Input(props: ComponentProps<"input">) {
  const { className = "", ...rest } = props;
  return <input className={`${INPUT} ${className}`} {...rest} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  const { className = "", ...rest } = props;
  return <textarea className={`${INPUT} min-h-28 resize-y leading-relaxed ${className}`} {...rest} />;
}

export function Select(props: ComponentProps<"select">) {
  const { className = "", children, ...rest } = props;
  return (
    <select className={`${INPUT} cursor-pointer ${className}`} {...rest}>
      {children}
    </select>
  );
}

/* ------------------------------------------------------------------ */
/* Choice cards — used throughout onboarding and the diagnostic        */
/* ------------------------------------------------------------------ */

export function ChoiceCard({
  selected,
  onSelect,
  title,
  description,
  meta,
  className = "",
}: {
  selected: boolean;
  onSelect: () => void;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative w-full rounded-xl border p-4 text-left transition-all duration-150 ${
        selected
          ? "border-signal bg-signal/8 shadow-[0_0_0_1px_var(--signal)]"
          : "border-line bg-panel hover:border-line-strong hover:bg-panel-2"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`text-sm font-semibold ${selected ? "text-signal" : "text-ink"}`}>
          {title}
        </span>
        <span
          aria-hidden
          className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition ${
            selected ? "border-signal bg-signal" : "border-line-strong"
          }`}
        >
          {selected ? (
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="var(--signal-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.3 4.8 8.6 9.5 3.9" />
            </svg>
          ) : null}
        </span>
      </div>
      {description ? (
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{description}</p>
      ) : null}
      {meta ? <p className="mt-2 text-[11.5px] text-faint">{meta}</p> : null}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="panel-quiet grid place-items-center px-6 py-14 text-center">
      <div className="max-w-md">
        <h3 className="serif text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icons — a small, consistent set, stroked to match the type weight   */
/* ------------------------------------------------------------------ */

export function Icon({
  path,
  size = 16,
  className = "",
}: {
  path: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={path} />
    </svg>
  );
}

export const ICONS = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 18l-6-6 6-6",
  check: "M20 6 9 17l-5-5",
  alert: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  layers: "m12 2 9 5-9 5-9-5 9-5ZM3 17l9 5 9-5M3 12l9 5 9-5",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4.2-14.2-2.5 5.7-5.7 2.5 2.5-5.7 5.7-2.5Z",
  palette: "M12 21a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.21-1.79 4-4 4h-1.5a1.5 1.5 0 0 0-1.06 2.56A1.5 1.5 0 0 1 12 21Z",
  type: "M4 6V4h16v2M9 20h6M12 4v16",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  pulse: "M22 12h-4l-3 9L9 3l-3 9H2",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  plus: "M12 5v14M5 12h14",
  x: "M18 6 6 18M6 6l12 12",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2ZM7 11V7a5 5 0 0 1 10 0v4",
  external: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3",
} as const;
