# Lesson 14 — Designing a Transformation Layer

**Chapter 1 · System Design for Data Engineers · Lesson 14 of 81**

## What you'll learn

- Bronze → silver → gold, recapped as the transformation layer's actual shape
- Transformation idempotency — Lesson 11's principle, applied here specifically
- Incremental vs. full-refresh transforms, and how to actually choose
- Why this layer, not ingestion, is where "clean" gets defined

## The shape: bronze → silver → gold

Lesson 13 landed raw data into a bronze/landing zone, untouched.
The **transformation layer** is everything that turns that raw data
into something usable — Databricks & Delta Lake Lesson 25's exact
three-layer pattern, applied here as a system design component
rather than a Databricks-specific feature:

```text
BRONZE (Lesson 13's ingestion target, as-is)
    -> SILVER: cleaned, deduplicated, correctly typed, conformed
    -> GOLD: business-level aggregates, ready for direct consumption
```

Silver answers "what's the clean, trustworthy version of this?" —
casting, null-handling, deduplication. Gold answers "what does the
business actually need to see?" — pre-aggregated, shaped for a
specific report. Designing this layer means deciding, concretely,
what each of those two steps actually does for your data, not just
naming the three colors.

## Transformation idempotency, applied here

```sql
-- Bronze -> silver: MUST be idempotent -- Lesson 11's principle,
-- Databricks Lesson 29's exact mechanism
MERGE INTO silver_orders AS target
USING cleaned_bronze_batch AS source
ON target.order_id = source.order_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

Lesson 11 established idempotency generally; Databricks & Delta Lake
Lesson 29 showed exactly where it bites hardest — a bronze-to-silver
step that reruns (a retry, a manual fix-and-rerun) on the same batch
must not duplicate rows. Plain `append` breaks this silently; `MERGE`
on the natural key doesn't. This is the transformation layer's own
version of Lesson 11's rule, not a separate concern.

## Incremental vs. full-refresh — how to actually choose

```text
Silver (bronze -> silver):   MERGE, incremental almost always --
                              new bronze rows keep arriving; a full
                              rewrite of silver every run wastes work
Gold, SMALL aggregate:       overwrite/full-refresh is fine --
                              Databricks Lesson 30: simpler, and just
                              as correct, when the whole table is
                              cheap to rebuild
Gold, LARGE aggregate:       incremental MERGE, matching silver's
                              approach -- full rebuild becomes too
                              expensive once the aggregate itself
                              is genuinely large
```

Databricks & Delta Lake Lesson 30 made this trade-off explicit for
gold specifically: `overwrite` is "simpler than MERGE, and just as
correct" for a small table rebuilt from all of silver each run, but
a genuinely large gold aggregate needs the same incremental
approach silver already uses. There's no universal answer here —
the choice depends on how expensive a full rebuild actually is,
which Lesson 3's back-of-the-envelope estimation is exactly the
tool for figuring out ahead of time.

## Tracking what's new: watermarks and Change Data Feed

```python
# Databricks Lesson 31's two ways to know what's new since last run
last_processed = spark.sql("SELECT MAX(_ingested_at) FROM silver.trips").collect()[0][0]
new_rows = spark.table("bronze.trips").filter(col("_ingested_at") > last_processed)
```

Choosing "incremental" answers only half the design question — the
transformation layer also needs a concrete way to know *what's
new*. Databricks & Delta Lake Lesson 31 covered both real options: a
manually maintained watermark column, or Delta's own Change Data
Feed reading the transaction log directly. Either one has to be
designed in explicitly; incrementality doesn't happen automatically
just because `MERGE` is being used.

## Key terms

| Term | Meaning |
|---|---|
| Transformation layer | Bronze → silver → gold — turns raw ingested data into usable data |
| Transformation idempotency | A rerun on the same batch must not duplicate rows — Lesson 11 applied here |
| Incremental vs. full-refresh | Process only what's new vs. rebuild the whole table — chosen by cost, not habit |
| Watermark / Change Data Feed | The two concrete mechanisms for knowing what's actually new |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
might a small gold table use `overwrite` while silver, feeding from
the same bronze source, almost always needs `MERGE` instead?
