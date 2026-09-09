# Waterline

**The brand system platform for institutions.**

Most brand work stops at the logo. A logo, a palette and a typeface are about a
fifth of a brand; the other four fifths — the research, the positioning, the
difference you can actually defend, the voice your rejection letters are written
in — sit below the waterline and decide whether the visible fifth means anything.

Waterline builds that eighty per cent, then makes the twenty per cent above it
provably consistent across every faculty, site and department.

---

## The framework

Nineteen layers, split by the iceberg model.

**Below the waterline — strategy (80%), 12 layers**
Research · Customers · Competition · Offering · Differentiation · Brand Exposé ·
Brand Mission · Brand Vision · Brand Values · Brand Story · Brand Tone & Voice ·
Brand Look & Feel

**Above the waterline — identity (20%), 7 layers**
Logo · Colour · Typography · Website · Social Media · Marketing ·
Packaging & Environment

Order is not alphabetical and not arbitrary: it is the order in which the work
can honestly be done. Dependencies between layers are declared in the model and
drive the sequencing advice.

**Look & Feel sits below the waterline on purpose.** The written art direction is
strategy; the logo it produces is identity. Keeping them apart turns a design
review from a matter of taste into a matter of fit.

### Maturity ladder

Every layer is scored on the same five rungs, which describe observable states
rather than opinions, so two assessors should land in the same place:

| Rung | Name | Test |
|---|---|---|
| 0 | Absent | No artefact, no shared understanding |
| 1 | Ad hoc | Exists informally; cannot be handed over |
| 2 | Documented | A deliberate, findable written artefact exists |
| 3 | Operationalised | Teams use it to make decisions |
| 4 | Governed | Named owner, review cadence, and a measure |

### Scoring

- **Iceberg score** — composite, weighting strategy at 0.8 and identity at 0.2.
  Both tiers are always reported separately as well, so a strong foundation never
  conceals a weak surface.
- **Waterline gap** — `identity − strategy`. The signature metric. A large
  positive gap is the *top-heavy* posture: a polished surface over a hollow
  foundation, and the most expensive state an institution can be in.
- **Posture** — top-heavy, hidden depth, unmanaged, emerging, or aligned. Each
  carries a specific first move.
- **Prioritisation** — ranks layers by framework weight × distance from governed ×
  how many other layers depend on them, so the output is a sequence rather than a
  list of everything that scored badly.
- **Rework exposure** — indicative spend at risk, using a stated coefficient
  (`REWORK_COEFFICIENT`, currently 0.35) that is printed in the UI beside the
  figure so it can be argued with. It is a planning assumption, not a measured
  benchmark.

---

## What is in the app

| Route | What it does |
|---|---|
| `/` | Marketing site with a live, score-driven iceberg |
| `/onboarding` | Six-step institution setup — type, scale, architecture, mandate, investment |
| `/app` | Dashboard: score, posture, risks, next actions, matrix, roadmap |
| `/app/diagnostic` | The nineteen-layer assessment and its report (printable) |
| `/app/strategy` | The twelve depth modules, each with guided prompts |
| `/app/identity` | The seven surface layers |
| `/app/identity/colour` | Colour studio — WCAG matrix, CVD simulation, nearest-accessible fixes |
| `/app/identity/typography` | Type studio — modular scale, optical metrics, licensing checks |
| `/app/brandbook` | Guidelines composed from current state, print-ready |
| `/app/governance` | Sub-brand register and compliance |
| `/app/measure` | Brand health over time |
| `/app/tokens` | Export as CSS, JSON, Tailwind v4, or Style Dictionary |

The tools do real work rather than mocking it: contrast ratios are WCAG 2.2
relative-luminance calculations, colour-vision simulation uses the standard
transform matrices, the type scale derives line height and tracking from size,
and token export is generated from live state on every render.

---

## Design decisions worth knowing

**The interface is the argument.** A deep, cold ground for the strategy work and
bright paper surfaces for identity. The iceberg is a chart, not an illustration —
the tip fills to the identity score and the submerged mass to the strategy score,
so an institution that polished its logo and skipped its positioning sees a bright
tip above a hollow outline.

**Chart colour is computed, not chosen.** Two categorical series (strategy /
identity) and one five-step ordinal maturity ramp, each snapped to passing values
against a colour validator in both themes:

- Dark pair `#3B97BE` / `#BC8639` — CVD ΔE 18.1 protan, 21.4 normal vision
- Light pair `#0A7A9C` / `#B4642A` — CVD ΔE 16.1 protan, 23.0 normal vision
- Maturity ramps are monotone in lightness with the faint end clearing 2:1 on
  their surface

Two series rather than three: the composite is a function of the other two, so a
third line would add ink without information. The gap between the two lines is
drawn as a filled band, because the gap is the subject.

**Persistence is local.** Everything lives in the browser's `localStorage` under
`waterline.brand.v1`. Nothing is transmitted.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run smoke      # every route, two viewports: errors, overflow, screenshots
npm run flows      # the real journeys: onboarding, scoring, contrast, export
```

Both browser scripts need a server running (`npm run start`, port 3210 by
default). `smoke` checks each route for console errors, failed requests,
horizontal overflow and empty renders, writing screenshots to `.smoke/`. `flows`
drives the actual journeys and asserts that state threads through to the token
export. Point either elsewhere with a base-URL argument, and override the browser
binary with `CHROMIUM_PATH`.

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Zustand.

---

## Provenance and limitations

The framework is built from the brand-iceberg diagram supplied in the brief — the
80/20 split and its nineteen named layers — extended with standard brand-strategy
practice and shaped throughout for institutional rather than startup clients.

Two interpretations were necessary because the source diagram contains errors:

- **"Brand Expose"** is treated as *Brand Exposé* and defined precisely as the
  written positioning argument — position, reason to believe, proof.
- **"Brand Mission" appears twice.** The second instance is treated as *Brand
  Values*, which is otherwise missing and which the rest of the model needs.

The four Instagram links in the brief, including the reel that was to be analysed,
could not be retrieved: `instagram.com` is blocked by this environment's network
egress proxy. Nothing from those videos, their captions, or the page the speaker
references is reflected here. If that material is supplied as text, the framework
content lives in `src/lib/framework.deep.ts` and `src/lib/framework.surface.ts`
and is straightforward to extend.

Northgate University, used throughout the worked example, is fictional. Pricing is
illustrative.
