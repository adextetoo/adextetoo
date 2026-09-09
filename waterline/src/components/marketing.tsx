"use client";

import Link from "next/link";
import { useState } from "react";
import { IcebergDiagram, Iceberg } from "./iceberg";
import { Badge, ButtonLink, Icon, ICONS } from "./ui";
import { DEEP_LAYERS, SURFACE_LAYERS } from "@/lib/framework";

/* ================================================================== */
/* Hero                                                               */
/* ================================================================== */

export function Hero() {
  return (
    <section className="abyss caustics relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-[var(--maxw)] gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:pb-24 lg:pt-20">
        <div className="rise">
          <Badge tone="signal">For universities, health systems, agencies and funds</Badge>

          <h1 className="display mt-5 text-[clamp(2.6rem,6.2vw,4.6rem)]">
            Most brand work
            <br />
            stops at the logo.
          </h1>

          <p className="prose-measure mt-5 text-[17px] leading-relaxed text-muted">
            A logo, a palette and a typeface are about a fifth of a brand. The other
            four fifths — the research, the positioning, the difference you can
            actually defend, the voice your rejection letters are written in — sit
            below the waterline, and they decide whether the visible fifth means
            anything at all.
          </p>

          <p className="prose-measure mt-4 text-[17px] leading-relaxed text-ink">
            Waterline builds that eighty per cent, then makes the twenty per cent
            above it provably consistent across every faculty, site and department.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/onboarding" size="lg">
              Run the brand diagnostic
              <Icon path={ICONS.arrowRight} />
            </ButtonLink>
            <ButtonLink href="/app?demo=1" variant="secondary" size="lg">
              Explore a worked example
            </ButtonLink>
          </div>

          <p className="mt-4 text-[12.5px] text-faint">
            Nineteen scored layers · a sequenced roadmap · no account required
          </p>
        </div>

        <div className="relative drift">
          <Iceberg deep={78} surface={41} />
        </div>
      </div>

      <div className="border-t border-line bg-bg/40">
        <dl className="mx-auto grid max-w-[var(--maxw)] grid-cols-2 divide-line px-5 sm:grid-cols-4 sm:divide-x">
          <HeroStat value="19" label="Layers scored" note="12 strategy, 7 identity" />
          <HeroStat value="5" label="Maturity rungs" note="Absent to governed" />
          <HeroStat value="80/20" label="Weighting" note="Strategy to identity" />
          <HeroStat value="1" label="Number that matters" note="The gap between them" />
        </dl>
      </div>
    </section>
  );
}

function HeroStat({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className="px-1 py-5 sm:px-6">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1.5">
        <span className="tnum serif block text-[28px] leading-none">{value}</span>
        <span className="mt-1.5 block text-[12px] text-faint">{note}</span>
      </dd>
    </div>
  );
}

/* ================================================================== */
/* Thesis                                                             */
/* ================================================================== */

const SYMPTOMS = [
  {
    seen: "The rebrand launches to an internal backlash.",
    cause:
      "Nobody agreed what the institution stands for, so the identity became a referendum on taste.",
  },
  {
    seen: "Every faculty commissions its own logo.",
    cause:
      "There is no architecture and no reason to comply, so local pride fills the vacuum.",
  },
  {
    seen: "The new leader wants to start again.",
    cause:
      "The strategy was never written down, so there is nothing to inherit and no cost to discarding it.",
  },
  {
    seen: "The website looks right and converts badly.",
    cause:
      "The structure mirrors the org chart because no audience decision was ever mapped.",
  },
];

