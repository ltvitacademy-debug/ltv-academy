# Script — Snowpipe & Continuous Ingestion

## Segment 1 (title)

Chapter 3 was you deciding when to run COPY INTO. Snowpipe is Snowflake's answer for when files land continuously and unpredictably, without anyone scheduling anything.

## Segment 2 (screenshot: Snowpipe flow diagram)

Snowflake's own diagram shows the two trigger paths: cloud storage event notifications — S3, Azure Blob, GCS — telling Snowflake the instant a file lands, or the Snowpipe REST API, where your own application calls in directly. Both paths land in the same place: a pipe copying new files into a table.

## Segment 3 (code: CREATE PIPE)

A pipe wraps a COPY INTO statement you already know, and with auto_ingest set to true, runs it automatically on a trigger. Nothing new about the load logic itself — stages, file formats, ON_ERROR all still apply exactly as in Chapter 3.

## Segment 4 (steps: serverless compute)

COPY INTO in Chapter 3 always ran on a warehouse you were managing and paying for. Snowpipe uses compute Snowflake provisions specifically for that load, billed separately, that you never size or assign — that's what serverless means here.

## Segment 5 (outro)

Next lesson: setting up the real trigger — cloud storage event notifications — and monitoring a pipe's status once it's live.
