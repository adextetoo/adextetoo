"use client";

import { LayerIndex } from "@/components/layer-workspace";

export default function StrategyIndexPage() {
  return (
    <LayerIndex
      tier="deep"
      basePath="/app/strategy"
      title="The eighty per cent"
      lede="Twelve layers, in the order they can honestly be built. Each one has guided prompts, a stated deliverable, and the failure mode you get when it is skipped. Work them in sequence — the dependencies are real, and jumping ahead is how institutions end up rebranding twice."
    />
  );
}
