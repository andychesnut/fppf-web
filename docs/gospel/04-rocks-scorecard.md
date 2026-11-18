# FPPF - Rocks and Scorecard

**Status: DRAFT, 2026-11-17. Awaiting the Principal's ratification.**
Gospel document 4 of 8. Modeled on the skookr Rocks and Scorecard. Every numeric goal below is **PROPOSED** except where marked as the Principal's own. Goals marked "set at baseline" cannot be responsibly numbered until real data exists. Nothing here is a forecast.

## The goal period

**2026-11-17 to 2027-11-17** (12 months). Every goal reads against this period.

## The scorecard - 10 key business metrics, in funnel order

Values never live in this document. They come from instrumentation, are reconciled before publication, and appear in the briefs in exactly this order. A metric without a live feed reads "unmeasured", never a guess.

**The funnel:**

| # | Metric | Definition | Goal |
| --- | --- | --- | --- |
| 1 | **New activations** | Free snapshots completed this period. The snapshot result is the free value moment. | Set at baseline |
| 2 | **New sign-ups** | People who give an email to save results or continue, by any door. | Set at baseline |
| 3 | **Paying customers** | One-time report buyers and active members, shown separately. Net-new shown per period. | Set at baseline |
| 4 | **ARR** | Annualized recurring revenue from memberships (and B2B licenses when they exist). | **$1,000,000 stretch** (the Principal's direction: think big) |
| 5 | **Retention** | Share of new members still active at day 90. | Proposed 85% |
| 6 | **NPS** | Rolling 90-day NPS, reported as a trajectory with promoter and detractor themes. The goal is the exit rate at period end. | Proposed 50 at period end |
| 7 | **Open bugs and unresolved detractor feedback** | Standing count with oldest-item age. Resolution means a shipped fix or a recorded decision to go another direction. | 0, held |

**The system underneath:**

| # | Metric | Definition | Goal |
| --- | --- | --- | --- |
| 8 | **Customer outcome** | Share of members whose six-F score improves at their first re-assessment. This is the customer-success measure: people actually getting their finances into order. | Set at baseline |
| 9 | **Gross margin** | Revenue minus cost of goods (AI inference for reports, email, hosting, payment fees). | Proposed 85% |
| 10 | **Spend vs envelope** | Total monthly spend against the approved envelope. Envelope today: about $100 per month (the Principal's ruling, 2026-11-17). | Within envelope, always |

**Arithmetic behind metric 4 (a hypothesis to test, not a plan):** at an assumed $15 per month membership ($180 per year), $1,000,000 ARR needs about 5,600 paying members. The price is untested and pricing is pending the Principal's ruling (I-002).

**Bench metrics** (watched in the briefs, not on the 10): activation rate, sign-up-to-paid rate, snapshot completion rate, report-to-membership conversion, cost per paying customer, cost per completed assessment (inference), email opt-in rate, envelope burn.

## Rocks

**Rocks are the 3 big things we must do this month to achieve the goals above.** Rules:
- Maximum three at a time. Each has **one owner** and a **done-test** (a number or a testable predicate).
- Set monthly at rock-setting. Reviewed weekly, one line each: on track or off.
- A failing rock goes to the IDS list for discussion. It is never silently rewritten mid-month.
- Rocks close goal gaps: each names which of the 10 metrics it serves.

### Proposed rocks - for the Principal to set (first month: 2026-11-17 to 2026-12-17)

1. **Stand up the minimum stack.** A private repo, a deploy pipeline, email sending, and payments in test mode. *Done-test: a push to the main branch deploys to production, a test-mode checkout completes end to end, and analytics events arrive. Serves metrics 1, 2, 10. Owner: the Principal (accounts, keys, and billing are his by the floor), GM supporting with exact steps and the build.*
2. **Ship the free snapshot live.** Formation and Foundation questions, a scored result, and email capture, on the brand's own domain, measured at every step. *Done-test: a visitor can complete the snapshot in production, each step reports live numbers, and the Principal has signed the surfaces. Serves metrics 1, 2. Owner: GM. Depends on rock 1 and on open item I-001 (name and domain).*
3. **Complete the internal legal and regulatory memo.** All seven areas in the floor's legal gate sequence, with a go or no go recommendation on outside counsel and a cost estimate. *Done-test: the memo is saved to the project, covers every listed area with cited sources, and the Principal has the recommendation in his decision queue. Serves the floor and unlocks metrics 3 and 4. Owner: GM.*

## References

Gospel documents may reference each other. No other document is a strategic reference of this document.
