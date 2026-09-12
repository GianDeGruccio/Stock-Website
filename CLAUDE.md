# CLAUDE.md

Guidance for Claude Code sessions in this repo. This is a solo student's finance-education website (vanilla HTML/CSS/JS + a Cloudflare Worker proxy) — not a company research product, not investment advice, not an academically validated study.

## Source of truth
- `PROJECT-STATE.md` is the canonical high-level snapshot of what's built vs. planned. Read it first.
- For current implementation/code state, the live repository always wins if it conflicts with `PROJECT-STATE.md` or any other doc — verify against `index.html`, `app.js`, `data.js`, `proxy/worker.js` before relying on a doc's description.
- For off-repository facts (testers, outreach, expert feedback, competitions, real-world impact), the repo is not authoritative either way: absence from the repo does not mean it didn't happen. Rely only on explicit current evidence the project owner gives you in conversation, and flag it clearly as unconfirmed if no such evidence exists — don't assume "not in the repo" means "didn't happen."
- If you find drift between docs and code, flag it and update `PROJECT-STATE.md` rather than trusting the stale doc.

## Completed vs. planned
- Keep these strictly separate in anything you write or claim. Never infer "done" from a plan, a TODO, or an intention — only from verified evidence (repo code/config for implementation state; explicit owner-supplied evidence for off-repository activity).
- See `PROJECT-STATE.md`'s "Testing / Impact Status" and "Planned / Not Yet Completed" sections for the current split; update them when a real, verified change moves an item across that line.

## Claims policy (read before touching testing/impact language)
- Do not claim educational impact, learning gains, user counts, traffic, or "results" anywhere (code, comments, commit messages, docs) unless there's verifiable evidence for it.
- Technical/dry-run/process testing (bug-catching, timing checks, A/B plumbing checks) is not evidence of educational impact — don't let wording imply otherwise.
- Expert critique or review is commentary, not validation — don't convert it into claims that the scoring model was validated, endorsed, or proven. If there is verified evidence an expert actually reviewed the project, plain factual wording ("reviewed by [role/person]") is fine — just don't upgrade "reviewed" into "validated" or "endorsed."
- When in doubt, match the hedged, honest tone already in `README.md`, `TESTING-METHODOLOGY.md`, and the site's own About/Research copy.

## Voice
- This is a student's first-person, honest-about-limitations project. Preserve that voice in journal entries, research write-ups, and UI copy — don't make it sound more polished/corporate or more confident than the underlying work supports.

## Scope discipline
- Prefer substantive finance/methodology fixes (scoring logic, data accuracy, testing methodology, accessibility, bugs) over cosmetic or novelty features.
- Don't redesign pages, restructure navigation, or expand scope beyond what's asked. Make the smallest change that accomplishes the requested task.
- Preserve the vanilla HTML/CSS/JS architecture (no framework/build step) unless a change specifically requires and justifies otherwise.

## Before/after making changes
- Before any non-trivial edit, read the actual current implementation (don't guess from memory or from `PROJECT-STATE.md` alone).
- After edits: run whatever checks exist for the change, and use browser verification for anything touching UI/behavior (open the page, exercise the affected flow).
- If a completed change makes `PROJECT-STATE.md` stale in a meaningful way, update it as part of the same change.

## Do not touch without explicit instruction
- Secrets, Cloudflare Worker config, Finnhub API integration, deployment/hosting setup, or the proxy's security controls (origin allow-list, symbol allow-list, caching).
- Git identity/config, or anything under `.git/`.
- Never print, log, request, or hardcode API keys or other secrets.

## Git discipline
- Don't commit unless explicitly asked to.
- Don't push, force-push, merge, or publish anything unless explicitly instructed.
- Avoid destructive git operations (reset --hard, force-push, history rewrites) — ask first if one seems necessary.
