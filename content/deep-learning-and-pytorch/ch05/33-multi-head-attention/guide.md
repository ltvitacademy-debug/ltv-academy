# Multi-Head Attention

A single attention computation over the full embedding width gives a model exactly one way to decide what's relevant. Multi-head attention gives it several, by splitting the embedding dimension into smaller subspaces and running a separate attention computation — a separate "head" — in each one, in parallel. This lesson covers why that split matters and exactly how `nn.MultiheadAttention` implements it.

## What you'll learn

- How `d_model` is split into `num_heads` smaller subspaces
- Why multiple heads beat running full-width attention repeatedly
- `nn.MultiheadAttention`'s real constructor and forward signature
- The shape bookkeeping PyTorch does internally, so you can reason about it

## Splitting the embedding dimension

If `d_model = 64` and `num_heads = 4`, each head works in a subspace of `head_dim = 64 / 4 = 16` dimensions. Each head has its **own** learned Q, K, V projection matrices mapping the full `d_model` input down into its own `head_dim`-sized subspace. Attention runs independently inside each subspace, and the `num_heads` outputs (each `head_dim` wide) are concatenated back into a `d_model`-wide vector, then passed through one shared output projection.

## Why not just run full-width attention several times?

Because that would be identical computation repeated — same Q, K, V, same scores, same output, every time, at a far higher cost. Splitting into subspaces is what actually buys you something: each head gets its *own* learned projections, so during training different heads are free to specialize. One head might end up tracking nearby-word relationships, another longer-range dependencies, another something stranger that only shows up empirically. Running the same full-width computation repeatedly gives you no such diversity — it's the same answer, computed `num_heads` times, for `num_heads` times the cost.

## `nn.MultiheadAttention` in PyTorch

```python
import torch
import torch.nn as nn

mha = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)

x = torch.randn(2, 10, 64)   # (batch, seq_len, embed_dim)

attn_output, attn_weights = mha(
    x, x, x,                 # query, key, value
    attn_mask=None,
    key_padding_mask=None,
    need_weights=True,
)
# attn_output: (2, 10, 64) -- same shape as the input
```

`embed_dim` must be evenly divisible by `num_heads` — PyTorch computes `head_dim = embed_dim // num_heads` and raises an error otherwise. Internally, PyTorch reshapes `x`'s projections to `(batch, num_heads, seq_len, head_dim)`, runs scaled dot-product attention per head, concatenates the heads back to `(batch, seq_len, embed_dim)`, and applies a final learned linear layer (`out_proj`) before returning. You never have to manage that reshape yourself — it's exactly the bookkeeping the module handles for you.

## Key terms

| Term | Meaning |
|---|---|
| `head_dim` | `embed_dim // num_heads` — the width of each head's subspace |
| Multi-head attention | Running attention independently in several learned subspaces, then concatenating |
| `out_proj` | The final linear layer that combines concatenated head outputs back into one `embed_dim`-wide vector |
| Specialization | Different heads learning to attend to different kinds of relationships |
