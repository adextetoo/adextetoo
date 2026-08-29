# Tenda — Email Sequence

Seven emails. Arc: problem → education → agitation → solution → proof → urgency → final CTA.
**Success metric:** one completed gig, locked and released. Not opens.
**Exit rule:** anyone who completes a gig leaves the sequence immediately.
**Every email carries the testnet status.** Not in the footer — in the body.

---

## 1 · Day 0 — the problem

**Subject:** Somebody always has to go first
**Preview:** That's the whole problem with small work.

> You've either been on one side of this or the other.
>
> You do the delivery and hope they pay. Or you pay up front and hope the delivery happens.
>
> One of you is always carrying the risk that the other one disappears. And that risk gets priced into everything — it's why people work for less than they're worth, and why they say no to strangers who would have paid them fine.
>
> Tenda is built around removing that, not around finding you more work. When a gig is posted, the money locks in a contract first. Neither side goes first, because the contract does.
>
> I'll show you exactly how over the next few days, including the part we haven't finished.
>
> *Tenda is a testnet release — v0.4.3-testnet. The audit lands before mainnet.*
>
> **[ See how the lock works ]**

---

## 2 · Day 2 — how it works

**Subject:** Lock. Work. Approve. Release.
**Preview:** Where the money is at each step.

> Four stages. Here's where your money is in each one.
>
> **Lock** — it leaves the poster's wallet and enters the escrow contract. Under two seconds. It is now out of their control *and ours.*
> **Work** — you deliver and upload a photo or video.
> **Approve** — the poster reviews and signs once.
> **Release** — that same transaction splits it. 97.5% to you. Seconds.
>
> The part worth sitting with: **the money never travelled.** It was in the contract the entire time you were working. Approval didn't send it — it opened the lock.
>
> Which is why you can check it before you start. Open a block explorer, find the gig's contract, see the amount. We have no admin key, no pause button and no sweep function, so there's nothing to take your word for.
>
> **[ Watch a gig go from locked to settled ]**

---

## 3 · Day 4 — agitate

**Subject:** What "trust me" actually costs
**Preview:** You've been paying it the whole time.

> Every informal job you've done has had a price attached that nobody wrote down.
>
> You quoted lower because they were a stranger. You skipped the job in the next neighbourhood because you didn't know them. You took the 60% up front instead of the full amount after, because half of something beats all of nothing.
>
> That's counterparty risk, and you've been absorbing it for free.
>
> When the money is already locked, that discount has no reason to exist. The job is worth what the job is worth.
>
> That's the actual argument for escrow — not speed. Speed is nice. Not having to discount your work because someone might vanish is the point.
>
> **[ Look at what's posted ]**

---

## 4 · Day 6 — solve, and the honest gaps

**Subject:** The parts we haven't finished
**Preview:** Including the one that could cost you.

> Everyone sends the email about how good their product is. Here are the holes in ours.
>
> **We're testnet.** `v0.4.3-testnet`. The third-party audit happens before mainnet and hasn't happened yet. The contracts are open source with full test suites — read them before you deposit anything.
>
> **Auto-approve isn't live yet.** The plan is: if a poster doesn't approve or dispute within 48 hours, the contract releases to you automatically. It's built into the design and it is *not shipped.* Until it is, a poster who goes silent means you open a dispute, and Tenda mediation decides within 24 hours. That's a real gap and I'd rather you hear it from me.
>
> **What is solid:** the money is locked before you start and we cannot touch it. Cancel, reclaim and dispute all work. The 2.5% is the whole fee — 12 USDC in, 11.70 to you.
>
> **And you don't need to own crypto.** On Celo your USDC pays its own gas. On Solana we cover your first escrow. Bring Phantom or Solflare, or bring nothing.
>
> Reply to this if something's still unclear. It comes to me.
>
> **[ Try one gig ]**

---

## 5 · Day 9 — proof

**Subject:** Don't trust us. Check the chain.
**Preview:** One take, explorer open alongside.

> Everything I've said is a claim until you watch the contract do it.
>
> Here's one gig, one take, no edits — posted, locked, worked, approved, settled — with a block explorer open next to it the whole time. Every state change is a transaction you can look up yourself.
>
> **[ Watch it ]**
>
> Then check ours: the Solana program is Rust/Anchor, the EVM contracts are Solidity/Foundry, and both ship with their test suites. Contract addresses are in the app.
>
> The design goal was never "trust Tenda." It was that you shouldn't have to.
>
> **[ Take a gig ]**

---

## 6 · Day 13 — urgency

**Subject:** [[Only send with a real reason]]

> **Send only with a genuine deadline** — mainnet migration date, audit publication, a market opening. Manufactured scarcity aimed at an audience trained by scams to spot it will cost more trust than the email can earn. **If there's no real reason, skip to Email 7.**
>
> Template: state the event, the date, and what happens after, in plain sentences. Nothing else.

---

## 7 · Day 17 — final

**Subject:** Last one
**Preview:** Then I'll stop.

> Last email in this sequence — unsubscribe below and I won't take it personally.
>
> If you're still here because you've been stiffed before and you're waiting to see whether this one's different: the fastest way to know isn't another email. It's opening a gig and looking at the block explorer before you accept.
>
> If the money's there, it's there. If it isn't, don't take the job.
>
> That's the only claim we make.
>
> **[ Open the app ]**
>
> *Reply if you tried it and something broke. I'd rather know.*

---

## Transactional — the highest-open emails Tenda will ever send

**Escrow locked (to the worker, on assignment)**
> **Subject:** Locked: [[AMOUNT]] USDC is in the contract
>
> [[GIG]] is yours. The money is already in escrow — [[TX LINK]].
> Do the work, upload the proof. Approval releases it to you.

**Released**
> **Subject:** Released. [[AMOUNT]] USDC.
>
> [[POSTER]] approved. The contract paid you [[NET]] USDC in the same transaction — [[TX LINK]].
> Fee: [[FEE]] · 2.5%.

**Proof submitted (to the poster)**
> **Subject:** Proof is in — one tap to release
>
> [[WORKER]] submitted proof for [[GIG]]. Review it and approve to release the escrow.
> *Auto-approve at 48 hours is planned but not yet live — if you don't act, the funds stay locked until someone disputes.*

---

## QA

- [ ] Testnet status in the body of every campaign email
- [ ] Auto-approve described as planned, never as live
- [ ] One CTA each, all specific
- [ ] Email 6 skipped if no real deadline
- [ ] No claim absent from the landing page in the same words
- [ ] Exit rule live
