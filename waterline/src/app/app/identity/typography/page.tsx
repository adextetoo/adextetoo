"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Tabs } from "@/components/tabs";
import { LayerWorkspace } from "@/components/layer-workspace";
import { Badge, Card, Field, Icon, ICONS, Select } from "@/components/ui";
import {
  buildScale,
  DEFAULT_STEPS,
  FAMILY_PRESETS,
  RATIOS,
  ROLE_FOR_STEP,
} from "@/lib/typescale";
import { useBrand } from "@/store/brand";

export default function TypeStudioPage() {
  return (
    <div className="space-y-6">
      <header className="max-w-3xl">
        <nav className="flex items-center gap-2 text-[12.5px] text-faint">
          <Link href="/app/identity" className="transition hover:text-ink">
            Identity
          </Link>
          <span aria-hidden>/</span>
          <span className="text-muted">Typography</span>
        </nav>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">Type studio</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          A type system is a set of decisions made once so a hundred authors do not each
          make them badly. Line height tightens as size increases and tracking closes at
          display sizes — the two adjustments that separate a usable scale from a list of
          font sizes.
        </p>
      </header>

      <Tabs
        tabs={[
          { id: "studio", label: "Studio", content: <Studio /> },
          {
            id: "work",
            label: "The work",
            content: <LayerWorkspace slug="typography" basePath="/app/identity" />,
          },
        ]}
      />
    </div>
  );
}

/* ================================================================== */

const LICENCE_CHECKS = [
  "Covers every internal team, not just the central design function",
  "Covers all devolved units — faculties, sites, directorates",
  "Covers external print suppliers and signage fabricators",
  "Covers agencies working on the institution's behalf",
  "Web page-view tier exceeds actual annual traffic",
  "Renewal date and owner are recorded somewhere findable",
];

