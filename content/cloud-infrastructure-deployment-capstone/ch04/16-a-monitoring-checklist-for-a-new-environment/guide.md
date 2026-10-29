# Lesson 16 — A Monitoring Checklist for a New Environment

**Chapter 4 · Monitoring the Deployed Environment · Lesson 16 of 32**

## What you'll learn

- How to pull Lessons 13-15 together into one practical checklist before calling monitoring "done"
- The five concrete things to verify, in order, before this environment takes on real traffic
- Why "configured" and "tested" are not the same thing, and why the checklist checks both
- What's genuinely still missing after this checklist — backup and disaster recovery, which Chapter 5 picks up next

## Why this chapter ends with a checklist, not a summary

Three lessons built up real pieces: a log destination, a small set of alerts, and the discipline to keep that alert set from turning into noise. Pulling them together into a single checklist matters because it's easy to walk away thinking monitoring is "done" after setting a few things up, when in reality a few of those pieces were configured but never actually verified to work. This checklist is the difference between "I think monitoring is in place" and "I confirmed monitoring is in place" — the second one is what this environment actually needs before it carries real traffic.

## The five-point checklist

**1. Metrics configured?** The log destination from Lesson 13 exists, and the environment's VMs/EC2 instances, storage, and network resources are actually reporting into it — not just technically eligible to, but confirmed visible in the portal or CLI.

**2. Alerts configured?** The small, high-confidence set from Lesson 14 — sustained CPU, low disk, failed health checks, failed logins — exists as real alert rules against real resources, not just planned on paper.

**3. Alerts tested?** This is the step that's easiest to skip and most important not to. An alert rule that's never actually fired is an assumption, not a confirmed working alert. Deliberately triggering a test condition (or temporarily lowering a threshold to force a fire) and confirming the notification actually arrives is the only way to know the alert works end to end, not just that it's syntactically valid.

**4. Action group / notification configured?** The alert is wired to an Action Group or SNS topic, and that destination has a real person subscribed and able to receive it — an alert that fires into a notification channel nobody's watching is functionally the same as no alert.

**5. Dashboard created?** A single view — Azure Dashboard or CloudWatch Dashboard — showing the handful of metrics that matter for this environment, in one place, so a quick glance answers "is everything normal right now" without opening five separate resource blades.

## Example: running the checklist against this environment

Walking the five points against the environment built in Chapters 1-3: metrics are flowing into the Log Analytics workspace or Log group created in Lesson 13 — confirmed, not assumed. The four alerts from Lesson 14 exist and were each test-fired once to confirm the Action Group/SNS notification actually lands. A dashboard shows CPU, disk free, and health check status for every resource in one place. That's monitoring genuinely standing — the point this chapter was building toward since Lesson 13.

## What's still missing: backup and disaster recovery

This checklist closes out monitoring, but monitoring only tells you something went wrong — it doesn't get you back online. A monitored environment with no backup still loses data permanently if a disk fails or a resource is deleted by mistake. That's a different problem with a different fix, and it's exactly where Chapter 5 picks up.

## Key terms

| Term | Meaning |
|---|---|
| Configured vs. tested | An alert rule existing is not the same as confirming its notification actually arrives |
| Test-firing an alert | Deliberately triggering or temporarily lowering a threshold to confirm an alert works end to end |
| Monitoring dashboard | A single view of the metrics that matter, so "is everything normal" doesn't require checking five separate pages |
| RTO / RPO | Recovery time/point objective — the measures Chapter 5 uses once monitoring tells you something needs recovering |

## Check yourself

You're ready for Chapter 5 when you can explain, without looking: why does an alert rule that's never been test-fired count as unverified, even if it was configured correctly?
