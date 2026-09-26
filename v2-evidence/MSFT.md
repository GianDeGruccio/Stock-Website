# MSFT — Scoring Methodology v2 Evidence Record

- Ticker: MSFT
- Company name: Microsoft Corporation
- Profile: Standard (assigned per METHODOLOGY.md §5 before scoring; no partial-fit flag — see ROUND.md for assignment basis)
- Round as-of date: 2026-09-25 market close (frozen 2026-09-26, before data collection)
- Round status: In progress — Market Volatility, Cash Generation, and Balance-Sheet Capacity are scored; Profitability is unobserved; Growth, Valuation, other Stability, and Moat slots remain unfilled; no factor or composite score exists yet

---

## Financial Strength (25%)

### Slot: Profitability
- State (`scored` / `N/A — structural` / `unobserved`): unobserved
- Raw metric/value (USD millions; fiscal years ended June 30):
  - FY2026: revenue 331,839; operating income 155,237; operating margin 46.7808%
  - FY2025: revenue 281,724; operating income 128,528; operating margin 45.6220%
  - FY2024: revenue 245,122; operating income 109,433; operating margin 44.6443%
  - Three-year average operating margin: 45.6824%
- Formula/calculation: Operating margin = operating income ÷ revenue for each fiscal year; three-year average of the three margins; the §10.1 Standard-profile band is then set by the ratio of that average to the industry operating margin from the external reference dataset. The company-side inputs above are complete. The applicable industry reference could not be selected because Microsoft's January 2026 Damodaran company-to-industry mapping could not be directly verified (see Flag/Note), so the ratio and band are not computed.
- Source: Microsoft FY2026 Form 10-K, Income Statements, filed July 29, 2026 (company-side figures). Industry reference: Damodaran published industry data (January 2026 operating margin table and company-to-industry lookup).
- Source period/date: FY2024–FY2026 (fiscal years ended June 30); 10-K filed 2026-07-29. Damodaran industry-mapping lookup attempts documented on 2026-09-26.
- Scoring-round as-of date: 2026-09-25 market close
- Band (1–5): none assigned
- Flag/Note: Marked `unobserved` because the slot's industry side could not be established, not because the company's own numbers are missing or weak. The methodology requires the three-year average operating margin to be compared with the operating margin for the company's Damodaran industry. Damodaran publishes a company-to-industry lookup, but Microsoft's January 2026 company-level row could not be directly established from the accessible sources after documented attempts on 2026-09-26. The official January 2026 margin table shows Software (System & Application) at 32.98%, and secondary evidence strongly corroborates that Microsoft has historically been classified there, but the exact January 2026 mapping was not directly verified. Therefore no band is assigned under the current rules. Context only, not a scored result: had Software (System & Application) been the confirmed industry, the ratio would be 45.6824% / 32.98% = 1.3852, which falls in the 1.15–1.50 range (Band 4 under §10.1). This is not the recorded Profitability result, and this slot is not scored.

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
- State:
- Raw metric/value:
- Formula/calculation:
- Source:
- Source period/date:
- Scoring-round as-of date:
- Band (1–5):
- Flag/Note:

### Slot: Growth Persistence
- State:
- Raw metric/value:
- Formula/calculation:
- Source:
- Source period/date:
- Scoring-round as-of date:
- Band (1–5):
- Flag/Note:

### Slot: Growth-Driver Durability (qualitative)
- State:
- Source(s) reviewed:
- Source period/date:
- Scoring-round as-of date:
- Evidence:
- Counter-evidence:
- Breadth and durability:
- Falsification statement ("this band is wrong if ___"):
- Band (1–5):
- Flag/Note:

---

## Valuation (20%)

### Slot: Primary Multiple vs. External Industry Reference
- State:
- Raw metric/value:
- Formula/calculation:
- Source:
- Source period/date:
- Scoring-round as-of date:
- Band (1–5):
- Flag/Note:

### Slot: Same Multiple vs. Own History
- State:
- Raw metric/value:
- Formula/calculation:
- Source:
- Source period/date:
- Scoring-round as-of date:
- Band (1–5):
- Flag/Note:

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
