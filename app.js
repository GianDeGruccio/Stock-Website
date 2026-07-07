/* =============================================================================
   app.js  —  All interactive behavior. Loads AFTER data.js.

   Runs entirely in the browser. The only network calls go to your own
   serverless proxy (API_BASE_URL) for live prices. Nothing about the Model Lab
   or the quiz is stored or transmitted; the only thing saved locally is your
   dark/light theme choice, which is not personal information.

   There is NO random financial data anywhere in this file. The old sparkline
   (which generated a fake price series from random values) has been removed and
   replaced with an honest bar that shows only today's percentage move.
============================================================================= */

/* =============================================================================
   1. Configuration
   -----------------------------------------------------------------------------
   After you deploy the serverless proxy (see README.md), paste its URL below,
   e.g. 'https://finance-quote-proxy.your-subdomain.workers.dev'.
   Leave it as '' and the site still works — prices simply show as unavailable.
============================================================================= */
const API_BASE_URL = '';

/* =============================================================================
   2. Small helpers
============================================================================= */
function $(id) { return document.getElementById(id); }

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

/* Turn a ticker like "BRK-B" into a safe id fragment like "BRK_B". */
function safeId(ticker) { return ticker.replace(/[^A-Za-z0-9]/g, '_'); }

function fmtMoney(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* =============================================================================
   3. Live-price state
============================================================================= */
const prices = {};        // { TICKER: { c, d, dp, pc, t } }
let dataState = 'idle';   // 'idle' | 'loading' | 'ok' | 'partial' | 'stale' | 'unavailable'
let lastUpdated = null;   // Date of last successful update

/* =============================================================================
   4. Theme (dark / light) with a small, non-personal local preference
============================================================================= */
function applyTheme(theme) { document.documentElement.setAttribute('data-theme', theme); }

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('gdg-theme', next); } catch (e) { /* private mode: ignore */ }
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('gdg-theme'); } catch (e) { /* ignore */ }
  if (saved === 'light' || saved === 'dark') applyTheme(saved);
}

/* =============================================================================
   5. Section navigation + mobile menu
============================================================================= */
function showSection(id) {
  const target = $('sec-' + id);
  if (!target) return;
  document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
  target.classList.add('active');

  document.querySelectorAll('[data-section]').forEach(function (btn) {
    const on = btn.dataset.section === id;
    btn.classList.toggle('active', on);
    if (on) btn.setAttribute('aria-current', 'page'); else btn.removeAttribute('aria-current');
  });

  const hero = $('hero-band');
  if (hero) hero.style.display = (id === 'watchlist') ? '' : 'none';

  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function openMobileMenu() {
  const menu = $('mobile-menu'), toggle = $('menu-toggle');
  if (!menu || !toggle) return;
  menu.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
}

function closeMobileMenu() {
  const menu = $('mobile-menu'), toggle = $('menu-toggle');
  if (!menu || !toggle || !menu.classList.contains('open')) return;
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}

function toggleMobileMenu() {
  const menu = $('mobile-menu');
  if (!menu) return;
  if (menu.classList.contains('open')) closeMobileMenu(); else openMobileMenu();
}

function initMobileMenu() {
  const toggle = $('menu-toggle');
  if (toggle) toggle.addEventListener('click', toggleMobileMenu);

  // Escape closes the menu and returns focus to the toggle.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const menu = $('mobile-menu');
      if (menu && menu.classList.contains('open')) { closeMobileMenu(); if (toggle) toggle.focus(); }
    }
  });

  // Clicking outside the menu closes it.
  document.addEventListener('click', function (e) {
    const menu = $('mobile-menu');
    if (!menu || !menu.classList.contains('open')) return;
    if (menu.contains(e.target) || (toggle && toggle.contains(e.target))) return;
    closeMobileMenu();
  });

  // Growing back to desktop width closes the mobile menu.
  window.addEventListener('resize', function () { if (window.innerWidth > 880) closeMobileMenu(); });
}

