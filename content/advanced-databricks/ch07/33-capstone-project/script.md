# Script — Capstone: An Advanced Lakehouse Pipeline

## Segment 1 (title)

This capstone uses every major piece of this course on one project — not a toy example of a single feature, but a governed lakehouse that ingests streaming orders and a daily catalog batch, transforms both, and holds up to an audit.

## Segment 2 (steps: the build order)

Five steps, in order: Unity Catalog structure first, then Auto Loader ingestion for both the stream and the batch, a Lakeflow pipeline for transformation, a multi-task Job for orchestration, and performance plus security applied throughout — not bolted on at the end.

## Segment 3 (code: Unity Catalog structure)

The governance shape gets decided before any ingestion code: one catalog, bronze, silver, and gold schemas, and a volume for the daily catalog file drop. Managed tables throughout — nothing here needs to point at files outside Databricks's control.

## Segment 4 (code: Auto Loader ingestion)

Two ingestion problems, two configurations. Streaming order events use Auto Loader with directory listing — file notification mode is the eventual upgrade, not the day-one default. The daily catalog batch uses Auto Loader in trigger-once mode with schema evolution allowed, so new optional columns don't break the load.

## Segment 5 (code: the Lakeflow pipeline)

Bronze to silver to gold, declared, with data quality inline. A bad order total gets dropped without halting the pipeline. A missing customer ID gets tracked in pipeline metrics but kept, since it might still be recoverable.

## Segment 6 (code: orchestration)

One multi-task Job chains the daily batch ingestion, the pipeline run, a metrics refresh, and a failure notification. The continuous streaming ingestion runs as its own separate job — mixing a continuous stream into a scheduled batch chain would make the schedule meaningless for the streaming half.

## Segment 7 (code: performance and security)

The gold-layer join is a broadcast-join candidate if the catalog stays small, and liquid clustering on order date keeps time-range queries fast as the table grows. A column mask hides customer email from general analysts, the job authenticates through a managed identity, and audit logging makes every access traceable.

## Segment 8 (outro)

Nothing here is a new concept — every piece came from Chapters 1 through 6. What's new is making a decision in Step 1 shape what's possible in Step 3, all the way through to a security requirement that reaches back into how the catalog was structured in the first place.
