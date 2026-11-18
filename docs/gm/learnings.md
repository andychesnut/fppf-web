# FPPF learnings log

Experiment results and learnings, newest first. No experiments are known to be running: the product went live by 2026-11-18, but no metrics feed reaches the GM. Entries so far are process and research learnings.

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
