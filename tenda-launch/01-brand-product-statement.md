# Tenda — Brand & Product Statement

The canonical description. Every other asset quotes this rather than paraphrasing it.

---

## The lockup

> ## tenda.
> ### The escrow does the trusting.

**Campaign line:** *The money is already there.*
**Short lockup:** `Locked before you start.`

---

## The statement — canonical, 100 words

> **Tenda is an on-chain escrow application for small paid work.**
>
> The money locks in a contract the moment a gig posts — USDC, SOL or ETH, on Solana, Base or Celo. The worker delivers and uploads photo proof. The poster approves with one signature, and in that same transaction the contract splits the funds: 97.5% to the worker, 2.5% to Tenda. Seconds, not days.
>
> Nobody holds your money in between — not the counterparty, not an exchange, not Tenda. There is no admin key, no pause button, no sweep function.
>
> **Getting paid isn't a promise. It's a release.**

---

## Every length

**One line**
> The money locks before the work starts. Proof releases it.

**25 words**
> Tenda is an on-chain escrow app for small paid work. Funds lock when a gig posts, proof releases them, and settlement takes seconds. Nobody holds your money.

**50 words**
> Tenda is an on-chain escrow application for small paid work. When a gig posts, the money leaves the poster's wallet and locks in a contract. The worker delivers and uploads proof. One approval releases 97.5% to the worker in seconds. No platform balance, no admin key, no gas token required.

**250 words — for About pages and long-form**
> Tenda is an on-chain escrow application for small paid work.
>
> In cash-first markets, the reason a laptop delivery across Lagos or a two-hour photo shoot in Nairobi stays informal isn't that nobody can find the work. It's that somebody has to go first. The worker does the job and hopes. The poster pays up front and hopes. One of them is always exposed, and that exposure is what keeps small work small.
>
> Tenda removes the need for either side to go first. When a gig is posted, the money leaves the poster's wallet and enters an on-chain escrow contract — USDC, SOL or ETH, on Solana, Base or Celo. It is no longer in either party's control, and it is not in Tenda's either: there is no admin key, no pause button, no sweep function. The worker can verify the locked amount in a block explorer before agreeing to anything.
>
> The worker delivers and uploads photo or video proof. The poster reviews and signs one approval. In that same transaction the contract splits the funds — 97.5% to the worker, 2.5% to Tenda — and settles in seconds.
>
> And because most people quit crypto at *"first, buy a gas token,"* Tenda deletes that step. On Celo your USDC pays its own gas. On Solana, a one-time grant covers your first full escrow. You bring a wallet you already have, or none at all.
>
> Getting paid isn't a promise. It's a release.

---

## The flow

```
   LOCK  ────▶   WORK   ────▶  APPROVE  ────▶  RELEASE
 poster ·       worker ·       poster ·       program ·
  seller         buyer          seller         atomic

 funds leave    delivers +     reviews proof   same tx splits:
 the wallet     uploads        signs once      97.5% worker
 into escrow    photo proof                     2.5% Tenda
   < 2s                                        seconds
```

**The sentence that carries it:** *The money doesn't travel when you're paid. It was already there — approval just opens the lock.*

---

## Why "application", not "marketplace"

> A marketplace's job ends when two parties find each other; what happens to the money afterwards is somebody else's problem. Tenda's job **is** the money.
>
> Tenda is an escrow application. **Gigs** and **Exchange** are two surfaces over one contract — and the contract is the product.

> ⚠️ **Site conflict.** tendahq.com currently labels the gigs surface `MARKETPLACE · GIGS`. That label contradicts this positioning in the one place every journalist will screenshot. Change it to `GIGS` before the launch pitches go out.

---

## Reasons to believe — every one verifiable

| Claim | Evidence |
|---|---|
| Nobody holds your funds | No admin key, no pause button, no sweep function |
| The money is really there | Any lock or settlement is inspectable in the block explorer |
| Payment is fast | Atomic release in the approval transaction; sub-second settlement on Solana |
| The fee is honest | 2.5% flat. 12 USDC locked → 11.70 to the worker, 0.30 to Tenda |
| Funds are never stuck | Four deterministic exits: Cancel, Auto-approve *(planned)*, Reclaim, Dispute |
| You don't need crypto to start | Celo: USDC pays its own gas. Solana: one-time gas grant. 400+ wallets via Reown AppKit |
| The code is inspectable | Solana program in Rust/Anchor, EVM in Solidity/Foundry, full test suites, open source |

