# Subqueries & Advanced Cypher Patterns

Real Cypher queries chain multiple steps together — filter, then aggregate, then match again
based on that aggregate; or match a required pattern, then optionally attach more data that
might not exist. `WITH` chains query parts, `CALL {}` runs a genuine subquery, and `OPTIONAL
MATCH` handles the case a relational DBA knows as a `LEFT JOIN`.

## What you'll learn

- Chaining query stages with `WITH`
- Running subqueries with `CALL {}`
- `OPTIONAL MATCH` — Cypher's LEFT JOIN equivalent
- Combining all three into a realistic multi-stage query

## WITH: chaining query parts

`WITH` passes results from one part of a query into the next, the way a CTE or a derived table
passes results forward in T-SQL — except `WITH` sits inline in the middle of a single Cypher
statement rather than being declared up front:

```
MATCH (p:Person)-[:WORKS_AT]->(c:Company)
WITH c, count(p) AS employeeCount
WHERE employeeCount > 10
RETURN c.name, employeeCount
ORDER BY employeeCount DESC
```

This is a genuinely important pattern: you cannot filter on an aggregate directly in the same
`WHERE` that comes before it (Cypher has no `HAVING`), so `WITH` is how you compute
`employeeCount` first, then filter on it as if it were an ordinary property in the next stage.
Everything named in the `WITH` list carries forward; anything left out is dropped from scope,
similar to how a T-SQL derived table only exposes the columns you selected into it.

## CALL {}: real subqueries

`CALL {}` runs a self-contained subquery for each incoming row, and is especially useful when you
need to compute something per-row that would otherwise force restructuring the whole query:

```
MATCH (p:Person)
CALL {
  WITH p
  MATCH (p)-[:WORKS_AT]->(c:Company)
  RETURN count(c) AS companyCount
}
RETURN p.name, companyCount
```

The `WITH p` inside the subquery is required — it explicitly imports the outer row's `p` into the
subquery's scope, since a `CALL {}` block is otherwise isolated from the surrounding query. This
mirrors a correlated subquery in T-SQL, where the inner query references a column from the outer
query's current row.

## OPTIONAL MATCH: the LEFT JOIN equivalent

Plain `MATCH` drops any row where the pattern doesn't exist — if a `Person` has no `WORKS_AT`
relationship, a `MATCH (p)-[:WORKS_AT]->(c)` pattern excludes that person from the results
entirely, the same way an `INNER JOIN` would. `OPTIONAL MATCH` keeps the row and fills in `null`
for anything the pattern couldn't find, exactly like a `LEFT JOIN`:

```
MATCH (p:Person)
OPTIONAL MATCH (p)-[:WORKS_AT]->(c:Company)
RETURN p.name, c.name
```

Every `Person` is returned here, even ones with no `WORKS_AT` relationship at all — for those,
`c.name` comes back as `null`, exactly like an unmatched `LEFT JOIN` row returns `NULL` for the
right-hand table's columns in T-SQL.

## Putting it together

These three combine naturally in a realistic query — find every company, its employee count via
`WITH`, and optionally each company's most recent office location if one happens to be recorded:

```
MATCH (c:Company)<-[:WORKS_AT]-(p:Person)
WITH c, count(p) AS employeeCount
OPTIONAL MATCH (c)-[:LOCATED_AT]->(o:Office)
RETURN c.name, employeeCount, o.city
ORDER BY employeeCount DESC
```

Reading a chained query like this is a skill in itself: each `WITH` boundary is a checkpoint —
scope resets to exactly what was named, then the next clause operates on that narrowed result
set.

## Key terms

| Term | Meaning |
|---|---|
| WITH | Chains query stages, passing named results forward and narrowing scope — enables filtering on an aggregate |
| CALL {} | Runs a subquery per incoming row; requires WITH inside to import outer variables |
| OPTIONAL MATCH | Keeps rows even when the pattern doesn't match, filling missing values with null — Cypher's LEFT JOIN |
| Correlated subquery | A subquery that references a value from the current outer row, the T-SQL analog to CALL {} with WITH |

## Check yourself

Why can't you filter on `count(p)` directly in a `WHERE` clause immediately after `MATCH`, and
what clause do you need to make that filter possible?
