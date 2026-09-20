# Real-World Use Cases: Fraud Detection & Recommendations

This chapter covered GDS's algorithm families one at a time — pathfinding, centrality, community
detection, similarity. Real production systems rarely use just one. This closing lesson ties
them together around the two use cases graph databases are most genuinely known for in industry:
fraud detection and recommendation engines, both built by combining several of the algorithms
this chapter introduced.

## What you'll learn

- How fraud detection combines community detection and centrality, not either alone
- Why graph-native fraud detection catches patterns relational queries genuinely miss
- How recommendation engines combine similarity scoring and traversal
- Why these two use cases specifically are where graph databases have the strongest track record

## Fraud detection: community detection + centrality together

A single suspicious transaction is hard to catch relationally — fraud rings deliberately spread
activity across many accounts to avoid tripping simple per-account thresholds. Graph-native fraud
detection instead looks at *structure*:

1. **Community detection (Louvain or Label Propagation)** finds clusters of accounts that
   transact heavily with each other but rarely connect to the broader legitimate network — the
   structural signature of a coordinated ring rather than independent customers.
2. **Centrality (degree or betweenness)** within a suspicious cluster identifies the ring's likely
   organizer or a shared "mule" account that many transactions route through — a node with
   unusually high centrality *inside a suspicious community* is a stronger signal than either
   metric alone.

```
CALL gds.louvain.write('transactionGraph', {
  writeProperty: 'fraudCommunity'
})
YIELD communityCount

MATCH (a:Account)
WHERE a.fraudCommunity IS NOT NULL
WITH a.fraudCommunity AS community, count(a) AS memberCount
WHERE memberCount > 4
MATCH (a:Account {fraudCommunity: community})-[t:TRANSFERRED]-(b:Account)
RETURN community, count(t) AS internalTransferDensity
ORDER BY internalTransferDensity DESC
```

This is a real, established pattern in financial fraud analytics: dense, insular communities plus
unusually central nodes inside them are far harder to fabricate than a single account's individual
transaction pattern, which is exactly why relational systems — built around evaluating rows
independently — struggle to catch coordinated fraud that a graph traversal surfaces naturally.

## Recommendation engines: similarity + traversal together

A real recommendation engine layers the two techniques from the previous lesson rather than
choosing one:

1. **Node similarity (Jaccard or cosine)**, computed periodically offline via GDS, identifies
   which customers have genuinely similar behavior and writes that as `SIMILAR_TO` relationships.
2. **Traversal at request time** walks from the current customer through `SIMILAR_TO` to similar
   customers, then through their purchases, to surface concrete product recommendations — fast,
   because the expensive similarity computation already happened offline.

```
MATCH (c:Customer {name: 'Priya Nair'})-[:SIMILAR_TO]->(similar:Customer)
MATCH (similar)-[:PURCHASED]->(rec:Product)
WHERE NOT (c)-[:PURCHASED]->(rec)
RETURN rec.name, count(*) AS recommendationStrength
ORDER BY recommendationStrength DESC
LIMIT 5
```

This is the same structural pattern used by major e-commerce and streaming recommendation
systems: precompute similarity as a graph relationship, then serve recommendations as a cheap,
low-latency traversal rather than recomputing similarity on every page load.

## Why these two use cases specifically

Both fraud detection and recommendations share the same underlying reason graphs work well for
them: the signal that matters isn't in any single row's attributes, it's in the *shape of the
connections* around that row — who a suspicious account transacts with, or which other customers
a shopper resembles. A relational query can approximate this with enough joins and window
functions, but a graph database represents that shape natively, and GDS gives you established,
tested algorithms (not hand-rolled heuristics) for extracting it.

## Key terms

| Term | Meaning |
|---|---|
| Fraud ring | A cluster of accounts coordinating fraudulent activity, structurally detectable via community detection |
| Mule account | An account many fraudulent transactions route through, often detectable via high centrality inside a suspicious community |
| SIMILAR_TO relationship | A precomputed edge storing a similarity score, enabling fast traversal-based recommendations at request time |
| Structural signal | A pattern detectable from the shape of connections around a node, not from that node's attributes alone |

## Check yourself

Why does combining community detection with centrality catch fraud rings that neither technique
would reliably catch on its own?
