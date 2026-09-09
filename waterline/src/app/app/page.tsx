"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Iceberg } from "@/components/iceberg";
import { MaturityMatrix } from "@/components/charts";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Icon,
  ICONS,
  Meter,
  Stat,
} from "@/components/ui";
import { LAYERS } from "@/lib/framework";
import {
  computeScores,
  detectRisks,
  maturityLabel,
  maturityOf,
  prioritise,
  reworkExposure,
  REWORK_COEFFICIENT,
  roadmap,
} from "@/lib/scoring";
import { money } from "@/lib/format";
import { useBrand } from "@/store/brand";

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <Dashboard />
    </Suspense>
  );
}

function Dashboard() {
  const params = useSearchParams();
  const router = useRouter();
  const state = useBrand();
  const loadWorkedExample = useBrand((s) => s.loadWorkedExample);
  const snapshot = useBrand((s) => s.snapshot);
  const [snapped, setSnapped] = useState(false);

  // ?demo=1 seeds the fictional institution, then cleans the URL so a refresh
  // does not silently overwrite whatever the visitor has since entered.
  useEffect(() => {
    if (params.get("demo") === "1") {
      loadWorkedExample();
      router.replace("/app");
    }
  }, [params, loadWorkedExample, router]);

  const scores = computeScores(state);

  if (scores.assessedCount === 0) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <EmptyState
          title="Nothing has been assessed yet"
          body="The dashboard is built from the diagnostic. Score the nineteen layers and this becomes a live picture of where the brand actually stands — or load the worked example to see it populated."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/app/diagnostic">Run the diagnostic</ButtonLink>
              <Button variant="secondary" onClick={loadWorkedExample}>
                Load the worked example
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  const risks = detectRisks(state);
  const priorities = prioritise(state).filter((p) => maturityOf(state, p.layer.id) < 4);
  const exposure = reworkExposure(state);
  const phases = roadmap(state);

  return (
    <div className="space-y-8">
      {/* ---------------- Header ---------------- */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Brand system</p>
          <h1 className="display mt-1 text-[clamp(1.7rem,3vw,2.4rem)]">
            {state.institution.name || "Untitled institution"}
          </h1>
          <p className="mt-1.5 text-[13.5px] text-muted">
            {scores.assessedCount} of {scores.totalCount} layers assessed
            {state.institution.units > 0
              ? ` · ${state.institution.units} semi-autonomous units`
              : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              snapshot("Manual snapshot");
              setSnapped(true);
              setTimeout(() => setSnapped(false), 2200);
            }}
          >
            <Icon path={snapped ? ICONS.check : ICONS.pulse} size={15} />
            {snapped ? "Recorded" : "Record a reading"}
          </Button>
          <ButtonLink href="/app/diagnostic">Continue the diagnostic</ButtonLink>
        </div>
      </header>

      {/* ---------------- The picture ---------------- */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="panel p-5">
          <Iceberg deep={scores.deep} surface={scores.surface} still />
        </div>

        <div className="space-y-4">
          <div className="panel p-6">
            <p className="eyebrow">Iceberg score</p>
            <div className="mt-2 flex items-end gap-3">
              <p className="tnum text-[64px] font-semibold leading-[0.85]">
                {Math.round(scores.composite)}
              </p>
              <p className="pb-1.5 text-[13px] text-faint">/ 100</p>
              <Badge
                tone={
                  scores.posture.id === "aligned"
                    ? "good"
                    : scores.posture.id === "top-heavy" || scores.posture.id === "unmanaged"
                      ? "warn"
                      : "neutral"
                }
                className="mb-2 ml-auto"
              >
                {scores.posture.label}
              </Badge>
            </div>
            <p className="mt-3 text-[14px] font-medium text-ink">{scores.posture.headline}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
              {scores.posture.detail}
            </p>
            <div className="mt-4 rounded-lg border border-signal/35 bg-signal/8 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-signal">
                The move
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink">
                {scores.posture.move}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <TierStat
              label="Strategy"
              sub="Below · 12 layers"
              value={scores.deep}
              colour="var(--viz-deep)"
            />
            <TierStat
              label="Identity"
              sub="Above · 7 layers"
              value={scores.surface}
              colour="var(--viz-surface)"
            />
            <Stat
              label="Waterline gap"
              value={`${scores.balance > 0 ? "+" : ""}${Math.round(scores.balance)}`}
              note={
                scores.balance > 0
                  ? "Identity is ahead of the strategy under it."
                  : scores.balance < 0
                    ? "Strategy is ahead of how it is expressed."
                    : "The two tiers are level."
              }
              tone={
                scores.balance > 18
                  ? "var(--warn)"
                  : scores.balance < -18
                    ? "var(--viz-deep)"
                    : undefined
              }
            />
          </div>
        </div>
      </section>

      {/* ---------------- Risks ---------------- */}
      {risks.length > 0 ? (
        <section>
          <h2 className="serif text-xl">What is exposed</h2>
          <p className="mt-1 text-[13.5px] text-muted">
            Derived from the scores and their dependencies, ranked by severity.
          </p>
          <ul className="mt-4 space-y-3">
            {risks.map((r) => (
              <li
                key={r.id}
                className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-start"
              >
                <span
                  className={`mt-0.5 shrink-0 ${
                    r.severity === "critical"
                      ? "text-danger"
                      : r.severity === "high"
                        ? "text-warn"
                        : "text-muted"
                  }`}
                >
                  <Icon path={ICONS.alert} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14.5px] font-semibold text-ink">{r.title}</p>
                    <Badge
                      tone={
                        r.severity === "critical"
                          ? "danger"
                          : r.severity === "high"
                            ? "warn"
                            : "neutral"
                      }
                    >
                      {r.severity}
                    </Badge>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{r.detail}</p>
                  <p className="mt-2 text-[13px] text-signal">{r.action}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ---------------- Next actions ---------------- */}
      <section>
        <h2 className="serif text-xl">What to do next</h2>
        <p className="mt-1 text-[13.5px] text-muted">
          Ranked by framework weight, distance from governed, and how many other layers
          are waiting on it.
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {priorities.slice(0, 6).map((p, i) => (
            <li key={p.layer.id}>
              <Link
                href={`/app/${p.layer.tier === "deep" ? "strategy" : "identity"}/${p.layer.id}`}
                className="panel group flex h-full gap-3 p-4 transition hover:border-line-strong"
              >
                <span className="mono mt-0.5 text-[11px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        background:
                          p.layer.tier === "deep" ? "var(--viz-deep)" : "var(--viz-surface)",
                      }}
                    />
                    <p className="truncate text-[14px] font-semibold text-ink">
                      {p.layer.name}
                    </p>
                    {p.unsupported ? <Badge tone="warn">At risk</Badge> : null}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{p.reason}</p>
                </div>
                <span className="self-center text-faint transition group-hover:translate-x-0.5 group-hover:text-signal">
                  <Icon path={ICONS.arrowRight} size={15} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Matrix ---------------- */}
      <section className="panel p-5">
        <h2 className="serif text-xl">Every layer, at a glance</h2>
        <p className="mt-1 text-[13.5px] text-muted">
          Select any layer to open its workspace.
        </p>
        <div className="mt-5">
          <MaturityMatrix
            cells={LAYERS.map((l) => ({
              id: l.id,
              name: l.name,
              tier: l.tier,
              maturity: maturityOf(state, l.id),
              label: maturityLabel(maturityOf(state, l.id)),
            }))}
            onSelect={(id) => {
              const layer = LAYERS.find((l) => l.id === id);
              if (layer) {
                router.push(
                  `/app/${layer.tier === "deep" ? "strategy" : "identity"}/${id}`,
                );
              }
            }}
          />
        </div>
      </section>

      {/* ---------------- Exposure + roadmap ---------------- */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Card>
          <p className="eyebrow">Rework exposure</p>
          <p className="tnum mt-2 text-[34px] font-semibold leading-none">
            {money(exposure.amount, state.institution.currency)}
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
            Indicative annual spend on identity work resting on foundations that are not
            settled. {exposure.layers.length === 0
              ? "No surface layer is currently ahead of its dependencies."
              : `${exposure.layers.map((l) => l.name).join(", ")} ${exposure.layers.length > 1 ? "are" : "is"} exposed.`}
          </p>
          <div className="mt-4 border-t border-line pt-3">
            <p className="text-[11.5px] leading-relaxed text-faint">
              <strong className="text-muted">The assumption:</strong>{" "}
              {Math.round(exposure.unsupportedShare * 100)}% of surface investment is
              unsupported, and {Math.round(REWORK_COEFFICIENT * 100)}% of unsupported work
              is typically redone once the strategy settles. That coefficient is a stated
              planning assumption, not a measured benchmark — change it in the model if
              your own history says otherwise.
            </p>
          </div>
        </Card>

        <Card>
          <p className="eyebrow">Sequenced roadmap</p>
          <div className="mt-4 space-y-5">
            {phases.map((phase) => (
              <div key={phase.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[14px] font-semibold text-ink">{phase.name}</p>
                  <p className="text-[12px] text-faint">{phase.horizon}</p>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">{phase.intent}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {phase.layers.map((l) => (
                    <li
                      key={l.id}
                      className="rounded-md border px-2 py-0.5 text-[12px] text-muted"
                      style={{
                        borderColor:
                          l.tier === "deep"
                            ? "color-mix(in srgb, var(--viz-deep) 40%, transparent)"
                            : "color-mix(in srgb, var(--viz-surface) 40%, transparent)",
                      }}
                    >
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

function TierStat({
  label,
  sub,
  value,
  colour,
}: {
  label: string;
  sub: string;
  value: number;
  colour: string;
}) {
  return (
    <div className="panel p-4">
      <p className="eyebrow" style={{ color: colour }}>
        {label}
      </p>
      <p className="tnum mt-2 text-[30px] font-semibold leading-none">
        {Math.round(value)}
      </p>
      <Meter value={value} colour={colour} className="mt-3" label={`${label} maturity`} />
      <p className="mt-2 text-[11.5px] text-faint">{sub}</p>
    </div>
  );
}
