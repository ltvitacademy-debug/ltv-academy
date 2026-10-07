# Alerts & Action Groups

Everything in this chapter so far has been about *finding* a problem once you go looking for it. Alerts flip that around: they watch continuously and tell you the moment something crosses a line you defined, so you don't have to be staring at a dashboard when Northbridge's checkout latency spikes at 2 a.m. during a flash sale. An alert rule has two halves — the condition that triggers it, and the action group that decides what happens next — and Azure keeps those two halves separate on purpose.

## What you'll learn

- The three pieces of an alert rule: signal, condition, and action group
- Why Action Groups are a reusable, standalone resource instead of being buried inside each alert
- How to walk through creating a metric alert rule in the Azure portal
- What severity levels are for and how they shape the alert list you triage first

## Anatomy of an alert rule

Every Azure Monitor alert rule has three parts. The **signal** is the data source — a metric, a log query, or an activity log event. The **condition** is the threshold logic applied to that signal — "average response time over 2 seconds for 3 consecutive 5-minute periods." The **action group** is what fires when the condition is met. Creating one starts with picking the signal and shaping the condition:

![Azure Monitor new alert rule creation screen, showing a resource, signal, and condition being configured before the alert rule is saved.](/courses/monitoring-logging-and-observability/ch02/09-alerts-and-action-groups/new-alert-rule.png)
*The condition tab is where you turn a vague worry ("checkout feels slow") into a precise, testable threshold.*
Source: [Tutorial: Create a metric alert rule for an Azure resource — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/tutorial-metric-alert)

## Action Groups: reusable, not rebuilt per alert

An Action Group is a named, reusable bundle of notifications and actions — email, SMS, push notification, voice call, webhook, Azure Function, Logic App, or Automation runbook. You define it once and attach it to as many alert rules as you want:

![Azure portal Create action group dialog, showing Subscription, Resource group, Action group name, and Display name fields being filled in.](/courses/monitoring-logging-and-observability/ch02/09-alerts-and-action-groups/action-group-1-basics.png)
*An action group is its own Azure resource — build "page the on-call engineer" once, then reuse it across every alert rule that should trigger it.*
Source: [Create and manage action groups in the Azure portal — Microsoft Learn](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups)

That separation matters operationally: if Northbridge changes its on-call rotation's webhook or escalation policy, you update one action group — you don't have to hunt down and edit every alert rule that references it.

## Severity: shaping how you triage

Every alert rule carries a severity, from Sev 0 (critical) to Sev 4 (verbose). Severity doesn't change whether the alert fires — it changes how it's presented and sorted in the Alerts list, which is what lets an on-call engineer scan a dashboard at 2 a.m. and immediately see the Sev 0s (checkout is down) separately from the Sev 3s (disk usage trending up, no rush). Choosing severity thoughtfully is part of what keeps alerting useful instead of noisy — the same theme Chapter 1's "Alerting Philosophy" lesson and Chapter 6's "Reducing Alert Fatigue" lesson both come back to.

## Putting it together for Northbridge

A realistic checkout alert rule: signal = `AverageResponseTime` on the checkout App Service; condition = average > 2000ms for 3 consecutive periods of 5 minutes; severity = Sev 1; action group = "Checkout On-Call," which pages the on-call engineer via SMS and posts to a Teams channel via webhook. One rule, one reusable action group, two very different notification channels fired from the same event.

## Key terms

- **Alert rule** — the combination of a signal, a condition, and an action group
- **Signal** — the data source an alert watches: a metric, a log query, or an activity log event
- **Condition** — the threshold logic applied to the signal that determines when the alert fires
- **Action group** — a reusable, named bundle of notifications and actions, attachable to many alert rules
- **Severity** — a Sev 0–4 ranking that shapes how an alert is sorted and triaged, independent of whether it fires
