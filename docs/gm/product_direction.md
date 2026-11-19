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

`/` has the Principal's headline with a spending-map example. `/journey` is the eight-question plan saved in the browser. `/snapshot` is the original 24 questions with plain names. `/angles` is an unlinked comparison page. Paper-and-ink styling.

## Build order the GM proposes

1. Rebuild onboarding parts 2 and 3 from the existing Snapshot questions, producing "what's in the way" in ranges instead of grades. Tests in `lib/snapshot.test.ts`.
2. New Home screen from that reading, in the app look.
3. "What if you took this on?" as arithmetic on the person's own numbers.
4. Part 1 reflection with fixed-choice questions first (no free-text reading yet).
5. Home page with the maze, generated in code so it resizes.
6. Re-record experiment E-001 against the new home page before shipping it.
