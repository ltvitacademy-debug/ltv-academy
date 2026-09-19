# Script — Dynamic Management Views for DBAs

## Segment 1 (title)

DMVs return real-time server and database state as ordinary queryable views. What's new here isn't the mechanics, it's the purpose — this chapter is about monitoring, is the system healthy right now. Chapter 8 comes back to DMVs for a completely different question: diagnosing one slow query's plan. Same tool, different job.

## Segment 2 (code: sessions and connections)

sys.dm_exec_sessions is one row per authenticated session — who's logged in, from where, how much CPU and memory they've used. Join it to sys.dm_exec_connections and you get the client's network address too. Filter to is_user_process equals 1 and you drop SQL Server's own internal sessions, leaving just real client activity.

## Segment 3 (code: the Azure-only resource view)

sys.dm_db_resource_stats is specific to Azure SQL Database — it doesn't exist on-prem, because on-prem has no provisioned tier to report against. It returns one row every 15 seconds for roughly the last hour — the resource side of your baseline, in plain T-SQL, no Azure Monitor required.

## Segment 4 (steps: the monitoring DMV set)

Four DMVs make up the DBA's monitoring toolkit: sessions and connections for who's connected, resource stats for Azure SQL's own utilization history, and wait stats for what kind of bottleneck is normal here. Execution-plan and index-usage DMVs are deliberately left out — those are Chapter 8's job.

## Segment 5 (outro)

These DMVs tell you what's happening right now, in numbers. Next up, Extended Events — SQL Server's lightweight tracing system for capturing the actual events as they happen.
