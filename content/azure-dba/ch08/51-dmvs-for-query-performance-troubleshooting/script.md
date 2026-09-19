# Script — DMVs for Query Performance Troubleshooting

## Segment 1 (title)

Chapter 7's DMVs were about instance health -- sessions, CPU, memory. This lesson is narrower: which cached queries are consuming the most resources, right now, live from the plan cache, no setup required.

## Segment 2 (code: dm_exec_query_stats)

sys.dm_exec_query_stats has running totals for every plan sitting in cache -- CPU time, logical reads, execution count -- accumulated since that plan was compiled. Same kind of ranking as Query Store's Top Resource Consumers, but live from cache instead of persisted history.

## Segment 3 (code: dm_exec_sql_text with CROSS APPLY)

Query stats gives you handles, not readable text. sys.dm_exec_sql_text converts a handle back into the actual query. CROSS APPLY calls it once per row, passing that row's own handle in -- exactly the row-by-row pattern CROSS APPLY was built for.

## Segment 4 (code: dm_exec_query_plan)

Swap in sys.dm_exec_query_plan for the plan itself instead of the text -- click the resulting XML and it renders as the same graphical plan from Lesson 45, without re-running the query with Ctrl+M turned on.

## Segment 5 (outro)

Use these DMVs for what's expensive right now, live, no setup. Use Query Store for whether it was always this slow, with full plan history. Next up: closing out this chapter with Intelligent Query Processing and Automatic Tuning -- genuinely automatic capabilities.
