# Script — Execution Plans & the Plan Cache

## Segment 1 (title)

Query Store answers what happened over time. The plan cache answers what's compiled and sitting in memory right now — and it's queryable with T-SQL just as directly, without ever opening a graphical execution plan viewer.

## Segment 2 (steps: three DMVs, one story)

Three DMVs tell the story. Dm_exec_query_stats is the anchor, with one row per cached plan and the handles needed to look up more. Dm_exec_query_plan takes a plan_handle and returns the actual XML plan. Dm_exec_sql_text returns the SQL text behind it.

## Segment 3 (code: text and plan together)

Cross applying sql_text and query_plan onto query_stats pulls the query's real text and its actual execution plan together, ordered by total worker time — and clicking that plan XML in Management Studio opens the same graphical plan a developer gets, for a query that's already run.

## Segment 4 (code: why it's volatile)

Unlike Query Store, the plan cache lives entirely in memory. It's cleared by DBCC FREEPROCCACHE, by memory pressure, by a service restart, and by certain schema changes — which means dm_exec_query_stats only ever shows what's currently cached.

## Segment 5 (outro)

A plan that ran once overnight and got evicted simply isn't there by morning — that's what Query Store's persisted history is for. Next up: top resource-consuming queries, ranking the worst offenders by real cost.
