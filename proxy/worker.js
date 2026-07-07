/* =============================================================================
   worker.js  —  Cloudflare Worker: a small, secure proxy for stock quotes.

   Why this exists:
   GitHub Pages can only serve static files, so it cannot keep an API key
   secret. This Worker sits between the website and Finnhub. The website calls
   the Worker; the Worker adds the FINNHUB_API_KEY (stored as a Worker secret)
   and calls Finnhub. The key never reaches the browser or the public repo.

   It also:
   - only allows the 15 tickers this project uses (so it can't be turned into an
     open forwarding endpoint),
   - returns clear JSON errors,
   - caches each symbol briefly at the edge to stay well within rate limits,
   - restricts which website origins may call it.
============================================================================= */

/* The only symbols this proxy will look up. */
const ALLOWED_SYMBOLS = new Set([
  'AAPL', 'MSFT', 'JNJ', 'PG', 'JPM', 'KO', 'WMT', 'V', 'BRK-B', 'NEE',
  'NVDA', 'PLTR', 'SMCI', 'IONQ', 'CELH'
]);

/* A few tickers use a different symbol format on Finnhub than on the site. */
const FINNHUB_SYMBOL = { 'BRK-B': 'BRK.B' };

/* Which browser origins may call this proxy.
   GitHub Pages sends only the origin (no repository path), so the live site
   https://giandegruccio.github.io/Stock-Website/ uses the origin below. */
const ALLOWED_ORIGINS = new Set([
  'https://giandegruccio.github.io',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://localhost:3000',
]);

const CACHE_SECONDS = 45;

function isAllowedOrigin(origin) {
  return Boolean(origin && ALLOWED_ORIGINS.has(origin));
}

function corsHeaders(origin) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
  if (origin && isAllowedOrigin(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function jsonResponse(body, status, origin, extraHeaders) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, corsHeaders(origin), extraHeaders || {});
  return new Response(JSON.stringify(body), { status: status, headers: headers });
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin');
    const url = new URL(request.url);

    // CORS preflight.
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'GET') {
      return jsonResponse({ error: 'Method not allowed. Use GET.' }, 405, origin);
    }
    // Block browser calls from origins that aren't on the allow-list.
    // (Requests with no Origin header — e.g. curl — are allowed for testing.)
    if (!isAllowedOrigin(origin)) {
      return jsonResponse({ error: 'This origin is not allowed to use the proxy.' }, 403, origin);
    }

    const path = url.pathname.replace(/\/+$/, '');

    // ---- /quote?symbol=XXXX -------------------------------------------------
    if (path.endsWith('/quote')) {
      const symbol = (url.searchParams.get('symbol') || '').toUpperCase().trim();
      if (!symbol) return jsonResponse({ error: 'Missing "symbol" query parameter.' }, 400, origin);
      if (!ALLOWED_SYMBOLS.has(symbol)) {
        return jsonResponse({ error: 'Symbol "' + symbol + '" is not on the allowed list.' }, 400, origin);
      }
      if (!env.FINNHUB_API_KEY) {
        return jsonResponse({ error: 'Server is missing FINNHUB_API_KEY. See the README setup steps.' }, 500, origin);
      }

      // Try the edge cache first.
      const cache = caches.default;
      const cacheKey = new Request('https://cache.local/quote/' + symbol, { method: 'GET' });
      const cached = await cache.match(cacheKey);
      if (cached) {
        const cachedBody = await cached.text();
        return new Response(cachedBody, {
          status: 200,
          headers: Object.assign({ 'Content-Type': 'application/json', 'X-Cache': 'HIT' }, corsHeaders(origin)),
        });
      }

      // Ask Finnhub.
      const finnhubSymbol = FINNHUB_SYMBOL[symbol] || symbol;
      let upstream;
      try {
        upstream = await fetch('https://finnhub.io/api/v1/quote?symbol=' + encodeURIComponent(finnhubSymbol) + '&token=' + env.FINNHUB_API_KEY);
      } catch (e) {
        return jsonResponse({ error: 'Could not reach the market-data provider.' }, 502, origin);
      }
      if (!upstream.ok) {
        return jsonResponse({ error: 'Market-data provider returned status ' + upstream.status + '.' }, 502, origin);
      }

      let q;
      try { q = await upstream.json(); }
      catch (e) { return jsonResponse({ error: 'Market-data provider sent an unreadable response.' }, 502, origin); }

      if (typeof q.c !== 'number' || q.c <= 0 || typeof q.pc !== 'number' || q.pc <= 0) {
        return jsonResponse({ error: 'Complete price data is not available for "' + symbol + '" right now.' }, 404, origin);
      }

      const payload = { symbol: symbol, c: q.c, d: q.d, dp: q.dp, pc: q.pc, t: q.t };
      const bodyStr = JSON.stringify(payload);

      // Store in the edge cache with a short TTL.
      const toCache = new Response(bodyStr, {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'max-age=' + CACHE_SECONDS },
      });
      ctx.waitUntil(cache.put(cacheKey, toCache.clone()));

      return new Response(bodyStr, {
        status: 200,
        headers: Object.assign({ 'Content-Type': 'application/json', 'X-Cache': 'MISS' }, corsHeaders(origin)),
      });
    }

    // ---- Anything else ------------------------------------------------------
    return jsonResponse({ error: 'Not found. Try /quote?symbol=AAPL' }, 404, origin);
  },
};
