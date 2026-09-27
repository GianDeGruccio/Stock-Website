# Scoring Methodology v2 — Prototype Round

## Round status
- Status: In progress — the round's as-of date is frozen and MSFT's profile remains Standard. MSFT has all 13 slots completed: Financial Strength (Profitability 4, Cash Generation 5, Balance-Sheet Capacity 4), Growth (3-Year Growth 4, Growth Persistence 5, Growth-Driver Durability 5), Valuation (Primary Multiple vs Industry 5, Same Multiple vs Own History 3), Stability (Market Volatility 3, Concentration 4, Regulatory/Legal Exposure 3, Reporting/Governance Integrity 5), and Moat (4). All five factor coverage checks passed. MSFT factor scores: Financial Strength 76.6667, Growth 83.3333, Valuation 70.0000, Stability 65.0000, Moat 70.0000. MSFT composite: 74.25. NVDA, JPM, NEE, and IONQ have not begun scoring.
- Prototype companies (a small, deliberately varied group, tested before any full-watchlist rollout — see `PROJECT-STATE.md` Current Strategic Priorities): MSFT, NVDA, JPM, NEE, IONQ.

## As-of date (METHODOLOGY.md §8)
- Originally proposed: 2026-09-11 market close. This date was never frozen and was superseded before any v2 input collection or scoring began.
- Frozen: **2026-09-25 market close.** Frozen on 2026-09-26, before v2 input collection began.
- Rationale for the change: September 25 was the latest completed U.S. market session when the round actually began, making market-linked collection more contemporaneous and reducing reconstruction/retrieval-date mismatch. This change was made before any v2 result existed and was not based on any company's score.

## Profile assignment (METHODOLOGY.md §5)
| Ticker | Profile | Assignment basis | Partial-fit flag? |
|---|---|---|---|
| MSFT | Standard | Microsoft FY2026 Form 10-K, fiscal year ended June 30, 2026, filed July 29, 2026, accession 0001193125-26-323660. No banking regulatory-capital ratios were identified, and no ASC 980/regulatory-asset-or-liability disclosure was identified. Therefore neither specific §5 profile test is met. | No |
| NVDA | [ ] | | |
| JPM | [ ] | | |
| NEE | [ ] | | |
| IONQ | [ ] | | |

## Valuation preflight decisions
These decisions were recorded before any MSFT valuation multiple was computed, and before any share price was retrieved for the Valuation slots. They apply the committed v2.0 rules as written; they do not change `METHODOLOGY.md`.

1. **Standard positive-EPS multiple.** The primary multiple is trailing P/E = share price / TTM diluted GAAP EPS. For MSFT as of 2026-09-25, the latest filed TTM denominator is FY2026 diluted GAAP EPS of $17.95 from the FY2026 10-K.
2. **External industry P/E field.** For Standard-profile P/E comparisons under v2.0, use the Damodaran January 2026 `PE Ratio by Sector (US)` column named exactly `Trailing PE`. This is the literal operational interpretation of the already-committed §12.1 phrase "Industry trailing P/E". For Software (System & Application), that January 2026 value is `79.17`. The separate `Aggregate Mkt Cap/ Trailing Net Income (only money making firms)` field is not substituted. Whether that alternative would be analytically preferable is a prototype finding for possible v2.1 review after this round.
3. **Own-history denominator.** Each historical P/E denominator is that fiscal year's diluted GAAP EPS from that fiscal year's 10-K.
4. **Non-trading fiscal-year-end.** Under v2.0, a prior or subsequent trading-session close is not substituted for a fiscal-year-end date on which the market was closed. Such an exact-date observation is unavailable. MSFT FY2024 ended Sunday 2024-06-30, so that historical observation will not be used. FY2022, FY2023, FY2025, and FY2026 provide four available observations, meeting the §12.3 minimum-history requirement. The absence of an explicit non-trading-day convention is flagged as a prototype finding for possible v2.1, rather than changing v2.0 during the round.
5. **Price field.** Use the Yahoo Finance regular-session `Close`, not `Adjusted Close`. Historical prices used in P/E are not dividend-adjusted.
6. **Named price source.** Yahoo Finance is the named market-data source for all current and historical share prices in this round, consistent with its existing use for beta.
7. **Known valuation limitations retained.**
   - Own-history ratios pair fiscal-year-end prices with annual EPS that was filed after those year-end dates, creating a look-ahead/timing mismatch.
   - The January 2026 industry reference and the September 2026 company multiple have the timing mismatch already disclosed in §12.2.
   - Microsoft is included in its own Damodaran industry benchmark, so the benchmark is not independent of the company being compared. No numerical estimate of Microsoft's share of industry market cap is given here; one would need to be separately verified on a comparable basis.

No share price has been retrieved for the Valuation slots, no MSFT P/E has been calculated, and no Valuation band has been assigned as of this record.

## Per-company evidence files
- [MSFT.md](MSFT.md) — all 13 slot records completed; all five factor coverage checks passed; factor scores and composite (74.25) recorded in its Composite section.
- NVDA.md — not yet created; create from `TEMPLATE.md` when this company's prototype work begins.
- JPM.md — not yet created; create from `TEMPLATE.md` when this company's prototype work begins.
- NEE.md — not yet created; create from `TEMPLATE.md` when this company's prototype work begins.
- IONQ.md — not yet created; create from `TEMPLATE.md` when this company's prototype work begins.

## Format reference
See [TEMPLATE.md](TEMPLATE.md) for the blank record format every slot follows.
