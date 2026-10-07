# Script — Positional Encoding

## Segment 1 (title)

Here's a subtle problem with everything you've built this chapter: attention has no built-in sense of order. Shuffle the tokens in a sequence and feed them to self-attention, and the computation treats them identically either way. Positional encoding fixes that by injecting position directly into the embedding.

## Segment 2 (steps)

Self-attention computes relevance from content alone — there's no position term anywhere in the softmax formula. Permute the tokens and the outputs permute right along with them, with no new information gained or lost. RNNs never had this problem, because order was baked into the recurrence itself.

## Segment 3 (code)

The original transformer paper's fix is sinusoidal positional encoding: a fixed vector per position, built from sine and cosine waves at different frequencies, one pair of dimensions per frequency.

## Segment 4 (code)

That vector gets added, not concatenated, directly onto the token embedding, so the model's dimensionality never changes — position just rides along inside the same vector from that point forward.

## Segment 5 (code)

GPT-style models usually take a simpler route: a learned embedding table indexed by position instead of token id, added the same way. It's more flexible during training, but it's fixed to whatever maximum sequence length it was trained with.

## Segment 6 (outro)

Next up: why transformers actually replaced RNNs — parallelism, path length, and the trade-off hiding underneath both.
