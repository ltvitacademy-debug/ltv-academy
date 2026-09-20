# Script — Plan Cache Internals

## Segment 1 (title)

Parameter sniffing is one symptom of how the plan cache behaves. This lesson looks at the cache itself — what's stored there, and a very common, very avoidable way it gets flooded with plans that will never be reused.

## Segment 2 (code: inspecting the cache)

sys.dm_exec_cached_plans exposes every compiled plan directly, with a usecounts column showing how many times each plan has actually been reused. A healthy OLTP cache has plenty of plans with usecounts well above one.

## Segment 3 (code: plan reuse vs. ad hoc bloat)

Plan reuse is the whole point of the cache — compile once, execute many times. Ad hoc plan bloat happens when an application builds SQL as a literal string with values baked in, so every call is a cache miss: thousands of one-use plans, wasting CPU and evicting plans that actually mattered.

## Segment 4 (outro)

Optimize for ad hoc workloads mitigates the damage by caching a lightweight stub instead of a full plan on the first run — it's a mitigation, not a substitute for parameterizing properly. Next up: forcing and hinting plans directly.
