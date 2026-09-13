# Script — CTEs and Window Functions in Snowflake

## Segment 1 (title)

This lesson isn't teaching CTEs or window functions from scratch — you already know them. It's confirming exactly what transfers unchanged from T-SQL, starting with standard CTEs, which behave identically.

## Segment 2 (code: window functions)

Every ranking and offset function you use in T-SQL exists in Snowflake with the same name and the same OVER PARTITION BY ORDER BY syntax — ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, running aggregates, all of it.

## Segment 3 (code: recursive CTEs)

Recursive CTEs work the same conceptually — an anchor member, a UNION ALL, a recursive member referencing the CTE itself — but Snowflake requires the RECURSIVE keyword explicitly, where T-SQL infers it. Forget it and Snowflake throws a syntax error.

## Segment 4 (code: QUALIFY shortcut)

Lesson 6's QUALIFY clause gives you a shorter Snowflake-only alternative to the classic top-N-per-group CTE pattern — both are correct, QUALIFY is just a shortcut worth reaching for once it's second nature.

## Segment 5 (outro)

Next lesson: views, plus temporary and transient tables — Snowflake's three table persistence types, a concept SQL Server doesn't have in this exact form.
