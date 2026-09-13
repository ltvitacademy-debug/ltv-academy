# Script — Snowflake SQL vs. T-SQL: Syntax Differences That Matter

## Segment 1 (title)

You already know SQL — this lesson is a direct syntax translation guide for the handful of places Snowflake's dialect actually diverges from T-SQL, starting with row limiting and string concatenation.

## Segment 2 (code: LIMIT vs TOP, || vs +)

T-SQL puts the row limit in the SELECT clause with TOP. Snowflake puts it at the end of the query with LIMIT, after ORDER BY, and also supports OFFSET. And where T-SQL overloads plus for both math and string concatenation, Snowflake uses plus for arithmetic only — concatenation is the double-pipe operator.

## Segment 3 (code: IFF vs IIF / CASE)

Snowflake's IFF is a direct match for T-SQL's IIF — same idea, one fewer letter. It's for a single condition; the moment you need more than one branch, full CASE works identically to T-SQL with no syntax changes at all.

## Segment 4 (code: QUALIFY)

QUALIFY is the one construct here with no T-SQL equivalent. In T-SQL, filtering on a window function like ROW_NUMBER forces you into a wrapping CTE, because WHERE can't see window function results. Snowflake's QUALIFY filters on the window function directly, in the same query.

## Segment 5 (steps: semicolons & case-insensitivity)

Two smaller habits: always terminate statements with a semicolon in multi-statement worksheets and scripts, same discipline as T-SQL batches. And unquoted identifiers are case-insensitive, folded to uppercase — orders, Orders, and ORDERS are the same table unless quoted.

## Segment 6 (outro)

Next lesson: CTEs and window functions in Snowflake — confirming what transfers directly from T-SQL, which turns out to be almost everything.
