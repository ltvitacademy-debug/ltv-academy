# Lesson 11 — Lakehouse vs. Warehouse — Choosing the Right Engine

**Chapter 1 · Microsoft Fabric · Lesson 11 of 70**

## What you'll learn

- A real decision, not a formality — the two items solve genuinely different problems
- Who's actually writing the queries, as the deciding factor
- Mixed patterns: one project, both item types, on purpose
- A concrete decision for this course's own NYC Taxi pipeline

## A real decision

Lessons 4 and 10 covered creating each item type; this lesson
covers actually choosing between them for a given piece of work.
This isn't a formality — a Lakehouse and a Warehouse solve
genuinely different problems, the same way Databricks & Delta
Lake's own Lesson 11 distinguished all-purpose from job clusters:
two real tools, not two skins on the same one.

## Who's writing the queries

| Team | Comfortable with | Reach for |
|---|---|---|
| Data engineers, writing PySpark pipelines (Ch1-3's whole Databricks material) | Spark, DataFrames | **Lakehouse** |
| Analysts/BI developers, writing T-SQL (this track's T-SQL course) | `SELECT`, joins, window functions in T-SQL | **Warehouse** |
| Both, on the same underlying data | Either | **Either** — same OneLake storage, different front door |

The deciding factor is usually **who's actually querying it day to
day**, not some abstract technical superiority of one engine — a
team fluent in T-SQL gets real value from a Warehouse's native
`INSERT`/`UPDATE` support (Lesson 10) that a Lakehouse's read-only
SQL endpoint can't offer them.

## Mixed patterns, on purpose

```
Lakehouse: bronze/silver  (PySpark cleaning, Databricks-style)
Warehouse: gold           (T-SQL aggregation, analyst-facing)
```

Nothing prevents — and plenty of real organizations deliberately
choose — bronze and silver in a Lakehouse (data engineers'
PySpark-heavy cleaning) feeding a Warehouse's gold layer (T-SQL
aggregation an analyst team maintains themselves). This is
genuinely the same medallion shape Databricks & Delta Lake's
Chapter 3 established, just split across two item types instead
of staying in one.

## A concrete decision for this course

This course's NYC Taxi pipeline uses a **Lakehouse** throughout —
the actual cleaning logic (casting, deduplication) is PySpark, the
exact same DataFrame methods from Foundations' Chapter 4, and
there's no separate analyst team here needing native T-SQL writes.
A Warehouse would be the wrong default choice for this specific
pipeline, even though it's a genuinely correct one for many real
organizations' gold layers.

## Key terms

| Term | Meaning |
|---|---|
| Deciding factor | Who's actually querying day to day — PySpark team or T-SQL team |
| Mixed pattern | Lakehouse for engineering-heavy layers, Warehouse for analyst-facing ones |
| This course's choice | Lakehouse throughout — matches its PySpark-based cleaning logic |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
might a real organization deliberately put its gold layer in a
Warehouse, even if bronze and silver live in a Lakehouse?
