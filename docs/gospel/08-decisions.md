# FPPF - Decisions

**Status: in operation since 2026-11-17; text last reconciled with the run log on 2026-11-21 by the GM. Where `docs/gm/run_log.md` standing rulings disagree with this document, the run log wins. Formal ratification by the Principal is still open. Skookr references below name the studio template this was modeled on and are not dependencies.**
Gospel document 8 of 8. Modeled on the skookr Decisions log. Each entry records a ruling, its date, and its status. **Logging a decision entry needs the Principal's approval,** so every entry below is **PROPOSED, recorded from his statements and awaiting his confirmation.** A Principal ruling embedded in any document changes only through a new ruling from him.

Entries use the studio's fields: ID, date, title, status, supersedes or amends, ruling.

## Index (newest first)

| ID | Date | Title | Status |
| --- | --- | --- | --- |
| D-015 | 2026-11-19 | Product: four jobs, three-part onboarding, voice rules | GM DECISION with the Principal |
| D-014 | 2026-11-18 | Brand "First Principles Money"; line "Put your money where your mind is" | PRINCIPAL |
| D-013 | 2026-11-18 | The six F's are internal only; public surfaces use plain words | GM DECISION |
| D-012 | 2026-11-18 | Product direction: plan a way out, with a bounded loss | GM DECISION (hypothesis) |
| D-011 | 2026-11-18 | Customer is the trapped person; product closes the gap | GM DECISION (hypothesis) |
| D-010 | 2026-11-17 | Operating mode: chat-only, scheduled task declined | PROPOSED |
| D-009 | 2026-11-17 | Framework principles are protected | PROPOSED |
| D-008 | 2026-11-17 | Daily check-in at 7:00 AM Mountain | PROPOSED |
| D-007 | 2026-11-17 | Legal gate sequence | PROPOSED |
| D-006 | 2026-11-17 | Hosting on Vercel | PROPOSED |
| D-005 | 2026-11-17 | Own brand and domain. The Principal's name is not used without his oversight | PROPOSED |
| D-004 | 2026-11-17 | Ratified patterns P-1 and P-2 | PROPOSED |
| D-003 | 2026-11-17 | Budget envelope of about $100 per month | PROPOSED |
| D-002 | 2026-11-17 | Positioning: education and self-assessment, not advice | PROPOSED |
| D-001 | 2026-11-17 | Name: FPPF (First Principles Personal Finance) | PROPOSED |

## Entries

**D-017, 2026-11-20, Alignment reading on /keep.** Status: GM DECISION, from the Principal's notes of 2026-11-20. Supersedes the "no scores" part of D-016. One score with its rule printed beside it (toward divided by toward plus against; needs and ending costs left out). The person sets the basecamp number, the lanes and the unit price. No threshold is ours. Revert: remove the score from `/keep`.

**D-016, 2026-11-19, Core value is money against mind.** Status: the Principal's ruling. Months of savings is a supporting measure, not the lead. Every surface leads with money against what matters to the person. Sleep on it and a browser extension are on hold until he says they are validated.

**D-015, 2026-11-19, Product definition.** Status: GM DECISION, worked out with the Principal over 2026-11-18 and 2026-11-19, no customer data. The product holds what a person wants, tells them whether they are on solid ground for it, shows what is in the way closing and why, and lets them test a decision before they make it. Onboarding has three parts: about you, your situation, your money. Eighteen of the 24 Snapshot questions are kept and the grades are retired. Public copy follows the voice rules. Full record: `docs/gm/product_direction.md`. Revert: delete that file and this entry.

