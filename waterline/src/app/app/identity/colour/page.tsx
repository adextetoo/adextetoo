"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Tabs } from "@/components/tabs";
import { LayerWorkspace } from "@/components/layer-workspace";
import { Badge, Button, Card, Icon, ICONS, Input } from "@/components/ui";
import {
  contrast,
  formatRatio,
  grade,
  isValidHex,
  nearestAccessible,
  ramp,
  readableOn,
  simulate,
  type Deficiency,
} from "@/lib/colour";
import { useBrand } from "@/store/brand";
import type { ColourRole } from "@/lib/types";

export default function ColourStudioPage() {
  return (
    <div className="space-y-6">
      <header className="max-w-3xl">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint">
          <Link href="/app/identity" className="transition hover:text-ink">
            Identity
          </Link>
          <span aria-hidden>/</span>
          <span className="text-muted">Colour</span>
        </nav>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">Colour studio</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          A palette becomes a system when every colour has a role, every pairing has a
          measured contrast, and the ones that fail have a nearest passing alternative.
          Everything below is computed, not estimated.
        </p>
      </header>

      <Tabs
        tabs={[
          { id: "studio", label: "Studio", content: <Studio /> },
          {
            id: "work",
            label: "The work",
            content: <LayerWorkspace slug="colour" basePath="/app/identity" />,
          },
        ]}
      />
    </div>
  );
}

/* ================================================================== */

function Studio() {
  const palette = useBrand((s) => s.palette);
  const updateColour = useBrand((s) => s.updateColour);
  const setPalette = useBrand((s) => s.setPalette);
  const [deficiency, setDeficiency] = useState<Deficiency | "none">("none");

  const shown = (hex: string) => (deficiency === "none" ? hex : simulate(hex, deficiency));

  return (
    <div className="space-y-8">
      {/* ---------------- Roles ---------------- */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="serif text-xl">Roles</h2>
            <p className="mt-1 text-[13.5px] text-muted">
              Every colour needs a job. Colours without a job get used arbitrarily.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">Simulate</span>
            {(["none", "protanopia", "deuteranopia", "tritanopia"] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDeficiency(d)}
                aria-pressed={deficiency === d}
                className={`rounded-full border px-2.5 py-1 text-[12px] capitalize transition ${
                  deficiency === d
                    ? "border-signal bg-signal/10 text-signal"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {d === "none" ? "Normal vision" : d}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {palette.map((c) => (
            <ColourRow
              key={c.id}
              colour={c}
              shownHex={shown(c.hex)}
              onChange={(patch) => updateColour(c.id, patch)}
              onRemove={
                palette.length > 2
                  ? () => setPalette(palette.filter((x) => x.id !== c.id))
                  : undefined
              }
            />
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="mt-3"
          onClick={() =>
            setPalette([
              ...palette,
              {
                id: `c_${Math.random().toString(36).slice(2, 8)}`,
                name: "New role",
                hex: "#607D8B",
                usage: "Describe what this colour is for.",
              },
            ])
          }
        >
          <Icon path={ICONS.plus} size={14} />
          Add a role
        </Button>
      </section>

      {/* ---------------- Contrast matrix ---------------- */}
      <section>
        <h2 className="serif text-xl">Contrast matrix</h2>
        <p className="mt-1 max-w-2xl text-[13.5px] text-muted">
          Every pairing, measured to WCAG 2.2. Read the row as foreground and the column
          as background. Public institutions are frequently under a statutory duty here,
          and it is far cheaper to satisfy at palette definition than after two hundred
          pages have been built.
        </p>
        <div className="mt-4 overflow-x-auto">
          <ContrastMatrix palette={palette} />
        </div>
        <Legend />
      </section>

      {/* ---------------- Failures and fixes ---------------- */}
      <FailureReport palette={palette} onFix={updateColour} />

      {/* ---------------- Ramps ---------------- */}
      <section>
        <h2 className="serif text-xl">Tonal ramps</h2>
        <p className="mt-1 max-w-2xl text-[13.5px] text-muted">
          Nine steps per role, with saturation pulled back at the extremes — a straight
          linear ramp produces muddy midtones and neon ends, which is why so many
          generated palettes are unusable in practice.
        </p>
        <div className="mt-4 space-y-4">
          {palette.map((c) => (
            <div key={c.id}>
              <p className="text-[13px] font-medium text-ink">{c.name}</p>
              <div className="mt-1.5 flex overflow-hidden rounded-lg border border-line">
                {ramp(c.hex).map((s) => (
                  <div
                    key={s.step}
                    className="flex-1 px-1 py-3 text-center"
                    style={{ background: shown(s.hex) }}
                    title={`${c.name} ${s.step} — ${s.hex}`}
                  >
                    <span
                      className="mono text-[9.5px]"
                      style={{ color: readableOn(s.hex) }}
                    >
                      {s.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ColourRow({
  colour,
  shownHex,
  onChange,
  onRemove,
}: {
  colour: ColourRole;
  shownHex: string;
  onChange: (patch: Partial<ColourRole>) => void;
  onRemove?: () => void;
}) {
  const [draft, setDraft] = useState(colour.hex);
  const valid = isValidHex(draft);

  const onWhite = contrast(colour.hex, "#FFFFFF");
  const onBlack = contrast(colour.hex, "#111111");

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="flex items-start gap-3">
        <label className="relative block h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-line">
          <span className="absolute inset-0" style={{ background: shownHex }} />
          <input
            type="color"
            value={colour.hex}
            onChange={(e) => {
              setDraft(e.target.value.toUpperCase());
              onChange({ hex: e.target.value.toUpperCase() });
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={`${colour.name} colour picker`}
          />
          {colour.locked ? (
            <span
              className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded bg-black/45"
              title="Locked — fixed by charter, livery or statute"
            >
              <Icon path={ICONS.lock} size={11} className="text-white" />
            </span>
          ) : null}
        </label>

        <div className="min-w-0">
          <Input
            value={colour.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="h-8 px-2 text-[13.5px] font-semibold"
            aria-label="Colour name"
          />
          <Input
            value={draft}
            onChange={(e) => {
              const v = e.target.value.toUpperCase();
              setDraft(v);
              if (isValidHex(v)) onChange({ hex: v.startsWith("#") ? v : `#${v}` });
            }}
            className={`mono mt-1.5 h-7 w-28 px-2 text-[12px] ${valid ? "" : "border-danger"}`}
            aria-label="Hex value"
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <Input
          value={colour.usage}
          onChange={(e) => onChange({ usage: e.target.value })}
          className="text-[13px]"
          aria-label="What this colour is for"
          placeholder="What is this colour for?"
        />
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px]">
          <span className="flex items-center gap-1.5 text-muted">
            On white
            <span className="mono tnum">{formatRatio(onWhite)}</span>
            <GradePill ratio={onWhite} />
          </span>
          <span className="flex items-center gap-1.5 text-muted">
            On black
            <span className="mono tnum">{formatRatio(onBlack)}</span>
            <GradePill ratio={onBlack} />
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => onChange({ locked: !colour.locked })}
          title={colour.locked ? "Unlock" : "Lock — fixed by charter, livery or statute"}
          className={`grid h-8 w-8 place-items-center rounded-lg border transition ${
            colour.locked
              ? "border-signal text-signal"
              : "border-line text-faint hover:text-ink"
          }`}
        >
          <Icon path={ICONS.lock} size={14} />
        </button>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            title="Remove role"
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-faint transition hover:border-danger hover:text-danger"
          >
            <Icon path={ICONS.x} size={14} />
          </button>
        ) : null}
      </div>
    </Card>
  );
}

