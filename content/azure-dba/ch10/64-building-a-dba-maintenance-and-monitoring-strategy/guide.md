# Lesson 64 — Building a DBA Maintenance & Monitoring Strategy

**Chapter 10 · SQL Server Agent & Automation · Lesson 64 of 95**

## What you'll learn

- Pulling Chapters 7-10 into one coherent strategy, not four separate topics
- What actually belongs on a schedule, and what belongs in an always-on alert instead
- A real example strategy for a mid-sized production environment
- Chapter 10 is complete — Chapter 11 moves from Agent-based automation to Azure-native automation

## Four chapters, one job

Chapter 7 taught you to establish a baseline and monitor. Chapter 8
taught you to actually tune a slow query. Chapter 9 taught you the
routine maintenance that keeps a database healthy. Chapter 10 taught
you to automate that maintenance and get notified when it fails.
None of these are separate DBA responsibilities — they're four parts
of one ongoing job: **know what's happening, keep it healthy, fix
what's slow, and don't have to watch it by hand.**

## Scheduled vs. always-on

Not everything belongs in a nightly job. The real distinction:

```
Scheduled (runs on a cadence):
  - Index/statistics maintenance (Lesson 63)
  - DBCC CHECKDB (Lesson 55)
  - Backup verification

Always-on (fires the moment a condition is true):
  - Azure Monitor alerts on CPU/DTU/storage thresholds (Lesson 39)
  - SQL Agent alerts on specific error severities (Lesson 61)
  - Automatic Tuning's regression detection (Lesson 52)
```

Putting an always-on concern on a schedule (checking CPU every 15
minutes instead of alerting the moment it crosses a threshold) means
a real problem can sit unnoticed for up to 15 minutes. Putting a
scheduled concern on an alert (trying to "alert" on fragmentation
instead of just rebuilding on a schedule) is usually unnecessary
complexity for something that doesn't need instant reaction.

## A real strategy, for a mid-sized production environment

```
Nightly (2 AM, low-traffic window):
  1. DBCC CHECKDB
  2. Ola Hallengren index maintenance (smart REBUILD/REORGANIZE)
  3. Statistics update pass

Weekly (Sunday):
  - Full backup verification (restore-test to a scratch instance)
  - Unused-index review (Lesson 47's DMVs)

Continuous:
  - Azure Monitor alert: CPU > 85% for 10+ minutes
  - Azure Monitor alert: storage > 90%
  - Automatic Tuning: FORCE_LAST_GOOD_PLAN = ON
  - SQL Agent alert: any severity 17+ error

Reviewed weekly by a human:
  - Query Store's top resource consumers (Lesson 49)
  - Job history for any silent failures (Lesson 62)
```

Notice what's deliberately absent from "continuous": nobody's staring
at a dashboard 24/7. The alerts do that job; a human reviews trends
and anything the alerts already caught.

## Chapter 10 is complete

SQL Server Agent — fundamentals, jobs, alerts, troubleshooting,
automating Chapter 9's maintenance, and now one coherent strategy
tying all of Chapters 7-10 together. **Chapter 11 — Azure Automation
& Infrastructure as Code — is next**, moving from Agent-based
automation (what you've just spent four chapters on) to Azure-native
automation: CLI, PowerShell, and IaC.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled maintenance | Runs on a cadence — appropriate for routine health tasks |
| Always-on alerting | Fires the moment a condition is true — appropriate for anything needing fast reaction |

## Check yourself

You're ready for Chapter 11 when you can explain, without looking:
why would putting CPU monitoring on a 15-minute schedule instead of
an always-on alert be a real operational mistake?
