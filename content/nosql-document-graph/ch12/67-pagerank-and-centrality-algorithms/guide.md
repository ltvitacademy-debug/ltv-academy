# PageRank & Centrality Algorithms

Shortest-path algorithms answer "how do I get from A to B." Centrality algorithms answer a
different question entirely: "which nodes in this graph actually matter?" PageRank — originally
built by Google's founders to rank web pages — is the most famous centrality algorithm and ships
as a standard GDS procedure, alongside other real centrality measures like betweenness and
degree centrality.

## What you'll learn

- PageRank: what it measures and where it came from
- Betweenness centrality: nodes that sit on the most shortest paths
- Degree centrality: the simplest centrality measure
- Real use cases: influence ranking, identifying key nodes in a network

## PageRank: influence through incoming connections

PageRank was developed by Larry Page and Sergey Brin at Stanford and became the original ranking
algorithm behind Google Search. Its core idea: a node is important if it's linked to by other
important nodes — importance flows through the graph via relationships, recursively, until scores
converge. In GDS:

```
CALL gds.pageRank.stream('employeeGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
LIMIT 10
```

Outside web search, PageRank generalizes to any graph where "being pointed to by important
things" is a meaningful signal — a citation network (papers cited by frequently-cited papers rank
higher), a recommendation graph, or an organizational graph (people frequently referenced or
relied on by other well-connected people).

## Betweenness centrality: the nodes that connect everything

Betweenness centrality measures how often a node sits on the shortest path between other pairs of
nodes. A node with high betweenness isn't necessarily well-connected itself — it's a *bridge*
that many shortest paths have to pass through, meaning its removal would disconnect or lengthen
paths for a lot of the rest of the graph:

```
CALL gds.betweenness.stream('employeeGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
```

This is genuinely different from PageRank: a node can have very few direct connections but still
score high on betweenness if it's the sole bridge between two otherwise-separate parts of the
graph — think of the one person on a team who's the only connection between engineering and
sales.

## Degree centrality: the simplest measure

Degree centrality is just a count of how many relationships a node has — no traversal or
iteration required, making it the cheapest centrality measure to compute:

```
CALL gds.degree.stream('employeeGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC
```

It's a blunt instrument compared to PageRank or betweenness — it doesn't account for *which*
nodes you're connected to, only how many — but it's often the right first check, and it's cheap
enough to compute on very large graphs where more expensive measures aren't practical.

## Real use cases

- **Influence ranking** — identifying the most influential accounts in a social graph, the most
  cited papers in a citation network, or the most relied-upon services in a dependency graph.
- **Identifying key/bridge nodes** — betweenness centrality is the standard tool for finding
  single points of failure or critical connectors in a network, whether that's a computer
  network, a supply chain, or an org structure.
- **Fraud/anomaly signals** — an unusually high centrality score on an account that shouldn't be
  central (covered in more depth in this chapter's fraud-detection lesson) can itself be a
  red flag.

## Key terms

| Term | Meaning |
|---|---|
| PageRank | Ranks nodes by importance, where importance flows recursively from being linked to by other important nodes |
| Betweenness centrality | Measures how often a node lies on the shortest path between other node pairs — identifies bridges |
| Degree centrality | Counts a node's direct relationships — the simplest and cheapest centrality measure |
| Centrality | A family of algorithms measuring how "important" or "central" a node is within a graph, by different definitions |

## Check yourself

A node has very few direct connections but scores extremely high on betweenness centrality.
What does that tell you about its role in the graph, and how is that different from a high
PageRank score?
