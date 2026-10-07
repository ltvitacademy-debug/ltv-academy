# Why Transformers Replaced RNNs

You now have every piece of the puzzle: RNNs and LSTMs from earlier in this chapter, and attention, multi-head attention, and positional encoding from the lessons since. This lesson connects them — laying out, explicitly, the three reasons attention-based architectures displaced recurrent ones as the default for sequence modeling.

## What you'll learn

- Why self-attention parallelizes across the sequence dimension and RNNs can't
- "Path length" between positions, and why it matters for long-range dependencies
- The real cost trade-off transformers accepted to get there
- How these three ideas combine into the case for attention over recurrence

## Reason one: parallelism during training

An RNN's hidden state `h_t` requires `h_{t-1}` to already exist — a hard, step-by-step dependency chain (Lesson 29). On a GPU, that means the *sequence* dimension of an RNN can't be computed in parallel; you're stuck processing timestep after timestep.

Self-attention has no such dependency. Every position's output depends on *all* positions at once, computed as one batched matrix multiplication:

```python
# one call computes every query's relevance to every key, for a whole batch
scores = torch.matmul(q, k.transpose(-2, -1)) / d_k ** 0.5
# shape: (batch, seq_len, seq_len) -- not a per-timestep loop
```

That single `matmul` replaces what would be a sequential loop in an RNN. On modern GPUs, where matrix multiplication is exactly what's optimized, this is a massive practical speedup during training.

## Reason two: path length for long-range dependencies

In an RNN, information from token 1 has to pass *through* every intermediate hidden state to influence token 1000 — a path length of `O(n)`. Each step along that path is another opportunity for the vanishing-gradient problem from Lesson 30 to erase the signal.

In self-attention, any two positions are connected directly by one attention computation — a path length of `O(1)`, regardless of how far apart they are in the sequence. That's a structural advantage for capturing long-range dependencies that no amount of LSTM gating fully solves for very long sequences.

## Reason three: the cost that was accepted to get there

This isn't free. Self-attention computes relevance between *every* pair of positions, so its compute and memory scale as `O(n² · d)` with sequence length `n` — versus an RNN's `O(n · d)`, which is linear in sequence length. Transformers traded away the sequential bottleneck for a quadratic-in-length attention cost. That trade is a clear win at the moderate sequence lengths this course works with; making attention efficient at very long context lengths became its own active area of research, outside the scope of this course.

## Putting it together

| | RNN | Self-attention |
|---|---|---|
| Parallel across sequence? | No — strictly sequential | Yes — one batched matmul |
| Path length between any two positions | O(n) | O(1) |
| Compute/memory vs. sequence length | O(n) | O(n²) |

Faster to train, better at long-range dependencies, at the cost of a steeper scaling curve with sequence length — that combination is the actual case for why transformers took over.

## Key terms

| Term | Meaning |
|---|---|
| Parallelism across the sequence | Computing all positions' outputs simultaneously instead of step by step |
| Path length | The number of computational steps information must travel between two positions |
| O(n²) attention cost | Self-attention's compute/memory scaling with sequence length `n` |
