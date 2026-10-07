# CloudTrail & Audit Logging

Everything in this chapter so far has watched the checkout *application* — its metrics, its logs, its traces. CloudTrail watches something different: every API call made against your AWS *account*, by anyone or anything. When Northbridge needs to answer "who changed the checkout service's security group last night, and from where," CloudTrail is the only tool in this chapter built to answer that question.

## What you'll learn

- The difference between a management event and a data event
- How Event history gives you 90 days of account activity with zero setup
- Why teams create trails to keep activity beyond 90 days and across regions
- How CloudTrail Insights surfaces unusual API activity automatically

## Event history: 90 days, no setup required

CloudTrail is turned on for every AWS account automatically, logging the last 90 days of **management events** — control-plane actions like creating an EC2 instance, changing an IAM policy, or modifying a security group — into **Event history**, with no configuration needed:

![AWS CloudTrail Event history page in the console, showing a table of logged events with the default Read-only filter applied, plus filter chips above the table.](/courses/monitoring-logging-and-observability/ch03/13-cloudtrail-and-audit-logging/cloudtrail-event-history.png)
*The default filter hides read-only events; clearing it surfaces every management action, not just the ones that changed something.*
Source: [Tutorial: Visualizing CloudTrail Events — AWS Documentation](https://github.com/awsdocs/aws-cloudtrail-user-guide/blob/master/doc_source/cloudtrail-tutorial.md)

You can filter this view many ways — by event name, user, resource, or time range — which is exactly how you'd track down that security group change:

![AWS CloudTrail Event history page with the default filter removed, showing a dropdown of available filter options including Event name, User name, and Event source.](/courses/monitoring-logging-and-observability/ch03/13-cloudtrail-and-audit-logging/cloudtrail-event-history-filters.png)
*Filtering by Event name and specifying something like `AuthorizeSecurityGroupIngress` narrows thousands of events down to the handful that matter.*
Source: [Tutorial: Visualizing CloudTrail Events — AWS Documentation](https://github.com/awsdocs/aws-cloudtrail-user-guide/blob/master/doc_source/cloudtrail-tutorial.md)

## Management events vs. data events

**Management events** are control-plane operations — creating, modifying, or deleting AWS resources (launching an instance, updating an IAM role, changing a security group). **Data events** are higher-volume data-plane operations on the resources themselves — an S3 `GetObject` call, a Lambda function invocation. Data events are off by default (they're far higher volume and cost more to log) and have to be explicitly enabled per resource when you need that level of detail, such as proving exactly which principal read a specific object out of an S3 bucket holding customer data.

## Trails: beyond 90 days, across regions

Event history is convenient but temporary and regional. A **trail** is a standing configuration that continuously delivers events to an S3 bucket (and optionally CloudWatch Logs) for retention well beyond 90 days, and can be scoped to log every region in the account — the setup most compliance and security teams require before they'll sign off on an AWS account. Creating one walks through choosing a name, an S3 destination, and which event types to capture.

## CloudTrail Insights: unusual activity, flagged automatically

Beyond logging every event, CloudTrail Insights analyzes management event patterns and flags statistically unusual activity automatically — a sudden spike in `RunInstances` calls, for example, which could mean anything from a legitimate scaling event to a compromised credential being used to spin up cryptomining instances. Insights surfaces that anomaly without anyone having to write a detection rule for it in advance.

## Key terms

- **Management event** — a control-plane API call that creates, modifies, or deletes an AWS resource
- **Data event** — a higher-volume data-plane operation on a resource itself (e.g., S3 GetObject); off by default
- **Event history** — CloudTrail's built-in 90-day log of management events, enabled automatically, no setup required
- **Trail** — a standing configuration delivering events to S3/CloudWatch Logs for retention beyond 90 days, across regions
- **CloudTrail Insights** — automatic anomaly detection on management event patterns
