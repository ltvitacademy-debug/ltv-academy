# Building a Decoder-Only Transformer

Every piece is on the table: scaled dot-product attention, multi-head attention, positional encoding, the transformer block, the feed-forward sublayer, pre-norm residuals. This lesson wires all of it into a single working model — a tiny, decoder-only GPT you could actually train on text. It's the exact architecture real GPT-style models use, just with smaller numbers.

## What you'll learn

- The four pieces a decoder-only transformer adds on top of a stack of blocks
- How to build a causal mask with `torch.triu` and what it actually blocks
- The full `TinyGPT` module, end to end, with real tensor shapes at every step
- The modern alternative to building the mask by hand: `is_causal=True`

## What "decoder-only" adds on top of the block

You already have `TransformerBlock` from Lesson 37 — the reusable unit. A decoder-only transformer wraps a stack of them with four more pieces:

1. **Token embedding** — `nn.Embedding(vocab_size, d_model)`, turning integer token IDs into vectors
2. **Positional embedding** — `nn.Embedding(max_seq_len, d_model)`, added elementwise so the model knows *where* each token sits
3. **A final `LayerNorm`** — one more normalization after the last block, before the output projection
4. **A linear head** — `nn.Linear(d_model, vocab_size)`, turning each position's final vector into a score for every vocabulary token

And running through every block: a **causal mask**, so position `t` can only attend to positions `<= t`, never anything in the future. That's what makes this architecture a valid autoregressive language model — predicting the next token can never see the next token.

## Building the causal mask

```python
import torch

T = 8  # sequence length for this example
mask = torch.triu(torch.ones(T, T), diagonal=1).bool()
# mask[i, j] is True where j > i -- a future position relative to i
```

`torch.triu` keeps the upper triangle of a matrix (everything above the diagonal) and zeroes out the rest. With `diagonal=1`, the main diagonal itself is excluded from that upper triangle, so `mask[i, j]` is `True` exactly when `j > i` — position `j` is strictly in the future relative to position `i`. Passed as `attn_mask` to `nn.MultiheadAttention`, a boolean mask's `True` entries mean "do not attend here" — so this mask blocks every query position from attending to any key position that comes after it.

## The full `TinyGPT` module

```python
import torch
import torch.nn as nn

class TinyGPT(nn.Module):
    def __init__(self, vocab_size, d_model, num_heads, d_ff, num_layers, max_seq_len):
        super().__init__()
        self.tok_emb = nn.Embedding(vocab_size, d_model)
        self.pos_emb = nn.Embedding(max_seq_len, d_model)
        self.blocks = nn.ModuleList(
            [TransformerBlock(d_model, num_heads, d_ff) for _ in range(num_layers)]
        )
        self.norm_f = nn.LayerNorm(d_model)
        self.head = nn.Linear(d_model, vocab_size)

    def forward(self, idx):
        B, T = idx.shape
        pos = torch.arange(T, device=idx.device)
        x = self.tok_emb(idx) + self.pos_emb(pos)
        mask = torch.triu(torch.ones(T, T, device=idx.device), diagonal=1).bool()
        for block in self.blocks:
            x = block(x, attn_mask=mask)
        x = self.norm_f(x)
        return self.head(x)  # (B, T, vocab_size)
```

Tracing the shapes through `forward`: `idx` arrives as `(B, T)` — a batch of token-ID sequences. `self.tok_emb(idx)` produces `(B, T, d_model)`; `self.pos_emb(pos)` produces `(T, d_model)` and broadcasts across the batch when added. The sum, still `(B, T, d_model)`, flows through every block in the `nn.ModuleList` unchanged in shape (exactly the property Lesson 37 built in), gets normalized once more by `norm_f`, and the final `nn.Linear(d_model, vocab_size)` turns each position's `d_model`-sized vector into a `vocab_size`-sized score vector — final output shape `(B, T, vocab_size)`: one distribution over the whole vocabulary, at every position, for every sequence in the batch.

A couple of details worth noting: `nn.ModuleList` (not a plain Python list) is what makes PyTorch register every block's parameters correctly for training. And the mask is rebuilt fresh inside `forward` because `T` can vary between batches — it only depends on the current sequence length, not on anything learned.

## The modern shortcut: `is_causal=True`

Building the mask explicitly is worth doing once so you understand exactly what's being blocked and why. In practice, if you're using `torch.nn.functional.scaled_dot_product_attention` directly (Lesson 31) instead of `nn.MultiheadAttention`, you can skip building the mask entirely:

```python
import torch.nn.functional as F

out = F.scaled_dot_product_attention(q, k, v, is_causal=True)
# handles causal masking internally -- no explicit mask tensor needed
```

Both approaches produce the same masking behavior; `is_causal=True` is simply more convenient and often more efficient, since PyTorch can apply the causal structure without materializing a full mask tensor.

## Key terms

| Term | Meaning |
|---|---|
| Decoder-only transformer | Token + positional embedding, a stack of transformer blocks under causal masking, final norm, linear head |
| Causal mask | A `(T, T)` boolean matrix blocking every position from attending to future positions |
| `torch.triu` | Keeps a matrix's upper triangle (optionally offset by `diagonal`), zeroing the rest |
| `is_causal=True` | `scaled_dot_product_attention`'s built-in causal masking, no explicit mask tensor needed |

## Recap

`TinyGPT` is token embedding plus positional embedding, fed through a stack of `TransformerBlock`s under a causal mask built with `torch.triu`, followed by a final `LayerNorm` and a linear head projecting to vocabulary logits — shape `(B, T, vocab_size)` out. That causal mask is what makes next-token prediction valid: a position can never see the future. Up next, Lesson 41: Implementing the Training Loop for a Tiny GPT.
