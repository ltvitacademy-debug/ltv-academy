# Script — COPY INTO: Bulk Loading Fundamentals

## Segment 1 (title)

Everything about stages and file formats exists to make one command work: COPY INTO. It's the statement that actually moves rows from a staged file into a table.

## Segment 2 (screenshot: Query History after COPY INTO)

After a load runs, Query History shows its duration and profile — the same instinct as checking an SSIS package's execution log after the fact. But the COPY INTO result set itself, in the moment it runs, is your fastest check: one row per file, with status and row counts.

## Segment 3 (steps: load metadata)

Run the same COPY INTO statement twice and the second run loads nothing new — Snowflake remembers, per stage, which files it already loaded successfully, for 64 days, and skips them automatically. FORCE equals TRUE overrides that when you genuinely need a reload.

## Segment 4 (code: COPY INTO syntax)

The full statement ties a stage, a file format, and a target table together in one call, with ON_ERROR controlling what happens when a row fails to parse — that's next lesson's topic.

## Segment 5 (outro)

Next lesson: loading directly from cloud storage — pointing COPY INTO at an S3 bucket or Azure Blob container you already own, using the external stages from Lesson 12.
