# Statistics Jobs

## What you'll learn

- What statistics are for, and why stale statistics quietly cause bad execution plans
- The real T-SQL to update them, and the difference between full and sampled scans
- Cadence considerations for high-churn tables specifically

## Why statistics need refreshing at all

Statistics are a compact summary of the data distribution in a column or index — roughly, a
histogram — that the query optimizer uses to estimate how many rows a predicate will match, and
therefore which plan (index seek vs. scan, join order, join type) is actually fastest. Statistics
are built once and don't automatically stay perfectly current as data changes; by default, SQL
Server auto-updates them once enough rows have changed (`AUTO_UPDATE_STATISTICS`, on by default),
but that threshold-based auto-update can lag behind a table that changes heavily and constantly,
leaving the optimizer estimating against a stale picture of the data — which shows up as
suddenly-bad execution plans with no code change to explain it.

## Updating statistics manually

```sql
-- One specific statistics object
UPDATE STATISTICS dbo.Orders IX_Orders_CustomerID;

-- Every statistics object on a table
UPDATE STATISTICS dbo.Orders;

-- Full scan instead of the default sampled scan — more accurate, more expensive
UPDATE STATISTICS dbo.Orders WITH FULLSCAN;
```

The default sampled scan is fast and usually good enough; `FULLSCAN` reads every row and is more
accurate but proportionally more expensive — reserved for tables where sampling has produced
visibly bad estimates, or where the table is small enough that a full scan is cheap anyway.

## `sp_updatestats`: a database-wide sweep

```sql
EXEC sp_updatestats;
```

`sp_updatestats` walks every table in the current database and updates statistics that have
actually changed since their last update (it skips ones that haven't), making it a reasonable
blanket maintenance step — but it always uses a sampled scan, never `FULLSCAN`, so it's not a
substitute for a targeted `UPDATE STATISTICS ... WITH FULLSCAN` on a table that needs it.

## Cadence for high-churn tables

A table with heavy, constant insert/update/delete activity is exactly where the default
auto-update threshold lags worst — the trigger is a percentage of rows changed, so a huge,
constantly-churning table can go a long time between auto-updates relative to how fast its actual
data distribution shifts. Real-world cadence guidance:

- **High-churn OLTP tables** — a nightly (or even more frequent) scheduled `UPDATE STATISTICS`
  job, rather than relying on the auto-update threshold alone.
- **Mostly-static reference/lookup tables** — auto-update is usually sufficient; a weekly sweep
  via `sp_updatestats` is plenty.
- **After a large bulk load** — always update statistics explicitly right after, regardless of
  schedule; a bulk load can shift the data distribution enough that the optimizer's next few
  plans are visibly wrong until statistics catch up.

## Key terms

| Term | Meaning |
|---|---|
| Statistics | A histogram-like summary of data distribution that the optimizer uses for row-count estimates |
| `AUTO_UPDATE_STATISTICS` | Database option that auto-refreshes statistics once enough rows have changed |
| `sp_updatestats` | Database-wide procedure that updates any statistics that have changed, using a sampled scan |
| `FULLSCAN` | `UPDATE STATISTICS` option reading every row instead of sampling — more accurate, more expensive |

## Check yourself

A high-churn order-processing table suddenly gets a bad execution plan every morning, with no
code or index change to explain it. What's the likely cause, and what scheduled job change would
address it?
