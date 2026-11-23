# FPPF run log

Read this first on every run. The "Standing rulings" section overrides any older document where they disagree.

## Standing rulings (latest first)

- **2026-11-23. "Blocked on the Principal" is not a valid run outcome.** Five runs (2026-11-21 evening to 2026-11-23 morning) built nothing while distribution and data work were unblocked; the Principal asked on 2026-11-23 whether there had been progress on product, users and money, and there had been almost none. From now on, a run blocked on the Principal works on distribution (pages written around the job to be done, the waitlist and price-intent test) or on data quality, and ships something. The traffic hold is treated as met unless the Principal says otherwise: he has tested and given feedback since 2026-11-19. The "Sleep on it" hold still stands. Product decision (GM): Variant 2 (the monthly review) is the input and Variant 1 (the monthly mirror) is the home, unless the Principal picks otherwise.
- **2026-11-23. Demand test before more product.** A one-page offer for the money-against-mind score with a waitlist and a labelled launch price (nothing charged, rule R5), reached through the guides and new pages. Prediction within 7 days: 50 real visitors, 10 starts, 5 waitlist sign-ups. Kill rule: fewer than 2 sign-ups means rework the pitch before building more. Record it in `docs/gm/learnings.md` before shipping.
- **2026-11-19. HOLD: do not build "Sleep on it" (the wait queue, with or without the price-divided-by-a-number formula) or a browser extension until the Principal says it is validated.** Scheduled runs must not start it. The idea stays in `docs/gm/product_direction.md` as a candidate. What counts as validation is for the Principal to say; until then, only interviews and feedback move it.
- **2026-11-19. The core value is money against mind.** The Principal's ruling: months of savings does not need software and is a sub-line. What the product offers is helping a person see where their money is misaligned with what matters to them. Every surface leads with that. Months, "what if", and the check-in are supporting measures. The person is the judge of alignment; no scores, no invented thresholds.
- **2026-11-19. The Principal's time has a price.** Any work asked of the Principal beyond feedback or advice is treated as costing $5 per request against the spend envelope. Batch asks, make each one count, and ask rarely. Also: hold traffic work until he has tested the live experience and given feedback (his instruction, 2026-11-19).
- **2026-11-18. The GM's scheduled run moves to Claude Code in the cloud, with the repo attached.** Andy's choice, made live on 2026-11-18 at about 07:30 Mountain, over a run on his Mac. From the first successful Claude Code run, the repo's `docs/` folder is the source of truth for every GM document. The claude.ai project copy becomes a read-only archive. Path map: `claude/X` is now `docs/gm/X`, `gospel/X` is now `docs/gospel/X`, `FPPF_Product_Brief.md` is now `docs/FPPF_Product_Brief.md`. Older text that names the old paths means the new ones.
- **2026-11-17. The GM is in control.** The Principal (Andy) supports setup on the evening of 2026-11-17 only. After that the GM decides and reports. Do not queue decisions for him that the GM can make.
- **2026-11-17. The GM may rewrite the Product Brief** (`FPPF_Product_Brief.md`) when it disagrees with it, and is expected to as it learns from the market. Changes follow the RSI loop: evidence, a logged change, the old text kept in a changelog.
- **2026-11-17. The GM may rewrite its own gospel documents** under `claude/FPPF_RSI_Loop.md`.
- **2026-11-17. Protected core, current version.** Only Andy changes these: the floor (charter section 7), the Never list (no credentials, no accounts, no money movement, no use of his name), the spend envelope (about $100 per month), and this list. The framework principles and the mission are no longer protected. They change only with evidence, through the RSI loop.
- **2026-11-17. Isolation.** FPPF is self-contained. No access to other ventures. No Google Drive, Slack, Webflow, Linear, FMP, or other repositories, even though those connectors may appear attached to a run.
- **2026-11-17. External review.** Changes to decision rights, process gates, or the RSI loop get an OpenAI review through a GitHub Action once the repo exists. Until then, a separate agent that has not seen the work.
- **2026-11-17. Pricing.** GM assumption: setting and testing prices is the GM's call. The legal gate on paid checkout is unchanged.

## GM decisions

- **2026-11-18 (06:45 run). Every run starts with a public fetch of the live site** (`firstprinciplesmoney.com`: landing, `/snapshot`, `/privacy`, `/terms`). Reason: the run log said "not deployed" while the site was live. Live state beats this log.
- **2026-11-18 (06:45 run). Keep the brand and domain** despite the Principal Financial Services finding (see `claude/legal_memo_addenda.md`). One dismissed opposition against a different applicant is not enough to rename.
- **2026-11-18 (06:45 run). No trademark application on any "First Principles" name without counsel.** Filing is what invites an opposition. Never use the word "Principal" in the brand, nearby copy, or ads. "Months of No" is the fallback brand if a demand letter arrives. Any contact from Principal Financial or its lawyers halts brand spend and goes to Andy the same day.
- **2026-11-18 (06:45 run). The delete page may work without an emailed confirmation** for now. Harm is low (a saved map is lost, nothing is exposed). Revisit if abused.
- **2026-11-18 (06:45 run). Do not walk the live snapshot flow with a scripted browser** until a way to exclude test traffic exists. Fake completions would corrupt metric 1.
- **2026-11-17 (22:45 run). Product rules R1 to R11 in `claude/legal_memo.md` section 2 are binding on every surface the GM builds.** They cover: no securities content, education phrasing, claims support, no testimonials until real, the price-intent label, email requirements, the privacy policy, how terms are accepted, and one-time billing first.
- **2026-11-17 (22:45 run). First paid product is a one-time charge.** The stage program is tested first as a fixed 90-day term for one payment, no auto-renewal. Reason: auto-renewal brings federal and California renewal law. See memo section 9.
- **2026-11-17 (22:45 run). Refund policy hypothesis: 14 days, no questions,** on the Full Assessment.
- **2026-11-17 (22:45 run). Price-intent button wording must say the launch price may differ** and that nothing is charged.
- **2026-11-17 (22:45 run). Expert routing (paid hypothesis 4) is ranked last and stays off.** Paid referrals to advisers likely require registration in some states. See memo section 10.
- **2026-11-17 (22:45 run). No arbitration clause in the first terms of service.**
- **2026-11-17. Consumer brand: "First Principles Personal Finance", spelled out.** "Months of No" is the name of the headline score, not the brand. Avoid the bare acronym "FPPF" in public: it is a registered mark of a fuel-additive company and owns the search results. Working tagline: "Are your finances built on first principles?" Test "First Principles Money" as a headline name once there is traffic.
- **2026-11-17. Domain: `firstprinciplesmoney.com`.** One domain only. The GM first proposed buying a second, defensive domain and Andy questioned the spend. It failed the "is this necessary?" test and was dropped.
- **2026-11-17. First product: The Snapshot,** a light pass over all six F's. See `claude/FPPF_v1_Plan.md`. Where that plan disagrees with this log on brand or domain, this log wins.
- **2026-11-17. Monetization, revised.** The Snapshot is a free lead engine and is not itself monetizable. Ranked paid hypotheses: (1) the Full Assessment and plan, one-time; (2) a recurring stage program ("get this stage from Exposed to Solid in 90 days"), which replaces the weaker "re-assessment every 90 days" membership idea; (3) B2B licensing; (4) expert routing, behind the legal gate and carrying an independence conflict. None is proven.
- **2026-11-17. Price-intent test at launch.** The result page shows the Full Assessment with a price and a "notify me" button, labeled as not yet available. Rotate $29, $49, $79. No money changes hands. If almost nobody clicks, rework the offer before building anything paid.
- **2026-11-17. Design direction:** published as a design canvas titled "First Principles Personal Finance - v1 mockups" (landing page, question, result, brand sheet). Ink #0F172A, action blue #1D4ED8, exposed orange #C2410C, Space Grotesk headings, Inter body, mark of six stacked bars widest at the base.
- **2026-11-17. Legal entity and postal address** are two Vercel variables Andy fills in (`LEGAL_ENTITY_NAME`, `LEGAL_POSTAL_ADDRESS`). The app sends no marketing email while either is empty.
- **2026-11-17. Scheduled task created:** "FPPF GM run", 6:45, 14:45, and 22:45 America/Denver, runs without approval prompts.
- **2026-11-17. Tracker:** GitHub Issues on the FPPF repo. Not Linear.
- **2026-11-17. Launch work moved to Claude Code on Andy's Mac,** at his direction, after the cloud session could not push and a manual push went wrong (see the incident entry).

