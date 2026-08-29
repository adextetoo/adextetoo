# Tenda — Media Kit

---

## 1. Fact sheet

| | |
|---|---|
| **Name** | Tenda *(wordmark: `tenda.`)* |
| **What it is** | On-chain escrow application for small paid work |
| **Two surfaces** | **Gigs** — post/accept tasks in 5 categories · **Exchange** — P2P crypto ↔ local cash |
| **Release** | `v0.4.3-testnet` — **testnet** |
| **Audit** | **Pending. Not yet audited.** Third-party audit due before public mainnet |
| **Chains** | Solana · Base · Celo |
| **Assets in escrow** | USDC · SOL · ETH |
| **Escrow lock time** | < 2 seconds |
| **Fee** | 2.5% flat, deducted at release *(12 USDC → 11.70 worker / 0.30 Tenda)* |
| **Custody** | Self-custody. Funds move from the user's own wallet into the contract. **No admin key, no pause button, no sweep function** |
| **Release condition** | Photo or video proof + one poster approval; atomic split in the same transaction |
| **Gig categories** | delivery · photo · errand · service · digital |
| **Observed gig range** | 11–60 USDC |
| **Fiat markets** | 8 — NGN, GHS, KES, ZAR, PHP, USD, GBP, EUR |
| **Cash rails** | Bank transfer · M-Pesa · MoMo · GCash |
| **Wallets** | Phantom · Solflare · 400+ via Reown AppKit |
| **Gas handling** | Celo: USDC pays its own gas (`feeCurrency`). Solana: one-time gas grant. Base: Paymaster sponsorship *in progress* |
| **Source** | Open. Solana program Rust/Anchor; EVM Solidity/Foundry; full test suites |
| **Access** | Web app + downloadable app |
| **Website** | tendahq.com |
| **Founder** | [[UNKNOWN — supply name and title]] |
| **Mainnet date / audit firm** | [[UNKNOWN]] |
| **App stores** | [[UNKNOWN — is "Download App" iOS, Android, or both?]] |
| **KYC** | [[UNKNOWN]] |
| **Token** | [[UNKNOWN — no token appears anywhere on the site; confirm "none" before answering]] |

---

## 2. Boilerplate

**Long (75 words)**
> Tenda is an on-chain escrow application for small paid work. When a gig is posted, funds leave the poster's wallet and lock in a contract on Solana, Base or Celo; the worker delivers and uploads photo proof; one approval releases 97.5% to the worker in seconds, with a 2.5% flat fee. Tenda holds no balances and has no admin key. Tenda is currently a testnet release (v0.4.3-testnet) with a third-party audit due before mainnet. tendahq.com

**Short (30 words)**
> Tenda is an on-chain escrow app for small paid work. Funds lock when a gig posts, photo proof releases them, and settlement takes seconds. Currently a testnet release. tendahq.com

**Ultra-short (15 words)**
> Tenda is an on-chain escrow app where the money locks before the work starts.

---

## 3. The flow

```
   LOCK  ────▶   WORK   ────▶  APPROVE  ────▶  RELEASE
  poster        worker         poster        program · atomic
  < 2s          photo proof    one signature  97.5% / 2.5% · seconds
```

**Worked example, from the site:** 12 USDC locked → `PROOF SUBMITTED` (photo, 2 files) → `APPROVED` → `SETTLED`: payout **11.70 USDC**, fee **0.30 USDC**.

**Quotable:** *The money doesn't travel when you're paid. It was already there — approval just opens the lock.*

---

## 4. A note for writers

**Please describe Tenda as an escrow application.** Gigs and Exchange are two surfaces over one contract; the contract is the product. *(Note: the site currently labels the gigs surface "Marketplace · Gigs" — that label is being corrected and does not reflect the product.)*

**Please also carry the release stage.** Tenda is testnet, and the audit is not complete. We would rather a smaller story that is accurate.

| Instead of | Write |
|---|---|
| a marketplace for gig work | an on-chain escrow application for small paid work |
| Tenda holds the funds in escrow | the funds are held by an on-chain contract; Tenda has no admin key |
| users withdraw their earnings | approval releases the funds to the worker |
| a crypto gig platform | an escrow app for gigs and P2P trades |
| Tenda is live | Tenda is a testnet release; mainnet follows a third-party audit |
| trustless | nobody has to go first — the contract holds the money |

**Terms:** Poster · Worker · Gig · Lock / Work / Approve / Release · Proof · Escrow

---

## 5. Quote bank

Assign one per outlet; never double-assign. All require `[[FOUNDER]]` approval.

**Q1 — The core** *(default)*
> "In informal work the problem was never finding someone to do the job. It's that somebody always has to go first. The worker does the job and hopes, or the poster pays up front and hopes. We made it so neither of them goes first — the contract does."

