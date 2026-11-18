# FPPF v1 Plan - product, architecture, tonight's setup

**Status: FIRST SWING, 2026-11-17 evening. Written by the GM for the Principal's design session tonight.**
Dollar figures for vendors are from the GM's knowledge and are not verified against current pricing pages. Check each at signup.

---

## Part A - Product vision

### The one-line position

**A credit score measures how good a debtor you are. FPPF measures how free you are.**

Every existing score serves a lender. Nothing measures the thing the trapped middle manager actually feels: how much of their life someone else can dictate. FPPF is that measure, plus the map out.

### Where it goes (3 rungs, in order)

| Rung | Product | What the person gets | Money |
| --- | --- | --- | --- |
| 1 | **The Snapshot** (first ship) | A six-F map in about 6 minutes, one headline number, 3 next moves | Free |
| 2 | **The Full Assessment** | Deep pass per stage: personal P&L, balance sheet, cash flow, skill inventory, full written report, sequenced plan | One-time price. Hypothesis: $49 |
| 3 | **Membership** | Re-assessment every 90 days, progress line over time, stage playbooks | Recurring. Hypothesis: $12 to $15 per month |

Rungs 2 and 3 do not take money until the internal legal memo is complete and the Principal flips the checkout flag (Part B).

### First product: The Snapshot

**Change from the earlier hypothesis.** Charter v1.1 made the free tier Formation and Foundation only. The GM now proposes a light pass across all six F's. Reasons:

1. The promise is a map. Two of six stages is not a map.
2. The persona arrives with money pain. Asking only about character and resilience, with no money question, will lose them.
3. The strict sequence still holds: questions run in stage order and the result names the first stage that is exposed.

**Shape:**
- 24 questions, 4 per stage, about 6 minutes. No login to start.
- Every question asks what the person did, not how they rate themselves.
- Answers are bands, never raw balances. No account numbers. No SSN.
- Scoring is fixed rules in code. No AI in v1. That means zero inference cost and no risk of a model inventing financial claims.

**The result page:**
1. **The six-F map.** Each stage reads Solid, Building, or Exposed. No shame words.
2. **Your stage.** The first Exposed stage in sequence. "This is where your next move is."
3. **The headline number: Months of No.** How many months the household could go without its main paycheck. Simple arithmetic from the person's own banded answers, shown as a range, with the math shown.
4. **Three next moves.** Educational, templated per stage and Formation context. Each carries the plain "education, not advice" line.
5. **Save and re-check.** Email to save the map and get a re-check in 90 days. This is the sign-up moment and the seed of the membership.