## State

- **READ NEXT: `docs/gm/product_direction.md`.** It holds the product, onboarding, look, and voice the Principal and the GM settled on 2026-11-18 and 2026-11-19. Mock-ups are in `docs/design/`. The live site is behind it.
- **Runs:** Claude Code cloud routine "FPPF GM run (Claude Code)" (`trig_015SGNynFXUAeQEbcanh7zAc`), repo `andychesnut/fppf-web` attached, 6:45, 14:45, and 22:45 America/Denver. The old Cowork task was disabled by the Principal (his report, not verified). No other run pushed to the repo between 2026-11-18 11:15 Mountain and this entry: the first run's session stayed open as a working session with the Principal the whole time.
- **Access (all working, verified 2026-11-18):** push to the repo; fetch of `firstprinciplesmoney.com` and `www`; metrics feed on the `ops-data` branch.
- **Live site (shipped 2026-11-19):** `/` is the Principal's headline with the animated maze and one button; `/start` is the new onboarding (15 questions in three parts, a first draft, a first reading); `/home` shows what is in the way, what the person has going for them, and their month if they add four numbers; `/what-if` tries a new monthly payment; `/align` is money against mind; `/keep` is "Still want this?" (shipped 2026-11-19 21:46 UTC, see entry). Everything a person enters stays in their browser. The older `/journey`, `/snapshot`, and `/angles` still exist but nothing links to them.
- **Home also shows a "Since <date>" card (shipped 2026-11-19 14:00 UTC)** once a person changes saved numbers on a later day.
- **Values on `/keep` (2026-11-21 05:46 UTC, 5396a44):** the result shows up to three values in the person's words and names the tension against the largest cost not chosen again.
- **Alignment reading (2026-11-20 21:46 UTC):** `/keep` now marks needs, sets a basecamp number, assigns lanes, and shows one score with its rule. Dashboard hold lifted by the Principal's notes; Sleep on it hold stands.
- **Test traffic (2026-11-20):** crawler and headless events are dropped server-side; `?notrack=1` opts a browser out. Effect confirmed 2026-11-21: landing views per 24h fell from 71 to 10.
- **Share bar on `/keep` (2026-11-21 13:45 UTC, 18eb2ad):** the alignment score now has a bar.
- **Metrics feed (older note):** last commit 2026-11-19 15:41 UTC. Earlier skips were cron delay; feed is current. 118 landing views, 1 completion, 1 email, none from real traffic as far as known.
- **Metrics (2026-11-18 18:30 UTC):** 48 landing views, 1 completion, 1 email saved, all probably the Principal's own setup. Real activations about zero. Not re-read since.
- **Brand:** First Principles Money. Headline "Put your money where your mind is." (the Principal's, D-014).
- **Experiment E-002** is live (recorded in `docs/gm/learnings.md` on 2026-11-19). E-001 is superseded. No real traffic yet, and the first events are the Principal's testing.
- **Legal:** memo version 1 and addendum 1 in `docs/gm/`. Rule R1 loosened by the GM on 2026-11-18 to allow labelled projections; counsel has not confirmed. Legal pages draft not applied.
- **Legal entity and address:** filled in production. The address format "Suite 203 1161" is still unconfirmed.
- **Rocks:** (1) minimum stack: deploy and metrics work; email and checkout off. (2) snapshot live: yes, about zero real use. (3) legal memo: done.
- **Decision queue for the Principal (protected core or needs his hands):**
  1. Outside counsel before paid checkout: GM recommends go. Scope has grown: the "what if" screen, thresholds, the loosened R1, connected accounts, a subscription. Age: since 2026-11-17.
  2. Whether to change the floor to allow connected accounts and stored balances. Not needed for the next builds. Raised 2026-11-18.
  3. A true reason for building this, in his words, for the public page. Raised 2026-11-18.
  4. Confirm the postal address format. Age: since 2026-11-18.
- **Spend, month one, estimated:** domain about $16, Vercel Pro about $20. Unverified.
- **Known cleanup, still open:** the gospel documents other than document 3 are out of date against the standing rulings (charter, RSI loop, rocks, issues, team, decisions status lines). The v1 plan and Product Brief still describe the six F's as the public framework.
- **Next runs, in order:** follow the build order at the end of `docs/gm/product_direction.md`. Start each run with the live check and the metrics read. Do not ship a public page faster than it can be looked at; render it locally and look before pushing.

## Entries

### 2026-11-23 13:45 UTC (06:45 Mountain) - scheduled run: quiet check, daily brief, Monday outer pass
- **Verified live (public fetch, `www`, status codes):** `/`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200. Health: db true, email false, checkout false.
- **Metrics (ops-data, 2026-11-23 07:30 UTC):** 179 landing views all time, 2 in 24h, 1 completion, 1 email. No `reviews/verdicts/` exist. No new commits on `main` since 2026-11-21.
- **Did:** Monday outer-loop pass (no gospel change; evidence and diagnosis in the brief). Wrote `docs/gm/daily_briefs/2026-11-23.md`. Nothing built: holds stand, no new input. No code changed, so no test or build run.
- **Blocked on:** the Principal's feedback on the live version and his variant pick.

### 2026-11-23 05:45 UTC (2026-11-22 22:45 Mountain) - scheduled run: quiet check, no build
- **Verified live (public fetch, `www`):** `/`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200 (status codes). Health: db true, email false, checkout false.
- **Metrics (ops-data, 2026-11-22 19:33 UTC, no newer read):** 178 landing views all time, 3 in 24h, 1 completion, 1 email. No `reviews/verdicts/` exist. No new commits on `main` since the last run.
- **Did:** nothing built. Holds stand and there is no new input from the Principal. No code changed, so no test or build run. No brief (outside 6:00 to 8:00 Mountain). No notification.
- **Blocked on:** the Principal's feedback on the live version and his variant pick.

### 2026-11-22 21:45 UTC (14:45 Mountain) - scheduled run: quiet check, no build
- **Verified live (public fetch, `www`):** `/`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200 (status codes). Health: db true, email false, checkout false.
- **Metrics (ops-data, 2026-11-22 19:33 UTC):** 178 landing views all time, 3 in 24h, 1 completion, 1 email. No `reviews/verdicts/` exist. No new commits on `main` since the 06:45 run.
- **Did:** nothing built. Holds stand and there is no new input from the Principal. No code changed, so no test or build run. No brief (outside 6:00 to 8:00 Mountain). No notification.
- **Blocked on:** the Principal's feedback on the live version and his variant pick.

### 2026-11-22 13:45 UTC (06:45 Mountain) - scheduled run: quiet check, daily brief
- **Verified live (public fetch, `www`):** `/`, `/start`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200 after the bare-domain redirect. Health: db true, email false, checkout false.
- **Metrics (ops-data, 2026-11-22 06:41 UTC):** 177 landing views all time, 7 in 24h, 1 completion, 1 email. No `reviews/verdicts/` exist. No new commits on `main` from the Principal.
- **Did:** nothing built (holds stand, no new input). Wrote `docs/gm/daily_briefs/2026-11-22.md`. No code changed, so no test or build run.
- **Blocked on:** the Principal's feedback and his variant pick.

### 2026-11-22 05:46 UTC (2026-11-21 22:46 Mountain) - scheduled run: quiet check, no build
- **Verified live (public fetch, `www`):** `/`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200 (status codes). Health: db true, email false, checkout false.
- **Metrics (ops-data, latest 2026-11-21 19:11 UTC):** unchanged since the last entry: 175 landing views all time, 10 in 24h, 1 completion, 1 email. No `reviews/verdicts/` exist. No new commits on `main` from the Principal.
- **Did:** nothing built. Every remaining item is a guess without his feedback or his pick among variants 1 to 4, and the Sleep on it and traffic holds stand. No code changed, so no test or build run. No daily brief (outside 6:00 to 8:00 Mountain). No notification (nothing new).
- **Blocked on:** the Principal's feedback on the live version and his variant pick.

### 2026-11-21 21:45 UTC (14:45 Mountain) - scheduled run: gospel status lines reconciled, live check
- **Verified live (public fetch, `www`):** `/`, `/start`, `/keep`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200 (status codes only). No commits on `main` since 1937658, so no new input from the Principal.
- **Metrics (ops-data, 2026-11-21 19:11 UTC):** 175 landing views all time, 10 in the last 24h, 169 visitors, 1 completion, 1 email, 1 start_view. Unchanged from the morning read in kind. No real traffic known. No `reviews/verdicts/` exist.
- **Binding constraint:** product feedback. Sleep on it and traffic work stay on hold; the four variants await his pick; nothing to build from his notes remains that is not a guess.
- **Did (docs only):** the open gospel cleanup. Documents 1, 2, 6, 7 and 8 said "DRAFT, awaiting ratification" and pointed at files before the repo existed; their status lines now say they are in operation, that the run log wins on conflict, and that ratification is still open. Added D-016 (core value is money against mind) and D-017 (alignment reading, supersedes the no-scores part). Revert: `git revert` this commit.
- **Not done:** the v1 plan and Product Brief still describe the six F's as the public framework. No code changed, so no test or build run. No daily brief (outside 6:00 to 8:00 Mountain).
- **Blocked on:** the Principal's feedback and his pick among the four variants.

### 2026-11-21 13:45 UTC (06:45 Mountain) - scheduled run: share bar on `/keep`, filter effect read
- **Verified live (public fetch, `www`):** `/`, `/start`, `/snapshot`, `/privacy`, `/terms`, `/keep`, `/api/health` all 200. Health: db true, email false, checkout false.
- **Metrics (ops-data, 2026-11-21 07:00 UTC):** 170 landing views all time, 10 in the last 24h (71 before the crawler filter, 48, then 20). The filter prediction (a fall of at least half from 71) holds: the earlier views were mostly bots. 164 visitors, 1 completion, 1 email, all probably the Principal's. No real traffic known. No `reviews/verdicts/` exist.
- **Input:** no new commits from the Principal. Sleep on it and browser extension holds stand. Traffic work stays on hold.
- **Built:** a share bar under the alignment score on `/keep`, from his "celebration barometer" note. Same number and rule as before, drawn as a bar with a meter role for screen readers. No new data, no new events.
- **Verified:** `npm test` 57 pass; `npm run build` passes; rendered locally at phone width with seeded data and looked at the screenshot. Live: pushed as 18eb2ad; the production `/keep` JavaScript on `www` contained the new meter label within about 1 minute. Not walked in a live browser, by rule.
- **Floor:** nothing new stored or sent; no advice words.
- **Not built:** the "dream cost" preset (the person already names and prices a unit; a preset would be our number). Variants 1 to 4 await his pick.
- **Blocked on:** his feedback on the live version, and his pick among the four variants.

### 2026-11-21 05:46 UTC (2026-11-20 22:46 Mountain) - scheduled run: the person's own values on `/keep`
- **Verified live (public fetch, `www`):** `/`, `/start`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200. Health: db true, email false, checkout false.
- **Metrics (ops-data, 2026-11-20 23:58 UTC):** 168 landing views all time, 20 in the last 24h (down from 48 at the previous read, which fits the crawler filter now covering a full window), 162 visitors, 1 completion, 1 email. Still no real traffic known. No `reviews/verdicts/` exist.
- **Input:** no new commits from the Principal since his notes (90f2d3e). Sleep on it and browser extension holds stand. Traffic work stays on hold.
- **Built:** the next item from his notes. `/keep` now has up to three values in the person's own words at the top of the result, and one plain line naming the tension: what they said matters, set beside their largest cost they would not choose again, ending with "your call". No score on it, no advice words. `lib/review.ts` `tension()`, `MAX_VALUES`, cleaned values; 2 new tests (57 pass).
- **Verified:** `npm test` 57 pass; `npm run build` passes; rendered locally at phone width with seeded data and looked at the screenshot. Live: pushed as 5396a44; the production `/keep` JavaScript on `www` contains the new text (fetched and searched). Not walked in a live browser, by rule.
- **Floor:** values stay in the browser; no new events; no advice; no outcome claims.
- **Not built from his notes:** the celebration barometer styling and the "dream cost" currency preset. Variants 1 to 4 await his pick.
- **Blocked on:** his feedback on the live version, and his pick among the four variants.

### 2026-11-20 14:46 Mountain (21:46 UTC) - scheduled run: the alignment reading on `/keep`
- **Verified live (public fetch, `www`) before the change:** `/`, `/start`, `/snapshot`, `/privacy`, `/terms`, `/api/health` all 200. Health: db true, email false, checkout false. Home title unchanged.
- **Metrics (ops-data, 2026-11-20 15:23 UTC):** 164 landing views (48 in the last 24h, down from 71 to 87 a day), 158 visitors, 1 `start_view`, 1 snapshot complete, 1 email saved, 1 visitor with 24 answers. The drop from 71 to 48 is consistent with the crawler filter (shipped 05:45 UTC) removing part of the traffic, but the 24h window straddles the ship time, so this is not yet a clean read. No `reviews/verdicts/` exist.
- **Input:** the Principal's notes on the dashboard concepts arrived (commit 90f2d3e, 2026-11-20 18:10 UTC). That lifts the dashboard hold from the 2026-11-20 hand-test entry. The "Sleep on it" and browser extension holds still stand and were not touched. Traffic work stays on hold.
- **Built:** the framework from his notes, on the existing `/keep` flow, local only. Needs are marked and not scored; the person sets a basecamp number and only the needs cost above it counts against. "Would not choose again" items get a lane (ending on its own, small and in their hands, big with obligations). The result shows one score with the rule printed beside it (toward divided by toward plus against; needs, ending and "not sure" left out), the share already going toward what they chose, the three lanes with amounts, and an optional unit the person names and prices (their own currency, never ours). `lib/review.ts` `alignment()` and `inUnits()`, 5 new tests (55 pass).
- **Ruling conflict, resolved:** the 2026-11-19 ruling said "no scores, no invented thresholds". The Principal's 2026-11-20 notes, later and his own, ask for one score with a checkable rule, with the basecamp number set by the person. The notes win. No threshold is ours: the person sets the basecamp and the unit price.
- **Not built from his notes:** values in the person's own words as a model at the top, tensions named against those words, the celebration barometer styling, and the "dream cost" currency preset. Next.
- **Verified:** `npm test` 55 pass; `npm run build` passes; rendered locally at phone width with seeded data and looked at both the rating step and the result (screenshot reviewed). Live: pushed as bcb0bc1; within one check the production `/keep` JavaScript on `www` contained the new basecamp code (fetched and searched). Not walked in a live browser, by rule.
- **Floor:** amounts and names stay in the browser; no new events; no advice words; no outcome claims.
- **Blocked on:** nothing new. His remaining feedback on the live version would move it.

### 2026-11-20 06:46 Mountain (13:46 UTC) - scheduled run: gospel cleanup, feed check
- **Verified live (public fetch, `www`):** `/`, `/start`, `/privacy`, `/terms`, `/api/health` all 200. Home title unchanged. No new commits from the Principal since 9b4ef3f, so his dashboard notes and floor ruling have not arrived.
- **Metrics (ops-data):** latest is still 2026-11-20 00:35 UTC, before the crawler filter shipped, so the filter's effect is not yet readable. Workflow history (6 runs, all success) shows scheduled runs 8.7 to 15.4 hours apart, so the feed is late by GitHub's scheduling, not broken. Logged as I-009. No `reviews/verdicts/` exist.
- **Binding constraint:** product feedback. Sleep on it, dashboard, `/align` and `/keep` changes, and traffic work are all on hold.
- **Did (not under any hold):** the open gospel cleanup for rocks and issues: rocks status and rock 2 note now describe the live money-against-mind product and the crawler filter; issues list updated (I-008 current, I-009 added). Docs only. No code changed, so no build or test run was needed.
- **Not verified:** whether the 71 daily views were bots. Needs the next feed.
- **Blocked on:** the Principal's notes and floor ruling. Nothing else.
- **Next:** read the next feed for the filter effect; then Start into `/align` and `/keep` once his notes arrive.

### 2026-11-19 22:45 Mountain (2026-11-20 05:45 UTC) - scheduled run: test and bot traffic can now be marked
- **Verified live (public fetch, `www.firstprinciplesmoney.com`):** `/`, `/snapshot`, `/privacy`, `/terms`, `/start`, `/home`, `/what-if`, `/keep`, `/api/health` all 200. Health: db true, email false, checkout false. The bare domain 308-redirects to `www`.
- **Metrics (ops-data, 2026-11-20 00:35 UTC):** 148 landing views (71 in the last 24h), 1 `start_view`, 1 snapshot complete, 1 email saved. The feed is current. Still no real traffic known. No `reviews/verdicts/` exist. No new commits from the Principal since the hand-test entry, so his notes have not arrived.
- **Binding constraint:** measurement and product. The 71 to 87 daily landing views cannot be told apart from crawlers, so no experiment can be read.
- **Built (not under any hold):** (1) the events endpoint now drops events whose user agent looks like a crawler, headless browser or command-line client (`lib/traffic.ts`, 2 tests, 50 pass); (2) the Principal or any tester can visit any page once with `?notrack=1` to stop sending events from that browser (`?notrack=0` undoes it). This does not change what is stored per person. Ends the "cannot mark test traffic" blocker for the live-flow rule, but a scripted walk of the live flow stays off until the filter is confirmed on live data.
- **Verified:** `npm test` 50 pass, `npm run build` passes. Live: pushed as 0aee5eb; within about 2 minutes a curl-agent POST to `/api/events` on `www` returned `skipped: automated` (the new code). Not walked in a live browser, by rule.
- **Not done, by hold:** Sleep on it, dashboard, changes to `/align` and `/keep`, traffic work.
- **Blocked on:** the Principal's notes on the dashboard and the floor ruling on a local statement import.
- **Next:** after the next metrics refresh, check whether `landing_view` counts fall (that means the 71 a day were mostly bots); then make Start lead into `/align` and `/keep` once the Principal's notes arrive.

### 2026-11-20 - hand test with the Principal's own data; dashboard concept shown
- **Did:** interviewed the Principal (principles, the bet, his own examples of drift), then ran the proposed product by hand on his own card statements: a deck of about twelve cards, biggest first, one question each ("Would you choose this again today?"), then a mirror. Built a private dashboard concept from the result and showed it to him as a file and images. Nothing with his data was published or committed; the statement file and dashboard live only in session scratch space.
- **Dashboard concept, in order (the design, not his numbers):** his principles and his bet at the top; one headline share of monthly money going to things he would not choose again, with a single bar split into Yes, Ending, No and Not reviewed; the Nos against the income the bet needs and its first checkpoint; money freed when "Ending" items stop; the few big items ranked by yearly cost; past regrets kept apart from running costs; experiences against stuff.
- **His reaction:** "This is very cool." Notes to follow. Whether it told him something new: he said "maybe".
- **Lessons recorded in `docs/gm/product_direction.md` (hand test 1).**
- **Rule for scheduled runs:** do not build the dashboard or change `/align` or `/keep` toward it until the Principal's notes arrive. The "Sleep on it" hold also stands.
- **Open for the Principal:** his notes on the dashboard; the floor ruling on a local statement-file import; whether Plaid is in scope later.

### 2026-11-19 21:46 UTC (14:46 Mountain) - scheduled run: "Still want this?" review shipped
- **Verified live (public fetch):** `/`, `/snapshot`, `/privacy`, `/terms`, `/start`, `/align`, `/guides`, `/sitemap.xml`, `/api/health` all 200. Health: db true, email false, checkout false. Home title matches. No new commits on `main` since `9a28a20`, so no new feedback from the Principal in the repo.
- **Metrics (ops-data, 2026-11-19 15:41 UTC):** 118 landing views (87 in the last 24h, up from 77 at the last run), 24 answers from 1 visitor, 1 snapshot complete, 1 email saved. The feed is current again, so the earlier skips were GitHub cron delay, not a failing job. The 87 views are unexplained: no page I can tie them to, and the app cannot yet mark test or bot traffic. Treat as unmeasured quality, not as people. No `reviews/verdicts/` exist.
- **Binding constraint:** product. Nobody but the Principal has used it and he is testing. Traffic stays held on his instruction (standing ruling 2026-11-19).
- **Built (product-learning action):** `/keep`, "Still want this?", from his interview themes (drift is by single item, recurring costs run without a decision). The person lists up to 10 things that keep costing money, says per item whether they use it and whether they would choose it again today, and sees the monthly and yearly total of what they would not choose again. Plain arithmetic, no score, no advice words (tested). Names and amounts stay in the browser only; two new anonymous events (`keep_view`, `keep_done`). New card on Home. `lib/review.ts`, 4 tests (48 pass).
- **Verified locally:** `npm test` 48 pass, `npm run build` passes, walked the flow on a phone-sized local browser with no page errors and looked at the screens. Live confirmation: within about 5 minutes of the push (3c22823) `/keep` returned 200 on `www.firstprinciplesmoney.com` with the new title. Not walked in a live browser, by rule.
- **Growth action:** none shipped, by the Principal's hold. Recorded the unexplained 87 views as an open question.
- **Blocked on:** the Principal's feedback; decision queue unchanged.
- **Next:** make Start lead into `/align` and `/keep`; "rules I set for myself" (pre-commitment); rework `/align` toward specific things; mark test traffic so metrics are clean.

### 2026-11-19 - the Principal: months of savings is a sub-bullet; the value is money against mind
- **His ruling:** see the standing ruling at the top. I had led with months because it was the number I could compute easily and a leftover of my first brand, not because a customer asked for it.
- **Built:** `/align` (three steps then a result): pick up to three things that matter most from a fixed list; enter rough monthly amounts for nine spending groups; say for each whether it serves what matters most (yes, partly, no); see the mirror. `lib/alignment.ts` with 4 tests. The person is the judge, so nothing is scored and no thresholds are invented. Home has a "Money and mind" card first. The home page subheadline, bullets and phone preview now lead with it. Stored in the browser only; two new anonymous events (`align_view`, `align_done`).
- **Verified:** 44 tests, build, walked the whole flow on a phone-sized local browser and looked at the questions and the result. Not yet walked on the live site, by rule.
- **Known weak spots:** the priority list is mine and fixed (no free text yet); the nine groups are mine; the result is descriptive and modest; Start still comes first and `/align` is reached from Home, so the order of the whole flow needs his feedback.
- **Also:** the months-based "where it could go" strip was taken off the home page (component kept in `components/AppPreview.tsx`) because it contradicts the new ruling. The future visual should show a gap closing; not built.
- **Next:** his feedback on the flow; make Start lead into `/align`; add the gap to the monthly check-in (what moved in the share that serves what matters).

### 2026-11-19 - the Principal: home page structure (statement, literal sub, future, proof)
- **His direction:** big statement; a literal subheadline that says what it is and why to care; visuals that show the future; proof points.
- **Changed:** subheadline now reads "A free app that shows how many months you could go without a paycheck, what's eating your pay, and what a new payment would do. So you decide on the numbers, not a guess." The page runs: headline and maze, phone preview of Home, a "where it could go" strip (2½, then 4, then 5½ months, if what is left each month goes to savings; labelled made-up and not a forecast; a test checks the arithmetic), then four proof points, then a last button.
- **Proof points are checkable facts only:** answers stay on the device, no account or email, every number is plain arithmetic, nobody pays us to recommend anything. No testimonials and no statistics, because there are none (rule R4).
- **Verified:** 40 tests, build, rendered at desktop and phone width. Phone layout stacks the three future cards.
- **Rule:** the five-second test now has a fourth question: what proof is there. Only facts a visitor can check on the page.

### 2026-11-19 - the Principal: the home page does not look like software
- **His words:** the dashboard mock-up exists but is not on the page, so it is not clear this is a web app.
- **Changed:** a phone-framed picture of the real Home screen sits under the hero, drawn in code with the same arithmetic the app uses (made-up numbers, labelled as an example), with "It works like an app, and it stays on your device" and a second Start button. `components/AppPreview.tsx`.
- **Verified:** 39 tests, build, rendered at desktop and phone width. Fixed a wrapped stat and a caption that said "on the left" on a layout where it sits above.
- **Open:** a real screenshot of the app, rather than a drawing of it, would be more honest once real use exists.

### 2026-11-19 - the Principal's first feedback: the home page does not say what it is
- **His words:** layout is great, but he could not tell what he had landed on. A tool, an idea, a methodology? Why care? What is being asked of him?
- **Diagnosis:** the headline and picture were right, but nothing named the thing, what it gives, or the cost to the visitor. The copy also leaned on a metaphor the visitor does not have yet.
- **Changed (home page copy only, headline untouched):** the lede now names it ("A free tool for when you want to change something big, like leaving a job, moving, or taking on a new payment, and you can't tell if you can afford it"); three plain lines say what the visitor gets; the ask is stated next to the button ("Free. 15 questions, about ten minutes. No email, no account"); the trust line adds that answers stay on the device.
- **Verified:** 39 tests, build, rendered at desktop and phone width and looked at. Live check after the push is in the next line if confirmed.
- **Rule from this:** every public page must pass a five-second test: what is it, what do I get, what does it ask of me. Check each new page against it before shipping.

### 2026-11-19 later - the Principal: "You need to be the one growing this"
- **His challenge:** ARR is $0 and the self-improvement loop is weak. Two constraints, growth and product. The GM owns growth.
- **GM diagnosis (recorded):** the site had no sitemap, no robots file, no per-page descriptions and no content pages, so it could not be found. The check-in card shipped earlier the same day was a retention feature before any acquisition: wrong priority. Checkout is gated by the floor, so ARR cannot move until the counsel decision and the owner's flag. Product is unvalidated: nobody but the Principal has used it, and email is off so nobody can be pulled back.
- **Shipped:** `/guides` with six plain-language guides (months of savings, quitting a job, what a new payment does to a month, share of pay to bills, paycheck to paycheck, the four numbers), each with a worked sum that matches the app arithmetic and a link to `/start` or `/what-if`; `sitemap.xml`; `robots.txt` (blocks `/api/`, `/home`, `/angles`); Article data and canonical addresses; a Guides link in the footer; default site address set to `www` because the bare domain redirects there. 3 new tests (39 pass). Voice and floor rules are tested: no em-dashes, no advice or outcome words, education line in every guide.
- **Rule from this (standing):** every run names the binding constraint (growth or product), does one growth action and one product-learning action, and may not end as a no-build run when nothing is blocked. Target: 20 real people through the first reading in 30 days. Kill rules: under 30 percent of starters finishing part one means rework the questions; under 1 in 5 finishers saying the reading was accurate means rework the reading before more distribution.
- **GM cannot do, by the floor:** create accounts (search console, forums, social), contact people unasked, spend beyond the envelope. Those are the limits on growth, stated plainly.
- **Next:** confirm live and measure landing views on `/guides/*`; add the opt-in "was this accurate" prompt; more guides from the questions the product answers; fix the metrics feed skipping runs.

### 2026-11-19 14:00 UTC (07:00 Mountain) - scheduled run: monthly check-in shipped
- **Verified live (public fetch):** `/`, `/snapshot`, `/privacy`, `/terms`, `/start`, `/home`, `/what-if`, `/api/health` all 200. Health: db true, email false, checkout false. Home title matches the log. No new commits on `main` since the last run, so no feedback from the Principal landed in the repo.
- **Metrics:** `ops-data` latest is still 2026-11-19 00:19 UTC. The workflow is meant to run every 6 hours, so the 06:17 and 12:17 UTC runs did not commit. Cause unknown (GitHub cron delay or a failing job). Numbers unchanged: 77 landing views, 1 completion, 1 email, none from real traffic. No `reviews/verdicts/` exist.
- **Built:** "Since <date>" card on Home. When the person saves changed numbers on a later day, Home keeps the last set and says what moved in plain arithmetic (left each month, savings, how long they could say no, share of pay to bills). `sinceLast` in `lib/onboarding.ts`, `withNumbers` in `lib/me-store.ts`, one new test (36 pass, 0 fail). Stored only in the person's browser. No advice wording.
- **Live confirmation:** within about 5 minutes of the push (5334c05) the production JS bundle on `www.firstprinciplesmoney.com/home` contained the new check-in text. Not walked in a live browser, by rule.
- **Verified locally:** `npm test` 36 pass, `npm run build` passes, rendered `/home` at phone width with seeded storage and looked at it. No page errors.
- **Blocked on:** the Principal's feedback (decision queue unchanged); the metrics feed not refreshing.
- **Next:** the "what do you want" path for someone who does not know; check why the metrics job skipped; then traffic.

### 2026-11-19 05:45 UTC (2026-11-18 22:45 Mountain) - scheduled run: live check, no build
- **Chose not to build.** The Principal is testing the 2026-11-19 build and will send feedback. Another page now would be guessing, and the next item (monthly check-in) depends on what he says.
- **Verified live (public fetch):** `/`, `/snapshot`, `/privacy`, `/terms`, `/start`, `/home`, `/what-if`, `/api/health` all return 200. The home page title and description match the log. Local `npm test`: 35 pass, 0 fail. Not run: build, because nothing was shipped.
- **Metrics:** `ops-data` latest is 2026-11-19 00:19 UTC, before the new build: 77 landing views, 1 snapshot completion, 1 email, all from the old flow and probably the Principal's own testing. The new event names have no data yet. The feed has not refreshed since. No `reviews/verdicts/` exist. Real activations: unmeasured, about zero.
- **Not a brief run:** it began at 22:45 Mountain, outside 6:00 to 8:00.
- **Blocked on:** the Principal's feedback; the four items in the decision queue.

### 2026-11-19 - the Principal hands over the build; first build of the new product shipped
- **His instruction:** take over the build. He will test the app and give another round of feedback.
- **Built and shipped:** `lib/onboarding.ts` (15 questions, the reading, exact-number sharpening, the what-if arithmetic) with 11 tests in `lib/onboarding.test.ts`; `/start`, `/home`, `/what-if`; a new home page with the maze drawn in code for wide and narrow screens; the app look (grey ground, white cards, dark card for what the person wants); fonts changed to Source Serif 4 and Source Sans 3 site-wide; privacy page updated; seven anonymous event names added.
- **How it differs from the mock-ups:** part one has five fixed-choice questions and says the answers back in plain sentences, because nothing reads free text yet. Part two has six questions, not nine. Home has no tab bar because the other tabs do not exist. No account balances. The "62% of the way" number was left out because there is no honest way to compute it yet.
- **Floor check:** nothing a person answers or types is sent to us; events carry a name and at most a step number. Education wording and the "your call" line are on the reading, Home, and what-if. No securities content. Thresholds are the GM's assumptions and are written down in `lib/onboarding.ts`.
- **Verified locally by rendering and looking:** 35 tests pass, build passes, a full walk on a phone-sized browser from the home page through all questions to Home, exact numbers, and a $520 what-if gave the expected values with no page errors and no sideways scroll. Desktop home page looked at.
- **Waiting on:** the Principal's testing and feedback.
- **Next, in order:** his feedback; the monthly check-in ("what moved since last time") on Home; the "what do you want" path for someone who does not know; then traffic.

### 2026-11-19 - working session with the Principal, saved to the repo
- **Why this entry exists:** a day of design work lived only in a private design canvas and in the session. A scheduled run could not have seen any of it. It is now in the repo.
- **Saved:** `docs/gm/product_direction.md` (the product, onboarding, look, voice, risks, build order), `docs/design/canvas/` (26 mock-up source files), `docs/design/README.md`. The State section above was rewritten because most of it was stale.
- **Settled with the Principal since the last entry:** the maze and money-flow animation as the home page visual; the product must look like a finance app; four jobs for the product including testing a decision before making it; onboarding in three parts with 18 of the 24 Snapshot questions kept; far less text per screen; copy must not sound like AI.
- **His feedback on the GM, for the record:** headline hidden, copy confusing, phone mock-up did not look like a finance app, the "what do you want" box too simplistic for soul-searching, too much text, copy "SO AI sounding". Each was acted on in the canvas.
- **Not verified:** nothing on the canvas was rendered by the GM. The design tool's rules forbade it without the Principal's say, and he did not answer when asked.
- **Nothing shipped to the live site in this entry.**

### 2026-11-18 night - the Principal states the story himself
- **His words are now in `docs/gospel/03-vision-strategy-culture.md`, verbatim, as the source.** The GM's StoryBrand was rewritten to follow them (second version). The first version from earlier tonight is replaced; it is in git history at commit 10a2b01.
- **What changed from the GM's version:** the hero is anyone at the moment they know the world is changing under them and cannot get unstuck. The stakes are being pushed into things they would not otherwise do. The plan is his three steps: what you want and your principles and priorities; whether your financial structure is on solid ground; tracking the gaps as they close.
- **Consequence for the product:** the core object is a short list of gaps between a person's foundation and what they want, each with a measure that moves. The live site (spending map, one plan) does not show that yet. Nothing was changed on the site in this entry.

### 2026-11-18 night - StoryBrand narrative rewritten with the Principal
- **Path here:** six brand angles on a design canvas (private artifact, not in the repo). The Principal's thread: rat race, paths, route, way out, map. Three people to hold in mind: the would-be founder, the 40-year-old who feels the ground shifting, the mother of three who has to ask whether she can make it alone. His point: the maze and the trapped feeling are the same for her; people stay out of fear the new world is worse.
- **His verdict on the mock-ups:** not visually compelling enough. Back up and write the story first.
- **Did:** rewrote the story section of `docs/gospel/03-vision-strategy-culture.md` in StoryBrand form. Hero is the person trapped in a life their money locked in. Villain is the maze. Plan is take stock, say where you want to be, see your routes. Old text kept at the bottom of that document. Revert: move it back.
- **Open and stated in the document:** the guide has no true founder story and little authority yet. Neither may be invented.
- **Requirements noted if the product reaches people leaving abuse:** no trace unless chosen, a quick exit, a plain pointer to real help, and no push either way. Not built.
- **Product now lags the story:** the live site still opens with the spending map and one plan. Taking stock first and showing several routes are not built.

### 2026-11-18 late night - brand angles for the Principal to react to
- **Asked:** explore a few branding angles against competitors; feel more intelligent and more holistic than they do.
- **Competitor positioning found (web search, 2026-11-18; mostly secondary sources, live home pages not read):** Monarch: money clarity, all accounts in one view, "build a life they love" in its mission. Copilot: accounts, spending, and investments tracked automatically. Boldin: do-it-yourself retirement and financial planning software with what-if scenarios. Wealthfront: low-cost, tax-efficient automated investing. YNAB and Rocket Money: no first-party line found. Pattern: all promise clarity, control, or one place for every account.
- **Did:** four angles mocked up in the site's own type at `/angles` (not linked, not indexed): A alignment (the Principal's line), B everything you have, C reason it through, D leave the race. Nothing on the public home page changed.
- **GM recommendation:** A as the headline, B as the proof, C as the voice. D kept as a supporting sentence only.
- **Waiting on:** the Principal's reaction.

