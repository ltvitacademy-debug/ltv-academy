# Script — Exercise: Rewriting a T-SQL Query in Snowflake SQL

## Segment 1 (title)

Here's a realistic T-SQL query: the top 3 highest-value orders per customer since the start of 2025, flagging orders over 500 dollars as Large. It touches four things this chapter covered — TOP, string plus, CASE, and a CTE wrapping ROW_NUMBER just to filter on it.

## Segment 2 (code: the starting T-SQL query)

This query uses TOP in the SELECT clause, plus for concatenating first and last name, a two-branch CASE for the Large/Standard flag, and a CTE that computes ROW_NUMBER just so an outer WHERE clause can filter it down to the top 3 per customer.

## Segment 3 (code: the Snowflake rewrite)

The rewrite: plus becomes double-pipe, CASE collapses into IFF, and the CTE disappears entirely — QUALIFY filters the window function directly in the same query. TOP 100 becomes LIMIT 100 at the end, after ORDER BY. Nine lines shorter, same result.

## Segment 4 (steps: checking your rewrite)

Check your own rewrites two ways: confirm both versions return the same row count, and confirm you changed only the syntax that actually differs — every TOP, string plus, CASE, and CTE-wrapped window function, and nothing else.

## Segment 5 (outro)

That's Chapter 2 — Snowflake SQL syntax differences from T-SQL. Next chapter: loading data into Snowflake, starting with internal versus external stages.
