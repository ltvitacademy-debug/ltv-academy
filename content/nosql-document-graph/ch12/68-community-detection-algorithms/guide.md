# Community Detection Algorithms

Centrality answers "which nodes matter." Community detection answers a different question: "which
groups of nodes are more densely connected to each other than to the rest of the graph." These
clusters — communities — often correspond to something real: a social circle, a department, a
group of accounts colluding in fraud. GDS provides real, standard community detection
algorithms, most notably Louvain and Label Propagation.

## What you'll learn

- What community detection identifies, and why it's different from centrality
- Louvain: the standard modularity-based community detection algorithm
- Label Propagation: a faster, simpler alternative
- Real use cases: fraud ring detection, social network clustering

## Louvain: modularity-based clustering

Louvain is the most widely used community detection algorithm, optimizing a metric called
*modularity* — a measure of how much more densely connected nodes within proposed communities are
compared to what you'd expect from random chance. It works iteratively: nodes are first assigned
to their own tiny communities, then repeatedly merged into larger ones whenever doing so improves
modularity, producing a hierarchy of communities at different granularities:

```
CALL gds.louvain.stream('employeeGraph')
YIELD nodeId, communityId
RETURN gds.util.asNode(nodeId).name AS name, communityId
ORDER BY communityId
```

Louvain doesn't require you to specify how many communities to look for in advance — it discovers
both the number of communities and their membership from the graph's actual structure, which is
genuinely useful when you don't already know what the "natural" grouping should look like.

## Label Propagation: faster, simpler

Label Propagation Algorithm (LPA) takes a different, much cheaper approach: every node starts
with its own unique label, then repeatedly adopts the label most common among its neighbors,
propagating through the graph until labels stabilize into communities. It's significantly faster
than Louvain on very large graphs, at the cost of being somewhat less consistent — run it twice
and you can get slightly different community boundaries, since the propagation order has some
randomness to it:

```
CALL gds.labelPropagation.stream('employeeGraph')
YIELD nodeId, communityId
RETURN gds.util.asNode(nodeId).name AS name, communityId
ORDER BY communityId
```

The practical choice between the two: Louvain for higher-quality, more stable communities when
you can afford the extra computation; Label Propagation when you need something fast on a very
large graph and can tolerate a bit of run-to-run variance.

## Real use cases

- **Fraud ring detection** — accounts that transact heavily with each other but rarely with the
  rest of the network often form a detectable community; this is a real, established technique
  in financial fraud analytics (explored further in the last lesson of this chapter).
- **Social network clustering** — identifying friend groups, interest communities, or
  organizational sub-teams that emerge from connection patterns rather than explicit labels.
- **Product/content grouping** — clustering products frequently bought together, or content
  frequently consumed by the same users, as an input to recommendation systems.

## Key terms

| Term | Meaning |
|---|---|
| Community detection | Identifies groups of nodes more densely connected to each other than to the rest of the graph |
| Modularity | A metric measuring how much more densely connected a proposed community is than random chance would predict |
| Louvain | Modularity-optimizing community detection algorithm; discovers community count and membership automatically |
| Label Propagation (LPA) | Faster, simpler community detection where nodes adopt their most common neighboring label iteratively |

## Check yourself

Why might a team choose Label Propagation over Louvain for a very large graph, and what real
tradeoff comes with that choice?
