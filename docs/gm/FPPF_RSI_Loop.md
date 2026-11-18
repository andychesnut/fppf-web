# FPPF - Recursive Self-Improvement (RSI) Loop

**Status: PROPOSED 2026-11-17. Takes effect when the Principal says "agreed".**
Once agreed, the Principal's grant is: the GM may rewrite the gospel documents under this loop. This document is then the only authority for how.

## Two loops

| Loop | What it improves | Speed |
| --- | --- | --- |
| **Inner** | The product and growth: experiments on the funnel, pricing (if ruled in), copy, assessment flow | Continuous. Product-embedded analytics and kill rules. GM review every 8 hours if a scheduled task is approved, otherwise each time a session opens. |
| **Outer** | The system itself: gospel docs, process, seat charters, the loop | Weekly, plus on trigger |

The Principal decides daily. Neither loop waits on that check-in.

## Inner loop (per experiment)

1. **Predict.** Before running, record: hypothesis, metric, predicted effect size, sample needed, kill rule.
2. **Run.** At most 3 at once. Must be legal and inside P-1 or P-2 and the envelope.
3. **Decide.** Apply the kill rule at the sample size set in step 1. No early peeking. No extending a loser to rescue it.
4. **Log.** Result, prediction error, and the learning go in `claude/learnings.md`.

Traffic sets the real speed limit. Below the needed sample, the right move is to wait or run a bigger change, not more tests.

## Outer loop (weekly, Monday brief)

1. **Collect evidence.** Only instrumented data or verified facts count:
   - Prediction errors from the inner loop (calibration)
   - Scorecard movement
   - Issues that recurred or aged past 14 days
   - Process failures: a gate skipped, a shipped claim that failed verification, a brief item the Principal had to correct
2. **Diagnose.** Name the specific rule, document, or habit that produced the miss. No diagnosis, no change.
3. **Propose.** A diff with: the evidence, the expected effect, how it will be measured, the review date, and the revert condition.
4. **Check.** The change must pass every limit below. A change touching decision rights, the process gates, or this loop also gets a review by a separate agent that has not seen the work. The author does not certify their own change.
5. **Apply.** Edit the document. Keep the old text in the changelog at the bottom of that document. Add a decision entry in document 8.
6. **Evaluate.** At the review date, compare the measured effect to the expected one. Keep, revert, or revise. Record the outcome.
7. **Report.** Every applied change appears in the next brief under "Gospel changes": what changed, why, and the one-word revert (`revert 3`).

Triggers for an off-cycle outer pass: a floor or spend breach, two consecutive weeks of a key metric regressing, the same issue resurfacing twice, or a Principal correction.

## Limits on self-rewriting

1. **Protected core. Only the Principal changes these:**
   - The floor (charter section 7)
   - The Never column of decision rights
   - The soul principle and framework principles (D-009)
   - The spend envelope
   - Use of his name
   - The mission statement
   - This protected list and this section
2. **One thing at a time.** Max 2 gospel changes per week. Never change a metric's definition and its goal in the same change. Never change a rule and the evidence used to judge that rule together.
3. **Revert tripwires.** A change is auto-reverted if a key metric regresses for 2 consecutive weeks after it, unless the evidence shows the cause is elsewhere (and then that is logged). Three reverts in a month pauses the outer loop and the next brief leads with it.
4. **Metric definition changes** are shown to the Principal with before and after numbers. They are never silent.
5. **No self-expansion of authority.** Nothing in this loop lets the GM raise its own spend, widen a pattern, or loosen the floor.
6. **The Principal can overrule anything.** One word reverts any change. His ruling then sits in the protected core.

## What the loop cannot do (honest limits)

- **Self-evaluation bias.** I grade my own work. Mitigations: evidence rules in step 1, separate-agent review for risky changes, and the revert tripwires.
- **Needs data.** Before the free snapshot is live, the outer loop runs only on process evidence (planned vs shipped, verification failures). Real outcome learning begins with real users.
- **Small samples mislead.** Early metrics will be noisy. Decisions use the sample sizes set in advance, and "not enough data" is a valid verdict.
- **No memory except files.** If it is not in the project docs or the learnings log, it did not happen.

## Cadence summary

| When | What |
| --- | --- |
| Every experiment | Predict, run, decide, log |
| Every brief | Gospel changes list, off-pace metrics, experiment status |
| Weekly (Monday) | Outer loop pass, calibration score, aged issues |
| Monthly | Score my past predictions against results, rewrite weak spots in the loop itself |
| Quarterly | Strategy lookback: does the mission, ladder, and principle set still hold? |
