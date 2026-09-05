# Finance Website — Project State

## Last Updated
- Date: 2026-09-05
- Branch: `main`
- Repository state reviewed through commit: `3b4845f9a89c7be8bb8fc9f3eb8eee0dd91f8dde` — "Catch up journal through Week 12 and fix journal markup"

## Project Purpose
An independent student finance research and education project built and maintained by one student (Gian De Gruccio). The website is the publishing and interactive platform for that work: a stock watchlist, a self-built scoring model, a weekly learning journal, write-ups on the model's own behavior, and beginner finance lessons. It is explicitly **not** professional equity research, **not** investment advice, and **not** an academically validated study — a disclaimer the repository repeats in the README, the page footer, and the About section.

## Current Website / Technical Implementation
Verified against `index.html`, `app.js`, `data.js`, and `proxy/worker.js`:

- **15-company watchlist**, split into **10 "Core" and 5 "Growth" companies** (`data.js`: `CORE` and `GROWTH`, combined into `ALL`).
- **Live market data**: front end calls a configurable `API_BASE_URL` (a Cloudflare Worker); if unset or unreachable, the UI shows explicit "unavailable / stale / partial" states rather than inventing data (`app.js` §8, no random-price code anywhere).
- **Five-factor scoring model**, computed client-side from static, hand-assigned factor scores (`data.js` §"Pure scoring math").
- **Model Lab**: live weight sliders, full re-ranking, a two-company comparison highlighting the largest weighted factor gap, Normalize/Reset controls — runs entirely in-browser, stores nothing (`app.js` §15).
- **Learn section**: 5 lessons plus a 5-question practice quiz (`QUIZ`) with instant feedback and retry, no data collected (`app.js` §16).
- **Journal**: weekly first-person entries through **Week 12**, spanning two structurally different eras (see "Weekly Journal Status").
- **Research section**: a "Model Testing Project" (sensitivity analysis) and 4 "Company Research Notes" write-ups (see below).
- **Student Test**: a fully built pre/post testing flow (see its own section) — implemented in code, and dry-run/process testing of it has begun (see "Testing / Impact Status").
- **Daily equal-weight snapshot**: a $10k hypothetical, equal-weight-at-previous-close view, explicitly labeled as *not* a cumulative return tracker.
- **Mobile / accessibility**: skip-to-content link, an ARIA-labeled hamburger menu (closes on Escape/outside-click/selection), visible focus states, a keyboard-operable sortable table with horizontal scrolling, `prefers-reduced-motion` support, and color-independent status indicators.
- **Hosting**: a static HTML/CSS/JS site intended for GitHub Pages, with no build step, no framework, and no custom `.github/workflows` deployment workflow in the repo. The README documents GitHub Pages configured through repository Settings to deploy from branch `main`, folder `/ (root)`; once configured that way, pushes to `main` are picked up by GitHub Pages automatically, without a manual deploy action each time. This document has not independently verified the current Pages settings or live-site reachability.
- **Cloudflare Worker proxy architecture**: `Browser (GitHub Pages) → Cloudflare Worker (holds secret) → Finnhub API`.
- **Security measures implemented** (`proxy/worker.js`): Finnhub key read only from `env.FINNHUB_API_KEY` (a Worker secret, never in repo/browser code); a hard-coded 15-symbol allow-list; a browser-origin allow-list enforced via CORS plus a 403 for disallowed origins; a 45-second edge cache per symbol. The README notes this doesn't fully stop a determined third party from calling the endpoint directly; Cloudflare rate limiting is a possible future addition, not yet implemented.

## Scoring Model
Exactly as defined in `data.js` (`DEFAULT_WEIGHTS`), matching the README:

| Factor | Weight |
|---|---|
| Financial Strength | 25% |
| Growth | 25% |
| Valuation | 20% |
| Risk | 15% |
| Moat | 15% |

Each company's five factor scores (0–100) are author-assigned estimates, not derived from a formula or external data feed. The overall score is a weighted average, rounded to a whole number, mapped to a letter grade (A/B/C/D) and a "model fit" label — **Strong (75+) / Mixed (55–74) / Weak (<55)** — explicitly framed as *not* buy/sell signals.

**Acknowledged limitations:** moat and risk scoring is subjective; a high score doesn't predict short-term price moves, nor does a low score mean a bad company; the model ignores breaking news, earnings surprises, rate changes, and sentiment; and one fixed framework cannot fairly compare a bank, a utility, a software company, and an early-stage growth company. This is a self-built educational heuristic, not an empirical or statistically validated model.

## Research Work Currently Present
- **Company research reports present (4 of 15):** MSFT, NVDA, KO, SMCI — each with a business case, risks, and a personal reflection, plus beta/P/E/score/sector and a "Stats last reviewed: June 2026" date. **JPM and IONQ reports are explicitly marked as not yet written.**
- **Sensitivity analysis:** five hand-computed weighting scenarios (Base, Equal-Weight, Growth-Heavy, Value-Heavy, Defensive/Risk-Aware) applied to the same 15 companies' existing factor scores, with top-5 rank tables and written observations — a static, author-computed exploration, separate from and simpler than the live Model Lab.
- **Case studies:** three comparative write-ups (MSFT vs. NVDA, KO vs. SMCI, JPM vs. IonQ).
- **Stated limitations:** only 5 preset scenarios were tested, not an exhaustive search; the 15 companies were hand-picked, not randomly sampled; underlying factor scores remain subjective and unvalidated by this analysis; there is **no backtesting, no DCF, no comparable-company analysis, and no statistical risk model** anywhere in the project.
- The Research page states plainly: **"I have not yet received outside feedback on this project."**