**Q2 — Escrow at errand scale** *(business, fintech)*
> "Escrow has existed for decades and has never once been used on an eleven-dollar delivery, because the paperwork costs more than the job. A contract's overhead is a few cents. That's the entire opening."

**Q3 — Proof is a photograph** *(features, product press)*
> "The thing that makes escrow work on a fourteen-dollar errand isn't legal machinery. It's a photo of the package at the door — the same evidence people already send each other on WhatsApp. Except here it releases the money instead of asking for it."

**Q4 — No admin key** *(crypto, security)*
> "We'd rather people read the contracts than take our word for anything. No admin key, no pause button, no sweep function. If you have to trust us, we built it wrong."

**Q5 — The gas wall** *(consumer crypto, ecosystem)*
> "Most people quit crypto at 'first, buy a gas token.' That's not a user failure, it's a design failure. On Celo your USDC pays its own gas; on Solana we cover your first escrow. That part is ours to solve, not yours."

**Q6 — On shipping testnet-first** *(use when asked why launch before audit)*
> "We're testnet and we say so. The contracts are open and the test suites ship with them — read them end to end before you deposit anything. We'd rather be small and checkable than big and taken on faith."

---

## 6. Journalist FAQ

**Q: Is this live? Can I use it with real money?**
It is a testnet release, `v0.4.3-testnet`. Mainnet follows a third-party audit that has not yet been completed.

**Q: Where does the money sit during a job?**
In the on-chain escrow contract — not a Tenda account, not the worker's wallet. Tenda has no admin key, pause button or sweep function. The same contract logic runs on Solana, Base and Celo, and any settlement is inspectable in that chain's block explorer.

**Q: What stops a worker taking a job and vanishing?**
Nothing is paid until proof clears. If the worker walks, funds return to the poster once the proof deadline passes — the poster claims the refund on-chain. Workers also accumulate public history: `completed_gigs` is tracked on-chain; ratings, reviews and dispute counts are held off-chain by Tenda and shown on every profile.

**Q: What stops a poster refusing to approve after good work?**
Two routes. **Dispute:** either side can escalate after proof is submitted, and Tenda mediation reviews evidence and instructs the contract to release or refund, within 24 hours. **Auto-approve:** a 48-hour window after which funds release automatically to the worker — **this route is planned and not yet live.** Until it ships, dispute is the only recourse against a silent poster. *(Expect this question. Answer it exactly this way — it is the sharpest gap in the product and evasion here would be found immediately.)*

**Q: Isn't Tenda mediation a central point of trust?**
Yes, for disputes specifically. Mediation instructs the contract; it cannot move funds arbitrarily, and the outcome is an on-chain receipt both sides can see. [[VERIFY: who mediates, and what governs the decision]]

**Q: How much does it cost?**
2.5% flat, taken at release. A 12 USDC gig pays the worker 11.70.

**Q: Do I need to own crypto to start?**
No. On Celo, network fees come out of the USDC you're already transacting. On Solana, a one-time grant seeds your first wallet with enough SOL for a complete escrow lifecycle. On Base, sponsored transactions are in progress. Bring Phantom, Solflare, or any of 400+ wallets via Reown AppKit.

**Q: Is there a token?**
[[UNKNOWN — no token appears on the site. Confirm and answer plainly; evasion here costs more than any answer.]]

**Q: How do people turn USDC into spendable money?**
Through Tenda Exchange — P2P trades against 8 fiat currencies over bank transfer, M-Pesa, MoMo and GCash, with the same escrow releasing only when both sides confirm.

**Q: What's the AI-generated-submission risk on digital gigs?**
[[VERIFY. Proof for a delivery is a photo; proof for "fix a broken Shopify checkout" is not. Expect this question on the digital category specifically.]]

---

## 7. Asset checklist

- [ ] Logo — `tenda.` wordmark, SVG + PNG, light and dark
- [ ] App icon 1024×1024
- [ ] Founder headshot, name and title
- [ ] **Screen recording, one take, unedited: post → lock → proof → approve → settled, with the block explorer open alongside.** The explorer is what makes it evidence rather than animation. Nothing else in this kit works as hard.
- [ ] Screenshots: gig list with real amounts · escrow locked state · proof upload · approved · settled with the 11.70/0.30 split visible
- [ ] The four-stage flow diagram, SVG + PNG
- [ ] Contract addresses on all three testnets + explorer links
- [ ] Links to the open-source repos
- [ ] Press release, `.docx` and plain text

---

## 8. Correction protocol

Correct these three immediately, every time:

1. **Any claim that Tenda is live on mainnet, or audited.** This is the one that matters most.
2. **Any claim that Tenda holds user funds.** The contract does; Tenda has no admin key.
3. **Any wrong fee or split figure.**

Let "marketplace" go — reply once with §4 and move on. Fix the site label instead.
