# Lesson 9 — CloudWatch Metrics, Logs, and Logs Insights Queries

**Chapter 3 · AWS CloudWatch & X-Ray in Depth · Lesson 1 of 4**

## What you'll learn

- What a CloudWatch **namespace** and **dimension** actually are, and
  how together they identify one specific metric's data
- The real difference between **standard-resolution** (60-second) and
  **high-resolution** (down to 1-second) metrics, and why that choice
  has a cost and alarm-speed consequence
- How **CloudWatch Logs** organizes data into log groups and log
  streams, and how that maps onto resources you've already built
- How to read and write a real **Logs Insights** query using `fields`,
  `filter`, `stats`, and `parse`

## Metrics: namespace, dimension, and one specific data point

Every CloudWatch metric lives inside a **namespace** — a container
that groups related metrics so `AWS/EC2`, `AWS/Lambda`, and
`AWS/ApplicationELB` don't collide with each other or with your own
custom metrics. Within a namespace, a metric name like
`CPUUtilization` isn't specific enough on its own — EC2 publishes that
same metric name for every instance in your account. What narrows it
down to one actual time series is a **dimension**: a name-value pair
such as `InstanceId=i-0a1b2c3d4e5f`. The combination of namespace +
metric name + the full set of dimension values is what uniquely
identifies one specific metric stream. Drop a dimension and CloudWatch
shows you an aggregate across everything that matches what's left —
useful for a fleet-wide view, useless when you need to know which
single instance is actually in trouble.

Custom application metrics work the same way. You publish them with
`PutMetricData`, choosing your own namespace (e.g. `Checkout/Orders`),
metric name (`OrdersPlaced`), and dimensions (`Environment=prod`,
`Region=us-east-1`) — CloudWatch doesn't care whether a metric came
from an AWS service or your own code; it's all namespace, name, and
dimensions underneath.

## Standard resolution vs. high-resolution metrics

Most built-in AWS service metrics, and any custom metric you publish
without saying otherwise, are **standard resolution**: one data point
every 60 seconds. That's fine for capacity planning and most alarms,
but it's too coarse to catch a latency spike that lasts 15 seconds and
resolves before the next minute boundary rolls over.

A **high-resolution** metric is published with `StorageResolution`
set to 1 (or any value down to 1 second), and CloudWatch stores it at
that finer granularity. The direct payoff is that alarms can evaluate
on periods as short as 10 seconds instead of being locked to 60-second
boundaries — you detect and react to a short-lived problem faster.
The cost is real, though: a high-resolution custom metric incurs
higher PutMetricData request volume (you're publishing far more data
points per hour), which shows up directly on the bill. Reach for
high-resolution selectively — on the handful of metrics where a
60-second blind spot would actually matter — not as a default for
every custom metric you publish.

## CloudWatch Logs: log groups and log streams

CloudWatch Logs organizes raw log data in two layers. A **log group**
is the top-level container, almost always scoped to one resource or
application — `/aws/lambda/checkout-function`, `/ecs/payments-cluster`,
`/var/log/app/access.log` for an EC2 instance running the CloudWatch
agent. Retention is set per log group (log events never expire by
default until you set a retention policy — 30 days, 1 year, whatever
fits your compliance need).

Inside a log group, a **log stream** is a sequence of log events that
all came from the same source: one Lambda execution environment, one
EC2 instance, one ECS task. A busy Lambda function with many concurrent
execution environments writes many log streams into the same log
group simultaneously — which is exactly why you rarely read Logs
Insights queries scoped to one stream; you query across the whole log
group and let the query language do the filtering.

## Logs Insights: the actual query language

**Logs Insights** queries one or more log groups directly, without you
having to pre-build an index. Every query is a pipeline of commands
separated by `|`, and every log event automatically gets reserved
fields: `@timestamp`, `@message` (the raw log line), `@logStream`, and
`@log` (group:stream).

A baseline query — find the last 20 error lines:

```
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20
```

`fields` picks which fields come back. `filter` narrows events — here,
a case-sensitive substring/regex match against the raw message.
`sort` and `limit` behave exactly like you'd expect.

`parse` extracts structured fields out of an unstructured message, and
`stats` aggregates — usually bucketed by time with `bin()`:

```
fields @timestamp, @message
| parse @message "[*] *" as level, msg
| filter level = "ERROR"
| stats count() as errorCount by bin(5m)
```

That pulls the bracketed level token (`[ERROR]`, `[INFO]`) out of a
plain-text log line, filters to errors only, then counts them in
5-minute buckets — the shape of query you'd run right after a metric
alarm fires, to see whether the error rate is actually climbing or
just noisy.

For logs that already carry a numeric field (say, a JSON log with a
`duration` key), `stats` can compute real percentiles directly:

```
fields @timestamp, @message
| filter ispresent(duration)
| stats avg(duration) as avgMs, pct(duration, 99) as p99Ms by bin(1m)
```

That's the same question a metric dashboard asks about latency, but
computed straight out of raw log data — useful when you don't have a
custom metric published yet and need the answer from what's already
being logged.

## Key terms

| Term | Meaning |
|---|---|
| Namespace | A container that groups related CloudWatch metrics (`AWS/EC2`, or a custom namespace you choose) |
| Dimension | A name-value pair that, combined with namespace + metric name, identifies one specific metric's data |
| Standard resolution | The default: one metric data point every 60 seconds |
| High-resolution metric | A metric published with `StorageResolution` as low as 1 second, enabling faster alarm evaluation at a higher cost |
| Log group | The top-level CloudWatch Logs container, usually scoped to one resource or application, with its own retention setting |
| Log stream | A sequence of log events from one single source within a log group (one Lambda environment, one instance) |
| Logs Insights | CloudWatch's query language for log groups, using piped commands like `fields`, `filter`, `stats`, `parse`, `sort`, `limit` |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: what
three things together uniquely identify a single CloudWatch metric,
why would you choose a high-resolution metric over the default, and
what does `parse` do that `filter` alone can't?
