"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/site";
import {
  Button,
  ChoiceCard,
  Field,
  Icon,
  ICONS,
  Input,
  Textarea,
  Badge,
} from "@/components/ui";
import { Iceberg } from "@/components/iceberg";
import { useBrand } from "@/store/brand";
import type { ArchitectureModel, Institution, InstitutionType } from "@/lib/types";

/**
 * Institution onboarding.
 *
 * Deliberately long and segmented rather than one dense form. Each step asks
 * for one decision, and several of them are themselves diagnostic — an
 * institution that cannot answer the architecture question has already learned
 * something before it reaches the assessment.
 */

const TYPES: { id: InstitutionType; label: string; note: string }[] = [
  { id: "university", label: "University or college", note: "Faculties, institutes, campuses, alumni bodies" },
  { id: "health", label: "Health system", note: "Trusts, sites, service lines, research arms" },
  { id: "government", label: "Government or agency", note: "Departments, arm's-length bodies, public services" },
  { id: "financial", label: "Bank, fund or insurer", note: "Retail, private and institutional divisions" },
  { id: "cultural", label: "Museum or cultural body", note: "Collections, venues, touring, trading arms" },
  { id: "nonprofit", label: "Foundation or NGO", note: "Programmes, country offices, appeals" },
];

const SIZES: { id: Institution["size"]; label: string; note: string }[] = [
  { id: "small", label: "Under 500", note: "One team holds the brand in practice" },
  { id: "medium", label: "500 – 3,000", note: "Central function, growing devolution" },
  { id: "large", label: "3,000 – 15,000", note: "Multiple units commissioning independently" },
  { id: "very-large", label: "Over 15,000", note: "Federated in all but name" },
];

const ARCHITECTURES: { id: ArchitectureModel; label: string; note: string }[] = [
  {
    id: "monolithic",
    label: "Monolithic",
    note: "One name on everything. Maximum recognition, minimum local latitude.",
  },
  {
    id: "endorsed",
    label: "Endorsed",
    note: "Units carry their own name, endorsed by the parent. The usual institutional answer.",
  },
  {
    id: "house-of-brands",
    label: "House of brands",
    note: "Units stand alone; the parent is invisible to most audiences.",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    note: "Different rules in different parts of the estate, deliberately.",
  },
  {
    id: "undecided",
    label: "We have never decided",
    note: "In practice this means each unit has decided for itself.",
  },
];

const GOALS = [
  "Recover applications, admissions or footfall",
  "Stop sub-brand and logo proliferation",
  "Prepare for a leadership transition",
  "Justify or defend brand investment to a board",
  "Merge, absorb or spin out a unit",
  "Fix an identity that is disliked internally",
  "Meet accessibility or statutory obligations",
  "Replace an undocumented, inherited brand",
];

type StepId = "welcome" | "identity" | "scale" | "architecture" | "mandate" | "invest" | "ready";

