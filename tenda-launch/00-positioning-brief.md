# Tenda — Positioning Brief

**Source of truth:** `FACTS.md`, drawn entirely from tendahq.com. Every claim below traces to a line there.

---

## 1. What Tenda actually is

An **on-chain escrow application** with two surfaces built on one contract:

- **Gigs** — post or accept small paid tasks in five categories, settled in USDC
- **Exchange** — P2P crypto ↔ local cash across 8 fiat markets

The escrow is the product. Gigs and Exchange are what it powers.

**The mechanic:** money leaves the poster's wallet and locks in an on-chain contract the moment a gig posts. The worker delivers and uploads photo or video proof. The poster approves with one signature. In that same transaction, the contract splits the funds — 97.5% to the worker, 2.5% to Tenda. Settlement in seconds, on Solana, Base or Celo.

Tenda has no admin key, no pause button, no sweep function.

---

## 2. The campaign angle

> ### The money is already there.

Not "get paid fast." Not "trust our platform." The funds were locked in a contract **before the worker lifted a finger** — visible in a block explorer, outside anyone's control including Tenda's.

This angle is chosen over three alternatives because it does the most work at once:

| It answers | The earner's real fear — *will I actually get paid?* Not with a promise, but with a contract address they can check before starting. |
|---|---|
| It explains the speed | "Instant payment" is credible because the money didn't have to travel. It was already in escrow. Release is a signature, not a transfer. |
| It covers both products | A gig worker in Lagos and a P2P trader in Accra have the identical fear: *the other side disappears.* Same answer for both. |
| It can't be borrowed | A competitor cannot run this campaign without first putting funds in a contract they don't control. |

**Tenda's own hero line — "The escrow does the trusting" — is excellent and stays as the brand line.** The campaign angle is its consequence, stated from the worker's side.

---

## 3. Audience

### 3A · The worker / earner — primary

**Who:** phone-first, 18–35, in Lagos, Nairobi, Accra, Johannesburg, Manila. Riders, photographers, handypeople, translators, small-shop digital freelancers. The gig list tells you exactly who: someone who will bike a laptop across Ikeja for 11 USDC, stand in a Johannesburg ticket queue for 14, or shoot a Nairobi building site by drone for 60.

**Job to be done:** "Earn from the informal work I already do, without getting stiffed."

**Fears, in the order they occur:**
1. I do the job and they don't pay. *(The universal fear of informal work.)*
2. I can't prove I did it.
3. It's crypto — I'll need to buy some other coin first, and I don't have one.
4. I can't turn USDC into money I can spend today.
5. It's a scam.

**Their language:** "did they pay you," "cash out," "how much," "MoMo," "M-Pesa," "is it legit," "no upfront."

**Alternatives:** WhatsApp and Telegram gig groups; local errand apps; Fiverr; word of mouth. In all of them, payment is a promise from a stranger.

### 3B · The poster — secondary

**Who:** small businesses, event organisers, shop owners, remote founders needing local hands.

**Fears:** paying up front and getting nothing; no recourse; the money being stuck.

**What Tenda answers:** Cancel before acceptance, Reclaim after a missed deadline, Dispute after proof. Funds are never stuck — every gig has a deterministic exit.

### 3C · The P2P trader — the exchange side

**Who:** anyone moving between USDC/SOL/ETH and NGN, GHS, KES, ZAR, PHP, USD, GBP, EUR.

**Fear:** the classic P2P nightmare — release the crypto, the fiat never lands. Or send the fiat, the crypto never releases.

**Alternatives:** Binance P2P, Paxful-style desks, Telegram OTC groups. All require someone to move first, or trust a platform holding the funds.

---

## 4. Competitive map

| Player | Model | Where Tenda differs |
|---|---|---|
| **WhatsApp / Telegram gig groups** | The real incumbent in these markets | Zero escrow. Payment is a promise. Tenda is the same social flow with the money already locked. |
| **Binance P2P** | Custodial escrow inside an exchange | Binance holds the funds and can freeze them. Tenda's contract holds them and Tenda cannot touch them — no admin key, no pause, no sweep. |
| **Fiverr / Upwork** | Platform-held escrow, project-scale | Built for $500 projects, not 11-USDC deliveries. Platform-held balances, payout schedules, country restrictions. |
| **Local errand apps** (Gokada, Sendy-style) | Closed, single-market, fiat | One vertical, one country, company holds the float. Tenda is five categories across markets, funds in a contract. |
| **Layer3 / Galxe** | Onchain quests | Marketing engagement for points. Nothing anyone needed done gets done. |
| **Escrow.com** | Regulated escrow | Days, paperwork, minimums. Tenda locks in under two seconds for a 12-USDC package run. |

