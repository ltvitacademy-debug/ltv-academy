# Lesson 22 — CloudWatch Alarms and Notifications

**Chapter 6 · Monitoring: CloudWatch · Lesson 22 of 32**

## What you'll learn

- How a CloudWatch Alarm turns a metric threshold into an automatic trigger, instead of something a human has to notice
- The real pieces of an alarm: metric, statistic, period, comparison operator, and evaluation
- The three states an alarm can be in, and what each one actually means
- How SNS (Simple Notification Service) is the real mechanism an alarm notifies through — and why a subscriber has to confirm first

## From metric to trigger: why alarms exist

Lesson 21's dashboards are only useful if someone is actually looking at
them. A **CloudWatch Alarm** removes that requirement: it watches a single
metric continuously and fires the moment that metric crosses a threshold you
define, with no one needing to be staring at a chart when it happens. An
alarm watching `CPUUtilization` for "greater than 80% for 5 minutes" is the
same idea, in AWS terms, as the Activity Log alerts this path's Azure course
could be configured to raise — except here the trigger is a metric
threshold, not an administrative action.

## The anatomy of an alarm

Every alarm is built from the same handful of pieces: the **metric** to
watch (e.g., `CPUUtilization` in namespace `AWS/EC2`), the **statistic**
applied to it (Average, Maximum, Sum...), the **period** — how long one
evaluation window covers, in seconds — and a **comparison operator** with a
**threshold** (`GreaterThanThreshold`, 80). "CPUUtilization above 80% for 5
minutes" becomes a period of 300 seconds with one evaluation period
breaching it:

```
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu-web01 \
  --namespace AWS/EC2 \
  --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=i-0123456789abcdef0 \
  --statistic Average \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions arn:aws:sns:us-east-1:111122223333:ops-alerts
```

## Three states, not two

An alarm isn't simply "on" or "off." It lives in one of three states:
**OK** (the metric is within bounds), **ALARM** (the threshold has been
breached for the configured evaluation periods), or
**INSUFFICIENT_DATA** (CloudWatch hasn't received enough data points yet to
judge, which is normal right after an instance first launches). Only the
transition *into* ALARM actually fires the notification — an alarm sitting
in ALARM state doesn't re-notify every minute while it stays there.

## SNS: the real notification mechanism

An alarm doesn't send an email or text message itself — it publishes to an
**SNS topic**, and SNS (**Simple Notification Service**) fans that
publication out to every **subscriber** on the topic: an email address, a
phone number for SMS, or an HTTP/HTTPS webhook endpoint. That's the
`--alarm-actions` ARN in the command above. One real detail that catches
people off guard: a brand-new email or SMS subscription sits in **"pending
confirmation"** until the subscriber clicks the confirmation link AWS sends
them — until then, the alarm can fire all day and that subscriber hears
nothing.

## Example: setting it up end to end

```
aws sns create-topic --name ops-alerts
aws sns subscribe \
  --topic-arn arn:aws:sns:us-east-1:111122223333:ops-alerts \
  --protocol email \
  --notification-endpoint oncall@example.com
```

Create the topic, subscribe an email address, have that person click the
confirmation link in their inbox, and only *then* attach the topic's ARN to
an alarm's `--alarm-actions`. Skip the confirmation step and the alarm will
transition to ALARM exactly on schedule — the notification just goes
nowhere.

## Key terms

| Term | Meaning |
|---|---|
| CloudWatch Alarm | A watcher on a metric that triggers when it crosses a defined threshold |
| Evaluation period | The time window(s) a metric must breach the threshold before the alarm fires |
| Alarm state | OK, ALARM, or INSUFFICIENT_DATA — the alarm's current status |
| SNS (Simple Notification Service) | The pub/sub service an alarm publishes to, which fans out to email, SMS, or webhook subscribers |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why would a
freshly created email subscription on an SNS topic receive nothing, even
after an alarm you attached it to has clearly fired?