**Draft question bank (first swing, for tonight's design pass):**

*Formation*
1. Who depends on your income? (count of dependents, bands)
2. What share of household income comes from the single largest source?
3. How many hours a week are truly discretionary, after work and essential duties?
4. Which big changes do you expect in the next 5 years? (child, move, caring for a parent, job change, none)

*Foundation*
5. The last time a hard money fact arrived (a bill, a statement, a notice), how long before you looked at it?
6. In the last 30 days, how many evenings went mostly to numbing out instead of something you were avoiding? (bands)
7. How many people could you call tomorrow who would take your family in for a month, or build something with you? (0, 1 to 2, 3 to 4, 5 or more)
8. In the last 12 months, which of these did you do yourself? (fixed a vehicle, repaired your home, grew food, trained in first aid or self-defense)

*Framing*
9. In the last 3 years, how many of your skills has someone outside your employer paid you for?
10. The last time you looked for work, how long did it take to land? (or: never tested)
11. Which household costs do you cover with your own hands instead of paying someone?
12. What happened to demand for your main skill in the last downturn?

*Fundamentals*
13. In the last 3 months, in how many did you spend less than you earned?
14. What share of take-home pay goes to fixed obligations? (bands)
15. How many months of essential expenses do you hold in cash? (bands)
16. What is the highest interest rate on any debt you carry? (none, under 7%, 7 to 15%, over 15%)

*Features*
17. If your employer offers a retirement match, how much of it do you capture?
18. Are you investing while carrying debt above about 7%?
19. Which tax-advantaged accounts do you use? (count)
20. What share of your investable money sits in speculation? (bands)

*Freedom*
21. In the last 12 months, did you put money into something only because it mattered to you?
22. In the last 12 months, did you stay silent or go along with something at work because you could not afford the consequences?
23. Where does the money for your riskier bets come from? (surplus, savings, debt, none)
24. If money were handled for one year, what would you do? (and have you taken any step toward it)

Question 22 is the soul-principle diagnostic. It is the one the person will remember.

### What v1 deliberately leaves out

- Paid checkout (legal gate)
- AI-written reports (rung 2)
- Accounts and passwords (email link only)
- Expert routing (legal gate)

### Dates (estimates, assuming setup finishes tonight and scheduled runs exist)

| Milestone | Target |
| --- | --- |
| Snapshot live in production | 2026-11-24 |
| Internal legal memo complete | 2026-12-01 |
| Full Assessment built behind the flag | 2026-12-15 |

---

## Part B - System architecture

### Components

| Part | Choice | Why |
| --- | --- | --- |
| App | Next.js, one repo `fppf-web` | Site, snapshot, result pages, API routes in one deploy |
| Hosting | Vercel, one dedicated project | Principal's ruling. Deploys on push to `main`. Preview deploys per branch |
| Database | Postgres (Neon) added through Vercel's integration | Vercel injects the connection string itself. No secret to copy |
| Email | Postmark, one dedicated server | Result email, 90-day re-check, opt-in updates |
| Payments | Stripe, dedicated account | Test mode now. Live checkout stays off behind a flag |
| Analytics and A/B tests | Own `events` table plus cookie-based variant assignment | No extra vendor, no extra secret, full control of kill rules |
| External review | GitHub Action calling OpenAI | Second-model review for the RSI loop |
| Metrics window | GitHub Action, every 6 hours, calls the site's metrics endpoint and commits aggregate numbers to the repo | See "How the GM sees production" |

### How the GM sees production

The GM's workspace can reach GitHub and the public web. It cannot reach Vercel, Postgres, Stripe, Postmark, or OpenAI directly (OpenAI tested 2026-11-17: blocked). So GitHub is the GM's only window:

1. **Deploy:** the GM pushes to the repo. Vercel builds and deploys. Database migrations run in the build step.
2. **Verify:** a GitHub Action hits the live site after each deploy and commits the health result. The GM also reads the public pages directly.
3. **Measure:** the metrics Action commits `metrics/latest.json` with aggregates only (counts, rates, revenue totals). No emails, no individual rows.
4. **Review:** the review Action sends proposed gospel changes to OpenAI and commits the verdict.

The GM never holds a production credential. Every secret lives in Vercel or GitHub, entered by the Principal.

### Data and privacy (floor)

- Stored: email (only if given), stage bands, the Months of No range, variant assignments, anonymous events.
- Not stored: raw answers to Foundation and Freedom questions, balances, account numbers.
- Every email carries a one-click unsubscribe and a one-click delete-my-data link.
- 18 or older confirmed before the snapshot starts.

### Isolation - FPPF is self-contained

**Dedicated to FPPF, shared with nothing:** one repo, one Vercel project, one database, one Postmark server, one Stripe account, one domain, its own API keys with spend caps.

**GM tool rules from 2026-11-17 onward:**
- Used: this project's docs, the `fppf-web` repo, public web search and fetch, the FPPF scheduled task.
- Not used: Google Drive, Slack, Webflow, Linear, the Principal's browser or computer, any other repo. The GM does not list the Principal's repositories. He supplies the exact repo name.
- Issues live in GitHub Issues on `fppf-web`, not Linear.
- Memory notes about other ventures are not opened.

**Already happened, disclosed:** on 2026-11-17 the GM read six skookr gospel documents in Drive at the Principal's direction, to copy the framework's structure. No further access. The FPPF gospel docs still contain a few references to skookr and its seat names. The GM will remove them in the next gospel pass.

### Environments

| Environment | Branch | Stripe | Purpose |
| --- | --- | --- | --- |
| Production | `main` | Live keys, checkout flag off | The public site |
| Preview | any other branch | Test keys | Staging and simulated end-to-end tests |

---

## Part C - Tonight's setup (the Principal's steps)

Estimated total: about 90 minutes. Two items may lag past tonight: Postmark account approval and DNS verification.

### Decisions needed first

1. **Brand and domain.** "FPPF" is a registered trademark of FPPF Chemical Co. (fuel additives, USPTO registration 7373297). Different industry, but they will own the search results and likely the .com. GM recommendation: keep "First Principles Personal Finance" as the framework name and pick a consumer-facing domain. Candidates to check at the registrar: `monthsofno.com`, `firstprinciplespf.com`, `sixfs.com`, `thesixfs.com`. The GM is not a lawyer. The legal memo will cover the mark properly.
2. **Operating entity and mailing address.** The privacy policy and terms need a legal entity. US email law (CAN-SPAM) requires a physical postal address in every marketing email. A PO box or registered-agent address works. The Principal's name does not appear.
3. **Scheduled runs.** Approve the FPPF scheduled task (every 8 hours). Without it, nothing happens unless a chat is opened.

### Accounts and steps

| # | Step | Time | Est. cost |
| --- | --- | --- | --- |
| 1 | Buy the domain | 5 min | About $15 per year |
| 2 | Create private GitHub repo `fppf-web`, give the GM the exact `owner/repo` | 3 min | Free |
| 3 | Create a Vercel project linked to that repo, add the domain | 10 min | Pro plan about $20 per month (the free plan does not allow commercial use) |
| 4 | Add the Neon Postgres integration to the Vercel project | 5 min | Free tier |
| 5 | Postmark: account, one server, verify the sending domain (DNS records) | 20 min | Free up to about 100 emails per month, then about $15 per month |
| 6 | Stripe: dedicated account, copy test and live keys, create the webhook endpoint | 20 min | Fees per charge only |
| 7 | OpenAI: project-scoped key with a $10 monthly cap | 5 min | A few dollars per month |
| 8 | Anthropic: workspace-scoped key with a $20 monthly cap (used only from rung 2) | 5 min | $0 until rung 2 |
| 9 | Enter the variables below | 15 min | |

Projected run cost at launch: about $40 to $55 per month, inside the $100 envelope.

### Variables in Vercel

| Name | Production | Preview | Source |
| --- | --- | --- | --- |
| `DATABASE_URL` | auto | auto | Injected by the Neon integration |
| `POSTMARK_SERVER_TOKEN` | yes | yes | Postmark server, API Tokens |
| `EMAIL_FROM` | yes | yes | Plain value, e.g. `hello@<domain>` |
| `STRIPE_SECRET_KEY` | live key | test key | Stripe, Developers, API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | live key | test key | Same page. Not secret |
| `STRIPE_WEBHOOK_SECRET` | live endpoint | test endpoint | Stripe webhook for `https://<domain>/api/stripe/webhook` |
| `PAID_CHECKOUT_ENABLED` | `false` | `true` | Plain value. The legal gate. Only the Principal flips Production |
| `APP_SECRET` | yes | yes (different) | Run `openssl rand -hex 32`. Signs unsubscribe and delete links |
| `METRICS_TOKEN` | yes | yes | Run `openssl rand -hex 32`. Same value goes in GitHub |
| `ANTHROPIC_API_KEY` | yes | yes | Anthropic console. Unused until rung 2 |
| `NEXT_PUBLIC_SITE_URL` | `https://<domain>` | leave unset | Plain value |
| `LEGAL_ENTITY_NAME`, `LEGAL_POSTAL_ADDRESS` | yes | yes | Plain values from decision 2 |

### Secrets in GitHub (repo, Settings, Secrets and variables, Actions)

| Name | Source |
| --- | --- |
| `OPENAI_API_KEY` | Step 7 |
| `METRICS_TOKEN` | Same value as in Vercel Production |

### Smoke test before the Principal leaves tonight

1. The GM pushes a placeholder page. It appears at the domain.
2. The metrics Action runs and commits a file.
3. The review Action runs and commits an OpenAI verdict on a test diff.
4. One scheduled run fires and completes without needing an approval click.

If any of the four fails, it is fixed tonight, because it cannot be fixed later without the Principal.

---

## Part D - Rulings recorded tonight (to be folded into gospel document 8)

- **2026-11-17, RSI loop agreed.** `claude/FPPF_RSI_Loop.md` is in force, with an external OpenAI review added for changes to decision rights, process gates, or the loop.
- **2026-11-17, gospel authority.** The GM may rewrite its own gospel documents under the RSI loop. The protected core stays with the Principal.
- **2026-11-17, setup window.** The Principal supports setup tonight only. After that the GM has the reins.
- **2026-11-17, isolation.** FPPF is self-contained. The GM does not access other ventures in the portfolio.
- **GM assumption, not a ruling:** "the reins" include setting and testing prices, with the floor and the legal gate unchanged. The Principal can strike this.
