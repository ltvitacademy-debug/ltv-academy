# Network-Related Waits

This lesson closes out the chapter's wait-type tour with one that's genuinely different
in character from the others: `ASYNC_NETWORK_IO`. Unlike CPU, I/O, or memory waits — which
usually mean SQL Server itself needs to fix something — this one usually means the
*client* is the bottleneck, and the honest, disciplined response is to say so rather than
tune the server for a problem it doesn't have.

## What you'll learn

- What `ASYNC_NETWORK_IO` actually measures
- Why it almost always points at the client, not SQL Server
- The classic causes: slow client-side processing, row-by-row fetch patterns, huge result
  sets over a thin pipe
- Why "tuning SQL Server" is usually the wrong response to this wait type

## What ASYNC_NETWORK_IO actually measures

`ASYNC_NETWORK_IO` accumulates when SQL Server has results ready to send back to the
client, but the network send has to wait — typically because the client application
hasn't yet asked for (consumed) the next batch of rows the network buffer already holds.
It is *not* generally a measure of network cable or switch latency; it's a measure of the
client's consumption rate relative to how fast SQL Server can produce rows.

```sql
SELECT wait_type, waiting_tasks_count, wait_time_ms, signal_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_type = 'ASYNC_NETWORK_IO';
```

## Why this usually isn't SQL Server's problem

This is the one wait type in the chapter where the honest framing runs against
instinct: a high `ASYNC_NETWORK_IO` total is, in the overwhelming majority of cases, a
symptom of something slow on the client side, not a SQL Server performance defect.
Common real causes:

- **Row-by-row client processing** — the application fetches a row, does meaningful work
  (writes to a UI grid, calls another API, writes a file) before fetching the next row,
  instead of pulling the full result set quickly and processing after.
- **Huge result sets returned to a thin client** — a report tool pulling millions of rows
  back to a desktop app over a slow or congested network link, when the aggregation
  should have happened in the query itself.
- **`SELECT *` habits** — pulling far more columns/data than the client actually displays
  or uses, multiplying the amount of data that has to be shipped and consumed.

## What to check to confirm this framing

Before concluding "the client is slow" and moving on, correlate: is `ASYNC_NETWORK_IO`
concentrated on a handful of specific sessions or applications (checked via
`sys.dm_exec_sessions` / `sys.dm_exec_requests` joined on `session_id`, looking at
`program_name` and `host_name`), or is it evenly spread across the whole workload? A
handful of report-tool sessions with the wait, and everything else clean, strongly
supports the client-side explanation. If it's genuinely pervasive across many different
client applications and hosts, it's worth double-checking actual network infrastructure
(switch saturation, a bad NIC) rather than assuming every client is equally slow — that
is the rare exception, not the default assumption.

## The right response is usually not "tune SQL Server"

Because the wait originates from the client's consumption rate, the fixes live on the
client side or in the query's design, not in SQL Server configuration: batch client-side
processing after retrieval instead of during, aggregate in the query so less data crosses
the wire, or paginate/limit huge result sets instead of streaming millions of rows to a
UI that can't keep up. Treating this like a `PAGEIOLATCH` or `SOS_SCHEDULER_YIELD`
problem — tuning storage or CPU configuration — wastes effort on a subsystem that isn't
actually the bottleneck.

## Key terms

| Term | Meaning |
|---|---|
| `ASYNC_NETWORK_IO` | Wait recorded when SQL Server has results ready but the network send is waiting on the client to consume the buffer |
| Row-by-row fetch pattern | Client code that processes each row individually before fetching the next, slowing overall consumption |
| `program_name` / `host_name` | Session-level columns useful for identifying which specific client application is accumulating a wait type |

## Check yourself

`ASYNC_NETWORK_IO` is the top wait type on a server, but it's concentrated almost
entirely on sessions from one third-party reporting tool, while every other application's
sessions show negligible amounts. Per this lesson, what should you investigate first —
and what should you probably *not* spend time doing?
