# Script — Caching Strategies for Analytics · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

A cache stores the result of expensive work somewhere fast to read, so a repeat request doesn't redo it. Fabric's Import mode is exactly this — a scheduled copy of gold, not recomputed on every open.

## S2 · CODE CARD (pre-aggregation as caching)

A gold table is, functionally, a caching strategy — the expensive aggregation runs once, on a schedule, and every read afterward is cheap. Databricks Lesson 30's overwrite pattern is pre-aggregation as caching.

## S3 · CODE CARD (pre-aggregation vs. result-set caching)

Pre-aggregation only helps if you knew the question in advance, built into gold itself. Result-set caching helps with ad hoc queries, but only pays off if the same query actually repeats.

## S4 · CODE CARD (invalidation is the hard part)

Storing a cached result is the easy half. Knowing when it's gone stale is where real designs fail — never invalidating serves wrong numbers forever; invalidating too aggressively defeats the whole point.

## S5 · OUTRO CARD

Caching strategy and freshness requirements are the same decision, viewed from two layers. Next up: designing for multi-tenancy — the next real constraint a system design has to absorb.
