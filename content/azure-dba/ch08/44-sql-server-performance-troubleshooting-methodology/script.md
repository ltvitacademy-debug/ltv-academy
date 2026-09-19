# Script — SQL Server Performance Troubleshooting Methodology

## Segment 1 (title)

"The database is slow" is almost never precise enough to act on. Before you touch a single index or execution plan, this chapter's biggest lesson starts with the decision tree for what to check first — and in what order.

## Segment 2 (steps: the triage order)

Three questions, in order. Is this one query or the whole system — those have almost entirely different fixes. Is it new, a regression, or has it always been this slow. And only then do you check what SQL Server is actually waiting on, before you assume the fix is a query rewrite or a new index.

## Segment 3 (code: wait stats query)

sys.dm_os_wait_stats tells you, instance-wide, what SQL Server has spent the most cumulative time waiting on. If the top wait is a page I/O latch, your problem is disk, not a missing index. If it's a lock wait, it's blocking — Lesson 50's topic, not an execution plan problem at all.

## Segment 4 (steps: common wait types)

A short crib sheet you'll use constantly: PAGEIOLATCH waits point to disk I/O, LCK_M waits point to blocking and locking, CXPACKET and CXCONSUMER point to parallelism, and SOS_SCHEDULER_YIELD points to CPU pressure. The wait type tells you which tool in this chapter actually applies.

## Segment 5 (outro)

Scope it, time it, check waits first — then reach for a specific tool. Next up: reading a real graphical execution plan, and what its arrows and percentages are actually telling you.
