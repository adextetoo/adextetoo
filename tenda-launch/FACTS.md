# Tenda — Verified Fact Base

Everything below is taken from tendahq.com (screenshots + FAQ text supplied 2026-08-29). **This file is the source of truth. Every claim in the campaign traces to a line here.** Anything not on this page is either marked `UNKNOWN` at the bottom or does not get written.

---

## What Tenda actually is

An **on-chain escrow application**. Money locks in an escrow contract before work begins; proof releases it. Tenda powers two surfaces on top of that one contract:

| Surface | Site label | What it does |
|---|---|---|
| `tenda/gigs` | MARKETPLACE · GIGS | Post or accept tasks — delivery, photo, errand, service, digital. Funds lock when a gig is posted. Workers submit photo or video proof. Approval releases the USDC on the spot. |
| `tenda/exchange` | P2P TRADE · EXCHANGE | Trade USDC, SOL or ETH against NGN, GHS, KES, ZAR, PHP, USD, GBP, EUR. Cash moves over bank transfer, M-Pesa, MoMo, GCash. Escrow only releases when both sides confirm. |

**Site hero:** "The escrow does the trusting."
**Hero body:** "The money locks in an on-chain escrow the moment a gig posts or an offer goes live — USDC, SOL or ETH. Nobody holds your funds — not us, not the counterparty, not an exchange."
**Hero kicker:** "Proof releases. The contract settles."

---

## Headline numbers (from the hero stat strip)

| Figure | Meaning |
|---|---|
| **< 2s** | Escrow lock |
| **2.5%** | Flat fee |
| **100%** | On-chain |
| **8** | Fiat markets |

---

## Release status — read this before writing anything

| | |
|---|---|
| **Version** | `v0.4.3-testnet` |
| **Stage** | **TESTNET RELEASE** |
| **Chains** | Solana · Base · Celo |
| **Audit** | **Pre-mainnet · audit pending — not yet audited** |
| **Source** | Open. Solana program in Rust/Anchor; EVM contracts in Solidity/Foundry; both ship with full test suites |

Tenda's own FAQ (Q.04): *"Not yet. Tenda is currently a testnet release (v0.4.3-testnet). A third-party audit will land before public mainnet launch… In the meantime, the source is open… read them end-to-end before depositing."*

---

## The escrow flow — four stages

| # | Stage | Actor | What happens |
|---|---|---|---|
| 01 | **Lock** | Poster · Seller | Funds — USDC, SOL or ETH — leave the poster's (or seller's) wallet and enter the on-chain escrow contract. No longer in either party's control. |
| 02 | **Work** | Worker · Buyer | The worker (or buyer) accepts and delivers — package dropped, photo taken, fiat sent. Photo or video proof is uploaded. |
| 03 | **Approve** | Poster · Seller | The poster (or seller) reviews proof and signs an approval. One tap. No back-office. No phone calls. |
| 04 | **Release** | Program · Atomic | In the same transaction, the contract splits the locked funds — payout to the worker (or buyer), fee to Tenda. Settlement in seconds on every chain. |

**Worked example from the site:** 12 USDC locked → payout **11.70 USDC**, fee **0.30 USDC · 2.5%**. The worker nets **97.5%**.

Every state change is a transaction verifiable in a block explorer. "No platform-held balance. No 'pending' you can't see."

---

## Fallback routes — when things go wrong

Site framing: *"If proof is missing or contested, escrow resolves — it doesn't disappear."* Every gig has a deterministic exit — initiated by a party, by a deadline, or by Tenda mediation. Both sides see the same on-chain receipt.

| Route | Trigger | Outcome | Status |
|---|---|---|---|
| **A · Cancel** | Poster cancels before a worker accepts | Funds return to the locker | Live · `pre-accept` |
| **B · Auto-approve** | Poster doesn't approve or dispute within the review window | Funds auto-release to the worker | ⚠️ **PLANNED — 48h — NOT YET LIVE** |
| **C · Reclaim** | Worker misses the proof-submission deadline | Poster can claim the refund | Live · `post-deadline` |
| **D · Dispute** | Either side opens a dispute after proof is submitted | Tenda mediation reviews evidence and instructs the program to release or refund | Live · ≤ 24h |

---

## Custody & trust model

- Money sits in the on-chain escrow contract — **not** a Tenda bank account, **not** the worker's wallet.
- **Tenda has no admin key, no pause button, no sweep function.**
- Same contract logic on Solana, Base and Celo.
- Any settlement is inspectable in that chain's block explorer.

**Worker reputation:** the on-chain user account tracks `completed_gigs` directly. Ratings, reviews and dispute counts are kept **off-chain** by Tenda and shown beside every profile.

---

## Gig categories & real examples

**Five categories:** delivery · photo · errand · service · digital

| Gig | Price | Where | Window |
|---|---|---|---|
| Fix a broken Shopify checkout | 50 USDC | Remote | 1d |
| Drone shots of a building site | 60 USDC | KE Nairobi | 3d |
| Event photographer · 2 hours | 35 USDC | KE Nairobi | 4h |
| Fix a leaking kitchen tap | 20 USDC | GH Accra | 2d |
| Set up a WhatsApp Business catalog | 16 USDC | Remote | 2d |
| Wait in line for concert tickets | 14 USDC | ZA Johannesburg | 90m |
| Translate a menu to French | 12 USDC | Remote | — |
| Pick up a package · Lekki Phase 1 | 12 USDC | NG Lagos | 45m |
| Bike a laptop across town · Ikeja | 11 USDC | NG Lagos | 25m |
| Same-day pharmacy pickup + dropoff | — | — | 1h |
| Drop off documents · Sandton | — | ZA | 1h |

