# Script — Memory Pressure Diagnosis

## Segment 1 (title)

Memory pressure is quieter than CPU or I/O pressure — there's no single dramatic wait type that screams out of memory. Instead it shows up as erosion of one performance counter, and when it's severe, as queued memory-grant waits.

## Segment 2 (code: Page Life Expectancy)

Page Life Expectancy is the average seconds a page survives in the buffer pool before eviction, read from sys.dm_os_performance_counters, not a wait-stats DMV. A falling or consistently low PLE means pages are being evicted quickly, forcing re-reads from disk.

## Segment 3 (code: the old 300-second rule is outdated)

For years, PLE below 300 seconds was the standard bad-sign threshold — but that dates from servers with a few gigabytes of RAM. On a modern large buffer pool, judge PLE against its own trend on that server, not one universal number. A sudden drop from a stable baseline matters more than the absolute value.

## Segment 4 (code: RESOURCE_SEMAPHORE)

Sorts and hash joins need a memory grant before they can even execute. When too many compete for a limited grant pool, requests queue and accumulate the RESOURCE_SEMAPHORE wait — a more acute symptom than declining PLE, since it stalls execution directly rather than just adding disk reads.

## Segment 5 (outro)

The simplest form of memory pressure is a buffer pool smaller than the actively touched working set, not necessarily the whole database. Next up: a wait type that's usually not SQL Server's fault at all.
