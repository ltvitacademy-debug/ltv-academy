# Wait Stats Methodology

Every earlier chapter in this course looked at cost from the query's side — execution
plans, indexes, rewrites. Wait statistics flip the view: instead of asking "what is this
query doing," you ask "what is SQL Server *waiting on*, across the whole instance, right
now." That single shift is the foundation for almost everything in this chapter.

## What you'll learn

- What `sys.dm_os_wait_stats` actually counts, and why it's cumulative
- Signal wait time vs. resource wait time — and why the difference matters
- Why you must clear wait stats before a measurement window
- How to rank waits by percentage of total to find what's actually worth chasing

## Every wait is a task saying "I couldn't run"

Whenever a SQL Server worker thread (a task) can't make forward progress — it needs a
data page not yet in memory, a lock another session holds, or simply a free CPU
scheduler — it stops running and starts *waiting*. SQL Server records every one of these
events in `sys.dm_os_wait_stats`, aggregated by wait type, since the instance last
restarted (or since the counters were last cleared):

```sql
SELECT TOP 20
    wait_type,
    waiting_tasks_count,
    wait_time_ms,
    signal_wait_time_ms,
    wait_time_ms - signal_wait_time_ms AS resource_wait_time_ms
FROM sys.dm_os_wait_stats
ORDER BY wait_time_ms DESC;
```

This is the single most useful triage query in SQL Server. It doesn't tell you which
query is slow — it tells you what *category* of problem you're dealing with before you
spend an hour looking in the wrong place.

## Signal wait vs. resource wait

`wait_time_ms` is the total time a wait type accumulated, but it's made of two very
different things:

- **Resource wait time** (`wait_time_ms - signal_wait_time_ms`) — time genuinely spent
  waiting for the resource itself: a page to be read from disk, a lock to be released, a
  memory grant to become available.
- **Signal wait time** (`signal_wait_time_ms`) — time spent *ready to run* but waiting for
  a CPU scheduler to become free. This is scheduler queuing, not resource contention.

A high signal-wait percentage across the board (not tied to one wait type) points at CPU
pressure — too many runnable tasks, not enough schedulers to run them. A high resource
wait time concentrated in one wait type (say, `PAGEIOLATCH_SH`) points at a specific
subsystem — in that case, storage I/O.

## Why you must clear wait stats before measuring

Because `sys.dm_os_wait_stats` accumulates from the last restart (which could be weeks or
months ago), raw numbers are nearly useless for diagnosing a *current* problem — a wait
type with a huge total might have all its weight from a one-time event last month.
Before any measurement window, reset the counters:

```sql
DBCC SQLPERF('sys.dm_os_wait_stats', CLEAR);
```

Then let the workload run for the window you care about (an hour of business load, or
the duration of a slow batch job), and query the DMV again. Now every number reflects
only that window — this is the same "measure a clean baseline" discipline from Lesson 3,
applied specifically to waits.

## Ranking waits by percentage of total

A raw `wait_time_ms` sort is a good start, but the more rigorous version computes each
wait type's share of *all* accumulated wait time, and looks at the running total —
because the top 3 or 4 wait types almost always account for the overwhelming majority of
the problem:

```sql
WITH Waits AS (
    SELECT wait_type, wait_time_ms,
           100.0 * wait_time_ms / SUM(wait_time_ms) OVER () AS pct
    FROM sys.dm_os_wait_stats
    WHERE wait_type NOT IN (
        -- benign / background waits that are always present and rarely diagnostic
        'SLEEP_TASK','BROKER_TASK_STOP','BROKER_TO_FLUSH','CLR_SEMAPHORE',
        'LAZYWRITER_SLEEP','XE_TIMER_EVENT','REQUEST_FOR_DEADLOCK_SEARCH',
        'SQLTRACE_INCREMENTAL_FLUSH_SLEEP','WAITFOR','DIRTY_PAGE_POLL',
        'HADR_FILESTREAM_IOMGR_IOCOMPLETION'
    )
)
SELECT wait_type, wait_time_ms, pct,
       SUM(pct) OVER (ORDER BY wait_time_ms DESC) AS running_pct
FROM Waits
ORDER BY wait_time_ms DESC;
```

Filtering out the known-benign background waits matters — without it, harmless waits
that every idle instance accumulates (like `SLEEP_TASK`) crowd out the signal. The
following four lessons each dig into one specific wait-type family this methodology
surfaces: CPU, I/O, memory, and network.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_os_wait_stats` | Cumulative DMV recording total time and count for every wait type since restart or last clear |
| Resource wait time | Time spent genuinely waiting for a resource (`wait_time_ms - signal_wait_time_ms`) |
| Signal wait time | Time spent ready-to-run but queued for a free CPU scheduler |
| `DBCC SQLPERF('sys.dm_os_wait_stats', CLEAR)` | Resets the wait stats counters so the next measurement window starts clean |

## Check yourself

Two servers both show `PAGEIOLATCH_SH` as their top wait type by `wait_time_ms`. Server A
has high signal wait time on that same total; Server B has almost none. What does that
difference suggest about where to look next on each server?
