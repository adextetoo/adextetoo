"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Icon,
  ICONS,
  Input,
  Meter,
  Select,
  Stat,
} from "@/components/ui";
import { useBrand } from "@/store/brand";
import type { SubBrand } from "@/lib/types";

const ARCHITECTURE_GUIDANCE: Record<string, { title: string; body: string }> = {
  monolithic: {
    title: "One name on everything",
    body: "Every unit uses the master identity with a descriptor, never its own mark. Recognition compounds fastest here, and local latitude is close to zero — which is the trade you are making, and it needs saying out loud to the units affected.",
  },
  endorsed: {
    title: "Units named, parent endorsing",
    body: "The usual institutional answer. It works only when the endorsement is a defined lockup with enforced rules. Without one, 'endorsed' quietly becomes 'independent' within about two years.",
  },
  "house-of-brands": {
    title: "Units stand alone",
    body: "Justified when audiences genuinely do not overlap or when association would damage one side. Rare in institutions, and expensive — each brand has to earn its own recognition from zero.",
  },
  hybrid: {
    title: "Different rules in different places",
    body: "Legitimate, but only when the rule for which model applies where is written down. Undocumented hybrid is indistinguishable from having no architecture at all.",
  },
  undecided: {
    title: "No architecture has been set",
    body: "This is not neutral. It delegates the decision to whichever unit acts first and has the budget, which is exactly how institutions acquire ninety logos.",
  },
};

const RELATIONSHIPS: SubBrand["relationship"][] = ["master", "endorsed", "independent"];
const STATUSES: SubBrand["status"][] = [
  "approved",
  "in-review",
  "non-compliant",
  "unmanaged",
];

