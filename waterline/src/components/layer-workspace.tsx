"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { MATURITY_COLOUR } from "./charts";
import {
  Badge,
  Card,
  Field,
  Icon,
  ICONS,
  Input,
  Meter,
  Textarea,
} from "./ui";
import { LAYERS, LAYER_BY_ID, layersInTier } from "@/lib/framework";
import { MATURITY_LADDER } from "@/lib/types";
import type { Layer, Maturity, Tier } from "@/lib/types";
import { maturityLabel, maturityOf } from "@/lib/scoring";
import { useBrand } from "@/store/brand";

/* ================================================================== */
/* Index — the list of layers in a tier                               */
/* ================================================================== */

export function LayerIndex({
  tier,
  title,
  lede,
  basePath,
  extraTools,
}: {
  tier: Tier;
  title: string;
  lede: string;
  basePath: string;
  extraTools?: { href: string; label: string; note: string; icon: string }[];
}) {
  const state = useBrand();
  const layers = layersInTier(tier);
  const colour = tier === "deep" ? "var(--viz-deep)" : "var(--viz-surface)";

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <p className="eyebrow" style={{ color: colour }}>
          {tier === "deep" ? "Below the waterline · 80%" : "Above the waterline · 20%"}
        </p>
        <h1 className="display mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)]">{title}</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{lede}</p>
      </header>

      {extraTools ? (
        <section>
          <h2 className="serif text-lg">Working tools</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {extraTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="panel group flex items-start gap-3 p-4 transition hover:border-line-strong"
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-panel-2 text-signal">
                  <Icon path={t.icon} size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-semibold text-ink">{t.label}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-muted">
                    {t.note}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <h2 className="serif text-lg">
          {layers.length} layers, in the order they can be built
        </h2>
        <ol className="mt-3 space-y-2.5">
          {layers.map((layer) => {
            const m = maturityOf(state, layer.id);
            const record = state.assessments[layer.id];
            const answered = Object.values(state.answers[layer.id] ?? {}).filter((v) =>
              v?.trim(),
            ).length;
            const blocked = layer.dependsOn.filter((d) => maturityOf(state, d) < 2);

            return (
              <li key={layer.id}>
                <Link
                  href={`${basePath}/${layer.id}`}
                  className="panel group flex flex-col gap-3 p-4 transition hover:border-line-strong sm:flex-row sm:items-center"
                >
                  <span
                    className="mono grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[12px] font-semibold"
                    style={{
                      background: MATURITY_COLOUR[m],
                      color: m >= 3 ? "#04101a" : "#eaf2f7",
                    }}
                    title={maturityLabel(m)}
                  >
                    {m}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[15px] font-semibold text-ink">{layer.name}</p>
                      {blocked.length > 0 ? (
                        <Badge tone="warn">
                          Blocked by {blocked.map((b) => LAYER_BY_ID[b]?.name).join(", ")}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                      {layer.summary}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-5 sm:w-56">
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between text-[11px] text-faint">
                        <span>{maturityLabel(m)}</span>
                        <span className="tnum">
                          {answered}/{layer.prompts.length}
                        </span>
                      </div>
                      <Meter
                        value={(answered / layer.prompts.length) * 100}
                        colour={colour}
                        height={4}
                        className="mt-1.5"
                        label={`${layer.name} prompts answered`}
                      />
                      {record?.owner ? (
                        <p className="mt-1.5 truncate text-[11px] text-faint">
                          {record.owner}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-faint transition group-hover:translate-x-0.5 group-hover:text-signal">
                      <Icon path={ICONS.arrowRight} size={16} />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

/* ================================================================== */
/* Detail — one layer's guided workspace                              */
/* ================================================================== */

export function LayerWorkspace({ slug, basePath }: { slug: string; basePath: string }) {
  const state = useBrand();
  const assess = useBrand((s) => s.assess);
  const answer = useBrand((s) => s.answer);

  const layer = LAYER_BY_ID[slug];
  if (!layer) notFound();

  const record = state.assessments[layer.id];
  const answers = state.answers[layer.id] ?? {};
  const m = maturityOf(state, layer.id);
  const colour = layer.tier === "deep" ? "var(--viz-deep)" : "var(--viz-surface)";
  const siblings = layersInTier(layer.tier);
  const pos = siblings.findIndex((l) => l.id === layer.id);
  const prev = siblings[pos - 1];
  const next = siblings[pos + 1];
  const dependents = LAYERS.filter((l) => l.dependsOn.includes(layer.id));
  const answered = Object.values(answers).filter((v) => v?.trim()).length;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <nav className="flex items-center gap-2 text-[12.5px] text-faint">
        <Link href={basePath} className="transition hover:text-ink">
          {layer.tier === "deep" ? "Strategy" : "Identity"}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-muted">{layer.name}</span>
      </nav>

      <header className="max-w-3xl">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: colour }} />
          <p className="eyebrow">
            {layer.tier === "deep" ? "Below the waterline" : "Above the waterline"} · Layer{" "}
            {layer.order} of {siblings.length}
          </p>
        </div>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">{layer.name}</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">{layer.summary}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        {/* ---------------- Main column ---------------- */}
        <div className="space-y-6">
          <Card>
            <h2 className="serif text-lg">Why it is load-bearing</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{layer.rationale}</p>

            <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Finished looks like</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                  {layer.deliverable}
                </p>
              </div>
              <div>
                <p className="eyebrow">In an institution</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                  {layer.institutionalNote}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-warn/35 bg-warn/8 p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-warn">
                The failure mode
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink">{layer.failureMode}</p>
            </div>
          </Card>

          {/* Prompts */}
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="serif text-xl">The work</h2>
              <p className="tnum text-[12.5px] text-faint">
                {answered} of {layer.prompts.length} answered
              </p>
            </div>

            <div className="mt-4 space-y-4">
              {layer.prompts.map((prompt, i) => (
                <Card key={prompt.id}>
                  <div className="flex gap-3">
                    <span className="mono mt-0.5 text-[11px] text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Field label={prompt.question} hint={prompt.help}>
                        {prompt.kind === "short" ? (
                          <Input
                            value={answers[prompt.id] ?? ""}
                            onChange={(e) => answer(layer.id, prompt.id, e.target.value)}
                          />
                        ) : (
                          <Textarea
                            value={answers[prompt.id] ?? ""}
                            onChange={(e) => answer(layer.id, prompt.id, e.target.value)}
                            className={prompt.kind === "list" ? "min-h-24" : "min-h-32"}
                            placeholder={
                              prompt.kind === "list" ? "One per line" : undefined
                            }
                          />
                        )}
                      </Field>

                      {prompt.example ? (
                        <details className="group mt-2.5">
                          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[12.5px] text-signal [&::-webkit-details-marker]:hidden">
                            Worked example
                            <span className="transition-transform group-open:rotate-45">
                              <Icon path={ICONS.plus} size={12} />
                            </span>
                          </summary>
                          <p
                            className="mt-2 border-l-2 pl-3 text-[13px] italic leading-relaxed text-muted"
                            style={{ borderColor: colour }}
                          >
                            {prompt.example}
                          </p>
                        </details>
                      ) : null}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* ---------------- Sidebar ---------------- */}
        <aside className="space-y-4 lg:sticky lg:top-20">
          <Card>
            <p className="eyebrow">Maturity</p>
            <div className="mt-3 space-y-1.5">
              {MATURITY_LADDER.map((rung) => {
                const on = record?.maturity === rung.level;
                return (
                  <button
                    key={rung.level}
                    type="button"
                    aria-pressed={on}
                    onClick={() => assess(layer.id, { maturity: rung.level as Maturity })}
                    title={rung.description}
                    className={`flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-[13px] transition ${
                      on
                        ? "border-signal bg-signal/10 font-medium text-ink"
                        : "border-line text-muted hover:border-line-strong hover:text-ink"
                    }`}
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ background: MATURITY_COLOUR[rung.level] }}
                      aria-hidden
                    />
                    {rung.label}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card>
            <Field label="Evidence" hint="What proves the score.">
              <Textarea
                value={record?.evidence ?? ""}
                onChange={(e) => assess(layer.id, { evidence: e.target.value })}
                className="min-h-20 text-[13px]"
              />
            </Field>
            <Field label="Owner" hint="By role." className="mt-4">
              <Input
                value={record?.owner ?? ""}
                onChange={(e) => assess(layer.id, { owner: e.target.value })}
                className="text-[13px]"
              />
            </Field>
            {record?.reviewedOn ? (
              <p className="mt-3 text-[11.5px] text-faint">Last reviewed {record.reviewedOn}</p>
            ) : null}
          </Card>

          {layer.dependsOn.length > 0 ? (
            <Card>
              <p className="eyebrow">Rests on</p>
              <ul className="mt-2.5 space-y-2">
                {layer.dependsOn.map((d) => {
                  const dep = LAYER_BY_ID[d];
                  if (!dep) return null;
                  const dm = maturityOf(state, d);
                  return (
                    <li key={d}>
                      <Link
                        href={`/app/${dep.tier === "deep" ? "strategy" : "identity"}/${d}`}
                        className="flex items-center gap-2 text-[13px] text-muted transition hover:text-ink"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-sm"
                          style={{ background: MATURITY_COLOUR[dm] }}
                          aria-hidden
                        />
                        <span className="truncate">{dep.name}</span>
                        <span className="ml-auto shrink-0 text-[11px] text-faint">
                          {maturityLabel(dm)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {layer.dependsOn.some((d) => maturityOf(state, d) < 2) && m >= 2 ? (
                <p className="mt-3 rounded-lg border border-warn/35 bg-warn/8 p-2.5 text-[12px] leading-relaxed text-ink">
                  This layer is ahead of what it rests on. Work done here is likely to be
                  redone.
                </p>
              ) : null}
            </Card>
          ) : null}

          {dependents.length > 0 ? (
            <Card>
              <p className="eyebrow">Waiting on this</p>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {dependents.map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/app/${d.tier === "deep" ? "strategy" : "identity"}/${d.id}`}
                      className="inline-block rounded-md border border-line px-2 py-0.5 text-[12px] text-muted transition hover:border-line-strong hover:text-ink"
                    >
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </aside>
      </div>

      {/* Prev / next */}
      <nav className="flex items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Link href={`${basePath}/${prev.id}`} className="group min-w-0">
            <span className="eyebrow">Previous</span>
            <span className="mt-1 flex items-center gap-2 text-[14px] font-medium text-ink group-hover:text-signal">
              <Icon path={ICONS.arrowLeft} size={15} />
              <span className="truncate">{prev.name}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${basePath}/${next.id}`} className="group min-w-0 text-right">
            <span className="eyebrow">Next</span>
            <span className="mt-1 flex items-center justify-end gap-2 text-[14px] font-medium text-ink group-hover:text-signal">
              <span className="truncate">{next.name}</span>
              <Icon path={ICONS.arrowRight} size={15} />
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

/** Used by the route files to pre-render every layer page. */
export function layerSlugs(tier: Tier): { slug: string }[] {
  return layersInTier(tier).map((l: Layer) => ({ slug: l.id }));
}
