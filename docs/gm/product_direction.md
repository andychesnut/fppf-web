# Product direction, as of 2026-11-19

Read this after the run log. It records what the Principal and the GM settled in the long working session of 2026-11-18 to 2026-11-19. **The live site does not match it yet.** Mock-ups are in `docs/design/`.

## The story (source)

The Principal's own words are in `docs/gospel/03-vision-strategy-culture.md` and they are the source. In short: everyone reaches a moment when they know the world is changing under them and cannot get off the path they are on. The bills have to be paid, so the days go to money in and money out. Once stuck, a person can be pushed into things they would not otherwise do.

## The offer

- **Headline (the Principal's):** "Put your money where your mind is."
- **Under it:** "You know something has to change. The bills still have to get paid. This shows you whether you can afford the change you want, and what's standing in the way."
- **Brand:** First Principles Money.

## What the product must do (four jobs)

1. **Hold what you want, in your words,** with what you won't go along with and what comes first.
2. **Tell you whether you are on solid ground for that.** Output: a short list of things in the way, each with a number.
3. **Show those closing, and why.** What moved, by how much, traced to a cause.
4. **Let you test a decision before you make it.** For example a new $520 car payment: what it does to the months to go, the share of pay going to bills, and how long you could say no.

Not in scope: category budgets, investment picks, telling anyone what to do.

## Onboarding (three parts)

1. **About you.** A slow reflection, a few minutes at a time, every question skippable. Indirect questions (gut reaction to losing the job, envy, regret, lines crossed). It ends in a draft statement the person edits. If someone does not know what they want, the default aim is room to choose.
2. **Your situation and what you have.** Ranges, about two minutes.
3. **Your money.** Ranges, about two minutes. Exact numbers are optional later.

**The 24 Snapshot questions:** keep 18, drop 6, retire the stage names and the Solid, Building, Exposed grades.
- Keep 1 to 4 (situation), 7 to 10 and 12 (people and skills), 13 to 16 (money) in parts 2 and 3.
- Move 5, 6, 21, 22, 24 into part 1, reworded so they do not judge. Question 22 (staying silent at work because you could not afford the consequences) is the heart of the story.
- Drop 11, 17 to 20 (investing, closest to advice), and 23.

## Screens designed (mock-ups only)

Onboarding: welcome, two reflection questions, "here's what you told us" with a first draft, one situation question, one money question, first reading. Product: Home, one item opened, "What if you took this on?". Home page: desktop and phone.

Not designed: the other five reflection questions, the monthly check-in, the version for two partners, the "room to choose" Home.

## Look and feel

- **Home page:** the Principal's headline large on the left. An animated maze beside it: grey dots run down dead ends (bills, day to day, everything else) and one blue route lights up in four states (stuck, making room, building, solid ground) through savings and a switch marked "your call" to "what you want". Nine-second loop.
- **App:** it must look like a personal finance app. Light grey ground, white cards, a dark card at the top for what the person wants, bars, a tab bar. One accent colour.
- **Rejected by the Principal:** anything that reads as a generic template or as "100% AI"; the survey-report phone screen ("doesn't look like a personal finance app at all"); headlines tucked in a corner.

## Voice (binding on all public copy)

The Principal's standing complaint is copy that sounds like AI. Rules that came out of it:
- Write the way a person would say it out loud. Use contractions.
- No clipped pairs written to sound punchy ("You first. Then your money.").
- Name the thing. "Bills you can't skip", not "fixed commitments". "One job pays", not "income source". "If the paychecks stopped, how many months could you cover?"
- Answer labels a person would use: "Panic", "Honestly, both", "Pretty much all of it".
- The person's own statements stay in the first person.
- Very little text per screen: one headline, the answers or numbers, the buttons.
- Never the words AI, smart, or insights. People dislike AI. Intelligence shows as reasoning the person can check.
- No metaphor labels inside the product.

## Conflicts with the floor and open risks

- **Account balances and connected accounts** appear in the direction but are forbidden by the floor today. Only the Principal changes the floor. Counsel first.
- **Reflection answers** are more personal than balances. They must stay on the person's device.
- **"Here's what you told us"** needs something to read free text. If a language model does it, the words must not leave the device for the privacy line to be true. Unsolved.
- **Thresholds** ("you need 6 months", "over half") are invented. They need a defensible basis and counsel's eye.
- **"What if you took this on?"** is the screen closest to advice. Counsel should see it first.
- **People leaving abuse:** if the product reaches them it needs no-trace use, a quick exit, and a plain pointer to real help. Not designed.
- **No customer has seen any of this.** Experiment E-001 was recorded against an earlier home page and is now stale.

## What is live today (and behind this document)

As of 2026-11-19: `/` (headline, maze, one button), `/start` (onboarding), `/home`, `/what-if`. See the run log entry of that date for how the build differs from the mock-ups. The older `/journey`, `/snapshot`, and `/angles` still exist, unlinked.

## Build order the GM proposes

1. Rebuild onboarding parts 2 and 3 from the existing Snapshot questions, producing "what's in the way" in ranges instead of grades. Tests in `lib/snapshot.test.ts`.
2. New Home screen from that reading, in the app look.
3. "What if you took this on?" as arithmetic on the person's own numbers.
4. Part 1 reflection with fixed-choice questions first (no free-text reading yet).
5. Home page with the maze, generated in code so it resizes.
6. Re-record experiment E-001 against the new home page before shipping it.

## Interview 1 with the Principal (2026-11-19): themes only, no figures

Recorded as themes because the product's own rule is to store bands and never raw numbers.

- **The drift is by single item, not by category.** Large costs for things he does not use (a home he does not need, a car he does not drive) and a one-off purchase for someone who would never use it. A "does this category serve me" screen misses all of these. The useful question is "do I use this, and would I choose it again today?"
- **Two of the three run quietly.** Recurring costs continue without a decision. Nothing prompts a review.
- **The impulse purchase was not a knowledge gap.** He knew. It happened on a bad day, at an auction, without thinking. More information would not have changed it. A rule written in advance might have.
- **What he wants is not a number.** Contribute to people changing the world, hands-on, "enough" not rich. He is close to living that now, so the felt gap is small but real.
- **His idea: a card with principle-based limits.** Merchant-type limits exist technically, but a real card means issuing and lending, a bank partner, compliance, cost above the envelope, and a floor change. Also a merchant-type block would not have caught the auction purchase. Not buildable now.
- **What the idea points at:** pre-commitment. Principles written when calm, shown at the moment of weakness.

### Candidate builds from this
1. Rules I set for myself: the person writes their own rules while calm; the app shows them back, on the device.
2. A still-want-this review of things that keep running (per item: do I use it, would I choose it again today).
3. Rework `/align` from category groups to specific things.

Open question for him: if a rule had been written in advance, what would it have said?

### Interview 1, round 2 (2026-11-19): themes only

- **His principles are contrasts, so each is a test for a single purchase:** experiences over stuff; a basecamp, not something frivolous; betting on himself (solo income). Round 2 confirmed the feelings about the quiet recurring costs are mixed (stuck, annoyed, embarrassed).
- **His rule, in his words, as a formula: wait days equals price divided by a personal number.** Small purchases wait almost nothing, large ones wait a long time, and no one has to define luxury. The number is personal. This is the engine for the "Sleep on it" queue.
- **His bet has a target and a first checkpoint in monthly income.** Months of savings matters here as the fuel for the bet, not as a rule of thumb.
- **The sharpest mirror found:** the cost of the things that fail his tests, as a share of the income his bet needs. Arithmetic on the person's own numbers; their call.
- **He cannot see the split between experiences and stuff today.** That is part of the value. Getting the data conflicts with the floor (no connected accounts). Options: manual entry with tags now; a local-only statement import (file read in the browser, never sent to us) only if the Principal rules it allowed.

### Build order from the interview
**HOLD (2026-11-19, the Principal): item 1 is not to be built until he says it is validated.**
1. "Sleep on it" with the formula. 2. The bet panel (target, checkpoint, share tied up in things that fail the person's tests). 3. The experiences-versus-stuff view, manual tags first.

### Hand test 1 (2026-11-20): the Principal's own card statements, themes only
No merchants, amounts or dates recorded here, by the privacy rule. The file stayed in session scratch space and was never committed.

- **One question was enough.** "Would you choose this again today?" on about twelve cards, biggest first. He answered eleven in one message, with reasons. The four tests (experience or stuff, basecamp or frivolous, use it, funds or drains the bet) were never needed. Simplify.
- **Categories fail inside themselves.** One category held both his strongest regret and something he loves, separated by merchant. The card needs a split action.
- **Answers fell into four kinds, not three:** keep; ending (a project nearly done, a child changing activities); past regret that cannot be changed; mixed. The product should separate what is still running from what is past, because only the running part can change.
- **Card data missed the biggest drift.** His largest misalignments (housing and a vehicle) are paid from a bank account, not cards. Card-only data understates drift. This is the strongest case so far for Plaid or a bank-file import.
- **His day-to-day spending broadly matched his stated principles.** The misalignment concentrated in a few large decisions, plus card interest that fails every test. The tool's job is to find the few big ones, not to audit coffee.
- **Effort:** one export and one message from him. He expects most users would not export a file.
- **Open:** whether it told him anything he did not already know. That answer decides whether this is the product.
