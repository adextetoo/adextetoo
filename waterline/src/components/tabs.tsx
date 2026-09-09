"use client";

import { useState } from "react";

export function Tabs({
  tabs,
  initial = 0,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
  initial?: number;
}) {
  const [active, setActive] = useState(initial);

  return (
    <div>
      <div role="tablist" className="flex gap-1 border-b border-line">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 px-3.5 py-2.5 text-[13.5px] transition ${
              i === active
                ? "border-signal font-medium text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-6">
        {tabs[active].content}
      </div>
    </div>
  );
}