export function Thesis() {
  return (
    <section id="thesis" className="border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="max-w-3xl">
          <p className="eyebrow">The thesis</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
            You cannot see the part that is failing.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            When an institutional brand goes wrong, the symptom is always visible and
            the cause almost never is. So the visible thing gets fixed — again — and
            the cause is untouched, which is why so many institutions are on their
            third rebrand in a decade with the same underlying problem.
          </p>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {SYMPTOMS.map((s) => (
            <li key={s.seen} className="bg-panel p-6">
              <p className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ background: "var(--viz-surface)" }}
                />
                {s.seen}
              </p>
              <p className="mt-3 flex items-start gap-2.5 pl-[18px] text-[14px] leading-relaxed text-muted">
                <span className="-ml-[18px] mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--viz-deep)" }} aria-hidden />
                {s.cause}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[13px] text-faint">
          <span className="inline-block h-2 w-2 translate-y-[1px] rounded-full" style={{ background: "var(--viz-surface)" }} aria-hidden />
          <span className="ml-2">What gets reported</span>
          <span className="mx-3 text-line-strong">·</span>
          <span className="inline-block h-2 w-2 translate-y-[1px] rounded-full" style={{ background: "var(--viz-deep)" }} aria-hidden />
          <span className="ml-2">What is actually wrong</span>
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/* The system — nineteen layers                                       */
/* ================================================================== */

export function SystemSection() {
  const [highlight, setHighlight] = useState<"deep" | "surface" | null>(null);

  return (
    <section id="system" className="abyss border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="max-w-3xl">
          <p className="eyebrow">The system</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
            Nineteen layers, in the order they can honestly be built.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Twelve below the waterline and seven above it. The order is not
            alphabetical and not arbitrary — you cannot differentiate before you
            understand the field, and you cannot brief a logo before you have agreed
            what it is meant to say.
          </p>
        </div>

        <div className="mt-12">
          <IcebergDiagram
            deep={78}
            surface={41}
            highlight={highlight}
            onHoverTier={setHighlight}
            surfaceLayers={SURFACE_LAYERS}
            deepLayers={DEEP_LAYERS}
          />
        </div>

        <p className="mt-8 text-[12.5px] text-faint">
          Look &amp; Feel sits below the waterline on purpose. The written art
          direction is strategy; the logo it produces is identity. Keeping them apart
          is what turns a design review from a matter of taste into a matter of fit.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Method                                                             */
/* ================================================================== */

const PHASES = [
  {
    n: "01",
    name: "Diagnose",
    icon: ICONS.compass,
    body: "Score all nineteen layers on a five-rung maturity ladder, with evidence attached to every score. You finish with a defensible position rather than an impression.",
    out: "Iceberg score, waterline gap, ranked risks",
  },
  {
    n: "02",
    name: "Build the depth",
    icon: ICONS.layers,
    body: "Work the twelve strategy layers in dependency order, each with guided prompts written for institutions rather than startups.",
    out: "Positioning exposé, voice, values, art direction",
  },
  {
    n: "03",
    name: "Express the surface",
    icon: ICONS.palette,
    body: "Build the identity against the brief the strategy produced — colour with verified contrast, a type scale with roles, a lockup system your faculties can actually use.",
    out: "Colour system, type scale, exportable tokens",
  },
  {
    n: "04",
    name: "Govern it",
    icon: ICONS.shield,
    body: "Register every sub-brand, track compliance, and re-score on a cadence so drift is caught in months rather than discovered at the next rebrand.",
    out: "Sub-brand register, brand health series, living brand book",
  },
];

export function Method() {
  return (
    <section id="method" className="border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="max-w-3xl">
          <p className="eyebrow">How it runs</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
            Four movements, in sequence.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Institutions rarely fail for lack of effort. They fail by doing the right
            work in the wrong order — commissioning the identity while the strategy is
            still an argument.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PHASES.map((p) => (
            <li key={p.n} className="panel flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-panel-2 text-signal">
                  <Icon path={p.icon} size={18} />
                </span>
                <span className="mono text-[11px] text-faint">{p.n}</span>
              </div>
              <h3 className="serif mt-4 text-xl">{p.name}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{p.body}</p>
              <p className="mt-4 border-t border-line pt-3 text-[12px] text-faint">{p.out}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Capabilities                                                       */
/* ================================================================== */

const FEATURES = [
  {
    icon: ICONS.compass,
    title: "A diagnostic that produces an argument",
    body: "Nineteen scored layers, weighted 80/20, resolved into one number and — more usefully — one gap. The output is a board paper, not a mood board.",
    href: "/app/diagnostic",
    cta: "See the diagnostic",
  },
  {
    icon: ICONS.layers,
    title: "Guided strategy workspaces",
    body: "Each of the twelve depth layers has prompts, worked institutional examples, a stated deliverable, and a named failure mode so you can tell when you are drifting into it.",
    href: "/app/strategy",
    cta: "Open the modules",
  },
  {
    icon: ICONS.palette,
    title: "Colour that is checked, not eyeballed",
    body: "A full WCAG contrast matrix across every pairing, colour-vision simulation, and a nearest-accessible suggestion when a heritage colour will not clear the threshold.",
    href: "/app/identity/colour",
    cta: "Open the colour studio",
  },
  {
    icon: ICONS.type,
    title: "A type scale with roles and licensing",
    body: "A modular scale with optical line height and tracking per step, roles mapped to real documents, and the licensing question asked before you commit.",
    href: "/app/identity/typography",
    cta: "Open the type studio",
  },
  {
    icon: ICONS.shield,
    title: "Sub-brand governance",
    body: "Register every faculty, institute, site and programme. Track compliance, catch the ones that have quietly gone independent, and decide deliberately rather than by neglect.",
    href: "/app/governance",
    cta: "Open the register",
  },
  {
    icon: ICONS.book,
    title: "A brand book that composes itself",
    body: "The guidelines are generated from the work rather than typed up afterwards, so they cannot fall out of date. Print-ready for the board pack.",
    href: "/app/brandbook",
    cta: "See the brand book",
  },
];

export function Capabilities() {
  return (
    <section className="border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="max-w-3xl">
          <p className="eyebrow">In the workspace</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
            Tools that do the arithmetic for you.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="panel group flex flex-col p-6 transition hover:border-line-strong"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-panel-2 text-signal">
                <Icon path={f.icon} size={18} />
              </span>
              <h3 className="serif mt-4 text-lg leading-snug">{f.title}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">{f.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-signal">
                {f.cta}
                <span className="transition-transform group-hover:translate-x-0.5">
                  <Icon path={ICONS.arrowRight} size={14} />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Institutions                                                       */
/* ================================================================== */

const SECTORS = [
  { name: "Universities & colleges", note: "Faculties, institutes, campuses, alumni bodies, students' unions." },
  { name: "Health systems", note: "Trusts, sites, service lines, research arms, charitable foundations." },
  { name: "Government & agencies", note: "Departments, arm's-length bodies, statutory services, public campaigns." },
  { name: "Banks & funds", note: "Retail, private, institutional, and the regulatory constraints on each." },
  { name: "Museums & cultural bodies", note: "Collections, venues, touring programmes, commercial subsidiaries." },
  { name: "Foundations & NGOs", note: "Programmes, country offices, appeals, coalition and funder co-branding." },
];

export function Sectors() {
  return (
    <section className="abyss border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Built for the institutional case</p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
              Many units. One reputation.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">
              An institution is not a company with a marketing department. It is dozens
              of semi-autonomous units, each with its own budget, audience and pride,
              all drawing on one shared reputation and all capable of spending it.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              That is a governance problem before it is a design problem, and it is the
              problem this product is shaped around.
            </p>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {SECTORS.map((s) => (
              <li key={s.name} className="bg-panel p-5">
                <p className="text-[14px] font-semibold text-ink">{s.name}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Pricing                                                            */
/* ================================================================== */

const PLANS = [
  {
    name: "Diagnostic",
    price: "Free",
    cadence: "",
    body: "Score the nineteen layers, see the waterline gap, and take away a sequenced roadmap.",
    features: [
      "Full nineteen-layer assessment",
      "Iceberg score and posture",
      "Ranked risks and phased roadmap",
      "Export the findings",
    ],
    cta: "Run the diagnostic",
    href: "/onboarding",
    featured: false,
  },
  {
    name: "Workspace",
    price: "£1,450",
    cadence: "per month",
    body: "The full system for one institution: strategy modules, identity studio, brand book and governance.",
    features: [
      "Everything in Diagnostic",
      "Twelve guided strategy modules",
      "Colour, type and token studios",
      "Living brand book",
      "Sub-brand register and compliance",
      "Quarterly health tracking",
    ],
    cta: "Open the workspace",
    href: "/app",
    featured: true,
  },
  {
    name: "Federated",
    price: "Bespoke",
    cadence: "",
    body: "For groups: multi-institution portfolios, shared services, and central bodies governing member brands.",
    features: [
      "Everything in Workspace",
      "Multiple institutions in one portfolio",
      "Cross-institution benchmarking",
      "Role-based approval workflows",
      "Onboarding for devolved teams",
    ],
    cta: "Start a conversation",
    href: "/onboarding",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="max-w-3xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
            Priced against the rebrand it prevents.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                p.featured
                  ? "border-signal bg-panel shadow-[0_0_0_1px_var(--signal)]"
                  : "border-line bg-panel"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="serif text-xl">{p.name}</h3>
                {p.featured ? <Badge tone="signal">Most institutions</Badge> : null}
              </div>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="tnum text-[34px] font-semibold leading-none">{p.price}</span>
                {p.cadence ? <span className="text-[13px] text-faint">{p.cadence}</span> : null}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{p.body}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-muted">
                    <span className="mt-0.5 text-signal">
                      <Icon path={ICONS.check} size={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={p.href}
                variant={p.featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {p.cta}
              </ButtonLink>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[12.5px] text-faint">
          Indicative pricing for a demonstration product. Figures are illustrative.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/* FAQ                                                                */
/* ================================================================== */

const FAQS = [
  {
    q: "We already have a brand agency. Where does this sit?",
    a: "Upstream of them, and then alongside. Agencies are usually briefed on the twenty per cent because that is what the institution knows how to ask for. Waterline produces the brief the agency should have been given — the positioning, the art direction, the exclusions — and then holds the system after the agency has gone.",
  },
  {
    q: "Is this a replacement for brand strategy consultancy?",
    a: "No. It is the structure and the record. A consultancy brings judgement, facilitation and an outside view, none of which a piece of software supplies. What software does supply is a consistent framework, an auditable score, and a place for the thinking to live once the engagement ends — which is exactly what usually goes missing.",
  },
  {
    q: "Our identity is fixed by statute or charter. Does the model still work?",
    a: "Yes, and it is more useful, not less. Lock the elements that are genuinely fixed — colour, mark, name — and the model concentrates on the layers you can still move. Most institutions discover the constraint is far narrower than they had assumed, and that the real problem was never the fixed element.",
  },
  {
    q: "How long does the diagnostic take?",
    a: "About twenty minutes to score honestly on your own, or a two-hour session if you run it with the group that will have to act on it. The second is slower and considerably more useful, because the disagreements in the room are themselves a finding.",
  },
  {
    q: "What happens to our data?",
    a: "In this demonstration build, everything you enter stays in your own browser's local storage. Nothing is transmitted anywhere, and clearing your browser data removes it.",
  },
  {
    q: "The scores feel subjective.",
    a: "The maturity ladder is deliberately built from observable states rather than opinions — is there an artefact, is it findable, does it change decisions, does it have an owner and a review date. Two assessors looking at the same institution should land on the same rung. Where they do not, the disagreement is worth more than the score.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-b border-line py-20">
      <div className="mx-auto max-w-[var(--maxw)] px-5">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.1rem)]">
              The ones that come up.
            </h2>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="mt-1 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45">
                    <Icon path={ICONS.plus} size={16} />
                  </span>
                </summary>
                <p className="prose-measure mt-3 text-[14.5px] leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Closing call to action                                             */
/* ================================================================== */

export function ClosingCta() {
  return (
    <section className="abyss caustics py-24">
      <div className="mx-auto max-w-[var(--maxw)] px-5 text-center">
        <h2 className="display mx-auto max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)]">
          Find out how much of your brand is actually built.
        </h2>
        <p className="prose-measure mx-auto mt-5 text-[17px] leading-relaxed text-muted">
          Nineteen layers, twenty minutes, and one uncomfortable number at the end of
          it. Most institutions are more top-heavy than they expect.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/onboarding" size="lg">
            Run the diagnostic
            <Icon path={ICONS.arrowRight} />
          </ButtonLink>
          <ButtonLink href="/app?demo=1" variant="secondary" size="lg">
            Explore the worked example
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
