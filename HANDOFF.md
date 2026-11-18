# Handoff to Claude Code - 2026-11-17

You are picking up the launch of First Principles Personal Finance from a cloud session that could not push to GitHub. Andy (the owner) is with you tonight only. Read `CLAUDE.md` first. Work through this list in order and confirm each step with what you verified.

## State
- This folder is the complete, tested app (12 scoring tests pass, production build passes, full flow checked in a phone-sized browser). It has not been deployed.
- Domain bought: `firstprinciplesmoney.com`.
- GitHub repo: `andychesnut/fppf-web` (private). It currently holds WRONG content, pushed by accident from an unrelated repository on Andy's Mac.
- Vercel project `fppf-web` exists and is linked to that repo. A wrong production deployment may still be live.

## 1. Safety first: Andy's home folder repository
- Andy's home folder (`~`) sits inside a git repository that is NOT this project. On 2026-11-17 its `origin` was accidentally changed to the fppf-web URL, and its `main` was pushed there.
- Never run a git write command from `~`. Work only inside this project folder.
- Restore that repository's original remote. Look only at git metadata, not its files: `git -C ~ remote -v`, and `cat ~/.git/FETCH_HEAD` (or the git dir shown by `git -C ~ rev-parse --git-dir`) to find the original address. Show Andy what you found and get his yes before running `git -C ~ remote set-url origin <original>`.
- That repository belongs to other work. Do not read, list, or copy its contents. This product is self-contained.

## 2. Put the real app in the repo
From inside this project folder only:
1. `npm install`, then `npm test` and `npm run build`. Both must pass.
2. `git init -b main` (if there is no `.git` here), commit everything, set `origin` to `https://github.com/andychesnut/fppf-web.git`.
3. `git push --force origin main`. This replaces the wrong content. Andy has approved this overwrite.
4. Confirm on GitHub that the repo now shows `app/`, `lib/`, `components/`.

## 3. Vercel (Andy clicks, you guide)
1. Deployments: delete the wrong deployment (the one from before your push).
2. Settings, Build and Deployment: Framework Preset = Next.js.
3. Storage: add the Neon Postgres integration.
4. Environment variables, Production and Preview: `NEXT_PUBLIC_SITE_URL=https://firstprinciplesmoney.com` (Production only), `LEGAL_ENTITY_NAME`, `LEGAL_POSTAL_ADDRESS`, `PAID_CHECKOUT_ENABLED=false`, `APP_SECRET` and `METRICS_TOKEN` (each `openssl rand -hex 32`). Later tonight if time allows: `POSTMARK_SERVER_TOKEN`, `EMAIL_FROM`, Stripe keys, `ANTHROPIC_API_KEY`.
5. Domains: attach `firstprinciplesmoney.com`.
6. Redeploy, then open `https://firstprinciplesmoney.com/api/health`. Expect `"ok":true,"db":true`.
7. Walk the snapshot once on a phone and save an email. Confirm the save succeeds.

## 4. GitHub
1. Repo secrets (Settings, Secrets and variables, Actions): `METRICS_TOKEN` (same value as Vercel), `OPENAI_API_KEY` (project key with a low monthly cap).
2. Run the "Metrics snapshot" workflow by hand. Confirm an `ops-data` branch appears with `metrics/latest.json`.
3. Run "External review" by hand. Confirm a verdict file appears on `ops-data`. If the model name is rejected, set a repo variable `OPENAI_MODEL` to a current model.
4. Give the Claude GitHub app access to this one repo only (`github.com/settings/installations`), so scheduled cloud runs can push.

## 5. Record
Update `claude/run_log.md` in the Claude Project "FP$PF" with: repo recorded, what is live, what was verified, what is still open. If you cannot reach the project, write the same notes to `docs/run-notes.md` here and tell Andy.

## Rules that do not bend
- Education and self-assessment only. No paid checkout until the legal memo is complete and Andy sets `PAID_CHECKOUT_ENABLED=true`.
- You never see or store a secret value. Andy types them into Vercel and GitHub.
- No other repositories, no other ventures.
- No em-dashes in anything you write.
