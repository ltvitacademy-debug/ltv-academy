# Lesson 13 — What Is Delta Lake?

**Chapter 2 · Delta Lake · Lesson 13 of 57**

## What you'll learn

- Delta Lake: an open table format, built on top of Parquet
- The specific problem it solves: Parquet files alone have no transactions
- The transaction log — the one thing Delta adds that plain Parquet doesn't have
- Why almost every real Databricks pipeline is built on Delta by default

## Starting from what you already know

Foundations' Lesson 42 covered why Parquet is the default file
format for real analytics: columnar storage, a built-in schema, fast
selective reads. Delta Lake starts from exactly that — every Delta
table's actual data files **are** Parquet files, unchanged. Delta
doesn't replace Parquet; it wraps it.

## The problem: Parquet alone has no transactions

Writing a batch of Parquet files is not atomic. If a write job
fails halfway through — a cluster crash, a network blip — you can
be left with a partial set of files: some written, some not, no
record of which set is "the real, complete" version. Two concurrent
writers can create genuinely conflicting output with nothing to
detect or prevent it. Foundations never had to worry about this,
because every read/write in that course ran once, start to finish,
uninterrupted.

## What Delta actually adds: the transaction log

```
/data/nyc_taxi/delta_trips/
    part-00000-....parquet
    part-00001-....parquet
    _delta_log/
        00000000000000000000.json
        00000000000000000001.json
        ...
```

Every Delta table has a `_delta_log/` folder alongside its Parquet
files — a sequential, append-only log of every change ever made:
which files were added, which were removed, and when. This log is
the actual mechanism behind everything the rest of this chapter
covers: atomic writes (Lesson 18), time travel (Lesson 21), and safe
concurrent `UPDATE`/`DELETE`/`MERGE` (Lesson 22). Lesson 17 opens
this file up directly.

## Why this is the real-world default

Given that Delta tables are still just Parquet files underneath, and
add real correctness guarantees for genuinely small extra cost, real
Databricks pipelines default to Delta for essentially everything —
plain Parquet is now the exception, reserved for cases with a
specific reason not to use Delta (a one-off export, an external
system that only reads raw Parquet).

## Key terms

| Term | Meaning |
|---|---|
| Delta Lake | An open table format: Parquet files, plus a transaction log |
| `_delta_log/` | The append-only log of every change — the source of every Delta guarantee |
| Atomicity | A write either fully succeeds or leaves no trace — impossible with bare Parquet |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: what
does Delta Lake actually add on top of plain Parquet files?
