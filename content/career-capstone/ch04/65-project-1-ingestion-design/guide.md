# Lesson 65 — Project 1: Ingestion Design

**Chapter 4 · Added Projects — Capstones · Lesson 65 of 81**

## What you'll learn

- Designing the hybrid ingestion layer Lesson 64 scoped, concretely
- Where nightly POS exports and online order events actually land
- Applying Lesson 11's idempotency and Lesson 12's delivery guarantees here
- Turning "same-day" into an actual freshness number

## Two sources, one bronze layer

Lesson 64 decided the shape: batch for nightly POS exports, streaming for
online orders, unified at bronze. Lesson 13's ingestion-layer design
process applies directly — design the landing zone before worrying about
what happens to the data after it lands.

```
In-store POS (nightly export, CSV per store)
   -> land as-is in bronze/pos_sales/{date}/{store_id}.csv

Online orders (continuous event stream)
   -> Fabric Eventstream (Lesson 19) routes events into
      bronze/online_orders/ as they arrive, append-only

Both:  raw, untransformed, exactly as received — Databricks &
       Delta Lake Lesson 26's bronze layer definition
```

Nothing gets cleaned or reshaped yet. Bronze's whole job, per Databricks
Lesson 26, is to preserve the raw event faithfully so a bug discovered
downstream can always be replayed from an unmodified source.

## The streaming side: an Eventstream into bronze

Online orders arrive continuously, so Fabric & Real-Time Analytics
Lesson 19's Eventstream is the right ingestion tool — it's built to
receive continuous event traffic and route it, which is exactly this
project's online-order path. Lesson 20's event sources (an Event Hub
sitting in front of the storefront's checkout service) feed the
Eventstream, and Lesson 35's Eventstream transformations do the
minimum-possible reshaping (parsing the JSON payload) before landing
rows in bronze — not business logic, just making the event readable.

```
Checkout service -> Event Hub (Lesson 20)
                  -> Eventstream (Lesson 19)
                  -> bronze/online_orders/ (Delta table)
```

## The batch side: nightly landing, incrementally

Nightly POS exports are a known, bounded batch each night — Databricks
Lesson 32's Autoloader is built for exactly this: new files land in a
folder, Autoloader picks up only the new ones incrementally rather than
re-scanning everything each run.

## Idempotency and delivery guarantees, here

Lesson 11 asked: what happens if the same event gets processed twice? For
online orders, an Eventstream retry after a transient failure could
redeliver an event — Lesson 12's at-least-once delivery is the realistic
guarantee to design for, not exactly-once, since exactly-once end-to-end
is expensive and usually unnecessary here. That makes bronze ingestion
idempotent by keying each landed row on the source system's own event ID,
so a redelivered event overwrites rather than duplicates.

```sql
-- Idempotent landing: MERGE keyed on the source event id
-- (Databricks Lesson 22's MERGE INTO pattern, used at bronze
-- instead of at a dimension table)
MERGE INTO bronze.online_orders AS target
USING incoming_batch AS source
ON target.event_id = source.event_id
WHEN NOT MATCHED THEN INSERT *
```

## Turning "same-day" into a number

Lesson 18's freshness SLA design gets its answer here: online orders land
in bronze within seconds of the Eventstream receiving them; nightly POS
exports land once, overnight. The dashboard's real freshness SLA is
therefore "online sales visible within minutes, in-store sales visible by
the next morning" — a concrete, defensible number instead of "same-day."

## Key terms

| Term | Meaning |
|---|---|
| Bronze landing zone | Raw, untransformed data exactly as received, per Databricks Lesson 26 |
| Eventstream | Fabric's continuous ingestion tool, used here for the online-order path |
| Idempotent ingestion | Keying landed rows on a source event ID so redelivery overwrites, not duplicates |

## Check yourself

You're ready for Lesson 66 when you can explain, without looking: why does
this design choose at-least-once delivery with idempotent landing, instead
of trying to build exactly-once delivery end to end?
