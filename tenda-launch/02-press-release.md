# Tenda — Press Release

> ## ⚠️ Read this before distributing
>
> Tenda is `v0.4.3-testnet` with **no completed audit**. Every version below states that plainly and high up. Do not delete those lines to make the story cleaner — an unaudited testnet product pitched to consumer press as a live earning app produces a correction cycle that is very hard to outrun, and in this category the first "is it a scam" wave never fully clears.
>
> **Two tracks. Track A ships now; Track B waits for mainnet + audit.** See `11-content-calendar.md`.

---

# TRACK A — Testnet launch *(ship now)*

**Audience:** crypto, developer and builder press. Solana / Base / Celo ecosystem channels.
**Story:** an escrow contract small enough to use on an eleven-dollar errand, live on three chains, with the gas problem actually solved.

---

## A1 · Full release

**FOR IMMEDIATE RELEASE**

# Tenda launches on-chain escrow for small paid work across Solana, Base and Celo

### The testnet release locks funds in a contract when a gig is posted and releases them against photo proof — with no gas token required to start

**[[CITY]] — [[DATE]]** — Tenda today released `v0.4.3-testnet`, an on-chain escrow application for small paid work, running on Solana, Base and Celo.

The premise is narrow and unusual: escrow small enough to be worth using on an eleven-dollar delivery. When a gig is posted, funds leave the poster's wallet and lock in a contract in under two seconds. The worker delivers and uploads photo or video proof. The poster signs one approval, and in that same transaction the contract splits the funds — 97.5% to the worker, 2.5% to Tenda — settling in seconds.

Tenda holds nothing in between. The application has **no admin key, no pause button and no sweep function**, and every state change is a transaction verifiable in a block explorer.

"In informal work the problem was never finding someone to do the job," said [[FOUNDER NAME]], [[TITLE]]. "It's that somebody always has to go first. The worker does the job and hopes, or the poster pays up front and hopes. We made it so neither of them goes first — the contract does."

### Escrow at the scale of an errand

Regulated escrow has existed for decades and has never touched work at this size, because its overhead exceeds the value of the job. Tenda's live gig examples run from 11 USDC to bike a laptop across Ikeja, Lagos, to 60 USDC for drone shots of a Nairobi building site — with categories spanning delivery, photo, errand, service and digital.

The release condition is deliberately ordinary: a photograph. "The thing that makes escrow work on a fourteen-dollar errand isn't legal machinery," said [[FOUNDER NAME]]. "It's a photo of the package at the door — the same evidence people already send each other on WhatsApp. Except here it releases the money instead of asking for it."

### The gas problem, removed

Tenda's second claim is about onboarding. Most first-time crypto users abandon at the instruction to buy a gas token before doing anything.

Tenda removes that step differently on each chain: on **Celo**, network fees are paid in the same USDC being transacted via the chain's `feeCurrency` mechanism, with no CELO required; on **Solana**, a one-time grant seeds a new user's first wallet with enough SOL for a full escrow lifecycle; on **Base**, sponsored transactions through Base Paymaster are in progress. Users connect Phantom, Solflare, or any of 400+ wallets via Reown AppKit.

### Deterministic exits

Funds are never stranded. Four resolution paths are defined in the contract: a poster may **cancel** before a worker accepts; a poster may **reclaim** if the worker misses the proof deadline; either side may open a **dispute** after proof is submitted, resolved by Tenda mediation within 24 hours; and an **auto-approve** route — currently marked planned, at a 48-hour window — will release funds to the worker if a poster neither approves nor disputes.

### A second surface: local cash

The same contract powers Tenda Exchange, a peer-to-peer venue for trading USDC, SOL and ETH against NGN, GHS, KES, ZAR, PHP, USD, GBP and EUR. Cash moves over the rails people already use — bank transfer, M-Pesa, MoMo and GCash — and escrow releases only when both sides confirm.

### Testnet, and open

**Tenda is a testnet release. A third-party audit is scheduled before public mainnet launch and has not yet been completed.** The Solana program (Rust/Anchor) and the EVM contracts (Solidity/Foundry) are open source and ship with full test suites.

