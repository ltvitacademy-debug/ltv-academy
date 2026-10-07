# The Attention Mechanism

LSTMs made sequence models remember better, but they still squeeze an entire sequence through one hidden state that gets updated step by step. Attention takes a fundamentally different approach: instead of compressing everything into one running summary, let every output position look directly at every input position and decide, on the fly, how much each one matters. This lesson builds scaled dot-product attention from scratch, the operation underneath every transformer you'll meet for the rest of this course.

## What you'll learn

- The query/key/value framing and what each one intuitively represents
- How to compute scaled dot-product attention with raw tensor operations
- Why the scores are divided by `sqrt(d_k)` before the softmax
- PyTorch's real built-in, `torch.nn.functional.scaled_dot_product_attention`

## Query, key, value

Every attention computation starts from three vectors per position, each produced by its own learned linear projection of the input:

- **Query (Q)** — "what am I looking for?" — one per position that's doing the attending
- **Key (K)** — "what do I have to offer?" — one per position being attended to
- **Value (V)** — "what do I actually contribute if I'm picked?" — also one per position being attended to

The query at a position is compared against every key to produce a relevance score, those scores are turned into weights, and the output for that position is a weighted sum of the values — weighted exactly by how relevant each key turned out to be.

## Scaled dot-product attention, from scratch

```python
import torch
import torch.nn.functional as F

def attention(q, k, v, mask=None):
    d_k = q.size(-1)
    scores = torch.matmul(q, k.transpose(-2, -1)) / d_k ** 0.5
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))
    weights = F.softmax(scores, dim=-1)
    return torch.matmul(weights, v), weights
```

With `q`, `k`, `v` shaped `(batch, seq_len, d_k)`: `q @ k.transpose(-2, -1)` produces a `(batch, seq_len, seq_len)` matrix of raw relevance scores — one row per query position, one column per key position. Softmax along the last dimension turns each row into a probability distribution that sums to 1. The final `matmul` with `v` produces the weighted sum of values — back to shape `(batch, seq_len, d_k)`, same shape you started with.

## Why divide by `sqrt(d_k)`

As `d_k` (the dimension of each query/key vector) grows, the dot product `q · k` tends to grow too — it's a sum of `d_k` terms. Without correcting for that, scores can become large in magnitude, which pushes softmax into a very sharp, nearly one-hot distribution (vanishing gradients through softmax itself). Dividing by `sqrt(d_k)` rescales the scores back to a stable range regardless of dimension, keeping the softmax well-behaved — this is exactly why it's called *scaled* dot-product attention.

## PyTorch's built-in

You rarely need to write the raw version in production — PyTorch ships a fused, optimized implementation:

```python
import torch.nn.functional as F

output = F.scaled_dot_product_attention(query, key, value, attn_mask=None, is_causal=False)
# same math as the manual version above, just faster and more memory-efficient
```

It accepts an optional `attn_mask` (for masking out positions, e.g. padding) or `is_causal=True` (for autoregressive masking, covered in Chapter 6).

## Key terms

| Term | Meaning |
|---|---|
| Query (Q) | What a position is looking for |
| Key (K) | What a position offers to be matched against |
| Value (V) | What a position actually contributes once selected |
| Scaled dot-product attention | softmax(QKᵗ / √d_k) · V |
