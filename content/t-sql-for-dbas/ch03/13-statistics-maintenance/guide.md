# Statistics: Inspecting & Maintaining

Every execution plan the optimizer builds depends on a row-count estimate, and that
estimate comes from statistics — not from the index itself. This lesson covers how to
inspect what a statistics object actually contains, how SQL Server decides on its own
that statistics are stale, and how to update them by hand when it matters.

## What you'll learn

- `sys.stats` and `sys.dm_db_stats_properties` — statistics metadata and staleness
- `DBCC SHOW_STATISTICS` — the histogram the optimizer actually reads
- `UPDATE STATISTICS` syntax and the difference `WITH FULLSCAN` makes
- Auto-update statistics: the row-modification threshold that triggers it

## Listing statistics and checking staleness

Every index carries a matching statistics object, and standalone statistics can exist
on other columns too. `sys.stats` lists them; `sys.dm_db_stats_properties()` reports
when each one was last updated and how many rows have changed since:

```sql
SELECT s.name                                  AS stats_name,
       sp.last_updated,
       sp.rows,
       sp.rows_sampled,
       sp.modification_counter
FROM sys.stats AS s
CROSS APPLY sys.dm_db_stats_properties(s.object_id, s.stats_id) AS sp
WHERE s.object_id = OBJECT_ID('dbo.Orders');
```

`modification_counter` is the number of row modifications since the last statistics
update — this is exactly what SQL Server's own auto-update logic watches.

## Reading the actual histogram

`DBCC SHOW_STATISTICS` returns what the optimizer really uses: the header, the density
vector, and the histogram of up to 200 steps describing the data's distribution:

```sql
DBCC SHOW_STATISTICS ('dbo.Orders', IX_Orders_CustomerID) WITH HISTOGRAM;
```

Each histogram step gives `RANGE_HI_KEY` (the boundary value), `EQ_ROWS` (rows equal to
that boundary), `RANGE_ROWS` (rows strictly between this boundary and the previous
one), and `AVG_RANGE_ROWS`. When a query's row-count estimate looks wrong, comparing
the actual data distribution against this histogram is how you confirm whether stale or
low-resolution statistics are the reason.

## Updating statistics by hand

```sql
UPDATE STATISTICS dbo.Orders IX_Orders_CustomerID;

UPDATE STATISTICS dbo.Orders IX_Orders_CustomerID WITH FULLSCAN;
```

Without options, `UPDATE STATISTICS` samples a subset of rows — fast, but on a large or
skewed table the sample may not capture the true distribution. `WITH FULLSCAN` reads
every row and produces the most accurate histogram possible, at the cost of scanning
the whole table; it's the right call after a large bulk load or when a plan is visibly
wrong and sampling is suspected as the cause.

## When SQL Server updates statistics on its own

With `AUTO_UPDATE_STATISTICS` on (the default), SQL Server updates a statistics object
automatically once enough rows have changed. Since SQL Server 2016 (with database
compatibility level 130 or higher), that threshold scales with table size using a
formula based on `SQRT(1000 * rows)`, rather than the older fixed 20%-of-table rule —
meaning large tables trigger an auto-update far sooner, proportionally, than they used
to. That auto-update happens synchronously by default (the query that triggers it
waits), unless `AUTO_UPDATE_STATISTICS_ASYNC` is enabled, in which case the triggering
query uses the old statistics and the update happens in the background.

## Key terms

| Term | Meaning |
|---|---|
| Histogram | Up to 200 steps in a statistics object describing the distribution of values in a column |
| `modification_counter` | Rows modified since a statistics object's last update, tracked by `sys.dm_db_stats_properties()` |
| `WITH FULLSCAN` | `UPDATE STATISTICS` option that reads every row instead of sampling, for maximum accuracy |

## Check yourself

Why might `UPDATE STATISTICS ... WITH FULLSCAN` produce a noticeably different, more
accurate query plan than a default sampled update on the same table?