function GradePill({ ratio }: { ratio: number }) {
  const g = grade(ratio);
  const tone =
    g === "AAA" ? "good" : g === "AA" ? "good" : g === "AA Large" ? "warn" : "danger";
  return (
    <Badge tone={tone as "good" | "warn" | "danger"}>{g}</Badge>
  );
}

function ContrastMatrix({ palette }: { palette: ColourRole[] }) {
  const cells = useMemo(
    () =>
      palette.map((fg) =>
        palette.map((bg) => ({ fg, bg, ratio: contrast(fg.hex, bg.hex) })),
      ),
    [palette],
  );

  return (
    <table className="min-w-full border-separate border-spacing-0.5 text-[12px]">
      <caption className="sr-only">
        Contrast ratios between every pair of palette roles
      </caption>
      <thead>
        <tr>
          <th className="p-2 text-left font-medium text-faint">
            <span className="sr-only">Foreground</span>
            fg &darr; / bg &rarr;
          </th>
          {palette.map((c) => (
            <th key={c.id} scope="col" className="p-2 text-left font-medium">
              <span className="flex items-center gap-1.5 text-muted">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm border border-line"
                  style={{ background: c.hex }}
                  aria-hidden
                />
                <span className="truncate">{c.name}</span>
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cells.map((row, i) => (
          <tr key={palette[i].id}>
            <th scope="row" className="p-2 text-left font-medium">
              <span className="flex items-center gap-1.5 text-muted">
                <span
                  className="h-3 w-3 shrink-0 rounded-sm border border-line"
                  style={{ background: palette[i].hex }}
                  aria-hidden
                />
                <span className="truncate">{palette[i].name}</span>
              </span>
            </th>
            {row.map((cell, j) => {
              const same = i === j;
              const g = grade(cell.ratio);
              return (
                <td key={j} className="p-0">
                  <div
                    className="rounded-md p-2 text-center"
                    style={{
                      background: same ? "var(--panel-2)" : cell.bg.hex,
                      color: same ? "var(--ink-faint)" : cell.fg.hex,
                      border: "1px solid var(--line)",
                    }}
                    title={`${cell.fg.name} on ${cell.bg.name} — ${formatRatio(cell.ratio)} (${g})`}
                  >
                    {same ? (
                      <span className="text-[11px]">—</span>
                    ) : (
                      <>
                        <span className="mono tnum block text-[11.5px] font-semibold">
                          {cell.ratio.toFixed(1)}
                        </span>
                        <span className="block text-[9.5px] uppercase tracking-wide opacity-90">
                          {g === "AA Large" ? "AA-L" : g}
                        </span>
                      </>
                    )}
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Legend() {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] text-muted">
      <li>
        <strong className="text-ink">AAA</strong> — 7:1 or better
      </li>
      <li>
        <strong className="text-ink">AA</strong> — 4.5:1, safe for body text
      </li>
      <li>
        <strong className="text-ink">AA-L</strong> — 3:1, large text and interface
        components only
      </li>
      <li>
        <strong className="text-ink">Fail</strong> — decorative use only, never text
      </li>
    </ul>
  );
}

/**
 * The part that turns a checker into a tool: for every pairing an institution is
 * likely to actually use, say whether it passes and — where it does not — hand
 * back the nearest colour of the same hue that would.
 */
function FailureReport({
  palette,
  onFix,
}: {
  palette: ColourRole[];
  onFix: (id: string, patch: Partial<ColourRole>) => void;
}) {
  const backgrounds = palette.filter(
    (c) => contrast(c.hex, "#FFFFFF") < 3 || contrast(c.hex, "#111111") < 3,
  );

  const failures = palette
    .flatMap((fg) =>
      backgrounds.map((bg) => ({ fg, bg, ratio: contrast(fg.hex, bg.hex) })),
    )
    .filter((p) => p.fg.id !== p.bg.id && p.ratio < 4.5)
    .slice(0, 6);

  if (failures.length === 0) {
    return (
      <section className="rounded-xl border border-good/35 bg-good/8 p-4">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-ink">
          <span className="text-good">
            <Icon path={ICONS.check} size={16} />
          </span>
          Every likely text pairing clears AA
        </p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
          Nothing in the palette needs a workaround. Record this in the brand book so the
          next team does not re-derive it.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="serif text-xl">Pairings that need attention</h2>
      <p className="mt-1 max-w-2xl text-[13.5px] text-muted">
        Each of these falls below 4.5:1 for body text. Where a passing colour of the same
        hue exists, it is offered — accept it, or lock the original and note the
        restriction in the guidelines instead.
      </p>
      <ul className="mt-4 space-y-2.5">
        {failures.map(({ fg, bg, ratio }) => {
          const fix = nearestAccessible(fg.hex, bg.hex, 4.5);
          return (
            <li key={`${fg.id}-${bg.id}`} className="panel flex flex-wrap items-center gap-4 p-4">
              <div
                className="grid h-14 w-24 shrink-0 place-items-center rounded-lg border border-line text-[13px] font-semibold"
                style={{ background: bg.hex, color: fg.hex }}
              >
                Aa
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-semibold text-ink">
                  {fg.name} on {bg.name}
                </p>
                <p className="mono tnum mt-0.5 text-[12px] text-danger">
                  {formatRatio(ratio)} — below the 4.5:1 body-text threshold
                </p>
              </div>

              {fix ? (
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-14 w-24 place-items-center rounded-lg border border-line text-[13px] font-semibold"
                    style={{ background: bg.hex, color: fix }}
                    title={fix}
                  >
                    Aa
                  </div>
                  <div>
                    <p className="mono text-[12px] text-good">
                      {fix} · {formatRatio(contrast(fix, bg.hex))}
                    </p>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-1.5"
                      disabled={fg.locked}
                      onClick={() => onFix(fg.id, { hex: fix })}
                      title={fg.locked ? "This colour is locked" : undefined}
                    >
                      {fg.locked ? "Locked" : "Use this"}
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-[12.5px] text-muted">
                  No variant of this hue can reach 4.5:1 on that ground. Restrict the
                  pairing to large text or interface use.
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
