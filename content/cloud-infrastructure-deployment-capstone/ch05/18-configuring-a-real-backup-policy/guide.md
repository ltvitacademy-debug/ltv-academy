# Lesson 18 — Configuring a Real Backup Policy

**Chapter 5 · Backup & Disaster Recovery Basics · Lesson 18 of 32**

## What you'll learn

- How **Azure Backup** policies configure backup frequency and retention for a VM or resource
- How **AWS Backup** plans (and the EBS snapshot schedules from the earlier storage chapter)
  configure the same thing on AWS
- What **retention policy** actually means, and why "keep everything forever" is not a real policy
- How to build **tiered retention** — daily, weekly, monthly — so storage cost doesn't grow
  forever while recent recovery points stay dense

## From RPO to an actual policy

Lesson 17 set the rule: the RPO you agree to determines the minimum backup frequency. This lesson
is where that number becomes an actual configured policy instead of a plan on paper. On Azure,
that's an **Azure Backup policy** attached to a Recovery Services vault — it defines how often
backups run (hourly, daily) and how long each backup is kept. On AWS, it's an **AWS Backup plan**,
which does the equivalent job across EBS volumes, RDS databases, and other supported resources
from one place, instead of configuring snapshot schedules resource-by-resource the way the earlier
EBS snapshot lesson showed with Data Lifecycle Manager. Both tools exist to do the same job: turn
"backups must run at least every N hours" into something that actually runs on a schedule, with
nobody needing to remember to click a button.

```text
Azure Backup policy (conceptual):
  Backup frequency: Daily, 9:00 PM
  Instant restore retention: 2 days
  Retention: Daily points kept 30 days
             Weekly points kept 12 weeks
             Monthly points kept 12 months

AWS Backup plan (conceptual):
  Backup rule: Daily at 02:00 UTC
  Lifecycle: Move to cold storage after 30 days
             Delete after 365 days
  Applies to: resources tagged Environment=Production
```

## Retention: how long a backup actually sticks around

A **retention policy** answers a question separate from frequency: once a backup is taken, how
long do you keep it before it's deleted? Keeping every backup forever sounds safe, but it isn't
free or sensible — storage cost grows without bound, and most of those old recovery points are
never going to be restored from. The real skill is deciding how far back you actually need to be
able to recover, for different kinds of recovery: an accidental delete from this morning needs a
backup from a few hours ago, but recovering from a slow-building data corruption issue that
nobody noticed for three weeks needs something older than "yesterday."

## Tiered retention: dense recently, sparse further back

The practical answer most real backup policies use is **tiered retention**: keep backups dense
for recent history and progressively sparser further back. A common pattern looks like daily
backups kept for a week, weekly backups kept for a month, and monthly backups kept for a year (or
longer, depending on compliance requirements). That gives you fine-grained recovery points for
the recent past — when you're most likely to need to restore from something — while older history
is still recoverable at a coarser grain, without paying to store 365 daily snapshots when 12
monthly ones cover the same span at a fraction of the storage. Both Azure Backup policies and AWS
Backup lifecycle rules support this tiering natively; you're not building it by hand.

## Matching the policy to the resource, not applying one policy everywhere

A backup policy isn't "set once, apply to everything." A production database with a 1-hour RPO
needs a fundamentally different policy than a dev/test VM that gets rebuilt from a template every
sprint and doesn't really need backups at all. Tagging resources (as the AWS Backup plan example
above does with `Environment=Production`) and attaching different policies to different tags is
how real environments avoid either over-backing-up low-value resources or under-backing-up the
ones that actually matter.

## Key terms

| Term | Meaning |
|---|---|
| Azure Backup policy | Defines backup frequency and retention for resources in a Recovery Services vault |
| AWS Backup plan | Centralized backup rules and lifecycle (retention) across EBS, RDS, and other AWS resources |
| Retention policy | How long a backup is kept before it's deleted |
| Tiered retention | Keeping backups dense for recent history (daily) and sparser further back (weekly, monthly) |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why does tiered retention (daily
for a week, weekly for a month, monthly for a year) cost less than keeping every daily backup
forever, while still covering the same total time span?
