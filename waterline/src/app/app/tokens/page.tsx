"use client";

import { useMemo, useState } from "react";
import { Button, Card, Icon, ICONS } from "@/components/ui";
import {
  cssTokens,
  jsonTokens,
  styleDictionaryTokens,
  tailwindTokens,
} from "@/lib/tokens";
import { useBrand } from "@/store/brand";

const FORMATS = [
  {
    id: "css",
    label: "CSS custom properties",
    file: "tokens.css",
    note: "Drop into any stylesheet. The safest common denominator across a large estate.",
    build: cssTokens,
  },
  {
    id: "json",
    label: "JSON (W3C draft)",
    file: "tokens.json",
    note: "Machine-readable, and the format most token pipelines now expect.",
    build: jsonTokens,
  },
  {
    id: "tailwind",
    label: "Tailwind v4 theme",
    file: "theme.css",
    note: "An @theme block, ready to import.",
    build: tailwindTokens,
  },
  {
    id: "sd",
    label: "Style Dictionary",
    file: "tokens.sd.json",
    note: "For institutions already building platform outputs from a token source.",
    build: styleDictionaryTokens,
  },
] as const;

export default function TokensPage() {
  const state = useBrand();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const format = FORMATS[active];
  const output = useMemo(() => format.build(state), [format, state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the textarea below is still selectable */
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = format.file;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <header className="max-w-3xl">
        <p className="eyebrow">Output</p>
        <h1 className="display mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">Token export</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Guidelines describe the decisions; tokens enforce them. Handing engineering a
          file it can consume is the only mechanism that reliably keeps a large estate
          consistent — a PDF of swatches is a suggestion.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {FORMATS.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`rounded-lg border px-3.5 py-2 text-[13px] transition ${
              i === active
                ? "border-signal bg-signal/10 font-medium text-signal"
                : "border-line text-muted hover:border-line-strong hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mono text-[12.5px] text-ink">{format.file}</p>
            <p className="mt-1 text-[13px] text-muted">{format.note}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={copy}>
              <Icon path={copied ? ICONS.check : ICONS.grid} size={14} />
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button size="sm" onClick={download}>
              <Icon path={ICONS.download} size={14} />
              Download
            </Button>
          </div>
        </div>

        <pre className="mono mt-4 max-h-[540px] overflow-auto rounded-lg border border-line bg-elev p-4 text-[11.5px] leading-relaxed text-muted">
          <code>{output}</code>
        </pre>
      </Card>

      <p className="text-[12.5px] leading-relaxed text-faint">
        Ramps are generated from each role&rsquo;s seed colour with saturation pulled back
        at the extremes. Regenerate after any change in the colour studio — the export is
        always built from current state, never cached.
      </p>
    </div>
  );
}
