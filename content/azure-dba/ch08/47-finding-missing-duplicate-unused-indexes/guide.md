# Lesson 47 — Finding Missing, Duplicate & Unused Indexes

**Chapter 8 · Query Performance Tuning · Lesson 47 of 95**

## What you'll learn

- How to find indexes the optimizer wants but doesn't have, with `sys.dm_db_missing_index_details`
- How to find duplicate indexes — two indexes covering the same leading columns, wasting write overhead for nothing
- How to find unused indexes with `sys.dm_db_index_usage_stats`, and why an unused index isn't free
- Why this is a DMV-driven audit, not a one-time task

## From creating indexes to auditing a whole database's worth

T-SQL Development Lessons 88–89 covered creating clustered,
nonclustered, filtered, and covering indexes correctly. On a real
production database you didn't design from scratch, the more common
job is the opposite direction: auditing indexes that already exist,
finding what's missing, what's duplicated, and what's just costing
write overhead for nothing. SQL Server tracks all three with DMVs
that persist since the last restart.

## Finding missing indexes

Every time the optimizer runs a query and would have benefited from
an index that doesn't exist, it records that fact:

```sql
SELECT
    d.statement AS table_name,
    d.equality_columns,
    d.inequality_columns,
    d.included_columns,
    s.avg_total_user_cost,
    s.avg_user_impact,
    s.user_seeks + s.user_scans AS times_this_would_have_helped
FROM sys.dm_db_missing_index_details d
JOIN sys.dm_db_missing_index_groups g ON d.index_handle = g.index_handle
JOIN sys.dm_db_missing_index_group_stats s ON g.index_group_handle = s.group_handle
ORDER BY s.avg_user_impact * (s.user_seeks + s.user_scans) DESC;
```

`equality_columns` is what should usually lead the new index (columns
used with `=`); `included_columns` is what to add with `INCLUDE` to
make it covering. `avg_user_impact` is the optimizer's *own estimate*
of the percentage improvement — treat it as a strong hint, not a
guarantee, and always verify with a real execution plan (Lesson 45)
before and after creating the index.

## Finding duplicate indexes

Every nonclustered index costs something on every `INSERT`, `UPDATE`,
and `DELETE` — it has to be maintained. Two indexes with the same
leading key columns are almost always redundant, even if their
included columns differ slightly:

```sql
-- Indexes grouped by their leading (first) key column per table --
-- more than one group per table+column is a duplicate candidate
SELECT
    t.name AS table_name,
    i.name AS index_name,
    c.name AS leading_column,
    i.type_desc
FROM sys.indexes i
JOIN sys.index_columns ic ON ic.object_id = i.object_id AND ic.index_id = i.index_id AND ic.key_ordinal = 1
JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
JOIN sys.tables t ON t.object_id = i.object_id
WHERE i.type_desc = 'NONCLUSTERED'
ORDER BY t.name, c.name;
```

Scan the output for the same `table_name` + `leading_column`
appearing more than once — that's your duplicate candidate list. The
fix is usually to keep the more heavily-used one (check usage stats
below first) and drop the other, or merge their included columns into
a single covering index.

## Finding unused indexes

An index that's never used for a seek or scan still costs write
overhead on every modification, and costs storage, for zero query
benefit:

```sql
SELECT
    t.name AS table_name,
    i.name AS index_name,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates AS writes_this_index_absorbed
FROM sys.indexes i
JOIN sys.tables t ON t.object_id = i.object_id
LEFT JOIN sys.dm_db_index_usage_stats s
    ON s.object_id = i.object_id AND s.index_id = i.index_id AND s.database_id = DB_ID()
WHERE i.type_desc = 'NONCLUSTERED'
  AND ISNULL(s.user_seeks, 0) = 0
  AND ISNULL(s.user_scans, 0) = 0
  AND ISNULL(s.user_lookups, 0) = 0
ORDER BY ISNULL(s.user_updates, 0) DESC;
```

An index with zero seeks, scans, *and* lookups, but a high
`user_updates` count, is pure overhead — it's absorbing write cost on
every change to the table and returning nothing in exchange. One
important caveat: `sys.dm_db_index_usage_stats` resets on every
service restart, so "unused" here means "unused since the last
restart," not "unused forever" — check over a representative time
window, not right after a failover.

## Putting the three together

This lesson's three queries form a single audit pass: add what's
missing, remove what's duplicated, and drop what's genuinely unused —
always cross-checked against a real execution plan or Query Store
history (Lessons 48–49) before actually dropping anything in
production.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_db_missing_index_details` | DMV listing indexes the optimizer wanted but didn't have, with the columns it needed |
| Duplicate index | Two or more indexes sharing the same leading key columns — redundant write overhead |
| `sys.dm_db_index_usage_stats` | DMV tracking seeks/scans/lookups/updates per index since the last restart |

## Check yourself

You're ready for Lesson 48 when you can explain, without looking: why
is an index with zero seeks, scans, and lookups still not "free," and
why does `sys.dm_db_index_usage_stats` showing zero usage not
necessarily mean the index has never been used?
