# Script — Scaling Compute/Storage & Troubleshooting Resource Bottlenecks

## Segment 1 (title)

"The database feels slow" is a symptom, not a diagnosis — it could be CPU-bound, IO-bound, or memory-bound, and each has a different fix. Scaling compute without first asking which resource is exhausted often just makes an underlying query-design problem more expensive to keep ignoring.

## Segment 2 (code: telling CPU-bound from IO-bound)

High signal_wait_time_ms relative to total wait in sys.dm_os_wait_stats means queries are ready and just waiting for a free core — genuinely CPU-bound. High PAGEIOLATCH waits or io_stall in sys.dm_io_virtual_file_stats point to IO-bound — but a missing index forcing full scans wears an IO-bound costume that no storage upgrade fixes.

## Segment 3 (steps: memory-bound, and the pattern across all three)

High RESOURCE_SEMAPHORE waits and falling page life expectancy signal memory pressure — either a genuine shortage or a query reading far more data than it needs, forcing cache churn. Every category has the same fork: a real shortage where scaling helps, or a query problem dressed up as a resource symptom where scaling just delays the fix and raises the bill.

## Segment 4 (outro)

That closes Chapter 9 — index and statistics maintenance, integrity checking, database-scoped tuning, Resource Governor, and telling a real bottleneck from a query problem. Chapter 10, next, automates the routine work with SQL Server Agent, starting with what Agent actually is and does.
