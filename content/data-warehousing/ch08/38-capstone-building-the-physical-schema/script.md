# Script — Capstone: Building the Physical Schema

## Segment 1 (title)

Everything Lesson 37 decided on paper gets turned into real T-SQL in this lesson — dimensions, the fact table, indexes, and partitioning.

## Segment 2 (code: DimVendor)

Start with DimVendor. It's the one dimension in this design that's SCD Type 2, so it carries the tracking columns Type 2 needs: EffectiveDate, ExpirationDate, and IsCurrent, alongside a plain identity surrogate key and the vendor's real business entity ID kept as an alternate key. Every other dimension in this design skips those three columns entirely, because they're Type 1 or Type 0 — this is what that distinction actually looks like in code.

## Segment 3 (code: FactPurchaseOrderLine)

The fact table pulls every decision from last lesson into one CREATE TABLE statement: surrogate foreign keys to each dimension, milestone date keys for order date and ship date, the purchase order's own identifying columns riding along as degenerate dimensions, and the measures — including received quantity, the one that updates as the line moves toward being fully received.

## Segment 4 (steps: indexing and partitioning)

Two more decisions round this out. A clustered columnstore index on the fact table, because this table gets scanned and aggregated far more than it gets looked up row by row — that's the standard choice for a large fact table. A supporting nonclustered index for queries that filter tightly by vendor and date. And partitioning by OrderDateKey, because that's both the column reporting queries filter on and the column that grows every time a new batch of purchase orders loads.

## Segment 5 (outro)

The design is now a real, buildable schema — six CREATE TABLE statements, two indexes, and a partition scheme. Next lesson checks all of it against Lesson 36's original scope, and turns it into something you can actually put on a resume.
