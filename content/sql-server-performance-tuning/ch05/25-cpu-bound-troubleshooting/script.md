# Script — CPU-Bound Troubleshooting

## Segment 1 (title)

When the methodology from last lesson surfaces CPU-related waits as dominant, the next step is narrowing from "the processor is busy" to "these specific queries are consuming it."

## Segment 2 (code: SOS_SCHEDULER_YIELD)

SOS_SCHEDULER_YIELD fires when a task yields the CPU after using its scheduler quantum, with other runnable tasks waiting for that same scheduler. A high volume, especially with high signal wait time elsewhere, is one of the clearest signals the instance doesn't have enough CPU for its current load.

## Segment 3 (code: CXPACKET isn't automatically bad)

CXPACKET and CXCONSUMER show up whenever a parallel query synchronizes its worker threads — completely normal on its own. It's worth investigating only when paired with thread skew, or when small OLTP queries are going parallel unnecessarily and multiplying CPU per execution.

## Segment 4 (code: finding the actual CPU-heavy queries)

Wait stats tell you the category; sys.dm_exec_query_stats tells you which queries. Sorting by total_worker_time — cumulative CPU time in microseconds — finds what's actually burning the processor, not just what's running long while waiting on something else.

## Segment 5 (outro)

Before blaming a query outright, rule out outdated statistics or missing indexes driving the plan choice. Next up: the same methodology applied to the storage subsystem instead of the CPU.
