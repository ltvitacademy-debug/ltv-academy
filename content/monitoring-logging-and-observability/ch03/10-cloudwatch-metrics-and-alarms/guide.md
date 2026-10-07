# CloudWatch Metrics & Alarms

Amazon CloudWatch is AWS's answer to everything Azure Monitor does for Azure — the platform that collects metrics from every AWS service, and the place you build alarms on top of them. If Northbridge Retail runs its checkout service on AWS instead of Azure, CloudWatch is where it starts: dashboards for the eye, alarms for the page.

## What you'll learn

- How CloudWatch organizes metrics into namespaces, dimensions, and time series
- What the CloudWatch overview dashboard shows at a glance
- The difference between a static-threshold alarm and an anomaly detection alarm
- The three states a CloudWatch alarm can be in, and what each one means operationally

## Namespaces, dimensions, and metrics

Every CloudWatch metric lives inside a **namespace** — a container that groups metrics by the service that published them, like `AWS/EC2` or `AWS/ApplicationELB`. Within a namespace, a metric is further broken down by **dimensions** — name/value pairs like `InstanceId` or `LoadBalancerName` that let you look at `CPUUtilization` for one specific EC2 instance instead of an undifferentiated average across every instance you own. For Northbridge's checkout tier, that might mean watching `RequestCountPerTarget` and `TargetResponseTime` under `AWS/ApplicationELB`, scoped to the checkout service's specific load balancer.

## The overview: alarms and metrics at a glance

CloudWatch's console home page surfaces alarm states and metric graphs together, so you can triage without digging into a specific service first:

![CloudWatch overview home page in the AWS console, showing alarm state counts and several metric graph widgets.](/courses/monitoring-logging-and-observability/ch03/10-cloudwatch-metrics-and-alarms/cw-dashboard-overview.png)
*The overview refreshes automatically — alarm counts by state, plus whatever metric graphs you've favorited.*
Source: [Getting started with Amazon CloudWatch — AWS Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GettingStarted.html)

## Two ways to define an alarm's threshold

A **static threshold alarm** compares a metric against a fixed number you set — "alarm if `TargetResponseTime` > 2 seconds." That's the right call when you know the acceptable range in advance. But some metrics (request volume during a flash sale, for example) have a normal range that changes by time of day and day of week, and a single static number is either too sensitive at 3 a.m. or not sensitive enough at noon.

**Anomaly detection alarms** solve that by having CloudWatch learn a metric's expected pattern over about two weeks, then draw a dynamic band around it. The alarm fires when the metric steps outside that band — not outside a fixed number:

![CloudWatch metrics console showing a metric graph with a shaded anomaly detection band drawn around the expected range of the CPUUtilization metric.](/courses/monitoring-logging-and-observability/ch03/10-cloudwatch-metrics-and-alarms/anomaly-detection-graph.png)
*The shaded band is CloudWatch's learned "normal" for this metric — the alarm fires only when the line leaves the band, not when it crosses one fixed number.*
Source: [Using CloudWatch anomaly detection — AWS Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html)

## Alarm states

A CloudWatch alarm is always in one of three states: **OK** (the metric is within the defined range), **ALARM** (the metric has breached the threshold), or **INSUFFICIENT_DATA** (the alarm doesn't have enough data yet to know, which is common right after creating it or during a gap in metric reporting). That third state matters in practice — a newly created alarm sitting in INSUFFICIENT_DATA isn't broken, it just hasn't collected enough data points to evaluate yet.

## Key terms

- **Namespace** — a container grouping CloudWatch metrics by the AWS service that published them
- **Dimension** — a name/value pair that scopes a metric to a specific resource (e.g., `InstanceId`)
- **Static threshold alarm** — an alarm comparing a metric against a fixed number you set
- **Anomaly detection alarm** — an alarm comparing a metric against a learned, dynamic expected range
- **Alarm state** — OK, ALARM, or INSUFFICIENT_DATA — the alarm's current evaluation result
