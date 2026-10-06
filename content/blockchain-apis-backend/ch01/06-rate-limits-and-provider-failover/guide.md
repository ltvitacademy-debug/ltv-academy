# Lesson 6 — Rate Limits & Provider Failover

**Chapter 1 · Talking to the Chain · Lesson 6 of 24**

## What you'll learn

- Why every node provider caps how fast you can call it, and what the real numbers look like
- What actually happens to your code when you hit a rate limit
- How to retry with backoff instead of hammering a provider that's already saying no
- Why production backends talk to more than one provider at once

## Rate limits are real, published numbers

Every provider's free and paid tiers come with a hard ceiling —
requests per second, and often a daily credit budget too. These
aren't vague "fair use" policies; they're published, specific limits:

![Alchemy's pricing page, showing real published rate limits per tier: 25 requests/second (Free), starting from 300 requests/second (Pay as You Go), starting from 1000 requests/second (Enterprise).](/courses/blockchain-apis-backend/ch01/06-rate-limits-and-provider-failover/alchemy-pricing.jpg)

![Infura's pricing page, showing real published limits: Core (free) at 3 million credits/day and 500 credits/second, Developer ($50/month) at 15 million credits/day and 4K credits/second.](/courses/blockchain-apis-backend/ch01/06-rate-limits-and-provider-failover/infura-pricing.jpg)

A busy event listener (Chapter 2) or an indexing backfill (Chapter 3)
can burn through a per-second limit in a hurry if it's not careful —
and when it does, the provider doesn't queue the extra requests for
you. It rejects them.

## What hitting the limit actually looks like

A rate-limited request comes back as an HTTP `429 Too Many Requests`
(or a JSON-RPC error with a similar code, depending on the
provider). The fix is never to retry instantly in a loop — that just
makes the problem worse. The standard pattern is **exponential
backoff**: wait a little, then a lot more if it fails again.

```js
async function callWithBackoff(fn, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (err.code !== 429 && !/rate limit/i.test(err.message)) throw err;
      const delay = 2 ** attempt * 250; // 250ms, 500ms, 1s, 2s, 4s...
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Exceeded retries after repeated rate limiting");
}
```

## Why a provider's own uptime matters too

Rate limits aren't the only reason a single provider isn't enough —
providers have real incidents, same as any hosted service:

![Alchemy's public status page, showing per-network "All Systems Operational" health checks across dozens of chains.](/courses/blockchain-apis-backend/ch01/06-rate-limits-and-provider-failover/alchemy-status-page.jpg)

When a provider is degraded or down, every request through it fails
— not just the ones over a rate limit. A backend with a single hard
dependency on one provider has a single point of failure.

## Failover: talking to more than one provider

Both libraries support configuring multiple RPC endpoints with
automatic failover between them:

```js
// ethers v6 — FallbackProvider
const provider = new ethers.FallbackProvider([
  { provider: new ethers.JsonRpcProvider(ALCHEMY_URL), priority: 1, weight: 1 },
  { provider: new ethers.JsonRpcProvider(INFURA_URL), priority: 2, weight: 1 },
]);
```

```ts
// viem — fallback transport
import { createPublicClient, fallback, http } from "viem";

const client = createPublicClient({
  chain: mainnet,
  transport: fallback(
    [http(ALCHEMY_URL), http(INFURA_URL)],
    { rank: true } // auto-ranks by live latency & stability
  ),
});
```

If the first endpoint is slow, erroring, or rate-limited, the request
automatically moves to the next one. This is the same idea chainlist
.org's RPC list (Lesson 2) made visible — there's never just one node
willing to answer you, and production code should take advantage of
that.

## Key terms

| Term | Meaning |
|---|---|
| Rate limit | A published cap on requests per second and/or credits per day |
| `429` | The HTTP status (or equivalent error) a provider returns when you exceed it |
| Exponential backoff | Retrying with a growing delay instead of hammering a failing request |
| Failover | Automatically routing requests to a backup provider when the primary fails |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what
should your code do the instant it sees a 429, and why does a
production backend typically configure more than one RPC endpoint?
