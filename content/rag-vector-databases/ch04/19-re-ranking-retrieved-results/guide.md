# Lesson 19 — Re-Ranking Retrieved Results

**Chapter 4 · Building a RAG Pipeline · Lesson 19 of 31**

## What you'll learn

- Why vector similarity and "actual relevance" aren't quite the same thing
- What a re-ranker model does differently from the vector search that feeds it
- A real re-ranking API call, with its real request and response shape
- Where re-ranking fits in the pipeline — and why it runs on a wider candidate set

## Similarity isn't quite relevance

Lesson 18 was explicit about what a vector search guarantees: chunks whose *embedded meaning* is closest to the query's. In practice, that's a very good approximation of relevance — but not a perfect one. Vector similarity is computed once per chunk, independently, with no awareness of the specific query it'll eventually be compared against at search time beyond that one embedding comparison. Two chunks can score similarly close to a query while one of them actually answers it and the other only shares vocabulary with it.

## What a re-ranker does differently

A **re-ranker** (sometimes called a cross-encoder) takes the query and a candidate chunk *together*, as a single input, and scores how relevant that specific pairing is — rather than comparing two independently-computed vectors. That joint comparison is more accurate at judging true relevance, but also far more expensive: it can't be pre-computed and stored the way chunk embeddings can, because it has to be run fresh for every query/chunk pair. That's exactly why re-ranking runs *after* vector search, not instead of it: vector search cheaply narrows millions of chunks down to a short candidate list, and the re-ranker spends its more expensive, more accurate judgment only on that short list.

## A real re-ranking call

Here's the real request shape for Cohere's Rerank API, one of the most widely used re-ranking services:

```json
POST https://api.cohere.com/v2/rerank
{
  "model": "rerank-v4.0-pro",
  "query": "What is the cancellation policy?",
  "documents": ["...chunk 1 text...", "...chunk 2 text...", "..."],
  "top_n": 5
}
```

`documents` is the candidate list retrieval already narrowed things down to — typically the top 20–50 chunks from vector search, not the whole collection. `top_n` is how many of those the re-ranker should return after scoring.

The response reorders that candidate list by actual relevance:

```json
{
  "results": [
    { "index": 1, "relevance_score": 0.97 },
    { "index": 0, "relevance_score": 0.31 }
  ]
}
```

`index` refers back to the position in the original `documents` array — so `index: 1` means the *second* document sent in was actually the most relevant, even if vector search had ranked it lower. `relevance_score` is normalized between 0 and 1, and it's typically a much sharper signal than raw vector similarity: a genuinely relevant document often scores well above 0.9, while an irrelevant one that only shared vocabulary can drop below 0.3.

## Where this fits in the pipeline

The order matters: vector search (Lesson 18) retrieves a wider candidate set cheaply, re-ranking narrows and reorders that set accurately, and only *then* does the smaller, better-ordered result move on to prompt assembly (Lesson 20). Running the re-ranker on the whole collection instead of a pre-narrowed candidate list would work, but at a cost and latency that makes it impractical at any real scale.

## Key terms

| Term | Meaning |
|---|---|
| Re-ranker / cross-encoder | A model that scores a query and a candidate together, rather than comparing independent vectors |
| Candidate list | The top N results from vector search, handed to the re-ranker for a second, more accurate pass |
| `relevance_score` | A re-ranker's 0-1 output representing how relevant a document actually is to the query |

## Lab

1. In your own words, explain why a re-ranker can't simply replace vector search and run against the full collection.
2. In the example response above, explain what `index: 1` tells you about the original `documents` array.
3. Describe a case where two chunks might score similarly in vector search but very differently once re-ranked.

## Check yourself

You're ready for Lesson 20 when you can explain, specifically, why re-ranking happens *after* vector search rather than before or instead of it.
