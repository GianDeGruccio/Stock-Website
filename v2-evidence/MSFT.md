# MSFT — Scoring Methodology v2 Evidence Record

- Ticker: MSFT
- Company name: Microsoft Corporation
- Profile: Standard (assigned per METHODOLOGY.md §5 before scoring; no partial-fit flag — see ROUND.md for assignment basis)
- Round as-of date: 2026-09-25 market close (frozen 2026-09-26, before data collection)
- Damodaran industry mapping: Software (System & Application) — January 2026 U.S. dataset; directly verified in the official Damodaran indname.xlsx company lookup on 2026-09-26 before any valuation multiple was computed.
- Round status: In progress — all three Financial Strength slots, all three Growth slots, both Valuation slots, and Market Volatility are scored; Concentration, Regulatory/Legal Exposure, Reporting/Governance Integrity, and Moat slots remain unfilled; no factor or composite score has been entered yet

---

## Financial Strength (25%)

### Slot: Profitability
- State (`scored` / `N/A — structural` / `unobserved`): scored
- Raw metric/value (USD millions; fiscal years ended June 30):
  - FY2026: revenue 331,839; operating income 155,237; operating margin 46.7808%
  - FY2025: revenue 281,724; operating income 128,528; operating margin 45.6220%
  - FY2024: revenue 245,122; operating income 109,433; operating margin 44.6443%
  - Three-year average operating margin: 45.6824%
  - Applicable Damodaran industry: Software (System & Application)
  - January 2026 Pre-tax Unadjusted Operating Margin (industry reference): 32.98%
- Formula/calculation: Operating margin = operating income ÷ revenue for each fiscal year; three-year average of the three margins; ratio to industry = 45.6824% / 32.98% = 1.3852, in the 1.15–1.50 range (Band 4 under §10.1, Standard profile).
- Source: Microsoft FY2026 Form 10-K for company operating margins (Income Statements, filed July 29, 2026); Damodaran January 2026 U.S. Operating and Net Margins dataset for the 32.98% industry reference; official Damodaran indname.xlsx company lookup for Microsoft's industry assignment.
- Source period/date: FY2024–FY2026 (fiscal years ended June 30); 10-K filed 2026-07-29. Damodaran company lookup workbook created/modified January 8, 2026; inspected 2026-09-26.
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 4
- Flag/Note: Industry mapping history: Microsoft's January 2026 Damodaran company-to-industry mapping was initially unavailable from the accessible sources, and this slot was first recorded as `unobserved` after documented attempts on 2026-09-26. It was then directly verified from the official January 2026 Damodaran company lookup on 2026-09-26, before any valuation multiple was computed. The verified record is the `By company name` sheet, row 26710: Microsoft Corporation (NasdaqGS:MSFT), Industry Group Software (System & Application), Primary Sector Information Technology, SIC code 7372, country United States. The workbook itself is not stored in this repository. The slot record was updated from `unobserved` to `scored` after the official January 2026 Damodaran company-to-industry mapping was directly verified, during the initial evidence-collection process and before any factor/composite score or valuation multiple was calculated. There was no change to the methodology, thresholds, or company-side figures.

### Slot: Cash Generation
- State: scored
- Raw metric/value (USD millions; fiscal years ended June 30):
  - FY2026: CFO 182,935; capex 115,948; FCF 66,987; FCF margin 20.1866%
  - FY2025: CFO 136,162; capex 64,551; FCF 71,611; FCF margin 25.4188%
  - FY2024: CFO 118,548; capex 44,477; FCF 74,071; FCF margin 30.2180%
  - Three-year average FCF margin: 25.2745%
- Formula/calculation: FCF = cash flow from operations − capital expenditures; FCF margin = FCF ÷ revenue for each fiscal year; three-year average of the three margins, mapped to the §10.2 Standard-profile bands (≥ 18% = Band 5). Capex line used: `Additions to property and equipment`. Stock-based compensation is not added back.
- Source: Microsoft FY2026 Form 10-K, Cash Flows Statements (revenue from the Income Statements)
- Source period/date: FY2024–FY2026 (fiscal years ended June 30); 10-K filed 2026-07-29
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 5
- Flag/Note: The formula as written uses cash capex only, so lease-funded equipment and unpaid equipment purchases fall outside it. The methodology was not adjusted to account for them.

