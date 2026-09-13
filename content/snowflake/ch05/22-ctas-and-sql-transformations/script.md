# Script — CTAS & SQL-Based Transformations

## Segment 1 (title)

CREATE TABLE AS SELECT builds a brand-new table directly from a query's result set — no separate CREATE TABLE with a column list, then an INSERT INTO SELECT. Column names and types come straight from the query.

## Segment 2 (code: CREATE OR REPLACE TABLE AS SELECT)

A plain CTAS fails the second time you run it, because the table already exists. CREATE OR REPLACE TABLE AS SELECT swaps it atomically instead — the old version is fully replaced in one operation, which is the form you'd actually put on a schedule.

## Segment 3 (code: CTAS vs. SELECT INTO comparison)

You've used SELECT INTO in T-SQL for something similar. The idea's the same, but in Snowflake, drop-and-rebuild isn't a workaround you bolt on afterward — CREATE OR REPLACE TABLE AS SELECT is the idiom, safe to run unattended on a schedule.

## Segment 4 (code: business logic inside the SELECT)

Casts, calculated columns, CASE expressions, and filters all belong directly in the SELECT that feeds the CTAS. There's no separate transformation layer to configure — the business logic lives right there in the same statement.

## Segment 5 (outro)

Next lesson: incremental loading patterns — processing only what's new instead of rebuilding an entire table every run.
