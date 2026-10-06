# Script — Vector Database Concepts

## Segment 1 (title)

A vector database is purpose-built to answer one specific question fast: which stored vectors are closest to this query vector. That's a fundamentally different core operation than a relational database's exact matches and range queries.

## Segment 2 (steps: the core operations)

Every vector database supports the same handful of operations. Create a collection, defining the dimensionality and distance metric upfront. Upsert vectors, adding embedded chunks with their original text and metadata. Query with a vector to get the top-k closest matches back. Delete vectors that are no longer needed.

## Segment 3 (screenshot: Qdrant's real console)

Here's Qdrant's own cloud console, open to its Console tab, running exactly those operations — a GET collections call listing what exists, and a PUT call creating a new collection with its vector size and distance metric defined right there, at creation time.

## Segment 4 (steps: why the metric is set at creation)

Notice the distance metric is part of the collection's definition, set once, not chosen freely per query. That connects directly back to similarity metrics — the embedding model's trained metric needs to match what the collection is configured to use, and that configuration happens exactly once.

## Segment 5 (outro)

Every vendor's console looks different, but they're all built around this same handful of operations. Next lesson: a tour of the popular vector databases themselves — Pinecone, Weaviate, Qdrant, Chroma, and more.
