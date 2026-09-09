/**
 * Flow test.
 *
 * Drives the real journeys rather than just loading routes: theme persistence,
 * onboarding, scoring a layer, recomputing contrast, and confirming state
 * threads all the way through to the token export.
 *
 *   npm run start          # in one shell
 *   node scripts/flows.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { existsSync } from "node:fs";
const BASE = process.argv[2] ?? "http://127.0.0.1:3210";
const EXECUTABLE =
  process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const b = await chromium.launch(
  existsSync(EXECUTABLE) ? { executablePath: EXECUTABLE } : {},
);
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", e => errs.push(e.message));
const results = [];
const check = (name, ok, detail = "") => results.push([ok ? "ok  " : "FAIL", name, detail]);

// --- 1. Theme toggle -------------------------------------------------
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
const before = await page.getAttribute("html", "data-theme");
await page.click('button[aria-label*="Switch to"]');
await page.waitForTimeout(300);
const after = await page.getAttribute("html", "data-theme");
check("theme toggle flips", before !== after, `${before} -> ${after}`);
const persisted = await page.evaluate(() => localStorage.getItem("waterline.theme"));
check("theme persists", persisted === after, String(persisted));

// --- 2. Onboarding ---------------------------------------------------
await page.goto(`${BASE}/onboarding`, { waitUntil: "networkidle" });
await page.click("text=Begin");
await page.waitForTimeout(300);
await page.fill('input[placeholder="Northgate University"]', "Riverside Health Trust");
await page.click("text=Health system");
await page.click("text=Continue");
await page.waitForTimeout(300);
check("onboarding advances to scale", await page.isVisible("text=How much of it is there?"));
await page.click("text=Continue");
await page.waitForTimeout(300);
const archVisible = await page.isVisible("text=How do your brands relate to each other?");
check("onboarding reaches architecture", archVisible);
await page.click("text=We have never decided");
await page.waitForTimeout(200);
check("undecided architecture warns",
  await page.isVisible("text=that is the most common answer") ||
  await page.isVisible("text=most common answer"));

// --- 3. Diagnostic changes the score ---------------------------------
await page.goto(`${BASE}/app/diagnostic`, { waitUntil: "networkidle" });
await page.click("text=Start scoring");
await page.waitForTimeout(400);
check("diagnostic shows first layer", await page.isVisible("h1:has-text('Research')"));
await page.click('button:has-text("Governed")');
await page.waitForTimeout(400);
check("evidence fields appear after scoring",
  await page.isVisible('textarea[placeholder*="applicant survey"]'));
await page.goto(`${BASE}/app`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const scoreText = await page.textContent("body");
check("dashboard leaves empty state after one score",
  !scoreText.includes("Nothing has been assessed yet"));

// --- 4. Colour studio recomputes -------------------------------------
await page.goto(`${BASE}/app/identity/colour`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const hexInput = page.locator('input[aria-label="Hex value"]').first();
await hexInput.fill("#FFEE00");
await page.waitForTimeout(500);
const bodyNow = await page.textContent("body");
check("contrast recomputes on hex change", bodyNow.includes("Fail") || bodyNow.includes("AAA"));

// --- 5. Token export reflects state ----------------------------------
await page.goto(`${BASE}/app/tokens`, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const pre = await page.textContent("pre");
check("tokens include the edited colour", pre.includes("#FFEE00"), pre.slice(0, 60));

console.log(results.map(r => `${r[0]} ${r[1]}${r[2] ? "  (" + r[2] + ")" : ""}`).join("\n"));
console.log("\npage errors:", errs.length ? errs : "none");
await b.close();
process.exit(results.some(r => r[0] === "FAIL") || errs.length ? 1 : 0);
