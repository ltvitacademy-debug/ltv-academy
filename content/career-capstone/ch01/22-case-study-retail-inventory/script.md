# Lesson 22 — Case Study: A Retail Inventory Data Platform · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Case study: a retail inventory data platform — where two genuinely
different computations justify Lambda architecture's extra cost.

## S2 · CODE CARD (two processing models)

A restock trigger needs a simple running total per SKU per store,
under five minutes stale. Nightly merchandising needs full
reconciliation against shipments, returns, and shrinkage — a
materially different computation, not the same logic replayed.

## S3 · CODE CARD (Lambda actually fits)

Speed layer keeps a running on-hand total for the trigger. Batch
layer reconciles everything overnight for merchandising. This is the
honest counter-example to Kappa: not every platform reduces to one
replayable codepath.

## S4 · CODE CARD (shared tenancy, one schema, two tiers)

Corporate merchandising needs to roll up inventory across every
store, which rules out siloed tenancy. One fact table, FactInventory
Movement, feeds a near-real-time rollup for the trigger and a nightly
reconciled view for reports — same shape, two SLAs.

## S5 · OUTRO CARD

The schema doesn't change between consumers — only which
materialized view of it they read. Next up: a social media analytics
pipeline.
