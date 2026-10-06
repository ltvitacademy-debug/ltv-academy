# Lesson 11 — Monitoring AI Service Usage

**Chapter 2 · Working With Azure AI Services · Lesson 11 of 24**

## What you'll learn

- The three layers "monitoring" covers for a deployed AI service
- Where to find the Monitor dashboard, and what's on it
- Thresholds worth knowing for latency, success rate, and token usage
- How recurring evaluations catch quality drift without manual checking

## Three layers of visibility

Monitoring a deployed AI service covers more ground than a typical web service:

- **Operational metrics** — token usage, latency, and run success rate: the same categories you'd track for any production service.
- **Evaluation metrics** — coherence, fluency, groundedness, and safety scores, run against a sample of real production traffic, not just a test set.
- **Tracing** — the full execution path of a single request: every LLM call, tool invocation, and agent decision, end to end.

## The dashboard

The **Monitor** tab brings operational and evaluation data into one view:

![The Agent Monitoring Dashboard, with summary cards for operational metrics at top and charts for agent runs, token usage, and error rate below.](/courses/azure-ai-cloud/ch02/11-monitoring-ai-service-usage/foundry-metrics-dashboard.png)
*The Monitor tab's dashboard: summary cards up top, token usage, run success, and error-rate charts below.*

Summary cards give you the headline numbers at a glance; the charts below let you filter by time range and see trends, not just current totals.

## Thresholds worth knowing

A few rules of thumb make the dashboard's numbers actionable instead of just decorative:

| Signal | Threshold | What it usually means |
|---|---|---|
| Latency | Above 10 seconds | Model throttling, a slow tool call, or a network issue |
| Run success rate | Below 95% | Worth investigating the failed runs directly |
| Token usage | A sudden spike | Often a verbose prompt or a response with no length limit |

## Choosing what gets watched

The **Monitor settings** panel (the gear icon on the Monitor tab) is where you turn each signal on:

![The Monitor Settings panel, with toggles for operational metrics, continuous evaluation, scheduled evaluations, red team scans, and alerts.](/courses/azure-ai-cloud/ch02/11-monitoring-ai-service-usage/monitor-settings-panel-new.png)
*The Monitor settings panel turns on operational metrics, continuous evaluation, scheduled evaluation, red team scans, and alerts.*

## Automating the check

Checking quality manually, occasionally, doesn't scale. A **recurring evaluation** fixes that:

![The recurring evaluation creation wizard, configuring which agents to monitor and whether to run on a schedule or against live traffic.](/courses/azure-ai-cloud/ch02/11-monitoring-ai-service-usage/monitor-recurring-create-wizard.png)
*A recurring evaluation samples live traffic or runs on a schedule, so quality drift gets caught without anyone remembering to look.*

A **scheduled** evaluation runs on a fixed recurrence (daily at 9 a.m., for example) against a chosen dataset. A **continuous** evaluation samples live traffic as it happens. Either way, quality checks run automatically, independent of anyone remembering to kick them off.

## Key terms

| Term | Meaning |
|---|---|
| Monitor tab | The dashboard showing operational and evaluation metrics for an agent or deployment |
| Operational metrics | Token usage, latency, and run success rate |
| Recurring evaluation | An automated, scheduled or continuous quality check against production traffic |
| Tracing | The end-to-end execution path of a single request, captured for debugging |

## Check yourself

You've completed this chapter when you can explain, without looking: what are the three layers of AI service monitoring, and what's the practical difference between a scheduled and a continuous evaluation?
