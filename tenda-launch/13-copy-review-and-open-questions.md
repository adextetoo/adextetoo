# Tenda — Copy Review & Open Questions

---

## 1 · Three findings that changed the campaign

These emerged from reading the site and they matter more than any copy decision in this folder.

### 1.1 — It's a testnet release with no audit

`v0.4.3-testnet`. The site's own FAQ says the audit lands before mainnet and hasn't happened.

**Consequence:** the campaign is split into two tracks. **Track A** (now) pitches builders and crypto press on an open, pre-audit escrow contract — an honest and genuinely interesting story. **Track B** (mainnet + published audit) is the consumer launch. Pitching consumer tech blogs a "get paid instantly" earning app that is unaudited testnet would produce a correction cycle, and in this category the first "it didn't pay me" wave never fully clears.

**This is the recommendation I'd push hardest.** Track A costs nothing to run now and makes Track B easier later.

### 1.2 — "Paid instantly after completing a task" isn't what the contract does

The actual sequence is: funds lock at post → worker submits proof → **poster approves** → atomic release in seconds.

Payment is instant **on approval**, not on completion. And the safety net for a poster who never approves — **auto-approve, 48h — is marked PLANNED on your own site and is not live.** Until it ships, an unresponsive poster leaves funds locked with only the dispute route as recourse.

**Consequence:** every asset uses the accurate framing, which is stronger anyway — *the money was locked before you started.* That is a bigger claim than fast payment, it's verifiable in a block explorer, and no competitor can make it without rebuilding their custody.

**Do not describe payment as automatic on completion anywhere.** A journalist who tests it and finds an approval step writes a very different second article.

### 1.3 — Your site contradicts your positioning in one word

You said: *we are not a marketplace, we are an application.* tendahq.com labels the gigs surface **`MARKETPLACE · GIGS`**.

The reconciliation used throughout: **Tenda is an escrow application; Gigs and Exchange are surfaces over one contract.** That's accurate, defensible, and preserves your intent.

**Fix the label before any pitch goes out.** It's one word, it's in the place every journalist screenshots, and no amount of media-kit language outweighs the product arguing against itself.

---

## 2 · What changed from the first draft

The first version of this campaign was written before the site was available and rested on five statements. It was wrong in ways worth naming:

| First draft | Reality |
|---|---|
| Angle: "the gap between done and paid" — payout minimums, 30-day holds | Wrong problem. Tenda's users don't face payout queues; they face **counterparty risk** in informal work. New angle: **the money is already there.** |
| Competitors: MTurk, Clickworker, Appen, Toloka | Wrong set. The real incumbents are **WhatsApp gig groups, Binance P2P, and local errand apps.** |
| Positioned as microtasking vs. marketplaces | Missed that the product is **escrow**, and missed **Exchange entirely** — a second surface with 8 fiat corridors |
| Assumed a payout-speed story | The real stories are **escrow at errand scale** and **the gas wall removed** — neither of which was in the first draft |
| Treated instant payment as the differentiator | The differentiator is that **funds are locked and verifiable before work begins** |

The positioning method held; the inputs were wrong. Everything has been rewritten against `FACTS.md`.

---

## 3 · Quality gate

| Check | Result |
|---|---|
| One author across all assets | **Pass** — voice defined in `01`, applied throughout; register shifts by channel, vocabulary doesn't |
| No hollow superlatives | **Pass** — audited by grep; banned words appear only in ban lists. "Trustless" banned and absent |
| CTAs specific and earned | **Pass** — *Read the source · Check the contract · Open the app · Watch it settle.* No "learn more" |
| No verbatim duplication across platforms | **Pass** |
| Ad claims match landing page | **Pass** — all Track A claims appear identically in both |
| Testnet status carried everywhere | **Pass** — in the body of every asset, never only a footer |
| Auto-approve described as planned | **Pass** — in `03`, `05`, `07`, `08`, `12`, and the site's own wording is matched |
| No copy that would work for a competitor | **Pass** — "no admin key," the 11.70/0.30 split, `feeCurrency`, and the four exits are all Tenda-specific |
| No earnings claims | **Pass** |

---

## 4 · Flagged issues

**4.1 — Digital gigs are the weak link in the proof model.** A photo proves a package reached a door. It proves very little about "fix a broken Shopify checkout" (50 USDC, your largest listed gig). Expect this question from Hacker News within the hour and from any serious reporter. `12` answers it as an open problem rather than a solved one, which is the only credible option — but a real answer would be worth more than any asset in this folder.

**4.2 — Mediation is a centralised trust point in a product whose pitch is that you don't need to trust anyone.** The concession is written into `03` and `12`, but it needs a specific answer: who mediates, under what published standard, with what appeal. A vague answer here undermines the "no admin key" claim by association, which is the strongest thing Tenda has.

**4.3 — The gas story is under-told on the site.** "The hardest part of crypto, removed" is arguably a better consumer hook than the escrow itself — it's the one thing here that solves a problem every single crypto app has. It currently sits below the fold. Consider testing it as the hero for consumer traffic at Track B.

**4.4 — Exchange is nearly invisible in the site's own hierarchy.** Eight fiat corridors with M-Pesa, MoMo and GCash settlement is a substantial story for emerging-markets press on its own, and it's what makes Gigs useful — earning USDC matters only if it becomes spendable. It's currently a secondary card. Worth its own pitch, possibly its own launch.

**4.5 — The float argument cuts both ways.** `08` LI-2 argues that Tenda gave up the float and that 2.5% is the whole model. It's a strong, honest argument and it invites: *is that viable?* Have an answer before publishing it.

**4.6 — Solana Mobile (Seeker) reduced fees is a partnership-shaped detail that isn't being used.** It appears once, as a bullet. If there's a real relationship there, it's a pitch of its own to the Solana ecosystem press.

---

## 5 · Still unknown

Filled from the site where possible. These aren't:

| # | Question | Blocks |
|---|---|---|
| 1 | Founder name and title | Every quote and press release |
| 2 | Mainnet date; audit firm and date | Track B entirely |
| 3 | Is "Download App" iOS, Android, APK, TestFlight or PWA? | `06` app store listing |
| 4 | KYC requirements, if any | Emerging-markets pitches |
| 5 | Token — is there one? *(none appears on the site)* | Crypto pitches; answer plainly either way |
| 6 | Measured **release** time after approval *(the <2s figure is the lock)* | Every "seconds" claim |
| 7 | Who mediates disputes, under what standard | §4.2 |
| 8 | Verification approach for digital gigs | §4.1 |
| 9 | Company: founded, HQ, team, funding | Fact sheet |
| 10 | Contract addresses + explorer + repo links | Developer pitches — highest-value item on this list |

---

## 6 · Pre-flight

- [ ] **Site label `MARKETPLACE · GIGS` → `GIGS`**
- [ ] Founder name, title, and sign-off on all six quotes
- [ ] Contract addresses, explorer links and repo links published
- [ ] Script D (explorer proof clip) shot — **nothing ships before this**
- [ ] `grep -r "\[\[" tenda-launch/` returns nothing
- [ ] Every asset carries testnet status in the body
- [ ] Auto-approve called "planned" everywhere, matching the site
- [ ] No asset implies mainnet, an audit, or earnings
- [ ] Track B assets confirmed unpublished until all four gates clear
