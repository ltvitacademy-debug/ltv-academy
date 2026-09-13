# Script — Data Quality Checks in Snowflake SQL

## Segment 1 (title)

A staging table can be perfectly incremental and perfectly deduplicated and still be wrong — missing rows, broken relationships, unexpected nulls. Data quality checks are plain SQL queries that catch that before it reaches Chapter 6's dimensional models or a report.

## Segment 2 (code: null check + referential anti-join)

The simplest check: does a column that should never be null actually have any? And the same anti-join pattern you already know from T-SQL catches foreign keys that point to nothing — an order referencing a customer that doesn't exist.

## Segment 3 (code: row-count sanity check)

A load that silently drops rows is one of the hardest bugs to notice, because nothing errors — the pipeline just succeeds with fewer rows than it should have. Comparing counts across layers catches that gap.

## Segment 4 (steps: categories of checks / dbt foreshadow)

Writing these checks by hand works but doesn't scale past a handful of tables. dbt, a later course in this catalog, formalizes exactly this idea as declarative config that runs automatically — but it isn't inventing a new kind of check, it's automating the ones you just wrote here.

## Segment 5 (outro)

Next lesson starts Chapter 6: star schemas, and implementing fact and dimension tables directly in Snowflake.
