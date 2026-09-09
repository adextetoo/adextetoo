"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "waterline.theme";

/**
 * Applies the stored theme before first paint.
 *
 * This runs as a blocking inline script on purpose: reading the preference in
 * an effect means a frame of the wrong theme, which on a product about visual
 * consistency would be an embarrassing thing to ship.
 */
export function ThemeScript() {
  const js = `(function(){try{var t=localStorage.getItem(${JSON.stringify(KEY)});if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}

export type Theme = "dark" | "light";

/**
 * The theme lives on the document element, written before first paint by
 * ThemeScript. React reads it through useSyncExternalStore rather than copying
 * it into state in an effect — the DOM attribute is the source of truth, and
 * this way hydration resolves it without a cascading render.
 */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark";
}

/** During SSR and hydration there is no DOM attribute to read yet. */
function getServerSnapshot(): Theme {
  return "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private browsing — the theme simply will not persist */
    }
    listeners.forEach((l) => l());
  }, []);

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggle };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-line-strong hover:text-ink ${className}`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
