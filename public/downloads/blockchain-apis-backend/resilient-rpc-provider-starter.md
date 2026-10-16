# Resilient RPC Provider & Retry Starter

A drop-in starting point for the one piece of infrastructure almost every
lesson in Chapter 1 depends on: a provider connection that doesn't fall
over the first time a node provider hiccups or rate-limits you. Pulls
together Lesson 2 (RPC providers), Lesson 5 (nonce handling), and Lesson 6
(rate limits & failover) into one file you can actually import.

## 1. The failover provider (ethers.js v6)

```js
// provider.js
import { ethers } from "ethers";

const ALCHEMY_URL = process.env.ALCHEMY_RPC_URL;
const INFURA_URL = process.env.INFURA_RPC_URL;

// Two independent node providers, so a single provider's rate limit or
// outage doesn't take your backend down with it (Lesson 6).
export const provider = new ethers.FallbackProvider([
  { provider: new ethers.JsonRpcProvider(ALCHEMY_URL), priority: 1, weight: 1 },
  { provider: new ethers.JsonRpcProvider(INFURA_URL), priority: 2, weight: 1 },
]);
```

## 2. The same thing in viem

```ts
// provider.ts
import { createPublicClient, fallback, http } from "viem";
import { mainnet } from "viem/chains";

export const client = createPublicClient({
  chain: mainnet,
  transport: fallback(
    [http(process.env.ALCHEMY_RPC_URL), http(process.env.INFURA_RPC_URL)],
    { rank: true } // auto-ranks by live latency & stability
  ),
});
```

## 3. Exponential backoff wrapper, for anything that still hits a 429

`FallbackProvider`/`fallback()` moves you to the *next* endpoint when one
fails — it doesn't slow down a request that's simply being rate-limited
across the board. Wrap any individual RPC call in this when you're doing
something bursty (a backfill, a batch of balance checks):

```js
// withBackoff.js
export async function callWithBackoff(fn, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isRateLimited = err.code === 429 || /rate limit/i.test(err.message ?? "");
      if (!isRateLimited) throw err;
      const delay = 2 ** attempt * 250; // 250ms, 500ms, 1s, 2s, 4s...
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Exceeded retries after repeated rate limiting");
}

// Usage:
// const balance = await callWithBackoff(() => provider.getBalance(address));
```

## 4. A self-incrementing nonce tracker, for a backend that sends more than one tx per account

Querying `getTransactionCount(address, "pending")` on every send works for
occasional sends, but two sends racing each other can still fetch the same
nonce (Lesson 5). A backend that regularly sends from one hot wallet should
track its own next nonce in memory instead:

```js
// nonceTracker.js
export function createNonceTracker(provider, address) {
  let nextNonce = null;

  return async function getNextNonce() {
    if (nextNonce === null) {
      nextNonce = await provider.getTransactionCount(address, "pending");
    } else {
      nextNonce += 1;
    }
    return nextNonce;
  };
}

// Usage:
// const getNextNonce = createNonceTracker(provider, wallet.address);
// const tx = await wallet.sendTransaction({ to, value, nonce: await getNextNonce() });
```

## Where to take this next

- Point `ALCHEMY_RPC_URL` / `INFURA_RPC_URL` at real endpoints from your own
  Alchemy/Infura dashboards (Lesson 2) — never commit them; load from
  environment variables, same as any other secret this course has handled.
- The Worked Example Library's *Production Price-Triggered Alert Service*
  and *Resilient Transfer-Event Listener* both build directly on this file
  — `provider` from Part 1 is exactly what both of them import first.
- If you need this on more than two providers, add more entries to the
  `FallbackProvider` array or the `fallback()` transport list — the pattern
  doesn't change with more endpoints, just more entries.
