# Log Analytics & KQL

Log Analytics is where Azure Monitor Logs actually live, and Kusto Query Language — KQL — is how you get anything useful out of them. If Metrics Explorer told you *that* checkout latency spiked, Log Analytics is where you find out *why*, by querying the raw request and exception data that led up to it.

## What you'll learn

- What a Log Analytics workspace is and how to scope a query to one
- The core KQL pipeline: `where`, `summarize`, `render`, and how they chain with the pipe operator
- How to write a query that finds slow or failing requests in a specific time window
- How to turn a query's results into a chart without leaving the query editor

## Scoping a query to a workspace

Every Log Analytics query runs against a workspace — the container that holds your tables of ingested data (`AppRequests`, `AppExceptions`, `AzureActivity`, and dozens more depending on what's connected). Before you write a query, you confirm the scope: which workspace, and optionally which specific resource within it, you're querying.

![Log Analytics in the Azure portal showing the workspace scope selected above the query editor, with the table list visible in the left pane.](/courses/monitoring-logging-and-observability/ch02/07-log-analytics-and-kql/log-analytics-query-scope.png)
*The scope at the top of the screen determines which workspace's tables your query can see.*
Source: [Tutorial: Use Log Analytics — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial)

## The KQL pipeline

KQL reads left to right: start with a table, then pipe (`|`) its rows through a chain of operators that each narrow or reshape the data. A query that finds Northbridge's slowest checkout requests in the last hour looks like this:

```kql
AppRequests
| where TimeGenerated > ago(1h)
| where Name == "POST /checkout"
| summarize AvgDuration = avg(DurationMs), Count = count() by bin(TimeGenerated, 5m)
| render timechart
```

- `where TimeGenerated > ago(1h)` — filter to the last hour
- `where Name == "POST /checkout"` — filter to just the checkout endpoint
- `summarize ... by bin(TimeGenerated, 5m)` — aggregate into 5-minute buckets, computing average duration and request count per bucket
- `render timechart` — draw the result as a time chart, right there in the query editor

To find the specific failing requests instead of an aggregate, drop the `summarize` line and add `| where Success == false` — KQL queries are built incrementally, one operator at a time, so you can run the query after every line to see how the result set changes.

## From query to chart

`render` isn't the only way to visualize a result — the query editor also lets you flip any tabular result into a chart after the fact, without changing the query:

![Log Analytics query results panel showing a line chart rendered from query output, with a toolbar for switching between chart types above it.](/courses/monitoring-logging-and-observability/ch02/07-log-analytics-and-kql/example-query-output-chart.png)
*Any query's output can become a chart in the results pane — useful for a quick look before you decide whether a query is worth pinning to a dashboard.*
Source: [Tutorial: Use Log Analytics — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial)

## Why this matters for the checkout incident

Once Northbridge's on-call engineer sees `AverageResponseTime` spike in Metrics Explorer, the next move is almost always a KQL query against `AppRequests` and `AppExceptions`, filtered to the spike window, to find the specific slow operation and the exception (if any) behind it. Metrics tell you *when*; KQL tells you *what*.

## Key terms

- **Log Analytics workspace** — the container that stores ingested log tables and is queried with KQL
- **KQL (Kusto Query Language)** — the query language used across Log Analytics, Application Insights, and Microsoft Sentinel
- **Pipe operator (`|`)** — chains KQL operators, passing each operator's output as the next one's input
- **`summarize`** — aggregates rows into groups, typically with `by bin(TimeGenerated, ...)` for time buckets
- **`render`** — turns a query's tabular result into a chart inline in the query editor
