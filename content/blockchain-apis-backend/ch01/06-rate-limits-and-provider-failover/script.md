# Script — Rate Limits & Provider Failover

## Segment 1 (title)

Every provider's tier comes with a hard ceiling — requests per second, often a daily credit budget too. These aren't vague fair-use policies, they're published, specific numbers.

## Segment 2 (screenshot: Alchemy pricing)

Alchemy's free tier: 25 requests a second. Pay as you go starts at 300. A busy event listener or an indexing backfill can burn through that in a hurry if it's not careful.

## Segment 3 (screenshot: Infura pricing)

Infura's free Core plan: 3 million credits a day, 500 credits a second. The Developer plan triples the daily budget and raises the per-second ceiling to 4,000. When you go over, the provider doesn't queue your extra requests — it rejects them.

## Segment 4 (code: backoff)

A rate-limited request comes back as a 429. Retrying instantly in a loop just makes it worse. The fix is exponential backoff — wait a little, then a lot more if it fails again.

## Segment 5 (screenshot: Alchemy status page)

Rate limits aren't the only reason one provider isn't enough — providers have real incidents, same as any hosted service. When a provider is down, every request through it fails, not just the ones over a limit.

## Segment 6 (code: failover)

Both ethers.js and viem let you configure more than one RPC endpoint with automatic failover — if the first is slow or erroring, the request moves to the next one.

## Segment 7 (outro)

Next up: Chapter 2, and listening for events instead of just reading and sending.
