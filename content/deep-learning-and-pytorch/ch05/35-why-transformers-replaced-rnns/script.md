# Script — Why Transformers Replaced RNNs

## Segment 1 (title)

You now have every piece of the puzzle: RNNs and LSTMs from earlier in this chapter, and attention since. This lesson connects them, laying out the three concrete reasons attention-based architectures displaced recurrent ones.

## Segment 2 (code)

First, parallelism. An RNN's hidden state needs the previous hidden state to already exist — a hard sequential chain. Self-attention has no such dependency: every position's relevance to every other position is one batched matrix multiply, computed all at once instead of in a loop.

## Segment 3 (steps)

Second, path length. In an RNN, information from token one has to pass through every intermediate hidden state to reach token one thousand — a path length that grows with the sequence. In self-attention, any two positions connect directly through one computation, regardless of distance.

## Segment 4 (steps)

Third, the cost that was accepted to get there. Self-attention computes relevance between every pair of positions, so its compute scales with the square of sequence length, versus linear for an RNN. Transformers traded the sequential bottleneck for that steeper curve.

## Segment 5 (code)

Put side by side: not parallel versus parallel, linear path length versus constant, linear compute versus quadratic. Faster training and better long-range dependencies, at the cost of a steeper scaling curve — that's the actual case for transformers.

## Segment 6 (outro)

Next up: the paper that started it all — "Attention Is All You Need" — and what it actually proposed.