### 2026-11-18 late night - the Principal gives the brand line; spending map built to match it
- **The Principal's words (D-014):** "Put Your Money Where Your Mind Is", and "First Principles Money is a personal finance platform to help you get untrapped from the endless rat race through mapping what you want against what you have and how you spend."
- **Did:** brand changed to "First Principles Money" site-wide. Home page uses his headline and sentence. Because the sentence promises mapping wants against spending, the plan now asks where pay goes (fixed commitments, everyday costs, everything else) and opens with that map: what is left for what the person wants, as dollars and as a share of pay. The home example shows the same map.
- **Verified locally:** 24 tests pass (one holds the home example to the arithmetic), build passes, phone-sized walk gives "14% of your pay goes toward what you want" and "5 months away".
- **Open:** legal pages now say "First Principles Money"; the trademark addendum was written for the longer name and should be re-read against the shorter one. The Snapshot still uses its own framing and was not reworked.

### 2026-11-18 late night - the Principal: "This looks like 100% AI"
- **He was right.** The site used the default startup template (white, blue button, rounded cards, pill labels, a dark block with a big number) and formula copy, produced at one version every half hour.
- **Did:** restyled the whole site as paper and ink: serif type (Newsreader), monospace figures (IBM Plex Mono), no rounded cards, pills, or dark blocks, no logo mark. The home page is one left-aligned column, and the example is a worked sum. The plan page shows the same sum as its headline.
- **Not solved by styling:** the page has no real person in it. The example is invented and labeled so. A true reason for building this, or a real plan shared with permission, is the thing that would make it read as human. Rule R6 and the floor forbid inventing one, and the GM may not use the Principal's name.
- **Design direction in the 2026-11-17 ruling (Space Grotesk, Inter, action blue) is superseded** by this entry. Revert: restore `app/globals.css` and the font link in `app/layout.tsx` from commit 02e3ed6.

