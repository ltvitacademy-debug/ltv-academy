# Script — Deduplication Strategies

## Segment 1 (title, code: CTE + ROW_NUMBER)

Raw data frequently has duplicate rows for the same business key — a retried load, or an old and new version of the same record both landing. You already know the fix: wrap ROW_NUMBER in a CTE, partition by the key, and filter for row number one in an outer query.

## Segment 2 (code: QUALIFY)

Snowflake adds QUALIFY, a clause that filters directly on a window function's result the same way WHERE filters rows — no CTE or subquery wrapper needed. QUALIFY doesn't exist in T-SQL; it's genuinely Snowflake-idiomatic, and it's what you'll see in most real Snowflake ELT code.

## Segment 3 (code: DISTINCT for full-row duplicates)

QUALIFY and ROW_NUMBER solve duplicates that differ by some column, like a load timestamp. When rows are exact, full-row duplicates with nothing to break the tie on, plain DISTINCT is simpler and does the job.

## Segment 4 (steps: which row wins is a business decision)

Which row wins when you order by loaded_at descending is a business decision, not a technical default. Get that rule from whoever owns it, and make sure the ORDER BY inside the window function actually encodes it.

## Segment 5 (outro)

Next lesson: data quality checks — writing SQL that catches nulls, orphaned foreign keys, and row-count surprises before they reach a report.
