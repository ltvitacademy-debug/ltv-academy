# Shortest Path & Pathfinding Algorithms

"What's the shortest path between these two nodes?" is one of the oldest and most useful
questions you can ask a graph, and it's a genuinely different problem from the pattern-matching
this course has covered so far. GDS provides real, well-established pathfinding algorithms for
it — most importantly Dijkstra's algorithm and A* — and they underpin real systems you use every
day, from GPS routing to network analysis.

## What you'll learn

- Dijkstra's algorithm: shortest weighted path between two nodes
- A*: Dijkstra with a heuristic to search faster toward a known target
- Real-world use cases: routing, network analysis, logistics
- Running a shortest-path query in GDS

## Dijkstra: shortest weighted path

Dijkstra's algorithm finds the lowest-total-weight path between a source and target node,
exploring outward from the source and always expanding the currently-cheapest known path first.
It's decades old (Edsger Dijkstra published it in 1959) and remains the standard algorithm for
weighted shortest-path problems — GDS ships it as a callable procedure:

```
MATCH (source:Location {name: 'Warehouse A'}),
      (target:Location {name: 'Store 12'})
CALL gds.shortestPath.dijkstra.stream('roadNetwork', {
  sourceNode: source,
  targetNode: target,
  relationshipWeightProperty: 'distanceKm'
})
YIELD totalCost, path
RETURN totalCost, path
```

`relationshipWeightProperty` tells Dijkstra which relationship property to treat as the "cost" of
traversing an edge — here, distance in kilometers, but it could just as easily be travel time,
latency, or a monetary cost, depending on what "shortest" should actually mean for the problem at
hand.

## A*: Dijkstra with a heuristic

A* (A-star) solves the same problem as Dijkstra but searches faster when you have a reasonable
estimate of how far you still are from the target — a heuristic. For geographic routing, that
heuristic is typically straight-line (haversine) distance to the destination: A* uses it to
prioritize exploring paths that seem to be heading toward the target, rather than expanding
uniformly outward in every direction the way Dijkstra does:

```
CALL gds.shortestPath.astar.stream('roadNetwork', {
  sourceNode: source,
  targetNode: target,
  relationshipWeightProperty: 'distanceKm',
  latitudeProperty: 'latitude',
  longitudeProperty: 'longitude'
})
YIELD totalCost, path
RETURN totalCost, path
```

A* returns the same optimal result as Dijkstra when the heuristic never overestimates the true
remaining distance, but it typically explores far fewer nodes to get there — the difference
matters most on large, sparse networks like real road maps.

## Real use cases

- **Routing** — GPS and logistics systems computing the fastest or shortest path across a road
  network, exactly the algorithm family behind real-world mapping software.
- **Network analysis** — finding the shortest path through a computer network or telecom
  topology, e.g. for latency-aware routing decisions.
- **Supply chain / logistics** — shortest or cheapest path through a network of warehouses,
  suppliers, and shipping routes, where edge weight might be cost or transit time rather than
  distance.
- **Social/organizational reachability** — "how many introductions would it take to connect
  these two people," using an unweighted shortest path.

## Weighted vs. unweighted, and single-pair vs. all-pairs

Not every relationship needs a weight — an unweighted shortest path (GDS's `bfs`/plain shortest
path procedures) just counts hops, useful for reachability questions like "how many degrees of
separation." GDS also offers all-pairs variants (like `allShortestPaths`) for when you need every
node's shortest path to every other node rather than a single source/target pair — useful for
network-wide analysis, though considerably more expensive to compute on a large graph.

## Key terms

| Term | Meaning |
|---|---|
| Dijkstra's algorithm | Finds the lowest-total-weight path between a source and target node in a weighted graph |
| A* | Dijkstra plus a heuristic estimate of remaining distance, typically faster on large sparse graphs |
| relationshipWeightProperty | The relationship property GDS treats as edge "cost" when computing a weighted shortest path |
| Heuristic | An estimate of remaining distance to the target, used by A* to prioritize which paths to explore first |

## Check yourself

Why does A* typically explore fewer nodes than Dijkstra to find the same optimal path, and what
does it need in order to do that?
