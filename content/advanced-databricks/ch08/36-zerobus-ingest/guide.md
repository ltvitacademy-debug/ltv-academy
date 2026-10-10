# Lesson 36 — Zerobus Ingest

**Chapter 8 · Agentic Data Engineering & What's New · Lesson 36 of 42**

## What you'll learn

- What Zerobus Ingest actually eliminates from the traditional
  high-volume event ingestion architecture, and why that matters
- Its real, published performance specifications — latency,
  throughput, and concurrency
- How a Zerobus client authenticates and writes, step by step
- The three engineering bets behind Zerobus's petabyte-scale benchmark
- A real limitation you need to plan around today: no native Change
  Data Feed support

## The problem Zerobus removes

Before Zerobus, ingesting high-volume event data — IoT telemetry,
clickstream, application events — into the lakehouse meant several
data hops: the producing application wrote to a message bus (Kafka or
similar), and a separate Spark Structured Streaming job read from that
bus and wrote into Delta. That's a real, working architecture — it's
what Auto Loader plus a Kafka source (Lesson 10, Chapter 2) already
does well. But when the lakehouse is the *only* destination for this
data, that middle hop is pure overhead: extra infrastructure to run,
monitor, and pay for, plus data duplication, plus the specialized
expertise needed to operate a message bus correctly.

Zerobus Ingest is a set of APIs that let a producing application push
event data **directly** into a Delta table — no message bus in the
middle at all.

```
Traditional path:  Producer -> Message bus (Kafka/etc.) -> Spark Structured Streaming -> Delta table
Zerobus path:      Producer -> Zerobus API -> Delta table
```

The mechanics: the producing application specifies a target Delta
table, ensures its messages map to that table's schema, and opens a
stream to Databricks using the Zerobus SDK. Databricks validates the
message schema against the table schema, writes the data, and sends
an acknowledgment back once it's persisted — a durable, low-latency
handoff, the same kind of guarantee that has historically made teams
prefer Kafka in the first place.

## Real published specifications

These numbers are Databricks' own published specs for Zerobus Ingest,
not estimates:

| Capability | Specification |
|---|---|
| Ingestion latency | Near real-time — under 5 seconds |
| Max throughput per client | Up to 100 MB/sec |
| Concurrent clients | Thousands, writing to the same table |
| Continuous sync lag, Delta → Lakebase | 10–15 seconds |
| Real-time ForeachWriter latency, Delta → Lakebase | 200–300 milliseconds |

The last two rows matter for the next lesson (Lakebase) — Zerobus
gets data into Delta fast, but how fast that data then reaches a
downstream operational database depends on which sync method you
choose.

## Writing a client, step by step

The real, minimal Zerobus flow for getting event data into Unity
Catalog:

**Step 1 — create the target table**, with ordinary Delta table
properties (nothing Zerobus-specific is required on the table itself):

```sql
CREATE TABLE <catalog>.<schema>.rideshare_events (
  <YOUR_FIELDS>
)
TBLPROPERTIES (
  'delta.autoOptimize.optimizeWrite' = 'true',
  'delta.autoOptimize.autoCompact' = 'true'
);

GRANT USE CATALOG ON CATALOG YOUR_CATALOG TO `<service-principal-id>`;
GRANT USE SCHEMA ON SCHEMA YOUR_CATALOG.YOUR_SCHEMA TO `<service-principal-id>`;
GRANT SELECT, MODIFY ON TABLE YOUR_CATALOG.YOUR_SCHEMA.YOUR_TABLE TO `<service-principal-id>`;
```

Notice this is the exact same GRANT pattern you learned in Chapter 1 —
Zerobus doesn't bypass Unity Catalog governance, it writes through it.

**Step 2 — authenticate with OAuth** and open a stream:

```python
from zerobus.sdk.aio import ZerobusSdk
from zerobus.sdk.shared import StreamConfigurationOptions, TableProperties

stream = await sdk.create_stream(
    CLIENT_ID, CLIENT_SECRET, table_properties, options
)
```

**Step 3 — ingest records** on that open stream:

```python
await stream.ingest_record(telemetry)
```

That's the entire client-side surface. No topic configuration, no
partition count to choose, no consumer group to manage.

## The real limitation: no native Change Data Feed

As of this writing, Zerobus Ingest does **not** support Change Data
Feed (CDF) on the table it writes to directly. If your downstream use
case needs CDF — for example, syncing inserts/updates/deletes to
Lakebase, which the next lesson covers — the documented workaround is
to stream the Zerobus target table into a *second* Delta table with
CDF enabled:

```python
# read the Zerobus target table
df = spark.readStream.table("catalog.schema.rideshare_events")
# write to a new, CDF-enabled table
df.writeStream.format("delta") \
  .option("checkpointLocation", "/Volumes/catalog/schema/streaming_checkpoints") \
  .table("catalog.schema.rideshare_events_processed")
```

```sql
ALTER TABLE catalog.schema.rideshare_events_processed
SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
```

This is a real, current product gap, not a design flaw to work around
forever — naming it explicitly is more useful than pretending Zerobus
does everything in one hop today.

## Performance at petabyte scale

Databricks ran a published benchmark against NASA's NEOWISE dataset —
11 years of real Wide-field Infrared Survey Explorer data, 200 billion
time-stamped detections of stars, galaxies, and asteroids, chosen
specifically because it's genuine production-shaped data, not a
synthetic load generator. The result: **1 petabyte ingested in 24
hours, 12 GB/s sustained, 12 million rows per second, into a single
table, with zero pre-configuration.**

Three engineering bets made that possible:

- **Dynamic partitioning** — ordering is guaranteed at the stream
  connection level rather than the partition level, so pods can be
  added and removed dynamically. That's true elastic autoscaling, not
  just scale-out with a fixed partition count baked in up front.
- **Zeroparser** (now open source) — a single-pass, zero-allocation
  protobuf decoder written in Rust that sustains roughly 1 GB/sec per
  CPU core, using fully dynamic descriptors with no compile-time
  schema required.
- **A latency-optimized write-ahead log** — the WAL keeps clients
  lean: push data, get an acknowledgment, free the buffer. This
  low-latency, durable handoff is exactly the guarantee that has
  historically made teams choose Kafka — Zerobus offers the same
  guarantee without requiring Kafka at all.

## Key terms

| Term | Meaning |
|---|---|
| Zerobus Ingest | Databricks API set for pushing event data directly into a Delta table, with no message bus hop |
| Zeroparser | Zerobus's open-sourced, single-pass, zero-allocation Rust protobuf decoder |
| Dynamic partitioning | Zerobus's ordering guarantee at the stream-connection level, enabling true elastic autoscaling |
| CDF workaround | Streaming a Zerobus target table into a second, CDF-enabled table, since Zerobus itself does not natively support CDF |

## Check yourself

Without looking back: what specific infrastructure hop does Zerobus
Ingest eliminate compared to the traditional Kafka-plus-Structured-
Streaming pattern, and what real limitation must you plan around if
you need Change Data Feed on the data it writes?