/* =============================================================================
   6. Watchlist cards
============================================================================= */
function buildCard(company, tier, index) {
  const id = safeId(company.ticker);
  const score = baseScore(company);
  const grade = getGrade(score);

  const el = document.createElement('div');
  el.className = 'card ' + tier;
  el.dataset.tier = tier;
  el.dataset.sector = company.sector;
  el.id = 'card-' + id;
  el.style.animationDelay = (index * 0.04).toFixed(2) + 's'; // deterministic stagger (no randomness)

  el.innerHTML =
    '<div class="score-badge grade-' + grade + '" title="Model grade ' + grade + '" aria-label="Model grade ' + grade + '">' + grade + '</div>' +
    '<div class="ctop">' +
      '<div class="cmeta">' +
        '<div class="csym">' + company.ticker + '</div>' +
        '<div class="cname">' + escapeHTML(company.name) + '</div>' +
        '<span class="ctag">' + escapeHTML(company.sector) + '</span>' +
      '</div>' +
      '<div class="cprice">' +
        '<div class="cpval loading" id="price-' + id + '">Loading…</div>' +
        '<div class="cpchg flat" id="chg-' + id + '"></div>' +
      '</div>' +
    '</div>' +
    '<div class="daybar">' +
      '<div class="daybar-track"><span class="daybar-zero"></span><span class="daybar-fill" id="barfill-' + id + '"></span></div>' +
      '<div class="daybar-cap"><span>Today\u2019s move</span><b id="barlbl-' + id + '">—</b></div>' +
    '</div>' +
    '<p class="thesis-txt">' + escapeHTML(company.thesis) + '</p>' +
    '<div class="stat-row">' +
      '<div class="schip">Beta<b>' + company.beta + '</b></div>' +
      '<div class="schip">P/E<b>' + company.pe + '</b></div>' +
      '<div class="schip">Score<b>' + score + '/100</b></div>' +
    '</div>' +
    '<div class="risk-row">' +
      '<span class="rl">Risk level</span>' +
      '<div class="rtrack"><div class="rfill" style="width:' + company.risk + '%"></div></div>' +
      '<span class="rl">' + company.risk + '/100</span>' +
    '</div>';
  return el;
}

/* Honest daily-change bar: fills from the center, right for up and left for
   down, scaled so a move of DAYBAR_CAP percent (or more) fills the half-bar.
   It represents ONLY today's move — never a price history. */
const DAYBAR_CAP = 5;
function renderDayBar(id, dp) {
  const fill = $('barfill-' + id), label = $('barlbl-' + id);
  if (!fill || !label) return;

  if (dp === null || dp === undefined || isNaN(dp)) {
    fill.style.width = '0'; fill.style.left = '50%'; fill.className = 'daybar-fill';
    label.textContent = '—'; label.className = '';
    return;
  }
  const magnitude = Math.min(Math.abs(dp), DAYBAR_CAP) / DAYBAR_CAP * 50; // 0..50 (% of track)
  if (dp >= 0) {
    fill.style.left = '50%'; fill.style.width = magnitude + '%'; fill.className = 'daybar-fill up';
  } else {
    fill.style.left = (50 - magnitude) + '%'; fill.style.width = magnitude + '%'; fill.className = 'daybar-fill down';
  }
  label.textContent = (dp >= 0 ? '+' : '') + dp.toFixed(2) + '%';
  label.className = dp >= 0 ? 'up' : 'down';
}

function setCardUnavailable(id) {
  const priceEl = $('price-' + id), chgEl = $('chg-' + id);
  if (priceEl) { priceEl.textContent = 'No data'; priceEl.className = 'cpval na'; }
  if (chgEl) { chgEl.textContent = ''; chgEl.className = 'cpchg flat'; }
  renderDayBar(id, null);
}

/* =============================================================================
   7. Score table (sortable + keyboard accessible)
============================================================================= */
function buildScoreTable(sortKey, asc) {
  sortKey = sortKey || 'score';
  asc = asc || false;

  const rows = ALL.map(function (s) {
    const score = baseScore(s);
    return { ticker: s.ticker, name: s.name, scores: s.scores, score: score, grade: getGrade(score), rating: getRating(score) };
  });

  rows.sort(function (a, b) {
    let av, bv;
    if (sortKey === 'sym') { av = a.ticker; bv = b.ticker; }
    else if (sortKey === 'score' || sortKey === 'grade' || sortKey === 'rating') { av = a.score; bv = b.score; }
    else { av = a.scores[sortKey]; bv = b.scores[sortKey]; }
    if (typeof av === 'string') return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    return asc ? av - bv : bv - av;
  });

  const tbody = $('score-tbody');
  if (!tbody) return;
  tbody.innerHTML = rows.map(function (r) {
    return '<tr>' +
      '<td><div class="td-sym">' + r.ticker + '</div><div class="td-name">' + escapeHTML(r.name) + '</div></td>' +
      '<td><div class="td-bar"><span class="td-score">' + r.score + '</span><div class="td-bar-track"><div class="td-bar-fill" style="width:' + r.score + '%"></div></div></div></td>' +
      '<td><span class="td-grade grade-' + r.grade + '" style="background:' + gradeDim(r.grade) + ';color:' + gradeColor(r.grade) + '">' + r.grade + '</span></td>' +
      '<td><div class="mini-scores"><span class="ms"><b>' + r.scores.fin + '</b></span></div></td>' +
      '<td><div class="mini-scores"><span class="ms"><b>' + r.scores.growth + '</b></span></div></td>' +
      '<td><div class="mini-scores"><span class="ms"><b>' + r.scores.val + '</b></span></div></td>' +
      '<td><div class="mini-scores"><span class="ms"><b>' + r.scores.risk + '</b></span></div></td>' +
      '<td><div class="mini-scores"><span class="ms"><b>' + r.scores.moat + '</b></span></div></td>' +
      '<td><span class="td-rating ' + r.rating.cls + '">' + r.rating.label + '</span></td>' +
    '</tr>';
  }).join('');
}

