# Script — Ingesting and Transforming Data: Exam Focus

## Segment 1 (title)

Domain 2 covers moving data into Fabric and reshaping it once it's there — pipelines, Dataflows Gen2, Eventstreams, notebooks, and the Spark transformations underneath.

## Segment 2 (steps: picking the tool)

Nightly scheduled batch loads with retries point to a pipeline. Low-code, transform-as-you-load work points to Dataflow Gen2. Continuous events point to an Eventstream. Custom PySpark logic points to a notebook — and a pipeline can call a notebook or Dataflow as one of its own steps.

## Segment 3 (code: Delta mechanics underneath)

Every write into a Lakehouse table lands as a Delta table under OneLake, no matter which tool wrote it. That means schema enforcement from the Databricks course is silently in effect — a mismatched pipeline write gets rejected, not silently corrupted.

## Segment 4 (code: the streaming half)

Eventstreams feed Eventhouse and KQL databases, or route straight into a Lakehouse. A scenario describing fixed five-minute, non-overlapping aggregation buckets is describing a tumbling window by definition.

## Segment 5 (outro)

Pipelines orchestrate; notebooks and Dataflows are often steps inside them, not competitors. Next up: Domain 3 — monitoring and optimizing a solution.
