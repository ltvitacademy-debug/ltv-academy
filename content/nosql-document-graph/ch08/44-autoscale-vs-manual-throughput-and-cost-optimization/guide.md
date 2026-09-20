# Autoscale vs. Manual Throughput & Cost Optimization

Provisioning throughput in Cosmos DB has a real parallel to capacity planning in SQL Server — pick
too little and requests get throttled; pick too much and you're paying for headroom nobody uses.
Cosmos DB gives you two provisioning models for request units (RU/s), and choosing the right one
per workload is one of the most direct cost levers a DBA has on this platform.

## What you'll learn

- The real difference between manual (standard) provisioned throughput and autoscale
- How autoscale's floor-and-ceiling model actually works and how it's billed
- Practical guidance for choosing between them, plus other real cost optimization levers

## Manual provisioned throughput

With **manual throughput**, you set a fixed RU/s value yourself — say, 800 RU/s on a container.
That's exactly what's provisioned and billed, regardless of actual usage. If traffic exceeds it,
requests get throttled with a 429 (Too Many Requests) response until the next second's RU budget
resets. Manual throughput is the right fit for workloads with steady, predictable, well-understood
usage, where you can right-size confidently and don't want to pay autoscale's premium.

## Autoscale throughput

**Autoscale** lets you set a maximum RU/s, and Cosmos DB automatically and near-instantly scales
actual throughput between that maximum and a floor of 10% of it, based on real-time usage — no
manual intervention, no throttling during a legitimate spike within that range.

```bash
# Create a container with autoscale, max 4000 RU/s (floor: 400 RU/s)
az cosmosdb sql container create \
  --account-name my-cosmos-account \
  --resource-group my-rg \
  --database-name RetailDB \
  --name Orders \
  --partition-key-path "/customerId" \
  --max-throughput 4000
```

Billing for autoscale is based on the **highest RU/s the system scaled to during each hour**, not
the configured maximum — a quiet hour with light traffic is billed near the floor, even though the
ceiling is set much higher. This makes autoscale a genuinely good fit for variable or unpredictable
workloads: dev/test environments, new applications without established traffic patterns, or
anything with real spikes (flash sales, batch jobs) that would otherwise need manual throughput
provisioned for peak load year-round.

## Choosing, and other real cost levers

As a rule of thumb: steady, predictable, well-understood traffic favors manual throughput, often
at a lower cost than autoscale's per-RU premium; variable, spiky, or not-yet-understood traffic
favors autoscale, trading a small premium for not over-provisioning for the worst case. Beyond the
throughput model itself, real cost optimization also means tuning the indexing policy to exclude
unqueried paths (an earlier lesson in this chapter's parent chapter), choosing an appropriately
narrow partition key so RU/s isn't wasted on a poorly distributed hot partition, and using
point reads instead of cross-partition queries wherever the access pattern allows it.

## Key terms

| Term | Meaning |
|---|---|
| Manual (standard) throughput | A fixed RU/s value you set and are billed for, regardless of actual usage |
| Autoscale throughput | RU/s that automatically scales between a floor (10% of max) and a configured maximum |
| 429 (throttling) | The response Cosmos DB returns when a request exceeds the currently available RU/s |
| RU/s | Request units per second — the throughput currency Cosmos DB provisions and bills in |

## Check yourself

A dev/test container with unpredictable, spiky traffic is provisioned with a fixed 4000 RU/s to
cover its worst-case load. What does this lesson say is the better-fit throughput model for this
workload, and why?
