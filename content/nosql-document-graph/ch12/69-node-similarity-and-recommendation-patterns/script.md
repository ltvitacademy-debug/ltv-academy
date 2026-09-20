# Script — Node Similarity & Recommendation Patterns

## Segment 1 (title)

"Customers who bought this also bought" is one of the most commercially important graph queries in existence. It comes in two flavors — a real GDS similarity algorithm, and a plain Cypher traversal pattern that doesn't need GDS at all.

## Segment 2 (code: Jaccard similarity)

GDS most commonly uses Jaccard similarity — the size of two nodes' shared connections divided by the size of their combined connections. Two customers who bought the exact same products score a full 1.0; no overlap scores 0.

## Segment 3 (code: bought X also bought Y)

The simplest version of the recommendation pattern doesn't need GDS at all — it's a two-hop traversal: from the target customer, out to a product, back to other customers who bought it, then out to other products those customers bought, ranked by how many customers support each one.

## Segment 4 (steps: Jaccard vs cosine)

Jaccard treats every connection as binary overlap. Cosine similarity accounts for a weighted relationship like a star rating. In practice, teams often precompute similarity offline, write it back as a SIMILAR_TO relationship, then traverse it cheaply at request time.

## Segment 5 (outro)

Next up: tying the chapter together with real production use cases — fraud detection and recommendation engines.