**D-014, 2026-11-18, Brand and positioning (the Principal's words).** Status: the Principal's direction, given in chat. The public name is "First Principles Money", matching the domain. The headline is "Put your money where your mind is". The description is: "First Principles Money is a personal finance platform to help you get untrapped from the endless rat race through mapping what you want against what you have and how you spend." He called the sentence incomplete and a working draft. The GM changed one word on the page ("through" to "by") and set the headline in sentence case. This supersedes the 2026-11-17 brand line ("First Principles Personal Finance", tagline "Are your finances built on first principles?"). The trademark cautions in `docs/gm/legal_memo_addenda.md` apply to the new name equally. Revert: restore `BRAND` and `TAGLINE` in `lib/site.ts`.

**D-013, 2026-11-18, Public language.** Status: GM DECISION, on the Principal's feedback that the six F's read as cheesy and over-engineered to someone who just wants help. The six F's stay as the GM's internal model for ordering principles. No public page uses the F names or the phrase "six stages". The Snapshot's areas carry plain names (for example "Money in and out"). The home page is one frame that shows the product working. The Snapshot stays as a second door for now; rework or retire it on E-001 data. Revert: restore the names in `lib/snapshot.ts`.

**D-012, 2026-11-18, Product direction.** Status: GM DECISION, a hypothesis under experiment E-001. The product helps the trapped person (D-011) plan a way out: name what they want, model the journey in phases, set a boundary on the loss, see a range of outcomes from their own assumptions, hit checkpoints, and check the plan against sound principles. The six F's become the principles under the plan. Longer-term shape, not built: regular updates on whether the person is moving toward or away from what they said they wanted, first from a manual check-in, later from read-only account connections. Connections and any subscription need a floor change by the Principal and counsel first. The Principal's direction on 2026-11-18: commit fully and be bold. Rule R1 revised the same day to allow labeled projections.

**D-011, 2026-11-18, Customer and product thesis.** Status: GM DECISION, a hypothesis with a kill rule. The Principal stated the studio goal (a profitable venture with positive impact for as many people as possible) and told the GM to decide. Decision: the customer is the trapped person, first segment the trapped middle manager already named in document 3. The product's job is closing the gap between the life they fund and the life they want. The six F's stay as the engine. Six alignment gaps and the kill rule are listed in document 3. Alternatives considered and ranked lower: people in a money shock (urgent but least able to pay, and closest to the advice line), young adults starting out (large, crowded, low willingness to pay), employers (pays, but needs outreach the floor forbids and a long sales cycle). Evidence: reasoning and the Principal's direction only. No customer data yet.

**D-010, 2026-11-17, Operating mode.** Status: PROPOSED. Amends: charter v1.1 section 9. Ruling: the Principal declined creation of a scheduled daily-brief task. Until he rules otherwise, there is no unattended operation. The brief is produced when he opens a chat. Open item I-003.

**D-009, 2026-11-17, Framework principles are protected.** Status: PROPOSED. Ruling: the soul principle, behavior over self-rating, no shaming, and interest-rate arbitrage sequencing over zero-debt-first change only with the Principal's approval. Everything else in the framework is the GM's to reshape, with every change logged. (Recorded from charter v1.1 section 4, which the Principal has not objected to. Confirm.)

**D-008, 2026-11-17, Daily check-in.** Status: PROPOSED. Ruling: the Principal checks in once a day at 7:00 AM Mountain. The GM does not treat him as a bottleneck. Blocked items are parked and the work moves on.

**D-007, 2026-11-17, Legal gate sequence.** Status: PROPOSED. Ruling (the Principal, 2026-11-17): the GM runs its own internal legal review first. At that point the Principal decides go or no go on outside counsel. Detail in charter section 7, item 5.

**D-006, 2026-11-17, Hosting.** Status: PROPOSED. Ruling: FPPF is hosted on Vercel. Other tools (AWS, Google, Postmark, others) are allowed where needed within the envelope. Deploy path: push to a GitHub repo, Vercel deploys. (Added by the GM: the GM's sandbox cannot reach Vercel directly.)

**D-005, 2026-11-17, Brand and name use.** Status: PROPOSED. Ruling: FPPF goes live with its own brand and its own domain. The GM does not use the Principal's name without his oversight. Open item I-001 covers the brand name and domain.

**D-004, 2026-11-17, Ratified patterns.** Status: PROPOSED. Ruling (the Principal, 2026-11-17): marketing tests and product enhancements that are legal need no approval. He gets a daily FYI of what is being tested and learned. Recorded as patterns P-1 and P-2 in charter section 2. **Not covered:** pricing, paid referral deals, spend beyond the envelope, use of his name (D-005). **Note:** charter v1.1 treated pricing tests as marketing tests. That was the GM's reading, not the Principal's words. Open item I-002.

**D-003, 2026-11-17, Budget.** Status: PROPOSED. Ruling: about $100 per month, all-in, across hosting, email, AI inference, domain, and test spend. A new recurring cost over $20 per month, or anything that pushes a month past the envelope, goes to the Principal. (The $20 trigger is the GM's proposal from charter v1.1. Confirm.)

**D-002, 2026-11-17, Positioning.** Status: PROPOSED. Ruling (the Principal): education and self-assessment, not personalized investment advice. The goal is aligning personal finances to principles.

**D-001, 2026-11-17, Name.** Status: PROPOSED. Ruling (the Principal): the framework is called FPPF, First Principles Personal Finance. It supersedes "First Principles Finance". Rationale: the mirrored structure, and "Personal" is more precise about who it is for. Whether the consumer-facing brand is also "FPPF" is open (I-001).
