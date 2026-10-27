# Lesson 6 — Handling Late-Arriving Data

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 6 of 16**

## What you'll learn

- A concrete late-arriving-data scenario: a sale from yesterday showing up in today's source file
- Why incremental Bronze ingestion still picks up a late sale correctly
- Why matching on `transaction_id` in the MERGE keeps the sale's real `sale_date` intact
- Why Gold tables that aggregate by `sale_date` self-correct, with no special-case code needed

## The scenario

Say a customer makes a purchase at a store on June 1st, late at night, right as that store's point-of-sale
terminal is losing its connection. Because of a POS sync delay, that transaction doesn't make it into
June 1st's export file. Instead, it shows up the next day, bundled into **June 2nd's** source file,
arriving a full day late.

This is a completely normal, real-world situation for any retail pipeline — networks drop, terminals
batch their uploads, stores close before a sync finishes. A pipeline that can't handle it isn't
production-ready. The question this lesson answers: does this design — incremental Bronze ingestion
feeding a `MERGE INTO` into Silver — handle it correctly, with no special-case logic?

## Walking it through, layer by layer

**Bronze.** Incremental ingestion (lesson 4) reads whatever new source files have landed since the
last run, tracked through `meta.last_ingested_date`. The late sale is physically sitting inside
*today's* (June 2nd) file. Ingestion doesn't know or care that one of the rows inside that file
actually happened yesterday — it just reads the file that showed up today and appends every row in
it to `bronze.sales_raw`, `sale_date` column and all. The late sale lands in Bronze today, carrying
its real, original `sale_date` of June 1st.

**Silver.** This is where the design choice from Lesson 5 pays off. The `MERGE INTO` statement
matches incoming rows against `silver.sales_clean` **by `transaction_id`, not by the date it was
ingested**:

```sql
MERGE INTO silver.sales_clean AS target
USING bronze_incremental AS source
ON target.transaction_id = source.transaction_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

This late sale's `transaction_id` has never been seen before, so it hits `WHEN NOT MATCHED` and gets
inserted — with its `sale_date` column still correctly reading June 1st. Nothing in the MERGE
statement ever touches or overwrites that date. Silver now has a June 1st transaction that it didn't
have yesterday, correctly dated.

**Gold.** Both Gold tables in this course aggregate `GROUP BY sale_date` (and, for the category
breakdown table, `store_id` and `category` too) — never by the date a row happened to be loaded. So
the next time Gold recomputes from Silver's current state, this transaction folds into **June 1st's**
totals, exactly where it belongs, even though it physically arrived in the pipeline on June 2nd.

## The naive design this avoids

Contrast this with a naive pipeline that stamped incoming rows with "today's date" instead of
preserving their real `sale_date` — or worse, keyed its Silver upsert on `sale_date` instead of
`transaction_id` (the mistake Lesson 5 specifically warned against). Either mistake would attribute
this sale to June 2nd, quietly inflating June 2nd's numbers and under-counting June 1st — a silent
error nobody would catch until a Regional Manager asked why yesterday's total looked low.

This design avoids that failure for free. No late-arrival special case, no backfill job, no manual
correction. The combination of incremental ingestion (which doesn't discard or rewrite dates) and a
`transaction_id`-keyed MERGE (which doesn't care when a row showed up) means a late sale just lands
in the right place the first time.

## Key terms

| Term | Meaning |
|---|---|
| Late-arriving data | A record that reaches the pipeline after the time period it actually describes has already been processed |
| POS sync delay | A real-world cause of late data: a point-of-sale terminal's upload to the source system lags behind the sale itself |
| Self-correcting aggregation | A Gold table that always reflects current Silver state because it groups by the business date, not the load date |

## Lab

Trace through, on paper, what would happen to a late sale from June 1st arriving in June 2nd's file
under a naive design that (a) stamped it with today's date, or (b) matched the Silver MERGE on
`sale_date` instead of `transaction_id`. For each, state which day's Gold totals would be wrong, and
in which direction (too high or too low).

## Check yourself

Without looking back: walk through, layer by layer (Bronze, Silver, Gold), why a sale that physically
arrives a day late still ends up correctly attributed to the day it actually happened, with no
special-case code anywhere in the pipeline.