### Slot: Balance-Sheet Capacity
- State: scored
- Raw metric/value (USD millions; most recent fiscal year, FY2026):
  - Cash and cash equivalents: 20,935
  - Short-term investments: 55,908
  - Current portion of long-term debt: 9,227
  - Long-term debt: 31,067
  - Finance lease liabilities, current: 4,290
  - Finance lease liabilities, long-term: 62,304
  - Total debt including finance leases: 106,888
  - Net debt: 30,045
  - Operating income: 155,237
  - Depreciation: 34,300
  - Intangible amortization: 4,700
  - EBITDA: 194,237
  - Net debt / EBITDA: 0.1547x
- Formula/calculation: Net debt = total debt including finance leases − cash − short-term investments (106,888 − 20,935 − 55,908 = 30,045). EBITDA = operating income + depreciation and amortization (155,237 + 34,300 + 4,700 = 194,237). Net debt ÷ EBITDA = 0.1547x, in the 0–1.0x range (Band 4 under §10.3). EBITDA is positive, so the pre-profit fallback ladder was not used.
- Source: Microsoft FY2026 Form 10-K, Balance Sheets, Long-term Debt note, Lease Balance Sheet Information, Property and Equipment note, and Intangible Assets note
- Source period/date: FY2026 (fiscal year ended June 30, 2026); 10-K filed 2026-07-29
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 4
- Flag/Note: Microsoft does not present one D&A line that exactly matches the methodology, so depreciation and intangible amortization were combined from the notes. This record does not assert whether finance-lease right-of-use amortization is or is not already embedded in the depreciation figure. The reasonable presentation alternatives reviewed do not change Band 4.

---

## Growth (25%)

### Slot: 3-Year Growth
- State: scored
- Raw metric/value (USD millions; fiscal years ended June 30):
  - FY2026 revenue: 331,839
  - FY2023 revenue: 211,915
  - 3-year revenue CAGR: 16.1240%
- Formula/calculation: (331,839 / 211,915)^(1/3) − 1 = 16.1240%, in the 10–20% range (Band 4 under §11.1, Standard profile revenue CAGR).
- Source: Microsoft FY2026 Form 10-K for FY2026 revenue; Microsoft FY2025 Form 10-K for FY2023 revenue, with the same FY2023 figure corroborated in the FY2024 and FY2023 filings
- Source period/date: FY2023 and FY2026 (fiscal years ended June 30)
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 4
- Flag/Note: Activision closed during FY2024, so FY2023 revenue excludes it while FY2026 includes a full year. v2.0 explicitly counts acquired revenue as growth, so no adjustment is made.

### Slot: Growth Persistence
- State: scored
- Raw metric/value (USD millions; fiscal years ended June 30):
  - FY2022 revenue: 198,270
  - FY2023 revenue: 211,915
  - FY2024 revenue: 245,122
  - FY2025 revenue: 281,724
  - FY2026 revenue: 331,839
  - FY2023 vs FY2022: positive
  - FY2024 vs FY2023: positive
  - FY2025 vs FY2024: positive
  - FY2026 vs FY2025: positive
  - Positive comparisons: 4 of 4
- Formula/calculation: Count of positive year-over-year revenue changes across four comparisons drawn from five fiscal years; 4 of 4 positive = Band 5 under §11.2.
- Source: Microsoft FY2024 Form 10-K, Income Statements (FY2022), accession 0000950170-24-087843; Microsoft FY2025 Form 10-K, Income Statements (FY2023), accession 0000950170-25-100235; Microsoft FY2026 Form 10-K, Income Statements (FY2024–FY2026), accession 0001193125-26-323660.
- Source period/date: FY2022–FY2026 (fiscal years ended June 30)
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 5
- Flag/Note: This is a deliberately coarse persistence flag under §11.2. Figures are nominal and include acquisitions.

### Slot: Growth-Driver Durability (qualitative)
- State: scored
- Source(s) reviewed: Microsoft FY2026 Form 10-K, including the remaining-performance-obligation / unearned-revenue disclosures and risk factors; Microsoft FY2025 Form 10-K for the prior-year RPO comparison; Microsoft FY26 Q4 earnings release dated July 29, 2026; Microsoft FY26 Q4 earnings call dated July 29, 2026
- Source period/date: as of June 30, 2026 (FY2026); 10-K filed 2026-07-29
- Scoring-round as-of date: 2026-09-25 market close
- Evidence:
  - FY2026 commercial RPO: $678 billion; total RPO: $684 billion
  - Weighted-average commercial RPO duration: approximately 2 years 3 months 18 days
  - About 30% expected to be recognized within 12 months
  - FY2025 commercial RPO: $368 billion
  - Microsoft Cloud revenue FY2026: $214.4 billion, 64.6% of total revenue
  - Microsoft earnings materials state commercial RPO grew 25% excluding OpenAI, commercial bookings grew 18% excluding OpenAI, and customer demand continues to exceed available capacity
