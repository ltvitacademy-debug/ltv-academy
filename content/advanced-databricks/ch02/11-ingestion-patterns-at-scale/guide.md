# Lesson 11 — Ingestion Patterns at Scale

**Chapter 2 · Auto Loader & Ingestion at Scale · Lesson 11 of 34**

## What you'll learn

- Fanning in: many source directories, one pipeline, many Auto Loader streams
- Checkpoint management at scale — one checkpoint per stream, organized in a volume
- The real trade-off: one big multiplexed stream vs. many small per-table streams
- Chapter 2's honest answer: there's no universally "right" ingestion topology

## Fanning in: multiple streams, one pipeline

```python
tables = ["orders", "customers", "inventory"]

for t in tables:
    (spark.readStream.format("cloudFiles")
     .option("cloudFiles.format", "json")
     .option("cloudFiles.schemaLocation", f"/Volumes/nyc_taxi/bronze/checkpoints/{t}_schema")
     .load(f"/Volumes/nyc_taxi/bronze/raw_files/{t}/")
     .writeStream
     .option("checkpointLocation", f"/Volumes/nyc_taxi/bronze/checkpoints/{t}_stream")
     .trigger(processingTime="1 minute")
     .toTable(f"nyc_taxi.bronze.{t}"))
```

A real production landing zone rarely has just one source. This is
the genuine "many streams" pattern: one Auto Loader stream per
source table, each with its own schema location and checkpoint,
running independently — Lesson 10's continuous single-stream example
scaled out to a whole bronze layer rather than one table.

## Checkpoint management at scale

```
/Volumes/nyc_taxi/bronze/checkpoints/
    orders_schema/       orders_stream/
    customers_schema/    customers_stream/
    inventory_schema/    inventory_stream/
```

Lesson 4 already covered putting a checkpoint inside a governed
volume. At the scale of a dozen streams, the real discipline is
naming them predictably and keeping schema-location and stream
checkpoints clearly paired per table — losing track of which
checkpoint belongs to which stream is a genuine, common way to
either double-process data (wrong checkpoint reused) or silently
stop ingesting a table (checkpoint pointed at the wrong path).

## The real trade-off: one big stream vs. many small ones

```
One multiplexed stream (all tables through one pipeline):
  + fewer clusters/jobs to manage and monitor
  - one bad file or schema break can stall every table at once
  - hard to size compute for very different table volumes

Many small streams (one per table, like above):
  + a failure in "inventory" never touches "orders" or "customers"
  + each can be sized and triggered independently
  - more clusters/jobs running, a real cost and monitoring surface
```

Neither answer is universally correct. A multiplexed stream is
reasonable when tables are genuinely related and similarly sized;
independent streams are the honest choice when tables fail
independently, arrive at different rates, or need different SLAs —
accepting the real cost of more running jobs in exchange for
real fault isolation.

## Chapter 2's honest close

Auto Loader, schema evolution, notification mode, continuous
streaming, and this lesson's fan-in and checkpoint discipline are
the real production surface of ingestion. There's no single
"correct" topology — only trade-offs, sized to how many sources
exist, how independently they fail, and how much operational
overhead is worth paying for that isolation.

## Key terms

| Term | Meaning |
|---|---|
| Fanning in | One Auto Loader stream per source table, run independently, into one bronze layer |
| Checkpoint discipline | Predictable, paired naming for schema-location and stream checkpoints per table |
| One big stream vs. many small | Fewer jobs vs. real fault isolation — a genuine trade-off, not a fixed rule |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: why
might a team deliberately choose many small per-table streams even
though it means running more jobs than one multiplexed stream would?
