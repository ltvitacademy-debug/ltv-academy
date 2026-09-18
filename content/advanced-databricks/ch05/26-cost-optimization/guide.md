# Lesson 26 — Cost Optimization

**Chapter 5 · Performance at Scale · Lesson 26 of 34**

## What you'll learn

- Spot/preemptible instances for job clusters — real savings, real trade-off
- Auto-termination for idle all-purpose clusters — the most-forgotten lever
- Right-sizing instead of over-provisioning "just in case"
- Chapter 5 close: everything from Photon to sizing, aimed at one dollar figure

## Spot instances — for job clusters, not interactive ones

```json
{
  "aws_attributes": {
    "availability": "SPOT_WITH_FALLBACK",
    "first_on_demand": 1
  }
}
```

Spot (AWS) / preemptible (GCP) / low-priority (Azure) instances run
at a steep discount versus on-demand pricing, in exchange for the
cloud provider being able to reclaim them with little notice. For a
**job cluster** running a fault-tolerant batch pipeline, Databricks
automatically retries lost tasks on a new node if a spot instance
gets reclaimed — a real discount with a real, but usually acceptable,
risk. For an **all-purpose cluster** someone is actively working in
right now, that same reclamation interrupts a live session — the
same discount, a much less acceptable trade.

## Auto-termination — the most-forgotten lever

```text
All-purpose cluster, auto-termination: 30 minutes

A developer opens a notebook at 9am, steps away for a meeting
at 10am, and never comes back to it that day. Without
auto-termination: that cluster bills for the rest of the day,
running nothing.
```

This is the single most commonly missed cost control on
Databricks. Every all-purpose cluster should have an
auto-termination window set — the cost of an idle cluster nobody's
using is pure waste, and it's waste that accumulates silently
across every developer, every day, unless it's configured by
default rather than left to habit.

## Right-sizing instead of "just in case"

```text
"Just in case" instinct:  pick a large instance type, oversized
                            for the typical job, so it's "safe"

Right-sizing:  size for the workload SHAPE measured in Lesson 25
                (shuffle-heavy vs. scan-heavy), with autoscaling
                min/max bounds set around REAL observed load --
                not a guess padded for comfort
```

Over-provisioning "just in case" is the same instinct Lesson 25
already argued against from a performance angle — it's also a cost
mistake, because a cluster running 3x the size a job actually needs
doesn't run 3x faster (Lesson 25's skew case is the extreme version
of this), it just costs 3x more for the same result.

## The three levers together

```text
1. Job clusters, fault-tolerant workload -> spot instances
2. All-purpose clusters -> auto-termination, always configured
3. Any cluster -> right-sized to the measured workload shape,
   not padded "to be safe"
```

None of these three requires giving anything up in correctness or
reliability — they're genuinely free savings, available to any
workload that's already been sized and understood the way Lessons
22-25 covered.

## Chapter 5 complete

Chapter 5, Performance at Scale, is done: Photon's vectorized
engine (22), AQE's runtime re-optimization (23), the two caching
layers and when they pay off (24), sizing by workload shape (25),
and now turning all of that into real cost control (26). Next,
Chapter 6, **Advanced Security & Governance**, picks up where
Chapter 1's Unity Catalog work left off — row/column security at
scale, Delta Sharing, secrets, and compliance.

## Key terms

| Term | Meaning |
|---|---|
| Spot / preemptible instance | Discounted compute the cloud provider can reclaim — safe for fault-tolerant job clusters |
| Auto-termination | Shutting down an idle all-purpose cluster after a configured window of inactivity |
| Right-sizing | Sizing to the measured workload, not padding "just in case" |

## Check yourself

You're ready for Chapter 6 when you can explain, without looking: why
is a spot instance a reasonable choice for a job cluster but a risky
one for an all-purpose cluster someone is actively using?
