# Inspecting Indexes & Fragmentation

Chapter Three turns to index and statistics administration — the maintenance work that
keeps queries fast long after they were written. This lesson starts with the DMV that
tells you exactly how fragmented every index actually is, and the real thresholds
Microsoft documents for deciding what to do about it.

## What you'll learn

- `sys.dm_db_index_physical_stats` — the DMV that measures fragmentation directly
- Reading `avg_fragmentation_in_percent` and `page_count` together, not separately
- The documented thresholds: under 10%, 10–30%, and over 30%
- Why fragmentation on a small index is usually not worth touching at all

## Querying fragmentation directly

`sys.dm_db_index_physical_stats` is a DMF — it takes a database ID, object ID, index
ID, partition, and a scan mode, and returns physical statistics for the matching
indexes:

```sql
SELECT OBJECT_NAME(ips.object_id) AS table_name,
       i.name                     AS index_name,
       ips.avg_fragmentation_in_percent,
       ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes AS i
  ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.index_id > 0
ORDER BY ips.avg_fragmentation_in_percent DESC;
```

Passing `NULL` for object ID, index ID, and partition scans the whole database.
`'LIMITED'` is the lightest scan mode — it reads only the parent-level pages and is
safe to run against a production database during the day; `'DETAILED'` reads every
page and is far more expensive.

## The documented thresholds

Microsoft's own guidance, referenced constantly in real DBA work, ties
`avg_fragmentation_in_percent` to one of three actions:

| Fragmentation | Recommended action |
|---|---|
| Under 10% | Do nothing — not worth the cost of any maintenance operation |
| 10% – 30% | `ALTER INDEX ... REORGANIZE` |
| Over 30% | `ALTER INDEX ... REBUILD` |

```sql
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders REORGANIZE;

ALTER INDEX IX_Orders_CustomerID ON dbo.Orders REBUILD;
```

`REORGANIZE` is always online and low-impact — it defragments in small steps and can be
stopped and resumed. `REBUILD` drops and recreates the index in one operation; it's more
thorough but locks more heavily unless run `WITH (ONLINE = ON)` (Enterprise/certain
editions), a tradeoff Lesson 14 covers in depth.

## Page count matters as much as the percentage

A 90% fragmented index sounds alarming, but `page_count` changes what that number
means:

```sql
SELECT OBJECT_NAME(ips.object_id) AS table_name, i.name AS index_name,
       ips.avg_fragmentation_in_percent, ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes AS i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.index_id > 0 AND ips.page_count > 1000
ORDER BY ips.avg_fragmentation_in_percent DESC;
```

An index with `page_count` under roughly 1,000 (Microsoft's own suggested floor) fits
in only a handful of extents — fragmentation there barely changes I/O patterns, since
the whole thing is tiny and often already cached in memory. Filtering small indexes out
before acting on fragmentation percentage alone avoids maintenance work that has no
real performance payoff.

## Key terms

| Term | Meaning |
|---|---|
| `avg_fragmentation_in_percent` | The logical fragmentation of an index — how out-of-order its leaf-level pages are |
| `REORGANIZE` | Always-online, incremental defragmentation operation, appropriate for moderate fragmentation |
| `REBUILD` | Drops and recreates the index; more thorough, more resource-intensive, appropriate for heavy fragmentation |

## Check yourself

An index shows 85% fragmentation but only 40 pages total. Why might a DBA choose to
leave it alone rather than rebuild it?
