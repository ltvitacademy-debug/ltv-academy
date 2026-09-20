# The Neo4j Graph Data Science Library

Everything so far in this course has used plain Cypher — `MATCH`, `WHERE`, aggregates, variable-
length paths. That's genuinely powerful for finding and shaping data, but it isn't built for
running full graph algorithms like PageRank or community detection across millions of nodes. The
Neo4j Graph Data Science library (GDS) is a separate, purpose-built plugin for exactly that, and
this chapter is about what it does and how it's used.

## What you'll learn

- What the Graph Data Science library is, and why it's a separate plugin rather than built into
  Cypher itself
- The concept of an in-memory graph projection
- The general shape of running a GDS algorithm: project, run, write or stream results
- What kinds of algorithms live in GDS, previewing the rest of this chapter

## GDS: a real, separate library

The Neo4j Graph Data Science library is an official Neo4j plugin, installed alongside the core
database, that adds 65+ graph algorithms as callable Cypher procedures — pathfinding, centrality,
community detection, similarity, and machine learning pipelines. It isn't a separate product you
query differently; once installed, you call its algorithms with ordinary Cypher `CALL` syntax,
the same mechanism used for any Neo4j procedure. The reason it's a separate plugin rather than
baked into core Cypher is architectural: these algorithms need to iterate over the *entire* graph
(or a large subgraph) repeatedly, which is a fundamentally different access pattern from Cypher's
`MATCH`-a-pattern-and-return workload, and it benefits from its own specialized in-memory
representation.

## The in-memory graph projection

Before running most GDS algorithms, you create a graph projection — a compact, in-memory copy of
the nodes, relationships, and properties the algorithm actually needs, held separately from the
main graph store:

```
CALL gds.graph.project(
  'employeeGraph',
  'Person',
  'WORKS_WITH'
)
```

This projects every `Person` node and every `WORKS_WITH` relationship into an in-memory graph
named `employeeGraph`. The projection matters for a real performance reason: GDS algorithms are
iterative — PageRank, for example, sweeps across the whole graph repeatedly until scores
converge — and repeatedly reading from disk-backed storage for each pass would be far slower than
operating on a purpose-built, compressed in-memory structure. You can project the whole graph or
just the labels and relationship types a given analysis needs, which also controls memory usage
on a large graph.

## Running an algorithm: three real modes

Once a projection exists, GDS algorithms generally run in one of three modes:

- **stream** — returns results directly as a query result, without changing the graph. Good for
  exploration: `CALL gds.pageRank.stream('employeeGraph')`.
- **write** — runs the algorithm and writes results back to the main graph as new node
  properties, so later Cypher queries can filter or sort on them directly.
- **stats** — returns summary statistics about the algorithm's run (useful for tuning parameters)
  without returning or writing per-node results.

```
CALL gds.pageRank.write('employeeGraph', {
  writeProperty: 'pageRankScore'
})
```

This runs PageRank against the projection and writes each node's score back as a
`pageRankScore` property, so a later plain Cypher query like
`MATCH (p:Person) RETURN p.name ORDER BY p.pageRankScore DESC LIMIT 10` can use it like any other
property.

## What's ahead in this chapter

The rest of this chapter covers real, specific algorithm families GDS provides: shortest-path and
pathfinding algorithms (Dijkstra, A*) for routing and network-distance problems; PageRank and
centrality measures (betweenness, degree centrality) for ranking influence and identifying key
nodes; community detection algorithms (Louvain, Label Propagation) for finding clusters; and node
similarity algorithms for building recommendation patterns — closing with real production use
cases that combine several of these.

## Key terms

| Term | Meaning |
|---|---|
| Graph Data Science (GDS) | Neo4j's official plugin providing 65+ graph algorithms as callable procedures |
| Graph projection | A compact, in-memory copy of nodes/relationships/properties used to run GDS algorithms efficiently |
| stream mode | Runs an algorithm and returns results as a query result, without modifying the graph |
| write mode | Runs an algorithm and persists results back to the graph as new node properties |
| stats mode | Runs an algorithm and returns summary statistics only, without per-node results |

## Check yourself

Why does GDS require creating an in-memory graph projection before running an algorithm like
PageRank, rather than just running the algorithm directly against the main graph store?