let sortAsc = false, lastSort = 'score';
function initScoreTableSort() {
  document.querySelectorAll('#score-table thead th').forEach(function (th) {
    th.setAttribute('tabindex', '0');
    th.setAttribute('role', 'button');
    function doSort() {
      const key = th.dataset.sort;
      if (key === lastSort) sortAsc = !sortAsc; else sortAsc = false;
      lastSort = key;
      document.querySelectorAll('#score-table thead th').forEach(function (h) { h.classList.remove('sorted'); });
      th.classList.add('sorted');
      buildScoreTable(key, sortAsc);
    }
    th.addEventListener('click', doSort);
    th.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doSort(); }
    });
  });
}

/* =============================================================================
   8. Fetching live prices through the proxy (with honest fallback states)
============================================================================= */
async function fetchQuote(ticker) {
  const base = API_BASE_URL.replace(/\/+$/, '');
  const res = await fetch(base + '/quote?symbol=' + encodeURIComponent(ticker));
  if (!res.ok) {
    let message = 'status ' + res.status;
    try { const err = await res.json(); if (err && err.error) message = err.error; } catch (e) { /* ignore */ }
    throw new Error(message);
  }
  return res.json();
}

async function updateCard(company) {
  const id = safeId(company.ticker);
  const priceEl = $('price-' + id), chgEl = $('chg-' + id);
  try {
    const d = await fetchQuote(company.ticker);
    if (typeof d.c !== 'number' || d.c === 0) throw new Error('no price');
    const chg = typeof d.d === 'number' ? d.d : 0;
    const chgPct = typeof d.dp === 'number' ? d.dp : 0;
    prices[company.ticker] = { c: d.c, d: chg, dp: chgPct, pc: d.pc, t: d.t };

    if (priceEl) { priceEl.textContent = fmtMoney(d.c); priceEl.className = 'cpval'; }
    if (chgEl) {
      const sign = chg >= 0 ? '+' : '';
      chgEl.textContent = sign + chg.toFixed(2) + ' (' + sign + chgPct.toFixed(2) + '%)';
      chgEl.className = 'cpchg ' + (chg >= 0 ? 'up' : 'down');
    }
    renderDayBar(id, chgPct);
    return true;
  } catch (err) {
    // Keep any previous price we already had; otherwise show an unavailable state.
    if (!prices[company.ticker]) setCardUnavailable(id);
    return false;
  }
}

async function loadAllPrices() {
  const btn = $('rfbtn'), note = $('refresh-note');

  // No proxy configured: skip the network entirely, show a clear state.
  if (!API_BASE_URL) {
    dataState = 'unavailable';
    ALL.forEach(function (s) { setCardUnavailable(safeId(s.ticker)); });
    updateKPIs(); updateSim(); updateTicker(); updateDataStatus();
    return;
  }

  dataState = 'loading';
  updateDataStatus();
  if (btn) { btn.disabled = true; btn.textContent = '↻ Loading…'; }
  if (note) note.textContent = 'Requesting prices…';

  let ok = 0, fail = 0;
  for (let i = 0; i < ALL.length; i++) {
    const good = await updateCard(ALL[i]);
    good ? ok++ : fail++;
    if (i < ALL.length - 1) await new Promise(function (r) { setTimeout(r, 180); }); // gentle on rate limits
  }

  if (ok > 0 && fail === 0) { lastUpdated = new Date(); dataState = 'ok'; }
  else if (ok > 0) { lastUpdated = new Date(); dataState = 'partial'; }
  else { dataState = lastUpdated ? 'stale' : 'unavailable'; }

  updateKPIs(); updateSim(); updateTicker(); updateDataStatus(ok, fail);
  if (btn) { btn.disabled = false; btn.textContent = '↻ Refresh prices'; }
  if (note) note.textContent = '';
}

