import type { Layer } from "./types";

/**
 * The seven layers above the waterline.
 *
 * This is the part everybody means when they say "brand". It is roughly a fifth
 * of the work, and it only functions when the twelve layers below it are
 * settled — which is the entire argument this product exists to make.
 */
export const SURFACE_LAYERS: Layer[] = [
  {
    id: "logo",
    name: "Logo",
    tier: "surface",
    order: 1,
    weight: 1.2,
    summary:
      "The primary mark and its family of lockups, sized and spaced for every real application.",
    rationale:
      "The logo does not carry meaning on its own; it accrues meaning from everything the institution does. Its actual job is identification and consistency — being unmistakably you at forty metres on a building and at sixteen pixels in a browser tab.",
    deliverable:
      "A mark with defined clearspace, minimum sizes, an approved lockup family (including sub-brand and partnership lockups), single-colour and reversed variants, and a written list of misuses.",
    dependsOn: ["look-feel"],
    institutionalNote:
      "Institutions need a lockup system far more than they need a logo. The real questions are how a faculty, a hospital site, a funded programme or a joint venture signs itself. Ungoverned, each unit answers that question alone, and you acquire ninety logos in five years.",
    failureMode:
      "A beautiful mark with no lockup rules, so every department commissions its own variant and the system fragments within eighteen months.",
    prompts: [
      {
        id: "applications",
        kind: "list",
        question: "What are the hardest real applications this mark must survive?",
        help: "Name actual instances: building signage, vehicle livery, embroidered uniform, single-colour stamp, favicon, partner co-branding.",
      },
      {
        id: "lockups",
        kind: "list",
        question: "What lockups does the architecture require?",
        help: "Derive these from your brand architecture model, not from requests as they arrive.",
        example:
          "Master · Faculty endorsement · Site/location · Research institute · Funded-programme co-brand · Partnership pair",
      },
      {
        id: "misuse",
        kind: "list",
        question: "What are the prohibited uses?",
        help: "Write the rules against the misuses you have actually seen in the wild, not the generic list.",
      },
    ],
  },
  {
    id: "colour",
    name: "Colour",
    tier: "surface",
    order: 2,
    weight: 1.1,
    summary:
      "A colour system defined by role and contrast, not by a row of swatches.",
    rationale:
      "Colour is the fastest recognition cue a brand has, and the one most often specified in a way that cannot be implemented. A palette becomes a system only when each colour has a stated role, a tested contrast behaviour, and a rule for what happens when two of them meet.",
    deliverable:
      "Roles rather than swatches — primary, secondary, surface, text, and functional states — each with verified contrast pairings and accessible combinations documented.",
    dependsOn: ["look-feel"],
    institutionalNote:
      "Public-sector and education institutions are usually under a statutory accessibility duty. Contrast is not a design preference here, it is a compliance obligation — and it is far cheaper to satisfy at palette definition than after two hundred pages have been built.",
    failureMode:
      "A brand colour that fails contrast against white, so every team quietly darkens it by eye and the institution ends up with eleven versions of its own blue.",
    prompts: [
      {
        id: "roles",
        kind: "list",
        question: "What role does each colour play?",
        help: "Every colour needs a job. Colours without a job get used arbitrarily.",
        example:
          "Deep navy — the institutional constant, used for authority and mastheads. Signal cyan — used only for actions, never decoratively.",
      },
      {
        id: "accessibility",
        kind: "long",
        question: "Which pairings are approved for text, and which are decorative only?",
        help: "Use the contrast matrix in the Colour studio to verify rather than estimate.",
      },
      {
        id: "heritage",
        kind: "short",
        question: "Which colours are non-negotiable for heritage or statutory reasons?",
        help: "Some institutional colours are set by charter, livery, or law. Lock those before designing around them.",
      },
    ],
  },
  {
    id: "typography",
    name: "Typography",
    tier: "surface",
    order: 3,
    weight: 1.1,
    summary:
      "A type system: families, a scale with defined roles, and licensing that actually covers your use.",
    rationale:
      "Typography carries more of an institution's tone than any other visual element, because most of what an institution publishes is text. A type system is what stops a hundred authors from making a hundred individual decisions about what a heading looks like.",
    deliverable:
      "A modular scale with named roles, weights, line heights and tracking; a fallback stack; and licensing verified for web, print, signage and third-party agencies.",
    dependsOn: ["look-feel", "tone-voice"],
    institutionalNote:
      "Licensing is where institutional type systems break. A licence covering one marketing team rarely covers forty departments, an outsourced print supplier, and a student union. Check the seat count and the web page-view tier before you commit, and budget for renewal.",
    failureMode:
      "A specified typeface that nobody outside the design team can legally install, so every document produced by the wider institution silently defaults to Calibri.",
    prompts: [
      {
        id: "pairing",
        kind: "long",
        question: "What is the family pairing, and what does each family do?",
        help: "Give each family a job — one for voice and headline character, one for sustained reading and interface.",
      },
      {
        id: "licence",
        kind: "long",
        question: "Does the licence cover every party that will set type?",
        help: "Count the seats: internal teams, every department, print suppliers, agencies, web page views, and any embedded use.",
      },
      {
        id: "fallback",
        kind: "short",
        question: "What is the fallback stack when the licensed face is unavailable?",
        help: "Specify it deliberately. Every institution has thousands of documents produced outside the design team.",
      },
    ],
  },
  {
    id: "website",
    name: "Website",
    tier: "surface",
    order: 4,
    weight: 1.2,
    summary:
      "The primary place the brand is experienced rather than merely seen.",
    rationale:
      "For most institutions the website is the brand for the majority of audiences the majority of the time. It is where strategy is tested most severely, because a site cannot be vague — it must have a structure, and structure is a set of decisions about what matters.",
    deliverable:
      "An information architecture derived from audience decisions, key templates on the design system, measured performance and accessibility, and a governance model for who may publish.",
    dependsOn: ["customers", "offering", "colour", "typography"],
    institutionalNote:
      "Institutional websites fail structurally rather than visually. They mirror the org chart, accumulate a decade of orphaned microsites, and are edited by hundreds of people with no shared standard. Fixing the visual layer without fixing publishing governance buys about a year.",
    failureMode:
      "A redesigned homepage sitting on top of forty thousand unreviewed pages, each still carrying the previous two identities.",
    prompts: [
      {
        id: "ia",
        kind: "long",
        question: "Is the navigation organised around audience decisions or internal structure?",
        help: "Read your top-level navigation aloud. If it names directorates, it is an org chart.",
      },
      {
        id: "governance",
        kind: "long",
        question: "Who is allowed to publish, and what must they meet?",
        help: "Count the editors. Then decide the standard and how it is enforced technically rather than by request.",
      },
      {
        id: "legacy",
        kind: "short",
        question: "How many legacy pages and microsites exist, and what is the plan for them?",
        help: "Get the real number from analytics before committing to a migration date.",
      },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    tier: "surface",
    order: 5,
    weight: 0.9,
    summary:
      "The brand as operated daily by many hands, in public, at speed.",
    rationale:
      "Social is where brand consistency is hardest, because the volume is high, the authors are many and junior, and the response window is short. It is also where institutional voice is most visibly tested — a single reply can undo a year of positioning.",
    deliverable:
      "An account architecture with a rationale for every account's existence, per-channel voice guidance, an approval and escalation path, and a template kit that makes the correct thing the easy thing.",
    dependsOn: ["tone-voice", "colour", "typography"],
    institutionalNote:
      "Account sprawl is the institutional pathology here. Most large institutions have several hundred accounts, many dormant, most unowned, several impersonating the institution to the public with no one at the controls. Audit and consolidate before you brief a single post.",
    failureMode:
      "Two hundred and forty accounts, sixty active, eleven with the old logo, and one abandoned in 2019 still ranking first in search for the institution's name.",
    prompts: [
      {
        id: "audit",
        kind: "short",
        question: "How many accounts exist, and how many have a named owner?",
        help: "The gap between those two numbers is your actual risk exposure.",
      },
      {
        id: "escalation",
        kind: "long",
        question: "What is the escalation path when something goes wrong at 9pm on a Saturday?",
        help: "Write the path and rehearse it. Institutional crises rarely occur in office hours.",
      },
      {
        id: "kit",
        kind: "long",
        question: "What does a junior author need so the on-brand option is the fastest option?",
        help: "Compliance is a design problem. If the correct route is slower than the wrong one, the wrong one wins.",
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    tier: "surface",
    order: 6,
    weight: 1,
    summary:
      "Campaign expression — how the system stretches for a campaign without breaking.",
    rationale:
      "Campaigns need distinctiveness; brands need consistency. The marketing layer defines how far a campaign may travel from the core system and what must remain fixed, so that recognition compounds across years instead of resetting each cycle.",
    deliverable:
      "A campaign framework stating the fixed assets, the flexible zone, the recurring campaign calendar, and how campaign work is judged against the strategy.",
    dependsOn: ["expose", "look-feel", "colour", "typography"],
    institutionalNote:
      "Institutions run recurring, calendar-locked campaigns — admissions cycles, appeals, open days, public health pushes, annual reports. Because they repeat, they compound: a framework that holds across five cycles is worth more than five individually clever campaigns.",
    failureMode:
      "A striking campaign that shares nothing with the institution's identity, so the recognition it earns belongs to the campaign and evaporates when it ends.",
    prompts: [
      {
        id: "fixed",
        kind: "list",
        question: "What is fixed in every campaign, without exception?",
        help: "Usually the mark, the type system, and one anchoring colour. Keep the list short enough to be obeyed.",
      },
      {
        id: "flex",
        kind: "long",
        question: "What may a campaign change?",
        help: "Define the permitted range explicitly, so that stretching the system is a decision rather than an accident.",
      },
      {
        id: "calendar",
        kind: "list",
        question: "What are the recurring campaign moments in the institutional year?",
        help: "These repeat. Design for the cycle rather than for one instance of it.",
      },
    ],
  },
  {
    id: "packaging",
    name: "Packaging & Environment",
    tier: "surface",
    order: 7,
    weight: 0.7,
    summary:
      "The physical brand — signage, wayfinding, print, uniforms, vehicles and the built estate.",
    rationale:
      "For institutions the physical estate is the most permanent and most expensive expression of the brand, and the slowest to change. A sign installed this year will outlast the next two identities. Getting the physical system right is therefore a capital decision, not a design one.",
    deliverable:
      "A physical application system: signage and wayfinding standards, material and finish specifications, print templates, uniform and vehicle guidance, and a phased replacement plan tied to the estates cycle.",
    dependsOn: ["logo", "colour", "typography"],
    institutionalNote:
      "Never rebrand the physical estate in a single programme. Tie replacement to the existing maintenance and refurbishment cycle: it converts a large discretionary spend that will be challenged into a marginal cost on budgets that already exist, and it survives a change of finance director.",
    failureMode:
      "A campus carrying three generations of identity simultaneously, with no plan and no record of which sign belongs to which era.",
    prompts: [
      {
        id: "estate",
        kind: "short",
        question: "What is the scale of the physical estate carrying brand?",
        help: "Sites, buildings, signs, vehicles, uniforms. Get the count before you plan.",
      },
      {
        id: "phasing",
        kind: "long",
        question: "How does replacement map onto the estates maintenance cycle?",
        help: "Phase it against work already budgeted. This is the difference between an approved plan and a rejected one.",
      },
      {
        id: "durability",
        kind: "long",
        question: "What must survive twenty years of weather, cleaning and wear?",
        help: "Specify materials and finishes, not just artwork. Physical brand fails through material choice more often than through design.",
      },
    ],
  },
];
