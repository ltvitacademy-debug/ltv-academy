# Script — The Neo4j Graph Data Science Library

## Segment 1 (title)

Everything so far has used plain Cypher — powerful for finding and shaping data, but not built for running full graph algorithms like PageRank across millions of nodes. The Neo4j Graph Data Science library is a separate, purpose-built plugin for exactly that.

## Segment 2 (code: GDS overview)

GDS is an official Neo4j plugin adding sixty-five plus graph algorithms as callable Cypher procedures — pathfinding, centrality, community detection, similarity, even machine learning pipelines. It's a separate plugin because these algorithms iterate the entire graph repeatedly, a fundamentally different access pattern from a normal MATCH-and-return query.

## Segment 3 (code: graph projection)

Before running most GDS algorithms, you create a graph projection — a compact, in-memory copy of the nodes and relationships the algorithm needs. This matters because algorithms like PageRank sweep across the whole graph repeatedly until scores converge, and reading from disk on every pass would be far slower.

## Segment 4 (steps: stream, write, stats)

Once a projection exists, algorithms generally run in one of three modes. Stream returns results without changing the graph. Write persists results back as new node properties so later Cypher queries can use them directly. Stats returns summary numbers only, useful for tuning.

## Segment 5 (outro)

Next up: shortest path and pathfinding algorithms — Dijkstra and A*, and the real routing and network-analysis problems they solve.