export default function GovernancePage() {
  const state = useBrand();
  const addSubBrand = useBrand((s) => s.addSubBrand);
  const updateSubBrand = useBrand((s) => s.updateSubBrand);
  const removeSubBrand = useBrand((s) => s.removeSubBrand);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ name: "", unit: "" });

  const subs = state.subBrands;

  const summary = useMemo(() => {
    if (subs.length === 0) return null;
    const avg = subs.reduce((s, b) => s + b.compliance, 0) / subs.length;
    return {
      avg,
      approved: subs.filter((b) => b.status === "approved").length,
      drifting: subs.filter(
        (b) => b.status === "non-compliant" || b.status === "unmanaged",
      ).length,
      unregistered: Math.max(0, state.institution.units - subs.length),
    };
  }, [subs, state.institution.units]);

  const guidance = ARCHITECTURE_GUIDANCE[state.institution.architecture];

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <p className="eyebrow">Govern</p>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">
          Sub-brand register
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Institutional identities do not fragment in one decision. They fragment one
          faculty at a time, each with a good local reason. The register is how you see it
          happening while it is still cheap to correct.
        </p>
      </header>

      {guidance ? (
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow">Your architecture</p>
            <Badge tone={state.institution.architecture === "undecided" ? "warn" : "signal"}>
              {state.institution.architecture.replace(/-/g, " ")}
            </Badge>
          </div>
          <p className="mt-3 text-[15px] font-medium text-ink">{guidance.title}</p>
          <p className="mt-1.5 max-w-3xl text-[14px] leading-relaxed text-muted">
            {guidance.body}
          </p>
        </Card>
      ) : null}

      {summary ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Average compliance"
            value={Math.round(summary.avg)}
            unit="/100"
            note="Measured adherence across the register."
          />
          <Stat
            label="Approved"
            value={summary.approved}
            unit={`of ${subs.length}`}
            note="Inside the system and signed off."
            tone="var(--good)"
          />
          <Stat
            label="Drifting"
            value={summary.drifting}
            note="Non-compliant or entirely unmanaged."
            tone={summary.drifting > 0 ? "var(--warn)" : undefined}
          />
          <Stat
            label="Not yet registered"
            value={summary.unregistered}
            note={`You reported ${state.institution.units} semi-autonomous units.`}
            tone={summary.unregistered > 0 ? "var(--warn)" : undefined}
          />
        </div>
      ) : null}

      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="serif text-xl">The register</h2>
            <p className="mt-1 text-[13.5px] text-muted">
              Every faculty, institute, site, service and funded programme that carries a
              name.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setAdding((v) => !v)}>
            <Icon path={adding ? ICONS.x : ICONS.plus} size={14} />
            {adding ? "Cancel" : "Register a sub-brand"}
          </Button>
        </div>

        {adding ? (
          <Card className="mt-4">
            <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
              <Field label="Name">
                <Input
                  autoFocus
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  placeholder="Northgate Business School"
                />
              </Field>
              <Field label="Unit">
                <Input
                  value={draft.unit}
                  onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
                  placeholder="Faculty of Business"
                />
              </Field>
              <Button
                disabled={!draft.name.trim()}
                onClick={() => {
                  addSubBrand({
                    name: draft.name.trim(),
                    unit: draft.unit.trim() || "Unassigned",
                    relationship: "endorsed",
                    compliance: 50,
                    status: "in-review",
                  });
                  setDraft({ name: "", unit: "" });
                  setAdding(false);
                }}
              >
                Add
              </Button>
            </div>
          </Card>
        ) : null}

        {subs.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="Nothing registered yet"
              body="Start with the units that already have their own logo. In most institutions that list is longer than the central team expects, and assembling it is itself the finding."
              action={
                <Button onClick={() => setAdding(true)}>Register the first one</Button>
              }
            />
          </div>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {subs.map((b) => (
              <li key={b.id}>
                <Card className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[15px] font-semibold text-ink">{b.name}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted">{b.unit}</p>
                  </div>

                  <div className="w-full lg:w-44">
                    <div className="flex justify-between text-[11.5px] text-faint">
                      <span>Compliance</span>
                      <span className="tnum">{b.compliance}</span>
                    </div>
                    <Meter
                      value={b.compliance}
                      colour={
                        b.compliance >= 75
                          ? "var(--good)"
                          : b.compliance >= 45
                            ? "var(--warn)"
                            : "var(--danger)"
                      }
                      className="mt-1.5"
                      label={`${b.name} compliance`}
                    />
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={b.compliance}
                      onChange={(e) =>
                        updateSubBrand(b.id, { compliance: Number(e.target.value) })
                      }
                      className="mt-1.5 w-full accent-[var(--signal)]"
                      aria-label={`Set compliance for ${b.name}`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Select
                      value={b.relationship}
                      onChange={(e) =>
                        updateSubBrand(b.id, {
                          relationship: e.target.value as SubBrand["relationship"],
                        })
                      }
                      className="h-9 w-36 py-0 text-[12.5px]"
                      aria-label={`Relationship for ${b.name}`}
                    >
                      {RELATIONSHIPS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                    <Select
                      value={b.status}
                      onChange={(e) =>
                        updateSubBrand(b.id, { status: e.target.value as SubBrand["status"] })
                      }
                      className="h-9 w-36 py-0 text-[12.5px]"
                      aria-label={`Status for ${b.name}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("-", " ")}
                        </option>
                      ))}
                    </Select>
                    <button
                      type="button"
                      onClick={() => removeSubBrand(b.id)}
                      title={`Remove ${b.name}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-line text-faint transition hover:border-danger hover:text-danger"
                    >
                      <Icon path={ICONS.x} size={14} />
                    </button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {summary && summary.drifting > 0 ? (
        <Card className="border-warn/40 bg-warn/8">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            <span className="text-warn">
              <Icon path={ICONS.alert} size={16} />
            </span>
            {summary.drifting} sub-brand{summary.drifting > 1 ? "s are" : " is"} outside the
            system
          </p>
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-muted">
            The decision is not whether to tolerate them — it is whether to bring them into
            the endorsement model or to formally accept them as independent. Both are
            defensible. Leaving it undecided is the only option that guarantees the problem
            spreads, because each unit that succeeds alone makes the next unit&rsquo;s case
            for it.
          </p>
        </Card>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: SubBrand["status"] }) {
  const map = {
    approved: { tone: "good", label: "Approved" },
    "in-review": { tone: "neutral", label: "In review" },
    "non-compliant": { tone: "warn", label: "Non-compliant" },
    unmanaged: { tone: "danger", label: "Unmanaged" },
  } as const;
  const m = map[status];
  return <Badge tone={m.tone}>{m.label}</Badge>;
}
