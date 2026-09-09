"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink, Icon, ICONS } from "./ui";
import { ThemeToggle } from "./theme";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line-strong bg-panel-2"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
          {/* The mark is the diagram: a small tip, a large mass, one waterline. */}
          <path d="M12 3 8.4 10h7.2L12 3Z" fill="var(--viz-surface)" />
          <path
            d="M6.2 13h11.6L15 20.4a1 1 0 0 1-.9.6h-4.2a1 1 0 0 1-.9-.6L6.2 13Z"
            fill="var(--viz-deep)"
            fillOpacity="0.85"
          />
          <path d="M3 11.5h18" stroke="var(--ice)" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="serif text-[19px] tracking-tight">Waterline</span>
    </Link>
  );
}

const NAV = [
  { href: "/#thesis", label: "The thesis" },
  { href: "/#system", label: "The 19 layers" },
  { href: "/#method", label: "Method" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--maxw)] items-center gap-6 px-5">
        <Wordmark />

        <nav className="hidden flex-1 items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-[13.5px] text-muted transition hover:bg-panel-2 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="max-sm:hidden" />
          {/* Both calls to action move into the drawer below 640px — at phone
              width the wordmark, two buttons and the menu toggle do not fit. */}
          <ButtonLink href="/app" variant="secondary" size="sm" className="max-md:hidden">
            Open the workspace
          </ButtonLink>
          <ButtonLink href="/onboarding" size="sm" className="max-sm:hidden">
            Start a diagnostic
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted md:hidden"
          >
            <Icon path={open ? ICONS.x : "M3 6h18M3 12h18M3 18h18"} />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-line bg-bg px-5 py-3 md:hidden" aria-label="Primary mobile">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-panel-2 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-panel-2 hover:text-ink"
          >
            Open the workspace
          </Link>
          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
            <ButtonLink
              href="/onboarding"
              size="sm"
              className="flex-1 sm:hidden"
              onClick={() => setOpen(false)}
            >
              Start a diagnostic
            </ButtonLink>
            <ThemeToggle className="sm:hidden" />
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[var(--maxw)] px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="prose-measure mt-3 text-[13px] leading-relaxed text-muted">
              The brand system platform for institutions. Build the eighty per cent
              below the waterline, then govern the twenty per cent above it.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { href: "/app", label: "Workspace" },
              { href: "/app/diagnostic", label: "Brand diagnostic" },
              { href: "/app/strategy", label: "Strategy modules" },
              { href: "/app/identity", label: "Identity studio" },
              { href: "/app/brandbook", label: "Brand book" },
            ]}
          />
          <FooterCol
            title="Governance"
            links={[
              { href: "/app/governance", label: "Sub-brand register" },
              { href: "/app/measure", label: "Brand health" },
              { href: "/app/tokens", label: "Token export" },
            ]}
          />
          <FooterCol
            title="The method"
            links={[
              { href: "/#thesis", label: "Why 80/20" },
              { href: "/#system", label: "The 19 layers" },
              { href: "/#method", label: "How it runs" },
              { href: "/#faq", label: "Questions" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[12px] text-faint">
          <p>
            Waterline is a demonstration product. All institution data stays in this
            browser — nothing is transmitted.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[13px] text-muted transition hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