/* Show the right banner + "Market Data" KPI text for the current state. */
function updateDataStatus(ok, fail) {
  const banner = $('data-banner'), kvu = $('kv-upd'), kvusub = $('kv-upd-sub');
  const timeStr = lastUpdated ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  let message = '';

  if (dataState === 'loading') {
    if (kvu) kvu.textContent = '…'; if (kvusub) kvusub.textContent = 'loading';
  } else if (dataState === 'unavailable' && !API_BASE_URL) {
    message = "Live market data isn\u2019t configured yet. Prices and the daily snapshot need the small data proxy described in the README — every other part of the site works without it.";
    if (kvu) kvu.textContent = 'Not set'; if (kvusub) kvusub.textContent = 'configure proxy';
  } else if (dataState === 'unavailable') {
    message = "Live market data is currently unavailable. The site still works; prices will appear once the data provider responds. Try Refresh in a moment.";
    if (kvu) kvu.textContent = 'Unavailable'; if (kvusub) kvusub.textContent = 'no response';
  } else if (dataState === 'stale') {
    message = "Couldn\u2019t refresh live prices just now. Showing the last values" + (timeStr ? (' from ' + timeStr) : '') + '.';
    if (kvu) kvu.textContent = timeStr || '—'; if (kvusub) kvusub.textContent = 'stale — retry';
  } else if (dataState === 'partial') {
    message = 'Some symbols couldn\u2019t be updated (' + (fail || 0) + ' of 15). Showing the latest available prices' + (timeStr ? (' from ' + timeStr) : '') + '.';
    if (kvu) kvu.textContent = timeStr || '—'; if (kvusub) kvusub.textContent = 'partial data';
  } else if (dataState === 'ok') {
    if (kvu) kvu.textContent = timeStr || '—'; if (kvusub) kvusub.textContent = 'updated';
  }

  if (banner) {
    if (message) { banner.textContent = message; banner.hidden = false; }
    else { banner.hidden = true; banner.textContent = ''; }
  }
}

/* =============================================================================
   9. Hero KPIs
============================================================================= */
function updateKPIs() {
  // Top model score comes from static data, so it is always available.
  const top = ALL.slice().sort(function (a, b) { return baseScore(b) - baseScore(a); })[0];
  const kvtop = $('kv-top');
  if (kvtop) kvtop.textContent = top.ticker + ' · ' + baseScore(top) + '/100';

  const kvt = $('kv-total'), kvp = $('kv-pnl'), kvg = $('kv-gain');
  const have = ALL.filter(function (s) { return prices[s.ticker]; }).length;
  if (have !== ALL.length) {
    if (kvt) kvt.textContent = '—';
    if (kvp) { kvp.textContent = '—'; kvp.className = 'kv'; }
    if (kvg) kvg.textContent = '—';
    return;
  }

  const per = 10000 / 15;
  let totalValue = 0, base = 0, gainers = 0;
  ALL.forEach(function (s) {
    const p = prices[s.ticker];
    if (!p) return;
    const shares = per / p.pc;
    totalValue += shares * p.c;
    base += per;
    if (p.d > 0) gainers++;
  });

  const pnl = totalValue - base, pct = base > 0 ? (pnl / base * 100) : 0;
  if (kvt) kvt.textContent = fmtMoney(totalValue);
  if (kvp) {
    kvp.textContent = (pnl >= 0 ? '+' : '-') + fmtMoney(Math.abs(pnl)) + ' (' + (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%)';
    kvp.className = 'kv ' + (pnl >= 0 ? 'up' : 'down');
  }
  if (kvg) kvg.textContent = gainers + ' / 15';
}

/* =============================================================================
   10. Daily equal-weight portfolio snapshot (was the "simulator")
============================================================================= */
function updateSim() {
  const slider = $('sim-slider');
  if (!slider) return;
  const cap = parseInt(slider.value, 10);
  const amt = $('sim-amt');
  if (amt) amt.textContent = '$' + cap.toLocaleString();

  const per = cap / 15;
  const grid = $('sim-grid');
  if (!grid) return;

  let totalValue = 0, base = 0;
  const have = ALL.filter(function (s) { return prices[s.ticker]; }).length;

  grid.innerHTML = ALL.map(function (s) {
    const p = prices[s.ticker];
    let valStr = '—', cls = 'flat';
    if (p) {
      const shares = per / p.pc;
      const val = shares * p.c;
      totalValue += val; base += per;
      const dpc = (p.c - p.pc) / p.pc * 100;
      cls = dpc > 0 ? 'up' : (dpc < 0 ? 'down' : 'flat');
      valStr = fmtMoney(val);
    }
    return '<div class="sim-row"><div><div class="sr-sym">' + s.ticker + '</div>' +
           '<div class="sr-alloc">$' + per.toFixed(0) + '</div></div>' +
           '<div class="sr-val ' + cls + '">' + valStr + '</div></div>';
  }).join('');

  const stv = $('st-val'), stp = $('st-pnl'), str = $('st-ret');
  if (have !== ALL.length) {
    if (stv) { stv.textContent = '—'; stv.className = 'st-val'; }
    if (stp) {
      stp.textContent = have === 0
        ? 'Live prices are needed to calculate the snapshot.'
        : have + ' of 15 prices loaded; all 15 are required for an honest total.';
      stp.className = 'st-pnl';
    }
    if (str) { str.textContent = '—'; str.className = 'st-val'; }
    return;
  }

  const pnl = totalValue - base, ret = base > 0 ? (pnl / base * 100) : 0;
  if (stv) { stv.textContent = fmtMoney(totalValue); stv.className = 'st-val ' + (pnl >= 0 ? 'up' : 'down'); }
  if (stp) { stp.textContent = (pnl >= 0 ? '+' : '-') + fmtMoney(Math.abs(pnl)) + ' today'; stp.className = 'st-pnl ' + (pnl >= 0 ? 'up' : 'down'); }
  if (str) { str.textContent = (ret >= 0 ? '+' : '') + ret.toFixed(3) + '%'; str.className = 'st-val ' + (ret >= 0 ? 'up' : 'down'); }
}

