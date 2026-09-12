# Scoring Methodology v2

**Status:** Pre-registered rulebook. No company has been scored under v2 as of this
version.

**Version:** 2.0

---

## 1. Purpose and scope

This document is the complete rulebook for how I score companies on this site under
version 2 of my scoring model. I am a high-school student running this project on my
own, and the point of writing this down is simple: I want the scores to come from
rules I committed to in advance, not from decisions I made after I already knew what
answer I wanted.

Version 1 of the model was transparent about its five factors and their weights, but
the underlying 0–100 factor scores were my own overall impressions. Someone reading
the site could see *what* I was weighing, but not *how* I got from a company's
filings to a number. That is the specific weakness v2 exists to fix.

The v2 approach is to break each factor into a small number of named slots, define
exactly what goes in each slot, and score each slot into one of five bands using
rules written before scoring. Where a slot is a number from a financial statement,
the rule is a formula and a threshold. Where a slot is a judgment — most obviously
Moat — I do not pretend a formula exists. Instead I require the judgment to be
written out with evidence, counter-evidence, and a statement of what would prove it
wrong.

**Scope.** This methodology covers how companies on my watchlist are scored. It does
not cover the site's live price display, the Model Lab weight sliders, the Learn
section, or the student testing process, all of which are documented elsewhere.

**What "auditable" means here.** It means someone else could take this document, my
recorded inputs, and the public filings, and check whether I applied my own rules
correctly. It does **not** mean someone else would get the same scores from scratch —
they would have to use my thresholds, and my thresholds are my own choices.

---

## 2. What this model does not claim

I want this section near the top rather than buried at the bottom.

- **It is not investment advice.** Nothing on this site is a recommendation to buy or sell anything.
- **It is not empirically validated.** I have not tested whether high scores predict returns. There is no backtest anywhere in this project. A backtest built by the same person who chose the thresholds would mostly test my hindsight, not the model.
- **It is not a professional valuation model.** There is no discounted cash flow analysis, no formal comparable-company work, and no statistical risk modeling.
- **It has not been reviewed by an expert.** Outside review of this methodology is something I want and have not yet obtained. If and when it happens, it will be documented as criticism received, not as endorsement.
- **The thresholds are mine.** Most of the specific numbers in this document — where one band ends and the next begins — are reasonable lines I drew. They are not industry standards, and this document labels which is which throughout.
- **The band-to-number mapping is arbitrary.** See Section 4.
- **Scores are relative to this model only.** A "Strong Model Fit" label means a company fits what this model rewards. It does not mean the company is a good business or a good investment, and a low score does not mean the opposite.
- **Coverage is limited.** I score a small hand-picked watchlist. Nothing here generalizes to the market.
- **Some things are invisible to this model.** Management quality, breaking news, earnings surprises, interest-rate moves, sentiment, and anything that happened after the scoring round's as-of date are all outside it.

---

## 3. Factors and weights

The five top-level factors and their weights are frozen for v2. Changing them
requires a new version (Section 18).

| Factor Weight The question it asks  |     |                                                                                              |
| ----------------------------------- | --- | -------------------------------------------------------------------------------------------- |
| Financial Strength                  | 25% | Can the company fund itself and absorb a bad year?                                           |
| Growth                              | 25% | Is the business getting bigger, and is there room left to grow?                              |
| Valuation                           | 20% | What am I being asked to pay relative to an outside reference and to the company's own past? |
| Stability                           | 15% | What could disrupt this outside of the financial statements?                                 |
| Moat                                | 15% | Can competitors take this business or compete the profits away?                              |

**How a composite is calculated.**

1. Each applicable slot is assigned a band from 1 to 5.
2. Each band converts to a number (Section 4).
3. A factor's score is the plain average of its **scored** slots. Remaining applicable scored slots are weighted equally within the factor; slots that are `N/A — structural` or `unobserved` are simply left out of the average.
4. The composite is the weighted average of the five factor scores at 25/25/20/15/15.

Because a factor's score is an average of its scored slots, dropping a slot changes
how much the surviving slots matter inside that factor. That is a real consequence and
I am stating it plainly rather than hiding it: for a bank, where Cash Generation is
structurally not applicable, Profitability and Balance-Sheet Capacity each carry half
of Financial Strength instead of a third.

**Tie rule.** Composite differences of fewer than 5 points are reported as ties, not
as a rank order. The inputs are not precise enough to support a one-point distinction.

---

## 4. The five bands and the 10/30/50/70/90 mapping

Every slot resolves to one of five bands. Higher is always more favorable to the
company.

| Band Value Rough meaning  |    |                                      |
| ------------------------- | -- | ------------------------------------ |
| 5                         | 90 | Clearly strong on this specific slot |
| 4                         | 70 | Above average                        |
| 3                         | 50 | Middle / mixed                       |
| 2                         | 30 | Below average                        |
| 1                         | 10 | Clearly weak on this specific slot   |

**This mapping is a project-authored convention.** It is not a measurement of
anything. I chose evenly spaced values because the bands are ordinal — band 4 is
better than band 3, but I have no basis for saying it is better by any particular
amount — and even spacing is the assumption that adds the least invented information.

