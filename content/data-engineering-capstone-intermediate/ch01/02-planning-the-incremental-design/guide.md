# Lesson 2 — Planning the Incremental Design

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 2 of 16**

## What you'll learn
- How Bronze changes from "reprocess every file" to "ingest only new files since the watermark"
- How Silver changes from "rebuild the whole table" to "MERGE INTO only new or changed rows"
- Why Gold barely changes shape at all, even though there are now two Gold tables instead of one
- What a watermark is, in plain English, before any code touches it

## The rule for this lesson: plain English before PySpark

Before writing a single line of the incremental pipeline, it's worth sketching the whole redesign in
words. Every layer — Bronze, Silver, Gold — is changing in some way, but not equally, and not for the
same reason. Getting the plan straight first means the code in later lessons is just typing up a
decision you already made, not making the decision while also fighting syntax.

## Bronze: from "everything" to "only what's new"

Today, Bronze ingestion doesn't really have an incremental concept at all — it's append-only, but the
nightly job re-reads every source file every night as part of rebuilding everything downstream. The
new design needs Bronze itself to know what it has already ingested, so it only reads *new* files.

That's the job of a small tracking table: `meta.last_ingested_date`. Each time Bronze ingestion runs
successfully, it records the latest source date it has now loaded. The next run reads that value
first, then only looks at source files or partitions dated *after* it — never the whole history.
`bronze.sales_raw` stays append-only, exactly as before; what changes is that each run only appends
the rows that are genuinely new, instead of touching data it already has.

## Silver: from "rebuild" to "MERGE INTO"

Today, Silver gets dropped and rebuilt from Bronze on every run. That's fine when Bronze is small, but
once Bronze ingestion is incremental, rebuilding all of Silver from scratch every night would throw
away the win — you'd still be touching the full history downstream, just one layer later.

The fix is Delta Lake's `MERGE INTO`: instead of rebuilding `silver.sales_clean`, each run merges only
the newly-ingested Bronze rows into it, matched on `transaction_id`, the table's true unique key. A
row that's genuinely new gets inserted; a row that corrects an existing `transaction_id` (a late
correction or a re-sent file) gets updated in place. Lesson 5 builds this `MERGE INTO` logic in real
code — for now, the plan is just: Silver becomes a target you *merge into*, not a table you rebuild.

## Gold: same shape, twice

This is the part that surprises people: Gold barely changes. Both Gold tables still read from Silver
and still aggregate it — that logic doesn't need to become incremental in the same way Bronze and
Silver do, because Silver is now small and current, not the entire history. The real change in Gold
is simply that there are now *two* tables instead of one:

- `gold.daily_sales_summary` — the existing table, unchanged in shape, still store/day, still for
  Store Operations.
- `gold.category_breakdown` — the new table, store/category/day, for the Regional Manager.

Both are built the same way, from the same upstream Silver table, at roughly the same cost per run —
because that run only has to process the small slice of Silver that actually changed.

## What a watermark actually is

A watermark is just a saved checkpoint: a value — here, a date — that marks "everything up to and
including this point has already been processed." Every incremental system needs one somewhere, or it
has no way to know what's new versus what it's already seen. `meta.last_ingested_date` is this
project's watermark. It's deliberately small and boring: one table, one value per source, updated at
the end of a successful Bronze run, read at the start of the next one.

## The plan, end to end

1. Read the watermark from `meta.last_ingested_date`.
2. Ingest only source files newer than it into `bronze.sales_raw` (append-only, as always).
3. `MERGE INTO silver.sales_clean` on `transaction_id`, using only the newly-ingested Bronze rows.
4. Rebuild both Gold tables from the now-current Silver table.
5. Advance the watermark to the latest date just ingested.

## Key terms

| Term | Meaning |
|---|---|
| Watermark | A saved checkpoint value marking what's already been processed, so the next run knows what's new |
| Incremental ingestion | Reading only new source data since the watermark, instead of everything every run |
| MERGE INTO | A Delta Lake operation that inserts new rows and updates matching existing rows in one statement |
| True unique key | The column (here, `transaction_id`) that uniquely identifies a row for matching during a merge |

## Lab

Draw the five-step plan above as your own simple diagram — five boxes, one arrow each — and label
each box with which table it reads from and which table it writes to. Keep it to one page; if a box
needs two sentences to explain, it's doing too much.

## Check yourself

Without looking back: explain in one sentence each how Bronze, Silver, and Gold change in this
redesign, and say which layer changes the least and why.
