# SQLOS

## What you'll learn

- What SQLOS is and why SQL Server has its own OS-like layer at all
- How non-preemptive scheduling on schedulers and workers differs from ordinary OS threading
- Where memory management and I/O completion fit into this same layer

## An operating system inside the operating system

Windows (or Linux, since SQL Server 2017) already schedules threads and manages memory — so
why would SQL Server build its own layer on top? Because a general-purpose OS scheduler is
tuned for fairness across arbitrary desktop and server workloads, not for a single process
juggling thousands of concurrent user requests against a shared buffer pool. **SQLOS** is
that thin abstraction layer: it sits between the Database Engine's components (the relational
engine, storage engine, and so on) and the underlying OS, handling three jobs — scheduling,
memory management, and I/O completion — in a way tuned specifically for database workloads.

SQLOS isn't a separate process or a kernel replacement. It's a layer of code inside
`sqlservr.exe` that the rest of the Engine calls into instead of calling Windows APIs directly.

## Non-preemptive scheduling

This is the part that surprises people coming from general application development. On a
normal OS, the scheduler can interrupt (preempt) any thread at any time to give another
thread a turn. SQLOS schedulers are **non-preemptive** (cooperative): a worker thread runs
until it voluntarily yields — typically at a natural point like waiting on a lock, a page
read, or a network write — rather than being forcibly interrupted mid-execution.

The building blocks:

- **SQLOS scheduler** — SQL Server creates one scheduler per logical CPU core visible to the
  instance. Each scheduler maps to one OS thread and manages its own pool of workers.
- **Worker thread** — the thing that actually executes a task (like running your query). A
  scheduler hands a worker to a runnable task and lets it run to completion or to its next
  voluntary yield point.
- **`SOS_SCHEDULER_YIELD`** — the wait type you see in `sys.dm_os_wait_stats` when a task
  voluntarily gives up its turn to let others on the same scheduler run. A high volume of
  `SOS_SCHEDULER_YIELD` waits often points to CPU pressure — tasks running long enough between
  yields that others are queuing behind them.
- **Runnable queue** — when a worker yields or blocks, SQLOS picks the next runnable task from
  this queue for that scheduler. A task waiting *in* the runnable queue (not yet running, not
  blocked on a resource) accumulates `SOS_SCHEDULER_YIELD`-adjacent signal wait time.

Because scheduling is cooperative and per-core, SQL Server avoids a lot of the context-switch
overhead a preemptive OS scheduler pays — but it also means a poorly-behaved task that never
yields can, in principle, starve everything else queued on that scheduler.

## Memory management and I/O, same layer

SQLOS also owns the low-level plumbing for **memory management** — it's the layer that
actually requests memory from the OS and hands it out internally to consumers like the buffer
pool and the plan cache (the policies for *how much* to hand out are what "max server memory"
governs, but the mechanism underneath is SQLOS). And it owns **asynchronous I/O
completion** — issuing reads and writes and getting notified when they finish, rather than
having a worker thread sit blocked waiting on disk. This is also why some wait types you'll
see in production troubleshooting — `PAGEIOLATCH_*` for physical page reads, `SOS_SCHEDULER_YIELD`
for CPU — map directly back to SQLOS internals: they're not abstract Windows waits, they're
SQLOS surfacing what's happening inside its own scheduling and I/O machinery.

## Why this matters day to day

You will rarely configure SQLOS directly — there's no `sp_configure` option called "SQLOS."
Its value to a DBA is diagnostic: when `sys.dm_os_schedulers` shows `runnable_tasks_count`
piling up on every scheduler, or `sys.dm_os_wait_stats` shows `SOS_SCHEDULER_YIELD` dominating,
you're looking straight at SQLOS-level CPU pressure, and the fix is architectural (more cores,
less parallelism, fix a runaway query) rather than a setting to flip.

## Key terms

| Term | Meaning |
|---|---|
| SQLOS | The abstraction layer inside `sqlservr.exe` handling scheduling, memory management, and I/O completion |
| Non-preemptive scheduling | Workers run until they voluntarily yield, rather than being forcibly interrupted |
| Scheduler | One per logical CPU core; manages a pool of workers and a runnable queue |
| `SOS_SCHEDULER_YIELD` | Wait type recorded when a task voluntarily yields its scheduler turn; high volumes suggest CPU pressure |

## Check yourself

`sys.dm_os_wait_stats` shows `SOS_SCHEDULER_YIELD` as one of the top wait types on a server.
What does that suggest is happening, and at what level — query logic, or the SQLOS scheduling
layer?
