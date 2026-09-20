# Script — Hardware Considerations

## Segment 1 (title)

Every technique in this course assumes some underlying hardware. This lesson closes Chapter 8 by looking directly at that hardware — what actually matters about it, and where the real tradeoffs sit.

## Segment 2 (code: NUMA)

NUMA describes multi-socket servers where each CPU has faster access to its own local memory. SQL Server's scheduler is already NUMA-aware by default — no setting turns it on. Soft-NUMA, splitting one large node into smaller logical ones, is a real but narrow lever on very high core count servers.

## Segment 3 (code: storage latency)

Storage vendors advertise throughput, but for OLTP it's latency per I/O that actually predicts pain. That's why PAGEIOLATCH waits are worth watching by their average wait time per wait, not just the total — a high average against storage is the real signature of a latency-bound bottleneck.

## Segment 4 (steps: cores vs. licensing)

More cores mean more parallel capacity, but SQL Server's per-core licensing makes every extra core a direct, ongoing cost. The right call means measuring whether the workload actually has real parallel headroom — through wait analysis — before paying for more cores on the assumption that more is always better.

## Segment 5 (outro)

That closes Chapter 8, and the configuration half of this course. Next up: Chapter Nine begins, turning a one-time baseline into an ongoing monitoring practice.