### 2026-11-18 late night - interactive with the Principal: the offer, built and shown
- **Principal's direction this session:** measure a person's money against what they want; show progress and where it comes from; drop construction metaphors and name things literally; the original point of the layers was wealth that sits under the purely digital (things owned, relationships); imagine linking those as well as accounts; then come back to a home page that states and shows the offer.
- **GM's reading of the offer:** tell us what you want and what you have, including what a bank account never shows. See how far away it is in months, and what moves it.
- **Built so the home page shows only what exists:**
  - The plan's headline is now distance: months until the person has the savings their plan needs, at what they keep each month.
  - A question on what is not in a bank account: things owned that could be sold, people who would send work, people who would take the household in. Each changes what the plan says.
  - "Update my numbers" keeps the earlier answers and shows the change since that date, with each changed answer's own effect in months (`compare` in `lib/journey.ts`, 3 new tests).
  - Home page: one sentence of offer, one button, and a labeled example whose numbers are checked by a test.
- **Competitors discussed (from memory, not researched):** Rocket Money, Wealthfront, Mint (closed in 2024), Monarch, YNAB. All start from the money. None known to measure against a stated life goal with non-account wealth counted. A proper search is still owed.
- **Verified locally:** 23 tests pass, build passes, a phone-sized walk through all eight questions gave 9 months away, an update gave 5 months away with "4 months closer" and the right reason, and the comparison survived a reload. Home page fits one frame at 390x844 and 1280x800.
- **Not built:** account connections, LinkedIn or asset imports, automatic monthly updates. All need a floor change and counsel.
- **Writing rule added:** name the thing literally. No concept names or metaphors in product copy.

