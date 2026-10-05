# Lesson 24 — Lineage Practice Lab · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A hands-on practice lab — no software required. Northfield Pantry, a
fictional small grocery chain, gives us a small system to trace by hand,
start to finish.

## S2 · STEPS CARD (the system and table-level trace)

Four tables: POS.Sales, Stores.RegionMap, DailyStoreSummary, and
WeeklyRegionalReport. The table-level chain is three arrows. Going
column-level for just the revenue figure shows SalePrice and QtyUnits
doing the math, while SaleDate and Region are grouping keys that never
touch the calculation itself.

## S3 · STEPS CARD (impact analysis exercise)

Northfield Pantry wants to rename SalePrice and add currency conversion
for a new Canadian store. Tracing where SalePrice is used shows exactly
one transformation step needs both the rename and the conversion logic
— miss it, and Canadian-dollar sales get silently summed as if they
were US dollars.

## S4 · STEPS CARD (root cause exercise)

WeeklyRegionalReport shows zero for one region for one week, even
though the daily summary looks normal. Walking the lineage path
backward points straight at the join to RegionMap as the first place to
look — lineage tells you where to look first, instead of re-checking
every table from scratch.

## S5 · OUTRO CARD

Next up: the final lesson of this course — a review checklist pulling
together everything from all five chapters into one usable reference.
