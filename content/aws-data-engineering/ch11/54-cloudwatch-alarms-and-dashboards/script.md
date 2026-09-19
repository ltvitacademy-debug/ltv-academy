# Script — CloudWatch Alarms & Dashboards

## Segment 1 (title)

Metrics and logs are only useful if something actually looks at them. Alarms turn a metric crossing a threshold into an automated notification, and dashboards give a team an at-a-glance view of pipeline health.

## Segment 2 (code: a real alarm, Lambda errors to SNS)

Lambda automatically publishes an Errors metric with no extra setup. Set an alarm to watch it, and when it transitions from OK to ALARM, have the alarm publish to an SNS topic that emails the on-call engineer. The exact same pattern works for a Glue job failure metric or a Step Functions failed-execution count.

## Segment 3 (steps: alarm states and what drives them)

An alarm sits in one of three states: OK when the threshold condition isn't met, ALARM when it is and the action fires, or INSUFFICIENT_DATA when there isn't enough data yet to evaluate. It's the state transition that triggers the action, not just the raw number crossing a line once.

## Segment 4 (outro)

Alarms and dashboards down — metrics that actually get seen. Next up: the course finale, monitoring a full pipeline end to end across everything this course has covered.
