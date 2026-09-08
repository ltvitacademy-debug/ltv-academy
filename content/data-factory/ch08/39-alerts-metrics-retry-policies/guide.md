# Lesson 39 — Alerts, Metrics & Retry Policies

**Chapter 8 · Monitoring & Error Handling · Lesson 2 of 4**

## What you'll learn

- How to set up an alert that emails or texts you when something fails
- Which metrics are actually available to alert on
- How to scope an alert to one specific pipeline or activity
- How to configure automatic retries directly on an activity

## You shouldn't have to go looking

The Monitor hub, from Lesson 38, is something you check. **Alerts**
are the opposite: Data Factory tells *you*, the moment a condition
you defined is met — no need to be staring at the runs list when a
production pipeline fails at 3 AM.

## Where alerts live

From **Monitor → Alerts & metrics**, select **New alert rule**:

![Data Factory Monitor page showing the Alerts & metrics navigation entry.](/courses/data-factory/ch08/39-alerts-metrics-retry-policies/start-page.png)
*The entry point for every alert you'll ever create in this data factory.*

## Choosing what to alert on

The metric list covers nearly every failure category you'd actually
want to know about — not just generic "something broke":

![Add criteria dialog listing selectable metrics including Failed activity runs, Failed pipeline runs, Failed trigger runs, and integration runtime CPU utilization.](/courses/data-factory/ch08/39-alerts-metrics-retry-policies/add-criteria-2.png)
*Failed activity runs, failed pipeline runs, failed trigger runs, cancelled runs of each, and integration runtime health metrics like CPU utilization and available memory — all selectable individually.*

Picking **Failed activity runs metrics**, for instance, means this
alert fires only for activity-level failures, not for a pipeline
that's simply running long.

## Scoping the alert precisely

A raw "any activity anywhere failed" alert gets noisy fast. Scope it
down by dimension:

![Configure alert logic screen with dimension filters for ActivityType, ActivityName, and PipelineName.](/courses/data-factory/ch08/39-alerts-metrics-retry-policies/alert-logic.png)
*Filter by ActivityType, ActivityName, or PipelineName — so a genuinely critical nightly load pipeline can have its own dedicated, tightly-scoped alert, separate from everything else.*

## Getting notified

The last step connects the alert to a real notification — email,
SMS, push, or voice, through an **action group**:

![Configure notifications screen for an alert rule, with options for email, SMS, push, and voice.](/courses/data-factory/ch08/39-alerts-metrics-retry-policies/configure-notification-1.png)
*Action groups are reusable — the same "on-call data team" group can back alerts across many different rules, so you configure the notification target once.*

## Automatic retries: the other half of resilience

Alerts tell you something failed. **Retry policies** try to prevent
you from ever needing to know, for failures that are often transient
— a brief network blip, a source system that was mid-restart. Every
execution activity has a `policy` block:

```
"policy": {
  "timeout": "00:10:00",
  "retry": 1,
  "retryIntervalInSeconds": 60,
  "secureOutput": true
}
```

| Property | Meaning | Default |
|---|---|---|
| `timeout` | How long the activity is allowed to run before it's failed as timed out | 12 hours |
| `retry` | Maximum number of retry attempts | 0 (no retries) |
| `retryIntervalInSeconds` | Delay between retry attempts | 30 seconds |
| `secureOutput` | When true, the activity's output isn't logged for monitoring — useful for sensitive data | false |

The default is genuinely zero retries — you have to opt in. For a
Copy activity pulling from a flaky REST API, setting `retry: 3` with
a `retryIntervalInSeconds` of 30-60 will quietly absorb transient
failures that would otherwise page someone for nothing.

## Key terms

| Term | Meaning |
|---|---|
| Action group | A reusable set of notification targets (email, SMS, push, voice) an alert connects to |
| Dimension | A filter (ActivityType, ActivityName, PipelineName) narrowing which runs an alert applies to |
| Activity policy | The `timeout`/`retry`/`retryIntervalInSeconds`/`secureOutput` block on every execution activity |

## Lab

1. In **Monitor → Alerts & metrics**, start creating a new alert rule
   for **Failed pipeline runs metrics** and note the dimension filter
   options, without saving it.
2. Add a `policy` block to a Copy activity in one of your existing
   pipelines with `retry: 2` and `retryIntervalInSeconds: 30`.
3. Write one sentence explaining why `secureOutput: true` matters for
   an activity handling sensitive data.

## Check yourself

You're ready for Lesson 40 when you can explain, in one sentence, why
retry policies and alerts solve two different problems rather than
the same one.
