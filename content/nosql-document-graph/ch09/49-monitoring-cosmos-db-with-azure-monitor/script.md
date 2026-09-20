# Script — Monitoring Cosmos DB with Azure Monitor

## Segment 1 (title)

Every Cosmos DB account integrates natively with Azure Monitor. For a DBA moving from watching SQL Server DMVs to watching a PaaS database, this lesson covers what's actually available.

## Segment 2 (code: metrics, the account-level pulse)

Total Request Units is the single most important metric — the rough equivalent of watching CPU/IO on a SQL Server instance. Normalized RU Consumption shows whether a container is under- or over-provisioned. Total Requests breaks down by status code, making it easy to spot a spike in 429 throttled responses.

## Segment 3 (steps: diagnostic logs for per-request detail)

Metrics tell you that something happened; diagnostic logs tell you what actually happened, request by request. DataPlaneRequests captures every operation's RU charge and duration. Once routed to Log Analytics, this becomes queryable with KQL — the closest Cosmos DB equivalent to querying sys.dm_exec_query_stats.

## Segment 4 (outro)

A reasonable production baseline: route logs to Log Analytics, alert on normalized RU consumption and 429 rate, build a dashboard surfacing RU trends. Next up: diagnosing throttling and performance issues directly.