Site line: *"Deliveries, photoshoots, queues stood in, taps fixed, reels edited. Every task below is the kind of gig Tenda escrows every day — posted in local terms, paid in USDC."*
Section headline: *"If someone can do it, someone will post it."*

---

## Exchange — fiat corridors

**Assets:** USDC · SOL · ETH
**Fiat:** NGN · GHS · KES · ZAR · PHP · USD · GBP · EUR *(8 markets)*
**Rails:** bank transfer · M-Pesa · MoMo · GCash

**Worked example from the site:** 250 USDC on Celo ↔ ₵3,950 GHS via MTN MoMo, counterparty @kwabena · 4.7★

---

## Site structure

Nav: Products · How it works · Onboarding · Ecosystems · FAQ
CTAs: **Open Web App** · **Download App**
Section numbering: §02 What gets done on Tenda · §04 How escrow works
Wordmark: `tenda.` (lowercase, with a full stop)
Palette: near-black navy ground, royal blue accent, white type, monospace for data

---

## Still UNKNOWN — not on the pages supplied

These remain genuinely unverified. Do not invent them.

- Mainnet launch date; audit firm and date
- Founder name and title; team; HQ; funding
- Whether "Download App" means iOS, Android or both, and store links
- Wallet model — the copy says funds "leave the poster's wallet", implying self-custody / bring-your-own, but the onboarding flow is unconfirmed
- KYC requirements, if any
- Whether a token exists *(no mention anywhere on the pages supplied — treat as "no" only once confirmed)*
- Measured settlement time after approval *(site says "settlement in seconds"; the < 2s figure is the **lock**, not the release)*
- Who performs mediation, and its SLA beyond "≤ 24h"
- Usage numbers of any kind

---

## Onboarding — "No gas, no friction"

**Headline:** "The hardest part of crypto, removed."
**Body:** *"Most people quit at 'first, buy a gas token.' Tenda deletes that step on every chain it supports — each one a different rail, all of them invisible to you."*

| Rail | Status | What it does | Detail |
|---|---|---|---|
| **Celo — Your USDC pays its own gas** | **LIVE** | Network fees come out of the same USDC you trade with. No hunting for a separate gas token before your first move. | `feeCurrency: USDC — no CELO required` |
| **Solana — Start with zero SOL** | **LIVE** | Link your first Solana wallet and Tenda seeds it with enough SOL for a full escrow lifecycle — post, lock, settle. One grant per user, on us. | `one-time gas grant · covers your first escrow` |
| **Bring the wallet you already have** | **LIVE** | Phantom, Solflare and other Solana wallets connect natively. On EVM chains, every wallet in the Reown AppKit roster just works. | `Phantom · Solflare · 400+ wallets via Reown AppKit` |
| **Gasless on Base** | ⚠️ **IN PROGRESS** | Sponsored transactions through Base Paymaster — first escrows on Base without holding ETH at all. | `Base Paymaster · sponsored first transactions` |

**Wallet model is now confirmed: bring-your-own, self-custody.** Funds leave the user's own wallet into the contract. Tenda never holds them.

---

## Ecosystems — per-chain integration

**Headline:** "Built deep into every chain we ship on."
**Body:** *"Tenda isn't 'deployed to' these chains — it uses what makes each one special: Solana's speed, Base's USDC rails, Celo's stablecoin gas. Same product, same guarantees, everywhere."*

### Solana — *"Sub-second settlement, fees too small to notice."*
> "Where Tenda started — settlement fast enough to feel like handing over cash."
- Native escrow program, written in Anchor
- SOL gas grants so first-time users start at zero
- **Reduced platform fee on Solana Mobile (Seeker) devices**
- Phantom, Solflare + wallet-adapter ecosystem support

### Base — *"Coinbase's L2 — USDC-native, built to onboard everyone."*
> "USDC-native rails and the shortest path from a Coinbase account to a Tenda gig."
- TendaEscrow Solidity contracts deployed and battle-tested on testnet
- Gasless USDC approvals via EIP-2612 permit
- Sponsored transactions via Base Paymaster — *in progress*
- Explorer: basescan.org

### Celo — *"Mobile-first L2 where stablecoins pay their own gas."*
> "A chain designed for exactly Tenda's users — mobile-first, stablecoin-first, emerging markets first."
- Gas paid in USDC via Celo's `feeCurrency` — verified on-chain
- Same escrow contracts, same USDC, zero extra tokens to hold
- cUSD supported on the exchange
- Explorer: celoscan.io

---

## Three findings that change the campaign

**1 · This is a testnet release with no audit.** `v0.4.3-testnet`, audit explicitly pending. A consumer-press launch pitched on "get paid instantly" for an unaudited testnet product invites a correction cycle that is very hard to outrun. The campaign is therefore built as **two tracks** — a builder/crypto launch now, and the consumer launch at mainnet + audit.

**2 · "Paid instantly after completing a task" is not quite what the contract does.** The real sequence is: funds lock at post → worker submits proof → **poster approves** → atomic release in seconds. Payment is instant *on approval*, not on completion. And the safety net for a poster who never approves — auto-approve — is marked **PLANNED (48h), not live.** Until it ships, an unresponsive poster can hold a worker's approval open indefinitely, with only the dispute route as recourse. The campaign uses the accurate framing, which is stronger anyway: *the money was locked before you started.*

**3 · The site labels the gigs surface "MARKETPLACE · GIGS", which contradicts "we are not a marketplace."** Reconciliation used throughout this campaign: **Tenda is an escrow application; Gigs and Exchange are surfaces it powers.** That framing is accurate, defensible, and preserves the intent. The site label is the one thing to change.
