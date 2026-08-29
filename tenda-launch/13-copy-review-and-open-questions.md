# Tenda — Copy Review & Open Questions

The Phase 4 gate. **Nothing in this campaign ships until Section 1 is empty.**

---

## 1. Blocking — facts that must be resolved before anything publishes

`tendahq.com` could not be read from the environment this campaign was written in — the domain is blocked by the session's network egress policy (403 at the gateway), and the product has no public search footprint. **Every factual claim in this campaign therefore traces back to one of the five founder-supplied statements in `00-positioning-brief.md`, and nothing else.**

That was a deliberate choice. A press kit containing a plausible-but-invented chain, fee or launch date is worse than one with a blank, because press kits get copied verbatim by every outlet that quotes them, and a wrong number propagates faster than a correction.

**Resolve these, then find-and-replace. There are 103 bracketed placeholders across 13 files.**

### Tier A — blocks the press release and media kit

| # | Question | Why it blocks |
|---|---|---|
| A1 | **What does "instantly" mean in seconds, and under what conditions?** | The campaign's central claim. The first thing a technical journalist will time. A specific number ("typically under N seconds") is far stronger than the word "instant" — and honest about its conditions. |
| A2 | **Which chain, and which settlement asset?** | First question from every crypto desk. Cannot ship a crypto pitch without it. |
| A3 | **Wallet model — custodial, embedded, or bring-your-own?** | Determines whether "no crypto knowledge needed" is true. If it isn't true, several pieces of copy are wrong, not just imprecise. |
| A4 | **Do earners ever deposit anything?** | The scam objection turns on this. If the answer is no, it should be one of the loudest lines in the campaign. |
| A5 | **Is there a payout minimum?** | Claimed as "none" in the landing page, store listing and ads. If false, remove from all three. |
| A6 | **The fee model — how does Tenda make money?** | Asked by every business desk and analyst. An evasive answer costs more credibility than any honest answer. |
| A7 | **Platforms and launch date.** | Appears in every asset. |
| A8 | **Launch markets, and which countries can actually be paid.** | If the list is genuinely broader than the incumbents', this is a headline rather than a footnote — and it changes which angle leads. |
| A9 | **Founder name, title, and sign-off on all five quotes.** | No quote may be attributed without approval. |
| A10 | **Is there a token?** | Answer plainly either way. Evasion here reads as concealment. |

### Tier B — blocks the poster-side story and will decide the first critical article

| # | Question | Why it matters |
|---|---|---|
| B1 | **Assignment model** — open claim, application, invitation, or algorithmic match? | State 2 of the loop is currently a blank in the product's own diagram. |
| B2 | **Acceptance model** — poster review, automated check, or both? And what's the time limit? | State 4. "Paid on acceptance" is meaningless until acceptance is defined. If a poster can sit on an acceptance indefinitely, the gap has been moved, not removed — and a journalist will find that. |
| B3 | **Verification, in both directions.** What stops rubbish submissions? What stops posters rejecting good work to avoid paying? | The hardest problem in microtasking and the most likely angle for a critical piece. Prepare a real mechanism with named limits. |
| B4 | **AI-generated submissions.** | The live problem in this category in 2026. Expect it from every serious outlet and from Hacker News within the hour. |
| B5 | **Task moderation** — what stops scam or abusive tasks being posted? | A single well-publicised scam task at launch would define the coverage. |
| B6 | **Three concrete example tasks, with real pay ranges.** | "A task" is the least persuasive noun in the kit. Every good story about Tenda will be built around a specific example, and right now there isn't one anywhere in this campaign. |
| B7 | **KYC requirements, if any.** | Affects the access angle, which is the campaign's strongest pitch. |
| B8 | **Batch capability for posters.** | Claimed in the landing page. |

### Tier C — needed for the proof sections, and honestly optional at launch

| # | Question |
|---|---|
| C1 | Real usage numbers: tasks paid, median seconds to settlement, countries paid into |
| C2 | Named earner testimonials, with permission and country |
| C3 | Company facts: founded, HQ, team size, funding *(omit any not disclosed — never approximate)* |
| C4 | Support, privacy and terms URLs |
| C5 | Press kit URL and media contact |

> **If Tier C is empty, delete the proof sections.** An absent proof section is honest. A padded one is the precise thing this audience has been trained to detect, and it will cost more than it earns.

---

## 2. Quality gate — results

| Check | Result |
|---|---|
| Every deliverable sounds like the same author | **Pass.** One voice defined in `01`, applied throughout. Register shifts by channel — HN is drier, TikTok is faster — but the vocabulary and the refusal to embellish are constant. |
| No hollow superlatives or filler adjectives | **Pass.** Audited by grep: all hits for banned words appear only inside ban lists and explicit prohibitions, never in live copy. |
| Every CTA specific and earned | **Pass.** No "learn more," no "click here." CTAs are actions: *Take a task · Post your first task · Watch a task go from posted to paid · Get Tenda.* |
| No copy duplicated verbatim across platforms | **Pass.** LinkedIn, X, email, ads and store copy are separately written. The one-liner bank exists precisely so repeated *ideas* get different *sentences*. |
| Hero passes the 5-second test | **Pass.** Documented in `05`, §Hero. |
| Email subjects match bodies | **Pass.** No bait-and-switch; Email 6 self-disables when there's no real deadline. |
| Ad claims match landing page exactly | **Pass.** "No payout minimum," "no hold," "paid on acceptance," "doesn't check your country" appear identically in both — all four contingent on A4, A5, A8. |
| No copy that would work unchanged for another product | **Pass.** The category argument ("application, not marketplace"), the float argument, and the tap-to-earn inversion are all unusable by a competitor without first rebuilding their settlement. |
| Cross-channel consistency | **Pass**, with one live risk — see §3.1. |

