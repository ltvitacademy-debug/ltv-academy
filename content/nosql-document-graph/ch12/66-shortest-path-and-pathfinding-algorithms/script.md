# Script — Shortest Path & Pathfinding Algorithms

## Segment 1 (title)

"What's the shortest path between these two nodes" is one of the oldest and most useful questions you can ask a graph. GDS provides real pathfinding algorithms for it — most importantly Dijkstra and A* — underpinning systems you use every day, from GPS routing to network analysis.

## Segment 2 (code: Dijkstra)

Dijkstra's algorithm finds the lowest-total-weight path between a source and target, always expanding the currently cheapest known path first. relationshipWeightProperty tells it which property to treat as the cost of traversing an edge — distance, time, or money, depending on the problem.

## Segment 3 (code: A*)

A* solves the same problem but searches faster when you have a reasonable estimate of remaining distance — a heuristic, typically straight-line distance for geographic routing. It returns the same optimal result as Dijkstra but usually explores far fewer nodes.

## Segment 4 (steps: real use cases)

Routing is GPS and logistics software computing the fastest path across a road network. Network analysis finds the shortest path through a computer network for latency-aware decisions. Logistics finds the cheapest path through warehouses and shipping routes.

## Segment 5 (outro)

Next up: PageRank and centrality algorithms — ranking influence and identifying the key nodes in a network.