function Studio() {
  const { typeBase, typeRatio, headingFamily, bodyFamily } = useBrand();
  const setTypeSettings = useBrand((s) => s.setTypeSettings);
  const [checked, setChecked] = useState<string[]>([]);

  const scale = useMemo(
    () => buildScale(typeBase, typeRatio, DEFAULT_STEPS),
    [typeBase, typeRatio],
  );

  const ratioMeta = RATIOS.find((r) => Math.abs(r.value - typeRatio) < 0.001);

  return (
    <div className="space-y-8">
      {/* ---------------- Controls ---------------- */}
      <section className="grid gap-4 lg:grid-cols-4">
        <Card>
          <Field
            label={`Base size — ${typeBase}px`}
            hint="The size body copy is set at. Institutions publishing long-form text should not go below 16."
          >
            <input
              type="range"
              min={14}
              max={21}
              step={0.5}
              value={typeBase}
              onChange={(e) => setTypeSettings({ typeBase: Number(e.target.value) })}
              className="mt-1 w-full accent-[var(--signal)]"
            />
          </Field>
          {typeBase < 16 ? (
            <p className="mt-2 rounded-lg border border-warn/35 bg-warn/8 p-2.5 text-[12px] leading-relaxed text-ink">
              Below 16px, sustained reading gets harder and mobile browsers may zoom
              form fields. Most institutional sites should sit at 16–18.
            </p>
          ) : null}
        </Card>

        <Card>
          <Field label="Scale ratio" hint={ratioMeta?.note}>
            <Select
              value={String(typeRatio)}
              onChange={(e) => setTypeSettings({ typeRatio: Number(e.target.value) })}
            >
              {RATIOS.map((r) => (
                <option key={r.name} value={r.value}>
                  {r.name} — {r.value}
                </option>
              ))}
            </Select>
          </Field>
        </Card>

        <Card>
          <Field label="Heading family" hint="Carries character and voice.">
            <Select
              value={headingFamily}
              onChange={(e) => setTypeSettings({ headingFamily: e.target.value })}
            >
              {FAMILY_PRESETS.map((f) => (
                <option key={f.name} value={f.stack}>
                  {f.name}
                </option>
              ))}
            </Select>
          </Field>
        </Card>

        <Card>
          <Field label="Body family" hint="Carries sustained reading and interface.">
            <Select
              value={bodyFamily}
              onChange={(e) => setTypeSettings({ bodyFamily: e.target.value })}
            >
              {FAMILY_PRESETS.map((f) => (
                <option key={f.name} value={f.stack}>
                  {f.name}
                </option>
              ))}
            </Select>
          </Field>
        </Card>
      </section>

      {/* ---------------- Scale ---------------- */}
      <section>
        <h2 className="serif text-xl">The scale</h2>
        <p className="mt-1 text-[13.5px] text-muted">
          Nine steps, each with a role. Line height and tracking are derived from the size
          rather than set by hand.
        </p>

        <div className="mt-4 space-y-px overflow-hidden rounded-xl border border-line bg-line">
          {[...scale].reverse().map((s) => {
            const isHeading = s.step >= 2;
            return (
              <div
                key={s.step}
                className="flex flex-col gap-3 bg-panel p-4 sm:flex-row sm:items-baseline"
              >
                <div className="flex shrink-0 items-baseline gap-3 sm:w-52">
                  <span className="mono text-[11px] text-faint">
                    {s.step > 0 ? `+${s.step}` : s.step}
                  </span>
                  <span className="text-[12.5px] font-medium text-ink">
                    {ROLE_FOR_STEP[s.step]}
                  </span>
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <p
                    className="truncate"
                    style={{
                      fontFamily: isHeading ? headingFamily : bodyFamily,
                      fontSize: `${s.px}px`,
                      lineHeight: s.lineHeight,
                      letterSpacing: `${s.tracking}em`,
                      fontWeight: isHeading ? 400 : 400,
                    }}
                  >
                    The institution is older than anyone in it
                  </p>
                </div>

                <dl className="mono flex shrink-0 gap-4 text-[11px] text-faint sm:w-56 sm:justify-end">
                  <div>
                    <dt className="sr-only">Size</dt>
                    <dd className="tnum">{s.px}px</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Rem</dt>
                    <dd className="tnum">{s.rem}rem</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Line height</dt>
                    <dd className="tnum">{s.lineHeight}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Tracking</dt>
                    <dd className="tnum">{s.tracking > 0 ? "+" : ""}{s.tracking}em</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Specimen ---------------- */}
      <section>
        <h2 className="serif text-xl">Specimen</h2>
        <p className="mt-1 text-[13.5px] text-muted">
          The scale in use. Judge a type system on a paragraph, never on a word.
        </p>
        <Card className="mt-4">
          <p
            style={{
              fontFamily: headingFamily,
              fontSize: `${scale.find((s) => s.step === 5)?.px}px`,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            A brand is what remains when the campaign stops
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: bodyFamily,
              fontSize: `${scale.find((s) => s.step === 1)?.px}px`,
              lineHeight: 1.5,
            }}
          >
            Most of what an institution publishes is text, which is why typography carries
            more of its tone than any other visual element.
          </p>
          <div className="prose-measure mt-4 space-y-3">
            {[
              "The greater part of an institution's brand is encountered as prose: a letter confirming a place, a sign at a junction, a form that has to be filled in twice, a note explaining why a service has moved. None of these are designed in the sense that a logo is designed, and all of them are read far more often.",
              "This is the argument for settling typography early and centrally. A type system that is licensed for everyone, documented by role, and easy to apply is what stops forty departments from each solving the same problem differently — and it is the cheapest consistency an institution can buy.",
            ].map((p) => (
              <p
                key={p.slice(0, 20)}
                style={{
                  fontFamily: bodyFamily,
                  fontSize: `${typeBase}px`,
                  lineHeight: 1.6,
                }}
                className="text-muted"
              >
                {p}
              </p>
            ))}
          </div>
        </Card>
      </section>

      {/* ---------------- Licensing ---------------- */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="serif text-xl">Licensing</h2>
            <p className="mt-1 max-w-2xl text-[13.5px] text-muted">
              Where institutional type systems actually break. A licence covering one
              marketing team rarely covers forty departments, an outsourced print supplier
              and a students&rsquo; union.
            </p>
          </div>
          <Badge tone={checked.length === LICENCE_CHECKS.length ? "good" : "warn"}>
            {checked.length} of {LICENCE_CHECKS.length} confirmed
          </Badge>
        </div>

        <ul className="mt-4 space-y-2">
          {LICENCE_CHECKS.map((c) => {
            const on = checked.includes(c);
            return (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    setChecked(on ? checked.filter((x) => x !== c) : [...checked, c])
                  }
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-[13.5px] transition ${
                    on
                      ? "border-good/45 bg-good/8 text-ink"
                      : "border-line text-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${
                      on ? "border-good bg-good text-white" : "border-line-strong"
                    }`}
                  >
                    {on ? <Icon path={ICONS.check} size={12} /> : null}
                  </span>
                  {c}
                </button>
              </li>
            );
          })}
        </ul>

        {checked.length < LICENCE_CHECKS.length ? (
          <p className="mt-3 rounded-lg border border-warn/35 bg-warn/8 p-3 text-[13px] leading-relaxed text-ink">
            Until every line is confirmed, assume documents produced outside the design
            team will silently fall back to a system font. Specify that fallback
            deliberately rather than discovering it.
          </p>
        ) : null}
      </section>
    </div>
  );
}
