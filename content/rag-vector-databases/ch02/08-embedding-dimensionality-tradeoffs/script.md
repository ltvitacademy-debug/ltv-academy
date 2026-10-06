# Script — Embedding Dimensionality Trade-offs

## Segment 1 (title)

Higher-dimensional embeddings can encode more semantic nuance, but every stored vector takes more memory and every comparison takes more compute. The question is never "is bigger better" — it's "do I need the nuance enough to pay for it."

## Segment 2 (code: storage cost)

Storage per vector is dimensions times four bytes. 384 dimensions is about one and a half kilobytes. 1536 dimensions is about six kilobytes. Scale that to a million chunks at 1536 dimensions and you're looking at roughly six gigabytes just for the raw vectors — before the index structure or any metadata.

## Segment 3 (steps: compute cost and capacity)

Computing similarity is proportional to dimension count — comparing two 3072-dimension vectors takes roughly twice the work of comparing two 1536-dimension ones, and that cost gets paid on every single comparison a search performs. But a very low-dimensional embedding has fewer slots to encode distinctions in meaning, which shows up directly as worse retrieval quality.

## Segment 4 (code: Matryoshka Representation Learning)

Several modern models are trained with Matryoshka Representation Learning, which produces vectors where the first N dimensions are themselves a meaningful embedding on their own. You can truncate a 3072-dimension vector down to its first 512 dimensions and still get a coherent embedding, without re-running the model — a dial between quality and cost instead of one fixed size.

## Segment 5 (outro)

The right dimensionality is the smallest one that still gives acceptable retrieval quality for your specific content — not the smallest possible, not the largest available. Next lesson: actually choosing an embedding model, putting everything from this chapter together.
