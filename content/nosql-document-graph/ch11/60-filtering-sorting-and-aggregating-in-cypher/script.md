# Script — Filtering, Sorting & Aggregating in Cypher

## Segment 1 (title)

MATCH and RETURN find and project data, but real queries need to filter, order, and summarize it — the jobs WHERE, ORDER BY, and aggregate functions do in T-SQL. Cypher has direct analogs for all three.

## Segment 2 (code: WHERE, ORDER BY, LIMIT)

WHERE filters matched patterns after MATCH finds them, on node properties, labels, or relationship properties, combined with AND, OR, and NOT exactly like T-SQL. ORDER BY sorts and LIMIT caps the result count — the equivalent of TOP.

## Segment 3 (code: count(), avg(), collect())

Count and avg work exactly like their SQL counterparts. Collect is distinctly graph-flavored — it gathers matched values into a list on a single result row, a first-class idiomatic pattern in Cypher since results are document-shaped, not strictly tabular.

## Segment 4 (steps: no GROUP BY clause)

Here's the detail that trips up SQL Server veterans: Cypher has no GROUP BY clause. Any non-aggregated field in the RETURN list becomes the implicit grouping key automatically — the grouping is always unambiguous once you know which fields are wrapped in aggregates.

## Segment 5 (outro)

Next up: creating and updating data with Cypher — CREATE, MERGE, SET, and DELETE.
