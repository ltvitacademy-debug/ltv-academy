# Script — CloudTrail & Audit Logging

## Segment 1 (title)

Everything so far in this chapter watched the checkout application itself — its metrics, its logs, its traces. CloudTrail watches something different: every API call made against your AWS account, by anyone or anything, which is the only tool here built to answer "who changed what, and when."

## Segment 2 (screenshot)

CloudTrail is on for every AWS account automatically, logging the last ninety days of management events — control-plane actions like launching an instance or changing an IAM policy — into Event history, with zero configuration. The default filter hides read-only events, so clearing it surfaces every action that actually changed something in your account.

## Segment 3 (screenshot)

You can filter that view many ways — by event name, user, resource, or time range — which is exactly how you'd track down who changed a security group last night and from where. Management events are control-plane changes; data events are higher-volume operations on the resources themselves, like reading an object out of S3, and they're off by default because they cost more to log.

## Segment 4 (steps)

Event history is convenient but temporary and regional. A trail is a standing configuration that continuously delivers events to an S3 bucket for retention well beyond ninety days, across every region in the account — the setup most compliance and security teams require before they'll sign off. CloudTrail Insights goes a step further, analyzing management event patterns and flagging statistically unusual activity, like a sudden spike in instance launches, without anyone writing a detection rule in advance.

## Segment 5 (outro)

Metrics, logs, traces, and now account-level audit history — that's the complete AWS Monitoring toolkit this chapter covers, mirroring everything you learned about Azure Monitor, Log Analytics, Application Insights, and Alerts in Chapter 2. Next up, Chapter 4: Prometheus and Grafana, the open-source stack most teams actually run day to day.
