# Lesson 14 — Hybrid Search: Vector + Keyword

**Chapter 3 · Vector Databases · Lesson 14 of 31**

## What you'll learn

- What dense (semantic) search misses, and what sparse (keyword) search misses
- How hybrid search runs both and fuses the results into one ranked list
- Reciprocal Rank Fusion (RRF), worked through with real numbers
- A real diagram, from a vector database's own documentation, showing the idea

## What dense search misses

Every search so far in this course has been **dense vector search**: embed the query, find the
closest stored embeddings (Lessons 10–12), optionally narrow by metadata (Lesson 13). It's
excellent at *semantic* matching — "cancel my subscription" retrieves a chunk about "ending your
plan" even with no shared words. But that same strength is also a weakness: an embedding model
smooths meaning together, so it can under-rank a chunk containing an exact product code, a rare
acronym, or a specific name, if nothing in the surrounding text looked semantically close enough
to the query.

## What sparse (keyword) search gets right instead

**Sparse search** — classic keyword/full-text search, scored with something like BM25 — is the
opposite: it's built entirely around exact and near-exact term matches. It will reliably surface
the one document that contains the literal string "X200" when your query includes it, something
dense search can miss. What it loses is paraphrase and meaning: it won't connect "cancel my
subscription" to "ending your plan" if the two share no overlapping words.

## Hybrid search: run both, then fuse

**Hybrid search** runs a dense search and a sparse search against the same query at the same
time, then **fuses** the two ranked lists into one. Here's the idea, from Qdrant's own
documentation:

![A diagram showing two ranked result lists, "Dense Results" (blue dots) and "Sparse Results" (green dots), both pointing down through a "Fusion" step into a single combined "Mixture" list containing both blue and green dots interleaved.](/courses/rag-vector-databases/ch03/14-hybrid-search/qdrant-hybrid-fusion-diagram.png)
*Two independent rankings — one semantic, one keyword — merged into a single list that benefits from both.*
Source: [Qdrant Documentation — Hybrid Queries](https://qdrant.tech/documentation/search/hybrid-queries/)

## Reciprocal Rank Fusion, worked through

The most common fusion method is **Reciprocal Rank Fusion (RRF)**: instead of trying to compare
a cosine similarity score to a BM25 score directly — two numbers on completely different
scales — RRF only looks at each document's *rank* (1st, 2nd, 3rd...) in each list, and scores it
as `1 / (k + rank)`, where `k` is a constant (commonly 60) that keeps any single ranking from
dominating. A document's final score is the sum of that formula across every list it appears in:

```
RRF score = sum of 1 / (k + rank), k = 60

doc_B: dense rank 3, keyword rank 1
  1/63 + 1/61 = 0.0323

doc_A: dense rank 1, keyword rank 4
  1/61 + 1/64 = 0.0320
```

Notice `doc_B` edges out `doc_A` here — even though `doc_A` was the single *best* dense match,
`doc_B` did well in both lists, and RRF rewards showing up high in more than one ranking over
being the single top result in just one. This is exactly why hybrid search catches what pure
dense search alone would have ranked lower.

## The other common approach: weighted blending

Some databases instead normalize the dense and sparse scores onto the same 0–1 scale and combine
them with a weight (often called `alpha`): `alpha = 1` is pure vector search, `alpha = 0` is pure
keyword search, and anything between blends the two directly rather than fusing by rank. Either
approach — RRF or weighted blending — is doing the same conceptual job: giving a document credit
for appearing anywhere in both the semantic and the keyword ranking.

## Key terms

| Term | Meaning |
|---|---|
| Dense search | Embedding-based nearest-neighbor search — strong on meaning, weaker on exact terms |
| Sparse / keyword search | Term-based search (e.g., BM25) — strong on exact terms, weaker on paraphrase |
| Fusion | Merging two independently ranked result lists into one combined ranking |
| RRF | Reciprocal Rank Fusion — scores each result by `1 / (k + its rank)` in each list, then sums |

## Lab

1. Using the RRF formula above with `k = 60`, compute the score for a document ranked 2nd in the
   dense list and 2nd in the sparse list.
2. Describe, in your own words, a real query where exact keyword matching would matter more than
   semantic similarity — what would pure dense search likely miss?
3. Explain why RRF compares *ranks* instead of comparing the raw dense and sparse scores directly.

## Check yourself

You're ready for Lesson 15 when you can compute a simple RRF score by hand and explain, in one
sentence, why a document that's merely "good" in two rankings can outscore one that's "best" in
only one.