I deliberately did not use 0 and 100 as endpoints. **90 does not mean perfect, and 10
does not mean worthless.** A band-5 slot means the company landed in my top bucket on
one narrow measure, nothing more. A band-1 slot means it landed in my bottom bucket on
that same narrow measure.

---

## 5. Profiles

One set of rules cannot fairly score a bank, a utility, and a software company. v2
handles this with three profiles. Each profile changes *which metric fills a slot*,
never which slots or weights exist.

**No rule in this methodology may reference a specific company or ticker.** Profile
assignment is determined by what the company reports about itself.

### Assignment tests, applied in this order

1. **Regulated Banking** — the company reports regulatory capital ratios (CET1 or an equivalent) under banking capital rules in its annual report.
2. **Rate-Regulated** — more than 50% of revenue comes from operations accounted for under ASC 980, *Regulated Operations*, identifiable by regulatory assets and regulatory liabilities on the balance sheet.
3. **Standard** — everything else.

Both specific tests key off an accounting or regulatory status the company discloses,
so assignment does not depend on my opinion about what kind of business something is.
ASC 980 and bank capital reporting are external accounting and regulatory
requirements; the 50% threshold and the order of the tests are my choices.

### Partial profile fit

Real companies do not sort cleanly. A conglomerate with a large insurance arm, a
retailer with a consumer-lending business, or a utility holding company with a big
unregulated segment all fail to fit any profile perfectly.

The rule is: **the company keeps whichever profile the tests assign, and carries a
visible** **`profile-fit: partial`** **flag** naming the specific slots the mismatch distorts.

I do **not** write custom rules for individual companies. Doing that would mean the
methodology is really fifteen methodologies, and any comparison between companies
would be meaningless. A partial-fit flag is an honest disclosure that the score is
less comparable than it looks. Accepting a slightly worse score with a flag is better
than engineering a special case.

A partial-fit flag is required when either specific test is met for a share of the
business between 20% and 50%, where that share can be established from the company's
own disclosure, or when the company clearly is not a standard operating company but
fails both specific tests.

If the share cannot be established from disclosure, I do not invent an estimate in
order to decide whether the flag applies. I record that the share is not disclosed, and
apply the flag only on the second ground above if it fits.

---

## 6. Missing-data states

Every slot for every company resolves to exactly one of three states. Keeping these
separate is one of the main improvements in v2.

| State Meaning Effect  |                                                                  |                                            |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| `scored`              | A band was assigned under the rules                              | Counts in the factor average               |
| `N/A — structural`    | The metric genuinely does not apply to this kind of business     | Removed from the factor's applicable slots |
| `unobserved`          | The metric applies, but I could not establish it from my sources | Counts against coverage (Section 7)        |

Three rules govern these:

**Bad results are not missing data.** A negative operating margin, negative free cash
flow, or negative CFO is an *observed* result and is scored in the bottom band. It
must never be recorded as `unobserved`. This is the single easiest way for a scoring
model to quietly flatter unprofitable companies, and I am closing it explicitly.

**`unobserved`** **requires a documented attempt.** Every `unobserved` cell must record
which source I checked and on what date. Otherwise "unobserved" just means "I didn't
look," and it would conveniently protect companies whose weak slot was inconvenient.

**Absence of a disclosure is not automatically good news.** The only place where
absence of disclosure is scored favorably is the customer-concentration dimension,
where ASC 280 requires disclosure above a 10% threshold, so silence carries real
information. Missing product-line detail is `unobserved`, never evidence of
diversification.

**Qualitative slots can be** **`unobserved`****, but only for a specific reason.** A
qualitative slot — Moat, Growth-Driver Durability, Regulatory/Legal Exposure,
Reporting/Governance Integrity — is `scored` when the required source review in
Section 14 has been completed and there is enough evidence to apply one of the
anchors. If that review cannot be completed, or the evidence is genuinely
insufficient to place the company at any anchor, the slot is `unobserved`.

The line that matters: **weak evidence and negative evidence are still scored
normally.** "I looked and found no identified moat mechanism" is band 1, not
`unobserved`. "I looked and the evidence is thin and indirect" is band 3, not
`unobserved`. `unobserved` means I could not do the review or could not find enough
to place the company anywhere — it must never become a way to avoid assigning a low
band. Like any other `unobserved` cell, it records which sources were checked and on
what date, and it counts against coverage.

---

## 7. Coverage rules

**Factor rule.** A factor is scored only if at least two-thirds of its *applicable*
slots — applicable meaning after removing `N/A — structural` — are `scored`, rounded
up.

| Factor Applicable slots Minimum scored         |   |   |
| ---------------------------------------------- | - | - |
| Financial Strength (Standard)                  | 3 | 2 |
| Financial Strength (Banking, Rate-Regulated)   | 2 | 2 |
| Growth                                         | 3 | 2 |
| Growth (if Persistence is structurally N/A)    | 2 | 2 |
| Valuation                                      | 2 | 2 |
| Valuation (if own-history is structurally N/A) | 1 | 1 |
| Stability                                      | 4 | 3 |
| Moat                                           | 1 | 1 |

**Composite rule.** If **any** factor fails its coverage rule, no composite score is
published. The company is listed as **Not Scored — Insufficient Evidence**, and the
factors that did score are shown individually.

