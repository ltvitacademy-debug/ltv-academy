# Lesson 59 — Spark SQL With DataFrames · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Let's actually run real SQL against a DataFrame — Spark SQL.

## S2 · CODE CARD (spark.sql)

Spark dot sql takes a plain SQL string, run against a registered
temp view, and returns an ordinary DataFrame — every method from
this entire chapter still works on the result, exactly as if you'd
built it with group by and agg directly.

## S3 · CODE CARD (same query, both ways)

Write the same query both ways, and they produce the exact same
result. That's straight back to Lesson 38's core point — both
compile down to the same Catalyst execution plan underneath.
Neither one is faster; it's genuinely just a style choice.

## S4 · CODE CARD (mixing both)

A query with several joins and a where clause often reads more
naturally as SQL. A query built up step by step often reads more
clearly as chained methods. There's no fixed rule — many real
pipelines use both, choosing per query.

## S5 · OUTRO CARD

Same engine, same plan, your choice of syntax — and nothing stops
you from mixing both in the same script. Next lesson: writing data,
saving results back out.