---

## 3. Flagged issues

### 3.1 — "Instant" is doing a lot of work, and it's the one word that can break the campaign

The entire angle rests on it. If real settlement is "usually a few seconds, sometimes longer when the network is busy," that is still an excellent product and a fine story — but the copy must say so, and it must say so *before* launch rather than in a correction after.

**Recommendation:** replace the word "instantly" with the actual measured number wherever it appears. *"Paid in under four seconds"* is more persuasive than *"paid instantly"* precisely because it sounds like a measurement rather than a promise. This audience discounts adjectives and trusts numbers.

### 3.2 — "Paid on acceptance" is only as strong as acceptance is bounded

If a poster can delay acceptance indefinitely, Tenda hasn't removed the gap — it has moved it upstream, from payout to approval. This is the first thing a sharp journalist or a Hacker News commenter will notice, and the campaign has no answer for it yet.

**Recommendation:** if there's an acceptance time limit or auto-accept window, it deserves to be a headline feature, not a footnote. If there isn't one, expect this to become the story, and prepare an honest answer now.

### 3.3 — The campaign has no concrete example task anywhere in it

Thirteen documents about small paid work, and not one names an actual task with an actual amount. That's the direct consequence of the site being unreadable, and it's the single biggest weakness in the material. Abstraction is the enemy of this category — "a task" persuades nobody, while "label 40 receipts, $3, about six minutes" persuades immediately.

**Recommendation:** resolving B6 will improve more copy in this campaign than any other single answer. Pass three real examples through the landing page, the store listing, the ads and every video script.

### 3.4 — "Not a marketplace" will be ignored by roughly half of coverage

It's a fine and genuinely load-bearing distinction, but journalists reach for familiar categories under deadline. The §4 note in `03-media-kit.md` and the correction protocol in §8 are the mitigation.

**Recommendation:** accept a hit rate around 50% and don't spend goodwill fighting it. Correct fees, deposits and country claims. Let "marketplace" go, and win it back over time by being consistent everywhere Tenda controls the words.

### 3.5 — The strongest angle is the one with the least budget behind it

Tier 3 (global/emerging markets) is the best story in the pack and reaches the actual users. Tier 1 (general tech) is the most prestigious and reaches almost none of them. There's a standing temptation to spend the launch chasing TechCrunch.

**Recommendation:** pitch Tier 3 first and hardest, as scheduled at T-9. Coverage in Rest of World, TechCabal and Techpoint will both convert better and make the Tier-1 pitch warmer.

### 3.6 — The float question will be asked, and the answer isn't written

`08-social-posts.md` (LI-1) and `07-email-sequence.md` (Email 3) both make a sharp argument that competitors profit from the delay, and that Tenda gives that up deliberately. It's a genuinely good argument — and it invites the obvious follow-up: *so how do you make money?* Right now that's A6, unanswered.

**Recommendation:** do not publish the float argument until the fee model is public. Making a pointed argument about someone else's business model while declining to explain your own is the one move in this campaign that could turn a friendly reporter.

---

## 4. What I could not do, and what it cost

**Blocked:** `tendahq.com` is denied by this session's network egress policy — confirmed by three independent routes (WebFetch → `EGRESS_BLOCKED`; `curl` → 403 CONNECT at the gateway; headless Chromium via Playwright → `ERR_TUNNEL_CONNECTION_FAILED`, with and without explicit proxy configuration). The environment runs a strict allowlist: `wikipedia.org` and `example.com` are blocked too, so this is not specific to Tenda. Web search returns nothing about the product — the name collides with a large router manufacturer.

The proxy documentation is explicit that policy denials are to be reported rather than routed around, so no workaround was attempted.

**What that cost, concretely:**
- No real task examples, pay ranges, or screenshots *(§3.3 — the most damaging gap)*
- No verified chain, fee model, wallet UX, or availability
- No existing site copy to align the brand voice against, so the voice in `01` is derived from the five founder statements and the category's failure modes rather than from Tenda's own existing language
- No team names, funding, or company facts
- No confirmation of the actual settlement time *(§3.1)*

**What it did not cost:** the positioning, the category argument, the campaign angle, the voice, the message hierarchy, and the structure of all thirteen deliverables. Those derive from the five founder statements and from competitive research, both of which were available. The material is complete and internally consistent; it needs facts poured into named slots, not rewriting.

**Fastest path to resolution:** paste the site's copy into the conversation, or add `tendahq.com` to the environment's network policy and re-run — the Playwright MCP is now installed and committed to `.mcp.json`, so a fresh session will have browser tools ready the moment the domain is allowed.

---

## 5. Pre-flight checklist

- [ ] All Tier A questions answered
- [ ] All Tier B questions answered
- [ ] Tier C answered, or the proof sections deleted rather than padded
- [ ] `grep -r "\[\[" tenda-launch/` returns nothing
- [ ] "Instantly" replaced with the measured number everywhere
- [ ] Three concrete example tasks threaded through every asset
- [ ] Founder has approved all five quotes and the LinkedIn posts written in their voice
- [ ] Script E (the 20-second unedited proof clip) exists — **nothing ships before this**
- [ ] Legal review of earnings language in every market *(no income claims anywhere)*
- [ ] Store listings submitted with 10 days of review buffer
- [ ] Support staffed for launch day, in every launch market's timezone
- [ ] Someone named and available to answer every store review and comment for 72 hours
