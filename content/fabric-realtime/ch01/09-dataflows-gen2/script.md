# Lesson 9 — Dataflows Gen2 · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Not every transformation needs code — Dataflows Gen2.

## S2 · CODE CARD (Power Query)

A Dataflow uses Power Query — the same engine behind Power BI's
own data prep — to clean and reshape data, then write the result
into a lakehouse table. Each transformation is a recorded step,
shown as a readable list.

## S3 · CODE CARD (real difference)

Recall Lesson 6 — a notebook runs real PySpark, the full DataFrame
API. A Dataflow's steps use Power Query's own language instead — a
genuinely different mental model: click a step, describe what
changes, rather than write code.

## S4 · CODE CARD (when it fits)

For this course's small zone lookup table, a Dataflow is
genuinely reasonable. For the full NYC Taxi trip data — millions
of rows, needing the casting and window function logic from
Databricks' entire second and third chapters — a real notebook
wins. Dataflows just aren't built for that scale.

## S5 · OUTRO CARD

And either way, the output lands in a real table, queryable by
anything, regardless of which tool produced it. Next lesson:
Fabric Warehouse, the other real engine in OneLake.
