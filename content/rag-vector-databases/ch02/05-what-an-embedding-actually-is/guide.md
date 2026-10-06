# Lesson 5 — What an Embedding Actually Is

**Chapter 2 · Embeddings Deep Dive · Lesson 5 of 31**

## What you'll learn

- A precise, technical definition of a text embedding
- Why embeddings cluster similar meanings close together in vector space
- A real worked example showing nearby vs. distant embeddings
- Why two different embedding models' vectors can never be compared to each other

## A precise definition

An **embedding** is a dense numeric vector — a fixed-length list of real numbers, typically a few hundred to a few thousand of them — produced by a neural network that was trained specifically to represent the *meaning* of a piece of text as a point in a high-dimensional space. "Dense" just means almost every number in the vector is non-zero and meaningful, unlike an old-style bag-of-words vector, which is mostly zeros.

Critically, embeddings are **not arbitrary**. The model is trained so that pieces of text with similar meaning end up at nearby points in that space, and pieces of text with different meaning end up far apart. Distance and direction in that space become a proxy for semantic similarity.

## A concrete, small worked example

Imagine (for illustration) a toy embedding model that outputs just 4 numbers instead of hundreds. Three short phrases, embedded:

```
"a dog barking in the yard"   -> [0.91, 0.12, -0.04, 0.33]
"a puppy barking outside"     -> [0.88, 0.15, -0.02, 0.31]
"quarterly revenue report"    -> [-0.21, 0.77, 0.44, -0.09]
```

Notice the first two vectors are nearly identical — both numbers close in every position — because the phrases mean nearly the same thing, even though they don't share many exact words ("dog" vs. "puppy", "yard" vs. "outside"). The third vector is in a completely different part of the space, because it's about something unrelated. This is the entire point: embeddings capture meaning, not just shared vocabulary, which is exactly what lets semantic search find a relevant passage even when it doesn't use the same words as the query.

## Real-world dimensionality

Real embedding models don't output 4 numbers — common sizes are 384, 768, 1024, 1536, or 3072 dimensions, depending on the model (Lesson 8 covers the trade-offs of each size in depth). Every dimension doesn't correspond to a single human-readable concept like "dog-ness" — the meaning is distributed across the whole vector, learned automatically during training, not hand-designed.

## Why you can't mix embeddings from different models

An embedding space is entirely defined by how its specific model was trained — its architecture, its training data, its objective function. Two different models, even if they happen to output vectors of the same length, place concepts at completely different coordinates. A vector from OpenAI's `text-embedding-3-small` and a vector from an open-source model like BGE are not directionally comparable, even though both are "just a list of 1536 numbers" in one case — comparing them with cosine similarity produces a meaningless score. This is why every chunk in a vector database must be embedded with the exact same model used to embed queries against it, something the next lessons return to repeatedly.

## Key terms

| Term | Meaning |
|---|---|
| Embedding | A dense numeric vector representing a piece of text's meaning |
| Dense vector | A vector where most values are non-zero and meaningful |
| Vector space | The high-dimensional space embeddings live in, where distance ≈ semantic difference |
| Dimensionality | How many numbers are in each embedding vector |
| Embedding space | The specific, model-defined coordinate system a set of embeddings belongs to |

## Lab

1. Write down three short phrases: two that mean roughly the same thing using different words, and one unrelated phrase.
2. Without a real embedding model, predict (in your own words) which two should end up "close" in vector space and why.
3. If you have access to any embedding API, actually embed all three and compute how similar they are (Lesson 7 covers the exact math) — see if your prediction matches.

## Check yourself

You're ready for Lesson 6 when you can explain why "a dog barking in the yard" and "a puppy barking outside" would have similar embeddings despite sharing almost no exact words.
