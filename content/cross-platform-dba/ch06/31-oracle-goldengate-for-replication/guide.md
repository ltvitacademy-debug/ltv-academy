# Oracle GoldenGate for Replication

Data Guard and RAC both stay inside one world: Oracle talking to Oracle, replicating or
sharing a whole database. **Oracle GoldenGate** is a separate, purpose-built product for a
different job — real-time, log-based replication that can move specific data, transform it
along the way, and cross platform boundaries entirely, including out of Oracle altogether.

## What you'll learn

- What GoldenGate actually is, and how it differs in kind from Data Guard
- How it captures changes: log-based, not trigger-based
- Its core components: Extract, trail files, Replicat
- Real use cases: heterogeneous replication, zero-downtime migration, active-active
- When to reach for GoldenGate instead of Data Guard

## A separate product, a different job than Data Guard

**GoldenGate** is a licensed Oracle product (not a feature bundled into the database the
way Data Guard is) for **logical replication**: it captures committed changes and replicates
them as logical change records, not as physical blocks. That distinction unlocks
capabilities Data Guard structurally can't offer, because Data Guard's standby has to be
the same database engine running the same physical structures. GoldenGate can replicate:

- **Oracle to Oracle** — but selectively, table by table, not necessarily the whole database
- **Heterogeneously** — Oracle to SQL Server, MySQL to Oracle, Oracle to Kafka or a cloud
  data warehouse — genuinely cross-platform, which Data Guard cannot do at all
- **Bidirectionally** — active-active configurations where multiple databases accept writes
  and replicate to each other, with conflict detection and resolution rules for when the
  same row changes in two places at once

## How it captures changes: reading the logs, not polling tables

GoldenGate uses **log-based change data capture**: it reads the source database's
transaction logs directly (redo logs on Oracle, binary logs on MySQL, and so on, depending
on the source) to identify committed changes, rather than using triggers or polling tables
for differences. This keeps the performance impact on the source database low and captures
changes in near real time as they're committed, which is what makes GoldenGate suitable for
things like continuously feeding a data warehouse or keeping two active-active nodes in sync
with low latency.

## Core components: Extract, trail files, Replicat

- **Extract** — the capture process running against (or near) the source database, reading
  its logs and writing the changes it finds into a **trail file**, GoldenGate's own
  intermediate, platform-neutral change-record format.
- **Trail files** — sequential files holding captured change records, optionally shipped
  across the network by a **Data Pump** process (GoldenGate's own component of this name —
  not to be confused with the Oracle `expdp`/`impdp` Data Pump export/import utility from
  earlier in this course; they share a name and nothing else).
- **Replicat** — the apply process on the target, reading trail files and applying the
  changes, with the ability to transform data (renaming columns, changing data types,
  filtering rows) along the way, something Data Guard's redo apply and SQL Apply cannot do.

## Where GoldenGate actually gets used

Common real scenarios: a **zero-downtime migration**, where GoldenGate replicates ongoing
changes from an old platform to a new one while the cutover is prepared, letting the switch
happen with minutes of downtime instead of a long outage; **real-time integration**,
continuously feeding operational data into an analytics platform or data warehouse without
batch ETL windows; and **active-active** multi-region deployments, where writes are accepted
in more than one location at once. None of these are Data Guard's job — Data Guard protects
one Oracle database's availability. GoldenGate moves and transforms data between databases,
Oracle or not, for integration and migration reasons.

## Key terms

| Term | Meaning |
|---|---|
| Oracle GoldenGate | Licensed product for real-time, log-based logical replication, including heterogeneous targets |
| Extract | GoldenGate's capture process, reading a source database's logs for committed changes |
| Trail file | GoldenGate's intermediate, platform-neutral change-record file format |
| Replicat | GoldenGate's apply process on the target, with optional data transformation |
| Heterogeneous replication | Replicating between different database platforms, something Data Guard cannot do |

## Check yourself

A company needs to replicate specific tables from Oracle into a PostgreSQL analytics
database in near real time. Explain why Data Guard can't do this job and what about
GoldenGate's architecture makes it able to.
