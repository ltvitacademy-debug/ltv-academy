# Script — Virtual Warehouses, Scaling & Auto-Suspend/Auto-Resume

## Segment 1 (title)

A virtual warehouse is a named cluster of compute resources that Snowflake spins up to run your queries. It has no data of its own — it reads from the storage layer and can be resized or thrown away without touching a single row underneath.

## Segment 2 (screenshot: Warehouses admin tab)

Warehouse size is a T-shirt scale from X-Small through 6X-Large — each step up roughly doubles the compute resources and the credits burned per hour. Bigger isn't automatically better: size for the workload.

## Segment 3 (screenshot: Edit Warehouse dialog)

Auto suspend and auto resume are the pair that makes pay-only-for-what-you-use real. After N minutes of no activity, a warehouse suspends itself and costs nothing; the moment a query needs it again, it resumes automatically in a second or two. There's no equivalent on a SQL Server instance you leave running around the clock.

## Segment 4 (steps: multi-cluster)

A single warehouse cluster can only run so many queries at once before new ones start queuing — a concurrency problem, not a size problem. Multi-cluster warehouses solve this by adding more clusters of the same size automatically when demand rises, then removing them again when it drops.

## Segment 5 (outro)

Next lesson is a hands-on lab: signing up for a Snowflake trial, creating your own warehouse, and running your first query end to end.
