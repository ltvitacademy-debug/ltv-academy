# Script — SQLOS

## Segment 1 (title)

SQLOS is the abstraction layer inside sqlservr.exe that handles scheduling, memory management, and I/O completion — tuned specifically for database workloads instead of general-purpose fairness.

## Segment 2 (code: An OS inside the OS)

It sits between the Engine's components and the underlying OS: one scheduler per logical CPU core, memory handed out internally to consumers like the buffer pool, and asynchronous I/O so a worker never sits blocked on disk.

## Segment 3 (steps: Non-preemptive scheduling)

Scheduling is non-preemptive — a worker runs until it voluntarily yields, typically at a lock wait, a page read, or a network write, rather than being forcibly interrupted. That voluntary yield is exactly what SOS_SCHEDULER_YIELD records.

## Segment 4 (outro)

Heavy SOS_SCHEDULER_YIELD waits point to CPU pressure at the SQLOS level, not a query bug. Next up: editions and versions — what Enterprise actually buys you over Standard.