/* =============================================================================
   11. Scrolling ticker
============================================================================= */
function updateTicker() {
  const items = ALL.map(function (s) {
    const p = prices[s.ticker];
    const price = p ? fmtMoney(p.c) : '—';
    const chg = p ? ((p.d >= 0 ? '+' : '') + p.dp.toFixed(2) + '%') : '';
    const cls = p ? (p.d >= 0 ? 'up' : 'down') : 'flat';
    return '<span class="ti"><span class="ts">' + s.ticker + '</span><span class="tp">' + price + '</span><span class="tc ' + cls + '">' + chg + '</span></span>';
  }).join('');
  const track = $('ticker-track');
  if (track) track.innerHTML = items + items; // duplicated for a seamless loop
}

/* =============================================================================
   12. Watchlist filters
============================================================================= */
function initFilters() {
  document.querySelectorAll('.fb').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.fb').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      const f = btn.dataset.filter;
      document.querySelectorAll('.card').forEach(function (c) {
        const show = f === 'all' || c.dataset.tier === f || c.dataset.sector === f;
        c.style.display = show ? '' : 'none';
      });
    });
  });
}

/* =============================================================================
   13. U.S. market status (time-based, works without live data)
============================================================================= */
function checkMarket() {
  const et = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const day = et.getDay(), hour = et.getHours() + et.getMinutes() / 60;
  const open = day >= 1 && day <= 5 && hour >= 9.5 && hour < 16;
  const dot = $('sdot'), txt = $('stxt');
  if (dot) dot.className = 'sdot' + (open ? '' : ' closed');
  if (txt) txt.textContent = open ? 'Market Open' : 'Market Closed';
}

/* =============================================================================
   14. Scoring-model page: factor guide, bands, revision log
============================================================================= */
function renderFactorGuide() {
  const el = $('factor-guide');
  if (!el) return;
  el.innerHTML = FACTOR_GUIDE.map(function (f) {
    return '<div class="factor-item">' +
      '<div class="factor-head"><span class="fh-name">' + escapeHTML(f.name) + '</span><span class="fh-weight">' + f.weight + '% weight</span></div>' +
      '<p class="fmean">' + escapeHTML(f.meaning) + '</p>' +
      '<div class="factor-sub">Indicators I consider</div>' +
      '<div class="chip-set">' + f.indicators.map(function (i) { return '<span>' + escapeHTML(i) + '</span>'; }).join('') + '</div>' +
      '<div class="factor-sub">Roughly how I split scores</div>' +
      '<div class="band-row"><span class="bl hi">High</span><span>' + escapeHTML(f.high) + '</span></div>' +
      '<div class="band-row"><span class="bl mid">Medium</span><span>' + escapeHTML(f.mid) + '</span></div>' +
      '<div class="band-row"><span class="bl lo">Low</span><span>' + escapeHTML(f.low) + '</span></div>' +
      '<p class="fsubj"><em>Subjective part:</em> ' + escapeHTML(f.subjective) + '</p>' +
    '</div>';
  }).join('');
}

function renderScoreBands() {
  const el = $('score-bands');
  if (!el) return;
  el.innerHTML = SCORE_BANDS.map(function (b) {
    return '<div class="band-row"><span class="bl">' + b.range + '</span><span>' + escapeHTML(b.text) + '</span></div>';
  }).join('');
}

