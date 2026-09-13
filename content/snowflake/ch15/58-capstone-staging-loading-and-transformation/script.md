# Script — Capstone: Staging, Loading & Transformation

## Segment 1 (title)

Milestone one: all three sources actually landed in Snowflake and transformed through a real staging layer. Nothing here is new technique — it's Chapters 3 through 5 and 7, applied to sources you chose instead of a guided example.

## Segment 2 (steps: land all three, independently)

The SQL Server export and the CSV both use the same stage-and-COPY-INTO mechanics from Chapter 3, each into its own raw table, loaded as plain strings on purpose — casting belongs in staging, not the landing table. They don't get forced into the same shape just because they both start as flat files.

## Segment 3 (code: JSON with VARIANT and FLATTEN)

The JSON feed is where VARIANT and FLATTEN earn their place. Load the raw JSON as a single VARIANT column first, then flatten it into staging using LATERAL FLATTEN — don't try to force a rigid schema at load time.

## Segment 4 (code: staging with TRY_CAST)

Staging is where raw strings become typed, validated columns. TRY_CAST matters here specifically — a bad row becomes a NULL you can find and count with a data-quality check, not a failed statement that stops the whole build.

## Segment 5 (steps: raw vs staging)

Raw is loaded as-is, no validation, disposable if you need to reload. Staging is typed, validated, and business-ready — the line between them is exactly where casting and data-quality checks belong.

## Segment 6 (outro)

Next lesson: milestone two — building the star schema, wiring up Streams and Tasks for incremental refresh, and configuring roles and grants for the project.
