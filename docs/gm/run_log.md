# FPPF run log

Read this first on every run. The "Standing rulings" section overrides any older document where they disagree.

## Standing rulings (latest first)

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

- **MIGRATION FINISHED (2026-11-18).** The GM now runs as the Claude Code cloud routine "FPPF GM run (Claude Code)" (`trig_015SGNynFXUAeQEbcanh7zAc`), with `andychesnut/fppf-web` attached, at 6:45, 14:45, and 22:45 America/Denver. Its first run on 2026-11-18 at about 11:15 Mountain read this log and the repo and pushed `b769d6f` to main. The repo `docs/` folder is now the source of truth; the claude.ai project copy is a read-only archive. The old Cowork task "FPPF GM run" (`trig_01USCQ2zKTxd2sZn3wM1SYU5`) was disabled, not deleted, by Andy on 2026-11-18 (reported in chat, not verified by the GM: the setup session could not reach that task). Its history stays in Cowork.
- **LIVE SITE: the Snapshot is in production at `https://firstprinciplesmoney.com`** (verified by public fetch, 2026-11-18 about 07:00 Mountain). Landing page, `/snapshot` intro with the 18-or-older box, `/privacy`, `/terms`, and `/delete` all returned 200. Footer shows operator "ETHEUS LLC, 30 E Broadway Suite 203 1161 Salt Lake City, UT 84111". Links inside pages use the `www` host. The GM did not deploy it. Presumably deployed from Claude Code on Andy's Mac overnight (inference).
- **Not verified on the live site:** completing the 24 questions, the result page, the price-intent button, saving a map, any email, the database, the metrics job, whether Start is blocked until the age box is ticked. The fetch tool does not run page scripts.
- **Domain:** `firstprinciplesmoney.com`, attached and serving (verified 2026-11-18).
- **Repo:** `andychesnut/fppf-web` (private). **Scheduled runs have NO access at all, read or write** (verified 2026-11-17 22:46 Mountain: the GitHub tool answered "GitHub access to this repository is not enabled for this session" and said a scheduled run cannot add repositories). The 2026-11-18 06:45 run had no GitHub tool attached at all and did not retry. Do not retry in later runs until this line changes. The fix is Andy's: in a new chat on claude.ai, ask Claude to add `andychesnut/fppf-web`, then replace the "FPPF GM run" scheduled task from that chat.
- **Repo contents:** last known WRONG as of 2026-11-17 21:10 Mountain. Since the real app is now live from the linked Vercel project, the repo has probably been replaced with the real app. That is an inference, not verified.
- **Vercel:** project `fppf-web` on a Pro team, serving the real app at the domain. Whether the wrong deployment from the incident was deleted is not confirmed.
- **Legal entity and address:** filled in production (seen on the live pages). The entity's state of formation is unknown to the GM. The address format "Suite 203 1161" is queued for Andy to confirm.
- **Unknown, because launch work on the Mac writes nothing back here:** Neon Postgres, Postmark, Stripe, OpenAI and Anthropic keys, GitHub secrets, the two GitHub Actions.
- **Legal memo:** `claude/legal_memo.md`, version 1, plus `claude/legal_memo_addenda.md` (addendum 1, trademark, 2026-11-18). **Rock 3 is done:** the counsel recommendation reached Andy's decision queue in the 2026-11-18 daily brief.
- **Legal pages:** `claude/legal_pages_draft.md`, draft 1. Full replacement text for `/privacy` and `/terms` plus a 15-item gap list against the live pages (Part D). Not deployed.
- **Rocks:** (1) minimum stack: partly met, deploy works, checkout and analytics unverified. (2) snapshot live: live, numbers unmeasured. (3) legal memo: done.
- **Decision queue for Andy (protected core or needs his hands):**
  1. Give scheduled runs access to the repo (steps above). Age: since 2026-11-17.
  2. Outside counsel before paid checkout: GM recommends go, limited scope, three questions (memo section 12, question 3 widened by addendum 1). New spend above the envelope. GM cost estimate $1,500 to $4,000, unmeasured. Age: since 2026-11-17.
  3. Confirm the postal address format. Age: since 2026-11-18.
- **Ask of the Mac session (not a decision):** append a dated line to this log whenever it deploys or changes the stack.
- **Spend, month one, estimated:** domain about $16, Vercel Pro about $20. Prices unverified. The mailbox address and any entity costs are unknown and not counted.
- **Known cleanup:** remove skookr references from `gospel/05-issues.md` and `gospel/07-team.md`. Update `claude/FPPF_RSI_Loop.md` and `gospel/01-gm-charter.md` to match the standing rulings above (both still say the GM may not change gospel, the charter still says no scheduled task exists). Fold the rulings into `gospel/08-decisions.md`. Update the brand, domain, and monetization lines in `claude/FPPF_v1_Plan.md` and `gospel/03-vision-strategy-culture.md`. Rewrite rock 2 in `gospel/04-rocks-scorecard.md` (it still says Formation and Foundation only). Close issues I-001, I-002, I-003 in `gospel/05-issues.md` (all three were settled on 2026-11-17).
- **Next runs, in order (none need the repo):** (1) live-site check; (2) the gospel cleanup above, starting with rocks and issues, max 2 gospel changes per week under the loop unless the change only records a ruling already made; (3) distribution plan for the first 100 visitors on owned channels (site content and search), since the product is live with no traffic plan; (4) write the Full Assessment report template with no securities content, which counsel needs to see. **When repo access exists:** read `metrics/latest.json`, audit the 24 questions and result copy against rules R1 to R7 from the code, apply Part D of the legal pages draft.

## Entries

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
- **Blocked on Andy:** nothing from this run. Optional: disable the old Cowork task.
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
