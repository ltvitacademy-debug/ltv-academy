# Script — Document, Key-Value, Column-Family & Graph Models Compared

## Segment 1 (title)

"NoSQL" isn't one thing — it's an umbrella over four genuinely different ways of organizing data, each with real strengths. This lesson compares document, key-value, column-family, and graph honestly, not as a marketing pitch for any of them.

## Segment 2 (steps: four families, four real jobs)

Key-value, like Redis, maps a key to an opaque value — great for caching and sessions, but no visibility into the value's structure. Document databases like MongoDB store queryable nested objects — catalogs, profiles. Column-family stores like Cassandra handle massive write throughput for IoT and time-series data. Graph databases like Neo4j make relationships first-class — fraud detection, recommendations.

## Segment 3 (code: document vs. key-value)

A key-value store gets you an opaque blob back — no visibility into what's inside. A document database can query directly on internal fields, like status equals active and age greater than thirty, and MongoDB indexes those fields directly. That queryability is the real structural difference.

## Segment 4 (code: graph relationships)

In a relational database, finding friends-of-friends means chaining JOINs, which gets expensive fast. In Neo4j, using Cypher, that same traversal is a fast, local walk across stored relationships — not a JOIN chain reconstructed at query time.

## Segment 5 (outro)

This course focuses on three of the four families — document, multi-model, and graph — because they require the deepest ongoing design discipline. Next up: setting up your own MongoDB, Neo4j, and Cosmos DB lab environment.
