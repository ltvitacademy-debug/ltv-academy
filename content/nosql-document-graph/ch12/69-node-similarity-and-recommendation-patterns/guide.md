# Node Similarity & Recommendation Patterns

"Customers who bought this also bought..." is one of the most commercially important graph
queries in existence, and it comes in two real flavors: a genuine GDS similarity algorithm that
scores how alike two nodes are based on shared connections, and a plain Cypher traversal pattern
that doesn't need GDS at all. Both are covered here, because production recommendation systems
often use both together.

## What you'll learn

- Jaccard similarity: how GDS measures node similarity from shared connections
- Cosine similarity as an alternative measure, and when it's preferred
- The classic "customers who bought X also bought Y" pattern as plain Cypher traversal
- Combining similarity scoring with traversal in a real recommendation query

## Jaccard similarity: shared connections as a fraction

GDS's node similarity procedures most commonly use Jaccard similarity: the size of the
*intersection* of two nodes' connections divided by the size of the *union* of those
connections. Two customers who bought exactly the same five products score a Jaccard similarity
of 1.0; two customers with no products in common score 0.0; partial overlap lands somewhere in
between:

```
CALL gds.nodeSimilarity.stream('customerProductGraph')
YIELD node1, node2, similarity
RETURN gds.util.asNode(node1).name AS customer1,
       gds.util.asNode(node2).name AS customer2,
       similarity
ORDER BY similarity DESC
LIMIT 10
```

This runs across every pair of customer nodes connected to products (through, say, a `PURCHASED`
relationship) and scores how similar their purchase sets are — the direct graph-native version of
collaborative filtering.

## Cosine similarity: when magnitude matters

GDS also supports cosine similarity, which is preferred when the relationships carry a numeric
weight that matters — for example, a `RATED` relationship with a star rating, not just a binary
"did they interact." Cosine similarity measures the angle between two nodes' weighted connection
vectors rather than treating every connection as equally binary, so it captures "these two users
rate similar things similarly," not just "these two users touched the same items":

```
CALL gds.nodeSimilarity.stream('customerProductGraph', {
  relationshipWeightProperty: 'rating',
  similarityMetric: 'COSINE'
})
YIELD node1, node2, similarity
RETURN gds.util.asNode(node1).name AS customer1,
       gds.util.asNode(node2).name AS customer2, similarity
```

## The classic pattern: plain Cypher, no GDS required

The simplest version of "customers who bought X also bought Y" doesn't need GDS at all — it's a
two-hop traversal expressible directly in Cypher:

```
MATCH (target:Customer {name: 'Priya Nair'})-[:PURCHASED]->(:Product)
      <-[:PURCHASED]-(other:Customer)-[:PURCHASED]->(rec:Product)
WHERE NOT (target)-[:PURCHASED]->(rec)
RETURN rec.name, count(*) AS strength
ORDER BY strength DESC
LIMIT 5
```

This walks from the target customer, out to a product they bought, back in to other customers who
also bought it, then out to *other* products those customers bought — excluding products the
target has already purchased — and ranks candidates by how many co-purchasing customers support
them. This is a real, production-viable recommendation pattern on its own, no algorithm library
required, because it's expressing the recommendation logic entirely as a graph pattern.

## Combining both in practice

Real systems often layer these: use node similarity (Jaccard or cosine) to precompute which
customers are "alike," write those scores back as relationships (`SIMILAR_TO`), then use a plain
Cypher traversal through those `SIMILAR_TO` edges at request time — fast, because the expensive
similarity computation already ran offline, and the request-time query is just a cheap traversal.

## Key terms

| Term | Meaning |
|---|---|
| Jaccard similarity | Intersection of two nodes' connections divided by their union — a 0 to 1 similarity score |
| Cosine similarity | Measures the angle between weighted connection vectors; preferred when relationships carry meaningful weights |
| Collaborative filtering | Recommending items based on what similar users/entities interacted with |
| Two-hop traversal pattern | A plain Cypher pattern (product → other customers → other products) implementing "bought X also bought Y" without GDS |

## Check yourself

Why would a recommendation system use cosine similarity instead of Jaccard similarity when the
underlying relationships carry a star rating?
