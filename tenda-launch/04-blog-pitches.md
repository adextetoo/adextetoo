# Tenda — Tech Blog Pitch Pack

**Track A only.** Consumer-press pitches wait for mainnet + audit — there is no honest version before then.

**Rules:** one angle per outlet · subject lines under 60 chars · no attachments, one kit link · state "testnet" in every pitch · offer the screen recording with the block explorer open · follow up once.

---

## 1 · Crypto & infra press
*(The Block, Blockworks, CoinDesk, Decrypt, DL News, The Defiant)*
**Quote:** Q4

> **Subject:** Escrow small enough for an $11 delivery — live on 3 chains
>
> Hi [name],
>
> Escrow has existed for decades and has never been used on an eleven-dollar errand, because the paperwork costs more than the job. Tenda's bet is that a contract's overhead is a few cents, and that's the whole opening.
>
> They've shipped `v0.4.3-testnet` on Solana, Base and Celo. A gig posts, the money leaves the poster's wallet and locks in under two seconds. Worker delivers, uploads a photo. Poster signs once. Same transaction splits it 97.5/2.5 and settles in seconds.
>
> The part I'd point you at: **no admin key, no pause button, no sweep function.** Founder's line is *"if you have to trust us, we built it wrong."* Contracts are open — Anchor on Solana, Solidity/Foundry on EVM, test suites included.
>
> It's testnet and the audit is explicitly pending; they're upfront about that and would rather you write it that way.
>
> Kit, contract addresses and explorer links: [link]
>
> [signature]

---

## 2 · Solana ecosystem
*(Solana Floor, Helius blog, Superteam, Solana-focused newsletters)*
**Quote:** Q5

> **Subject:** Native Anchor escrow, and new users start with zero SOL
>
> Hi [name],
>
> Tenda's escrow program is written in Anchor and Solana is where it started — the founder's framing is "settlement fast enough to feel like handing over cash."
>
> Two things worth a look beyond the program itself:
> - **SOL gas grants.** A first-time user links a wallet and Tenda seeds it with enough SOL for a full escrow lifecycle — post, lock, settle. One grant per user. It's a direct answer to the "buy a gas token first" drop-off.
> - **Reduced platform fee on Solana Mobile (Seeker) devices.**
>
> Live testnet gigs run 11–60 USDC — package runs in Lagos, drone shots in Nairobi, a two-hour photo shoot.
>
> Testnet, audit pending, contracts open. Happy to get you addresses to poke at.
>
> [signature]

---

## 3 · Base / Coinbase ecosystem
**Quote:** Q5

> **Subject:** TendaEscrow on Base — gasless USDC approvals via EIP-2612
>
> Hi [name],
>
> Tenda is an escrow app for small paid work, and Base is the USDC-native leg of it — their framing is "the shortest path from a Coinbase account to a Tenda gig."
>
> On Base specifically: TendaEscrow Solidity contracts deployed and tested on testnet, gasless USDC approvals via EIP-2612 permit, and Base Paymaster sponsorship in progress so first escrows need no ETH at all.
>
> The product itself: gig posts → funds lock → photo proof → one approval → atomic 97.5/2.5 split, seconds to settle. Same contracts on Solana and Celo.
>
> Testnet; audit before mainnet; source open.
>
> [signature]

---

## 4 · Celo / stablecoin & mobile-money press
**Quote:** Q5

> **Subject:** On Tenda, your USDC pays its own gas
>
> Hi [name],
>
> The cleanest use of Celo's `feeCurrency` I've seen in a consumer product: on Tenda, network fees come out of the same USDC you're transacting with. No CELO to acquire, no second token to hold, verified on-chain.
>
> Which matters because of who the app is for — deliveries in Lagos, errands in Johannesburg, photo work in Nairobi, paid in USDC and cashed out to MoMo or M-Pesa. Mobile-first, stablecoin-first, and the gas step deleted rather than explained.
>
> The product is escrow: money locks when a gig posts, photo proof releases it, 2.5% flat. cUSD is supported on their exchange side too.
>
> Testnet release, audit pending.
>
> [signature]

---

## 5 · Global / emerging markets
*(Rest of World, TechCabal, Techpoint Africa, Semafor Africa, Condia)*
**Quote:** Q1 — **send this one first; it's the strongest story in the pack**

> **Subject:** The escrow app built for an ₦-priced delivery run
>
> Hi [name],
>
> The reason a laptop delivery across Ikeja stays a WhatsApp arrangement isn't that nobody can find a rider. It's that somebody has to go first — the rider does the job and hopes, or the sender pays up front and hopes. That risk is priced into every informal arrangement in Lagos, Nairobi and Accra, and it's why people work for less than they're worth.
>
> Tenda's answer is that neither side goes first. The money locks in a contract when the gig posts, and the rider can check it's there — in a block explorer — before agreeing to anything. Photo at the door releases it. 97.5% to the worker, in seconds.
>
> Their live gig list reads like the actual economy: 11 USDC to bike a laptop across Ikeja. 14 to stand in a Johannesburg ticket queue. 20 to fix a leaking tap in Accra. 60 for drone shots in Nairobi. Cash-out is USDC → NGN/GHS/KES/ZAR over MoMo, M-Pesa, bank transfer.
>
> It's a testnet release and the audit isn't done — worth saying in the piece. But the design question is real and I think it's yours: does escrow change what informal work is worth?
>
> I can connect you with workers in Lagos and Accra who've used it.
>
> [signature]