### 2026-11-18 night - interactive with the Principal: home page starts with what the person wants
- **Principal asked "why is this the home page?"** The GM's answer: it should not have been. The one-frame calculator was the runway number again, which the Principal had already said people do not need, and it never asked what the person wants. He said that if he likes the product he will be its first user.
- **Did:** the home page is now one question ("What would you be doing if money weren't holding you in place?"), one box, one button, and a labeled example plan. The plan page asks six questions one at a time and ends with a plan in the person's own words: what the life costs against today, how long they could give it, three ways it could go, when to look up, and what to look at first. The plan is saved in the person's browser only, so they can return and update it, and can be printed or erased.
- **Floor check:** nothing typed is sent to us. Events carry a step number at most. The example is labeled "Not a real person" (rule R6). Privacy page updated to say the plan is saved in the browser.
- **Verified locally:** 20 tests pass, build passes, a full walk on a phone-sized local browser produced the expected plan, the plan survived a reload, and the home page offered "Open my plan" on return.
- **E-001 metrics now:** `landing_edit`, `journey_view`, `journey_step` (by question), `journey_complete`, and the two feedback answers. Prediction and kill rule unchanged, with "change a number" read as "reach question 2".
- **Next:** the Principal's reaction as first user; then the monthly "toward or away" check-in on the saved plan.

