# Lesson 6 — Validating the Load

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 6 of 16**

## What you'll learn

- Why "COPY didn't error" is not the same claim as "the load is correct"
- The standard row-count and sum comparison this project uses to validate a load
- How to run that check on both the curated-zone side and the Redshift side
- Why this exact check gets reused later in the chapter, after a bug fix

## A clean return isn't proof

Lesson 5's `COPY` statement finished without throwing an error. That's a necessary signal, but
it's a weak one — a load can return successfully and still be wrong in ways that matter to
Finance: a partition silently skipped, a subset of files picked up twice, rows dropped because of
a type mismatch Redshift tolerated instead of rejecting. None of those produce an error message.
What they produce is a number that's quietly off, and nobody notices until a report looks wrong
weeks later. The fix isn't to trust the return code — it's to independently check the two sides
against each other.

## The standard check: compare source and target

The curated zone in S3 and the `fact_orders` table in Redshift should, after a clean load,
describe **exactly the same rows**. So the validation is simple in concept: count and sum both
sides, and see if they agree.

**Side one — the curated zone, through Athena / the Glue Catalog:**

```sql
SELECT COUNT(*) AS curated_rows, SUM(order_total) AS curated_total
FROM northfield_catalog.northfield_orders_curated;
```

This queries the Parquet files in `s3://northfield-curated-zone/orders/` through the Glue Catalog
table the ETL job's sink auto-registered — the same data `COPY` read from, queried independently
of Redshift entirely.

**Side two — the loaded table, in Redshift:**

```sql
SELECT COUNT(*) AS loaded_rows, SUM(order_total) AS loaded_total
FROM analytics.fact_orders;
```

## Reading the result

Run both queries and line the two result sets up side by side:

| | curated side | Redshift side |
|---|---|---|
| Row count | `curated_rows` | `loaded_rows` |
| Revenue total | `curated_total` | `loaded_total` |

After a clean load, `curated_rows` should equal `loaded_rows`, and `curated_total` should equal
`loaded_total`. If either pair disagrees, the load did something other than what was intended —
even though it returned without an error — and that's worth tracking down before anyone builds a
report on top of `fact_orders`.

A row-count match alone isn't quite enough on its own, either: it's possible (if unlikely) for the
right number of rows to land with wrong values in them. Checking a sum alongside the count catches
a class of problem row counts alone would miss — which is exactly why this check pairs both.

## Why this becomes a standing habit, not a one-time step

This isn't just a Lesson 6 exercise. The same count-and-sum comparison is exactly what gets re-run
in Lesson 13, right after a real nightly-load bug gets fixed — because "the fix compiled" is just
as weak a signal as "COPY didn't error." The only way to actually confirm a fix worked is to run
the same validation that would have caught the problem in the first place.

## Key terms

| Term | Meaning |
|---|---|
| Validation query | A query run specifically to confirm a load's correctness, separate from the load itself succeeding |
| Row-count check | Comparing the number of rows on the source and target sides of a load |
| Sum check | Comparing an aggregated numeric total on both sides, catching value-level mismatches a row count alone would miss |

## Check yourself

You're ready for Lesson 7 when you can answer, without looking: why isn't a successful `COPY`
return code sufficient proof that a load is correct, and what two numbers does this lesson's
standard check compare between the curated zone and `fact_orders`?
