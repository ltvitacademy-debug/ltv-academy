# Script — Self-Attention vs. Cross-Attention

## Segment 1 (title)

The attention computation from the last lesson doesn't care, mathematically, where its query, key, and value came from — it just does the same weighted sum either way. What changes between self-attention and cross-attention is entirely about which sequence those three tensors are drawn from.

## Segment 2 (code)

In self-attention, query, key, and value all come from the same sequence, each produced by its own learned projection of the same input. Every token gets to attend to every other token in that same sequence, including itself.

## Segment 3 (code)

In cross-attention, the query comes from one sequence, but the key and value come from a different one entirely — the classic example is a decoder's query attending over an encoder's output. Notice the two sequences don't even need the same length; the output takes on the query's length, because you get one result per query position.

## Segment 4 (steps)

So the real difference is just this: self-attention sets query, key, and value to the same tensor; cross-attention lets the query come from somewhere else. And the output always matches the query's sequence length, never the key or value's.

## Segment 5 (outro)

Next up: multi-head attention — running several of these attention computations in parallel, each in its own smaller subspace.
