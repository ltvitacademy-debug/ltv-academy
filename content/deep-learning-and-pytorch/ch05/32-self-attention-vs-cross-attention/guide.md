# Self-Attention vs. Cross-Attention

The attention computation you built in the last lesson doesn't care, mathematically, where its Q, K, and V tensors came from — it just does the same softmax-weighted sum regardless. What changes between **self-attention** and **cross-attention** is entirely about *which sequence* those three tensors are drawn from. That one choice is what separates "a sequence looking at itself" from "one sequence looking at another."

## What you'll learn

- The precise difference between self-attention and cross-attention
- Why cross-attention is what lets a decoder "look back" at an encoder's output
- How to call `nn.MultiheadAttention` for each case
- Why Q and K/V are allowed to come from sequences of different lengths

## Self-attention: a sequence looking at itself

In self-attention, the query, key, and value all come from **the same sequence** — each one produced by its own learned linear projection of the same input `x`:

```python
import torch.nn as nn

mha = nn.MultiheadAttention(embed_dim=64, num_heads=4, batch_first=True)

x = torch.randn(2, 10, 64)              # (batch, seq_len, embed_dim)
self_attn_out, weights = mha(x, x, x)   # query = key = value = x
# self_attn_out: (2, 10, 64) -- same shape as x
```

Every token in the sequence gets to attend to every other token *in that same sequence*, including itself. This is what you used in Chapter 5's attention lesson, and it's what powers the encoder side of a transformer and the masked self-attention inside a decoder block.

## Cross-attention: one sequence looking at another

In cross-attention, the query comes from **one** sequence, but the key and value come from a **different** sequence entirely:

```python
decoder_hidden = torch.randn(2, 6, 64)   # (batch, tgt_len=6, embed_dim)
encoder_output = torch.randn(2, 10, 64)  # (batch, src_len=10, embed_dim)

cross_attn_out, weights = mha(decoder_hidden, encoder_output, encoder_output)
# query = decoder_hidden, key = value = encoder_output
# cross_attn_out: (2, 6, 64) -- matches the QUERY's shape, not the key/value's
```

This is the mechanism that, in an encoder-decoder transformer (used for tasks like machine translation), lets the decoder — while generating the target sentence — look back at the *entire* source sentence and decide, for each word it's producing, which source words are most relevant. Notice the query sequence length (6) and the key/value sequence length (10) don't match — and that's fine. The output takes on the query's sequence length, because the output is "one result per query position," each a weighted combination of values from the other sequence.

## Why the shape mismatch is allowed

Scaled dot-product attention only requires Q and K to share their *last* dimension (so the dot product `Q @ Kᵗ` is well-defined) — their sequence-length dimension is free to differ. That's precisely what makes cross-attention possible: the decoder's sequence and the encoder's sequence almost never have the same length, and attention doesn't need them to.

## Key terms

| Term | Meaning |
|---|---|
| Self-attention | Q, K, V all projected from the same sequence |
| Cross-attention | Q from one sequence; K and V from a different sequence |
| Encoder-decoder attention | The classic use of cross-attention: a decoder attending over an encoder's output |
| Output sequence length | Always matches the query's sequence length, regardless of the key/value length |
