# FPPF - The Process

**Status: DRAFT, 2026-11-17. Awaiting the Principal's ratification.**
Gospel document 6 of 8. Modeled on the skookr Process, condensed for a lean product. Stages and gates are the studio's. FPPF-specific additions are marked **(FPPF)**.

## The spine

Every piece of work, in any pipeline, obeys three things:

1. **It opens with the customer experience:** "As an FPPF user, I need ______ so that I can ______." Work that cannot produce the sentence does not get done.
2. **It lives in one tracker, in three pipelines:** Product, Growth, Operations. The IDS list (document 5) sits above all three. Linear is the studio's tracker. Until it is reconnected, issues live in document 5 and in the project.
3. **It is readable without context** at every stage. The issue tells a stranger what is being built and why.

## Shared intake and triage

**Intake gates.** Every item carries the user story sentence or it bounces. Before an item earns the backlog: duplicates merged, already-shipped verified against the live product and closed, previously-rejected closed with a pointer to its ruling.

**Triage (weekly).** Signals in, the GM ranks, the Principal decides. Every candidate is sized against the scorecard and the rocks: which of the 10 metrics does it move, by roughly how much, and does it advance a current rock? An item that can name neither is questioned before it is ranked.

**Prioritize and fund.** The Principal approves the queue and the spend envelope per initiative. Every candidate is priced before it reaches him (build cost plus run cost plus margin impact). The envelope is enforced after: burn tracked, a breach stops dispatch until re-decided.

## Pipeline 1: Product

**Tiers are structural, assigned at dispatch:**

| Tier | Trigger | Path |
| --- | --- | --- |
| 1 | Adds a screen or changes a flow | All stages below |
| 2 | Changes an existing surface, no new flow | Concept note, Technical Design, Build, Verify, Ship |
| 3 | Bug fix, copy, internal change | Technical Design (reuse check), Build, Verify, Ship |

**Stages:**
- **Need Definition (Tier 1).** Prove the need is real before anything is designed. User story, evidence of need, measurable success. If a credible Need Definition cannot be written, the feature is not ready.
- **Experience and solution concepting (Tier 1; a concept note for Tier 2).** Decide what the experience is before pixels or code. Delivered as 2 to 4 variants with tradeoffs, never a prose wall.
- **UI design (Tier 1).** The chosen concept becomes screens, against the design system and the brand and writing standards. A recorded brand-conformance pass: **the author never certifies their own work.**
- **Acceptance criteria (every tier, before any build).** Every criterion carries a number or a testable predicate. A criterion that can be a test becomes a test.
- **Domain-truth review (FPPF).** Any financial fact FPPF asserts anywhere (a threshold, a sequencing rule, a tax-account claim, an interest-rate cutoff) is checked against a cited source or an honest "verify with a professional". Cite the instrument or do not ship. Assessment scoring logic and question wording that implies advice are checked here against the floor.
- **Technical Design (every tier, never drops out).** Reuse reconciliation, the instrumentation plan (no feature ships unmeasurable), and the run-cost review against the margin goal.
- **Build.** Isolated work, small file-disjoint tasks, no production credentials.
- **Verify.** Tests, then every acceptance criterion checked against the **running product, never the diff.** Failures revert. Conformance to any ratified pattern (P-1, P-2) and the floor is confirmed here.
- **Simulated end-to-end testing (Tier 1 and anything customer-visible).** Segment personas travel the live staging build end to end. **The Principal is never the first user to hit a problem.**
- **Principal staging pass (Tier 1).** Tier 1 promotes to production only on his sign-off. Tiers 2 and 3 ship and then ping.
- **Ship.** Live means verified deployed and serving, never inferred from a merge.
- **Feed the market (Tier 1).** The ship spawns Growth tickets: release note, broadcast work, funnel experiments. A feature the market never hears about is half-shipped.

## Pipeline 2: Growth

**Intake, Planned, Producing, Principal review, Live, Measured**

- **Planned** means the ticket states the hypothesis, the audience, the channel, how success is measured, which metric or rock it serves, and whether it needs approval.
- **Principal review** arrives with a recorded brand-conformance pass. Under ratified pattern P-1, legal marketing tests proceed without per-instance review. They still carry the conformance pass and the daily FYI.
- **Measured** means results land in the brief and learnings return to intake. **An experiment without a measurement plan does not start.**
- Every experiment record: hypothesis, metric, duration or sample, kill rule, result, decision. At most 3 running at once.

## Pipeline 3: Operations

**Requested, Specced, Configured, Verified, Running**

- **Specced** means a written requirements spec exists before any selection.
- **Configured is the Principal's step.** Agents never hold live credentials. Contracts, accounts, and spend are always his approval. The GM hands over exact steps with time estimates.
- **Verified** means the data or service flows before it counts as adopted.

## Trivial work

A typo, a copy fix inside already-ratified voice, a one-line mechanical change, or a lookup. **Nothing touching money, customer data, a customer flow, or anything public is ever trivial.** Trivial work skips the ceremony. The floor still applies.

## The Principal's approval points, and the relief valve

The Principal approves: Need Definitions, concepting variants, UI designs, domain-model changes, anything public or user-bound not covered by a ratified pattern, Tier 1 staging sign-offs, ships to production not covered by a pattern, spend envelopes, contracts, pricing.

**De-bottlenecking is built in.** When a category becomes routine, the Principal may ratify a pattern. Work that conforms proceeds without per-instance approval, with conformance checked at Verify. Categories move to pattern-approval only by his explicit ruling, and any can be pulled back the same way. Patterns ratified so far are in charter section 2 (P-1, P-2).

**Decision queue format.** Items reach the Principal written so that one word is complete authorization. Each carries its age. Options arrive as variants with the GM's recommendation first.

## References

Gospel documents may reference each other. No other document is a strategic reference.
