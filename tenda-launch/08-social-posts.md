# Tenda — Social Posts

**Track A voice: builder-to-builder.** Consumer earning posts wait for mainnet.
Every post that makes a capability claim carries the testnet status.

---

# X — 8 posts + 1 thread

**X-1 · Launch**
> Tenda is live on testnet.
>
> On-chain escrow for small paid work. Solana, Base, Celo.
>
> Gig posts → money locks in <2s → worker uploads photo proof → one approval → contract splits it 97.5/2.5 and settles in seconds.
>
> No admin key. No pause button. No sweep function.
>
> v0.4.3-testnet · audit before mainnet

**X-2 · The line**
> Escrow has existed for decades and has never once been used on an $11 delivery.
>
> Not because nobody wanted it. Because the paperwork costs more than the job.
>
> A contract's overhead is a few cents.

**X-3 · The mechanism**
> The money doesn't travel when you get paid on Tenda.
>
> It was locked in the contract the entire time you were working.
>
> Approval doesn't send it. It opens the lock.

**X-4 · Proof**
> Don't trust us — that's the point.
>
> Every lock, approval and settlement is a transaction. Open the explorer and look.
>
> Solana program: Rust/Anchor. EVM: Solidity/Foundry. Test suites ship with both.
>
> Read them before you deposit anything.

**X-5 · Gas**
> Most people quit crypto at "first, buy a gas token."
>
> On Celo, your USDC pays its own gas.
> On Solana, we seed your first wallet with enough SOL for a full escrow.
>
> That step is ours to solve, not yours.

**X-6 · The real economy**
> What's actually posted on Tenda:
>
> 11 USDC — bike a laptop across Ikeja
> 14 — stand in a ticket queue, Johannesburg
> 20 — fix a leaking tap, Accra
> 35 — event photographer, Nairobi
> 60 — drone shots of a building site
>
> Paid in USDC. Cashed out to MoMo.

**X-7 · The honest one**
> What isn't finished:
>
> — We're testnet. Audit before mainnet.
> — Auto-approve (48h) is designed and NOT shipped. Until it is, a silent poster means you open a dispute.
>
> Saying it now beats you finding it later.

**X-8 · The question**
> Genuine question for anyone who's done informal gig work:
>
> how much lower do you quote a stranger than someone you've worked for before?
>
> That gap is counterparty risk, and you've been paying it for free.

---

## The thread — 9 posts

> **1/** Everyone tried to fix gig work by matching people faster.
>
> The matching was never broken. In Lagos you can find someone to bike a laptop across town in about four minutes.
>
> The broken part is that somebody has to go first. 🧵

> **2/** The worker does the job and hopes they get paid. Or the poster pays up front and hopes the job happens.
>
> One of them is always exposed. Every time.

> **3/** That risk gets priced in. Workers quote lower to strangers. They turn down jobs in unfamiliar neighbourhoods. They take 60% up front instead of 100% after.
>
> Half of something beats all of nothing.

> **4/** Escrow solves this and has for centuries. It has just never been usable at this size — the operational cost of holding and adjudicating funds swamps an $11 job.
>
> Escrow.com doesn't want your delivery run.

> **5/** A contract changes that arithmetic. Overhead measured in cents, not paperwork.
>
> So: Tenda. Money leaves the poster's wallet and locks in an on-chain escrow when the gig posts. Under two seconds.

> **6/** The worker can open a block explorer and see the money sitting there before agreeing to anything.
>
> Not our dashboard. The chain.
>
> No admin key, no pause button, no sweep function — we can't move it either.

> **7/** Release condition is deliberately ordinary: a photograph.
>
> The same evidence people already send each other on WhatsApp. Except here it releases the money instead of asking for it.
>
> Poster signs once → same tx splits 97.5/2.5 → settled in seconds.

> **8/** And no, you don't need to own crypto first.
>
> Celo: your USDC pays its own gas.
> Solana: one-time grant covers your first full escrow.
> 400+ wallets via Reown AppKit, or start with none.

> **9/** It's v0.4.3-testnet. The audit happens before mainnet and hasn't happened yet. Auto-approve at 48h is designed and not shipped.
>
> Contracts are open. Read them, then tell us what's wrong with them.
>
> tendahq.com

---

# LinkedIn — 4 posts

### LI-1 · Launch
> Everyone tried to fix gig work by making the matching faster.
>
> The matching was never the broken part. In Lagos you can find someone to bike a laptop across town in about four minutes. What you can't do is know they'll be paid, or that the sender will get their laptop.
>
> Somebody always has to go first, and that risk is priced into every informal arrangement in the world. It's why people quote strangers lower than repeat clients, and why they say no to jobs they'd have been fine doing.
>
> Escrow has solved this for centuries. It has never been usable at this size, because the operational cost of holding and adjudicating funds swamps an eleven-dollar delivery.
>
> We shipped Tenda to test whether a contract changes that arithmetic. Money leaves the poster's wallet and locks on-chain when a gig posts. The worker verifies it in a block explorer before accepting. Photo proof plus one approval releases 97.5% to them, in seconds, in the same transaction.
>
> Tenda holds nothing. No admin key, no pause button, no sweep function.
>
> It's a testnet release — v0.4.3-testnet, audit before mainnet, contracts open source. If you build in this space I'd rather you break it now than after.

### LI-2 · The business model question
> A thing we gave up on purpose: the float.
>
> Most platforms handling payments for work earn on the gap between when the work is done and when the money moves. Hold periods, payout schedules, minimum thresholds — those aren't only friction, they're revenue.
>
> Tenda's funds sit in a contract we cannot withdraw from. No admin key, no sweep function. So there is no float, and the 2.5% flat fee is the entire model. A 12 USDC gig earns us 30 cents.
>
> Whether that's viable at scale is a fair question and I don't have the volume data to answer it yet. But it forced a cleaner product: we can't make money by being slow, so we have no reason to be.

### LI-3 · For posters
> If you need someone local to do a small thing today, your options are all bad.
>
> Hire properly — too slow. Agency — costs more than the job. Post in a WhatsApp group and pay after — this works until someone takes your money or your parcel, and then it works for nobody.
>
> On Tenda you post the gig and the money locks in a contract. You are not paying a stranger up front and hoping. If nobody accepts, you cancel and it comes back. If they miss the deadline, you reclaim it. If the work is wrong, you dispute and mediation decides within 24 hours.
>
> Worth knowing before you use it: auto-approve at 48 hours is designed and not yet shipped — so approving promptly is currently a courtesy the contract doesn't enforce for the worker. We're building it.
>
> Testnet release. Contracts open.

### LI-4 · The contrarian one
> "Trustless" is a terrible word and I'd like to stop using it.
>
> Nobody wants a trustless relationship with the person delivering their laptop. They want to trust them. What they don't want is to be *forced* to, with money on the line and no recourse, by a stranger they'll never see again.
>
> The useful version isn't removing trust. It's removing the requirement for it — so trust becomes something you extend because you want to, not something you're exposed to because there was no alternative.
>
> On Tenda the contract holds the money so that neither person has to go first. After that, they can be as friendly as they like.

---

## Channel notes

**Where the workers actually are:** WhatsApp, Telegram, TikTok, local Facebook groups. Not LinkedIn, not X. Track A here builds credibility with builders and press; Track B is where the worker-facing spend goes, after mainnet.

**Highest-value activity at launch is replying, not posting** — specifically to anyone asking whether the escrow is real. One block-explorer link beats ten posts.

**Never:** paid engagement, giveaway-for-follow, countdown urgency, or the word "trustless".
