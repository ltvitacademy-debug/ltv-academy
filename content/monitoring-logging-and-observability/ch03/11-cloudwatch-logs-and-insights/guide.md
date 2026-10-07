# CloudWatch Logs & Insights

Alarms tell you a metric crossed a line. They don't tell you which specific checkout request failed, or what exception it threw. For that you need CloudWatch Logs — AWS's log storage service — and CloudWatch Logs Insights, the purpose-built query language for digging through it fast.

## What you'll learn

- How log groups and log streams organize CloudWatch Logs
- How to get an application's logs into CloudWatch in the first place
- The CloudWatch Logs Insights query syntax: `fields`, `filter`, `stats`, `sort`
- How to write a real query that finds the slowest requests in a specific window

## Log groups and log streams

CloudWatch Logs organizes everything into **log groups** — typically one per application or service, like `/ecs/northbridge-checkout` — and within each group, **log streams**, one per source instance or task. If Northbridge runs checkout as an ECS service with 6 running tasks, that's one log group and (at minimum) 6 log streams, one per task, each with its own retention setting and metric filters.

Getting logs into a group in the first place is usually the CloudWatch Logs agent or, for containerized workloads, the `awslogs` driver built into ECS and the CloudWatch Container Insights agent for EKS — both ship stdout/stderr straight into a log group with no extra application code required.

## CloudWatch Logs Insights: the query language

Logs Insights is a purpose-built query language — not SQL, not KQL, its own syntax — designed to search and aggregate log data interactively. A query to find the slowest checkout requests in the last hour:

```
fields @timestamp, @message, durationMs, statusCode
| filter @logStream like /checkout/
| filter durationMs > 2000
| sort durationMs desc
| limit 20
```

- `fields` — selects which fields appear in the results (`@timestamp` and `@message` are always available; others come from parsed JSON log lines)
- `filter` — narrows rows, same role as KQL's `where`
- `sort ... desc` — orders results, slowest first
- `limit 20` — caps the result set

To aggregate instead of list individual rows, swap in `stats`:

```
fields @timestamp, durationMs
| filter @logStream like /checkout/
| stats avg(durationMs) as avgDuration, count() as requestCount by bin(5m)
```

`stats ... by bin(5m)` groups rows into 5-minute buckets and computes an average duration and request count per bucket — functionally the same shape as the KQL `summarize ... by bin(TimeGenerated, 5m)` you saw in Chapter 2, just AWS's own syntax for the same idea.

## Why this is the step after an alarm

A realistic incident flow: a CloudWatch alarm on `TargetResponseTime` fires. The on-call engineer opens Logs Insights, scopes to the checkout log group, and runs a query filtering to the alarm's time window and `durationMs > 2000` to find the exact slow requests — then looks at `@message` on those specific log lines to find the stack trace or downstream dependency that explains the slowdown. The alarm says "when." Logs Insights says "which requests, and why."

## Key terms

- **Log group** — a named container for logs from one application or service
- **Log stream** — a sequence of log events from one source (instance, task, or container) within a log group
- **CloudWatch Logs Insights** — AWS's purpose-built query language for interactively searching and aggregating log data
- **`stats ... by bin(...)`** — the Insights aggregation pattern for grouping log data into time buckets
