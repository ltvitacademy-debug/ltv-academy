# Performance Tuning in Neo4j

Every SQL Server DBA in this path has tuned a buffer pool, read an execution plan, and hunted
down a missing index causing a table scan. Neo4j performance tuning is the same discipline
wearing different clothes: size the **page cache** instead of the buffer pool, read a
**`PROFILE`** output instead of a SQL Server execution plan, and watch for missing labels and
indexes causing a full graph scan instead of a missing index causing a table scan.

## What you'll learn

- What Neo4j's page cache actually does, and how to size it
- How to use `PROFILE` to verify a query is actually using an index
- The real anti-pattern that causes a full graph scan, and how to spot it
- How index usage and page cache sizing interact in practice

## Page cache: Neo4j's equivalent of a buffer pool

Neo4j stores graph data (nodes, relationships, properties) on disk, and the **page cache**
caches pages of that store data in memory — this is the direct equivalent of SQL Server's
buffer pool caching data pages from `.mdf` files. The setting that controls it is
`dbms.memory.pagecache.size` in `neo4j.conf`:

```
dbms.memory.pagecache.size=8g
```

The real operational goal is the same instinct behind sizing a SQL Server buffer pool: get
enough of the active working set of the graph into the page cache that normal query traffic
isn't constantly forcing disk reads. Neo4j also separates page cache from **heap memory**
(`dbms.memory.heap.max_size`), which is used for query execution and transaction state — the
rough equivalent of splitting SQL Server's memory budget between the buffer pool and
everything else the engine needs during query processing. Undersizing the page cache relative
to the graph's actual size on disk is one of the single most common causes of a Neo4j instance
that "should be fast" but isn't.

## PROFILE: reading a real execution plan

`PROFILE` prefixed on a Cypher query runs the query and returns the actual execution plan with
real row counts and database hits at each step — the direct equivalent of SQL Server's actual
execution plan (as opposed to `EXPLAIN`, which is closer to SQL Server's estimated plan: it
shows the plan without running the query).

```
PROFILE
MATCH (c:Customer {email: 'jane@example.com'})-[:PLACED]->(o:Order)
RETURN o.orderDate, o.total
```

The output shows each operator in the plan — `NodeIndexSeek`, `Expand(All)`, `Filter`, and so
on — along with the number of rows each operator produced and the number of "db hits" (storage
accesses) it took. A `NodeIndexSeek` on `Customer` by `email` means the index is doing its job.
Seeing `NodeByLabelScan` instead, on a graph with more than a handful of `Customer` nodes, is
the Neo4j equivalent of an execution plan showing a table scan where you expected an index
seek — a strong signal something's missing.

## The real anti-pattern: missing labels and indexes causing a full graph scan

The single most common Neo4j performance anti-pattern is a query that filters on a property
with no supporting index, or a `MATCH` with no label at all:

```
-- anti-pattern: no label, no index — scans every node
MATCH (n {email: 'jane@example.com'}) RETURN n

-- fixed: label narrows the scan, index makes it a seek
CREATE INDEX customer_email FOR (c:Customer) ON (c.email);
MATCH (c:Customer {email: 'jane@example.com'}) RETURN c
```

Without a label, Neo4j has no way to narrow the search space at all — it has to consider every
node in the graph, the rough equivalent of a query against SQL Server with no `WHERE` clause
touching an indexed column. Adding the label alone narrows the scan to nodes with that label;
adding the index on top of the label turns a scan into a direct seek. This is the same two-step
reasoning a relational DBA already applies — narrow with a `WHERE` predicate, then confirm an
index actually supports that predicate — just expressed through Cypher's labels and property
indexes instead of `WHERE` clauses and B-tree indexes.

## Putting it together: PROFILE confirms, page cache sustains

The two tools work together in practice: `PROFILE` tells you whether a given query is using
the indexes and labels it should be; page cache sizing determines whether the graph data those
operators touch is actually served from memory or forced to disk on every execution. A
perfectly indexed query against an undersized page cache still performs poorly under load —
tuning both together, the same discipline as pairing good indexing with adequate buffer pool
memory in SQL Server, is what actually gets you consistent production performance.

## Key terms

| Term | Meaning |
|---|---|
| Page cache | Neo4j's in-memory cache of on-disk store pages — the equivalent of a buffer pool |
| `dbms.memory.pagecache.size` | The `neo4j.conf` setting controlling page cache size |
| `PROFILE` | Runs a Cypher query and returns the actual execution plan with real row counts and db hits |
| `NodeByLabelScan` | A plan operator that scans all nodes of a label — the graph equivalent of a table scan |

## Check yourself

A Cypher query against a graph with 2 million `Customer` nodes is slow, and `PROFILE` shows a
`NodeByLabelScan` on `Customer` followed by a `Filter` on the `email` property. What's the
actual problem, and how would you fix it?
