# Script — Server-Level Configuration Tuning

## Segment 1 (title)

MAXDOP and cost threshold are two entries in a longer list of instance-level sp_configure options that meaningfully affect performance. This lesson widens the view to the rest of that list.

## Segment 2 (code: max server memory)

Left at its default, effectively unlimited, the buffer pool can grow until it starves the OS and other processes of memory — a genuinely common cause of an unexplained slowdown on a server that "was fine yesterday." Setting this deliberately is baseline hygiene, not optional tuning.

## Segment 3 (code: optimize for ad hoc workloads)

Normally SQL Server caches a full plan on a query's first execution even if it never runs again. This setting caches only a small stub first, and only promotes to a full plan if that exact text runs a second time — meaningfully reducing plan cache bloat on systems full of one-off queries.

## Segment 4 (outro)

Every option here has a real tradeoff tied to the workload and hardware — this isn't a checklist to copy onto every server with the same numbers. Next up: instance-level settings for performance, going deeper on the rest of the list.
