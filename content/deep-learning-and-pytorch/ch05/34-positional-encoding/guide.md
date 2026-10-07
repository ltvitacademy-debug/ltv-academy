# Positional Encoding

Here's a subtle problem with everything you've built this chapter: attention has no built-in sense of order. Shuffle the tokens in a sequence and feed them to self-attention, and — aside from which output slot each result lands in — the computation treats them identically either way. Positional encoding is the fix: inject information about *where* each token sits directly into its embedding, before attention ever sees it.

## What you'll learn

- Why self-attention is "permutation-equivariant" and what that means in practice
- The sinusoidal positional encoding formula from the original transformer paper
- How to implement it in PyTorch
- The alternative used by GPT-style models: learned positional embeddings

## Why attention needs help with order

Self-attention computes relevance between a query and a key using nothing but their content — their dot product. There's no term anywhere in `softmax(QKᵗ/√d_k)V` that depends on *position* in the sequence. That's what "permutation-equivariant" means here: permute the input tokens, and the set of outputs permutes along with them, with no new information gained or lost. An RNN didn't have this problem — order was baked into the recurrence itself. A transformer has to add position back in by hand.

## Sinusoidal positional encoding

The original transformer paper's solution: a fixed (not learned) vector for each position, built from sine and cosine waves at different frequencies, added elementwise to the token embedding.

```python
import torch

def sinusoidal_positional_encoding(seq_len, d_model):
    pos = torch.arange(seq_len).unsqueeze(1).float()      # (seq_len, 1)
    i = torch.arange(d_model // 2).float()                 # (d_model/2,)
    angle = pos / (10000 ** (2 * i / d_model))
    pe = torch.zeros(seq_len, d_model)
    pe[:, 0::2] = torch.sin(angle)   # even indices: sine
    pe[:, 1::2] = torch.cos(angle)   # odd indices:  cosine
    return pe   # (seq_len, d_model)
```

This produces one `d_model`-dimensional vector per position, where each pair of dimensions oscillates at a different frequency. The result is added directly to the token embeddings — not concatenated — so it doesn't change the model's dimensionality at all:

```python
token_emb = embedding(tokens)              # (batch, seq_len, d_model)
pe = sinusoidal_positional_encoding(seq_len, d_model)
x = token_emb + pe                          # position injected, same shape
```

## The alternative: learned positional embeddings

GPT-style decoder-only models typically use a simpler approach — a learned embedding table indexed by position, exactly like a token embedding table but indexed by position instead of token id:

```python
import torch.nn as nn

pos_emb = nn.Embedding(num_embeddings=max_seq_len, embedding_dim=d_model)

positions = torch.arange(seq_len)            # (seq_len,)
x = token_emb(tokens) + pos_emb(positions)   # added elementwise, same as before
```

Learned embeddings let training discover whatever positional representation works best for the data, at the cost of being fixed to `max_seq_len` positions the model was trained with (sinusoidal encoding, by contrast, can in principle generalize to longer sequences than it was trained on, since it's a formula, not a lookup table).

## Key terms

| Term | Meaning |
|---|---|
| Permutation-equivariant | Shuffling the input tokens shuffles the outputs the same way, with no new information |
| Sinusoidal positional encoding | Fixed sine/cosine vectors per position, added to token embeddings |
| Learned positional embedding | `nn.Embedding` indexed by position instead of token id |
| Added, not concatenated | Positional information is summed elementwise into the token embedding, preserving `d_model` |
