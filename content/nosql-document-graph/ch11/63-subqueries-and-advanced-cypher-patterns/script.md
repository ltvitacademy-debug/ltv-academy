# Script — Subqueries & Advanced Cypher Patterns

## Segment 1 (title)

Real Cypher queries chain multiple steps together — filter, then aggregate, then match again based on that aggregate, or optionally attach data that might not exist. WITH, CALL subqueries, and OPTIONAL MATCH are how you do that.

## Segment 2 (code: WITH)

WITH passes results from one part of a query into the next, similar to a CTE in T-SQL. Cypher has no HAVING clause, so WITH is how you compute an aggregate first and then filter on it in the next stage as if it were an ordinary property.

## Segment 3 (code: CALL {})

CALL runs a self-contained subquery for each incoming row. The WITH p inside is required — it explicitly imports the outer row's p into the subquery's isolated scope, mirroring a correlated subquery in T-SQL.

## Segment 4 (code: OPTIONAL MATCH)

Plain MATCH drops any row where the pattern doesn't exist, just like an INNER JOIN. OPTIONAL MATCH keeps the row and fills in null for anything the pattern couldn't find — exactly like a LEFT JOIN.

## Segment 5 (outro)

Next up: query tuning and the Cypher query planner — EXPLAIN and PROFILE, Cypher's equivalent to reading a SQL Server execution plan, and how indexes work in Cypher.
