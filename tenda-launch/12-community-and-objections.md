# Tenda — Community & Objection Playbook

Hacker News, ecosystem forums, and the questions that decide whether this launch survives contact.

---

## Show HN

**Title:** `Show HN: Tenda – On-chain escrow for small gigs, on Solana, Base and Celo`

**Body**
> Tenda is an escrow application for small paid work. A gig is posted, the poster's funds leave their wallet and lock in an on-chain contract (<2s), the worker delivers and uploads photo proof, the poster signs one approval, and the same transaction splits the funds 97.5/2.5 and settles.
>
> The premise is that escrow has always been correct for this problem and never usable at this size — the operational cost of holding and adjudicating funds swamps an $11 delivery. A contract's overhead is cents, which is the only reason this is possible now.
>
> Design decisions worth criticising:
> - **No admin key, no pause button, no sweep function.** We can't move user funds. This also means we can't fix a stuck escrow outside the defined exits.
> - **Four exits:** cancel (pre-accept), reclaim (post-deadline), dispute (≤24h, mediated), auto-approve (48h). **Auto-approve is designed and NOT shipped.** Until it is, a poster who neither approves nor disputes leaves funds locked until someone opens a dispute. That's the biggest hole and we know it.
> - **Dispute mediation is centralised.** Mediation instructs the contract; it can't move funds arbitrarily and every outcome is an on-chain receipt. It is still a trusted party, and I'd rather argue about that than pretend otherwise.
> - **Proof is a photo.** Works for a delivery. Weaker for "fix a broken Shopify checkout." We don't have a good answer for verifying digital work yet.
> - **Gas:** Celo `feeCurrency` so USDC pays its own fees; a one-time SOL grant on Solana; Base Paymaster in progress.
>
> `v0.4.3-testnet`. **Not audited** — a third-party audit lands before mainnet. Solana program is Rust/Anchor, EVM is Solidity/Foundry, both with test suites. Addresses and repos in the comments.
>
> I'd rather you break it now than after mainnet.

**Rules:** answer the harshest comment first. If someone is right, say "you're right" without qualification. Never defend the chain choice ideologically — defend it on settlement time and gas mechanics, or concede. Never argue with a downvote.

---

## The objection playbook

### "It's not audited. Why should anyone touch it?"
> They shouldn't, with real money — it's testnet, and that's exactly why it's testnet. The audit lands before mainnet.
>
> What we can offer meanwhile is the source, with full test suites. Read it. That's a better basis than our reassurance, and it's the same basis we'd want in your position.

### "Tenda mediation decides disputes. So it *is* a trusted third party."
> Yes, for disputes. That's a real limitation and I won't argue it away.
>
> The scope is narrower than it sounds: mediation instructs the contract, it can't move funds arbitrarily, and every outcome is an on-chain receipt both parties can see. But someone is making a judgement call, and that someone is us. [[VERIFY: who mediates, and under what published standard — answer this specifically or the concession reads as evasion]]

### "Auto-approve isn't live, so a poster can just sit on my money."
> Correct, and this is the sharpest gap in the product right now.
>
> Today your recourse is a dispute, resolved within 24 hours. The 48-hour auto-release is designed and not shipped. We say "planned" on the site rather than implying it works, and it's the next thing.

**Never** soften this one. It appears on the site as "planned," and any inconsistency between the site and a founder's answer is exactly what a sceptical reader is scanning for.

### "How is this different from Binance P2P?"
> Binance holds the funds and can freeze them. Our contract holds them and we can't — no admin key, no pause button, no sweep function.
>
> The trade-off is real and cuts both ways: Binance can reverse a mistake, and we can't. If you want a company that can intervene, use one. If you'd rather the money sat somewhere no company can reach, that's us.

### "Is this a scam?"
> Fair question, and the honest answer is that you shouldn't have to trust my answer.
>
> The money in any gig is in a contract you can open in a block explorer before you accept anything. You never deposit to Tenda — funds move from the poster's own wallet into the contract. We take 2.5% at release and nothing else.
>
> We're testnet and unaudited, and I'd rather say that than have you find it out.

### "I don't have any crypto."
> You don't need any to start. On Celo network fees come out of the USDC you're transacting. On Solana we seed your first wallet with enough SOL for a complete escrow. Bring Phantom or Solflare, or bring nothing.

### "Photo proof is trivially gameable."
> For a delivery it's reasonable — the photo is at the door, on a deadline, from a worker with an on-chain history of completed gigs.
>
> For digital work it's much weaker, and we don't have a good answer yet. That's a genuine open problem, not a solved one, and if you have a design I'd rather hear it than defend the current one.

### "Why three chains? Isn't that just marketing?"
> Each one does something specific. Solana gives sub-second settlement, which is what makes it feel like handing over cash. Base gives USDC-native rails and the shortest path from a Coinbase account. Celo lets USDC pay its own gas, which removes the single biggest onboarding drop-off.
>
> Same contracts, same guarantees, on all three.

### "So it's a marketplace."
> It's an escrow application. Gigs and Exchange are two surfaces over one contract, and the contract is the product — a marketplace's job ends when two people find each other, and ours is the money.
>
> *(Our own site currently says "Marketplace · Gigs." That's wrong and we're changing it.)*

---

## Moderation

**Where users are:** WhatsApp, Telegram, TikTok, local Facebook groups — not X or LinkedIn.

**Rules**
- When someone says they weren't paid: respond publicly, fast, with the transaction. Never DM first — in this category, silence reads as guilt.
- Publish what security researchers find, and what was fixed. Pre-audit, that is the strongest trust asset available.
- Never delete criticism. A deleted complaint becomes a screenshot.
- Never run referral schemes that pay for recruitment rather than work. In these markets that is indistinguishable from the thing everyone fears, and it will be described that way.
- Never post an unusually successful worker's earnings as though typical.
