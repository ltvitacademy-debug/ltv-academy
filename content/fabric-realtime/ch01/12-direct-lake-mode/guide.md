# Lesson 12 — Direct Lake Mode

**Chapter 1 · Microsoft Fabric · Lesson 12 of 70**

## What you'll learn

- Import and DirectQuery — the two modes Power BI already had, briefly
- Direct Lake: neither of those, and why that's the real news
- Reading Delta's own Parquet files directly, without a query engine in between
- Why this is Delta Lake's transaction log (Databricks & Delta Lake Lesson 17), paying off again

## Two modes Power BI already had

**Import** mode copies data into Power BI's own compressed
in-memory format — fast to query, but a real copy, refreshed on a
schedule. **DirectQuery** mode sends a live query to the source on
every interaction — always current, but only as fast as that
source's query engine. Every real Power BI deployment before Fabric
picked one of these two, accepting the tradeoff either way.

## Direct Lake: neither

**Direct Lake** mode does something genuinely different: Power BI
reads a Lakehouse or Warehouse table's actual **Parquet files**
directly — the same files Databricks & Delta Lake's entire Chapter
2 covered — without going through Spark or the SQL endpoint as an
intermediate query engine at all. This is possible specifically
because Delta's Parquet files are already columnar and already
have a real schema (Databricks & Delta Lake Lesson 14) — Power BI
can read them nearly as fast as its own Import-mode format, without
ever copying them.

## Reading the files directly, without an engine in between

```
Import:      Power BI's own copy    <- refreshed periodically
DirectQuery: Power BI  -> query engine -> Delta table  <- live, but slower
Direct Lake: Power BI  -> Delta Parquet files directly  <- live AND fast
```

This genuinely combines Import's speed with DirectQuery's freshness
— not a compromise between the two, but a real third option, made
possible by the specific properties of the Delta format itself.

## Delta's transaction log, paying off again

Recall Databricks & Delta Lake Lesson 17: the `_delta_log/` folder
tells any reader exactly which Parquet files currently belong to a
table's latest version. Direct Lake mode is a direct beneficiary of
that same log — Power BI reads the log to know precisely which
files to read, the exact mechanism that already made time travel
(Lesson 21) and safe concurrent writes (Lesson 18) possible in that
earlier course.

## Key terms

| Term | Meaning |
|---|---|
| Import mode | A refreshed copy of the data, inside Power BI |
| DirectQuery mode | A live query to the source engine, on every interaction |
| Direct Lake mode | Power BI reads Delta's Parquet files directly — no engine in between |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why
does Direct Lake mode need Delta's transaction log specifically,
rather than being able to work on plain Parquet files with no log at
all?
