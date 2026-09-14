# Lesson 22 — Case Study: A Retail Inventory Data Platform

**Chapter 1 · System Design for Data Engineers · Lesson 22 of 81**

## What you'll learn

- Why this platform genuinely needs two different processing models
- How Lambda architecture's two codepaths make sense here, unlike Lesson 20
- Why shared-schema multi-tenancy is required, not siloed
- How one star schema serves two very different freshness tiers

## Two consumers, two legitimate processing models

A retail chain has hundreds of stores across several regions, each
running point-of-sale (POS) systems. Two consumers need the same
underlying inventory-movement data at genuinely different freshness:

```
Functional:      trigger a restock alert when on-hand count for a
                 SKU drops below threshold; produce nightly
                 merchandising and demand-planning reports
Non-functional:  on-hand count for restock triggers must be
                 < 5 minutes stale; merchandising analytics can
                 be a full day stale (Lesson 18's SLA thinking)
```

## Why Lambda, not Kappa, actually fits here

Lesson 6's Lambda architecture earns its keep specifically when the
speed and batch layers need genuinely *different* logic — and that's
true here. The restock trigger only needs a simple running total per
SKU per store. The nightly merchandising job needs full historical
reconciliation against supplier shipments, returns, and shrinkage —
a materially different computation, not the same logic replayed:

```
Speed layer:  running on-hand total per SKU/store, updated per sale
              -- feeds the restock trigger within its 5-minute SLA
Batch layer:  full nightly reconciliation against shipments,
              returns, and shrinkage -- feeds merchandising reports
```

This is the honest counter-example to Lesson 20's Kappa pipeline: not
every platform reduces to one replayable codepath, and this is a case
where two real, different computations justify Lambda's extra cost.

## Multi-tenancy: shared, not siloed, by requirement

Lesson 17's tenancy models apply directly, and the requirement points
the opposite way from a compliance-driven siloed model. Corporate
merchandising needs to roll up inventory *across* every store and
region in one query — a use case the siloed model actively works
against. So this platform uses the shared model, with `store_id` and
`region_id` as the tenant keys, enforced the same way Lesson 17
described: a filter that can't be skipped for store-level users,
while corporate reporting deliberately queries across all of them.

## One star schema, two freshness tiers

Lesson 8's grain question: one row per SKU per store per inventory
movement (`FactInventoryMovement`), with `DimProduct`, `DimStore`,
`DimDate` around it — exactly the same shape whether it's serving the
5-minute restock trigger or the nightly report. What differs isn't
the schema, it's which *materialized view* of that fact table each
consumer reads:

```
FactInventoryMovement (one shape, two readers)
  |-- near-real-time rollup  --> restock trigger (< 5 min SLA)
  |-- nightly reconciled view --> merchandising reports (24h SLA)
```

## Key terms

| Term | Meaning |
|---|---|
| Lambda fit | Justified here because speed and batch logic are genuinely different |
| Shared tenancy by requirement | Cross-store rollups require the shared model, not siloed |
| Two-tier freshness | One fact table, two materialized views at two different SLAs |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
does this platform justify Lambda architecture's two codepaths, when
Lesson 20's ride-sharing platform didn't need them?
