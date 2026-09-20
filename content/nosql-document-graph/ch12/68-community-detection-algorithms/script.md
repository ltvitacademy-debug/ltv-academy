# Script — Community Detection Algorithms

## Segment 1 (title)

Centrality answers which nodes matter. Community detection answers a different question — which groups of nodes are more densely connected to each other than to the rest of the graph. Those clusters often correspond to something real, like a social circle or a fraud ring.

## Segment 2 (code: Louvain)

Louvain is the most widely used community detection algorithm, optimizing a metric called modularity. It works iteratively, merging small communities into larger ones whenever that improves modularity, and it discovers both the number of communities and their membership on its own.

## Segment 3 (code: Label Propagation)

Label Propagation takes a cheaper approach — every node starts with its own label, then repeatedly adopts the label most common among its neighbors until labels stabilize. It's significantly faster than Louvain on huge graphs, at the cost of some run-to-run variance.

## Segment 4 (steps: use cases)

Fraud ring detection finds accounts that transact heavily with each other but rarely with the rest of the network. Social network clustering finds friend groups and interest communities. Product grouping clusters items frequently bought together.

## Segment 5 (outro)

Next up: node similarity and recommendation patterns — Jaccard similarity and a real graph-traversal recommendation query.
