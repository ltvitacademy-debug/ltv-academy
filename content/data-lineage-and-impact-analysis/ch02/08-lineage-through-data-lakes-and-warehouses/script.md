# Lesson 8 — Lineage Through Data Lakes and Warehouses · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 7 ended with raw data landing somewhere — a staging schema, a lake. This lesson follows it the rest of the way through a lake's bronze, silver, and gold layers, and into a warehouse's dimensional model of facts and dimensions.

## S2 · STEPS — MEDALLION PATTERN

Bronze is raw data, untouched, exactly as extracted — the same landing zone from Lessons 6 and 7, kept exactly as it arrived. Silver is cleaned and conformed: deduplicated, standardized types, bad rows filtered or flagged, still roughly one row per source record, just trustworthy. Gold is business-ready: aggregated and joined across sources for a specific use, like a fact table or a reporting view.

## S3 · STEPS — EVERY HOP IS A LINEAGE EDGE

Lineage through this pattern is a chain of hops, each one a separate transformation job. Every column in gold.fact_sales should be traceable back through exactly which silver columns, and ultimately which bronze columns, produced it — this is the column-level lineage from Chapter 1's Lesson 4, now applied to a real multi-hop chain instead of a single hop.

## S4 · STEPS — VIEWS VS MATERIALIZED

Here's a wrinkle that only shows up in a warehouse: views versus materialized objects. A view has no lineage lag — query it, and it recomputes from its source tables right then. A materialized table is lineage with a time lag baked in — it reflects whatever its last refresh pulled, which might be hours or a day stale. Both are valid, traceable lineage, but for root-cause analysis on a wrong number, knowing which kind of object you're looking at tells you whether the problem is still in flight upstream, or already frozen.

## S5 · CODE — MULTI-HOP LINEAGE

A raw file lands in bronze untouched, gets cleaned into silver, then aggregated and joined into a gold fact table. Each arrow in this chain is a separate lineage edge that has to be independently traceable. Trusting the whole chain isn't good enough when something breaks — you need to know which hop introduced the problem, not just that the chain, overall, held.

## S6 · OUTRO

Next lesson: what happens between the warehouse and the report — lineage through semantic models, and why measures add their own lineage layer on top of columns.
