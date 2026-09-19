# Lesson 93 — Project: HA/DR & Disaster Simulation

**Chapter 15 · Real-World Azure DBA Project · Lesson 93 of 95**

## What you'll learn

- How to turn a plain-language business constraint into concrete RPO and RTO numbers
- How to match an HA/DR architecture to those numbers, instead of picking one first and hoping
- What "recovered" actually requires you to verify, beyond the app reconnecting
- That Chapter 15 closes here, and Chapter 16 — this course's final chapter — is next

## The constraint, stated the way leadership actually states it

Following up on the CEO's question from Lesson 90, here's the concrete
version leadership gives you: **"If our primary site goes down, we can
lose no more than 15 minutes of data, and we need to be operational
again within one hour."**

That sentence contains two numbers a DBA has to name correctly before
choosing anything:

- "No more than 15 minutes of data" is a **Recovery Point Objective
  (RPO)** of 15 minutes.
- "Operational again within one hour" is a **Recovery Time Objective
  (RTO)** of one hour.

Naming these first, before reaching for an architecture, is the actual
skill — picking Always On or geo-replication first and hoping it happens
to satisfy the business is working backwards.

## Matching the architecture to the numbers

**RTO of one hour** means failover has to be automatic, or close to it —
there isn't time for someone to be paged, log in, and manually reconfigure
connection strings by hand. For the databases on Managed Instance
(`OrderManagement`, `DriverHR` from Lesson 91), that points to **Auto-
Failover Groups**, which fail over automatically and keep the
application pointed at a stable listener endpoint instead of a server
name that changes. If those databases were on a VM instead, the
equivalent would be an **Always On Availability Group** with automatic
failover mode.

**RPO of 15 minutes** means whatever keeps the secondary in sync can't
be allowed to lag more than 15 minutes behind the primary — that's a
number you monitor (replication lag), not a box you check once and
forget.

**Regional disaster specifically** is the detail that rules out relying
on local backups alone — a backup sitting in the same region as the
primary doesn't survive that region having a bad day. The architecture
needs geo-redundant backup storage or a geo-replicated secondary in a
different region, on top of whatever local HA is already in place.

## Post-recovery validation — proving it, not assuming it

An app reconnecting after failover is not the same thing as "recovered."
Before calling it done:

- **Run `DBCC CHECKDB`** on the failed-over copy — a failover doesn't
  guarantee the data itself is undamaged.
- **Compare row counts and checksums** against the last known-good state
  from before the failure.
- **Confirm application connectivity through the failover group's
  listener endpoint**, not the old primary's server name — a subtle
  failure mode where the app "reconnects" to a server that's no longer
  the right one.
- **Time the whole event, end to end**, and check the actual numbers
  against the 15-minute/1-hour targets — did the plan really hold, or
  did it just look like it held?

## Chapter 15 is complete

Lessons 90 through 93 took Meridian Fleet Logistics from a single
on-prem server with no HA/DR to a migrated, secured, tuned, automated,
and disaster-tested Azure environment — using nothing beyond what
Chapters 1-14 already gave you, applied to one continuous, specific
scenario. **Chapter 16 — Certification & Interview Preparation — is
this course's final chapter**, starting with a full DP-300 exam review
and closing with genuine DBA interview practice.

## Key terms

| Term | Meaning |
|---|---|
| RPO (Recovery Point Objective) | The maximum acceptable amount of data loss, measured in time |
| RTO (Recovery Time Objective) | The maximum acceptable time to restore service after a failure |
| Auto-Failover Group | An Azure SQL / Managed Instance feature that fails over automatically and keeps a stable endpoint for the application |

## Check yourself

Before Lesson 94: given "no more than 15 minutes of data loss, one hour
to be operational," can you state which number is RPO, which is RTO, and
name one architecture choice each number rules out on its own?
