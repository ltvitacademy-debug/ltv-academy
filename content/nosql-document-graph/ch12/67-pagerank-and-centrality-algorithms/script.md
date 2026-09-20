# Script — PageRank & Centrality Algorithms

## Segment 1 (title)

Shortest-path algorithms answer how to get from A to B. Centrality algorithms answer a different question: which nodes actually matter. PageRank — originally built to rank web pages — is the most famous, and ships as a standard GDS procedure alongside other real centrality measures.

## Segment 2 (code: PageRank)

PageRank's core idea is that a node is important if it's linked to by other important nodes — importance flows through the graph recursively until scores converge. Beyond web search, it generalizes to any graph where being pointed to by important things is a meaningful signal.

## Segment 3 (code: betweenness)

Betweenness centrality measures how often a node sits on the shortest path between other pairs of nodes. A node can have very few direct connections but score high on betweenness if it's the sole bridge between two otherwise-separate parts of the graph.

## Segment 4 (steps: three measures)

PageRank measures importance flowing from important neighbors. Betweenness finds bridge nodes that many shortest paths pass through. Degree centrality is just a relationship count — the cheapest measure, but the bluntest.

## Segment 5 (outro)

Next up: community detection algorithms — Louvain and Label Propagation — for finding clusters like fraud rings or social network groups.
