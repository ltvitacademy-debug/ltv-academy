# Cypher Query Language Basics: MATCH & RETURN

Every query you've written so far in this course used Neo4j Browser to eyeball a graph, but
production work means writing Cypher — Neo4j's declarative query language. Cypher's defining
idea is that a query *looks like* the pattern it's matching: parentheses draw nodes, brackets
draw relationships, and dashes-with-arrows draw direction, so a query like
`(p:Person)-[:WORKS_AT]->(c:Company)` reads almost like the whiteboard sketch you'd draw of the
same data. This lesson covers the two clauses you'll use in nearly every query: `MATCH`, which
finds patterns in the graph, and `RETURN`, which projects the results.

## What you'll learn

- How Cypher's ASCII-art pattern syntax represents nodes and relationships
- Writing `MATCH` clauses to find nodes, labels, and relationship patterns
- Using `RETURN` to project properties, aliases, `DISTINCT`, and `LIMIT`
- How `MATCH` replaces the SQL Server `SELECT ... FROM ... JOIN` combination conceptually

## Reading and writing a pattern

A node is written in parentheses: `(p:Person)` means "a node with the label `Person`, bound to
the variable `p`." You can match a node with no label at all (`(n)`), a node with multiple
labels (`(n:Person:Employee)`), or a node filtered by inline properties
(`(p:Person {name: 'Ana Brody'})`). A relationship is written in square brackets on a dash:
`-[:WORKS_AT]->` means "a relationship of type `WORKS_AT`, traversed left to right." The arrow
shows direction, because in Neo4j every relationship is stored with a direction even when your
query logic doesn't care about it — you can omit the arrowhead (`-[:WORKS_AT]-`) to match the
relationship in either direction.

```
MATCH (p:Person)-[:WORKS_AT]->(c:Company)
RETURN p.name, c.name
```

This single line does the conceptual work of a SQL Server query that would `SELECT` from a
`Person` table, `JOIN` a bridge or foreign-key relationship, and `JOIN` a `Company` table — except
there's no join being computed at query time. The `WORKS_AT` relationship already exists as a
stored object connecting the two nodes; `MATCH` is walking a pointer, not computing a join.

## RETURN: projecting what you found

`RETURN` is Cypher's `SELECT` — it decides what comes back from a matched pattern. You can return
whole nodes (`RETURN p`), individual properties (`RETURN p.name, p.email`), give results
readable aliases (`RETURN p.name AS employeeName`), deduplicate with `RETURN DISTINCT c.name`,
and cap result size with `LIMIT 10` the same way you'd use `TOP` in T-SQL. Unlike a relational
`SELECT`, `RETURN p` gives you back the *entire node object* — every property on it — because
Cypher doesn't require you to declare a fixed column list ahead of time; documents-style
flexibility carries into how query results are shaped.

## Why this isn't just "SQL with funny syntax"

It's tempting to mentally map `MATCH` to `FROM`/`JOIN` and move on, but the difference is real:
in SQL Server, a JOIN is *computed* at query time by matching foreign key values across index
structures, and its cost grows with the size of the tables involved. In Cypher, a relationship
is a physical record on disk with direct pointers to its two nodes — traversing `-[:WORKS_AT]->`
from a known `Person` node is a constant-time pointer lookup, regardless of how many `Person` or
`Company` nodes exist in the whole database. That's the real architectural payoff of a graph
database, and it's why deep multi-hop patterns (covered later in this chapter) stay fast where
equivalent multi-way SQL joins get expensive.

## Key terms

| Term | Meaning |
|---|---|
| Cypher | Neo4j's declarative graph query language, using ASCII-art pattern syntax |
| MATCH | Clause that finds all occurrences of a given node/relationship pattern in the graph |
| RETURN | Clause that projects which nodes, relationships, or properties come back as results |
| Pattern | The combination of node and relationship syntax describing a shape to find, e.g. `(a)-[:REL]->(b)` |
| Label | A tag on a node (like `:Person`) roughly analogous to a table name in the relational world |

## Check yourself

Why is traversing a relationship like `-[:WORKS_AT]->` in Neo4j fundamentally different in cost
from computing a SQL Server JOIN between two large tables, even though both return "connected"
rows?