I chose refusal over estimation on purpose. Publishing a composite built on half the
evidence, with an uncertainty range attached, would make the gap look handled when it
is not. "I don't have enough to score this" is a legitimate output.

Note that because banks and rate-regulated companies have only two applicable
Financial Strength slots, two-thirds rounded up means **both** must be scored. A bank
whose individualized capital requirement cannot be established from disclosure will
not receive a composite. That is the intended behavior.

---

## 8. As-of date and data freeze

**Each scoring round declares and freezes exactly one as-of date before any data
collection begins.** The date is recorded in the round's data file. Methodology revisions are documented
under the versioning rules in Section 18.

- **Market-linked inputs** — share price, market capitalization, enterprise value, any multiple, and beta — use values as of that date. Beta additionally records its retrieval date.
- **Fundamental inputs** use the most recent fiscal period that had been filed on or before the as-of date.
- **External reference datasets** are cited by release year.

Without a frozen date, every multiple drifts daily, and pre-registering thresholds
would be meaningless because nobody could reproduce the inputs. This document does not
name a date, because naming one here would mean committing to it before deciding when
a round actually runs.

The live prices shown elsewhere on the site are display-only and never enter a score.

---

## 9. Source hierarchy

When sources disagree, this is the order:

1. **The company's own SEC filings** — 10-K first, then 10-Q, 8-K, and proxy statements. This is the primary source for every fundamental input.
2. **Company earnings supplements and investor presentations**, for figures the company itself defines and discloses consistently, such as ROTCE.
3. **The external industry reference dataset** (Damodaran's published industry data) for industry comparison values only.
4. **One named market-data source** for price and beta.

Everything else — news articles, aggregator summaries, other people's analyses — may
inform my qualitative reasoning and must be cited where it does, but may not be the
source of a scored number.

Every scored cell records: the value, the source, the as-of or retrieval date, the
band, and the state.

**Separating external facts from my choices.** Throughout Sections 10–12, each rule is
labeled:

- **External** — an accounting definition, regulatory requirement, or widely used convention.
- **Project-authored** — a rule I chose.
- **External metric / project-authored thresholds** — the metric is standard, the cutoffs are mine. This is the most common case.

---

## 10. Financial Strength (25%)

Slots: Profitability, Cash Generation, Balance-Sheet Capacity.

### 10.1 Profitability

**Standard profile.** Three-year average operating margin, compared with the industry
operating margin from the external reference dataset.

- Operating margin = operating income ÷ revenue, averaged across the three most recent fiscal years.
- Score on the ratio: company 3-year average ÷ industry reference.

| Ratio to industry Band                 |   |
| -------------------------------------- | - |
| ≥ 1.50                                 | 5 |
| 1.15 – 1.50                            | 4 |
| 0.85 – 1.15                            | 3 |
| 0.40 – 0.85                            | 2 |
| < 0.40, or negative three-year average | 1 |

*External metric / project-authored thresholds.* I use operating margin because it
comes straight off the income statement with no constructed inputs. Net margin is
distorted by leverage and tax; ROE is flattered by debt and breaks on negative book
equity; ROIC requires me to define invested capital, handle leases and goodwill, and
pick a tax rate — three judgment calls that would undo the auditability I am trying to
buy. Comparing to industry rather than to an absolute threshold fixes the obvious
problem that a grocer at 3% is not doing worse than software at 30%.

A negative three-year average is band 1 and `scored`, never `unobserved`.

**Regulated Banking.** Three-year average return on tangible common equity, as the
bank discloses it.

| ROTCE Band  |   |
| ----------- | - |
| ≥ 18%       | 5 |
| 14 – 18%    | 4 |
| 11 – 14%    | 3 |
| 8 – 11%     | 2 |
| < 8%        | 1 |

**Fallback:** if ROTCE is not disclosed consistently across all three years, use ROE
(net income available to common ÷ average common equity) with shifted bands: ≥15% = 5;
12–15% = 4; 9–12% = 3; 6–9% = 2; <6% = 1. The data file records which measure was used.

*External metric / project-authored thresholds.* ROTCE is the measure banks themselves
headline; the fallback exists because it is not universally disclosed, and the bands
are shifted because ROE and ROTCE are not the same number.

**Rate-Regulated.** Earned ROE **for the regulated operation** compared with a
compatible disclosed authorized (allowed) ROE, using a three-year average where the
earned figure is available for three years.

Both sides of this ratio must be established on a comparable basis. Consolidated
holding-company GAAP ROE is **not** an acceptable numerator against a regulated
subsidiary's authorized ROE: consolidated results include unregulated segments and
holding-company financing, so the two numbers describe different things and the ratio
would be meaningless. The comparison is acceptable when the company discloses an
earned ROE for the regulated utility itself — in regulatory filings, rate-case
disclosure, or segment reporting — alongside the authorized ROE that applies to that
same operation.

| Earned ÷ authorized Band  |   |
| ------------------------- | - |
| ≥ 1.10                    | 5 |
| 1.00 – 1.10               | 4 |
| 0.90 – 1.00               | 3 |
| 0.75 – 0.90               | 2 |
| < 0.75                    | 1 |

**If a comparable earned/authorized pair cannot be established from disclosure, this
slot is** **`unobserved`****.** There is no substitute reference. I considered using a fixed
generic allowed-ROE figure and rejected it: allowed ROE is set per utility subsidiary
per jurisdiction, and a made-up national average would be a number that looks like a
measurement and is not one.

Where a company operates across several jurisdictions, I use a weighted-average
authorized ROE only if the company itself discloses one. Constructing my own weighted
average across rate cases would be my estimate, not a disclosure.

This is a demanding requirement, and it will leave the slot `unobserved` for some
utility holding companies. That is the intended outcome: given the coverage rule in
Section 7, it means those companies receive no composite rather than a composite built
on a comparison that does not hold.

*External concept (earned vs. allowed ROE is how utility regulation actually works) /
project-authored thresholds.*

### 10.2 Cash Generation

**Standard profile.** Three-year average free-cash-flow margin.

- FCF = cash flow from operations − capital expenditures.
- FCF margin = FCF ÷ revenue, averaged across three fiscal years.

| 3-year average FCF margin Band  |   |
| ------------------------------- | - |
| ≥ 18%                           | 5 |
| 9 – 18%                         | 4 |
| 3 – 9%                          | 3 |
| 0 – 3%                          | 2 |
| < 0%                            | 1 |

Stock-based compensation is **not** added back. Negative FCF is band 1 and `scored`.

*External metric / project-authored thresholds.* Known limitation: these are absolute
thresholds applied across industries, so they systematically favor asset-light
businesses. Unlike Profitability, this slot is not industry-relative. I am accepting
that for v2 and disclosing it rather than adding another industry mapping.

**Regulated Banking —** **`N/A — structural`****.** A bank's operating cash flow mostly
reflects balance-sheet and trading flows rather than discretionary cash generation, so
the metric does not measure the intended concept. *Project-authored.*

**Rate-Regulated —** **`N/A — structural`****.** Regulated utilities fund a rate base through
sustained heavy capital spending, so free cash flow is structurally negative in normal
operation and says nothing about financial health. I considered scoring CFO ÷ total
debt instead, and dropped it for v2: the thresholds would have been informed by
rating-agency ranges without matching any published one, which is the kind of
borrowed-authority precision this methodology is supposed to avoid. *Project-authored.*

### 10.3 Balance-Sheet Capacity

**Standard profile.** Net debt ÷ EBITDA, most recent fiscal year.

- Net debt = total debt including finance leases − cash − short-term investments.
- EBITDA = operating income + depreciation and amortization.

| Net debt / EBITDA Band       |   |
| ---------------------------- | - |
| Net cash (negative net debt) | 5 |
| 0 – 1.0×                     | 4 |
| 1.0 – 2.5×                   | 3 |
| 2.5 – 4.0×                   | 2 |
| > 4.0×                       | 1 |

**Fallback for non-positive EBITDA (the pre-profit ladder).** If EBITDA ≤ 0, the ratio
is undefined — not missing. The question becomes how long the company can fund itself.

- Runway = (cash + short-term investments) ÷ annual cash burn, where burn = −(CFO − capital expenditures).

| Runway Band   |   |
| ------------- | - |
| > 4 years     | 4 |
| 3 – 4 years   | 3 |
| 1.5 – 3 years | 2 |
| < 1.5 years   | 1 |

**Band 5 is not available on the fallback ladder.** A company burning cash cannot reach
the top band on balance-sheet strength no matter how large its cash pile, and this
prevents a well-funded pre-profit company from outscoring a profitable one on this
slot. If the company is not burning cash (CFO − capex ≥ 0) but EBITDA is still
negative, the slot takes band 4.

The trigger is objective and the data file records that the fallback was used.

*External metrics / project-authored thresholds and ladder design.*

**Regulated Banking.** CET1 headroom = reported CET1 ratio − the bank's own stated
applicable minimum including buffers.

| Headroom Band  |   |
| -------------- | - |
| ≥ 300 bp       | 5 |
| 200 – 300 bp   | 4 |
| 100 – 200 bp   | 3 |
| 50 – 100 bp    | 2 |
| < 50 bp        | 1 |

If the individualized requirement cannot be established from the bank's own
disclosure, the slot is `unobserved`. **The generic 6.5% "well-capitalized" PCA
threshold must not be substituted** — it is a different regulatory concept from a
large bank's applicable minimum, and using it would overstate headroom, in some cases
dramatically.

*External metric / project-authored thresholds.* Known limitation: real large-bank
headroom clusters in a fairly narrow range, so five bands over it is a coarse
instrument reflecting management buffer policy as much as balance-sheet strength.

**Rate-Regulated.** Total debt ÷ (total debt + total equity), most recent fiscal year.

| Debt / total capital Band  |   |
| -------------------------- | - |
| ≤ 45%                      | 5 |
| 45 – 55%                   | 4 |
| 55 – 62%                   | 3 |
| 62 – 70%                   | 2 |
| > 70%                      | 1 |

*External metric / project-authored thresholds.* Regulators typically authorize capital
structures in the neighborhood of half debt, which is why the middle bands sit there,
but the exact cutoffs are mine.

---

## 11. Growth (25%)

Slots: 3-year Growth, Growth Persistence, Growth-Driver Durability.

### 11.1 Three-year growth

Formula in every profile: (latest ÷ value three years earlier)^(1/3) − 1, using fiscal
years.

**Standard profile — revenue.**

| 3-year revenue CAGR Band  |   |
| ------------------------- | - |
| ≥ 20%                     | 5 |
| 10 – 20%                  | 4 |
| 4 – 10%                   | 3 |
| 0 – 4%                    | 2 |
| < 0%                      | 1 |

No adjustment is made for acquisitions. Acquired revenue counts as growth, which
overstates organic growth for serial acquirers. *External metric / project-authored
thresholds; the no-adjustment choice is project-authored and disclosed.*

**Regulated Banking — net revenue**, defined as reported net interest income +
noninterest income. Provision for credit losses is a cost and is not deducted here.

| 3-year net revenue CAGR Band  |   |
| ----------------------------- | - |
| ≥ 12%                         | 5 |
| 7 – 12%                       | 4 |
| 3 – 7%                        | 3 |
| 0 – 3%                        | 2 |
| < 0%                          | 1 |

Managed-basis or fully-taxable-equivalent revenue is not used, because it cannot be
traced to a single reported line. *External metric definition / project-authored
thresholds.*

**Rate-Regulated — net property, plant and equipment**, used as a rate-base proxy.

| 3-year net PP&E CAGR Band  |   |
| -------------------------- | - |
| ≥ 9%                       | 5 |
| 6 – 9%                     | 4 |
| 3 – 6%                     | 3 |
| 0 – 3%                     | 2 |
| < 0%                       | 1 |

Revenue growth is deliberately **not** used for this profile: fuel and purchased-power
costs are passed through to customers, so utility revenue can rise or fall
substantially with commodity prices while the underlying business is unchanged. Rate
base — the investment the utility is allowed to earn a return on — is what actually
drives regulated earnings. If a company discloses rate base directly, I use the
disclosed figure and record the substitution.

*The economic reasoning is external; using net PP&E as the proxy is project-authored.*
Known limitation: net PP&E includes construction in progress and any unregulated
assets, so it approximates rate base rather than measuring it.

### 11.2 Growth Persistence

Count of positive year-over-year changes in the profile's growth measure, across
**four comparisons drawn from five fiscal years**.

| Positive years out of 4 Band  |   |
| ----------------------------- | - |
| 4                             | 5 |
| 3                             | 4 |
| 2                             | 3 |
| 1                             | 2 |
| 0                             | 1 |

If four comparisons are not available, the slot is **`N/A — structural`**. There is no
partial-history fallback: scoring two or three observations on a proportional scale
would make a short-history company's result look equivalent to a full-history one when
it is not.

*Project-authored.* **This is a deliberately coarse flag, not a measure of growth
quality.** It answers one question: did this company's top line ever shrink over the
window? It treats +0.1% four times as better than +40%, +30%, +20%, −1%, and in a
period of high nominal growth most large companies will land at 4 out of 4, meaning the
slot separates very few of them. I am keeping it because "never shrank" is genuinely
informative for the few cases where it fails, and I am writing down its weakness rather
than discovering it later.

### 11.3 Growth-Driver Durability

A structured qualitative band covering **demand-side runway only** — is there more of
this left to sell? Anchors are in Section 15.

---

## 12. Valuation (20%)

Slots: Primary Multiple vs. External Industry Reference, and the Same Multiple vs. Own
History. Both slots use the **same** multiple for a given company.

### 12.1 Choosing the primary multiple

| Situation Multiple Industry reference  |                                                                                |                                       |
| -------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------- |
| Standard, positive trailing EPS        | Trailing P/E = price ÷ TTM diluted GAAP EPS                                    | Industry trailing P/E                 |
| Standard, TTM diluted EPS ≤ 0          | EV / Sales, where EV = market cap + total debt − cash − short-term investments | Industry EV/Sales                     |
| Regulated Banking                      | P/B = price ÷ book value per common share                                      | Industry P/BV                         |
| Rate-Regulated                         | Trailing P/E                                                                   | Industry P/E for the utility grouping |

The negative-earnings trigger is objective (TTM diluted EPS ≤ 0), not a judgment call,
and the data file records which multiple was used. A negative P/E is a structural
reason to switch metrics — it is not an observed weakness in *this* slot, because
profitability is already scored under Financial Strength. Scoring it twice would be
double-counting.

**On banks:** P/TBV is the sharper analytical measure, and I am not using it as the
scored metric. The architecture requires the same multiple in both Valuation slots, and
the external reference dataset publishes P/BV, not P/TBV. Scoring a P/TBV against a
P/BV reference would build in a systematic, invisible bias, since tangible book is
always smaller than book. **P/TBV is recorded as contextual evidence in the company
write-up but is not scored in v2.** *Project-authored.*

### 12.2 Primary multiple vs. external industry reference

Score the ratio: company multiple ÷ industry reference multiple.

| Ratio to industry Band  |   |
| ----------------------- | - |
| ≤ 0.70                  | 5 |
| 0.70 – 0.90             | 4 |
| 0.90 – 1.15             | 3 |
| 1.15 – 1.50             | 2 |
| > 1.50                  | 1 |

**Industry mapping is committed before scoring.** Each company's industry assignment is
recorded in the inputs table before any multiple is computed, and follows the reference
dataset's own classification where one exists. This matters because a company that
could plausibly be mapped to two industries can move a full band depending on the
choice. Any override of the dataset's classification is recorded as a project-authored
decision with a written reason.

*External metric and dataset / project-authored thresholds and direction.*

**The direction is an assumption, not a finding.** "Cheaper relative to industry scores
higher" is built into the model. A low multiple can reflect real deterioration that
this model scores somewhere else, or nowhere at all.

**Timing mismatch:** the external industry dataset is published as an annual snapshot,
while company multiples use the round's as-of date. These will not be the same date.
Disclosed, not corrected.

### 12.3 Same multiple vs. own history

Score the ratio: current multiple ÷ the median of that same multiple at the five most
recent fiscal-year-end closes. Each historical observation uses the closing price at
that fiscal year end divided by that year's denominator. Thresholds are the same as
Section 12.2.

**Minimum history: at least 4 of the 5 year-end observations must be available with a
positive denominator.**

- If fewer are available because the company has not been public long enough, or has not had a positive denominator long enough, the slot is **`N/A — structural`**, and Valuation is scored on its one remaining slot.
- If the observations exist but I did not gather them, the slot is **`unobserved`**, which fails Valuation's coverage rule and blocks the composite. This distinction is the difference between a real limitation and incomplete work, and the two should not produce the same outcome.

**Known limitation:** a five-year median is close to meaningless when the business
changed shape inside the window — a company whose revenue mix shifted substantially is
not really being compared to itself. Where this applies, I flag it in the write-up. I
am deliberately not writing a rule for "materially changed business," because any
threshold I invented for that would be fake precision.

The two Valuation slots share a price numerator, so a large price move shifts both in
the same direction. They are conceptually distinct — one is cross-sectional, one is
time-series — but they are not independent. *Disclosed.*

---

## 13. Stability (15%)

Slots: Market Volatility, Concentration, Regulatory/Legal Exposure,
Reporting/Governance Integrity.

The unifying question is: what could disrupt this business that the financial
statements do not already show? Market Volatility is the odd member of that set — it is
a price statistic sitting among business-structure judgments — and it is here because
it is the one broad risk measure available consistently for every company.

### 13.1 Market Volatility

Beta (5-year monthly), taken from one named market-data source, with the value and
retrieval date recorded and frozen for the round. For v2 the source is Yahoo Finance.

| Beta (5Y monthly) Band  |   |
| ----------------------- | - |
| ≤ 0.75                  | 5 |
| 0.75 – 1.00             | 4 |
| 1.00 – 1.30             | 3 |
| 1.30 – 1.70             | 2 |
| > 1.70                  | 1 |

If a company has been listed for less than three years, the published figure is still
used and flagged as short-history. If no figure is published, the slot is `unobserved`.

*The 5-year monthly convention is external; the source choice and thresholds are
project-authored.* The cutoffs are round numbers chosen to spread a typical large-cap
sample.

**Beta measures co-movement with the market, not total risk and not downside risk.**
Different providers publish different betas for the same company depending on lookback
and frequency, which is exactly why the source, value, and retrieval date are all
recorded — that record is the audit trail.

### 13.2 Concentration

**Revenue concentration only, across two dimensions: Customer and Product/Service.**
Each is evaluated separately with its own interpretation, and **the slot takes the
worse of the applicable scored dimensions**. The data file records which dimension
drove the band.

Taking the worse rather than averaging is deliberate. The two dimensions are not
measured on the same scale and a 30% figure does not mean the same thing across them,
so averaging would imply an equivalence that does not exist. Taking the worse requires
no invented weighting and reflects that concentration risk is about the biggest single
dependency.

**Customer dimension** — largest disclosed customer as a share of revenue.

| Largest customer Band          |   |
| ------------------------------ | - |
| No customer disclosed at ≥ 10% | 5 |
| 10 – 15%                       | 4 |
| 15 – 25%                       | 3 |
| 25 – 40%                       | 2 |
| ≥ 40%                          | 1 |

Absence of a ≥10% disclosure is `scored` at band 5, because ASC 280 requires disclosure
above that threshold, so silence is informative. **ASC 280's 10% is a disclosure
threshold, not an investment-risk cutoff** — the bands above that line are entirely
mine. For banks this dimension is `N/A — structural`.

**Product / service dimension** — largest disclosed product or service line as a share
of revenue, taken from the revenue-disaggregation footnote in preference to reportable
segments.

| Largest line Band  |   |
| ------------------ | - |
| < 30%              | 5 |
| 30 – 45%           | 4 |
| 45 – 60%           | 3 |
| 60 – 75%           | 2 |
| ≥ 75%              | 1 |

If neither disaggregation nor segment revenue is disclosed, the dimension is
`unobserved` — never band 5. A genuinely single-product business scores band 1 as an
observed fact, not a missing one.

*Known limitation:* how finely a company disaggregates is its own reporting choice, so
two similar businesses can land two bands apart. Preferring the disaggregation footnote
reduces this; it does not remove it.

**Geographic concentration is not a scored dimension in v2.** I tried to define one and
could not do it honestly. Any threshold on largest-country revenue share would make
"mostly domestic" look like a risk for nearly every U.S. company, while excluding the
home country makes international exposure — often a strength — look like a weakness.
Geographic dependence is a real consideration and I discuss it in company write-ups
where it matters, and single-jurisdiction regulatory dependence is captured
qualitatively under Regulatory/Legal Exposure. It is simply not something I can band
defensibly, so it does not get a band.

Supplier concentration, key-person risk, and distribution-channel concentration are
also **outside** this slot. All figures come from customer or revenue-disaggregation
disclosures — not from risk-factor narrative.

*Project-authored throughout, apart from the ASC 280 disclosure threshold itself.*

### 13.3 Regulatory / Legal Exposure

A structured qualitative band covering regulatory and legal **threats and changes
only**. Protection currently in force belongs to Moat (Section 16). Anchors are in
Section 15.

**There is no generic SEC "10% of assets" legal-materiality rule**, and none is used
here. Bands rest on disclosed proceedings and the company's own materiality language.

### 13.4 Reporting / Governance Integrity

A structured qualitative band based on objective reporting events. Anchors are in
Section 15. The underlying events — material weaknesses, restatements, non-reliance
determinations, late filings, going-concern doubt, adverse auditor departures — are
factual and externally defined; **how they map to five bands is my choice.**

A routine auditor change is **not** penalized on its own. Companies rotate auditors for
ordinary reasons, and treating that as a red flag would generate false signals. What
counts is an auditor **resignation, dismissal, or reported disagreement** — the kind of
departure disclosed with an accompanying reason.

---

## 14. Qualitative slot procedure

Four slots are qualitative: Growth-Driver Durability, Regulatory/Legal Exposure,
Reporting/Governance Integrity, and Moat. I am not going to dress these up as formulas.
Instead, each requires a written record with four parts:

1. **Evidence** — specific, cited, and where possible drawn from filings rather than commentary.
2. **Counter-evidence** — what argues against the band I chose. If I cannot state any, that is a signal I have not looked hard enough.
3. **Breadth and durability** — how much of the business this applies to, and for how long it plausibly holds.
4. **A falsification statement** — "this band is wrong if \_\_\_." It must name something observable. "If the company does worse" does not count; "if the disclosed retention rate falls below X" does.

The falsification statement is the part that makes revisions honest. When a band
changes later, I can point to whether the thing I said would falsify it actually
happened, instead of quietly re-rating.

---

## 15. Qualitative anchors

### Growth-Driver Durability — demand-side runway only

- **5** — Large disclosed addressable demand with low current penetration, or contracted backlog or committed capacity covering multiple years. The driver is documented in filings, not inferred by me.
- **4** — A clear multi-year demand driver with some quantified support, but penetration is already meaningful, or the runway depends on a single end market.
- **3** — A plausible demand story with limited quantified support, or a driver approaching maturity.
- **2** — Growth depends mainly on price or mix, or on a cycle that has already turned; little evidence of unpenetrated demand.
- **1** — No identified forward demand driver, or the primary driver is documented as shrinking.

### Regulatory / Legal Exposure — threats and changes only

- **5** — No material pending proceeding and no material regulatory or legal development **identified within the sources I reviewed** (Section 9), and no exclusivity expiry within roughly three years. This band means my review found nothing, not that nothing exists.
- **4** — Routine litigation only, or a rule change under discussion with limited or unquantified exposure.
- **3** — One identified material proceeding, investigation, or adverse regulatory development, with uncertain magnitude.
- **2** — Multiple material proceedings, an active enforcement or antitrust action, an unfavorable pending rate case, or a near-term loss of exclusivity.
- **1** — An existential or business-model-level regulatory or legal threat, or a disclosed adverse outcome with a material quantified financial effect.

### Reporting / Governance Integrity

- **5** — Unqualified audit opinion, internal control over financial reporting reported as effective, and no restatement, non-reliance determination, material weakness, adverse auditor departure, or late filing in the past five years.
- **4** — Clean current status, with one older or clearly remediated item inside five years.
- **3** — One current material weakness, or one restatement.
- **2** — Multiple current material weaknesses, a non-reliance determination, or a late filing in the current year.
- **1** — Going-concern doubt, auditor resignation or dismissal with a disclosed disagreement, unremediated multi-year material weaknesses, or an ongoing accounting investigation.

Band 5 is written strictly on purpose. Most companies will still land in the top two
bands, which means this slot discriminates only for the few with real reporting
problems. That is what it is for — it is a red-flag slot, and its low discrimination
across a normal watchlist is expected rather than a defect.

### Moat — supply-side defensibility only

- **5** — A named mechanism — switching costs, network effects, scale economics, brand pricing power, or a legal or regulatory entry barrier — with direct documented evidence, applying to most of revenue, and no material counter-evidence.
- **4** — A named mechanism with reasonable evidence, but narrower breadth or identified counter-evidence.
- **3** — A plausible mechanism with weak or indirect evidence, or evidence that it covers only part of the business.
- **2** — The advantage is mostly current execution, price, or size, without a barrier to replication.
- **1** — No identified mechanism, or documented evidence of erosion such as share loss, pricing pressure, or customer defection.

---

## 16. Anti-double-counting rules

A weighted model quietly counts the same fact several times unless it is stopped from
doing so. Four rules do that here.

**1. One slot per piece of evidence.** Every piece of evidence in a company's write-up
is filed under exactly one slot. If the same fact is the primary support for two slots,
it counts under the more specific one, and the other slot must cite different evidence
or take a lower band.

**2. Demand versus supply.** Growth-Driver Durability asks whether there is more left to
sell — market size, penetration, adoption stage, backlog, product-cycle length. Moat
asks whether competitors can take it or compete away the margin — switching costs,
network effects, scale, brand pricing power, legal barriers. **If a fact is the primary
support for both, it counts under Moat only.** Without this rule, a single "big trend,
strong company" story would earn points at 25% and again at 15%.

**3. Who owns regulation.** Regulation currently protecting the business — a banking
charter, a utility franchise, a license, an exclusivity period — is a **Moat**
mechanism. Threats to it, contests over it, and changes to it — pending rate cases,
antitrust action, proposed rules, investigations, looming expiry — are **Stability**.
A regulated utility can therefore score well on Moat and poorly on Regulatory/Legal
Exposure at the same time. That is the correct picture, not a contradiction.

**4. Returns are corroboration, never moat evidence.** High sustained margins or returns
are already scored under Financial Strength Profitability. They may support a moat band
as secondary corroboration, but the **primary** evidence must be mechanism-specific —
disclosed retention, pricing actions, share stability, contract structure, switching
costs. Otherwise "it is very profitable" would score twice.

**Things I know are still correlated and am disclosing rather than fixing:**

- Beta partly reflects the market's aggregate view of everything else in the model.
- Revenue CAGR and Growth Persistence are computed from the same revenue series.
- The two Valuation slots share a price numerator.
- Standard-profile Profitability and Valuation both depend on the same industry mapping, so one bad mapping moves two slots.

---

## 17. Maintenance

- **Full rescoring** happens once per year, after the annual-report season, so that all fundamentals come from comparable filings.
- **Between rounds**, a company's factor scores do not change. Live prices on the site are display-only and do not move any score.
- **Scores are frozen within a round.** No individual company's score changes between rounds, for any reason. If a material event occurs after the as-of date — a restatement, a going-concern disclosure, a material adverse legal outcome, a profile-changing acquisition — the company receives a visible **material-event flag** and a dated explanatory note saying what happened and which slot it would likely affect. The score itself stays where the round put it until the next round is run with a new common as-of date.
- The reason is comparability: if I re-scored one company mid-round, the watchlist would no longer share a single as-of date, and every comparison and ranking on the site would quietly become a mix of dates. A visibly flagged stale score is more honest than a silently inconsistent table.
- **The inputs table** carries one row per company per slot: value, source, as-of or retrieval date, band, state, driving dimension where applicable, and any flags (fallback used, short history, partial profile fit, material event).
- **Scope is capped.** This methodology is maintainable by one student at roughly the current watchlist size. Expanding the watchlist substantially would mean either cutting corners on sourcing or letting scores go stale, and neither is acceptable, so the watchlist stays small.

---

## 18. Versioning

**Once scoring under v2 has begun, this document does not change silently.**

- **Clarifications** that do not alter any score — fixing wording or a typo — are documented in the repository history and version notes with the date.
- **Any change that could alter a score** — a threshold, a formula, a slot, a weight, a profile rule, a band anchor — creates a **new numbered version** with a changelog saying what changed and why. The previous version stays in the repository history.
- **A methodology change is never applied to a completed round retroactively.** Rounds scored under v2.0 stay labeled v2.0 even after a later version exists.
- The specific temptation this rule exists to prevent: seeing a score I do not like and adjusting a threshold until it looks right. If a threshold turns out to be badly chosen, the honest fix is a new version that says so, not an edit.

---

## 19. Status at commit

**As of version 2.0, no company has been scored under Scoring Methodology v2.** Every
threshold, band anchor, formula, and rule in this document was written before any v2
result existed, and v2.0 is committed to the repository before the first v2 scoring
round begins. The v1 scores currently on the site were produced under a different and
less structured model and are not v2 results.

Anyone checking this can verify it from the repository history: the commit adding
v2.0 precedes any commit containing v2 scores or a v2 inputs table.

This ordering is the entire point. Thresholds chosen after seeing the results they
produce are not rules — they are conclusions written backwards.

---

## 20. Known weak points

Everything in Section 2 applies. Beyond that, these are the specific parts of v2 I am
least confident in, listed here so nobody has to dig for them:

1. **Standard Cash Generation uses absolute thresholds** across all industries, so it systematically favors asset-light businesses. It is the one remaining fully absolute cross-industry threshold in the model.
2. **Bank CET1 headroom bands** sit on top of a narrow real-world range and partly reflect management buffer policy rather than balance-sheet strength.
3. **Product-concentration bands** depend on how finely a company chooses to disaggregate revenue, which is its own reporting decision.
4. **The valuation direction** — cheaper scores higher — is a built-in assumption, not something this project demonstrated.
5. **Own-history valuation** is weak when the business changed shape inside the window.
6. **Rate-regulated growth** uses net PP&E as a rate-base proxy, which includes construction in progress and any unregulated assets.
7. **Beta cutoffs** are round numbers, not derived from anything.
8. **Growth Persistence** will land at the top band for most large companies and separate very few of them.
9. **Qualitative bands are still my judgment.** The evidence and falsification structure makes that judgment visible and checkable; it does not make it objective. Moat in particular remains the softest slot in the model, which is why it carries 15% rather than more.