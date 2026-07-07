# Student Finance Research Project

A finance-learning website I built to practice analyzing companies: a 15-company
watchlist, a transparent five-factor scoring model, an interactive **Model Lab**
for experimenting with that model, and a short **Learn** section with a practice
quiz. Live prices are fetched through a small server-side proxy so no API key is
exposed.

**Educational project — not financial advice.** Nothing here is a recommendation
to buy or sell any security.

Built and maintained by **Gian De Gruccio**, a student interested in finance,
economics, applied mathematics, and web development.

---

## Live site

- Live site link: https://giandegruccio.github.io/Stock-Website/

---

## Purpose

The goal is twofold:

1. **Document my own learning** — my watchlist, my scoring model, weekly journal
   reflections, and research write-ups.
2. **Be useful to other beginners** — the Learn section and the Model Lab are
   meant to help someone new to investing understand a few core ideas and see
   how a scoring model actually behaves.

## Why I built it

I started out thinking finance was mostly about picking the "right" stock. The
more I dug in, the more it became about building a *system*: comparing business
quality, valuation, risk, and growth in a consistent way, and being honest about
what a simple model can and cannot tell you. This site is where I keep that work
organized and keep iterating on it.

## Features

- **Watchlist** — 10 established companies and 5 higher-risk growth companies,
  each with a short thesis, approximate fundamentals, a model grade, and a live
  price with an honest one-day change indicator.
- **Scoring Model** — a weighted five-factor model, a full explanation of how
  each factor score is assigned, scoring bands, and clearly stated limitations.
- **Model Lab** — adjust the factor weights and watch all 15 companies re-rank
  live; compare two companies side by side and see which factor drives the
  difference. Runs entirely in the browser.
- **Learn** — five short beginner lessons, each tied to a company on the site,
  plus a five-question practice quiz with instant feedback.
- **Journal** — weekly reflections (Weeks 1–4).
- **Research** — deeper write-ups for MSFT, NVDA, KO, and SMCI.
- **About** — selection criteria, a project revision log, and a testing/impact
  plan.
- Dark/light theme, filters, a sortable score table, and a responsive mobile
  menu.

## Scoring-model summary

Each company is scored 0–100 as a weighted average of five factors:

| Factor | Default weight |
| --- | --- |
| Financial Strength | 25% |
| Growth | 25% |
| Valuation | 20% |
| Risk | 15% |
| Moat | 15% |

Score labels (model fit only, **not** buy/sell calls): **Strong** (75+),
**Mixed** (55–74), **Weak** (below 55). The Scoring Model page explains what each
factor means, which indicators I consider, and roughly how I split high/medium/low
scores. Because scores are a weighted average, they stay on a 0–100 scale even if
weights don't total 100% — only the *relative* sizes of the weights matter.

## Model limitations

- Some factors (especially moat and risk) are subjective.
- A high score does not predict short-term price movement, and a low score does
  not mean a company is bad.
- The model does not capture breaking news, earnings surprises, rate changes, or
  sentiment shifts.
- One model cannot fairly treat a bank, a software company, a utility, a consumer
  brand, and an early-stage tech company the same way. It is a starting
  framework, not a universal valuation system.

## Data architecture

- **Front end**: static HTML/CSS/JavaScript hosted on GitHub Pages.
- **Live prices**: the front end calls a small **Cloudflare Worker** proxy at a
  configurable `API_BASE_URL`. The Worker holds the Finnhub API key as a secret
  (an environment variable), validates the ticker against an allow-list, caches
  each symbol briefly, and returns clean JSON. **The API key is never in the
  public repository or in browser JavaScript.**
- If the proxy isn't configured or is unreachable, the site degrades gracefully:
  it shows clear "unavailable" / "stale" states instead of inventing prices.
- The proxy hides the Finnhub key, but any public website endpoint can still be
  called by determined third parties. The exact-origin check, 15-symbol allow-list,
  and short cache reduce casual misuse; Cloudflare rate limiting can be added later
  if traffic becomes a problem.

```
Browser (GitHub Pages)  ->  Cloudflare Worker (holds secret)  ->  Finnhub API
```

## Daily equal-weight snapshot (please read)

The "Daily Equal-Weight Portfolio Snapshot" assumes an equal-weight purchase at
the **previous market close** and shows how that hypothetical $10k portfolio has
moved **today**. It is **not** a cumulative tracker and does not measure return
since the project began. A true cumulative tracker would require fixed purchase
dates, real starting prices, and consistent historical data; that is planned for
a future version and intentionally not faked here.

## Model Lab

The Model Lab lets anyone change the five weights and instantly see:

