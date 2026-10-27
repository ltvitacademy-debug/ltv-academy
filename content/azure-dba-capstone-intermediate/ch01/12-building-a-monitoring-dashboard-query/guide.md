# Lesson 12 — Building a Monitoring Dashboard Query

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 12 of 16**

## What you'll learn

- Pulling blocking, slow-query, and fragmentation signals into one view
- Why one query beats remembering to run five separate ones
- A real `CREATE VIEW` combining this chapter's DMVs
- What "ongoing visibility" actually buys you versus reacting to complaints

## From five separate queries to one view

This chapter has used five different DMV queries at five different
moments: sessions (Lesson 3), slow queries (Lesson 4), missing
indexes (Lesson 6), blocking (Lesson 8), and fragmentation (Lesson
10). Running all five by hand, every time someone complains, doesn't
scale — and it means you only ever look *after* a complaint already
arrived. A single view that surfaces the three highest-value signals
continuously changes that.

## Building the view

```sql
CREATE OR ALTER VIEW dbo.vw_HealthDashboard AS
SELECT 'Blocking' AS signal,
       CAST(r.session_id AS varchar(10)) AS detail,
       CAST(r.wait_time AS varchar(20)) AS metric
FROM sys.dm_exec_requests r
WHERE r.blocking_session_id <> 0

UNION ALL

SELECT 'Slow Query',
       LEFT(st.text, 80),
       CAST(qs.total_worker_time / qs.execution_count AS varchar(20))
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
WHERE qs.execution_count > 0
  AND qs.total_worker_time / qs.execution_count > 50000

UNION ALL

SELECT 'Fragmented Index',
       i.name,
       CAST(ips.avg_fragmentation_in_percent AS varchar(20))
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.page_count > 500 AND ips.avg_fragmentation_in_percent >= 15;
```

Three `UNION ALL` branches, one per signal this chapter diagnosed by
hand: active blocking right now, expensive cached queries by average
CPU, and indexes drifting back toward fragmentation. Each branch
reuses exactly the DMVs from earlier lessons — nothing new to learn,
just combined into one place.

## Why one query, not five

A DBA checking in once a day — or an automated alert querying this
view on a schedule — gets a single, scannable result set instead of
remembering which five queries to run and in what order. The `signal`
column makes it immediately obvious which category a row belongs to,
without re-deriving that from raw DMV output each time.

## What ongoing visibility actually changes

Every fix in this chapter so far was reactive: a department complained,
and the investigation started from there. A dashboard query you check
regularly — even just once a day — turns the same signals into
something proactive: catching a new blocking chain or a newly
fragmented index before a third department sends an email.

## Key terms

| Term | Meaning |
|---|---|
| `UNION ALL` | Combines multiple result sets into one, here one row per signal type |
| Reactive vs. proactive monitoring | Investigating after a complaint vs. catching the same signal earlier, on a schedule |

## Lab

Create `dbo.vw_HealthDashboard` against your own practice database
and query it. Confirm it surfaces a row for a deliberately created
blocking session, and a row for an index you've fragmented on
purpose, in the same result set.

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why
does combining five queries into one view change *when* you'd catch a
problem, not just how convenient it is to check?
