"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Wordmark } from "./site";
import { Icon, ICONS, Badge } from "./ui";
import { ThemeToggle } from "./theme";
import { useBrand } from "@/store/brand";
import { computeScores } from "@/lib/scoring";

/**
 * True once the persisted store has rehydrated from localStorage.
 *
 * Read through useSyncExternalStore so hydration resolves in one pass. The
 * persist API is absent during prerender — zustand skips attaching it when there
 * is no storage to read — so every access is guarded, and its absence counts as
 * "hydrated" since nothing will ever arrive.
 */
function subscribeHydration(cb: () => void) {
  const api = useBrand.persist as typeof useBrand.persist | undefined;
  if (!api) return () => {};
  return api.onFinishHydration(cb);
}

function hydrationSnapshot() {
  const api = useBrand.persist as typeof useBrand.persist | undefined;
  return api ? api.hasHydrated() : true;
}

function hydrationServerSnapshot() {
  return false;
}

export function useHydrated() {
  return useSyncExternalStore(
    subscribeHydration,
    hydrationSnapshot,
    hydrationServerSnapshot,
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const GROUPS: { title: string; tone?: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      { href: "/app", label: "Dashboard", icon: ICONS.grid },
      { href: "/app/diagnostic", label: "Diagnostic", icon: ICONS.compass },
    ],
  },
  {
    title: "Below the waterline",
    tone: "var(--viz-deep)",
    items: [{ href: "/app/strategy", label: "Strategy · 12 layers", icon: ICONS.layers }],
  },
  {
    title: "Above the waterline",
    tone: "var(--viz-surface)",
    items: [
      { href: "/app/identity", label: "Identity · 7 layers", icon: ICONS.palette },
      { href: "/app/identity/colour", label: "Colour studio", icon: ICONS.palette },
      { href: "/app/identity/typography", label: "Type studio", icon: ICONS.type },
    ],
  },
  {
    title: "Output",
    items: [
      { href: "/app/brandbook", label: "Brand book", icon: ICONS.book },
      { href: "/app/tokens", label: "Token export", icon: ICONS.download },
    ],
  },
  {
    title: "Govern",
    items: [
      { href: "/app/governance", label: "Sub-brand register", icon: ICONS.shield },
      { href: "/app/measure", label: "Brand health", icon: ICONS.pulse },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const institution = useBrand((s) => s.institution);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="flex h-14 items-center gap-3 px-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted lg:hidden"
          >
            <Icon path={open ? ICONS.x : "M3 6h18M3 12h18M3 18h18"} />
          </button>

          <Wordmark />

          {hydrated && institution.name ? (
            <>
              <span className="hidden text-line-strong sm:inline">/</span>
              <span className="hidden truncate text-[13.5px] text-muted sm:inline">
                {institution.name}
              </span>
            </>
          ) : null}

          <div className="ml-auto flex items-center gap-2">
            <ScorePill />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1560px] flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-y-auto border-r border-line bg-bg p-4 pt-20 transition-transform duration-200 lg:sticky lg:top-14 lg:z-auto lg:h-[calc(100dvh-3.5rem)] lg:translate-x-0 lg:pt-4 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav aria-label="Workspace">
            {GROUPS.map((g) => (
              <div key={g.title} className="mb-5">
                <p className="eyebrow mb-2 flex items-center gap-1.5 px-2.5">
                  {g.tone ? (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: g.tone }}
                    />
                  ) : null}
                  {g.title}
                </p>
                <ul className="space-y-0.5">
                  {g.items.map((item) => {
                    const active =
                      item.href === "/app"
                        ? pathname === "/app"
                        : pathname === item.href ||
                          (pathname.startsWith(item.href + "/") &&
                            !GROUPS.some((gg) =>
                              gg.items.some(
                                (ii) => ii.href !== item.href && ii.href === pathname,
                              ),
                            ));
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] transition ${
                            active
                              ? "bg-panel-2 font-medium text-ink"
                              : "text-muted hover:bg-panel-2 hover:text-ink"
                          }`}
                        >
                          <span className={active ? "text-signal" : "text-faint"}>
                            <Icon path={item.icon} size={15} />
                          </span>
                          <span className="truncate">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-6 border-t border-line pt-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-2.5 text-[12.5px] text-faint transition hover:text-ink"
            >
              <Icon path={ICONS.arrowLeft} size={13} />
              Back to the site
            </Link>
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        ) : null}

        <main id="main" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {hydrated ? children : <ShellSkeleton />}
        </main>
      </div>
    </div>
  );
}

function ScorePill() {
  const hydrated = useHydrated();
  const state = useBrand();
  if (!hydrated) return null;
  const scores = computeScores(state);
  if (scores.assessedCount === 0) return null;

  return (
    <Link
      href="/app/diagnostic"
      className="flex items-center gap-2 rounded-full border border-line px-3 py-1 transition hover:border-line-strong max-sm:hidden"
      title="Iceberg score — weighted 80% strategy, 20% identity"
    >
      <span className="eyebrow">Iceberg</span>
      <span className="tnum text-[15px] font-semibold">{Math.round(scores.composite)}</span>
      <Badge tone={scores.balance > 18 ? "warn" : "neutral"} className="hidden md:inline-flex">
        {scores.posture.label}
      </Badge>
    </Link>
  );
}

function ShellSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden>
      <div className="h-8 w-64 rounded-lg bg-panel-2" />
      <div className="h-4 w-96 rounded bg-panel-2" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-panel-2" />
        ))}
      </div>
      <div className="h-72 rounded-xl bg-panel-2" />
    </div>
  );
}
