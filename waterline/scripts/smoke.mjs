/**
 * Route smoke test.
 *
 * Loads every route in a real browser at two widths, seeds the worked example so
 * the data-driven views have something to render, and fails on console errors,
 * failed requests, or horizontal overflow. Screenshots land in .smoke/ for a
 * visual pass.
 *
 *   node scripts/smoke.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://127.0.0.1:3210";
const OUT = ".smoke";

const ROUTES = [
  ["/", "landing"],
  ["/onboarding", "onboarding"],
  ["/app", "dashboard"],
  ["/app/diagnostic", "diagnostic"],
  ["/app/strategy", "strategy-index"],
  ["/app/strategy/differentiation", "strategy-layer"],
  ["/app/identity", "identity-index"],
  ["/app/identity/colour", "colour-studio"],
  ["/app/identity/typography", "type-studio"],
  ["/app/identity/logo", "identity-layer"],
  ["/app/brandbook", "brandbook"],
  ["/app/governance", "governance"],
  ["/app/measure", "measure"],
  ["/app/tokens", "tokens"],
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

// Noise that is not a real defect.
const IGNORE = [/favicon/i, /Download the React DevTools/i];

mkdirSync(OUT, { recursive: true });

// The image ships a pinned Chromium that may not match the npm package's
// expected build, so point at it explicitly rather than downloading one.
const EXECUTABLE =
  process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const browser = await chromium.launch(
  existsSync(EXECUTABLE) ? { executablePath: EXECUTABLE } : {},
);
let failures = 0;
let checks = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });

  // Seed the worked example once per context so the data views are populated.
  await context.addInitScript(() => {
    try {
      if (!localStorage.getItem("waterline.theme")) {
        localStorage.setItem("waterline.theme", "dark");
      }
    } catch {}
  });

  const page = await context.newPage();
  await page.goto(`${BASE}/app?demo=1`, { waitUntil: "networkidle" });

  for (const [route, name] of ROUTES) {
    checks++;
    const errors = [];

    const onConsole = (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (IGNORE.some((r) => r.test(text))) return;
      errors.push(`console: ${text}`);
    };
    const onFailed = (req) => {
      if (IGNORE.some((r) => r.test(req.url()))) return;
      // Router prefetches are cancelled whenever the page navigates away. That
      // is normal browser behaviour, not a broken request.
      const reason = req.failure()?.errorText ?? "unknown";
      if (reason === "net::ERR_ABORTED") return;
      errors.push(`request failed (${reason}): ${req.url()}`);
    };
    const onPageError = (err) => errors.push(`pageerror: ${err.message}`);

    page.on("console", onConsole);
    page.on("requestfailed", onFailed);
    page.on("pageerror", onPageError);

    try {
      const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
      if (!res || res.status() >= 400) {
        errors.push(`HTTP ${res ? res.status() : "no response"}`);
      }

      await page.waitForTimeout(400);

      // Horizontal overflow: the body must never scroll sideways.
      const overflow = await page.evaluate(() => {
        const d = document.documentElement;
        return d.scrollWidth - d.clientWidth;
      });
      if (overflow > 2) errors.push(`horizontal overflow: ${overflow}px`);

      // The page must render something substantial.
      const textLength = await page.evaluate(
        () => document.body.innerText.trim().length,
      );
      if (textLength < 120) errors.push(`suspiciously empty: ${textLength} chars`);

      await page.screenshot({
        path: `${OUT}/${vp.name}-${name}.png`,
        fullPage: vp.name === "desktop",
      });
    } catch (e) {
      errors.push(`threw: ${e.message}`);
    }

    page.off("console", onConsole);
    page.off("requestfailed", onFailed);
    page.off("pageerror", onPageError);

    if (errors.length) {
      failures++;
      console.log(`FAIL  ${vp.name.padEnd(8)} ${route}`);
      for (const e of errors) console.log(`        ${e}`);
    } else {
      console.log(`ok    ${vp.name.padEnd(8)} ${route}`);
    }
  }

  await context.close();
}

await browser.close();
console.log(`\n${checks - failures}/${checks} checks passed.`);
process.exit(failures > 0 ? 1 : 0);
