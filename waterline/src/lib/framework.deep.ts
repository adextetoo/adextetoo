import type { Layer } from "./types";

/**
 * The twelve layers below the waterline.
 *
 * Order is not alphabetical and not arbitrary — it is the order in which the
 * work can honestly be done. You cannot differentiate before you understand the
 * field; you cannot write a mission that means anything before you know what
 * you actually offer and to whom.
 */
export const DEEP_LAYERS: Layer[] = [
  {
    id: "research",
    name: "Research",
    tier: "deep",
    order: 1,
    weight: 1,
    summary:
      "The evidence base: what is actually true about your institution, its audiences and its market.",
    rationale:
      "Every layer above this one is an argument, and an argument without evidence is a preference. Research is what lets you tell a leadership team that a decision is right rather than merely popular. In institutions it also does political work: it moves the conversation from whose taste wins to what the evidence says.",
    deliverable:
      "A written evidence pack — stakeholder interviews, audience research, perception audit, internal document review — with findings separated from interpretation, and a stated confidence level on each finding.",
    dependsOn: [],
    institutionalNote:
      "Institutions are usually sitting on far more research than they think: admissions surveys, patient experience data, member polling, service reviews, complaint logs. Start by inventorying what already exists before commissioning anything new — it is faster, cheaper, and it builds allies in the departments that produced it.",
    failureMode:
      "A rebrand justified by 'the board felt the old one looked dated'. It survives exactly as long as the board does.",
    prompts: [
      {
        id: "existing",
        kind: "list",
        question: "What research already exists inside the institution?",
        help: "Inventory before you commission. List the source, who owns it, how old it is, and whether you have actually read it.",
        example:
          "Annual student experience survey (Registry, 2025, read) · Alumni giving segmentation (Advancement, 2023, not read) · Complaints log (Patient Liaison, rolling)",
      },
      {
        id: "gaps",
        kind: "long",
        question: "What do you not know that would change a decision?",
        help: "Only commission research that could change what you do. If a finding would not alter a single decision, it is trivia with a budget line.",
        example:
          "We do not know whether prospective postgraduates distinguish us from the other two civics in the region, or whether they treat all three as interchangeable. This determines whether our problem is distinctiveness or salience — and those need opposite responses.",
      },
      {
        id: "perception",
        kind: "long",
        question: "How is the institution actually perceived today, in others' words?",
        help: "Use verbatim quotes, not summaries. The exact language people use is itself the finding.",
        example:
          "'Good if you can get in the door.' 'It feels like it was built for someone else.' 'Everyone knows the name, nobody knows what it's for.'",
      },
      {
        id: "confidence",
        kind: "short",
        question: "Which single finding are you most confident in, and why?",
        help: "Name the one thing you would defend in front of a hostile board. This becomes the anchor for everything downstream.",
      },
    ],
  },
  {
    id: "customers",
    name: "Customers",
    tier: "deep",
    order: 2,
    weight: 1.2,
    summary:
      "The specific people the brand is built to serve — and, just as importantly, the people it is not.",
    rationale:
      "A brand that addresses everyone addresses no one. Audience definition is the single highest-leverage constraint in the system: it decides the tone, the channels, the proof you need, and the trade-offs you are willing to make. Institutions resist it because excluding anyone feels like a failure of public duty. It is not — serving a defined audience excellently is the duty.",
    deliverable:
      "Named priority audiences with real jobs-to-be-done, the decision they are making, what they fear, what would change their mind, and an explicit list of audiences you are deprioritising.",
    dependsOn: ["research"],
    institutionalNote:
      "Institutions serve layered audiences with conflicting needs simultaneously — a university speaks to applicants, parents, current students, academics, funders, government and alumni at once. Rank them. Unranked audiences default to whoever shouts loudest internally, which is usually the audience with the largest department.",
    failureMode:
      "Personas that describe demographics instead of decisions. 'Sarah, 34, urban professional' tells you nothing about what would make Sarah choose you.",
    prompts: [
      {
        id: "priority",
        kind: "list",
        question: "Who are your priority audiences, in rank order?",
        help: "Rank them. If two are tied for first, you have not finished the exercise.",
        example:
          "1. Prospective postgraduates (international) 2. Research funders 3. Regional employers 4. Alumni donors",
      },
      {
        id: "decision",
        kind: "long",
        question: "What decision is your primary audience actually making?",
        help: "Not 'engaging with the brand' — the real, dated decision with alternatives and consequences.",
        example:
          "Choosing between three funded master's offers, in a six-week window, with the deciding factor being which one their family believes is credible.",
      },
      {
        id: "fear",
        kind: "long",
        question: "What is the unspoken fear or risk they carry into that decision?",
        help: "Institutions are high-stakes choices. Address the fear and you address the decision.",
        example:
          "That they will move continents, spend their savings, and end up somewhere that treats them as a revenue line rather than a student.",
      },
      {
        id: "deprioritise",
        kind: "list",
        question: "Which audiences are you deliberately deprioritising, and who needs to agree?",
        help: "Write down the political cost. This is the sentence that will get challenged in the steering group — draft it now, calmly, rather than under fire.",
      },
    ],
  },
  {
    id: "competition",
    name: "Competition",
    tier: "deep",
    order: 3,
    weight: 0.9,
    summary:
      "The real alternatives your audience weighs — including the option to do nothing.",
    rationale:
      "You are not competing with whoever your peers benchmark against. You are competing with whatever else the audience could do with the same money, time and trust. Mapping the true competitive set is what stops a brand from claiming territory that four neighbours already occupy in identical language.",
    deliverable:
      "A competitive map showing how each real alternative positions itself, the language they own, the whitespace nobody occupies, and an honest note on where they are genuinely better.",
    dependsOn: ["research"],
    institutionalNote:
      "Institutions habitually benchmark against status peers rather than actual alternatives. A regional hospital's real competition is often not the teaching hospital forty miles away — it is a private clinic, a pharmacy, or the decision to wait and hope it passes. Benchmark against the choice, not the league table.",
    failureMode:
      "A category where every player claims excellence, innovation and a student-centred approach, and is therefore indistinguishable at exactly the moment distinctiveness matters.",
    prompts: [
      {
        id: "set",
        kind: "list",
        question: "What are the real alternatives, including doing nothing?",
        help: "Ask the audience, not the leadership team. The two lists are rarely the same.",
        example:
          "Two regional universities · an online provider at a third of the price · a graduate scheme with the same employer · deferring a year",
      },
      {
        id: "language",
        kind: "long",
        question: "What language does the category already own?",
        help: "List the words every competitor uses. These are now unavailable to you — using them makes you invisible, not credible.",
        example:
          "Excellence, world-class, innovative, student-centred, transformative, community. All six appear on all four competitor homepages.",
      },
      {
        id: "better",
        kind: "long",
        question: "Where is a competitor genuinely better than you?",
        help: "Write it down honestly. A strategy built on pretending otherwise fails on first contact with a prospective student who has visited both.",
      },
      {
        id: "whitespace",
        kind: "long",
        question: "What credible territory is nobody occupying?",
        help: "It must be both unoccupied and true of you. Unoccupied but untrue is a lie; true but occupied is a queue.",
      },
    ],
  },
  {
    id: "offering",
    name: "Offering",
    tier: "deep",
    order: 4,
    weight: 1,
    summary:
      "What the institution actually delivers, described in terms of value received rather than services rendered.",
    rationale:
      "Institutions describe themselves by structure — faculties, directorates, service lines — because that is how they are funded and managed. Audiences experience outcomes. The offering layer is the translation between the two, and it is where most institutional messaging quietly fails.",
    deliverable:
      "A structured offering map: each service expressed as the outcome it produces, the proof that it does, and which audience it is for.",
    dependsOn: ["customers"],
    institutionalNote:
      "Beware the org chart leaking into the brand. If your navigation mirrors your internal directorates, you have published your management structure and called it communication.",
    failureMode:
      "A website organised by department, where finding one answer requires the visitor to already know how the institution is administered.",
    prompts: [
      {
        id: "outcomes",
        kind: "list",
        question: "For each core service, what outcome does the audience actually receive?",
        help: "Format: 'We do X, so that Y.' If you cannot complete the 'so that', the service may not belong in the brand story.",
        example:
          "We run a placement year with 400 regional employers, so that graduates arrive at their first interview with two years of references.",
      },
      {
        id: "proof",
        kind: "list",
        question: "What is the hard proof for each claim?",
        help: "Numbers, third-party verification, named examples. A claim without proof is a slogan.",
      },
      {
        id: "weakest",
        kind: "short",
        question: "Which part of the offering is weakest, and is it being fixed or hidden?",
        help: "Brand work applied to a broken service accelerates the discovery of the breakage. Say so now.",
      },
    ],
  },
  {
    id: "differentiation",
    name: "Differentiation",
    tier: "deep",
    order: 5,
    weight: 1.3,
    summary:
      "The specific, defensible reason to choose you rather than the nearest alternative.",
    rationale:
      "This is the load-bearing wall of the whole structure. Every layer above it — positioning, story, voice, and ultimately the logo — is an expression of the difference. Get it wrong and the identity work is decoration applied to a claim nobody believes.",
    deliverable:
      "A written difference that passes three tests: it is true today, a named competitor cannot claim it honestly, and the priority audience cares about it.",
    dependsOn: ["competition", "offering", "customers"],
    institutionalNote:
      "Institutional difference is rarely a single feature — it is usually a combination that would be expensive or slow for anyone else to assemble. Look for the intersection of assets you already hold: a location, an archive, a partnership, a two-hundred-year obligation, a regulatory position.",
    failureMode:
      "'Our people' — claimed by every institution in every sector, provable by none, and meaningless to someone choosing between two of you.",
    prompts: [
      {
        id: "claim",
        kind: "long",
        question: "State the difference in one sentence.",
        help: "Plain language. If it needs a preamble to make sense, it is not yet a difference.",
        example:
          "The only teaching hospital in the region where every consultant also holds a research post — so the treatment you get is the treatment being studied.",
      },
      {
        id: "test-true",
        kind: "long",
        question: "Test one — is it true today, and what proves it?",
        help: "Not aspirational. If it becomes true after a three-year plan, it is a vision, and it belongs in that layer.",
      },
      {
        id: "test-unique",
        kind: "long",
        question: "Test two — name the competitor who could claim this, and why they cannot.",
        help: "If you cannot name a competitor who is blocked from saying it, you have written a category description.",
      },
      {
        id: "test-care",
        kind: "long",
        question: "Test three — why does the priority audience care?",
        help: "Connect it back to the decision and the fear you documented in the Customers layer.",
      },
    ],
  },
  {
    id: "expose",
    name: "Brand Exposé",
    tier: "deep",
    order: 6,
    weight: 1.3,
    summary:
      "The full written argument for the brand — position, reason to believe, and proof, in one document.",
    rationale:
      "The exposé is where the separate findings become a single, defensible case. It is the document you hand to a new communications director, an incoming vice-chancellor, or an agency, and it should be enough for them to make consistent decisions without you in the room. If the strategy only exists as a deck someone talks over, it does not exist.",
    deliverable:
      "A two to four page positioning document: the position, who it is for, the reason to believe, the proof, what it rules out, and what would falsify it.",
    dependsOn: ["differentiation", "customers"],
    institutionalNote:
      "In an institution this is also the succession artefact. Leadership turns over on a three-to-five year cycle; the exposé is what stops each new arrival from restarting the brand from zero. Version it, date it, and name its owner.",
    failureMode:
      "A strategy that lives entirely in the head of one director. They leave, and the institution rebrands again eighteen months later.",
    prompts: [
      {
        id: "position",
        kind: "long",
        question: "Write the positioning statement.",
        help: "For [audience] who [need], we are the [category] that [difference], because [reason to believe]. Constrained format on purpose — it forces the choices.",
      },
      {
        id: "rtb",
        kind: "list",
        question: "What are the reasons to believe?",
        help: "Three to five. Each must be independently verifiable by a sceptic with a search engine.",
      },
      {
        id: "rules-out",
        kind: "list",
        question: "What does this position rule out?",
        help: "A position that forbids nothing constrains nothing. Name the campaigns, partnerships and language it takes off the table.",
      },
      {
        id: "falsify",
        kind: "short",
        question: "What would have to be true for this position to be wrong?",
        help: "Set the tripwire now, while you are honest, rather than defending the position later out of sunk cost.",
      },
    ],
  },
  {
    id: "mission",
    name: "Brand Mission",
    tier: "deep",
    order: 7,
    weight: 1.1,
    summary: "What the institution does, for whom, and why it matters — in the present tense.",
    rationale:
      "Mission is the day-job statement. It answers what we get up to do this year, and it is the test a team can apply to a proposal on a Tuesday afternoon. Its value is entirely in its ability to make someone say no to something.",
    deliverable:
      "One sentence, present tense, naming the beneficiary and the change produced. Plus three worked examples of decisions it would settle.",
    dependsOn: ["expose"],
    institutionalNote:
      "Most institutions already have a mission buried in a strategic plan or a founding charter. Start there. A mission with two centuries of continuity behind it is worth more than a fresh one written in a workshop, and rewriting it without cause spends credibility you will need later.",
    failureMode:
      "A sentence containing 'leverage', 'stakeholders' and 'holistic' that has never once caused anyone to change a decision.",
    prompts: [
      {
        id: "statement",
        kind: "short",
        question: "Write the mission in one present-tense sentence.",
        help: "Under twenty words. Name who benefits and what changes for them.",
        example:
          "We give people in this region access to specialist care without leaving it.",
      },
      {
        id: "decisions",
        kind: "list",
        question: "Name three real decisions this mission would settle.",
        help: "If you cannot produce three, the sentence is decorative and needs rewriting.",
      },
      {
        id: "heritage",
        kind: "long",
        question: "What existing charter, founding purpose or statutory duty does this build on?",
        help: "Continuity is an institutional asset. Show the thread rather than implying the institution began when you arrived.",
      },
    ],
  },
  {
    id: "vision",
    name: "Brand Vision",
    tier: "deep",
    order: 8,
    weight: 0.9,
    summary: "The specific future the institution is working to bring about.",
    rationale:
      "Vision sets direction and time horizon. Its job is to make current sacrifice legible — to explain why the institution is investing in something that will not pay back this year. Without it, long-horizon institutional decisions look like waste to whoever is reading the annual accounts.",
    deliverable:
      "A dated, falsifiable statement of the future state, with two or three indicators that would show you are getting there.",
    dependsOn: ["mission"],
    institutionalNote:
      "Institutions can hold horizons that companies cannot — twenty and fifty year visions are credible from a university or a museum in a way they never are from a scale-up. This is a genuine competitive asset. Use the long horizon rather than borrowing the language of quarterly business.",
    failureMode:
      "'To be the leading provider of...' — undated, unfalsifiable, and identical to the vision of everyone you compete with.",
    prompts: [
      {
        id: "future",
        kind: "long",
        question: "Describe the future state, with a date.",
        help: "Be concrete enough that in that year, someone could reasonably judge whether you got there.",
        example:
          "By 2040, no child in the county needs to travel outside it for paediatric surgery.",
      },
      {
        id: "indicators",
        kind: "list",
        question: "What two or three indicators would show progress?",
        help: "These become the measures in your brand health tracking.",
      },
      {
        id: "sacrifice",
        kind: "long",
        question: "What is the institution giving up now to get there?",
        help: "A vision with no cost attached is a wish. Naming the sacrifice is what makes it believable internally.",
      },
    ],
  },
  {
    id: "values",
    name: "Brand Values",
    tier: "deep",
    order: 9,
    weight: 1,
    summary: "The behaviours the institution holds to, particularly when they are expensive.",
    rationale:
      "Values are only real when they cost something. Their function is to guide behaviour at the exact moment when the convenient choice and the right one diverge. Most institutional value sets fail this test because they list virtues nobody would argue against.",
    deliverable:
      "Three to five values, each written as a behaviour, each with a stated trade-off and an example of the institution actually paying that cost.",
    dependsOn: ["mission"],
    institutionalNote:
      "Institutions are held to their values publicly and for decades. A value the institution cannot live up to under pressure is worse than no value at all — it becomes the headline. Test each one against your last genuine crisis before you publish it.",
    failureMode:
      "'Integrity. Excellence. Respect.' — a list no institution would ever disclaim, and therefore a list that distinguishes nothing and guides nobody.",
    prompts: [
      {
        id: "values",
        kind: "list",
        question: "List three to five values, each phrased as a behaviour.",
        help: "Start each with a verb. 'We say no to...' beats 'Integrity.'",
        example:
          "We publish our outcomes even when they are worse than last year.",
      },
      {
        id: "cost",
        kind: "list",
        question: "For each value, what does holding it cost you?",
        help: "Money, speed, a partnership, a donor. If nothing, delete the value.",
      },
      {
        id: "evidence",
        kind: "list",
        question: "When did the institution last pay that cost?",
        help: "A real, citable instance. This is what turns a value from a claim into a reputation.",
      },
    ],
  },
  {
    id: "story",
    name: "Brand Story",
    tier: "deep",
    order: 10,
    weight: 0.9,
    summary:
      "The narrative that connects where the institution came from to where it is going.",
    rationale:
      "Story is how strategy becomes memorable and repeatable. People do not retransmit positioning statements; they retransmit stories. For an institution the story is also the mechanism by which heritage becomes relevance rather than nostalgia.",
    deliverable:
      "A written narrative in three registers — a sentence, a paragraph, and a page — all telling the same story at different resolutions.",
    dependsOn: ["expose", "vision"],
    institutionalNote:
      "The trap is telling the institution's story to itself. Founding dates, benefactors and building programmes matter internally and almost nowhere else. The audience's question is not 'what happened to you' but 'what does that mean for me'.",
    failureMode:
      "A history page that begins in 1847 and reaches the present day without once mentioning a person the reader could be.",
    prompts: [
      {
        id: "sentence",
        kind: "short",
        question: "The story in one sentence.",
        help: "The version someone repeats to a colleague, accurately, a week later.",
      },
      {
        id: "paragraph",
        kind: "long",
        question: "The story in a paragraph.",
        help: "Tension, turn, and consequence. Something must have been at stake.",
      },
      {
        id: "relevance",
        kind: "long",
        question: "Why does the history matter to the audience today?",
        help: "Convert heritage into a present-tense promise, or cut it.",
        example:
          "Founded by the mill workers who paid for it out of their wages — which is why our access programme is not a scheme, it is the original terms.",
      },
    ],
  },
  {
    id: "tone-voice",
    name: "Brand Tone & Voice",
    tier: "deep",
    order: 11,
    weight: 1,
    summary:
      "How the institution sounds — the fixed character, and how it flexes by situation.",
    rationale:
      "Voice is the part of the brand that appears in the most places: every letter, form, email, sign, refusal and apology. It is encountered far more often than the logo, and in institutions it is the single largest source of felt experience. Yet it is usually the last thing anyone writes down.",
    deliverable:
      "A voice definition with three to four traits, each with 'we do / we don't' pairs, plus a tone matrix showing how the voice shifts across routine, celebratory and bad-news situations.",
    dependsOn: ["values", "customers"],
    institutionalNote:
      "Institutional voice fails most visibly in bad news and bureaucracy — rejection letters, service changes, waiting times, fee increases. Design the voice for those moments first. If it holds there, everything else is straightforward.",
    failureMode:
      "A warm, human homepage attached to correspondence that opens 'Dear Applicant' and closes with a reference number.",
    prompts: [
      {
        id: "traits",
        kind: "list",
        question: "Name three or four voice traits, each with its opposite pair.",
        help: "Format: 'Direct, not blunt.' The second half does the real work by setting the boundary.",
        example: "Plain, not simplistic · Warm, not familiar · Certain, not smug",
      },
      {
        id: "badnews",
        kind: "long",
        question: "Rewrite one real piece of bad-news correspondence in this voice.",
        help: "Take an actual rejection or service-change letter. This single exercise reveals more than a workshop.",
      },
      {
        id: "never",
        kind: "list",
        question: "What words and constructions does the institution never use?",
        help: "A banned list is more enforceable than an aspiration. Include the jargon your own staff use daily.",
      },
    ],
  },
  {
    id: "look-feel",
    name: "Brand Look & Feel",
    tier: "deep",
    order: 12,
    weight: 0.9,
    summary:
      "The agreed visual direction — the brief that the identity work above the waterline must answer to.",
    rationale:
      "This sits below the waterline deliberately. Look and feel is not the logo; it is the strategic direction for the logo — the character, references, and constraints agreed before anyone opens a design tool. Settling it here converts the identity review from a matter of taste into a matter of fit.",
    deliverable:
      "A written art direction: three to five character words traced back to the strategy, visual territories to explore, explicit exclusions, and the accessibility and reproduction constraints the system must meet.",
    dependsOn: ["expose", "values", "tone-voice"],
    institutionalNote:
      "This is the artefact that survives a change of vice-chancellor or an agency handover. When a new leader dislikes the identity, the conversation is not 'do you like it' but 'has the direction changed, and if so, which part of the strategy moved'. That reframing is worth the entire exercise.",
    failureMode:
      "A design review where six senior people give six opinions, none of them referring to anything written down, and the loudest wins.",
    prompts: [
      {
        id: "character",
        kind: "list",
        question: "Three to five character words, each traced to a strategic reason.",
        help: "Format: 'Word — because [line from the strategy].' Untraced words are taste.",
        example:
          "Unshowy — because the difference is competence, and ornament reads as compensation.",
      },
      {
        id: "territories",
        kind: "long",
        question: "What visual territories should be explored?",
        help: "Describe direction and reference, not solutions. You are writing the brief, not answering it.",
      },
      {
        id: "exclusions",
        kind: "list",
        question: "What is explicitly out of bounds?",
        help: "Exclusions save more time in review than any amount of positive direction.",
      },
      {
        id: "constraints",
        kind: "list",
        question: "What reproduction and accessibility constraints must the system meet?",
        help: "Signage, embroidery, single-colour print, small-scale digital, statutory accessibility standards. Institutions apply identities in far harsher conditions than a screen mockup suggests.",
      },
    ],
  },
];