- Counter-evidence:
  - OpenAI concentration is material. Based on the filing totals and the CFO's rounded ex-OpenAI growth disclosure, OpenAI represents approximately at least $218 billion, or at least about 32%, of FY2026 commercial RPO. This is an approximate inferred lower bound, not a company-disclosed customer figure.
  - The approximately 2.3-year weighted-average duration applies to total commercial RPO including OpenAI. The duration of ex-OpenAI RPO is not disclosed.
  - The share expected to be recognized within 12 months fell from about 40% to about 30%, making the backlog more long-dated.
  - Revenue conversion is capacity-dependent, and the 10-K warns about infrastructure investment ahead of demand and the possibility that expected consumption may not materialize.
  - Growth is concentrated in cloud and AI; some other lines are flat, declining, or low-growth.
- Breadth and durability:
  - Microsoft Cloud was 64.6% of FY2026 revenue.
  - Server Products & Cloud Services alone represented about 39.0% of revenue.
  - Approximately 14.2% of FY2026 revenue was in Windows & Devices, XBOX, and Enterprise & partner services, the lines identified in the cited FY2026 disclosures as flat, declining, or low-growth.
  - RPO is not disclosed by segment, end market, or customer.
  - The disclosed commercial RPO weighted-average duration is approximately 2.3 years.
- Falsification statement ("this band is wrong if ___"): This band is wrong if a subsequent Microsoft filing reports commercial RPO weighted-average duration of one year or less, or discloses a cancellation/amendment of commitments included in the June 30, 2026 commercial RPO that reduces the relevant weighted-average duration to one year or less.
- Band (1–5): 5
- Flag/Note: Confidence: Medium — overlapping Band 4 and Band 5 anchors. Band rationale: Band 5 is used because the filing directly documents contracted commercial backlog with a weighted-average duration covering multiple years, which matches the literal §15 Band 5 anchor. Band 4 is a plausible competing interpretation because the demand runway is concentrated in cloud/AI and a large counterparty, and v2.0 provides no tie-break rule for overlapping anchors. Anti-double-counting: RPO is filed here as demand-side runway evidence and should not later be reused as primary evidence for Moat unless the Growth evidence is reconsidered under §16.

---

## Valuation (20%)

### Slot: Primary Multiple vs. External Industry Reference
- State: scored
- Raw metric/value:
  - Primary multiple: trailing P/E (Standard profile, positive TTM diluted GAAP EPS), per the preflight decisions in ROUND.md
  - Yahoo Finance regular-session Close, 2026-09-25: $516.17
  - FY2026 diluted GAAP EPS: $17.95
  - Current trailing P/E: 28.7560
  - Industry trailing P/E (Damodaran January 2026, Software (System & Application), `Trailing PE`): 79.17
  - Ratio to industry: 0.3632
- Formula/calculation: Current trailing P/E = 516.17 / 17.95 = 28.7560. Ratio = 28.7560 / 79.17 = 0.3632, which is ≤ 0.70 (Band 5 under §12.2).
- Source: Yahoo Finance for the share price (regular-session Close, not Adjusted Close); Microsoft FY2026 Form 10-K for diluted GAAP EPS; Damodaran January 2026 `PE Ratio by Sector (US)` for the industry reference, using the column named exactly `Trailing PE`.
- Source period/date: Price as of 2026-09-25 (regular-session close); EPS for fiscal year ended June 30, 2026 (10-K filed 2026-07-29); industry reference from the January 2026 Damodaran dataset.
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 5
- Flag/Note: Limitations retained: (1) the January 2026 industry reference and the September 2026 company multiple do not share a date (the §12.2 timing mismatch, disclosed rather than corrected); (2) Microsoft is included in its own Damodaran industry benchmark, so the benchmark is not independent of the company being compared, and no estimate of Microsoft's share of industry market cap is given; (3) the direction (cheaper relative to industry scores higher) is a built-in assumption of the model, not a finding. The separate Damodaran aggregate market cap / trailing net income field was not substituted; see the preflight decisions in ROUND.md.

