# Pattern Matching & Variable-Length Paths

Every Cypher query so far has matched a fixed, known-depth pattern: one hop, two hops, a
specific shape. Real graph problems are often the opposite — "find everyone reachable within
three hops," "find a path of unknown length between two people," "find all managers above this
employee, however many levels up." Cypher answers these with variable-length path syntax, and
this is the single clearest place where a graph database's real advantage over relational JOINs
shows up.

## What you'll learn

- Variable-length relationship syntax: `[:REL*1..3]`
- Multi-hop traversal queries and what they return
- Unbounded and single-direction variable-length patterns
- Why this class of query gets dramatically more expensive in SQL Server, and doesn't in Neo4j

## Variable-length relationship syntax

A fixed relationship pattern like `-[:REPORTS_TO]->` matches exactly one hop. Adding `*min..max`
inside the brackets tells Cypher to match a *chain* of that relationship type, anywhere from
`min` to `max` hops long:

```
MATCH (emp:Person {name: 'Dana Okafor'})-[:REPORTS_TO*1..3]->(boss:Person)
RETURN boss.name
```

This finds every person reachable from Dana by following `REPORTS_TO` one, two, or three hops —
her direct manager, her manager's manager, and so on up to three levels, all in a single query.
Each match Cypher returns corresponds to one full chain length; if Dana's manager, skip-level
manager, and VP are all within three hops, `boss` returns all three as separate rows.

## Reading the shorthand

- `[:REL*1..3]` — between 1 and 3 hops, inclusive.
- `[:REL*..3]` — up to 3 hops (minimum defaults to 1).
- `[:REL*2..]` — 2 or more hops, unbounded on the top end.
- `[:REL*]` — any number of hops, fully unbounded (use with real caution — on a densely
  connected graph this can traverse an enormous number of paths).
- `[:REL*3]` — exactly 3 hops, no range.

The same bracket syntax that draws a single relationship in a normal `MATCH` just gains a length
range; nothing else about pattern syntax changes.

## A real multi-hop example

Variable-length paths aren't limited to organizational hierarchies. A common real pattern is
finding indirect connections — for example, colleagues of colleagues:

```
MATCH (p:Person {name: 'Dana Okafor'})-[:WORKS_WITH*2..2]-(coworker:Person)
WHERE coworker <> p
RETURN DISTINCT coworker.name
```

This finds people exactly two `WORKS_WITH` hops from Dana — people she doesn't work with
directly, but who share a direct collaborator with her. Written relationally, this would require
self-joining a bridge table twice, with the join condition growing more awkward at every
additional hop.

## Why this is where graphs genuinely win

In SQL Server, finding "everyone reachable within N hops" through a many-to-many relationship
table means writing N nested self-joins, or reaching for a recursive CTE — and a recursive CTE's
cost still grows with the width of the table and the number of matching rows at each level,
because the engine is re-evaluating join conditions against indexes at every step. In Neo4j, a
relationship is a stored pointer between two specific nodes. Traversing `[:REPORTS_TO*1..3]`
means the engine follows real pointers from node to node, hop by hop — the cost depends on how
many actual paths exist in the data being traversed, not on the total size of the `Person` table
or how many `REPORTS_TO` relationships exist elsewhere in the graph. This is the concrete,
measurable version of "graph databases are built for traversal" that earlier lessons in this
chapter introduced conceptually.

## Key terms

| Term | Meaning |
|---|---|
| Variable-length path | A relationship pattern matching a chain of hops within a min/max range, e.g. `[:REL*1..3]` |
| `*min..max` | Syntax specifying the hop-count range for a variable-length relationship |
| Multi-hop traversal | Following a chain of relationships across more than one node to reach indirect connections |
| Unbounded path (`[:REL*]`) | A variable-length pattern with no maximum hop count — can be expensive on dense graphs |

## Check yourself

Why does a query like `MATCH (a)-[:REPORTS_TO*1..3]->(b) RETURN b` scale with the number of
actual matching paths in Neo4j, rather than with the total size of the underlying tables the way
an equivalent recursive CTE would in SQL Server?
