# Lesson 16 — Data Compression & Storage Optimization

**Chapter 3 · Designing & Scaling Database Resources · Lesson 3 of 5**

## What you'll learn

- `ROW` vs. `PAGE` compression — what each one actually does differently
- The real trade-off: CPU cost to compress/decompress vs. I/O savings
- The T-SQL to apply, check, and estimate the effect of compression
- When compression is worth it, and when it makes things worse

## What compression actually trades

SQL Server's data compression isn't free — it's a trade. Smaller
pages on disk and in memory mean less I/O and better buffer-pool
efficiency, but every read and write now pays a **CPU cost** to
decompress and recompress the data. On a database that's I/O-bound
(waiting on disk, not CPU), that trade is a clear win. On a database
that's already CPU-bound, compression can make things *worse*.

## ROW compression — the smaller change

`ROW` compression stores fixed-length data types (`INT`, `CHAR`,
`DATETIME`, etc.) more efficiently — it drops unused bytes from
numeric and fixed-length columns instead of always reserving their
full defined width. It's a lighter CPU cost and a smaller space
saving than `PAGE` compression.

```sql
ALTER TABLE dbo.OrderHistory
REBUILD WITH (DATA_COMPRESSION = ROW);
```

## PAGE compression — includes ROW, plus more

`PAGE` compression does everything `ROW` compression does, **plus**
two additional techniques applied at the page level:

- **Prefix compression** — repeated leading byte patterns across
  values in a column are stored once per page.
- **Dictionary compression** — repeated values anywhere on the page
  (not just as a prefix) are replaced with a reference into a
  page-level dictionary.

```sql
ALTER TABLE dbo.OrderHistory
REBUILD WITH (DATA_COMPRESSION = PAGE);

-- Partitioned table: compress per-partition, exactly like a rebuild
ALTER TABLE dbo.OrderHistory
REBUILD PARTITION = 3 WITH (DATA_COMPRESSION = PAGE);
```

`PAGE` compression saves more space than `ROW`, but costs more CPU
per operation because there's more work to reverse on every read.

## Deciding: estimate before you commit

```sql
EXEC sp_estimate_data_compression_savings
  'dbo', 'OrderHistory', NULL, NULL, 'PAGE';
```

This procedure estimates the size *before and after* compression
without actually applying it — run it before committing CPU cycles to
a rebuild that might not be worth it.

## When it's worth it — and when it isn't

| Situation | Verdict |
|---|---|
| Large, mostly-read, historical/cold table; I/O-bound server | `PAGE` — big space and I/O win, cold data means fewer CPU cycles spent decompressing overall |
| Small, frequently-updated hot table; CPU already near capacity | Often skip, or `ROW` only — the decompress/recompress cost on every write adds up fast |
| Archive/reporting tables scanned heavily, written rarely | `PAGE` — the read-side win dominates |
| Already storage-cheap, CPU-constrained OLTP workload | Skip compression — you'd be trading a cheap resource problem for an expensive one |

## Key terms

| Term | Meaning |
|---|---|
| ROW compression | Stores fixed-length types more efficiently by dropping unused byte width |
| PAGE compression | ROW compression plus prefix and dictionary compression at the page level |
| `sp_estimate_data_compression_savings` | Estimates size before/after compression without applying it |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: what
resource does compression spend more of, what resource does it save,
and what kind of table is the best candidate for `PAGE` compression?
