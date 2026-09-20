# Query Tuning & the Cypher Query Planner

A SQL Server DBA reaches for an execution plan the moment a query runs slower than expected —
`EXPLAIN` shows the plan without running the query, `SET STATISTICS IO/TIME ON` and the actual
plan show what really happened. Cypher has direct analogs: `EXPLAIN` and `PROFILE`. This lesson
closes out the chapter by connecting query-writing to the query planner's-eye view of what you
actually wrote, plus the one performance lever that matters most: indexes.

## What you'll learn

- `EXPLAIN` — seeing the planned query without executing it
- `PROFILE` — running the query and seeing real row counts and db hits per step
- Reading a Cypher plan for full node scans vs. index-backed lookups
- Creating and using indexes with `CREATE INDEX`

## EXPLAIN: the plan without running it

Prefixing any query with `EXPLAIN` returns the planner's intended execution plan — every operator
it plans to use, in order — without actually running the query or touching any data:

```
EXPLAIN
MATCH (p:Person {name: 'Marcus Lee'})
RETURN p
```

This is the direct analog of a SQL Server *estimated* execution plan: useful for a fast sanity
check on plan shape, but it shows planned costs, not what actually happened when data flowed
through each operator.

## PROFILE: the plan with real numbers

Prefixing a query with `PROFILE` actually executes it and returns the plan annotated with real
per-operator statistics: rows produced, db hits (roughly Neo4j's equivalent of logical reads),
and time spent:

```
PROFILE
MATCH (p:Person {name: 'Marcus Lee'})
RETURN p
```

This is the direct analog of a SQL Server *actual* execution plan with `STATISTICS IO` turned on
— it's the tool you reach for when a query is genuinely slow and you need to see where the time
and work actually went, not just where the planner expected it to go.

## The single most important thing to look for: NodeByLabelScan vs. index lookups

The operator that matters most when reading a Cypher plan is whether Neo4j found your starting
node through a full label scan or an index lookup. A query filtering on a property with no index
shows `NodeByLabelScan` — Neo4j walks every node with that label checking the property, directly
analogous to a SQL Server table scan or clustered index scan when no useful index exists. The
same query with an index in place shows `NodeIndexSeek` instead — a direct, sub-linear lookup,
the graph-database equivalent of a SQL Server nonclustered index seek. On a graph with thousands
or millions of `Person` nodes, that's the difference between a query that touches every node and
one that goes straight to the match.

## CREATE INDEX: making lookups fast

Cypher indexes work conceptually the same way SQL Server indexes do — trading write overhead and
storage for dramatically faster reads on the indexed property:

```
CREATE INDEX person_name_index IF NOT EXISTS
FOR (p:Person) ON (p.name)
```

This creates a range index on `Person.name`, so any query filtering or matching on that exact
property (`MATCH (p:Person {name: 'Marcus Lee'})` or `WHERE p.name = 'Marcus Lee'`) becomes a
`NodeIndexSeek` instead of a `NodeByLabelScan`. Neo4j also supports composite indexes across
multiple properties, and — much like SQL Server unique constraints — a uniqueness constraint
(`CREATE CONSTRAINT ... IS UNIQUE`) both enforces uniqueness and automatically creates a
supporting index. As with relational indexing, this isn't free: every `CREATE`, `SET`, or `MERGE`
touching an indexed property now has to maintain that index too, so indexes belong on properties
that are actually used to look nodes up, not on every property that exists.

## Key terms

| Term | Meaning |
|---|---|
| EXPLAIN | Returns the planned execution plan without running the query — like a SQL Server estimated plan |
| PROFILE | Runs the query and returns the plan with real row counts and db hits — like an actual plan with STATISTICS IO |
| NodeByLabelScan | Plan operator that scans every node with a label — the graph equivalent of a table/clustered scan |
| NodeIndexSeek | Plan operator that looks a node up directly via an index — the graph equivalent of an index seek |
| CREATE INDEX | Creates an index on a label/property combination to speed up lookups on that property |

## Check yourself

You run `PROFILE` on a slow query and see `NodeByLabelScan` on a `Person` node filtered by
`email`. What's the fix, and what operator would you expect to see in the plan after applying it?
