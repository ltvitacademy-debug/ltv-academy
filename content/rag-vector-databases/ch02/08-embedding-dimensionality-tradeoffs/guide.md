# Lesson 8 — Embedding Dimensionality Trade-offs

**Chapter 2 · Embeddings Deep Dive · Lesson 8 of 31**

## What you'll learn

- What "dimensionality" costs you in storage and compute, with real numbers
- Why bigger isn't simply "better" — the actual trade-off involved
- What Matryoshka Representation Learning (MRL) is, and why it matters for this trade-off
- How to reason about picking a dimensionality for a real project

## The trade-off in one sentence

Higher-dimensional embeddings can encode more semantic nuance, but every stored vector takes more memory and every similarity comparison takes more compute — the question is never "is bigger better," it's "do I need the nuance enough to pay for it."

## Real numbers: storage cost

A single embedding is typically stored as 32-bit floats (4 bytes each). The storage cost per vector is simply `dimensions × 4 bytes`:

```
384 dimensions  ->  384 × 4 bytes  =  1,536 bytes  (~1.5 KB)
1536 dimensions ->  1536 × 4 bytes =  6,144 bytes  (~6 KB)
3072 dimensions ->  3072 × 4 bytes = 12,288 bytes  (~12 KB)
```

That looks small per vector — but multiply by the number of chunks in a real collection:

```
1,000,000 chunks x 1,536 dimensions x 4 bytes
  = 6,144,000,000 bytes
  ≈ 6.1 GB just for the raw vectors
```

Go to 3072 dimensions on the same million chunks and that becomes roughly 12.3 GB — before accounting for the index structure itself (Lesson 12 covers HNSW/IVF, which add their own overhead on top of raw vector storage) or any metadata stored alongside each vector.

## Real cost: compute

Computing cosine similarity (or dot product) between two vectors is proportional to the number of dimensions — comparing two 3072-dimension vectors takes roughly twice the multiply-and-sum work of comparing two 1536-dimension vectors. At query time, that cost gets paid on every single comparison the search performs, which matters a lot more once you're searching millions of vectors than when you're searching a few thousand.

## So why not always pick the smallest dimension?

Because dimensionality is also capacity. A very low-dimensional embedding (say, 128) has fewer "slots" to encode distinctions in meaning — it can start to blur together concepts that a higher-dimensional model would keep separably distinct, which shows up as worse retrieval quality: more irrelevant chunks ranked highly, more relevant chunks missed. The right dimensionality is the smallest one that still gives acceptable retrieval quality for your specific content and queries — not the smallest possible, and not the largest available.

## Matryoshka Representation Learning (MRL)

Several modern embedding models (OpenAI's `text-embedding-3` family among them) are trained with **Matryoshka Representation Learning**, which produces vectors where the *first* N dimensions are themselves a meaningful, usable embedding — you can truncate a 3072-dimension vector down to, say, its first 512 dimensions and still get a coherent (if somewhat lower-quality) embedding, without re-running the model. This gives you a dial: start with the full dimensionality for best quality, and truncate down for storage/speed if your evaluation shows the quality loss is acceptable, instead of being locked into one fixed size.

## Key terms

| Term | Meaning |
|---|---|
| Dimensionality | The number of values in an embedding vector |
| Storage cost | dimensions × 4 bytes (for 32-bit float vectors) per stored vector |
| Matryoshka Representation Learning (MRL) | A training technique where truncating a vector's first N dimensions still produces a usable embedding |
| Capacity | How much semantic distinction a given dimensionality can represent |

## Lab

1. Using the formula `dimensions × 4 bytes`, calculate the raw storage cost for 500,000 chunks at 768 dimensions.
2. Recalculate for the same 500,000 chunks at 1536 dimensions, and note the difference.
3. Write one sentence on when you'd accept that extra cost, and one sentence on when you wouldn't.

## Check yourself

You're ready for Lesson 9 when you can explain what Matryoshka Representation Learning lets you do that a normally-trained embedding model doesn't.
