# Lesson 38 — Change Data Capture, Streamed

**Chapter 2 · Real-Time Data Engineering · Lesson 38 of 70**

## What you'll learn

- Change Data Capture (CDC), as a source type for an Eventstream
- Row-level inserts, updates, and deletes as their own event stream
- Streamed CDC vs. batch MERGE — the same problem, two different rhythms
- Why streamed CDC replaces a periodic "compare and diff" job

## Every row change, as an event

An operational database — the same NYC Taxi vendor system that
originally produced this course's trip data — changes constantly:
new trips inserted, a fare corrected, a cancelled trip deleted.
**Change Data Capture** is a mechanism, built into SQL Server, Azure
SQL Database, PostgreSQL, and others, that records every one of
those row-level changes as they happen. Fabric's Eventstream can use
CDC as a **source** type directly — turning a database's own change
log into a live event stream, the same shape as any other
Eventstream source (Lesson 20).

## What a streamed CDC event looks like

```json
{
  "operation": "UPDATE",
  "table": "Trips",
  "before": { "TripId": 4821, "FareAmount": 18.50 },
  "after":  { "TripId": 4821, "FareAmount": 21.00 },
  "changeTime": "2026-09-09T14:32:07Z"
}
```

Each CDC event carries the operation type (`INSERT`/`UPDATE`/`DELETE`),
the row's state before and after (for updates), and when the change
happened — everything downstream needs to apply the exact same
change somewhere else, whether that's a KQL Database, a Lakehouse
table, or an Activator rule watching for a specific kind of change.

## Streamed CDC vs. batch MERGE

Databricks & Delta Lake's Lesson 22 covered `MERGE INTO` — comparing
a batch of incoming rows against an existing table and applying
inserts/updates/deletes as one operation, run periodically. Streamed
CDC solves the same underlying problem — keeping a downstream copy
in sync with row-level changes — but continuously, as each change
happens, instead of in periodic batches.

| | Batch MERGE (Databricks Lesson 22) | Streamed CDC (here) |
|---|---|---|
| Runs | On a schedule — hourly, nightly | Continuously, as changes happen |
| Sees | A snapshot diff at run time | Every individual change, in order |
| Best for | Data that changes slowly, batch-friendly | Operational data needing near-real-time sync |

## Why not just query the source database directly?

Repeatedly querying a live operational database to check "what
changed since last time?" adds load to a system that's usually
also serving real production traffic — the vendor's own booking
app, in this course's example. CDC instead reads the database's own
internal change log, which the database is already maintaining for
its own purposes, so there's no extra query load on the source at
all.

## Key terms

| Term | Meaning |
|---|---|
| Change Data Capture (CDC) | A mechanism recording every row-level insert/update/delete as it happens |
| CDC as an Eventstream source | Turning a database's change log into a live event stream |
| Streamed vs. batch sync | Continuous, in-order changes vs. periodic snapshot diffs |

## Check yourself

You're ready for Lesson 39 when you can explain, without looking: why
does CDC avoid adding extra query load to the source database, when
repeatedly polling it for changes would not?