function renderRevisionLog() {
  const el = $('revision-log');
  if (!el) return;
  el.innerHTML = REVISION_LOG.map(function (r) {
    return '<li><div class="tl-when">' + escapeHTML(r.when) + '</div><div class="tl-text">' + escapeHTML(r.text) + '</div></li>';
  }).join('');
}

/* =============================================================================
   15. Model Lab
============================================================================= */
const FACTOR_KEYS = [['fin', 'Financial Strength'], ['growth', 'Growth'], ['val', 'Valuation'], ['risk', 'Risk'], ['moat', 'Moat']];
const mlWeights = Object.assign({}, DEFAULT_WEIGHTS);

function mlTotal() { return mlWeights.fin + mlWeights.growth + mlWeights.val + mlWeights.risk + mlWeights.moat; }

function renderMLWeights() {
  const total = mlTotal();
  FACTOR_KEYS.forEach(function (pair) {
    const k = pair[0], val = mlWeights[k];
    const valEl = $('wv-' + k), effEl = $('we-' + k), slider = $('w-' + k);
    if (valEl) valEl.textContent = val;
    if (slider && parseInt(slider.value, 10) !== val) slider.value = val;
    const eff = total > 0 ? Math.round(val / total * 100) : 0;
    if (slider) slider.setAttribute('aria-valuetext', val + ' (contributes ' + eff + ' percent of the score)');
    if (effEl) effEl.textContent = 'contributes ' + eff + '% of the score';
  });

  const totEl = $('ml-total'), msgEl = $('ml-total-msg');
  if (totEl) { totEl.textContent = 'Total: ' + total + '%'; totEl.className = 'lab-total ' + (total === 100 ? 'ok' : 'warn'); }
  if (msgEl) {
    msgEl.textContent = total === 100
      ? 'Weights total 100%. Each value equals its share of the score.'
      : 'Weights total ' + total + '%. Scores still use the relative sizes, so the ranking stays valid — “Normalize” makes them total 100%.';
  }
}

function renderMLRanking() {
  // Original ranking uses my default weights.
  const orig = ALL.map(function (s) { return { ticker: s.ticker, base: baseScore(s) }; });
  const origSorted = orig.slice().sort(function (a, b) { return (b.base - a.base) || a.ticker.localeCompare(b.ticker); });
  const origRank = {};
  origSorted.forEach(function (r, i) { origRank[r.ticker] = i + 1; });

  // Adjusted ranking uses the user's current weights.
  const adj = ALL.map(function (s) {
    return { ticker: s.ticker, name: s.name, base: baseScore(s), adj: weightedScore(s.scores, mlWeights) };
  });
  const adjSorted = adj.slice().sort(function (a, b) { return (b.adj - a.adj) || a.ticker.localeCompare(b.ticker); });

  const tbody = $('ml-rank-tbody');
  if (!tbody) return;
  tbody.innerHTML = adjSorted.map(function (r, i) {
    const rank = i + 1;
    const move = origRank[r.ticker] - rank;              // positive = moved up
    const dScore = r.adj - r.base;
    const moveCls = move > 0 ? 'up' : (move < 0 ? 'down' : 'same');
    const moveTxt = move > 0 ? ('▲ ' + move) : (move < 0 ? ('▼ ' + Math.abs(move)) : '–');
    const moveAria = move > 0 ? ('up ' + move + ' places') : (move < 0 ? ('down ' + Math.abs(move) + ' places') : 'no change');
    const dCls = dScore > 0 ? 'up' : (dScore < 0 ? 'down' : 'same');
    const dTxt = (dScore > 0 ? '+' : '') + dScore;
    const grade = getGrade(r.adj);
    return '<tr>' +
      '<td class="td-score">' + rank + '</td>' +
      '<td><div class="td-sym">' + r.ticker + '</div><div class="td-name">' + escapeHTML(r.name) + '</div></td>' +
      '<td class="td-score" style="color:var(--muted)">' + r.base + '</td>' +
      '<td><span class="td-grade grade-' + grade + '" style="background:' + gradeDim(grade) + ';color:' + gradeColor(grade) + '">' + r.adj + '</span></td>' +
      '<td><span class="delta ' + dCls + '">' + dTxt + '</span></td>' +
      '<td><span class="rank-move ' + moveCls + '" aria-label="' + moveAria + '">' + moveTxt + '</span></td>' +
    '</tr>';
  }).join('');
}

function initMLCompareSelects() {
  const a = $('cmp-a'), b = $('cmp-b');
  if (!a || !b) return;
  const opts = ALL.map(function (s) { return '<option value="' + s.ticker + '">' + s.ticker + ' — ' + escapeHTML(s.name) + '</option>'; }).join('');
  a.innerHTML = opts; b.innerHTML = opts;
  a.value = 'MSFT'; b.value = 'NVDA';
  a.addEventListener('change', renderMLCompare);
  b.addEventListener('change', renderMLCompare);
}