### 2026-11-18 14:45 Mountain - scheduled run: live check, gospel cleanup (rocks, issues)
- **Live check (public fetch, 21:45 UTC):** `/`, `/snapshot`, `/privacy`, `/terms`, `/journey` returned 200. `/api/health` returned ok true, db true, email false, checkout false. Home page shows the one-frame calculator, so the live site matches the latest commit `05149f8`.
- **Metrics (ops-data, 2026-11-18 18:30 UTC, the newest snapshot):** 48 landing views, 1 snapshot start, 1 completion, 1 email saved. Probably all setup traffic. No experiment has a real sample, so no kill rule applies. No `reviews/` verdicts exist. No newer collection than 18:30 UTC was seen.
- **Did:** rewrote `docs/gospel/05-issues.md` (closed I-001, I-002, I-003, I-005, I-006 from rulings already made, added I-007 counsel and I-008 no traffic, tracker is GitHub Issues). Updated `docs/gospel/04-rocks-scorecard.md` (rock 2 now covers calculator, planner, Snapshot; rock 3 marked done; pricing is the GM's call). These only record rulings already logged, so they do not count against the two-per-week limit. Revert: `git revert` this commit.
- **Not done:** skookr mentions remain in the headers of documents 1, 2, 3, 6, 7, 8 and the standards paragraph in document 2. Next run. Search pages for the first 100 visitors not started.
- **Skipped:** daily brief (run outside 6:00 to 8:00 Mountain). Weekly outer loop (Wednesday, not Monday). No code change, so no ship. No push notification: nothing new needs Andy.
- **Blocked on Andy:** the counsel decision and the address format, unchanged.

### 2026-11-18 evening - interactive with the Principal: one-frame home page, plain language
- **Principal's advice:** write like a person, show beats tell, less is more (try a single-frame home page), and the six F's are cheesy and over-engineered.
- **Did:** replaced the long landing page with one frame: a question as the headline, one sentence, and a working three-number calculator that carries into the planner through the browser's session storage. Removed the F names and "six stages" from public pages (D-013). Plainer heading on the planner.
- **Verified locally:** 20 tests pass, build passes, home page fits one frame at 390x844 and 1280x800 with no errors, the number recalculates, and the three numbers carry into the planner.
- **Open:** the Snapshot is still a 24-question graded tool in a product that no longer leads with it. Decide rework or retire on E-001 data. The brand name itself was not revisited.

### 2026-11-18 late afternoon - interactive with the Principal: product direction, planner shipped
- **Principal's direction:** help the trapped person model the journey and checkpoints, contain a loss inside a boundary, project aims, and reinforce sound principles. Projections are normal in this industry. Commit fully. Be bold.
- **GM decided (D-012):** the product leads with a way-out planner. Experiment E-001 recorded in `docs/gm/learnings.md` before shipping.
- **Built:** `lib/journey.ts` with 8 tests in `lib/journey.test.ts`; the planner at `/journey`; landing page rewritten around "Not broke. Trapped."; a planner card on the Snapshot result; "Months of No" replaced by "runway" in public copy; privacy page updated; six anonymous event names added.
- **Floor check:** the planner runs in the browser. No number or sentence is sent or stored. Events carry a name only. No securities content. Wording is general education. Disclaimer on the page.
- **Rule change:** R1 in `docs/gm/legal_memo.md` now allows labeled projections with editable assumptions. GM reading, unconfirmed by counsel. Revert: restore the old text (kept in the row).
- **Verified locally:** 20 tests pass, production build passes, both pages rendered at phone and desktop widths in a local browser with no page errors and no sideways scroll; the over-boundary flag, empty-input message, and feedback buttons worked.
- **For counsel, added to the list:** the planner and R1 revision; ongoing "toward or away" updates; read-only account connections (Plaid: rates unpublished, third-party figures of about $0.25 to $0.60 per connection per month, unverified); a subscription.
- **Needs the Principal, only when we get there:** a floor change before any account connection or stored balance.
- **Next runs:** (1) live check and E-001 numbers; (2) search pages in the trapped person's words that lead to the planner; (3) saved plan plus monthly manual check-in, bands only; (4) rework the Snapshot result to point at the plan; (5) paid offer rethought as the deeper plan.
- **Gospel changes:** document 3 (direction paragraph added, revert: delete it), document 8 (D-012, revert: delete).

### 2026-11-18 afternoon - interactive with the Principal: customer and thesis
- **Principal stated the studio goal:** profitable ventures with positive impact for as many people as possible. Recorded in `docs/gospel/03-vision-strategy-culture.md`.
- **GM decided (D-011):** customer is the trapped person; the product closes the gap; six alignment gaps listed in document 3 with a kill rule. Hypothesis, no customer data behind it.
- **GM error, corrected:** earlier in this session the GM said the customer had never been narrowed. Document 3 already named the trapped middle manager. The GM had not read it closely.
- **Principal's feedback taken:** "Months of No" is confusing, and people already know their runway, so the number is not the value.
- **Next runs, replacing the old order:** (1) live check; (2) add two result-screen questions ("did this tell you something new", "do you feel trapped") with the prediction recorded in learnings first; (3) redesign the Snapshot opening around what the person wants (gap 1 and 2), tested on a local build; (4) plain-language runway wording (gap 6); (5) search pages in the trapped person's own words; (6) rethink the paid offer as a path out (gap 5) before counsel sees it.
- **Gospel changes:** document 3 (two sections added, revert: delete), document 8 (D-011 added, revert: delete).

### 2026-11-18 about 11:15 Mountain - first Claude Code cloud run
- **Migration:** this run read the repo, so the Cowork task should now be disabled (Andy).
- **Did:** audited the 24 questions, scoring, and result copy in code against R1 to R7. Found no R1, R2, R4, R6 violations. Fixed three gaps: R10 (added the "By saving your map you agree to the Terms and Privacy Policy" sentence), R7 and the 2026-11-17 ruling (price note now says the launch price may differ and nothing is charged), R5 (Months of No labeled an estimate). Changes in `app/snapshot/Snapshot.tsx`.
- **Verified:** `npm test` passed, `npm run build` passed, both local. Save route stores bands only, matching the on-page claim.
- **Metrics (ops-data, 2026-11-18 15:36 UTC):** unmeasured. Home returned 308, `/api/health` returned non-JSON, and the collector reported `METRICS_TOKEN secret not set` in GitHub. No `reviews/` verdicts exist.
- **Failed:** live site check. This session's network allowlist refuses `firstprinciplesmoney.com` and `www`. The change is not verified live.
- **Verified live afterwards (setup session, 2026-11-18 18:21 UTC):** all three new strings are in the live `/snapshot` JavaScript bundle on `www.firstprinciplesmoney.com`. `/api/health` returns `{"ok":true,"db":true,"email":false,"checkout":false}`.
- **Update (same day, after Andy allowlisted the domain):** live check passed. `/`, `/snapshot`, `/privacy`, `/terms` returned 200. `/api/health` returned ok true, db true, email false, checkout false. The new price-note string ("launch price may differ") is in the live JavaScript bundle, so the change shipped (verified by fetching the bundle, not by walking the flow). The earlier metrics note about non-JSON health is stale. Email sending is off. The `METRICS_TOKEN` item still needs checking on the next metrics run.
- **Failed (earlier in the run, now resolved):** live site check. This session's network allowlist refuses `firstprinciplesmoney.com` and `www`. The change is not verified live.
- **Metrics feed live (2026-11-18 18:30 UTC).** Andy set `METRICS_TOKEN`. The first run still failed because the workflow called the apex host, which 308-redirects to `www` (curl dropped it). Fixed by defaulting `SITE_URL` to the `www` host (commit 80e1273). First good snapshot: 48 landing views, 1 snapshot start, 24 answers from 1 visitor, 1 completion, 1 email saved, 1 price-intent view ($79 variant, 0 clicks). All of it is probably the setup walk-through by Andy, so treat it as a baseline of about zero real activations. No experiment has a sample, so no kill rule applies. `reviews/` still has no verdicts (OpenAI secret status unknown).
- **Blocked on Andy:** nothing from this run. (The old Cowork task is already disabled per Andy, 2026-11-18. The GM never checked its state.)
- **Gospel changes:** none. No brief (run outside 6:00 to 8:00 Mountain).

### 2026-11-18 about 07:30 Mountain - interactive: move the scheduled run to Claude Code
- **Decided (Andy):** move the GM run to a Claude Code scheduled task in the cloud with `andychesnut/fppf-web` attached. He had already moved the app zip to Claude Code, which is how the site went live.
- **Found:** the current Cowork task has no repo attached and carries Drive, Slack, Webflow, Linear, FMP, and Claude Docs connectors, which the isolation rule forbids. That is the root cause of "no repo access".
- **Did:** wrote the new task prompt (repo-based, with git safety and ship rules from the incident), a five-step setup message for the Claude Code session, and a bundle of all 19 GM documents at their new repo paths. Saved the setup notes to the project as `claude/claude_code_migration.md`.
- **Not done here:** the Claude Code task itself. It has to be created from a session that has the repo, which this one does not.
- **Old task:** left enabled until the new one proves it can read the repo. Setup step 5 disables it (not deletes).

### 2026-11-18 06:45 Mountain - scheduled run: trademark check, legal pages draft, live-site discovery, first daily brief
- **Did:**
  1. Checked both trademarks. Wrote `claude/legal_memo_addenda.md`.
  2. Drafted the privacy policy and terms. Then found the site live with its own versions, compared them, and reshaped the draft into replacement text plus a gap list. Saved as `claude/legal_pages_draft.md`.
  3. Wrote the first daily brief, `claude/daily_briefs/2026-11-18.md`.
- **Why this action:** the trademark check was first in the queue and could have forced a rename before launch. The legal pages gate email collection (rule R9).
- **Verified, and how:**
  - Serial 97774768 is abandoned after an opposition by Principal Financial Services, Inc. Read by a fetch agent from the official trademark board pages for opposition 91290761 and the extension record.
  - The "FPPF" registration 7373297 is listed live by three third-party sites that agree. Secondary.
  - The live site: five pages fetched over two passes by fetch agents, quoted in the State section and in Part D of the draft.
  - All project writes confirmed by the tool. Docs checked for em-dashes by script.
- **Not verified:** the grounds of the opposition (the filing was not read). The USPTO status page for either mark (it needs scripts to load). Anything on the live site past the snapshot intro. Raw HTML, so third-party scripts could not be listed. Whether the legal draft matches the app's code. The entity's state of formation (Utah is inferred from the address).
- **Failed:** the USPTO status page returned an empty shell.
- **Skipped:** `metrics/latest.json`, review verdicts, kill rules (no repo access, no experiments recorded). The weekly outer loop (Wednesday). Walking the live flow with a scripted browser (GM decision above). The question and result-copy audit (needs the result page). No separate-agent review: nothing changed decision rights, gates, or the loop.
- **Gospel and Product Brief changes:** none.
- **Isolation:** Slack, Webflow, and Google Drive tools were attached. None was used. No repository list was requested. No memory files were opened.
- **Notified Andy** by push: site seen live, the trademark finding, the brief, and the repo access ask.
- **Blocked on Andy:** repo access for scheduled runs. The counsel decision. The address format.

### 2026-11-17 22:45 Mountain - scheduled run: internal legal memo, version 1
- **Did:** researched and wrote `claude/legal_memo.md`. It covers the adviser line, the Safeguards Rule, FTC claims and endorsements, CAN-SPAM, privacy, terms, refunds and recurring billing, referrals, and trademark. It sets 11 product rules and recommends limited outside counsel before paid checkout.
- **Why this action:** rocks 1 and 2 are blocked on repo access and on Andy's setup steps. Rock 3 was the only rock the GM could move alone, and it gates all revenue.
- **Verified, and how:** 12 official pages and 9 secondary pages were fetched and read by separate fetch agents this run. Each claim in the memo is marked Read, Secondary, or Unverified. The memo was saved to the project (write confirmed by the tool).
- **Not verified:** listed in memo section 13. The main ones: state adviser law, the current status of trademark serial 97774768, the current CAN-SPAM penalty figure, and any counsel cost. The Lowe opinion and two FTC pages were partly read through extracted summaries, not full text.
- **Failed:** repo access (see State). One trademark page would not load.
- **Skipped:** reading `metrics/latest.json` and review verdicts (no repo access, and the repo holds the wrong content). The daily brief (this run is outside the 6:00 to 8:00 window). The weekly outer loop (not Monday). No separate-agent review of the memo: it changes no decision rights, gates, or loop rules.
- **Isolation:** Slack, Webflow, and Google Drive tools were attached to this run. None was used. No repository list was requested.
- **Notified Andy** by push about the repo access block and the memo headline.
- **Blocked on Andy:** repo access for scheduled runs. The wrong repo contents and wrong deployment from the incident below. The stack setup items. The counsel decision.

### 2026-11-17 evening - incident: wrong repository pushed and deployed
- **What happened:** the GM gave Andy four terminal commands on separate lines. The first failed (the file was not on his Mac), the rest still ran from his home folder, which is inside an unrelated git repository. Its remote was changed to `fppf-web` and its `main` branch was pushed there. Vercel then deployed that content to production.
- **Cause:** the GM's commands were not chained to stop on failure, and the GM did not confirm the file had arrived first.
- **Exposure:** another repository's files were in `fppf-web` on GitHub and served at the Vercel production URL for at least several minutes. The GM did not view them. Andy was told to rotate any secrets they contain.
- **Still open:** delete the wrong deployment, replace the repo contents, restore the other repository's original remote.
- **Rules from this:** (1) Never hand over multi-step commands unless they stop at the first failure. (2) Confirm a file exists on the other side before giving commands that depend on it. (3) Prefer the GM doing the push over the owner running git by hand.

### 2026-11-17 (interactive session with Andy)
- Wrote the eight gospel docs, the RSI loop, the v1 plan, and the design mockups. Built the Snapshot app.
- Verified: all docs saved to the project. OpenAI API is unreachable from the GM workspace (tested, 403). Domain lookups are also unreachable.
- Not verified: vendor prices, anything on Vercel, the database, email sending, the two GitHub Actions, whether a scheduled run can read this project and attach the repo.
- Learnings: (1) The GM picked a clever brand name over a clear one. A public name must say the category without explanation. (2) The GM proposed spending on a defensive domain before any traffic existed. Apply "is this necessary?" to every dollar before proposing it.
