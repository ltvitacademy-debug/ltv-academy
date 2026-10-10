# Lesson 37 — Lakebase

**Chapter 8 · Agentic Data Engineering & What's New · Lesson 37 of 42**

## What you'll learn

- What Lakebase actually is, precisely, and what problem it removes
- The two real sync methods from Delta to Lakebase, and their actual
  measured latencies — they are not the same number
- How a real end-to-end architecture (Zerobus → Lakebase → an app)
  fits together, using the "Data Diners" example Databricks published
- Why "version control and branch databases like code" is a genuine
  operational capability, not a slogan

## What Lakebase actually is

Lakebase is a fully managed, serverless, scalable **Postgres**
database built directly into the Databricks Data + AI Platform,
designed for low-latency operational and transactional workloads that
run on the same data powering your analytical and AI work.

The key phrase is "built into the platform," not "connected to the
platform." Lakebase separates compute from storage completely, which
gives it rapid provisioning and elastic autoscaling — but the real
differentiator from a bolted-on traditional database is integration:
Lakebase makes lakehouse data directly available to real-time
applications and AI agents **without** a hand-built reverse-ETL
pipeline in between.

## The problem it removes: reverse ETL

Before Lakebase, serving analytical, lakehouse-curated data to an
operational application (a dashboard, a customer-facing app, an agent
that needs low-latency reads) meant:

1. Provisioning and maintaining a separate OLTP database instance —
   networking, monitoring, backups, the works.
2. Building and maintaining a custom reverse-ETL pipeline to push
   curated data from the lakehouse into that external database.
3. Keeping that pipeline running correctly forever, as its own
   separate piece of infrastructure.

That's real, recurring engineering work whose entire purpose is just
moving data that's already correct from one place to another. Lakebase
collapses it: sync is built in, not hand-rolled.

## Two real sync methods — and they are not the same latency

This is the single most practical fact in this lesson, and it's a
genuine production trade-off, not a detail:

| Sync method | How it works | Measured latency |
|---|---|---|
| Continuous sync pipeline (UI or SDK) | Configured with Sync Mode: Continuous and a declared primary key; Databricks manages it | **10–15 seconds** lag |
| Real-time mode via `ForeachWriter` | A direct `writeStream.foreach(writer)` from a streaming DataFrame straight to a Lakebase table | **200–300 milliseconds** |

If your use case can tolerate a dashboard that's "basically live" —
most operational dashboards can — the continuous sync pipeline is the
simpler, lower-maintenance choice: you pick Continuous sync mode and a
primary key in the UI, and Databricks manages the rest. If you need
true sub-second freshness (fraud scoring, a live map where a dot needs
to move as the underlying GPS point moves), you reach for the
`ForeachWriter` pattern instead:

```python
from lakebase_foreachwriter import LakebaseForeachWriter

writer = LakebaseForeachWriter(
    username="your-username",
    password="your-password",
    table="your_target_table",
    df=your_dataframe,
    host="your-lakebase.dns.databricks.com",
    mode="insert",            # defaults to "insert"
    batch_size=1000,          # defaults to 1000
    batch_interval_ms=100,    # defaults to 100
)

query = (
    streaming_df.writeStream
    .foreach(writer)
    .option("checkpointLocation", "/tmp/spark_checkpoints/insert_example")
    .start()
)
```

Notice this is a genuine trade-off, not a strictly-better option:
`ForeachWriter` buys you milliseconds instead of seconds, at the cost
of managing your own streaming query and checkpoint instead of
pointing-and-clicking a managed sync pipeline.

## A real end-to-end architecture

Databricks' own published example: a food-delivery company ("Data
Diners") wants live visibility into driver locations and delivery
progress. The real architecture, four stages:

1. A driver's phone emits GPS telemetry; a producer uses the **Zerobus
   SDK** (Lesson 36) to write events directly to a Delta table in
   Unity Catalog.
2. A **continuous sync pipeline** pushes updated records from that
   Delta table into a **Lakebase** Postgres instance.
3. A FastAPI backend connects to Lakebase via WebSockets to stream
   updates in real time.
4. A front-end built on **Databricks Apps** visualizes the live data
   for dispatchers.

This is worth sitting with: Zerobus solved the ingestion hop (Lesson
36), Lakebase solves the "serve this back out to an operational app"
hop, and neither one required a message bus or a hand-built reverse-
ETL pipeline anywhere in the chain. That's the practical payoff of
"unified foundation" from Lesson 35 — these two capabilities compose
directly because they share the same governed Delta tables underneath.

## Governance and version control

Two more real capabilities worth naming precisely:

- **Integrated permissions** — Lakebase integrates with Unity Catalog,
  so operational and analytical data share a consistent
  role-and-permission model. Native Postgres permissions can still be
  managed through the Postgres protocol directly when you need that
  level of control.
- **Branching like code** — Lakebase lets developers version-control
  and branch databases the way they'd branch a Git repository. This
  isn't a slogan; it's a real operational capability for testing a
  schema change or a migration against a branch of production data
  before merging it back, the same mental model as a feature branch.

## Key terms

| Term | Meaning |
|---|---|
| Lakebase | A fully managed, serverless Postgres database built into the Databricks platform, synced from Delta |
| Continuous sync pipeline | Managed Delta-to-Lakebase sync, configured with a primary key; ~10-15 second lag |
| ForeachWriter (real-time mode) | A direct streaming write from a DataFrame to Lakebase; ~200-300ms latency, requires managing your own query |
| Reverse ETL | The hand-built pipeline pattern Lakebase replaces for syncing lakehouse data into an operational database |

## Check yourself

Without looking back: what are the two real sync methods from Delta to
Lakebase, their actual measured latencies, and which one would you
choose for a fraud-scoring use case versus an ordinary operational
dashboard?
