/* =============================================================================
   data.js  —  All static data + pure scoring helpers for the project.

   IMPORTANT: This file must load BEFORE app.js (index.html loads it first).
   Nothing here touches the DOM or the network — it is only data and math,
   which keeps it easy to read and easy to reuse.

   Honesty notes:
   - Company factor scores below are MY OWN estimates. They are a learning
     exercise, not professional research.
   - Fundamental figures (beta, P/E) are approximate reference values checked
     against public sources and can change over time.
   - There is NO price data in this file and NO random price generation
     anywhere in the project.
============================================================================= */

/* ---- Default model weights (the version of the model I actually use) ------- */
const DEFAULT_WEIGHTS = { fin: 25, growth: 25, val: 20, risk: 15, moat: 15 };

/* ---- 10 established ("core") companies ------------------------------------ */
const CORE = [
  { ticker: 'AAPL', name: 'Apple Inc.',         sector: 'Technology',       beta: '0.81', pe: '31',   w52l: '164', w52h: '260', w52p: 72, risk: 30,
    scores: { fin: 88, growth: 75, val: 65, risk: 78, moat: 95 },
    thesis: "One of the largest companies by market value. Large cash reserves, a loyal customer base, and steady buybacks make it a relatively stable technology holding." },

  { ticker: 'MSFT', name: 'Microsoft Corp.',    sector: 'Technology',       beta: '1.10', pe: '22.6', w52l: '356', w52h: '555', w52p: 65, risk: 32,
    scores: { fin: 92, growth: 88, val: 75, risk: 75, moat: 95 },
    thesis: "Cloud growth through Azure plus widely used software. Recurring subscription revenue makes earnings more predictable, and Copilot adds an AI angle." },

  { ticker: 'JNJ',  name: 'Johnson & Johnson',  sector: 'Healthcare',       beta: '0.55', pe: '22',   w52l: '140', w52h: '170', w52p: 60, risk: 18,
    scores: { fin: 90, growth: 55, val: 72, risk: 92, moat: 85 },
    thesis: "Long history of raising its dividend. Pharma, medical technology, and consumer health diversify the business and add stability." },

  { ticker: 'PG',   name: 'Procter & Gamble',   sector: 'Consumer Staples', beta: '0.59', pe: '26',   w52l: '155', w52h: '183', w52p: 55, risk: 15,
    scores: { fin: 88, growth: 50, val: 68, risk: 94, moat: 90 },
    thesis: "Everyday brands like Tide, Pampers, and Gillette create steady demand. People keep buying these products through good times and bad." },

  { ticker: 'JPM',  name: 'JPMorgan Chase',     sector: 'Financials',       beta: '1.10', pe: '13',   w52l: '185', w52h: '285', w52p: 70, risk: 35,
    scores: { fin: 85, growth: 68, val: 82, risk: 72, moat: 88 },
    thesis: "One of the largest and most profitable U.S. banks. Spreading across retail banking, investment banking, and asset management lowers single-area risk." },

  { ticker: 'KO',   name: 'Coca-Cola Co.',      sector: 'Consumer Staples', beta: '0.35', pe: '25',   w52l: '65',  w52h: '84',  w52p: 50, risk: 14,
    scores: { fin: 85, growth: 45, val: 70, risk: 95, moat: 92 },
    thesis: "Long-time dividend grower with distribution in over 200 countries. The brand and global reach make it a more defensive holding." },

  { ticker: 'WMT',  name: 'Walmart Inc.',       sector: 'Consumer Staples', beta: '0.53', pe: '37',   w52l: '76',  w52h: '110', w52p: 80, risk: 20,
    scores: { fin: 82, growth: 65, val: 58, risk: 90, moat: 88 },
    thesis: "Discount retail tends to hold up in downturns as shoppers look for value. E-commerce and grocery pickup have added newer growth." },

  { ticker: 'V',    name: 'Visa Inc.',          sector: 'Financials',       beta: '0.95', pe: '32',   w52l: '270', w52h: '365', w52p: 68, risk: 28,
    scores: { fin: 95, growth: 72, val: 65, risk: 82, moat: 96 },
    thesis: "Visa does not lend money, it takes a small cut of transactions on its network. That makes it asset-light and tied to the shift away from cash." },

  { ticker: 'BRK-B', name: 'Berkshire Hathaway B', sector: 'Diversified',   beta: '0.90', pe: '21',   w52l: '400', w52h: '530', w52p: 75, risk: 25,
    scores: { fin: 94, growth: 58, val: 75, risk: 85, moat: 92 },
    thesis: "Owning Berkshire is like owning a diversified mix of insurance, stock holdings, and operating businesses in a single ticker." },

  { ticker: 'NEE',  name: 'NextEra Energy',     sector: 'Utilities',        beta: '0.58', pe: '20',   w52l: '62',  w52h: '92',  w52p: 45, risk: 22,
    scores: { fin: 78, growth: 62, val: 74, risk: 90, moat: 80 },
    thesis: "A large producer of wind and solar energy. Regulated utility income adds stability while renewables add a longer-term growth angle." },
];

