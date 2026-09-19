# Lesson 53 — Index Maintenance & Fragmentation

**Chapter 9 · Database Performance & Maintenance · Lesson 53 of 95**

## What you'll learn

- What index fragmentation actually is, and why inserts/updates/deletes cause it
- How to measure it with `sys.dm_db_index_physical_stats`
- REBUILD vs. REORGANIZE — the real trade-off, not just "rebuild is better"
- Azure-specific considerations: maintenance windows, and the compute cost of a rebuild on a metered database

## What fragmentation actually is

T-SQL Development covered what an index is and why you create one —
a b-tree that keeps rows in a defined logical order so seeks stay
fast. It didn't cover what happens to that structure over time. Every
`INSERT`, `UPDATE`, and `DELETE` against an indexed column can force a
page split: SQL Server has to make room mid-page, so it allocates a
new page and moves half the rows onto it. The new page usually isn't
physically next to the old one on disk. Do that enough times and the
index's *logical* order (still correct) stops matching its *physical*
order on disk — that mismatch is fragmentation, and it turns what
should be sequential reads into scattered ones.

## Measuring it for real

Guessing is not a maintenance strategy. `sys.dm_db_index_physical_stats`
is the actual DMV for this:

```sql
SELECT
    OBJECT_NAME(ips.object_id) AS table_name,
    i.name AS index_name,
    ips.avg_fragmentation_in_percent,
    ips.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') AS ips
JOIN sys.indexes AS i
    ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.page_count > 500
ORDER BY ips.avg_fragmentation_in_percent DESC;
```

The `page_count > 500` filter matters as much as the fragmentation
number — a 300-page index at 80% fragmented isn't worth touching;
the whole thing fits in a handful of reads either way. Fragmentation
only costs you real I/O once an index is big enough that its physical
layout actually determines how many pages a scan touches.

## REBUILD vs. REORGANIZE

Both fix fragmentation. They are not interchangeable:

| | REBUILD | REORGANIZE |
|---|---|---|
| How it works | Drops and recreates the index from scratch | Walks the leaf level in place, swapping pages into order |
| Thoroughness | Fully defragments | Only defragments the leaf level, and only partially at high fragmentation |
| Online (Enterprise/Azure) | Can run `WITH (ONLINE = ON)` | Always online — never blocks concurrent access |
| Resource cost | Heavy — full sort, large transaction log write | Light — small, incremental transactions |
| Updates statistics | Yes, with a full scan, as a side effect | No — you still need `UPDATE STATISTICS` separately |

```sql
-- Thorough, resource-heavy, briefly blocking unless ONLINE:
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders REBUILD WITH (ONLINE = ON);

-- Lighter, always online, less thorough:
ALTER INDEX IX_Orders_CustomerID ON dbo.Orders REORGANIZE;
```

The common rule of thumb — reorganize between roughly 5-30%
fragmentation, rebuild above 30% — is a starting point, not a law.
On a small, quiet table, even 40% fragmentation might not be worth a
rebuild's transaction log churn. On a huge, hot table, you may choose
to reorganize more often specifically because you can't afford a
rebuild's resource spike.

## Azure-specific considerations

On Azure SQL Database and Managed Instance, index maintenance isn't
free the way it might feel on an on-prem box you already own: a
`REBUILD` on vCore or DTU compute consumes the same CPU/IO/log
throughput your application workload is paying for at that moment.
That makes two things real DBA decisions, not just SQL syntax
choices:

- **When**: schedule rebuilds inside a genuine low-traffic maintenance
  window (via SQL Server Agent, or Azure Automation on platforms
  where Agent support is limited — covered starting in Chapter 10).
- **Cost**: a rebuild that spikes a DTU database into throttling, or
  that burns log space fast enough to trigger autogrow, is a cost and
  availability decision, not just a performance one. `REORGANIZE`'s
  lighter footprint is sometimes the right choice specifically
  *because* it won't compete as hard with paying traffic.

## Key terms

| Term | Meaning |
|---|---|
| Fragmentation | Mismatch between an index's logical (b-tree) order and its physical order on disk |
| `sys.dm_db_index_physical_stats` | The DMV that measures real fragmentation and page count per index |
| REBUILD | Drop-and-recreate; thorough, resource-heavy, can run online |
| REORGANIZE | In-place leaf-level defrag; lighter, always online, less thorough |

## Check yourself

You're ready for Lesson 54 when you can explain, without looking: why
does a 300-page index at 80% fragmentation matter far less than a
50,000-page index at 30%, and why is `REORGANIZE` sometimes the
better choice on Azure even when it's less thorough than `REBUILD`?
