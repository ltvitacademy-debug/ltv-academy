# CDC With DMS

Lesson 40's full load answered "how do I get data in once." Most real systems need the answer
to a harder question: "how do I keep it in sync after that." **Change Data Capture (CDC)** is
DMS's answer — ongoing replication that streams every subsequent insert, update, and delete
from the source into the target, continuously, after the initial full load finishes.

## What you'll learn

- What CDC is and how it differs from a full load
- How DMS actually reads changes: transaction logs, not polling
- The combined "full load + CDC" migration type
- A realistic use case: keeping a warehouse in sync with a live OLTP source

## How DMS reads changes

DMS does not poll the source table for differences. Instead, it reads the source database's
**transaction log** — the same mechanism the database engine itself uses for crash recovery
and replication. For SQL Server, that's the transaction log (with CDC or replication
enabled on the source); for MySQL, the binary log (binlog); for Oracle, redo logs. Reading
the transaction log means DMS sees every committed change, in order, with minimal load on the
source database — it's not running repeated `SELECT` queries against production tables.

## Full load + CDC: the combined migration type

DMS's most common CDC setup is the **"Migrate existing data and replicate ongoing changes"**
migration type: DMS performs a full load first (Lesson 40's process, table by table), then
seamlessly switches to reading the transaction log from the exact point the full load started,
applying every change since to the target. This avoids the gap a separate full-load-then-CDC
approach would have — DMS tracks the log position at full-load start so no committed change is
missed or double-applied.

```text
t0: full load starts, DMS notes the current log position
t0→t1: full load copies existing rows (table by table)
t1: full load finishes
t0→now: DMS applies every change from the log position at t0 onward
now: target stays continuously in sync
```

## A realistic use case

A common data-engineering pattern: an OLTP application database (orders, customers,
inventory) needs to feed a Redshift warehouse for reporting, without querying the production
database directly for analytics (which would compete with the app for resources). DMS with
full load + CDC keeps a warehouse copy continuously current — new orders placed in the app
show up in the warehouse within seconds to minutes, not via a nightly batch job.

## Key terms

| Term | Meaning |
|---|---|
| CDC (Change Data Capture) | Ongoing replication of inserts/updates/deletes from source to target after the initial load |
| Transaction log | The database engine's own log of committed changes, which DMS reads for CDC |
| Full load + CDC | Migration type that does a full load, then continuously applies changes from the log position noted at load start |

## Check yourself

Why does DMS read the source database's transaction log for CDC instead of periodically
running `SELECT * FROM table` and comparing results to find what changed?
