# Filtering, Sorting & Aggregating in Cypher

`MATCH` and `RETURN` find and project data, but real queries need to filter it, order it, and
summarize it — exactly the jobs `WHERE`, `ORDER BY`, and aggregate functions do in T-SQL. Cypher
provides direct analogs for all three, and once you see the pattern, moving between the two
languages for this kind of query becomes mostly a vocabulary exercise rather than a conceptual
one.

## What you'll learn

- Filtering matched patterns with `WHERE`
- Ordering and limiting results with `ORDER BY` and `LIMIT`
- Real Cypher aggregation functions: `count()`, `avg()`, and the graph-specific `collect()`
- How implicit grouping in Cypher differs from an explicit `GROUP BY`

## WHERE: filtering the pattern

`WHERE` in Cypher filters rows the same way it does in SQL Server — it's evaluated after `MATCH`
finds candidate patterns, keeping only the ones meeting the condition:

```
MATCH (p:Person)-[:WORKS_AT]->(c:Company)
WHERE c.name = 'Northwind Traders' AND p.hireYear >= 2020
RETURN p.name, p.hireYear
ORDER BY p.hireYear DESC
LIMIT 5
```

You can filter on node properties (`p.hireYear >= 2020`), on labels (`WHERE p:Manager`), on
relationship properties (`WHERE r.since > 2019` when the relationship itself carries a
`since` property), and combine conditions with `AND`, `OR`, and `NOT` exactly like T-SQL. `ORDER
BY` and `LIMIT` behave identically to their SQL Server counterparts — `ORDER BY` sorts, `LIMIT`
caps the result count (the equivalent of `TOP`).

## Aggregating: count(), avg(), and collect()

Cypher's aggregate functions cover the same ground as SQL's, plus one that's distinctly
graph-flavored:

- `count(p)` — counts matched rows or non-null values, just like SQL `COUNT()`.
- `avg(p.salary)` — averages a numeric property, just like SQL `AVG()`.
- `collect(p.name)` — gathers matched values into a list. There's no direct SQL Server
  equivalent without `STRING_AGG` or `FOR JSON`; in Cypher, collecting related values into a
  list on a single row is a first-class, idiomatic pattern because query results are
  document-shaped, not strictly tabular.

```
MATCH (c:Company)<-[:WORKS_AT]-(p:Person)
RETURN c.name, count(p) AS employeeCount, avg(p.salary) AS avgSalary,
       collect(p.name) AS employeeNames
```

## Implicit grouping — no GROUP BY needed

This is the detail that trips up SQL Server veterans: Cypher has no `GROUP BY` clause. Instead,
any non-aggregated field in the `RETURN` list becomes the implicit grouping key. In the query
above, `c.name` isn't wrapped in an aggregate function, so Cypher automatically groups by
`c.name` and computes `count(p)`, `avg(p.salary)`, and `collect(p.name)` per distinct company —
the same result a T-SQL query would need an explicit `GROUP BY c.name` to produce. This isn't a
missing feature; it's a deliberate simplification, since the grouping key is always
unambiguous once you know which returned fields are wrapped in aggregates and which aren't.

## Key terms

| Term | Meaning |
|---|---|
| WHERE | Filters matched patterns by property, label, or relationship conditions |
| ORDER BY / LIMIT | Sort and cap result rows, equivalent to T-SQL's ORDER BY and TOP |
| count() / avg() | Standard aggregate functions, directly analogous to SQL COUNT/AVG |
| collect() | Aggregates matched values into a list on a single result row — a graph/document-flavored aggregate |
| Implicit grouping | Cypher groups automatically by any non-aggregated RETURN field; there is no GROUP BY clause |

## Check yourself

A query returns `c.name, count(p) AS employeeCount` with no explicit grouping clause anywhere.
How does Cypher know to group the counts by company?