- the total weight (with a warning when it isn't 100%),
- an optional **Normalize** action (only when you choose it),
- a **Reset** to my default weights,
- a live re-ranking of all 15 companies (original vs. adjusted score, plus rank
  movement),
- a two-company comparison that highlights the factor causing the biggest
  weighted difference.

It uses the existing company factor scores as inputs and stores nothing.

## Learn / quiz

Five lessons — Market Capitalization; Beta and What It Does Not Measure; P/E Ratio
and Valuation; Diversification; Good Company vs. Good Price — each with a plain
definition, an example, a common misunderstanding, and a link to a company on the
site. The five-question quiz gives instant feedback and explanations and can be
retried. It collects no names, emails, or personal data; answers stay in the
browser session only.

## Technology stack

- HTML, CSS, and vanilla JavaScript (no front-end framework).
- Google Fonts (DM Serif Display, Inter, JetBrains Mono).
- Finnhub API for live quotes.
- Cloudflare Workers for the serverless proxy.
- GitHub Pages for hosting.

## Mobile and accessibility work

- Responsive layout down to ~320px with a keyboard-accessible hamburger menu
  (ARIA labels, `aria-expanded`, closes on Escape / outside click / selection).
- Visible keyboard focus styles, semantic landmarks, and a skip-to-content link.
- Sortable score table is keyboard operable; tables scroll horizontally instead
  of overflowing the page.
- Information is never conveyed by color alone (grades, signs, and arrows carry
  meaning too).
- `prefers-reduced-motion` disables animations.
- Clear loading, error, stale, and unavailable states for live data.

## Project structure

```
.
├── index.html            # Page structure and content
├── styles.css            # All styling
├── data.js               # Company data, scoring math, lesson/quiz content
├── app.js                # All interactive behavior
├── README.md
├── .gitignore
└── proxy/                # The serverless price proxy (deployed separately)
    ├── worker.js
    ├── wrangler.toml
    ├── package.json
    ├── .dev.vars.example
    └── .gitignore
```

## Local development

You only need a static file server for the site itself.

```bash
# From the project root:
python3 -m http.server 8000
# then open http://localhost:8000
```

Editing content: company data and lesson/quiz text live in `data.js`; behavior is
in `app.js`; styling is in `styles.css`.

To test with live prices locally, run the proxy in another terminal (next
section) and set `API_BASE_URL` in `app.js` to the local Worker URL that
`wrangler dev` prints (e.g. `http://localhost:8787`). Add that origin to
`ALLOWED_ORIGINS` in `proxy/worker.js` if needed.

## Serverless proxy setup (Cloudflare Worker)

You need a free [Cloudflare](https://dash.cloudflare.com/sign-up) account and a
free [Finnhub](https://finnhub.io) API key. [Node.js](https://nodejs.org) is
required to run `wrangler`.

```bash
cd proxy

# 1. Log in to Cloudflare (opens a browser once).
npx wrangler login

# 2. Store your Finnhub key as a secret (you'll be prompted to paste it).
npx wrangler secret put FINNHUB_API_KEY

# 3. (Optional) Run locally first:
cp .dev.vars.example .dev.vars     # then paste your key into .dev.vars
npx wrangler dev                   # serves e.g. http://localhost:8787

# 4. Deploy.
npx wrangler deploy
```

After `deploy`, wrangler prints your Worker URL, e.g.
`https://finance-quote-proxy.<your-subdomain>.workers.dev`.

Then:

1. Open `proxy/worker.js` and add your GitHub Pages origin to `ALLOWED_ORIGINS`
   (`https://giandegruccio.github.io` is already configured), then run `npx wrangler deploy` again after any Worker changes.
2. Open `app.js` and set:
   ```js
   const API_BASE_URL = 'https://finance-quote-proxy.<your-subdomain>.workers.dev';
   ```
3. Commit and push (see below). Prices will now load on the live site.

Quick test in a browser or terminal:
```
curl -H "Origin: https://giandegruccio.github.io" "https://finance-quote-proxy.<your-subdomain>.workers.dev/quote?symbol=AAPL"
```

## Deployment (GitHub Pages)

1. Push this repository to GitHub (see the commands below).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait a minute, then visit https://giandegruccio.github.io/Stock-Website/.

The `proxy/` folder is source code for the Worker and is deployed to Cloudflare separately. Its source may remain publicly visible in the GitHub repository, which is fine because no API secret is stored in it.

## Committing and pushing

Your repository and remote already exist, so do **not** run `git init` or add a new origin. After previewing and testing the files in Codespaces, use:

```bash
git add .
git commit -m "Upgrade finance site with Model Lab, Learn section, and secure price proxy"
git push
```

For later updates:
```bash
git add .
git commit -m "Describe your change"
git push
```

## Data-source statement

Live prices come from the Finnhub API (via the proxy). Company and fundamental
figures are approximate reference values checked against public sources such as
Yahoo Finance, company investor-relations pages, SEC filings, and market-data
sites. These figures can change over time. Journal reflections are based on daily
snapshots and my own notes.

## AI-assistance disclosure

This site was built as a student coding and finance project using HTML, CSS,
JavaScript, GitHub Pages, and AI coding assistance, with the final content
reviewed and edited by me.

## Roadmap

- Add JPM and IONQ research reports.
- Ask an educator or finance professional to review the model's assumptions,
  especially cross-sector scoring, and document any resulting changes.
- Run a small, supervised student learning session and use anonymous feedback to
  improve the explanations and tools.
- Explore a genuine cumulative tracker with a fixed, visible start date and real
  historical prices (only if reliable historical data is available).

## Privacy

The site collects no personal information. The Learn quiz and the Model Lab run
entirely in your browser and store nothing. The only thing saved locally is your
dark/light theme preference, which is not personal information. No analytics or
trackers are included.

## Disclaimer

This is an educational project, not financial advice, and not professional
research. Nothing here is a recommendation to buy or sell any security. All
analysis reflects my own learning process and may contain mistakes.