---

## 6 · Fintech & payments
*(Sifted, Finextra, PYMNTS, fintech desks)*
**Quote:** Q2

> **Subject:** Escrow that costs cents instead of paperwork
>
> Hi [name],
>
> Escrow.com and its equivalents have never gone below a few thousand dollars per transaction, for a straightforward reason: the operational cost of holding and adjudicating funds swamps a small job.
>
> Tenda is testing whether a contract changes that arithmetic. Their escrow locks in under two seconds and charges 2.5% flat, on gigs from 11 to 60 USDC. The adjudication layer is a photograph plus one approval signature, with a mediated dispute route inside 24 hours.
>
> The business question I'd press them on, and they'll take it: there's no float. Funds sit in a contract Tenda can't touch, so the 2.5% is the entire model. [Founder] will discuss it on the record.
>
> Testnet; audit due before mainnet.
>
> [signature]

---

## 7 · Developer & security press
*(Hacker News-adjacent, security newsletters, Web3 security researchers)*
**Quote:** Q6

> **Subject:** Open-source multi-chain escrow, pre-audit, contracts up
>
> Hi [name],
>
> Sending this because the interesting part is that it's *not* finished.
>
> Tenda has published a multi-chain escrow — Anchor program on Solana, Solidity/Foundry on Base and Celo, same guarantees on each — as `v0.4.3-testnet`, with the audit explicitly outstanding and the source and test suites open. Their FAQ says, in as many words: read them end-to-end before depositing.
>
> Design points worth scrutiny: no admin key / pause / sweep; four deterministic exits (cancel pre-accept, reclaim post-deadline, dispute ≤24h via mediation, auto-approve at 48h — **the last one is planned, not shipped**, which is the obvious hole and they don't hide it).
>
> If you want to take it apart publicly, they'd rather that happened now than after mainnet.
>
> [signature]

---

## 8 · Newsletters
*(Milk Road, Bankless, TLDR, Ben's Bites, local market newsletters)*

> **Subject:** Escrow for an $11 errand — testnet, 3 chains
>
> Hey [name] — short one.
>
> **Tenda** shipped `v0.4.3-testnet`: on-chain escrow for small gigs, on Solana/Base/Celo. Money locks when the gig posts (<2s), photo proof releases it, 97.5% to the worker, 2.5% flat fee, settles in seconds. No admin key, no pause, no sweep.
>
> Nice bit: no gas token needed. USDC pays its own gas on Celo; one-time SOL grant on Solana.
>
> Real gigs on it: 11 USDC to bike a laptop across Lagos, 60 for drone shots in Nairobi.
>
> Testnet, audit pending — worth saying if you run it.
>
> Kit: [link]

---

## 9 · Long-lead features & podcasts
*(Wired, Rest of World features, Hard Fork, fintech podcasts)*
**Quote:** Q3

> **Subject:** What changes when the money is already in the room
>
> Hi [name],
>
> A question I haven't seen anyone examine properly: how much of informal work's price is just the risk that the other person disappears?
>
> Tenda is a natural experiment in it. It's an escrow app for small gigs in Lagos, Nairobi, Accra, Johannesburg and Manila, where the money locks in a contract before the work starts and a photograph releases it. The worker can verify the funds exist before agreeing.
>
> If the design works, the interesting outcome isn't faster payment — it's whether the same job gets priced differently once nobody is carrying counterparty risk.
>
> The founder's line on why a photo is enough: *"The thing that makes escrow work on a fourteen-dollar errand isn't legal machinery. It's a photo of the package at the door — the same evidence people already send each other on WhatsApp. Except here it releases the money instead of asking for it."*
>
> It's testnet and early — this is a long-lead conversation, not a launch pitch.
>
> [signature]

---

## 10 · Templates

### Exclusive offer — one outlet, 10–14 days ahead
> **Subject:** Exclusive: Tenda's testnet launch, first look
>
> Hi [name], offering you first look at Tenda's testnet release ahead of [date].
>
> On-chain escrow for small paid work, on Solana, Base and Celo. Money locks when a gig posts; photo proof releases it; atomic 97.5/2.5 split in seconds. No admin key.
>
> Yours if you want it: early access, [founder] on record, contract addresses and explorer links, and introductions to workers in Lagos and Accra.
>
> It's testnet with the audit pending, and we'd want that in the piece. Let me know by [date].

### The one follow-up
> **Subject:** Re: [original]
>
> Following up once, then I'll stop. If it helps decide: here's the screen recording with the block explorer open alongside — post to settled, one take. [link]
>
> Thanks either way.

---

## Tracker

| Outlet | Reporter | Angle | Quote | Sent | Follow-up | Result |
|---|---|---|---|---|---|---|
| | | | | | | |
