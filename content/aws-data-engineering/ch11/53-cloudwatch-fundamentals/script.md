# Script — CloudWatch Fundamentals

## Segment 1 (title)

Every service in this course emits data about its own health and behavior, and CloudWatch is where all of it goes. It isn't one more pipeline component — it's the observability layer sitting underneath everything else you've built.

## Segment 2 (code: namespace, dimension, metric)

Metrics live inside a namespace, usually one per AWS service, like AWS/Lambda. Dimensions are name/value pairs that isolate exactly which resource a metric describes — a FunctionName dimension is what lets you see one function's error count instead of every function's combined.

## Segment 3 (steps: three kinds of CloudWatch data)

Metrics are numeric time series — counts, durations, error rates. Logs are the actual text output a service writes, organized into log groups and log streams. And events describe state changes in your environment in near real time, a capability that's largely moved to Amazon EventBridge.

## Segment 4 (outro)

Metrics, logs, and events — the three pillars. Next up: CloudWatch alarms and dashboards, turning that data into automated notifications and at-a-glance pipeline health.
