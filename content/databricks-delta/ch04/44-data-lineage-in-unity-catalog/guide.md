# Lesson 44 — Data Lineage in Unity Catalog

**Chapter 4 · Unity Catalog · Lesson 44 of 57**

## What you'll learn

- Lineage: automatic, not something you set up or maintain yourself
- Table-level and column-level lineage — what each actually shows
- Answering "what breaks if I change this?" before actually changing it
- Why this only works because every layer transition went through Spark itself

## Lineage is automatic, not manual

Unity Catalog tracks **lineage** — which tables and columns fed
into which others — automatically, for any read/write that runs
through Spark against Unity Catalog tables. Nobody writes or
maintains a lineage diagram by hand; Databricks builds it by
observing every query Chapter 3's actual pipeline already ran.

## Table-level lineage — tracing this course's own pipeline

```
gold.daily_revenue
    <- silver.trips (MERGE, Lesson 29/34)
        <- bronze.trips (Autoloader, Lesson 32)
            <- /data/nyc_taxi/incoming/*.csv
```

This is a real, navigable graph, built entirely from Chapter 3's
already-existing bronze→silver→gold pipeline — the exact structure
Lesson 25 described conceptually now shows up as an actual, clickable
lineage diagram in the workspace UI, with zero extra setup.

## Column-level lineage — tracing one specific value

Table-level lineage answers "which tables feed this one?" Column-
level lineage answers a narrower, often more useful question:
specifically which upstream columns fed `gold.daily_revenue`'s
`total_revenue` column? The answer traces back through Lesson 28's
`sum("fare_amount")` to `silver.trips.fare_amount`, and further back
through Lesson 27's `.cast("double")` to `bronze.trips.fare_amount`
— the exact column, at every hop.

## Answering "what breaks if I change this?"

Before altering `silver.trips`'s `fare_amount` column — dropping it,
renaming it, changing its type — lineage shows every downstream
table that depends on it. This turns a genuinely risky, easy-to-get-
wrong question ("what else reads this?") into something you can
check directly, before making a change, rather than discovering the
breakage after the fact when a downstream job starts failing.

## Why this only works because of how the pipeline was built

Lineage capture depends on operations running through Spark against
Unity Catalog-governed tables — exactly what every lesson in
Chapters 2–3 already did. A table populated by some tool entirely
outside Databricks, bypassing Spark, wouldn't show up in this graph
at all. This is a real, concrete payoff of having built everything
the way this course actually built it.

## Key terms

| Term | Meaning |
|---|---|
| Lineage | An automatically-tracked graph of which tables/columns feed which others |
| Table-level vs. column-level | Which tables feed a table, vs. which specific columns feed a specific column |
| Automatic capture | Built from observing real Spark queries — no manual diagram maintained |

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: why
wouldn't a table populated entirely outside Databricks show up in
Unity Catalog's lineage graph?
