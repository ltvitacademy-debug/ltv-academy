# Script — The Attention Mechanism

## Segment 1 (title)

LSTMs made sequence models remember better, but they still squeeze an entire sequence through one hidden state updated step by step. Attention takes a different approach: let every output position look directly at every input position and decide, on the fly, how much each one matters. This lesson builds that computation from scratch.

## Segment 2 (steps)

Every attention computation starts from three vectors per position. The query asks what am I looking for. The key answers what do I have to offer. The value is what actually gets contributed once a position is picked. A query gets compared against every key to produce relevance scores, and the output is a weighted sum of the values, weighted by those scores.

## Segment 3 (code)

In code, that's one matrix multiply of queries against keys to get scores, dividing by the square root of the key dimension, an optional mask, a softmax, and one more matrix multiply against the values. Three tensors shaped batch, sequence length, dimension go in; the same shape comes back out.

## Segment 4 (steps)

Hold the shape in your head: queries and keys produce scores, scores become weights through softmax, and weights combine the values into the output. That's the entire mechanism underneath every transformer in this course.

## Segment 5 (code)

You'll rarely write the raw version in production. PyTorch ships scaled_dot_product_attention, a fused, optimized version of exactly this math, with built-in support for masking and causal attention.

## Segment 6 (outro)

Next up: self-attention versus cross-attention — the same computation, just pointed at different sources for the query, key, and value.
