"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Iceberg } from "@/components/iceberg";
import { MATURITY_COLOUR } from "@/components/charts";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  Field,
  Icon,
  ICONS,
  Input,
  Meter,
  Textarea,
} from "@/components/ui";
import { LAYERS, TIER_META } from "@/lib/framework";
import { MATURITY_LADDER } from "@/lib/types";
import type { Maturity } from "@/lib/types";
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

type Phase = "intro" | "assess" | "computing" | "report";

export default function DiagnosticPage() {
  const state = useBrand();
  const assess = useBrand((s) => s.assess);
  const completeDiagnostic = useBrand((s) => s.completeDiagnostic);
  const snapshot = useBrand((s) => s.snapshot);

  const [phase, setPhase] = useState<Phase>(() =>
    state.diagnosticComplete ? "report" : "intro",
  );
  const [index, setIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const layer = LAYERS[index];
  const assessed = LAYERS.filter((l) => state.assessments[l.id]).length;

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [index, phase]);

  function finish() {
    setPhase("computing");
    completeDiagnostic();
    snapshot("Diagnostic completed");
  }

  return (
    <div ref={topRef} className="scroll-mt-20">
      {phase === "intro" && (
        <Intro assessed={assessed} onStart={() => setPhase("assess")} onSkip={() => setPhase("report")} />
      )}

      {phase === "assess" && (
        <Assess
          index={index}
          setIndex={setIndex}
          onFinish={finish}
          layerId={layer.id}
          onAssess={assess}
        />
      )}

      {phase === "computing" && <Computing onDone={() => setPhase("report")} />}

      {phase === "report" && (
        <Report
          onRestart={() => {
            setIndex(0);
            setPhase("assess");
          }}
        />
      )}
    </div>
  );
}

/* ================================================================== */
/* Intro                                                              */
/* ================================================================== */

