"use client";

import { useState } from "react";
import { TrendChart } from "@/components/charts";
import { Badge, Button, Card, Icon, ICONS, Input, Stat } from "@/components/ui";
import { computeScores } from "@/lib/scoring";
import { shortDate } from "@/lib/format";
import { useBrand } from "@/store/brand";

export default function MeasurePage() {
  const state = useBrand();
  const snapshot = useBrand((s) => s.snapshot);
  const [label, setLabel] = useState("");

  const scores = computeScores(state);
  const history = state.history;
  const first = history[0];
  const last = history[history.length - 1];

  const movement =
    first && last && history.length > 1
      ? {
          deep: last.deep - first.deep,
          surface: last.surface - first.surface,
          gap: last.surface - last.deep - (first.surface - first.deep),
        }
      : null;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl">
        <p className="eyebrow">Govern</p>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">Brand health</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          A brand does not decay evenly. Identity drifts first and visibly; strategy decays
          silently as the people who held it move on. Re-scoring on a cadence is what turns
          that from a discovery into a measurement.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Strategy today"
          value={Math.round(scores.deep)}
          unit="/100"
          tone="var(--viz-deep)"
          note={movement ? `${signed(movement.deep)} since the first reading` : undefined}
        />
        <Stat
          label="Identity today"
          value={Math.round(scores.surface)}
          unit="/100"
          tone="var(--viz-surface)"
          note={movement ? `${signed(movement.surface)} since the first reading` : undefined}
        />
        <Stat
          label="Waterline gap"
          value={signed(Math.round(scores.balance))}
          note={
            movement
              ? movement.gap < 0
                ? `Narrowing — ${signed(movement.gap)} over the series`
                : `Widening — ${signed(movement.gap)} over the series`
              : "The number to watch."
          }
          tone={scores.balance > 18 ? "var(--warn)" : undefined}
        />
        <Stat
          label="Readings"
          value={history.length}
          note={last ? `Last taken ${shortDate(last.date)}` : "None recorded yet."}
        />
      </section>

      <Card>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="serif text-xl">The series</h2>
            <p className="mt-1 text-[13.5px] text-muted">
              The shaded band is the gap between the two tiers — the thing that actually
              matters.
            </p>
          </div>
          <Badge tone={scores.balance > 18 ? "warn" : "neutral"}>
            {scores.posture.label}
          </Badge>
        </div>
        <div className="mt-5">
          <TrendChart history={history} />
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Card>
          <h2 className="serif text-lg">Record a reading</h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            Takes the current scores and stamps them with today&rsquo;s date. Name the
            moment — a launch, a board review, a leadership change — so the series reads as
            a history rather than a line.
          </p>
          <div className="mt-4 flex gap-2">
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Board review, autumn"
              aria-label="Reading label"
            />
            <Button
              onClick={() => {
                snapshot(label.trim() || undefined);
                setLabel("");
              }}
            >
              <Icon path={ICONS.pulse} size={15} />
              Record
            </Button>
          </div>
          <p className="mt-3 text-[12px] text-faint">
            One reading per day — recording again today replaces today&rsquo;s entry.
          </p>
        </Card>

        <Card>
          <h2 className="serif text-lg">A sensible cadence</h2>
          <ul className="mt-3 space-y-3">
            {[
              {
                when: "Quarterly",
                what: "Sub-brand compliance and identity layers. This is where drift shows up first, and where it is cheapest to correct.",
              },
              {
                when: "Annually",
                what: "The full nineteen. Attach it to the planning cycle so it competes for attention alongside everything else being decided.",
              },
              {
                when: "On leadership change",
                what: "Re-score before the new arrival forms a view. A dated assessment they did not commission is far more persuasive than one produced in response to them.",
              },
              {
                when: "Before any major spend",
                what: "If the surface layer being funded rests on something under Documented, the exposure figure belongs in the paper requesting the money.",
              },
            ].map((c) => (
              <li key={c.when} className="flex gap-3">
                <Badge tone="neutral" className="mt-0.5 shrink-0">
                  {c.when}
                </Badge>
                <p className="text-[13.5px] leading-relaxed text-muted">{c.what}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

function signed(n: number): string {
  return `${n > 0 ? "+" : ""}${n}`;
}