"We'd rather people read the contracts than take our word for anything," said [[FOUNDER NAME]]. "That's the whole design. If you have to trust us, we built it wrong."

### About Tenda

Tenda is an on-chain escrow application for small paid work. When a gig is posted, funds leave the poster's wallet and lock in a contract on Solana, Base or Celo; the worker delivers and uploads photo proof; one approval releases 97.5% to the worker in seconds, with a 2.5% flat fee. Tenda holds no balances and has no admin key. Tenda is currently a testnet release (v0.4.3-testnet) with a third-party audit due before mainnet. tendahq.com

**Media contact:** [[NAME]] · [[EMAIL]] · Press kit: [[URL]]

**###**

---

## A2 · Newswire short (≈170 words)

# Tenda launches on-chain escrow for small paid work on Solana, Base and Celo

**[[CITY]], [[DATE]]** — Tenda today released `v0.4.3-testnet`, an on-chain escrow application for small paid work.

When a gig is posted, funds leave the poster's wallet and lock in a contract in under two seconds. The worker delivers and uploads photo proof; the poster signs one approval; the contract splits the funds in that same transaction — 97.5% to the worker, 2.5% to Tenda — settling in seconds.

Tenda holds no balances and has no admin key, pause button or sweep function. Live gigs range from 11 USDC for a cross-town laptop delivery in Lagos to 60 USDC for drone photography in Nairobi.

Tenda also removes the gas-token barrier: USDC pays its own network fees on Celo, and a one-time grant covers a new user's first escrow on Solana.

**Tenda is a testnet release; a third-party audit is due before mainnet.** The Solana and EVM contracts are open source. tendahq.com

**###**

---

## A3 · The 120-word version

Tenda is an on-chain escrow application for small paid work, released today as `v0.4.3-testnet` on Solana, Base and Celo.

Funds leave the poster's wallet and lock in a contract when a gig posts — in under two seconds. The worker uploads photo proof. One approval splits the funds atomically: 97.5% to the worker, 2.5% to Tenda, settled in seconds. No admin key, no pause button, no sweep function.

It also deletes the gas-token step: on Celo, USDC pays its own fees; on Solana, a one-time grant covers a first escrow.

Live gigs run 11–60 USDC across delivery, photo, errand, service and digital.

Testnet; audit pending before mainnet; contracts open source.

Press kit: [[URL]]

---

# TRACK B — Consumer launch *(hold until mainnet + completed audit)*

**Do not send this until:** mainnet is live, the audit report is published with firm and date, and auto-approve has shipped. Until then Track B has no honest version.

## B1 · Consumer headline options

| For | Headline |
|---|---|
| General tech | Tenda's app locks the money before you start the job |
| Consumer / mobile | The gig app where you can check the money is there before you say yes |
| Global / emerging markets | An escrow app built for an eleven-dollar delivery in Lagos |
| Crypto | Tenda takes escrow to mainnet across Solana, Base and Celo — audited by [[FIRM]] |
| Feature | Everyone tried to fix gig work by matching people faster. Tenda fixed who goes first |

## B2 · Consumer lede *(for use at mainnet)*

**[[CITY]] — [[DATE]]** — Tenda today launched its escrow application on mainnet following a completed security audit by [[FIRM]], letting anyone post or take small paid work with the money locked in a contract before the job begins.

For the worker, the change is concrete: before agreeing to a job, they can see the money already locked, in a contract nobody — including Tenda — can withdraw from. When the work is done and photographed, one approval from the poster releases it in seconds.

*[Continue from A1 §"Escrow at the scale of an errand", replacing all testnet language.]*

---

## Headline alternatives — Track A

| For | Headline |
|---|---|
| Crypto / infra | Tenda ships an escrow contract small enough for an eleven-dollar errand |
| Solana | Tenda's Anchor escrow program launches on Solana, with gas grants so first-timers start at zero |
| Base | TendaEscrow arrives on Base with gasless USDC approvals via EIP-2612 |
| Celo | On Tenda, your USDC pays its own gas — escrow live on Celo testnet |
| Developer | Tenda open-sources a multi-chain escrow for gig work across Solana, Base and Celo |
| Emerging markets | Crypto escrow, priced for a Lagos delivery run |
