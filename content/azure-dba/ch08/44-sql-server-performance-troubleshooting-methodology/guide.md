# Lesson 44 — SQL Server Performance Troubleshooting Methodology

**Chapter 8 · Query Performance Tuning · Lesson 44 of 95**

## What you'll learn

- The first question to ask before touching any query: is this one query, or the whole system?
- Whether the problem is new — a regression — or the database has genuinely always been this slow
- Why you check wait stats before you touch a single index or execution plan
- A repeatable triage checklist you'll reuse for the rest of this chapter

## Why methodology comes before syntax

Chapter 7 gave you the DMVs to see what a healthy baseline looks like
and the tools to watch CPU, memory, I/O, and sessions in real time.
This chapter is about what happens the moment someone says "the
database is slow." That sentence is almost never precise enough to
act on, and jumping straight to `CREATE INDEX` or rewriting a query
without first scoping the problem is how DBAs waste hours fixing the
wrong thing. Every remaining lesson in this chapter — execution
plans, index health, Query Store, blocking, DMVs, automatic tuning —
is a tool. This lesson is the decision tree for which tool to reach
for first.

## Question 1: is this one query, or the whole system?

"Slow" reported by a user is usually about one screen, one report, or
one job — a single query or a small batch. "Slow" reported as the
whole application timing out for everyone is a system-wide resource
problem: CPU, memory, I/O, or blocking affecting every session at
once. These have almost entirely different fixes:

```
One query is slow:                    The whole system is slow:
bad execution plan                     CPU/memory/I/O pressure (Ch. 7)
missing or unused index                blocking or a deadlock storm
a plan regression                      tempdb contention
                                        too much concurrent load
```

If you skip this question, you'll spend an hour tuning a query that
was never the actual bottleneck — the real problem was the whole
instance starved for memory, and every query on the box looked "slow"
as a symptom of that.

## Question 2: is this new, or has it always been this way?

A query that just got slower this week almost always has a **plan
regression** — a good plan replaced by a worse one, usually after a
statistics update, a parameter sniffing change, or a data volume
shift. A query that has *always* been slow, even under light load, is
more likely missing an index entirely, or written in a way that never
had a good plan to regress from. Query Store (Lessons 48–49) answers
this question directly by keeping plan history over time — but you
should be asking it before you ever open Query Store, because it
changes what you look for.

## Wait stats before indexes

The single most common mistake in performance troubleshooting is
guessing at a fix — usually "add an index" — before confirming what
SQL Server is actually *waiting* on. Every session that isn't running
is waiting on something, and SQL Server tracks exactly what:

```sql
-- Instance-wide: what has this SQL Server spent the most time waiting on?
SELECT TOP 10
    wait_type,
    wait_time_ms,
    waiting_tasks_count,
    wait_time_ms / waiting_tasks_count AS avg_wait_ms
FROM sys.dm_os_wait_stats
WHERE wait_time_ms > 0
  AND wait_type NOT IN ('CLR_SEMAPHORE','LAZYWRITER_SLEEP','SLEEP_TASK') -- benign background waits
ORDER BY wait_time_ms DESC;

-- One specific session right now: what is IT waiting on?
SELECT session_id, wait_type, wait_time, blocking_session_id, wait_resource
FROM sys.dm_exec_requests
WHERE session_id = 62;
```

If the top wait is `PAGEIOLATCH_SH`, the problem is disk I/O, not a
missing index. If it's `LCK_M_*`, the problem is blocking (Lesson
50), not a bad plan. If it's `CXPACKET`/`CXCONSUMER`, parallelism is
involved. Reading an execution plan (Lesson 45) before checking waits
means you're diagnosing the query without knowing what category of
problem you're even looking at.

## A repeatable methodology

1. **Scope it** — one query, or the whole instance? (Chapter 7's DMVs
   and monitoring tools answer the instance-wide half.)
2. **Time it** — new regression, or always been slow?
3. **Check waits first** — `sys.dm_os_wait_stats` instance-wide,
   `sys.dm_exec_requests` for one live session, before assuming
   the fix is a query or index change.
4. **Only then** read the execution plan, check index health, or
   consult Query Store — with the wait type telling you which of
   those tools actually applies.

This ordering is deliberate: it's cheap to check, and it prevents the
single most expensive mistake in this whole chapter — spending real
time tuning a query or index that was never the bottleneck.

## Key terms

| Term | Meaning |
|---|---|
| Scope | Whether a performance problem affects one query or the whole instance — the first triage question |
| Regression | A query that used to run fast and now doesn't, usually from a plan change |
| `sys.dm_os_wait_stats` | Instance-wide DMV showing cumulative time SQL Server has spent waiting, by wait type |
| `sys.dm_exec_requests` | DMV showing what a specific currently-running session is waiting on right now |

## Check yourself

You're ready for Lesson 45 when you can explain, without looking: why
should you check wait stats before you read an execution plan or
touch an index, and what two questions should you ask before you even
open a single tool in this chapter?
