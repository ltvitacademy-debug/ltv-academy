# pg_stat_statements & Query Performance Monitoring

`EXPLAIN ANALYZE` tells you everything about one query you already suspect is slow. It
doesn't tell you which query, out of thousands running against your server, you should be
looking at in the first place. `pg_stat_statements` is PostgreSQL's answer to that
question — the same role SQL Server's Query Store plays: tracking execution statistics for
every query the server runs, so you can find your worst offenders with data, not guessing.

## What you'll learn

- How to enable pg_stat_statements
- The key columns it tracks and what each one tells you
- How to use it to find your actual worst-performing queries

## Enabling the extension

`pg_stat_statements` ships with PostgreSQL but isn't active by default. It requires a
server restart to load, because it needs to be listed in `shared_preload_libraries`:

```
# postgresql.conf
shared_preload_libraries = 'pg_stat_statements'
```

After restarting, create the extension inside the database you want to monitor:

```sql
CREATE EXTENSION pg_stat_statements;
```

From that point on, every query PostgreSQL executes gets tracked in the
`pg_stat_statements` view, aggregated by *normalized* query text — meaning `WHERE id = 5`
and `WHERE id = 12` are tracked as the same entry, with their literal values stripped out,
so you see patterns rather than one row per literal parameter value.

## Reading the view

```sql
SELECT query, calls, total_exec_time, mean_exec_time, rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

- **calls** — how many times this query has run.
- **total_exec_time** — cumulative execution time across all calls, in milliseconds. Sorting
  by this finds the queries costing the *most total time on the server*, which isn't
  necessarily the slowest single execution — a query that runs 100,000 times at 2ms each
  can cost more total server time than one that runs once at 500ms.
- **mean_exec_time** — average time per call; sorting by this instead finds individually
  slow queries, regardless of how often they run.
- **rows** — total rows returned across all calls, useful alongside calls to sanity-check
  whether a query is doing more work than expected per call.

## Using it in the tuning loop

`pg_stat_statements` is the "measure" step from the tuning methodology lesson, applied
server-wide instead of to one query at a time: sort by `total_exec_time` to find what's
actually costing the server the most, then take that specific query into `EXPLAIN ANALYZE`
to identify why. After making a change, `pg_stat_statements_reset()` clears the accumulated
stats so you can measure the "after" picture cleanly, the same way you'd want a fresh
baseline after any tuning change.

## Key terms

| Term | Meaning |
|---|---|
| pg_stat_statements | Extension tracking execution statistics for every query, aggregated by normalized query text |
| shared_preload_libraries | Configuration setting requiring a restart, used to load extensions like pg_stat_statements at server start |
| total_exec_time | Cumulative execution time across all calls of a query — finds the biggest total server-time consumers |
| mean_exec_time | Average execution time per call — finds individually slow queries |

## Check yourself

A query runs 200,000 times a day at 3ms average, and another runs once a day at 4 seconds.
Which one would sorting by total_exec_time surface first, and why might that be the more
useful place to start tuning even though the second query "feels" slower?
