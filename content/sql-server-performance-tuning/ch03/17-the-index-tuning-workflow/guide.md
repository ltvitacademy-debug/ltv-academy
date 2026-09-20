# The Index Tuning Workflow

This chapter has covered five distinct index shapes — clustered/nonclustered basics,
covering, included columns, filtered, and columnstore. None of that knowledge tells you
*when* to reach for which one. This lesson ties it back to Lesson 1's systematic loop —
measure, identify, change, verify — applied specifically to indexes, with the real DMV
that starts the process.

## What you'll learn

- How to measure actual index usage with `sys.dm_db_index_usage_stats`
- How to identify the gap between what's indexed and what queries actually need
- Why "add one index, verify, repeat" beats a big batch of speculative changes

## Measure: what is SQL Server actually doing with your indexes right now?

`sys.dm_db_index_usage_stats` is a real, documented dynamic management view that tracks,
per index, how many seeks, scans, lookups, and updates have happened since the last service
restart (its counters reset then, so treat it as "since restart," not "all time").

```sql
SELECT
    OBJECT_NAME(s.object_id) AS TableName,
    i.name AS IndexName,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates
FROM sys.dm_db_index_usage_stats AS s
JOIN sys.indexes AS i
    ON s.object_id = i.object_id AND s.index_id = i.index_id
WHERE s.database_id = DB_ID()
ORDER BY s.user_seeks + s.user_scans + s.user_lookups DESC;
```

Two patterns jump out from this view immediately: an index with high `user_updates` but
near-zero `user_seeks`/`user_scans`/`user_lookups` is pure write overhead with no read
payoff — a strong drop candidate. An index missing entirely from this view, despite
existing on the table, has never been used once since the last restart.

## Identify: where's the gap between what's indexed and what's needed?

High `user_lookups` on a table's clustered index, paired with heavy seeks on a
nonclustered index, is the DMV-level signature of the Key Lookup pattern from Lesson 13 —
it's telling you a specific nonclustered index is *almost* covering its queries and would
benefit from `INCLUDE`. Pairing this DMV data with the plan cache (Lesson 10) — specifically
missing-index suggestions surfaced in actual execution plans — turns "the database feels
slow" into a specific, evidence-backed list: this index isn't used, this one needs two more
included columns, this table needs a covering index for its busiest query.

## Change and verify: one index at a time, not a batch

Add or modify exactly one index, then re-run the specific query (or queries) you targeted
and pull its actual execution plan (Lesson 7). Confirm the Key Lookup you were chasing is
gone, or that the scan became a seek. Then re-check `sys.dm_db_index_usage_stats` after
enough production traffic has passed to be meaningful.

Changing several indexes at once and declaring victory when "things feel faster" repeats
the exact mistake Lesson 1 called out: you can't attribute the improvement to any specific
change, and you have no way to notice if one of those changes quietly hurt something else
— like write throughput on a table that just got three new indexes at once. The loop only
works if each iteration isolates one variable.

## Key terms

| Term | Meaning |
|---|---|
| sys.dm_db_index_usage_stats | DMV tracking seeks/scans/lookups/updates per index since the last service restart |
| Unused index | An index present on a table but absent from usage-stats output — a drop candidate |
| Missing-index suggestion | Optimizer-surfaced hint in an actual execution plan pointing at an index that would help a specific query |
| One-change iteration | Changing exactly one index per loop pass so the before/after comparison is attributable |

## Check yourself

`sys.dm_db_index_usage_stats` shows an index with 40,000 `user_updates` and zero
`user_seeks`, `user_scans`, or `user_lookups` since the last restart. What does this
suggest, and what should you check before acting on it?
