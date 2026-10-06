# Lesson 3 — Embeddings

**Chapter 1 · How LLMs Actually Work · Lesson 3 of 31**

## What you'll learn

- What an embedding actually is: a list of numbers representing meaning
- Why "similar meaning" becomes "nearby in space" once text is embedded
- The classic vector-arithmetic example that shows embeddings encode relationships, not just words
- Where embeddings show up outside of chat — search, recommendations, RAG

## From token to vector

Lesson 2 covered tokens — the pieces text gets split into. The very next thing that happens to
each token is **embedding**: converting it into a vector, a list of numbers (hundreds to
thousands of dimensions, depending on the model) that represents its meaning. This isn't a
lookup table of fixed definitions — the vector is learned during training, shaped by every
context that token appeared in across enormous amounts of text.

The key idea: embeddings turn meaning into geometry. Two tokens (or two whole pieces of text,
if you embed a full sentence or document) that mean similar things end up with vectors that
point in similar directions — mathematically "close" to each other. Two tokens with unrelated
meanings end up far apart. "Dog" and "puppy" land near each other in this space. "Dog" and
"spreadsheet" don't.

## The classic example: vector arithmetic

The property that convinced the field this representation was capturing something real is
vector arithmetic. Take the embedding for "king," subtract the embedding for "man," add the
embedding for "woman" — and the resulting vector lands close to the embedding for "queen." The
model was never told that royalty and gender relate this way; it emerged from the geometry
because the training data's actual usage patterns encoded that relationship. This doesn't work
perfectly for every analogy, and modern LLM embeddings are far higher-dimensional and more
context-dependent than the simple word2vec-style embeddings that first demonstrated it — but the
underlying idea still holds: embeddings encode relationships, not just isolated word identities.

## How "closeness" is measured

Embeddings are compared using **cosine similarity** — a measure of the angle between two
vectors, ranging from -1 (opposite meaning) to 1 (identical meaning), mostly ignoring vector
length and focusing on direction. Two pieces of text with a cosine similarity near 1 are saying
something very similar; near 0, they're unrelated.

## Where this shows up beyond chat

Inside a transformer, every token gets embedded before attention ever runs (Lesson 1). But
embeddings are also a standalone, widely used tool on their own:

- **Semantic search** — find documents whose *meaning* matches a query, not just matching
  keywords
- **Recommendations** — find items whose embeddings land near a user's past preferences
- **RAG (retrieval-augmented generation)** — embed a knowledge base once, then at query time find
  the nearest-matching chunks to feed into a prompt, letting a model answer using information it
  wasn't trained on

## Key terms

| Term | Meaning |
|---|---|
| Embedding | A vector (list of numbers) representing a token's or text's meaning |
| Vector space | The high-dimensional space embeddings live in, where distance encodes meaning |
| Cosine similarity | A measure of how close two embeddings are, by the angle between them |
| Semantic search | Searching by meaning, via embeddings, instead of exact keyword matching |

## Check yourself

Before Lesson 4, you're ready to move on when you can explain, without looking: what does it mean
for "king - man + woman ≈ queen" to hold true in embedding space, and why is that significant?
