# Script — Real-World Use Cases: Fraud Detection & Recommendations

## Segment 1 (title)

This chapter covered GDS's algorithm families one at a time. Real production systems rarely use just one. This closing lesson ties them together around the two use cases graph databases are most genuinely known for: fraud detection and recommendation engines.

## Segment 2 (code: fraud detection)

Fraud rings deliberately spread activity across many accounts to avoid per-account thresholds. Community detection finds clusters that transact heavily with each other but rarely with the broader network. Centrality inside that suspicious cluster then identifies the likely organizer or mule account — a much stronger signal than either metric alone.

## Segment 3 (code: recommendations)

Real recommendation engines layer node similarity, computed offline via GDS, with traversal at request time. Similarity gets written back as SIMILAR_TO relationships; then a cheap traversal through those edges surfaces concrete product recommendations, fast, because the expensive computation already happened offline.

## Segment 4 (steps: why graphs win)

Both use cases share the same underlying reason graphs work well: the signal isn't in any single row's attributes, it's in the shape of the connections around it. A relational query can approximate this with enough joins, but a graph database represents that shape natively, with tested algorithms instead of hand-rolled heuristics.

## Segment 5 (outro)

That closes out graph algorithms. Next up, starting Chapter Thirteen: Neo4j authentication and role-based access control — securing a production graph database.
