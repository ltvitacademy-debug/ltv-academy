# Script — MAXDOP & Cost Threshold for Parallelism

## Segment 1 (title)

This chapter turns to something that affects every query on the instance: how SQL Server decides whether to split a query across multiple CPU cores, and how many cores it's allowed to use when it does.

## Segment 2 (steps: sizing MAXDOP by NUMA)

Max degree of parallelism caps how many logical processors one query's parallel operators can use — not how many queries can run concurrently. Microsoft's guidance scales with NUMA layout: up to the processor count on small single-node servers, capped at 8 on larger ones, and sized per NUMA node on multi-node servers, specifically to avoid a single query spanning node boundaries.

## Segment 3 (code: setting MAXDOP)

MAXDOP can be set instance-wide with sp_configure, overridden per database since SQL Server 2016, or overridden per query with a hint — three levels, useful when one workload on the instance genuinely needs different parallelism behavior than another.

## Segment 4 (code: cost threshold for parallelism)

Cost threshold for parallelism decides whether a query is even considered for a parallel plan in the first place — below it, SQL Server always runs serially. The default of 5 is decades old and far too low for modern hardware; 25 to 50 is a common, reasonable starting point, verified against your own workload's cost distribution.

## Segment 5 (outro)

These two settings answer different questions — whether to go parallel, and how wide once it does — and getting one right doesn't fix the other. Next up: troubleshooting parallelism problems that are already happening, with CXPACKET, CXCONSUMER, and skewed thread work.
