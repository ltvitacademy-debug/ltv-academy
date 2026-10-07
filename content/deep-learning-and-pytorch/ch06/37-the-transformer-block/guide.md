# The Transformer Block

You've now built every ingredient separately: scaled dot-product attention, multi-head attention, and positional encoding. This lesson assembles them into the single reusable unit that a transformer is actually stacked out of — the transformer block. Once you can write this one `nn.Module`, building a 12-layer or 96-layer model is just a `for` loop.

## What you'll learn

- The six pieces a decoder-style transformer block is built from, in order
- Why "pre-norm" ordering (`x = x + sublayer(norm(x))`) is the modern default
- How to write `TransformerBlock` as a real `nn.Module` using `nn.MultiheadAttention`
- Why a block's input and output shape are identical — and why that matters

## The six pieces, in order

A decoder-only transformer block (the kind GPT-style models stack) is built from:

1. **LayerNorm** — normalizes each token's features before attention
2. **Multi-head self-attention**, causally masked so a position can't look at future tokens
3. **A residual add** — add the attention output back onto the block's input
4. **LayerNorm** — normalizes each token's features before the feed-forward sublayer
5. **A feed-forward sublayer** — a small per-token MLP (full treatment in Lesson 38)
6. **A residual add** — add the feed-forward output back onto the result of step 3

Written as the two lines that actually matter:

```python
x = x + attn(norm1(x))
x = x + ffn(norm2(x))
```

This is **pre-norm** ordering — normalize *before* handing `x` to a sublayer, rather than normalizing *after* adding the residual. Lesson 39 covers exactly why this ordering won the argument, but the short version: it keeps the residual path completely clean of normalization, which makes deep stacks far easier to train.

## Writing it as an `nn.Module`

```python
import torch.nn as nn

class TransformerBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff):
        super().__init__()
        self.norm1 = nn.LayerNorm(d_model)
        self.attn = nn.MultiheadAttention(d_model, num_heads, batch_first=True)
        self.norm2 = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff), nn.GELU(), nn.Linear(d_ff, d_model)
        )

    def forward(self, x, attn_mask=None):
        h = self.norm1(x)
        attn_out, _ = self.attn(h, h, h, attn_mask=attn_mask, need_weights=False)
        x = x + attn_out
        x = x + self.ffn(self.norm2(x))
        return x
```

A few details worth slowing down on:

- `nn.MultiheadAttention(d_model, num_heads, batch_first=True)` handles the query/key/value projections, the head split, and the output projection internally — you did that by hand in Lesson 33, and now you get to use the built-in.
- Calling `self.attn(h, h, h, ...)` passes the *same* normalized tensor `h` as query, key, and value. That's what makes this **self**-attention rather than cross-attention.
- `attn_mask` is where causal masking plugs in. This block doesn't build the mask itself — it just accepts one and forwards it. Lesson 40 builds the actual mask and passes it in.
- `need_weights=False` skips computing and returning the full attention-weight matrix, which you don't need at inference or training time — it's a small speed win.

## Shape in, same shape out

Given `x` of shape `(B, T, d_model)` — batch size `B`, sequence length `T`, model dimension `d_model` — the block's output is also `(B, T, d_model)`. Neither the residual adds nor the two sublayers change that shape: attention mixes information *across* the `T` positions but returns the same `(B, T, d_model)` tensor, and the feed-forward sublayer (Lesson 38) operates independently on each position without touching `T` or `d_model` at all.

This shape-preservation is exactly what makes stacking possible. If a block changed its output shape, you couldn't feed block 2's input requirements with block 1's output. Because it doesn't, `TinyGPT` in Lesson 40 can simply do:

```python
for block in self.blocks:
    x = block(x, attn_mask=mask)
```

— running the same tensor through `num_layers` identical blocks, one after another.

## Key terms

| Term | Meaning |
|---|---|
| Transformer block | LayerNorm → self-attention → residual add → LayerNorm → feed-forward → residual add |
| Pre-norm | Normalizing *before* a sublayer, inside the residual branch: `x + sublayer(norm(x))` |
| Self-attention | Attention where Q, K, and V all come from the same input tensor |
| `nn.MultiheadAttention` | PyTorch's built-in multi-head attention layer |

## Recap

A transformer block is six steps — norm, attend, add, norm, feed-forward, add — written in pre-norm form as `x = x + attn(norm1(x))` then `x = x + ffn(norm2(x))`. Its input and output shapes match exactly, which is what lets you stack as many as you want. Next up, Lesson 38: a close look at the feed-forward sublayer this block calls.