function renderMLCompare() {
  const aSel = $('cmp-a'), bSel = $('cmp-b');
  if (!aSel || !bSel) return;
  const A = ALL.find(function (s) { return s.ticker === aSel.value; });
  const B = ALL.find(function (s) { return s.ticker === bSel.value; });
  const tbody = $('cmp-tbody'), summary = $('cmp-summary'), thA = $('cmp-th-a'), thB = $('cmp-th-b');
  if (!A || !B || !tbody) return;
  if (thA) thA.textContent = A.ticker;
  if (thB) thB.textContent = B.ticker;

  const total = mlTotal();
  const rows = FACTOR_KEYS.map(function (pair) {
    const k = pair[0], label = pair[1];
    const eff = total > 0 ? mlWeights[k] / total : 0;
    const diff = A.scores[k] - B.scores[k];
    return { label: label, a: A.scores[k], b: B.scores[k], wdiff: eff * diff };
  });

  let maxIdx = 0;
  rows.forEach(function (r, i) { if (Math.abs(r.wdiff) > Math.abs(rows[maxIdx].wdiff)) maxIdx = i; });

  tbody.innerHTML = rows.map(function (r, i) {
    const gap = (r.wdiff >= 0 ? '+' : '') + r.wdiff.toFixed(1);
    const tag = (i === maxIdx && A.ticker !== B.ticker) ? '<span class="cmp-tag">biggest driver</span>' : '';
    const cls = (i === maxIdx && A.ticker !== B.ticker) ? 'cmp-max' : '';
    return '<tr class="' + cls + '">' +
      '<td>' + escapeHTML(r.label) + tag + '</td>' +
      '<td class="td-score">' + r.a + '</td>' +
      '<td class="td-score">' + r.b + '</td>' +
      '<td class="delta ' + (r.wdiff > 0 ? 'up' : (r.wdiff < 0 ? 'down' : 'same')) + '">' + gap + '</td>' +
    '</tr>';
  }).join('');

  if (summary) {
    if (A.ticker === B.ticker) {
      summary.innerHTML = 'Pick two <b>different</b> companies to compare.';
    } else {
      const aTot = weightedScore(A.scores, mlWeights), bTot = weightedScore(B.scores, mlWeights);
      const higher = aTot === bTot ? 'They score the same' : (aTot > bTot ? ('<b>' + A.ticker + '</b> scores higher') : ('<b>' + B.ticker + '</b> scores higher'));
      summary.innerHTML = 'Under your current weights, <b>' + A.ticker + '</b> scores <b>' + aTot + '</b> and <b>' + B.ticker + '</b> scores <b>' + bTot + '</b>. ' + higher +
        '. The factor with the largest weighted gap is <b>' + escapeHTML(rows[maxIdx].label) + '</b>.';
    }
  }
}

function initModelLab() {
  FACTOR_KEYS.forEach(function (pair) {
    const k = pair[0], slider = $('w-' + k);
    if (slider) slider.addEventListener('input', function () {
      mlWeights[k] = parseInt(slider.value, 10);
      renderMLWeights(); renderMLRanking(); renderMLCompare();
    });
  });

  const norm = $('ml-normalize'), reset = $('ml-reset');
  if (norm) norm.addEventListener('click', function () {
    const total = mlTotal();
    if (total <= 0) return; // nothing to normalize
    const rounded = FACTOR_KEYS.map(function (pair) {
      const k = pair[0];
      return { k: k, v: Math.round(mlWeights[k] / total * 100) };
    });
    // Fix any rounding drift by adjusting the largest weight so the total is exactly 100.
    let drift = 100 - rounded.reduce(function (sum, o) { return sum + o.v; }, 0);
    if (drift !== 0) {
      let idx = 0;
      rounded.forEach(function (o, i) { if (o.v > rounded[idx].v) idx = i; });
      rounded[idx].v += drift;
    }
    rounded.forEach(function (o) { mlWeights[o.k] = Math.max(0, Math.min(100, o.v)); });
    renderMLWeights(); renderMLRanking(); renderMLCompare();
  });
  if (reset) reset.addEventListener('click', function () {
    Object.assign(mlWeights, DEFAULT_WEIGHTS);
    renderMLWeights(); renderMLRanking(); renderMLCompare();
  });

  initMLCompareSelects();
  renderMLWeights(); renderMLRanking(); renderMLCompare();
}