**The gap nobody occupies:** escrow small enough to be worth using on an 11-dollar errand. Traditional escrow's overhead exceeds the value of the work. A contract's doesn't.

---

## 5. The three insights the campaign exploits

**Insight 1 — In informal work, the problem was never discovery. It's that somebody has to go first.**
Everyone in Lagos knows someone who can bike a laptop across town. The reason that work stays informal and underpaid is that one party must extend trust to a stranger with no recourse. Tenda's answer isn't a better match — it's that *neither side goes first.* The contract does.

**Insight 2 — "You need crypto to use crypto" is the real adoption wall, and Tenda has actually removed it.**
Most people quit at *"first, buy a gas token."* Tenda deletes that step three different ways: on Celo your USDC pays its own gas; on Solana a one-time grant covers your first full escrow; on Base, sponsored transactions are in progress. This is a genuine consumer story, not a technical footnote, and it is under-told on the site relative to its importance.

**Insight 3 — Proof-of-work-done is a photograph.**
The thing that makes escrow work for a 14-dollar errand isn't legal machinery, it's a photo of the package at the door. Tenda's release condition is the same evidence people already send each other on WhatsApp — except here it releases money instead of asking for it.

---

## 6. Positioning

**Core benefit statement**
> On Tenda, the money is locked before the work starts — so getting paid isn't a promise, it's a release.

**Positioning formula**
> **Tenda** helps **people doing and paying for small work in cash-first markets** **transact with strangers without either side going first**, by **locking funds in an on-chain escrow that only releases against proof — with no gas token to buy and no platform holding the money.**

**Message hierarchy**
1. **The money is locked before you start.** *(the benefit)*
2. **Proof releases it — a photo, one approval, seconds to settle.** *(the mechanism)*
3. **No gas token, no platform balance, no admin key.** *(the reasons to believe)*

**Why "application, not marketplace" is true here — and how to say it**

Tenda's own site labels the gigs surface `MARKETPLACE · GIGS`. That label undersells the product and contradicts the positioning. The accurate framing:

> A marketplace's job ends when two parties find each other; the money is somebody else's problem afterwards. Tenda's job is the money. It is an escrow application — Gigs and Exchange are two surfaces over one contract, and the contract is the product.

**Recommendation:** change the site label to `GIGS` or `TENDA / GIGS`. Right now the site is arguing against its own positioning in a place every journalist will screenshot.

---

## 7. Tone

**Voice:** a builder who has been stiffed on an invoice and decided to fix it with a contract instead of a complaints process.

**Rules**
1. **The contract is the proof.** Where a claim can be checked on-chain, say so. "Verify it in the block explorer" is the most persuasive sentence available.
2. **Concrete amounts, real gigs.** "11 USDC to bike a laptop across Ikeja" beats "microtasks" every time. The site's own gig list is the best copy Tenda has.
3. **Crypto is plumbing.** The gas story is told as *"you don't need to own crypto"*, never as a technical achievement.
4. **Never overstate the stage.** It is testnet. Say testnet.
5. **No hype adjectives.** Verbs and numbers.

**Banned:** `revolutionary` · `game-changing` · `seamless` · `empower` · `unlock` · `disrupt` · `leverage` · `frictionless` · `trustless` *(say what it means instead)* · `ecosystem` meaning our product · `learn more` · `thousands trust us`

**Also banned:** any phrasing implying mainnet, real-money availability, or a completed audit.

**Vocabulary**

| Concept | Say | Never say |
|---|---|---|
| Person posting | **Poster** | employer, client, buyer |
| Person working | **Worker** | gig worker, taskee |
| Unit of work | **Gig** or **task** | bounty, quest |
| The product | **Escrow app / application** | marketplace, platform |
| Payment | **Release** / **settles** | payout, withdrawal, disbursement |
| The flow | **Lock → Work → Approve → Release** | funnel, pipeline |
