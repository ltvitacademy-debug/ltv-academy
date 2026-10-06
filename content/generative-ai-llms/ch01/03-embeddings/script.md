# Lesson 3 — Embeddings · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Once text is broken into tokens, the very next step is turning each one into a list of numbers
that captures what it means. That's an embedding — and it turns meaning into something you can
actually measure: geometry.

## S2 · STEPS CARD (Token -> Vector -> Position -> Nearby meanings cluster)

Four ways to think about the pipeline. A token gets converted into a vector — hundreds or
thousands of numbers. That vector is a position in a high-dimensional space. Meaning becomes
geography: words used in similar contexts end up positioned near each other. "Dog" and "puppy"
land close together. "Dog" and "spreadsheet" don't.

## S3 · CODE CARD (king - man + woman ~= queen)

Here's the example that convinced the field this was real. Take the embedding for "king,"
subtract "man," add "woman" — and the result lands close to "queen." Nobody told the model that
royalty and gender relate this way. It fell out of the geometry, because that relationship was
baked into how those words actually get used across enormous amounts of text.

## S4 · CODE CARD (cosine similarity)

How do you measure "close"? Cosine similarity — the angle between two vectors, from negative one,
opposite meaning, up to one, identical meaning. Two sentences with a similarity near one are
saying essentially the same thing, even with completely different words. That single number is
what powers semantic search, recommendations, and retrieval-augmented generation — finding the
right information by meaning, not by matching exact keywords.

## S5 · OUTRO CARD

Tokens become vectors, vectors become geometry, and geometry is what lets a model know "puppy" is
close to "dog." Next lesson: what the model actually does with all of this — next-token
prediction, the mechanism that turns understanding into generation.
