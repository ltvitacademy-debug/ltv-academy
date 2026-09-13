# Lesson 18 — Snowpipe & Continuous Ingestion

**Chapter 4 · Snowpipe & Automated Ingestion · Lesson 18 of 60**

## What you'll learn

- What Snowpipe is, and how it differs from the `COPY INTO` you ran manually in Chapter 3
- The two ways a Snowpipe load can be triggered
- `CREATE PIPE` syntax and the `auto_ingest` option that makes it automatic
- Why Snowpipe uses a serverless compute model instead of a warehouse

## Manual COPY INTO doesn't scale to "whenever a file lands"

Everything in Chapter 3 was you, deciding when to run `COPY INTO`.
That's fine for a lab or a scheduled nightly batch, but it breaks down the
moment new files land continuously and unpredictably — a clickstream
exporter dropping a file every few minutes, IoT sensors writing every
few seconds. Nobody wants to babysit a script that just runs `COPY INTO`
in a loop. **Snowpipe** is Snowflake's answer: event-driven, continuous
loading that reacts to new files automatically, without you scheduling
anything.

## Two ways to trigger a pipe

```
                          Snowpipe
                   /                       \
   Cloud storage event              Snowpipe REST API
   (S3 ObjectCreated,                (insertFiles call)
   Azure Blob, GCS)
```

![Snowflake's own architecture diagram of the two Snowpipe ingestion workflows: option one, continuous loading triggered by cloud storage event notifications; option two, loading triggered by directly calling Snowpipe's REST API.](/courses/snowflake/ch04/18-snowpipe-and-continuous-ingestion/snowpipe-flow-diagram.png)
*Both paths land in the same place — a pipe copying new files into a table — they differ only in what tells Snowflake a new file exists.*
Source: [Snowflake Quickstarts — Getting Started with Snowpipe](https://quickstarts.snowflake.com/guide/getting_started_with_snowpipe/index.html)

1. **Cloud storage event notifications** — S3's `ObjectCreated`, Azure
   Blob events, or GCS Pub/Sub tell Snowflake the instant a new file
   lands in a bucket. This is the far more common path and the one
   Lesson 19 walks through end to end.
2. **Snowpipe's REST API** (`insertFiles`) — your own application calls
   Snowflake directly to say "this file is ready," useful when the
   trigger needs to come from application logic rather than a storage
   event.

## CREATE PIPE: COPY INTO you don't have to run

A pipe wraps a `COPY INTO` statement and, with `auto_ingest = TRUE`, runs
it automatically whenever a triggering event arrives:

```sql
CREATE OR REPLACE PIPE my_db.public.my_pipe
  AUTO_INGEST = TRUE
AS
  COPY INTO my_db.public.my_table
  FROM @my_db.public.my_stage
  FILE_FORMAT = (FORMAT_NAME = 'csv_ff');
```

Notice the body is exactly the `COPY INTO` statement you already know
from Chapter 3 — a pipe doesn't introduce new loading logic, it wraps
the same load and gives it an automatic trigger. Everything you learned
about stages, file formats, and `ON_ERROR` still applies inside a pipe.

## Serverless compute, not your warehouse

`COPY INTO` in Chapter 3 always ran on a virtual warehouse you were
paying for by the second, suspended or not. Snowpipe is different:
Snowflake provisions compute on your behalf specifically for that pipe's
load, billed separately (per-second, per-file-processed) — you never
assign it a warehouse and it doesn't compete with your interactive
warehouses for resources. That's what "serverless" means here
specifically: not "no compute," but "compute you don't manage or size."

## Key terms

| Term | Meaning |
|---|---|
| Snowpipe | Snowflake's event-driven, continuous data loading service |
| Pipe | An object wrapping a COPY INTO statement with an automatic trigger |
| AUTO_INGEST | Pipe option that ties it to cloud storage event notifications |
| Serverless compute | Snowflake-managed compute for the pipe's loads, billed separately from warehouses |

## Lab

1. Write (don't necessarily run yet — Lesson 19 covers full setup) a
   `CREATE PIPE` statement wrapping a `COPY INTO` you already used in
   Chapter 3's lab.
2. Identify, in your own words, which of the two trigger mechanisms
   you'd use for a nightly export job vs. a real-time IoT feed.

## Check yourself

You're ready for Lesson 19 when you can explain why a pipe's `COPY INTO`
body doesn't need new syntax you haven't already learned — only the
trigger around it is new.
