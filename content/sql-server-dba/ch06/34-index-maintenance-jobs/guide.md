# Index Maintenance Jobs

## What you'll learn

- How to measure index fragmentation for real
- The exact `ALTER INDEX` syntax for both `REORGANIZE` and `REBUILD`
- The fragmentation thresholds that drive the decision between them

## Measuring fragmentation first

Before touching an index, measure it. The real DMV for this is
`sys.dm_db_index_physical_stats`:

```sql
SELECT
    OBJECT_NAME(ips.object_id) AS table_name,
    i.name AS index_name,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i
    ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.page_count > 1000   -- skip tiny indexes; not worth touching
ORDER BY ips.avg_fragmentation_in_percent DESC;
```

`'LIMITED'` mode is fast and good enough for a routine maintenance job; `'DETAILED'` costs more
but gives exact numbers — reserve it for one-off investigation.

## The industry-standard thresholds

Microsoft's own long-standing guidance, and what most real maintenance jobs implement:

- **Fragmentation under 5%** — do nothing. Not worth the I/O and log activity.
- **Fragmentation 5%–30%** — `REORGANIZE`.
- **Fragmentation above 30%** — `REBUILD`.

## REORGANIZE: lighter, always online

```sql
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders REORGANIZE;
```

`REORGANIZE` defragments the leaf level in place, is always an online operation (no blocking
schema modification lock), and can be stopped mid-operation without losing the work already
done — it simply resumes less complete next time. It doesn't update statistics and it's
generally slower per-page than a rebuild, which is why it's reserved for lighter fragmentation.

## REBUILD: heavier, but thorough — and it refreshes statistics

```sql
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders
    REBUILD WITH (ONLINE = ON, SORT_IN_TEMPDB = ON);

-- Rebuild every index on a table in one statement
ALTER INDEX ALL ON dbo.Orders REBUILD;
```

`REBUILD` drops and recreates the index from scratch, fully resolving fragmentation regardless
of how bad it was, and it refreshes the index's statistics as a side effect (with a full scan,
not the default sampled one). `ONLINE = ON` (Enterprise/Standard-with-limits, edition-dependent)
keeps the table available during the rebuild; without it, a rebuild takes a blocking schema
modification lock for its duration — a real scheduling consideration on a large, busy table.

## Putting it in a job

A real index-maintenance Agent job step is usually a stored procedure or script that loops
`sys.dm_db_index_physical_stats`, applies the threshold logic above per index, and issues the
matching `ALTER INDEX` statement — not one hardcoded statement per table. Lesson 38 covers the
maintained, parameterized version of exactly this logic (Ola Hallengren's `IndexOptimize`), which
is why most production environments don't hand-roll this loop themselves.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_db_index_physical_stats` | DMV reporting real fragmentation percentage and page count per index |
| `REORGANIZE` | Lighter, always-online defragmentation; doesn't refresh statistics |
| `REBUILD` | Heavier, drops/recreates the index; fully resolves fragmentation and refreshes statistics |
| `ONLINE = ON` | Rebuild option keeping the table available during the operation (edition-dependent) |

## Check yourself

An index on a 50-million-row table shows 42% fragmentation. Which operation does the standard
threshold call for, and what does that operation do to the index's statistics that a lighter
operation would not?
