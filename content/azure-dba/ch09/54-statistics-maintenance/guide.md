# Lesson 54 — Statistics Maintenance

**Chapter 9 · Database Performance & Maintenance · Lesson 54 of 95**

## What you'll learn

- What statistics actually are, and why they're a different thing from `SET STATISTICS TIME/IO`
- Why stale statistics make the optimizer choose a genuinely bad plan
- The auto-update thresholds, and why they can still leave you exposed
- When to manually update statistics ahead of a big data load, instead of waiting for auto-update

## Not the same "statistics" you already know

T-SQL Development's `SET STATISTICS TIME` and `SET STATISTICS IO`
lessons measured how long a query ran and how many pages it touched
— useful, but session-scoped and about one query, one execution.
This lesson is about a completely different thing that happens to
share the word: **column and index statistics** — small stored
summaries of how values are distributed in a column, which the query
optimizer reads *before* it builds a plan, for every query, forever,
until they're updated.

## Why stale statistics break plans, not just slow them down

A cardinality estimate — the optimizer's guess at how many rows a
step will return — comes from statistics, not from actually counting
the rows. If the statistics say a filter on `Status = 'Cancelled'`
matches 40 rows out of 2 million, the optimizer builds a plan around
a nested loop join and a bookmark lookup, which is fast for 40 rows
and catastrophic for 400,000. If real-world inserts have quietly
shifted that column's distribution and the statistics haven't caught
up, the optimizer isn't picking a slightly-suboptimal plan — it's
confidently picking the *wrong shape* of plan, based on a number that
used to be true.

```sql
-- See what the optimizer actually believes, and how stale it is:
DBCC SHOW_STATISTICS ('dbo.Orders', 'IX_Orders_Status') WITH STAT_HEADER;
```

`STAT_HEADER` returns `Rows`, `Rows Sampled`, and `Updated` — that
last column is the single fastest way to confirm whether a bad plan
is a statistics problem before you go looking anywhere else.

## Auto-update: the default, and its blind spot

SQL Server auto-updates statistics once enough rows have changed —
historically 20% of the table, modernized under trace flag 2371 (and
the default database-scoped configuration on newer compatibility
levels) to a threshold that shrinks as the table grows, so huge
tables don't have to wait for a 20%-of-billions change before
statistics catch up.

```sql
-- Confirm and control it per database:
ALTER DATABASE CURRENT SET AUTO_UPDATE_STATISTICS ON;
ALTER DATABASE CURRENT SET AUTO_UPDATE_STATISTICS_ASYNC ON;
```

The blind spot: auto-update is *reactive*. It fires after a threshold
of changes has already accumulated, which means some number of
queries run against stale statistics before the trigger even fires —
and `ASYNC` (recommended for busy OLTP systems) means the *query that
triggers* the update still runs against the old statistics, because
it doesn't wait around for the refresh to finish.

## When to update manually instead of waiting

Ahead of a known bulk load, migration, or archival job, don't wait
for auto-update to notice after the fact — update statistics as a
deliberate step in the same maintenance window:

```sql
UPDATE STATISTICS dbo.Orders WITH FULLSCAN;
-- or, across every table in the database:
EXEC sp_updatestats;
```

`FULLSCAN` reads every row instead of sampling — expensive, but exact,
and worth it right after a load that just changed the shape of the
data dramatically. This is the same "schedule it deliberately instead
of hoping the automatic trigger catches it in time" logic from
Lesson 53's index rebuilds, applied to statistics instead.

## Key terms

| Term | Meaning |
|---|---|
| Statistics | Stored summary of a column's value distribution, used for cardinality estimates before a plan is built |
| Cardinality estimate | The optimizer's guess at how many rows a step returns — comes from statistics, not an actual count |
| `AUTO_UPDATE_STATISTICS_ASYNC` | Lets the triggering query run on old stats while the refresh happens in the background |
| `FULLSCAN` | Reads every row instead of sampling when updating statistics — exact, but expensive |

## Check yourself

You're ready for Lesson 55 when you can explain, without looking: why
can stale statistics cause the optimizer to pick the wrong *shape* of
plan rather than just a slightly slower one, and why would you update
statistics manually instead of trusting auto-update before a big
data load?
