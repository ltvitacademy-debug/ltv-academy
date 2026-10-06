# Lesson 7 — Similarity Metrics: Cosine, Dot Product & Euclidean

**Chapter 2 · Embeddings Deep Dive · Lesson 7 of 31**

## What you'll learn

- The three similarity/distance metrics used to compare embedding vectors
- A full worked example computing cosine similarity by hand on real numbers
- Exactly how cosine similarity differs from dot product, and why that difference matters
- Which metric to pick, and why it has to match what the embedding model was trained with

## Three ways to compare two vectors

**Cosine similarity** measures the angle between two vectors, ignoring their length (magnitude) entirely. It ranges from -1 (opposite direction) to 1 (identical direction), with 0 meaning perpendicular/unrelated. Because it ignores magnitude, two vectors pointing the same direction score a perfect 1.0 even if one is much "longer" than the other.

**Dot product** multiplies corresponding components of two vectors and sums the results. It's closely related to cosine similarity but is also directly affected by each vector's magnitude — a longer vector can produce a higher dot product even if it doesn't point in a more similar direction.

**Euclidean distance** measures the straight-line distance between the two points the vectors represent. Unlike the other two, lower means *more* similar (zero distance = identical points), and it's sensitive to magnitude.

## A full worked example: cosine similarity by hand

Take two small 3-dimensional vectors (standing in for real embeddings):

```
A = [1, 2, 3]
B = [2, 4, 5]
```

**Step 1 — dot product** (multiply matching positions, then sum):

```
A · B = (1×2) + (2×4) + (3×5)
      = 2 + 8 + 15
      = 25
```

**Step 2 — magnitude of each vector** (square root of the sum of squares):

```
|A| = sqrt(1² + 2² + 3²) = sqrt(1+4+9)  = sqrt(14)  ≈ 3.742
|B| = sqrt(2² + 4² + 5²) = sqrt(4+16+25) = sqrt(45)  ≈ 6.708
```

**Step 3 — cosine similarity** (dot product divided by the product of the magnitudes):

```
cos_sim(A, B) = 25 / (3.742 × 6.708)
              = 25 / 25.10
              ≈ 0.996
```

A cosine similarity of 0.996 is extremely close to 1, meaning these two vectors point in almost exactly the same direction — in an embedding space, that would mean two pieces of text with very similar meaning, even though B's raw numbers are noticeably larger than A's.

## Why the normalization matters

Notice that the *raw dot product* (25) by itself tells you very little in isolation — is 25 "high" or "low"? It depends entirely on how large the vectors are. Cosine similarity's division by both magnitudes is what turns that raw number into something bounded and comparable (-1 to 1) regardless of vector length. That's exactly why dot product alone can mislead: a vector that's simply "longer" (larger magnitude) can produce a bigger dot product without actually being more similar in direction/meaning.

## When dot product is still the right choice

Many production vector databases default to dot product, not because it's "better" in general, but because of a shortcut: if every vector is pre-normalized to length 1 (a common preprocessing step called **L2 normalization**), dot product and cosine similarity produce identical rankings — and dot product is computationally cheaper, since it skips the magnitude division. Several embedding models (OpenAI's included) output vectors that are already normalized, which is exactly why dot product shows up as the configured metric so often in practice.

## The metric must match the model

Embedding models are typically trained and evaluated using one specific similarity metric. Using a different one at query time doesn't just produce a different-looking score — it can genuinely change which chunks rank highest, because the model's own training never optimized vectors to behave well under a different metric. Always use the metric the model's documentation recommends.

## Key terms

| Term | Meaning |
|---|---|
| Cosine similarity | The angle-based similarity between two vectors, ranging -1 to 1, ignoring magnitude |
| Dot product | Sum of the products of matching vector components; affected by magnitude |
| Euclidean distance | Straight-line distance between two vector points; lower means more similar |
| L2 normalization | Rescaling a vector to length 1, after which dot product and cosine similarity agree |
| Magnitude | A vector's length, computed as the square root of the sum of its squared components |

## Lab

1. By hand or with a calculator, compute the cosine similarity of `A = [1, 0, 1]` and `B = [0, 1, 1]`.
2. Compute the dot product of the same two vectors and compare what each number tells you.
3. Normalize both vectors to length 1 (divide each by its own magnitude) and recompute the dot product — confirm it now matches the cosine similarity you calculated.

## Check yourself

You're ready for Lesson 8 when you can explain, without notes, why cosine similarity divides the dot product by both vectors' magnitudes.
