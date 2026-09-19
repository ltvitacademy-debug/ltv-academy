# CloudWatch Alarms & Dashboards

Metrics and logs are only useful if something actually looks at them. Alarms are how
CloudWatch turns a metric crossing a threshold into an automated notification, and
dashboards are how a team gets an at-a-glance view of pipeline health without digging through
individual metrics one at a time. This lesson covers both.

## What you'll learn

- How a CloudWatch alarm watches a metric and changes state
- A real example: a Lambda error-rate alarm notifying through SNS
- What a dashboard is, and why it beats checking each service separately
- The difference between an alarm firing and someone actually seeing it

## How an alarm watches a metric

A CloudWatch **alarm** is attached to a specific metric and a threshold — for example,
"trigger when `Errors` is greater than 0, evaluated over 1 period of 5 minutes." The alarm
continuously evaluates that condition and sits in one of three states: **OK** (condition not
met), **ALARM** (condition met), or **INSUFFICIENT_DATA** (not enough data yet to evaluate).
The state transition — not just the raw metric crossing a line once — is what triggers the
alarm's configured action.

## A real example: Lambda errors notifying through SNS

Lambda automatically publishes an `Errors` count metric to the `AWS/Lambda` namespace with a
`FunctionName` dimension, with no extra setup required. A practical alarm: watch that
`Errors` metric for a specific function, and when it transitions to ALARM, publish a
notification to an **SNS (Simple Notification Service) topic** that emails or texts the
on-call engineer. This is the same mechanical pattern you'd use for a Glue job failure
metric or a Step Functions failed-execution count — a metric, a threshold, and an SNS action
tying the alarm to a human (or an automated remediation Lambda function subscribed to the
same topic).

## Dashboards: pipeline health at a glance

A **CloudWatch dashboard** is a customizable collection of widgets — line graphs, number
displays, even embedded log query results — pulled from any namespace and any region into one
view. Instead of opening the Lambda console, then the Glue console, then the Redshift
console separately, a pipeline dashboard puts a function's error rate, a Glue job's duration,
and a Redshift cluster's CPU utilization on one screen. Dashboards don't replace alarms —
they answer "how is everything doing right now," while alarms answer "did something just
break."

## An alarm firing isn't the same as someone noticing

An alarm that fires but doesn't notify anyone is barely better than no alarm at all. The
whole value of the OK/ALARM state machine is that it drives an **action** — typically an SNS
notification, but also possibly an Auto Scaling action or a Systems Manager automation. When
you design monitoring for a pipeline, the alarm threshold matters less than making sure the
action actually reaches someone who can respond.

## Key terms

| Term | Meaning |
|---|---|
| Alarm | Watches a metric against a threshold and transitions between OK / ALARM / INSUFFICIENT_DATA |
| SNS topic | Notification channel an alarm action publishes to (email, SMS, Lambda, etc.) |
| Dashboard | Customizable collection of metric/log widgets from any namespace in one view |
| Threshold | The condition (e.g., "Errors > 0 for 5 minutes") that trips an alarm to ALARM state |
| Alarm action | What happens on a state transition — typically an SNS notification |

## Check yourself

A team sets a CloudWatch alarm on a Glue job's failure count, but never attaches an SNS
action to it. The alarm correctly enters the ALARM state every time the job fails. Has this
team actually built working monitoring? What's missing?