function Intro({
  assessed,
  onStart,
  onSkip,
}: {
  assessed: number;
  onStart: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl py-6">
      <p className="eyebrow">Diagnostic</p>
      <h1 className="display mt-2 text-[clamp(1.9rem,4vw,2.9rem)]">
        Score the nineteen layers honestly.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">
        Each layer is placed on the same five-rung ladder. The rungs describe
        observable states rather than opinions, so two people assessing the same
        institution should land in the same place — and where they do not, the
        disagreement is more useful than the score.
      </p>

      <ol className="mt-8 space-y-2.5">
        {MATURITY_LADDER.map((rung) => (
          <li key={rung.level} className="panel flex gap-4 p-4">
            <span
              className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[13px] font-semibold"
              style={{
                background: MATURITY_COLOUR[rung.level],
                color: rung.level >= 3 ? "#04101a" : "#eaf2f7",
              }}
            >
              {rung.level}
            </span>
            <div>
              <p className="text-[14.5px] font-semibold text-ink">
                {rung.label}
                <span className="ml-2 font-normal text-faint">{rung.short}</span>
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                {rung.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button size="lg" onClick={onStart}>
          {assessed > 0 ? "Continue scoring" : "Start scoring"}
          <Icon path={ICONS.arrowRight} size={15} />
        </Button>
        {assessed > 0 ? (
          <Button variant="secondary" size="lg" onClick={onSkip}>
            Jump to the report
          </Button>
        ) : null}
      </div>

      {assessed > 0 ? (
        <p className="mt-3 text-[12.5px] text-faint">
          {assessed} of {LAYERS.length} layers already scored.
        </p>
      ) : null}
    </div>
  );
}

/* ================================================================== */
/* Assessment                                                         */
/* ================================================================== */

function Assess({
  index,
  setIndex,
  onFinish,
  layerId,
  onAssess,
}: {
  index: number;
  setIndex: (n: number) => void;
  onFinish: () => void;
  layerId: string;
  onAssess: (id: string, patch: Record<string, unknown>) => void;
}) {
  const state = useBrand();
  const layer = LAYERS[index];
  const record = state.assessments[layerId];
  const maturity = record?.maturity;
  const progress = ((index + (maturity !== undefined ? 1 : 0)) / LAYERS.length) * 100;
  const isLast = index === LAYERS.length - 1;
  const tier = TIER_META[layer.tier];
  const colour = layer.tier === "deep" ? "var(--viz-deep)" : "var(--viz-surface)";

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress */}
      <div className="sticky top-14 z-30 -mx-4 mb-6 border-b border-line bg-bg/92 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between gap-4 text-[12px] text-faint">
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: colour }} />
            {tier.label}
          </span>
          <span className="tnum">
            {index + 1} / {LAYERS.length}
          </span>
        </div>
        <Meter value={progress} colour={colour} height={3} className="mt-2" label="Diagnostic progress" />
      </div>

      <div key={layer.id} className="rise">
        <p className="eyebrow">{tier.sub}</p>
        <h1 className="display mt-2 text-[clamp(1.7rem,3.4vw,2.5rem)]">{layer.name}</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{layer.summary}</p>

        <details className="group mt-4">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-[13px] text-signal [&::-webkit-details-marker]:hidden">
            Why this layer matters
            <span className="transition-transform group-open:rotate-45">
              <Icon path={ICONS.plus} size={13} />
            </span>
          </summary>
          <div className="mt-3 space-y-3 border-l-2 pl-4" style={{ borderColor: colour }}>
            <p className="text-[13.5px] leading-relaxed text-muted">{layer.rationale}</p>
            <p className="text-[13.5px] leading-relaxed text-muted">
              <strong className="text-ink">Finished looks like:</strong> {layer.deliverable}
            </p>
            <p className="text-[13.5px] leading-relaxed text-muted">
              <strong className="text-ink">In an institution:</strong>{" "}
              {layer.institutionalNote}
            </p>
            <p className="text-[13.5px] leading-relaxed text-warn">
              <strong>The failure mode:</strong> {layer.failureMode}
            </p>
          </div>
        </details>

        {/* Ladder */}
        <fieldset className="mt-8">
          <legend className="mb-3 text-[13px] font-medium text-ink">
            Where does this sit today?
          </legend>
          <div className="space-y-2">
            {MATURITY_LADDER.map((rung) => {
              const on = maturity === rung.level;
              return (
                <button
                  key={rung.level}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onAssess(layerId, { maturity: rung.level as Maturity })}
                  className={`flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left transition ${
                    on
                      ? "border-signal bg-signal/8 shadow-[0_0_0_1px_var(--signal)]"
                      : "border-line bg-panel hover:border-line-strong hover:bg-panel-2"
                  }`}
                >
                  <span
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[12px] font-semibold"
                    style={{
                      background: MATURITY_COLOUR[rung.level],
                      color: rung.level >= 3 ? "#04101a" : "#eaf2f7",
                    }}
                  >
                    {rung.level}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[14px] font-semibold ${on ? "text-signal" : "text-ink"}`}>
                      {rung.label}
                      <span className="ml-2 text-[13px] font-normal text-faint">
                        {rung.short}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">
                      {rung.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Evidence */}
        {maturity !== undefined ? (
          <div className="mt-7 grid gap-5 rise sm:grid-cols-[1.6fr_1fr]">
            <Field
              label="What is the evidence?"
              hint="Name the artefact, the document, or the quote. A score with nothing behind it is an opinion, and opinions inflate."
            >
              <Textarea
                value={record?.evidence ?? ""}
                onChange={(e) => onAssess(layerId, { evidence: e.target.value })}
                placeholder="2025 applicant survey, n=2,140. Findings not yet read by the executive."
              />
            </Field>
            <Field label="Who owns it?" hint="By role, not by person. People leave; roles persist.">
              <Input
                value={record?.owner ?? ""}
                onChange={(e) => onAssess(layerId, { owner: e.target.value })}
                placeholder="Director of Insight"
              />
            </Field>
          </div>
        ) : null}

        {/* Dependencies */}
        {layer.dependsOn.length > 0 ? (
          <div className="mt-6 rounded-xl border border-line bg-panel-2 p-4">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-faint">
              Rests on
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {layer.dependsOn.map((d) => {
                const dep = LAYERS.find((l) => l.id === d);
                if (!dep) return null;
                const m = maturityOf(state, d);
                return (
                  <li key={d} className="flex items-center gap-1.5 text-[13px] text-muted">
                    <span
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ background: MATURITY_COLOUR[m] }}
                      aria-hidden
                    />
                    {dep.name}
                    <span className="text-faint">· {maturityLabel(m)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
        <Button variant="ghost" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
          <Icon path={ICONS.arrowLeft} size={15} />
          Back
        </Button>

        <div className="flex items-center gap-2">
          {maturity === undefined ? (
            <Button variant="ghost" onClick={() => setIndex(index + 1)} disabled={isLast}>
              Skip
            </Button>
          ) : null}
          <Button
            onClick={() => (isLast ? onFinish() : setIndex(index + 1))}
            disabled={maturity === undefined && isLast}
          >
            {isLast ? "See the report" : "Next layer"}
            <Icon path={ICONS.arrowRight} size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Computing                                                          */
/* ================================================================== */

const COMPUTE_STEPS = [
  "Weighting nineteen layers",
  "Resolving dependencies",
  "Measuring the waterline gap",
  "Sequencing the roadmap",
];

/**
 * A short composed pause. It exists because the report lands better when the
 * reader has been told what is being worked out — but it is capped at under two
 * seconds, skippable, and it does not pretend to be doing more than it is.
 */
function Computing({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }
    const t = setInterval(() => setStep((s) => s + 1), 420);
    const done = setTimeout(onDone, 1780);
    return () => {
      clearInterval(t);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto w-40 opacity-70">
          <Iceberg deep={40} surface={40} />
        </div>
        <ul className="mt-6 space-y-2">
          {COMPUTE_STEPS.map((s, i) => (
            <li
              key={s}
              className={`flex items-center justify-center gap-2 text-[13.5px] transition-opacity duration-300 ${
                i <= step ? "text-ink opacity-100" : "text-faint opacity-40"
              }`}
            >
              <span className={i < step ? "text-good" : "text-faint"}>
                <Icon path={i < step ? ICONS.check : ICONS.pulse} size={14} />
              </span>
              {s}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onDone}
          className="mt-6 text-[12.5px] text-faint underline underline-offset-4 hover:text-ink"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Report                                                             */
/* ================================================================== */

function Report({ onRestart }: { onRestart: () => void }) {
  const state = useBrand();
  const scores = computeScores(state);
  const risks = detectRisks(state);
  const exposure = reworkExposure(state);
  const phases = roadmap(state);
  const priorities = useMemo(
    () => prioritise(state).filter((p) => maturityOf(state, p.layer.id) < 4),
    [state],
  );

  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-8">
      <header className="no-print flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Diagnostic report</p>
          <h1 className="display mt-1 text-[clamp(1.8rem,3.4vw,2.6rem)]">
            {state.institution.name || "Your institution"}
          </h1>
          <p className="mt-1.5 text-[13.5px] text-muted">
            {scores.assessedCount} of {scores.totalCount} layers scored
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => window.print()}>
            <Icon path={ICONS.download} size={15} />
            Print or save as PDF
          </Button>
          <Button variant="ghost" onClick={onRestart}>
            Re-score
          </Button>
        </div>
      </header>

      {/* Headline */}
      <section className="panel overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <p className="eyebrow">Iceberg score</p>
            <p className="tnum mt-2 text-[76px] font-semibold leading-[0.82]">
              {Math.round(scores.composite)}
            </p>
            <Badge
              tone={
                scores.posture.id === "aligned"
                  ? "good"
                  : scores.posture.id === "top-heavy" || scores.posture.id === "unmanaged"
                    ? "warn"
                    : "neutral"
              }
              className="mt-4"
            >
              {scores.posture.label}
            </Badge>
            <p className="mt-3 text-[15px] font-medium text-ink">{scores.posture.headline}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">
              {scores.posture.detail}
            </p>
          </div>
          <Iceberg deep={scores.deep} surface={scores.surface} still />
        </div>

        <div className="grid divide-line border-t border-line sm:grid-cols-3 sm:divide-x">
          <ReportStat
            label="Strategy · below"
            value={Math.round(scores.deep)}
            colour="var(--viz-deep)"
          />
          <ReportStat
            label="Identity · above"
            value={Math.round(scores.surface)}
            colour="var(--viz-surface)"
          />
          <ReportStat
            label="Waterline gap"
            value={Math.round(scores.balance)}
            signed
            colour={scores.balance > 18 ? "var(--warn)" : "var(--ink)"}
          />
        </div>
      </section>

      {/* The move */}
      <section className="rounded-2xl border border-signal/35 bg-signal/8 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-signal">
          What we would do first
        </p>
        <p className="mt-2 text-[16px] leading-relaxed text-ink">{scores.posture.move}</p>
      </section>

      {/* Risks */}
      {risks.length > 0 ? (
        <section className="page-break">
          <h2 className="serif text-2xl">Exposure</h2>
          <ul className="mt-4 space-y-3">
            {risks.map((r) => (
              <li key={r.id} className="panel p-4">
                <div className="flex flex-wrap items-center gap-2">
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
                  <p className="text-[15px] font-semibold text-ink">{r.title}</p>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{r.detail}</p>
                <p className="mt-2 text-[13.5px] text-signal">{r.action}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Exposure figure */}
      <section className="panel p-6">
        <h2 className="serif text-2xl">Rework exposure</h2>
        <p className="tnum mt-3 text-[40px] font-semibold leading-none">
          {money(exposure.amount, state.institution.currency)}
        </p>
        <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted">
          An indicative figure for the identity spend currently resting on unsettled
          foundations. It assumes {Math.round(exposure.unsupportedShare * 100)}% of surface
          investment is unsupported and that {Math.round(REWORK_COEFFICIENT * 100)}% of
          unsupported work is redone once the strategy lands. The coefficient is a stated
          planning assumption rather than a measured benchmark — it is printed here so it
          can be challenged rather than quietly relied upon.
        </p>
      </section>

      {/* Roadmap */}
      <section className="page-break">
        <h2 className="serif text-2xl">Sequenced roadmap</h2>
        <p className="mt-1 text-[14px] text-muted">
          Phase one is capped at four layers. An institution that moves nineteen at once
          moves none of them.
        </p>
        <div className="mt-5 space-y-4">
          {phases.map((phase) => (
            <Card key={phase.name}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="serif text-lg">{phase.name}</h3>
                <Badge tone="neutral">{phase.horizon}</Badge>
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{phase.intent}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {phase.layers.map((l) => {
                  const p = priorities.find((x) => x.layer.id === l.id);
                  return (
                    <li key={l.id} className="rounded-lg border border-line p-3">
                      <Link
                        href={`/app/${l.tier === "deep" ? "strategy" : "identity"}/${l.id}`}
                        className="text-[13.5px] font-semibold text-ink hover:text-signal"
                      >
                        {l.name}
                      </Link>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-faint">
                        {p?.reason}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <div className="no-print flex flex-wrap gap-3 border-t border-line pt-6">
        <ButtonLink href="/app">Open the dashboard</ButtonLink>
        <ButtonLink href="/app/strategy" variant="secondary">
          Start on the strategy layers
        </ButtonLink>
      </div>
    </div>
  );
}

function ReportStat({
  label,
  value,
  colour,
  signed,
}: {
  label: string;
  value: number;
  colour: string;
  signed?: boolean;
}) {
  return (
    <div className="p-5">
      <p className="eyebrow">{label}</p>
      <p className="tnum mt-1.5 text-[30px] font-semibold leading-none" style={{ color: colour }}>
        {signed && value > 0 ? "+" : ""}
        {value}
      </p>
    </div>
  );
}