### Slot: Same Multiple vs. Own History
- State: scored
- Raw metric/value (trailing P/E at each fiscal-year-end close; Yahoo Finance regular-session Close, not Adjusted Close; diluted GAAP EPS from that fiscal year's 10-K):
  - FY2022: Close $256.83 / diluted EPS $9.65 = 26.6145
  - FY2023: Close $340.54 / diluted EPS $9.68 = 35.1798
  - FY2024: unavailable — 2024-06-30 was a Sunday; under the v2.0 preflight rule no substitute trading-day close is used
  - FY2025: Close $497.41 / diluted EPS $13.64 = 36.4670
  - FY2026: Close $373.02 / diluted EPS $17.95 = 20.7811
  - Available observations: 4 (sorted: 20.7811, 26.6145, 35.1798, 36.4670)
  - Historical median P/E: 30.8971
  - Current trailing P/E: 28.7560
  - Current / own-history median ratio: 0.9307
- Formula/calculation: Median of the four available observations = (26.6145 + 35.1798) / 2 = 30.8971. Ratio = 28.7560 / 30.8971 = 0.9307, in the 0.90–1.15 range (Band 3 under §12.3, thresholds as in §12.2). Four of five year-end observations are available with a positive denominator, meeting the §12.3 minimum-history requirement.
- Source: Yahoo Finance for fiscal-year-end and current share prices (regular-session Close, not Adjusted Close; not dividend-adjusted); Microsoft 10-Ks for each fiscal year's diluted GAAP EPS.
- Source period/date: Fiscal-year-end closes for FY2022, FY2023, FY2025, and FY2026 (fiscal years ended June 30); current price as of 2026-09-25.
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 3
- Flag/Note: Limitations retained: (1) FY2024 is omitted because its exact fiscal-year-end (Sunday 2024-06-30) was a non-trading day and v2.0 has no explicit non-trading-day convention; this is flagged as a prototype finding for possible v2.1, not a change to v2.0 during the round; (2) each historical EPS was filed after its fiscal-year-end price date, creating a look-ahead/timing mismatch; (3) Adjusted Close was not substituted, so historical prices are not dividend-adjusted; (4) the two Valuation slots share a price numerator, so they are not independent, as disclosed in §12.3.

---

## Stability (15%)

### Slot: Market Volatility
- State: scored
- Raw metric/value: Beta (5Y Monthly) = 1.11
- Formula/calculation: No calculation required; Yahoo Finance published value, mapped directly to §13.1 band.
- Source: Yahoo Finance, Microsoft Corporation (MSFT) quote page
- Source period/date (retrieval date): 2026-09-26
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): 3
- Flag/Note: Beta is a retrieval-date statistic, not a reconstructed historical September 25 beta — it reflects Yahoo Finance's 5-year monthly beta as published on the 2026-09-26 retrieval date, not a beta computed specifically as of the round's as-of date. This is why METHODOLOGY.md §13.1 requires the retrieval date to be recorded alongside the value. The September 25 closing stock price was checked only as page/date context and was not entered here or used in this slot's score.

### Slot: Concentration
- State:
- Customer dimension — largest disclosed customer %:
- Customer dimension source/period:
- Product/Service dimension — largest disclosed line %:
- Product/Service dimension source/period:
- Which dimension drove the band:
- Scoring-round as-of date:
- Band (1–5):
- Flag/Note:

### Slot: Regulatory/Legal Exposure (qualitative)
- State:
- Source(s) reviewed:
- Source period/date:
- Scoring-round as-of date:
- Evidence:
- Counter-evidence:
- Breadth and durability:
- Falsification statement:
- Band (1–5):
- Flag/Note:

### Slot: Reporting/Governance Integrity (qualitative)
- State:
- Source(s) reviewed:
- Source period/date:
- Scoring-round as-of date:
- Evidence:
- Counter-evidence:
- Breadth and durability:
- Falsification statement:
- Band (1–5):
- Flag/Note:

---

## Moat (15%)

### Slot: Moat (qualitative)
- State:
- Source(s) reviewed:
- Source period/date:
- Scoring-round as-of date:
- Evidence:
- Counter-evidence:
- Breadth and durability:
- Falsification statement:
- Band (1–5):
- Flag/Note:

---

## Composite
Do not fill in until every factor's coverage rule (METHODOLOGY.md §7) has been checked.
- Financial Strength factor score:
- Growth factor score:
- Valuation factor score:
- Stability factor score:
- Moat factor score:
- Coverage check passed for all five factors?:
- Composite score (only if coverage passed):
- Or: Not Scored — Insufficient Evidence (if any factor failed coverage):
