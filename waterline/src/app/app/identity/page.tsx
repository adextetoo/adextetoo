"use client";

import { LayerIndex } from "@/components/layer-workspace";
import { ICONS } from "@/components/ui";

export default function IdentityIndexPage() {
  return (
    <LayerIndex
      tier="surface"
      basePath="/app/identity"
      title="The twenty per cent"
      lede="Seven layers — the part everybody means when they say brand. They only function when the twelve below the waterline are settled, which is why each one here shows you what it rests on before it lets you get comfortable."
      extraTools={[
        {
          href: "/app/identity/colour",
          label: "Colour studio",
          note: "Roles, a full WCAG contrast matrix, colour-vision simulation and tonal ramps.",
          icon: ICONS.palette,
        },
        {
          href: "/app/identity/typography",
          label: "Type studio",
          note: "A modular scale with optical line height and tracking, and the licensing question.",
          icon: ICONS.type,
        },
        {
          href: "/app/tokens",
          label: "Token export",
          note: "CSS custom properties, JSON, Tailwind theme and a Style Dictionary source.",
          icon: ICONS.download,
        },
      ]}
    />
  );
}
