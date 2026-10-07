# Script — Correlating Metrics, Logs & Traces

## Segment 1 (title)

You now have all three pillars on the table. Metrics tell you something is wrong. Logs tell you what happened. Traces tell you where the time went. Used together, jumping from one straight into the next without re-typing a query by hand, they turn a vague alert into a root cause in minutes — that's what we're walking through today.

## Segment 2 (steps)

Here's the real order during Northbridge's flash sale. A latency panel crosses the SLO — something's wrong, roughly when. You jump into the logs, filter to the checkout service around that timestamp, and find error lines carrying a trace ID. You take that trace ID into the tracing backend and find the actual culprit: not the payment gateway, but a database query buried under an exhausted connection pool.

## Segment 3 (code)

None of that handoff works without one small discipline: every structured log line has to carry the same trace ID the tracing system assigned. Most OpenTelemetry SDKs do this automatically — when a log statement runs inside an active span, the SDK stamps that span's trace ID onto the log record for you.

## Segment 4 (screenshot)

Here's what that looks like in a real tool. Grafana Explore renders a trace ID field as a clickable link right in the log line's detail panel — one click, straight into the matching trace, no copying an ID between two separate tools.

## Segment 5 (outro)

Many dashboards take this further still, with exemplars linking a metric spike directly to one representative trace — metric to trace, no log in between. Correlation isn't a fourth tool you buy — it's what you get for free once structured logs, centralized search, and tracing are all done right. That closes Chapter 5; Chapter 6 puts all of it to work on a real incident at Northbridge Retail.
