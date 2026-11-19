# FPPF learnings log

Experiment results and learnings, newest first. No experiments are known to be running: the product went live by 2026-11-18, but no metrics feed reaches the GM. Entries so far are process and research learnings.

## 2026-11-18 (14:45 run)

1. **Record-only gospel cleanup is cheap and keeps runs honest.** Issues and rocks still described a world before the launch. Consequence: after each ruling, update the gospel line in the same run. No experiment data yet; E-001 has no real sample.

## 2026-11-18 (06:45 run)

**No experiments recorded. Nothing to apply kill rules to. Whether the live price-intent rotation is running is unverified.**

1. **The log was wrong about production for a whole run.** It said "not deployed" while the site was live, because launch work on Andy's Mac writes nothing to the project. The GM spent part of this run drafting legal pages that already existed. Consequence: every run starts with a public fetch of the live site, before choosing work. Evidence: live pages read at about 07:00 Mountain.
2. **A dead trademark record can hide the real risk.** The "FIRST PRINCIPLES FINANCIAL" application is abandoned, which reads as all-clear. The reason it died is the finding: Principal Financial Services opposed it. Consequence: when checking a mark, read how it ended and who was on the other side, not only its status. Source: opposition 91290761.
3. **Aggregator trademark pages go stale without saying so.** One showed a 2023 status with no refresh date, more than two years after the application was abandoned. The official trademark board search by correspondent name surfaced the truth. Consequence: for trademark status, use an official record or mark the status as unverified.
4. **A policy drafted without seeing the product makes false statements.** Draft 1 said "no third parties" while the live site calls Google Fonts and keeps a browser identifier. Consequence: write legal text from the live product or the code, and list every statement the text depends on (Part C of the legal pages draft).
5. **The fetch tool cannot see past the first screen of a scripted flow.** The result page, the price button, and the save step are invisible to it. A scripted browser could walk the flow but would add fake completions to metric 1. Consequence: the app needs a way to mark test traffic before the GM tests production. Until then, audit from code.

## 2026-11-17 (22:45 run)

**No experiments running. Nothing to apply kill rules to.**

1. **A scheduled run cannot add a repository.** The first unattended run found no access to `andychesnut/fppf-web`, read or write. Access must be granted in a chat and the scheduled task re-created from that chat. Consequence: plan every scheduled run around work that needs no repo until the run log says access exists. Evidence: the GitHub tool's reply at 22:46 Mountain.
2. **The scheduled-run workspace is fresh each time.** Anything not saved to the project is gone. The built app exists only in the zip handed to Andy. Consequence: save every deliverable to the project in the same run.
3. **The legal risk sits in the paid product, not the free one.** A fee plus a report built from one person's answers plus investing content is the combination that approaches the investment adviser definition. Remove any one and the risk drops. Consequence: design the Full Assessment with no securities content from the start, instead of adding a disclaimer afterward. Source: `claude/legal_memo.md` section 3.
4. **Auto-renewal is a legal cost, not only a pricing choice.** A fixed-term, one-payment program tests the same demand without renewal law. Consequence: recurring hypotheses are tested as fixed terms first. Source: memo section 9.
5. **The brand was cleared against "FPPF" but not against "First Principles".** A 2023 application for "FIRST PRINCIPLES FINANCIAL" in financial advisory services turned up only when the GM searched the words actually used in public. Consequence: clear the name people will see, not the internal acronym. Status of that application: abandoned, see 2026-11-18 item 2.
6. **Search results alone are not evidence.** The search tool returned titles and links only. Every claim in the memo had to be read from the page by a fetch step, and two official pages disagreed on a number (the CCPA revenue threshold). Consequence: mark each claim by how it was read, and report disagreements instead of picking one.

## 2026-11-18 (first Claude Code run)

1. **The cloud session's network allowlist can block the product's own domain.** Live verification failed. Consequence: allow the domain in the environment, or ship only with the live check marked pending. Evidence: proxy refused firstprinciplesmoney.com.
2. **Rule audits find gaps in copy, not in scoring.** R5, R7, R10 were missing from UI text while the scoring was clean. Consequence: audit UI strings against the rules before each ship.

## 2026-11-18 (later in the first Claude Code run)

3. **Check state before reporting it.** The GM said the old Cowork task was still enabled with no evidence, when the run log already said Andy had disabled it. Consequence: read the run log's State section before calling anything open, and say "unverified" when a state cannot be checked.
4. **A redirect can break an authenticated job without any error.** The metrics workflow hit the apex host, which 308-redirects to `www`, so the feed stayed empty after the secret was set. Consequence: scheduled jobs call the canonical host directly.
5. **Andy has said his feedback is welcome** when the GM wants it. Ask for it when a decision is a judgment call, not a lookup.

## Experiment E-001: lead with the way-out planner (recorded 2026-11-18, before shipping)

