# AUTO Settings

The query optimizer's decisions are only as good as the statistics it trusts about how
data is distributed. Three `ALTER DATABASE` options control whether SQL Server maintains
those statistics for you automatically, and how aggressively. All three default to
sensible values — but a DBA needs to know exactly what each one does before touching it.

## What you'll learn

- What each of the three AUTO settings actually controls
- Which one is off by default, and why you'd turn it on
- When it's reasonable to consider changing any of these from default

## AUTO_CREATE_STATISTICS: fills gaps automatically

`AUTO_CREATE_STATISTICS`, `ON` by default, lets the optimizer create single-column
statistics on the fly when it needs distribution information for a column that doesn't
have any yet — typically a column used in a `WHERE` clause or join predicate with no
existing index or statistics object covering it. Without this, the optimizer would be
guessing blind on any such column. Turning it off is rare and generally only done in
tightly-controlled environments where all statistics are managed manually.

## AUTO_UPDATE_STATISTICS: keeps them fresh

`AUTO_UPDATE_STATISTICS`, also `ON` by default, refreshes existing statistics once enough
rows have changed since the last update (the exact threshold scales with table size and
was improved in SQL Server 2016+ for large tables). Stale statistics are one of the most
common causes of a query optimizer picking a bad plan, so this stays on in nearly every
real environment.

## AUTO_UPDATE_STATISTICS_ASYNC: trades freshness for latency

`AUTO_UPDATE_STATISTICS_ASYNC` is `OFF` by default. When a statistics update triggers
synchronously (the default), the query that triggered it waits for the update to finish
before it runs — using the newly-refreshed statistics, but paying a latency spike. Turning
this `ON` makes that update happen in the background: the triggering query runs
immediately using the slightly-stale statistics, and the next query benefits from the
fresh ones. On a large, busy OLTP table where an unpredictable pause is worse than briefly
running with older statistics, turning this on smooths out that latency spike.

```sql
ALTER DATABASE Sales SET AUTO_UPDATE_STATISTICS_ASYNC ON;
```

## When to actually change the defaults

For the large majority of databases, leave `AUTO_CREATE_STATISTICS` and
`AUTO_UPDATE_STATISTICS` on — they're the right default almost everywhere. Consider
`AUTO_UPDATE_STATISTICS_ASYNC ON` specifically on large, high-concurrency OLTP tables
where synchronous stat updates cause visible, unpredictable query latency spikes.

## Key terms

| Term | Meaning |
|---|---|
| AUTO_CREATE_STATISTICS | Optimizer creates missing single-column statistics automatically (default ON) |
| AUTO_UPDATE_STATISTICS | Existing statistics refresh once enough rows have changed (default ON) |
| AUTO_UPDATE_STATISTICS_ASYNC | Stat updates happen in the background instead of blocking the triggering query (default OFF) |
| Stale statistics | Outdated distribution data that causes the optimizer to misjudge row counts and pick bad plans |

## Check yourself

A high-concurrency OLTP table occasionally causes a query to pause noticeably right after
a large batch of updates. What AUTO setting is the likely cause, and which change would
smooth it out — with what tradeoff?
