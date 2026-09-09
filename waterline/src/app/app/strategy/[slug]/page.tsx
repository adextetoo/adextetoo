"use client";

import { use } from "react";
import { LayerWorkspace } from "@/components/layer-workspace";

export default function StrategyLayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <LayerWorkspace slug={slug} basePath="/app/strategy" />;
}