/* =============================================================================
   16. Learn lessons + practice quiz (browser-only, no data leaves the page)
============================================================================= */
function renderLessons() {
  const el = $('learn-lessons');
  if (!el) return;
  el.innerHTML = LESSONS.map(function (l, i) {
    return '<div class="lesson">' +
      '<div class="l-num">Lesson ' + (i + 1) + ' of ' + LESSONS.length + '</div>' +
      '<h4>' + escapeHTML(l.title) + '</h4>' +
      '<dl>' +
        '<dt>What it means</dt><dd>' + escapeHTML(l.definition) + '</dd>' +
        '<dt>A simple example</dt><dd>' + escapeHTML(l.example) + '</dd>' +
        '<dt>A common misunderstanding</dt><dd>' + escapeHTML(l.misconception) + '</dd>' +
        '<dt>How it connects here</dt><dd class="connect">' + escapeHTML(l.connection) + '</dd>' +
      '</dl>' +
    '</div>';
  }).join('');
}

function renderQuiz() {
  const el = $('quiz-questions');
  if (!el) return;
  el.innerHTML = QUIZ.map(function (q, qi) {
    const opts = q.options.map(function (opt, oi) {
      return '<label class="q-opt" id="opt-' + qi + '-' + oi + '">' +
        '<input type="radio" name="q' + qi + '" value="' + oi + '"/>' +
        '<span>' + escapeHTML(opt) + '</span></label>';
    }).join('');
    return '<fieldset class="q-item">' +
      '<legend>' + (qi + 1) + '. ' + escapeHTML(q.q) + '</legend>' +
      opts +
      '<div class="q-explain" id="exp-' + qi + '" hidden></div>' +
    '</fieldset>';
  }).join('');
}

function checkQuiz() {
  let score = 0;
  QUIZ.forEach(function (q, qi) {
    q.options.forEach(function (_, oi) {
      const o = $('opt-' + qi + '-' + oi);
      if (o) o.classList.remove('correct', 'incorrect');
    });
    const chosen = document.querySelector('input[name="q' + qi + '"]:checked');
    const exp = $('exp-' + qi);
    const correctOpt = $('opt-' + qi + '-' + q.answer);
    if (correctOpt) correctOpt.classList.add('correct');

    if (chosen) {
      const val = parseInt(chosen.value, 10);
      if (val === q.answer) { score++; if (exp) exp.innerHTML = '<span class="ok">Correct.</span> ' + escapeHTML(q.explanation); }
      else {
        const wrong = $('opt-' + qi + '-' + val);
        if (wrong) wrong.classList.add('incorrect');
        if (exp) exp.innerHTML = '<span class="no">Not quite.</span> ' + escapeHTML(q.explanation);
      }
    } else {
      if (exp) exp.innerHTML = '<span class="no">No answer selected.</span> ' + escapeHTML(q.explanation);
    }
    if (exp) exp.hidden = false;
  });

  const scoreEl = $('quiz-score');
  if (scoreEl) { scoreEl.textContent = 'Score: ' + score + ' / ' + QUIZ.length; scoreEl.hidden = false; }
}

function initQuiz() {
  renderQuiz();
  const check = $('quiz-check'), retry = $('quiz-retry');
  if (check) check.addEventListener('click', checkQuiz);
  if (retry) retry.addEventListener('click', function () {
    renderQuiz();
    const s = $('quiz-score');
    if (s) { s.hidden = true; s.textContent = ''; }
  });
}

/* =============================================================================
   17. Init
============================================================================= */
function init() {
  initTheme();

  // Build watchlist cards.
  const coreGrid = $('core-grid'), growthGrid = $('growth-grid');
  if (coreGrid) coreGrid.append.apply(coreGrid, CORE.map(function (s, i) { return buildCard(s, 'core', i); }));
  if (growthGrid) growthGrid.append.apply(growthGrid, GROWTH.map(function (s, i) { return buildCard(s, 'growth', CORE.length + i); }));

  // Static, data-driven renders.
  buildScoreTable(); initScoreTableSort();
  renderFactorGuide(); renderScoreBands(); renderRevisionLog();
  renderLessons(); initQuiz();
  initModelLab();
  initFilters();
  initMobileMenu();

  // Navigation + controls.
  document.querySelectorAll('[data-section]').forEach(function (b) {
    b.addEventListener('click', function () { showSection(b.dataset.section); });
  });
  const themeBtn = $('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  const simSlider = $('sim-slider');
  if (simSlider) simSlider.addEventListener('input', updateSim);
  const refresh = $('rfbtn');
  if (refresh) refresh.addEventListener('click', loadAllPrices);

  // Market status + first data load.
  checkMarket();
  setInterval(checkMarket, 60000);
  updateKPIs();
  updateSim();
  updateTicker();
  loadAllPrices();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