- **Change:** the landing page leads with "Not broke. Trapped." and sends people to a new planner at `/journey` (target, boundary, three scenarios, checkpoints, principle checks). The Snapshot becomes the second door.
- **Hypothesis:** the trapped customer wants a bounded way out more than a score.
- **Metrics:** `journey_view` over `landing_view`; `journey_edit` over `journey_view`; yes share on "showed me something new"; yes share on "I feel trapped".
- **Prediction:** 25% of landing visitors open the planner. 40% of those change a number. Of people who answer, 50% say it showed something new and 60% say they feel trapped.
- **Sample:** 100 planner views from real visitors.
- **Kill rule:** at 100 views, if fewer than 25% change a number, or fewer than 30% of answers say "something new", put the Snapshot back as the lead and reopen the thesis. No early peeking, no extension.
- **Known weakness:** traffic is near zero, so the sample may take weeks. The first views will include the Principal's and must be discounted.

## 2026-11-18, the Principal's advice on public surfaces (binding on the GM's writing and design)

1. **Write like a person.** Whole sentences, plain words, a real thought. The first landing rewrite led with a slogan ("Not broke. Trapped.") and fragments. It was replaced the same day.
2. **Show beats tell.** The first rewrite described the planner in five sections. The home page now is the planner: three numbers in, one answer out.
3. **Less is more.** The home page is one frame at phone and desktop size. If a message does not fit in one frame, the product or the message is not simple enough yet.
4. **The six F's are cheesy and over-engineered for someone who just wants help.** They are now internal only (D-013). Public pages use plain names.

**E-001 amended before any sample existed:** the landing page changed again on 2026-11-18 (one frame, with the calculator on it). New first metric: `landing_edit` over `landing_view`, predicted 20%. The planner metrics and the kill rule are unchanged.

## 2026-11-18, later advice from the Principal

5. **Name things literally.** Metaphor labels ("footing", "drift") make the reader translate before they can act. Say "fixed commitments", "savings", "months".
6. **The home page can only show what the product does.** The offer was sharper than the build, so the build came first. A page that shows an unbuilt feature is a claim we cannot support (rule R5).
7. **Calling the six F's cheesy was about the names, not the idea.** The idea worth keeping: wealth includes things owned, skills, and people, and they sit under the money.

**E-001 note:** the plan now has eight questions and a distance headline. Metrics and kill rule unchanged. `journey_update` added: the share of completers who come back and update is the first retention signal. No prediction recorded for it yet because there is no baseline.

8. **Speed produced a template.** Five home pages in one evening all came out as the same generic startup page with different words. A distinct look took one deliberate pass with a stated point of view (paper, ink, a worked sum). Consequence: decide the look and the voice on purpose before building, and do not ship a public page faster than it can be looked at critically.

## 2026-11-19, from the long session with the Principal

9. **Work that is not in the repo does not exist for the next run.** A day of design sat in a private canvas and a scratch folder. Consequence: save design sources and decisions to the repo before ending any session, and say so.
10. **The GM writes like AI by default.** Clipped pairs, abstract nouns, tidy neutral labels. The Principal's own phrases were the only lines that sounded real. Consequence: the voice rules in `docs/gm/product_direction.md` bind all public copy; when unsure, use his words.
11. **Designing without looking produces faults the Principal finds first.** Several boards had a hidden headline or a confusing layout. Consequence: render and look before showing anything, and ask for permission up front where a tool forbids it.
12. **A text box is not a design for a hard question.** "What do you want?" needed indirect questions, time, and a reflected draft. Consequence: where the product asks something personal, design the path to the answer, not the field.
13. **The original 24 questions held the story all along.** Question 22 is the Principal's second paragraph. Consequence: read old work for what it was reaching for before replacing it.

## Experiment E-002: the rebuilt product (recorded 2026-11-19, before shipping)

- **Supersedes E-001**, which was recorded against a home page that no longer exists and never reached a sample.
- **Change:** home page with the Principal's headline and the maze; a new flow at `/start` (15 questions in three parts, a first draft in the person's words, a first reading); `/home` with what is in the way and what they have going for them; `/what-if` for trying a new monthly payment.
- **Hypothesis:** a person who feels stuck will answer questions about themselves before their money, and finds the reading worth coming back to.
- **Metrics:** `start_view` over `landing_view`; `start_done` over `start_view`; `numbers_saved` over `start_done`; `whatif_try` over `home_view`.
- **Prediction:** 20% of landing visitors start. 45% of starters finish. 25% of finishers add real numbers. 20% of Home visitors try a decision.
- **Sample:** 100 real `start_view` events, not counting the Principal's own testing.
- **Kill rule:** at 100 starts, if fewer than 25% finish, cut part one (about you) to two questions and re-test. If fewer than 10% of finishers ever add numbers, drop the exact-numbers path and rethink "what if".
- **Known weakness:** no traffic source exists. The first events will be the Principal's testing and must be discounted.

## 2026-11-19 (14:00 UTC run)
- Check-in is built before any person has used the first reading. Prediction: a returning visitor who changes numbers will see the card. Not testable until real traffic. No kill rule applies yet; if `numbers_saved` stays at zero real events after 50 real `home_view` events, the numbers form is too heavy and Home should ask for one number at a time.
- A test of my own had the wrong expectation (month still positive, so "What's left", not "shortfall"). Run tests before reading the output as a bug in the code.
