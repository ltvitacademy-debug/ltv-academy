# Wait Statistics

Every task in SQL Server spends its life in one of three states: running on a CPU,
runnable and waiting for a CPU to free up, or suspended and waiting on something else
entirely — a page to come off disk, a lock to release, a log write to flush. That third
state is where the real story lives, and `sys.dm_os_wait_stats` is where SQL Server
keeps score.

## What you'll learn

- What `sys.dm_os_wait_stats` actually counts, and since when
- Reading `wait_time_ms` versus `signal_wait_time_ms` correctly
- The handful of wait types that show up in almost every "why is the server slow" ticket
- Why you filter benign waits out before you draw any conclusion

## Querying sys.dm_os_wait_stats

`sys.dm_os_wait_stats` is a cumulative counter — every wait since the instance last
started (or since someone last cleared it) is added up here, aggregated by `wait_type`:

```sql
SELECT TOP 10 wait_type, waiting_tasks_count, wait_time_ms,
       signal_wait_time_ms,
       wait_time_ms - signal_wait_time_ms AS resource_wait_ms
FROM sys.dm_os_wait_stats
WHERE wait_type NOT IN (
    'SLEEP_TASK','BROKER_TASK_STOP','BROKER_TO_FLUSH','CLR_SEMAPHORE',
    'LAZYWRITER_SLEEP','SQLTRACE_BUFFER_FLUSH','WAITFOR',
    'XE_TIMER_EVENT','ONDEMAND_TASK_QUEUE','CHECKPOINT_QUEUE'
)
ORDER BY wait_time_ms DESC;
```

`wait_time_ms` is the total time tasks spent waiting on that wait type.
`signal_wait_time_ms` is the slice of that time spent waiting for a CPU to actually
become available *after* the wait was satisfied — subtract it out and you're left with
genuine resource wait time. A high signal-wait share relative to total wait time points
at CPU pressure, not the resource the wait type names.

## The waits that show up constantly

A handful of wait types account for most real troubleshooting:

| Wait type | Generally means |
|---|---|
| `PAGEIOLATCH_SH` / `PAGEIOLATCH_EX` | Waiting on a data page to be physically read from disk into the buffer pool — storage I/O bottleneck |
| `CXPACKET` | A parallel query's threads waiting on each other; common on wide parallel scans, not automatically a problem |
| `CXCONSUMER` | The "waiting for work" half of the same parallelism picture, split out from `CXPACKET` since SQL Server 2016 |
| `LCK_M_S` / `LCK_M_U` / `LCK_M_X` | Waiting to acquire a shared, update, or exclusive lock — this is blocking, covered in full in Lesson 9 |
| `WRITELOG` | Waiting for a transaction log write to flush to disk — points at log-drive I/O |
| `ASYNC_NETWORK_IO` | SQL Server waiting for the client application to consume rows it already sent — often an app-side problem, not a server one |
| `SOS_SCHEDULER_YIELD` | A task voluntarily yielded the CPU because it hit its scheduling quantum — a sign of CPU pressure at volume |

None of these are inherently bad in isolation — they only become a diagnosis once one
type dominates the list and its resource wait time is climbing over your monitoring
window.

## Filtering the noise and resetting the baseline

A freshly started instance and one that's been up for six months both accumulate
"background" waits that never mean anything — `SLEEP_TASK`, `LAZYWRITER_SLEEP`, and
similar entries exist because a background thread is idling on purpose. Excluding them
(as the query above does) is standard practice before ranking by `wait_time_ms`. To take
a clean before/after snapshot around a specific workload, clear the counters first:

```sql
DBCC SQLPERF(N'sys.dm_os_wait_stats', CLEAR);
```

Run the workload, then query `sys.dm_os_wait_stats` again — every number now reflects
only what happened since the clear, not the last six months of instance uptime.

## Key terms

| Term | Meaning |
|---|---|
| `wait_time_ms` | Cumulative time (ms) tasks spent in a given wait type since the counters were last reset |
| `signal_wait_time_ms` | The portion of wait time spent waiting for a CPU after the wait was already satisfied |
| Resource wait | `wait_time_ms - signal_wait_time_ms` — time actually waiting on the named resource, not on CPU |

## Check yourself

Two wait types have identical `wait_time_ms`, but one has a much higher
`signal_wait_time_ms` than the other. What does that difference tell you about where the
bottleneck actually is?
