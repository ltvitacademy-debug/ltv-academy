# Replication Types, Overview

This chapter shifts to a different technology family entirely. Availability Groups, FCI,
log shipping, and mirroring all exist to keep a database (or an entire instance) available
after a failure — they're HA/DR mechanisms first. **Replication is not primarily an
HA/DR mechanism.** It exists to distribute or copy data to other places for other
reasons — offloading reporting reads, feeding a data warehouse, integrating with another
system — and understanding that distinction up front prevents a common, expensive
mistake: reaching for replication when what's actually needed is an Availability Group.

## What you'll learn

- The three real replication types SQL Server supports, and what each is actually for
- Why replication is a data-distribution tool, not a failover tool
- Which type is still common in production, and which is largely legacy

## The three types, precisely

- **Transactional replication** — changes are captured from the transaction log and sent
  to subscribers continuously, near-real-time, one direction (publisher to subscriber).
  This is the workhorse type: reporting offload, feeding downstream systems, moving a
  subset of tables somewhere else. Covered in depth in the next lesson.
- **Merge replication** — allows changes at both the publisher and subscribers, with
  conflict resolution rules to reconcile changes that collide. Historically used for
  disconnected or mobile scenarios (sales reps syncing a laptop database occasionally).
  It's largely a legacy/niche pattern today — most new designs that need bidirectional
  sync reach for other architectures, but merge replication still exists and still runs
  in some long-lived systems.
- **Snapshot replication** — takes a full point-in-time copy of the published data and
  applies it wholesale to subscribers on a schedule, with no incremental change tracking
  between refreshes. Useful for small, rarely-changing datasets (lookup tables, reference
  data) where a full refresh is cheap and simplicity beats efficiency. Snapshot
  replication is also the required first step — the *initial synchronization* — before
  transactional or merge replication can start tracking incremental changes.

## Why replication is not an HA/DR technology

An Availability Group or FCI protects the *whole database* and typically gives you
automatic or near-automatic failover with no data loss (in synchronous mode). Replication
protects nothing by default: it moves a defined set of published objects — specific
tables, specific columns, specific rows via filters — to subscribers that are independent
databases with their own schema, their own security, and no built-in failover
relationship to the publisher. If the publisher goes down, subscribers don't take over
its workload; they just stop receiving updates. Some organizations do build custom
failover logic on top of replication, but that's bespoke engineering, not something
replication provides out of the box the way an AG does.

## Choosing the right type for a real requirement

The question to ask first is *why* data needs to move, not *how fast*. Reporting offload
or feeding a warehouse almost always means transactional replication. A small reference
table that changes rarely and needs to sit on several servers is a snapshot replication
candidate. A genuine need for two-way sync between disconnected copies is the (rare,
often legacy) case for merge replication. If the actual goal is "keep this database
available if the server fails," none of the three is the right tool — that's an AG or FCI
question, covered in Chapters 4 and 5.

## Key terms

| Term | Meaning |
|---|---|
| Publisher | The source database whose changes are made available to replicate |
| Subscriber | The destination database that receives replicated data |
| Distributor | The SQL Server instance that stores and forwards replicated commands between publisher and subscriber |
| Transactional replication | Near-real-time, one-way replication of log-captured changes |
| Merge replication | Bidirectional replication with conflict resolution; largely legacy usage today |
| Snapshot replication | Full periodic data refresh, no incremental tracking; also the initial sync step for the other two types |

## Check yourself

A manager asks whether replication can be used "as our disaster recovery solution" for a
critical OLTP database, since it's "already keeping a copy of the data somewhere else."
What's the accurate answer, and what should be recommended instead?
