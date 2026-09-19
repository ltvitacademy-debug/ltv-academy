# Lesson 43 — Monitoring Sessions, Connections, CPU, Memory, I/O & Storage

**Chapter 7 · Monitoring Azure SQL · Lesson 43 of 95**

## What you'll learn

- A real "something feels slow" investigation checklist, tying this whole
  chapter together
- The rough order to check things in, and why that order isn't arbitrary
- Concrete DMV queries for each stage of the checklist
- What's next: Chapter 8, this course's single largest chapter

## "Something feels slow" is not a diagnosis

Every DBA gets this report from a user or a dashboard alert: "the
database feels slow." That sentence alone tells you nothing about
whether it's one query, one user, the whole server, or storage running
out. This lesson is the checklist that turns that vague report into a
specific finding, using the baseline (Lesson 38), the alerts (Lesson 39),
and the DMVs (Lesson 41) from earlier in this chapter — in a deliberate
order, because checking things out of order wastes time chasing symptoms
instead of causes.

## The checklist, in order

1. **Sessions and connections first** — are there far more active
   sessions than your baseline, or a specific session pinned at
   `RUNNABLE`/`SUSPENDED` status for an unusually long time? This is
   often the fastest way to spot one specific runaway query or a
   blocking chain before you've spent time looking anywhere else.
2. **CPU next** — is overall compute utilization actually elevated
   relative to baseline, or is it one session hogging it?
3. **Memory** — is there memory pressure serious enough to be causing
   plan evictions or spills to disk?
4. **I/O** — is data or log I/O the actual bottleneck, and is it one
   query's I/O pattern or genuinely elevated across the board?
5. **Storage** — last, because it's usually the slowest-moving of the
   five and least likely to be today's sudden cause, but a database
   nearing its provisioned max size can silently degrade write
   performance well before it actually runs out.

Sessions first because it's the fastest signal and often finds the
actual cause immediately. Storage last because it changes slowly and
rarely explains a sudden "feels slow right now."

## Queries for each stage

```sql
-- 1. Sessions: what's running right now, and for how long
SELECT session_id, status, cpu_time, total_elapsed_time, wait_type, blocking_session_id
FROM sys.dm_exec_requests
WHERE session_id > 50
ORDER BY total_elapsed_time DESC;
```

```sql
-- 2/3/4. CPU, memory, I/O together, via Azure SQL's resource view
SELECT TOP 10 end_time, avg_cpu_percent, avg_memory_usage_percent,
       avg_data_io_percent, avg_log_write_percent
FROM sys.dm_db_resource_stats
ORDER BY end_time DESC;
```

```sql
-- 5. Storage: current file space usage
SELECT
    DB_NAME(database_id) AS database_name,
    (SUM(size) * 8.0 / 1024) AS allocated_mb,
    (SUM(FILEPROPERTY(name, 'SpaceUsed')) * 8.0 / 1024) AS used_mb
FROM sys.master_files
WHERE database_id = DB_ID()
GROUP BY database_id;
```

`sys.dm_exec_requests` (unlike `sys.dm_exec_sessions` from Lesson 41)
shows only sessions with something actively executing right now, which
is exactly what you want when hunting a current slowdown —
`blocking_session_id` populated and non-zero is often the whole answer
by itself.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_exec_requests` | DMV showing currently executing requests, including blocking chain information |
| Investigation order | Sessions/connections → CPU → memory → I/O → storage — fastest signal first, slowest-moving last |
| `blocking_session_id` | A `dm_exec_requests` column showing which session (if any) is blocking this one |

## Chapter 7 complete — what's next

That closes Chapter 7, Monitoring Azure SQL. You now have a baseline, a
way to be alerted automatically, a fleet-wide view, the specific DMVs to
query by hand, a lightweight tracing system for capturing events as they
happen, and a real checklist for tying it all together during an
incident. **Chapter 8, Query Performance Tuning, is next — and it's this
course's single largest chapter at 9 lessons**, because query performance
is where a DBA spends the most real-world time: reading execution plans,
finding missing and unused indexes, Query Store, blocking and deadlocks,
and the query-tuning DMVs that this chapter deliberately set aside.

## Check yourself

You're ready for Lesson 44 when you can explain: what's the checklist
order for a "something feels slow" investigation, and why does it start
with sessions and end with storage instead of the reverse?
