# Lesson 21 — Choosing RPC & Infra Providers for Production

**Chapter 4 · Hosting the Off-Chain Stack · Lesson 21 of 29**

## What you'll learn

- What production RPC usage actually exposes that a free-tier dev key never does
- The difference between a full node and an archive node, and when each one is required
- How to configure a client so a single provider's outage doesn't become your outage
- Why running your own node is a deliberate operational commitment, not a free upgrade

## The key from Lesson 20 points somewhere real

`RPC_URL` and `ALCHEMY_API_KEY` aren't abstract configuration -- they point at a specific provider's infrastructure, and that choice shapes how the whole off-chain stack behaves under real load. A dev free tier hides almost everything that matters here; it's only at production traffic that the real tradeoffs show up.

## What actually matters at production load

- **Compute units / rate limits.** Every provider meters usage differently, and a dev key's generous free allowance says nothing about what a sustained production load costs or how it throttles.
- **Uptime SLA.** A contractual, enforceable number -- not a marketing page's "99.9% uptime" claim with no commitment behind it.
- **Geographic latency.** Where a provider's edge nodes physically sit relative to your users changes real response times, especially for a frontend making frequent reads.

## Full node vs. archive node

Not every request needs the same kind of node behind it:

- A **full node** holds recent chain state -- enough for most reads, and for sending transactions. It's cheaper and faster to run.
- An **archive node** holds the entire historical state back to genesis. That's not optional for the fork testing Chapter 1, Lesson 4 covered (forking mainnet at a specific historical block needs that state to exist), and it's not optional for an indexer backfilling events from before it started running.

Picking a provider tier that doesn't actually offer archive access, then discovering that mid-project, is an avoidable mistake -- check this before committing.

## Don't trust a single provider

```
const provider = new ethers.FallbackProvider([
  { provider: alchemy, priority: 1 },
  { provider: infura, priority: 2 },
], 1);
// Falls through automatically if the primary
// provider is slow, rate-limited, or down.
```

A production client configured against only one provider inherits that provider's every outage as its own. A fallback configuration tries a primary provider and automatically moves to a backup if it's slow, rate-limited, or unresponsive -- the same redundancy instinct that led Chapter 5 (coming up next) to alert on-chain anomalies rather than assume everything's fine by default.

## Managed vs. self-hosted

Running your own node means full control and no third-party rate limits -- and it means patching, monitoring, and 24/7 uptime become your team's responsibility, not someone else's. For most teams, a managed provider (Alchemy, Infura, QuickNode, and similar) is the right default: it trades a monthly bill for someone else solving a problem you'd otherwise own yourself. Self-hosting is a deliberate choice for teams with a specific reason, not a free upgrade everyone should reach for.

## Key terms

| Term | Meaning |
|---|---|
| Compute units | A provider's metered usage unit for RPC requests -- the real limit a dev free tier doesn't expose |
| Archive node | A node retaining full historical chain state, required for fork testing at a specific block or backfilling old events |
| Fallback provider | A client configuration that automatically switches to a backup RPC provider if the primary is slow or down |

## Check yourself

You're ready for Chapter 5 when you can explain: why would a provider tier without archive node access silently break Chapter 1's fork-testing approach, and what problem does a fallback provider configuration actually solve?
