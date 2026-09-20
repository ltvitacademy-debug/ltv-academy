# Script — Query Store, Deep Dive

## Segment 1 (title)

You've used Query Store for troubleshooting before. This lesson goes under the hood — how it's actually architected, exactly what it captures, and how to configure it deliberately instead of leaving it on defaults.

## Segment 2 (steps: two-store architecture)

Query Store persists two distinct kinds of data in the user database itself. The plan store holds every distinct, deduplicated execution plan per query. The runtime stats store holds aggregated performance numbers per plan, bucketed by time interval. Both survive recompiles and restarts — unlike the plan cache, which only remembers the current plan.

## Segment 3 (code: turning it on)

Turning Query Store on means setting real, meaningful options — operation mode, cleanup policy, max storage size, interval length, and query capture mode. AUTO capture mode skips cheap, infrequent ad hoc queries to cut overhead; that's the right default for most production systems.

## Segment 4 (code: querying it directly)

You can query Query Store's catalog views directly, the same data that powers every SSMS report. Query, query text, plan, and runtime stats — four views joined together give you the exact same top-resource-consumers list without opening a single dialog.

## Segment 5 (outro)

Understanding this architecture is the foundation for everything else in this chapter. Next up: forcing a specific known-good plan on purpose, with sp_query_store_force_plan.
