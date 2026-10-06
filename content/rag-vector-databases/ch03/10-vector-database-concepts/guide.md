# Lesson 10 — Vector Database Concepts

**Chapter 3 · Vector Databases · Lesson 10 of 31**

## What you'll learn

- What a vector database actually is, and how it differs from a relational database
- The core operations every vector database supports
- What a "collection" (or "index") is, and why the distance metric is set when it's created
- A real look at a vector database's own console running these operations

## What a vector database actually is

A **vector database** is a database purpose-built to store embedding vectors and answer one specific kind of question extremely fast: "which stored vectors are closest to this query vector?" That's a fundamentally different core operation than a relational database's. A relational database is built around exact matches and range queries over structured columns (`WHERE price > 100`); a vector database is built around **approximate nearest-neighbor (ANN) search** — finding the most similar vectors by distance, not an exact match. Lesson 12 covers exactly how that search is made fast at scale (HNSW and IVF indexing); this lesson covers what you're actually doing before and during that search.

## The core operations

Every vector database, regardless of vendor, supports the same handful of operations:

- **Create a collection** (sometimes called an index): define upfront the vector dimensionality and the distance metric (cosine, dot product, or Euclidean — Lesson 7) it will use.
- **Upsert** (insert or update) vectors: add new embedded chunks, each one typically stored with its original text and metadata alongside the vector itself.
- **Query / search**: given a query vector, return the top-k closest stored vectors.
- **Delete**: remove vectors that are no longer needed (a document was deleted or updated).

This is the exact "store the vectors" and "search by similarity" half of the RAG architecture from Lesson 3 — a vector database is the concrete implementation of what Lesson 3 called the vector store.

## A real console, running these operations

Vector databases aren't just an API — most ship with a real web console for inspecting and testing collections directly. Here's Qdrant's own console, open to its **Console** tab, running exactly the two operations just described:

![Qdrant's cloud console, open to the Console tab, showing a REST request editor on the left with two calls — GET collections, and PUT collections/demo1 creating a new collection with vector size 1 and Cosine distance — and the JSON response on the right showing status ok.](/courses/rag-vector-databases/ch03/10-vector-database-concepts/qdrant-dashboard-console.png)
*The `PUT collections/demo1` call on the left is creating a collection — note the distance metric ("Cosine") is set right here, at creation time, not changed later per-query.*
Source: [Qdrant Documentation — Web UI](https://qdrant.tech/documentation/web-ui/)

This is the same console you'd use to run the `GET collections` call shown above it, which simply lists what already exists. Every vector database's console looks different, but all of them are built around this same handful of operations — create, upsert, query, delete.

## Why the metric is set at creation, not per-query

Notice the distance metric is part of the collection's definition, set once when it's created — it isn't something you choose freely on every individual query. This connects directly back to Lesson 7: the embedding model's trained similarity metric needs to match what the collection was configured to use, and that configuration happens exactly once, at the point in this screenshot.

## Key terms

| Term | Meaning |
|---|---|
| Vector database | A database purpose-built to store vectors and answer nearest-neighbor similarity queries |
| Collection / index | A named container in a vector database with a fixed dimensionality and distance metric |
| Upsert | Insert a new vector, or update it if one with the same ID already exists |
| ANN search | Approximate nearest-neighbor search — finding the closest vectors fast, without checking every one exactly |

## Lab

1. Write out, in your own words, the four core operations every vector database supports.
2. For each operation, name one thing in a RAG pipeline that would trigger it (e.g., "a new document is ingested" triggers an upsert).
3. If you have access to any vector database's console (Qdrant, or another), try running a `GET collections` style call and see what it returns.

## Check yourself

You're ready for Lesson 11 when you can explain why the distance metric is configured once, at collection creation, rather than chosen per query.
