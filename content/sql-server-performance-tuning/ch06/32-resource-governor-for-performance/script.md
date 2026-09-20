# Script — Resource Governor for Performance

## Segment 1 (title)

Lesson 31 covered giving the buffer pool enough memory instance-wide. Resource Governor goes a level more specific — carving the instance's CPU and memory into named pools, so one workload's excess can't quietly starve another's.

## Segment 2 (steps: three pieces)

Every session gets classified on connection. A classifier function you write inspects things like the app name and returns which workload group that session belongs in. Each workload group is bound to exactly one resource pool, and the pool is where the actual CPU and memory limits — and floors — get enforced.

## Segment 3 (code: the classifier function)

The classifier function runs once per new session — here, anything connecting as Power BI gets routed into a reporting group, everything else into an OLTP group. After creating it, you point Resource Governor at it and reconfigure.

## Segment 4 (code: capping the reporting pool)

Cap the reporting pool's CPU and memory percentage low enough that even a runaway report query can only take its capped share, while the OLTP pool's minimum CPU percent guarantees the transactional workload a floor it can always fall back on. This doesn't make the report queries faster — it just isolates their footprint.

## Segment 5 (outro)

Resource Governor solves a very specific, very real problem: two workloads sharing one instance without one quietly starving the other. Next up: Chapter Seven begins, going deep on Query Store's actual architecture.