/* ---- 5 higher-risk growth companies --------------------------------------- */
const GROWTH = [
  { ticker: 'NVDA', name: 'NVIDIA Corp.',          sector: 'Semiconductors',    beta: '2.20', pe: '32.3', w52l: '142', w52h: '237', w52p: 85, risk: 80,
    scores: { fin: 78, growth: 96, val: 42, risk: 45, moat: 90 },
    thesis: "Its chips are central to many AI systems, and demand has been very strong. A high valuation reflects big expectations from investors." },

  { ticker: 'PLTR', name: 'Palantir Technologies', sector: 'Data / AI',         beta: '2.50', pe: '180',  w52l: '18',  w52h: '125', w52p: 90, risk: 88,
    scores: { fin: 55, growth: 82, val: 22, risk: 35, moat: 78 },
    thesis: "Government and enterprise AI analytics that is gaining commercial customers. Very high valuation and volatile price make it a speculative pick." },

  { ticker: 'SMCI', name: 'Super Micro Computer',  sector: 'AI Infrastructure', beta: '1.95', pe: '18',   w52l: '18',  w52h: '120', w52p: 60, risk: 85,
    scores: { fin: 60, growth: 88, val: 68, risk: 40, moat: 62 },
    thesis: "Builds high-density servers for AI workloads, so it benefits from data-center spending. Volatile partly because of past accounting questions." },

  { ticker: 'IONQ', name: 'IonQ Inc.',             sector: 'Quantum Computing', beta: '2.10', pe: 'N/A',  w52l: '6',   w52h: '55',  w52p: 70, risk: 95,
    scores: { fin: 30, growth: 70, val: 28, risk: 25, moat: 72 },
    thesis: "A publicly traded quantum computing company. Still early and not yet profitable at scale, so it is highly speculative but potentially important." },

  { ticker: 'CELH', name: 'Celsius Holdings',      sector: 'Consumer / Bev.',   beta: '2.30', pe: '45',   w52l: '22',  w52h: '90',  w52p: 35, risk: 78,
    scores: { fin: 65, growth: 85, val: 50, risk: 42, moat: 70 },
    thesis: "A fast-growing energy drink brand competing with Monster and Red Bull. High beta reflects how uncertain fast growth in this space can be." },
];

/* All 15 companies in one array for convenience. */
const ALL = [...CORE, ...GROWTH];

/* =============================================================================
   Pure scoring math
============================================================================= */

/* Weighted-average score on a 0–100 scale for ANY set of weights.
   Dividing by the total weight keeps the score on 0–100 even if the weights
   do not add up to 100, so only the RELATIVE sizes of the weights matter.
   At the default weights (25/25/20/15/15) this equals the original model. */