---

## Voice

**In one line:** a builder who has been stiffed on an invoice and fixed it with a contract instead of a complaints process.

1. **The contract is the proof.** "Check it in the block explorer" is the strongest sentence available. Use it.
2. **Real gigs, real amounts.** *"11 USDC to bike a laptop across Ikeja"* beats "microtasks" every time. The site's own gig list is the best copy Tenda has — use it everywhere.
3. **Crypto is plumbing.** The gas story is *"you don't need to own crypto"*, never a technical boast.
4. **Never overstate the stage.** It is testnet, and the audit is pending. Say so in the same breath as any capability claim.
5. **Numbers over adjectives.** < 2s. 2.5%. 97.5%. 8 markets. 3 chains.

**Banned:** `revolutionary` · `game-changing` · `seamless` · `empower` · `unlock` · `disrupt` · `leverage` · `frictionless` · `trustless` *(say what it does instead)* · `ecosystem` meaning our product · `learn more` · `thousands trust us` · anything implying mainnet or a finished audit

**Vocabulary:** Poster · Worker · Gig · Escrow app · Lock / Approve / Release · Proof

---

## The one-liner bank

- The escrow does the trusting.
- The money is already there.
- Getting paid isn't a promise. It's a release.
- Nobody goes first. The contract does.
- Locked before you start. Released on proof.
- The money doesn't travel when you're paid — approval just opens the lock.
- No admin key. No pause button. No sweep function.
- Check the contract before you take the job.
- Proof releases. The contract settles.
- You don't need to own crypto to be paid in it.
- Escrow small enough to use on an eleven-dollar errand.
- 12 USDC in. 11.70 out. Nothing in between.

---

## The manifesto

> In Lagos, Nairobi, Accra, Johannesburg and Manila, the work is already there.
>
> Someone will bike a laptop across Ikeja for eleven dollars. Someone will stand in a ticket queue in Johannesburg, shoot a building site in Nairobi, fix a tap in Accra, translate a menu, rebuild a broken checkout. None of that needs inventing. It happens every day, arranged in WhatsApp groups, paid — sometimes — afterwards.
>
> The reason it stays small isn't discovery. It's that somebody always has to go first.
>
> The worker does the job and hopes. The poster pays up front and hopes. One of them is always carrying the risk of the other one vanishing, and that risk is priced into every informal arrangement in the world. It's why people work for less than they're worth, and why they say no to strangers who'd have paid.
>
> So Tenda made it so neither side goes first.
>
> When a gig posts, the money leaves the poster's wallet and locks in a contract. Not with us — we can't touch it. No admin key, no pause button, no sweep function. Before a worker agrees to anything, they can open a block explorer and see the money sitting there with their name on the job.
>
> Then they do the work, and photograph it. The poster taps approve. In that one transaction the contract pays out — 97.5% to the worker, in seconds.
>
> The money never travelled. It was already there. Approval just opened the lock.
>
> And no, you don't need to own crypto first. On Celo your USDC pays its own gas. On Solana we cover your first escrow. That part is ours to solve, not yours.
>
> **Getting paid isn't a promise. It's a release.**

---

## Boilerplate

**Long (75 words)**
> Tenda is an on-chain escrow application for small paid work. When a gig is posted, funds leave the poster's wallet and lock in a contract on Solana, Base or Celo; the worker delivers and uploads photo proof; one approval releases 97.5% to the worker in seconds, with a 2.5% flat fee. Tenda holds no balances and has no admin key. Tenda is currently a testnet release (v0.4.3-testnet) with a third-party audit due before mainnet. tendahq.com

**Short (30 words)**
> Tenda is an on-chain escrow app for small paid work. Funds lock when a gig posts, photo proof releases them, and settlement takes seconds. Currently a testnet release. tendahq.com

**Ultra-short (15 words)**
> Tenda is an on-chain escrow app where the money locks before the work starts.
