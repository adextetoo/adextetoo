"use client";

import { useMemo, useRef, useState } from "react";
import type { HealthPoint, Maturity } from "@/lib/types";

/** The five ordinal maturity steps, as CSS variables so they follow the theme. */
export const MATURITY_COLOUR: Record<Maturity, string> = {
  0: "var(--viz-m0)",
  1: "var(--viz-m1)",
  2: "var(--viz-m2)",
  3: "var(--viz-m3)",
  4: "var(--viz-m4)",
};

/* ================================================================== */
/* Trend — two series over time, and the gap between them             */
/* ================================================================== */

/**
 * The gap between the two lines is the actual subject of this chart, so it is
 * drawn as a filled band rather than left for the reader to measure by eye.
 * Two series only — composite is deliberately omitted, because a third line
 * derived from the other two adds ink without adding information.
 */
export function TrendChart({ history }: { history: HealthPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 720;
  const H = 260;
  const pad = { top: 18, right: 58, bottom: 30, left: 34 };

  const pts = useMemo(() => {
    if (history.length === 0) return [];
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const step = history.length === 1 ? 0 : innerW / (history.length - 1);
    return history.map((h, i) => ({
      ...h,
      x: pad.left + step * i,
      yDeep: pad.top + innerH * (1 - h.deep / 100),
      ySurface: pad.top + innerH * (1 - h.surface / 100),
    }));
  }, [history, pad.left, pad.right, pad.top, pad.bottom]);

  if (history.length < 2) {
    return (
      <div className="panel-quiet grid place-items-center px-6 py-12 text-center">
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Brand health needs at least two readings before it can show a direction.
          Take a snapshot now, and another after the next review, to start the series.
        </p>
      </div>
    );
  }

  const line = (key: "yDeep" | "ySurface") =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p[key]}`).join(" ");

  const band = `${pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.yDeep}`).join(" ")} ${[...pts]
    .reverse()
    .map((p) => `L${p.x} ${p.ySurface}`)
    .join(" ")} Z`;

  const last = pts[pts.length - 1];
  const active = hover === null ? null : pts[hover];

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    pts.forEach((p, i) => {
      const dist = Math.abs(p.x - x);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    setHover(nearest);
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <Legend
          items={[
            { label: "Strategy (below)", colour: "var(--viz-deep)" },
            { label: "Identity (above)", colour: "var(--viz-surface)" },
          ]}
        />
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="text-[12px] text-faint underline underline-offset-2 transition hover:text-ink"
        >
          {showTable ? "Show chart" : "Show as table"}
        </button>
      </div>

      {showTable ? (
        <HistoryTable history={history} />
      ) : (
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            onMouseMove={onMove}
            onMouseLeave={() => setHover(null)}
            role="img"
            aria-label="Brand health over time, comparing strategy maturity below the waterline with identity maturity above it."
          >
            {/* Recessive grid */}
            {[0, 25, 50, 75, 100].map((v) => {
              const y = pad.top + (H - pad.top - pad.bottom) * (1 - v / 100);
              return (
                <g key={v}>
                  <line x1={pad.left} x2={W - pad.right} y1={y} y2={y} stroke="var(--viz-grid)" strokeWidth="1" />
                  <text x={pad.left - 8} y={y + 3.5} textAnchor="end" className="tnum" fontSize="10" fill="var(--ink-faint)">
                    {v}
                  </text>
                </g>
              );
            })}

            {/* The gap is the story */}
            <path d={band} fill="var(--viz-gap)" />

            <path d={line("yDeep")} fill="none" stroke="var(--viz-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d={line("ySurface")} fill="none" stroke="var(--viz-surface)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Direct end labels — two series, so both get named on the plot */}
            <text x={last.x + 8} y={last.ySurface + 3.5} fontSize="11" fontWeight="600" fill="var(--viz-surface)" className="tnum">
              {last.surface}
            </text>
            <text x={last.x + 8} y={last.yDeep + 3.5} fontSize="11" fontWeight="600" fill="var(--viz-deep)" className="tnum">
              {last.deep}
            </text>

            {/* Crosshair */}
            {active ? (
              <g>
                <line x1={active.x} x2={active.x} y1={pad.top} y2={H - pad.bottom} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={active.x} cy={active.yDeep} r="4.5" fill="var(--viz-deep)" stroke="var(--panel)" strokeWidth="2" />
                <circle cx={active.x} cy={active.ySurface} r="4.5" fill="var(--viz-surface)" stroke="var(--panel)" strokeWidth="2" />
              </g>
            ) : null}

            {/* X labels — first, last, and the hovered point */}
            {pts.map((p, i) => {
              const show = i === 0 || i === pts.length - 1 || hover === i;
              if (!show) return null;
              return (
                <text
                  key={p.date}
                  x={p.x}
                  y={H - 10}
                  textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"}
                  fontSize="10"
                  fill="var(--ink-faint)"
                >
                  {shortDate(p.date)}
                </text>
              );
            })}
          </svg>

          {active ? (
            <div
              className="pointer-events-none absolute top-2 z-10 w-52 rounded-lg border border-line bg-elev p-3 shadow-[var(--shadow-lg)]"
              style={{
                left: `${(active.x / W) * 100}%`,
                transform:
                  active.x > W * 0.6 ? "translateX(calc(-100% - 14px))" : "translateX(14px)",
              }}
            >
              <p className="text-[11px] font-semibold text-ink">{longDate(active.date)}</p>
              {active.label ? <p className="mt-0.5 text-[11px] text-faint">{active.label}</p> : null}
              <dl className="mt-2 space-y-1">
                <TooltipRow colour="var(--viz-deep)" label="Strategy" value={active.deep} />
                <TooltipRow colour="var(--viz-surface)" label="Identity" value={active.surface} />
                <div className="mt-1.5 border-t border-line pt-1.5">
                  <TooltipRow
                    colour="transparent"
                    label="Gap"
                    value={active.surface - active.deep}
                    signed
                  />
                </div>
              </dl>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function TooltipRow({
  colour,
  label,
  value,
  signed,
}: {
  colour: string;
  label: string;
  value: number;
  signed?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="flex items-center gap-1.5 text-[11px] text-muted">
        <span className="h-2 w-2 rounded-full" style={{ background: colour }} aria-hidden />
        {label}
      </dt>
      <dd className="tnum text-[11px] font-semibold text-ink">
        {signed && value > 0 ? "+" : ""}
        {value}
      </dd>
    </div>
  );
}

function HistoryTable({ history }: { history: HealthPoint[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
            <th className="py-2 pr-4 font-semibold">Date</th>
            <th className="py-2 pr-4 font-semibold">Milestone</th>
            <th className="py-2 pr-4 text-right font-semibold">Strategy</th>
            <th className="py-2 pr-4 text-right font-semibold">Identity</th>
            <th className="py-2 text-right font-semibold">Gap</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.date} className="border-b border-line/60">
              <td className="py-2 pr-4 tnum text-muted">{longDate(h.date)}</td>
              <td className="py-2 pr-4 text-muted">{h.label ?? "—"}</td>
              <td className="py-2 pr-4 text-right tnum">{h.deep}</td>
              <td className="py-2 pr-4 text-right tnum">{h.surface}</td>
              <td className="py-2 text-right tnum font-semibold">
                {h.surface - h.deep > 0 ? "+" : ""}
                {h.surface - h.deep}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================================================================== */
/* Legend                                                             */
/* ================================================================== */

export function Legend({ items }: { items: { label: string; colour: string }[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-1.5 text-[11.5px] text-muted">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: i.colour }} aria-hidden />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

/* ================================================================== */
/* Maturity matrix — a heatmap over the nineteen layers               */
/* ================================================================== */

export function MaturityMatrix({
  cells,
  onSelect,
}: {
  cells: { id: string; name: string; tier: "deep" | "surface"; maturity: Maturity; label: string }[];
  onSelect?: (id: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const deep = cells.filter((c) => c.tier === "deep");
  const surface = cells.filter((c) => c.tier === "surface");

  return (
    <div className="space-y-5">
      <MatrixRow
        title="Above the waterline"
        sub="Identity · 7 layers"
        colour="var(--viz-surface)"
        cells={surface}
        hover={hover}
        setHover={setHover}
        onSelect={onSelect}
      />
      <MatrixRow
        title="Below the waterline"
        sub="Strategy · 12 layers"
        colour="var(--viz-deep)"
        cells={deep}
        hover={hover}
        setHover={setHover}
        onSelect={onSelect}
      />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3">
        <span className="eyebrow">Maturity</span>
        {([0, 1, 2, 3, 4] as Maturity[]).map((m) => (
          <span key={m} className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <span
              className="h-3 w-3 rounded-sm"
              style={{ background: MATURITY_COLOUR[m] }}
              aria-hidden
            />
            {["Absent", "Ad hoc", "Documented", "Operationalised", "Governed"][m]}
          </span>
        ))}
      </div>
    </div>
  );
}

function MatrixRow({
  title,
  sub,
  colour,
  cells,
  hover,
  setHover,
  onSelect,
}: {
  title: string;
  sub: string;
  colour: string;
  cells: { id: string; name: string; maturity: Maturity; label: string }[];
  hover: string | null;
  setHover: (id: string | null) => void;
  onSelect?: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: colour }} aria-hidden />
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <span className="text-[11.5px] text-faint">{sub}</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
        {cells.map((c) => {
          const isHover = hover === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect?.(c.id)}
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(c.id)}
              onBlur={() => setHover(null)}
              title={`${c.name} — ${c.label}`}
              className={`relative overflow-hidden rounded-lg border p-2.5 text-left transition ${
                isHover ? "border-signal" : "border-line"
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1"
                style={{ background: MATURITY_COLOUR[c.maturity] }}
              />
              <span className="block truncate text-[12.5px] font-medium text-ink">{c.name}</span>
              <span className="mt-0.5 block text-[11px] text-faint">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Helpers                                                            */
/* ================================================================== */

function shortDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
}

function longDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
