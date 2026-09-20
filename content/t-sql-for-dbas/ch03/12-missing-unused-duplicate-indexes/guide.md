# Missing, Unused & Duplicate Indexes

Fragmentation is only worth fixing on an index that's earning its place. This lesson
covers the other side of index health: finding indexes the optimizer wishes existed,
finding indexes nobody's using, and finding indexes that are redundant duplicates of
each other.

## What you'll learn

- `sys.dm_db_missing_index_details` and why its suggestions need a skeptical read
- `sys.dm_db_index_usage_stats` — seeks and scans versus updates, on the same index
- Spotting duplicate indexes that differ only in column order or included columns
- Why missing-index DMV output is a lead to investigate, not a script to run blind

## What the missing index DMVs actually record

Every time the optimizer builds a plan and decides an index it doesn't have would have
helped, it logs that fact. `sys.dm_db_missing_index_details` exposes it:

```sql
SELECT mid.statement                      AS table_name,
       mid.equality_columns,
       mid.inequality_columns,
       mid.included_columns,
       migs.user_seeks,
       migs.avg_total_user_cost,
       migs.avg_user_impact
FROM sys.dm_db_missing_index_details AS mid
JOIN sys.dm_db_missing_index_groups AS mig
  ON mid.index_handle = mig.index_handle
JOIN sys.dm_db_missing_index_group_stats AS migs
  ON mig.index_group_handle = migs.group_handle
ORDER BY migs.avg_user_impact DESC;
```

`equality_columns` and `inequality_columns` suggest the key column order; `avg_user_impact`
estimates the percentage improvement the optimizer thinks that index would give affected
queries.

## Why the missing-index DMV needs a skeptical read

This DMV has real, documented caveats that make blindly creating every suggested index
a mistake:

- It only reflects queries that have actually run since the last restart — a query that
  never ran doesn't generate a suggestion, and one that ran once can produce a
  suggestion with almost no real weight behind it.
- It never suggests included columns for covering beyond what a single query needed,
  and never considers column order optimally — two different suggestions for the same
  table are common and often overlap heavily.
- It doesn't account for the cost of maintaining a new index on every `INSERT`/`UPDATE`/
  `DELETE` — a suggestion with a huge `avg_user_impact` on a heavily written table can
  still be a net loss.

The DMV is a lead worth investigating with real workload knowledge, not a list to
script through unattended.

## Finding indexes nobody uses

`sys.dm_db_index_usage_stats` tracks reads (seeks, scans, lookups) and writes (updates)
per index since the last restart — the other half of the picture:

```sql
SELECT OBJECT_NAME(ius.object_id) AS table_name,
       i.name                     AS index_name,
       ius.user_seeks, ius.user_scans, ius.user_lookups,
       ius.user_updates
FROM sys.dm_db_index_usage_stats AS ius
JOIN sys.indexes AS i
  ON ius.object_id = i.object_id AND ius.index_id = i.index_id
WHERE ius.database_id = DB_ID()
ORDER BY ius.user_seeks + ius.user_scans + ius.user_lookups ASC;
```

An index with high `user_updates` but zero `user_seeks`/`user_scans`/`user_lookups` is
pure overhead — every write pays to maintain it, and nothing ever reads through it.
That's a strong candidate to drop, though confirm no infrequent nightly or monthly job
uses it before removing anything.

## Spotting duplicate indexes

Duplicate (or near-duplicate) indexes are indexes on the same table whose key columns
overlap so heavily that one is redundant — most often the same leading columns in a
different order, or the same key with a slightly different set of included columns:

```sql
SELECT OBJECT_NAME(object_id) AS table_name, name AS index_name,
       STRING_AGG(col.name, ', ') AS key_columns
FROM sys.indexes AS i
CROSS APPLY (
    SELECT c.name
    FROM sys.index_columns AS ic
    JOIN sys.columns AS c
      ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    WHERE ic.object_id = i.object_id AND ic.index_id = i.index_id
      AND ic.is_included_column = 0
    ORDER BY ic.key_ordinal
) AS col
WHERE i.index_id > 0
GROUP BY i.object_id, i.name
ORDER BY table_name;
```

Reviewing the resulting `key_columns` list per table by eye is usually enough to spot
two indexes that are effectively the same index maintained twice.

## Key terms

| Term | Meaning |
|---|---|
| `avg_user_impact` | The optimizer's estimated percentage cost improvement a missing index would give affected queries |
| `user_seeks` / `user_scans` / `user_lookups` | Read-side usage counters on `sys.dm_db_index_usage_stats`, tracking how an index is actually used |
| Duplicate index | Two indexes on the same table with heavily overlapping key columns, making one redundant maintenance overhead |

## Check yourself

The missing-index DMV suggests an index with a very high `avg_user_impact` on a table
that receives thousands of writes per minute. Why shouldn't a DBA create it without
further investigation?