const STEPS: { id: StepId; label: string }[] = [
  { id: "welcome", label: "Start" },
  { id: "identity", label: "Institution" },
  { id: "scale", label: "Scale" },
  { id: "architecture", label: "Architecture" },
  { id: "mandate", label: "Mandate" },
  { id: "invest", label: "Investment" },
  { id: "ready", label: "Ready" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const institution = useBrand((s) => s.institution);
  const setInstitution = useBrand((s) => s.setInstitution);
  const completeOnboarding = useBrand((s) => s.completeOnboarding);
  const loadWorkedExample = useBrand((s) => s.loadWorkedExample);

  const current = STEPS[step];
  const progress = (step / (STEPS.length - 1)) * 100;

  const canAdvance = useMemo(() => {
    switch (current.id) {
      case "identity":
        return institution.name.trim().length > 1;
      case "architecture":
        return institution.architecture !== undefined;
      default:
        return true;
    }
  }, [current.id, institution]);

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }
  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function finish() {
    completeOnboarding();
    router.push("/app/diagnostic");
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between px-5">
          <Wordmark />
          <Link href="/" className="text-[13px] text-faint transition hover:text-ink">
            Save and exit
          </Link>
        </div>
        <div className="h-0.5 w-full bg-panel-2">
          <div
            className="h-full bg-signal transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main id="main" className="mx-auto flex w-full max-w-[var(--maxw)] flex-1 gap-12 px-5 py-10">
        {/* Step rail */}
        <nav aria-label="Progress" className="hidden w-48 shrink-0 lg:block">
          <ol className="space-y-1">
            {STEPS.map((s, i) => {
              const state = i === step ? "current" : i < step ? "done" : "todo";
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    aria-current={state === "current" ? "step" : undefined}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] transition ${
                      state === "current"
                        ? "bg-panel-2 font-medium text-ink"
                        : state === "done"
                          ? "text-muted hover:bg-panel-2"
                          : "cursor-default text-faint"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
                        state === "done"
                          ? "border-signal bg-signal text-signal-ink"
                          : state === "current"
                            ? "border-signal text-signal"
                            : "border-line text-faint"
                      }`}
                    >
                      {state === "done" ? <Icon path={ICONS.check} size={11} /> : i + 1}
                    </span>
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="min-w-0 flex-1">
          <p className="eyebrow mb-4 lg:hidden">
            Step {step + 1} of {STEPS.length} · {current.label}
          </p>

          <div key={current.id} className="rise">
            {current.id === "welcome" && <WelcomeStep onDemo={() => { loadWorkedExample(); router.push("/app"); }} />}

            {current.id === "identity" && (
              <StepShell
                eyebrow="Institution"
                title="Who are we assessing?"
                lede="The name is used throughout the workspace and on the brand book you will generate at the end."
              >
                <Field label="Institution name" required>
                  <Input
                    autoFocus
                    value={institution.name}
                    onChange={(e) => setInstitution({ name: e.target.value })}
                    placeholder="Northgate University"
                  />
                </Field>

                <fieldset className="mt-7">
                  <legend className="mb-3 text-[13px] font-medium text-ink">
                    What kind of institution is it?
                  </legend>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {TYPES.map((t) => (
                      <ChoiceCard
                        key={t.id}
                        selected={institution.type === t.id}
                        onSelect={() => setInstitution({ type: t.id })}
                        title={t.label}
                        description={t.note}
                      />
                    ))}
                  </div>
                </fieldset>
              </StepShell>
            )}

            {current.id === "scale" && (
              <StepShell
                eyebrow="Scale"
                title="How much of it is there?"
                lede="Scale changes the advice more than sector does. A brand held by four people fails differently from one held by four hundred."
              >
                <fieldset>
                  <legend className="mb-3 text-[13px] font-medium text-ink">
                    Roughly how many people does the institution employ?
                  </legend>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {SIZES.map((s) => (
                      <ChoiceCard
                        key={s.id}
                        selected={institution.size === s.id}
                        onSelect={() => setInstitution({ size: s.id })}
                        title={s.label}
                        description={s.note}
                      />
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Semi-autonomous units"
                    hint="Faculties, directorates, sites, branches, member bodies — anything that could plausibly commission its own design work."
                  >
                    <Input
                      type="number"
                      min={0}
                      value={institution.units}
                      onChange={(e) => setInstitution({ units: Number(e.target.value) || 0 })}
                    />
                  </Field>
                  <Field
                    label="Regions or markets"
                    hint="Comma separated. Include international recruitment or service markets."
                  >
                    <Input
                      value={institution.regions.join(", ")}
                      onChange={(e) =>
                        setInstitution({
                          regions: e.target.value
                            .split(",")
                            .map((r) => r.trim())
                            .filter(Boolean),
                        })
                      }
                      placeholder="North West, South Asia"
                    />
                  </Field>
                </div>

                {institution.units > 12 ? (
                  <Callout tone="warn">
                    {institution.units} units is enough that sub-brand governance will be a
                    larger problem than the identity itself. The register in the workspace is
                    where that gets managed.
                  </Callout>
                ) : null}
              </StepShell>
            )}

            {current.id === "architecture" && (
              <StepShell
                eyebrow="Architecture"
                title="How do your brands relate to each other?"
                lede="This is the single question that most changes the advice — and the one institutions most often have never formally answered."
              >
                <div className="grid gap-2.5">
                  {ARCHITECTURES.map((a) => (
                    <ChoiceCard
                      key={a.id}
                      selected={institution.architecture === a.id}
                      onSelect={() => setInstitution({ architecture: a.id })}
                      title={a.label}
                      description={a.note}
                    />
                  ))}
                </div>

                {institution.architecture === "undecided" ? (
                  <Callout tone="warn">
                    That is the most common answer and it is a finding in itself. An
                    undecided architecture is not neutral — it delegates the decision to
                    whichever unit acts first, which is how institutions acquire ninety
                    logos.
                  </Callout>
                ) : null}
              </StepShell>
            )}

            {current.id === "mandate" && (
              <StepShell
                eyebrow="Mandate"
                title="What has brought this to the surface now?"
                lede="Brand work in institutions is almost never spontaneous. Naming the trigger keeps the work pointed at the thing that will actually be judged."
              >
                <Field
                  label="What prompted this review?"
                  hint="Write it plainly, including the politics. This is for you — it is the paragraph you will be glad you kept in eighteen months."
                >
                  <Textarea
                    value={institution.mandate}
                    onChange={(e) => setInstitution({ mandate: e.target.value })}
                    placeholder="New leadership arriving in January. The 2024 refresh is disliked internally and applications from our two priority markets fell 11%. The board wants a review before further spend is approved."
                    className="min-h-36"
                  />
                </Field>

                <fieldset className="mt-7">
                  <legend className="mb-1 text-[13px] font-medium text-ink">
                    What would make this a success?
                  </legend>
                  <p className="mb-3 text-[12.5px] text-faint">
                    Choose up to three. More than three is a wish list, not a mandate.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {GOALS.map((g) => {
                      const on = institution.primaryGoals.includes(g);
                      const full = institution.primaryGoals.length >= 3 && !on;
                      return (
                        <button
                          key={g}
                          type="button"
                          disabled={full}
                          onClick={() =>
                            setInstitution({
                              primaryGoals: on
                                ? institution.primaryGoals.filter((x) => x !== g)
                                : [...institution.primaryGoals, g],
                            })
                          }
                          className={`rounded-full border px-3.5 py-1.5 text-[13px] transition ${
                            on
                              ? "border-signal bg-signal/10 text-signal"
                              : full
                                ? "cursor-not-allowed border-line text-faint opacity-50"
                                : "border-line text-muted hover:border-line-strong hover:text-ink"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </StepShell>
            )}

            {current.id === "invest" && (
              <StepShell
                eyebrow="Investment"
                title="What does the institution spend on brand each year?"
                lede="Used to size the rework exposure — the share of surface spend that typically has to be redone when it is commissioned ahead of the strategy."
              >
                <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
                  <Field
                    label="Annual brand, marketing and communications spend"
                    hint="A rough order of magnitude is enough. Include agency fees, campaign media, print and signage."
                  >
                    <Input
                      type="number"
                      min={0}
                      step={10000}
                      value={institution.annualBrandSpend}
                      onChange={(e) =>
                        setInstitution({ annualBrandSpend: Number(e.target.value) || 0 })
                      }
                    />
                  </Field>
                  <Field label="Currency">
                    <select
                      value={institution.currency}
                      onChange={(e) => setInstitution({ currency: e.target.value })}
                      className="w-full cursor-pointer rounded-lg border border-line bg-elev px-3 py-2.5 text-sm text-ink focus:border-signal focus:outline-none"
                    >
                      {["GBP", "EUR", "USD", "CAD", "AUD", "NGN", "ZAR", "INR"].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Callout tone="neutral">
                  Waterline reports exposure using a stated coefficient rather than a
                  claimed benchmark, and shows you the assumption alongside the number so
                  it can be argued with in a board paper.
                </Callout>
              </StepShell>
            )}

            {current.id === "ready" && (
              <ReadyStep name={institution.name || "your institution"} onStart={finish} />
            )}
          </div>

          {current.id !== "welcome" && current.id !== "ready" ? (
            <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
              <Button variant="ghost" onClick={back}>
                <Icon path={ICONS.arrowLeft} size={15} />
                Back
              </Button>
              <Button onClick={next} disabled={!canAdvance}>
                Continue
                <Icon path={ICONS.arrowRight} size={15} />
              </Button>
            </div>
          ) : null}

          {current.id === "welcome" ? (
            <div className="mt-10 border-t border-line pt-6">
              <Button size="lg" onClick={next}>
                Begin
                <Icon path={ICONS.arrowRight} size={15} />
              </Button>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function StepShell({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)]">{title}</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{lede}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Callout({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "warn";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-6 rounded-xl border p-4 text-[13.5px] leading-relaxed ${
        tone === "warn"
          ? "border-warn/40 bg-warn/8 text-ink"
          : "border-line bg-panel-2 text-muted"
      }`}
    >
      {children}
    </div>
  );
}

function WelcomeStep({ onDemo }: { onDemo: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div className="max-w-xl">
        <Badge tone="signal">About twenty minutes</Badge>
        <h1 className="display mt-4 text-[clamp(2.1rem,4.4vw,3.2rem)]">
          Before the assessment, six questions about the institution.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          They set the frame for everything that follows — the sequencing, the
          governance advice, and how the exposure is sized. Several of them are
          themselves diagnostic. If you find one hard to answer, that is a finding.
        </p>
        <ul className="mt-6 space-y-2.5">
          {[
            "Nothing is transmitted — it stays in this browser",
            "You can leave and come back; progress is kept",
            "Change any answer later from the workspace",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[14px] text-muted">
              <span className="mt-0.5 text-signal">
                <Icon path={ICONS.check} size={15} />
              </span>
              {t}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onDemo}
          className="mt-6 text-[13px] text-signal underline underline-offset-4 transition hover:text-signal-hover"
        >
          Or skip ahead and explore a fully worked example
        </button>
      </div>

      <div className="drift">
        <Iceberg deep={0} surface={0} still />
        <p className="mt-3 text-center text-[12.5px] text-faint">
          Your iceberg is empty. It fills as you score.
        </p>
      </div>
    </div>
  );
}

function ReadyStep({ name, onStart }: { name: string; onStart: () => void }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">Ready</p>
      <h1 className="display mt-2 text-[clamp(1.9rem,3.8vw,2.8rem)]">
        Now the uncomfortable part.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">
        The diagnostic asks you to place {name} on a five-rung ladder for each of
        nineteen layers, and to say what evidence you are relying on. Scores without
        evidence tend to be optimistic, and optimism is what produces the third
        rebrand in a decade.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { n: "19", l: "layers to score" },
          { n: "~20", l: "minutes on your own" },
          { n: "1", l: "roadmap at the end" },
        ].map((s) => (
          <div key={s.l} className="panel-quiet p-4 text-center">
            <p className="tnum serif text-[26px] leading-none">{s.n}</p>
            <p className="mt-1.5 text-[12px] text-faint">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={onStart}>
          Start the diagnostic
          <Icon path={ICONS.arrowRight} size={15} />
        </Button>
      </div>
    </div>
  );
}
