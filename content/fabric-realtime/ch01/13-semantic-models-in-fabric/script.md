# Lesson 13 — Semantic Models in Fabric · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Let's cover the layer between raw tables and an actual report —
semantic models.

## S2 · CODE CARD (the gap)

Trips and zones are two separate tables, with no defined
relationship and no agreed business definitions. A semantic model
adds exactly that — relationships, measures, and friendly names —
so a report author queries concepts, not raw columns.

## S3 · CODE CARD (relationships/measures)

A relationship connects trips to zones the same way a join would
in PySpark, just defined once, in the model, instead of repeated
in every query. A measure is a named calculation, defined once, so
two report authors never accidentally define total revenue two
different ways.

## S4 · CODE CARD (Direct Lake location)

And this is actually where Direct Lake mode lives — not a report
setting, but a property of the semantic model itself.
Relationships and measures apply right on top of that fast,
direct read.

## S5 · OUTRO CARD

Concepts, not raw columns, defined once. Next lesson: Fabric
capacities and SKUs, the real pricing tiers, named.
