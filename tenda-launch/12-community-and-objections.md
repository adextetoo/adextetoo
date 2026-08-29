# Tenda — Community Launch & Objection Handling

Product Hunt, Hacker News, and the sceptic playbook. This document exists because Tenda's category has a trust problem it did not create but will inherit, and launch day is where that gets tested in public.

---

## Part 1 — Product Hunt

**Name:** Tenda
**Tagline (60 char max):** `Onchain microtasking. Paid the moment your task is accepted.` *(59)*

**Description**
> Tenda is a rewarding onchain microtasking app.
>
> Post a task from anywhere. Take a task from anywhere. When your completed task is accepted, you're paid in that moment — no payout minimum, no hold period, no withdrawal request.
>
> We're strict about one thing: Tenda is an application, not a marketplace. A marketplace introduces two people and steps back, leaving the work and the money on separate systems. Tenda keeps all five states of a task — post, assign, do, accept, paid — on one surface. That's the reason settlement can happen at acceptance rather than being promised for later.

**First comment (post this immediately; it sets the thread's tone)**
> Hi PH 👋
>
> I built Tenda because of a screen.
>
> Not a task screen — a payout screen. A balance I could look at and not touch, a $50 minimum I'd reach sometime next year, and a country dropdown listing 190 places, eleven of which could actually withdraw.
>
> The thing that stuck with me wasn't that it happened. It's that it was completely normal. The gap between finishing work and being paid for it is so standard here that it isn't even a complaint — it's just the shape of the industry.
>
> That gap exists for a structural reason. The work and the money have always lived on different systems: a platform introduces you, a processor pays you, a bank decides when, a compliance list decides whether. Every handoff adds an interval, and every interval is somebody's float.
>
> Tenda puts the task and the payment on the same system, so the gap stops being necessary. That's the entire reason we're onchain — it's a timing mechanism, not a philosophy.
>
> It costs us the float, which in this category is a real business model. We gave that up on purpose.
>
> **What I'd genuinely like from you today:** poke at the verification model. It's the hardest problem in microtasking and the part I'm least certain about. I'll be here all day and I'd rather have the criticism now.
>
> — [[FOUNDER]]

**Launch day rules**
- Reply to every comment within an hour. Every one.
- Answer sceptics first, compliments last.
- Never ask for upvotes. Never post the link in a "support each other" group.
- When someone finds a real flaw, say so, thank them, and say what you'll do. The thread is read by more people than the product page.

---

## Part 2 — Hacker News (Show HN)

HN is the hardest room and the most valuable one. It rewards technical honesty and punishes marketing language on sight. **Delete every persuasive sentence before posting.**

**Title:** `Show HN: Tenda – Onchain microtasking app that settles payment at task acceptance`

**Body**
> Tenda is a microtasking app where payment settles at the moment a completed task is accepted, rather than as a downstream payout process.
>
> The design constraint that drove it: settlement can only be part of task completion if the task and the payment are on the same system. On existing platforms they aren't — a marketplace handles matching, a processor handles payment, a bank sets the timing, and a compliance list sets eligibility. Each handoff adds an interval, and those intervals are why payout minimums, hold periods and country restrictions exist.
>
> We put both task posting and execution onchain so that acceptance and settlement are the same event. Trade-offs we've accepted: [[VERIFY: name them honestly — chain choice and its costs, wallet UX, what happens when the network is congested, what "instant" degrades to under load]].
>
> Open problems I'd genuinely like input on:
> - Verification. How do you accept or reject submitted work at volume without either trusting posters blindly or building a court system? [[VERIFY: describe the current approach and its known holes]]
> - AI-generated submissions. This is the live problem in microtasking right now and I don't think anyone has solved it. [[VERIFY: current approach]]
> - Sybil resistance on the earner side without heavy KYC. [[VERIFY]]
>
> Happy to answer anything, including hostile questions about the crypto part — they're fair.

**HN rules**
- No superlatives. None.
- Answer the harshest comment first, and answer it substantively.
- If someone is right, say "you're right" in those words, and don't qualify it.
- Never argue with a downvote or complain about the reception.
- Do not defend the token/chain choice with ideology. Defend it with the timing argument, or concede the point.

---

## Part 3 — The objection playbook

The category's inherited scepticism is a *feature* of the audience, not a bug in it — it's why the payout claim matters. Never treat scepticism as hostility.

### "Is this a scam?"

The single most important question. Answer it plainly, every time, without defensiveness.

> Fair question — this category has earned that reflex.
>
> The concrete answers: you never deposit anything to use Tenda. [[VERIFY]] There's no minimum you have to reach. You do a task, it's accepted, you're paid.
>
> Don't take my word for it. Here's twenty seconds, one take, no edits, of a task going from posted to paid: [link]. Then do one task yourself — that's the only proof that counts.

**Never:** get offended, say "we're not like the others," or accuse the asker of bad faith.

### "It's crypto, so I'll lose my money"

> You don't put money in, so there's nothing to lose. You do a task and money arrives.
>
> The chain is how the payment lands that fast — it's plumbing, not something you have to operate. [[VERIFY against actual onboarding: if a user must manage a wallet or hold gas, say so plainly here instead. Overstating simplicity is worse than admitting complexity.]]

### "How much can I really make?"

> It depends entirely on what's posted and how much you do. [[VERIFY: give a real range for real tasks.]]
>
> I'm not going to give you a monthly figure, because anyone who does is guessing or selling you something. What I can tell you precisely is the timing: when your task is accepted, you're paid.

**Never** state or imply an income. It's the fastest route to both regulatory trouble and the wrong users.

### "How is this different from [MTurk / Clickworker / Freecash / a quest platform]?"

> The work part is similar. The money part isn't.
>
> On those, payment is a separate process after the work — a queue, a threshold, a calendar, a country list. On Tenda it's the last state of the task itself, which is possible because the task and the payment live on the same system.
>
> Also, unlike quest platforms, the tasks here are things somebody actually needed done — not follow-and-retweet for points.

### "So it's a marketplace."

> Not quite, and the difference is the whole product.
>
> A marketplace's job ends when two people find each other; the work and the money then happen elsewhere. Tenda's job ends when the work is done and the money has moved — post, assign, do, accept and paid all live in the app.
>
> If it were a marketplace, instant settlement wouldn't be possible. You can't make payment part of finishing a task if the payment is on someone else's system.

### "What stops people submitting rubbish?" *(the poster's version)*
### "What stops posters rejecting good work to avoid paying?" *(the earner's version)*

> [[VERIFY & WRITE — both directions. This is the hardest question in the category and the most likely angle for a critical piece. Write the real mechanism, name its limits, and say what you'll do when it fails. A vague reassurance here is worse than admitting an open problem — HN and journalists will both find the gap, and the honest version is the only one that survives contact.]]

### "This is just tap-to-earn again"

> The loop is similar and I think that's the interesting part — tap-to-earn proved hundreds of millions of people will do small repetitive things on a phone.
>
> The difference is what's on both ends. Those games paid in odds for work nobody needed. Here it's a task someone commissioned, and money that settles when it's accepted.

### "Why does this need a blockchain?"

> Because settlement has to be part of task completion, and that's only possible if the task and the payment are on the same system.
>
> Honestly: if a payment rail existed that could settle to anyone, anywhere, in that moment, we'd have used it. There isn't one. That's the whole argument, and if it stops being true I'd happily switch.

**Never:** answer this with decentralisation, censorship-resistance, or ownership. Those answers are true for some products and are not the reason for this one, and HN in particular can tell the difference instantly.

---

## Part 4 — Community moderation

**Where the users actually are:** Telegram, WhatsApp groups, TikTok comments, and local Facebook groups — not X or LinkedIn. Staff those channels.

**The rule for every channel:** when someone says they weren't paid, respond publicly, specifically, and fast. Never move it to DMs as a first move — public resolution is worth more than private resolution, because in this category the audience assumes silence means guilt.

**Do not:**
- Run referral schemes that pay for recruitment rather than for work. In this category that is indistinguishable from the thing everyone is afraid of, and it will be described that way.
- Use "community" language that implies membership in something appreciating in value.
- Delete critical comments. Answer them. A deleted complaint becomes a screenshot.
- Post earnings screenshots from unusually successful users as though they were typical.

**Do:**
- Publish settlement data if it's good. Median seconds from acceptance to payment, countries paid into, uptime. Real numbers are the only durable answer to the scam question.
- Let earners speak for themselves, with names and countries and permission.
- Answer the same question the hundredth time with the same care as the first.