function weightedScore(scores, weights) {
  const total = weights.fin + weights.growth + weights.val + weights.risk + weights.moat;
  if (total <= 0) return 0;
  const raw =
    scores.fin    * weights.fin +
    scores.growth * weights.growth +
    scores.val    * weights.val +
    scores.risk   * weights.risk +
    scores.moat   * weights.moat;
  return Math.round(raw / total);
}

/* The score under MY default model. */
function baseScore(company) {
  return weightedScore(company.scores, DEFAULT_WEIGHTS);
}

/* Letter grade from a score. */
function getGrade(score) {
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

/* "Model fit" label from a score (NOT a buy/sell call). */
function getRating(score) {
  if (score >= 75) return { label: 'Strong', cls: 'rat-strong' };
  if (score >= 55) return { label: 'Mixed',  cls: 'rat-mixed'  };
  return { label: 'Weak', cls: 'rat-weak' };
}

/* Small helper so grade colors stay consistent everywhere. */
function gradeColor(grade) {
  return grade === 'A' ? 'var(--green)'
       : grade === 'B' ? 'var(--blue)'
       : grade === 'C' ? 'var(--gold)'
       : 'var(--red)';
}
function gradeDim(grade) {
  return grade === 'A' ? 'var(--green-dim)'
       : grade === 'B' ? 'var(--blue-dim)'
       : grade === 'C' ? 'var(--gold-dim)'
       : 'var(--red-dim)';
}

/* =============================================================================
   Content for the "Scoring Model" page: how each factor is assigned
============================================================================= */
const FACTOR_GUIDE = [
  {
    key: 'fin', name: 'Financial Strength', weight: 25,
    meaning: "How solid the company's finances are: can it fund itself, survive a downturn, and keep investing without leaning too hard on debt.",
    indicators: ['Profitability and margins', 'Free cash flow', 'Balance-sheet strength', 'Debt relative to earnings', 'Consistency over several years'],
    high: "Consistently profitable, strong free cash flow, low or manageable debt, steady results across years.",
    mid: "Profitable but with some inconsistency, heavier debt, or thinner cash flow.",
    low: "Unprofitable or very inconsistent, weak cash flow, or a stretched balance sheet.",
    subjective: "How much to reward one strong year versus a longer track record, and what counts as manageable debt for a given business model.",
  },
  {
    key: 'growth', name: 'Growth', weight: 25,
    meaning: "How much the business is expanding, and whether that growth looks like it can last.",
    indicators: ['Revenue growth', 'Earnings growth', 'Room to expand into new markets', 'Durability of the growth driver'],
    high: "Strong, fairly consistent revenue and earnings growth with a large remaining market.",
    mid: "Moderate growth, or fast growth that looks less certain to continue.",
    low: "Flat or shrinking, or growth that seems temporary.",
    subjective: "Judging how durable a trend is (for example, AI demand) is a guess about the future, not a measured fact.",
  },
  {
    key: 'val', name: 'Valuation', weight: 20,
    meaning: "Whether the price looks reasonable for what you get: the business quality and the growth people expect.",
    indicators: ['P/E or a more suitable measure', 'Comparison with sector peers', 'How much growth is already priced in', 'How much uncertainty surrounds the estimate'],
    high: "Price looks reasonable relative to growth and to peers.",
    mid: "Not obviously cheap and not obviously expensive.",
    low: "Price seems to assume a lot of optimistic growth, leaving little room for disappointment.",
    subjective: "Reasonable depends on assumptions about the future, and different sectors trade in very different normal ranges.",
  },
  {
    key: 'risk', name: 'Risk', weight: 15,
    meaning: "How much uncertainty surrounds the company. A HIGHER score here means LOWER risk in my scale.",
    indicators: ['Volatility, including beta', 'Business or customer concentration', 'Debt', 'Regulatory exposure', 'Competitive pressure', 'Company-specific uncertainty'],
    high: "Stable demand, diversified business, low volatility, few obvious threats (lower risk).",
    mid: "Some concentration, moderate volatility, or one notable risk factor.",
    low: "Volatile, concentrated, heavily regulated, or facing serious competitive or accounting questions (higher risk).",
    subjective: "Weighing different kinds of risk against each other, and how well past volatility predicts future risk.",
  },
  {
    key: 'moat', name: 'Moat', weight: 15,
    meaning: "How well the company can protect its profits from competitors over time.",
    indicators: ['Brand', 'Switching costs', 'Network effects', 'Scale', 'Patents', 'Distribution reach', 'Customer loyalty'],
    high: "Clear, durable advantages that are hard to copy.",
    mid: "Some advantages, but they could erode.",
    low: "Little that stops competitors from taking share.",
    subjective: "Moats are one of the hardest things to judge; I am usually estimating how durable an advantage is, which is a judgment call.",
  },
];

/* Scoring bands used as a rough, self-made guide (not academically validated). */
const SCORE_BANDS = [
  { range: '80–100', text: "Particularly strong within the company's context." },
  { range: '60–79',  text: "Generally solid with meaningful limitations." },
  { range: '40–59',  text: "Mixed or uncertain." },
  { range: '20–39',  text: "Weak or highly uncertain." },
  { range: '0–19',   text: "Severe weakness, missing evidence, or extremely difficult to evaluate." },
];

/* =============================================================================
   "Learn" page content: five short beginner lessons + a five-question quiz
============================================================================= */
const LESSONS = [
  {
    id: 'market-cap',
    title: 'Market Capitalization',
    definition: "Market cap is the share price multiplied by the number of shares that exist. It is the market's price tag for the whole company, not how much cash the company has in the bank.",
    example: "A $50 stock with 1 billion shares is worth about $50 billion. A $500 stock with 10 million shares is worth about $5 billion, even though its share price is ten times higher.",
    misconception: "A higher share price does NOT mean a bigger or more expensive company. The share price on its own tells you almost nothing; you also need the number of shares.",
    connection: "On this site, AAPL is one of the largest companies by market cap, while IONQ is tiny by comparison. That size gap is part of why IONQ's price can swing so much: it takes less money to move a small company.",
  },
  {
    id: 'beta',
    title: 'Beta and What It Does Not Measure',
    definition: "Beta measures how much a stock has tended to move compared with the overall market. Around 1 means it moves with the market; above 1 amplifies the market's moves; below 1 moves less.",
    example: "KO has a beta near 0.35, so on a day the market falls 1%, KO has historically tended to fall less. NVDA's beta near 2.2 means it has tended to move much more than the market, in both directions.",
    misconception: "Beta is not a measure of how good, bad, or bankruptcy-prone a company is. It only describes past co-movement with the market, not business quality, debt, or the chance the company fails.",
    connection: "In my Week 2 journal, SMCI's large jump made more sense once I understood its high beta. Beta explained the size of the swing, not whether the underlying business was good.",
  },
  {
    id: 'pe',
    title: 'P/E Ratio and Valuation',
    definition: "The price-to-earnings ratio compares a stock's price with its earnings per share. Roughly, it is how much you pay for each $1 of current profit.",
    example: "A company earning $2 per share and trading at $40 has a P/E of 20. If a second company also earns $2 but trades at $60 (P/E 30), investors are paying more for the same current profit, usually because they expect faster growth.",
    misconception: "A low P/E is not automatically cheap or good, and a high P/E is not automatically expensive or bad. A low P/E can signal real trouble, and a high P/E can be reasonable if growth is strong. P/E only means something in context.",
    connection: "PLTR on my list has a very high P/E that reflects big growth expectations, while KO's P/E reflects steady, slower growth. Same kind of ratio, very different stories.",
  },
  {
    id: 'diversification',
    title: 'Diversification',
    definition: "Diversification means spreading money across different investments so no single one can sink the whole portfolio. It mainly reduces company-specific risk.",
    example: "If you owned only one stock and it fell 30%, your whole portfolio would fall 30%. Across 15 companies in different sectors, one bad stock has a much smaller effect on the total.",
    misconception: "Owning a lot of stocks does not automatically make you diversified. If they are all in the same sector, they can fall together. Diversification also reduces company-specific risk, not market-wide risk.",
    connection: "In my Week 3 journal, the portfolio held up while AAPL and MSFT were down because healthcare and smaller names offset them. That is diversification doing its job.",
  },
  {
    id: 'company-vs-price',
    title: 'Good Company vs. Good Price',
    definition: "A great business and a great investment are not the same thing. The price you pay is part of your return, no matter how good the company is.",
    example: "If a wonderful company is already priced for perfection, even good news might not push the stock higher, and any disappointment can hurt. A more ordinary company bought at a low price can sometimes do better from that starting point.",
    misconception: "It is not true that a great company is always a great buy at any price. Overpaying for a great company can still be a poor investment.",
    connection: "MSFT scores highest on my model, but in my research notes I flagged valuation as the main risk. A strong business can still be expensive relative to what people already expect.",
  },
];

const QUIZ = [
  {
    q: "Which best describes market capitalization?",
    options: [
      "The amount of cash a company keeps in the bank",
      "The share price multiplied by the number of shares outstanding",
      "The company's profit for the year",
      "The highest price the stock reached this year",
    ],
    answer: 1,
    explanation: "Market cap is price multiplied by shares outstanding: the market's price for the whole company, not its cash or its profit.",
  },
  {
    q: "A stock with a beta of about 2.0 most likely...",
    options: [
      "Cannot go bankrupt",
      "Always pays a high dividend",
      "Has tended to move about twice as much as the overall market",
      "Is guaranteed to rise over time",
    ],
    answer: 2,
    explanation: "Beta near 2 means the stock has historically moved roughly twice as much as the market, up or down. It says nothing about dividends or bankruptcy.",
  },
  {
    q: "A very high P/E ratio usually means...",
    options: [
      "The stock is always a bad buy",
      "Investors expect strong future growth, rightly or wrongly",
      "The company has no debt",
      "The company is guaranteed to grow",
    ],
    answer: 1,
    explanation: "A high P/E generally reflects high growth expectations. Whether those expectations are justified is the real question; it is not automatically good or bad.",
  },
  {
    q: "Which portfolio is the most diversified?",
    options: [
      "Ten different AI chip companies",
      "One large, stable company",
      "Companies spread across technology, healthcare, consumer staples, and financials",
      "Twenty stocks that all tend to move together",
    ],
    answer: 2,
    explanation: "Diversification comes from owning things that do not all move together. Many stocks in one sector still tend to rise and fall as a group.",
  },
  {
    q: "Why can a great company still be a poor investment?",
    options: [
      "Great companies never grow",
      "If you pay too high a price, strong expectations are already built in and returns can suffer",
      "Great companies always pay dividends",
      "A high stock price means the company is failing",
    ],
    answer: 1,
    explanation: "The price you pay matters. Overpaying for even an excellent company can lead to weak returns if it is already priced for perfection.",
  },
];

/* =============================================================================
   "Project Revision Log" content (only real, confirmed developments)
============================================================================= */
const REVISION_LOG = [
  { when: 'June 2026', text: "Initial 15-company watchlist and five-factor scoring model created." },
  { when: 'June 2026', text: "Research reports added for MSFT, NVDA, KO, and SMCI." },
  { when: 'June 2026', text: "Buy / Watch / Avoid terminology replaced with Strong / Mixed / Weak Model Fit." },
  { when: 'June 2026', text: "Model Limitations and Data Sources sections added." },
  { when: 'July 2026', text: "Weekly journal expanded through Week 4." },
  { when: 'July 2026', text: "Technical audit identified misleading sparklines, mobile-navigation limitations, API-key exposure, and daily-versus-cumulative portfolio confusion." },
  { when: 'July 2026', text: "Current update corrected those issues and added the Model Lab and the Learn section." },
];