## Weekly Journal Status
- Highest entry currently committed: **Week 12** (September 2026). Range: **Week 1 (June 2026) – Week 12 (September 2026)**.
- **The 12 entries are not uniform in format.** Weeks 8–12 share a common structure: a market-performance badge (a ticker or index one-day move) and four fixed subsections — "What happened," "Why investors reacted this way," "What I keep thinking about," "Next question."
- Weeks 1–7 use earlier, more varied formats: Weeks 2–4 use a "Portfolio movement / Biggest surprise / Concept I learned (or am thinking about) / Next question" structure with dollar-based portfolio badges (e.g. "+$28.65 (+0.29%)"); Weeks 5–7 use project-development narratives with differently-labeled subsections and non-market badges such as "Version 2 Launch," "Risk Tiers Added," and "Research Project Added"; Week 1 is free-form prose with no subsection labels, badged "Starting point."
- This document does not reproduce journal text; see `index.html`'s Journal section directly.

## Student Testing System — Implemented
Verified in `app.js` §17, `index.html`'s Student Test section, and `TESTING-METHODOLOGY.md`. The flow is a single self-contained page — the tester never navigates to the real Learn or Model Lab pages, closing an answer-leakage risk since the real Learn page's practice quiz reuses one of the two question sets:

1. **Blind pre-test** (5 questions) — no correctness marks or explanations shown; locks after submission.
2. **Five lessons rendered inline**, from the same `LESSONS` data as the real Learn page.
3. **A directed mini Model Lab interaction** — one Valuation-weight slider (default 20, instructed to set to 90) over a curated 7-company subset, self-contained and separate from the real Model Lab.
4. **Alternate post-test** (5 different questions, same 5 concepts) — reveals answers/explanations once submitted; unlocks only after the pre-test.
5. **Anonymous feedback via a Google Form** (link configured in `data.js`, not reproduced here) — pre-test score, post-test score, elapsed seconds, quiz order, and a 5-item correctness vector per quiz are computed in-browser and pre-filled, editable, and only sent if the tester submits.
- **A/B counterbalancing**: a `?order=a` / `?order=b` URL parameter (random 50/50 fallback) controls which of two equivalent-concept question sets (`QUIZ`, `QUIZ2`) is pre- vs. post-test.
- **Stated completion time:** about 6–8 minutes, consistent across `TESTING-METHODOLOGY.md`, the Student Test page, and the homepage CTA.

## Testing / Impact Status

### Completed / Implemented
- The full technical testing flow above is built, wired up, and functional.
- `TESTING-METHODOLOGY.md` is a pre-specified testing methodology documented before the formal pilot: testing question, dry-run plan, formal-pilot plan, counterbalancing rationale, scoring/feedback fields, and limitations.
- **Technical/process testing has begun.** As of 2026-09-05, the project owner reports that three Google Form responses exist. At least one is believed to be from an external dry-run tester, but the exact split between technical/self-testing and external-tester responses has not yet been reconciled. Do not treat all three responses as external testers. Technical testing of both A/B ordering paths has also occurred.
- These three responses are **technical/process/dry-run activity only** — not formal-pilot data, and not evidence of learning gains or educational impact.

### Planned / Not Yet Completed
- Reconciling which of the three existing responses are technical/self-tests versus genuine external dry-run testers.
- Completing the planned dry run (target 3–5 testers) and revising the flow based on it.
- **No formal pilot has occurred.** The About page states directly: *"No formal student pilot has happened yet."*
- **No outside/expert review has occurred** — an educator/finance-professional review of the model and quiz balance remains a future step.
- **No dry-run or formal-pilot results have been formally analyzed or published as findings.**

## Privacy and Security
- **API-key handling:** the Finnhub key exists only as a Cloudflare Worker secret (`env.FINNHUB_API_KEY`), never in the repository or browser-delivered JavaScript; `.dev.vars` is git-ignored.
- **Cloudflare Worker proxy:** all live-price requests pass through `proxy/worker.js`, which validates method, symbol, and origin before calling Finnhub.
- **Ticker allow-list:** exactly the 15 watchlist symbols.
- **Origin controls:** only a fixed allow-list of origins (the live GitHub Pages origin plus local-dev origins) can call the proxy from a browser; others get a 403. Non-browser requests with no Origin header (e.g. `curl`) are allowed through by design, for manual testing.
- **What the site stores:** nothing server-side. Client-side, the only `localStorage` value is a dark/light theme preference. The Learn quiz, Model Lab, and Student Test run in-memory only; a reload clears all test progress by design.
- **Testing privacy:** the Google Form collects no name, email, or identifying information; auto-filled fields are computed client-side and only leave the browser if the tester submits.
- No analytics or trackers exist anywhere in the codebase.

