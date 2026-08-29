# Tenda — Landing Page Copy

The current site leads with the mechanism ("The escrow does the trusting"). This version keeps that as the brand line but leads the page with the **worker's** stake in it, which is what converts.

---

## Hero

> **v0.4.3 · TESTNET RELEASE** · LIVE ON SOLANA · BASE · CELO
>
> # The money is already there.
>
> Tenda locks the payment in an on-chain contract the moment a gig is posted — before you agree to anything. Do the work, upload the photo, get released in seconds.
>
> Nobody holds it in between. Not the poster, not an exchange, not us.
>
> **[ Open Web App ]** **[ Download App ]**
>
> `< 2s lock` · `2.5% flat` · `97.5% to you` · `no gas token needed`

**Hero variants**

| | Headline | Tests |
|---|---|---|
| A | The money is already there. | Benefit from the worker's side |
| B | The escrow does the trusting. | Current site line — mechanism-first |
| C | Check the money's there before you take the job. | Instruction — highest expected conversion with sceptics |
| D | Nobody goes first. | The abstraction |

---

## Problem

> ### Somebody always has to go first.
>
> That's the whole problem with small work, and it always has been.
>
> You do the delivery and hope they pay. Or you pay up front and hope the delivery happens. One of you is always carrying the risk that the other one disappears — and that risk is priced into every informal job in Lagos, Nairobi, Accra and Johannesburg.
>
> It's why people work for less than they're worth. It's why they say no to strangers who would have paid.

---

## Solution

> ### So neither of you goes first.
>
> When a gig is posted, the money leaves the poster's wallet and locks in an on-chain contract. It's not with the poster. It's not with us — **we have no admin key, no pause button, no sweep function.**
>
> Before you agree to anything, open a block explorer and look at it.
>
> Then do the work and photograph it. One approval releases the funds — 97.5% to you, in seconds.
>
> **The money doesn't travel when you're paid. It was already there. Approval just opens the lock.**

---

## How it works

> ### Lock. Work. Approve. Release.
>
> **01 · Lock** — Funds leave the poster's wallet and enter the escrow contract. Under two seconds. Neither party controls them now.
> **02 · Work** — You accept and deliver. Photo or video proof goes up in the app.
> **03 · Approve** — The poster reviews the proof and signs. One tap. No back-office, no phone calls.
> **04 · Release** — In that same transaction, the contract splits the funds: 97.5% to you, 2.5% to Tenda. Settles in seconds on every chain.
>
> *[Screen recording — one take, block explorer visible alongside]*

---

## If something goes wrong

> ### Funds are never stuck.
>
> Every gig has a deterministic exit. Whichever one triggers, both sides get the same on-chain receipt.
>
> | | |
> |---|---|
> | **Cancel** | The poster cancels before anyone accepts — funds return to them |
> | **Reclaim** | You miss the proof deadline — the poster claims the refund |
> | **Dispute** | Either side escalates after proof is submitted. Tenda mediation reviews the evidence and instructs the contract. Within 24 hours |
> | **Auto-approve** | If the poster neither approves nor disputes within 48 hours, funds release to you automatically — **planned, not yet live** |
>
> ⚠️ **Say "planned" here in the product, exactly as the site does.** Until auto-approve ships, dispute is the only recourse against a poster who goes quiet, and hiding that would be the single fastest way to lose the trust this whole page is built on.

---

## No gas token

> ### You don't need to own crypto to be paid in it.
>
> Most people quit at *"first, buy a gas token."* That's a design failure, not a user failure — so we deleted the step.
>
> - **On Celo** — your USDC pays its own network fees. No CELO to find first.
> - **On Solana** — link a wallet and we seed it with enough SOL for a full escrow. One grant per user, on us.
> - **On Base** — sponsored transactions via Base Paymaster. *In progress.*
> - **Any wallet** — Phantom, Solflare, or 400+ others through Reown AppKit. Or bring nothing and start fresh.

---

## What gets posted

> ### If someone can do it, someone will post it.
>
> Deliveries, photoshoots, queues stood in, taps fixed, reels edited. Posted in local terms, paid in USDC.
>
> | | | |
> |---|---|---|
> | Bike a laptop across town · Ikeja | 11 USDC | NG Lagos |
> | Translate a menu to French | 12 USDC | Remote |
> | Wait in line for concert tickets | 14 USDC | ZA Johannesburg |
> | Set up a WhatsApp Business catalog | 16 USDC | Remote |
> | Fix a leaking kitchen tap | 20 USDC | GH Accra |
> | Event photographer · 2 hours | 35 USDC | KE Nairobi |
> | Fix a broken Shopify checkout | 50 USDC | Remote |
> | Drone shots of a building site | 60 USDC | KE Nairobi |
>
> Five categories: delivery · photo · errand · service · digital

---

## Cash out

> ### USDC in. Local cash out.
>
> Trade USDC, SOL or ETH against NGN, GHS, KES, ZAR, PHP, USD, GBP or EUR — over the rails you already use. Bank transfer, M-Pesa, MoMo, GCash.
>
> Same escrow. It only releases when both sides confirm.
>
> *Example: 250 USDC on Celo ↔ ₵3,950 GHS via MTN MoMo.*

---

## Testnet notice — put this above the footer, not in it

> ### Tenda is a testnet release.
>
> `v0.4.3-testnet`. A third-party audit is scheduled before public mainnet and **has not been completed yet.**
>
> The source is open — the Solana program in Rust/Anchor, the EVM contracts in Solidity/Foundry, both with full test suites. Read them end to end before you deposit anything. We'd rather you check than trust us.
>
> **[ Read the contracts ]**

---

## Closing

> ### Nobody goes first.
>
> The contract does.
>
> **[ Open Web App ]** **[ Download App ]**
>
> *The escrow does the trusting.*

---

## Meta / SEO

**Title (57)** `Tenda — On-Chain Escrow for Small Paid Work`
**Meta (152)** `The money locks in a contract when a gig is posted, and photo proof releases it in seconds. 2.5% flat, no gas token needed. Solana, Base and Celo.`

**Primary:** on-chain escrow app · crypto escrow for gig work
**Secondary:** get paid in USDC for tasks · escrow gig app Nigeria/Kenya/Ghana · USDC to MoMo · USDC to M-Pesa
**High-intent long-tail:** *"how to not get scammed on gig work"* · *"escrow for freelance work crypto"* · *"P2P USDC escrow M-Pesa"* — these are typed by someone who has already been burned, and they convert at a multiple of everything else. One honest comparison page each.

**og:image** — the settled state showing `11.70 USDC` payout and the `0.30 · 2.5%` fee. Not the logo.
