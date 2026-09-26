# The Transformer Architecture

Last lesson you saw attention as a weighted average over every position. The **Transformer** (Vaswani et al., 2017, "Attention Is All You Need") is what you get when you stack that idea into a repeatable block and add just enough extra machinery to make it trainable. Almost every large language model you will use is a Transformer variant. This lesson builds one block in numpy, so the diagram in every blog post becomes something you have actually run. The AI Engineer path goes deeper on the engineering; here we want the mental model a data scientist needs.

## What you'll learn

- Scaled dot-product attention, and why it divides by the square root of the head size
- Why a Transformer needs positional encodings (with a test that proves it)
- Multi-head attention, the causal mask, residual connections, and layer normalization
- How the parameters of a real model add up

## One block, step by step

A Transformer block has two sublayers: **multi-head attention**, then a **feed-forward network** (a small MLP applied to each position independently). Each sublayer is wrapped in a **residual connection** (add the input back to the output) and **layer normalization** (rescale each token's vector to a stable range). Both keep deep stacks trainable.

Inside attention, each token's vector is projected three ways by learned matrices into a **query**, **key**, and **value**. Scores are `Q @ K.T`, divided by the square root of the head size so the softmax does not saturate, then softmaxed into weights. **Multi-head** attention runs several such attentions in parallel on slices of the vector, so different heads can specialize, then concatenates and mixes them. For text generation, a **causal mask** blocks each position from looking at later ones. Here is the whole block with random (untrained) weights; we ran it with numpy 1.23:

```python
import numpy as np

rng = np.random.default_rng(0)
n_tok, d, n_heads = 5, 16, 4
dh = d // n_heads

def softmax(z):
    e = np.exp(z - z.max(axis=-1, keepdims=True))
    return e / e.sum(axis=-1, keepdims=True)

def layer_norm(x):
    return (x - x.mean(-1, keepdims=True)) / (x.std(-1, keepdims=True) + 1e-5)

def positional_encoding(n, d):
    pos = np.arange(n)[:, None]
    i = np.arange(d // 2)[None, :]
    angle = pos / 10000 ** (2 * i / d)
    pe = np.zeros((n, d))
    pe[:, 0::2] = np.sin(angle)
    pe[:, 1::2] = np.cos(angle)
    return pe

Wq, Wk, Wv, Wo = (rng.normal(scale=0.3, size=(d, d)) for _ in range(4))
W1 = rng.normal(scale=0.3, size=(d, 4 * d))
W2 = rng.normal(scale=0.3, size=(4 * d, d))

def multi_head_attention(x, causal=True):
    Q, K, V = x @ Wq, x @ Wk, x @ Wv
    outs, all_w = [], []
    for h in range(n_heads):
        s = slice(h * dh, (h + 1) * dh)
        scores = Q[:, s] @ K[:, s].T / np.sqrt(dh)
        if causal:
            scores = np.where(np.triu(np.ones((len(x), len(x))), 1) == 1, -1e9, scores)
        w = softmax(scores)
        outs.append(w @ V[:, s])
        all_w.append(w)
    return np.concatenate(outs, axis=-1) @ Wo, all_w

def block(x):
    a, w = multi_head_attention(layer_norm(x))
    x = x + a                                        # residual
    x = x + np.maximum(0, layer_norm(x) @ W1) @ W2   # feed-forward + residual
    return x, w

emb = rng.normal(size=(n_tok, d))     # stand-in token embeddings
x = emb + positional_encoding(n_tok, d)
out, w = block(x)
print(out.shape)                      # (5, 16)
print(w[0].round(2))
```

The output has shape `(5, 16)`: the same shape as the input, which is why blocks can be stacked as many times as you like. Head 0's attention weights are lower-triangular:

```
[[1.   0.   0.   0.   0.  ]
 [0.58 0.42 0.   0.   0.  ]
 [0.38 0.23 0.38 0.   0.  ]
 [0.22 0.55 0.16 0.07 0.  ]
 [0.07 0.13 0.42 0.17 0.21]]
```

Each row sums to 1, and no token attends to a later one. (The pattern itself is meaningless because the weights are random; training is what makes heads useful.) This block uses the "pre-norm" layout (normalize before each sublayer) common in GPT-style models; the original 2017 paper normalized after.

## Why positions must be added

Attention treats its input as a set: nothing in the math knows which token came first. We can prove it. Shuffle the tokens before the block and compare with shuffling the outputs after (using the block without a mask):

```python
perm = np.array([3, 0, 4, 1, 2])
def no_mask_out(x):
    a, _ = multi_head_attention(layer_norm(x), causal=False)
    x = x + a
    return x + np.maximum(0, layer_norm(x) @ W1) @ W2

print(np.abs(no_mask_out(emb)[perm] - no_mask_out(emb[perm])).max())
pe = positional_encoding(n_tok, d)
print(np.abs(no_mask_out(emb + pe)[perm] - no_mask_out(emb[perm] + pe)).max())
```

Without positions the difference is `1.8e-15` (rounding error): shuffling the input just shuffles the output, so word order is invisible. With the sinusoidal encoding added it is `2.03`: order now changes the result. Modern models often use other schemes (learned or rotary position embeddings), but the job is the same.

The chart below is drawn from the same objects: the sinusoidal encoding for 20 positions (each position gets a unique pattern of waves), and head 0's causal attention weights.

```python
import matplotlib.pyplot as plt

fig, (a, b) = plt.subplots(1, 2, figsize=(10, 3.8))
a.imshow(positional_encoding(20, d), cmap="RdBu", aspect="auto")
a.set_xlabel("embedding dimension"); a.set_ylabel("position")
a.set_yticks(range(0, 20, 5))
b.imshow(w[0], cmap="Blues", vmin=0, vmax=1)
b.set_xlabel("attended-to position"); b.set_ylabel("query position")
plt.tight_layout()
plt.savefig("transformer_parts.png", dpi=150)
```

## Counting parameters

A block has about 12 times `d` squared parameters (four for attention, eight for the feed-forward layer). For a GPT-2-small-shaped model (12 layers, `d = 768`, vocabulary 50,257, 1,024 positions), adding up every weight and bias gives `7,087,872` per layer and `124,439,808` in total, matching the roughly 124 million parameters reported for GPT-2 small. Note where they live: most of a small model's parameters are in the blocks, but the embedding table alone is 38.6 million.

```python
D, L, V, P = 768, 12, 50257, 1024
per_layer = (3*D*D + 3*D) + (D*D + D) + (D*4*D + 4*D) + (4*D*D + D) + 4*D
print(L * per_layer + V*D + P*D + 2*D)   # 124439808
```

## Recap

- A Transformer block is multi-head attention plus a feed-forward network, each with a residual connection and layer norm.
- Attention alone ignores order, so positional information is added to the embeddings.
- The causal mask makes a decoder-only model predict each token from earlier tokens only.
- Next lesson: how a model like this is actually trained.
