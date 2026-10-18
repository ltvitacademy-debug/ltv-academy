# Capacity Planning and Forecasting AI Workloads

Lesson 2 set a cost and latency budget for Northbeam's current traffic. This lesson asks the next question a Staff/Principal engineer owns: current traffic isn't the traffic that matters — *future* traffic is, and infrastructure built to exactly fit today's load is already behind by the time it ships. Capacity planning is projecting growth forward and making sure the infrastructure decision happens with enough lead time, not in a panic after a ceiling is already hit.

## What you'll learn

- Why planning for current load, not projected load, is one of the most common infrastructure mistakes
- A worked forecast: when Northbeam's growth will hit its current infrastructure's ceiling
- Why lead time, not the ceiling date itself, is the number that actually matters
- The real tradeoff in capacity planning: over-provisioning cost vs. under-provisioning risk

## Projecting growth, not just measuring today

Northbeam's assistant is currently handling 2,000,000 requests a day (Lesson 2's number) and growing at a steady 15% month-over-month as more internal teams and customers adopt it. Its current infrastructure — the combination of vector database tier, model API rate limits, and application servers — was sized to comfortably handle up to 5,000,000 requests a day. Projecting that growth rate forward:

```python
requests = 2_000_000
growth_rate = 0.15          # 15% month-over-month
capacity_ceiling = 5_000_000

month_hit_ceiling = None
for month in range(1, 13):
    requests *= (1 + growth_rate)
    if requests >= capacity_ceiling and month_hit_ceiling is None:
        month_hit_ceiling = month

print(f"Projected to hit the capacity ceiling at month: {month_hit_ceiling}")
```

```
month 1 : 2,300,000
month 2 : 2,645,000
month 3 : 3,041,750
month 4 : 3,498,012
month 5 : 4,022,714
month 6 : 4,626,122
month 7 : 5,320,040
...
Projected to hit the capacity ceiling at month: 7
```

Seven months from today, at the current growth rate, Northbeam's existing infrastructure runs out of headroom. That's a very different, much more useful fact than "we're currently at 2 million requests and comfortable" — the comfortable-sounding current state is not the number that should drive the infrastructure roadmap.

## Lead time is the number that actually matters

Knowing "month 7" isn't itself the actionable number — **how long the fix takes to actually implement** is. If migrating to a higher-capacity vector database tier, renegotiating API rate limits with a provider, or re-architecting a bottlenecked component takes 3 months of real engineering work, that work needs to *start* by month 4, not month 7. A capacity plan that only tracks "when do we run out" and not "how much lead time does the fix need" reliably produces last-minute scrambles even when the forecasting itself was accurate — the forecast was right, but it arrived too late to act on comfortably.

## The real tradeoff: over-provisioning cost vs. under-provisioning risk

Capacity planning isn't just "always build more headroom" — extra infrastructure capacity has a real, ongoing cost, so the actual decision is a tradeoff: how much headroom is worth paying for, against how much risk of a capacity-driven outage is tolerable. A system supporting a single internal tool might reasonably tolerate occasional, brief degraded performance under unexpected load, accepting slightly tighter margins to control cost. A system that's part of a paid customer-facing product, where an outage directly costs revenue and trust, usually justifies far more conservative headroom, even at meaningfully higher ongoing cost. There's no universal right answer — the correct amount of headroom is a business decision informed by engineering facts (the forecast, the lead time needed, the cost per unit of headroom), which is exactly why this is Staff/Principal-level work: it requires combining real technical understanding with a judgment call about acceptable business risk, not just running the forecast.

## Key terms

| Term | Meaning |
|---|---|
| Capacity ceiling | The maximum load current infrastructure can handle before degrading or failing |
| Lead time | How long a capacity fix takes to actually implement, which determines when work must start, not when the ceiling is hit |
| Over-provisioning | Building more infrastructure headroom than currently needed, at a real ongoing cost |

## Check yourself

Why is "we project hitting our capacity ceiling at month 7" not, by itself, enough information to know when a fix needs to start?
