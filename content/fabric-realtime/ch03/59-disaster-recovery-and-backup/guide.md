# Lesson 59 — Disaster Recovery and Backup Strategies

**Chapter 3 · Production Data Engineering · Lesson 59 of 70**

## What you'll learn

- RTO and RPO — the two numbers that actually define a recovery plan
- What's already backed up by default, versus what needs a deliberate plan
- Delta's time travel as a lightweight disaster recovery tool, with real limits
- A disaster vs. Lesson 57's incident — where the line actually is

## Two numbers, not a vague promise

```
RPO (Recovery Point Objective):  how much data can we afford to lose?
                                  "up to 15 minutes of events"
RTO (Recovery Time Objective):   how long can we afford to be down?
                                  "back online within 2 hours"
```

"We have backups" isn't a plan — it's a starting point. An **RPO**
answers how much data loss is acceptable if the worst happens; an
**RTO** answers how long recovery is allowed to take. Both numbers
force a real conversation about cost versus risk, because a
tighter RPO or RTO almost always costs more to guarantee.

## What's already backed up, and what isn't

```
Already covered:  Fabric item definitions -- Git integration (Lesson 15/46)
Already covered:  Delta table history -- time travel (Databricks Lesson 21)
Needs a plan:     A KQL Database's actual event data, beyond its
                  own retention window (Lesson 54)
Needs a plan:     Azure resource configuration -- IaC (Lesson 47)
                  covers this if it's actually used consistently
```

A surprising amount of this course's earlier material *is* already
disaster recovery, just not framed that way at the time: Git
integration means item definitions survive a workspace disaster.
Bicep/Terraform (Lesson 47) means the underlying Azure resources can
be recreated from a definition file. What's genuinely still open is
the actual streaming data itself.

## Delta's time travel as a lightweight recovery tool

```sql
-- Databricks & Delta Lake Lesson 21's mechanism, applied here
SELECT * FROM trip_events_lakehouse
VERSION AS OF 42
```

Time travel lets you query a Delta table as it existed at an
earlier point — useful for recovering from a bad write within the
table's history window. It is not a substitute for a real backup
strategy: Lesson 24's `VACUUM` eventually removes old file versions
permanently, and time travel only ever covers what's still inside
that retention window, never a true regional outage or an entire
lost workspace.

## Where the line actually is

Lesson 57's incident response handles a bad deploy or a
misconfiguration — something wrong *within* a system that's still
fundamentally there. A genuine disaster is when the system itself
is gone or unreachable — a region outage, an accidentally deleted
workspace, a corrupted KQL Database with no clean history left. The
difference matters because the response is different: one is
"mitigate, then fix"; the other is "restore from what was actually,
deliberately, backed up."

## Key terms

| Term | Meaning |
|---|---|
| RPO | How much data loss is acceptable in the worst case |
| RTO | How long recovery is allowed to take |
| Time travel | A lightweight, limited recovery tool, not a real backup strategy |

## Check yourself

You're ready for Lesson 60 when you can explain, without looking: why
isn't Delta's time travel a substitute for a real disaster recovery
plan?
