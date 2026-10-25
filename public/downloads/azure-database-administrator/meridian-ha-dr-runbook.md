# HA/DR Planning & Failover Validation Runbook

A reusable worksheet from Chapter 14 (High Availability & Disaster Recovery), shaped around the
Chapter 15 capstone's RPO/RTO problem: leadership states a constraint in plain language, and it's the
DBA's job to turn it into concrete numbers and an architecture that actually satisfies them — then
prove, after a failover, that it held.

Fill in the blanks for your own environment; the Meridian Fleet Logistics example in each section
shows what a completed answer looks like.

## Part 1 — Translate the business statement into RPO and RTO

**The business statement, verbatim:**

> "If our primary site goes down, we can lose no more than ___ minutes of data, and we need to be
> operational again within ___."

**Meridian's answer:** "No more than 15 minutes of data, operational again within one hour."

| | Number | What it rules out on its own |
|---|---|---|
| RPO (Recovery Point Objective) | ___ minutes | Any replication method whose typical lag exceeds this number |
| RTO (Recovery Time Objective) | ___ | Any failover that requires a human to be paged, log in, and manually repoint connection strings, if RTO is under ~15-30 minutes |

**Meridian's answer:** RPO = 15 minutes. RTO = 1 hour. An RTO of one hour rules out manual-only
failover — there isn't time for someone to be paged and reconfigure connection strings by hand, so
failover has to be automatic or close to it.

## Part 2 — Match the architecture to the numbers, not the other way around

| Platform | RTO ≤ ~1 hour, automatic failover needed | RPO tight enough to require continuous sync |
|---|---|---|
| Managed Instance / Azure SQL Database | Auto-Failover Group (automatic policy, tuned grace period) | Built into geo-replication under the failover group |
| SQL Server on an Azure VM | Always On Availability Group, automatic failover mode | Synchronous or near-synchronous replica, depending on RPO |

**Meridian's answer:** `OrderManagement` and `DriverHR` are on Managed Instance, so the architecture
is an **Auto-Failover Group** with the automatic failover policy enabled. The grace period is tuned
short enough that a real outage triggers failover well inside the one-hour RTO, but long enough to
avoid a false alarm on a brief network blip.

**Regional disaster check:** does the plan assume local backups survive the region going down? If
yes, that's wrong — a backup in the same region as the primary doesn't survive that region having a
bad day. Geo-redundant backup storage or a geo-replicated secondary in a different region is required
on top of local HA.

## Part 3 — Post-failover validation checklist

An application reconnecting after failover is **not** the same thing as "recovered." Work through
every line below before calling the incident closed:

- [ ] `DBCC CHECKDB` run against the failed-over copy — a failover doesn't guarantee the data itself
      is undamaged.
- [ ] Row counts and checksums compared against the last known-good state from before the failure.
- [ ] Application connectivity confirmed through the **failover group's listener endpoint**
      (`<group>.database.windows.net`), not the old primary's server name directly — reconnecting to
      a server that's no longer the right one is a subtle, real failure mode.
- [ ] The whole event timed end to end, and checked against the actual RPO/RTO targets — did the plan
      really hold, or did it just look like it held?
- [ ] Replication lag at the moment of failure reviewed, to confirm actual data loss was inside the
      RPO target, not just assumed to be.

## Part 4 — Who signs off, and on what

| Role | Confirms |
|---|---|
| DBA | CHECKDB clean, row counts/checksums match, replication lag was within RPO |
| Application owner | App reconnects through the listener endpoint and functions correctly end to end |
| Business stakeholder (the person who gave you the original statement in Part 1) | The actual numbers achieved (measured RPO/RTO) meet what they asked for |

A failover that technically succeeded but took 90 minutes against a one-hour RTO target is not a
closed incident — it's a finding that goes back into the architecture, the same way a regressed query
goes back into Lesson 45's execution plan instead of being called "fixed" on faith.
