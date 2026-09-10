# Lesson 11 — Lakehouse vs. Warehouse — Choosing the Right Engine · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Now let's actually choose between the two — lakehouse versus
warehouse.

## S2 · CODE CARD (who's writing queries)

The deciding factor is usually who's actually querying it day to
day. Data engineers writing PySpark reach for a lakehouse.
Analysts writing T-SQL reach for a warehouse — its native insert
and update support gives them something a lakehouse's read-only
endpoint can't.

## S3 · CODE CARD (mixed patterns)

And plenty of real organizations mix both, on purpose — bronze
and silver in a lakehouse, PySpark-heavy cleaning, feeding a
warehouse's gold layer, T-SQL aggregation an analyst team
maintains. The same medallion shape from Databricks' Chapter 3,
just split across two item types.

## S4 · CODE CARD (this course's choice)

This course uses a lakehouse throughout — the cleaning logic is
PySpark, the exact same DataFrame methods from Foundations, with
no separate analyst team needing native T-SQL writes here.

## S5 · OUTRO CARD

Two real tools, chosen by who's actually querying. Next lesson:
Direct Lake mode, Power BI reading Delta directly.
