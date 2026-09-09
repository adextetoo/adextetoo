"use client";

import { useMemo } from "react";
import { Badge, Button, Icon, ICONS, Meter } from "@/components/ui";
import { Iceberg } from "@/components/iceberg";
import { MATURITY_COLOUR } from "@/components/charts";
import { DEEP_LAYERS, SURFACE_LAYERS, LAYERS } from "@/lib/framework";
import { buildScale, DEFAULT_STEPS, ROLE_FOR_STEP } from "@/lib/typescale";
import { contrast, formatRatio, grade, readableOn } from "@/lib/colour";
import { computeScores, maturityLabel, maturityOf } from "@/lib/scoring";
import { shortDate } from "@/lib/format";
import { useBrand } from "@/store/brand";
import type { Layer } from "@/lib/types";

/**
 * The brand book composes itself from the work rather than being typed up
 * afterwards, which is the only way guidelines stay true. Where a layer has not
 * been done, it says so plainly instead of quietly omitting it — a gap you can
 * see is worth more than a document that looks complete.
 */
export default function BrandBookPage() {
  const state = useBrand();
  const scores = computeScores(state);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const name = state.institution.name || "Your institution";
  const scale = buildScale(state.typeBase, state.typeRatio, DEFAULT_STEPS);
  const documented = LAYERS.filter((l) => maturityOf(state, l.id) >= 2).length;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="no-print mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Output</p>
          <h1 className="display mt-1 text-[clamp(1.8rem,3.4vw,2.5rem)]">Brand book</h1>
          <p className="mt-1.5 text-[13.5px] text-muted">
            Generated from current state. It cannot fall out of date, because it is not a
            copy.
          </p>
        </div>
        <Button onClick={() => window.print()}>
          <Icon path={ICONS.download} size={15} />
          Print or save as PDF
        </Button>
      </div>

      <article className="space-y-12">
        {/* ---------------- Cover ---------------- */}
        <section className="panel overflow-hidden">
          <div className="grid gap-6 p-8 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <p className="eyebrow">Brand system</p>
              <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.2rem)]">{name}</h2>
              <p className="mt-4 text-[14px] text-muted">
                Version {state.history.length || 1}.0 &middot; {shortDate(today)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="deep">Strategy {Math.round(scores.deep)}</Badge>
                <Badge tone="surface">Identity {Math.round(scores.surface)}</Badge>
                <Badge tone="neutral">{scores.posture.label}</Badge>
              </div>
            </div>
            <Iceberg deep={scores.deep} surface={scores.surface} still />
          </div>

          <div className="border-t border-line p-6">
            <p className="text-[13.5px] leading-relaxed text-muted">
              {documented} of {LAYERS.length} layers are documented or better. Sections
              below that threshold are marked as outstanding rather than omitted — a gap
              you can see is worth more than a document that looks finished.
            </p>
          </div>
        </section>

        {/* ---------------- Contents ---------------- */}
        <section>
          <h2 className="serif text-2xl">Contents</h2>
          <ol className="mt-4 space-y-1.5 text-[14px]">
            {[
              ["One", "The strategy — twelve layers below the waterline"],
              ["Two", "The identity — seven layers above it"],
              ["Three", "Colour"],
              ["Four", "Typography"],
              ["Five", "Architecture and governance"],
              ["Six", "The assessment record"],
            ].map(([n, t]) => (
              <li key={n} className="flex gap-3 border-b border-line/60 pb-1.5">
                <span className="mono w-12 shrink-0 text-faint">{n}</span>
                <span className="text-muted">{t}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- Part one ---------------- */}
        <Part
          number="One"
          title="The strategy"
          lede="The twelve layers below the waterline. Roughly four fifths of the brand, and the part that decides whether anything above it means something."
        >
          {DEEP_LAYERS.map((l) => (
            <LayerEntry key={l.id} layer={l} />
          ))}
        </Part>

        {/* ---------------- Part two ---------------- */}
        <Part
          number="Two"
          title="The identity"
          lede="The seven visible layers. Each is an answer to a question posed below the waterline, not an independent decision."
        >
          {SURFACE_LAYERS.map((l) => (
            <LayerEntry key={l.id} layer={l} />
          ))}
        </Part>

        {/* ---------------- Part three — colour ---------------- */}
        <Part
          number="Three"
          title="Colour"
          lede="Each colour has a role and a measured behaviour. Where a pairing is restricted, the restriction is stated rather than left to be rediscovered."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {state.palette.map((c) => {
              const onWhite = contrast(c.hex, "#FFFFFF");
              const onBlack = contrast(c.hex, "#111111");
              return (
                <div key={c.id} className="overflow-hidden rounded-xl border border-line">
                  <div
                    className="flex h-28 items-end p-4"
                    style={{ background: c.hex, color: readableOn(c.hex) }}
                  >
                    <div>
                      <p className="text-[15px] font-semibold">{c.name}</p>
                      <p className="mono text-[12px] opacity-85">{c.hex}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[13px] leading-relaxed text-muted">{c.usage}</p>
                    <dl className="mono mt-3 grid grid-cols-2 gap-2 text-[11.5px]">
                      <div>
                        <dt className="text-faint">On white</dt>
                        <dd className="tnum text-ink">
                          {formatRatio(onWhite)} · {grade(onWhite)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-faint">On black</dt>
                        <dd className="tnum text-ink">
                          {formatRatio(onBlack)} · {grade(onBlack)}
                        </dd>
                      </div>
                    </dl>
                    {c.locked ? (
                      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-signal">
                        <Icon path={ICONS.lock} size={12} />
                        Fixed by charter, livery or statute
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Part>

        {/* ---------------- Part four — type ---------------- */}
        <Part
          number="Four"
          title="Typography"
          lede={`A ${state.typeRatio} modular scale on a ${state.typeBase}px base. Line height and tracking are derived from size rather than set by hand.`}
        >
          <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
            {[...scale].reverse().map((s) => (
              <div key={s.step} className="flex flex-wrap items-baseline gap-3 bg-panel p-3.5">
                <span className="w-44 shrink-0 text-[12.5px] text-muted">
                  {ROLE_FOR_STEP[s.step]}
                </span>
                <span
                  className="min-w-0 flex-1 truncate"
                  style={{
                    fontFamily: s.step >= 2 ? state.headingFamily : state.bodyFamily,
                    fontSize: `${Math.min(s.px, 44)}px`,
                    lineHeight: s.lineHeight,
                    letterSpacing: `${s.tracking}em`,
                  }}
                >
                  {name}
                </span>
                <span className="mono tnum shrink-0 text-[11px] text-faint">
                  {s.px}px / {s.lineHeight}
                </span>
              </div>
            ))}
          </div>
        </Part>

        {/* ---------------- Part five — governance ---------------- */}
        <Part
          number="Five"
          title="Architecture and governance"
          lede="How the institution's brands relate to one another, and who is accountable for holding it."
        >
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail term="Architecture model" desc={state.institution.architecture.replace(/-/g, " ")} />
            <Detail term="Semi-autonomous units" desc={String(state.institution.units)} />
            <Detail
              term="Registered sub-brands"
              desc={`${state.subBrands.length} of ${state.institution.units}`}
            />
            <Detail
              term="Regions"
              desc={state.institution.regions.join(", ") || "Not recorded"}
            />
          </dl>

          {state.subBrands.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
                    <th className="py-2 pr-4 font-semibold">Sub-brand</th>
                    <th className="py-2 pr-4 font-semibold">Unit</th>
                    <th className="py-2 pr-4 font-semibold">Relationship</th>
                    <th className="py-2 pr-4 font-semibold">Status</th>
                    <th className="py-2 text-right font-semibold">Compliance</th>
                  </tr>
                </thead>
                <tbody>
                  {state.subBrands.map((b) => (
                    <tr key={b.id} className="border-b border-line/60">
                      <td className="py-2 pr-4 font-medium text-ink">{b.name}</td>
                      <td className="py-2 pr-4 text-muted">{b.unit}</td>
                      <td className="py-2 pr-4 capitalize text-muted">{b.relationship}</td>
                      <td className="py-2 pr-4 capitalize text-muted">
                        {b.status.replace("-", " ")}
                      </td>
                      <td className="py-2 text-right tnum">{b.compliance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Part>

        {/* ---------------- Part six — record ---------------- */}
        <Part
          number="Six"
          title="The assessment record"
          lede="What was scored, by whom, against what evidence. This is the part a successor needs and almost never gets."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wider text-faint">
                  <th className="py-2 pr-4 font-semibold">Layer</th>
                  <th className="py-2 pr-4 font-semibold">Maturity</th>
                  <th className="py-2 pr-4 font-semibold">Owner</th>
                  <th className="py-2 font-semibold">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {LAYERS.map((l) => {
                  const r = state.assessments[l.id];
                  const m = maturityOf(state, l.id);
                  return (
                    <tr key={l.id} className="border-b border-line/60 align-top">
                      <td className="py-2.5 pr-4 font-medium text-ink">{l.name}</td>
                      <td className="py-2.5 pr-4">
                        <span className="flex items-center gap-1.5 text-muted">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-sm"
                            style={{ background: MATURITY_COLOUR[m] }}
                            aria-hidden
                          />
                          {maturityLabel(m)}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-muted">{r?.owner || "—"}</td>
                      <td className="py-2.5 text-muted">{r?.evidence || "Not evidenced"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[12.5px] leading-relaxed text-faint">
            Maturity is scored on a five-rung ladder — Absent, Ad hoc, Documented,
            Operationalised, Governed — describing observable states rather than opinions.
            The composite score weights the strategy tier at 80% and the identity tier at
            20%, matching the framework&rsquo;s central claim. Both tiers are always also
            reported separately, so a strong foundation never conceals a weak surface.
          </p>
        </Part>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Part({
  number,
  title,
  lede,
  children,
}: {
  number: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-break">
      <div className="border-b border-line pb-4">
        <p className="eyebrow">Part {number}</p>
        <h2 className="display mt-2 text-[clamp(1.7rem,3.2vw,2.4rem)]">{title}</h2>
        <p className="prose-measure mt-2 text-[14.5px] leading-relaxed text-muted">{lede}</p>
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function LayerEntry({ layer }: { layer: Layer }) {
  const state = useBrand();
  const m = maturityOf(state, layer.id);
  const answers = state.answers[layer.id] ?? {};
  const record = state.assessments[layer.id];
  const filled = layer.prompts.filter((p) => answers[p.id]?.trim());

  return (
    <div className="panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="serif text-lg">{layer.name}</h3>
        <div className="flex items-center gap-2">
          {record?.owner ? (
            <span className="text-[12px] text-faint">{record.owner}</span>
          ) : null}
          <span className="flex items-center gap-1.5 text-[12px] text-muted">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ background: MATURITY_COLOUR[m] }}
              aria-hidden
            />
            {maturityLabel(m)}
          </span>
        </div>
      </div>

      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{layer.summary}</p>
      <Meter
        value={(filled.length / layer.prompts.length) * 100}
        colour={layer.tier === "deep" ? "var(--viz-deep)" : "var(--viz-surface)"}
        height={3}
        className="mt-3"
        label={`${layer.name} completeness`}
      />

      {filled.length > 0 ? (
        <dl className="mt-4 space-y-3 border-t border-line pt-4">
          {filled.map((p) => (
            <div key={p.id}>
              <dt className="text-[12px] font-semibold uppercase tracking-wide text-faint">
                {p.question}
              </dt>
              <dd className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-ink">
                {answers[p.id]}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="mt-4 rounded-lg border border-line bg-panel-2 p-3 text-[13px] leading-relaxed text-muted">
          <strong className="text-ink">Outstanding.</strong> Nothing has been written for
          this layer yet. Until it is, the deliverable it should produce —{" "}
          {layer.deliverable.charAt(0).toLowerCase() + layer.deliverable.slice(1)} — does
          not exist, and anything depending on it is resting on an assumption.
        </p>
      )}
    </div>
  );
}

function Detail({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="rounded-lg border border-line p-3.5">
      <dt className="eyebrow">{term}</dt>
      <dd className="mt-1 text-[14px] capitalize text-ink">{desc}</dd>
    </div>
  );
}
