# Script — Active Sessions & Expensive Queries

## Segment 1 (title)

Sys.dm_exec_requests gives you every currently running request. This lesson turns it into a real triage query: finding exactly which query is burning the most CPU or I/O right now, and pulling its full text and execution plan without leaving T-SQL.

## Segment 2 (code: ranking by cost)

Cpu_time and logical_reads are cumulative for each request so far. Sort by either and you surface the most expensive thing currently running. Blocking_session_id, when non-zero, tells you the request is stuck waiting on another session — a preview of blocking chains later in this chapter.

## Segment 3 (code: text and plan)

Sys.dm_exec_requests only gives you a sql_handle, not the actual text. Cross apply sys.dm_exec_sql_text turns that handle into readable T-SQL. Cross apply sys.dm_exec_query_plan does the same for the plan_handle, returning the execution plan as XML you can open graphically.

## Segment 4 (steps: the pattern)

The pattern is always the same: start with sys.dm_exec_requests for the row, cross apply sys.dm_exec_sql_text for the query text, and cross apply sys.dm_exec_query_plan for the plan — three pieces, one query, no need to re-run anything yourself.

## Segment 5 (outro)

You now have a working "what's expensive right now" query. Next up: wait statistics — what SQL Server has actually been waiting on.
