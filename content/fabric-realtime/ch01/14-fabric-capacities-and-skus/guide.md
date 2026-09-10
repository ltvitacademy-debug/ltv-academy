# Lesson 14 — Fabric Capacities and SKUs

**Chapter 1 · Microsoft Fabric · Lesson 14 of 70**

## What you'll learn

- Capacity Units (CUs) — the real currency every Fabric engine spends
- F-SKUs — the actual pricing tiers, and what scales with them
- Bursting and smoothing — why a heavy job doesn't necessarily need a bigger SKU
- The genuine parallel to Databricks & Delta Lake's cluster sizing

## Capacity Units — the real currency

Recall Lesson 1's preview: a capacity is a managed pool of compute
every Fabric engine draws from. That pool is measured in **Capacity
Units (CUs)** — a single number representing available compute,
spent by whichever engine is actively working: a Spark notebook
run, a Warehouse query, an Eventstream (Chapter 2). Every engine
shares the same pool; there's no separate compute budget per item
type.

## F-SKUs — the real tiers

```
F2   -- smallest, 2 CUs
F64  -- a common mid-tier size
F256 -- large
...
```

An **F-SKU** (F2, F64, F256, and so on) is simply a fixed number of
CUs, purchased as one unit. This is Fabric's actual answer to
Databricks & Delta Lake Lesson 4's VM-size-and-worker-count
decision — except the number describes the whole capacity's
compute budget, not one cluster's configuration, and it's chosen
once per capacity rather than per cluster.

## Bursting and smoothing

Fabric allows temporary **bursting** — a job can briefly use more
CUs than the capacity nominally provides, borrowing against future
capacity — and **smoothing**, spreading a job's real cost out over
time rather than charging a spike all at once. This means a heavy,
occasional job (this course's own monthly NYC Taxi ingestion,
say) doesn't automatically require permanently buying a bigger
SKU — the actual sizing decision depends on sustained, average
load, not worst-case peaks.

## The genuine parallel to Databricks & Delta Lake

Databricks & Delta Lake Lesson 5 distinguished all-purpose from job
clusters partly on cost — a job cluster's entire lifetime is one
run, priced accordingly. Fabric's capacity model makes a similar
cost-awareness point at a different level: the capacity itself is
the fixed cost, and bursting/smoothing exist specifically so
occasional heavy work doesn't force you to permanently pay for
peak-load-sized compute, all the time.

## Key terms

| Term | Meaning |
|---|---|
| Capacity Unit (CU) | The real unit of compute every Fabric engine spends from a shared pool |
| F-SKU | A fixed CU budget, purchased as one capacity-level unit |
| Bursting / smoothing | Temporary over-use, and spreading real cost out, so peaks don't force oversizing |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
doesn't an occasional heavy job automatically require buying a
larger F-SKU?