## Known Limitations / Credibility Issues
- Factor scoring (especially Moat and Risk) is subjective, author-assigned, and not from a standardized data source.
- Cross-sector comparison is a real, acknowledged weakness — one fixed framework scores a bank, several tech companies, a utility, and early-stage growth names alike.
- No DCF, comparable-company analysis, backtesting, or statistical risk modeling exists anywhere; the sensitivity analysis tests the model's own behavior, not whether it is "right."
- The four published research reports carry a "Stats last reviewed: June 2026" date, now several months old; the other 11 companies' fundamentals carry no per-entry review date at all.
- The testing methodology's own author acknowledges a conflict of interest (same person wrote and will grade the quizzes) and a possible difficulty mismatch between the two quiz sets — the reason counterbalancing and outside review are planned.
- **Testing activity remains minimal and unreconciled** (see Testing / Impact Status above) — no dry run or formal pilot has been completed, and no learning-gain or impact conclusion can be drawn yet.
- No outside/expert review of the model or quizzes has occurred, despite being a stated near-term priority in the README, About page, and Research page.
- **Documentation drift:** the About page's "Testing and Impact" outline and the README roadmap both still describe an older, simpler testing plan (e.g. "guided use of the Learn and Model Lab sections") rather than the more specific flow actually built in `TESTING-METHODOLOGY.md` — self-contained inline lessons, a separate mini Model Lab, the dry-run/formal-pilot split, and A/B counterbalancing.
- The public Worker endpoint can technically still be reached by a client that spoofs an allowed-origin header; the README states this openly rather than overclaiming the origin check as a full security boundary.

## Current Strategic Priorities
1. **Credibility/current-data audit** — refresh "last reviewed" fundamentals across all 15 companies, not only the 4 published research write-ups.
2. **Reconcile the three existing form responses** and complete the planned dry run (3–5 testers), as process feedback only, not impact evidence.
3. **Revise the test flow and questions** based on genuine dry-run feedback.
4. **Pursue the already-planned outside educator/finance-professional review** of the model's assumptions and the two quiz sets' difficulty balance.
5. **Only after 1–4, run the formal pilot** (target 15–30 students) and begin reporting real results, per the honesty commitments in `TESTING-METHODOLOGY.md`.
6. Add the two remaining planned research reports (JPM, IONQ) — lower priority than the work above.

## Planned / Not Yet Completed
Collected here so these are never mistaken for accomplishments:
- Reconciling response provenance for the three existing form submissions.
- JPM and IONQ company research reports.
- Outside educator/finance-professional review of the model and the two quiz sets.
- Completing the planned dry run (3–5 testers) and the formal student pilot (target 15–30 testers), plus any resulting published results.
- A genuine cumulative portfolio tracker with a fixed start date and real historical prices, if reliable historical data can be found.
- Cloudflare rate limiting on the price proxy, "if traffic becomes a problem."
- Updating the About page / README's testing description to match `TESTING-METHODOLOGY.md`.

## Claim Guardrails
- **Scoring model:** May be described as a self-built, transparent, weighted five-factor educational model with explicitly stated weights. May **not** be described as empirically validated, backtested, or professionally reviewed.
- **Company research:** May be described as student-authored qualitative write-ups covering 4 of 15 watchlist companies. May **not** be described as professional equity research or full-watchlist coverage.
- **Sensitivity analysis:** May be described as a hand-computed exploration of 5 preset weighting scenarios. May **not** be described as a statistical robustness test, a backtest, or evidence the model "works."
- **Testing:** May be described as a fully built testing flow with a pre-specified methodology documented before the formal pilot. Technical/process testing has begun — three form responses exist, with provenance not yet reconciled (see Testing / Impact Status). Dry-run responses may be inspected and discussed internally for process problems (bugs, confusing questions, timing, usability), but specific dry-run scores or feedback must **not** be presented publicly as evidence the site improves learning or has educational impact. The formal pilot remains the first round intended for actual learning/feedback analysis, still subject to the methodology's sample-size and design limitations.
- **Educational impact:** May **not** be claimed. Only a small number of unreconciled dry-run responses exist for process checking; no learning-gain data has been analyzed.
- **Outside validation:** May **not** be claimed; no professor, educator, or professional review has occurred.

## Source-of-Truth Note
For **current implementation/code state**: (1) the live repository — highest authority, (2) this `PROJECT-STATE.md`, (3) other current, verifiable evidence (e.g. a fresh site inspection), (4) older conversations or planning documents, lowest priority.

**Off-repository activity is different.** For testing, outreach, expert feedback, competition activity, or other real-world actions, newer verified evidence directly from the project owner may be more current than stale repository wording that hasn't caught up yet. When that happens, flag the discrepancy and update this file (and the site) — do not treat stale wording as proof an activity did not occur.

**Completed and planned/not-yet-completed must stay strictly separated**: newer evidence can move an item from "planned" to "completed" only once actually confirmed, never by inference. If this file ever conflicts with the repository on implementation/code state, the repository wins and this file should be corrected.
